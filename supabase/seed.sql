-- Mediflow Academy Seed Data
-- JLPT N5 初期コンテンツ

-- ===========================
-- コースデータ
-- ===========================
INSERT INTO courses (id, title, description, category, level, target_jlpt, total_lessons, estimated_hours, is_published)
VALUES
(
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "JLPT N5 完全対策コース", "vi": "Khóa học JLPT N5 toàn diện", "en": "JLPT N5 Complete Prep Course"}',
  '{"ja": "日本語能力試験N5合格を目指す完全コース。ひらがな・カタカナから基本語彙800語、基本文法まで体系的に学習します。", "vi": "Khóa học toàn diện hướng đến đậu kỳ thi năng lực tiếng Nhật N5. Học có hệ thống từ hiragana, katakana đến 800 từ vựng cơ bản và ngữ pháp cơ bản.", "en": "Complete course aimed at passing JLPT N5. Systematically learn from hiragana/katakana to 800 basic vocabulary words and fundamental grammar."}',
  'jlpt',
  'beginner',
  'N5',
  15,
  30,
  TRUE
),
(
  'c2000000-0000-0000-0000-000000000001',
  '{"ja": "介護の日本語 基礎コース", "vi": "Khóa học tiếng Nhật điều dưỡng cơ bản", "en": "Japanese for Care Workers - Basic Course"}',
  '{"ja": "介護現場で実際に使う日本語を学びます。申し送り・記録の書き方、利用者さんとの会話、緊急時の対応まで実践的に学習。", "vi": "Học tiếng Nhật được sử dụng thực tế tại nơi làm việc điều dưỡng. Học thực hành từ cách viết bàn giao, ghi chép đến giao tiếp với người dùng dịch vụ và xử lý tình huống khẩn cấp.", "en": "Learn Japanese actually used in care settings. Practical learning covering shift handovers, record writing, conversations with clients, and emergency responses."}',
  'kaigofukushishi',
  'beginner',
  'N4',
  12,
  24,
  TRUE
),
(
  'c3000000-0000-0000-0000-000000000001',
  '{"ja": "特定技能「介護」試験対策", "vi": "Luyện thi kỹ năng đặc định \"Điều dưỡng\"", "en": "Specified Skilled Worker \"Caregiving\" Exam Prep"}',
  '{"ja": "特定技能「介護」の技能試験と日本語試験に特化した対策コース。過去問分析と弱点克服で合格を目指します。", "vi": "Khóa học luyện thi chuyên biệt cho kỳ thi kỹ năng và kỳ thi tiếng Nhật của kỹ năng đặc định \"Điều dưỡng\". Hướng đến đậu kỳ thi bằng phân tích đề cũ và khắc phục điểm yếu.", "en": "Specialized prep course for the Specified Skilled Worker Caregiving skills test and Japanese language test. Aim to pass through past exam analysis and weakness improvement."}',
  'tokutei_ginou',
  'intermediate',
  'N4',
  20,
  40,
  TRUE
);

