-- ============================================================
-- Mediflow Academy: N5 Vocabulary Unit 1-5 (Lessons 1-20)
-- ============================================================

-- Unit 1: あいさつ・基本表現 (Lessons 1-4)

-- Lesson 1: おはようございます、こんにちは、こんばんは、さようなら
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 1 Lesson 1: 基本のあいさつ①", "vi": "Unit 1 Bài 1: Lời chào cơ bản ①"}',
  '{
    "type": "vocabulary",
    "unit": 1,
    "lesson_number": 1,
    "intro": {
      "ja": "今日は基本的なあいさつを学びましょう！介護の現場でも毎日使う大切な言葉です。",
      "vi": "Hôm nay chúng ta sẽ học các lời chào cơ bản! Đây là những từ quan trọng được sử dụng hàng ngày trong môi trường chăm sóc."
    },
    "words": [
      {
        "word": "おはようございます",
        "reading": "おはようございます",
        "kanji": null,
        "meaning": {
          "vi": "Xin chào (buổi sáng)",
          "ja": "朝のあいさつ"
        },
        "examples": [
          {
            "ja": "おはようございます。今日もよろしくお願いします。",
            "vi": "Xin chào buổi sáng. Hôm nay cũng nhờ mọi người giúp đỡ."
          }
        ],
        "care_example": {
          "ja": "利用者さんの部屋に入る時：「○○さん、おはようございます。体調はいかがですか？」",
          "vi": "Khi vào phòng người được chăm sóc: '○○ san, ohayou gozaimasu. Taichou wa ikaga desu ka?' (○○ san, chào buổi sáng. Hôm nay sức khỏe thế nào?)"
        }
      },
      {
        "word": "こんにちは",
        "reading": "こんにちは",
        "kanji": null,
        "meaning": {
          "vi": "Xin chào (ban ngày)",
          "ja": "昼のあいさつ"
        },
        "examples": [
          {
            "ja": "こんにちは。お元気ですか？",
            "vi": "Xin chào. Bạn có khỏe không?"
          }
        ],
        "care_example": {
          "ja": "日中の訪問時：「こんにちは、○○さん。今日のご昼食はいかがでしたか？」",
          "vi": "Khi thăm vào ban ngày: 'Konnichiwa, ○○ san. Kyou no gochuushoku wa ikaga deshita ka?' (Xin chào ○○ san. Bữa trưa hôm nay thế nào?)"
        }
      },
      {
        "word": "こんばんは",
        "reading": "こんばんは",
        "kanji": null,
        "meaning": {
          "vi": "Xin chào (buổi tối)",
          "ja": "夜のあいさつ"
        },
        "examples": [
          {
            "ja": "こんばんは。夜分に失礼します。",
            "vi": "Xin chào buổi tối. Xin lỗi vì đến vào buổi tối."
          }
        ],
        "care_example": {
          "ja": "夜勤の開始時：「こんばんは、○○さん。夜のお薬のお時間です。」",
          "vi": "Khi bắt đầu ca đêm: 'Konbanwa, ○○ san. Yoru no okusuri no ojikan desu.' (Chào buổi tối ○○ san. Đã đến giờ uống thuốc tối.)"
        }
      },
      {
        "word": "さようなら",
        "reading": "さようなら",
        "kanji": null,
        "meaning": {
          "vi": "Tạm biệt",
          "ja": "別れのあいさつ"
        },
        "examples": [
          {
            "ja": "さようなら。また明日来ます。",
            "vi": "Tạm biệt. Ngày mai tôi sẽ đến lại."
          }
        ],
        "care_example": {
          "ja": "退勤時：「○○さん、さようなら。明日もお待ちしております。」",
          "vi": "Khi kết thúc ca: '○○ san, sayounara. Ashita mo omachi shite orimasu.' (○○ san, tạm biệt. Ngày mai chúng tôi sẽ chờ bạn.)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "介護施設の朝", "vi": "Buổi sáng ở cơ sở chăm sóc"},
      "scene": {"ja": "介護スタッフ（マイ）が利用者（田中さん）の部屋を朝の訪問します。", "vi": "Nhân viên chăm sóc (Mai) đến thăm phòng người được chăm sóc (Tanaka san) vào buổi sáng."},
      "lines": [
        {"speaker": "staff", "ja": "おはようございます、田中さん。", "vi": "Chào buổi sáng, Tanaka san."},
        {"speaker": "resident", "ja": "おはようございます。", "vi": "Chào buổi sáng."},
        {"speaker": "staff", "ja": "今日もいいお天気ですね。", "vi": "Hôm nay thời tiết đẹp nhỉ."},
        {"speaker": "resident", "ja": "そうですね。こんにちは、マイさん。", "vi": "Đúng vậy. Xin chào Mai san."}
      ],
      "key_phrases": [
        {"ja": "おはようございます", "vi": "Chào buổi sáng", "note_vi": "Dùng từ sáng đến khoảng 10-11 giờ"},
        {"ja": "こんにちは", "vi": "Xin chào (ban ngày)", "note_vi": "Dùng từ 11 giờ đến 18 giờ"}
      ],
      "cultural_note": {
        "ja": "日本の介護現場では、利用者さんへのあいさつは非常に大切にされています。笑顔で明るくあいさつすることで、利用者さんの気持ちも明るくなります。",
        "vi": "Trong môi trường chăm sóc ở Nhật Bản, lời chào với người được chăm sóc rất quan trọng. Chào hỏi với nụ cười tươi sáng sẽ làm tâm trạng của người được chăm sóc trở nên vui vẻ hơn."
      }
    }
  }',
  '[
    {
      "question": {"ja": "朝のあいさつはどれですか？", "vi": "Lời chào nào dùng vào buổi sáng?"},
      "options": [
        {"ja": "こんばんは", "vi": "Konbanwa"},
        {"ja": "おはようございます", "vi": "Ohayou gozaimasu"},
        {"ja": "さようなら", "vi": "Sayounara"},
        {"ja": "こんにちは", "vi": "Konnichiwa"}
      ],
      "correct": 1,
      "explanation": {"ja": "「おはようございます」は朝のあいさつです。", "vi": "\"Ohayou gozaimasu\" là lời chào buổi sáng."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「こんばんは」はいつ使いますか？", "vi": "\"Konbanwa\" được dùng khi nào?"},
      "options": [
        {"ja": "朝", "vi": "Buổi sáng"},
        {"ja": "昼", "vi": "Ban ngày"},
        {"ja": "夜", "vi": "Buổi tối"},
        {"ja": "いつでも", "vi": "Bất cứ lúc nào"}
      ],
      "correct": 2,
      "explanation": {"ja": "「こんばんは」は夜のあいさつです。", "vi": "\"Konbanwa\" là lời chào buổi tối."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "利用者さんに別れを告げる時、何と言いますか？", "vi": "Bạn nói gì khi tạm biệt người được chăm sóc?"},
      "options": [
        {"ja": "おはようございます", "vi": "Ohayou gozaimasu"},
        {"ja": "こんにちは", "vi": "Konnichiwa"},
        {"ja": "さようなら", "vi": "Sayounara"},
        {"ja": "こんばんは", "vi": "Konbanwa"}
      ],
      "correct": 2,
      "explanation": {"ja": "「さようなら」は別れのあいさつです。", "vi": "\"Sayounara\" là lời chào tạm biệt."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "介護施設で午後2時に利用者さんに会いました。何と言いますか？", "vi": "Bạn gặp người được chăm sóc lúc 2 giờ chiều tại cơ sở chăm sóc. Bạn nói gì?"},
      "options": [
        {"ja": "おはようございます", "vi": "Ohayou gozaimasu"},
        {"ja": "こんにちは", "vi": "Konnichiwa"},
        {"ja": "こんばんは", "vi": "Konbanwa"},
        {"ja": "さようなら", "vi": "Sayounara"}
      ],
      "correct": 1,
      "explanation": {"ja": "午後2時は昼なので「こんにちは」を使います。", "vi": "2 giờ chiều là ban ngày nên dùng \"Konnichiwa\"."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "夜勤スタッフが利用者さんの部屋に入る時、最も適切なあいさつはどれですか？", "vi": "Khi nhân viên ca đêm vào phòng người được chăm sóc, lời chào nào phù hợp nhất?"},
      "options": [
        {"ja": "おはようございます、よく眠れましたか？", "vi": "Ohayou gozaimasu, yoku nemuremashita ka?"},
        {"ja": "こんにちは、お昼ご飯の時間です。", "vi": "Konnichiwa, oohirugohan no jikan desu."},
        {"ja": "こんばんは、夜のお薬の時間です。", "vi": "Konbanwa, yoru no okusuri no jikan desu."},
        {"ja": "さようなら、また明日。", "vi": "Sayounara, mata ashita."}
      ],
      "correct": 2,
      "explanation": {"ja": "夜勤の訪問には「こんばんは」が適切です。夜の薬の時間を伝えています。", "vi": "Khi thăm vào ca đêm, \"Konbanwa\" là thích hợp. Thông báo về giờ uống thuốc tối."},
      "difficulty": "hard"
    }
  ]',
  1,
  20
);

-- Lesson 2: ありがとうございます、すみません、はい、いいえ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 1 Lesson 2: 基本のあいさつ②", "vi": "Unit 1 Bài 2: Lời chào cơ bản ②"}',
  '{
    "type": "vocabulary",
    "unit": 1,
    "lesson_number": 2,
    "intro": {
      "ja": "感謝や返事の言葉を学びましょう。介護の現場でとても重要な表現です。",
      "vi": "Hãy học các từ cảm ơn và trả lời. Đây là những biểu đạt rất quan trọng trong môi trường chăm sóc."
    },
    "words": [
      {
        "word": "ありがとうございます",
        "reading": "ありがとうございます",
        "kanji": null,
        "meaning": {
          "vi": "Cảm ơn (lịch sự)",
          "ja": "感謝の言葉（丁寧）"
        },
        "examples": [
          {
            "ja": "ありがとうございます。助かりました。",
            "vi": "Cảm ơn. Tôi đã được giúp đỡ."
          }
        ],
        "care_example": {
          "ja": "利用者さんが感謝してくれた時：「ありがとうございます。またいつでも呼んでください。」",
          "vi": "Khi người được chăm sóc cảm ơn bạn: 'Arigatou gozaimasu. Mata itsudemo yonde kudasai.' (Cảm ơn. Hãy gọi tôi bất cứ lúc nào.)"
        }
      },
      {
        "word": "すみません",
        "reading": "すみません",
        "kanji": null,
        "meaning": {
          "vi": "Xin lỗi / Xin phép (đa năng)",
          "ja": "謝罪・呼びかけ・感謝の言葉"
        },
        "examples": [
          {
            "ja": "すみません、少しよろしいですか？",
            "vi": "Xin lỗi, bạn có thể cho tôi một chút không?"
          }
        ],
        "care_example": {
          "ja": "忙しそうな同僚に声をかける時：「すみません、○○さんのお体を拭くのを手伝ってもらえますか？」",
          "vi": "Khi gọi đồng nghiệp đang bận: 'Sumimasen, ○○ san no okarada wo fuku no wo tetsudatte moraemasu ka?' (Xin lỗi, bạn có thể giúp tôi lau người cho ○○ san không?)"
        }
      },
      {
        "word": "はい",
        "reading": "はい",
        "kanji": null,
        "meaning": {
          "vi": "Vâng / Có / Đúng",
          "ja": "肯定の返事"
        },
        "examples": [
          {
            "ja": "はい、わかりました。",
            "vi": "Vâng, tôi hiểu rồi."
          }
        ],
        "care_example": {
          "ja": "指示を受けた時：「はい、すぐに参ります。」",
          "vi": "Khi nhận hướng dẫn: 'Hai, sugu ni mairimasu.' (Vâng, tôi sẽ đến ngay.)"
        }
      },
      {
        "word": "いいえ",
        "reading": "いいえ",
        "kanji": null,
        "meaning": {
          "vi": "Không / Không phải",
          "ja": "否定の返事"
        },
        "examples": [
          {
            "ja": "いいえ、大丈夫です。",
            "vi": "Không, tôi ổn thôi."
          }
        ],
        "care_example": {
          "ja": "利用者さんの確認時：「お体は痛くないですか？」「いいえ、大丈夫です。」",
          "vi": "Khi kiểm tra tình trạng người được chăm sóc: 'Okarada wa itakunai desu ka?' 'Iie, daijoubu desu.' ('Cơ thể có đau không?' 'Không, tôi ổn.')"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "感謝のやりとり", "vi": "Trao đổi lời cảm ơn"},
      "scene": {"ja": "介護スタッフ（リン）が利用者（鈴木さん）の手伝いをします。", "vi": "Nhân viên chăm sóc (Linh) giúp đỡ người được chăm sóc (Suzuki san)."},
      "lines": [
        {"speaker": "staff", "ja": "すみません、鈴木さん。お茶をどうぞ。", "vi": "Xin lỗi, Suzuki san. Xin mời uống trà."},
        {"speaker": "resident", "ja": "ありがとうございます。", "vi": "Cảm ơn."},
        {"speaker": "staff", "ja": "砂糖はいりますか？", "vi": "Bạn có muốn đường không?"},
        {"speaker": "resident", "ja": "いいえ、いいです。ありがとうございます。", "vi": "Không, không cần. Cảm ơn."},
        {"speaker": "staff", "ja": "はい、わかりました。", "vi": "Vâng, tôi hiểu rồi."}
      ],
      "key_phrases": [
        {"ja": "すみません", "vi": "Xin lỗi / Xin phép", "note_vi": "Có thể dùng để xin lỗi, thu hút sự chú ý, hoặc cảm ơn"},
        {"ja": "ありがとうございます", "vi": "Cảm ơn (lịch sự)", "note_vi": "Dạng lịch sự hơn là \"arigatou\" đơn giản"}
      ],
      "cultural_note": {
        "ja": "「すみません」は日本語でとても便利な言葉です。謝罪、呼びかけ、感謝など多くの場面で使えます。介護現場では特に大切な言葉です。",
        "vi": "\"Sumimasen\" là một từ rất tiện dụng trong tiếng Nhật. Có thể dùng trong nhiều tình huống như xin lỗi, thu hút sự chú ý, và cảm ơn. Đây là từ đặc biệt quan trọng trong môi trường chăm sóc."
      }
    }
  }',
  '[
    {
      "question": {"ja": "感謝を表す言葉はどれですか？", "vi": "Từ nào thể hiện lòng biết ơn?"},
      "options": [
        {"ja": "はい", "vi": "Hai"},
        {"ja": "いいえ", "vi": "Iie"},
        {"ja": "ありがとうございます", "vi": "Arigatou gozaimasu"},
        {"ja": "すみません", "vi": "Sumimasen"}
      ],
      "correct": 2,
      "explanation": {"ja": "「ありがとうございます」は感謝を表す言葉です。", "vi": "\"Arigatou gozaimasu\" là từ thể hiện lòng biết ơn."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「はい」の意味はどれですか？", "vi": "Nghĩa của \"Hai\" là gì?"},
      "options": [
        {"ja": "いいえ", "vi": "Không"},
        {"ja": "わかりません", "vi": "Không hiểu"},
        {"ja": "はい（肯定）", "vi": "Vâng (khẳng định)"},
        {"ja": "すみません", "vi": "Xin lỗi"}
      ],
      "correct": 2,
      "explanation": {"ja": "「はい」は肯定の返事で「yes」を意味します。", "vi": "\"Hai\" là câu trả lời khẳng định, có nghĩa là \"yes\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "同僚に声をかける時、最も適切な言葉はどれですか？", "vi": "Từ nào phù hợp nhất khi gọi đồng nghiệp?"},
      "options": [
        {"ja": "ありがとうございます", "vi": "Arigatou gozaimasu"},
        {"ja": "すみません", "vi": "Sumimasen"},
        {"ja": "はい", "vi": "Hai"},
        {"ja": "さようなら", "vi": "Sayounara"}
      ],
      "correct": 1,
      "explanation": {"ja": "「すみません」は呼びかけにも使えます。", "vi": "\"Sumimasen\" cũng có thể dùng để thu hút sự chú ý."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "「お体は痛くないですか？」という質問に、痛くない場合は何と答えますか？", "vi": "Khi được hỏi \"Cơ thể có đau không?\", nếu không đau bạn trả lời gì?"},
      "options": [
        {"ja": "はい、痛いです。", "vi": "Hai, itai desu."},
        {"ja": "いいえ、大丈夫です。", "vi": "Iie, daijoubu desu."},
        {"ja": "ありがとうございます。", "vi": "Arigatou gozaimasu."},
        {"ja": "すみません。", "vi": "Sumimasen."}
      ],
      "correct": 1,
      "explanation": {"ja": "痛くない場合は「いいえ、大丈夫です」と答えます。", "vi": "Nếu không đau, trả lời \"Iie, daijoubu desu\" (Không, tôi ổn)."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "利用者さんが「ありがとう」と言ってくれました。スタッフとして最も適切な返答はどれですか？", "vi": "Người được chăm sóc nói \"arigatou\". Câu trả lời nào phù hợp nhất cho nhân viên?"},
      "options": [
        {"ja": "はい。", "vi": "Hai."},
        {"ja": "いいえ。", "vi": "Iie."},
        {"ja": "すみません。またいつでも呼んでください。", "vi": "Sumimasen. Mata itsudemo yonde kudasai."},
        {"ja": "いいえ、どういたしまして。またいつでも呼んでください。", "vi": "Iie, douitashimashite. Mata itsudemo yonde kudasai."}
      ],
      "correct": 3,
      "explanation": {"ja": "「どういたしまして」はお礼に対する返答です。「またいつでも呼んでください」は介護現場での温かい言葉です。", "vi": "\"Douitashimashite\" là câu trả lời cho lời cảm ơn. \"Mata itsudemo yonde kudasai\" là lời nói ân cần trong môi trường chăm sóc."},
      "difficulty": "hard"
    }
  ]',
  2,
  20
);

