-- RLS Policies for Mediflow Academy
-- Migration: 002_rls_policies

-- ===========================
-- users テーブル RLS
-- ===========================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ===========================
-- courses テーブル RLS
-- ===========================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by all"
  ON courses FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
  );

-- ===========================
-- lessons テーブル RLS
-- ===========================
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons of published courses are viewable"
  ON lessons FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM courses WHERE id = lessons.course_id AND is_published = TRUE)
  );

CREATE POLICY "Admins can manage lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
  );

-- ===========================
-- user_progress テーブル RLS
-- ===========================
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON user_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
  ON user_progress FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ===========================
-- quiz_questions テーブル RLS
-- ===========================
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz questions of published lessons viewable"
  ON quiz_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN courses c ON c.id = l.course_id
      WHERE l.id = quiz_questions.lesson_id AND c.is_published = TRUE
    )
  );

CREATE POLICY "Admins can manage quiz questions"
  ON quiz_questions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
  );

-- ===========================
-- ai_conversations テーブル RLS
-- ===========================
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own conversations"
  ON ai_conversations FOR ALL
  USING (auth.uid() = user_id);

-- ===========================
-- job_listings テーブル RLS
-- ===========================
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active jobs viewable by all"
  ON job_listings FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage jobs"
  ON job_listings FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ===========================
-- achievements テーブル RLS
-- ===========================
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);