-- ===========================
-- JLPT N5 語彙レッスン
-- ===========================
INSERT INTO lessons (id, course_id, title, content, lesson_type, order_index, duration_minutes)
VALUES
(
  'l1000000-0000-0000-0000-000000000001',
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "第1課: 介護の基本語彙（体の部位）", "vi": "Bài 1: Từ vựng điều dưỡng cơ bản (Các bộ phận cơ thể)", "en": "Lesson 1: Basic Care Vocabulary (Body Parts)"}',
  '{
    "vocabulary": [
      {
        "word": "頭",
        "reading": "あたま",
        "translation": {"ja": "頭", "vi": "đầu", "en": "head"},
        "example_sentence": "頭が痛いです。",
        "example_translation": {"vi": "Tôi bị đau đầu.", "en": "I have a headache."}
      },
      {
        "word": "手",
        "reading": "て",
        "translation": {"ja": "手", "vi": "tay", "en": "hand"},
        "example_sentence": "手を洗ってください。",
        "example_translation": {"vi": "Vui lòng rửa tay.", "en": "Please wash your hands."}
      },
      {
        "word": "足",
        "reading": "あし",
        "translation": {"ja": "足", "vi": "chân", "en": "foot/leg"},
        "example_sentence": "足が痛いです。",
        "example_translation": {"vi": "Tôi bị đau chân.", "en": "My leg hurts."}
      },
      {
        "word": "背中",
        "reading": "せなか",
        "translation": {"ja": "背中", "vi": "lưng", "en": "back"},
        "example_sentence": "背中を洗います。",
        "example_translation": {"vi": "Tôi rửa lưng.", "en": "I will wash the back."}
      },
      {
        "word": "お腹",
        "reading": "おなか",
        "translation": {"ja": "お腹", "vi": "bụng", "en": "stomach/belly"},
        "example_sentence": "お腹が痛いですか？",
        "example_translation": {"vi": "Bạn có bị đau bụng không?", "en": "Does your stomach hurt?"}
      },
      {
        "word": "胸",
        "reading": "むね",
        "translation": {"ja": "胸", "vi": "ngực", "en": "chest"},
        "example_sentence": "胸が痛いです。",
        "example_translation": {"vi": "Tôi bị đau ngực.", "en": "I have chest pain."}
      },
      {
        "word": "口",
        "reading": "くち",
        "translation": {"ja": "口", "vi": "miệng", "en": "mouth"},
        "example_sentence": "口を開けてください。",
        "example_translation": {"vi": "Vui lòng mở miệng.", "en": "Please open your mouth."}
      },
      {
        "word": "目",
        "reading": "め",
        "translation": {"ja": "目", "vi": "mắt", "en": "eye"},
        "example_sentence": "目が見えますか？",
        "example_translation": {"vi": "Bạn có nhìn thấy không?", "en": "Can you see?"}
      },
      {
        "word": "耳",
        "reading": "みみ",
        "translation": {"ja": "耳", "vi": "tai", "en": "ear"},
        "example_sentence": "耳が聞こえますか？",
        "example_translation": {"vi": "Bạn có nghe thấy không?", "en": "Can you hear?"}
      },
      {
        "word": "鼻",
        "reading": "はな",
        "translation": {"ja": "鼻", "vi": "mũi", "en": "nose"},
        "example_sentence": "鼻水が出ています。",
        "example_translation": {"vi": "Đang chảy nước mũi.", "en": "You have a runny nose."}
      }
    ]
  }',
  'vocabulary',
  1,
  20
),
(
  'l1000000-0000-0000-0000-000000000002',
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "第2課: 介護の基本語彙（日常動作）", "vi": "Bài 2: Từ vựng điều dưỡng cơ bản (Hoạt động hàng ngày)", "en": "Lesson 2: Basic Care Vocabulary (Daily Activities)"}',
  '{
    "vocabulary": [
      {
        "word": "食べる",
        "reading": "たべる",
        "translation": {"ja": "食べる", "vi": "ăn", "en": "to eat"},
        "example_sentence": "ご飯を食べましょう。",
        "example_translation": {"vi": "Hãy ăn cơm.", "en": "Let us eat."}
      },
      {
        "word": "飲む",
        "reading": "のむ",
        "translation": {"ja": "飲む", "vi": "uống", "en": "to drink"},
        "example_sentence": "水を飲んでください。",
        "example_translation": {"vi": "Vui lòng uống nước.", "en": "Please drink some water."}
      },
      {
        "word": "歩く",
        "reading": "あるく",
        "translation": {"ja": "歩く", "vi": "đi bộ", "en": "to walk"},
        "example_sentence": "一緒に歩きましょう。",
        "example_translation": {"vi": "Hãy cùng đi bộ.", "en": "Let us walk together."}
      },
      {
        "word": "座る",
        "reading": "すわる",
        "translation": {"ja": "座る", "vi": "ngồi", "en": "to sit"},
        "example_sentence": "ここに座ってください。",
        "example_translation": {"vi": "Vui lòng ngồi đây.", "en": "Please sit here."}
      },
      {
        "word": "立つ",
        "reading": "たつ",
        "translation": {"ja": "立つ", "vi": "đứng", "en": "to stand"},
        "example_sentence": "ゆっくり立ってください。",
        "example_translation": {"vi": "Vui lòng đứng dậy từ từ.", "en": "Please stand up slowly."}
      },
      {
        "word": "寝る",
        "reading": "ねる",
        "translation": {"ja": "寝る", "vi": "ngủ/nằm", "en": "to sleep/lie down"},
        "example_sentence": "横になってください。",
        "example_translation": {"vi": "Vui lòng nằm xuống.", "en": "Please lie down."}
      },
      {
        "word": "着替える",
        "reading": "きがえる",
        "translation": {"ja": "着替える", "vi": "thay đồ", "en": "to change clothes"},
        "example_sentence": "着替えましょう。",
        "example_translation": {"vi": "Hãy thay đồ.", "en": "Let us change clothes."}
      },
      {
        "word": "洗う",
        "reading": "あらう",
        "translation": {"ja": "洗う", "vi": "rửa", "en": "to wash"},
        "example_sentence": "手を洗いましょう。",
        "example_translation": {"vi": "Hãy rửa tay.", "en": "Let us wash our hands."}
      },
      {
        "word": "トイレ",
        "reading": "トイレ",
        "translation": {"ja": "トイレ", "vi": "nhà vệ sinh", "en": "toilet"},
        "example_sentence": "トイレに行きますか？",
        "example_translation": {"vi": "Bạn có muốn đi vệ sinh không?", "en": "Do you need to use the toilet?"}
      },
      {
        "word": "薬",
        "reading": "くすり",
        "translation": {"ja": "薬", "vi": "thuốc", "en": "medicine"},
        "example_sentence": "薬を飲む時間です。",
        "example_translation": {"vi": "Đến giờ uống thuốc rồi.", "en": "It is time to take your medicine."}
      }
    ]
  }',
  'vocabulary',
  2,
  20
),
(
  'l1000000-0000-0000-0000-000000000003',
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "第3課: 基本文法「〜てください」", "vi": "Bài 3: Ngữ pháp cơ bản \"〜てください\"", "en": "Lesson 3: Basic Grammar \"〜てください\""}',
  '{
    "grammar_points": [
      {
        "pattern": "〜てください",
        "explanation": {
          "ja": "相手に何かをするように丁寧に頼む表現です。動詞のて形に「ください」をつけます。",
          "vi": "Cách diễn đạt lịch sự để nhờ người khác làm gì đó. Thêm 「ください」 vào dạng て của động từ.",
          "en": "A polite expression asking someone to do something. Add ください to the て-form of a verb."
        },
        "examples": [
          {
            "ja": "座ってください。",
            "translation": {"vi": "Vui lòng ngồi xuống.", "en": "Please sit down."}
          },
          {
            "ja": "手を洗ってください。",
            "translation": {"vi": "Vui lòng rửa tay.", "en": "Please wash your hands."}
          },
          {
            "ja": "ゆっくり話してください。",
            "translation": {"vi": "Vui lòng nói chậm thôi.", "en": "Please speak slowly."}
          },
          {
            "ja": "ここに名前を書いてください。",
            "translation": {"vi": "Vui lòng viết tên vào đây.", "en": "Please write your name here."}
          }
        ]
      },
      {
        "pattern": "〜ないでください",
        "explanation": {
          "ja": "相手に何かをしないように丁寧に頼む表現です。動詞の否定形（ない形）に「でください」をつけます。",
          "vi": "Cách diễn đạt lịch sự để nhờ người khác không làm gì đó. Thêm 「でください」 vào dạng phủ định (dạng ない) của động từ.",
          "en": "A polite expression asking someone not to do something. Add でください to the negative (ない) form of a verb."
        },
        "examples": [
          {
            "ja": "動かないでください。",
            "translation": {"vi": "Vui lòng không cử động.", "en": "Please do not move."}
          },
          {
            "ja": "一人で歩かないでください。",
            "translation": {"vi": "Vui lòng không đi một mình.", "en": "Please do not walk alone."}
          }
        ]
      }
    ]
  }',
  'grammar',
  3,
  25
),
(
  'l1000000-0000-0000-0000-000000000004',
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "第4課: 状態を伝える表現（痛み・症状）", "vi": "Bài 4: Cách diễn đạt tình trạng (Đau và triệu chứng)", "en": "Lesson 4: Expressing Conditions (Pain & Symptoms)"}',
  '{
    "vocabulary": [
      {
        "word": "痛い",
        "reading": "いたい",
        "translation": {"ja": "痛い", "vi": "đau", "en": "painful/hurts"},
        "example_sentence": "どこが痛いですか？",
        "example_translation": {"vi": "Bạn đau ở đâu?", "en": "Where does it hurt?"}
      },
      {
        "word": "熱がある",
        "reading": "ねつがある",
        "translation": {"ja": "熱がある", "vi": "bị sốt", "en": "have a fever"},
        "example_sentence": "熱があります。38度です。",
        "example_translation": {"vi": "Bị sốt. 38 độ.", "en": "I have a fever. 38 degrees."}
      },
      {
        "word": "吐き気",
        "reading": "はきけ",
        "translation": {"ja": "吐き気", "vi": "buồn nôn", "en": "nausea"},
        "example_sentence": "吐き気がありますか？",
        "example_translation": {"vi": "Bạn có bị buồn nôn không?", "en": "Do you feel nauseated?"}
      },
      {
        "word": "めまい",
        "reading": "めまい",
        "translation": {"ja": "めまい", "vi": "chóng mặt", "en": "dizziness"},
        "example_sentence": "めまいがしますか？",
        "example_translation": {"vi": "Bạn có bị chóng mặt không?", "en": "Are you feeling dizzy?"}
      },
      {
        "word": "便秘",
        "reading": "べんぴ",
        "translation": {"ja": "便秘", "vi": "táo bón", "en": "constipation"},
        "example_sentence": "便秘気味ですか？",
        "example_translation": {"vi": "Bạn có bị táo bón không?", "en": "Are you constipated?"}
      }
    ]
  }',
  'vocabulary',
  4,
  20
),
(
  'l1000000-0000-0000-0000-000000000005',
  'c1000000-0000-0000-0000-000000000001',
  '{"ja": "確認テスト: 第1〜4課", "vi": "Bài kiểm tra: Bài 1〜4", "en": "Check Quiz: Lessons 1-4"}',
  '{"text": {"ja": "第1〜4課の内容を確認するテストです。", "vi": "Bài kiểm tra để xác nhận nội dung bài 1〜4.", "en": "Quiz to review content from Lessons 1-4."}}',
  'quiz',
  5,
  15
);

