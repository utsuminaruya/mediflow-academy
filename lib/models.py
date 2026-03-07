from pydantic import BaseModel, Field
from typing import Optional


# --- 候補者 ---
class Candidate(BaseModel):
    candidate_id: str = Field(..., alias="候補者ID")
    name: str = Field(..., alias="氏名")
    furigana: str = Field("", alias="フリガナ")
    email: str = Field("", alias="メールアドレス")
    phone: str = Field("", alias="電話番号")
    birth_date: str = Field("", alias="生年月日")
    prefecture: str = Field("", alias="現住所_都道府県")
    city: str = Field("", alias="現住所_市区町村")
    qualifications: str = Field("", alias="保有資格")
    experience_years: int | str = Field(0, alias="経験年数")
    desired_prefectures: str = Field("", alias="希望勤務地_都道府県")
    desired_city: str = Field("", alias="希望勤務地_市区町村")
    employment_type: str = Field("", alias="希望雇用形態")
    desired_salary_min: int | str = Field(0, alias="希望給与_月額下限")
    desired_shifts: str = Field("", alias="希望シフト")
    desired_facility_types: str = Field("", alias="希望施設形態")
    special_skills: str = Field("", alias="特技・得意分野")
    reason_for_change: str = Field("", alias="転職理由")
    other_preferences: str = Field("", alias="その他希望条件")
    matching_status: str = Field("PENDING", alias="マッチング状態")

    model_config = {"populate_by_name": True}

    def qualifications_list(self) -> list[str]:
        if not self.qualifications:
            return []
        return [q.strip() for q in self.qualifications.split(",") if q.strip()]

    def desired_prefectures_list(self) -> list[str]:
        if not self.desired_prefectures:
            return []
        return [p.strip() for p in self.desired_prefectures.split(",") if p.strip()]

    def desired_shifts_list(self) -> list[str]:
        if not self.desired_shifts:
            return []
        return [s.strip() for s in self.desired_shifts.split(",") if s.strip()]

    def desired_facility_types_list(self) -> list[str]:
        if not self.desired_facility_types:
            return []
        return [f.strip() for f in self.desired_facility_types.split(",") if f.strip()]

    def experience_years_int(self) -> int:
        try:
            val = str(self.experience_years).replace("+", "").strip()
            return int(val) if val else 0
        except (ValueError, TypeError):
            return 0

    def desired_salary_min_int(self) -> int:
        try:
            val = str(self.desired_salary_min).replace("+", "").replace("万円", "").strip()
            return int(val) if val else 0
        except (ValueError, TypeError):
            return 0


# --- 求人 ---
class Job(BaseModel):
    job_id: str = Field(..., alias="求人ID")
    facility_name: str = Field(..., alias="施設名")
    facility_type: str = Field("", alias="施設形態")
    prefecture: str = Field("", alias="所在地_都道府県")
    city: str = Field("", alias="所在地_市区町村")
    address: str = Field("", alias="所在地_詳細")
    position: str = Field("", alias="募集職種")
    required_qualifications: str = Field("", alias="必須資格")
    preferred_qualifications: str = Field("", alias="歓迎資格")
    required_experience: int | str = Field(0, alias="必要経験年数")
    employment_type: str = Field("", alias="雇用形態")
    salary_min: int | str = Field(0, alias="給与_月額下限")
    salary_max: int | str = Field(0, alias="給与_月額上限")
    shifts: str = Field("", alias="シフト")
    benefits: str = Field("", alias="福利厚生")
    description: str = Field("", alias="施設紹介文")
    ideal_candidate: str = Field("", alias="求める人物像")
    capacity: str = Field("", alias="定員・規模")
    staff_count: int | str = Field(0, alias="職員数")
    features: str = Field("", alias="特徴・アピールポイント")
    status: str = Field("ACTIVE", alias="掲載状態")
    registered_date: str = Field("", alias="登録日")
    contact_name: str = Field("", alias="担当者名")
    contact_email: str = Field("", alias="担当者メール")

    model_config = {"populate_by_name": True}

    def required_qualifications_list(self) -> list[str]:
        if not self.required_qualifications:
            return []
        return [q.strip() for q in self.required_qualifications.split(",") if q.strip()]

    def preferred_qualifications_list(self) -> list[str]:
        if not self.preferred_qualifications:
            return []
        return [q.strip() for q in self.preferred_qualifications.split(",") if q.strip()]

    def required_experience_int(self) -> int:
        try:
            val = str(self.required_experience).replace("+", "").strip()
            return int(val) if val else 0
        except (ValueError, TypeError):
            return 0

    def salary_min_int(self) -> int:
        try:
            val = str(self.salary_min).replace("万円", "").strip()
            return int(val) if val else 0
        except (ValueError, TypeError):
            return 0

    def salary_max_int(self) -> int:
        try:
            val = str(self.salary_max).replace("万円", "").strip()
            return int(val) if val else 0
        except (ValueError, TypeError):
            return 0

    def shifts_list(self) -> list[str]:
        if not self.shifts:
            return []
        return [s.strip() for s in self.shifts.split(",") if s.strip()]