-- Lesson 3: はじめまして、よろしくおねがいします、おなまえは？、わかりました
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 1 Lesson 3: 自己紹介の表現", "vi": "Unit 1 Bài 3: Biểu đạt tự giới thiệu"}',
  '{
    "type": "vocabulary",
    "unit": 1,
    "lesson_number": 3,
    "intro": {
      "ja": "初めて会う人への自己紹介の言葉を学びましょう。新しい職場でも役立ちます。",
      "vi": "Hãy học các biểu đạt tự giới thiệu khi gặp người lần đầu. Sẽ hữu ích cả ở nơi làm việc mới."
    },
    "words": [
      {
        "word": "はじめまして",
        "reading": "はじめまして",
        "kanji": null,
        "meaning": {
          "vi": "Rất vui được gặp bạn (lần đầu)",
          "ja": "初めて会う時のあいさつ"
        },
        "examples": [
          {
            "ja": "はじめまして。ベトナムから来たマイと申します。",
            "vi": "Rất vui được gặp bạn. Tôi tên là Mai đến từ Việt Nam."
          }
        ],
        "care_example": {
          "ja": "新しい施設での自己紹介：「はじめまして。今日からお世話になります、グエン・マイと申します。」",
          "vi": "Tự giới thiệu tại cơ sở mới: 'Hajimemashite. Kyou kara osewa ni narimasu, Nguyen Mai to moushimasu.' (Rất vui được gặp mọi người. Từ hôm nay tôi xin nhờ sự giúp đỡ, tôi tên là Nguyen Mai.)"
        }
      },
      {
        "word": "よろしくおねがいします",
        "reading": "よろしくおねがいします",
        "kanji": "よろしくお願いします",
        "meaning": {
          "vi": "Mong được giúp đỡ / Nhờ bạn rồi",
          "ja": "お願いや依頼の言葉"
        },
        "examples": [
          {
            "ja": "これからよろしくお願いします。",
            "vi": "Từ nay mong được giúp đỡ."
          }
        ],
        "care_example": {
          "ja": "申し送りの後：「では、夜の担当をよろしくお願いします。」",
          "vi": "Sau khi bàn giao: 'Dewa, yoru no tantou wo yoroshiku onegaishimasu.' (Vậy, nhờ bạn phụ trách ca tối nhé.)"
        }
      },
      {
        "word": "おなまえは？",
        "reading": "おなまえは？",
        "kanji": "お名前は？",
        "meaning": {
          "vi": "Tên bạn là gì?",
          "ja": "名前を聞く時の言葉"
        },
        "examples": [
          {
            "ja": "すみません、お名前は何とおっしゃいますか？",
            "vi": "Xin lỗi, tên bạn là gì?"
          }
        ],
        "care_example": {
          "ja": "新しい利用者さんへの確認：「○○さん、お名前を教えていただけますか？」",
          "vi": "Xác nhận với người được chăm sóc mới: '○○ san, onamae wo oshiete itadakemasu ka?' (○○ san, bạn có thể cho tôi biết tên của bạn không?)"
        }
      },
      {
        "word": "わかりました",
        "reading": "わかりました",
        "kanji": "分かりました",
        "meaning": {
          "vi": "Tôi hiểu rồi / Được rồi",
          "ja": "理解・了解の言葉"
        },
        "examples": [
          {
            "ja": "はい、わかりました。すぐに対応します。",
            "vi": "Vâng, tôi hiểu rồi. Tôi sẽ xử lý ngay."
          }
        ],
        "care_example": {
          "ja": "上司からの指示に：「はい、わかりました。田中さんの血圧を測りますね。」",
          "vi": "Khi nhận hướng dẫn từ cấp trên: 'Hai, wakarimashita. Tanaka san no ketsuatsu wo hakarimasu ne.' (Vâng, tôi hiểu rồi. Tôi sẽ đo huyết áp cho Tanaka san nhé.)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "初日の自己紹介", "vi": "Tự giới thiệu ngày đầu tiên"},
      "scene": {"ja": "新しい介護スタッフ（フオン）が施設長に自己紹介をします。", "vi": "Nhân viên chăm sóc mới (Huong) tự giới thiệu với giám đốc cơ sở."},
      "lines": [
        {"speaker": "staff", "ja": "はじめまして。グエン・フオンと申します。", "vi": "Rất vui được gặp bạn. Tôi tên là Nguyen Huong."},
        {"speaker": "manager", "ja": "はじめまして。田村施設長です。よろしくお願いします。", "vi": "Rất vui được gặp bạn. Tôi là giám đốc Tamura. Mong được hợp tác."},
        {"speaker": "staff", "ja": "よろしくお願いします。わからないことがあったら、教えていただけますか？", "vi": "Mong được hợp tác. Nếu có điều gì không hiểu, bạn có thể chỉ dạy tôi không?"},
        {"speaker": "manager", "ja": "もちろんです。何でも聞いてください。", "vi": "Tất nhiên rồi. Hãy hỏi bất cứ điều gì."},
        {"speaker": "staff", "ja": "わかりました。ありがとうございます。", "vi": "Vâng, tôi hiểu rồi. Cảm ơn bạn."}
      ],
      "key_phrases": [
        {"ja": "はじめまして〜と申します", "vi": "Hajimemashite ~ to moushimasu", "note_vi": "\"Moushimasu\" là dạng khiêm tốn của \"iimasu\" (nói)"},
        {"ja": "よろしくお願いします", "vi": "Yoroshiku onegaishimasu", "note_vi": "Câu không thể thiếu trong văn hóa Nhật Bản"}
      ],
      "cultural_note": {
        "ja": "「よろしくお願いします」は日本語で最も重要な表現の一つです。自己紹介、依頼、感謝など様々な場面で使います。介護現場では毎日使う表現です。",
        "vi": "\"Yoroshiku onegaishimasu\" là một trong những biểu đạt quan trọng nhất trong tiếng Nhật. Được dùng trong nhiều tình huống như tự giới thiệu, nhờ vả, cảm ơn. Đây là biểu đạt sử dụng hàng ngày trong môi trường chăm sóc."
      }
    }
  }',
  '[
    {
      "question": {"ja": "初めて人に会った時のあいさつはどれですか？", "vi": "Lời chào nào dùng khi gặp người lần đầu?"},
      "options": [
        {"ja": "さようなら", "vi": "Sayounara"},
        {"ja": "はじめまして", "vi": "Hajimemashite"},
        {"ja": "おはようございます", "vi": "Ohayou gozaimasu"},
        {"ja": "こんばんは", "vi": "Konbanwa"}
      ],
      "correct": 1,
      "explanation": {"ja": "「はじめまして」は初めて会う時のあいさつです。", "vi": "\"Hajimemashite\" là lời chào khi gặp người lần đầu."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「わかりました」の意味はどれですか？", "vi": "Nghĩa của \"wakarimashita\" là gì?"},
      "options": [
        {"ja": "わかりません", "vi": "Không hiểu"},
        {"ja": "理解しました", "vi": "Tôi đã hiểu"},
        {"ja": "お願いします", "vi": "Nhờ bạn"},
        {"ja": "ありがとう", "vi": "Cảm ơn"}
      ],
      "correct": 1,
      "explanation": {"ja": "「わかりました」は理解・了解を表す言葉です。", "vi": "\"Wakarimashita\" là từ thể hiện sự hiểu biết và chấp thuận."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "上司から「田中さんの血圧を測ってください」と言われました。何と返事しますか？", "vi": "Cấp trên nói \"Hãy đo huyết áp cho Tanaka san\". Bạn trả lời gì?"},
      "options": [
        {"ja": "はじめまして。", "vi": "Hajimemashite."},
        {"ja": "さようなら。", "vi": "Sayounara."},
        {"ja": "はい、わかりました。", "vi": "Hai, wakarimashita."},
        {"ja": "よろしくお願いします。", "vi": "Yoroshiku onegaishimasu."}
      ],
      "correct": 2,
      "explanation": {"ja": "上司の指示に対して「はい、わかりました」と返事するのが適切です。", "vi": "Trả lời \"Hai, wakarimashita\" khi nhận hướng dẫn từ cấp trên là thích hợp."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "自己紹介の時の正しい順番はどれですか？", "vi": "Thứ tự nào đúng khi tự giới thiệu?"},
      "options": [
        {"ja": "名前→はじめまして→よろしくお願いします", "vi": "Tên → Hajimemashite → Yoroshiku"},
        {"ja": "はじめまして→名前→よろしくお願いします", "vi": "Hajimemashite → Tên → Yoroshiku"},
        {"ja": "よろしくお願いします→名前→はじめまして", "vi": "Yoroshiku → Tên → Hajimemashite"},
        {"ja": "名前→よろしくお願いします→はじめまして", "vi": "Tên → Yoroshiku → Hajimemashite"}
      ],
      "correct": 1,
      "explanation": {"ja": "日本語の自己紹介は「はじめまして→名前→よろしくお願いします」の順が自然です。", "vi": "Trong tiếng Nhật, thứ tự tự nhiên khi tự giới thiệu là \"Hajimemashite → Tên → Yoroshiku onegaishimasu\"."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "新しい施設に着いた時、施設長への最も適切な自己紹介はどれですか？", "vi": "Khi đến cơ sở mới, cách tự giới thiệu nào phù hợp nhất với giám đốc?"},
      "options": [
        {"ja": "こんにちは、マイです。よろしく。", "vi": "Konnichiwa, Mai desu. Yoroshiku."},
        {"ja": "はじめまして。グエン・マイと申します。今日からよろしくお願いします。", "vi": "Hajimemashite. Nguyen Mai to moushimasu. Kyou kara yoroshiku onegaishimasu."},
        {"ja": "わたしはマイです。はじめまして。", "vi": "Watashi wa Mai desu. Hajimemashite."},
        {"ja": "お名前は？よろしくお願いします。", "vi": "Onamae wa? Yoroshiku onegaishimasu."}
      ],
      "correct": 1,
      "explanation": {"ja": "「はじめまして→名前（〜と申します）→よろしくお願いします」が最も丁寧な自己紹介です。「申します」は謙譲語で、目上の人への自己紹介に適しています。", "vi": "\"Hajimemashite → Tên (~to moushimasu) → Yoroshiku onegaishimasu\" là cách tự giới thiệu lịch sự nhất. \"Moushimasu\" là kính ngữ khiêm tốn, phù hợp khi tự giới thiệu với người bề trên."},
      "difficulty": "hard"
    }
  ]',
  3,
  20
);

-- Lesson 4: おやすみなさい、いってきます、ただいま、おかえり
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 1 Lesson 4: 日常のあいさつ", "vi": "Unit 1 Bài 4: Lời chào hàng ngày"}',
  '{
    "type": "vocabulary",
    "unit": 1,
    "lesson_number": 4,
    "intro": {
      "ja": "日本の日常生活でよく使うあいさつを学びましょう。職場でも使える表現です。",
      "vi": "Hãy học các lời chào thường dùng trong cuộc sống hàng ngày ở Nhật Bản. Đây cũng là những biểu đạt có thể dùng ở nơi làm việc."
    },
    "words": [
      {
        "word": "おやすみなさい",
        "reading": "おやすみなさい",
        "kanji": null,
        "meaning": {
          "vi": "Chúc ngủ ngon",
          "ja": "就寝前のあいさつ"
        },
        "examples": [
          {
            "ja": "おやすみなさい。ゆっくり休んでください。",
            "vi": "Chúc ngủ ngon. Hãy nghỉ ngơi thoải mái."
          }
        ],
        "care_example": {
          "ja": "夜の就寝介助の後：「おやすみなさい、○○さん。ゆっくり休んでください。何かあればナースコールを押してください。」",
          "vi": "Sau khi hỗ trợ người được chăm sóc đi ngủ: 'Oyasuminasai, ○○ san. Yukkuri yasunde kudasai. Nanika areba naasukooru wo oshite kudasai.' (Chúc ngủ ngon ○○ san. Hãy nghỉ ngơi thoải mái. Nếu có gì hãy nhấn chuông y tá.)"
        }
      },
      {
        "word": "いってきます",
        "reading": "いってきます",
        "kanji": "行ってきます",
        "meaning": {
          "vi": "Tôi đi nhé (khi ra ngoài)",
          "ja": "外出する時のあいさつ"
        },
        "examples": [
          {
            "ja": "いってきます。3時に戻ります。",
            "vi": "Tôi đi nhé. 3 giờ tôi sẽ về."
          }
        ],
        "care_example": {
          "ja": "利用者さんの外出時：「○○さん、いってらっしゃい。気をつけて行ってきてください。」",
          "vi": "Khi người được chăm sóc ra ngoài: '○○ san, itterasshai. Ki wo tsukete itte kite kudasai.' (○○ san, đi cẩn thận nhé.)"
        }
      },
      {
        "word": "ただいま",
        "reading": "ただいま",
        "kanji": "只今",
        "meaning": {
          "vi": "Tôi về rồi (khi trở về)",
          "ja": "帰宅した時のあいさつ"
        },
        "examples": [
          {
            "ja": "ただいま。今日は疲れました。",
            "vi": "Tôi về rồi. Hôm nay mệt quá."
          }
        ],
        "care_example": {
          "ja": "日帰りリハビリから戻った利用者さんに：「○○さん、ただいまですね。お疲れ様でした。」",
          "vi": "Với người được chăm sóc vừa trở về từ phục hồi chức năng trong ngày: '○○ san, tadaima desu ne. Otsukaresama deshita.' (○○ san, bạn về rồi nhỉ. Bạn đã vất vả.)"
        }
      },
      {
        "word": "おかえり（なさい）",
        "reading": "おかえりなさい",
        "kanji": "お帰りなさい",
        "meaning": {
          "vi": "Chào mừng về nhà",
          "ja": "帰ってきた人へのあいさつ"
        },
        "examples": [
          {
            "ja": "おかえりなさい。お疲れ様でした。",
            "vi": "Chào mừng về nhà. Bạn đã vất vả rồi."
          }
        ],
        "care_example": {
          "ja": "外出から戻った利用者さんへ：「おかえりなさい、○○さん。楽しかったですか？」",
          "vi": "Với người được chăm sóc vừa trở về từ bên ngoài: 'Okaerinasai, ○○ san. Tanoshikatta desu ka?' (Chào mừng về nhà ○○ san. Bạn có vui không?)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "夜の介護施設", "vi": "Cơ sở chăm sóc ban đêm"},
      "scene": {"ja": "介護スタッフ（タム）が利用者（山田さん）の就寝介助をします。", "vi": "Nhân viên chăm sóc (Tam) hỗ trợ người được chăm sóc (Yamada san) đi ngủ."},
      "lines": [
        {"speaker": "staff", "ja": "山田さん、寝る準備はできましたか？", "vi": "Yamada san, bạn đã chuẩn bị đi ngủ chưa?"},
        {"speaker": "resident", "ja": "はい、できました。", "vi": "Vâng, xong rồi."},
        {"speaker": "staff", "ja": "では、おやすみなさい。ゆっくり休んでください。", "vi": "Vậy, chúc ngủ ngon. Hãy nghỉ ngơi thoải mái."},
        {"speaker": "resident", "ja": "おやすみなさい。ありがとう。", "vi": "Chúc ngủ ngon. Cảm ơn."},
        {"speaker": "staff", "ja": "何かあればナースコールを押してください。", "vi": "Nếu có gì hãy nhấn chuông y tá."}
      ],
      "key_phrases": [
        {"ja": "いってらっしゃい", "vi": "Itterasshai", "note_vi": "Câu trả lời cho \"ittekimasu\" - dùng khi tiễn người ra ngoài"},
        {"ja": "おかえりなさい", "vi": "Okaerinasai", "note_vi": "Câu trả lời cho \"tadaima\" - dùng khi chào đón người trở về"}
      ],
      "cultural_note": {
        "ja": "「いってきます・いってらっしゃい」「ただいま・おかえりなさい」はペアになったあいさつです。日本の家庭・職場でよく使われます。介護施設でも利用者さんの外出・帰宅時に使います。",
        "vi": "\"Ittekimasu / Itterasshai\" và \"Tadaima / Okaerinasai\" là các cặp lời chào. Thường được dùng trong gia đình và nơi làm việc ở Nhật Bản. Cũng được dùng trong cơ sở chăm sóc khi người được chăm sóc ra ngoài và trở về."
      }
    }
  }',
  '[
    {
      "question": {"ja": "「おやすみなさい」はいつ使いますか？", "vi": "\"Oyasuminasai\" được dùng khi nào?"},
      "options": [
        {"ja": "朝起きた時", "vi": "Khi thức dậy buổi sáng"},
        {"ja": "外出する時", "vi": "Khi ra ngoài"},
        {"ja": "寝る前", "vi": "Trước khi đi ngủ"},
        {"ja": "帰ってきた時", "vi": "Khi trở về"}
      ],
      "correct": 2,
      "explanation": {"ja": "「おやすみなさい」は就寝前のあいさつです。", "vi": "\"Oyasuminasai\" là lời chào trước khi đi ngủ."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "外出する時のあいさつはどれですか？", "vi": "Lời chào nào dùng khi ra ngoài?"},
      "options": [
        {"ja": "おかえりなさい", "vi": "Okaerinasai"},
        {"ja": "いってきます", "vi": "Ittekimasu"},
        {"ja": "ただいま", "vi": "Tadaima"},
        {"ja": "おやすみなさい", "vi": "Oyasuminasai"}
      ],
      "correct": 1,
      "explanation": {"ja": "「いってきます」は外出する時のあいさつです。", "vi": "\"Ittekimasu\" là lời chào khi ra ngoài."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「ただいま」に対する返答はどれですか？", "vi": "Câu trả lời cho \"tadaima\" là gì?"},
      "options": [
        {"ja": "いってきます", "vi": "Ittekimasu"},
        {"ja": "いってらっしゃい", "vi": "Itterasshai"},
        {"ja": "おかえりなさい", "vi": "Okaerinasai"},
        {"ja": "おやすみなさい", "vi": "Oyasuminasai"}
      ],
      "correct": 2,
      "explanation": {"ja": "「ただいま」に対して「おかえりなさい」と答えます。", "vi": "Trả lời \"Okaerinasai\" khi nghe \"Tadaima\"."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "利用者さんがリハビリに出かける時、スタッフは何と言いますか？", "vi": "Khi người được chăm sóc đi phục hồi chức năng, nhân viên nói gì?"},
      "options": [
        {"ja": "おやすみなさい", "vi": "Oyasuminasai"},
        {"ja": "ただいま", "vi": "Tadaima"},
        {"ja": "いってらっしゃい", "vi": "Itterasshai"},
        {"ja": "おかえりなさい", "vi": "Okaerinasai"}
      ],
      "correct": 2,
      "explanation": {"ja": "「いってらっしゃい」は外出する人に向けての言葉です。", "vi": "\"Itterasshai\" là lời nói dành cho người ra ngoài."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "夜勤が終わり帰る同僚スタッフに最も適切なあいさつはどれですか？", "vi": "Lời chào nào phù hợp nhất khi tiễn đồng nghiệp kết thúc ca đêm về nhà?"},
      "options": [
        {"ja": "おはようございます", "vi": "Ohayou gozaimasu"},
        {"ja": "おやすみなさい", "vi": "Oyasuminasai"},
        {"ja": "おつかれさまでした。いってらっしゃい。", "vi": "Otsukaresama deshita. Itterasshai."},
        {"ja": "ただいま、おかえりなさい。", "vi": "Tadaima, okaerinasai."}
      ],
      "correct": 1,
      "explanation": {"ja": "夜勤が終わって帰る人には「おつかれさまでした」（お疲れ様）がよく使われます。深夜に帰る同僚には「おやすみなさい」も自然です。", "vi": "\"Otsukaresama deshita\" thường dùng cho người kết thúc ca. \"Oyasuminasai\" cũng tự nhiên khi tiễn đồng nghiệp về vào đêm khuya."},
      "difficulty": "hard"
    }
  ]',
  4,
  20
);

-- ============================================================
-- Unit 2: 数字・時間・曜日 (Lessons 5-8)
-- ============================================================

-- Lesson 5: いち、に、さん、し/よん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 2 Lesson 5: 数字①（1〜4）", "vi": "Unit 2 Bài 5: Số đếm ①（1〜4）"}',
  '{
    "type": "vocabulary",
    "unit": 2,
    "lesson_number": 5,
    "intro": {
      "ja": "数字を学びましょう！介護現場では薬の量や血圧の数字など、数字をよく使います。",
      "vi": "Hãy học số đếm! Trong môi trường chăm sóc, số đếm được dùng thường xuyên cho lượng thuốc, số huyết áp, v.v."
    },
    "words": [
      {
        "word": "いち",
        "reading": "いち",
        "kanji": "一",
        "meaning": {
          "vi": "Một (1)",
          "ja": "数字の1"
        },
        "examples": [
          {
            "ja": "一つください。",
            "vi": "Cho tôi một cái."
          }
        ],
        "care_example": {
          "ja": "薬の確認時：「○○さん、この薬は一日一回です。」",
          "vi": "Khi xác nhận thuốc: '○○ san, kono kusuri wa ichinichi ikkai desu.' (○○ san, thuốc này uống một ngày một lần.)"
        }
      },
      {
        "word": "に",
        "reading": "に",
        "kanji": "二",
        "meaning": {
          "vi": "Hai (2)",
          "ja": "数字の2"
        },
        "examples": [
          {
            "ja": "二人で運びましょう。",
            "vi": "Hãy để hai người cùng khiêng."
          }
        ],
        "care_example": {
          "ja": "移乗の際：「二人で一緒に移動しますね。」",
          "vi": "Khi di chuyển người: 'Futari de issho ni idou shimasu ne.' (Hai người cùng di chuyển nhé.)"
        }
      },
      {
        "word": "さん",
        "reading": "さん",
        "kanji": "三",
        "meaning": {
          "vi": "Ba (3)",
          "ja": "数字の3"
        },
        "examples": [
          {
            "ja": "三回測ってください。",
            "vi": "Hãy đo ba lần."
          }
        ],
        "care_example": {
          "ja": "バイタル記録：「血圧は三回測って平均をとります。」",
          "vi": "Ghi chép sinh hiệu: 'Ketsuatsu wa sankai hakatte heikin wo torimasu.' (Đo huyết áp ba lần và lấy trung bình.)"
        }
      },
      {
        "word": "し／よん",
        "reading": "し・よん",
        "kanji": "四",
        "meaning": {
          "vi": "Bốn (4)",
          "ja": "数字の4（「し」または「よん」と読む）"
        },
        "examples": [
          {
            "ja": "4番の部屋です。",
            "vi": "Đây là phòng số 4."
          }
        ],
        "care_example": {
          "ja": "部屋番号の確認：「○○さんは4号室です。四番目の部屋です。」",
          "vi": "Xác nhận số phòng: '○○ san wa yongousha desu. Yonbanme no heya desu.' (○○ san ở phòng số 4. Là phòng thứ tư.)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "薬の確認", "vi": "Kiểm tra thuốc"},
      "scene": {"ja": "介護スタッフ（アン）が利用者（中村さん）に薬を渡します。", "vi": "Nhân viên chăm sóc (Anh) đưa thuốc cho người được chăm sóc (Nakamura san)."},
      "lines": [
        {"speaker": "staff", "ja": "中村さん、お薬の時間です。今日は三種類あります。", "vi": "Nakamura san, đến giờ uống thuốc rồi. Hôm nay có ba loại."},
        {"speaker": "resident", "ja": "三つですか？", "vi": "Ba viên à?"},
        {"speaker": "staff", "ja": "はい。一日二回の薬が一つと、一日一回の薬が二つです。", "vi": "Vâng. Một viên uống hai lần một ngày và hai viên uống một lần một ngày."},
        {"speaker": "resident", "ja": "わかりました。", "vi": "Tôi hiểu rồi."}
      ],
      "key_phrases": [
        {"ja": "一日一回", "vi": "Ichinichi ikkai", "note_vi": "Một ngày một lần - cách đọc số trong ngữ cảnh"},
        {"ja": "三種類", "vi": "Sanshu rui", "note_vi": "Ba loại"}
      ],
      "cultural_note": {
        "ja": "数字「4」は日本では「死（し）」と同じ発音のため、不吉とされることがあります。介護施設でも4号室を避けることがあります。「よん」と読む方が縁起が良いとされています。",
        "vi": "Số \"4\" trong tiếng Nhật có cách phát âm giống với \"shi\" (死 - cái chết), nên đôi khi được coi là không may mắn. Trong các cơ sở chăm sóc cũng có thể tránh phòng số 4. Đọc là \"yon\" được coi là may mắn hơn."
      }
    }
  }',
  '[
    {
      "question": {"ja": "「二」の読み方はどれですか？", "vi": "Cách đọc của \"二\" là gì?"},
      "options": [
        {"ja": "いち", "vi": "Ichi"},
        {"ja": "さん", "vi": "San"},
        {"ja": "に", "vi": "Ni"},
        {"ja": "よん", "vi": "Yon"}
      ],
      "correct": 2,
      "explanation": {"ja": "「二」は「に」と読みます。", "vi": "\"二\" đọc là \"ni\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「4」の読み方として正しいものはどれですか？（2つ）", "vi": "Cách đọc nào đúng cho số \"4\"? (2 cách)"},
      "options": [
        {"ja": "いち・に", "vi": "Ichi và ni"},
        {"ja": "し・よん", "vi": "Shi và yon"},
        {"ja": "さん・よん", "vi": "San và yon"},
        {"ja": "し・さん", "vi": "Shi và san"}
      ],
      "correct": 1,
      "explanation": {"ja": "4は「し」または「よん」と読みます。", "vi": "Số 4 đọc là \"shi\" hoặc \"yon\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「一日三回」の意味はどれですか？", "vi": "Nghĩa của \"ichinichi sankai\" là gì?"},
      "options": [
        {"ja": "一日一回", "vi": "Một lần một ngày"},
        {"ja": "一日二回", "vi": "Hai lần một ngày"},
        {"ja": "一日三回", "vi": "Ba lần một ngày"},
        {"ja": "一日四回", "vi": "Bốn lần một ngày"}
      ],
      "correct": 2,
      "explanation": {"ja": "「一日三回」は一日に三回という意味です。薬の服用方法でよく使います。", "vi": "\"Ichinichi sankai\" có nghĩa là ba lần một ngày. Thường dùng để chỉ cách dùng thuốc."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "移乗（いじょう）の介助を二人で行う時、何と言いますか？", "vi": "Khi hai người cùng hỗ trợ di chuyển người được chăm sóc, bạn nói gì?"},
      "options": [
        {"ja": "一人で移動しましょう。", "vi": "Hitori de idou shimashou."},
        {"ja": "二人で一緒に移動しましょう。", "vi": "Futari de issho ni idou shimashou."},
        {"ja": "三人で移動しましょう。", "vi": "Sannin de idou shimashou."},
        {"ja": "四人で移動しましょう。", "vi": "Yonin de idou shimashou."}
      ],
      "correct": 1,
      "explanation": {"ja": "「二人で一緒に移動しましょう」は2人での介助時の適切な言葉です。", "vi": "\"Futari de issho ni idou shimashou\" là câu phù hợp khi hai người hỗ trợ di chuyển."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "介護記録に「1日3回食後に1錠」と書く場合、正しい読み方はどれですか？", "vi": "Khi ghi vào hồ sơ chăm sóc \"uống 1 viên sau bữa ăn 3 lần/ngày\", cách đọc nào đúng?"},
      "options": [
        {"ja": "いちにちさんかいしょくごにいちじょう", "vi": "Ichinichi sankai shokugo ni ichijou"},
        {"ja": "ひとにちみっかいたべあとにひとつぶ", "vi": "Hitonichi mikkaitabeato ni hitotsubu"},
        {"ja": "いちにちよんかいしょくごにいちじょう", "vi": "Ichinichi yonkai shokugo ni ichijou"},
        {"ja": "にちにちさんかいしょくごにさんじょう", "vi": "Nichinichi sankai shokugo ni sanjou"}
      ],
      "correct": 0,
      "explanation": {"ja": "「1日3回食後に1錠」は「いちにちさんかいしょくごにいちじょう」と読みます。介護記録でよく見る表現です。", "vi": "\"1日3回食後に1錠\" đọc là \"ichinichi sankai shokugo ni ichijou\". Đây là biểu đạt thường thấy trong hồ sơ chăm sóc."},
      "difficulty": "hard"
    }
  ]',
  5,
  20
);

