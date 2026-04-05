-- ============================================================
-- Mediflow Academy — N5コース初期データ
-- seed-n5-courses.sql
-- ============================================================
-- 実行順序: このファイルを最初に実行してください
-- 依存: なし（DDLを含む）

-- テーブル作成（未作成の場合）
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  jlpt_level TEXT NOT NULL CHECK (jlpt_level IN ('N5','N4','N3','N2','N1')),
  category TEXT NOT NULL CHECK (category IN ('vocabulary','grammar','reading','listening','conversation')),
  is_free BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title JSONB NOT NULL,
  content JSONB NOT NULL,
  quiz_data JSONB,
  sort_order INTEGER DEFAULT 0,
  xp_reward INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_jlpt_level ON courses(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);

-- ============================================================
-- N5 コースデータ挿入
-- ============================================================

-- 既存データの重複防止
DELETE FROM courses WHERE jlpt_level = 'N5';

-- Course 1: N5 語彙
INSERT INTO courses (title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  '{"ja": "JLPT N5 基本語彙", "vi": "Từ vựng cơ bản JLPT N5"}',
  '{"ja": "日常生活と介護現場で使う基本的な言葉を650語学びます。あいさつ・数字・家族・食べ物・場所・動詞・形容詞など10テーマで体系的に習得。全40レッスン。", "vi": "Học 650 từ cơ bản dùng trong cuộc sống hàng ngày và môi trường chăm sóc. Học có hệ thống qua 10 chủ đề: lời chào, số đếm, gia đình, đồ ăn, địa điểm, động từ, tính từ... Tổng 40 bài học."}',
  'N5', 'vocabulary', true, 1
);

-- Course 2: N5 文法
INSERT INTO courses (title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  '{"ja": "JLPT N5 基本文法", "vi": "Ngữ pháp cơ bản JLPT N5"}',
  '{"ja": "日本語の基礎となる60の文法パターンを学びます。です・ます体から助詞・動詞活用・時制まで、介護現場での用例を交えて丁寧に解説。全18レッスン。", "vi": "Học 60 mẫu ngữ pháp nền tảng của tiếng Nhật. Từ thể lịch sự đến trợ từ, chia động từ, thì... Giải thích kỹ lưỡng kèm ví dụ trong môi trường chăm sóc. Tổng 18 bài học."}',
  'N5', 'grammar', true, 2
);

-- Course 3: N5 介護日本語
INSERT INTO courses (title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  '{"ja": "介護の日本語（N5レベル）", "vi": "Tiếng Nhật chăm sóc (Trình độ N5)"}',
  '{"ja": "介護現場で毎日使う言葉と会話を学びます。現役看護師が監修した実践的なコンテンツ。朝の声かけ・食事・入浴・排泄・移動・バイタル・申し送り・家族対応の8場面をカバー。", "vi": "Học từ vựng và hội thoại sử dụng hàng ngày tại nơi làm việc chăm sóc. Nội dung thực tiễn được giám sát bởi y tá đang hành nghề. 8 tình huống: gọi thăm buổi sáng, ăn uống, tắm rửa, vệ sinh, di chuyển, đo sinh hiệu, báo cáo, giao tiếp gia đình."}',
  'N5', 'conversation', true, 3
);

-- Course 4: N5 模擬試験
INSERT INTO courses (title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  '{"ja": "JLPT N5 模擬試験", "vi": "Đề thi thử JLPT N5"}',
  '{"ja": "本番形式の模擬試験3セットで実力をチェック。文字・語彙・文法・読解を網羅。弱点の発見と克服に最適。各30問・時間制限あり。", "vi": "Kiểm tra năng lực với 3 bộ đề thi thử theo format thi thật. Bao gồm chữ viết, từ vựng, ngữ pháp, đọc hiểu. Lý tưởng để phát hiện điểm yếu. Mỗi bộ 30 câu, có giới hạn thời gian."}',
  'N5', 'reading', true, 4
);
