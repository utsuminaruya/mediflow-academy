-- Migration: 004_premium_schema
-- 有料講座・サブスクリプション機能のデータベーススキーマ

-- ===========================
-- instructors テーブル（講師管理）
-- ===========================
CREATE TABLE IF NOT EXISTS instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  display_name JSONB NOT NULL,             -- {"ja": "うつみ先生", "vi": "Thầy Utsumi", "en": "Utsumi Sensei"}
  title JSONB NOT NULL,                    -- {"ja": "現役看護師・Mediflow代表", "vi": "Giám đốc Mediflow"}
  bio JSONB NOT NULL,
  qualifications JSONB NOT NULL,           -- ["看護師免許", "13年臨床経験", ...]
  avatar_url TEXT,
  specialties JSONB,                       -- ["訪問入浴", "特養", "病院", "ツアーナース"]
  languages JSONB DEFAULT '["ja"]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- subscription_plans テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,               -- free / standard / pro / premium / corporate
  display_name JSONB NOT NULL,
  description JSONB NOT NULL,
  price_monthly INT NOT NULL DEFAULT 0,    -- 月額（円）
  price_yearly INT,                        -- 年額（円）
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  ai_tutor_daily_limit INT,               -- NULLは無制限
  live_sessions_monthly INT DEFAULT 0,
  one_on_one_monthly INT DEFAULT 0,
  priority_matching BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- user_subscriptions テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'past_due', 'canceled', 'trialing', 'incomplete')),
  billing_cycle TEXT DEFAULT 'monthly'
    CHECK (billing_cycle IN ('monthly', 'yearly')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)   -- ユーザーにつきサブスクリプションは1件
);

-- ===========================
-- premium_courses テーブル（有料専用コース）
-- ===========================
CREATE TABLE IF NOT EXISTS premium_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('nurse_lecture', 'caregiver_lecture', 'exam_prep', 'career_prep', 'request_based', 'bilingual')),
  instructor_id UUID REFERENCES instructors(id),
  min_plan TEXT NOT NULL DEFAULT 'standard'
    CHECK (min_plan IN ('standard', 'pro', 'premium')),
  thumbnail_url TEXT,
  preview_video_url TEXT,
  total_lessons INT DEFAULT 0,
  estimated_hours FLOAT,
  difficulty TEXT DEFAULT 'intermediate'
    CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags JSONB DEFAULT '[]',
  enrollment_count INT DEFAULT 0,
  rating_avg FLOAT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- live_sessions テーブル（ライブ講座）
-- ===========================
CREATE TABLE IF NOT EXISTS live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  instructor_id UUID REFERENCES instructors(id),
  session_type TEXT NOT NULL
    CHECK (session_type IN ('live_lecture', 'qa_session', 'mock_exam', 'group_practice')),
  min_plan TEXT NOT NULL DEFAULT 'pro'
    CHECK (min_plan IN ('pro', 'premium')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  max_participants INT DEFAULT 50,
  current_participants INT DEFAULT 0,
  meeting_url TEXT,
  recording_url TEXT,
  materials JSONB DEFAULT '[]',
  status TEXT DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'live', 'completed', 'canceled')),
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- live_session_registrations テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS live_session_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered'
    CHECK (status IN ('registered', 'attended', 'no_show')),
  attended_minutes INT,
  feedback_rating INT CHECK (feedback_rating BETWEEN 1 AND 5),
  feedback_comment TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- ===========================
-- learning_requests テーブル（学習リクエスト）
-- ===========================
CREATE TABLE IF NOT EXISTS learning_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT
    CHECK (category IN ('vocabulary', 'grammar', 'nursing', 'caregiving', 'exam', 'life_skill', 'other')),
  upvote_count INT DEFAULT 1,
  status TEXT DEFAULT 'open'
    CHECK (status IN ('open', 'planned', 'in_production', 'published', 'declined')),
  response_course_id UUID REFERENCES premium_courses(id),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- learning_request_votes テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS learning_request_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES learning_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(request_id, user_id)
);

-- ===========================
-- one_on_one_sessions テーブル（マンツーマン予約）
-- ===========================
CREATE TABLE IF NOT EXISTS one_on_one_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES instructors(id),
  session_type TEXT NOT NULL
    CHECK (session_type IN ('tutoring', 'resume_review', 'interview_prep', 'career_consult')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 30,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'completed', 'canceled', 'no_show')),
  notes_before TEXT,
  notes_after JSONB,
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- course_reviews テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,               -- premium_courses.id or courses.id
  course_type TEXT NOT NULL DEFAULT 'premium'
    CHECK (course_type IN ('free', 'premium')),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- ===========================
-- updated_at トリガー
-- ===========================
CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================
-- インデックス
-- ===========================
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_premium_courses_category ON premium_courses(category);
CREATE INDEX IF NOT EXISTS idx_premium_courses_published ON premium_courses(is_published, min_plan);
CREATE INDEX IF NOT EXISTS idx_live_sessions_scheduled ON live_sessions(scheduled_at, status);
CREATE INDEX IF NOT EXISTS idx_learning_requests_votes ON learning_requests(upvote_count DESC);
CREATE INDEX IF NOT EXISTS idx_live_session_reg_user ON live_session_registrations(user_id);