-- Lesson 6: ご、ろく、なな/しち、はち
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 2 Lesson 6: 数字②（5〜8）", "vi": "Unit 2 Bài 6: Số đếm ②（5〜8）"}',
  '{
    "type": "vocabulary",
    "unit": 2,
    "lesson_number": 6,
    "intro": {
      "ja": "5から8までの数字を学びましょう。介護記録や時間の表現でよく使います。",
      "vi": "Hãy học số từ 5 đến 8. Thường dùng trong hồ sơ chăm sóc và biểu đạt thời gian."
    },
    "words": [
      {
        "word": "ご",
        "reading": "ご",
        "kanji": "五",
        "meaning": {
          "vi": "Năm (5)",
          "ja": "数字の5"
        },
        "examples": [
          {
            "ja": "5分後に来ます。",
            "vi": "5 phút nữa tôi sẽ đến."
          }
        ],
        "care_example": {
          "ja": "呼ばれた時：「○○さん、五分後に参ります。少々お待ちください。」",
          "vi": "Khi được gọi: '○○ san, gofun go ni mairimasu. Shoushou omachi kudasai.' (○○ san, 5 phút nữa tôi sẽ đến. Xin hãy chờ một chút.)"
        }
      },
      {
        "word": "ろく",
        "reading": "ろく",
        "kanji": "六",
        "meaning": {
          "vi": "Sáu (6)",
          "ja": "数字の6"
        },
        "examples": [
          {
            "ja": "6号室は田中さんです。",
            "vi": "Phòng số 6 là Tanaka san."
          }
        ],
        "care_example": {
          "ja": "訪問記録：「六月六日に訪問しました。」",
          "vi": "Hồ sơ thăm viếng: 'Rokugatsu muika ni houmon shimashita.' (Đã thăm vào ngày 6 tháng 6.)"
        }
      },
      {
        "word": "なな／しち",
        "reading": "なな・しち",
        "kanji": "七",
        "meaning": {
          "vi": "Bảy (7)",
          "ja": "数字の7（「なな」または「しち」と読む）"
        },
        "examples": [
          {
            "ja": "7時に起床します。",
            "vi": "7 giờ thức dậy."
          }
        ],
        "care_example": {
          "ja": "起床時間の確認：「○○さん、朝は七時に起こしますか？」",
          "vi": "Xác nhận giờ thức dậy: '○○ san, asa wa shichiji ni okoshimasu ka?' (○○ san, buổi sáng tôi có đánh thức bạn lúc 7 giờ không?)"
        }
      },
      {
        "word": "はち",
        "reading": "はち",
        "kanji": "八",
        "meaning": {
          "vi": "Tám (8)",
          "ja": "数字の8"
        },
        "examples": [
          {
            "ja": "朝食は8時です。",
            "vi": "Bữa sáng lúc 8 giờ."
          }
        ],
        "care_example": {
          "ja": "食事の案内：「朝食は八時から食堂でお召し上がりいただけます。」",
          "vi": "Hướng dẫn bữa ăn: 'Choushoku wa hachiji kara shokudou de omeshiagari itadakemasu.' (Bữa sáng từ 8 giờ tại phòng ăn.)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "朝の起床介助", "vi": "Hỗ trợ thức dậy buổi sáng"},
      "scene": {"ja": "介護スタッフ（ミン）が利用者（佐藤さん）を朝7時に起こします。", "vi": "Nhân viên chăm sóc (Minh) đánh thức người được chăm sóc (Satou san) lúc 7 giờ sáng."},
      "lines": [
        {"speaker": "staff", "ja": "佐藤さん、おはようございます。七時になりました。", "vi": "Satou san, chào buổi sáng. Đã 7 giờ rồi."},
        {"speaker": "resident", "ja": "（眠そうに）もう七時ですか？", "vi": "(Vẻ buồn ngủ) Đã 7 giờ rồi à?"},
        {"speaker": "staff", "ja": "はい。朝食は八時です。少しずつ起きましょう。", "vi": "Vâng. Bữa sáng lúc 8 giờ. Hãy từ từ thức dậy."},
        {"speaker": "resident", "ja": "わかりました。五分だけ待ってください。", "vi": "Vâng, hãy chờ tôi 5 phút thôi."},
        {"speaker": "staff", "ja": "はい、五分後にまた来ます。", "vi": "Vâng, 5 phút nữa tôi sẽ lại."}
      ],
      "key_phrases": [
        {"ja": "五分後", "vi": "Gofun go", "note_vi": "5 phút nữa - cách nói thời gian"},
        {"ja": "少しずつ", "vi": "Sukoshi zutsu", "note_vi": "Từng chút một - dùng khi hỗ trợ thức dậy"}
      ],
      "cultural_note": {
        "ja": "「7」も「4」と同様に読み方が二つあります（なな・しち）。時間を言う場合は「しちじ（7時）」、数を数える場合は「なな」が多く使われます。",
        "vi": "\"7\" cũng như \"4\" có hai cách đọc (nana và shichi). Khi nói thời gian thường dùng \"shichiji\" (7 giờ), khi đếm số thường dùng \"nana\"."
      }
    }
  }',
  '[
    {
      "question": {"ja": "「六」の読み方はどれですか？", "vi": "Cách đọc của \"六\" là gì?"},
      "options": [
        {"ja": "ご", "vi": "Go"},
        {"ja": "ろく", "vi": "Roku"},
        {"ja": "なな", "vi": "Nana"},
        {"ja": "はち", "vi": "Hachi"}
      ],
      "correct": 1,
      "explanation": {"ja": "「六」は「ろく」と読みます。", "vi": "\"六\" đọc là \"roku\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "朝食が8時の場合、利用者さんに何と伝えますか？", "vi": "Khi bữa sáng lúc 8 giờ, bạn thông báo gì với người được chăm sóc?"},
      "options": [
        {"ja": "朝食はご時です。", "vi": "Choushoku wa goji desu."},
        {"ja": "朝食はろく時です。", "vi": "Choushoku wa rokujidesu."},
        {"ja": "朝食ははち時です。", "vi": "Choushoku wa hachiji desu."},
        {"ja": "朝食はなな時です。", "vi": "Choushoku wa nanaji desu."}
      ],
      "correct": 2,
      "explanation": {"ja": "「朝食ははち時（八時）です」が正解です。", "vi": "\"Choushoku wa hachiji desu\" là đúng."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「7時」の正しい読み方はどれですか？", "vi": "Cách đọc đúng của \"7時\" là gì?"},
      "options": [
        {"ja": "ななじ", "vi": "Nanaji"},
        {"ja": "しちじ", "vi": "Shichiji"},
        {"ja": "ろくじ", "vi": "Rokuji"},
        {"ja": "はちじ", "vi": "Hachiji"}
      ],
      "correct": 1,
      "explanation": {"ja": "「7時」は「しちじ」と読みます。時刻を表す場合は「しち」が一般的です。", "vi": "\"7時\" đọc là \"shichiji\". Khi biểu đạt thời gian thường dùng \"shichi\"."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "利用者さんに「5分後に来ます」と伝える場合、正しい日本語はどれですか？", "vi": "Khi thông báo với người được chăm sóc \"5 phút nữa tôi đến\", câu tiếng Nhật nào đúng?"},
      "options": [
        {"ja": "ご分後に来ます。", "vi": "Gofun go ni kimasu."},
        {"ja": "五分後に参ります。", "vi": "Gofun go ni mairimasu."},
        {"ja": "六分後に来ます。", "vi": "Roppun go ni kimasu."},
        {"ja": "はち分後に来ます。", "vi": "Happun go ni kimasu."}
      ],
      "correct": 1,
      "explanation": {"ja": "「五分後に参ります」が正確です。「参ります」は「来ます」の丁寧な言い方です。", "vi": "\"Gofun go ni mairimasu\" là chính xác. \"Mairimasu\" là cách nói lịch sự của \"kimasu\" (đến)."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "朝の起床介助で利用者さんが「もう少し寝たい」と言った場合、最も適切な対応はどれですか？", "vi": "Khi hỗ trợ người được chăm sóc thức dậy buổi sáng và họ nói muốn ngủ thêm một chút, cách xử lý nào phù hợp nhất?"},
      "options": [
        {"ja": "すぐに起こす", "vi": "Đánh thức ngay"},
        {"ja": "「五分後にまた来ます」と言って席を外す", "vi": "Nói \"Gofun go ni mata kimasu\" và rời đi"},
        {"ja": "「起きなければなりません」と強く言う", "vi": "Nói mạnh \"Okinakereba narimasen\""},
        {"ja": "そのまま放置する", "vi": "Bỏ mặc"}
      ],
      "correct": 1,
      "explanation": {"ja": "「五分後にまた来ます」と伝えて少し時間を与えることで、利用者さんの意向を尊重しながら起床を促すことができます。", "vi": "Bằng cách nói \"Gofun go ni mata kimasu\" và cho thêm chút thời gian, bạn có thể tôn trọng ý muốn của người được chăm sóc trong khi vẫn khuyến khích họ thức dậy."},
      "difficulty": "hard"
    }
  ]',
  6,
  20
);

-- Lesson 7: きゅう/く、じゅう、ひゃく、せん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 2 Lesson 7: 数字③（9・10・100・1000）", "vi": "Unit 2 Bài 7: Số đếm ③（9・10・100・1000）"}',
  '{
    "type": "vocabulary",
    "unit": 2,
    "lesson_number": 7,
    "intro": {
      "ja": "大きな数字を学びましょう！血圧の数値や体重など、介護現場では大きな数字もよく使います。",
      "vi": "Hãy học các số lớn hơn! Trong môi trường chăm sóc, số lớn cũng thường dùng cho chỉ số huyết áp, cân nặng, v.v."
    },
    "words": [
      {
        "word": "きゅう／く",
        "reading": "きゅう・く",
        "kanji": "九",
        "meaning": {
          "vi": "Chín (9)",
          "ja": "数字の9（「きゅう」または「く」と読む）"
        },
        "examples": [
          {
            "ja": "9号室の田中さんです。",
            "vi": "Đây là Tanaka san phòng 9."
          }
        ],
        "care_example": {
          "ja": "体温の記録：「○○さんの体温は三十七度九分です。」",
          "vi": "Ghi chép nhiệt độ: '○○ san no taion wa sanjuushichi do kyuubu desu.' (Nhiệt độ của ○○ san là 37,9 độ.)"
        }
      },
      {
        "word": "じゅう",
        "reading": "じゅう",
        "kanji": "十",
        "meaning": {
          "vi": "Mười (10)",
          "ja": "数字の10"
        },
        "examples": [
          {
            "ja": "10時に診察があります。",
            "vi": "10 giờ có khám bệnh."
          }
        ],
        "care_example": {
          "ja": "診察の案内：「○○さん、十時に先生の診察があります。準備しましょう。」",
          "vi": "Hướng dẫn khám bệnh: '○○ san, juuji ni sensei no shinsatsu ga arimasu. Junbi shimashou.' (○○ san, 10 giờ có khám bệnh với bác sĩ. Hãy chuẩn bị.)"
        }
      },
      {
        "word": "ひゃく",
        "reading": "ひゃく",
        "kanji": "百",
        "meaning": {
          "vi": "Một trăm (100)",
          "ja": "数字の100"
        },
        "examples": [
          {
            "ja": "血圧が百二十です。",
            "vi": "Huyết áp là 120."
          }
        ],
        "care_example": {
          "ja": "血圧の報告：「上が百二十、下が八十でした。正常範囲です。」",
          "vi": "Báo cáo huyết áp: 'Ue ga hyakunijuu, shita ga hachijuu deshita. Seijou hani desu.' (Trên là 120, dưới là 80. Trong phạm vi bình thường.)"
        }
      },
      {
        "word": "せん",
        "reading": "せん",
        "kanji": "千",
        "meaning": {
          "vi": "Một nghìn (1000)",
          "ja": "数字の1000"
        },
        "examples": [
          {
            "ja": "この薬は千円です。",
            "vi": "Thuốc này là 1000 yên."
          }
        ],
        "care_example": {
          "ja": "食事カロリーの記録：「今日の摂取カロリーは千五百キロカロリーでした。」",
          "vi": "Ghi chép lượng calo ăn vào: 'Kyou no sesshu karorii wa sensyou kyarori deshita.' (Lượng calo hôm nay là 1500 kcal.)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "バイタルサインの確認", "vi": "Kiểm tra dấu hiệu sinh tồn"},
      "scene": {"ja": "介護スタッフ（ドック）が利用者（木村さん）のバイタルを測ります。", "vi": "Nhân viên chăm sóc (Doc) đo sinh hiệu của người được chăm sóc (Kimura san)."},
      "lines": [
        {"speaker": "staff", "ja": "木村さん、血圧を測りますね。", "vi": "Kimura san, tôi sẽ đo huyết áp nhé."},
        {"speaker": "resident", "ja": "はい、お願いします。", "vi": "Vâng, nhờ bạn."},
        {"speaker": "staff", "ja": "上が百二十八、下が七十九でした。", "vi": "Trên là 128, dưới là 79."},
        {"speaker": "resident", "ja": "問題ないですか？", "vi": "Không có vấn đề gì chứ?"},
        {"speaker": "staff", "ja": "はい、正常範囲です。体温は三十六度九分でした。", "vi": "Vâng, trong phạm vi bình thường. Nhiệt độ là 36,9 độ."}
      ],
      "key_phrases": [
        {"ja": "百二十八（128）", "vi": "Hyakunijuuhachi", "note_vi": "Cách đọc số huyết áp"},
        {"ja": "三十六度九分（36.9°C）", "vi": "Sanjuuroku do kyuubu", "note_vi": "Cách đọc nhiệt độ cơ thể"}
      ],
      "cultural_note": {
        "ja": "介護現場では血圧（例：百二十/八十）、体温（例：三十七度）、体重（例：五十キログラム）など、数字を毎日記録します。正確に読み書きできることが大切です。",
        "vi": "Trong môi trường chăm sóc, hàng ngày phải ghi chép số liệu như huyết áp (ví dụ: 120/80), nhiệt độ (ví dụ: 37 độ), cân nặng (ví dụ: 50 kg). Đọc và ghi chính xác rất quan trọng."
      }
    }
  }',
  '[
    {
      "question": {"ja": "「九」の読み方として正しいものはどれですか？（2つ）", "vi": "Cách đọc nào đúng cho \"九\"? (2 cách)"},
      "options": [
        {"ja": "はち・く", "vi": "Hachi và ku"},
        {"ja": "きゅう・く", "vi": "Kyuu và ku"},
        {"ja": "じゅう・く", "vi": "Juu và ku"},
        {"ja": "ろく・きゅう", "vi": "Roku và kyuu"}
      ],
      "correct": 1,
      "explanation": {"ja": "「九」は「きゅう」または「く」と読みます。", "vi": "\"九\" đọc là \"kyuu\" hoặc \"ku\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「百」は何ですか？", "vi": "\"百\" là số bao nhiêu?"},
      "options": [
        {"ja": "10", "vi": "10"},
        {"ja": "100", "vi": "100"},
        {"ja": "1000", "vi": "1000"},
        {"ja": "10000", "vi": "10000"}
      ],
      "correct": 1,
      "explanation": {"ja": "「百（ひゃく）」は100です。", "vi": "\"百 (hyaku)\" là 100."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "血圧「120」の正しい読み方はどれですか？", "vi": "Cách đọc đúng của huyết áp \"120\" là gì?"},
      "options": [
        {"ja": "ひゃくに", "vi": "Hyakuni"},
        {"ja": "ひゃくじゅう", "vi": "Hyakujuu"},
        {"ja": "ひゃくにじゅう", "vi": "Hyakunijuu"},
        {"ja": "ひゃくにひゃく", "vi": "Hyakunihyaku"}
      ],
      "correct": 2,
      "explanation": {"ja": "120は「ひゃくにじゅう」と読みます。百（100）+二十（20）です。", "vi": "120 đọc là \"hyakunijuu\". Là 百（100）+二十（20）."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "「体温は37度9分です」の「37度9分」の正しい読み方はどれですか？", "vi": "Cách đọc đúng của \"37度9分\" trong \"体温は37度9分です\" là gì?"},
      "options": [
        {"ja": "さんじゅうななどきゅうふん", "vi": "Sanjuunana do kyuufun"},
        {"ja": "さんじゅうしちどきゅうぶん", "vi": "Sanjuushichi do kyuubun"},
        {"ja": "さんじゅうしちどきゅうてん", "vi": "Sanjuushichi do kyuuten"},
        {"ja": "さんじゅうななどきゅうてん", "vi": "Sanjuunana do kyuuten"}
      ],
      "correct": 1,
      "explanation": {"ja": "体温は「さんじゅうしちどきゅうぶん」と読みます。「分」はここでは0.1度を意味します。", "vi": "Nhiệt độ cơ thể đọc là \"sanjuushichi do kyuubun\". \"Bu\" ở đây có nghĩa là 0,1 độ."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "介護記録に「本日の水分摂取量：1200ml」とあります。「1200」の正しい読み方はどれですか？", "vi": "Hồ sơ chăm sóc ghi \"Lượng nước uống hôm nay: 1200ml\". Cách đọc đúng của \"1200\" là gì?"},
      "options": [
        {"ja": "いちにひゃく", "vi": "Ichinihyaku"},
        {"ja": "せんにひゃく", "vi": "Sennihyaku"},
        {"ja": "じゅうにひゃく", "vi": "Juunihyaku"},
        {"ja": "ひゃくにじゅう", "vi": "Hyakunijuu"}
      ],
      "correct": 1,
      "explanation": {"ja": "1200は「せんにひゃく」と読みます。千（1000）+二百（200）です。", "vi": "1200 đọc là \"sennihyaku\". Là 千（1000）+二百（200）."},
      "difficulty": "hard"
    }
  ]',
  7,
  20
);

