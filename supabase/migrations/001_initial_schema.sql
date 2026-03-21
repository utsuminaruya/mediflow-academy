-- Mediflow Academy Initial Schema
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================
-- users テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  native_language TEXT NOT NULL,          -- 母語 (vi/en/my/id/zh)
  current_visa_status TEXT,              -- 在留資格
  japanese_level TEXT DEFAULT 'N5',      -- 現在の日本語レベル
  target_qualification TEXT,             -- 目標資格
  avatar_url TEXT,
  role TEXT DEFAULT 'learner' CHECK (role IN ('learner', 'instructor', 'admin')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- courses テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,               -- {"ja": "...", "vi": "...", "en": "..."}
  description JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('jlpt', 'kaigofukushishi', 'kango', 'tokutei_ginou', 'life_skill')),
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  target_jlpt TEXT CHECK (target_jlpt IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  thumbnail_url TEXT,
  total_lessons INT DEFAULT 0,
  estimated_hours FLOAT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- lessons テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title JSONB NOT NULL,
  content JSONB NOT NULL,              -- リッチコンテンツ（テキスト/音声/画像/動画URL）
  lesson_type TEXT NOT NULL CHECK (lesson_type IN ('video', 'reading', 'listening', 'speaking', 'vocabulary', 'grammar', 'quiz')),
  order_index INT NOT NULL,
  duration_minutes INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- user_progress テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  score FLOAT CHECK (score >= 0 AND score <= 100),
  time_spent_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ===========================
-- quiz_questions テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  question JSONB NOT NULL,             -- 多言語対応の問題文
  options JSONB NOT NULL,              -- 選択肢 [{text: {...}, is_correct: bool}]
  explanation JSONB,                   -- 解説（多言語）
  question_type TEXT DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'fill_blank', 'listening', 'speaking')),
  difficulty INT DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- job_listings テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_name TEXT NOT NULL,
  facility_type TEXT NOT NULL CHECK (facility_type IN ('hospital', 'nursing_home', 'day_service', 'home_care')),
  location TEXT NOT NULL,              -- 勤務地
  prefecture TEXT NOT NULL,
  job_title JSONB NOT NULL,
  description JSONB NOT NULL,
  required_qualification TEXT,         -- 必要資格
  required_jlpt_level TEXT CHECK (required_jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  salary_min INT,
  salary_max INT,
  visa_support BOOLEAN DEFAULT FALSE,
  housing_support BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- ai_conversations テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversation_type TEXT NOT NULL CHECK (conversation_type IN ('tutor', 'career', 'life_support')),
  messages JSONB NOT NULL DEFAULT '[]',
  context JSONB,                       -- ユーザーの学習状況等
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- achievements テーブル
-- ===========================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL CHECK (achievement_type IN ('course_completed', 'streak', 'quiz_perfect', 'jlpt_passed')),
  achievement_data JSONB,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- インデックス
-- ===========================
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_active ON job_listings(is_active, prefecture);

-- ===========================
-- updated_at トリガー
-- ===========================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
