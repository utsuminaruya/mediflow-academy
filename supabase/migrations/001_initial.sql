-- Mediflow Academy - Initial Database Schema
-- Migration: 001_initial.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- 1. users テーブル
-- ================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  nationality TEXT NOT NULL DEFAULT 'VN',
  native_language TEXT NOT NULL DEFAULT 'vi',
  current_jlpt_level TEXT CHECK (current_jlpt_level IN ('none','N5','N4','N3','N2','N1')),
  target_jlpt_level TEXT CHECK (target_jlpt_level IN ('N5','N4','N3','N2','N1')),
  visa_type TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free','basic','pro')),
  stripe_customer_id TEXT,
  streak_days INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  learning_goals TEXT[] DEFAULT '{}',
  daily_goal_minutes INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 2. courses テーブル
-- ================================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,          -- {"ja": "...", "vi": "..."}
  description JSONB NOT NULL,    -- {"ja": "...", "vi": "..."}
  jlpt_level TEXT NOT NULL CHECK (jlpt_level IN ('N5','N4','N3','N2','N1')),
  category TEXT NOT NULL CHECK (category IN ('vocabulary','grammar','reading','listening','conversation')),
  thumbnail_url TEXT,
  is_free BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 3. lessons テーブル
-- ================================================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title JSONB NOT NULL,          -- {"ja": "...", "vi": "..."}
  content JSONB NOT NULL,        -- Full lesson content
  quiz_data JSONB,               -- Quiz questions and answers
  sort_order INTEGER DEFAULT 0,
  xp_reward INTEGER DEFAULT 10,
  estimated_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 4. user_progress テーブル
-- ================================================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  quiz_score INTEGER CHECK (quiz_score >= 0 AND quiz_score <= 100),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ================================================================
-- 5. ai_chat_history テーブル
-- ================================================================
CREATE TABLE ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  context JSONB,                 -- {"lesson_id": "...", "course_id": "..."}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 6. daily_message_counts テーブル (for free tier limiting)
-- ================================================================
CREATE TABLE daily_message_counts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

-- ================================================================
-- Indexes
-- ================================================================
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_ai_chat_history_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_ai_chat_history_created_at ON ai_chat_history(created_at DESC);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_courses_jlpt_level ON courses(jlpt_level);
CREATE INDEX idx_daily_message_counts_user_date ON daily_message_counts(user_id, date);

-- ================================================================
-- Row Level Security (RLS)
-- ================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_message_counts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read/update own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Progress policies
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat history policies
CREATE POLICY "Users can manage own chat" ON ai_chat_history
  FOR ALL USING (auth.uid() = user_id);

-- Daily message count policies
CREATE POLICY "Users can manage own message counts" ON daily_message_counts
  FOR ALL USING (auth.uid() = user_id);

-- Public read for courses and lessons (no RLS needed for reads)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read lessons" ON lessons
  FOR SELECT USING (true);

-- ================================================================
-- Functions
-- ================================================================

-- Function to increment XP
CREATE OR REPLACE FUNCTION increment_xp(user_id UUID, xp_amount INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_xp INTEGER;
BEGIN
  UPDATE users
  SET total_xp = total_xp + xp_amount,
      updated_at = NOW()
  WHERE id = user_id
  RETURNING total_xp INTO new_xp;

  RETURN new_xp;
END;
$$;

-- Function to increment daily message count
CREATE OR REPLACE FUNCTION increment_daily_messages(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO daily_message_counts (user_id, date, count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET count = daily_message_counts.count + 1
  RETURNING count INTO new_count;

  RETURN new_count;
END;
$$;

-- Function to get daily message count
CREATE OR REPLACE FUNCTION get_daily_message_count(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  msg_count INTEGER;
BEGIN
  SELECT COALESCE(count, 0) INTO msg_count
  FROM daily_message_counts
  WHERE user_id = p_user_id AND date = CURRENT_DATE;

  RETURN COALESCE(msg_count, 0);
END;
$$;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