-- ===========================
-- クイズ問題
-- ===========================
INSERT INTO quiz_questions (id, lesson_id, question, options, explanation, question_type, difficulty)
VALUES
(
  'q1000000-0000-0000-0000-000000000001',
  'l1000000-0000-0000-0000-000000000005',
  '{"ja": "「頭」の読み方は何ですか？", "vi": "\"頭\" đọc như thế nào?", "en": "How do you read \"頭\"?"}',
  '[
    {"text": {"ja": "あたま", "vi": "atama", "en": "atama"}, "is_correct": true},
    {"text": {"ja": "てあし", "vi": "teashi", "en": "teashi"}, "is_correct": false},
    {"text": {"ja": "むね", "vi": "mune", "en": "mune"}, "is_correct": false},
    {"text": {"ja": "せなか", "vi": "senaka", "en": "senaka"}, "is_correct": false}
  ]',
  '{"ja": "「頭」は「あたま」と読みます。英語では \"head\" です。", "vi": "\"頭\" đọc là \"atama\". Trong tiếng Anh là \"head\".", "en": "\"頭\" is read as \"atama\". It means \"head\" in English."}',
  'multiple_choice',
  1
),
(
  'q1000000-0000-0000-0000-000000000002',
  'l1000000-0000-0000-0000-000000000005',
  '{"ja": "「座ってください」はどういう意味ですか？", "vi": "\"座ってください\" có nghĩa là gì?", "en": "What does \"座ってください\" mean?"}',
  '[
    {"text": {"ja": "立ってください", "vi": "Vui lòng đứng dậy", "en": "Please stand up"}, "is_correct": false},
    {"text": {"ja": "座ってください", "vi": "Vui lòng ngồi xuống", "en": "Please sit down"}, "is_correct": true},
    {"text": {"ja": "歩いてください", "vi": "Vui lòng đi bộ", "en": "Please walk"}, "is_correct": false},
    {"text": {"ja": "寝てください", "vi": "Vui lòng nằm xuống", "en": "Please lie down"}, "is_correct": false}
  ]',
  '{"ja": "「座る」は sit/ngồi を意味します。「〜てください」は丁寧な依頼の表現です。", "vi": "\"座る\" có nghĩa là ngồi. \"〜てください\" là cách diễn đạt yêu cầu lịch sự.", "en": "\"座る\" means to sit. \"〜てください\" is a polite request expression."}',
  'multiple_choice',
  1
),
(
  'q1000000-0000-0000-0000-000000000003',
  'l1000000-0000-0000-0000-000000000005',
  '{"ja": "利用者さんに「薬を飲む時間ですよ」と伝えたいとき、どう言いますか？", "vi": "Khi muốn nói với người dùng dịch vụ \"Đến giờ uống thuốc rồi\", bạn nói gì?", "en": "When you want to tell the client \"It is time to take your medicine\", what do you say?"}',
  '[
    {"text": {"ja": "薬を食べる時間です。", "vi": "薬を食べる時間です。", "en": "薬を食べる時間です。"}, "is_correct": false},
    {"text": {"ja": "薬の時間です。飲んでください。", "vi": "薬の時間です。飲んでください。", "en": "薬の時間です。飲んでください。"}, "is_correct": true},
    {"text": {"ja": "薬を持ってください。", "vi": "薬を持ってください。", "en": "薬を持ってください。"}, "is_correct": false},
    {"text": {"ja": "薬はありますか？", "vi": "薬はありますか？", "en": "薬はありますか？"}, "is_correct": false}
  ]',
  '{"ja": "薬は「飲む（のむ）」を使います。「食べる」ではありません。「薬の時間です。飲んでください。」が正解です。", "vi": "Đối với thuốc, dùng \"飲む (nomu - uống)\", không phải \"食べる\". Câu đúng là \"薬の時間です。飲んでください。\"", "en": "For medicine, use \"飲む (nomu - drink/take)\", not \"食べる\". The correct answer is \"薬の時間です。飲んでください。\""}',
  'multiple_choice',
  2
),
(
  'q1000000-0000-0000-0000-000000000004',
  'l1000000-0000-0000-0000-000000000005',
  '{"ja": "「めまい」の意味は何ですか？", "vi": "\"めまい\" có nghĩa là gì?", "en": "What does \"めまい\" mean?"}',
  '[
    {"text": {"ja": "吐き気", "vi": "Buồn nôn", "en": "Nausea"}, "is_correct": false},
    {"text": {"ja": "便秘", "vi": "Táo bón", "en": "Constipation"}, "is_correct": false},
    {"text": {"ja": "めまい", "vi": "Chóng mặt", "en": "Dizziness"}, "is_correct": true},
    {"text": {"ja": "熱", "vi": "Sốt", "en": "Fever"}, "is_correct": false}
  ]',
  '{"ja": "「めまい」は dizziness（目が回る感覚）です。介護現場では利用者さんの症状確認に重要な言葉です。", "vi": "\"めまい\" là chóng mặt (cảm giác hoa mắt). Đây là từ quan trọng để xác nhận triệu chứng của người dùng dịch vụ tại nơi làm việc điều dưỡng.", "en": "\"めまい\" means dizziness (feeling like the room is spinning). It is an important word for checking client symptoms in care settings."}',
  'multiple_choice',
  1
),
(
  'q1000000-0000-0000-0000-000000000005',
  'l1000000-0000-0000-0000-000000000005',
  '{"ja": "次の中で「体の部位」ではないものはどれですか？", "vi": "Trong các từ sau, từ nào KHÔNG phải là bộ phận cơ thể?", "en": "Which of the following is NOT a body part?"}',
  '[
    {"text": {"ja": "胸（むね）", "vi": "胸（むね）", "en": "胸（むね）"}, "is_correct": false},
    {"text": {"ja": "背中（せなか）", "vi": "背中（せなか）", "en": "背中（せなか）"}, "is_correct": false},
    {"text": {"ja": "薬（くすり）", "vi": "薬（くすり）", "en": "薬（くすり）"}, "is_correct": true},
    {"text": {"ja": "耳（みみ）", "vi": "耳（みみ）", "en": "耳（みみ）"}, "is_correct": false}
  ]',
  '{"ja": "「薬（くすり）」は medicine（薬）で体の部位ではありません。胸・背中・耳はすべて体の部位です。", "vi": "\"薬（くすり）\" là thuốc (medicine), không phải bộ phận cơ thể. 胸、背中、耳 đều là các bộ phận cơ thể.", "en": "\"薬（くすり）\" means medicine, not a body part. 胸, 背中, and 耳 are all body parts."}',
  'multiple_choice',
  1
);