-- Lesson 8: いちじ（1時）、じゅうにじ（12時）、なんじ（何時）、いま（今）
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 2 Lesson 8: 時間の表現", "vi": "Unit 2 Bài 8: Biểu đạt thời gian"}',
  '{
    "type": "vocabulary",
    "unit": 2,
    "lesson_number": 8,
    "intro": {
      "ja": "時間の聞き方・答え方を学びましょう。介護のスケジュール管理に欠かせない表現です。",
      "vi": "Hãy học cách hỏi và trả lời về thời gian. Đây là biểu đạt không thể thiếu trong quản lý lịch trình chăm sóc."
    },
    "words": [
      {
        "word": "いちじ",
        "reading": "いちじ",
        "kanji": "一時",
        "meaning": {
          "vi": "1 giờ",
          "ja": "時刻の1時"
        },
        "examples": [
          {
            "ja": "昼食は一時から始まります。",
            "vi": "Bữa trưa bắt đầu từ 1 giờ."
          }
        ],
        "care_example": {
          "ja": "午後のリハビリ案内：「○○さん、一時からリハビリがあります。」",
          "vi": "Hướng dẫn phục hồi chức năng buổi chiều: '○○ san, ichiji kara rehabiiri ga arimasu.' (○○ san, 1 giờ có phục hồi chức năng.)"
        }
      },
      {
        "word": "じゅうにじ",
        "reading": "じゅうにじ",
        "kanji": "十二時",
        "meaning": {
          "vi": "12 giờ / Giữa trưa",
          "ja": "正午・12時"
        },
        "examples": [
          {
            "ja": "十二時に昼食があります。",
            "vi": "12 giờ có bữa trưa."
          }
        ],
        "care_example": {
          "ja": "食事の準備：「十二時から昼食です。十一時半にトイレにお連れします。」",
          "vi": "Chuẩn bị bữa ăn: 'Juuniji kara chuushoku desu. Juuichiji han ni toire ni otsureshimasu.' (Bữa trưa từ 12 giờ. 11 giờ rưỡi tôi sẽ đưa bạn đi vệ sinh.)"
        }
      },
      {
        "word": "なんじ",
        "reading": "なんじ",
        "kanji": "何時",
        "meaning": {
          "vi": "Mấy giờ? / Bao nhiêu giờ?",
          "ja": "時刻を尋ねる言葉"
        },
        "examples": [
          {
            "ja": "今、何時ですか？",
            "vi": "Bây giờ mấy giờ rồi?"
          }
        ],
        "care_example": {
          "ja": "利用者さんから聞かれた時：「今、何時ですか？」「三時です。おやつの時間ですね。」",
          "vi": "Khi người được chăm sóc hỏi: 'Ima, nanji desu ka?' 'Sanji desu. Oyatsu no jikan desu ne.' ('Bây giờ mấy giờ?' '3 giờ rồi. Đến giờ ăn nhẹ nhỉ.')"
        }
      },
      {
        "word": "いま",
        "reading": "いま",
        "kanji": "今",
        "meaning": {
          "vi": "Bây giờ / Hiện tại",
          "ja": "現在の時を表す言葉"
        },
        "examples": [
          {
            "ja": "今、何時ですか？",
            "vi": "Bây giờ mấy giờ rồi?"
          }
        ],
        "care_example": {
          "ja": "緊急時の確認：「今、大丈夫ですか？どこか痛いですか？」",
          "vi": "Kiểm tra khẩn cấp: 'Ima, daijoubu desu ka? Doko ka itai desu ka?' (Bây giờ bạn ổn không? Có đau ở đâu không?)"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "デイサービスのスケジュール", "vi": "Lịch trình trung tâm chăm sóc ban ngày"},
      "scene": {"ja": "介護スタッフ（ランアン）が利用者（高橋さん）に一日のスケジュールを説明します。", "vi": "Nhân viên chăm sóc (Lan Anh) giải thích lịch trình một ngày cho người được chăm sóc (Takahashi san)."},
      "lines": [
        {"speaker": "resident", "ja": "今日のスケジュールを教えてください。", "vi": "Hãy cho tôi biết lịch trình hôm nay."},
        {"speaker": "staff", "ja": "はい。今は九時です。十時からリハビリがあります。", "vi": "Vâng. Bây giờ là 9 giờ. 10 giờ có phục hồi chức năng."},
        {"speaker": "resident", "ja": "昼食は何時ですか？", "vi": "Bữa trưa mấy giờ?"},
        {"speaker": "staff", "ja": "十二時です。午後一時からレクリエーションがあります。", "vi": "12 giờ. Chiều 1 giờ có hoạt động giải trí."},
        {"speaker": "resident", "ja": "わかりました。ありがとうございます。", "vi": "Vâng, tôi hiểu rồi. Cảm ơn."}
      ],
      "key_phrases": [
        {"ja": "今は〜時です", "vi": "Ima wa ~ji desu", "note_vi": "Bây giờ là ~ giờ"},
        {"ja": "〜時から〜があります", "vi": "~ji kara ~ ga arimasu", "note_vi": "Từ ~ giờ có ~"}
      ],
      "cultural_note": {
        "ja": "日本の介護施設では時間通りに動くことが大切です。食事・入浴・リハビリ・薬の時間など、正確な時刻を伝えることが利用者さんの安心につながります。",
        "vi": "Trong các cơ sở chăm sóc ở Nhật Bản, việc làm đúng giờ rất quan trọng. Thông báo chính xác thời gian bữa ăn, tắm, phục hồi chức năng, uống thuốc, v.v. mang lại sự yên tâm cho người được chăm sóc."
      }
    }
  }',
  '[
    {
      "question": {"ja": "「今、何時ですか？」の「何時」の読み方はどれですか？", "vi": "Cách đọc của \"何時\" trong \"今、何時ですか？\" là gì?"},
      "options": [
        {"ja": "なんにち", "vi": "Nannichi"},
        {"ja": "なんじ", "vi": "Nanji"},
        {"ja": "いちじ", "vi": "Ichiji"},
        {"ja": "じゅうにじ", "vi": "Juuniji"}
      ],
      "correct": 1,
      "explanation": {"ja": "時刻を尋ねる「何時」は「なんじ」と読みます。", "vi": "\"何時\" để hỏi giờ đọc là \"nanji\"."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "「今は十二時です」の意味はどれですか？", "vi": "Nghĩa của \"Ima wa juuniji desu\" là gì?"},
      "options": [
        {"ja": "今は10時です。", "vi": "Bây giờ là 10 giờ."},
        {"ja": "今は11時です。", "vi": "Bây giờ là 11 giờ."},
        {"ja": "今は12時です。", "vi": "Bây giờ là 12 giờ."},
        {"ja": "今は1時です。", "vi": "Bây giờ là 1 giờ."}
      ],
      "correct": 2,
      "explanation": {"ja": "「十二時」は12時（正午）です。", "vi": "\"Juuniji\" là 12 giờ (giữa trưa)."},
      "difficulty": "easy"
    },
    {
      "question": {"ja": "利用者さんに「リハビリは何時ですか？」と聞かれました。2時の場合、何と答えますか？", "vi": "Người được chăm sóc hỏi \"Phục hồi chức năng mấy giờ?\". Nếu là 2 giờ, bạn trả lời gì?"},
      "options": [
        {"ja": "いちじです。", "vi": "Ichiji desu."},
        {"ja": "にじです。", "vi": "Niji desu."},
        {"ja": "さんじです。", "vi": "Sanji desu."},
        {"ja": "よじです。", "vi": "Yoji desu."}
      ],
      "correct": 1,
      "explanation": {"ja": "「二時（にじ）です」が2時の答えです。", "vi": "\"Niji desu\" là câu trả lời cho 2 giờ."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "「今、大丈夫ですか？」という文での「今」の役割はどれですか？", "vi": "Trong câu \"Ima, daijoubu desu ka?\", vai trò của \"ima\" là gì?"},
      "options": [
        {"ja": "場所を表す", "vi": "Biểu đạt địa điểm"},
        {"ja": "現在の時点を表す", "vi": "Biểu đạt thời điểm hiện tại"},
        {"ja": "過去を表す", "vi": "Biểu đạt quá khứ"},
        {"ja": "未来を表す", "vi": "Biểu đạt tương lai"}
      ],
      "correct": 1,
      "explanation": {"ja": "「今」は現在の時点を表します。「今、大丈夫ですか」は現在の状態を確認する表現です。", "vi": "\"Ima\" biểu đạt thời điểm hiện tại. \"Ima, daijoubu desu ka\" là biểu đạt kiểm tra tình trạng hiện tại."},
      "difficulty": "medium"
    },
    {
      "question": {"ja": "デイサービスで利用者さんに「次のプログラムは何時からですか？」と聞かれた場合、どのように答えるのが最も丁寧ですか？（次のプログラムは午後3時から）", "vi": "Tại trung tâm chăm sóc ban ngày, người được chăm sóc hỏi \"Chương trình tiếp theo mấy giờ bắt đầu?\". Cách trả lời nào lịch sự nhất? (Chương trình tiếp theo lúc 3 giờ chiều)"},
      "options": [
        {"ja": "3時です。", "vi": "Sanji desu."},
        {"ja": "午後三時からです。", "vi": "Gogo sanji kara desu."},
        {"ja": "ちょっと待ってください。", "vi": "Chotto matte kudasai."},
        {"ja": "午後三時からレクリエーションがございます。お楽しみください。", "vi": "Gogo sanji kara rekurieeshon ga gozaimasu. Otanoshimi kudasai."}
      ],
      "correct": 3,
      "explanation": {"ja": "「午後三時からレクリエーションがございます。お楽しみください。」が最も丁寧で情報量も多い答えです。「ございます」は「あります」の丁寧語です。", "vi": "\"Gogo sanji kara rekurieeshon ga gozaimasu. Otanoshimi kudasai.\" là câu trả lời lịch sự nhất và có nhiều thông tin nhất. \"Gozaimasu\" là dạng lịch sự của \"arimasu\"."},
      "difficulty": "hard"
    }
  ]',
  8,
  20
);

-- Unit 3: 家族・人 (Lessons 9-12)

-- Lesson 9: おかあさん・おとうさん・おにいさん・おねえさん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 3 Lesson 9: 家族①（親・兄姉）", "vi": "Unit 3 Bài 9: Gia đình ① (Bố mẹ, anh chị)"}',
  '{
    "type": "vocabulary",
    "unit": 3,
    "lesson_number": 9,
    "intro": {
      "ja": "家族の呼び方を学びましょう。利用者さんの家族と話す際に必要な言葉です。",
      "vi": "Học cách gọi các thành viên gia đình. Cần thiết khi nói chuyện với gia đình người được chăm sóc."
    },
    "words": [
      {
        "word": "おかあさん",
        "reading": "おかあさん",
        "kanji": "お母さん",
        "meaning": {"vi": "Mẹ (kính ngữ)", "ja": "母親（敬称）"},
        "examples": [{"ja": "○○さんのお母さんが面会に来られました。", "vi": "Mẹ của ○○ san đã đến thăm."}],
        "care_example": {"ja": "「○○さんのお母さんから電話がありました。」", "vi": "\"○○ san no okaasan kara denwa ga arimashita.\""}
      },
      {
        "word": "おとうさん",
        "reading": "おとうさん",
        "kanji": "お父さん",
        "meaning": {"vi": "Bố (kính ngữ)", "ja": "父親（敬称）"},
        "examples": [{"ja": "お父さんが荷物を持ってきてくれました。", "vi": "Bố đã mang đồ đến."}],
        "care_example": {"ja": "「今日はお父さんが面会に来てくださいました。」", "vi": "\"Kyou wa otousan ga menkai ni kite kudasaimashita.\""}
      },
      {
        "word": "おにいさん",
        "reading": "おにいさん",
        "kanji": "お兄さん",
        "meaning": {"vi": "Anh trai (kính ngữ)", "ja": "兄（敬称）"},
        "examples": [{"ja": "お兄さんが施設に来られました。", "vi": "Anh trai đã đến cơ sở."}],
        "care_example": {"ja": "「○○さんのお兄さんが面会室にいらっしゃいます。」", "vi": "\"○○ san no oniisan ga menkaishistu ni irasshaimasu.\""}
      },
      {
        "word": "おねえさん",
        "reading": "おねえさん",
        "kanji": "お姉さん",
        "meaning": {"vi": "Chị gái (kính ngữ)", "ja": "姉（敬称）"},
        "examples": [{"ja": "お姉さんが毎週来てくださいます。", "vi": "Chị gái đến thăm mỗi tuần."}],
        "care_example": {"ja": "「○○さんのお姉さんから面会の連絡がありました。」", "vi": "\"○○ san no oneesan kara menkai no renraku ga arimashita.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "面会の受付", "vi": "Tiếp đón người thăm"},
      "scene": {"ja": "利用者さんの家族が面会に来た場面", "vi": "Gia đình người được chăm sóc đến thăm"},
      "lines": [
        {"speaker": "family", "ja": "こんにちは。田中の娘です。父に会いに来ました。", "vi": "Xin chào. Tôi là con gái của ông Tanaka. Tôi đến thăm bố."},
        {"speaker": "staff", "ja": "いらっしゃいませ。お父様は今、お部屋にいらっしゃいます。", "vi": "Xin chào mừng. Bố bạn hiện đang ở trong phòng."},
        {"speaker": "family", "ja": "体調はいかがですか？", "vi": "Sức khỏe của ông ấy thế nào?"},
        {"speaker": "staff", "ja": "今朝は朝食をよく召し上がりました。ご安心ください。", "vi": "Sáng nay ông ấy ăn sáng rất ngon. Xin đừng lo lắng."}
      ],
      "key_phrases": [
        {"ja": "いらっしゃいませ", "vi": "Xin chào mừng", "note_vi": "Lời chào kính trọng khi có khách đến"},
        {"ja": "ご安心ください", "vi": "Xin đừng lo lắng", "note_vi": "Câu trấn an gia đình"}
      ],
      "cultural_note": {
        "ja": "他人の親を呼ぶ時は「お父さん」「お母さん」（敬称）を使います。自分の親は「父」「母」と呼びます。",
        "vi": "Khi gọi bố mẹ của người khác dùng \"otousan\" \"okaasan\" (kính ngữ). Bố mẹ của mình thì gọi là \"chichi\" \"haha\"."
      }
    }
  }',
  '[
    {"question": {"ja": "「お母さん」の読み方は？", "vi": "Cách đọc của \"お母さん\" là gì?"}, "options": [{"ja": "おとうさん", "vi": "Otousan"}, {"ja": "おかあさん", "vi": "Okaasan"}, {"ja": "おにいさん", "vi": "Oniisan"}, {"ja": "おねえさん", "vi": "Oneesan"}], "correct": 1, "explanation": {"ja": "「お母さん」は「おかあさん」と読みます。", "vi": "\"お母さん\" đọc là \"okaasan\"."}, "difficulty": "easy"},
    {"question": {"ja": "「お兄さん」は誰ですか？", "vi": "\"お兄さん\" là ai?"}, "options": [{"ja": "妹", "vi": "Em gái"}, {"ja": "弟", "vi": "Em trai"}, {"ja": "姉", "vi": "Chị gái"}, {"ja": "兄", "vi": "Anh trai"}], "correct": 3, "explanation": {"ja": "「お兄さん」は兄（年上の男性兄弟）のことです。", "vi": "\"お兄さん\" là anh trai."}, "difficulty": "easy"},
    {"question": {"ja": "面会者が来た時の最初のあいさつは？", "vi": "Lời chào đầu tiên khi có người đến thăm?"}, "options": [{"ja": "さようなら", "vi": "Sayounara"}, {"ja": "おはようございます", "vi": "Ohayou gozaimasu"}, {"ja": "いらっしゃいませ", "vi": "Irasshaimase"}, {"ja": "おやすみなさい", "vi": "Oyasuminasai"}], "correct": 2, "explanation": {"ja": "来訪者には「いらっしゃいませ」と丁寧にあいさつします。", "vi": "Chào khách bằng \"Irasshaimase\" một cách lịch sự."}, "difficulty": "medium"},
    {"question": {"ja": "自分の母親を他人に紹介する正しい言い方は？", "vi": "Cách đúng để giới thiệu mẹ mình với người khác?"}, "options": [{"ja": "おかあさん", "vi": "Okaasan"}, {"ja": "母（はは）", "vi": "Haha"}, {"ja": "ママ", "vi": "Mama"}, {"ja": "お母さま", "vi": "Okaasama"}], "correct": 1, "explanation": {"ja": "自分の母親を他人に言う時は謙譲語の「母（はは）」を使います。", "vi": "Khi giới thiệu mẹ mình với người khác, dùng \"haha\" (khiêm tốn ngữ)."}, "difficulty": "medium"},
    {"question": {"ja": "家族に利用者の体調を伝える際の適切な対応は？", "vi": "Cách phù hợp để thông báo tình trạng sức khỏe cho gia đình?"}, "options": [{"ja": "「問題ありません」だけ答える", "vi": "Chỉ nói \"Không có vấn đề\""}, {"ja": "個人情報なので何も話さない", "vi": "Là thông tin cá nhân nên không nói gì"}, {"ja": "現状を丁寧に説明し不安を和らげる", "vi": "Giải thích tình trạng lịch sự và giảm bớt lo lắng"}, {"ja": "すべての医療記録を見せる", "vi": "Cho xem tất cả hồ sơ y tế"}], "correct": 2, "explanation": {"ja": "家族の不安を解消しながら現状を丁寧に説明することが大切です。", "vi": "Quan trọng là giải thích tình trạng hiện tại lịch sự trong khi giảm bớt lo lắng cho gia đình."}, "difficulty": "hard"}
  ]',
  9,
  20
);

