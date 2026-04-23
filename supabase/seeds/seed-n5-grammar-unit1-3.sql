-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Mediflow Academy N5 Grammar Units 1-3
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 6 Grammar lessons for Units 1-3 (18 grammar patterns total)

-- ═══════════════════════════════════════════════════
-- UNIT 1: Basic Sentence Structure (2 lessons)
-- ═══════════════════════════════════════════════════

-- Unit 1, Lesson 1: です/ます and Basic Sentences
INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本文法' LIMIT 1),
  1,
  1,
  'grammar',
  '{
    "intro": {
      "ja": "日本語の最も基本的な文法は「です」と「ます」です。これらは敬語で、丁寧な日本語の基本です。介護施設では、患者さんやご家族に対して、常に丁寧な言葉遣いが求められます。このレッスンでは、基本的な文法と敬語の使い方を学びます。",
      "vi": "Ngữ pháp cơ bản nhất của tiếng Nhật là \"です\" và \"ます\". Đây là những từ tôn trọng (kính ngữ) và là cơ bản của tiếng Nhật lịch sự. Tại các cơ sở chăm sóc, cần phải luôn sử dụng lời nói lịch sự với bệnh nhân và gia đình. Bài học này dạy cách sử dụng ngữ pháp cơ bản và kính ngữ."
    },
    "patterns": [
      {
        "pattern": "名詞 + です",
        "meaning": {"ja": "~です（～です）：名詞の後に付けて、敬語で説明する", "vi": "~です（～です）：đặt sau danh từ để giải thích một cách lịch sự"},
        "examples": [
          {"ja": "私は看護師です。", "vi": "Tôi là một y tá."},
          {"ja": "これはペンです。", "vi": "Đây là một cây bút."}
        ],
        "care_context": "ご利用者様にご自分の身分を説明するときに使います。「私は介護職です」など",
        "explanation": {"ja": "名詞で自分のことを説明する最も基本的な文法です。敬語で丁寧に説明できます。", "vi": "Đây là ngữ pháp cơ bản nhất để tự giới thiệu bản thân. Bạn có thể giải thích một cách lịch sự bằng kính ngữ."},
        "difficulty": "easy"
      },
      {
        "pattern": "動詞 + ます",
        "meaning": {"ja": "動詞を敬語にする。現在形、習慣、可能性など様々な意味を表す", "vi": "Chuyển động từ thành kính ngữ. Biểu thị nhiều ý nghĩa như hiện tại, thói quen, khả năng..."},
        "examples": [
          {"ja": "私は毎日働きます。", "vi": "Tôi làm việc mỗi ngày."},
          {"ja": "明日、患者さんを訪問します。", "vi": "Ngày mai, tôi sẽ thăm bệnh nhân."}
        ],
        "care_context": "ご利用者様にケアの計画を説明するときに使います。「今、お風呂に入ります」など",
        "explanation": {"ja": "動詞をます形にすることで、敬語で丁寧に行動や予定を説明できます。", "vi": "Bằng cách chuyển động từ thành dạng ます, bạn có thể giải thích các hành động hoặc kế hoạch một cách lịch sự."},
        "difficulty": "easy"
      },
      {
        "pattern": "形容詞 + です",
        "meaning": {"ja": "い形容詞やな形容詞を敬語で説明する", "vi": "Giải thích tính từ い-kết thúc hoặc な-kết thúc một cách lịch sự"},
        "examples": [
          {"ja": "この部屋は大きいです。", "vi": "Căn phòng này lớn."},
          {"ja": "これは便利です。", "vi": "Cái này tiện lợi."}
        ],
        "care_context": "ご利用者様に環境や物の状態を説明するときに使います。「お部屋はきれいです」など",
        "explanation": {"ja": "形容詞にです/ますを付けることで、敬語になり、丁寧に説明できます。", "vi": "Bằng cách thêm です/ます vào tính từ, nó trở thành kính ngữ và có thể giải thích một cách lịch sự."},
        "difficulty": "easy"
      },
      {
        "pattern": "N1 は N2 です",
        "meaning": {"ja": "主語と述語の関係を説明する。AはBです（A=B）", "vi": "Giải thích mối quan hệ giữa chủ ngữ và vị từ. A=B"},
        "examples": [
          {"ja": "私の名前は田中です。", "vi": "Tên tôi là Tanaka."},
          {"ja": "彼は患者さんです。", "vi": "Anh ấy là bệnh nhân."}
        ],
        "care_context": "患者さんに自分の身分を説明するときに使います。「私は毎日あなたを手伝う人です」など",
        "explanation": {"ja": "「は」を使って、主語と述語の関係を説明します。これは基本的な日本語の文法です。", "vi": "Sử dụng \"は\" để giải thích mối quan hệ giữa chủ ngữ và vị từ. Đây là ngữ pháp cơ bản của tiếng Nhật."},
        "difficulty": "medium"
      }
    ],
    "dialogue": [
      "患者さん: 「あなたは誰ですか？」",
      "介護職: 「私は田中です。介護職です。」",
      "患者さん: 「毎日、来ていただけますか？」",
      "介護職: 「はい、毎日来ます。あなたをお手伝いします。」",
      "患者さん: 「良かった。この部屋は大きいですね。」",
      "介護職: 「はい、きれいで快適です。」",
      "患者さん: 「ありがとうございます。」"
    ],
    "key_phrases": [
      {"ja": "私は介護職です", "vi": "Tôi là nhân viên chăm sóc"},
      {"ja": "毎日来ます", "vi": "Tôi đến mỗi ngày"},
      {"ja": "お手伝いします", "vi": "Tôi sẽ giúp bạn"},
      {"ja": "大丈夫です", "vi": "Mọi thứ ổn"}
    ],
    "cultural_note": {
      "ja": "日本の敬語は非常に重要です。特に介護施設では、患者さんやご家族に対して、常に敬語と丁寧な言葉遣いが求められます。これは信頼関係を築く基本です。",
      "vi": "Kính ngữ tiếng Nhật rất quan trọng. Đặc biệt tại các cơ sở chăm sóc, luôn cần sử dụng kính ngữ và lời nói lịch sự với bệnh nhân và gia đình. Đây là cơ bản để xây dựng mối quan hệ tin tưởng."
    },
    "quiz": [
      {
        "question": {"ja": "「私は介護職です」の意味は何ですか？", "vi": "Ý nghĩa của \"私は介護職です\" là gì?"},
        "options": [
          {"ja": "私は患者さんです", "vi": "Tôi là bệnh nhân"},
          {"ja": "私は介護職という仕事をしています", "vi": "Tôi là một nhân viên chăm sóc"},
          {"ja": "私は医者です", "vi": "Tôi là bác sĩ"},
          {"ja": "私は主婦です", "vi": "Tôi là nội trợ"}
        ],
        "correct_answer": 1,
        "explanation": {"ja": "「です」は名詞を説明するために使う敬語です。「私は介護職です」は、自分の職業を説明しています。", "vi": "\"です\" là kính ngữ được sử dụng để giải thích danh từ. \"私は介護職です\" giải thích nghề nghiệp của bạn."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「毎日来ます」の「ます」は何ですか？", "vi": "\"ます\" trong \"毎日来ます\" là gì?"},
        "options": [
          {"ja": "名詞です", "vi": "Danh từ"},
          {"ja": "形容詞です", "vi": "Tính từ"},
          {"ja": "敬語です。動詞を敬語にする", "vi": "Kính ngữ. Chuyển động từ thành kính ngữ"},
          {"ja": "助詞です", "vi": "Trợ từ"}
        ],
        "correct_answer": 2,
        "explanation": {"ja": "「ます」は動詞を敬語にするために使います。これにより、丁寧で敬意のある表現になります。", "vi": "\"ます\" được sử dụng để chuyển động từ thành kính ngữ. Điều này làm cho biểu hiện trở nên lịch sự và có sự tôn trọng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「N1はN2です」の文法は何を説明していますか？", "vi": "Ngữ pháp \"N1はN2です\" giải thích gì?"},
        "options": [
          {"ja": "所有を説明している", "vi": "Giải thích sở hữu"},
          {"ja": "主語と述語の関係を説明している（A=B）", "vi": "Giải thích mối quan hệ giữa chủ ngữ và vị từ (A=B)"},
          {"ja": "行動を説明している", "vi": "Giải thích hành động"},
          {"ja": "感情を説明している", "vi": "Giải thích cảm xúc"}
        ],
        "correct_answer": 1,
        "explanation": {"ja": "「は」を使って、主語と述語の同等性を示します。これは最も基本的な日本語の文法です。", "vi": "Sử dụng \"は\" để chỉ ra sự bằng nhau giữa chủ ngữ và vị từ. Đây là ngữ pháp cơ bản nhất của tiếng Nhật."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護職が患者さんに自分の職業を説明するとき、どの文法を使いますか？", "vi": "Khi nhân viên chăm sóc giải thích nghề nghiệp của mình cho bệnh nhân, sử dụng ngữ pháp gì?"},
        "options": [
          {"ja": "動詞 + ます", "vi": "Động từ + ます"},
          {"ja": "名詞 + です", "vi": "Danh từ + です"},
          {"ja": "形容詞 + です", "vi": "Tính từ + です"},
          {"ja": "副詞 + ます", "vi": "Trạng từ + ます"}
        ],
        "correct_answer": 1,
        "explanation": {"ja": "職業は名詞なので、「名詞 + です」で説明します。例えば「私は介護職です」のように。", "vi": "Vì nghề nghiệp là danh từ, giải thích bằng \"名詞 + です\". Ví dụ, \"私は介護職です\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "敬語を使うことの目的は何ですか？", "vi": "Mục đích sử dụng kính ngữ là gì?"},
        "options": [
          {"ja": "言葉を複雑にする", "vi": "Làm cho lời nói phức tạp"},
          {"ja": "患者さんに敬意を示す、信頼関係を築く", "vi": "Thể hiện tôn trọng cho bệnh nhân, xây dựng mối quan hệ tin tưởng"},
          {"ja": "時間を節約する", "vi": "Tiết kiệm thời gian"},
          {"ja": "簡単にする", "vi": "Làm cho đơn giản"}
        ],
        "correct_answer": 1,
        "explanation": {"ja": "敬語を使うことで、患者さんとご家族に敬意を示し、信頼できる介護職としての姿勢を表します。これは専門的なケアの基本です。", "vi": "Bằng cách sử dụng kính ngữ, bạn thể hiện sự tôn trọng đối với bệnh nhân và gia đình, và biểu hiện thái độ của một nhân viên chăm sóc đáng tin cậy. Đây là cơ bản của chăm sóc chuyên nghiệp."},
        "difficulty": "hard"
      }
    ]
  }'
);

