-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Mediflow Academy N5 Course Master Data
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 4つのN5コースの初期データを挿入

-- Course 1: N5 語彙コース（無料）
INSERT INTO courses (id, title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  gen_random_uuid(),
  '{"ja": "JLPT N5 基本語彙", "vi": "Từ vựng cơ bản JLPT N5"}',
  '{"ja": "日常生活と介護現場で使う基本的な言葉を650語学びます。あいさつ、数字、家族、食べ物、動詞、形容詞など、実用的な語彙を体系的に習得できます。", "vi": "Học 650 từ cơ bản sử dụng trong cuộc sống hàng ngày và môi trường chăm sóc. Từ lời chào hỏi, số đếm, gia đình, đồ ăn, động từ, tính từ... Nắm vững từ vựng thiết yếu một cách có hệ thống."}',
  'N5',
  'vocabulary',
  true,
  1
);

-- Course 2: N5 文法コース（無料）
INSERT INTO courses (id, title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  gen_random_uuid(),
  '{"ja": "JLPT N5 基本文法", "vi": "Ngữ pháp cơ bản JLPT N5"}',
  '{"ja": "日本語の基礎となる60の文法パターンを学びます。です/ます、助詞、動詞の活用、形容詞など、日本語を話すために必須の文法をマスターします。全て介護現場での実践例付き。", "vi": "Học 60 mẫu ngữ pháp nền tảng của tiếng Nhật. Từ です/ます, trợ từ, chia động từ, tính từ... Nắm vững những ngữ pháp thiết yếu để nói tiếng Nhật. Mỗi mẫu đều có ví dụ thực tế từ môi trường chăm sóc."}',
  'N5',
  'grammar',
  true,
  2
);

-- Course 3: N5 介護日本語コース（無料）★Mediflow独自
INSERT INTO courses (id, title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  gen_random_uuid(),
  '{"ja": "介護の日本語（N5レベル）", "vi": "Tiếng Nhật chăm sóc (Trình độ N5)"}',
  '{"ja": "介護施設の現場で毎日使う言葉と会話を学びます。朝の声かけ、食事介助、入浴、排泄、移動など、8つのシーンごとに実践的な表現を習得。現役看護師が監修したリアルな会話教材です。", "vi": "Học từ vựng và hội thoại sử dụng hàng ngày tại nơi làm việc chăm sóc. Từ lời gọi hỏi buổi sáng, hỗ trợ ăn uống, tắm rửa, vệ sinh, di chuyển... 8 tình huống được giám sát bởi y tá đang hành nghề. Tài liệu hội thoại thực tế, áp dụng ngay được."}',
  'N5',
  'conversation',
  true,
  3
);

-- Course 4: N5 模擬試験（無料）
INSERT INTO courses (id, title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  gen_random_uuid(),
  '{"ja": "JLPT N5 模擬試験", "vi": "Đề thi thử JLPT N5"}',
  '{"ja": "本番形式の模擬試験で実力をチェック。3セット×30問の問題を解いて、N5レベルの到達度を確認できます。時間制限はなく、何度でも受け直せます。", "vi": "Kiểm tra năng lực với đề thi thử theo format thi thật. 3 bộ × 30 câu hỏi. Không giới hạn thời gian, có thể làm lại nhiều lần."}',
  'N5',
  'reading',
  true,
  4
);
