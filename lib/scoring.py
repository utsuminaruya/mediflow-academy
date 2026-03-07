from lib.models import Candidate, Job


# 関連施設マッピング（部分クレジット用）
RELATED_FACILITY_TYPES: dict[str, list[str]] = {
    "特別養護老人ホーム": ["介護老人保健施設", "有料老人ホーム"],
    "介護老人保健施設": ["特別養護老人ホーム", "病院・クリニック"],
    "有料老人ホーム": ["サービス付き高齢者向け住宅", "特別養護老人ホーム"],
    "グループホーム": ["小規模多機能型居宅介護"],
    "デイサービス": ["小規模多機能型居宅介護"],
    "訪問介護": ["小規模多機能型居宅介護"],
    "小規模多機能型居宅介護": ["グループホーム", "デイサービス", "訪問介護"],
    "サービス付き高齢者向け住宅": ["有料老人ホーム"],
    "病院・クリニック": ["介護老人保健施設"],
}


class RuleBasedScorer:
    """ルールベーススコアリング: ハードフィルター + 6次元スコア（最大60点）"""

    # --- ハードフィルター ---

    def passes_hard_filters(self, candidate: Candidate, job: Job) -> bool:
        # 1. 資格ゲート
        if not self._passes_qualification_gate(candidate, job):
            return False

        # 2. 雇用形態ゲート
        if not self._passes_employment_gate(candidate, job):
            return False

        # 3. 勤務地ゲート
        if not self._passes_location_gate(candidate, job):
            return False

        return True

    def _passes_qualification_gate(self, candidate: Candidate, job: Job) -> bool:
        required = job.required_qualifications_list()
        if not required:
            return True
        if "無資格" in required:
            return True

        candidate_quals = set(candidate.qualifications_list())
        required_set = set(required)
        return bool(candidate_quals & required_set)

    def _passes_employment_gate(self, candidate: Candidate, job: Job) -> bool:
        c_type = candidate.employment_type
        j_type = job.employment_type

        if not c_type or not j_type:
            return True

        if c_type == j_type:
            return True

        # 正社員希望者は契約社員も許容
        if c_type == "正社員" and j_type == "契約社員":
            return True

        return False

    def _passes_location_gate(self, candidate: Candidate, job: Job) -> bool:
        desired = candidate.desired_prefectures_list()
        if not desired:
            return True  # 勤務地希望なし → 全地域OK
        return job.prefecture in desired

    # --- フィルター適用 ---

    def apply_hard_filters(
        self, candidate: Candidate, jobs: list[Job]
    ) -> list[Job]:
        return [j for j in jobs if self.passes_hard_filters(candidate, j)]

    # --- 次元別スコアリング ---

    def score_qualification(self, candidate: Candidate, job: Job) -> float:
        """資格マッチ: 最大15点"""
        c_quals = candidate.qualifications_list()
        required = job.required_qualifications_list()
        preferred = job.preferred_qualifications_list()

        if not required:
            base = 10.0
        else:
            matched = len(set(c_quals) & set(required))
            base = (matched / len(required)) * 10.0

        if preferred:
            matched_pref = len(set(c_quals) & set(preferred))
            bonus = (matched_pref / len(preferred)) * 5.0
        else:
            bonus = 2.5

        return min(base + bonus, 15.0)

    def score_location(self, candidate: Candidate, job: Job) -> float:
        """勤務地マッチ: 最大12点"""
        desired = candidate.desired_prefectures_list()
        if not desired:
            return 8.0  # 希望なし → やや高めのデフォルト

        if job.prefecture not in desired:
            return 0.0

        score = 8.0  # 都道府県一致

        c_city = candidate.desired_city
        j_city = job.city

        if c_city and j_city:
            if c_city == j_city:
                score += 4.0
            elif c_city in j_city or j_city in c_city:
                score += 2.0
        else:
            score += 2.0  # 市区町村指定なし → 中間ボーナス

        return min(score, 12.0)

    def score_salary(self, candidate: Candidate, job: Job) -> float:
        """給与マッチ: 最大12点"""
        c_min = candidate.desired_salary_min_int()
        j_min = job.salary_min_int()
        j_max = job.salary_max_int()

        if not c_min:
            return 8.0  # 給与希望なし

        # 求人の上限が候補者の希望以上
        if j_max and j_max >= c_min:
            if j_min >= c_min:
                return 12.0  # 下限すら候補者の希望以上
            diff = j_max - j_min
            if diff > 0:
                overlap = (j_max - c_min) / diff
                return max(6.0 + overlap * 6.0, 6.0)
            return 12.0

        # 求人の下限が候補者の希望以上
        if j_min and j_min >= c_min:
            return 12.0

        # 求人が候補者の希望未満
        if j_max:
            gap = c_min - j_max
            if gap <= 2:
                return 4.0  # 2万円以内なら検討余地あり
        elif j_min:
            gap = c_min - j_min
            if gap <= 2:
                return 4.0

        return 0.0

    def score_shift(self, candidate: Candidate, job: Job) -> float:
        """シフトマッチ: 最大9点"""
        c_shifts = set(candidate.desired_shifts_list())
        j_shifts = set(job.shifts_list())

        if not c_shifts or not j_shifts:
            return 6.0  # 指定なし → 中間

        union = c_shifts | j_shifts
        intersection = c_shifts & j_shifts

        if not union:
            return 6.0

        return (len(intersection) / len(union)) * 9.0

    def score_experience(self, candidate: Candidate, job: Job) -> float:
        """経験年数マッチ: 最大6点"""
        c_years = candidate.experience_years_int()
        required = job.required_experience_int()

        if required == 0:
            return 6.0

        if c_years >= required:
            return 6.0
        elif c_years >= required - 1:
            return 4.0
        elif c_years >= required - 2:
            return 2.0
        else:
            return 0.0

    def score_facility_type(self, candidate: Candidate, job: Job) -> float:
        """施設形態マッチ: 最大6点"""
        preferred_types = candidate.desired_facility_types_list()

        if not preferred_types:
            return 4.0  # 希望なし → やや高めのデフォルト

        if job.facility_type in preferred_types:
            return 6.0

        # 関連施設チェック
        for pref in preferred_types:
            related = RELATED_FACILITY_TYPES.get(pref, [])
            if job.facility_type in related:
                return 3.0

        return 0.0

    # --- 総合スコア ---

    def calculate_score(self, candidate: Candidate, job: Job) -> float:
        """ルールベーススコア合計: 最大60点"""
        return (
            self.score_qualification(candidate, job)
            + self.score_location(candidate, job)
            + self.score_salary(candidate, job)
            + self.score_shift(candidate, job)
            + self.score_experience(candidate, job)
            + self.score_facility_type(candidate, job)
        )

    def calculate_score_breakdown(
        self, candidate: Candidate, job: Job
    ) -> dict[str, float]:
        """スコア内訳を辞書で返す"""
        return {
            "qualification": round(self.score_qualification(candidate, job), 1),
            "location": round(self.score_location(candidate, job), 1),
            "salary": round(self.score_salary(candidate, job), 1),
            "shift": round(self.score_shift(candidate, job), 1),
            "experience": round(self.score_experience(candidate, job), 1),
            "facility_type": round(self.score_facility_type(candidate, job), 1),
        }

    @staticmethod
    def combined_score(rule_score: float, ai_score: float) -> float:
        """
        ルールベース(0-60) + AIスコア(0-40) → 総合スコア(0-100)
        ルールベースが20点未満の場合、55点でキャップ
        """
        combined = rule_score + ai_score

        if rule_score < 20 and ai_score > 25:
            combined = min(combined, 55.0)

        return round(combined, 1)
