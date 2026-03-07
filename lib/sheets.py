import json
from datetime import datetime

import gspread
from cachetools import TTLCache
from google.oauth2.service_account import Credentials

from lib.models import Candidate, Job


class SheetsClient:
    """Google Sheets CRUD with 60-second TTL cache."""

    _cache = TTLCache(maxsize=100, ttl=60)

    SCOPES = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.readonly",
    ]

    def __init__(
        self,
        credentials_json: str,
        candidate_sheet_id: str,
        job_sheet_id: str,
        results_sheet_id: str,
    ):
        creds_dict = json.loads(credentials_json)
        creds = Credentials.from_service_account_info(creds_dict, scopes=self.SCOPES)
        self.gc = gspread.authorize(creds)
        self.candidate_sheet_id = candidate_sheet_id
        self.job_sheet_id = job_sheet_id
        self.results_sheet_id = results_sheet_id

    def _get_all_records(self, sheet_id: str, worksheet_index: int = 0) -> list[dict]:
        cache_key = f"{sheet_id}:{worksheet_index}"
        if cache_key in self._cache:
            return self._cache[cache_key]

        sh = self.gc.open_by_key(sheet_id)
        ws = sh.get_worksheet(worksheet_index)
        records = ws.get_all_records()
        self._cache[cache_key] = records
        return records

    def _invalidate_cache(self, sheet_id: str, worksheet_index: int = 0):
        cache_key = f"{sheet_id}:{worksheet_index}"
        self._cache.pop(cache_key, None)

    # --- 候補者 ---

    def get_candidates(
        self, page: int = 1, per_page: int = 20, status: str | None = None
    ) -> dict:
        records = self._get_all_records(self.candidate_sheet_id)

        # 候補者IDがないレコードにIDを付与
        for i, r in enumerate(records):
            if not r.get("候補者ID"):
                r["候補者ID"] = f"C-{i + 2}"

        if status:
            records = [r for r in records if r.get("マッチング状態") == status]

        start = (page - 1) * per_page
        return {
            "total": len(records),
            "page": page,
            "per_page": per_page,
            "data": records[start : start + per_page],
        }

    def get_candidate_by_id(self, candidate_id: str) -> Candidate | None:
        records = self._get_all_records(self.candidate_sheet_id)
        for i, r in enumerate(records):
            if not r.get("候補者ID"):
                r["候補者ID"] = f"C-{i + 2}"
            if r.get("候補者ID") == candidate_id:
                return Candidate(**r)
        return None

    # --- 求人 ---

    def get_jobs(
        self, page: int = 1, per_page: int = 20, status: str = "ACTIVE"
    ) -> dict:
        records = self._get_all_records(self.job_sheet_id)

        for i, r in enumerate(records):
            if not r.get("求人ID"):
                r["求人ID"] = f"J-{i + 2}"

        if status:
            records = [r for r in records if r.get("掲載状態") == status]

        start = (page - 1) * per_page
        return {
            "total": len(records),
            "page": page,
            "per_page": per_page,
            "data": records[start : start + per_page],
        }

    def get_all_active_jobs(self) -> list[Job]:
        records = self._get_all_records(self.job_sheet_id)
        jobs = []
        for i, r in enumerate(records):
            if not r.get("求人ID"):
                r["求人ID"] = f"J-{i + 2}"
            if r.get("掲載状態", "ACTIVE") == "ACTIVE":
                jobs.append(Job(**r))
        return jobs

    def get_job_by_id(self, job_id: str) -> Job | None:
        records = self._get_all_records(self.job_sheet_id)
        for i, r in enumerate(records):
            if not r.get("求人ID"):
                r["求人ID"] = f"J-{i + 2}"
            if r.get("求人ID") == job_id:
                return Job(**r)
        return None

    def add_job(self, job_data: dict) -> dict:
        sh = self.gc.open_by_key(self.job_sheet_id)
        ws = sh.get_worksheet(0)
        existing = ws.get_all_records()
        new_id = f"J-{len(existing) + 2}"

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        row = [
            new_id,
            job_data.get("施設名", ""),
            job_data.get("施設形態", ""),
            job_data.get("所在地_都道府県", ""),
            job_data.get("所在地_市区町村", ""),
            job_data.get("所在地_詳細", ""),
            job_data.get("募集職種", ""),
            job_data.get("必須資格", ""),
            job_data.get("歓迎資格", ""),
            job_data.get("必要経験年数", 0),
            job_data.get("雇用形態", ""),
            job_data.get("給与_月額下限", 0),
            job_data.get("給与_月額上限", 0),
            job_data.get("シフト", ""),
            job_data.get("福利厚生", ""),
            job_data.get("施設紹介文", ""),
            job_data.get("求める人物像", ""),
            job_data.get("定員・規模", ""),
            job_data.get("職員数", 0),
            job_data.get("特徴・アピールポイント", ""),
            "ACTIVE",
            now,
            job_data.get("担当者名", ""),
            job_data.get("担当者メール", ""),
        ]

        ws.append_row(row, value_input_option="USER_ENTERED")
        self._invalidate_cache(self.job_sheet_id)

        return {"求人ID": new_id, "施設名": job_data.get("施設名", ""), "登録日": now}

    # --- マッチング結果 ---

    def get_match_results(self, candidate_id: str) -> list[dict]:
        records = self._get_all_records(self.results_sheet_id)
        return [r for r in records if r.get("候補者ID") == candidate_id]

    def save_match_results(self, results: list[dict]):
        sh = self.gc.open_by_key(self.results_sheet_id)
        ws = sh.get_worksheet(0)

        rows = []
        for r in results:
            rows.append(
                [
                    r["result_id"],
                    r["candidate_id"],
                    r["job_id"],
                    r["total_score"],
                    r["rule_score"],
                    r["ai_score"],
                    json.dumps(r.get("score_breakdown", {}), ensure_ascii=False),
                    r.get("ai_comment", ""),
                    r.get("recommendation", ""),
                    r["timestamp"],
                    "NEW",
                ]
            )

        if rows:
            ws.append_rows(rows, value_input_option="USER_ENTERED")

        self._invalidate_cache(self.results_sheet_id)

    def update_candidate_status(self, candidate_id: str, status: str):
        sh = self.gc.open_by_key(self.candidate_sheet_id)
        ws = sh.get_worksheet(0)
        header = ws.row_values(1)

        status_col = None
        timestamp_col = None
        id_col = None

        for i, h in enumerate(header, 1):
            if h == "マッチング状態":
                status_col = i
            elif h == "最終マッチング日時":
                timestamp_col = i
            elif h == "候補者ID":
                id_col = i

        if not id_col:
            return

        cell = ws.find(candidate_id, in_column=id_col)
        if cell:
            if status_col:
                ws.update_cell(cell.row, status_col, status)
            if timestamp_col:
                ws.update_cell(
                    cell.row,
                    timestamp_col,
                    datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                )

        self._invalidate_cache(self.candidate_sheet_id)

    def update_match_status(self, result_id: str, status: str) -> bool:
        """マッチング結果のステータスを更新する"""
        sh = self.gc.open_by_key(self.results_sheet_id)
        ws = sh.get_worksheet(0)
        header = ws.row_values(1)

        id_col = None
        status_col = None
        for i, h in enumerate(header, 1):
            if h == "結果ID":
                id_col = i
            elif h == "ステータス":
                status_col = i

        if not id_col:
            return False

        cell = ws.find(result_id, in_column=id_col)
        if cell and status_col:
            ws.update_cell(cell.row, status_col, status)
            self._invalidate_cache(self.results_sheet_id)
            return True
        return False

