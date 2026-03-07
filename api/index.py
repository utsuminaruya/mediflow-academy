import os
import sys
from pathlib import Path

# lib/ をインポートパスに追加
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI, HTTPException, Header, Request, Response
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates

from lib.claude_client import ClaudeClient
from lib.config import settings
from lib.matching import MatchingEngine
from lib.models import (
    JobCreateRequest,
    MatchRequest,
    MatchResponse,
    MatchStatusUpdate,
    RecommendRequest,
    RecommendResponse,
)
from lib.scoring import RuleBasedScorer
from lib.sheets import SheetsClient

app = FastAPI(title="介護人材AIマッチングAPI", version="1.0.0")

templates_dir = Path(__file__).resolve().parent.parent / "templates"
templates = Jinja2Templates(directory=str(templates_dir))


# --- 依存性ヘルパー ---


def _get_sheets() -> SheetsClient:
    return SheetsClient(
        credentials_json=settings.google_service_account_json,
        candidate_sheet_id=settings.candidate_sheet_id,
        job_sheet_id=settings.job_sheet_id,
        results_sheet_id=settings.match_results_sheet_id,
    )


def _get_claude() -> ClaudeClient:
    return ClaudeClient()


def _get_engine() -> MatchingEngine:
    return MatchingEngine(_get_sheets(), _get_claude(), RuleBasedScorer())


def _verify_api_key(x_api_key: str | None) -> None:
    if x_api_key != settings.api_secret_key:
        raise HTTPException(status_code=401, detail="Invalid API key")


# --- ヘルスチェック ---


@app.get("/api/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}


# --- マッチング ---


@app.post("/api/match", response_model=MatchResponse)
async def trigger_matching(
    req: MatchRequest,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    try:
        engine = _get_engine()
        return engine.match_candidate(
            req.candidate_id, req.top_n, req.use_ai_scoring
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"マッチング処理エラー: {str(e)}")


@app.get("/api/match/{candidate_id}/results")
async def get_match_results(
    candidate_id: str,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    sheets = _get_sheets()
    results = sheets.get_match_results(candidate_id)
    if not results:
        raise HTTPException(status_code=404, detail="マッチング結果がありません")
    return {"candidate_id": candidate_id, "results": results}


# --- 候補者 ---


@app.get("/api/candidates")
async def list_candidates(
    page: int = 1,
    per_page: int = 20,
    status: str | None = None,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    sheets = _get_sheets()
    return sheets.get_candidates(page, per_page, status)


# --- 求人 ---


@app.get("/api/jobs")
async def list_jobs(
    page: int = 1,
    per_page: int = 20,
    status: str = "ACTIVE",
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    sheets = _get_sheets()
    return sheets.get_jobs(page, per_page, status)


@app.post("/api/jobs")
async def create_job(
    req: JobCreateRequest,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    sheets = _get_sheets()

    job_data = {
        "施設名": req.facility_name,
        "施設形態": req.facility_type,
        "所在地_都道府県": req.prefecture,
        "所在地_市区町村": req.city,
        "所在地_詳細": req.address,
        "募集職種": req.position,
        "必須資格": req.required_qualifications,
        "歓迎資格": req.preferred_qualifications,
        "必要経験年数": req.required_experience,
        "雇用形態": req.employment_type,
        "給与_月額下限": req.salary_min,
        "給与_月額上限": req.salary_max,
        "シフト": req.shifts,
        "福利厚生": req.benefits,
        "施設紹介文": req.description,
        "求める人物像": req.ideal_candidate,
        "定員・規模": req.capacity,
        "職員数": req.staff_count,
        "特徴・アピールポイント": req.features,
        "担当者名": req.contact_name,
        "担当者メール": req.contact_email,
    }

    try:
        result = sheets.add_job(job_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"求人登録エラー: {str(e)}")


# --- マッチングステータス更新 ---


@app.patch("/api/match/status")
async def update_match_status(
    req: MatchStatusUpdate,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    valid_statuses = [
        "suggested",
        "contacted_candidate",
        "contacted_facility",
        "interview_scheduled",
        "offered",
        "placed",
        "rejected",
    ]
    if req.status not in valid_statuses:
        raise HTTPException(
            status_code=400, detail=f"無効なステータス。有効値: {valid_statuses}"
        )
    sheets = _get_sheets()
    ok = sheets.update_match_status(req.result_id, req.status)
    if not ok:
        raise HTTPException(status_code=404, detail="マッチング結果が見つかりません")
    return {"result_id": req.result_id, "status": req.status}


# --- 推薦文生成 ---


@app.post("/api/recommend", response_model=RecommendResponse)
async def generate_recommendation(
    req: RecommendRequest,
    x_api_key: str | None = Header(None),
):
    _verify_api_key(x_api_key)
    try:
        engine = _get_engine()
        return engine.generate_recommendation(
            req.candidate_id, req.job_id, req.tone, req.emphasis
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"推薦文生成エラー: {str(e)}")


# --- 管理画面 ---


@app.get("/api/admin", response_class=HTMLResponse)
async def admin_page(request: Request):
    return templates.TemplateResponse(
        request,
        "admin.html",
        {
            "config": {
                "qualifications": settings.QUALIFICATIONS,
                "facility_types": settings.FACILITY_TYPES,
                "shift_patterns": settings.SHIFT_PATTERNS,
                "employment_types": settings.EMPLOYMENT_TYPES,
                "prefectures": settings.PREFECTURES,
            },
        },
    )


# --- 管理画面用API（APIキーをクッキーで認証） ---


@app.post("/api/admin/login")
async def admin_login(request: Request):
    body = await request.json()
    password = body.get("password", "")
    if password != settings.admin_password:
        raise HTTPException(status_code=401, detail="パスワードが違います")

    return JSONResponse({"status": "ok", "api_key": settings.api_secret_key})