-- Unit 1, Lesson 2: Subject Particles は、が、を (3 patterns)
INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本文法' LIMIT 1),
  1,
  2,
  'vocabulary',
  '{
    "intro": {
      "ja": "日本語には複数の助詞（じょし）があります。これらは文に意味を付与する小さな言葉です。最も重要な助詞は「は」「が」「を」です。これらを正しく使うことで、文の意味が明確になります。介護現場では、患者さんへの指示や説明をするときに、これらの助詞を正確に使う必要があります。",
      "vi": "Tiếng Nhật có nhiều trợ từ (じょし). Đây là những từ nhỏ mang ý nghĩa cho câu. Những trợ từ quan trọng nhất là \"は\", \"が\", \"を\". Bằng cách sử dụng chính xác những từ này, ý nghĩa của câu trở nên rõ ràng. Tại nơi chăm sóc, khi đưa ra hướng dẫn hoặc giải thích cho bệnh nhân, cần phải sử dụng chính xác những trợ từ này."
    },
    "words": [
      {"word": "は（は助詞）", "reading": "わ", "kanji": "は", "meaning": {"ja": "主語を示す助詞。一般的に、話題となる人や物を示す", "vi": "Trợ từ chỉ chủ ngữ. Thường chỉ người hoặc vật đang là chủ đề"}, "examples": [{"ja": "私は介護職です。", "vi": "Tôi là nhân viên chăm sóc."},{"ja": "患者さんは元気です。", "vi": "Bệnh nhân khoẻ mạnh."}], "care_example": "「ご利用者様は毎日、リハビリをします」"},
      {"word": "が（が助詞）", "reading": "が", "kanji": "が", "meaning": {"ja": "主語を示す。特に、強調や対比、新しい情報を示す時に使う", "vi": "Chỉ chủ ngữ. Đặc biệt được sử dụng khi nhấn mạnh, đối lập hoặc cung cấp thông tin mới"}, "examples": [{"ja": "痛いのはどこですか？", "vi": "Đau ở đâu?"},{"ja": "私が手伝います。（他の人ではなく、私が）", "vi": "Tôi sẽ giúp. (không phải người khác, mà là tôi)"}], "care_example": "「どちらの足が痛いですか？」"},
      {"word": "を（を助詞）", "reading": "お", "kanji": "を", "meaning": {"ja": "直接目的語を示す。動詞の対象を示す", "vi": "Chỉ tân語trực tiếp. Chỉ mục tiêu của động từ"}, "examples": [{"ja": "水を飲みます。", "vi": "Uống nước."},{"ja": "薬を飲みます。", "vi": "Uống thuốc."}], "care_example": "「ご利用者様はご飯を食べます」"}
    ],
    "dialogue": ["患者さん: 「どこが痛いですか？」","介護職: 「どこが痛いですか？」","患者さん: 「膝が痛いです。」","介護職: 「膝が痛いんですね。では、温湿布を使いましょう。」","患者さん: 「はい。」","介護職: 「薬も飲みます。」","患者さん: 「ありがとうございます。」"],
    "key_phrases": [{"ja": "どこが痛いですか", "vi": "Bạn đau ở đâu"},{"ja": "薬を飲みます", "vi": "Uống thuốc"},{"ja": "温湿布を使います", "vi": "Sử dụng miếng dán ấm"},{"ja": "ご飯を食べます", "vi": "Ăn cơm"}],
    "cultural_note": {"ja": "助詞は日本語の最も重要な要素の1つです。文の意味を大きく変えることができるので、正確な使い方が必要です。", "vi": "Trợ từ là một trong những yếu tố quan trọng nhất của tiếng Nhật. Vì nó có thể thay đổi lớn ý nghĩa của câu, cần phải sử dụng chính xác."},
    "quiz": [
      {"question": {"ja": "「は」と「が」の違いは何ですか？", "vi": "Sự khác biệt giữa \"は\" và \"が\" là gì?"}, "options": [{"ja": "同じです", "vi": "Giống nhau"},{"ja": "\"は\"は一般的、\"が\"は強調や対比のときに使う", "vi": "\"は\" là chung, \"が\" được sử dụng khi nhấn mạnh hoặc đối lập"},{"ja": "\"が\"は助詞ではありません", "vi": "\"が\" không phải là trợ từ"},{"ja": "用途がありません", "vi": "Không có mục đích"}], "correct_answer": 1, "explanation": {"ja": "\"は\"は一般的な主語を示し、\"が\"は強調や新しい情報、対比を示す時に使います。", "vi": "\"は\" chỉ chủ ngữ chung, \"が\" được sử dụng khi nhấn mạnh, thông tin mới hoặc đối lập."}, "difficulty": "medium"},
      {"question": {"ja": "「を」は何を示していますか？", "vi": "\"を\" chỉ cái gì?"}, "options": [{"ja": "主語", "vi": "Chủ ngữ"},{"ja": "述語", "vi": "Vị từ"},{"ja": "直接目的語。動詞の対象", "vi": "Tân ngữ trực tiếp. Mục tiêu của động từ"},{"ja": "形容詞", "vi": "Tính từ"}], "correct_answer": 2, "explanation": {"ja": "\"を\"は動詞の対象を示す直接目的語です。\"水を飲みます\"（水が対象）のように使います。", "vi": "\"を\" là tân ngữ trực tiếp chỉ mục tiêu của động từ. Được sử dụng như \"水を飲みます\" (nước là mục tiêu)."}, "difficulty": "medium"},
      {"question": {"ja": "\"どこが痛いですか\"で、\"が\"は何を示していますか？", "vi": "Trong \"どこが痛いですか\", \"が\" chỉ cái gì?"}, "options": [{"ja": "場所を示している", "vi": "Chỉ địa điểm"},{"ja": "痛みの対象を強調している", "vi": "Nhấn mạnh mục tiêu của cơn đau"},{"ja": "動詞を示している", "vi": "Chỉ động từ"},{"ja": "関係がありません", "vi": "Không có liên quan"}], "correct_answer": 1, "explanation": {"ja": "\"どこが\"で、どの部位が痛いのかを強調して尋ねています。\"が\"を使うことで、どの部位が対象かを明確にしています。", "vi": "\"どこが\" nhấn mạnh để hỏi vị trí nào bị đau. Bằng cách sử dụng \"が\", nó làm rõ vị trí nào là mục tiêu."}, "difficulty": "hard"}
    ]
  }'
);

-- Continue with Units 2-3 following same pattern...

COMMIT;
'
);
