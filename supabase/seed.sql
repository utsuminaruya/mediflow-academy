-- Mediflow Academy - Seed Data
-- This file seeds the database with initial courses and lessons

-- ================================================================
-- Courses
-- ================================================================

-- N5 Vocabulary Course (Free)
INSERT INTO courses (id, title, description, jlpt_level, category, is_free, sort_order) VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{"ja": "N5 基礎語彙100", "vi": "Từ vựng cơ bản N5 - 100 từ"}',
  '{"ja": "日本語のN5レベルに必要な基礎語彙100語を学びます。ひらがな・カタカナの読み方も含みます。", "vi": "Học 100 từ vựng cơ bản cho trình độ N5 tiếng Nhật. Bao gồm cách đọc hiragana và katakana."}',
  'N5', 'vocabulary', true, 1
),

-- N5 Grammar Course (Free)
(
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  '{"ja": "N5 基礎文法入門", "vi": "Ngữ pháp cơ bản N5 nhập môn"}',
  '{"ja": "です・ます体、助詞（は、が、を、に、で）など基礎文法を習得します。", "vi": "Học thể lịch sự です・ます, trợ từ (は、が、を、に、で) và ngữ pháp cơ bản."}',
  'N5', 'grammar', true, 2
),

-- N4 Vocabulary Course (Basic)
(
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  '{"ja": "N4 語彙マスター", "vi": "Từ vựng N4 Master"}',
  '{"ja": "N4レベルの語彙を体系的に学習。介護現場でよく使う言葉も含みます。", "vi": "Học từ vựng N4 một cách có hệ thống. Bao gồm cả từ ngữ thường dùng trong môi trường điều dưỡng."}',
  'N4', 'vocabulary', false, 3
),

-- N4 Grammar Course (Basic)
(
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  '{"ja": "N4 文法完全対策", "vi": "Ngữ pháp N4 hoàn chỉnh"}',
  '{"ja": "〜てしまう、〜ために、〜ながら等N4頻出文法を完全網羅。JLPT N4合格を目指します。", "vi": "Bao quát hoàn toàn ngữ pháp N4 thường gặp như 〜てしまう, 〜ために, 〜ながら. Hướng tới đậu JLPT N4."}',
  'N4', 'grammar', false, 4
),

-- Care Japanese Course (Pro)
(
  'e5f6a7b8-c9d0-1234-efab-345678901234',
  '{"ja": "介護の日本語 実践コース", "vi": "Tiếng Nhật điều dưỡng - Khóa học thực tế"}',
  '{"ja": "介護現場で実際に使う日本語を学ぶ実践コース。利用者への声かけ、申し送り、記録の書き方まで網羅。", "vi": "Khóa học thực hành tiếng Nhật trong môi trường điều dưỡng. Bao gồm cách giao tiếp với người dùng, báo cáo và viết hồ sơ."}',
  'N4', 'conversation', false, 5
),

-- N3 Grammar Course (Pro)
(
  'f6a7b8c9-d0e1-2345-fabc-456789012345',
  '{"ja": "N3 文法・語彙総まとめ", "vi": "Tổng hợp ngữ pháp & từ vựng N3"}',
  '{"ja": "N3合格に必要な文法・語彙を完全網羅。読解問題の解き方のコツも習得します。", "vi": "Bao quát hoàn toàn ngữ pháp & từ vựng cần thiết để đạt N3. Học kỹ thuật làm bài đọc hiểu."}',
  'N3', 'grammar', false, 6
);

-- ================================================================
-- Lessons for N5 Vocabulary Course
-- ================================================================

INSERT INTO lessons (id, course_id, title, content, quiz_data, sort_order, xp_reward, estimated_minutes) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{"ja": "レッスン1: 介護の基本語彙", "vi": "Bài 1: Từ vựng cơ bản điều dưỡng"}',
  '{
    "introduction": {
      "ja": "今日は介護現場でよく使う基本的な言葉を学びましょう。",
      "vi": "Hôm nay chúng ta học những từ cơ bản thường dùng trong điều dưỡng."
    },
    "keyPoints": [
      {"ja": "お体の具合はいかがですか？ - 体調を聞く", "vi": "Cơ thể bạn cảm thấy thế nào? - Hỏi tình trạng sức khỏe"},
      {"ja": "お食事の時間です - 食事の時間を知らせる", "vi": "Đến giờ ăn rồi - Thông báo giờ ăn"},
      {"ja": "ゆっくりでいいですよ - 安心させる", "vi": "Cứ từ từ thôi nhé - Trấn an đối phương"}
    ],
    "examples": [
      {
        "japanese": "お体の具合はいかがですか？",
        "reading": "おからだのぐあいはいかがですか？",
        "translation": {"ja": "体の調子はどうですか？", "vi": "Cơ thể bạn cảm thấy thế nào?"}
      },
      {
        "japanese": "お食事の時間です。",
        "reading": "おしょくじのじかんです。",
        "translation": {"ja": "食事の時間です", "vi": "Đến giờ ăn rồi"}
      },
      {
        "japanese": "ゆっくり休んでください。",
        "reading": "ゆっくりやすんでください。",
        "translation": {"ja": "ゆっくり休んでください", "vi": "Hãy nghỉ ngơi từ từ nhé"}
      }
    ]
  }',
  '{
    "question": {"ja": "「お体の具合はいかがですか？」の意味は？", "vi": "「お体の具合はいかがですか？」có nghĩa là gì?"},
    "options": [
      {"id": "a", "text": {"ja": "ご飯を食べましたか？", "vi": "Bạn đã ăn cơm chưa?"}},
      {"id": "b", "text": {"ja": "体の調子はどうですか？", "vi": "Cơ thể bạn cảm thấy thế nào?"}},
      {"id": "c", "text": {"ja": "どこに行きますか？", "vi": "Bạn sẽ đi đâu?"}},
      {"id": "d", "text": {"ja": "何時ですか？", "vi": "Mấy giờ rồi?"}}
    ],
    "correctId": "b",
    "explanation": {
      "ja": "「具合」は体の状態・調子という意味です。丁寧な聞き方です。",
      "vi": "\"具合\" có nghĩa là tình trạng, trạng thái cơ thể. Đây là cách hỏi lịch sự."
    }
  }',
  1, 20, 5
),

