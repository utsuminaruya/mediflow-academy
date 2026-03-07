import json

import anthropic

from lib.config import settings

# --- マッチング分析プロンプト ---

MATCHING_SYSTEM_PROMPT = """あなたはMediflowの介護人材マッチング専門AIです。
候補者と求人の情報を分析し、以下4つの観点でスコアリングしてください。

## 評価基準（各0-10点）

1. **キャリア適合度**: 候補者の経歴・資格・経験年数と求人要件の整合性
   - 必須資格を保有 → 高得点
   - 経験年数が要件を満たす → 高得点
   - 転職理由と求人内容が整合 → 加点

2. **職場環境適合度**: 候補者の希望条件と施設の特徴・文化の一致度
   - 希望施設形態と一致 → 高得点
   - 求める人物像と候補者像が合致 → 高得点

3. **特技活用度**: 候補者の特技・得意分野がこの施設でどれだけ活かせるか
   - 施設の課題や特色と特技が合致 → 高得点

4. **成長可能性**: この求人が候補者のキャリア成長にどう貢献するか
   - スキルアップ機会がある → 高得点

## 出力形式
必ず以下のJSON形式のみで回答してください（他のテキスト不要）。
- comment: 推薦担当者が施設へ電話する際に使える一言（60文字以内）
- concerns: 懸念事項（あれば具体的に、なければ空文字）"""

BATCH_MATCHING_TEMPLATE = """【候補者情報】
氏名: {candidate_name}
保有資格: {candidate_qualifications}
経験年数: {candidate_experience}年
特技・得意分野: {candidate_skills}
転職理由: {candidate_reason}
その他希望: {candidate_preferences}

以下の{n}件の求人それぞれについて分析してください。

{job_entries}

以下のJSON配列形式で回答してください（他の文字は不要）:
[{{"job_id": "求人ID", "career_fit": 0-10, "culture_fit": 0-10, "skills_value": 0-10, "growth_potential": 0-10, "comment": "60文字以内の推薦コメント", "concerns": "懸念事項または空文字"}}]"""

SINGLE_MATCHING_TEMPLATE = """【候補者情報】
氏名: {candidate_name}
保有資格: {candidate_qualifications}
経験年数: {candidate_experience}年
特技・得意分野: {candidate_skills}
転職理由: {candidate_reason}
その他希望: {candidate_preferences}

【求人情報】
施設名: {job_facility_name} (ID: {job_id})
施設形態: {job_facility_type}
募集職種: {job_position}
施設紹介: {job_description}
求める人物像: {job_ideal_candidate}
特徴: {job_features}

以下のJSON形式で回答してください（他の文字は不要）:
{{"job_id": "{job_id}", "career_fit": 0-10, "culture_fit": 0-10, "skills_value": 0-10, "growth_potential": 0-10, "comment": "60文字以内の推薦コメント", "concerns": "懸念事項または空文字"}}"""

# --- 推薦文プロンプト ---

RECOMMEND_SYSTEM_PROMPT = """あなたは介護人材紹介会社のベテランコンサルタントです。
施設の採用担当者に向けて、候補者を推薦する文書を作成してください。

推薦文の要件:
- ビジネス文書として適切な形式（拝啓〜敬具）
- 候補者の強みを具体的に3つ以上述べる
- 施設のニーズと候補者の経験の接点を明確にする
- 誠実で信頼感のある文体
- 400-600文字程度"""

RECOMMEND_TEMPLATE = """【候補者情報】
氏名: {candidate_name}
保有資格: {qualifications}
経験年数: {experience}年
特技・得意分野: {skills}
転職理由: {reason}

【推薦先施設情報】
施設名: {facility_name}
施設形態: {facility_type}
募集職種: {position}
施設の特徴: {features}
求める人物像: {ideal_candidate}

【マッチングスコア】
総合スコア: {total_score}/100

{emphasis_instruction}

上記に基づき、{facility_name}の採用担当者様宛ての推薦文を作成してください。"""


def _truncate(text: str, max_len: int = 200) -> str:
    if not text:
        return ""
    text = str(text)
    return text[:max_len] + "..." if len(text) > max_len else text