-- Lesson 10: おとうと・いもうと・おじいさん・おばあさん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 3 Lesson 10: 家族②（弟妹・祖父母）", "vi": "Unit 3 Bài 10: Gia đình ② (Em, Ông bà)"}',
  '{
    "type": "vocabulary",
    "unit": 3,
    "lesson_number": 10,
    "intro": {
      "ja": "弟・妹・祖父母の言い方を学びましょう。",
      "vi": "Học cách gọi em trai, em gái, ông và bà."
    },
    "words": [
      {
        "word": "おとうと",
        "reading": "おとうと",
        "kanji": "弟",
        "meaning": {"vi": "Em trai", "ja": "年下の男性兄弟"},
        "examples": [{"ja": "弟さんが面会に来ました。", "vi": "Em trai đã đến thăm."}],
        "care_example": {"ja": "「○○さんの弟さんから電話がありました。」", "vi": "\"○○ san no otoutosan kara denwa ga arimashita.\""}
      },
      {
        "word": "いもうと",
        "reading": "いもうと",
        "kanji": "妹",
        "meaning": {"vi": "Em gái", "ja": "年下の女性兄弟"},
        "examples": [{"ja": "妹さんが荷物を持ってきました。", "vi": "Em gái đã mang đồ đến."}],
        "care_example": {"ja": "「○○さんの妹さんが面会の予約を入れました。」", "vi": "\"○○ san no imoutosan ga menkai no yoyaku wo iremashita.\""}
      },
      {
        "word": "おじいさん",
        "reading": "おじいさん",
        "kanji": "お爺さん",
        "meaning": {"vi": "Ông (nội/ngoại)", "ja": "祖父（敬称）"},
        "examples": [{"ja": "おじいさん、今日は散歩日和ですね。", "vi": "Ông ơi, hôm nay là ngày đẹp để đi dạo nhỉ."}],
        "care_example": {"ja": "（注意）利用者への呼びかけは「○○さん」と名前で呼ぶのが基本です。", "vi": "(Chú ý) Cơ bản nên gọi người được chăm sóc bằng tên \"○○ san\"."}
      },
      {
        "word": "おばあさん",
        "reading": "おばあさん",
        "kanji": "お婆さん",
        "meaning": {"vi": "Bà (nội/ngoại)", "ja": "祖母（敬称）"},
        "examples": [{"ja": "おばあさん、体調はいかがですか？", "vi": "Bà ơi, sức khỏe của bà thế nào?"}],
        "care_example": {"ja": "「○○さんのおばあさまが入所されました。」（家族の祖母を指す場合）", "vi": "\"○○ san no obaasama ga nyuusho saremashita.\" (Khi chỉ bà của gia đình)"}
      }
    ],
    "dialogue": {
      "title": {"ja": "家族との情報共有", "vi": "Chia sẻ thông tin với gia đình"},
      "scene": {"ja": "弟さんに利用者の様子を伝える場面", "vi": "Thông báo tình trạng cho em trai của người được chăm sóc"},
      "lines": [
        {"speaker": "family", "ja": "兄の様子はどうですか？", "vi": "Tình trạng của anh tôi thế nào?"},
        {"speaker": "staff", "ja": "今朝は食欲もあり、よくお召し上がりになりました。", "vi": "Sáng nay ông ấy có cảm giác ngon miệng và ăn rất tốt."},
        {"speaker": "family", "ja": "よかった。妹も心配していました。", "vi": "Tốt quá. Em gái tôi cũng lo lắng đấy."},
        {"speaker": "staff", "ja": "ご家族みなさまによろしくお伝えください。", "vi": "Xin hãy chuyển lời thăm hỏi đến toàn thể gia đình."}
      ],
      "key_phrases": [
        {"ja": "〜をよく召し上がりました", "vi": "Đã ăn〜 rất ngon", "note_vi": "「召し上がる」là kính ngữ của「食べる」"},
        {"ja": "みなさまによろしくお伝えください", "vi": "Xin hãy chuyển lời thăm hỏi đến mọi người", "note_vi": "Cách nói lịch sự khi nhắn hỏi thăm"}
      ],
      "cultural_note": {
        "ja": "「おじいさん」「おばあさん」は利用者への直接の呼びかけより、名前を使う方が個人の尊厳を尊重できます。",
        "vi": "Thay vì gọi trực tiếp \"ojiisan\" \"obaasan\", sử dụng tên người dùng thể hiện sự tôn trọng phẩm giá cá nhân hơn."
      }
    }
  }',
  '[
    {"question": {"ja": "「妹」の読み方は？", "vi": "Cách đọc của \"妹\" là gì?"}, "options": [{"ja": "おとうと", "vi": "Otouto"}, {"ja": "いもうと", "vi": "Imouto"}, {"ja": "おにいさん", "vi": "Oniisan"}, {"ja": "おねえさん", "vi": "Oneesan"}], "correct": 1, "explanation": {"ja": "「妹」は「いもうと」と読みます。", "vi": "\"妹\" đọc là \"imouto\"."}, "difficulty": "easy"},
    {"question": {"ja": "「弟」は誰ですか？", "vi": "\"弟\" là ai?"}, "options": [{"ja": "年上の男性兄弟", "vi": "Anh trai"}, {"ja": "年下の女性兄弟", "vi": "Em gái"}, {"ja": "年下の男性兄弟", "vi": "Em trai"}, {"ja": "年上の女性兄弟", "vi": "Chị gái"}], "correct": 2, "explanation": {"ja": "「弟（おとうと）」は年下の男性兄弟です。", "vi": "\"弟（otouto）\" là em trai."}, "difficulty": "easy"},
    {"question": {"ja": "利用者への呼びかけの基本は？", "vi": "Cách gọi cơ bản với người được chăm sóc?"}, "options": [{"ja": "おじいさん・おばあさん", "vi": "Ojiisan / Obaasan"}, {"ja": "あなた", "vi": "Anata"}, {"ja": "○○さんと名前で呼ぶ", "vi": "Gọi bằng tên ○○ san"}, {"ja": "患者さん", "vi": "Kanjasan (bệnh nhân)"}], "correct": 2, "explanation": {"ja": "利用者への呼びかけは「○○さん」と名前で呼ぶのが個人の尊厳を尊重した方法です。", "vi": "Gọi bằng tên \"○○ san\" là cách tôn trọng phẩm giá cá nhân của người được chăm sóc."}, "difficulty": "medium"},
    {"question": {"ja": "「お祖父さま」は「おじいさん」より丁寧？", "vi": "\"Ojiisama\" có lịch sự hơn \"ojiisan\" không?"}, "options": [{"ja": "同じ", "vi": "Như nhau"}, {"ja": "「おじいさん」の方が丁寧", "vi": "\"Ojiisan\" lịch sự hơn"}, {"ja": "「おじいさま（お祖父様）」の方が丁寧", "vi": "\"Ojiisama\" lịch sự hơn"}, {"ja": "どちらも使わない方がいい", "vi": "Không nên dùng cả hai"}], "correct": 2, "explanation": {"ja": "「〜様（さま）」は「〜さん」より更に丁寧な敬称です。", "vi": "\"〜sama\" là kính ngữ lịch sự hơn \"〜san\"."}, "difficulty": "medium"},
    {"question": {"ja": "家族への伝言として最も適切な言い方は？", "vi": "Cách nhắn tin cho gia đình phù hợp nhất là gì?"}, "options": [{"ja": "「みんなによろしく」", "vi": "\"Minna ni yoroshiku\""}, {"ja": "「ご家族みなさまによろしくお伝えください」", "vi": "\"Gokazoku minasama ni yoroshiku otsutae kudasai\""}, {"ja": "「家族に言っておいて」", "vi": "\"Kazoku ni itte oite\""}, {"ja": "「あとで電話して」", "vi": "\"Ato de denwa shite\""}], "correct": 1, "explanation": {"ja": "「ご家族みなさまによろしくお伝えください」は丁寧な伝言の依頼表現です。", "vi": "\"Gokazoku minasama ni yoroshiku otsutae kudasai\" là cách nhờ nhắn tin lịch sự."}, "difficulty": "hard"}
  ]',
  10,
  20
);

-- Lesson 11: ともだち・せんせい・がくせい・かいしゃいん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 3 Lesson 11: 人の呼び方①", "vi": "Unit 3 Bài 11: Cách gọi người ①"}',
  '{
    "type": "vocabulary",
    "unit": 3,
    "lesson_number": 11,
    "intro": {
      "ja": "友人・職業など人を表す言葉を学びましょう。",
      "vi": "Học các từ chỉ người như bạn bè, nghề nghiệp."
    },
    "words": [
      {
        "word": "ともだち",
        "reading": "ともだち",
        "kanji": "友達",
        "meaning": {"vi": "Bạn bè", "ja": "友人"},
        "examples": [{"ja": "友達と一緒に施設に遊びに来ました。", "vi": "Tôi đến cơ sở thăm cùng với bạn bè."}],
        "care_example": {"ja": "「昔のお友達が面会に来てくださいました。」", "vi": "\"Mukashi no otomodachi ga menkai ni kite kudasaimashita.\""}
      },
      {
        "word": "せんせい",
        "reading": "せんせい",
        "kanji": "先生",
        "meaning": {"vi": "Giáo viên / Thầy / Cô", "ja": "教師・医師などへの敬称"},
        "examples": [{"ja": "担当の先生が診察に来ました。", "vi": "Bác sĩ phụ trách đã đến khám."}],
        "care_example": {"ja": "「今日は医師の先生が回診に来られます。」", "vi": "\"Kyou wa ishi no sensei ga kaishin ni koraremasu.\""}
      },
      {
        "word": "がくせい",
        "reading": "がくせい",
        "kanji": "学生",
        "meaning": {"vi": "Học sinh / Sinh viên", "ja": "学校に通う人"},
        "examples": [{"ja": "介護福祉士の学生が実習に来ています。", "vi": "Sinh viên ngành chăm sóc phúc lợi đang thực tập ở đây."}],
        "care_example": {"ja": "「今月は介護学校の学生さんが実習中です。よろしくお願いします。」", "vi": "\"Kongetsu wa kaigo gakkou no gakusei san ga jishuuchuu desu. Yoroshiku onegai shimasu.\""}
      },
      {
        "word": "かいしゃいん",
        "reading": "かいしゃいん",
        "kanji": "会社員",
        "meaning": {"vi": "Nhân viên công ty", "ja": "会社で働く人"},
        "examples": [{"ja": "息子さんは会社員です。", "vi": "Con trai là nhân viên công ty."}],
        "care_example": {"ja": "「ご家族は会社員なので、土日に面会に来られます。」", "vi": "\"Gokazoku wa kaishain nanode, donichi ni menkai ni koraremasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "実習生の紹介", "vi": "Giới thiệu thực tập sinh"},
      "scene": {"ja": "介護学校の学生が実習に来た場面", "vi": "Sinh viên trường chăm sóc đến thực tập"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、今日から実習の学生さんが来ています。", "vi": "○○ san, hôm nay có thực tập sinh đến."},
        {"speaker": "student", "ja": "はじめまして。介護福祉士を目指している学生の鈴木です。よろしくお願いします。", "vi": "Rất vui được gặp. Tôi là sinh viên Suzuki đang hướng đến trở thành chuyên viên chăm sóc phúc lợi."},
        {"speaker": "user", "ja": "まあ、若い先生が来たのね。よろしく。", "vi": "Ồ, thầy/cô trẻ đến rồi đấy. Xin nhờ nhé."},
        {"speaker": "student", "ja": "先生ではなく学生です。でもしっかり頑張ります！", "vi": "Không phải thầy đâu, tôi là học sinh thôi. Nhưng tôi sẽ cố gắng hết sức!"}
      ],
      "key_phrases": [
        {"ja": "〜を目指している", "vi": "Đang hướng đến〜 / Muốn trở thành〜", "note_vi": "Cách nói về mục tiêu nghề nghiệp"},
        {"ja": "しっかり頑張ります", "vi": "Tôi sẽ cố gắng hết sức", "note_vi": "Lời hứa quyết tâm"}
      ],
      "cultural_note": {
        "ja": "日本では「先生」は教師だけでなく、医師・弁護士・政治家など専門職の人への敬称としても使われます。",
        "vi": "Ở Nhật, \"sensei\" không chỉ dùng cho giáo viên mà còn dùng như kính ngữ cho các chuyên gia như bác sĩ, luật sư, chính trị gia."
      }
    }
  }',
  '[
    {"question": {"ja": "「友達」の読み方は？", "vi": "Cách đọc của \"友達\" là gì?"}, "options": [{"ja": "せんせい", "vi": "Sensei"}, {"ja": "がくせい", "vi": "Gakusei"}, {"ja": "ともだち", "vi": "Tomodachi"}, {"ja": "かいしゃいん", "vi": "Kaishain"}], "correct": 2, "explanation": {"ja": "「友達」は「ともだち」と読みます。", "vi": "\"友達\" đọc là \"tomodachi\"."}, "difficulty": "easy"},
    {"question": {"ja": "「先生」は誰に使いますか？", "vi": "\"先生\" dùng cho ai?"}, "options": [{"ja": "学生だけ", "vi": "Chỉ học sinh"}, {"ja": "友達だけ", "vi": "Chỉ bạn bè"}, {"ja": "教師・医師など専門職", "vi": "Giáo viên, bác sĩ và các chuyên gia"}, {"ja": "会社員だけ", "vi": "Chỉ nhân viên công ty"}], "correct": 2, "explanation": {"ja": "「先生」は教師・医師・弁護士などの専門職への敬称です。", "vi": "\"先生\" là kính ngữ cho các chuyên gia như giáo viên, bác sĩ, luật sư."}, "difficulty": "easy"},
    {"question": {"ja": "介護学校の学生が来ている時の適切な紹介は？", "vi": "Cách giới thiệu phù hợp khi có sinh viên trường chăm sóc đến?"}, "options": [{"ja": "「先生が来ています」", "vi": "\"Sensei ga kite imasu\""}, {"ja": "「知らない人が来ています」", "vi": "\"Shiranai hito ga kite imasu\""}, {"ja": "「実習の学生さんが来ています」", "vi": "\"Jisshuu no gakusei san ga kite imasu\""}, {"ja": "「邪魔な人が来ています」", "vi": "\"Jama na hito ga kite imasu\""}], "correct": 2, "explanation": {"ja": "「実習の学生さんが来ています」と正確に紹介します。", "vi": "Giới thiệu chính xác bằng \"Jisshuu no gakusei san ga kite imasu\"."}, "difficulty": "medium"},
    {"question": {"ja": "「会社員」の読み方は？", "vi": "Cách đọc của \"会社員\" là gì?"}, "options": [{"ja": "がっこういん", "vi": "Gakkouín"}, {"ja": "がくせい", "vi": "Gakusei"}, {"ja": "かいしゃいん", "vi": "Kaishain"}, {"ja": "かいごし", "vi": "Kaigoshi"}], "correct": 2, "explanation": {"ja": "「会社員」は「かいしゃいん」と読み、会社で働く人のことです。", "vi": "\"会社員\" đọc là \"kaishain\", là người làm việc ở công ty."}, "difficulty": "medium"},
    {"question": {"ja": "実習生が施設に来た際の適切な対応は？", "vi": "Cách xử lý phù hợp khi thực tập sinh đến cơ sở?"}, "options": [{"ja": "利用者に紹介せず直接作業させる", "vi": "Không giới thiệu với người dùng, cho làm việc trực tiếp"}, {"ja": "利用者に紹介し、安心してもらう", "vi": "Giới thiệu với người dùng để họ yên tâm"}, {"ja": "実習生には全ての業務を一人でさせる", "vi": "Để thực tập sinh tự làm tất cả mọi việc"}, {"ja": "利用者に近づけない", "vi": "Không cho tiếp cận người dùng"}], "correct": 1, "explanation": {"ja": "実習生を利用者に紹介することで、利用者が安心できます。", "vi": "Giới thiệu thực tập sinh với người được chăm sóc giúp họ cảm thấy yên tâm."}, "difficulty": "hard"}
  ]',
  11,
  20
);

-- Lesson 12: わたし・あなた・かれ・かのじょ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 3 Lesson 12: 人称代名詞", "vi": "Unit 3 Bài 12: Đại từ nhân xưng"}',
  '{
    "type": "vocabulary",
    "unit": 3,
    "lesson_number": 12,
    "intro": {
      "ja": "「私」「あなた」など、人を指す言葉を学びましょう。日本語は文脈で省略されることも多いです。",
      "vi": "Học các từ chỉ người như \"tôi\", \"bạn\". Trong tiếng Nhật, chúng thường được bỏ qua theo ngữ cảnh."
    },
    "words": [
      {
        "word": "わたし",
        "reading": "わたし",
        "kanji": "私",
        "meaning": {"vi": "Tôi (lịch sự)", "ja": "自分自身を指す言葉（丁寧）"},
        "examples": [{"ja": "私は介護士の○○です。", "vi": "Tôi là nhân viên chăm sóc ○○."}],
        "care_example": {"ja": "「私が今日の担当です。何でもお申し付けください。」", "vi": "\"Watashi ga kyou no tantou desu. Nandemo omoushitsuke kudasai.\""}
      },
      {
        "word": "あなた",
        "reading": "あなた",
        "kanji": "貴方",
        "meaning": {"vi": "Bạn / Anh / Chị (đối phương)", "ja": "相手を指す言葉"},
        "examples": [{"ja": "あなたの体調はいかがですか？", "vi": "Sức khỏe của bạn thế nào?"}],
        "care_example": {"ja": "（注意）「あなた」は目上の人への使用は避け、名前や役職で呼ぶほうが丁寧です。", "vi": "(Chú ý) Tránh dùng \"anata\" với người lớn tuổi hơn, gọi bằng tên hoặc chức vụ sẽ lịch sự hơn."}
      },
      {
        "word": "かれ",
        "reading": "かれ",
        "kanji": "彼",
        "meaning": {"vi": "Anh ấy / Ông ấy", "ja": "男性を指す三人称"},
        "examples": [{"ja": "彼は昨日から食欲がありません。", "vi": "Ông ấy từ hôm qua không có cảm giác ngon miệng."}],
        "care_example": {"ja": "「彼（田中さん）は今日のリハビリを頑張りました。」", "vi": "\"Kare (Tanaka san) wa kyou no rihabirishuu wo ganbarimashita.\""}
      },
      {
        "word": "かのじょ",
        "reading": "かのじょ",
        "kanji": "彼女",
        "meaning": {"vi": "Cô ấy / Bà ấy", "ja": "女性を指す三人称"},
        "examples": [{"ja": "彼女は今朝から元気です。", "vi": "Bà ấy từ sáng đã khỏe."}],
        "care_example": {"ja": "「彼女（佐藤さん）は今日、ご家族が面会に来られます。」", "vi": "\"Kanojo (Satou san) wa kyou, gokazoku ga menkai ni koraremasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "引き継ぎ申し送り", "vi": "Bàn giao ca làm việc"},
      "scene": {"ja": "介護スタッフが次のシフトに引き継ぎをする場面", "vi": "Nhân viên chăm sóc bàn giao cho ca tiếp theo"},
      "lines": [
        {"speaker": "staff_a", "ja": "田中さんについてですが、彼は今朝から食欲がありません。", "vi": "Về ông Tanaka, ông ấy từ sáng không có cảm giác ngon miệng."},
        {"speaker": "staff_b", "ja": "わかりました。私が昼食の様子を確認します。", "vi": "Tôi hiểu rồi. Tôi sẽ kiểm tra bữa trưa của ông ấy."},
        {"speaker": "staff_a", "ja": "佐藤さんは今日、彼女のご家族が来られます。", "vi": "Bà Sato hôm nay có gia đình đến thăm."},
        {"speaker": "staff_b", "ja": "わかりました。あなたはお疲れ様でした。", "vi": "Tôi hiểu rồi. Bạn đã vất vả rồi. Cảm ơn bạn."}
      ],
      "key_phrases": [
        {"ja": "お疲れ様でした", "vi": "Bạn đã vất vả rồi (cảm ơn)", "note_vi": "Lời nói với đồng nghiệp sau ca làm việc"},
        {"ja": "私が〜します", "vi": "Tôi sẽ〜", "note_vi": "Cách tự nguyện đảm nhận nhiệm vụ"}
      ],
      "cultural_note": {
        "ja": "日本語では主語（私・あなた等）を省略することが多いです。文脈から判断します。また「あなた」は目上の人には使わず、名前で呼びます。",
        "vi": "Trong tiếng Nhật, chủ ngữ (tôi, bạn, v.v.) thường được bỏ qua và suy luận từ ngữ cảnh. Ngoài ra, không dùng \"anata\" với người lớn tuổi hơn, mà gọi bằng tên."
      }
    }
  }',
  '[
    {"question": {"ja": "「私」の読み方は？", "vi": "Cách đọc của \"私\" là gì?"}, "options": [{"ja": "あなた", "vi": "Anata"}, {"ja": "かれ", "vi": "Kare"}, {"ja": "わたし", "vi": "Watashi"}, {"ja": "かのじょ", "vi": "Kanojo"}], "correct": 2, "explanation": {"ja": "「私」は「わたし」と読み、自分自身を指します。", "vi": "\"私\" đọc là \"watashi\", chỉ bản thân người nói."}, "difficulty": "easy"},
    {"question": {"ja": "「彼女」は誰を指しますか？", "vi": "\"彼女\" chỉ ai?"}, "options": [{"ja": "男性", "vi": "Người nam"}, {"ja": "子ども", "vi": "Trẻ em"}, {"ja": "女性", "vi": "Người nữ"}, {"ja": "老人", "vi": "Người già"}], "correct": 2, "explanation": {"ja": "「彼女（かのじょ）」は女性を指す三人称です。", "vi": "\"彼女（kanojo）\" là đại từ ngôi thứ ba chỉ người nữ."}, "difficulty": "easy"},
    {"question": {"ja": "目上の利用者に「あなた」を使うことについて正しい説明は？", "vi": "Điều đúng về việc dùng \"anata\" với người được chăm sóc lớn tuổi hơn?"}, "options": [{"ja": "親しみやすいので積極的に使う", "vi": "Dùng nhiều vì dễ tạo sự thân mật"}, {"ja": "失礼なので名前や役職で呼ぶ方が良い", "vi": "Bất lịch sự nên gọi bằng tên hoặc chức vụ"}, {"ja": "外国語なので使っても問題ない", "vi": "Là tiếng nước ngoài nên không có vấn đề"}, {"ja": "医療現場では必ず使う", "vi": "Trong môi trường y tế phải dùng"}], "correct": 1, "explanation": {"ja": "「あなた」は目上の人への使用は控え、「○○さん」と名前で呼ぶのが丁寧です。", "vi": "Nên tránh dùng \"anata\" với người lớn tuổi hơn, gọi bằng \"○○ san\" sẽ lịch sự hơn."}, "difficulty": "medium"},
    {"question": {"ja": "引き継ぎで「彼は食欲がありません」と言う場合、「彼」は何を意味する？", "vi": "Trong bàn giao ca, \"kare wa shokuyoku ga arimasen\" thì \"kare\" có nghĩa là gì?"}, "options": [{"ja": "話している本人", "vi": "Người đang nói"}, {"ja": "別の男性利用者または男性スタッフ", "vi": "Người dùng nam hoặc nhân viên nam khác"}, {"ja": "相手の職員", "vi": "Nhân viên đối diện"}, {"ja": "どこかの女性", "vi": "Một người phụ nữ nào đó"}], "correct": 1, "explanation": {"ja": "「彼」は三人称で、話題の中の男性を指します。", "vi": "\"Kare\" là ngôi thứ ba, chỉ người đàn ông đang được đề cập."}, "difficulty": "medium"},
    {"question": {"ja": "「お疲れ様でした」はどの場面で使いますか？", "vi": "\"Otsukaresama deshita\" dùng trong tình huống nào?"}, "options": [{"ja": "仕事を始める時", "vi": "Khi bắt đầu công việc"}, {"ja": "食事の前", "vi": "Trước bữa ăn"}, {"ja": "仕事や作業が終わった後、同僚へ", "vi": "Sau khi kết thúc công việc, với đồng nghiệp"}, {"ja": "初対面の挨拶", "vi": "Lời chào khi gặp lần đầu"}], "correct": 2, "explanation": {"ja": "「お疲れ様でした」は仕事終わりに同僚へ言う労いの言葉です。", "vi": "\"Otsukaresama deshita\" là lời nói thăm hỏi với đồng nghiệp sau khi kết thúc công việc."}, "difficulty": "hard"}
  ]',
  12,
  20
);

