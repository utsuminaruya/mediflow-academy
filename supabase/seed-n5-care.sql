-- seed-n5-care.sql
-- N5 Care Japanese Lessons (8 lessons, sort_order 1-8, xp_reward 30)
-- course: jlpt_level = 'N5', category = 'conversation'

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "朝のあいさつ・起床介助", "vi": "Chào buổi sáng và hỗ trợ thức dậy"}'::jsonb,
  '{
    "type": "care",
    "unit": 1,
    "lesson_number": 1,
    "intro": {
      "ja": "介護の現場で毎朝行う起床介助の言葉と表現を学びましょう。利用者さんへの声かけは、信頼関係の基本です。",
      "vi": "Hãy học các từ ngữ và cách diễn đạt khi hỗ trợ người dùng thức dậy buổi sáng tại nơi làm việc chăm sóc. Cách gọi người dùng là nền tảng của mối quan hệ tin cậy."
    },
    "words": [
      {
        "word": "おはようございます",
        "reading": "おはようございます",
        "meaning_vi": "Chào buổi sáng (lịch sự)",
        "part_of_speech": "挨拶",
        "care_example": {
          "ja": "「おはようございます、田中さん。よく眠れましたか？」",
          "vi": "\"Chào buổi sáng, bà Tanaka. Bà ngủ ngon không?\""
        }
      },
      {
        "word": "起きる",
        "reading": "おきる",
        "meaning_vi": "thức dậy, ngồi dậy",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「そろそろ起きる時間ですよ。お手伝いしますね。」",
          "vi": "\"Đến giờ thức dậy rồi đó. Tôi sẽ giúp bạn nhé.\""
        }
      },
      {
        "word": "カーテン",
        "reading": "カーテン",
        "meaning_vi": "rèm cửa",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「カーテンを開けてもいいですか？明るくなりますよ。」",
          "vi": "\"Tôi mở rèm nhé? Sẽ sáng hơn đó.\""
        }
      },
      {
        "word": "ベッド",
        "reading": "ベッド",
        "meaning_vi": "giường",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「ベッドを起こしますね。背中を支えますよ。」",
          "vi": "\"Tôi nâng đầu giường lên nhé. Tôi đỡ lưng cho bạn.\""
        }
      },
      {
        "word": "体調",
        "reading": "たいちょう",
        "meaning_vi": "tình trạng sức khỏe",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「今朝の体調はいかがですか？」",
          "vi": "\"Sức khỏe buổi sáng hôm nay của bạn thế nào?\""
        }
      },
      {
        "word": "着替える",
        "reading": "きがえる",
        "meaning_vi": "着替え thay quần áo",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「着替えを手伝いますね。どの服がよいですか？」",
          "vi": "\"Tôi giúp bạn thay quần áo nhé. Bạn muốn mặc áo nào?\""
        }
      },
      {
        "word": "顔を洗う",
        "reading": "かおをあらう",
        "meaning_vi": "rửa mặt",
        "part_of_speech": "動詞句",
        "care_example": {
          "ja": "「顔を洗いましょう。タオルをお持ちしますね。」",
          "vi": "\"Chúng ta rửa mặt nhé. Tôi lấy khăn cho bạn.\""
        }
      },
      {
        "word": "準備",
        "reading": "じゅんび",
        "meaning_vi": "chuẩn bị",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「朝食の準備ができましたよ。食堂へ行きましょう。」",
          "vi": "\"Bữa sáng đã chuẩn bị xong. Chúng ta đi phòng ăn nhé.\""
        }
      },
      {
        "word": "ゆっくり",
        "reading": "ゆっくり",
        "meaning_vi": "từ từ, thong thả",
        "part_of_speech": "副詞",
        "care_example": {
          "ja": "「ゆっくり起き上がってください。急がなくていいですよ。」",
          "vi": "\"Hãy từ từ ngồi dậy. Không cần vội đâu.\""
        }
      },
      {
        "word": "声かけ",
        "reading": "こえかけ",
        "meaning_vi": "gọi hỏi, hỏi thăm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「介護では声かけが大切です。何かする前に必ず声をかけましょう。」",
          "vi": "\"Trong chăm sóc, việc hỏi thăm rất quan trọng. Hãy luôn hỏi trước khi làm gì.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "田中さん、おはようございます。よく眠れましたか？", "vi": "Bà Tanaka, chào buổi sáng. Bà ngủ ngon không?"},
        {"speaker": "利用者", "ja": "おはようございます。はい、よく眠れました。", "vi": "Chào buổi sáng. Vâng, tôi ngủ ngon rồi."},
        {"speaker": "介護士", "ja": "それはよかったです。カーテンを開けてもいいですか？", "vi": "Thật tốt quá. Tôi mở rèm nhé?"},
        {"speaker": "利用者", "ja": "はい、どうぞ。今朝は体調がいいですよ。", "vi": "Vâng, mời. Sáng nay sức khỏe tôi tốt đó."}
      ],
      "key_phrases": ["おはようございます", "よく眠れましたか", "体調はいかがですか", "ゆっくり起き上がって"],
      "cultural_note": {
        "ja": "介護の声かけは「〜してもいいですか？」という許可を求める形が基本です。利用者の自己決定を尊重しましょう。",
        "vi": "Cách hỏi cơ bản trong chăm sóc là \"〜してもいいですか？\" (Tôi có thể... không?). Hãy tôn trọng quyền tự quyết của người dùng."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "朝、利用者さんに最初にかける言葉は？", "vi": "Câu đầu tiên nói với người dùng vào buổi sáng là gì?"},
        "options": ["こんにちは", "おはようございます", "こんばんは", "さようなら"],
        "correct": 1,
        "explanation": {"ja": "朝のあいさつは「おはようございます」です。", "vi": "Lời chào buổi sáng là \"おはようございます\"."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「たいちょう」の漢字は？", "vi": "Chữ Hán của \"たいちょう\" là gì?"},
        "options": ["大調", "体調", "体長", "代調"],
        "correct": 1,
        "explanation": {"ja": "「体調」は体の状態を表します。", "vi": "\"体調\" biểu thị tình trạng cơ thể."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「カーテンを開けてもいいですか？」の意味は？", "vi": "\"カーテンを開けてもいいですか？\" có nghĩa là gì?"},
        "options": ["カーテンを閉めますか", "カーテンを開けていいですか", "カーテンはどこですか", "カーテンが好きですか"],
        "correct": 1,
        "explanation": {"ja": "「〜てもいいですか」は許可を求める表現です。", "vi": "\"〜てもいいですか\" là cách xin phép."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "介護の声かけで大切なことは？", "vi": "Điều quan trọng trong việc hỏi thăm chăm sóc là gì?"},
        "options": ["大きな声で叫ぶ", "何かする前に声をかける", "声をかけない", "急いでする"],
        "correct": 1,
        "explanation": {"ja": "何かする前に必ず声をかけて、利用者の同意を得ましょう。", "vi": "Hãy luôn hỏi trước khi làm gì để được sự đồng ý của người dùng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ゆっくり起き上がってください」を正しくベトナム語に訳すと？", "vi": "Dịch đúng \"ゆっくり起き上がってください\" sang tiếng Việt là?"},
        "options": ["Hãy ngồi xuống nhanh", "Hãy từ từ ngồi dậy", "Hãy nằm xuống", "Hãy đứng dậy nhanh"],
        "correct": 1,
        "explanation": {"ja": "ゆっくり＝từ từ、起き上がる＝ngồi dậy です。", "vi": "ゆっくり = từ từ, 起き上がる = ngồi dậy."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  1, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "食事介助・嚥下", "vi": "Hỗ trợ ăn uống và nuốt thức ăn"}'::jsonb,
  '{
    "type": "care",
    "unit": 1,
    "lesson_number": 2,
    "intro": {
      "ja": "食事介助では、利用者の嚥下状態を確認しながら安全に食事を進めることが重要です。適切な言葉かけを学びましょう。",
      "vi": "Trong hỗ trợ ăn uống, điều quan trọng là kiểm tra tình trạng nuốt của người dùng và tiến hành bữa ăn một cách an toàn. Hãy học cách nói phù hợp."
    },
    "words": [
      {
        "word": "食事",
        "reading": "しょくじ",
        "meaning_vi": "bữa ăn, ăn cơm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「お食事の時間ですよ。準備はいいですか？」",
          "vi": "\"Đến giờ ăn rồi. Bạn đã sẵn sàng chưa?\""
        }
      },
      {
        "word": "嚥下",
        "reading": "えんげ",
        "meaning_vi": "nuốt (thức ăn)",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「嚥下に気をつけながらゆっくり食べてください。」",
          "vi": "\"Hãy ăn từ từ, chú ý đến việc nuốt.\""
        }
      },
      {
        "word": "口を開ける",
        "reading": "くちをあける",
        "meaning_vi": "mở miệng",
        "part_of_speech": "動詞句",
        "care_example": {
          "ja": "「口を大きく開けてください。はい、どうぞ。」",
          "vi": "\"Hãy mở miệng to. Nào, mời.\""
        }
      },
      {
        "word": "飲み込む",
        "reading": "のみこむ",
        "meaning_vi": "nuốt xuống",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「しっかり飲み込んでから次を食べましょう。」",
          "vi": "\"Hãy nuốt hết rồi mới ăn tiếp nhé.\""
        }
      },
      {
        "word": "むせる",
        "reading": "むせる",
        "meaning_vi": "bị sặc, nghẹn",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「むせていませんか？大丈夫ですか？」",
          "vi": "\"Bạn có bị sặc không? Bạn ổn không?\""
        }
      },
      {
        "word": "食べやすい",
        "reading": "たべやすい",
        "meaning_vi": "dễ ăn, dễ nuốt",
        "part_of_speech": "形容詞",
        "care_example": {
          "ja": "「食べやすいように小さく切りましょうか？」",
          "vi": "\"Tôi cắt nhỏ cho dễ ăn nhé?\""
        }
      },
      {
        "word": "お水",
        "reading": "おみず",
        "meaning_vi": "nước uống",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「お水を飲みますか？こまめに水分を取りましょう。」",
          "vi": "\"Bạn có muốn uống nước không? Hãy uống nước thường xuyên nhé.\""
        }
      },
      {
        "word": "姿勢",
        "reading": "しせい",
        "meaning_vi": "tư thế",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「食事中は姿勢を正しくしましょう。背筋を伸ばして。」",
          "vi": "\"Hãy giữ tư thế đúng khi ăn. Ngồi thẳng lưng.\""
        }
      },
      {
        "word": "残す",
        "reading": "のこす",
        "meaning_vi": "để lại, bỏ thừa",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「残してもいいですよ。無理しないでください。」",
          "vi": "\"Bỏ thừa cũng được. Đừng cố ăn quá nhé.\""
        }
      },
      {
        "word": "おいしい",
        "reading": "おいしい",
        "meaning_vi": "ngon",
        "part_of_speech": "形容詞",
        "care_example": {
          "ja": "「今日のお食事はおいしいですか？」",
          "vi": "\"Bữa ăn hôm nay có ngon không?\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "山田さん、お食事の準備ができましたよ。姿勢を整えましょうか。", "vi": "Ông Yamada, bữa ăn đã chuẩn bị xong. Để tôi giúp ông ngồi đúng tư thế nhé."},
        {"speaker": "利用者", "ja": "ありがとう。今日は何かな？", "vi": "Cảm ơn. Hôm nay có món gì vậy?"},
        {"speaker": "介護士", "ja": "ご飯とお味噌汁ですよ。ゆっくり、むせないように食べてくださいね。", "vi": "Có cơm và súp miso đó. Hãy ăn từ từ, cẩn thận đừng bị sặc nhé."},
        {"speaker": "利用者", "ja": "わかりました。お水もいただけますか？", "vi": "Tôi hiểu rồi. Tôi có thể xin thêm nước không?"}
      ],
      "key_phrases": ["お食事の時間", "飲み込んでから", "むせていませんか", "姿勢を整える"],
      "cultural_note": {
        "ja": "嚥下障害のある利用者には、食事の形態（刻み食・ミキサー食）を確認し、適切な姿勢（30度ルール等）を保つことが大切です。",
        "vi": "Với người dùng có khó khăn về nuốt, cần xác nhận hình thức thức ăn (cắt nhỏ, xay nhuyễn) và giữ tư thế phù hợp (quy tắc 30 độ, v.v.)."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「えんげ」の意味は？", "vi": "\"えんげ\" có nghĩa là gì?"},
        "options": ["食事", "嚥下", "姿勢", "残す"],
        "correct": 1,
        "explanation": {"ja": "嚥下（えんげ）は食べ物を飲み込む動作です。", "vi": "嚥下（えんげ）là động tác nuốt thức ăn."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "食事中に「むせる」とはどういう意味？", "vi": "\"むせる\" khi ăn có nghĩa là gì?"},
        "options": ["よく食べる", "水を飲む", "のどに詰まる・せき込む", "残す"],
        "correct": 2,
        "explanation": {"ja": "むせるは食べ物や飲み物がのどに詰まってせき込むことです。", "vi": "むせる là bị nghẹn thức ăn hoặc nước uống ở họng và ho."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "食事介助で姿勢が大切な理由は？", "vi": "Tại sao tư thế quan trọng trong hỗ trợ ăn uống?"},
        "options": ["見た目がいいから", "むせや誤嚥を防ぐため", "早く食べられるから", "食欲が増すから"],
        "correct": 1,
        "explanation": {"ja": "正しい姿勢は誤嚥（食べ物が気道に入ること）を防ぎます。", "vi": "Tư thế đúng ngăn ngừa hít sặc (thức ăn vào đường thở)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「飲み込んでから次を食べましょう」を正しく訳すと？", "vi": "Dịch đúng \"飲み込んでから次を食べましょう\" là?"},
        "options": ["Hãy ăn nhanh nhanh", "Hãy nuốt hết rồi mới ăn tiếp", "Hãy uống nhiều nước", "Hãy ăn một lần"],
        "correct": 1,
        "explanation": {"ja": "〜てから＝〜してから（〜した後）という意味です。", "vi": "〜てから nghĩa là sau khi làm..."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "利用者が食事を残したとき、介護士の正しい対応は？", "vi": "Khi người dùng bỏ thừa thức ăn, cách ứng xử đúng của nhân viên chăm sóc là?"},
        "options": ["無理に食べさせる", "叱る", "「残してもいいですよ」と伝える", "食事を取り上げる"],
        "correct": 2,
        "explanation": {"ja": "利用者の意思を尊重し、無理に食べさせないことが大切です。", "vi": "Điều quan trọng là tôn trọng ý muốn của người dùng, không ép ăn."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  2, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "排泄介助・トイレ誘導", "vi": "Hỗ trợ vệ sinh và hướng dẫn đến nhà vệ sinh"}'::jsonb,
  '{
    "type": "care",
    "unit": 1,
    "lesson_number": 3,
    "intro": {
      "ja": "排泄介助はプライバシーへの配慮が最も重要です。利用者の尊厳を守りながら、適切なコミュニケーションを学びましょう。",
      "vi": "Trong hỗ trợ vệ sinh, điều quan trọng nhất là tôn trọng sự riêng tư. Hãy học cách giao tiếp phù hợp trong khi bảo vệ phẩm giá của người dùng."
    },
    "words": [
      {
        "word": "トイレ",
        "reading": "トイレ",
        "meaning_vi": "nhà vệ sinh, toilet",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「トイレに行きたいですか？お手伝いしますよ。」",
          "vi": "\"Bạn có muốn đi vệ sinh không? Tôi sẽ giúp bạn.\""
        }
      },
      {
        "word": "排泄",
        "reading": "はいせつ",
        "meaning_vi": "bài tiết, vệ sinh",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「排泄の記録をつけることが大切です。」",
          "vi": "\"Việc ghi chép bài tiết rất quan trọng.\""
        }
      },
      {
        "word": "おむつ",
        "reading": "おむつ",
        "meaning_vi": "tã",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「おむつを交換しますね。失礼します。」",
          "vi": "\"Tôi thay tã cho bạn nhé. Xin lỗi vì làm phiền.\""
        }
      },
      {
        "word": "プライバシー",
        "reading": "プライバシー",
        "meaning_vi": "quyền riêng tư",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「プライバシーを守るためにカーテンを閉めますね。」",
          "vi": "\"Tôi đóng rèm để bảo vệ quyền riêng tư cho bạn nhé.\""
        }
      },
      {
        "word": "誘導",
        "reading": "ゆうどう",
        "meaning_vi": "hướng dẫn, dẫn đường",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「トイレまでご案内します。ゆっくり歩きましょう。」",
          "vi": "\"Tôi dẫn bạn đến nhà vệ sinh. Hãy đi từ từ nhé.\""
        }
      },
      {
        "word": "手すり",
        "reading": "てすり",
        "meaning_vi": "tay vịn, thanh vịn",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「手すりを持ってください。安全に座れますよ。」",
          "vi": "\"Hãy nắm tay vịn. Bạn có thể ngồi xuống an toàn.\""
        }
      },
      {
        "word": "終わったら",
        "reading": "おわったら",
        "meaning_vi": "khi xong, sau khi xong",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「終わったら呼んでください。すぐに来ます。」",
          "vi": "\"Khi xong thì gọi tôi. Tôi sẽ đến ngay.\""
        }
      },
      {
        "word": "ナースコール",
        "reading": "ナースコール",
        "meaning_vi": "chuông gọi y tá",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「ナースコールのボタンはここですよ。何かあったら押してください。」",
          "vi": "\"Nút chuông gọi ở đây. Nếu có gì thì bấm nhé.\""
        }
      },
      {
        "word": "清潔",
        "reading": "せいけつ",
        "meaning_vi": "sạch sẽ, vệ sinh",
        "part_of_speech": "名詞・形容詞",
        "care_example": {
          "ja": "「清潔を保つことが感染予防になります。」",
          "vi": "\"Giữ sạch sẽ giúp phòng ngừa lây nhiễm.\""
        }
      },
      {
        "word": "失礼します",
        "reading": "しつれいします",
        "meaning_vi": "xin lỗi, cho phép tôi",
        "part_of_speech": "挨拶",
        "care_example": {
          "ja": "「失礼します。おむつを確認させてください。」",
          "vi": "\"Xin lỗi. Cho phép tôi kiểm tra tã nhé.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "佐藤さん、トイレに行きますか？そろそろお時間ですよ。", "vi": "Bà Sato, bà có muốn đi vệ sinh không? Đến giờ rồi đó."},
        {"speaker": "利用者", "ja": "はい、お願いします。", "vi": "Vâng, nhờ bạn giúp tôi với."},
        {"speaker": "介護士", "ja": "わかりました。カーテンを閉めますね。プライバシーを守ります。手すりを持ってゆっくり立ってください。", "vi": "Vâng. Tôi đóng rèm nhé. Tôi bảo vệ quyền riêng tư cho bà. Hãy nắm tay vịn và từ từ đứng dậy."},
        {"speaker": "利用者", "ja": "ありがとう。終わったらナースコールを押します。", "vi": "Cảm ơn. Khi xong tôi sẽ bấm chuông gọi."}
      ],
      "key_phrases": ["プライバシーを守る", "手すりを持って", "終わったら呼んでください", "失礼します"],
      "cultural_note": {
        "ja": "排泄介助は利用者にとって最もデリケートなケアです。常に「失礼します」と声をかけ、できる限り利用者自身にやってもらう「自立支援」の意識が大切です。",
        "vi": "Hỗ trợ vệ sinh là chăm sóc nhạy cảm nhất với người dùng. Luôn nói \"失礼します\" và ý thức \"hỗ trợ tự lập\" để người dùng tự làm càng nhiều càng tốt."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「プライバシー」を守るためにすることは？", "vi": "Làm gì để bảo vệ \"プライバシー\"?"},
        "options": ["大声で話す", "カーテンを閉める", "ドアを開ける", "他の人を呼ぶ"],
        "correct": 1,
        "explanation": {"ja": "カーテンやドアを閉めてプライバシーを守ります。", "vi": "Đóng rèm hoặc cửa để bảo vệ quyền riêng tư."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「てすり」の意味は？", "vi": "\"てすり\" có nghĩa là gì?"},
        "options": ["タオル", "手すり（安全バー）", "手袋", "てぶくろ"],
        "correct": 1,
        "explanation": {"ja": "手すりはトイレや廊下に設置された安全のためのバーです。", "vi": "手すり là thanh vịn an toàn lắp ở nhà vệ sinh hay hành lang."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「終わったら呼んでください」の意味は？", "vi": "\"終わったら呼んでください\" có nghĩa là gì?"},
        "options": ["終わる前に呼んで", "終わったら電話して", "終わったら声をかけて", "終わらなくていい"],
        "correct": 2,
        "explanation": {"ja": "「〜たら呼ぶ」は〜が終わった後に呼ぶという意味です。", "vi": "\"〜たら呼ぶ\" nghĩa là gọi sau khi làm xong..."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "ナースコールの説明として正しいのは？", "vi": "Mô tả đúng về ナースコール là?"},
        "options": ["食事の呼び鈴", "スタッフを呼ぶためのボタン", "テレビのリモコン", "電話機"],
        "correct": 1,
        "explanation": {"ja": "ナースコールはスタッフ（看護師・介護士）を呼ぶためのボタンです。", "vi": "ナースコール là nút bấm để gọi nhân viên (y tá, nhân viên chăm sóc)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "排泄介助で「自立支援」の意識とは何ですか？", "vi": "Ý thức \"自立支援\" trong hỗ trợ vệ sinh là gì?"},
        "options": ["全部介護士がする", "できる限り利用者自身にやってもらう", "家族にまかせる", "機械を使う"],
        "correct": 1,
        "explanation": {"ja": "自立支援とは利用者が自分でできることは自分でしてもらうことです。", "vi": "自立支援nghĩa là để người dùng tự làm những gì họ có thể."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  3, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "入浴介助", "vi": "Hỗ trợ tắm rửa"}'::jsonb,
  '{
    "type": "care",
    "unit": 2,
    "lesson_number": 4,
    "intro": {
      "ja": "入浴介助では温度確認・安全確認が基本です。利用者にとって入浴は楽しみの一つ。快適な入浴を支援する言葉を学びましょう。",
      "vi": "Trong hỗ trợ tắm rửa, kiểm tra nhiệt độ và an toàn là cơ bản. Tắm rửa là một trong những niềm vui của người dùng. Hãy học cách nói để hỗ trợ việc tắm thoải mái."
    },
    "words": [
      {
        "word": "お風呂",
        "reading": "おふろ",
        "meaning_vi": "bồn tắm, phòng tắm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「お風呂の準備ができましたよ。入りますか？」",
          "vi": "\"Phòng tắm đã sẵn sàng rồi. Bạn có muốn vào tắm không?\""
        }
      },
      {
        "word": "温度",
        "reading": "おんど",
        "meaning_vi": "nhiệt độ",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「お湯の温度は40度です。熱くないですか？」",
          "vi": "\"Nhiệt độ nước là 40 độ. Không quá nóng không?\""
        }
      },
      {
        "word": "洗う",
        "reading": "あらう",
        "meaning_vi": "rửa, gội",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「背中を洗いますね。ちょっと失礼します。」",
          "vi": "\"Tôi rửa lưng cho bạn nhé. Xin lỗi làm phiền một chút.\""
        }
      },
      {
        "word": "すべる",
        "reading": "すべる",
        "meaning_vi": "trượt, trơn trượt",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「床がすべりやすいので気をつけてください。」",
          "vi": "\"Sàn dễ trơn trượt, hãy cẩn thận nhé.\""
        }
      },
      {
        "word": "シャワー",
        "reading": "シャワー",
        "meaning_vi": "vòi sen, tắm vòi sen",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「今日はシャワーにしますか？お湯をかけますね。」",
          "vi": "\"Hôm nay bạn muốn tắm vòi sen không? Tôi xả nước nhé.\""
        }
      },
      {
        "word": "タオル",
        "reading": "タオル",
        "meaning_vi": "khăn tắm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「タオルで体を拭きますね。冷えないように急ぎましょう。」",
          "vi": "\"Tôi lau người cho bạn nhé. Hãy làm nhanh để không bị lạnh.\""
        }
      },
      {
        "word": "気持ちいい",
        "reading": "きもちいい",
        "meaning_vi": "dễ chịu, thoải mái",
        "part_of_speech": "形容詞",
        "care_example": {
          "ja": "「お風呂、気持ちよかったですか？よかったです。」",
          "vi": "\"Tắm có dễ chịu không? Tốt quá.\""
        }
      },
      {
        "word": "皮膚",
        "reading": "ひふ",
        "meaning_vi": "da",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「入浴後は皮膚の状態を確認します。赤くなっていませんか？」",
          "vi": "\"Sau khi tắm, tôi kiểm tra tình trạng da. Có bị đỏ không?\""
        }
      },
      {
        "word": "転倒",
        "reading": "てんとう",
        "meaning_vi": "ngã, vấp ngã",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「転倒しないように、常に手を貸します。」",
          "vi": "\"Tôi luôn đỡ tay để bạn không bị ngã.\""
        }
      },
      {
        "word": "保湿",
        "reading": "ほしつ",
        "meaning_vi": "dưỡng ẩm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「入浴後は保湿クリームを塗りましょう。乾燥を防ぎます。」",
          "vi": "\"Sau khi tắm, hãy thoa kem dưỡng ẩm. Để ngăn khô da.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "鈴木さん、お風呂の準備ができました。今日もお風呂に入りましょうか。", "vi": "Ông Suzuki, phòng tắm đã sẵn sàng. Hôm nay chúng ta cũng tắm nhé."},
        {"speaker": "利用者", "ja": "はい、楽しみにしていました。お湯はぬるめにしてほしいです。", "vi": "Vâng, tôi đã mong đợi. Tôi muốn nước hơi ấm thôi."},
        {"speaker": "介護士", "ja": "わかりました。38度にしますね。床がすべりますので、手すりを持ってください。", "vi": "Vâng. Tôi chỉnh 38 độ nhé. Sàn dễ trơn, hãy nắm tay vịn."},
        {"speaker": "利用者", "ja": "ありがとう。気持ちいいですね。", "vi": "Cảm ơn. Dễ chịu thật."}
      ],
      "key_phrases": ["お湯の温度", "床がすべる", "手すりを持って", "気持ちいい", "転倒しないように"],
      "cultural_note": {
        "ja": "日本の入浴文化では38〜40度が適温とされます。高齢者は体温調節機能が低下しているため、入浴前後の血圧変動（ヒートショック）に注意が必要です。",
        "vi": "Trong văn hóa tắm của Nhật, 38-40 độ là nhiệt độ phù hợp. Người cao tuổi có chức năng điều tiết thân nhiệt giảm, nên cần chú ý thay đổi huyết áp trước và sau khi tắm (heat shock)."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "入浴介助で最初に確認することは？", "vi": "Điều đầu tiên cần kiểm tra trong hỗ trợ tắm là?"},
        "options": ["利用者の好きな歌", "お湯の温度", "テレビのチャンネル", "今日の天気"],
        "correct": 1,
        "explanation": {"ja": "安全のためにお湯の温度を確認することが最初のステップです。", "vi": "Bước đầu tiên để đảm bảo an toàn là kiểm tra nhiệt độ nước."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「すべる」の意味は？", "vi": "\"すべる\" có nghĩa là gì?"},
        "options": ["転ぶ・滑る", "洗う", "温める", "乾かす"],
        "correct": 0,
        "explanation": {"ja": "すべるは滑って転ぶ可能性があることを表します。", "vi": "すべる biểu thị khả năng trơn trượt và ngã."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "高齢者の入浴に適した温度は？", "vi": "Nhiệt độ phù hợp khi tắm cho người cao tuổi là?"},
        "options": ["20〜25度", "30〜35度", "38〜40度", "45〜50度"],
        "correct": 2,
        "explanation": {"ja": "高齢者には38〜40度のぬるめのお湯が適しています。", "vi": "Với người cao tuổi, nước ấm 38-40 độ là phù hợp."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "入浴後に「保湿」する理由は？", "vi": "Tại sao cần \"保湿\" sau khi tắm?"},
        "options": ["体を温めるため", "皮膚の乾燥を防ぐため", "汗をかくため", "リラックスするため"],
        "correct": 1,
        "explanation": {"ja": "入浴後は皮膚が乾燥しやすいので、保湿クリームで水分を補います。", "vi": "Sau khi tắm, da dễ bị khô nên cần bổ sung độ ẩm bằng kem dưỡng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ヒートショック」とはどんな危険ですか？", "vi": "\"ヒートショック\" là nguy hiểm gì?"},
        "options": ["水が熱い", "急激な温度変化による血圧変動", "床が滑る", "石鹸が目に入る"],
        "correct": 1,
        "explanation": {"ja": "ヒートショックは温度差による急激な血圧変動で、心臓発作や脳卒中の原因になります。", "vi": "Heat shock là sự thay đổi huyết áp đột ngột do thay đổi nhiệt độ, có thể gây nhồi máu cơ tim hoặc đột quỵ."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  4, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "移動・移乗介助", "vi": "Hỗ trợ di chuyển và chuyển vị trí"}'::jsonb,
  '{
    "type": "care",
    "unit": 2,
    "lesson_number": 5,
    "intro": {
      "ja": "移動・移乗介助は利用者の転倒リスクを最小化しながら行います。安全な介助のための言葉と手順を学びましょう。",
      "vi": "Hỗ trợ di chuyển và chuyển vị trí được thực hiện trong khi giảm thiểu nguy cơ ngã cho người dùng. Hãy học các từ ngữ và quy trình để hỗ trợ an toàn."
    },
    "words": [
      {
        "word": "車椅子",
        "reading": "くるまいす",
        "meaning_vi": "xe lăn",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「車椅子に乗り移りましょう。ブレーキをかけましたよ。」",
          "vi": "\"Hãy chuyển sang xe lăn. Tôi đã khóa phanh rồi.\""
        }
      },
      {
        "word": "移乗",
        "reading": "いじょう",
        "meaning_vi": "chuyển vị trí (từ giường sang xe lăn...)",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「移乗の前に必ずブレーキを確認します。」",
          "vi": "\"Trước khi chuyển vị trí, nhất định phải kiểm tra phanh.\""
        }
      },
      {
        "word": "ブレーキ",
        "reading": "ブレーキ",
        "meaning_vi": "phanh, khóa bánh xe",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「ブレーキをかけてから立ち上がってください。」",
          "vi": "\"Hãy khóa phanh trước khi đứng dậy.\""
        }
      },
      {
        "word": "立ち上がる",
        "reading": "たちあがる",
        "meaning_vi": "đứng dậy",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「一緒に立ち上がりますよ。せーの！」",
          "vi": "\"Chúng ta cùng đứng dậy nhé. Một, hai, ba!\""
        }
      },
      {
        "word": "支える",
        "reading": "ささえる",
        "meaning_vi": "đỡ, hỗ trợ",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「腰を支えますね。ゆっくり動いてください。」",
          "vi": "\"Tôi đỡ lưng cho bạn nhé. Hãy di chuyển từ từ.\""
        }
      },
      {
        "word": "歩行",
        "reading": "ほこう",
        "meaning_vi": "đi bộ, đi lại",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「歩行のリハビリを毎日続けましょう。」",
          "vi": "\"Hãy tiếp tục phục hồi chức năng đi lại mỗi ngày.\""
        }
      },
      {
        "word": "つかまる",
        "reading": "つかまる",
        "meaning_vi": "bám vào, nắm lấy",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「私の腕につかまってください。一緒に歩きます。」",
          "vi": "\"Hãy bám vào tay tôi. Chúng ta cùng đi nhé.\""
        }
      },
      {
        "word": "転ばない",
        "reading": "ころばない",
        "meaning_vi": "không ngã",
        "part_of_speech": "動詞（否定）",
        "care_example": {
          "ja": "「転ばないように、ゆっくり歩きましょう。」",
          "vi": "\"Hãy đi chậm thôi để không bị ngã.\""
        }
      },
      {
        "word": "フットレスト",
        "reading": "フットレスト",
        "meaning_vi": "gác chân (xe lăn)",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「フットレストを外してから立ち上がりますよ。」",
          "vi": "\"Tôi tháo gác chân ra trước khi bạn đứng dậy nhé.\""
        }
      },
      {
        "word": "重心",
        "reading": "じゅうしん",
        "meaning_vi": "trọng tâm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「重心を前にかけてから立ち上がりましょう。」",
          "vi": "\"Hãy dồn trọng tâm về phía trước rồi mới đứng dậy.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "中村さん、食堂まで行きましょう。車椅子に移りますね。", "vi": "Ông Nakamura, chúng ta đi đến phòng ăn nhé. Tôi giúp ông chuyển sang xe lăn."},
        {"speaker": "利用者", "ja": "はい、お願いします。", "vi": "Vâng, nhờ bạn giúp tôi."},
        {"speaker": "介護士", "ja": "まずブレーキをかけます。フットレストを外しますね。腰を支えますので、重心を前にかけて立ち上がってください。せーの。", "vi": "Trước tiên tôi khóa phanh. Tôi tháo gác chân nhé. Tôi đỡ lưng, ông hãy dồn trọng tâm ra trước và đứng dậy. Một, hai, ba."},
        {"speaker": "利用者", "ja": "よいしょ。ありがとうございます。転ばなくてよかった。", "vi": "Cố nào. Cảm ơn bạn. May mà không bị ngã."}
      ],
      "key_phrases": ["ブレーキをかける", "重心を前に", "腰を支える", "つかまってください", "転ばないように"],
      "cultural_note": {
        "ja": "移乗介助では「ボディメカニクス」を活用して、介護士自身の腰を守ることも重要です。利用者に近づき、重心を低くして介助しましょう。",
        "vi": "Trong hỗ trợ chuyển vị trí, việc sử dụng \"body mechanics\" để bảo vệ lưng của chính nhân viên chăm sóc cũng quan trọng. Hãy đứng gần người dùng và hạ thấp trọng tâm khi hỗ trợ."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "移乗前に必ず確認することは？", "vi": "Điều nhất định phải kiểm tra trước khi chuyển vị trí là?"},
        "options": ["天気", "ブレーキ", "食事メニュー", "テレビ番組"],
        "correct": 1,
        "explanation": {"ja": "転倒防止のため、移乗前は必ず車椅子のブレーキを確認します。", "vi": "Để phòng ngừa ngã, nhất định phải kiểm tra phanh xe lăn trước khi chuyển vị trí."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「くるまいす」の漢字は？", "vi": "Chữ Hán của \"くるまいす\" là?"},
        "options": ["自転車", "電車", "車椅子", "歩行器"],
        "correct": 2,
        "explanation": {"ja": "車椅子（くるまいす）は車輪のついた椅子です。", "vi": "車椅子（くるまいす）là ghế có bánh xe."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「重心を前にかける」のは何のため？", "vi": "\"重心を前にかける\" là để làm gì?"},
        "options": ["楽に立ち上がるため", "座るため", "転ぶため", "休むため"],
        "correct": 0,
        "explanation": {"ja": "重心を前にかけることで、立ち上がりやすくなります。", "vi": "Dồn trọng tâm về phía trước giúp đứng dậy dễ hơn."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「私の腕につかまってください」のベトナム語訳は？", "vi": "Dịch \"私の腕につかまってください\" sang tiếng Việt là?"},
        "options": ["Hãy buông tay tôi ra", "Hãy bám vào tay tôi", "Hãy đẩy tôi ra", "Hãy ngồi xuống"],
        "correct": 1,
        "explanation": {"ja": "つかまる＝bám vào、腕＝tay（腕）です。", "vi": "つかまる = bám vào, 腕 = tay/cánh tay."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ボディメカニクス」を使う目的は？", "vi": "Mục đích sử dụng \"ボディメカニクス\" là?"},
        "options": ["利用者を速く動かすため", "介護士の腰を守るため", "見た目をよくするため", "利用者を楽しませるため"],
        "correct": 1,
        "explanation": {"ja": "ボディメカニクスは力学的に効率的な身体の使い方で、介護士の腰痛予防に役立ちます。", "vi": "Body mechanics là cách sử dụng cơ thể hiệu quả về mặt cơ học, giúp phòng ngừa đau lưng cho nhân viên chăm sóc."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  5, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "バイタル測定・報告", "vi": "Đo sinh hiệu và báo cáo"}'::jsonb,
  '{
    "type": "care",
    "unit": 2,
    "lesson_number": 6,
    "intro": {
      "ja": "バイタルサイン（体温・血圧・脈拍・呼吸）の測定と報告は介護の基本業務です。正確な測定と適切な報告の言葉を学びましょう。",
      "vi": "Đo và báo cáo sinh hiệu (nhiệt độ cơ thể, huyết áp, mạch, hô hấp) là công việc cơ bản trong chăm sóc. Hãy học cách đo chính xác và từ ngữ báo cáo phù hợp."
    },
    "words": [
      {
        "word": "体温",
        "reading": "たいおん",
        "meaning_vi": "nhiệt độ cơ thể",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「体温を測りますね。脇の下に入れてください。」",
          "vi": "\"Tôi đo nhiệt độ nhé. Hãy kẹp vào nách.\""
        }
      },
      {
        "word": "血圧",
        "reading": "けつあつ",
        "meaning_vi": "huyết áp",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「血圧を測ります。腕を伸ばしてください。」",
          "vi": "\"Tôi đo huyết áp. Hãy duỗi tay ra.\""
        }
      },
      {
        "word": "脈拍",
        "reading": "みゃくはく",
        "meaning_vi": "mạch đập",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「脈拍を確認します。手首を見せてください。」",
          "vi": "\"Tôi kiểm tra mạch. Hãy đưa cổ tay ra.\""
        }
      },
      {
        "word": "熱がある",
        "reading": "ねつがある",
        "meaning_vi": "có sốt",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「38度あります。熱がありますね。看護師に報告します。」",
          "vi": "\"38 độ rồi. Bạn có sốt. Tôi báo y tá nhé.\""
        }
      },
      {
        "word": "報告",
        "reading": "ほうこく",
        "meaning_vi": "báo cáo",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「バイタルの結果を看護師に報告しました。」",
          "vi": "\"Tôi đã báo cáo kết quả sinh hiệu cho y tá.\""
        }
      },
      {
        "word": "正常",
        "reading": "せいじょう",
        "meaning_vi": "bình thường",
        "part_of_speech": "名詞・形容詞",
        "care_example": {
          "ja": "「今日の血圧は120/80で正常です。」",
          "vi": "\"Huyết áp hôm nay là 120/80, bình thường.\""
        }
      },
      {
        "word": "いつもより",
        "reading": "いつもより",
        "meaning_vi": "hơn bình thường",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「今日はいつもより血圧が高いですね。安静にしましょう。」",
          "vi": "\"Hôm nay huyết áp cao hơn bình thường. Hãy nghỉ ngơi nhé.\""
        }
      },
      {
        "word": "記録",
        "reading": "きろく",
        "meaning_vi": "ghi chép, ghi lại",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「バイタルの数値を記録しておきます。」",
          "vi": "\"Tôi ghi lại số liệu sinh hiệu.\""
        }
      },
      {
        "word": "ちょっと待って",
        "reading": "ちょっとまって",
        "meaning_vi": "chờ một chút",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「ちょっと待ってください。測定中に動かないでください。」",
          "vi": "\"Chờ một chút. Đừng cử động trong khi đo nhé.\""
        }
      },
      {
        "word": "異常",
        "reading": "いじょう",
        "meaning_vi": "bất thường",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「異常な数値が出たらすぐに看護師に連絡します。」",
          "vi": "\"Nếu ra số liệu bất thường, tôi lập tức liên lạc y tá.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士", "ja": "小林さん、おはようございます。バイタルを測りますね。体温から始めます。", "vi": "Bà Kobayashi, chào buổi sáng. Tôi đo sinh hiệu nhé. Bắt đầu từ nhiệt độ."},
        {"speaker": "利用者", "ja": "はい、どうぞ。今朝は少し頭が痛いです。", "vi": "Vâng, mời. Sáng nay tôi hơi đau đầu."},
        {"speaker": "介護士", "ja": "そうですか。体温が37.8度あります。いつもより高いですね。血圧も測りますね。動かないでください。", "vi": "Vậy à. Nhiệt độ 37.8 độ. Cao hơn bình thường nhé. Tôi đo huyết áp nữa. Đừng cử động nhé."},
        {"speaker": "利用者", "ja": "わかりました。", "vi": "Tôi hiểu rồi."},
        {"speaker": "介護士", "ja": "血圧が145/90です。少し高いですね。看護師に報告します。少し安静にしていてください。", "vi": "Huyết áp 145/90. Hơi cao. Tôi báo y tá. Hãy nghỉ ngơi một lúc nhé."}
      ],
      "key_phrases": ["バイタルを測る", "いつもより高い", "看護師に報告", "安静にして", "異常な数値"],
      "cultural_note": {
        "ja": "日本の介護施設では「報告・連絡・相談（ほうれんそう）」が基本です。異常を発見したらすぐに上司や看護師に報告しましょう。",
        "vi": "Tại các cơ sở chăm sóc Nhật Bản, \"報告・連絡・相談 (ほうれんそう - báo cáo, liên lạc, tham khảo)\" là nguyên tắc cơ bản. Khi phát hiện bất thường, hãy báo cáo ngay cho cấp trên hoặc y tá."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "「たいおん」を測るのに使う道具は？", "vi": "Dụng cụ dùng để đo \"たいおん\" là?"},
        "options": ["血圧計", "体温計", "時計", "メジャー"],
        "correct": 1,
        "explanation": {"ja": "体温は体温計で測ります。", "vi": "Nhiệt độ cơ thể được đo bằng nhiệt kế."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "バイタルに含まれないものは？", "vi": "Điều nào không thuộc sinh hiệu?"},
        "options": ["体温", "血圧", "脈拍", "身長"],
        "correct": 3,
        "explanation": {"ja": "バイタルサインは体温・血圧・脈拍・呼吸です。身長はバイタルに含まれません。", "vi": "Sinh hiệu gồm nhiệt độ, huyết áp, mạch, hô hấp. Chiều cao không thuộc sinh hiệu."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「いつもより血圧が高い」場合、どうするべきですか？", "vi": "Khi \"huyết áp cao hơn bình thường\", nên làm gì?"},
        "options": ["無視する", "看護師に報告する", "利用者に内緒にする", "運動させる"],
        "correct": 1,
        "explanation": {"ja": "異常な数値はすぐに看護師や上司に報告することが必要です。", "vi": "Số liệu bất thường cần báo cáo ngay cho y tá hoặc cấp trên."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「ほうれんそう」の「ほう」は何ですか？", "vi": "\"ほう\" trong \"ほうれんそう\" là gì?"},
        "options": ["方法", "報告", "歩行", "保湿"],
        "correct": 1,
        "explanation": {"ja": "ほうれんそう＝報告・連絡・相談です。「ほう」は報告です。", "vi": "ほうれんそう = 報告・連絡・相談. \"ほう\" là 報告 (báo cáo)."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "血圧測定中に利用者に言う言葉として正しいのは？", "vi": "Câu nói đúng khi đo huyết áp cho người dùng là?"},
        "options": ["「たくさん動いてください」", "「測定中に動かないでください」", "「立ち上がってください」", "「大声で話してください」"],
        "correct": 1,
        "explanation": {"ja": "正確な測定のために、測定中は体を動かさないよう伝えます。", "vi": "Để đo chính xác, cần nói không được cử động trong khi đo."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  6, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "認知症ケア", "vi": "Chăm sóc người bị sa sút trí tuệ"}'::jsonb,
  '{
    "type": "care",
    "unit": 3,
    "lesson_number": 7,
    "intro": {
      "ja": "認知症の利用者へのコミュニケーションには特別な配慮が必要です。否定せず、安心感を与える関わり方を学びましょう。",
      "vi": "Giao tiếp với người dùng bị sa sút trí tuệ cần sự quan tâm đặc biệt. Hãy học cách tiếp cận không phủ nhận và mang lại cảm giác an tâm."
    },
    "words": [
      {
        "word": "認知症",
        "reading": "にんちしょう",
        "meaning_vi": "sa sút trí tuệ, mất trí nhớ",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「認知症の方には、ゆっくり、はっきり話しかけましょう。」",
          "vi": "\"Với người bị sa sút trí tuệ, hãy nói chậm, rõ ràng.\""
        }
      },
      {
        "word": "覚えていない",
        "reading": "おぼえていない",
        "meaning_vi": "không nhớ",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「覚えていなくても大丈夫ですよ。一緒に確認しましょう。」",
          "vi": "\"Không nhớ cũng không sao. Hãy cùng xác nhận nhé.\""
        }
      },
      {
        "word": "不安",
        "reading": "ふあん",
        "meaning_vi": "lo lắng, bất an",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「不安ですか？ここにいますよ。大丈夫ですよ。」",
          "vi": "\"Bạn có lo lắng không? Tôi ở đây. Không sao đâu.\""
        }
      },
      {
        "word": "繰り返す",
        "reading": "くりかえす",
        "meaning_vi": "lặp đi lặp lại",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「同じことを繰り返してもいいですよ。何度でも答えます。」",
          "vi": "\"Hỏi đi hỏi lại cũng không sao. Tôi sẽ trả lời bao nhiêu lần cũng được.\""
        }
      },
      {
        "word": "否定しない",
        "reading": "ひていしない",
        "meaning_vi": "không phủ nhận",
        "part_of_speech": "表現",
        "care_example": {
          "ja": "「利用者の言葉を否定しないことが基本です。」",
          "vi": "\"Không phủ nhận lời nói của người dùng là nguyên tắc cơ bản.\""
        }
      },
      {
        "word": "寄り添う",
        "reading": "よりそう",
        "meaning_vi": "ở bên cạnh, đồng hành",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「気持ちに寄り添って、共感を示しましょう。」",
          "vi": "\"Hãy ở bên cạnh cảm xúc của họ và thể hiện sự đồng cảm.\""
        }
      },
      {
        "word": "落ち着く",
        "reading": "おちつく",
        "meaning_vi": "bình tĩnh lại, ổn định",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「落ち着いてください。私がそばにいますよ。」",
          "vi": "\"Hãy bình tĩnh. Tôi ở đây cạnh bạn.\""
        }
      },
      {
        "word": "徘徊",
        "reading": "はいかい",
        "meaning_vi": "đi lang thang (triệu chứng sa sút trí tuệ)",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「徘徊が始まったら、安全な場所に誘導しましょう。」",
          "vi": "\"Khi bắt đầu đi lang thang, hãy hướng dẫn đến nơi an toàn.\""
        }
      },
      {
        "word": "笑顔",
        "reading": "えがお",
        "meaning_vi": "nụ cười",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「笑顔で接することで、利用者も安心します。」",
          "vi": "\"Tiếp cận với nụ cười giúp người dùng cảm thấy an tâm.\""
        }
      },
      {
        "word": "尊厳",
        "reading": "そんげん",
        "meaning_vi": "phẩm giá, nhân phẩm",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「認知症があっても、利用者の尊厳は守られます。」",
          "vi": "\"Dù bị sa sút trí tuệ, phẩm giá của người dùng vẫn được bảo vệ.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "利用者", "ja": "あの…私、家に帰らないといけないんです。子供が待っています。", "vi": "Ừm... Tôi phải về nhà. Con tôi đang chờ."},
        {"speaker": "介護士", "ja": "そうですか。お子さんが待っているんですね。心配ですね。", "vi": "Vậy à. Con bạn đang chờ nhỉ. Lo lắng thật nhỉ."},
        {"speaker": "利用者", "ja": "そうなんです。早く帰らないと。", "vi": "Đúng vậy. Phải về nhanh thôi."},
        {"speaker": "介護士", "ja": "わかりました。少し休んでから一緒に行きましょうか。今、お茶でも飲みますか？", "vi": "Tôi hiểu rồi. Nghỉ một chút rồi chúng ta cùng đi nhé. Bây giờ uống trà không?"}
      ],
      "key_phrases": ["否定しない", "気持ちに寄り添う", "落ち着いて", "笑顔で接する", "安心させる"],
      "cultural_note": {
        "ja": "認知症ケアでは「バリデーション」という技法が使われます。利用者の言葉を否定せず、感情に共感することで信頼関係を築きます。",
        "vi": "Trong chăm sóc sa sút trí tuệ, kỹ thuật \"Validation\" được sử dụng. Không phủ nhận lời nói của người dùng, đồng cảm với cảm xúc để xây dựng mối tin tưởng."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "認知症の方への声かけで正しいのは？", "vi": "Cách gọi hỏi đúng với người bị sa sút trí tuệ là?"},
        "options": ["大きな声で叱る", "ゆっくり、はっきり話す", "無視する", "難しい言葉を使う"],
        "correct": 1,
        "explanation": {"ja": "認知症の方にはゆっくり、はっきり、優しく話しかけましょう。", "vi": "Với người bị sa sút trí tuệ, hãy nói chậm, rõ ràng và nhẹ nhàng."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「ふあん」の意味は？", "vi": "\"ふあん\" có nghĩa là gì?"},
        "options": ["幸せ", "不安（心配）", "元気", "楽しい"],
        "correct": 1,
        "explanation": {"ja": "不安（ふあん）は心配な気持ち、安心できない状態です。", "vi": "不安（ふあん）là cảm giác lo lắng, không an tâm."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "利用者が「家に帰りたい」と繰り返す場合、正しい対応は？", "vi": "Khi người dùng liên tục nói \"muốn về nhà\", cách ứng xử đúng là?"},
        "options": ["「それは嘘です」と否定する", "気持ちに共感し、別の話題に誘う", "怒る", "無視する"],
        "correct": 1,
        "explanation": {"ja": "否定せずに共感し、気持ちを受け止めてから別の行動に誘導します。", "vi": "Không phủ nhận, đồng cảm, tiếp nhận cảm xúc rồi hướng sang hành động khác."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「笑顔で接する」効果は？", "vi": "Tác dụng của \"笑顔で接する\" là?"},
        "options": ["利用者が怖がる", "利用者が安心する", "利用者が怒る", "利用者が眠る"],
        "correct": 1,
        "explanation": {"ja": "笑顔は利用者に安心感と信頼感を与えます。", "vi": "Nụ cười mang lại cảm giác an tâm và tin tưởng cho người dùng."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「バリデーション」とはどんな技法ですか？", "vi": "\"バリデーション\" là kỹ thuật gì?"},
        "options": ["利用者の言葉を否定する技法", "身体を鍛える技法", "利用者の感情に共感して信頼を築く技法", "薬を使う技法"],
        "correct": 2,
        "explanation": {"ja": "バリデーションは認知症の人の感情を受け入れ、共感することで信頼関係を築く技法です。", "vi": "Validation là kỹ thuật chấp nhận và đồng cảm với cảm xúc của người bị sa sút trí tuệ để xây dựng mối tin tưởng."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  7, 30
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'conversation' LIMIT 1),
  '{"ja": "緊急対応・申し送り", "vi": "Ứng phó khẩn cấp và bàn giao ca"}'::jsonb,
  '{
    "type": "care",
    "unit": 3,
    "lesson_number": 8,
    "intro": {
      "ja": "緊急時の対応と申し送りは介護職員に必須のスキルです。迅速かつ正確に情報を伝える言葉を学びましょう。",
      "vi": "Ứng phó khẩn cấp và bàn giao ca là kỹ năng thiết yếu của nhân viên chăm sóc. Hãy học cách truyền đạt thông tin nhanh chóng và chính xác."
    },
    "words": [
      {
        "word": "緊急",
        "reading": "きんきゅう",
        "meaning_vi": "khẩn cấp",
        "part_of_speech": "名詞・形容詞",
        "care_example": {
          "ja": "「緊急事態が発生しました！すぐに来てください！」",
          "vi": "\"Tình huống khẩn cấp đã xảy ra! Hãy đến ngay!\""
        }
      },
      {
        "word": "倒れる",
        "reading": "たおれる",
        "meaning_vi": "ngã xuống, ngất",
        "part_of_speech": "動詞",
        "care_example": {
          "ja": "「利用者が倒れました！助けてください！」",
          "vi": "\"Người dùng đã ngã! Giúp tôi với!\""
        }
      },
      {
        "word": "意識",
        "reading": "いしき",
        "meaning_vi": "ý thức, tỉnh táo",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「意識はありますか？名前を呼んでください。」",
          "vi": "\"Còn tỉnh không? Hãy gọi tên họ.\""
        }
      },
      {
        "word": "救急車",
        "reading": "きゅうきゅうしゃ",
        "meaning_vi": "xe cứu thương",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「119番に電話して救急車を呼んでください。」",
          "vi": "\"Gọi điện 119 để gọi xe cứu thương.\""
        }
      },
      {
        "word": "申し送り",
        "reading": "もうしおくり",
        "meaning_vi": "bàn giao ca, báo cáo khi bàn giao",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「申し送りで今日の様子を詳しく伝えましょう。」",
          "vi": "\"Hãy truyền đạt chi tiết tình trạng hôm nay trong buổi bàn giao ca.\""
        }
      },
      {
        "word": "状態",
        "reading": "じょうたい",
        "meaning_vi": "tình trạng",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「田中さんの状態を報告します。午前中から発熱があります。」",
          "vi": "\"Tôi báo cáo tình trạng của bà Tanaka. Từ sáng đã bị sốt.\""
        }
      },
      {
        "word": "変化",
        "reading": "へんか",
        "meaning_vi": "thay đổi, biến đổi",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「いつもと違う変化に気づいたらすぐに報告してください。」",
          "vi": "\"Khi nhận thấy thay đổi khác với bình thường, hãy báo cáo ngay.\""
        }
      },
      {
        "word": "対応",
        "reading": "たいおう",
        "meaning_vi": "ứng phó, xử lý",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「緊急の対応マニュアルに従って行動しましょう。」",
          "vi": "\"Hãy hành động theo hướng dẫn ứng phó khẩn cấp.\""
        }
      },
      {
        "word": "連絡",
        "reading": "れんらく",
        "meaning_vi": "liên lạc",
        "part_of_speech": "名詞",
        "care_example": {
          "ja": "「ご家族に連絡しました。すぐに来られるそうです。」",
          "vi": "\"Tôi đã liên lạc với gia đình. Họ sẽ đến ngay.\""
        }
      },
      {
        "word": "冷静に",
        "reading": "れいせいに",
        "meaning_vi": "bình tĩnh, điềm tĩnh",
        "part_of_speech": "副詞",
        "care_example": {
          "ja": "「緊急時でも冷静に行動することが大切です。」",
          "vi": "\"Dù trong tình huống khẩn cấp, điều quan trọng là hành động bình tĩnh.\""
        }
      }
    ],
    "dialogue": {
      "lines": [
        {"speaker": "介護士A", "ja": "大変です！山本さんが廊下で倒れています！", "vi": "Nguy rồi! Ông Yamamoto ngã ở hành lang!"},
        {"speaker": "介護士B", "ja": "わかりました。すぐ行きます。（山本さんに）山本さん、聞こえますか？意識はありますか？", "vi": "Rõ rồi. Tôi đến ngay. (Với ông Yamamoto) Ông Yamamoto, ông nghe thấy không? Còn tỉnh không?"},
        {"speaker": "介護士A", "ja": "返事がありません。看護師に連絡してください。119番に電話が必要かもしれません。", "vi": "Không có phản ứng. Hãy liên lạc y tá. Có thể cần gọi 119."},
        {"speaker": "介護士B", "ja": "わかりました。冷静に対応しましょう。私が看護師を呼びます。動かさないでください。", "vi": "Tôi hiểu. Hãy bình tĩnh xử lý. Tôi gọi y tá. Đừng di chuyển ông ấy."}
      ],
      "key_phrases": ["緊急です", "意識はありますか", "救急車を呼ぶ", "冷静に対応", "申し送りで報告"],
      "cultural_note": {
        "ja": "日本の介護施設では「SBAR（エスバー）」という報告形式が推奨されています。S（状況）B（背景）A（評価）R（提案）の順に報告することで、的確な情報伝達ができます。",
        "vi": "Tại các cơ sở chăm sóc Nhật Bản, hình thức báo cáo \"SBAR\" được khuyến nghị. Báo cáo theo thứ tự S (tình huống) - B (nền) - A (đánh giá) - R (đề xuất) giúp truyền đạt thông tin chính xác."
      }
    }
  }'::jsonb,
  '{
    "questions": [
      {
        "question": {"ja": "利用者が倒れた時、最初にすることは？", "vi": "Khi người dùng ngã, việc đầu tiên cần làm là?"},
        "options": ["帰宅する", "意識を確認し助けを呼ぶ", "写真を撮る", "食事を続ける"],
        "correct": 1,
        "explanation": {"ja": "まず意識を確認し、すぐに看護師や他のスタッフを呼びます。", "vi": "Trước tiên kiểm tra ý thức, rồi gọi ngay y tá hoặc nhân viên khác."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "日本の救急電話番号は？", "vi": "Số điện thoại cứu thương của Nhật là?"},
        "options": ["110番", "119番", "118番", "100番"],
        "correct": 1,
        "explanation": {"ja": "119番は救急・火災の緊急番号です。", "vi": "119 là số khẩn cấp cho cứu thương và cứu hỏa."},
        "difficulty": "easy"
      },
      {
        "question": {"ja": "「申し送り」とは何ですか？", "vi": "\"申し送り\" là gì?"},
        "options": ["朝のあいさつ", "シフト交代時の情報伝達", "食事の注文", "薬の処方"],
        "correct": 1,
        "explanation": {"ja": "申し送りは勤務交代時に利用者の状態などを次のスタッフに伝えることです。", "vi": "申し送り là việc truyền đạt tình trạng người dùng cho nhân viên ca tiếp theo khi bàn giao ca."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "緊急時に「冷静に」行動することが大切な理由は？", "vi": "Lý do quan trọng phải \"冷静に\" hành động trong khẩn cấp là?"},
        "options": ["速く走れるから", "パニックを防ぎ正確な判断ができるから", "楽しいから", "疲れないから"],
        "correct": 1,
        "explanation": {"ja": "冷静さを保つことでパニックを防ぎ、正確な判断と行動ができます。", "vi": "Giữ bình tĩnh ngăn hoảng loạn và có thể đưa ra phán đoán, hành động chính xác."},
        "difficulty": "medium"
      },
      {
        "question": {"ja": "「SBAR」の「S」は何を表しますか？", "vi": "\"S\" trong \"SBAR\" biểu thị điều gì?"},
        "options": ["時間（Schedule）", "状況（Situation）", "安全（Safety）", "速度（Speed）"],
        "correct": 1,
        "explanation": {"ja": "SBARのSはSituation（状況）です。「今、〇〇さんが〇〇の状態です」という報告形式です。", "vi": "S trong SBAR là Situation (tình huống). Hình thức báo cáo \"Hiện tại, người... đang trong tình trạng...\""},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  8, 30
);

