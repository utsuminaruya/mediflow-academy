import time
from datetime import datetime

from lib.claude_client import ClaudeClient
from lib.models import (
    Candidate,
    Job,
    MatchResponse,
    MatchResult,
    RecommendResponse,
    ScoreBreakdown,
)
from lib.scoring import RuleBasedScorer
from lib.sheets import SheetsClient


class MatchingEngine:
    """マッチングパイプライン全体を統合するオーケストレーター"""

    def __init__(
        self,
        sheets: SheetsClient,
        claude: ClaudeClient,
        scorer: RuleBasedScorer,
    ):
        self.sheets = sheets
        self.claude = claude
        self.scorer = scorer

    def match_candidate(
        self,
        candidate_id: str,
        top_n: int = 10,
        use_ai: bool = True,
    ) -> MatchResponse:
        start_time = time.time()

        # Step 1: データ取得
        candidate = self.sheets.get_candidate_by_id(candidate_id)
        if not candidate:
            raise ValueError(f"候補者 {candidate_id} が見つかりません")

        jobs = self.sheets.get_all_active_jobs()
        total_jobs = len(jobs)

        if not jobs:
            return MatchResponse(
                candidate_id=candidate_id,
                candidate_name=candidate.name,
                total_jobs_evaluated=0,
                jobs_passed_filters=0,
                matches=[],
                processing_time_seconds=round(time.time() - start_time, 1),
                timestamp=datetime.now().isoformat(),
            )

        # Step 2: ハードフィルター
        filtered_jobs = self.scorer.apply_hard_filters(candidate, jobs)
        filtered_count = len(filtered_jobs)

        # Step 3: ルールベーススコアリング
        scored_jobs: list[dict] = []
        for job in filtered_jobs:
            rule_score = self.scorer.calculate_score(candidate, job)
            breakdown = self.scorer.calculate_score_breakdown(candidate, job)
            scored_jobs.append({
                "job": job,
                "rule_score": rule_score,
                "breakdown": breakdown,
            })

        # ルールベーススコアで降順ソート
        scored_jobs.sort(key=lambda x: x["rule_score"], reverse=True)

        # AI分析対象はtop_n件まで
        top_for_ai = scored_jobs[: min(top_n, 10)]

        # Step 4: AI分析
        if use_ai and top_for_ai:
            self._apply_ai_scoring(candidate, top_for_ai)
        else:
            for item in top_for_ai:
                item["ai_score"] = 20.0
                item["ai_detail"] = {
                    "career_fit": 5,
                    "culture_fit": 5,
                    "skills_value": 5,
                    "growth_potential": 5,
                    "comment": "",
                    "concerns": "",
                }

        # Step 5: 総合スコア計算・ランキング
        matches: list[MatchResult] = []
        for item in top_for_ai:
            job: Job = item["job"]
            ai_detail = item.get("ai_detail", {})
            total = self.scorer.combined_score(
                item["rule_score"], item.get("ai_score", 20.0)
            )

            salary_range = ""
            s_min = job.salary_min_int()
            s_max = job.salary_max_int()
            if s_min and s_max:
                salary_range = f"{s_min}〜{s_max}万円"
            elif s_min:
                salary_range = f"{s_min}万円〜"
            elif s_max:
                salary_range = f"〜{s_max}万円"

            breakdown = item["breakdown"]
            matches.append(
                MatchResult(
                    job_id=job.job_id,
                    facility_name=job.facility_name,
                    facility_type=job.facility_type,
                    prefecture=job.prefecture,
                    position=job.position,
                    employment_type=job.employment_type,
                    salary_range=salary_range,
                    total_score=total,
                    rule_score=round(item["rule_score"], 1),
                    ai_score=round(item.get("ai_score", 20.0), 1),
                    score_breakdown=ScoreBreakdown(
                        qualification=breakdown["qualification"],
                        location=breakdown["location"],
                        salary=breakdown["salary"],
                        shift=breakdown["shift"],
                        experience=breakdown["experience"],
                        facility_type=breakdown["facility_type"],
                        ai_career_fit=ai_detail.get("career_fit", 5),
                        ai_culture_fit=ai_detail.get("culture_fit", 5),
                        ai_skills_value=ai_detail.get("skills_value", 5),
                        ai_growth_potential=ai_detail.get("growth_potential", 5),
                    ),
                    ai_comment=ai_detail.get("comment", ""),
                    ai_concerns=ai_detail.get("concerns", ""),
                    match_status="suggested",
                    match_rank=0,
                )
            )

        # 総合スコアで再ソート
        matches.sort(key=lambda m: m.total_score, reverse=True)
        for i, m in enumerate(matches):
            m.match_rank = i + 1

        elapsed = time.time() - start_time

        # Step 6: 結果保存
        now = datetime.now().isoformat()
        self._save_results(candidate_id, matches, now)

        # 候補者ステータス更新
        self.sheets.update_candidate_status(candidate_id, "COMPLETED")

        return MatchResponse(
            candidate_id=candidate_id,
            candidate_name=candidate.name,
            total_jobs_evaluated=total_jobs,
            jobs_passed_filters=filtered_count,
            matches=matches[:top_n],
            processing_time_seconds=round(elapsed, 1),
            timestamp=now,
        )

    def generate_recommendation(
        self,
        candidate_id: str,
        job_id: str,
        tone: str = "formal",
        emphasis: list[str] | None = None,
    ) -> RecommendResponse:
        candidate = self.sheets.get_candidate_by_id(candidate_id)
        if not candidate:
            raise ValueError(f"候補者 {candidate_id} が見つかりません")

        job = self.sheets.get_job_by_id(job_id)
        if not job:
            raise ValueError(f"求人 {job_id} が見つかりません")

        # マッチング結果からスコアを取得
        results = self.sheets.get_match_results(candidate_id)
        total_score = 0.0
        for r in results:
            if r.get("求人ID") == job_id:
                total_score = float(r.get("総合スコア", 0))
                break

        # スコアがなければルールベースで計算
        if not total_score:
            total_score = self.scorer.calculate_score(candidate, job) + 20

        letter = self.claude.generate_recommendation(
            candidate_name=candidate.name,
            qualifications=candidate.qualifications,
            experience=candidate.experience_years_int(),
            skills=candidate.special_skills,
            reason=candidate.reason_for_change,
            facility_name=job.facility_name,
            facility_type=job.facility_type,
            position=job.position,
            features=job.features,
            ideal_candidate=job.ideal_candidate,
            total_score=total_score,
            emphasis=emphasis,
        )

        return RecommendResponse(
            candidate_id=candidate_id,
            job_id=job_id,
            recommendation_letter=letter,
            generated_at=datetime.now().isoformat(),
        )

    def _apply_ai_scoring(
        self, candidate: Candidate, scored_jobs: list[dict]
    ):
        """Claude APIでAI分析を実行（5件ずつバッチ）"""
        batch_size = 5

        for i in range(0, len(scored_jobs), batch_size):
            batch = scored_jobs[i : i + batch_size]

            jobs_for_api = [
                {
                    "id": item["job"].job_id,
                    "facility_name": item["job"].facility_name,
                    "facility_type": item["job"].facility_type,
                    "position": item["job"].position,
                    "description": item["job"].description,
                    "ideal_candidate": item["job"].ideal_candidate,
                    "features": item["job"].features,
                }
                for item in batch
            ]

            if len(jobs_for_api) == 1:
                ai_results = [
                    self.claude.analyze_match_single(
                        candidate_name=candidate.name,
                        candidate_qualifications=candidate.qualifications,
                        candidate_experience=candidate.experience_years_int(),
                        candidate_skills=candidate.special_skills,
                        candidate_reason=candidate.reason_for_change,
                        candidate_preferences=candidate.other_preferences,
                        job=jobs_for_api[0],
                    )
                ]
            else:
                ai_results = self.claude.analyze_matches_batch(
                    candidate_name=candidate.name,
                    candidate_qualifications=candidate.qualifications,
                    candidate_experience=candidate.experience_years_int(),
                    candidate_skills=candidate.special_skills,
                    candidate_reason=candidate.reason_for_change,
                    candidate_preferences=candidate.other_preferences,
                    jobs=jobs_for_api,
                )

            # 結果をマージ
            for j, ai_result in enumerate(ai_results):
                if j < len(batch):
                    ai_score = (
                        ai_result.get("career_fit", 5)
                        + ai_result.get("culture_fit", 5)
                        + ai_result.get("skills_value", 5)
                        + ai_result.get("growth_potential", 5)
                    )
                    batch[j]["ai_score"] = ai_score
                    batch[j]["ai_detail"] = ai_result

    def _save_results(
        self,
        candidate_id: str,
        matches: list[MatchResult],
        timestamp: str,
    ):
        results_to_save = []
        for m in matches:
            results_to_save.append(
                {
                    "result_id": f"M-{candidate_id}-{m.job_id}",
                    "candidate_id": candidate_id,
                    "job_id": m.job_id,
                    "total_score": m.total_score,
                    "rule_score": m.rule_score,
                    "ai_score": m.ai_score,
                    "score_breakdown": m.score_breakdown.model_dump(),
                    "ai_comment": m.ai_comment,
                    "timestamp": timestamp,
                }
            )

        if results_to_save:
            self.sheets.save_match_results(results_to_save)
