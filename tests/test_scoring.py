import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest

from lib.models import Candidate, Job
from lib.scoring import RuleBasedScorer


def make_candidate(**overrides) -> Candidate:
    defaults = {
        "候補者ID": "C-1",
        "氏名": "テスト太郎",
        "保有資格": "介護福祉士, 介護職員実務者研修",
        "経験年数": 5,
        "希望勤務地_都道府県": "東京都, 神奈川県",
        "希望勤務地_市区町村": "横浜市",
        "希望雇用形態": "正社員",
        "希望給与_月額下限": 24,
        "希望シフト": "日勤のみ, 早番可",
        "希望施設形態": "特別養護老人ホーム, 有料老人ホーム",
        "特技・得意分野": "認知症ケア",
        "転職理由": "キャリアアップのため",
        "その他希望条件": "",
    }
    defaults.update(overrides)
    return Candidate(**defaults)


def make_job(**overrides) -> Job:
    defaults = {
        "求人ID": "J-1",
        "施設名": "テスト介護施設",
        "施設形態": "特別養護老人ホーム",
        "所在地_都道府県": "東京都",
        "所在地_市区町村": "世田谷区",
        "所在地_詳細": "",
        "募集職種": "介護職",
        "必須資格": "介護福祉士",
        "歓迎資格": "ケアマネジャー",
        "必要経験年数": 3,
        "雇用形態": "正社員",
        "給与_月額下限": 22,
        "給与_月額上限": 28,
        "シフト": "日勤のみ, 早番可, 遅番可",
        "福利厚生": "社保完備",
        "施設紹介文": "地域密着型の施設です",
        "求める人物像": "チームワークを大切にできる方",
        "定員・規模": "50名",
        "職員数": 30,
        "特徴・アピールポイント": "残業少なめ",
        "掲載状態": "ACTIVE",
        "登録日": "2026-01-01",
        "担当者名": "担当太郎",
        "担当者メール": "test@example.com",
    }
    defaults.update(overrides)
    return Job(**defaults)


@pytest.fixture
def scorer():
    return RuleBasedScorer()


# ============================================================
# ハードフィルター
# ============================================================


class TestHardFilters:
    def test_all_pass(self, scorer):
        c = make_candidate()
        j = make_job()
        assert scorer.passes_hard_filters(c, j) is True

    def test_qualification_gate_blocks(self, scorer):
        """必須資格を持っていない → 除外"""
        c = make_candidate(**{"保有資格": "介護職員初任者研修"})
        j = make_job(**{"必須資格": "介護福祉士"})
        assert scorer.passes_hard_filters(c, j) is False

    def test_qualification_gate_no_required(self, scorer):
        """必須資格なし → 通過"""
        c = make_candidate(**{"保有資格": "介護職員初任者研修"})
        j = make_job(**{"必須資格": ""})
        assert scorer.passes_hard_filters(c, j) is True

    def test_qualification_gate_mukaku(self, scorer):
        """無資格OKの求人 → 通過"""
        c = make_candidate(**{"保有資格": ""})
        j = make_job(**{"必須資格": "無資格"})
        assert scorer.passes_hard_filters(c, j) is True

    def test_employment_gate_blocks(self, scorer):
        """パート希望 vs 正社員求人 → 除外"""
        c = make_candidate(**{"希望雇用形態": "パート・アルバイト"})
        j = make_job(**{"雇用形態": "正社員"})
        assert scorer.passes_hard_filters(c, j) is False

    def test_employment_gate_seishain_to_keiyaku(self, scorer):
        """正社員希望 → 契約社員も許容"""
        c = make_candidate(**{"希望雇用形態": "正社員"})
        j = make_job(**{"雇用形態": "契約社員"})
        assert scorer.passes_hard_filters(c, j) is True

    def test_location_gate_blocks(self, scorer):
        """希望勤務地に含まれない → 除外"""
        c = make_candidate(**{"希望勤務地_都道府県": "大阪府"})
        j = make_job(**{"所在地_都道府県": "北海道"})
        assert scorer.passes_hard_filters(c, j) is False

    def test_location_gate_no_preference(self, scorer):
        """勤務地希望なし → 通過"""
        c = make_candidate(**{"希望勤務地_都道府県": ""})
        j = make_job(**{"所在地_都道府県": "北海道"})
        assert scorer.passes_hard_filters(c, j) is True

    def test_apply_hard_filters(self, scorer):
        """フィルター適用で複数求人をフィルタリング"""
        c = make_candidate(**{"保有資格": "介護福祉士"})
        j1 = make_job(**{"求人ID": "J-1", "必須資格": "介護福祉士"})
        j2 = make_job(**{"求人ID": "J-2", "必須資格": "看護師"})
        j3 = make_job(**{"求人ID": "J-3", "必須資格": ""})
        result = scorer.apply_hard_filters(c, [j1, j2, j3])
        ids = [j.job_id for j in result]
        assert "J-1" in ids
        assert "J-2" not in ids
        assert "J-3" in ids