-- Unit 4: 食べ物・飲み物 (Lessons 13-16)

-- Lesson 13: ごはん・パン・たまご・にく
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 4 Lesson 13: 食べ物①", "vi": "Unit 4 Bài 13: Thức ăn ①"}',
  '{
    "type": "vocabulary",
    "unit": 4,
    "lesson_number": 13,
    "intro": {
      "ja": "食事介助で使う食べ物の名前を学びましょう。",
      "vi": "Học tên các loại thức ăn dùng trong hỗ trợ bữa ăn."
    },
    "words": [
      {"word": "ごはん", "reading": "ごはん", "kanji": "ご飯", "meaning": {"vi": "Cơm / Bữa ăn", "ja": "米の食事・食事全般"}, "examples": [{"ja": "今日のごはんはいかがでしたか？", "vi": "Bữa ăn hôm nay thế nào?"}], "care_example": {"ja": "「ごはんをよく噛んで召し上がってください。」", "vi": "\"Gohan wo yoku kande meshiagatte kudasai.\""}},
      {"word": "パン", "reading": "パン", "kanji": null, "meaning": {"vi": "Bánh mì", "ja": "小麦粉から作るパン"}, "examples": [{"ja": "朝食はパンとスープです。", "vi": "Bữa sáng là bánh mì và súp."}], "care_example": {"ja": "「パンは食べやすいよう小さく切ってお出しします。」", "vi": "\"Pan wa tabeyasui you ni chiisaku kitte odashi shimasu.\""}},
      {"word": "たまご", "reading": "たまご", "kanji": "卵", "meaning": {"vi": "Trứng", "ja": "鶏卵"}, "examples": [{"ja": "卵アレルギーはありますか？", "vi": "Bạn có dị ứng trứng không?"}], "care_example": {"ja": "「○○さんは卵アレルギーがあるので、確認が必要です。」", "vi": "\"○○ san wa tamago arerugii ga aru node, kakunin ga hitsuyou desu.\""}},
      {"word": "にく", "reading": "にく", "kanji": "肉", "meaning": {"vi": "Thịt", "ja": "食用の肉"}, "examples": [{"ja": "今日のランチは肉じゃがです。", "vi": "Bữa trưa hôm nay là nikujaga."}], "care_example": {"ja": "「お肉は柔らかく調理してあります。」", "vi": "\"Oniku wa yawarakaku chourishite arimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "食事介助", "vi": "Hỗ trợ bữa ăn"},
      "scene": {"ja": "食事介助の場面", "vi": "Cảnh hỗ trợ bữa ăn"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、今日のごはんはいかがですか？", "vi": "○○ san, bữa ăn hôm nay thế nào?"},
        {"speaker": "user", "ja": "おいしいですよ。お肉が柔らかくて食べやすい。", "vi": "Ngon lắm. Thịt mềm và dễ ăn."},
        {"speaker": "staff", "ja": "よかったです。パンとごはん、どちらがお好きですか？", "vi": "Tốt quá. Bánh mì và cơm, bạn thích loại nào?"},
        {"speaker": "user", "ja": "やっぱりごはんが好きですね。", "vi": "Vẫn thích cơm hơn."}
      ],
      "key_phrases": [
        {"ja": "食べやすい", "vi": "Dễ ăn", "note_vi": "Tính từ quan trọng trong hỗ trợ bữa ăn"},
        {"ja": "どちらがお好きですか？", "vi": "Bạn thích loại nào hơn?", "note_vi": "Câu hỏi để biết sở thích"}
      ],
      "cultural_note": {
        "ja": "食事介助では食べやすさと安全性が最重要です。アレルギー確認も忘れずに。",
        "vi": "Trong hỗ trợ bữa ăn, dễ ăn và an toàn là quan trọng nhất. Đừng quên kiểm tra dị ứng."
      }
    }
  }',
  '[
    {"question": {"ja": "「ご飯」の読み方は？", "vi": "Cách đọc của \"ご飯\" là gì?"}, "options": [{"ja": "おちゃ", "vi": "Ocha"}, {"ja": "ごはん", "vi": "Gohan"}, {"ja": "みず", "vi": "Mizu"}, {"ja": "たまご", "vi": "Tamago"}], "correct": 1, "explanation": {"ja": "「ご飯」は「ごはん」と読み、ごはんや食事を意味します。", "vi": "\"ご飯\" đọc là \"gohan\", có nghĩa là cơm hoặc bữa ăn."}, "difficulty": "easy"},
    {"question": {"ja": "「卵アレルギー」があった場合の対応は？", "vi": "Khi có \"dị ứng trứng\" thì xử lý thế nào?"}, "options": [{"ja": "そのまま提供する", "vi": "Phục vụ bình thường"}, {"ja": "少しなら大丈夫", "vi": "Một chút thì không sao"}, {"ja": "栄養士・看護師に報告し除去食を準備する", "vi": "Báo cáo cho chuyên gia dinh dưỡng/y tá và chuẩn bị thức ăn không có dị ứng"}, {"ja": "本人に確認せず提供する", "vi": "Phục vụ mà không hỏi người dùng"}], "correct": 2, "explanation": {"ja": "アレルギーがある場合は栄養士・看護師に報告し、除去食を準備します。", "vi": "Khi có dị ứng, báo cáo cho chuyên gia dinh dưỡng/y tá và chuẩn bị thức ăn không chứa chất gây dị ứng."}, "difficulty": "medium"},
    {"question": {"ja": "「肉」の読み方は？", "vi": "Cách đọc của \"肉\" là gì?"}, "options": [{"ja": "さかな", "vi": "Sakana"}, {"ja": "やさい", "vi": "Yasai"}, {"ja": "にく", "vi": "Niku"}, {"ja": "くだもの", "vi": "Kudamono"}], "correct": 2, "explanation": {"ja": "「肉」は「にく」と読みます。", "vi": "\"肉\" đọc là \"niku\"."}, "difficulty": "easy"},
    {"question": {"ja": "嚥下困難な利用者へのパンの提供方法は？", "vi": "Cách phục vụ bánh mì cho người khó nuốt?"}, "options": [{"ja": "そのまま大きいまま出す", "vi": "Để nguyên miếng to"}, {"ja": "硬くする", "vi": "Làm cứng hơn"}, {"ja": "小さく切るか、とろみをつける", "vi": "Cắt nhỏ hoặc làm đặc"}, {"ja": "提供しない", "vi": "Không phục vụ"}], "correct": 2, "explanation": {"ja": "嚥下困難な方にはパンを小さく切ったり、とろみをつけて食べやすくします。", "vi": "Với người khó nuốt, cắt bánh mì thành miếng nhỏ hoặc làm đặc để dễ ăn hơn."}, "difficulty": "medium"},
    {"question": {"ja": "食事介助で最も重要なことは？", "vi": "Điều quan trọng nhất trong hỗ trợ bữa ăn?"}, "options": [{"ja": "早く食べさせること", "vi": "Cho ăn nhanh"}, {"ja": "安全性と本人の意思尊重", "vi": "An toàn và tôn trọng ý muốn của người dùng"}, {"ja": "量をたくさん食べさせること", "vi": "Cho ăn nhiều"}, {"ja": "好き嫌いをなくすこと", "vi": "Xóa bỏ thói quen kén ăn"}], "correct": 1, "explanation": {"ja": "食事介助では誤嚥防止などの安全性と、本人の食べたいものを尊重することが重要です。", "vi": "Trong hỗ trợ bữa ăn, an toàn như phòng ngừa sặc và tôn trọng ý muốn của người dùng là quan trọng nhất."}, "difficulty": "hard"}
  ]',
  13,
  20
);

-- Lesson 14: やさい・くだもの・さかな・スープ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 4 Lesson 14: 食べ物②", "vi": "Unit 4 Bài 14: Thức ăn ②"}',
  '{
    "type": "vocabulary",
    "unit": 4,
    "lesson_number": 14,
    "intro": {
      "ja": "野菜・果物・魚・スープなど、毎日の食事で使う言葉を学びましょう。",
      "vi": "Học các từ dùng trong bữa ăn hàng ngày như rau, hoa quả, cá, súp."
    },
    "words": [
      {"word": "やさい", "reading": "やさい", "kanji": "野菜", "meaning": {"vi": "Rau củ", "ja": "野菜類"}, "examples": [{"ja": "野菜をたくさん食べましょう。", "vi": "Hãy ăn nhiều rau."}], "care_example": {"ja": "「野菜は柔らかく煮てあります。」", "vi": "\"Yasai wa yawarakaku nite arimasu.\""}},
      {"word": "くだもの", "reading": "くだもの", "kanji": "果物", "meaning": {"vi": "Hoa quả", "ja": "果実類"}, "examples": [{"ja": "果物のデザートはいかがですか？", "vi": "Món tráng miệng hoa quả thế nào?"}], "care_example": {"ja": "「果物は食べやすいよう一口大に切ってあります。」", "vi": "\"Kudamono wa tabeyasui you ni hitokuchi daini kitte arimasu.\""}},
      {"word": "さかな", "reading": "さかな", "kanji": "魚", "meaning": {"vi": "Cá", "ja": "魚介類"}, "examples": [{"ja": "今日の夕食は魚の煮付けです。", "vi": "Bữa tối hôm nay là cá kho."}], "care_example": {"ja": "「魚の骨を取り除いてからお出しします。」", "vi": "\"Sakana no hone wo torinozoite kara odashi shimasu.\""}},
      {"word": "スープ", "reading": "スープ", "kanji": null, "meaning": {"vi": "Súp", "ja": "液体の汁物"}, "examples": [{"ja": "温かいスープをどうぞ。", "vi": "Mời bạn uống súp nóng."}], "care_example": {"ja": "「スープは飲みやすいよう少し冷ましてあります。」", "vi": "\"Suupu wa nomiyasui you ni sukoshi samashite arimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "食事の好みを確認", "vi": "Xác nhận sở thích ăn uống"},
      "scene": {"ja": "利用者の食事の好みを確認する場面", "vi": "Xác nhận sở thích ăn uống của người được chăm sóc"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、野菜と魚はお好きですか？", "vi": "○○ san, bạn có thích rau và cá không?"},
        {"speaker": "user", "ja": "魚は好きですよ。でも野菜は苦手です。", "vi": "Tôi thích cá. Nhưng rau thì không."},
        {"speaker": "staff", "ja": "わかりました。果物のデザートはいかがですか？", "vi": "Tôi hiểu rồi. Bạn có muốn món tráng miệng hoa quả không?"},
        {"speaker": "user", "ja": "果物は大好きです！", "vi": "Tôi rất thích hoa quả!"}
      ],
      "key_phrases": [
        {"ja": "〜は苦手です", "vi": "Tôi không giỏi〜 / Tôi không thích〜", "note_vi": "Cách nói nhẹ nhàng khi không thích"},
        {"ja": "〜は大好きです", "vi": "Tôi rất thích〜", "note_vi": "Cách diễn đạt thích mạnh"}
      ],
      "cultural_note": {
        "ja": "利用者の食の好みを把握することは、食事介助の質を高めます。「嫌い」より「苦手」の方が柔らかい表現です。",
        "vi": "Nắm bắt sở thích ăn uống của người được chăm sóc nâng cao chất lượng hỗ trợ bữa ăn. \"Nigate\" (không giỏi/không thích) nhẹ nhàng hơn \"kirai\" (ghét)."
      }
    }
  }',
  '[
    {"question": {"ja": "「野菜」の読み方は？", "vi": "Cách đọc của \"野菜\" là gì?"}, "options": [{"ja": "くだもの", "vi": "Kudamono"}, {"ja": "さかな", "vi": "Sakana"}, {"ja": "やさい", "vi": "Yasai"}, {"ja": "にく", "vi": "Niku"}], "correct": 2, "explanation": {"ja": "「野菜」は「やさい」と読みます。", "vi": "\"野菜\" đọc là \"yasai\"."}, "difficulty": "easy"},
    {"question": {"ja": "嚥下困難な利用者への魚の提供方法は？", "vi": "Cách phục vụ cá cho người khó nuốt?"}, "options": [{"ja": "骨ごと出す", "vi": "Để nguyên xương"}, {"ja": "生で出す", "vi": "Phục vụ sống"}, {"ja": "骨を丁寧に取り除く", "vi": "Lấy xương cẩn thận"}, {"ja": "硬く調理する", "vi": "Nấu cứng"}], "correct": 2, "explanation": {"ja": "嚥下困難な方には魚の骨を丁寧に取り除いてから提供します。", "vi": "Với người khó nuốt, lấy xương cá cẩn thận trước khi phục vụ."}, "difficulty": "medium"},
    {"question": {"ja": "「果物」の読み方は？", "vi": "Cách đọc của \"果物\" là gì?"}, "options": [{"ja": "やさい", "vi": "Yasai"}, {"ja": "くだもの", "vi": "Kudamono"}, {"ja": "ごはん", "vi": "Gohan"}, {"ja": "たまご", "vi": "Tamago"}], "correct": 1, "explanation": {"ja": "「果物」は「くだもの」と読みます。", "vi": "\"果物\" đọc là \"kudamono\"."}, "difficulty": "easy"},
    {"question": {"ja": "スープを高齢者に提供する際の注意点は？", "vi": "Điều cần chú ý khi phục vụ súp cho người cao tuổi?"}, "options": [{"ja": "できるだけ熱いまま出す", "vi": "Phục vụ nóng nhất có thể"}, {"ja": "冷たくして出す", "vi": "Phục vụ lạnh"}, {"ja": "適切な温度に冷ましてから出す", "vi": "Để nguội đến nhiệt độ phù hợp rồi phục vụ"}, {"ja": "量をたくさんにする", "vi": "Cho nhiều hơn"}], "correct": 2, "explanation": {"ja": "高齢者は火傷のリスクがあるため、適切な温度に冷ましてから提供します。", "vi": "Người cao tuổi có nguy cơ bị bỏng nên để nguội đến nhiệt độ phù hợp trước khi phục vụ."}, "difficulty": "medium"},
    {"question": {"ja": "利用者が「野菜が苦手」と言った場合の適切な対応は？", "vi": "Khi người dùng nói \"không thích rau\", cách xử lý phù hợp?"}, "options": [{"ja": "無理に全部食べさせる", "vi": "Ép ăn hết"}, {"ja": "記録して栄養士と相談し、代替食を検討する", "vi": "Ghi lại và bàn với chuyên gia dinh dưỡng để cân nhắc thức ăn thay thế"}, {"ja": "野菜を出さない", "vi": "Không phục vụ rau nữa"}, {"ja": "無視する", "vi": "Bỏ qua"}], "correct": 1, "explanation": {"ja": "本人の好みを尊重しながら、栄養バランスを考えた対応が必要です。", "vi": "Cần xử lý trong khi tôn trọng sở thích của người dùng và cân nhắc cân bằng dinh dưỡng."}, "difficulty": "hard"}
  ]',
  14,
  20
);

-- Lesson 15: みず・おちゃ・コーヒー・ジュース
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 4 Lesson 15: 飲み物", "vi": "Unit 4 Bài 15: Đồ uống"}',
  '{
    "type": "vocabulary",
    "unit": 4,
    "lesson_number": 15,
    "intro": {
      "ja": "水分補給に使う飲み物の名前を学びましょう。脱水予防に大切です！",
      "vi": "Học tên các loại đồ uống dùng để bổ sung nước. Quan trọng để phòng ngừa mất nước!"
    },
    "words": [
      {"word": "みず", "reading": "みず", "kanji": "水", "meaning": {"vi": "Nước (lọc)", "ja": "水"}, "examples": [{"ja": "お水を飲んでください。", "vi": "Hãy uống nước."}], "care_example": {"ja": "「こまめにお水を飲んでくださいね。脱水予防のために。」", "vi": "\"Komame ni omizu wo nonde kudasai ne. Dassui yobou no tame ni.\""}},
      {"word": "おちゃ", "reading": "おちゃ", "kanji": "お茶", "meaning": {"vi": "Trà (Nhật)", "ja": "日本茶"}, "examples": [{"ja": "お茶はいかがですか？", "vi": "Bạn có muốn uống trà không?"}], "care_example": {"ja": "「お茶の時間です。温かいお茶をお持ちしました。」", "vi": "\"Ocha no jikan desu. Atatakai ocha wo omochi shimashita.\""}},
      {"word": "コーヒー", "reading": "コーヒー", "kanji": null, "meaning": {"vi": "Cà phê", "ja": "コーヒー飲料"}, "examples": [{"ja": "コーヒーは飲めますか？", "vi": "Bạn có uống được cà phê không?"}], "care_example": {"ja": "「コーヒーは薬との相互作用があることがあります。医師に確認しましょう。」", "vi": "\"Koohii wa kusuri to no sougo sayou ga aru koto ga arimasu. Ishi ni kakunin shimashou.\""}},
      {"word": "ジュース", "reading": "ジュース", "kanji": null, "meaning": {"vi": "Nước ép / Nước trái cây", "ja": "果汁飲料"}, "examples": [{"ja": "好きなジュースはありますか？", "vi": "Bạn có loại nước ép yêu thích không?"}], "care_example": {"ja": "「ジュースは糖分が多いので、糖尿病の方は注意が必要です。」", "vi": "\"Juusu wa toubin ga ooi node, tounyoubyou no kata wa chuui ga hitsuyou desu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "水分補給の声かけ", "vi": "Nhắc nhở bổ sung nước"},
      "scene": {"ja": "午後の水分補給の声かけ場面", "vi": "Nhắc nhở bổ sung nước buổi chiều"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、水分補給の時間ですよ。何を飲みますか？", "vi": "○○ san, đến giờ bổ sung nước rồi. Bạn muốn uống gì?"},
        {"speaker": "user", "ja": "お茶をください。", "vi": "Cho tôi trà."},
        {"speaker": "staff", "ja": "温かいお茶と冷たいお茶、どちらがよいですか？", "vi": "Trà nóng hay trà lạnh, bạn muốn loại nào?"},
        {"speaker": "user", "ja": "温かいお茶がいいです。", "vi": "Tôi muốn trà nóng."}
      ],
      "key_phrases": [
        {"ja": "水分補給の時間", "vi": "Giờ bổ sung nước", "note_vi": "Cụm từ quan trọng trong chăm sóc hàng ngày"},
        {"ja": "温かい〜と冷たい〜", "vi": "〜nóng và〜lạnh", "note_vi": "Cách hỏi lựa chọn nhiệt độ"}
      ],
      "cultural_note": {
        "ja": "高齢者は脱水になりやすく、喉の渇きも感じにくくなります。定期的な水分補給の声かけが重要です。",
        "vi": "Người cao tuổi dễ bị mất nước và cảm giác khát cũng kém hơn. Việc nhắc nhở bổ sung nước thường xuyên là rất quan trọng."
      }
    }
  }',
  '[
    {"question": {"ja": "「お茶」の読み方は？", "vi": "Cách đọc của \"お茶\" là gì?"}, "options": [{"ja": "みず", "vi": "Mizu"}, {"ja": "おちゃ", "vi": "Ocha"}, {"ja": "ジュース", "vi": "Juusu"}, {"ja": "コーヒー", "vi": "Koohii"}], "correct": 1, "explanation": {"ja": "「お茶」は「おちゃ」と読みます。", "vi": "\"お茶\" đọc là \"ocha\"."}, "difficulty": "easy"},
    {"question": {"ja": "高齢者の水分補給が重要な理由は？", "vi": "Lý do bổ sung nước quan trọng với người cao tuổi?"}, "options": [{"ja": "若者より飲みたがるから", "vi": "Vì muốn uống nhiều hơn người trẻ"}, {"ja": "喉の渇きを感じにくく脱水になりやすいから", "vi": "Vì cảm giác khát kém hơn và dễ bị mất nước"}, {"ja": "水が好きだから", "vi": "Vì thích nước"}, {"ja": "薬の副作用で水が必要だから", "vi": "Vì tác dụng phụ của thuốc cần nước"}], "correct": 1, "explanation": {"ja": "高齢者は加齢により喉の渇きを感じにくく、脱水リスクが高まります。", "vi": "Người cao tuổi do tuổi tác cảm giác khát kém hơn, nguy cơ mất nước tăng cao."}, "difficulty": "medium"},
    {"question": {"ja": "糖尿病の利用者へのジュースの提供について正しいのは？", "vi": "Điều đúng về việc phục vụ nước ép cho người bệnh tiểu đường?"}, "options": [{"ja": "好きなだけ飲んでもらう", "vi": "Cho uống thoải mái"}, {"ja": "一切提供しない", "vi": "Không phục vụ gì cả"}, {"ja": "糖分が多いため、医師・栄養士の指示に従う", "vi": "Vì nhiều đường, tuân theo hướng dẫn của bác sĩ/chuyên gia dinh dưỡng"}, {"ja": "水で薄めればよい", "vi": "Pha loãng với nước là được"}], "correct": 2, "explanation": {"ja": "糖尿病の方はジュースの糖分に注意が必要です。医師・栄養士の指示に従います。", "vi": "Người bệnh tiểu đường cần chú ý đường trong nước ép. Tuân theo hướng dẫn của bác sĩ/chuyên gia dinh dưỡng."}, "difficulty": "medium"},
    {"question": {"ja": "「水（みず）」の読み方は？", "vi": "Cách đọc của \"水（みず）\" là gì?"}, "options": [{"ja": "うみ", "vi": "Umi"}, {"ja": "みず", "vi": "Mizu"}, {"ja": "かわ", "vi": "Kawa"}, {"ja": "あめ", "vi": "Ame"}], "correct": 1, "explanation": {"ja": "「水」は「みず」と読みます。", "vi": "\"水\" đọc là \"mizu\"."}, "difficulty": "easy"},
    {"question": {"ja": "利用者が水分を摂りたがらない時の適切な対応は？", "vi": "Khi người dùng không muốn uống nước, cách xử lý phù hợp?"}, "options": [{"ja": "強制的に飲ませる", "vi": "Ép uống"}, {"ja": "諦める", "vi": "Bỏ qua"}, {"ja": "好みの飲み物を確認し、少量ずつ勧める", "vi": "Xác nhận đồ uống yêu thích và mời từng chút một"}, {"ja": "点滴にする", "vi": "Truyền dịch"}], "correct": 2, "explanation": {"ja": "本人の好みに合わせた飲み物を用意し、少量ずつ定期的に勧めます。", "vi": "Chuẩn bị đồ uống theo sở thích và mời từng chút một thường xuyên."}, "difficulty": "hard"}
  ]',
  15,
  20
);

