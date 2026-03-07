import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    anthropic_api_key: str = os.getenv("ANTHROPIC_API_KEY", "")
    google_service_account_json: str = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON", "{}")
    candidate_sheet_id: str = os.getenv("CANDIDATE_SHEET_ID", "")
    job_sheet_id: str = os.getenv("JOB_SHEET_ID", "")
    match_results_sheet_id: str = os.getenv("MATCH_RESULTS_SHEET_ID", "")
    api_secret_key: str = os.getenv("API_SECRET_KEY", "dev-key")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "admin")

    HAIKU_MODEL: str = "claude-3-5-haiku-20241022"
    SONNET_MODEL: str = "claude-sonnet-4-20250514"

    # 資格マスターリスト
    QUALIFICATIONS: list[str] = [
        "介護福祉士",
        "介護職員実務者研修",
        "介護職員初任者研修",
        "ケアマネジャー",
        "社会福祉士",
        "看護師",
        "准看護師",
        "理学療法士",
        "作業療法士",
        "認知症介護実践者研修",
        "福祉住環境コーディネーター",
        "無資格",
    ]

    # 施設形態マスターリスト
    FACILITY_TYPES: list[str] = [
        "特別養護老人ホーム",
        "介護老人保健施設",
        "有料老人ホーム",
        "グループホーム",
        "デイサービス",
        "訪問介護",
        "小規模多機能型居宅介護",
        "サービス付き高齢者向け住宅",
        "病院・クリニック",
    ]

    # シフトパターン
    SHIFT_PATTERNS: list[str] = [
        "日勤のみ",
        "夜勤あり可",
        "早番可",
        "遅番可",
        "夜勤専従希望",
    ]

    # 雇用形態
    EMPLOYMENT_TYPES: list[str] = [
        "正社員",
        "パート・アルバイト",
        "契約社員",
        "派遣社員",
    ]

    # 都道府県リスト
    PREFECTURES: list[str] = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
        "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
        "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
        "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
    ]


settings = Settings()