# ============================================================
# 資格スコア
# ============================================================


class TestQualificationScoring:
    def test_full_match(self, scorer):
        """必須資格も歓迎資格も全一致 → 15点"""
        c = make_candidate(**{"保有資格": "介護福祉士, ケアマネジャー"})
        j = make_job(**{"必須資格": "介護福祉士", "歓迎資格": "ケアマネジャー"})
        assert scorer.score_qualification(c, j) == 15.0

    def test_required_only(self, scorer):
        """必須一致、歓迎なし → 10 + 2.5 = 12.5"""
        c = make_candidate(**{"保有資格": "介護福祉士"})
        j = make_job(**{"必須資格": "介護福祉士", "歓迎資格": ""})
        assert scorer.score_qualification(c, j) == 12.5

    def test_no_required(self, scorer):
        """必須資格なし → ベース10点"""
        c = make_candidate(**{"保有資格": "介護福祉士"})
        j = make_job(**{"必須資格": "", "歓迎資格": ""})
        assert scorer.score_qualification(c, j) == 12.5

    def test_partial_required(self, scorer):
        """必須2件中1件だけ一致"""
        c = make_candidate(**{"保有資格": "介護福祉士"})
        j = make_job(**{"必須資格": "介護福祉士, 看護師", "歓迎資格": ""})
        score = scorer.score_qualification(c, j)
        assert 5.0 <= score <= 10.0


# ============================================================
# 勤務地スコア
# ============================================================


class TestLocationScoring:
    def test_prefecture_match(self, scorer):
        """都道府県一致 → 8点以上"""
        c = make_candidate(**{"希望勤務地_都道府県": "東京都", "希望勤務地_市区町村": ""})
        j = make_job(**{"所在地_都道府県": "東京都", "所在地_市区町村": ""})
        assert scorer.score_location(c, j) >= 8.0

    def test_city_exact_match(self, scorer):
        """市区町村も完全一致 → 12点"""
        c = make_candidate(**{"希望勤務地_都道府県": "東京都", "希望勤務地_市区町村": "世田谷区"})
        j = make_job(**{"所在地_都道府県": "東京都", "所在地_市区町村": "世田谷区"})
        assert scorer.score_location(c, j) == 12.0

    def test_prefecture_mismatch(self, scorer):
        """都道府県不一致 → 0点"""
        c = make_candidate(**{"希望勤務地_都道府県": "大阪府"})
        j = make_job(**{"所在地_都道府県": "東京都"})
        assert scorer.score_location(c, j) == 0.0

    def test_no_preference(self, scorer):
        """希望なし → 8点"""
        c = make_candidate(**{"希望勤務地_都道府県": ""})
        j = make_job()
        assert scorer.score_location(c, j) == 8.0


# ============================================================
# 給与スコア
# ============================================================


class TestSalaryScoring:
    def test_salary_exceeds(self, scorer):
        """求人の下限 ≧ 希望下限 → 12点"""
        c = make_candidate(**{"希望給与_月額下限": 22})
        j = make_job(**{"給与_月額下限": 24, "給与_月額上限": 28})
        assert scorer.score_salary(c, j) == 12.0

    def test_salary_within_range(self, scorer):
        """求人の上限 ≧ 希望下限 → 6点以上"""
        c = make_candidate(**{"希望給与_月額下限": 26})
        j = make_job(**{"給与_月額下限": 22, "給与_月額上限": 28})
        score = scorer.score_salary(c, j)
        assert 6.0 <= score <= 12.0

    def test_salary_below(self, scorer):
        """求人の上限 < 希望下限（差3万以上）→ 0点"""
        c = make_candidate(**{"希望給与_月額下限": 30})
        j = make_job(**{"給与_月額下限": 20, "給与_月額上限": 24})
        assert scorer.score_salary(c, j) == 0.0

    def test_salary_close(self, scorer):
        """求人の上限が希望に2万円以内 → 4点"""
        c = make_candidate(**{"希望給与_月額下限": 26})
        j = make_job(**{"給与_月額下限": 20, "給与_月額上限": 25})
        assert scorer.score_salary(c, j) == 4.0

    def test_no_preference(self, scorer):
        """給与希望なし → 8点"""
        c = make_candidate(**{"希望給与_月額下限": 0})
        j = make_job()
        assert scorer.score_salary(c, j) == 8.0