-- Lesson 16: すき/きらい・おいしい・まずい・からい
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 4 Lesson 16: 食の好み・味の表現", "vi": "Unit 4 Bài 16: Sở thích ăn uống và cách diễn đạt vị"}',
  '{
    "type": "vocabulary",
    "unit": 4,
    "lesson_number": 16,
    "intro": {
      "ja": "食べ物の好みや味を表す言葉を学びましょう。利用者さんの食の好みを理解するために大切です。",
      "vi": "Học từ diễn đạt sở thích ăn uống và hương vị. Quan trọng để hiểu sở thích ăn uống của người được chăm sóc."
    },
    "words": [
      {"word": "すき / きらい", "reading": "すき / きらい", "kanji": "好き / 嫌い", "meaning": {"vi": "Thích / Ghét", "ja": "好む・好まない"}, "examples": [{"ja": "甘いものが好きですか？", "vi": "Bạn có thích đồ ngọt không?"}], "care_example": {"ja": "「お好き嫌いはありますか？なんでも教えてください。」", "vi": "\"Osuki kirai wa arimasu ka? Nandemo oshiete kudasai.\""}},
      {"word": "おいしい", "reading": "おいしい", "kanji": "美味しい", "meaning": {"vi": "Ngon", "ja": "味が良い"}, "examples": [{"ja": "今日のごはんはおいしいですね。", "vi": "Bữa ăn hôm nay ngon nhỉ."}], "care_example": {"ja": "「おいしいと言ってくださると、調理師さんも喜びます。」", "vi": "\"Oishii to itte kudasaru to, chourishisan mo yorokobimasu.\""}},
      {"word": "まずい", "reading": "まずい", "kanji": "不味い", "meaning": {"vi": "Không ngon / Dở", "ja": "味が悪い"}, "examples": [{"ja": "お口に合わなかったですか？", "vi": "Không hợp khẩu vị bạn sao?"}], "care_example": {"ja": "（注意）「まずい」と言われたら、「お口に合いませんでしたか？」と優しく確認します。", "vi": "(Chú ý) Khi được nói \"mazui\", hỏi nhẹ nhàng \"Ouchi ni aimasen deshita ka?\""}},
      {"word": "からい", "reading": "からい", "kanji": "辛い", "meaning": {"vi": "Cay", "ja": "辛味がある"}, "examples": [{"ja": "辛いものは大丈夫ですか？", "vi": "Bạn có ăn được đồ cay không?"}], "care_example": {"ja": "「辛いものは胃に負担になることがあります。担当医に確認しましょう。」", "vi": "\"Karai mono wa i ni futan ni naru koto ga arimasu. Tantouisha ni kakunin shimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "食の好みの把握", "vi": "Nắm bắt sở thích ăn uống"},
      "scene": {"ja": "新担当が利用者の食の好みを確認する場面", "vi": "Người phụ trách mới xác nhận sở thích ăn uống của người được chăm sóc"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、好き嫌いはありますか？", "vi": "○○ san, bạn có thứ gì thích hay không thích không?"},
        {"speaker": "user", "ja": "辛いものは苦手です。でも甘いものは大好きです。", "vi": "Tôi không thích đồ cay. Nhưng rất thích đồ ngọt."},
        {"speaker": "staff", "ja": "わかりました。甘いデザートが出た日は教えますね。", "vi": "Tôi hiểu rồi. Hôm nào có món tráng miệng ngọt tôi sẽ báo nhé."},
        {"speaker": "user", "ja": "ありがとう。それは楽しみです！", "vi": "Cảm ơn. Tôi trông mong đấy!"}
      ],
      "key_phrases": [
        {"ja": "〜が苦手です", "vi": "Tôi không giỏi〜 / không thích〜", "note_vi": "Cách nói nhẹ nhàng khi không thích"},
        {"ja": "〜は大好きです", "vi": "Rất thích〜", "note_vi": "「好き」より強い表現"}
      ],
      "cultural_note": {
        "ja": "利用者の食の好みを記録に残すことで、食事の質が上がります。「嫌い」より「苦手」の方が柔らかい表現です。",
        "vi": "Ghi lại sở thích ăn uống của người được chăm sóc giúp nâng cao chất lượng bữa ăn. \"Nigate\" (không thích) nhẹ nhàng hơn \"kirai\" (ghét)."
      }
    }
  }',
  '[
    {"question": {"ja": "「おいしい」の意味は？", "vi": "Nghĩa của \"おいしい\" là gì?"}, "options": [{"ja": "まずい", "vi": "Không ngon"}, {"ja": "からい", "vi": "Cay"}, {"ja": "おいしい", "vi": "Ngon"}, {"ja": "あまい", "vi": "Ngọt"}], "correct": 2, "explanation": {"ja": "「おいしい」は味が良いことを表します。", "vi": "\"Oishii\" có nghĩa là ngon."}, "difficulty": "easy"},
    {"question": {"ja": "「辛い（からい）」の意味は？", "vi": "Nghĩa của \"辛い（からい）\" là gì?"}, "options": [{"ja": "あまい", "vi": "Ngọt"}, {"ja": "しょっぱい", "vi": "Mặn"}, {"ja": "すっぱい", "vi": "Chua"}, {"ja": "からい", "vi": "Cay"}], "correct": 3, "explanation": {"ja": "「辛い（からい）」は辛味があることを意味します。", "vi": "\"Karai\" có nghĩa là cay."}, "difficulty": "easy"},
    {"question": {"ja": "利用者が「まずい」と言った時の適切な対応は？", "vi": "Khi người dùng nói \"mazui\", cách xử lý phù hợp?"}, "options": [{"ja": "「そんなことありません」と否定する", "vi": "Phủ nhận bằng \"Không phải vậy\""}, {"ja": "「お口に合いませんでしたか？」と優しく確認する", "vi": "Hỏi nhẹ nhàng \"Ouchi ni aimasen deshita ka?\""}, {"ja": "無視する", "vi": "Bỏ qua"}, {"ja": "謝罪して食事を取り上げる", "vi": "Xin lỗi và thu dọn thức ăn"}], "correct": 1, "explanation": {"ja": "「まずい」と言われたら、「お口に合いませんでしたか？」と優しく確認し、好みを把握します。", "vi": "Khi được nói \"mazui\", hỏi nhẹ nhàng \"Ouchi ni aimasen deshita ka?\" và nắm bắt sở thích."}, "difficulty": "medium"},
    {"question": {"ja": "「好き嫌い」を確認する目的は？", "vi": "Mục đích xác nhận \"sở thích và không thích\" là gì?"}, "options": [{"ja": "わがままを把握するため", "vi": "Để nắm bắt sự đòi hỏi"}, {"ja": "食事の質を高め、個別ケアにつなげるため", "vi": "Để nâng cao chất lượng bữa ăn và cá nhân hóa chăm sóc"}, {"ja": "嫌いなものを無理に食べさせるため", "vi": "Để ép ăn thứ không thích"}, {"ja": "記録の義務があるため", "vi": "Vì có nghĩa vụ ghi chép"}], "correct": 1, "explanation": {"ja": "食の好みを把握することで個別ケアの質が向上します。", "vi": "Nắm bắt sở thích ăn uống giúp nâng cao chất lượng chăm sóc cá nhân."}, "difficulty": "medium"},
    {"question": {"ja": "辛いものを好む利用者への注意点は？", "vi": "Điều cần chú ý với người được chăm sóc thích ăn cay?"}, "options": [{"ja": "好きなだけ食べさせる", "vi": "Cho ăn thoải mái"}, {"ja": "一切提供しない", "vi": "Không phục vụ gì cả"}, {"ja": "胃への負担を考え担当医に確認する", "vi": "Cân nhắc gánh nặng cho dạ dày và xác nhận với bác sĩ phụ trách"}, {"ja": "辛さを倍にする", "vi": "Tăng gấp đôi độ cay"}], "correct": 2, "explanation": {"ja": "辛いものは胃腸に負担がかかる場合があります。担当医の指示を確認します。", "vi": "Đồ cay có thể gây gánh nặng cho dạ dày. Xác nhận hướng dẫn của bác sĩ phụ trách."}, "difficulty": "hard"}
  ]',
  16,
  20
);

-- Unit 5: 場所・建物 (Lessons 17-20)

-- Lesson 17: がっこう・びょういん・えき・スーパー
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 5 Lesson 17: 場所①（公共施設）", "vi": "Unit 5 Bài 17: Địa điểm ① (Cơ sở công cộng)"}',
  '{
    "type": "vocabulary",
    "unit": 5,
    "lesson_number": 17,
    "intro": {
      "ja": "よく使う場所の名前を学びましょう。外出支援や送迎の場面で役立ちます。",
      "vi": "Học tên các địa điểm thường dùng. Hữu ích trong hỗ trợ ngoại xuất và đưa đón."
    },
    "words": [
      {"word": "がっこう", "reading": "がっこう", "kanji": "学校", "meaning": {"vi": "Trường học", "ja": "教育機関"}, "examples": [{"ja": "介護学校で日本語を勉強しています。", "vi": "Tôi đang học tiếng Nhật ở trường chăm sóc."}], "care_example": {"ja": "「介護の学校に通いながら、ここで実習しています。」", "vi": "\"Kaigo no gakkou ni kayoinagara, koko de jisshuu shite imasu.\""}},
      {"word": "びょういん", "reading": "びょういん", "kanji": "病院", "meaning": {"vi": "Bệnh viện", "ja": "医療機関"}, "examples": [{"ja": "明日、病院の受診があります。", "vi": "Ngày mai có lịch khám bệnh viện."}], "care_example": {"ja": "「明日は病院の外来受診があります。送迎の準備をします。」", "vi": "\"Ashita wa byouin no gairai jusshin ga arimasu. Sougei no junbi wo shimasu.\""}},
      {"word": "えき", "reading": "えき", "kanji": "駅", "meaning": {"vi": "Ga tàu", "ja": "電車の駅"}, "examples": [{"ja": "駅まで車で10分です。", "vi": "10 phút đi xe đến ga."}], "care_example": {"ja": "「ご家族が駅からタクシーで来られるそうです。」", "vi": "\"Gokazoku ga eki kara takushii de korareru sou desu.\""}},
      {"word": "スーパー", "reading": "スーパー", "kanji": null, "meaning": {"vi": "Siêu thị", "ja": "スーパーマーケット"}, "examples": [{"ja": "買い物外出でスーパーに行きます。", "vi": "Đi mua sắm ngoại xuất đến siêu thị."}], "care_example": {"ja": "「買い物外出のご希望があります。近くのスーパーへ一緒に行きましょう。」", "vi": "\"Kaimono gaishutsu no gokibou ga arimasu. Chikaku no suupaa e issho ni ikimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "外出支援の準備", "vi": "Chuẩn bị hỗ trợ ngoại xuất"},
      "scene": {"ja": "病院受診のための外出支援の場面", "vi": "Cảnh hỗ trợ ngoại xuất để khám bệnh viện"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、明日は病院ですよ。準備はよいですか？", "vi": "○○ san, ngày mai đi bệnh viện đấy. Bạn đã chuẩn bị chưa?"},
        {"speaker": "user", "ja": "あ、そうですか。何時に出発ですか？", "vi": "À, vậy à. Mấy giờ xuất phát?"},
        {"speaker": "staff", "ja": "十時に出発です。九時半に準備を始めましょう。", "vi": "10 giờ xuất phát. Hãy bắt đầu chuẩn bị lúc 9 rưỡi nhé."},
        {"speaker": "user", "ja": "わかりました。よろしくお願いします。", "vi": "Tôi hiểu rồi. Nhờ bạn nhé."}
      ],
      "key_phrases": [
        {"ja": "〜時に出発です", "vi": "Xuất phát lúc〜 giờ", "note_vi": "Thông báo thời gian xuất phát"},
        {"ja": "準備を始めましょう", "vi": "Hãy bắt đầu chuẩn bị", "note_vi": "Cách mời chuẩn bị nhẹ nhàng"}
      ],
      "cultural_note": {
        "ja": "外出支援では事前確認（時間・行き先・持ち物）が重要です。利用者の意思を尊重した支援を心がけましょう。",
        "vi": "Trong hỗ trợ ngoại xuất, xác nhận trước (thời gian, điểm đến, đồ đạc) là quan trọng. Hãy luôn tôn trọng ý muốn của người được chăm sóc."
      }
    }
  }',
  '[
    {"question": {"ja": "「病院」の読み方は？", "vi": "Cách đọc của \"病院\" là gì?"}, "options": [{"ja": "がっこう", "vi": "Gakkou"}, {"ja": "えき", "vi": "Eki"}, {"ja": "びょういん", "vi": "Byouin"}, {"ja": "スーパー", "vi": "Suupaa"}], "correct": 2, "explanation": {"ja": "「病院」は「びょういん」と読みます。", "vi": "\"病院\" đọc là \"byouin\"."}, "difficulty": "easy"},
    {"question": {"ja": "外出支援で病院受診の際に事前確認すべきことは？", "vi": "Điều cần xác nhận trước khi hỗ trợ ngoại xuất khám bệnh viện?"}, "options": [{"ja": "天気だけ", "vi": "Chỉ thời tiết"}, {"ja": "時間・行き先・持ち物等を確認する", "vi": "Xác nhận thời gian, điểm đến, đồ đạc, v.v."}, {"ja": "何も確認しない", "vi": "Không xác nhận gì"}, {"ja": "食事だけ確認", "vi": "Chỉ xác nhận bữa ăn"}], "correct": 1, "explanation": {"ja": "外出支援では時間・行き先・持ち物・体調などを事前に確認します。", "vi": "Trong hỗ trợ ngoại xuất, xác nhận trước thời gian, điểm đến, đồ đạc, tình trạng sức khỏe, v.v."}, "difficulty": "medium"},
    {"question": {"ja": "「駅」の読み方は？", "vi": "Cách đọc của \"駅\" là gì?"}, "options": [{"ja": "みち", "vi": "Michi"}, {"ja": "えき", "vi": "Eki"}, {"ja": "こうえん", "vi": "Kouen"}, {"ja": "うち", "vi": "Uchi"}], "correct": 1, "explanation": {"ja": "「駅」は「えき」と読み、電車が止まる場所です。", "vi": "\"駅\" đọc là \"eki\", là nơi tàu điện dừng."}, "difficulty": "easy"},
    {"question": {"ja": "「スーパー」とは何ですか？", "vi": "\"スーパー\" là gì?"}, "options": [{"ja": "病院", "vi": "Bệnh viện"}, {"ja": "学校", "vi": "Trường học"}, {"ja": "スーパーマーケット（食料品店）", "vi": "Siêu thị (cửa hàng thực phẩm)"}, {"ja": "駅", "vi": "Ga tàu"}], "correct": 2, "explanation": {"ja": "「スーパー」はスーパーマーケットの略で、食料品・日用品を売る店です。", "vi": "\"Suupaa\" là viết tắt của supermarket, là cửa hàng bán thực phẩm và đồ dùng hàng ngày."}, "difficulty": "medium"},
    {"question": {"ja": "利用者が「スーパーに行きたい」と希望した場合の対応は？", "vi": "Khi người dùng muốn \"đi siêu thị\", cách xử lý phù hợp?"}, "options": [{"ja": "断る", "vi": "Từ chối"}, {"ja": "一人で行かせる", "vi": "Cho đi một mình"}, {"ja": "意思を尊重し、外出支援の計画を立てる", "vi": "Tôn trọng ý muốn và lập kế hoạch hỗ trợ ngoại xuất"}, {"ja": "家族に任せる", "vi": "Nhờ gia đình"}], "correct": 2, "explanation": {"ja": "利用者の意思を尊重し、安全な外出支援ができるよう計画を立てます。", "vi": "Tôn trọng ý muốn của người dùng và lập kế hoạch hỗ trợ ngoại xuất an toàn."}, "difficulty": "hard"}
  ]',
  17,
  20
);

