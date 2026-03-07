import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest
from fastapi.testclient import TestClient

from lib.config import settings


# SheetsClientのモック（Google Sheets APIに接続しないため）
@pytest.fixture(autouse=True)
def mock_sheets():
    mock_client = MagicMock()

    # 候補者データ
    mock_client.get_candidates.return_value = {
        "total": 2,
        "page": 1,
        "per_page": 20,
        "data": [
            {
                "候補者ID": "C-2",
                "氏名": "山田花子",
                "保有資格": "介護福祉士",
                "経験年数": 5,
                "希望勤務地_都道府県": "東京都",
                "マッチング状態": "PENDING",
            },
            {
                "候補者ID": "C-3",
                "氏名": "佐藤太郎",
                "保有資格": "介護職員初任者研修",
                "経験年数": 2,
                "希望勤務地_都道府県": "大阪府",
                "マッチング状態": "COMPLETED",
            },
        ],
    }

    # 求人データ
    mock_client.get_jobs.return_value = {
        "total": 1,
        "page": 1,
        "per_page": 20,
        "data": [
            {
                "求人ID": "J-2",
                "施設名": "さくら介護施設",
                "所在地_都道府県": "東京都",
                "募集職種": "介護職",
                "雇用形態": "正社員",
                "給与_月額下限": 22,
                "給与_月額上限": 28,
                "掲載状態": "ACTIVE",
            }
        ],
    }

    # 求人追加
    mock_client.add_job.return_value = {
        "求人ID": "J-10",
        "施設名": "テスト施設",
        "登録日": "2026-02-26 10:00:00",
    }

    # マッチング結果
    mock_client.get_match_results.return_value = [
        {
            "結果ID": "M-C-2-J-2",
            "候補者ID": "C-2",
            "求人ID": "J-2",
            "総合スコア": 82.5,
            "ルールベーススコア": 48.0,
            "AIスコア": 34.5,
            "AI分析コメント": "認知症ケアの経験が強み",
        }
    ]

    with patch("api.index._get_sheets", return_value=mock_client):
        yield mock_client


@pytest.fixture
def client():
    from api.index import app

    return TestClient(app)


@pytest.fixture
def api_key():
    return settings.api_secret_key


# ============================================================
# ヘルスチェック
# ============================================================


class TestHealthCheck:
    def test_health(self, client):
        res = client.get("/api/health")
        assert res.status_code == 200
        assert res.json()["status"] == "ok"


# ============================================================
# 認証
# ============================================================


class TestAuth:
    def test_unauthorized_no_key(self, client):
        res = client.get("/api/candidates")
        assert res.status_code == 401

    def test_unauthorized_wrong_key(self, client):
        res = client.get("/api/candidates", headers={"X-API-Key": "wrong-key"})
        assert res.status_code == 401

    def test_authorized(self, client, api_key):
        res = client.get("/api/candidates", headers={"X-API-Key": api_key})
        assert res.status_code == 200


# ============================================================
# 候補者API
# ============================================================


class TestCandidatesAPI:
    def test_list_candidates(self, client, api_key):
        res = client.get("/api/candidates", headers={"X-API-Key": api_key})
        assert res.status_code == 200
        data = res.json()
        assert data["total"] == 2
        assert len(data["data"]) == 2

    def test_list_candidates_with_status(self, client, api_key):
        res = client.get(
            "/api/candidates?status=PENDING", headers={"X-API-Key": api_key}
        )
        assert res.status_code == 200


# ============================================================
# 求人API
# ============================================================


class TestJobsAPI:
    def test_list_jobs(self, client, api_key):
        res = client.get("/api/jobs", headers={"X-API-Key": api_key})
        assert res.status_code == 200
        data = res.json()
        assert data["total"] == 1

    def test_create_job(self, client, api_key):
        body = {
            "施設名": "テスト施設",
            "施設形態": "特別養護老人ホーム",
            "所在地_都道府県": "東京都",
            "所在地_市区町村": "渋谷区",
            "募集職種": "介護職",
            "雇用形態": "正社員",
            "給与_月額下限": 22,
            "給与_月額上限": 28,
        }
        res = client.post(
            "/api/jobs",
            json=body,
            headers={"X-API-Key": api_key},
        )
        assert res.status_code == 200
        assert "求人ID" in res.json()


# ============================================================
# マッチング結果API
# ============================================================


class TestMatchResultsAPI:
    def test_get_results(self, client, api_key):
        res = client.get(
            "/api/match/C-2/results", headers={"X-API-Key": api_key}
        )
        assert res.status_code == 200
        data = res.json()
        assert data["candidate_id"] == "C-2"
        assert len(data["results"]) == 1

    def test_get_results_not_found(self, client, api_key, mock_sheets):
        mock_sheets.get_match_results.return_value = []
        res = client.get(
            "/api/match/C-999/results", headers={"X-API-Key": api_key}
        )
        assert res.status_code == 404


# ============================================================
# 管理画面
# ============================================================


class TestAdminPage:
    def test_admin_page_loads(self, client):
        res = client.get("/api/admin")
        assert res.status_code == 200
        assert "管理画面" in res.text

    def test_admin_login_success(self, client):
        res = client.post(
            "/api/admin/login",
            json={"password": settings.admin_password},
        )
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "ok"
        assert data["api_key"] == settings.api_secret_key

    def test_admin_login_failure(self, client):
        res = client.post(
            "/api/admin/login",
            json={"password": "wrong-password"},
        )
        assert res.status_code == 401