-- ===========================
-- RLS ポリシー
-- ===========================
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_session_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_request_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE one_on_one_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- instructors: 全員閲覧可
CREATE POLICY "Instructors are publicly viewable"
  ON instructors FOR SELECT USING (is_active = TRUE);

-- subscription_plans: 全員閲覧可
CREATE POLICY "Plans are publicly viewable"
  ON subscription_plans FOR SELECT USING (is_active = TRUE);

-- user_subscriptions: 自分のサブスクのみ
CREATE POLICY "Users can view own subscription"
  ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscription"
  ON user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscription"
  ON user_subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- premium_courses: 公開コースは全員閲覧可
CREATE POLICY "Published premium courses viewable"
  ON premium_courses FOR SELECT USING (is_published = TRUE);

-- live_sessions: スケジュール済み・完了は全員閲覧可
CREATE POLICY "Scheduled and completed sessions viewable"
  ON live_sessions FOR SELECT
  USING (status IN ('scheduled', 'live', 'completed'));

-- live_session_registrations: 自分の予約のみ
CREATE POLICY "Users can manage own registrations"
  ON live_session_registrations FOR ALL USING (auth.uid() = user_id);

-- learning_requests: 全員閲覧・ログイン済みが投稿
CREATE POLICY "Requests publicly viewable"
  ON learning_requests FOR SELECT USING (status != 'declined');
CREATE POLICY "Authenticated users can create requests"
  ON learning_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- learning_request_votes: ログイン済みが投票
CREATE POLICY "Votes publicly viewable"
  ON learning_request_votes FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can vote"
  ON learning_request_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- one_on_one_sessions: 自分のセッションのみ
CREATE POLICY "Users can manage own 1on1 sessions"
  ON one_on_one_sessions FOR ALL USING (auth.uid() = user_id);

-- course_reviews: 公開レビューは全員閲覧可・自分のレビューのみ編集
CREATE POLICY "Published reviews are viewable"
  ON course_reviews FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Users can manage own reviews"
  ON course_reviews FOR ALL USING (auth.uid() = user_id);

-- ===========================
-- 初期データ: subscription_plans
-- ===========================
INSERT INTO subscription_plans (name, display_name, description, price_monthly, price_yearly, features, ai_tutor_daily_limit, live_sessions_monthly, one_on_one_monthly, sort_order) VALUES
(
  'free',
  '{"ja": "無料", "vi": "Miễn phí", "en": "Free", "my": "Percuma", "id": "Gratis", "zh": "免费"}',
  '{"ja": "まずは無料で始めよう", "vi": "Bắt đầu miễn phí", "en": "Start for free", "my": "Mulakan secara percuma", "id": "Mulai gratis", "zh": "免费开始"}',
  0, 0,
  '["ja": ["JLPT N5基礎コース（無料）", "AI家庭教師（1日5回まで）", "求人閲覧", "コース一覧閲覧"]]',
  5, 0, 0, 0
),
(
  'standard',
  '{"ja": "スタンダード", "vi": "Tiêu chuẩn", "en": "Standard", "my": "Standard", "id": "Standar", "zh": "标准版"}',
  '{"ja": "本格的に日本語を学ぶなら", "vi": "Để học tiếng Nhật nghiêm túc", "en": "For serious Japanese learners", "my": "Untuk pelajar Jepun yang serius", "id": "Untuk pelajar Jepang serius", "zh": "认真学日语的选择"}',
  2980, 29800,
  '["全JLPTコース（N5〜N3）", "AI家庭教師（無制限）", "介護基礎日本語コース", "AIによる学習プラン生成", "求人マッチング"]',
  NULL, 0, 0, 1
),
(
  'pro',
  '{"ja": "プロ", "vi": "Pro", "en": "Pro", "my": "Pro", "id": "Pro", "zh": "专业版"}',
  '{"ja": "資格取得・就職を本気で目指すなら", "vi": "Dành cho người muốn đạt chứng chỉ và việc làm", "en": "For certification and career goals", "my": "Untuk matlamat sijil dan kerjaya", "id": "Untuk sertifikasi dan karier", "zh": "认真备考和求职"}',
  5980, 59800,
  '["Standardの全機能", "介護福祉士・特定技能 試験対策", "うつみ先生のライブ講座（月4回）", "録画アーカイブ（見放題）", "個別学習相談（月1回）"]',
  NULL, 4, 1, 2
),
(
  'premium',
  '{"ja": "プレミアム", "vi": "Cao cấp", "en": "Premium", "my": "Premium", "id": "Premium", "zh": "高级版"}',
  '{"ja": "最速で合格・就職を実現したいなら", "vi": "Đạt chứng chỉ và việc làm nhanh nhất", "en": "Fastest path to certification and employment", "my": "Laluan terpantas ke sijil dan pekerjaan", "id": "Jalur tercepat ke sertifikasi dan pekerjaan", "zh": "最快取得证书和就业"}',
  9800, 98000,
  '["Proの全機能", "マンツーマン指導（月2回・30分）", "履歴書添削・面接練習", "優先求人紹介", "Mediflow就職保証プログラム", "合格保証（介護福祉士試験）"]',
  NULL, 8, 2, 3
)
ON CONFLICT (name) DO NOTHING;