-- Lesson 18: ゆうびんきょく・ぎんこう・としょかん・レストラン
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 5 Lesson 18: 場所②（公共施設②）", "vi": "Unit 5 Bài 18: Địa điểm ② (Cơ sở công cộng ②)"}',
  '{
    "type": "vocabulary",
    "unit": 5,
    "lesson_number": 18,
    "intro": {
      "ja": "郵便局・銀行など、生活に必要な施設を学びましょう。",
      "vi": "Học tên các cơ sở cần thiết trong cuộc sống như bưu điện, ngân hàng."
    },
    "words": [
      {"word": "ゆうびんきょく", "reading": "ゆうびんきょく", "kanji": "郵便局", "meaning": {"vi": "Bưu điện", "ja": "郵便物を扱う施設"}, "examples": [{"ja": "郵便局で荷物を送ってほしい。", "vi": "Tôi muốn gửi hàng ở bưu điện."}], "care_example": {"ja": "「郵便局への外出支援を計画しました。振込みの手続きがあるそうです。」", "vi": "\"Yuubinkyoku he no gaishutsu shien wo keikaku shimashita. Furikomi no tetsuzuki ga aru sou desu.\""}},
      {"word": "ぎんこう", "reading": "ぎんこう", "kanji": "銀行", "meaning": {"vi": "Ngân hàng", "ja": "金融機関"}, "examples": [{"ja": "銀行で通帳の記帳をしたい。", "vi": "Tôi muốn cập nhật sổ tiết kiệm ở ngân hàng."}], "care_example": {"ja": "「銀行への外出は金銭管理の観点から、必ず家族同伴が望ましいです。」", "vi": "\"Ginkou he no gaishutsu wa kinsen kanri no kanten kara, kanarazu kazoku douhan ga nozomashii desu.\""}},
      {"word": "としょかん", "reading": "としょかん", "kanji": "図書館", "meaning": {"vi": "Thư viện", "ja": "本を借りる施設"}, "examples": [{"ja": "図書館で本を借りたいです。", "vi": "Tôi muốn mượn sách ở thư viện."}], "care_example": {"ja": "「図書館への外出は利用者さんの楽しみの一つです。」", "vi": "\"Toshokan he no gaishutsu wa riyousha san no tanoshimi no hitotsu desu.\""}},
      {"word": "レストラン", "reading": "レストラン", "kanji": null, "meaning": {"vi": "Nhà hàng", "ja": "外食の飲食店"}, "examples": [{"ja": "誕生日にレストランへ行きたいです。", "vi": "Tôi muốn đi nhà hàng vào ngày sinh nhật."}], "care_example": {"ja": "「レストランへの外食外出は、大切な楽しみです。事前に食形態を確認しましょう。」", "vi": "\"Resutoran he no gaishoku gaishutsu wa, taisetsu na tanoshimi desu. Jizen ni shoku keitai wo kakunin shimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "外出希望の確認", "vi": "Xác nhận mong muốn ngoại xuất"},
      "scene": {"ja": "利用者が外出の希望を伝える場面", "vi": "Người được chăm sóc bày tỏ mong muốn ngoại xuất"},
      "lines": [
        {"speaker": "user", "ja": "銀行に行きたいんだけど、連れて行ってもらえますか？", "vi": "Tôi muốn đi ngân hàng, bạn có thể đưa tôi đi không?"},
        {"speaker": "staff", "ja": "わかりました。日程を調整します。ご家族にも連絡した方がよいですか？", "vi": "Tôi hiểu rồi. Tôi sẽ sắp xếp lịch. Có cần liên lạc với gia đình không?"},
        {"speaker": "user", "ja": "そうですね、息子に連絡してください。", "vi": "Nhỉ, hãy liên lạc với con trai tôi."},
        {"speaker": "staff", "ja": "かしこまりました。後ほどご連絡します。", "vi": "Tôi hiểu rồi. Tôi sẽ liên lạc sau."}
      ],
      "key_phrases": [
        {"ja": "〜に行きたいんだけど", "vi": "Tôi muốn đi〜", "note_vi": "Cách bày tỏ mong muốn nhẹ nhàng"},
        {"ja": "かしこまりました", "vi": "Tôi hiểu (kính ngữ cao)", "note_vi": "Cách xác nhận lịch sự cao hơn「わかりました」"}
      ],
      "cultural_note": {
        "ja": "銀行などへの外出は金銭管理が関係するため、家族への連絡と同行が推奨されます。利用者のプライバシーも尊重しましょう。",
        "vi": "Ngoại xuất đến ngân hàng liên quan đến quản lý tài chính nên được khuyến nghị liên lạc và đi cùng gia đình. Hãy tôn trọng quyền riêng tư của người được chăm sóc."
      }
    }
  }',
  '[
    {"question": {"ja": "「図書館」の読み方は？", "vi": "Cách đọc của \"図書館\" là gì?"}, "options": [{"ja": "ぎんこう", "vi": "Ginkou"}, {"ja": "としょかん", "vi": "Toshokan"}, {"ja": "ゆうびんきょく", "vi": "Yuubinkyoku"}, {"ja": "レストラン", "vi": "Resutoran"}], "correct": 1, "explanation": {"ja": "「図書館」は「としょかん」と読み、本を借りる施設です。", "vi": "\"図書館\" đọc là \"toshokan\", là nơi mượn sách."}, "difficulty": "easy"},
    {"question": {"ja": "銀行への外出時の注意点は？", "vi": "Điều cần chú ý khi ngoại xuất đến ngân hàng?"}, "options": [{"ja": "一人で行かせる", "vi": "Cho đi một mình"}, {"ja": "金銭管理の観点から家族同伴が望ましい", "vi": "Nên có gia đình đi cùng từ góc độ quản lý tài chính"}, {"ja": "スタッフが代わりにお金を管理する", "vi": "Nhân viên quản lý tiền thay"}, {"ja": "銀行には行かせない", "vi": "Không cho đi ngân hàng"}], "correct": 1, "explanation": {"ja": "銀行外出は金銭管理が関わるため、家族同伴が望ましいです。", "vi": "Vì ngoại xuất ngân hàng liên quan đến quản lý tài chính nên nên có gia đình đi cùng."}, "difficulty": "medium"},
    {"question": {"ja": "「郵便局」の読み方は？", "vi": "Cách đọc của \"郵便局\" là gì?"}, "options": [{"ja": "びょういん", "vi": "Byouin"}, {"ja": "がっこう", "vi": "Gakkou"}, {"ja": "ゆうびんきょく", "vi": "Yuubinkyoku"}, {"ja": "えき", "vi": "Eki"}], "correct": 2, "explanation": {"ja": "「郵便局」は「ゆうびんきょく」と読みます。", "vi": "\"郵便局\" đọc là \"yuubinkyoku\"."}, "difficulty": "easy"},
    {"question": {"ja": "レストランへの外食外出前に確認すべきことは？", "vi": "Điều cần xác nhận trước khi đi ăn nhà hàng ngoại xuất?"}, "options": [{"ja": "何も確認しない", "vi": "Không cần xác nhận gì"}, {"ja": "食事の形態・アレルギー・希望のメニュー", "vi": "Dạng thức ăn, dị ứng, menu mong muốn"}, {"ja": "服装だけ", "vi": "Chỉ trang phục"}, {"ja": "天気予報のみ", "vi": "Chỉ dự báo thời tiết"}], "correct": 1, "explanation": {"ja": "外食外出では食形態（刻み食・ソフト食等）やアレルギー、希望のメニューを事前確認します。", "vi": "Khi đi ăn ngoài, xác nhận trước dạng thức ăn (cắt nhỏ, mềm, v.v.), dị ứng và menu mong muốn."}, "difficulty": "medium"},
    {"question": {"ja": "「かしこまりました」は「わかりました」と比べてどうですか？", "vi": "\"Kashikomarimashita\" so với \"wakarimashita\" thế nào?"}, "options": [{"ja": "同じ意味・同じ丁寧さ", "vi": "Cùng nghĩa, cùng mức lịch sự"}, {"ja": "「かしこまりました」の方が丁寧", "vi": "\"Kashikomarimashita\" lịch sự hơn"}, {"ja": "「わかりました」の方が丁寧", "vi": "\"Wakarimashita\" lịch sự hơn"}, {"ja": "使い方が全く違う", "vi": "Cách dùng hoàn toàn khác nhau"}], "correct": 1, "explanation": {"ja": "「かしこまりました」は「わかりました」より更に丁寧な表現で、接客や格式ある場面で使います。", "vi": "\"Kashikomarimashita\" là cách diễn đạt lịch sự hơn \"wakarimashita\", dùng trong dịch vụ khách hàng và các tình huống trang trọng."}, "difficulty": "hard"}
  ]',
  18,
  20
);

-- Lesson 19: うち/いえ・かいしゃ・こうえん・みち
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 5 Lesson 19: 場所③（身近な場所）", "vi": "Unit 5 Bài 19: Địa điểm ③ (Nơi quen thuộc)"}',
  '{
    "type": "vocabulary",
    "unit": 5,
    "lesson_number": 19,
    "intro": {
      "ja": "家・会社・公園など、日常的な場所を学びましょう。",
      "vi": "Học các địa điểm hàng ngày như nhà, công ty, công viên."
    },
    "words": [
      {"word": "うち / いえ", "reading": "うち / いえ", "kanji": "家", "meaning": {"vi": "Nhà", "ja": "住居・自宅"}, "examples": [{"ja": "家に帰りたいです。", "vi": "Tôi muốn về nhà."}], "care_example": {"ja": "「家に帰りたい」という言葉は、帰宅願望として丁寧に対応が必要です。", "vi": "Lời nói \"Tôi muốn về nhà\" cần được đối ứng cẩn thận như là mong muốn về nhà."}},
      {"word": "かいしゃ", "reading": "かいしゃ", "kanji": "会社", "meaning": {"vi": "Công ty", "ja": "仕事をする会社"}, "examples": [{"ja": "息子は会社に勤めています。", "vi": "Con trai làm việc ở công ty."}], "care_example": {"ja": "「ご家族は会社員で平日は来られません。土曜日に面会の予定です。」", "vi": "\"Gokazoku wa kaishain de heijitsu wa koraremasen. Doyoubi ni menkai no yotei desu.\""}},
      {"word": "こうえん", "reading": "こうえん", "kanji": "公園", "meaning": {"vi": "Công viên", "ja": "公共の公園"}, "examples": [{"ja": "公園を散歩しましょう。", "vi": "Hãy đi dạo ở công viên."}], "care_example": {"ja": "「天気がいいので、公園を散歩しませんか？」", "vi": "\"Tenki ga ii node, kouen wo sanpo shimasen ka?\""}},
      {"word": "みち", "reading": "みち", "kanji": "道", "meaning": {"vi": "Đường / Con đường", "ja": "道路・通り道"}, "examples": [{"ja": "この道をまっすぐ行くと公園があります。", "vi": "Đi thẳng con đường này sẽ có công viên."}], "care_example": {"ja": "「散歩の道は段差がないよう確認しています。」", "vi": "\"Sanpo no michi wa dansa ga nai you ni kakunin shite imasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "帰宅願望への対応", "vi": "Đối ứng với mong muốn về nhà"},
      "scene": {"ja": "認知症の利用者が「家に帰りたい」と言う場面", "vi": "Người bị sa sút trí tuệ nói \"muốn về nhà\""},
      "lines": [
        {"speaker": "user", "ja": "家に帰りたい。娘が待っているから。", "vi": "Tôi muốn về nhà. Vì con gái đang đợi."},
        {"speaker": "staff", "ja": "そうですね。お嬢さんが心配してるんですね。一緒に電話しましょうか？", "vi": "Nhỉ. Con gái bạn đang lo lắng đấy nhỉ. Chúng ta gọi điện cùng nhé?"},
        {"speaker": "user", "ja": "そうね。電話できる？", "vi": "Ừ. Có gọi được không?"},
        {"speaker": "staff", "ja": "もちろんです。電話してから、公園を散歩しませんか？", "vi": "Được chứ. Sau khi gọi điện, chúng ta đi dạo ở công viên nhé?"}
      ],
      "key_phrases": [
        {"ja": "〜が待っているから", "vi": "Vì〜 đang đợi", "note_vi": "Lý do thường gặp khi có mong muốn về nhà"},
        {"ja": "一緒に〜しましょうか？", "vi": "Cùng〜 nhé?", "note_vi": "Cách mời nhẹ nhàng để chuyển hướng sự chú ý"}
      ],
      "cultural_note": {
        "ja": "認知症の方の「家に帰りたい」は、安心できる場所を求めているサインです。否定せず共感し、気持ちを受け止めてから別の活動に誘うバリデーション技法が効果的です。",
        "vi": "\"Muốn về nhà\" của người bị sa sút trí tuệ là dấu hiệu họ đang tìm kiếm nơi cảm thấy an tâm. Không phủ nhận, hãy đồng cảm, tiếp nhận cảm xúc rồi mời hoạt động khác - đây là kỹ thuật Validation hiệu quả."
      }
    }
  }',
  '[
    {"question": {"ja": "「家（いえ）」の読み方は？", "vi": "Cách đọc của \"家（いえ）\" là gì?"}, "options": [{"ja": "みち", "vi": "Michi"}, {"ja": "こうえん", "vi": "Kouen"}, {"ja": "いえ / うち", "vi": "Ie / Uchi"}, {"ja": "かいしゃ", "vi": "Kaisha"}], "correct": 2, "explanation": {"ja": "「家」は「いえ」または「うち」と読みます。", "vi": "\"家\" đọc là \"ie\" hoặc \"uchi\"."}, "difficulty": "easy"},
    {"question": {"ja": "認知症の方が「家に帰りたい」と言った時の適切な対応は？", "vi": "Khi người bị sa sút trí tuệ nói \"muốn về nhà\", cách xử lý phù hợp?"}, "options": [{"ja": "「ここが家です」と否定する", "vi": "Phủ nhận bằng \"Đây là nhà rồi\""}, {"ja": "無視する", "vi": "Bỏ qua"}, {"ja": "共感してから別の活動に誘う（バリデーション）", "vi": "Đồng cảm rồi mời hoạt động khác (Validation)"}, {"ja": "鍵を締めて外に出られないようにする", "vi": "Khóa cửa không cho ra ngoài"}], "correct": 2, "explanation": {"ja": "バリデーション技法：気持ちに共感し、受け止めてから別の活動へ誘います。", "vi": "Kỹ thuật Validation: đồng cảm với cảm xúc, tiếp nhận rồi mời hoạt động khác."}, "difficulty": "medium"},
    {"question": {"ja": "「公園」の読み方は？", "vi": "Cách đọc của \"公園\" là gì?"}, "options": [{"ja": "こうじょう", "vi": "Koujou"}, {"ja": "こうえん", "vi": "Kouen"}, {"ja": "がっこう", "vi": "Gakkou"}, {"ja": "びょういん", "vi": "Byouin"}], "correct": 1, "explanation": {"ja": "「公園」は「こうえん」と読みます。", "vi": "\"公園\" đọc là \"kouen\"."}, "difficulty": "easy"},
    {"question": {"ja": "散歩コースを選ぶ際の安全確認のポイントは？", "vi": "Điểm cần kiểm tra an toàn khi chọn lộ trình đi dạo?"}, "options": [{"ja": "距離が長いこと", "vi": "Đường dài"}, {"ja": "段差や障害物がないこと", "vi": "Không có bậc thang hay vật cản"}, {"ja": "車が多いこと", "vi": "Nhiều xe"}, {"ja": "坂道があること", "vi": "Có dốc"}], "correct": 1, "explanation": {"ja": "散歩コースは段差や障害物がなく安全であることを確認します。", "vi": "Kiểm tra lộ trình đi dạo không có bậc thang hay vật cản và an toàn."}, "difficulty": "medium"},
    {"question": {"ja": "「帰宅願望」への最も不適切な対応は？", "vi": "Cách đối ứng không phù hợp nhất với \"mong muốn về nhà\"?"}, "options": [{"ja": "気持ちに共感する", "vi": "Đồng cảm với cảm xúc"}, {"ja": "家族に電話することを提案する", "vi": "Đề xuất gọi điện cho gia đình"}, {"ja": "「ここが家だから帰れない」と言い張る", "vi": "Cứ nói \"Đây là nhà rồi nên không về được\""}, {"ja": "お茶を飲みながら話を聞く", "vi": "Uống trà và lắng nghe"}], "correct": 2, "explanation": {"ja": "「ここが家だから帰れない」と言い張ることは本人を不安にさせ、症状を悪化させる可能性があります。", "vi": "Cứ nói \"Đây là nhà nên không về được\" sẽ làm người đó lo lắng hơn và có thể làm triệu chứng nặng hơn."}, "difficulty": "hard"}
  ]',
  19,
  20
);

-- Lesson 20: トイレ・ふろ・へや・にわ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 5 Lesson 20: 場所④（施設内の場所）", "vi": "Unit 5 Bài 20: Địa điểm ④ (Nơi trong cơ sở)"}',
  '{
    "type": "vocabulary",
    "unit": 5,
    "lesson_number": 20,
    "intro": {
      "ja": "施設内でよく使う場所の名前を学びましょう。排泄介助や入浴介助に必須です！",
      "vi": "Học tên các nơi thường dùng trong cơ sở. Cần thiết trong hỗ trợ vệ sinh và tắm rửa!"
    },
    "words": [
      {"word": "トイレ", "reading": "トイレ", "kanji": null, "meaning": {"vi": "Nhà vệ sinh / Toilet", "ja": "トイレ・洗面所"}, "examples": [{"ja": "トイレに行きたいですか？", "vi": "Bạn muốn đi vệ sinh không?"}], "care_example": {"ja": "「トイレに行きたい時は、ナースコールを押してください。」", "vi": "\"Toire ni ikitai toki wa, naasukooru wo oshite kudasai.\""}},
      {"word": "ふろ", "reading": "ふろ", "kanji": "風呂", "meaning": {"vi": "Bồn tắm / Phòng tắm", "ja": "入浴する場所"}, "examples": [{"ja": "今日はお風呂の日です。", "vi": "Hôm nay là ngày tắm."}], "care_example": {"ja": "「今日はお風呂の日です。気持ちよく入りましょう。」", "vi": "\"Kyou wa ofuro no hi desu. Kimochiyoku hairimashou.\""}},
      {"word": "へや", "reading": "へや", "kanji": "部屋", "meaning": {"vi": "Phòng", "ja": "居室・部屋"}, "examples": [{"ja": "お部屋に戻りましょうか。", "vi": "Chúng ta về phòng nhé?"}], "care_example": {"ja": "「お部屋でゆっくり休みましょう。」", "vi": "\"Oheya de yukkuri yasumimashou.\""}},
      {"word": "にわ", "reading": "にわ", "kanji": "庭", "meaning": {"vi": "Vườn / Sân", "ja": "施設の庭"}, "examples": [{"ja": "庭に花が咲いています。", "vi": "Có hoa nở trong vườn."}], "care_example": {"ja": "「今日は天気がいいので、庭に出て日光浴をしましょう。」", "vi": "\"Kyou wa tenki ga ii node, niwa ni dete nikkouyoku wo shimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "排泄介助の声かけ", "vi": "Gọi hỗ trợ vệ sinh"},
      "scene": {"ja": "トイレ介助の場面", "vi": "Cảnh hỗ trợ vệ sinh"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、トイレに行きたいですか？", "vi": "○○ san, bạn muốn đi vệ sinh không?"},
        {"speaker": "user", "ja": "はい、行きたいです。", "vi": "Vâng, tôi muốn đi."},
        {"speaker": "staff", "ja": "では、一緒に行きましょう。トイレはすぐそこです。", "vi": "Vậy chúng ta đi cùng nhé. Nhà vệ sinh ở ngay đây thôi."},
        {"speaker": "user", "ja": "ありがとう。すみません、いつも。", "vi": "Cảm ơn. Xin lỗi, lúc nào cũng làm phiền."}
      ],
      "key_phrases": [
        {"ja": "トイレに行きたいですか？", "vi": "Bạn muốn đi vệ sinh không?", "note_vi": "Câu hỏi thường xuyên trong chăm sóc hàng ngày"},
        {"ja": "すぐそこです", "vi": "Ở ngay đây thôi", "note_vi": "Cách chỉ đường ngắn gọn"}
      ],
      "cultural_note": {
        "ja": "排泄介助は利用者の尊厳に直結します。プライバシーへの配慮と、自然な声かけが大切です。定時排泄誘導も重要なケアの一つです。",
        "vi": "Hỗ trợ vệ sinh liên quan trực tiếp đến phẩm giá của người được chăm sóc. Quan trọng là chú ý đến quyền riêng tư và cách gọi tự nhiên. Hướng dẫn vệ sinh theo lịch định kỳ cũng là một phần quan trọng của chăm sóc."
      }
    }
  }',
  '[
    {"question": {"ja": "「風呂（ふろ）」の読み方は？", "vi": "Cách đọc của \"風呂（ふろ）\" là gì?"}, "options": [{"ja": "へや", "vi": "Heya"}, {"ja": "にわ", "vi": "Niwa"}, {"ja": "ふろ", "vi": "Furo"}, {"ja": "トイレ", "vi": "Toire"}], "correct": 2, "explanation": {"ja": "「風呂」は「ふろ」と読み、入浴する場所です。", "vi": "\"風呂\" đọc là \"furo\", là nơi tắm rửa."}, "difficulty": "easy"},
    {"question": {"ja": "排泄介助で最も大切なことは？", "vi": "Điều quan trọng nhất trong hỗ trợ vệ sinh?"}, "options": [{"ja": "早く終わらせること", "vi": "Kết thúc nhanh"}, {"ja": "プライバシーの配慮と尊厳の保持", "vi": "Tôn trọng quyền riêng tư và giữ phẩm giá"}, {"ja": "他のスタッフに声をかけること", "vi": "Gọi nhân viên khác"}, {"ja": "記録をつけること", "vi": "Ghi chép hồ sơ"}], "correct": 1, "explanation": {"ja": "排泄介助は尊厳に直結するため、プライバシーへの配慮が最重要です。", "vi": "Vì hỗ trợ vệ sinh liên quan trực tiếp đến phẩm giá, tôn trọng quyền riêng tư là quan trọng nhất."}, "difficulty": "medium"},
    {"question": {"ja": "「庭（にわ）」の活用として介護的に有効なのは？", "vi": "Cách sử dụng \"庭（にわ)\" hiệu quả trong chăm sóc?"}, "options": [{"ja": "特に使い道はない", "vi": "Không có tác dụng gì đặc biệt"}, {"ja": "日光浴やガーデニング活動", "vi": "Tắm nắng và hoạt động làm vườn"}, {"ja": "荷物置き場にする", "vi": "Dùng làm chỗ để đồ"}, {"ja": "車の駐車場にする", "vi": "Dùng làm bãi đỗ xe"}], "correct": 1, "explanation": {"ja": "庭での日光浴やガーデニングはQOL（生活の質）向上に効果的です。", "vi": "Tắm nắng và làm vườn trong vườn hiệu quả trong việc nâng cao QOL (chất lượng cuộc sống)."}, "difficulty": "medium"},
    {"question": {"ja": "「部屋」の読み方は？", "vi": "Cách đọc của \"部屋\" là gì?"}, "options": [{"ja": "へや", "vi": "Heya"}, {"ja": "いえ", "vi": "Ie"}, {"ja": "うち", "vi": "Uchi"}, {"ja": "みち", "vi": "Michi"}], "correct": 0, "explanation": {"ja": "「部屋」は「へや」と読み、居室のことです。", "vi": "\"部屋\" đọc là \"heya\", là phòng ở."}, "difficulty": "easy"},
    {"question": {"ja": "定時排泄誘導の目的は？", "vi": "Mục đích của hướng dẫn vệ sinh theo lịch định kỳ?"}, "options": [{"ja": "スタッフの都合のため", "vi": "Vì sự thuận tiện của nhân viên"}, {"ja": "失禁・尿失禁の予防と、適切なタイミングでの排泄誘導", "vi": "Phòng ngừa tiểu không tự chủ và hướng dẫn vệ sinh đúng thời điểm"}, {"ja": "記録をつけるため", "vi": "Để ghi chép hồ sơ"}, {"ja": "特に意味はない", "vi": "Không có ý nghĩa gì đặc biệt"}], "correct": 1, "explanation": {"ja": "定時排泄誘導は失禁を予防し、利用者の自尊心を守るための重要なケアです。", "vi": "Hướng dẫn vệ sinh theo lịch định kỳ là chăm sóc quan trọng để phòng ngừa tiểu không tự chủ và bảo vệ lòng tự trọng của người được chăm sóc."}, "difficulty": "hard"}
  ]',
  20,
  20
);