# --- APIリクエスト/レスポンス ---
class MatchRequest(BaseModel):
    candidate_id: str
    top_n: int = Field(default=10, ge=1, le=20)
    use_ai_scoring: bool = True


class ScoreBreakdown(BaseModel):
    qualification: float = 0
    location: float = 0
    salary: float = 0
    shift: float = 0
    experience: float = 0
    facility_type: float = 0
    ai_career_fit: float = 0
    ai_culture_fit: float = 0
    ai_skills_value: float = 0
    ai_growth_potential: float = 0


class MatchResult(BaseModel):
    job_id: str
    facility_name: str
    facility_type: str = ""
    prefecture: str = ""
    position: str = ""
    employment_type: str = ""
    salary_range: str = ""
    total_score: float
    rule_score: float
    ai_score: float
    score_breakdown: ScoreBreakdown
    ai_comment: str = ""
    ai_concerns: str = ""
    match_status: str = "suggested"
    match_rank: int


class MatchResponse(BaseModel):
    candidate_id: str
    candidate_name: str
    total_jobs_evaluated: int
    jobs_passed_filters: int
    matches: list[MatchResult]
    processing_time_seconds: float
    timestamp: str


class JobCreateRequest(BaseModel):
    facility_name: str = Field(..., alias="施設名")
    facility_type: str = Field("", alias="施設形態")
    prefecture: str = Field("", alias="所在地_都道府県")
    city: str = Field("", alias="所在地_市区町村")
    address: str = Field("", alias="所在地_詳細")
    position: str = Field("", alias="募集職種")
    required_qualifications: str = Field("", alias="必須資格")
    preferred_qualifications: str = Field("", alias="歓迎資格")
    required_experience: int = Field(0, alias="必要経験年数")
    employment_type: str = Field("", alias="雇用形態")
    salary_min: int = Field(0, alias="給与_月額下限")
    salary_max: int = Field(0, alias="給与_月額上限")
    shifts: str = Field("", alias="シフト")
    benefits: str = Field("", alias="福利厚生")
    description: str = Field("", alias="施設紹介文")
    ideal_candidate: str = Field("", alias="求める人物像")
    capacity: str = Field("", alias="定員・規模")
    staff_count: int = Field(0, alias="職員数")
    features: str = Field("", alias="特徴・アピールポイント")
    contact_name: str = Field("", alias="担当者名")
    contact_email: str = Field("", alias="担当者メール")

    model_config = {"populate_by_name": True}


class RecommendRequest(BaseModel):
    candidate_id: str
    job_id: str
    tone: str = "formal"
    emphasis: list[str] = Field(default_factory=list)


class MatchStatusUpdate(BaseModel):
    result_id: str
    status: str  # suggested / contacted_candidate / contacted_facility / interview_scheduled / offered / placed / rejected


class RecommendResponse(BaseModel):
    candidate_id: str
    job_id: str
    recommendation_letter: str
    generated_at: str