-- ===========================
-- サンプル求人データ
-- ===========================
INSERT INTO job_listings (id, facility_name, facility_type, location, prefecture, job_title, description, required_qualification, required_jlpt_level, salary_min, salary_max, visa_support, housing_support, is_active)
VALUES
(
  'j1000000-0000-0000-0000-000000000001',
  'さくら介護老人保健施設',
  'nursing_home',
  '神奈川県横浜市中区',
  '神奈川県',
  '{"ja": "介護職員（特定技能）", "vi": "Nhân viên điều dưỡng (Kỹ năng đặc định)", "en": "Care Worker (Specified Skilled Worker)"}',
  '{"ja": "横浜市内の介護老人保健施設で、ご利用者様の日常生活全般のサポートをお願いします。外国人スタッフ多数在籍しており、多言語サポート体制が整っています。研修制度充実。", "vi": "Tại cơ sở điều dưỡng ở thành phố Yokohama, chúng tôi cần người hỗ trợ toàn bộ cuộc sống hàng ngày của người dùng dịch vụ. Có nhiều nhân viên nước ngoài, hệ thống hỗ trợ đa ngôn ngữ hoàn thiện. Chế độ đào tạo phong phú.", "en": "At our care facility in Yokohama, you will support clients with all aspects of daily life. Many international staff members, comprehensive multilingual support system. Excellent training program."}',
  '特定技能1号（介護）',
  'N4',
  220000,
  280000,
  TRUE,
  TRUE,
  TRUE
),
(
  'j1000000-0000-0000-0000-000000000002',
  '東京ケアサービス株式会社',
  'home_care',
  '東京都新宿区',
  '東京都',
  '{"ja": "訪問介護員（ホームヘルパー）", "vi": "Nhân viên chăm sóc tại nhà", "en": "Home Care Worker"}',
  '{"ja": "ご利用者様のご自宅を訪問し、身体介護・生活援助を行います。チームでサポートするので安心。日本語学習支援あり。", "vi": "Đến thăm nhà của người dùng dịch vụ và thực hiện chăm sóc thân thể, hỗ trợ sinh hoạt. Được đội ngũ hỗ trợ nên rất yên tâm. Có hỗ trợ học tiếng Nhật.", "en": "Visit clients at home and provide physical care and daily living assistance. Supported by a team, so you can work with peace of mind. Japanese language learning support available."}',
  '介護職員初任者研修修了以上',
  'N3',
  240000,
  300000,
  FALSE,
  FALSE,
  TRUE
),
(
  'j1000000-0000-0000-0000-000000000003',
  'みなとみらいデイサービスセンター',
  'day_service',
  '神奈川県横浜市西区',
  '神奈川県',
  '{"ja": "介護スタッフ（日中のみ）", "vi": "Nhân viên điều dưỡng (Chỉ ban ngày)", "en": "Care Staff (Daytime only)"}',
  '{"ja": "デイサービスでのレクリエーション支援、入浴介助、食事介助などをお願いします。土日休み、残業少なめで働きやすい環境です。ベトナム語・英語対応スタッフ在籍。", "vi": "Tại dịch vụ ban ngày, chúng tôi cần người hỗ trợ hoạt động giải trí, tắm rửa, ăn uống. Nghỉ thứ 7, Chủ nhật, ít làm thêm giờ, môi trường làm việc dễ chịu. Có nhân viên nói được tiếng Việt và tiếng Anh.", "en": "At our day service center, support recreational activities, bathing assistance, and meal assistance. Weekends off, minimal overtime, easy working environment. Vietnamese and English-speaking staff on site."}',
  '特定技能1号（介護）または初任者研修修了',
  'N4',
  200000,
  250000,
  TRUE,
  FALSE,
  TRUE
);