class ClaudeClient:
    def __init__(self, api_key: str | None = None):
        self.client = anthropic.Anthropic(api_key=api_key or settings.anthropic_api_key)

    def analyze_matches_batch(
        self,
        candidate_name: str,
        candidate_qualifications: str,
        candidate_experience: int,
        candidate_skills: str,
        candidate_reason: str,
        candidate_preferences: str,
        jobs: list[dict],
    ) -> list[dict]:
        """複数求人をバッチでAI分析（最大5件）"""
        job_entries = "\n".join(
            [
                f"--- 求人{i + 1} (ID: {j['id']}) ---\n"
                f"施設名: {j['facility_name']}\n"
                f"施設形態: {j['facility_type']}\n"
                f"募集職種: {j.get('position', '')}\n"
                f"施設紹介: {_truncate(j.get('description', ''))}\n"
                f"求める人物像: {_truncate(j.get('ideal_candidate', ''))}\n"
                f"特徴: {_truncate(j.get('features', ''))}"
                for i, j in enumerate(jobs)
            ]
        )

        user_msg = BATCH_MATCHING_TEMPLATE.format(
            candidate_name=candidate_name,
            candidate_qualifications=candidate_qualifications,
            candidate_experience=candidate_experience,
            candidate_skills=_truncate(candidate_skills),
            candidate_reason=_truncate(candidate_reason),
            candidate_preferences=_truncate(candidate_preferences),
            n=len(jobs),
            job_entries=job_entries,
        )

        response = self.client.messages.create(
            model=settings.HAIKU_MODEL,
            max_tokens=500,
            system=MATCHING_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )

        return self._parse_match_response(response.content[0].text, jobs)

    def analyze_match_single(
        self,
        candidate_name: str,
        candidate_qualifications: str,
        candidate_experience: int,
        candidate_skills: str,
        candidate_reason: str,
        candidate_preferences: str,
        job: dict,
    ) -> dict:
        """単一求人のAI分析"""
        user_msg = SINGLE_MATCHING_TEMPLATE.format(
            candidate_name=candidate_name,
            candidate_qualifications=candidate_qualifications,
            candidate_experience=candidate_experience,
            candidate_skills=_truncate(candidate_skills),
            candidate_reason=_truncate(candidate_reason),
            candidate_preferences=_truncate(candidate_preferences),
            job_id=job["id"],
            job_facility_name=job["facility_name"],
            job_facility_type=job["facility_type"],
            job_position=job.get("position", ""),
            job_description=_truncate(job.get("description", "")),
            job_ideal_candidate=_truncate(job.get("ideal_candidate", "")),
            job_features=_truncate(job.get("features", "")),
        )

        response = self.client.messages.create(
            model=settings.HAIKU_MODEL,
            max_tokens=300,
            system=MATCHING_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )

        try:
            result = json.loads(response.content[0].text)
            return self._validate_score(result, job["id"])
        except (json.JSONDecodeError, KeyError, IndexError):
            return self._neutral_score(job["id"])

    def generate_recommendation(
        self,
        candidate_name: str,
        qualifications: str,
        experience: int,
        skills: str,
        reason: str,
        facility_name: str,
        facility_type: str,
        position: str,
        features: str,
        ideal_candidate: str,
        total_score: float,
        emphasis: list[str] | None = None,
    ) -> str:
        """推薦文を生成"""
        emphasis_instruction = ""
        if emphasis:
            emphasis_instruction = f"特に以下の点を強調してください: {', '.join(emphasis)}"

        user_msg = RECOMMEND_TEMPLATE.format(
            candidate_name=candidate_name,
            qualifications=qualifications,
            experience=experience,
            skills=_truncate(skills, 300),
            reason=_truncate(reason, 300),
            facility_name=facility_name,
            facility_type=facility_type,
            position=position,
            features=_truncate(features, 300),
            ideal_candidate=_truncate(ideal_candidate, 300),
            total_score=total_score,
            emphasis_instruction=emphasis_instruction,
        )

        response = self.client.messages.create(
            model=settings.SONNET_MODEL,
            max_tokens=800,
            system=RECOMMEND_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )

        return response.content[0].text

    def _parse_match_response(
        self, raw_text: str, jobs: list[dict]
    ) -> list[dict]:
        """Claude応答をパースし、各求人のスコアを返す"""
        try:
            # JSONの前後にテキストがある場合に対応
            text = raw_text.strip()
            start = text.find("[")
            end = text.rfind("]") + 1
            if start >= 0 and end > start:
                text = text[start:end]
            results = json.loads(text)

            if isinstance(results, list):
                return [
                    self._validate_score(r, r.get("job_id", jobs[i]["id"] if i < len(jobs) else ""))
                    for i, r in enumerate(results)
                ]
        except (json.JSONDecodeError, KeyError, IndexError):
            pass

        # パース失敗 → 全求人にニュートラルスコア
        return [self._neutral_score(j["id"]) for j in jobs]

    @staticmethod
    def _validate_score(result: dict, job_id: str) -> dict:
        """スコアを0-10の範囲にクランプ"""
        return {
            "job_id": job_id,
            "career_fit": max(0, min(10, float(result.get("career_fit", 5)))),
            "culture_fit": max(0, min(10, float(result.get("culture_fit", 5)))),
            "skills_value": max(0, min(10, float(result.get("skills_value", 5)))),
            "growth_potential": max(
                0, min(10, float(result.get("growth_potential", 5)))
            ),
            "comment": str(result.get("comment", ""))[:60],
            "concerns": str(result.get("concerns", "")),
        }

    @staticmethod
    def _neutral_score(job_id: str) -> dict:
        return {
            "job_id": job_id,
            "career_fit": 5,
            "culture_fit": 5,
            "skills_value": 5,
            "growth_potential": 5,
            "comment": "AI分析不可",
            "concerns": "",
        }