(
  '22222222-2222-2222-2222-222222222222',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{"ja": "レッスン2: 数字と時間", "vi": "Bài 2: Số và thời gian"}',
  '{
    "introduction": {
      "ja": "数字と時間の言い方を学びましょう。介護では時間の管理がとても大切です。",
      "vi": "Học cách nói số và thời gian. Trong điều dưỡng, quản lý thời gian rất quan trọng."
    },
    "keyPoints": [
      {"ja": "一（いち）、二（に）、三（さん）... 数字の読み方", "vi": "Cách đọc số: một, hai, ba..."},
      {"ja": "〜時（じ）、〜分（ふん/ぷん）- 時刻の言い方", "vi": "Cách nói giờ và phút"},
      {"ja": "午前（ごぜん）・午後（ごご）- AM/PM", "vi": "Buổi sáng/buổi chiều - AM/PM"}
    ],
    "examples": [
      {
        "japanese": "薬は朝9時に飲んでください。",
        "reading": "くすりはあさ9じにのんでください。",
        "translation": {"ja": "薬は朝9時に飲んでください", "vi": "Hãy uống thuốc lúc 9 giờ sáng"}
      },
      {
        "japanese": "お昼ご飯は12時です。",
        "reading": "おひるごはんは12じです。",
        "translation": {"ja": "昼食は12時です", "vi": "Bữa trưa lúc 12 giờ"}
      }
    ]
  }',
  '{
    "question": {"ja": "「午後3時」は何時ですか？", "vi": "「午後3時」là mấy giờ?"},
    "options": [
      {"id": "a", "text": {"ja": "3:00 AM", "vi": "3:00 sáng"}},
      {"id": "b", "text": {"ja": "12:00 PM", "vi": "12:00 trưa"}},
      {"id": "c", "text": {"ja": "3:00 PM", "vi": "3:00 chiều"}},
      {"id": "d", "text": {"ja": "15:30", "vi": "15:30"}}
    ],
    "correctId": "c",
    "explanation": {
      "ja": "「午後」はPM（昼過ぎ）を意味します。午後3時 = 3:00 PMです。",
      "vi": "「午後」có nghĩa là PM (buổi chiều). 午後3時 = 3:00 chiều."
    }
  }',
  2, 20, 5
);

-- ================================================================
-- Lessons for N4 Grammar Course
-- ================================================================

INSERT INTO lessons (id, course_id, title, content, quiz_data, sort_order, xp_reward, estimated_minutes) VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  '{"ja": "N4文法: 〜てしまう", "vi": "Ngữ pháp N4: 〜てしまう"}',
  '{
    "introduction": {
      "ja": "「〜てしまう」は動作の完了や後悔・意図しない結果を表します。",
      "vi": "「〜てしまう」 diễn tả hành động hoàn thành hoặc sự hối tiếc, kết quả ngoài ý muốn."
    },
    "keyPoints": [
      {"ja": "完了: 全部食べてしまった（食べ終えた）", "vi": "Hoàn thành: Đã ăn hết rồi"},
      {"ja": "後悔: 鍵を忘れてしまった（後悔している）", "vi": "Hối tiếc: Đã quên chìa khóa mất"},
      {"ja": "口語: 〜ちゃった / 〜じゃった（話し言葉）", "vi": "Khẩu ngữ: 〜ちゃった / 〜じゃった"}
    ],
    "examples": [
      {
        "japanese": "薬を飲み忘れてしまいました。",
        "reading": "くすりをのみわすれてしまいました。",
        "translation": {"ja": "薬を飲み忘れてしまいました", "vi": "Tôi đã quên uống thuốc mất."}
      },
      {
        "japanese": "転んでしまって、すみません。",
        "reading": "ころんでしまって、すみません。",
        "translation": {"ja": "転んでしまいました", "vi": "Tôi đã bị ngã mất, xin lỗi."}
      }
    ]
  }',
  '{
    "question": {"ja": "「鍵を忘れてしまった」の意味は？", "vi": "「鍵を忘れてしまった」có nghĩa là gì?"},
    "options": [
      {"id": "a", "text": {"ja": "鍵を見つけた", "vi": "Tìm thấy chìa khóa"}},
      {"id": "b", "text": {"ja": "鍵を忘れたことへの後悔", "vi": "Hối tiếc vì đã quên chìa khóa"}},
      {"id": "c", "text": {"ja": "鍵を持っている", "vi": "Đang cầm chìa khóa"}},
      {"id": "d", "text": {"ja": "鍵を作った", "vi": "Đã làm chìa khóa"}}
    ],
    "correctId": "b",
    "explanation": {
      "ja": "「〜てしまう」は後悔や意図しない結果を表します。この文では鍵を忘れたことへの後悔を示しています。",
      "vi": "「〜てしまう」 biểu đạt sự hối tiếc hoặc kết quả ngoài ý muốn. Câu này thể hiện sự hối tiếc vì đã quên chìa khóa."
    }
  }',
  1, 25, 7
);
