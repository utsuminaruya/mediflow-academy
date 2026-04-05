-- seed-n5-grammar.sql
-- N5 Grammar Lessons (18 lessons, sort_order 1-18, xp_reward 25)
-- course: jlpt_level = 'N5', category = 'grammar'

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜は〜です（基本文型）", "vi": "〜は〜です (Cấu trúc câu cơ bản)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 1,
    "lesson_number": 1,
    "intro": {
      "ja": "日本語の最も基本的な文型「〜は〜です」を学びましょう。主語を示す「は」と丁寧な断定の「です」を使います。",
      "vi": "Hãy học cấu trúc câu cơ bản nhất trong tiếng Nhật \"〜は〜です\". Sử dụng \"は\" để chỉ chủ ngữ và \"です\" để khẳng định lịch sự."
    },
    "pattern": {
      "structure": "〔名詞A〕は〔名詞B〕です",
      "meaning_vi": "[Danh từ A] là [Danh từ B]",
      "notes_ja": "「は」は話題を示す助詞（トピックマーカー）です。「です」は丁寧な断定を表します。",
      "notes_vi": "\"は\" là trợ từ chỉ chủ đề (topic marker). \"です\" biểu thị khẳng định lịch sự."
    },
    "examples": [
      {
        "ja": "わたしは かいごしです。",
        "vi": "Tôi là nhân viên chăm sóc.",
        "breakdown": {"わたし": "tôi", "は": "trợ từ chủ đề", "かいごし": "nhân viên chăm sóc", "です": "là (lịch sự)"}
      },
      {
        "ja": "これは くすりです。",
        "vi": "Đây là thuốc.",
        "breakdown": {"これ": "cái này", "は": "trợ từ", "くすり": "thuốc", "です": "là"}
      },
      {
        "ja": "たなかさんは りようしゃです。",
        "vi": "Bà Tanaka là người dùng dịch vụ.",
        "breakdown": {"たなかさん": "bà Tanaka", "は": "trợ từ", "りようしゃ": "người dùng dịch vụ", "です": "là"}
      },
      {
        "ja": "ここは びょういんです。",
        "vi": "Đây là bệnh viện.",
        "breakdown": {"ここ": "đây, nơi này", "は": "trợ từ", "びょういん": "bệnh viện", "です": "là"}
      }
    ],
    "negative": {
      "structure": "〔名詞〕は〔名詞〕ではありません／じゃありません",
      "examples": [
        {"ja": "わたしは いしゃではありません。", "vi": "Tôi không phải bác sĩ."},
        {"ja": "これは くすりじゃありません。", "vi": "Đây không phải thuốc."}
      ]
    },
    "question": {
      "structure": "〔名詞〕は〔名詞〕ですか？",
      "examples": [
        {"ja": "あなたは かいごしですか？", "vi": "Bạn có phải là nhân viên chăm sóc không?"},
        {"ja": "これは たいおんけいですか？", "vi": "Đây có phải là nhiệt kế không?"}
      ]
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「わたし＿かいごしです」の＿に入るのは？", "vi": "Điền vào chỗ trống \"わたし＿かいごしです\"?"},
        "options": ["が", "は", "を", "に"],
        "correct": 1,
        "explanation": {"ja": "主語・話題を示すときは「は」を使います。", "vi": "Dùng \"は\" để chỉ chủ ngữ/chủ đề."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「これはくすりです」の否定形は？", "vi": "Câu phủ định của \"これはくすりです\" là?"},
        "options": ["これはくすりです", "これはくすりではありません", "これをくすりです", "これにくすりです"],
        "correct": 1,
        "explanation": {"ja": "否定は「〜ではありません」または「〜じゃありません」です。", "vi": "Phủ định là \"〜ではありません\" hoặc \"〜じゃありません\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「あなたはかいごしですか？」への正しい答えは？", "vi": "Câu trả lời đúng cho \"あなたはかいごしですか？\" là?"},
        "options": ["はい、かいごしです", "はい、かいごしますか", "いいえ、かいごしです", "はい、かいごします"],
        "correct": 0,
        "explanation": {"ja": "質問「〜ですか？」への答えは「はい、〜です」または「いいえ、〜ではありません」です。", "vi": "Trả lời câu hỏi \"〜ですか？\" là \"はい、〜です\" hoặc \"いいえ、〜ではありません\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護の場面で「ここはトイレですか？」の意味は？", "vi": "Trong bối cảnh chăm sóc, \"ここはトイレですか？\" có nghĩa là?"},
        "options": ["ここはトイレではない", "ここがトイレですか、という質問", "トイレに行きたい", "トイレが遠い"],
        "correct": 1,
        "explanation": {"ja": "「〜ですか？」は質問を作る形です。「ここはトイレですか？」は場所を確認する質問です。", "vi": "\"〜ですか？\" tạo câu hỏi. \"ここはトイレですか？\" là câu hỏi xác nhận địa điểm."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「わたしはいしゃではありません」の正しいベトナム語訳は？", "vi": "Dịch đúng \"わたしはいしゃではありません\" là?"},
        "options": ["Tôi là bác sĩ", "Tôi không phải bác sĩ", "Bạn là bác sĩ", "Bạn không phải bác sĩ"],
        "correct": 1,
        "explanation": {"ja": "わたし＝tôi、いしゃ＝bác sĩ、ではありません＝không phải です。", "vi": "わたし = tôi, いしゃ = bác sĩ, ではありません = không phải."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  1, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜が〜です（主語の強調）", "vi": "〜が〜です (Nhấn mạnh chủ ngữ)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 1,
    "lesson_number": 2,
    "intro": {
      "ja": "「が」は主語を強調したり、新情報を導入するときに使います。「は」との違いを理解しましょう。",
      "vi": "\"が\" được dùng để nhấn mạnh chủ ngữ hoặc dẫn nhập thông tin mới. Hãy hiểu sự khác biệt với \"は\"."
    },
    "pattern": {
      "structure": "〔名詞〕が〔動詞/形容詞〕",
      "meaning_vi": "[Danh từ] (chủ ngữ nhấn mạnh) [động từ/tính từ]",
      "notes_ja": "「が」は主語を特定したり強調する助詞です。疑問詞（だれ・なに・どれ）の答えに使われます。",
      "notes_vi": "\"が\" là trợ từ xác định hoặc nhấn mạnh chủ ngữ. Được dùng để trả lời đại từ nghi vấn (ai, cái gì, cái nào)."
    },
    "examples": [
      {
        "ja": "だれが きましたか？ → たなかさんが きました。",
        "vi": "Ai đến? → Bà Tanaka đến.",
        "breakdown": {"だれ": "ai", "が": "trợ từ chủ ngữ", "きました": "đã đến"}
      },
      {
        "ja": "あたまが いたいです。",
        "vi": "Đầu tôi đau.",
        "breakdown": {"あたま": "đầu", "が": "trợ từ", "いたい": "đau", "です": "lịch sự"}
      },
      {
        "ja": "どれが たなかさんの くすりですか？",
        "vi": "Cái nào là thuốc của bà Tanaka?",
        "breakdown": {"どれ": "cái nào", "が": "trợ từ", "たなかさんの": "của bà Tanaka", "くすり": "thuốc"}
      },
      {
        "ja": "このへやが いちばん あたたかいです。",
        "vi": "Phòng này ấm nhất.",
        "breakdown": {"このへや": "phòng này", "が": "trợ từ nhấn mạnh", "いちばん": "nhất", "あたたかい": "ấm"}
      }
    ],
    "comparison": {
      "title_ja": "「は」と「が」の違い",
      "title_vi": "Sự khác biệt \"は\" và \"が\"",
      "rows": [
        {"は": "話題・既知情報", "が": "新情報・強調・疑問詞の答え"},
        {"は_vi": "chủ đề, thông tin đã biết", "が_vi": "thông tin mới, nhấn mạnh, trả lời đại từ nghi vấn"}
      ]
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「あたま＿いたいです」の＿は？", "vi": "Điền vào \"あたま＿いたいです\"?"},
        "options": ["は", "が", "を", "で"],
        "correct": 1,
        "explanation": {"ja": "体の部位が痛い・かゆいなどの感覚は「が」を使います。", "vi": "Cảm giác đau, ngứa ở bộ phận cơ thể dùng \"が\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「だれが来ましたか」に正しく答えるのは？", "vi": "Câu trả lời đúng cho \"だれが来ましたか\" là?"},
        "options": ["はい、来ました", "たなかさんが来ました", "たなかさんは来ました", "来ましたたなかさん"],
        "correct": 1,
        "explanation": {"ja": "疑問詞「だれ」の答えは「〜が」を使います。", "vi": "Trả lời đại từ nghi vấn \"だれ\" dùng \"〜が\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「おなかがいたいです」のベトナム語訳は？", "vi": "Dịch \"おなかがいたいです\" sang tiếng Việt là?"},
        "options": ["Đầu tôi đau", "Tay tôi đau", "Bụng tôi đau", "Lưng tôi đau"],
        "correct": 2,
        "explanation": {"ja": "おなか＝bụng、いたい＝đau です。", "vi": "おなか = bụng, いたい = đau."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「は」を使う場面はどれですか？", "vi": "Tình huống dùng \"は\" là?"},
        "options": ["新しい情報を導入するとき", "話題として取り上げるとき", "疑問詞の答えとして言うとき", "体の痛みを言うとき"],
        "correct": 1,
        "explanation": {"ja": "「は」は話題を示すとき、既知の情報について話すときに使います。", "vi": "\"は\" được dùng khi chỉ chủ đề, khi nói về thông tin đã biết."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護場面で「どなたが担当ですか？」と聞かれた。正しい答え形は？", "vi": "Được hỏi \"どなたが担当ですか？\" trong bối cảnh chăm sóc. Dạng trả lời đúng là?"},
        "options": ["わたしは担当です", "わたしが担当です", "わたしを担当です", "わたしで担当です"],
        "correct": 1,
        "explanation": {"ja": "「どなたが」という疑問詞の答えは「〜が」を使います。", "vi": "Trả lời đại từ nghi vấn \"どなたが\" dùng \"〜が\"."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  2, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜を〜ます（他動詞の使い方）", "vi": "〜を〜ます (Cách dùng ngoại động từ)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 1,
    "lesson_number": 3,
    "intro": {
      "ja": "「を」は動作の目的語を示す助詞です。介護の動作を表す動詞とともに学びましょう。",
      "vi": "\"を\" là trợ từ chỉ tân ngữ của hành động. Hãy học cùng với các động từ chỉ hành động chăm sóc."
    },
    "pattern": {
      "structure": "〔名詞〕を〔動詞〕ます",
      "meaning_vi": "[Danh từ] (tân ngữ) [động từ]",
      "notes_ja": "「を」は直接目的語を示します。「〜ます」は丁寧な動詞の形です。",
      "notes_vi": "\"を\" chỉ tân ngữ trực tiếp. \"〜ます\" là dạng động từ lịch sự."
    },
    "examples": [
      {
        "ja": "くすりを のみます。",
        "vi": "Uống thuốc.",
        "breakdown": {"くすり": "thuốc", "を": "trợ từ tân ngữ", "のみます": "uống (lịch sự)"}
      },
      {
        "ja": "てを あらいます。",
        "vi": "Rửa tay.",
        "breakdown": {"て": "tay", "を": "trợ từ", "あらいます": "rửa (lịch sự)"}
      },
      {
        "ja": "りようしゃを てつだいます。",
        "vi": "Giúp đỡ người dùng dịch vụ.",
        "breakdown": {"りようしゃ": "người dùng dịch vụ", "を": "trợ từ", "てつだいます": "giúp đỡ"}
      },
      {
        "ja": "きろくを かきます。",
        "vi": "Viết ghi chép.",
        "breakdown": {"きろく": "ghi chép", "を": "trợ từ", "かきます": "viết"}
      }
    ],
    "verb_list": [
      {"dict": "のむ", "masu": "のみます", "vi": "uống"},
      {"dict": "たべる", "masu": "たべます", "vi": "ăn"},
      {"dict": "あらう", "masu": "あらいます", "vi": "rửa"},
      {"dict": "てつだう", "masu": "てつだいます", "vi": "giúp đỡ"},
      {"dict": "かく", "masu": "かきます", "vi": "viết"},
      {"dict": "みる", "masu": "みます", "vi": "xem, kiểm tra"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「くすり＿のみます」の＿は？", "vi": "Điền vào \"くすり＿のみます\"?"},
        "options": ["は", "が", "を", "に"],
        "correct": 2,
        "explanation": {"ja": "動作の目的語（のむ対象）には「を」を使います。", "vi": "Dùng \"を\" cho tân ngữ của hành động (đối tượng được uống)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「てをあらいます」の意味は？", "vi": "\"てをあらいます\" có nghĩa là?"},
        "options": ["手を見ます", "手を洗います", "手を持ちます", "手を切ります"],
        "correct": 1,
        "explanation": {"ja": "て＝手（tay）、あらいます＝洗います（rửa）です。", "vi": "て = tay, あらいます = rửa."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「きろくをかきます」のベトナム語訳は？", "vi": "Dịch \"きろくをかきます\" sang tiếng Việt là?"},
        "options": ["Đọc ghi chép", "Viết ghi chép", "Xóa ghi chép", "Tìm ghi chép"],
        "correct": 1,
        "explanation": {"ja": "きろく＝ghi chép、かきます＝viết です。", "vi": "きろく = ghi chép, かきます = viết."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「てつだいます」の辞書形は？", "vi": "Dạng từ điển của \"てつだいます\" là?"},
        "options": ["てつだう", "てつだえ", "てつだい", "てつだった"],
        "correct": 0,
        "explanation": {"ja": "てつだいます（ます形）の辞書形はてつだう（u動詞）です。", "vi": "Dạng từ điển của てつだいます (dạng ます) là てつだう (động từ nhóm u)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護士が「利用者のせんたくをします」という文で「を」が示すものは？", "vi": "Trong câu \"利用者のせんたくをします\", \"を\" chỉ điều gì?"},
        "options": ["場所", "動作の目的語（洗濯）", "時間", "人"],
        "correct": 1,
        "explanation": {"ja": "「を」は動詞「します」の目的語（せんたく＝giặt đồ）を示します。", "vi": "\"を\" chỉ tân ngữ của động từ \"します\" (せんたく = giặt đồ)."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  3, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜に〜があります／います", "vi": "〜に〜があります／います (Có ở...)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 1,
    "lesson_number": 4,
    "intro": {
      "ja": "「あります」は物の存在、「います」は人・動物の存在を表します。場所を示す「に」と一緒に使います。",
      "vi": "\"あります\" diễn đạt sự tồn tại của đồ vật, \"います\" diễn đạt sự tồn tại của người/động vật. Dùng cùng với \"に\" chỉ nơi chốn."
    },
    "pattern": {
      "structure": "〔場所〕に〔名詞〕が〔あります／います〕",
      "meaning_vi": "Có [danh từ] ở [nơi chốn]",
      "notes_ja": "あります：物・植物の存在。います：人・動物の存在。",
      "notes_vi": "あります: sự tồn tại của đồ vật, thực vật. います: sự tồn tại của người, động vật."
    },
    "examples": [
      {
        "ja": "つくえのうえに くすりが あります。",
        "vi": "Có thuốc trên bàn.",
        "breakdown": {"つくえのうえ": "trên bàn", "に": "ở", "くすり": "thuốc", "が": "trợ từ", "あります": "có (đồ vật)"}
      },
      {
        "ja": "ろうかに りようしゃが います。",
        "vi": "Có người dùng ở hành lang.",
        "breakdown": {"ろうか": "hành lang", "に": "ở", "りようしゃ": "người dùng", "が": "trợ từ", "います": "có (người)"}
      },
      {
        "ja": "となりの へやに かいごしが います。",
        "vi": "Có nhân viên chăm sóc ở phòng bên.",
        "breakdown": {"となりのへや": "phòng bên", "に": "ở", "かいごし": "nhân viên chăm sóc", "います": "có (người)"}
      },
      {
        "ja": "ナースステーションに たいおんけいが あります。",
        "vi": "Có nhiệt kế ở trạm y tá.",
        "breakdown": {"ナースステーション": "trạm y tá", "に": "ở", "たいおんけい": "nhiệt kế", "あります": "có"}
      }
    ],
    "location_words": [
      {"ja": "うえ", "vi": "trên"},
      {"ja": "した", "vi": "dưới"},
      {"ja": "となり", "vi": "bên cạnh"},
      {"ja": "まえ", "vi": "trước"},
      {"ja": "うしろ", "vi": "sau"},
      {"ja": "なか", "vi": "trong"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "人の存在を表すのはどちら？", "vi": "Cái nào biểu thị sự tồn tại của người?"},
        "options": ["あります", "います", "です", "ます"],
        "correct": 1,
        "explanation": {"ja": "人・動物の存在は「います」、物の存在は「あります」を使います。", "vi": "Sự tồn tại của người/động vật dùng \"います\", đồ vật dùng \"あります\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「つくえのうえにくすりが＿」の＿は？", "vi": "Điền vào \"つくえのうえにくすりが＿\"?"},
        "options": ["います", "あります", "ます", "です"],
        "correct": 1,
        "explanation": {"ja": "くすり（薬）は物なので「あります」を使います。", "vi": "くすり (thuốc) là đồ vật nên dùng \"あります\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ろうかにりようしゃがいます」のベトナム語訳は？", "vi": "Dịch \"ろうかにりようしゃがいます\" sang tiếng Việt là?"},
        "options": ["Người dùng đi đến hành lang", "Có người dùng ở hành lang", "Hành lang rộng", "Người dùng rời khỏi hành lang"],
        "correct": 1,
        "explanation": {"ja": "〜にいます＝〜にいる＝có (người) ở... という存在を表します。", "vi": "〜にいます = có (người) ở..., biểu thị sự tồn tại."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "場所を示す助詞は？", "vi": "Trợ từ chỉ nơi chốn (trong cấu trúc tồn tại) là?"},
        "options": ["を", "は", "に", "が"],
        "correct": 2,
        "explanation": {"ja": "存在を表す「あります・います」の前の場所には「に」を使います。", "vi": "Trước nơi chốn trong cấu trúc tồn tại dùng \"に\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ナースステーションのとなりにトイレがあります」の「となり」の意味は？", "vi": "\"となり\" trong \"ナースステーションのとなりにトイレがあります\" có nghĩa là?"},
        "options": ["trước", "trên", "bên cạnh", "sau"],
        "correct": 2,
        "explanation": {"ja": "となり＝bên cạnh（隣）です。", "vi": "となり = bên cạnh (隣)."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  4, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜て形（動詞の連結）", "vi": "Dạng〜て (Nối các động từ)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 2,
    "lesson_number": 5,
    "intro": {
      "ja": "動詞の「て形」は複数の動作を連結したり、依頼・命令を表します。介護の手順説明に欠かせない形です。",
      "vi": "Dạng \"て\" của động từ dùng để nối nhiều hành động hoặc diễn đạt yêu cầu/mệnh lệnh. Đây là dạng không thể thiếu khi giải thích quy trình chăm sóc."
    },
    "pattern": {
      "structure": "〔動詞て形〕＋〔動詞〕／ください",
      "meaning_vi": "[động từ dạng て] + [động từ] / xin hãy...",
      "notes_ja": "て形の作り方：グループ1（u→って/いて）、グループ2（る→て）、グループ3（くる→きて、する→して）",
      "notes_vi": "Cách tạo dạng て: Nhóm 1 (u→って/いて), Nhóm 2 (る→て), Nhóm 3 (くる→きて, する→して)"
    },
    "examples": [
      {
        "ja": "てを あらって、くすりを のんでください。",
        "vi": "Rửa tay rồi uống thuốc.",
        "breakdown": {"てをあらって": "rửa tay (rồi)", "くすりをのんでください": "xin hãy uống thuốc"}
      },
      {
        "ja": "すわって、まってください。",
        "vi": "Ngồi xuống và chờ.",
        "breakdown": {"すわって": "ngồi (rồi)", "まってください": "xin hãy chờ"}
      },
      {
        "ja": "ゆっくり おきて、ベッドのはしに すわってください。",
        "vi": "Từ từ ngồi dậy, rồi ngồi vào mép giường.",
        "breakdown": {"ゆっくりおきて": "từ từ ngồi dậy (rồi)", "ベッドのはしにすわって": "ngồi vào mép giường"}
      }
    ],
    "te_form_table": [
      {"dict": "あらう", "te": "あらって", "vi": "rửa"},
      {"dict": "のむ", "te": "のんで", "vi": "uống"},
      {"dict": "おきる", "te": "おきて", "vi": "ngồi dậy"},
      {"dict": "すわる", "te": "すわって", "vi": "ngồi"},
      {"dict": "くる", "te": "きて", "vi": "đến"},
      {"dict": "する", "te": "して", "vi": "làm"},
      {"dict": "たべる", "te": "たべて", "vi": "ăn"},
      {"dict": "まつ", "te": "まって", "vi": "chờ"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「のむ」のて形は？", "vi": "Dạng て của \"のむ\" là?"},
        "options": ["のんで", "のみて", "のんた", "のもて"],
        "correct": 0,
        "explanation": {"ja": "む→んで（のむ→のんで）です。", "vi": "む→んで (のむ→のんで)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「すわる」のて形は？", "vi": "Dạng て của \"すわる\" là?"},
        "options": ["すわて", "すわって", "すわりて", "すわいて"],
        "correct": 1,
        "explanation": {"ja": "る（グループ1）→って（すわる→すわって）です。", "vi": "る (nhóm 1) → って (すわる→すわって)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「てをあらって、くすりをのんでください」の意味は？", "vi": "\"てをあらって、くすりをのんでください\" có nghĩa là?"},
        "options": ["手を洗わないで薬を飲む", "手を洗ってから薬を飲む", "薬を飲んでから手を洗う", "手も薬も不要"],
        "correct": 1,
        "explanation": {"ja": "〜て＋〜てください＝〜した後に〜する、という順序を表します。", "vi": "〜て + 〜てください = làm... rồi làm..., biểu thị thứ tự."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「する」のて形は？", "vi": "Dạng て của \"する\" là?"},
        "options": ["すて", "して", "すって", "するて"],
        "correct": 1,
        "explanation": {"ja": "する（不規則）→して です。", "vi": "する (bất quy tắc) → して."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護で「ゆっくりおきて、ベッドのはしにすわってください」と言う場面は？", "vi": "Tình huống nào trong chăm sóc nói \"ゆっくりおきて、ベッドのはしにすわってください\"?"},
        "options": ["食事介助", "起床介助・移乗前", "入浴介助", "バイタル測定"],
        "correct": 1,
        "explanation": {"ja": "起床時や移乗の前に、ベッドの端に座ってもらうための声かけです。", "vi": "Đây là cách hỏi khi muốn người dùng ngồi vào mép giường lúc thức dậy hoặc trước khi chuyển vị trí."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  5, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜ています（動作の継続・状態）", "vi": "〜ています (Hành động đang diễn ra / Trạng thái)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 2,
    "lesson_number": 6,
    "intro": {
      "ja": "「〜ています」は動作が進行中であることや、現在の状態を表します。介護記録や状態報告によく使われます。",
      "vi": "\"〜ています\" diễn đạt hành động đang tiến hành hoặc trạng thái hiện tại. Thường dùng trong ghi chép chăm sóc và báo cáo tình trạng."
    },
    "pattern": {
      "structure": "〔動詞て形〕います",
      "meaning_vi": "đang [động từ] / [trạng thái]",
      "notes_ja": "進行：「いま〜ています」（今食べています）。状態：結果の状態（結婚しています＝married）",
      "notes_vi": "Đang tiến hành: \"いま〜ています\" (Đang ăn). Trạng thái: trạng thái kết quả (結婚しています = đã kết hôn)"
    },
    "examples": [
      {
        "ja": "りようしゃは いま しょくじを たべています。",
        "vi": "Người dùng đang ăn cơm.",
        "breakdown": {"りようしゃ": "người dùng", "は": "trợ từ", "いま": "bây giờ", "しょくじをたべています": "đang ăn cơm"}
      },
      {
        "ja": "たなかさんは ねています。",
        "vi": "Bà Tanaka đang ngủ.",
        "breakdown": {"たなかさん": "bà Tanaka", "は": "trợ từ", "ねています": "đang ngủ"}
      },
      {
        "ja": "けつあつが あがっています。",
        "vi": "Huyết áp đang tăng.",
        "breakdown": {"けつあつ": "huyết áp", "が": "trợ từ", "あがっています": "đang tăng"}
      },
      {
        "ja": "かれは まだ くすりを のんでいません。",
        "vi": "Ông ấy vẫn chưa uống thuốc.",
        "breakdown": {"かれ": "ông ấy", "は": "trợ từ", "まだ": "vẫn còn", "くすりをのんでいません": "chưa uống thuốc"}
      }
    ],
    "care_usage": [
      {"situation_ja": "記録を書くとき", "situation_vi": "Khi viết ghi chép", "example_ja": "10時に食事をしています。", "example_vi": "Lúc 10 giờ đang ăn cơm."},
      {"situation_ja": "状態を報告するとき", "situation_vi": "Khi báo cáo tình trạng", "example_ja": "熱が下がっています。", "example_vi": "Sốt đã giảm."},
      {"situation_ja": "申し送りで", "situation_vi": "Khi bàn giao ca", "example_ja": "田中さんは現在休んでいます。", "example_vi": "Hiện bà Tanaka đang nghỉ."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「たなかさんはいまたべています」の意味は？", "vi": "\"たなかさんはいまたべています\" có nghĩa là?"},
        "options": ["田中さんは食べた", "田中さんは今食べている", "田中さんは食べない", "田中さんは食べたい"],
        "correct": 1,
        "explanation": {"ja": "〜ています（進行形）は今まさに〜している状態です。", "vi": "〜ています (tiến hành) là trạng thái đang làm... ngay bây giờ."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「まだ〜ていません」の意味は？", "vi": "\"まだ〜ていません\" có nghĩa là?"},
        "options": ["すでに〜した", "まだ〜していない", "〜するつもりだ", "〜したくない"],
        "correct": 1,
        "explanation": {"ja": "まだ＝vẫn còn、〜ていません＝していない です。まだ〜ていません＝vẫn chưa〜 です。", "vi": "まだ = vẫn còn, 〜ていません = chưa làm. まだ〜ていません = vẫn chưa..."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「けつあつがあがっています」のベトナム語訳は？", "vi": "Dịch \"けつあつがあがっています\" sang tiếng Việt là?"},
        "options": ["Huyết áp thấp", "Huyết áp đang tăng", "Huyết áp bình thường", "Huyết áp ổn định"],
        "correct": 1,
        "explanation": {"ja": "けつあつ＝血圧（huyết áp）、あがっています＝đang tăng です。", "vi": "けつあつ = huyết áp, あがっています = đang tăng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "申し送りで「田中さんは現在休んでいます」は何を伝えていますか？", "vi": "\"田中さんは現在休んでいます\" trong bàn giao ca truyền đạt điều gì?"},
        "options": ["田中さんが休んだこと（過去）", "田中さんが今休んでいる状態", "田中さんが休みたいこと", "田中さんが休まないこと"],
        "correct": 1,
        "explanation": {"ja": "〜ています（状態）は現在の継続した状態を表します。", "vi": "〜ています (trạng thái) biểu thị trạng thái tiếp diễn hiện tại."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「かれはまだくすりをのんでいません」を正しく解釈すると？", "vi": "Diễn giải đúng \"かれはまだくすりをのんでいません\" là?"},
        "options": ["He has already taken medicine", "He still hasn't taken medicine yet", "He doesn't like medicine", "He took medicine a while ago"],
        "correct": 1,
        "explanation": {"ja": "まだ〜ていません＝まだ〜していない＝vẫn chưa〜 です。", "vi": "まだ〜ていません = vẫn chưa..."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  6, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜たい（希望・願望）", "vi": "〜たい (Mong muốn, nguyện vọng)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 2,
    "lesson_number": 7,
    "intro": {
      "ja": "「〜たい」は話し手の希望や願望を表します。利用者のニーズを聞くときに大切な表現です。",
      "vi": "\"〜たい\" diễn đạt mong muốn, nguyện vọng của người nói. Đây là cách diễn đạt quan trọng khi hỏi về nhu cầu của người dùng."
    },
    "pattern": {
      "structure": "〔動詞ます形（語幹）〕たい",
      "meaning_vi": "muốn [động từ]",
      "notes_ja": "ます形の「ます」を取って「たい」をつけます。「〜たいですか？」で希望を聞けます。",
      "notes_vi": "Bỏ \"ます\" của dạng ます và thêm \"たい\". Dùng \"〜たいですか？\" để hỏi về mong muốn."
    },
    "examples": [
      {
        "ja": "トイレに いきたいです。",
        "vi": "Tôi muốn đi vệ sinh.",
        "breakdown": {"トイレに": "đến nhà vệ sinh", "いきたいです": "muốn đi"}
      },
      {
        "ja": "みずを のみたいです。",
        "vi": "Tôi muốn uống nước.",
        "breakdown": {"みず": "nước", "を": "trợ từ", "のみたいです": "muốn uống"}
      },
      {
        "ja": "何が たべたいですか？",
        "vi": "Bạn muốn ăn gì?",
        "breakdown": {"なに": "gì", "が": "trợ từ", "たべたいですか": "có muốn ăn không?"}
      },
      {
        "ja": "かぞくに あいたいです。",
        "vi": "Tôi muốn gặp gia đình.",
        "breakdown": {"かぞく": "gia đình", "に": "trợ từ", "あいたいです": "muốn gặp"}
      }
    ],
    "care_phrases": [
      {"ja": "何がしたいですか？", "vi": "Bạn muốn làm gì?"},
      {"ja": "お風呂に入りたいですか？", "vi": "Bạn có muốn tắm không?"},
      {"ja": "何が食べたいですか？", "vi": "Bạn muốn ăn gì?"},
      {"ja": "トイレに行きたいですか？", "vi": "Bạn có muốn đi vệ sinh không?"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「のむ」を「〜たい」形にすると？", "vi": "Dạng \"〜たい\" của \"のむ\" là?"},
        "options": ["のみたい", "のんたい", "のるたい", "のみます"],
        "correct": 0,
        "explanation": {"ja": "のむ→のみます→のみ＋たい＝のみたい です。", "vi": "のむ→のみます→のみ + たい = のみたい."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「トイレにいきたいです」のベトナム語訳は？", "vi": "Dịch \"トイレにいきたいです\" sang tiếng Việt là?"},
        "options": ["Tôi đi vệ sinh rồi", "Tôi muốn đi vệ sinh", "Tôi không muốn đi vệ sinh", "Tôi đang đi vệ sinh"],
        "correct": 1,
        "explanation": {"ja": "〜たいです＝muốn〜 という希望を表します。", "vi": "〜たいです = muốn..., biểu thị mong muốn."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「なにがたべたいですか？」は何を聞いていますか？", "vi": "\"なにがたべたいですか？\" đang hỏi gì?"},
        "options": ["何を食べたか（過去）", "何が食べたいか（希望）", "何を食べるべきか", "何が食べられるか"],
        "correct": 1,
        "explanation": {"ja": "〜たいですか？＝muốn〜 か？という希望を聞く質問です。", "vi": "〜たいですか？ = câu hỏi về mong muốn."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "利用者が「かぞくにあいたいです」と言った。意味は？", "vi": "Người dùng nói \"かぞくにあいたいです\". Nghĩa là?"},
        "options": ["Gia đình đến rồi", "Muốn gặp gia đình", "Gặp gia đình rồi", "Không muốn gặp gia đình"],
        "correct": 1,
        "explanation": {"ja": "かぞく＝gia đình、あいたい＝muốn gặp です。", "vi": "かぞく = gia đình, あいたい = muốn gặp."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護で「〜たいですか？」と聞く理由は？", "vi": "Lý do hỏi \"〜たいですか？\" trong chăm sóc là?"},
        "options": ["時間を節約するため", "利用者の希望・ニーズを確認するため", "介護士が楽になるため", "記録を簡単にするため"],
        "correct": 1,
        "explanation": {"ja": "利用者の自己決定を尊重するため、希望を確認することが大切です。", "vi": "Để tôn trọng quyền tự quyết của người dùng, việc xác nhận mong muốn rất quan trọng."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  7, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜てください（依頼・指示）", "vi": "〜てください (Yêu cầu, hướng dẫn)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 2,
    "lesson_number": 8,
    "intro": {
      "ja": "「〜てください」は丁寧な依頼や指示を表します。介護の現場で最もよく使う表現の一つです。",
      "vi": "\"〜てください\" diễn đạt yêu cầu hoặc hướng dẫn lịch sự. Đây là một trong những cách diễn đạt được dùng nhiều nhất tại nơi làm việc chăm sóc."
    },
    "pattern": {
      "structure": "〔動詞て形〕ください",
      "meaning_vi": "Xin hãy [động từ]",
      "notes_ja": "「〜てください」はポジティブな依頼。「〜ないでください」は否定の依頼。",
      "notes_vi": "\"〜てください\" là yêu cầu tích cực. \"〜ないでください\" là yêu cầu phủ định."
    },
    "examples": [
      {
        "ja": "てすりを もってください。",
        "vi": "Xin hãy nắm tay vịn.",
        "breakdown": {"てすり": "tay vịn", "を": "trợ từ", "もってください": "xin hãy nắm"}
      },
      {
        "ja": "ゆっくり あるいてください。",
        "vi": "Xin hãy đi từ từ.",
        "breakdown": {"ゆっくり": "từ từ", "あるいてください": "xin hãy đi"}
      },
      {
        "ja": "ここに なまえを かいてください。",
        "vi": "Xin hãy viết tên vào đây.",
        "breakdown": {"ここ": "đây", "に": "vào", "なまえを": "tên", "かいてください": "xin hãy viết"}
      },
      {
        "ja": "くちを あけないでください。",
        "vi": "Xin đừng mở miệng.",
        "breakdown": {"くち": "miệng", "を": "trợ từ", "あけないでください": "xin đừng mở"}
      }
    ],
    "negative_form": {
      "structure": "〔動詞ない形〕ないでください",
      "examples": [
        {"ja": "うごかないでください。", "vi": "Xin đừng cử động."},
        {"ja": "一人で立たないでください。", "vi": "Xin đừng tự đứng dậy một mình."}
      ]
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「もつ」のて形は？", "vi": "Dạng て của \"もつ\" là?"},
        "options": ["もって", "もちて", "もいて", "もるて"],
        "correct": 0,
        "explanation": {"ja": "つ→って（もつ→もって）です。", "vi": "つ→って (もつ→もって)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ゆっくりあるいてください」のベトナム語訳は？", "vi": "Dịch \"ゆっくりあるいてください\" sang tiếng Việt là?"},
        "options": ["Xin hãy chạy nhanh", "Xin hãy đi từ từ", "Xin hãy ngồi xuống", "Xin hãy đứng dậy"],
        "correct": 1,
        "explanation": {"ja": "ゆっくり＝từ từ、あるいて＝đi bộ です。", "vi": "ゆっくり = từ từ, あるいて = đi bộ."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「うごかないでください」の「ないで」は何を表す？", "vi": "\"ないで\" trong \"うごかないでください\" biểu thị gì?"},
        "options": ["肯定の依頼", "否定の依頼（〜しないで）", "過去の動作", "可能"],
        "correct": 1,
        "explanation": {"ja": "〜ないでください＝xin đừng〜 という否定の依頼です。", "vi": "〜ないでください = xin đừng..., yêu cầu phủ định."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「一人でたたないでください」の意味は？", "vi": "\"一人でたたないでください\" có nghĩa là?"},
        "options": ["一人で立ってください", "一人で立たないように", "一人で歩いてください", "一人で寝てください"],
        "correct": 1,
        "explanation": {"ja": "〜ないでください＝するな（丁寧）＝xin đừng〜。転倒防止の声かけです。", "vi": "〜ないでください = đừng làm (lịch sự) = xin đừng... Là cách hỏi để phòng ngã."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "利用者に「ここになまえをかいてください」と言う場面は？", "vi": "Tình huống nói \"ここになまえをかいてください\" với người dùng là?"},
        "options": ["入浴介助", "食事介助", "書類記入や同意書のとき", "移乗介助"],
        "correct": 2,
        "explanation": {"ja": "書類や同意書に名前を書いてもらうときの表現です。", "vi": "Đây là cách nói khi muốn người dùng viết tên vào tài liệu hoặc đơn đồng ý."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  8, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜ませんか／〜ましょう（勧誘）", "vi": "〜ませんか／〜ましょう (Rủ rê, đề nghị cùng làm)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 3,
    "lesson_number": 9,
    "intro": {
      "ja": "「〜ませんか」と「〜ましょう」はどちらも誘いや提案を表しますが、ニュアンスが異なります。介護の場面で自然な誘い方を学びましょう。",
      "vi": "\"〜ませんか\" và \"〜ましょう\" đều diễn đạt lời mời hoặc đề nghị nhưng có sắc thái khác nhau. Hãy học cách rủ rê tự nhiên trong bối cảnh chăm sóc."
    },
    "pattern": {
      "structure_1": "〔動詞ます形〕ませんか？",
      "meaning_1_vi": "Bạn có muốn... không? (mời nhẹ nhàng)",
      "structure_2": "〔動詞ます形〕ましょう",
      "meaning_2_vi": "Chúng ta hãy cùng... (đề nghị cùng làm)",
      "notes_ja": "〜ませんか：相手の意向を確認しながら誘う。〜ましょう：一緒にしようと積極的に提案する。",
      "notes_vi": "〜ませんか: mời trong khi xác nhận ý muốn của đối phương. 〜ましょう: đề nghị tích cực cùng làm."
    },
    "examples": [
      {
        "ja": "いっしょに さんぽしませんか？",
        "vi": "Bạn có muốn cùng đi dạo không?",
        "type": "invitation"
      },
      {
        "ja": "しょくどうへ いきましょう。",
        "vi": "Chúng ta hãy đi đến phòng ăn.",
        "type": "proposal"
      },
      {
        "ja": "ストレッチしませんか？からだに いいですよ。",
        "vi": "Bạn có muốn cùng kéo giãn không? Tốt cho sức khỏe đó.",
        "type": "invitation"
      },
      {
        "ja": "いっしょに うたいましょう！",
        "vi": "Hãy cùng nhau hát nào!",
        "type": "proposal"
      }
    ],
    "difference": {
      "masenka": "より丁寧・相手の気持ちを尊重 / Lịch sự hơn, tôn trọng cảm xúc đối phương",
      "masho": "積極的・一緒にしようという意志 / Tích cực, ý muốn cùng làm"
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「いっしょにさんぽしませんか？」の意味は？", "vi": "\"いっしょにさんぽしませんか？\" có nghĩa là?"},
        "options": ["一緒に散歩した", "一緒に散歩しませんか（誘い）", "一緒に散歩できない", "一緒に散歩する"],
        "correct": 1,
        "explanation": {"ja": "〜ませんか？は「〜しませんか？＝一緒にしませんか？」という誘いです。", "vi": "〜ませんか？ là lời mời \"Bạn có muốn (cùng)... không?\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「しょくどうへいきましょう」は何を表す？", "vi": "\"しょくどうへいきましょう\" biểu thị điều gì?"},
        "options": ["食堂へ行きたくない", "食堂へ一緒に行こう（提案）", "食堂へ行った", "食堂はどこ？"],
        "correct": 1,
        "explanation": {"ja": "〜ましょう＝一緒にしよう（提案・誘い）です。", "vi": "〜ましょう = chúng ta hãy cùng làm (đề nghị, rủ rê)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "より丁寧に誘いたいとき、どちらを使う？", "vi": "Khi muốn mời lịch sự hơn, dùng cái nào?"},
        "options": ["〜ましょう", "〜ませんか", "〜てください", "〜たい"],
        "correct": 1,
        "explanation": {"ja": "「〜ませんか」の方が相手の意向を尊重した丁寧な誘い方です。", "vi": "\"〜ませんか\" là cách mời tôn trọng ý muốn của đối phương hơn."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ストレッチしませんか？からだにいいですよ」の介護的意図は？", "vi": "Ý đồ chăm sóc trong \"ストレッチしませんか？からだにいいですよ\" là?"},
        "options": ["強制的に運動させる", "利用者の自発的参加を促す", "ストレッチを教える", "時間を埋める"],
        "correct": 1,
        "explanation": {"ja": "〜ませんか？は利用者の意思を尊重しながら活動への参加を促す表現です。", "vi": "〜ませんか？ là cách khuyến khích người dùng tự nguyện tham gia hoạt động trong khi tôn trọng ý muốn của họ."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「いっしょにうたいましょう！」を使う場面として最も適切なのは？", "vi": "Tình huống phù hợp nhất để dùng \"いっしょにうたいましょう！\" là?"},
        "options": ["バイタル測定中", "レクリエーション活動中", "就寝前の消灯時", "緊急対応中"],
        "correct": 1,
        "explanation": {"ja": "〜ましょう！は活動への積極的な参加を促す場面で使います。", "vi": "〜ましょう！ được dùng trong các tình huống khuyến khích tham gia tích cực vào hoạt động."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  9, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜から（理由・原因）", "vi": "〜から (Lý do, nguyên nhân)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 3,
    "lesson_number": 10,
    "intro": {
      "ja": "「〜から」は理由や原因を説明するときに使います。介護の説明や報告で「なぜ〜するか」を伝えるのに役立ちます。",
      "vi": "\"〜から\" được dùng khi giải thích lý do hoặc nguyên nhân. Rất hữu ích khi truyền đạt \"tại sao làm...\" trong giải thích và báo cáo chăm sóc."
    },
    "pattern": {
      "structure": "〔文〕から、〔文〕",
      "meaning_vi": "Vì [câu], nên [câu]",
      "notes_ja": "「から」の前は普通形（だ・である）またはです・ます形。",
      "notes_vi": "Trước \"から\" dùng thể thông thường (だ・である) hoặc dạng です・ます."
    },
    "examples": [
      {
        "ja": "ゆかが すべりやすいから、きをつけてください。",
        "vi": "Vì sàn dễ trơn trượt, hãy cẩn thận.",
        "breakdown": {"ゆかがすべりやすい": "sàn dễ trơn", "から": "vì", "きをつけて": "hãy cẩn thận"}
      },
      {
        "ja": "ねつが あるから、きょうは おふろに はいれません。",
        "vi": "Vì có sốt, hôm nay không thể tắm.",
        "breakdown": {"ねつがある": "có sốt", "から": "vì", "おふろにはいれません": "không thể tắm"}
      },
      {
        "ja": "てを あらうから、ちょっとまってください。",
        "vi": "Vì tôi rửa tay, hãy chờ một chút.",
        "breakdown": {"てをあらう": "rửa tay", "から": "vì", "ちょっとまって": "chờ một chút"}
      },
      {
        "ja": "あんぜんだから、あんしんしてください。",
        "vi": "Vì an toàn, hãy yên tâm.",
        "breakdown": {"あんぜんだ": "an toàn", "から": "vì", "あんしんして": "hãy yên tâm"}
      }
    ],
    "care_usage": [
      {"ja": "体調が悪いから、今日は安静にしましょう。", "vi": "Vì sức khỏe không tốt, hôm nay hãy nghỉ ngơi."},
      {"ja": "転倒リスクがあるから、一人で歩かないでください。", "vi": "Vì có nguy cơ ngã, đừng đi một mình."},
      {"ja": "血圧が高いから、看護師に連絡しました。", "vi": "Vì huyết áp cao, tôi đã liên lạc y tá."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「〜から」は何を表す？", "vi": "\"〜から\" biểu thị điều gì?"},
        "options": ["時間", "場所", "理由・原因", "目的"],
        "correct": 2,
        "explanation": {"ja": "「から」は理由・原因を示す接続詞です。", "vi": "\"から\" là liên từ chỉ lý do, nguyên nhân."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ねつがあるから、きょうはおふろにはいれません」の意味は？", "vi": "\"ねつがあるから、きょうはおふろにはいれません\" có nghĩa là?"},
        "options": ["熱があっても風呂に入る", "熱があるので今日は入浴できない", "熱が下がったら風呂に入る", "風呂が好きではない"],
        "correct": 1,
        "explanation": {"ja": "〜から＝vì〜 という理由を述べています。", "vi": "〜から = vì... nêu lý do."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「てをあらうから、ちょっとまってください」のベトナム語訳は？", "vi": "Dịch \"てをあらうから、ちょっとまってください\" sang tiếng Việt là?"},
        "options": ["Tôi đã rửa tay xong rồi", "Vì tôi rửa tay, hãy chờ một chút", "Hãy rửa tay và chờ", "Rửa tay không cần thiết"],
        "correct": 1,
        "explanation": {"ja": "〜から（理由）＋〜てください（依頼）の文です。", "vi": "Câu gồm 〜から (lý do) + 〜てください (yêu cầu)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「転倒リスクがあるから」に続く適切な文は？", "vi": "Câu tiếp theo phù hợp sau \"転倒リスクがあるから\" là?"},
        "options": ["安静にしてください", "一人で歩かないでください", "たくさん食べてください", "大きな声を出してください"],
        "correct": 1,
        "explanation": {"ja": "転倒リスクがある→一人で歩かないでください、が自然な因果関係です。", "vi": "Có nguy cơ ngã → đừng đi một mình, đây là quan hệ nhân quả tự nhiên."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「血圧が高いから、看護師に連絡しました」は何を説明していますか？", "vi": "\"血圧が高いから、看護師に連絡しました\" đang giải thích điều gì?"},
        "options": ["看護師への連絡方法", "連絡した理由（血圧が高い）", "血圧を下げる方法", "看護師の名前"],
        "correct": 1,
        "explanation": {"ja": "「から」を使って、看護師に連絡した理由（血圧が高い）を説明しています。", "vi": "Dùng \"から\" để giải thích lý do liên lạc y tá (huyết áp cao)."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  10, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜ても いいですか（許可を求める）", "vi": "〜てもいいですか (Xin phép)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 3,
    "lesson_number": 11,
    "intro": {
      "ja": "「〜てもいいですか」は相手に許可を求める表現です。介護では何かする前に利用者の許可を得ることが重要です。",
      "vi": "\"〜てもいいですか\" là cách xin phép đối phương. Trong chăm sóc, việc xin phép người dùng trước khi làm gì rất quan trọng."
    },
    "pattern": {
      "structure": "〔動詞て形〕もいいですか？",
      "meaning_vi": "Tôi có thể... không? / Tôi có được... không?",
      "positive_answer": "はい、いいですよ / どうぞ",
      "negative_answer": "いいえ、〜ないでください / ちょっと〜"
    },
    "examples": [
      {
        "ja": "カーテンを あけてもいいですか？",
        "vi": "Tôi có thể mở rèm không?",
        "answer_yes": "はい、どうぞ。",
        "answer_no": "まだ眠いので、もう少し閉めておいてください。"
      },
      {
        "ja": "バイタルを はかってもいいですか？",
        "vi": "Tôi có thể đo sinh hiệu không?",
        "answer_yes": "はい、お願いします。",
        "answer_no": "今は眠いので、少し後でもいいですか。"
      },
      {
        "ja": "おくすりを のんでもいいですか？",
        "vi": "Bạn có thể uống thuốc không? (Tôi có thể cho bạn uống thuốc không?)",
        "answer_yes": "はい、お願いします。",
        "answer_no": "まだ食事が終わっていません。"
      },
      {
        "ja": "てを さわってもいいですか？（脈を測るとき）",
        "vi": "Tôi có thể chạm vào tay bạn không? (Khi đo mạch)",
        "answer_yes": "はい、どうぞ。",
        "answer_no": "今は痛いので、やめてください。"
      }
    ],
    "care_importance": {
      "ja": "介護では「インフォームドコンセント（説明と同意）」が重要です。何かする前に必ず許可を求めましょう。",
      "vi": "Trong chăm sóc, \"Informed Consent (giải thích và đồng ý)\" rất quan trọng. Hãy luôn xin phép trước khi làm gì."
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「カーテンをあけてもいいですか？」の意味は？", "vi": "\"カーテンをあけてもいいですか？\" có nghĩa là?"},
        "options": ["カーテンを開けてください", "カーテンを開けていいか許可を求める", "カーテンが開いている", "カーテンを閉めてください"],
        "correct": 1,
        "explanation": {"ja": "〜てもいいですか＝〜していいですか？という許可を求める表現です。", "vi": "〜てもいいですか = Tôi có được... không?, cách xin phép."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "許可を求めたとき、「どうぞ」は何を意味する？", "vi": "Khi xin phép, \"どうぞ\" có nghĩa là?"},
        "options": ["ダメです", "いいですよ（許可）", "わかりません", "少し待って"],
        "correct": 1,
        "explanation": {"ja": "「どうぞ」＝どうぞ〜してください＝いいですよ という許可の表現です。", "vi": "\"どうぞ\" = được, hãy cứ..., biểu thị cho phép."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "介護で許可を求めることが大切な理由は？", "vi": "Lý do việc xin phép quan trọng trong chăm sóc là?"},
        "options": ["時間がかかるから", "利用者の尊厳と自己決定を尊重するため", "法律で決まっているから", "上司の命令だから"],
        "correct": 1,
        "explanation": {"ja": "利用者のインフォームドコンセントと自己決定権を尊重することが介護の基本です。", "vi": "Tôn trọng quyền tự quyết và Informed Consent của người dùng là nền tảng của chăm sóc."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「バイタルをはかってもいいですか？」に「いいえ」と言われたら？", "vi": "Nếu bị nói \"いいえ\" khi hỏi \"バイタルをはかってもいいですか？\" thì?"},
        "options": ["無視して測定する", "「そうですか。いつがいいですか？」と聞く", "怒る", "帰宅する"],
        "correct": 1,
        "explanation": {"ja": "利用者の意思を尊重し、「いつなら測れますか？」など代替案を提示します。", "vi": "Tôn trọng ý muốn của người dùng và đề xuất phương án thay thế như \"Khi nào thì có thể đo?\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「てをさわってもいいですか？」を脈測定前に言う理由は？", "vi": "Lý do nói \"てをさわってもいいですか？\" trước khi đo mạch là?"},
        "options": ["手が冷たいから", "突然触ることでびっくりさせないため", "脈が測れないから", "手袋をするため"],
        "correct": 1,
        "explanation": {"ja": "突然触ると利用者が驚くため、事前に声かけ・許可を得ることが大切です。", "vi": "Vì chạm đột ngột có thể làm người dùng giật mình, nên việc hỏi trước và xin phép rất quan trọng."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  11, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜ことができる（可能表現）", "vi": "〜ことができる (Diễn đạt khả năng)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 4,
    "lesson_number": 12,
    "intro": {
      "ja": "「〜ことができます」は能力や可能性を表します。利用者のADL（日常生活動作）を確認するのに役立ちます。",
      "vi": "\"〜ことができます\" diễn đạt khả năng hoặc khả năng thực hiện. Rất hữu ích khi xác nhận ADL (hoạt động sinh hoạt hàng ngày) của người dùng."
    },
    "pattern": {
      "structure": "〔動詞辞書形〕ことができます",
      "meaning_vi": "có thể [động từ]",
      "notes_ja": "動詞の可能形（食べられる・歩ける）とほぼ同じ意味。「ことができる」の方がより丁寧・フォーマル。",
      "notes_vi": "Ý nghĩa gần giống dạng khả năng của động từ (食べられる・歩ける). \"ことができる\" trang trọng hơn."
    },
    "examples": [
      {
        "ja": "ひとりで たべることが できますか？",
        "vi": "Bạn có thể tự ăn một mình không?",
        "breakdown": {"ひとりで": "một mình", "たべること": "việc ăn", "が": "trợ từ", "できますか": "có thể không?"}
      },
      {
        "ja": "あるくことは できますが、かいだんは むずかしいです。",
        "vi": "Có thể đi bộ được, nhưng cầu thang thì khó.",
        "breakdown": {"あるくことはできます": "có thể đi bộ", "が": "nhưng", "かいだんはむずかしい": "cầu thang thì khó"}
      },
      {
        "ja": "ひらがなを よむことが できます。",
        "vi": "Có thể đọc hiragana.",
        "breakdown": {"ひらがなを": "hiragana", "よむこと": "việc đọc", "できます": "có thể"}
      }
    ],
    "adl_phrases": [
      {"ja": "一人で食事することができますか？", "vi": "Bạn có thể tự ăn một mình không?"},
      {"ja": "歩くことができますか？", "vi": "Bạn có thể đi bộ không?"},
      {"ja": "お風呂に入ることができますか？", "vi": "Bạn có thể tắm không?"},
      {"ja": "着替えることができますか？", "vi": "Bạn có thể tự thay quần áo không?"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「ひとりでたべることができます」の意味は？", "vi": "\"ひとりでたべることができます\" có nghĩa là?"},
        "options": ["一人で食べたい", "一人で食べることができる", "一人で食べない", "一人で食べた"],
        "correct": 1,
        "explanation": {"ja": "〜ことができます＝có thể〜 という可能を表します。", "vi": "〜ことができます = có thể..., biểu thị khả năng."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ADL」とは何の略ですか？", "vi": "\"ADL\" là viết tắt của gì?"},
        "options": ["Active Daily Life", "Activities of Daily Living", "Assisted Daily Labor", "Aging Daily Life"],
        "correct": 1,
        "explanation": {"ja": "ADL＝Activities of Daily Living＝日常生活動作です。", "vi": "ADL = Activities of Daily Living = hoạt động sinh hoạt hàng ngày."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「あるくことはできますが、かいだんはむずかしいです」の意味は？", "vi": "\"あるくことはできますが、かいだんはむずかしいです\" có nghĩa là?"},
        "options": ["歩けないし、階段も使えない", "歩けるが、階段は難しい", "歩くのが好きで、階段も使える", "歩けないが、階段は使える"],
        "correct": 1,
        "explanation": {"ja": "〜ができますが〜（逆接）は「できること」と「難しいこと」を対比する表現です。", "vi": "〜ができますが〜 (nghịch tiếp) là cách diễn đạt đối lập \"có thể\" và \"khó\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「きがえることができますか？」を介護のどの場面で使う？", "vi": "\"きがえることができますか？\" được dùng trong tình huống chăm sóc nào?"},
        "options": ["食事介助の前", "ADL評価・朝の着替え介助の前", "バイタル測定", "就寝前"],
        "correct": 1,
        "explanation": {"ja": "ADLの着替え能力を確認するときや、朝の着替え介助前に使います。", "vi": "Dùng khi đánh giá ADL về khả năng thay đồ hoặc trước khi hỗ trợ thay đồ buổi sáng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「〜ことができる」と可能形（食べられる）の違いは？", "vi": "Sự khác biệt giữa \"〜ことができる\" và dạng khả năng (食べられる) là?"},
        "options": ["意味が全く違う", "ことができるの方がよりフォーマル", "可能形の方がフォーマル", "どちらも使えない"],
        "correct": 1,
        "explanation": {"ja": "意味はほぼ同じですが、「ことができる」の方がより丁寧・フォーマルな表現です。", "vi": "Ý nghĩa gần giống nhau, nhưng \"ことができる\" trang trọng và lịch sự hơn."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  12, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜なければなりません（義務・必要）", "vi": "〜なければなりません (Nghĩa vụ, cần phải)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 4,
    "lesson_number": 13,
    "intro": {
      "ja": "「〜なければなりません」は義務や必要性を表します。介護職員のルールや手順を説明するときに使います。",
      "vi": "\"〜なければなりません\" diễn đạt nghĩa vụ hoặc sự cần thiết. Dùng khi giải thích các quy tắc và quy trình của nhân viên chăm sóc."
    },
    "pattern": {
      "structure": "〔動詞ない形（語幹）〕なければなりません",
      "meaning_vi": "phải [động từ], cần phải [động từ]",
      "short_form": "〜なきゃ（口語）",
      "notes_ja": "ない形を作り「ない」を「なければなりません」に変える。口語では「〜なきゃ」を使う。",
      "notes_vi": "Tạo dạng ない rồi đổi \"ない\" thành \"なければなりません\". Trong hội thoại dùng \"〜なきゃ\"."
    },
    "examples": [
      {
        "ja": "まいにち てを あらわなければなりません。",
        "vi": "Mỗi ngày phải rửa tay.",
        "breakdown": {"まいにち": "mỗi ngày", "てをあらわなければなりません": "phải rửa tay"}
      },
      {
        "ja": "きろくを かかなければなりません。",
        "vi": "Phải viết ghi chép.",
        "breakdown": {"きろく": "ghi chép", "を": "trợ từ", "かかなければなりません": "phải viết"}
      },
      {
        "ja": "いじょうがあったら、すぐに ほうこくしなければなりません。",
        "vi": "Khi có bất thường, phải báo cáo ngay.",
        "breakdown": {"いじょうがあったら": "khi có bất thường", "すぐに": "ngay lập tức", "ほうこくしなければなりません": "phải báo cáo"}
      }
    ],
    "care_rules": [
      {"ja": "手洗いをしなければなりません。", "vi": "Phải rửa tay."},
      {"ja": "個人情報を守らなければなりません。", "vi": "Phải bảo vệ thông tin cá nhân."},
      {"ja": "毎日記録を書かなければなりません。", "vi": "Phải viết ghi chép mỗi ngày."},
      {"ja": "異常はすぐに報告しなければなりません。", "vi": "Phải báo cáo ngay khi có bất thường."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「かく」の「〜なければなりません」形は？", "vi": "Dạng \"〜なければなりません\" của \"かく\" là?"},
        "options": ["かかなければなりません", "かきなければなりません", "かけなければなりません", "かくなければなりません"],
        "correct": 0,
        "explanation": {"ja": "かく→かかない→かかなければなりません です。", "vi": "かく→かかない→かかなければなりません."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「まいにちてをあらわなければなりません」のベトナム語訳は？", "vi": "Dịch \"まいにちてをあらわなければなりません\" sang tiếng Việt là?"},
        "options": ["Mỗi ngày có thể rửa tay", "Mỗi ngày phải rửa tay", "Mỗi ngày không cần rửa tay", "Mỗi ngày muốn rửa tay"],
        "correct": 1,
        "explanation": {"ja": "〜なければなりません＝phải〜（義務）です。", "vi": "〜なければなりません = phải... (nghĩa vụ)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "介護職員が「ほうこくしなければなりません」とはどういう意味？", "vi": "\"ほうこくしなければなりません\" đối với nhân viên chăm sóc có nghĩa là?"},
        "options": ["報告しなくていい", "報告しなければならない義務がある", "報告したい", "報告できない"],
        "correct": 1,
        "explanation": {"ja": "〜なければなりません＝phải〜、義務・必要性を表します。", "vi": "〜なければなりません = phải..., biểu thị nghĩa vụ, sự cần thiết."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「〜なきゃ」は「〜なければなりません」の何形？", "vi": "\"〜なきゃ\" là dạng gì của \"〜なければなりません\"?"},
        "options": ["丁寧形", "否定形", "口語（くだけた）形", "過去形"],
        "correct": 2,
        "explanation": {"ja": "「〜なきゃ」は「〜なければならない」の口語（話し言葉）形です。", "vi": "\"〜なきゃ\" là dạng hội thoại (nói chuyện thông thường) của \"〜なければならない\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「個人情報をまもらなければなりません」が大切な理由は？", "vi": "Lý do \"個人情報をまもらなければなりません\" quan trọng là?"},
        "options": ["法律で義務付けられているから", "上司の好みだから", "利用者が好きだから", "記録が簡単だから"],
        "correct": 0,
        "explanation": {"ja": "個人情報保護法により、利用者の個人情報を守ることは法的義務です。", "vi": "Theo Luật bảo vệ thông tin cá nhân, việc bảo vệ thông tin cá nhân của người dùng là nghĩa vụ pháp lý."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  13, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜のに（目的）", "vi": "〜のに (Mục đích)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 4,
    "lesson_number": 14,
    "intro": {
      "ja": "「〜のに」は目的を表します。「〜ために」とほぼ同じですが、「〜のに」は名詞や状態動詞にも使えます。",
      "vi": "\"〜のに\" diễn đạt mục đích. Gần giống \"〜ために\" nhưng \"〜のに\" cũng có thể dùng với danh từ và động từ trạng thái."
    },
    "pattern": {
      "structure": "〔動詞辞書形〕のに、〔文〕",
      "meaning_vi": "để [động từ], [câu]",
      "notes_ja": "「〜のに役立つ」「〜のに使う」などの表現で使われます。",
      "notes_vi": "Được dùng trong các cách diễn đạt như \"〜のに役立つ\" (có ích để...) \"〜のに使う\" (dùng để...)."
    },
    "examples": [
      {
        "ja": "これは けつあつを はかるのに つかいます。",
        "vi": "Cái này dùng để đo huyết áp.",
        "breakdown": {"これ": "cái này", "けつあつをはかるのに": "để đo huyết áp", "つかいます": "dùng"}
      },
      {
        "ja": "てすりは あるくのに やくだちます。",
        "vi": "Tay vịn có ích khi đi bộ.",
        "breakdown": {"てすり": "tay vịn", "あるくのに": "để đi bộ", "やくだちます": "có ích"}
      },
      {
        "ja": "にほんごは かいごしごとを するのに ひつようです。",
        "vi": "Tiếng Nhật cần thiết để làm công việc chăm sóc.",
        "breakdown": {"にほんご": "tiếng Nhật", "かいごしごとをするのに": "để làm việc chăm sóc", "ひつようです": "cần thiết"}
      }
    ],
    "useful_expressions": [
      {"ja": "〜のに役立つ", "vi": "có ích để...", "example_ja": "この薬は痛みを和らげるのに役立ちます。", "example_vi": "Thuốc này có ích để giảm đau."},
      {"ja": "〜のに使う", "vi": "dùng để...", "example_ja": "これは体温を測るのに使います。", "example_vi": "Cái này dùng để đo nhiệt độ."},
      {"ja": "〜のに必要だ", "vi": "cần thiết để...", "example_ja": "コミュニケーションは介護するのに必要です。", "example_vi": "Giao tiếp cần thiết để chăm sóc."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「これはけつあつをはかるのにつかいます」の「のに」は何を表す？", "vi": "\"のに\" trong \"これはけつあつをはかるのにつかいます\" biểu thị gì?"},
        "options": ["理由", "目的", "条件", "逆接"],
        "correct": 1,
        "explanation": {"ja": "「〜のに使う」の「のに」は目的を表します。", "vi": "\"のに\" trong \"〜のに使う\" biểu thị mục đích."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「てすりはあるくのにやくだちます」のベトナム語訳は？", "vi": "Dịch \"てすりはあるくのにやくだちます\" sang tiếng Việt là?"},
        "options": ["Tay vịn cản trở đi bộ", "Tay vịn có ích khi đi bộ", "Tay vịn không cần thiết", "Tay vịn nguy hiểm"],
        "correct": 1,
        "explanation": {"ja": "てすり＝tay vịn、あるくのに＝khi/để đi bộ、やくだつ＝có ích です。", "vi": "てすり = tay vịn, あるくのに = khi/để đi bộ, やくだつ = có ích."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「〜のに役立つ」の意味は？", "vi": "\"〜のに役立つ\" có nghĩa là?"},
        "options": ["〜に反対する", "〜のために役に立つ", "〜が嫌いだ", "〜がない"],
        "correct": 1,
        "explanation": {"ja": "〜のに役立つ＝có ích để〜 という意味です。", "vi": "〜のに役立つ = có ích để..."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「にほんごはかいごしごとをするのにひつようです」の意味は？", "vi": "\"にほんごはかいごしごとをするのにひつようです\" có nghĩa là?"},
        "options": ["日本語は介護に役立たない", "日本語は介護の仕事に必要だ", "日本語は難しい", "日本語は簡単だ"],
        "correct": 1,
        "explanation": {"ja": "〜のに必要だ＝cần thiết để〜 です。", "vi": "〜のに必要だ = cần thiết để..."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「この車椅子は移乗するのに使います」の正しいベトナム語訳は？", "vi": "Dịch đúng \"この車椅子は移乗するのに使います\" sang tiếng Việt là?"},
        "options": ["Xe lăn này không cần thiết", "Xe lăn này dùng để chuyển vị trí", "Xe lăn này cũ rồi", "Xe lăn này nguy hiểm"],
        "correct": 1,
        "explanation": {"ja": "〜のに使う＝dùng để〜、移乗する＝chuyển vị trí です。", "vi": "〜のに使う = dùng để..., 移乗する = chuyển vị trí."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  14, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜たことがある（経験）", "vi": "〜たことがある (Kinh nghiệm đã có)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 5,
    "lesson_number": 15,
    "intro": {
      "ja": "「〜たことがあります」は過去の経験を表します。利用者の経験や能力を確認するときに使えます。",
      "vi": "\"〜たことがあります\" diễn đạt kinh nghiệm trong quá khứ. Có thể dùng khi xác nhận kinh nghiệm hoặc khả năng của người dùng."
    },
    "pattern": {
      "structure": "〔動詞た形〕ことがあります",
      "meaning_vi": "đã từng [động từ]",
      "negative": "〜たことがありません（一度もない）",
      "notes_ja": "過去に一度でも経験があることを表す。「一度（いちど）」「以前（いぜん）」と一緒に使うことが多い。",
      "notes_vi": "Biểu thị đã có kinh nghiệm ít nhất một lần trong quá khứ. Thường dùng cùng \"一度\" (một lần) hoặc \"以前\" (trước đây)."
    },
    "examples": [
      {
        "ja": "にほんに いったことが ありますか？",
        "vi": "Bạn đã từng đến Nhật chưa?",
        "breakdown": {"にほんに": "đến Nhật", "いったことがありますか": "đã từng đến chưa?"}
      },
      {
        "ja": "かいごの しごとを したことが あります。",
        "vi": "Tôi đã từng làm công việc chăm sóc.",
        "breakdown": {"かいごのしごとを": "công việc chăm sóc", "したことがあります": "đã từng làm"}
      },
      {
        "ja": "この くすりを のんだことが ありますか？",
        "vi": "Bạn đã từng uống thuốc này chưa?",
        "breakdown": {"このくすり": "thuốc này", "を": "trợ từ", "のんだことがありますか": "đã từng uống chưa?"}
      },
      {
        "ja": "ひとりで ふろに はいったことが ありますか？",
        "vi": "Bạn đã từng tự tắm một mình chưa?",
        "breakdown": {"ひとりで": "một mình", "ふろにはいったことがありますか": "đã từng tắm chưa?"}
      }
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「いく」の「〜たことがある」形は？", "vi": "Dạng \"〜たことがある\" của \"いく\" là?"},
        "options": ["いくことがある", "いったことがある", "いきたことがある", "いってことがある"],
        "correct": 1,
        "explanation": {"ja": "いく→いった（た形）→いったことがある です。", "vi": "いく→いった (dạng た) → いったことがある."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「かいごのしごとをしたことがあります」の意味は？", "vi": "\"かいごのしごとをしたことがあります\" có nghĩa là?"},
        "options": ["介護の仕事をしたい", "介護の仕事をしたことがある（経験）", "介護の仕事をしている", "介護の仕事をしない"],
        "correct": 1,
        "explanation": {"ja": "〜たことがある＝đã từng〜（経験）です。", "vi": "〜たことがある = đã từng... (kinh nghiệm)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「このくすりをのんだことがありますか？」はなぜ聞く？", "vi": "Tại sao hỏi \"このくすりをのんだことがありますか？\"?"},
        "options": ["薬の値段を確認するため", "薬のアレルギーや副作用歴を確認するため", "薬を売るため", "薬の味を聞くため"],
        "correct": 1,
        "explanation": {"ja": "過去に同じ薬を服用した経験があるか確認し、アレルギーや副作用歴を把握します。", "vi": "Xác nhận xem đã từng uống thuốc này chưa, để nắm bắt lịch sử dị ứng và tác dụng phụ."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「〜たことがありません」の意味は？", "vi": "\"〜たことがありません\" có nghĩa là?"},
        "options": ["経験がある", "経験がない（一度もない）", "経験したい", "経験できない"],
        "correct": 1,
        "explanation": {"ja": "〜たことがありません＝chưa từng〜（経験なし）です。", "vi": "〜たことがありません = chưa từng... (không có kinh nghiệm)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "利用者に「ひとりでふろにはいったことがありますか？」と聞く目的は？", "vi": "Mục đích hỏi người dùng \"ひとりでふろにはいったことがありますか？\" là?"},
        "options": ["お風呂の好き嫌いを聞く", "ADL評価のため（入浴の自立度確認）", "お風呂の場所を確認する", "お風呂の温度を聞く"],
        "correct": 1,
        "explanation": {"ja": "ADL評価で入浴動作の自立度（一人でできるか）を確認するための質問です。", "vi": "Đây là câu hỏi để đánh giá ADL, xác nhận mức độ tự lập trong việc tắm (có thể tự làm không)."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  15, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜と思います（意見・推量）", "vi": "〜と思います (Ý kiến, suy đoán)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 5,
    "lesson_number": 16,
    "intro": {
      "ja": "「〜と思います」は意見や推量を表します。介護の観察や評価を報告するときに役立ちます。",
      "vi": "\"〜と思います\" diễn đạt ý kiến hoặc suy đoán. Rất hữu ích khi báo cáo quan sát và đánh giá trong chăm sóc."
    },
    "pattern": {
      "structure": "〔普通形〕と思います",
      "meaning_vi": "Tôi nghĩ (rằng) [câu]",
      "notes_ja": "「と思います」の前は普通形（だ・ではない）。自分の意見や観察を述べるときに使う。",
      "notes_vi": "Trước \"と思います\" dùng thể thông thường (だ・ではない). Dùng khi nêu ý kiến hoặc quan sát của bản thân."
    },
    "examples": [
      {
        "ja": "たなかさんは ねているとおもいます。",
        "vi": "Tôi nghĩ bà Tanaka đang ngủ.",
        "breakdown": {"たなかさんはねている": "bà Tanaka đang ngủ", "とおもいます": "tôi nghĩ"}
      },
      {
        "ja": "ねつが あると おもいます。バイタルを はかります。",
        "vi": "Tôi nghĩ có sốt. Tôi đo sinh hiệu.",
        "breakdown": {"ねつがある": "có sốt", "とおもいます": "tôi nghĩ", "バイタルをはかります": "tôi đo sinh hiệu"}
      },
      {
        "ja": "これは かぜだと おもいます。",
        "vi": "Tôi nghĩ đây là cảm lạnh.",
        "breakdown": {"これは": "đây là", "かぜだ": "cảm lạnh", "とおもいます": "tôi nghĩ"}
      },
      {
        "ja": "もっと すいぶんが ひつようだと おもいます。",
        "vi": "Tôi nghĩ cần thêm nước.",
        "breakdown": {"もっとすいぶんが": "thêm nước", "ひつようだ": "cần thiết", "とおもいます": "tôi nghĩ"}
      }
    ],
    "care_reporting": [
      {"ja": "状態が悪化していると思います。", "vi": "Tôi nghĩ tình trạng đang xấu đi."},
      {"ja": "体調がよくなったと思います。", "vi": "Tôi nghĩ sức khỏe đã tốt hơn."},
      {"ja": "もう少し観察が必要だと思います。", "vi": "Tôi nghĩ cần quan sát thêm một chút."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「〜とおもいます」の前に来る形は？", "vi": "Dạng đứng trước \"〜とおもいます\" là?"},
        "options": ["ます形", "て形", "普通形", "ない形"],
        "correct": 2,
        "explanation": {"ja": "「〜と思います」の前は普通形（だ・ではない・する・しない等）です。", "vi": "Trước \"〜と思います\" dùng thể thông thường (だ・ではない・する・しない, v.v.)."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「たなかさんはねているとおもいます」のベトナム語訳は？", "vi": "Dịch \"たなかさんはねているとおもいます\" sang tiếng Việt là?"},
        "options": ["Bà Tanaka muốn ngủ", "Tôi nghĩ bà Tanaka đang ngủ", "Bà Tanaka đã ngủ xong rồi", "Bà Tanaka không ngủ"],
        "correct": 1,
        "explanation": {"ja": "〜ているとおもいます＝Tôi nghĩ〜đang〜 です。", "vi": "〜ているとおもいます = Tôi nghĩ... đang..."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ねつがあるとおもいます」と言うのはいつ？", "vi": "Nói \"ねつがあるとおもいます\" khi nào?"},
        "options": ["確実に熱があると分かったとき", "熱があるかもしれないと感じるとき", "熱が下がったとき", "元気なとき"],
        "correct": 1,
        "explanation": {"ja": "「と思います」は確認前の推量・観察を表します。確実なときは「あります」と言います。", "vi": "\"と思います\" biểu thị suy đoán, quan sát trước khi xác nhận. Khi chắc chắn thì nói \"あります\"."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "報告で「〜と思います」を使う利点は？", "vi": "Ưu điểm của việc dùng \"〜と思います\" trong báo cáo là?"},
        "options": ["断定を避け、観察・推量を示す", "時間を節約できる", "丁寧に聞こえる", "記録に書かなくていい"],
        "correct": 0,
        "explanation": {"ja": "「〜と思います」は断定せず、観察に基づく推量であることを示し、正確な報告に役立ちます。", "vi": "\"〜と思います\" không khẳng định chắc chắn, cho thấy đây là suy đoán dựa trên quan sát, giúp báo cáo chính xác hơn."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「もっとすいぶんがひつようだとおもいます」は何を観察して言っている？", "vi": "Quan sát điều gì để nói \"もっとすいぶんがひつようだとおもいます\"?"},
        "options": ["食事量が多い", "尿の色が濃い・口が乾いているなど脱水の兆候", "体重が増えた", "血圧が高い"],
        "correct": 1,
        "explanation": {"ja": "尿の色、口の乾燥、皮膚のはり具合などから脱水を観察し、水分補給の必要性を伝えます。", "vi": "Quan sát các dấu hiệu mất nước như màu nước tiểu, miệng khô, độ đàn hồi của da để truyền đạt nhu cầu bổ sung nước."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  16, 25
);

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜ないでください（禁止・注意）", "vi": "〜ないでください (Cấm, nhắc nhở)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 5,
    "lesson_number": 17,
    "intro": {
      "ja": "「〜ないでください」は丁寧な禁止や注意を表します。利用者の安全を守るための注意喚起に必要な表現です。",
      "vi": "\"〜ないでください\" diễn đạt cấm hoặc nhắc nhở lịch sự. Đây là cách diễn đạt cần thiết để cảnh báo bảo vệ an toàn của người dùng."
    },
    "pattern": {
      "structure": "〔動詞ない形〕ないでください",
      "meaning_vi": "Xin đừng [động từ]",
      "notes_ja": "ない形を作り「ない」を「ないでください」に変える。「〜てはいけません」より柔らかい表現。",
      "notes_vi": "Tạo dạng ない rồi đổi \"ない\" thành \"ないでください\". Cách diễn đạt nhẹ nhàng hơn \"〜てはいけません\"."
    },
    "examples": [
      {
        "ja": "ひとりで たちあがらないでください。",
        "vi": "Xin đừng tự đứng dậy một mình.",
        "breakdown": {"ひとりで": "một mình", "たちあがらないでください": "xin đừng đứng dậy"}
      },
      {
        "ja": "てすりを はなさないでください。",
        "vi": "Xin đừng buông tay vịn.",
        "breakdown": {"てすりを": "tay vịn", "はなさないでください": "xin đừng buông"}
      },
      {
        "ja": "まだ たべないでください。くすりを のんでから たべます。",
        "vi": "Xin chưa ăn. Sau khi uống thuốc mới ăn.",
        "breakdown": {"まだたべないで": "chưa ăn", "ください": "xin", "くすりをのんでから": "sau khi uống thuốc"}
      },
      {
        "ja": "あせらないでください。ゆっくりで いいですよ。",
        "vi": "Xin đừng vội. Từ từ cũng được.",
        "breakdown": {"あせらないでください": "xin đừng vội", "ゆっくりでいいですよ": "từ từ cũng được"}
      }
    ],
    "safety_phrases": [
      {"ja": "一人で歩かないでください。", "vi": "Xin đừng đi một mình."},
      {"ja": "手すりを離さないでください。", "vi": "Xin đừng buông tay vịn."},
      {"ja": "急に立ち上がらないでください。", "vi": "Xin đừng đứng dậy đột ngột."},
      {"ja": "ベッドから降りないでください。", "vi": "Xin đừng xuống giường."}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「たつ」の「〜ないでください」形は？", "vi": "Dạng \"〜ないでください\" của \"たつ\" là?"},
        "options": ["たたないでください", "たちないでください", "たてないでください", "たってないでください"],
        "correct": 0,
        "explanation": {"ja": "たつ→たたない→たたないでください です。", "vi": "たつ→たたない→たたないでください."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ひとりでたちあがらないでください」のベトナム語訳は？", "vi": "Dịch \"ひとりでたちあがらないでください\" sang tiếng Việt là?"},
        "options": ["Hãy tự đứng dậy", "Xin đừng tự đứng dậy một mình", "Hãy ngồi xuống", "Xin hãy chờ"],
        "correct": 1,
        "explanation": {"ja": "〜ないでください＝Xin đừng〜 という丁寧な禁止です。", "vi": "〜ないでください = Xin đừng..., cấm lịch sự."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "安全のための注意として適切なのは？", "vi": "Câu nào phù hợp như nhắc nhở an toàn?"},
        "options": ["急に立ち上がってください", "急に立ち上がらないでください", "もっと速く歩いてください", "一人でお風呂に入ってください"],
        "correct": 1,
        "explanation": {"ja": "急に立ち上がると転倒や立ちくらみの危険があるため、「〜ないでください」で注意します。", "vi": "Đứng dậy đột ngột có thể gây ngã hoặc chóng mặt, nên dùng \"〜ないでください\" để nhắc nhở."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「あせらないでください。ゆっくりでいいですよ」の介護的メッセージは？", "vi": "Thông điệp chăm sóc trong \"あせらないでください。ゆっくりでいいですよ\" là?"},
        "options": ["急がせる", "利用者に安心感とゆとりを与える", "時間がないと伝える", "退去を促す"],
        "correct": 1,
        "explanation": {"ja": "利用者に焦らせず安心感を与え、自分のペースでケアを受けられるよう配慮しています。", "vi": "Không để người dùng vội, mang lại cảm giác an tâm và cho phép nhận chăm sóc theo nhịp của bản thân."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「〜ないでください」と「〜てはいけません」の違いは？", "vi": "Sự khác biệt giữa \"〜ないでください\" và \"〜てはいけません\" là?"},
        "options": ["意味が全く違う", "〜ないでください の方が柔らかい表現", "〜てはいけません の方が柔らかい", "どちらも同じ"],
        "correct": 1,
        "explanation": {"ja": "「〜ないでください」は丁寧な依頼・注意で、「〜てはいけません」は強い禁止です。", "vi": "\"〜ないでください\" là nhắc nhở lịch sự, \"〜てはいけません\" là cấm đoán mạnh mẽ hơn."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  17, 25
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'grammar' LIMIT 1),
  '{"ja": "〜でしょう／〜かもしれません（推量）", "vi": "〜でしょう／〜かもしれません (Suy đoán)"}'::jsonb,
  '{
    "type": "grammar",
    "unit": 6,
    "lesson_number": 18,
    "intro": {
      "ja": "「〜でしょう」と「〜かもしれません」は両方とも推量を表しますが、確信の度合いが異なります。介護の観察・報告に使えます。",
      "vi": "\"〜でしょう\" và \"〜かもしれません\" đều diễn đạt suy đoán nhưng mức độ chắc chắn khác nhau. Có thể dùng trong quan sát và báo cáo chăm sóc."
    },
    "pattern": {
      "desho": {
        "structure": "〔普通形〕でしょう",
        "certainty": "比較的確信が高い（70〜80%）",
        "certainty_vi": "Mức độ chắc chắn tương đối cao (70-80%)"
      },
      "kamoshiremasen": {
        "structure": "〔普通形〕かもしれません",
        "certainty": "不確かさが高い（30〜50%）",
        "certainty_vi": "Mức độ không chắc chắn cao (30-50%)"
      }
    },
    "examples": [
      {
        "ja": "たなかさんは もうすぐ おきるでしょう。",
        "vi": "Bà Tanaka chắc sắp thức dậy rồi.",
        "type": "desho"
      },
      {
        "ja": "これは かぜかもしれません。",
        "vi": "Đây có thể là cảm lạnh.",
        "type": "kamoshiremasen"
      },
      {
        "ja": "ねつが あるでしょう。たいおんを はかりましょう。",
        "vi": "Chắc có sốt rồi. Hãy đo nhiệt độ.",
        "type": "desho"
      },
      {
        "ja": "すいぶんが たりないかもしれません。おみずを のんでください。",
        "vi": "Có thể thiếu nước. Hãy uống nước.",
        "type": "kamoshiremasen"
      }
    ],
    "usage_comparison": [
      {
        "situation_ja": "症状がはっきりしているとき",
        "situation_vi": "Khi triệu chứng rõ ràng",
        "example_ja": "熱があるでしょう（より確信）",
        "example_vi": "Chắc có sốt rồi (chắc chắn hơn)"
      },
      {
        "situation_ja": "原因が不明確なとき",
        "situation_vi": "Khi nguyên nhân không rõ",
        "example_ja": "疲れているかもしれません（可能性）",
        "example_vi": "Có thể đang mệt (khả năng)"
      }
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「〜かもしれません」は何%くらいの確信度？", "vi": "\"〜かもしれません\" có mức độ chắc chắn khoảng bao nhiêu %?"},
        "options": ["90〜100%", "70〜80%", "30〜50%", "0〜10%"],
        "correct": 2,
        "explanation": {"ja": "「〜かもしれません」は30〜50%程度の不確かな推量です。", "vi": "\"〜かもしれません\" là suy đoán không chắc chắn khoảng 30-50%."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「これはかぜかもしれません」の意味は？", "vi": "\"これはかぜかもしれません\" có nghĩa là?"},
        "options": ["確実に風邪だ", "風邪かもしれない（不確か）", "風邪ではない", "風邪がひどい"],
        "correct": 1,
        "explanation": {"ja": "「かもしれません」は「〜の可能性がある」という不確かな推量です。", "vi": "\"かもしれません\" là suy đoán không chắc \"có khả năng là...\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「すいぶんがたりないかもしれません」に続く適切な行動は？", "vi": "Hành động phù hợp tiếp theo sau \"すいぶんがたりないかもしれません\" là?"},
        "options": ["無視する", "水を飲んでもらう", "食事をとめる", "すぐに入院させる"],
        "correct": 1,
        "explanation": {"ja": "水分不足の可能性があるため、水や飲み物を提供します。", "vi": "Vì có thể thiếu nước, hãy cung cấp nước hoặc đồ uống."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ねつがあるでしょう」と「ねつがあるかもしれません」の違いは？", "vi": "Sự khác biệt giữa \"ねつがあるでしょう\" và \"ねつがあるかもしれません\" là?"},
        "options": ["意味が全く同じ", "でしょうの方が確信が高い", "かもしれませんの方が確信が高い", "どちらも100%確実"],
        "correct": 1,
        "explanation": {"ja": "「でしょう」の方が確信度が高く、「かもしれません」はより不確かです。", "vi": "\"でしょう\" có mức độ chắc chắn cao hơn, \"かもしれません\" không chắc hơn."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護報告で「〜かもしれません」を使う場面は？", "vi": "Tình huống dùng \"〜かもしれません\" trong báo cáo chăm sóc là?"},
        "options": ["確実に診断がついているとき", "原因や状態が不明確で観察が必要なとき", "利用者が元気なとき", "書類を書くとき"],
        "correct": 1,
        "explanation": {"ja": "確定診断ではなく、可能性・推量として観察結果を報告するときに「かもしれません」を使います。", "vi": "Dùng \"かもしれません\" khi báo cáo kết quả quan sát như khả năng, suy đoán chứ không phải chẩn đoán chắc chắn."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  18, 25
);

