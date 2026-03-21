-- Migration: 003_user_profile_trigger
-- Fix 1: Auto-create public.users row when auth.users gets a new signup
-- Fix 2: Add missing columns (goals, daily_study_minutes)
-- Fix 3: Resolve RLS infinite-recursion on admin-check policies

-- ===========================
-- users テーブル: 列追加 & デフォルト設定
-- ===========================

-- オンボーディングで収集する追加情報
ALTER TABLE users ADD COLUMN IF NOT EXISTS goals JSONB DEFAULT '[]';
ALTER TABLE users ADD COLUMN IF NOT EXISTS daily_study_minutes INT DEFAULT 30;

-- サインアップ時はまだ国籍・母語が不明なのでデフォルト値を設定
ALTER TABLE users ALTER COLUMN nationality SET DEFAULT '';
ALTER TABLE users ALTER COLUMN native_language SET DEFAULT 'vi';

-- ===========================
-- RLS 無限再帰バグ修正
-- admin チェックのたびに users テーブルを参照すると再帰が起きる
-- SECURITY DEFINER 関数でバイパスする
-- ===========================

CREATE OR REPLACE FUNCTION public.get_user_role(uid UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = uid;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 再帰の原因になっていた古いポリシーを削除して再作成
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage lessons" ON lessons;
DROP POLICY IF EXISTS "Admins can view all progress" ON user_progress;
DROP POLICY IF EXISTS "Admins can manage quiz questions" ON quiz_questions;
DROP POLICY IF EXISTS "Admins can manage jobs" ON job_listings;

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('admin', 'instructor'));

CREATE POLICY "Admins can manage lessons"
  ON lessons FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('admin', 'instructor'));

CREATE POLICY "Admins can view all progress"
  ON user_progress FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage quiz questions"
  ON quiz_questions FOR ALL
  USING (public.get_user_role(auth.uid()) IN ('admin', 'instructor'));

CREATE POLICY "Admins can manage jobs"
  ON job_listings FOR ALL
  USING (public.get_user_role(auth.uid()) = 'admin');

-- ===========================
-- 新規サインアップ時に public.users を自動作成するトリガー
-- auth.users に INSERT されると即座に実行される
-- ===========================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    nationality,
    native_language
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'nationality', ''),
    COALESCE(NEW.raw_user_meta_data->>'native_language', 'vi')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