# ============================================================
# シフトスコア
# ============================================================


class TestShiftScoring:
    def test_full_overlap(self, scorer):
        """完全一致 → 9点"""
        c = make_candidate(**{"希望シフト": "日勤のみ"})
        j = make_job(**{"シフト": "日勤のみ"})
        assert scorer.score_shift(c, j) == 9.0

    def test_partial_overlap(self, scorer):
        """一部一致 → 中間スコア"""
        c = make_candidate(**{"希望シフト": "日勤のみ, 早番可"})
        j = make_job(**{"シフト": "日勤のみ, 遅番可, 夜勤あり可"})
        score = scorer.score_shift(c, j)
        assert 0.0 < score < 9.0

    def test_no_preference(self, scorer):
        """希望なし → 6点"""
        c = make_candidate(**{"希望シフト": ""})
        j = make_job()
        assert scorer.score_shift(c, j) == 6.0


# ============================================================
# 経験年数スコア
# ============================================================


class TestExperienceScoring:
    def test_exceeds(self, scorer):
        c = make_candidate(**{"経験年数": 5})
        j = make_job(**{"必要経験年数": 3})
        assert scorer.score_experience(c, j) == 6.0

    def test_exact_match(self, scorer):
        c = make_candidate(**{"経験年数": 3})
        j = make_job(**{"必要経験年数": 3})
        assert scorer.score_experience(c, j) == 6.0

    def test_one_year_short(self, scorer):
        c = make_candidate(**{"経験年数": 2})
        j = make_job(**{"必要経験年数": 3})
        assert scorer.score_experience(c, j) == 4.0

    def test_two_years_short(self, scorer):
        c = make_candidate(**{"経験年数": 1})
        j = make_job(**{"必要経験年数": 3})
        assert scorer.score_experience(c, j) == 2.0

    def test_significantly_under(self, scorer):
        c = make_candidate(**{"経験年数": 0})
        j = make_job(**{"必要経験年数": 5})
        assert scorer.score_experience(c, j) == 0.0

    def test_no_requirement(self, scorer):
        c = make_candidate(**{"経験年数": 0})
        j = make_job(**{"必要経験年数": 0})
        assert scorer.score_experience(c, j) == 6.0


# ============================================================
# 施設形態スコア
# ============================================================


class TestFacilityTypeScoring:
    def test_exact_match(self, scorer):
        c = make_candidate(**{"希望施設形態": "特別養護老人ホーム"})
        j = make_job(**{"施設形態": "特別養護老人ホーム"})
        assert scorer.score_facility_type(c, j) == 6.0

    def test_related_type(self, scorer):
        c = make_candidate(**{"希望施設形態": "特別養護老人ホーム"})
        j = make_job(**{"施設形態": "介護老人保健施設"})
        assert scorer.score_facility_type(c, j) == 3.0

    def test_no_match(self, scorer):
        c = make_candidate(**{"希望施設形態": "訪問介護"})
        j = make_job(**{"施設形態": "特別養護老人ホーム"})
        assert scorer.score_facility_type(c, j) == 0.0

    def test_no_preference(self, scorer):
        c = make_candidate(**{"希望施設形態": ""})
        j = make_job()
        assert scorer.score_facility_type(c, j) == 4.0


# ============================================================
# 総合スコア
# ============================================================


class TestCombinedScore:
    def test_perfect_score(self, scorer):
        """ルール60 + AI40 = 100"""
        assert scorer.combined_score(60.0, 40.0) == 100.0

    def test_cap_low_rule_high_ai(self, scorer):
        """ルール < 20 かつ AI > 25 → 55点でキャップ"""
        score = scorer.combined_score(15.0, 35.0)
        assert score <= 55.0

    def test_no_cap_moderate(self, scorer):
        """ルール20以上 → キャップなし"""
        score = scorer.combined_score(25.0, 30.0)
        assert score == 55.0

    def test_calculate_total(self, scorer):
        """全次元のスコア合計"""
        c = make_candidate()
        j = make_job()
        total = scorer.calculate_score(c, j)
        assert 0.0 <= total <= 60.0

    def test_breakdown_returns_all_keys(self, scorer):
        c = make_candidate()
        j = make_job()
        bd = scorer.calculate_score_breakdown(c, j)
        expected_keys = {"qualification", "location", "salary", "shift", "experience", "facility_type"}
        assert set(bd.keys()) == expected_keys
