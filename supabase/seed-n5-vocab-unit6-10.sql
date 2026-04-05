-- ============================================================
-- Mediflow Academy — N5語彙 Unit 6〜10 シードデータ
-- seed-n5-vocab-unit6-10.sql
-- レッスン21〜40（sort_order 21〜40）
-- 実行前提: seed-n5-courses.sql が実行済みであること
-- ============================================================

-- ============================================================
-- Unit 6: 動詞（基本動作）  Lesson 21-24
-- ============================================================

-- Lesson 21: たべる・のむ・ねる・おきる
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 6-1: 食べる・飲む・寝る・起きる", "vi": "Unit 6-1: Ăn・Uống・Ngủ・Thức dậy"}',
  '{
    "type": "vocabulary",
    "unit": 6,
    "lesson_number": 21,
    "intro": {
      "ja": "今日は毎日の生活に欠かせない基本動詞を学びましょう！介護の仕事でも毎日使う大切な言葉です。",
      "vi": "Hôm nay chúng ta học các động từ cơ bản không thể thiếu trong cuộc sống hàng ngày! Đây là những từ quan trọng dùng hàng ngày trong công việc chăm sóc."
    },
    "words": [
      {
        "word": "食べる",
        "reading": "たべる",
        "kanji": "食べる",
        "meaning": {"vi": "ăn", "ja": "食事をする・口に入れる"},
        "examples": [
          {"ja": "ご飯を食べます。", "vi": "Tôi ăn cơm."},
          {"ja": "一緒に食べましょう。", "vi": "Cùng ăn nhé."}
        ],
        "care_example": {
          "ja": "「○○さん、ご飯を食べましょう。今日はカレーですよ。」",
          "vi": "'○○ san, chúng ta ăn cơm nhé. Hôm nay có cà ri đấy.'"
        }
      },
      {
        "word": "飲む",
        "reading": "のむ",
        "kanji": "飲む",
        "meaning": {"vi": "uống", "ja": "液体を口に入れて体の中に入れる"},
        "examples": [
          {"ja": "水を飲みます。", "vi": "Tôi uống nước."},
          {"ja": "薬を飲んでください。", "vi": "Hãy uống thuốc đi ạ."}
        ],
        "care_example": {
          "ja": "「お薬の時間です。水で飲んでください。」",
          "vi": "'Đến giờ uống thuốc rồi. Hãy uống với nước nhé.'"
        }
      },
      {
        "word": "寝る",
        "reading": "ねる",
        "kanji": "寝る",
        "meaning": {"vi": "ngủ / nằm xuống", "ja": "眠る・横になる"},
        "examples": [
          {"ja": "もう寝ますか？", "vi": "Ngủ chưa ạ?"},
          {"ja": "よく寝られましたか？", "vi": "Ngủ có ngon không ạ?"}
        ],
        "care_example": {
          "ja": "「お休みになりますか？ベッドに寝てください。」",
          "vi": "'Đi ngủ nhé? Hãy nằm xuống giường ạ.'"
        }
      },
      {
        "word": "起きる",
        "reading": "おきる",
        "kanji": "起きる",
        "meaning": {"vi": "thức dậy / ngồi dậy", "ja": "眠りから覚める・立ち上がる"},
        "examples": [
          {"ja": "何時に起きますか？", "vi": "Mấy giờ thức dậy ạ?"},
          {"ja": "ゆっくり起きてください。", "vi": "Hãy từ từ ngồi dậy nhé."}
        ],
        "care_example": {
          "ja": "「おはようございます。ゆっくり起きましょう。めまいはありませんか？」",
          "vi": "'Chào buổi sáng. Hãy từ từ ngồi dậy nhé. Có bị chóng mặt không ạ?'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "朝の介助", "vi": "Hỗ trợ buổi sáng"},
      "scene": {"ja": "介護スタッフが入居者の朝の起床を手伝います。", "vi": "Nhân viên chăm sóc giúp người cao tuổi thức dậy buổi sáng."},
      "lines": [
        {"speaker": "staff", "ja": "おはようございます、田中さん。よく寝られましたか？", "vi": "Chào buổi sáng, Tanaka san. Ngủ có ngon không ạ?"},
        {"speaker": "resident", "ja": "うん、よく寝た。ありがとう。", "vi": "Ừ, ngủ ngon lắm. Cảm ơn."},
        {"speaker": "staff", "ja": "それはよかったです。ゆっくり起きましょう。", "vi": "Tốt quá. Hãy từ từ ngồi dậy nhé."},
        {"speaker": "resident", "ja": "朝ご飯は何？", "vi": "Bữa sáng hôm nay là gì vậy?"},
        {"speaker": "staff", "ja": "今日はパンとスープです。一緒に食べましょう。お薬も飲んでくださいね。", "vi": "Hôm nay là bánh mì và súp ạ. Cùng ăn nhé. Nhớ uống thuốc nữa nhé."}
      ],
      "key_phrases": [
        {"ja": "ゆっくり起きましょう。", "vi": "Hãy từ từ ngồi dậy nhé.", "note_vi": "Luôn nhắc người cao tuổi ngồi dậy từ từ để tránh chóng mặt"},
        {"ja": "お薬を飲んでください。", "vi": "Hãy uống thuốc nhé.", "note_vi": "Câu nhắc uống thuốc – rất quan trọng trong chăm sóc hàng ngày"}
      ],
      "cultural_note": {
        "ja": "起床の介助では「起きてください」より「起きましょう」と言うと、一緒にサポートするニュアンスが伝わり、利用者さんが安心します。",
        "vi": "Khi hỗ trợ thức dậy, nói 'okimashō' (cùng dậy nhé) thân thiện hơn 'okite kudasai' (dậy đi), tạo cảm giác được đồng hành hỗ trợ."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「食べる」のベトナム語の意味は？", "vi": "Nghĩa tiếng Việt của「食べる」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "飲む", "vi": "uống"}},
          {"id": "b", "text": {"ja": "食べる", "vi": "ăn"}},
          {"id": "c", "text": {"ja": "寝る", "vi": "ngủ"}},
          {"id": "d", "text": {"ja": "起きる", "vi": "thức dậy"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「食べる（たべる）」は「ăn（食事をする）」という意味です。", "vi": "「食べる（たべる）」có nghĩa là 'ăn'."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「お薬を___ください」— 空欄に入る言葉は？", "vi": "「お薬を___ください」— Từ điền vào chỗ trống là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "食べて", "vi": "tabete"}},
          {"id": "b", "text": {"ja": "起きて", "vi": "okite"}},
          {"id": "c", "text": {"ja": "飲んで", "vi": "nonde"}},
          {"id": "d", "text": {"ja": "寝て", "vi": "nete"}}
        ],
        "correct": "c",
        "explanation": {"ja": "薬は「飲む（のむ）」です。「お薬を飲んでください」が正しい表現。", "vi": "Thuốc thì 'uống' (飲む). 'お薬を飲んでください' là cách nói đúng."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "介護の朝の声かけとして最も自然な表現は？", "vi": "Cách gọi thức dậy buổi sáng trong chăm sóc tự nhiên nhất là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "起きなさい！", "vi": "Dậy đi!"}},
          {"id": "b", "text": {"ja": "ゆっくり起きましょう。", "vi": "Hãy từ từ dậy nhé."}},
          {"id": "c", "text": {"ja": "早く起きてください！", "vi": "Dậy nhanh lên!"}},
          {"id": "d", "text": {"ja": "もう起きましたか？", "vi": "Dậy rồi à?"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「ゆっくり起きましょう」は安全で親しみやすい表現。転倒防止のためにもゆっくりが大切。", "vi": "'Từ từ dậy nhé' vừa an toàn vừa thân thiện. Dậy từ từ cũng giúp phòng tránh ngã."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「よく___られましたか？」（眠れましたか？）の動詞の基本形は？", "vi": "Động từ dạng cơ bản trong câu「よく___られましたか？」(Có ngủ ngon không?) là gì?"},
        "correct": "寝る（ねる）",
        "explanation": {"ja": "「寝られましたか」は「寝る」の可能形・過去・丁寧形です。", "vi": "'寝られましたか' là dạng khả năng, quá khứ, lịch sự của động từ '寝る'."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "次の介護場面の文をベトナム語に訳してください：「田中さん、朝ご飯を食べましょう。お薬も飲んでくださいね。」", "vi": "Hãy dịch câu chăm sóc sau sang tiếng Việt: 「田中さん、朝ご飯を食べましょう。お薬も飲んでくださいね。」"},
        "correct": "Tanaka san, chúng ta ăn bữa sáng nhé. Nhớ uống thuốc nữa nhé.",
        "explanation": {"ja": "「食べましょう」＝一緒に食べる提案、「飲んでください」＝依頼・お願いの表現。", "vi": "'食べましょう' = đề nghị cùng ăn, '飲んでください' = yêu cầu/nhờ uống thuốc."}
      }
    ]
  }',
  21,
  20
);

-- Lesson 22: いく・くる・かえる・はいる
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 6-2: 行く・来る・帰る・入る", "vi": "Unit 6-2: Đi・Đến・Về・Vào"}',
  '{
    "type": "vocabulary",
    "unit": 6,
    "lesson_number": 22,
    "intro": {
      "ja": "移動に関する動詞を学びましょう！介護の現場では利用者さんの移動を案内する場面がたくさんあります。",
      "vi": "Hãy học các động từ liên quan đến di chuyển! Trong công việc chăm sóc có rất nhiều tình huống hướng dẫn người được chăm sóc di chuyển."
    },
    "words": [
      {
        "word": "行く",
        "reading": "いく",
        "kanji": "行く",
        "meaning": {"vi": "đi", "ja": "ある場所へ向かって移動する"},
        "examples": [
          {"ja": "食堂へ行きましょう。", "vi": "Hãy đi đến phòng ăn nhé."},
          {"ja": "トイレに行きますか？", "vi": "Đi vệ sinh không ạ?"}
        ],
        "care_example": {
          "ja": "「デイルームに行きましょう。今日は体操がありますよ。」",
          "vi": "'Hãy đến phòng sinh hoạt nhé. Hôm nay có tập thể dục đấy.'"
        }
      },
      {
        "word": "来る",
        "reading": "くる",
        "kanji": "来る",
        "meaning": {"vi": "đến / lại", "ja": "話し手のいる方向へ移動してくる"},
        "examples": [
          {"ja": "こちらへ来てください。", "vi": "Hãy lại đây ạ."},
          {"ja": "家族が来ます。", "vi": "Gia đình sẽ đến."}
        ],
        "care_example": {
          "ja": "「○○さん、こちらへ来てください。お風呂の準備ができました。」",
          "vi": "'○○ san, lại đây ạ. Đã chuẩn bị xong bồn tắm rồi.'"
        }
      },
      {
        "word": "帰る",
        "reading": "かえる",
        "kanji": "帰る",
        "meaning": {"vi": "về / trở về", "ja": "元の場所・家などに戻る"},
        "examples": [
          {"ja": "何時に帰りますか？", "vi": "Mấy giờ về ạ?"},
          {"ja": "お部屋に帰りましょう。", "vi": "Hãy về phòng nhé."}
        ],
        "care_example": {
          "ja": "「デイサービスが終わりました。お部屋に帰りましょう。」",
          "vi": "'Dịch vụ ban ngày kết thúc rồi. Hãy về phòng nhé.'"
        }
      },
      {
        "word": "入る",
        "reading": "はいる",
        "kanji": "入る",
        "meaning": {"vi": "vào / đi vào", "ja": "外から中へ移動する"},
        "examples": [
          {"ja": "お風呂に入りましょう。", "vi": "Hãy vào bồn tắm nhé."},
          {"ja": "部屋に入ってください。", "vi": "Hãy vào phòng ạ."}
        ],
        "care_example": {
          "ja": "「お湯の温度はどうですか？入れますか？」",
          "vi": "'Nhiệt độ nước thế nào ạ? Vào được không ạ?'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "デイルームへの誘導", "vi": "Hướng dẫn đến phòng sinh hoạt"},
      "scene": {"ja": "介護スタッフが利用者さんをデイルームへ誘導します。", "vi": "Nhân viên chăm sóc hướng dẫn người được chăm sóc đến phòng sinh hoạt."},
      "lines": [
        {"speaker": "staff", "ja": "佐藤さん、こんにちは。デイルームに行きましょう。", "vi": "Chào Sato san. Hãy đến phòng sinh hoạt nhé."},
        {"speaker": "resident", "ja": "今、何があるの？", "vi": "Bây giờ có gì vậy?"},
        {"speaker": "staff", "ja": "体操の時間です。みなさん来ていますよ。", "vi": "Đến giờ thể dục rồi ạ. Mọi người đã đến rồi đấy."},
        {"speaker": "resident", "ja": "わかった。行く。", "vi": "Được rồi. Đi thôi."},
        {"speaker": "staff", "ja": "終わったらお部屋に帰りましょう。ゆっくり行きましょうね。", "vi": "Xong rồi thì về phòng nhé. Đi từ từ thôi nhé."}
      ],
      "key_phrases": [
        {"ja": "〜に行きましょう。", "vi": "Hãy đi đến〜 nhé.", "note_vi": "Mẫu câu mời đi đến đâu đó, rất hay dùng trong chăm sóc"},
        {"ja": "こちらへ来てください。", "vi": "Hãy lại đây ạ.", "note_vi": "Gọi người được chăm sóc đến chỗ mình"}
      ],
      "cultural_note": {
        "ja": "「行く」と「来る」は話し手の視点によって変わります。スタッフが利用者さんを迎えに行く場合は「行く」、利用者さんがスタッフのいる場所に来てほしい場合は「来る」を使います。",
        "vi": "「行く」và「来る」thay đổi theo góc nhìn của người nói. Khi nhân viên đến chỗ người được chăm sóc thì dùng「行く」, khi muốn người được chăm sóc đến chỗ nhân viên thì dùng「来る」."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「帰る」の意味は？", "vi": "Nghĩa của「帰る」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "行く", "vi": "đi"}},
          {"id": "b", "text": {"ja": "来る", "vi": "đến"}},
          {"id": "c", "text": {"ja": "帰る", "vi": "về"}},
          {"id": "d", "text": {"ja": "入る", "vi": "vào"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「帰る（かえる）」は元の場所・家などに戻ることです。", "vi": "「帰る（かえる）」là quay về nơi cũ, về nhà."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「お風呂に___ましょう」の動詞は？", "vi": "Động từ trong câu「お風呂に___ましょう」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "行き", "vi": "iki"}},
          {"id": "b", "text": {"ja": "入り", "vi": "hairi"}},
          {"id": "c", "text": {"ja": "来", "vi": "ki"}},
          {"id": "d", "text": {"ja": "帰り", "vi": "kaeri"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「お風呂に入る」がお風呂の場合の自然な表現です。", "vi": "'お風呂に入る' là cách nói tự nhiên khi nói về việc tắm."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "スタッフが利用者さんに「こちらに来てください」と言う。この「来る」は誰の視点か？", "vi": "Nhân viên nói với người được chăm sóc 'こちらに来てください'. '来る' này là từ góc nhìn của ai?"},
        "options": [
          {"id": "a", "text": {"ja": "利用者さんの視点", "vi": "Góc nhìn của người được chăm sóc"}},
          {"id": "b", "text": {"ja": "スタッフの視点", "vi": "Góc nhìn của nhân viên"}},
          {"id": "c", "text": {"ja": "どちらでもない", "vi": "Không phải cả hai"}},
          {"id": "d", "text": {"ja": "両方の視点", "vi": "Cả hai góc nhìn"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「来る」は話し手（スタッフ）のいる場所への移動なので、スタッフの視点です。", "vi": "'来る' là di chuyển về phía người nói (nhân viên), nên là góc nhìn của nhân viên."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「デイサービスが終わりました。お部屋に___ましょう。」に入る動詞は？", "vi": "Động từ điền vào chỗ trống: 「デイサービスが終わりました。お部屋に___ましょう。」"},
        "correct": "帰り（かえり）",
        "explanation": {"ja": "元の場所（部屋）に戻るので「帰る（かえる）」が正しいです。", "vi": "Quay về nơi cũ (phòng) nên dùng '帰る（かえる）'."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「田中さん、トイレに行きますか？終わったらこちらに来てください。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「田中さん、トイレに行きますか？終わったらこちらに来てください。」"},
        "correct": "Tanaka san, đi vệ sinh không ạ? Xong rồi hãy lại đây nhé.",
        "explanation": {"ja": "「〜に行きますか？」＝行く意思の確認、「こちらに来てください」＝スタッフのいる方向への依頼。", "vi": "'〜に行きますか？' = xác nhận ý định đi, 'こちらに来てください' = nhờ đến chỗ nhân viên."}
      }
    ]
  }',
  22,
  20
);

-- Lesson 23: みる・きく・はなす・よむ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 6-3: 見る・聞く・話す・読む", "vi": "Unit 6-3: Xem・Nghe・Nói・Đọc"}',
  '{
    "type": "vocabulary",
    "unit": 6,
    "lesson_number": 23,
    "intro": {
      "ja": "コミュニケーションに関する動詞を学びましょう！利用者さんとのやり取りで毎日使います。",
      "vi": "Hãy học các động từ liên quan đến giao tiếp! Dùng hàng ngày trong việc trao đổi với người được chăm sóc."
    },
    "words": [
      {
        "word": "見る",
        "reading": "みる",
        "kanji": "見る",
        "meaning": {"vi": "xem / nhìn", "ja": "目で確認する・視覚で感じる"},
        "examples": [
          {"ja": "テレビを見ます。", "vi": "Tôi xem tivi."},
          {"ja": "傷を見てください。", "vi": "Hãy xem vết thương ạ."}
        ],
        "care_example": {
          "ja": "「傷の様子を見ます。少し待ってください。」",
          "vi": "'Tôi sẽ xem tình trạng vết thương. Chờ một chút nhé.'"
        }
      },
      {
        "word": "聞く",
        "reading": "きく",
        "kanji": "聞く",
        "meaning": {"vi": "nghe / hỏi", "ja": "耳で感じる・質問する"},
        "examples": [
          {"ja": "音楽を聞きます。", "vi": "Tôi nghe nhạc."},
          {"ja": "質問を聞いてください。", "vi": "Hãy nghe câu hỏi ạ."}
        ],
        "care_example": {
          "ja": "「いつも聞いている音楽をかけましょうか？」",
          "vi": "'Tôi bật nhạc bạn hay nghe nhé?'"
        }
      },
      {
        "word": "話す",
        "reading": "はなす",
        "kanji": "話す",
        "meaning": {"vi": "nói / kể / nói chuyện", "ja": "言葉で伝える・会話する"},
        "examples": [
          {"ja": "ゆっくり話してください。", "vi": "Hãy nói chậm thôi ạ."},
          {"ja": "何かありましたら話してください。", "vi": "Nếu có chuyện gì hãy nói cho tôi biết nhé."}
        ],
        "care_example": {
          "ja": "「体のことで気になることがあれば、いつでも話してください。」",
          "vi": "'Nếu có điều gì lo lắng về sức khỏe thì hãy nói cho tôi biết bất cứ lúc nào.'"
        }
      },
      {
        "word": "読む",
        "reading": "よむ",
        "kanji": "読む",
        "meaning": {"vi": "đọc", "ja": "文字・文章を理解する"},
        "examples": [
          {"ja": "新聞を読みます。", "vi": "Tôi đọc báo."},
          {"ja": "手紙を読みますか？", "vi": "Đọc thư không ạ?"}
        ],
        "care_example": {
          "ja": "「お手紙が来ていますよ。読みますか？お手伝いしましょうか？」",
          "vi": "'Có thư đến đấy. Đọc không ạ? Để tôi giúp nhé?'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "レクリエーションタイム", "vi": "Thời gian giải trí"},
      "scene": {"ja": "午後のレクリエーション時間に利用者さんと話します。", "vi": "Nói chuyện với người được chăm sóc trong giờ giải trí buổi chiều."},
      "lines": [
        {"speaker": "staff", "ja": "山田さん、今日はどんな音楽を聞きたいですか？", "vi": "Yamada san, hôm nay muốn nghe nhạc gì ạ?"},
        {"speaker": "resident", "ja": "演歌が好き。聞かせてよ。", "vi": "Tôi thích enka. Cho tôi nghe nhé."},
        {"speaker": "staff", "ja": "わかりました。新聞も読みますか？今日の朝刊があります。", "vi": "Vâng ạ. Đọc báo không ạ? Có tờ báo sáng nay đây."},
        {"speaker": "resident", "ja": "うん、後で読む。娘から手紙が来た？", "vi": "Ừ, lát đọc. Có thư từ con gái tôi không?"},
        {"speaker": "staff", "ja": "昨日来ていました。一緒に読みましょうか？", "vi": "Hôm qua có đến rồi ạ. Cùng đọc nhé?"}
      ],
      "key_phrases": [
        {"ja": "〜を聞きたいですか？", "vi": "Muốn nghe〜 không ạ?", "note_vi": "Hỏi sở thích của người được chăm sóc – thể hiện sự tôn trọng"},
        {"ja": "一緒に読みましょうか？", "vi": "Cùng đọc nhé?", "note_vi": "Đề nghị giúp đỡ nhẹ nhàng"}
      ],
      "cultural_note": {
        "ja": "「聞く」には「音を聞く」と「質問する」の二つの意味があります。「先生に聞く」は「先生に質問する」という意味になります。",
        "vi": "「聞く」có hai nghĩa: 'nghe âm thanh' và 'hỏi'. '先生に聞く' có nghĩa là 'hỏi thầy/cô giáo'."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「読む」のベトナム語の意味は？", "vi": "Nghĩa tiếng Việt của「読む」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "見る", "vi": "xem"}},
          {"id": "b", "text": {"ja": "聞く", "vi": "nghe"}},
          {"id": "c", "text": {"ja": "話す", "vi": "nói"}},
          {"id": "d", "text": {"ja": "読む", "vi": "đọc"}}
        ],
        "correct": "d",
        "explanation": {"ja": "「読む（よむ）」は文字や文章を目で追って理解することです。", "vi": "「読む（よむ）」là đọc chữ hoặc văn bản."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「ゆっくり___てください」（ゆっくり話してください）の動詞は？", "vi": "Động từ trong câu「ゆっくり___てください」(Hãy nói chậm) là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "見", "vi": "mi"}},
          {"id": "b", "text": {"ja": "聞い", "vi": "kii"}},
          {"id": "c", "text": {"ja": "話し", "vi": "hanashi"}},
          {"id": "d", "text": {"ja": "読ん", "vi": "yon"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「ゆっくり話してください」が正しい文です。「話す」のテ形は「話して」。", "vi": "'ゆっくり話してください' là câu đúng. Dạng て của '話す' là '話して'."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "「聞く」には二つの意味がある。正しい組み合わせは？", "vi": "「聞く」có hai nghĩa. Tổ hợp nào đúng?"},
        "options": [
          {"id": "a", "text": {"ja": "見る・読む", "vi": "xem・đọc"}},
          {"id": "b", "text": {"ja": "話す・書く", "vi": "nói・viết"}},
          {"id": "c", "text": {"ja": "音を聞く・質問する", "vi": "nghe âm thanh・hỏi"}},
          {"id": "d", "text": {"ja": "感じる・考える", "vi": "cảm nhận・suy nghĩ"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「聞く」は「音楽を聞く（聴く）」と「先生に聞く（質問する）」の両方の意味があります。", "vi": "'聞く' có nghĩa là cả 'nghe nhạc' và 'hỏi thầy giáo'."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「お手紙が来ていますよ。___ますか？」利用者さんへの自然な声かけは？", "vi": "「お手紙が来ていますよ。___ますか？」Cách gọi tự nhiên cho người được chăm sóc là?"},
        "correct": "読み（よみ）",
        "explanation": {"ja": "手紙を「読む」のが自然です。「お手紙が来ていますよ。読みますか？」が正しい文。", "vi": "Tự nhiên nhất là 'đọc' thư. '読みますか？' là câu đúng."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "次の文をベトナム語に訳してください：「何か気になることがあれば、いつでも話してください。」", "vi": "Dịch câu sau sang tiếng Việt:「何か気になることがあれば、いつでも話してください。」"},
        "correct": "Nếu có điều gì lo lắng thì hãy nói cho tôi biết bất cứ lúc nào.",
        "explanation": {"ja": "「気になること」＝気になる・心配なこと、「いつでも」＝any time。利用者さんへの大切な声かけ。", "vi": "'気になること' = điều lo lắng/băn khoăn, 'いつでも' = bất cứ lúc nào. Câu quan trọng khi nói chuyện với người được chăm sóc."}
      }
    ]
  }',
  23,
  20
);

-- Lesson 24: かく・かう・する・あそぶ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 6-4: 書く・買う・する・遊ぶ", "vi": "Unit 6-4: Viết・Mua・Làm・Chơi"}',
  '{
    "type": "vocabulary",
    "unit": 6,
    "lesson_number": 24,
    "intro": {
      "ja": "日常活動の動詞を学びましょう！記録を書いたり、レクリエーションで遊んだり、介護の仕事に必要な動詞です。",
      "vi": "Hãy học các động từ trong hoạt động hàng ngày! Viết hồ sơ, chơi trong giờ giải trí – đây là những động từ cần thiết trong công việc chăm sóc."
    },
    "words": [
      {
        "word": "書く",
        "reading": "かく",
        "kanji": "書く",
        "meaning": {"vi": "viết", "ja": "文字・文章を記す"},
        "examples": [
          {"ja": "記録を書きます。", "vi": "Tôi viết hồ sơ."},
          {"ja": "名前を書いてください。", "vi": "Hãy viết tên ạ."}
        ],
        "care_example": {
          "ja": "「介護記録を書かなければなりません。少し待ってください。」",
          "vi": "'Tôi phải viết hồ sơ chăm sóc. Chờ một chút nhé.'"
        }
      },
      {
        "word": "買う",
        "reading": "かう",
        "kanji": "買う",
        "meaning": {"vi": "mua", "ja": "お金を払って品物を手に入れる"},
        "examples": [
          {"ja": "何を買いますか？", "vi": "Mua gì vậy ạ?"},
          {"ja": "売店で買えます。", "vi": "Có thể mua ở cửa hàng."}
        ],
        "care_example": {
          "ja": "「売店に何か買いに行きますか？一緒に行きましょうか？」",
          "vi": "'Muốn đi mua gì ở cửa hàng không? Cùng đi nhé?'"
        }
      },
      {
        "word": "する",
        "reading": "する",
        "kanji": "する",
        "meaning": {"vi": "làm / thực hiện", "ja": "行動を行う・広く使われる動詞"},
        "examples": [
          {"ja": "体操をします。", "vi": "Tôi tập thể dục."},
          {"ja": "準備をしてください。", "vi": "Hãy chuẩn bị ạ."}
        ],
        "care_example": {
          "ja": "「今から体操をします。一緒にしましょう！」",
          "vi": "'Bây giờ chúng ta tập thể dục. Cùng làm nhé!'"
        }
      },
      {
        "word": "遊ぶ",
        "reading": "あそぶ",
        "kanji": "遊ぶ",
        "meaning": {"vi": "chơi / vui chơi", "ja": "楽しむ・レクリエーションをする"},
        "examples": [
          {"ja": "カードゲームで遊びます。", "vi": "Tôi chơi trò chơi bài."},
          {"ja": "一緒に遊びましょう。", "vi": "Cùng chơi nhé."}
        ],
        "care_example": {
          "ja": "「今日は折り紙で遊びましょう。楽しいですよ。」",
          "vi": "'Hôm nay chúng ta chơi gấp giấy nhé. Vui lắm đấy.'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "レクリエーション活動", "vi": "Hoạt động giải trí"},
      "scene": {"ja": "スタッフが利用者さんとレクリエーションを楽しみます。", "vi": "Nhân viên và người được chăm sóc cùng tham gia hoạt động giải trí."},
      "lines": [
        {"speaker": "staff", "ja": "今日は折り紙で遊びましょう！鶴を作りますよ。", "vi": "Hôm nay chúng ta chơi gấp giấy nhé! Gấp con hạc đấy."},
        {"speaker": "resident", "ja": "鶴？書き方がわからない。", "vi": "Con hạc à? Tôi không biết cách làm."},
        {"speaker": "staff", "ja": "大丈夫です。一緒にします。まず名前を紙に書いてください。", "vi": "Không sao ạ. Cùng làm nhé. Trước tiên hãy viết tên vào giấy ạ."},
        {"speaker": "resident", "ja": "うん。これ、売店で買えるの？", "vi": "Ừ. Cái này mua ở cửa hàng được không?"},
        {"speaker": "staff", "ja": "はい、売店で買えます。後で一緒に買いに行きましょうか？", "vi": "Vâng, mua được ở cửa hàng ạ. Sau này cùng đi mua nhé?"}
      ],
      "key_phrases": [
        {"ja": "一緒に〜しましょう。", "vi": "Cùng〜 nhé.", "note_vi": "Mẫu câu đề nghị cùng làm – tạo cảm giác đồng hành"},
        {"ja": "〜で遊びましょう。", "vi": "Hãy chơi〜 nhé.", "note_vi": "Mời tham gia hoạt động giải trí"}
      ],
      "cultural_note": {
        "ja": "「する」は非常に万能な動詞で、「体操をする」「準備をする」「電話をする」など、名詞と組み合わせて多くの行動を表します。",
        "vi": "「する」là động từ vạn năng, kết hợp với danh từ để diễn đạt nhiều hành động: '体操をする', '準備をする', '電話をする'..."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「遊ぶ」の意味は？", "vi": "Nghĩa của「遊ぶ」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "書く", "vi": "viết"}},
          {"id": "b", "text": {"ja": "買う", "vi": "mua"}},
          {"id": "c", "text": {"ja": "する", "vi": "làm"}},
          {"id": "d", "text": {"ja": "遊ぶ", "vi": "chơi"}}
        ],
        "correct": "d",
        "explanation": {"ja": "「遊ぶ（あそぶ）」は楽しむ・レクリエーションをすることです。", "vi": "「遊ぶ（あそぶ）」là vui chơi, giải trí."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「介護記録を___ます」に入る動詞は？", "vi": "Động từ điền vào「介護記録を___ます」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "買い", "vi": "kai"}},
          {"id": "b", "text": {"ja": "書き", "vi": "kaki"}},
          {"id": "c", "text": {"ja": "遊び", "vi": "asobi"}},
          {"id": "d", "text": {"ja": "し", "vi": "shi"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「記録を書く」が正しい組み合わせです。介護の仕事では記録を書くことが大切。", "vi": "'記録を書く' là tổ hợp đúng. Viết hồ sơ rất quan trọng trong công việc chăm sóc."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "「する」を使った介護場面の正しい文は？", "vi": "Câu đúng trong chăm sóc dùng「する」là?"},
        "options": [
          {"id": "a", "text": {"ja": "体操をする", "vi": "tập thể dục"}},
          {"id": "b", "text": {"ja": "ご飯をする", "vi": "làm cơm"}},
          {"id": "c", "text": {"ja": "歌をする", "vi": "làm bài hát"}},
          {"id": "d", "text": {"ja": "散歩をする", "vi": "đi dạo"}}
        ],
        "correct": "a",
        "explanation": {"ja": "「体操をする」と「散歩をする」はどちらも正しいですが、特に介護レクリエーションでは「体操をする」がよく使われます。", "vi": "Cả '体操をする' và '散歩をする' đều đúng, nhưng '体操をする' hay dùng trong hoạt động giải trí chăm sóc."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「売店で何か___に行きましょうか？」の動詞の基本形は？", "vi": "Động từ dạng cơ bản trong「売店で何か___に行きましょうか？」là gì?"},
        "correct": "買う（かう）",
        "explanation": {"ja": "「買いに行く」＝何かを買う目的で行くという表現。「買う」の連用形＋「に行く」。", "vi": "'買いに行く' = đi với mục đích mua gì đó. Dạng renyōkei của '買う' + 'に行く'."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「今日は折り紙で遊びましょう！一緒に鶴を作りますよ。楽しいですよ。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「今日は折り紙で遊びましょう！一緒に鶴を作りますよ。楽しいですよ。」"},
        "correct": "Hôm nay chúng ta chơi gấp giấy nhé! Cùng gấp con hạc đấy. Vui lắm đấy.",
        "explanation": {"ja": "「〜で遊ぶ」＝〜を使って遊ぶ、「一緒に〜ましょう」＝一緒にする提案。利用者さんへの積極的な声かけ。", "vi": "'〜で遊ぶ' = chơi bằng〜, '一緒に〜ましょう' = đề nghị cùng làm. Cách gọi tích cực đến người được chăm sóc."}
      }
    ]
  }',
  24,
  20
);

-- ============================================================
-- Unit 7: 形容詞（い形容詞）  Lesson 25-28
-- ============================================================

-- Lesson 25: おおきい・ちいさい・たかい・やすい
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 7-1: 大きい・小さい・高い・安い", "vi": "Unit 7-1: To・Nhỏ・Đắt/Cao・Rẻ"}',
  '{
    "type": "vocabulary",
    "unit": 7,
    "lesson_number": 25,
    "intro": {
      "ja": "今日はい形容詞の基本を学びましょう！物の大きさや値段を表す言葉です。",
      "vi": "Hôm nay học các tính từ đuôi い cơ bản! Đây là những từ diễn tả kích thước và giá cả."
    },
    "words": [
      {
        "word": "大きい",
        "reading": "おおきい",
        "kanji": "大きい",
        "meaning": {"vi": "to / lớn", "ja": "サイズ・規模が大きい"},
        "examples": [
          {"ja": "大きい声で話してください。", "vi": "Hãy nói to lên ạ."},
          {"ja": "大きい字で書いてください。", "vi": "Hãy viết chữ to lên ạ."}
        ],
        "care_example": {
          "ja": "「大きい声でゆっくり話しますね。聞こえますか？」",
          "vi": "'Tôi sẽ nói to và chậm nhé. Nghe thấy không ạ?'"
        }
      },
      {
        "word": "小さい",
        "reading": "ちいさい",
        "kanji": "小さい",
        "meaning": {"vi": "nhỏ / bé", "ja": "サイズ・規模が小さい"},
        "examples": [
          {"ja": "小さい声ですね。", "vi": "Giọng nhỏ nhỉ."},
          {"ja": "小さく切ってください。", "vi": "Hãy cắt nhỏ ạ."}
        ],
        "care_example": {
          "ja": "「食べやすいように小さく切りますね。」",
          "vi": "'Tôi cắt nhỏ để ăn dễ hơn nhé.'"
        }
      },
      {
        "word": "高い",
        "reading": "たかい",
        "kanji": "高い",
        "meaning": {"vi": "đắt / cao", "ja": "値段が高い・位置が高い"},
        "examples": [
          {"ja": "この薬は高いですか？", "vi": "Thuốc này đắt không ạ?"},
          {"ja": "熱が高いです。", "vi": "Sốt cao ạ."}
        ],
        "care_example": {
          "ja": "「熱が高いですね。38.5度あります。先生に報告します。」",
          "vi": "'Sốt cao nhỉ. 38.5 độ rồi ạ. Tôi sẽ báo cáo cho bác sĩ.'"
        }
      },
      {
        "word": "安い",
        "reading": "やすい",
        "kanji": "安い",
        "meaning": {"vi": "rẻ", "ja": "値段が低い・費用が少ない"},
        "examples": [
          {"ja": "安い薬はありますか？", "vi": "Có thuốc rẻ hơn không ạ?"},
          {"ja": "安くていいですね。", "vi": "Rẻ mà tốt nhỉ."}
        ],
        "care_example": {
          "ja": "「ジェネリック薬は安いですよ。担当医に相談してみましょうか？」",
          "vi": "'Thuốc generic rẻ hơn đấy. Thử hỏi bác sĩ phụ trách nhé?'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "バイタルチェック", "vi": "Kiểm tra sinh hiệu"},
      "scene": {"ja": "朝のバイタルチェックで利用者さんの体温を確認します。", "vi": "Kiểm tra nhiệt độ của người được chăm sóc trong lần đo sinh hiệu buổi sáng."},
      "lines": [
        {"speaker": "staff", "ja": "おはようございます。体温を測りますね。", "vi": "Chào buổi sáng. Đo nhiệt độ nhé ạ."},
        {"speaker": "resident", "ja": "うん。昨日から体がだるい。", "vi": "Ừ. Từ hôm qua người mệt mỏi lắm."},
        {"speaker": "staff", "ja": "わかりました。体温が高いですね。38度あります。", "vi": "Vâng ạ. Sốt cao nhỉ. 38 độ rồi."},
        {"speaker": "resident", "ja": "そう？高いの？", "vi": "Vậy à? Cao vậy?"},
        {"speaker": "staff", "ja": "はい、少し高いです。先生に報告して、大きい声で呼ぶとすぐ来ますので、何かあればすぐに言ってください。", "vi": "Vâng, hơi cao ạ. Tôi sẽ báo bác sĩ, nếu có gì thì nói ngay nhé, gọi to là có người đến ngay."}
      ],
      "key_phrases": [
        {"ja": "熱が高いですね。", "vi": "Sốt cao nhỉ.", "note_vi": "Câu thông báo khi phát hiện sốt cao"},
        {"ja": "大きい声で呼んでください。", "vi": "Hãy gọi to lên nhé.", "note_vi": "Hướng dẫn người được chăm sóc khi cần giúp đỡ"}
      ],
      "cultural_note": {
        "ja": "「高い」は値段・温度・位置など複数の意味があります。体温の場合は「熱が高い」、物の値段の場合は「値段が高い」と文脈で使い分けます。",
        "vi": "「高い」có nhiều nghĩa: giá cao, nhiệt độ cao, vị trí cao. Khi nói về nhiệt độ cơ thể dùng '熱が高い', về giá cả dùng '値段が高い'."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「小さい」の反対語は？", "vi": "Từ trái nghĩa của「小さい」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "高い", "vi": "cao/đắt"}},
          {"id": "b", "text": {"ja": "安い", "vi": "rẻ"}},
          {"id": "c", "text": {"ja": "大きい", "vi": "to/lớn"}},
          {"id": "d", "text": {"ja": "低い", "vi": "thấp/rẻ"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「小さい（ちいさい）」の反対は「大きい（おおきい）」です。", "vi": "Từ trái nghĩa của '小さい（ちいさい）' là '大きい（おおきい）'."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「熱が___です。38度あります」の形容詞は？", "vi": "Tính từ trong「熱が___です。38度あります」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "小さい", "vi": "nhỏ"}},
          {"id": "b", "text": {"ja": "安い", "vi": "rẻ"}},
          {"id": "c", "text": {"ja": "高い", "vi": "cao"}},
          {"id": "d", "text": {"ja": "大きい", "vi": "to"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「熱が高い」＝体温が高いことを表す表現です。", "vi": "'熱が高い' = diễn đạt nhiệt độ cơ thể cao."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "「食べやすいように___切りますね」に入る形容詞は？", "vi": "Tính từ điền vào「食べやすいように___切りますね」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "大きく", "vi": "to lên"}},
          {"id": "b", "text": {"ja": "小さく", "vi": "nhỏ lại"}},
          {"id": "c", "text": {"ja": "高く", "vi": "cao lên"}},
          {"id": "d", "text": {"ja": "安く", "vi": "rẻ lại"}}
        ],
        "correct": "b",
        "explanation": {"ja": "食べやすくするために「小さく切る」が正しいです。形容詞の副詞用法：小さい→小さく。", "vi": "Để dễ ăn thì 'cắt nhỏ' là đúng. Dạng trạng từ của tính từ: 小さい→小さく."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「___声でゆっくり話しますね。聞こえますか？」耳が遠い利用者さんへの声かけ。", "vi": "「___声でゆっくり話しますね。聞こえますか？」Cách gọi cho người được chăm sóc bị nặng tai."},
        "correct": "大きい（おおきい）",
        "explanation": {"ja": "耳が遠い方には「大きい声でゆっくり話す」のが基本的な介護コミュニケーションです。", "vi": "Với người nặng tai, 'nói to và chậm' là kỹ năng giao tiếp cơ bản trong chăm sóc."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「熱が高いですね。38.5度あります。先生に報告しますから、安心してください。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「熱が高いですね。38.5度あります。先生に報告しますから、安心してください。」"},
        "correct": "Sốt cao nhỉ. 38.5 độ rồi ạ. Tôi sẽ báo bác sĩ nên đừng lo nhé.",
        "explanation": {"ja": "「〜から、安心してください」＝理由を説明して安心させる表現。バイタルチェックで大切なコミュニケーション。", "vi": "'〜から、安心してください' = giải thích lý do rồi trấn an. Giao tiếp quan trọng khi đo sinh hiệu."}
      }
    ]
  }',
  25,
  20
);

-- Lesson 26: あつい・さむい・つめたい・あたたかい
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 7-2: 暑い・寒い・冷たい・暖かい", "vi": "Unit 7-2: Nóng・Lạnh・Lạnh (chạm)・Ấm áp"}',
  '{
    "type": "vocabulary",
    "unit": 7,
    "lesson_number": 26,
    "intro": {
      "ja": "温度・気温に関する形容詞を学びましょう！入浴介助や体調確認でよく使います。",
      "vi": "Hãy học các tính từ về nhiệt độ! Thường dùng khi hỗ trợ tắm rửa và kiểm tra sức khỏe."
    },
    "words": [
      {
        "word": "暑い",
        "reading": "あつい",
        "kanji": "暑い",
        "meaning": {"vi": "nóng (thời tiết/phòng)", "ja": "気温・室温が高くて不快"},
        "examples": [
          {"ja": "今日は暑いですね。", "vi": "Hôm nay nóng nhỉ."},
          {"ja": "部屋が暑いですか？", "vi": "Phòng nóng không ạ?"}
        ],
        "care_example": {
          "ja": "「お部屋は暑くないですか？エアコンの温度を下げましょうか？」",
          "vi": "'Phòng có nóng không ạ? Để tôi hạ nhiệt độ máy lạnh nhé?'"
        }
      },
      {
        "word": "寒い",
        "reading": "さむい",
        "kanji": "寒い",
        "meaning": {"vi": "lạnh (thời tiết/cảm giác)", "ja": "気温・室温が低くて不快"},
        "examples": [
          {"ja": "寒くないですか？", "vi": "Không lạnh không ạ?"},
          {"ja": "寒い日は温かくしてください。", "vi": "Hôm lạnh hãy giữ ấm nhé."}
        ],
        "care_example": {
          "ja": "「寒くないですか？毛布をもう一枚持ってきましょうか？」",
          "vi": "'Không lạnh không ạ? Để tôi lấy thêm chăn nhé?'"
        }
      },
      {
        "word": "冷たい",
        "reading": "つめたい",
        "kanji": "冷たい",
        "meaning": {"vi": "lạnh (khi chạm vào / đồ uống)", "ja": "触れるものや飲食物の温度が低い"},
        "examples": [
          {"ja": "冷たいお水はいかがですか？", "vi": "Nước lạnh có muốn không ạ?"},
          {"ja": "手が冷たいですね。", "vi": "Tay lạnh nhỉ."}
        ],
        "care_example": {
          "ja": "「お湯が冷たくなっていませんか？温め直しましょうか？」",
          "vi": "'Nước tắm không bị lạnh chứ? Để tôi hâm lại nhé?'"
        }
      },
      {
        "word": "暖かい",
        "reading": "あたたかい",
        "kanji": "暖かい",
        "meaning": {"vi": "ấm áp / ấm", "ja": "ちょうどいい温かさ・心地よい温度"},
        "examples": [
          {"ja": "暖かいお茶はいかがですか？", "vi": "Trà ấm có muốn không ạ?"},
          {"ja": "今日は暖かいですね。", "vi": "Hôm nay ấm áp nhỉ."}
        ],
        "care_example": {
          "ja": "「暖かいタオルで体を拭きますね。気持ちいいですよ。」",
          "vi": "'Tôi lau người bằng khăn ấm nhé. Dễ chịu lắm đấy.'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "入浴介助", "vi": "Hỗ trợ tắm rửa"},
      "scene": {"ja": "介護スタッフが入浴の温度確認をします。", "vi": "Nhân viên chăm sóc kiểm tra nhiệt độ khi hỗ trợ tắm."},
      "lines": [
        {"speaker": "staff", "ja": "お風呂の準備ができました。温度は42度です。熱くないですか？", "vi": "Đã chuẩn bị xong bồn tắm rồi ạ. Nhiệt độ 42 độ. Không nóng quá không ạ?"},
        {"speaker": "resident", "ja": "少し熱いかも。もう少し冷たくして。", "vi": "Hơi nóng một chút. Làm lạnh thêm một chút đi."},
        {"speaker": "staff", "ja": "わかりました。40度にします。これはどうですか？", "vi": "Vâng ạ. Để 40 độ nhé. Thế này thế nào ạ?"},
        {"speaker": "resident", "ja": "うん、暖かくていいね。", "vi": "Ừ, ấm áp tốt lắm."},
        {"speaker": "staff", "ja": "よかったです。寒くなったら言ってくださいね。暖かいタオルも用意しています。", "vi": "Tốt quá. Nếu lạnh thì nói nhé. Tôi cũng chuẩn bị khăn ấm rồi ạ."}
      ],
      "key_phrases": [
        {"ja": "熱くないですか？", "vi": "Không nóng quá không ạ?", "note_vi": "Luôn hỏi nhiệt độ trước khi vào bồn tắm"},
        {"ja": "寒くなったら言ってください。", "vi": "Nếu lạnh thì nói nhé.", "note_vi": "Nhắc nhở người được chăm sóc khi có bất tiện"}
      ],
      "cultural_note": {
        "ja": "「暑い」は気温・室温に使い、「熱い（あつい）」は料理・お湯など直接触れるものに使います。「冷たい」は触れる冷感で、「寒い」は気温の寒さです。同じ読みでも意味が違うので注意！",
        "vi": "「暑い」dùng cho nhiệt độ không khí/phòng, còn「熱い（あつい）」dùng cho thức ăn/nước nóng chạm vào. 「冷たい」là lạnh khi chạm, 「寒い」là lạnh do thời tiết. Cùng đọc nhưng nghĩa khác nhau!"
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「寒い」の反対語は？", "vi": "Từ trái nghĩa của「寒い」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "冷たい", "vi": "lạnh (chạm)"}},
          {"id": "b", "text": {"ja": "暑い", "vi": "nóng"}},
          {"id": "c", "text": {"ja": "暖かい", "vi": "ấm"}},
          {"id": "d", "text": {"ja": "涼しい", "vi": "mát"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「寒い（さむい）」の反対は「暑い（あつい）」です。", "vi": "Từ trái nghĩa của '寒い（さむい）' là '暑い（あつい）'."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「お風呂のお湯が___くなった」（触れると冷たい場合）に入る形容詞は？", "vi": "Tính từ điền vào「お風呂のお湯が___くなった」(khi chạm vào thấy lạnh) là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "暑", "vi": "atsu"}},
          {"id": "b", "text": {"ja": "寒", "vi": "samu"}},
          {"id": "c", "text": {"ja": "冷た", "vi": "tsumeta"}},
          {"id": "d", "text": {"ja": "暖か", "vi": "atataka"}}
        ],
        "correct": "c",
        "explanation": {"ja": "触れる物の冷たさには「冷たい（つめたい）」を使います。「冷たくなった」＝温度が下がった。", "vi": "Dùng '冷たい（つめたい）' cho cảm giác lạnh khi chạm vào. '冷たくなった' = nhiệt độ đã giảm."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "入浴介助で最初に確認する大切なことは？", "vi": "Điều quan trọng cần xác nhận đầu tiên khi hỗ trợ tắm là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "お風呂の大きさ", "vi": "Kích thước bồn tắm"}},
          {"id": "b", "text": {"ja": "お湯の温度", "vi": "Nhiệt độ nước"}},
          {"id": "c", "text": {"ja": "タオルの枚数", "vi": "Số khăn tắm"}},
          {"id": "d", "text": {"ja": "石鹸の種類", "vi": "Loại xà phòng"}}
        ],
        "correct": "b",
        "explanation": {"ja": "安全な入浴介助のためにお湯の温度確認が最重要。「熱くないですか？」と必ず確認します。", "vi": "Để hỗ trợ tắm an toàn, xác nhận nhiệt độ nước là quan trọng nhất. Luôn hỏi '熱くないですか？'."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「___いタオルで体を拭きますね。気持ちいいですよ。」入浴後の声かけ。", "vi": "「___いタオルで体を拭きますね。気持ちいいですよ。」Câu gọi sau khi tắm."},
        "correct": "暖か（あたたか）",
        "explanation": {"ja": "「暖かいタオル」は入浴後に気持ちよく体を拭くために使います。利用者さんへの心遣いが伝わる表現。", "vi": "'暖かいタオル' dùng để lau người dễ chịu sau khi tắm. Cách nói thể hiện sự quan tâm đến người được chăm sóc."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「お部屋は暑くないですか？寒かったら毛布をもう一枚持ってきますよ。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「お部屋は暑くないですか？寒かったら毛布をもう一枚持ってきますよ。」"},
        "correct": "Phòng không nóng quá không ạ? Nếu lạnh thì tôi mang thêm chăn nhé.",
        "explanation": {"ja": "「〜くないですか？」＝〜ではないかという確認、「〜かったら」＝もし〜なら（い形容詞の仮定形）。", "vi": "'〜くないですか？' = xác nhận có〜 không, '〜かったら' = nếu〜 (dạng giả định của tính từ đuôi い)."}
      }
    ]
  }',
  26,
  20
);

-- Lesson 27: いい・わるい・むずかしい・やさしい
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 7-3: 良い・悪い・難しい・優しい", "vi": "Unit 7-3: Tốt・Xấu/Tệ・Khó・Dễ/Dịu dàng"}',
  '{
    "type": "vocabulary",
    "unit": 7,
    "lesson_number": 27,
    "intro": {
      "ja": "評価・状態を表す重要な形容詞を学びましょう！利用者さんの体調報告に欠かせない言葉です。",
      "vi": "Hãy học các tính từ quan trọng diễn tả đánh giá và trạng thái! Không thể thiếu khi báo cáo tình trạng sức khỏe của người được chăm sóc."
    },
    "words": [
      {
        "word": "良い/いい",
        "reading": "よい/いい",
        "kanji": "良い",
        "meaning": {"vi": "tốt / được", "ja": "好ましい・問題ない・適切な"},
        "examples": [
          {"ja": "今日は調子がいいですか？", "vi": "Hôm nay cảm giác thế nào ạ?"},
          {"ja": "体の具合はいいですか？", "vi": "Sức khỏe tốt không ạ?"}
        ],
        "care_example": {
          "ja": "「顔色がいいですね。今日は体調がいいですか？」",
          "vi": "'Sắc mặt đẹp nhỉ. Hôm nay cảm giác sức khỏe tốt không ạ?'"
        }
      },
      {
        "word": "悪い",
        "reading": "わるい",
        "kanji": "悪い",
        "meaning": {"vi": "xấu / tệ / không tốt", "ja": "好ましくない・問題がある・体調不良"},
        "examples": [
          {"ja": "気分が悪いですか？", "vi": "Cảm giác không tốt không ạ?"},
          {"ja": "体調が悪いですね。", "vi": "Sức khỏe không tốt nhỉ."}
        ],
        "care_example": {
          "ja": "「顔色が悪いですね。気分が悪いですか？横になりましょうか？」",
          "vi": "'Sắc mặt không tốt nhỉ. Cảm giác không khỏe không? Nằm xuống nhé?'"
        }
      },
      {
        "word": "難しい",
        "reading": "むずかしい",
        "kanji": "難しい",
        "meaning": {"vi": "khó", "ja": "簡単ではない・複雑な"},
        "examples": [
          {"ja": "この体操は難しいですか？", "vi": "Bài thể dục này có khó không ạ?"},
          {"ja": "難しくないですよ。", "vi": "Không khó đâu ạ."}
        ],
        "care_example": {
          "ja": "「この動きは難しいですか？ゆっくり一緒にやりましょう。」",
          "vi": "'Động tác này có khó không ạ? Hãy cùng làm từ từ nhé.'"
        }
      },
      {
        "word": "優しい",
        "reading": "やさしい",
        "kanji": "優しい",
        "meaning": {"vi": "dịu dàng / dễ (dàng)", "ja": "親切・穏やか・簡単（易しい）"},
        "examples": [
          {"ja": "優しい先生ですね。", "vi": "Thầy/cô dịu dàng nhỉ."},
          {"ja": "優しい声で話してください。", "vi": "Hãy nói bằng giọng nhẹ nhàng ạ."}
        ],
        "care_example": {
          "ja": "「これは優しい体操です。誰でもできますよ。一緒にやりましょう！」",
          "vi": "'Đây là bài thể dục nhẹ nhàng. Ai cũng làm được đấy. Cùng làm nhé!'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "体調確認", "vi": "Kiểm tra sức khỏe"},
      "scene": {"ja": "食事前に利用者さんの体調を確認します。", "vi": "Kiểm tra sức khỏe của người được chăm sóc trước bữa ăn."},
      "lines": [
        {"speaker": "staff", "ja": "こんにちは。今日の体調はどうですか？", "vi": "Xin chào. Hôm nay sức khỏe thế nào ạ?"},
        {"speaker": "resident", "ja": "んー、今日は少し気分が悪い。", "vi": "Ừm, hôm nay cảm giác hơi không tốt."},
        {"speaker": "staff", "ja": "そうですか。顔色が悪いですね。どこかが痛いですか？", "vi": "Vậy à. Sắc mặt không tốt nhỉ. Có chỗ nào đau không ạ?"},
        {"speaker": "resident", "ja": "頭が少し痛い。でも、食事はできると思う。", "vi": "Đầu hơi đau một chút. Nhưng tôi nghĩ vẫn ăn được."},
        {"speaker": "staff", "ja": "わかりました。先生に報告します。食後に薬を飲めばよくなりますよ。難しくないので、いつものようにやりましょう。", "vi": "Vâng ạ. Tôi sẽ báo bác sĩ. Uống thuốc sau ăn sẽ tốt hơn thôi. Không khó đâu, làm như thường ngày nhé."}
      ],
      "key_phrases": [
        {"ja": "気分が悪いですか？", "vi": "Cảm giác không tốt không ạ?", "note_vi": "Hỏi khi người được chăm sóc trông không được khỏe"},
        {"ja": "顔色が悪いですね。", "vi": "Sắc mặt không tốt nhỉ.", "note_vi": "Quan sát và diễn đạt tình trạng sức khỏe"}
      ],
      "cultural_note": {
        "ja": "「いい」は「よい」の口語形です。日常会話では「いい」が多く使われますが、文章では「よい」が使われます。また、「優しい（やさしい）」と「易しい（やさしい）」は同じ読みで、前者は「親切・穏やか」、後者は「簡単・簡易」を意味します。",
        "vi": "'いい' là dạng khẩu ngữ của 'よい'. Trong hội thoại dùng 'いい' nhiều hơn, còn trong văn viết dùng 'よい'. Ngoài ra, '優しい' và '易しい' đọc giống nhau nhưng: '優しい' nghĩa là dịu dàng/tốt bụng, '易しい' nghĩa là dễ dàng/đơn giản."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「悪い」の反対語は？", "vi": "Từ trái nghĩa của「悪い」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "難しい", "vi": "khó"}},
          {"id": "b", "text": {"ja": "優しい", "vi": "dịu dàng"}},
          {"id": "c", "text": {"ja": "良い", "vi": "tốt"}},
          {"id": "d", "text": {"ja": "小さい", "vi": "nhỏ"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「悪い（わるい）」の反対は「良い（よい/いい）」です。", "vi": "Từ trái nghĩa của '悪い（わるい）' là '良い（よい/いい）'."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「顔色が___ですね。気分が悪いですか？」の形容詞は？", "vi": "Tính từ trong「顔色が___ですね。気分が悪いですか？」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "良い", "vi": "tốt"}},
          {"id": "b", "text": {"ja": "難しい", "vi": "khó"}},
          {"id": "c", "text": {"ja": "悪い", "vi": "xấu/tệ"}},
          {"id": "d", "text": {"ja": "優しい", "vi": "dịu dàng"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「顔色が悪い」は体調不良のサインです。このような場合「気分が悪いですか？」と確認します。", "vi": "'顔色が悪い' là dấu hiệu sức khỏe không tốt. Trong trường hợp này xác nhận bằng '気分が悪いですか？'."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "「優しい」の二つの意味として正しいものは？", "vi": "Hai nghĩa đúng của「優しい」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "親切・難しい", "vi": "tốt bụng・khó"}},
          {"id": "b", "text": {"ja": "親切・簡単", "vi": "tốt bụng・dễ"}},
          {"id": "c", "text": {"ja": "冷たい・暖かい", "vi": "lạnh・ấm"}},
          {"id": "d", "text": {"ja": "大きい・小さい", "vi": "to・nhỏ"}}
        ],
        "correct": "b",
        "explanation": {"ja": "「優しい（やさしい）」は①優しい＝親切・穏やか、②易しい＝簡単・簡易の両方に使われます。", "vi": "'やさしい' được dùng cho cả ①優しい = tốt bụng/dịu dàng và ②易しい = đơn giản/dễ."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「今日は体調が___ですか？いつもと違いますか？」朝の声かけ。", "vi": "「今日は体調が___ですか？いつもと違いますか？」Câu gọi buổi sáng."},
        "correct": "良い（よい/いい）",
        "explanation": {"ja": "「体調がいいですか？」は朝の体調確認の定番表現です。", "vi": "'体調がいいですか？' là câu hỏi thăm sức khỏe tiêu chuẩn buổi sáng."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「この体操は難しくないですよ。優しい動きなので、ゆっくり一緒にやりましょう。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「この体操は難しくないですよ。優しい動きなので、ゆっくり一緒にやりましょう。」"},
        "correct": "Bài thể dục này không khó đâu. Vì là động tác nhẹ nhàng nên hãy cùng làm từ từ nhé.",
        "explanation": {"ja": "「〜くないですよ」＝〜ではないと安心させる表現、「〜なので」＝理由を説明する接続。", "vi": "'〜くないですよ' = trấn an rằng không〜, '〜なので' = liên từ giải thích lý do."}
      }
    ]
  }',
  27,
  20
);

-- Lesson 28: いたい・からだによい・たのしい・かなしい
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES
(
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 7-4: 痛い・体に良い・楽しい・悲しい", "vi": "Unit 7-4: Đau・Tốt cho sức khỏe・Vui・Buồn"}',
  '{
    "type": "vocabulary",
    "unit": 7,
    "lesson_number": 28,
    "intro": {
      "ja": "体の状態や気持ちを表す形容詞を学びましょう！利用者さんの訴えを正確に聞き取るために必要です。",
      "vi": "Hãy học các tính từ diễn tả trạng thái cơ thể và cảm xúc! Cần thiết để nghe hiểu chính xác những điều người được chăm sóc muốn nói."
    },
    "words": [
      {
        "word": "痛い",
        "reading": "いたい",
        "kanji": "痛い",
        "meaning": {"vi": "đau", "ja": "体のどこかが痛む"},
        "examples": [
          {"ja": "どこが痛いですか？", "vi": "Chỗ nào đau ạ?"},
          {"ja": "痛みはありますか？", "vi": "Có đau không ạ?"}
        ],
        "care_example": {
          "ja": "「どこか痛いですか？痛い場所を教えてください。」",
          "vi": "'Có chỗ nào đau không ạ? Hãy cho tôi biết chỗ đau nhé.'"
        }
      },
      {
        "word": "体に良い",
        "reading": "からだによい",
        "kanji": "体に良い",
        "meaning": {"vi": "tốt cho sức khỏe", "ja": "健康に良い・体のためになる"},
        "examples": [
          {"ja": "この食べ物は体に良いですよ。", "vi": "Thức ăn này tốt cho sức khỏe đấy."},
          {"ja": "体に良い運動をしましょう。", "vi": "Hãy tập thể dục tốt cho sức khỏe nhé."}
        ],
        "care_example": {
          "ja": "「この体操は体に良いですよ。毎日続けると効果がありますよ。」",
          "vi": "'Bài thể dục này tốt cho sức khỏe đấy. Nếu làm mỗi ngày thì sẽ có hiệu quả.'"
        }
      },
      {
        "word": "楽しい",
        "reading": "たのしい",
        "kanji": "楽しい",
        "meaning": {"vi": "vui / thú vị", "ja": "喜び・楽しみを感じる"},
        "examples": [
          {"ja": "今日は楽しかったですか？", "vi": "Hôm nay có vui không ạ?"},
          {"ja": "楽しいですね！", "vi": "Vui nhỉ!"}
        ],
        "care_example": {
          "ja": "「今日のレクリエーション、楽しかったですか？また来週もやりましょうね。」",
          "vi": "'Hôm nay tham gia giải trí có vui không ạ? Tuần sau lại làm nhé.'"
        }
      },
      {
        "word": "悲しい",
        "reading": "かなしい",
        "kanji": "悲しい",
        "meaning": {"vi": "buồn", "ja": "悲しみを感じる・心が痛い"},
        "examples": [
          {"ja": "悲しいですか？", "vi": "Buồn không ạ?"},
          {"ja": "何か悲しいことがありましたか？", "vi": "Có chuyện gì buồn không ạ?"}
        ],
        "care_example": {
          "ja": "「悲しそうですね。何かありましたか？話したいことがあれば聞きますよ。」",
          "vi": "'Có vẻ buồn nhỉ. Có chuyện gì không ạ? Nếu muốn kể thì tôi nghe nhé.'"
        }
      }
    ],
    "dialogue": {
      "title": {"ja": "体調・気持ちの確認", "vi": "Kiểm tra sức khỏe và cảm xúc"},
      "scene": {"ja": "元気のない利用者さんに声をかけます。", "vi": "Trò chuyện với người được chăm sóc trông có vẻ không vui."},
      "lines": [
        {"speaker": "staff", "ja": "木村さん、今日は元気がないですね。どこか痛いですか？", "vi": "Kimura san, hôm nay trông không vui nhỉ. Có chỗ nào đau không ạ?"},
        {"speaker": "resident", "ja": "痛くはないけど、少し悲しい気持ち。今日、娘が来られないって言って。", "vi": "Không đau, nhưng hơi buồn. Hôm nay con gái nói không đến được."},
        {"speaker": "staff", "ja": "そうですか、それは悲しいですね。お気持ちわかります。", "vi": "Vậy à, buồn thật nhỉ. Tôi hiểu cảm giác đó ạ."},
        {"speaker": "resident", "ja": "うん。でも、今日の体操は楽しかったよ。", "vi": "Ừ. Nhưng mà bài thể dục hôm nay vui lắm."},
        {"speaker": "staff", "ja": "よかった！体に良いですし、毎日続けましょう。来週はきっとお嬢さんが来ますよ。", "vi": "Tốt quá! Tốt cho sức khỏe nữa, hãy tiếp tục mỗi ngày nhé. Tuần sau chắc chắn con gái đến thăm thôi."}
      ],
      "key_phrases": [
        {"ja": "どこか痛いですか？", "vi": "Có chỗ nào đau không ạ?", "note_vi": "Câu hỏi cơ bản khi người được chăm sóc trông không khỏe"},
        {"ja": "お気持ちわかります。", "vi": "Tôi hiểu cảm giác đó.", "note_vi": "Thể hiện sự đồng cảm – rất quan trọng trong chăm sóc tâm lý"}
      ],
      "cultural_note": {
        "ja": "「いたい」は体の痛みだけでなく、「心が痛い」という精神的な痛みにも使えます。利用者さんが「悲しい」「つらい」という気持ちを表現したときは、すぐに解決しようとせず、まず「お気持ちわかります」と共感を示すことが大切です。",
        "vi": "'いたい' không chỉ dùng cho đau thể xác mà còn có thể dùng cho '心が痛い' (đau lòng). Khi người được chăm sóc biểu lộ cảm giác 'buồn' hay 'khổ tâm', điều quan trọng không phải giải quyết ngay mà trước tiên hãy thể hiện sự đồng cảm bằng 'お気持ちわかります'."
      }
    }
  }',
  '{
    "questions": [
      {
        "id": 1,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「楽しい」の意味は？", "vi": "Nghĩa của「楽しい」là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "痛い", "vi": "đau"}},
          {"id": "b", "text": {"ja": "悲しい", "vi": "buồn"}},
          {"id": "c", "text": {"ja": "楽しい", "vi": "vui"}},
          {"id": "d", "text": {"ja": "体に良い", "vi": "tốt cho sức khỏe"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「楽しい（たのしい）」は喜び・楽しみを感じることです。", "vi": "「楽しい（たのしい）」là cảm giác vui vẻ, thú vị."}
      },
      {
        "id": 2,
        "type": "multiple_choice",
        "difficulty": "easy",
        "question": {"ja": "「どこか___ですか？」（体の具合が悪そうな人への質問）に入る形容詞は？", "vi": "Tính từ điền vào「どこか___ですか？」(Câu hỏi cho người trông có vẻ không khỏe) là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "楽しい", "vi": "vui"}},
          {"id": "b", "text": {"ja": "悲しい", "vi": "buồn"}},
          {"id": "c", "text": {"ja": "痛い", "vi": "đau"}},
          {"id": "d", "text": {"ja": "体に良い", "vi": "tốt cho sức khỏe"}}
        ],
        "correct": "c",
        "explanation": {"ja": "「どこか痛いですか？」は体の不調を確認する基本的な質問です。", "vi": "'どこか痛いですか？' là câu hỏi cơ bản để xác nhận tình trạng không khỏe của cơ thể."}
      },
      {
        "id": 3,
        "type": "multiple_choice",
        "difficulty": "medium",
        "question": {"ja": "利用者さんが「家族が来られない」と悲しんでいる。スタッフの最初の対応として最適なのは？", "vi": "Người được chăm sóc đang buồn vì 'gia đình không đến được'. Cách phản ứng đầu tiên phù hợp nhất của nhân viên là gì?"},
        "options": [
          {"id": "a", "text": {"ja": "「気にしないで！」と言う", "vi": "Nói 'Đừng bận tâm!'"}},
          {"id": "b", "text": {"ja": "「お気持ちわかります」と共感する", "vi": "Đồng cảm bằng 'Tôi hiểu cảm giác đó'"}},
          {"id": "c", "text": {"ja": "すぐに別の話題に変える", "vi": "Đổi chủ đề ngay"}},
          {"id": "d", "text": {"ja": "「来週来るから大丈夫！」と言う", "vi": "Nói 'Tuần sau đến thôi, không sao!'"}},
          {"id": "e", "text": {"ja": "黙っている", "vi": "Im lặng"}}
        ],
        "correct": "b",
        "explanation": {"ja": "感情に寄り添う「共感」が最初の対応として最も大切です。「お気持ちわかります」と言ってから次の対応を考えます。", "vi": "Quan trọng nhất là 'đồng cảm' đồng hành với cảm xúc. Nói 'Tôi hiểu cảm giác đó' rồi mới nghĩ đến bước tiếp theo."}
      },
      {
        "id": 4,
        "type": "fill_blank",
        "difficulty": "medium",
        "question": {"ja": "「この体操は___に良いですよ。毎日続けましょう。」の空欄は？", "vi": "「この体操は___に良いですよ。毎日続けましょう。」Chỗ trống điền gì?"},
        "correct": "体（からだ）",
        "explanation": {"ja": "「体に良い（からだによい）」は健康に良いという意味。介護レクリエーションでよく使う表現。", "vi": "'体に良い（からだによい）' nghĩa là tốt cho sức khỏe. Cách nói hay dùng trong giải trí chăm sóc."}
      },
      {
        "id": 5,
        "type": "translation",
        "difficulty": "hard",
        "question": {"ja": "「悲しそうですね。何かありましたか？話したいことがあればいつでも聞きますよ。」をベトナム語に訳してください。", "vi": "Dịch câu sau sang tiếng Việt:「悲しそうですね。何かありましたか？話したいことがあればいつでも聞きますよ。」"},
        "correct": "Có vẻ buồn nhỉ. Có chuyện gì không ạ? Nếu muốn kể thì tôi nghe bất cứ lúc nào nhé.",
        "explanation": {"ja": "「〜そうですね」＝外見・様子から判断する表現、「〜があれば」＝もし〜があれば（仮定）。", "vi": "'〜そうですね' = phán đoán từ vẻ ngoài, '〜があれば' = nếu có〜 (giả định)."}
      }
    ]
  }',
  28,
  20
);

-- Unit 8: な形容詞 (Lessons 29-32)

-- Lesson 29: じょうぶ・しんせつ・たいせつ・だいじょうぶ
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 8 Lesson 29: な形容詞①（状態・気持ち）", "vi": "Unit 8 Bài 29: Tính từ đuôi NA ① (Trạng thái, cảm xúc)"}',
  '{
    "type": "vocabulary",
    "unit": 8,
    "lesson_number": 29,
    "intro": {"ja": "介護現場でよく使うな形容詞を学びましょう。", "vi": "Học các tính từ đuôi NA thường dùng trong chăm sóc."},
    "words": [
      {"word": "じょうぶ", "reading": "じょうぶ", "kanji": "丈夫", "meaning": {"vi": "Chắc chắn / Khỏe mạnh", "ja": "体が強い・壊れにくい"}, "examples": [{"ja": "体が丈夫な方ですね。", "vi": "Bạn có vẻ khỏe mạnh nhỉ."}], "care_example": {"ja": "「丈夫な身体を保つために、毎日体操しましょう。」", "vi": "\"Joubu na karada wo tamotsu tame ni, mainichi taisou shimashou.\""}},
      {"word": "しんせつ", "reading": "しんせつ", "kanji": "親切", "meaning": {"vi": "Tốt bụng / Ân cần", "ja": "思いやりがある"}, "examples": [{"ja": "親切なスタッフさんですね。", "vi": "Nhân viên tốt bụng nhỉ."}], "care_example": {"ja": "「親切な声かけが利用者さんの安心につながります。」", "vi": "\"Shinsetsu na koe kake ga riyousha san no anshin ni tsunagarimasu.\""}},
      {"word": "たいせつ", "reading": "たいせつ", "kanji": "大切", "meaning": {"vi": "Quan trọng / Trân trọng", "ja": "重要・大事"}, "examples": [{"ja": "水分補給はとても大切です。", "vi": "Bổ sung nước rất quan trọng."}], "care_example": {"ja": "「安全確認は介護の中でとても大切なことです。」", "vi": "\"Anzen kakunin wa kaigo no naka de totemo taisetsu na koto desu.\""}},
      {"word": "だいじょうぶ", "reading": "だいじょうぶ", "kanji": "大丈夫", "meaning": {"vi": "Không sao / Ổn", "ja": "問題ない・安心"}, "examples": [{"ja": "大丈夫ですか？", "vi": "Bạn có ổn không?"}], "care_example": {"ja": "「転倒後：「大丈夫ですか？どこか痛いところはありますか？」", "vi": "Sau khi ngã: \"Daijoubu desu ka? Doko ka itai tokoro wa arimasu ka?\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "転倒後の確認", "vi": "Kiểm tra sau khi ngã"},
      "scene": {"ja": "利用者が転倒した後の確認場面", "vi": "Cảnh kiểm tra sau khi người dùng bị ngã"},
      "lines": [
        {"speaker": "staff", "ja": "大丈夫ですか！どこか痛いですか？", "vi": "Bạn có ổn không! Bạn có đau ở đâu không?"},
        {"speaker": "user", "ja": "大丈夫です。少し足が痛い気がします。", "vi": "Tôi ổn. Tôi cảm thấy chân hơi đau."},
        {"speaker": "staff", "ja": "すぐに確認します。動かないでください。", "vi": "Tôi kiểm tra ngay. Xin đừng di chuyển."},
        {"speaker": "user", "ja": "ありがとうございます。いつも親切にしてくれて。", "vi": "Cảm ơn. Lúc nào cũng tốt bụng với tôi."}
      ],
      "key_phrases": [
        {"ja": "動かないでください", "vi": "Xin đừng di chuyển", "note_vi": "Chỉ dẫn quan trọng sau khi ngã"},
        {"ja": "すぐに確認します", "vi": "Tôi kiểm tra ngay", "note_vi": "Phản ứng nhanh trong trường hợp khẩn cấp"}
      ],
      "cultural_note": {"ja": "転倒後はまず「大丈夫ですか？」と声をかけ、動かさずに状態を確認することが重要です。", "vi": "Sau khi ngã, trước tiên hỏi \"Daijoubu desu ka?\" và quan trọng là không di chuyển người đó mà kiểm tra tình trạng trước."}
    }
  }',
  '[
    {"question": {"ja": "「大丈夫ですか？」はいつ使いますか？", "vi": "\"Daijoubu desu ka?\" dùng khi nào?"}, "options": [{"ja": "食事の前", "vi": "Trước bữa ăn"}, {"ja": "転倒後や体調確認時", "vi": "Sau khi ngã hoặc khi kiểm tra sức khỏe"}, {"ja": "就寝前", "vi": "Trước khi ngủ"}, {"ja": "朝のあいさつ", "vi": "Lời chào buổi sáng"}], "correct": 1, "explanation": {"ja": "「大丈夫ですか？」は怪我や体調不良が心配な時に使います。", "vi": "\"Daijoubu desu ka?\" dùng khi lo lắng về chấn thương hoặc tình trạng sức khỏe."}, "difficulty": "easy"},
    {"question": {"ja": "「親切」とはどういう意味？", "vi": "\"親切\" có nghĩa là gì?"}, "options": [{"ja": "厳しい", "vi": "Nghiêm khắc"}, {"ja": "思いやりがある・優しい", "vi": "Tốt bụng, ân cần"}, {"ja": "忙しい", "vi": "Bận rộn"}, {"ja": "強い", "vi": "Mạnh mẽ"}], "correct": 1, "explanation": {"ja": "「親切（しんせつ）」は思いやりがあり優しいことを意味します。", "vi": "\"Shinsetsu\" có nghĩa là tốt bụng và ân cần."}, "difficulty": "easy"},
    {"question": {"ja": "転倒後に最初にすべきことは？", "vi": "Việc đầu tiên cần làm sau khi ngã?"}, "options": [{"ja": "すぐに立たせる", "vi": "Cho đứng dậy ngay"}, {"ja": "声をかけ、動かさずに状態確認", "vi": "Gọi hỏi và kiểm tra tình trạng mà không di chuyển"}, {"ja": "家族に電話する", "vi": "Gọi điện cho gia đình"}, {"ja": "無視する", "vi": "Bỏ qua"}], "correct": 1, "explanation": {"ja": "転倒後はまず声をかけ、骨折等の可能性があるため動かさずに状態を確認します。", "vi": "Sau khi ngã, trước tiên gọi hỏi và kiểm tra tình trạng mà không di chuyển vì có thể gãy xương."}, "difficulty": "medium"},
    {"question": {"ja": "「大切」の反対の意味に近い言葉は？", "vi": "Từ gần nghĩa trái ngược với \"大切\" là gì?"}, "options": [{"ja": "重要", "vi": "Quan trọng"}, {"ja": "必要", "vi": "Cần thiết"}, {"ja": "どうでもいい", "vi": "Không quan trọng"}, {"ja": "親切", "vi": "Tốt bụng"}], "correct": 2, "explanation": {"ja": "「大切（たいせつ）」の反対は「どうでもいい（重要でない）」です。", "vi": "Trái nghĩa của \"taisetsu\" là \"dou demo ii\" (không quan trọng)."}, "difficulty": "medium"},
    {"question": {"ja": "「丈夫な体を保つ」ための介護現場での活動は？", "vi": "Hoạt động trong chăm sóc để \"duy trì cơ thể khỏe mạnh\"?"}, "options": [{"ja": "一日中寝かせる", "vi": "Để nằm cả ngày"}, {"ja": "体操・リハビリ・適切な食事と水分", "vi": "Thể dục, phục hồi chức năng, ăn uống và nước đúng cách"}, {"ja": "激しい運動だけ", "vi": "Chỉ vận động mạnh"}, {"ja": "薬だけに頼る", "vi": "Chỉ dựa vào thuốc"}], "correct": 1, "explanation": {"ja": "体操・リハビリ・バランスの取れた食事・適切な水分補給が健康維持に重要です。", "vi": "Thể dục, phục hồi chức năng, ăn uống cân bằng và bổ sung nước đúng cách quan trọng để duy trì sức khỏe."}, "difficulty": "hard"}
  ]',
  29, 20
);

-- Lesson 30: きれい・にぎやか・しずか・ひま
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 8 Lesson 30: な形容詞②（様子・環境）", "vi": "Unit 8 Bài 30: Tính từ đuôi NA ② (Dáng vẻ, môi trường)"}',
  '{
    "type": "vocabulary",
    "unit": 8,
    "lesson_number": 30,
    "intro": {"ja": "環境や状況を表すな形容詞を学びましょう。", "vi": "Học các tính từ đuôi NA diễn tả môi trường và tình huống."},
    "words": [
      {"word": "きれい", "reading": "きれい", "kanji": "綺麗", "meaning": {"vi": "Sạch / Đẹp", "ja": "清潔・美しい"}, "examples": [{"ja": "部屋をきれいにしましょう。", "vi": "Hãy làm phòng sạch sẽ."}], "care_example": {"ja": "「居室をきれいに保つことが感染予防になります。」", "vi": "\"Kyoshitsu wo kirei ni tamotsu koto ga kansen yobou ni narimasu.\""}},
      {"word": "にぎやか", "reading": "にぎやか", "kanji": "賑やか", "meaning": {"vi": "Nhộn nhịp / Vui vẻ", "ja": "活気がある"}, "examples": [{"ja": "レクリエーションは賑やかですね。", "vi": "Hoạt động giải trí thật nhộn nhịp nhỉ."}], "care_example": {"ja": "「今日のレクは賑やかで、みなさん楽しそうでした。」", "vi": "\"Kyou no reku wa nigiyaka de, minasan tanoshisou deshita.\""}},
      {"word": "しずか", "reading": "しずか", "kanji": "静か", "meaning": {"vi": "Yên tĩnh", "ja": "音が少なく落ち着いている"}, "examples": [{"ja": "就寝時間は静かにしましょう。", "vi": "Hãy giữ yên tĩnh trong giờ ngủ."}], "care_example": {"ja": "「夜間は静かな環境を保ちます。」", "vi": "\"Yakan wa shizuka na kankyou wo tamochimasu.\""}},
      {"word": "ひま", "reading": "ひま", "kanji": "暇", "meaning": {"vi": "Rảnh rỗi / Rảnh", "ja": "時間がある・することがない"}, "examples": [{"ja": "暇な時間はどんな趣味がありますか？", "vi": "Khi rảnh bạn có sở thích gì không?"}], "care_example": {"ja": "「暇そうにしている利用者さんに、レクリエーションを提案しましょう。」", "vi": "\"Hima sou ni shite iru riyousha san ni, rekurieeshon wo teian shimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "レクリエーション後", "vi": "Sau hoạt động giải trí"},
      "scene": {"ja": "レクリエーション後に利用者と話す場面", "vi": "Nói chuyện với người dùng sau hoạt động giải trí"},
      "lines": [
        {"speaker": "staff", "ja": "今日のレクリエーション、楽しかったですか？", "vi": "Hoạt động giải trí hôm nay có vui không?"},
        {"speaker": "user", "ja": "賑やかで楽しかった！でも少し疲れました。", "vi": "Nhộn nhịp và vui lắm! Nhưng hơi mệt."},
        {"speaker": "staff", "ja": "では、お部屋で静かに休みましょうか。", "vi": "Vậy thì hãy nghỉ ngơi yên tĩnh trong phòng nhé."},
        {"speaker": "user", "ja": "そうします。部屋もきれいにしてもらって、ありがとう。", "vi": "Tôi sẽ làm vậy. Cảm ơn đã làm phòng sạch cho tôi."}
      ],
      "key_phrases": [
        {"ja": "静かに休みましょうか", "vi": "Hãy nghỉ ngơi yên tĩnh nhé", "note_vi": "Lời đề nghị nghỉ ngơi nhẹ nhàng"},
        {"ja": "疲れました", "vi": "Tôi mệt rồi", "note_vi": "Cách diễn đạt mệt mỏi"}
      ],
      "cultural_note": {"ja": "「きれい」は清潔さと美しさの両方を表します。介護現場では主に清潔さの意味で使います。", "vi": "\"Kirei\" thể hiện cả sự sạch sẽ và vẻ đẹp. Trong chăm sóc chủ yếu dùng với nghĩa sạch sẽ."}
    }
  }',
  '[
    {"question": {"ja": "「きれい」の介護現場での主な意味は？", "vi": "Nghĩa chính của \"kirei\" trong chăm sóc là gì?"}, "options": [{"ja": "賑やか", "vi": "Nhộn nhịp"}, {"ja": "清潔・整頓されている", "vi": "Sạch sẽ, gọn gàng"}, {"ja": "静か", "vi": "Yên tĩnh"}, {"ja": "暇", "vi": "Rảnh rỗi"}], "correct": 1, "explanation": {"ja": "介護現場では「きれい」は主に清潔・衛生的という意味で使います。", "vi": "Trong chăm sóc, \"kirei\" chủ yếu dùng với nghĩa sạch sẽ và vệ sinh."}, "difficulty": "easy"},
    {"question": {"ja": "夜間に保つべき環境は？", "vi": "Môi trường cần duy trì vào ban đêm?"}, "options": [{"ja": "賑やかな環境", "vi": "Môi trường nhộn nhịp"}, {"ja": "明るく騒がしい環境", "vi": "Môi trường sáng và ồn ào"}, {"ja": "静かで落ち着いた環境", "vi": "Môi trường yên tĩnh và bình tĩnh"}, {"ja": "暑い環境", "vi": "Môi trường nóng"}], "correct": 2, "explanation": {"ja": "夜間は利用者が安眠できるよう静かな環境を維持します。", "vi": "Ban đêm duy trì môi trường yên tĩnh để người dùng ngủ ngon."}, "difficulty": "easy"},
    {"question": {"ja": "利用者が暇そうにしている時の適切な対応は？", "vi": "Cách xử lý phù hợp khi người dùng có vẻ rảnh rỗi?"}, "options": [{"ja": "そのままにする", "vi": "Để yên"}, {"ja": "レクリエーションや趣味活動を提案する", "vi": "Đề xuất hoạt động giải trí hoặc sở thích"}, {"ja": "テレビをつけておく", "vi": "Bật TV"}, {"ja": "寝かせる", "vi": "Cho ngủ"}], "correct": 1, "explanation": {"ja": "暇な時間のQOL向上のため、本人の好みに合ったレクや趣味活動を提案します。", "vi": "Để nâng cao QOL trong thời gian rảnh, đề xuất hoạt động giải trí hoặc sở thích phù hợp."}, "difficulty": "medium"},
    {"question": {"ja": "「賑やか」の反対の意味は？", "vi": "Trái nghĩa của \"にぎやか\" là gì?"}, "options": [{"ja": "きれい", "vi": "Kirei"}, {"ja": "しずか", "vi": "Shizuka"}, {"ja": "たいせつ", "vi": "Taisetsu"}, {"ja": "ひま", "vi": "Hima"}], "correct": 1, "explanation": {"ja": "「賑やか（にぎやか）」の反対は「静か（しずか）」です。", "vi": "Trái nghĩa của \"nigiyaka\" là \"shizuka\" (yên tĩnh)."}, "difficulty": "medium"},
    {"question": {"ja": "居室の清潔保持が感染予防になる理由は？", "vi": "Lý do duy trì phòng sạch sẽ giúp phòng ngừa nhiễm khuẩn?"}, "options": [{"ja": "見た目が良いから", "vi": "Vì trông đẹp"}, {"ja": "細菌・ウイルスの繁殖を防げるから", "vi": "Vì ngăn ngừa vi khuẩn và virus sinh sôi"}, {"ja": "臭いがなくなるから", "vi": "Vì hết mùi"}, {"ja": "利用者が喜ぶから", "vi": "Vì người dùng vui"}], "correct": 1, "explanation": {"ja": "清潔な環境は細菌・ウイルスの繁殖を防ぎ、施設感染を予防します。", "vi": "Môi trường sạch sẽ ngăn ngừa vi khuẩn và virus sinh sôi, phòng ngừa nhiễm khuẩn trong cơ sở."}, "difficulty": "hard"}
  ]',
  30, 20
);

-- Lesson 31: げんき・びょうき・たいへん・むり
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 8 Lesson 31: な形容詞③（健康・状態）", "vi": "Unit 8 Bài 31: Tính từ đuôi NA ③ (Sức khỏe, trạng thái)"}',
  '{
    "type": "vocabulary",
    "unit": 8,
    "lesson_number": 31,
    "intro": {"ja": "健康状態を表す言葉を学びましょう。毎日の様子確認に使います。", "vi": "Học các từ diễn đạt tình trạng sức khỏe. Dùng để kiểm tra tình trạng hàng ngày."},
    "words": [
      {"word": "げんき", "reading": "げんき", "kanji": "元気", "meaning": {"vi": "Khỏe mạnh / Tươi vui", "ja": "健康で活力がある"}, "examples": [{"ja": "今日も元気ですか？", "vi": "Hôm nay bạn có khỏe không?"}], "care_example": {"ja": "「○○さん、今日は元気そうですね！顔色がいいです。」", "vi": "\"○○ san, kyou wa genki sou desu ne! Kaoiro ga ii desu.\""}},
      {"word": "びょうき", "reading": "びょうき", "kanji": "病気", "meaning": {"vi": "Bệnh tật", "ja": "体の不具合・病気"}, "examples": [{"ja": "病気の時はすぐ教えてください。", "vi": "Khi bệnh hãy báo ngay cho tôi."}], "care_example": {"ja": "「病気の早期発見のために、毎日のバイタル測定が重要です。」", "vi": "\"Byouki no souki hakken no tame ni, mainichi no baitaru sokutei ga juuyou desu.\""}},
      {"word": "たいへん", "reading": "たいへん", "kanji": "大変", "meaning": {"vi": "Khó khăn / Vất vả / Rất (trạng từ)", "ja": "苦労・困難・または「とても」の意味"}, "examples": [{"ja": "毎日、大変お世話になっています。", "vi": "Hàng ngày cảm ơn vì đã chăm sóc rất vất vả."}], "care_example": {"ja": "「大変でしたね。ゆっくり休んでください。」", "vi": "\"Taihen deshita ne. Yukkuri yasunde kudasai.\""}},
      {"word": "むり", "reading": "むり", "kanji": "無理", "meaning": {"vi": "Cố sức / Không thể", "ja": "できないこと・無理をすること"}, "examples": [{"ja": "無理しないでください。", "vi": "Đừng cố sức quá."}], "care_example": {"ja": "「無理せずに、できる範囲でやりましょう。」", "vi": "\"Muri sezu ni, dekiru han''i de yarimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "朝の体調確認", "vi": "Kiểm tra sức khỏe buổi sáng"},
      "scene": {"ja": "朝のラウンドで利用者の体調を確認する", "vi": "Kiểm tra sức khỏe người dùng trong vòng tuần tra buổi sáng"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、おはようございます。今日は元気ですか？", "vi": "○○ san, chào buổi sáng. Hôm nay bạn có khỏe không?"},
        {"speaker": "user", "ja": "少し疲れています。昨夜あまり眠れなくて。", "vi": "Tôi hơi mệt. Đêm qua ngủ không được."},
        {"speaker": "staff", "ja": "それは大変でしたね。無理しないで、今日はゆっくり過ごしましょう。", "vi": "Vất vả nhỉ. Đừng cố sức, hôm nay hãy nghỉ ngơi thoải mái."},
        {"speaker": "user", "ja": "ありがとう。体温を測ってもらえますか？", "vi": "Cảm ơn. Bạn có thể đo nhiệt độ cho tôi không?"}
      ],
      "key_phrases": [
        {"ja": "無理しないで", "vi": "Đừng cố sức", "note_vi": "Lời quan tâm thường dùng trong chăm sóc"},
        {"ja": "ゆっくり過ごしましょう", "vi": "Hãy nghỉ ngơi thoải mái", "note_vi": "Khuyến khích nghỉ ngơi"}
      ],
      "cultural_note": {"ja": "「大変」は状況の困難さを表すほか、「とても」の意味でも使われます（例：「大変ありがとうございます」）。", "vi": "\"Taihen\" ngoài nghĩa diễn tả sự khó khăn của tình huống, còn dùng với nghĩa \"rất\" (ví dụ: \"taihen arigatou gozaimasu\" = cảm ơn rất nhiều)."}
    }
  }',
  '[
    {"question": {"ja": "「元気ですか？」への自然な返事は？", "vi": "Câu trả lời tự nhiên cho \"Genki desu ka?\"?"}, "options": [{"ja": "さようなら", "vi": "Sayounara"}, {"ja": "はい、元気です / 少し疲れています", "vi": "Hai, genki desu / Sukoshi tsukarete imasu"}, {"ja": "おはようございます", "vi": "Ohayou gozaimasu"}, {"ja": "ありがとうございます", "vi": "Arigatou gozaimasu"}], "correct": 1, "explanation": {"ja": "体調確認には「元気です」や具体的な状態を答えます。", "vi": "Khi hỏi sức khỏe, trả lời \"genki desu\" hoặc mô tả tình trạng cụ thể."}, "difficulty": "easy"},
    {"question": {"ja": "「無理しないでください」はどんな場面で使う？", "vi": "\"Muri shinaide kudasai\" dùng trong tình huống nào?"}, "options": [{"ja": "食事を勧める時", "vi": "Khi mời ăn"}, {"ja": "利用者が頑張りすぎている時", "vi": "Khi người dùng đang cố quá"}, {"ja": "怒っている時", "vi": "Khi tức giận"}, {"ja": "就寝時", "vi": "Khi đi ngủ"}], "correct": 1, "explanation": {"ja": "「無理しないで」は相手が無理をしていると感じた時に使う思いやりの表現です。", "vi": "\"Muri shinaide\" là cách diễn đạt quan tâm dùng khi cảm thấy người kia đang cố quá."}, "difficulty": "easy"},
    {"question": {"ja": "「大変」の二つの使い方は？", "vi": "Hai cách dùng của \"taihen\"?"}, "options": [{"ja": "挨拶と謝罪", "vi": "Lời chào và xin lỗi"}, {"ja": "困難を表す・「とても」の意味", "vi": "Diễn đạt khó khăn và nghĩa \"rất\""}, {"ja": "時間と場所", "vi": "Thời gian và địa điểm"}, {"ja": "否定と肯定", "vi": "Phủ định và khẳng định"}], "correct": 1, "explanation": {"ja": "「大変」は「困難・苦労」の意味と「とても」の意味（大変助かりました等）で使います。", "vi": "\"Taihen\" dùng với nghĩa \"khó khăn, vất vả\" và nghĩa \"rất\" (taihen tasukarimashita = giúp được rất nhiều)."}, "difficulty": "medium"},
    {"question": {"ja": "毎日のバイタル測定の目的は？", "vi": "Mục đích của đo sinh hiệu hàng ngày?"}, "options": [{"ja": "記録のためだけ", "vi": "Chỉ để ghi chép"}, {"ja": "病気の早期発見・異常の把握", "vi": "Phát hiện sớm bệnh tật và nắm bắt bất thường"}, {"ja": "規則だから", "vi": "Vì quy định"}, {"ja": "利用者が好むから", "vi": "Vì người dùng thích"}], "correct": 1, "explanation": {"ja": "バイタル測定は病気の早期発見や体調変化の把握に重要です。", "vi": "Đo sinh hiệu quan trọng để phát hiện sớm bệnh tật và nắm bắt thay đổi sức khỏe."}, "difficulty": "medium"},
    {"question": {"ja": "利用者が「少し疲れている」と言った時の適切な対応は？", "vi": "Khi người dùng nói \"hơi mệt\", cách xử lý phù hợp?"}, "options": [{"ja": "無視して予定通り進める", "vi": "Bỏ qua và tiến hành theo kế hoạch"}, {"ja": "原因を確認し、無理のないケアを提供する", "vi": "Xác nhận nguyên nhân và cung cấp chăm sóc không gượng ép"}, {"ja": "すぐに病院へ連れて行く", "vi": "Đưa ngay đến bệnh viện"}, {"ja": "元気を出すよう叱る", "vi": "Mắng họ phải lấy lại tinh thần"}], "correct": 1, "explanation": {"ja": "疲れの原因を確認し（睡眠・体調など）、無理のない活動を提案します。", "vi": "Xác nhận nguyên nhân mệt mỏi (giấc ngủ, sức khỏe, v.v.) và đề xuất hoạt động không gượng ép."}, "difficulty": "hard"}
  ]',
  31, 20
);

-- Lesson 32: すき・きらい・とくい・にがて
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 8 Lesson 32: な形容詞④（好み・得意）", "vi": "Unit 8 Bài 32: Tính từ đuôi NA ④ (Sở thích, sở trường)"}',
  '{
    "type": "vocabulary",
    "unit": 8,
    "lesson_number": 32,
    "intro": {"ja": "好みや得意・苦手を表す言葉を学びましょう。個別ケアに役立ちます。", "vi": "Học từ diễn đạt sở thích, sở trường và điểm yếu. Hữu ích trong chăm sóc cá nhân."},
    "words": [
      {"word": "すき", "reading": "すき", "kanji": "好き", "meaning": {"vi": "Thích", "ja": "好む・好きである"}, "examples": [{"ja": "音楽が好きですか？", "vi": "Bạn có thích âm nhạc không?"}], "care_example": {"ja": "「好きな音楽を流しましょうか？リラックスできますよ。」", "vi": "\"Suki na ongaku wo nagashimashou ka? Rirakkusu dekimasu yo.\""}},
      {"word": "きらい", "reading": "きらい", "kanji": "嫌い", "meaning": {"vi": "Ghét / Không thích", "ja": "好まない"}, "examples": [{"ja": "嫌いなものは無理に食べなくてもいいです。", "vi": "Không cần ép ăn thứ không thích."}], "care_example": {"ja": "「嫌いなものは記録しておき、食事から外します。」", "vi": "\"Kirai na mono wa kiroku shite oite, shokuji kara hazushimasu.\""}},
      {"word": "とくい", "reading": "とくい", "kanji": "得意", "meaning": {"vi": "Giỏi / Sở trường", "ja": "上手にできること"}, "examples": [{"ja": "料理が得意です。", "vi": "Tôi giỏi nấu ăn."}], "care_example": {"ja": "「昔から手芸が得意だったそうです。手芸レクを提案しましょう。」", "vi": "\"Mukashi kara shugei ga tokui datta sou desu. Shugei reku wo teian shimashou.\""}},
      {"word": "にがて", "reading": "にがて", "kanji": "苦手", "meaning": {"vi": "Không giỏi / Điểm yếu", "ja": "苦手・得意でない"}, "examples": [{"ja": "階段は苦手です。エレベーターを使いましょう。", "vi": "Tôi không giỏi leo cầu thang. Hãy dùng thang máy."}], "care_example": {"ja": "「お風呂が苦手な方には、シャワーや清拭でも対応できます。」", "vi": "\"Ofuro ga nigate na kata ni wa, shawaa ya seishiki demo taiou dekimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "趣味・好みの確認", "vi": "Xác nhận sở thích"},
      "scene": {"ja": "新入居者の個別ケア情報を収集する場面", "vi": "Thu thập thông tin chăm sóc cá nhân cho người mới vào ở"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、どんなことが好きですか？", "vi": "○○ san, bạn thích làm gì?"},
        {"speaker": "user", "ja": "昔から歌が好きです。カラオケが得意でした。", "vi": "Từ trước tôi thích hát. Tôi giỏi hát karaoke."},
        {"speaker": "staff", "ja": "そうですか！月一回カラオケのレクがあります。参加しませんか？", "vi": "Vậy à! Mỗi tháng có hoạt động hát karaoke một lần. Bạn có muốn tham gia không?"},
        {"speaker": "user", "ja": "ぜひ！でも人前は少し苦手ですが。", "vi": "Chắc chắn rồi! Nhưng tôi hơi ngại trước mặt nhiều người."}
      ],
      "key_phrases": [
        {"ja": "〜が得意でした", "vi": "Tôi đã giỏi〜 (quá khứ)", "note_vi": "Nói về sở trường trong quá khứ"},
        {"ja": "参加しませんか？", "vi": "Bạn có muốn tham gia không?", "note_vi": "Cách mời tham gia lịch sự"}
      ],
      "cultural_note": {"ja": "「嫌い」より「苦手」の方が柔らかい表現です。また「得意だった」は過去の自信を引き出す会話につながり、回想法として効果的です。", "vi": "\"Nigate\" nhẹ nhàng hơn \"kirai\". Ngoài ra, \"tokui datta\" (đã giỏi) dẫn đến cuộc trò chuyện khơi dậy sự tự tin trong quá khứ, hiệu quả như liệu pháp hồi ức."}
    }
  }',
  '[
    {"question": {"ja": "「得意」の意味は？", "vi": "\"得意\" có nghĩa là gì?"}, "options": [{"ja": "苦手なこと", "vi": "Điểm yếu"}, {"ja": "上手にできること・強み", "vi": "Làm giỏi, điểm mạnh"}, {"ja": "嫌いなこと", "vi": "Điều không thích"}, {"ja": "できないこと", "vi": "Không làm được"}], "correct": 1, "explanation": {"ja": "「得意（とくい）」は上手にできること・得意なことを意味します。", "vi": "\"Tokui\" có nghĩa là điều làm giỏi, điểm mạnh."}, "difficulty": "easy"},
    {"question": {"ja": "「嫌い」より柔らかい表現は？", "vi": "Cách diễn đạt nhẹ nhàng hơn \"嫌い\" là gì?"}, "options": [{"ja": "大嫌い", "vi": "Ghét lắm"}, {"ja": "苦手", "vi": "Không giỏi/Không thích"}, {"ja": "むり", "vi": "Không thể"}, {"ja": "だめ", "vi": "Không được"}], "correct": 1, "explanation": {"ja": "「苦手（にがて）」は「嫌い」より婉曲的でマイルドな表現です。", "vi": "\"Nigate\" là cách diễn đạt nhẹ nhàng và uyển chuyển hơn \"kirai\"."}, "difficulty": "easy"},
    {"question": {"ja": "利用者の「得意なこと」を知ることの介護的意義は？", "vi": "Ý nghĩa chăm sóc của việc biết \"sở trường\" của người dùng?"}, "options": [{"ja": "特に意味はない", "vi": "Không có ý nghĩa gì đặc biệt"}, {"ja": "得意なことを活かしたレクや活動でQOLが向上する", "vi": "QOL được nâng cao qua hoạt động tận dụng sở trường"}, {"ja": "比較して競わせるため", "vi": "Để so sánh và thi đua"}, {"ja": "記録の義務があるため", "vi": "Vì có nghĩa vụ ghi chép"}], "correct": 1, "explanation": {"ja": "得意なことを活かした活動は自己肯定感を高め、QOL向上につながります。", "vi": "Hoạt động tận dụng sở trường nâng cao lòng tự trọng và cải thiện QOL."}, "difficulty": "medium"},
    {"question": {"ja": "「お風呂が苦手」な利用者への対応は？", "vi": "Cách xử lý với người dùng \"không thích tắm\"?"}, "options": [{"ja": "無理に入浴させる", "vi": "Ép tắm"}, {"ja": "清潔保持を諦める", "vi": "Từ bỏ việc giữ vệ sinh"}, {"ja": "苦手な理由を確認し、シャワーや清拭など代替手段を検討", "vi": "Xác nhận lý do không thích và cân nhắc biện pháp thay thế như tắm vòi sen hoặc lau người"}, {"ja": "罰を与える", "vi": "Phạt"}], "correct": 2, "explanation": {"ja": "苦手な理由（不安・寒さ等）を把握し、シャワー・清拭・足浴など代替ケアを検討します。", "vi": "Nắm bắt lý do không thích (lo lắng, lạnh, v.v.) và cân nhắc chăm sóc thay thế như tắm vòi sen, lau người, ngâm chân."}, "difficulty": "medium"},
    {"question": {"ja": "「昔から〜が得意でした」という会話の介護的効果は？", "vi": "Hiệu quả chăm sóc của cuộc trò chuyện \"ngày xưa tôi giỏi〜\"?"}, "options": [{"ja": "特に効果なし", "vi": "Không có hiệu quả gì"}, {"ja": "過去の成功体験を引き出す回想法として精神的安定に効果的", "vi": "Hiệu quả trong liệu pháp hồi ức để khơi dậy trải nghiệm thành công trong quá khứ, ổn định tâm lý"}, {"ja": "競争心を刺激するため", "vi": "Để kích thích tính cạnh tranh"}, {"ja": "記録のため", "vi": "Để ghi chép"}], "correct": 1, "explanation": {"ja": "過去の得意なことを語ることは回想法として自己肯定感を高め、認知症ケアにも有効です。", "vi": "Kể về sở trường trong quá khứ là liệu pháp hồi ức nâng cao lòng tự trọng, cũng hiệu quả trong chăm sóc sa sút trí tuệ."}, "difficulty": "hard"}
  ]',
  32, 20
);

-- Unit 9: 身体・健康 (Lessons 33-36)

-- Lesson 33: あたま・め・みみ・はな
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 9 Lesson 33: 身体①（顔・頭部）", "vi": "Unit 9 Bài 33: Cơ thể ① (Mặt, đầu)"}',
  '{
    "type": "vocabulary",
    "unit": 9,
    "lesson_number": 33,
    "intro": {"ja": "身体の部位を覚えましょう。痛みの場所を確認するのに必須です！", "vi": "Hãy nhớ các bộ phận cơ thể. Cần thiết để xác nhận vị trí đau!"},
    "words": [
      {"word": "あたま", "reading": "あたま", "kanji": "頭", "meaning": {"vi": "Đầu", "ja": "頭部"}, "examples": [{"ja": "頭が痛いです。", "vi": "Tôi bị đau đầu."}], "care_example": {"ja": "「頭が痛い場合は、看護師に報告してください。」", "vi": "\"Atama ga itai baai wa, kango shi ni houkoku shite kudasai.\""}},
      {"word": "め", "reading": "め", "kanji": "目", "meaning": {"vi": "Mắt", "ja": "視覚器官"}, "examples": [{"ja": "目が見えにくいですか？", "vi": "Bạn có khó nhìn không?"}], "care_example": {"ja": "「目の充血や目やにがある場合は報告してください。」", "vi": "\"Me no juuketsu ya meyani ga aru baai wa houkoku shite kudasai.\""}},
      {"word": "みみ", "reading": "みみ", "kanji": "耳", "meaning": {"vi": "Tai", "ja": "聴覚器官"}, "examples": [{"ja": "耳が聞こえにくいですか？", "vi": "Bạn có khó nghe không?"}], "care_example": {"ja": "「耳の聞こえが悪い方には、正面からゆっくり話しかけましょう。」", "vi": "\"Mimi no kikoe ga warui kata ni wa, shoumen kara yukkuri hanashikakemashou.\""}},
      {"word": "はな", "reading": "はな", "kanji": "鼻", "meaning": {"vi": "Mũi", "ja": "嗅覚器官・呼吸器官"}, "examples": [{"ja": "鼻が詰まっています。", "vi": "Mũi tôi bị nghẹt."}], "care_example": {"ja": "「鼻水・鼻詰まりは風邪のサインかもしれません。体温を測りましょう。」", "vi": "\"Hanamizu, hana zumari wa kaze no sain kamo shiremasen. Taion wo hakarimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "痛みの場所確認", "vi": "Xác nhận vị trí đau"},
      "scene": {"ja": "利用者が体の不調を訴える場面", "vi": "Người dùng phàn nàn về sức khỏe"},
      "lines": [
        {"speaker": "user", "ja": "なんか頭が痛くて…", "vi": "Tôi cảm thấy đau đầu..."},
        {"speaker": "staff", "ja": "頭が痛いんですね。どのくらいから痛いですか？", "vi": "Bạn đau đầu à. Đã đau từ bao lâu rồi?"},
        {"speaker": "user", "ja": "朝から少し。目もぼんやりします。", "vi": "Từ sáng một chút. Mắt cũng mờ."},
        {"speaker": "staff", "ja": "わかりました。体温と血圧を測って、看護師に報告します。", "vi": "Tôi hiểu rồi. Tôi đo nhiệt độ và huyết áp rồi báo y tá."}
      ],
      "key_phrases": [
        {"ja": "〜が痛い", "vi": "〜 đau", "note_vi": "Cách diễn đạt đau ở bộ phận cụ thể"},
        {"ja": "どのくらいから？", "vi": "Từ bao lâu rồi?", "note_vi": "Hỏi thời gian khởi phát triệu chứng"}
      ],
      "cultural_note": {"ja": "利用者が訴える体の痛みは必ず記録し、看護師に報告します。「少し」という表現でも見逃さないことが大切です。", "vi": "Đau cơ thể mà người dùng phàn nàn phải được ghi chép và báo cáo cho y tá. Quan trọng là không bỏ qua ngay cả khi họ nói \"một chút\"."}
    }
  }',
  '[
    {"question": {"ja": "「頭が痛い」はどんな症状？", "vi": "\"Atama ga itai\" là triệu chứng gì?"}, "options": [{"ja": "お腹の痛み", "vi": "Đau bụng"}, {"ja": "足の痛み", "vi": "Đau chân"}, {"ja": "頭痛", "vi": "Đau đầu"}, {"ja": "腰の痛み", "vi": "Đau lưng"}], "correct": 2, "explanation": {"ja": "「頭（あたま）が痛い」は頭痛を意味します。", "vi": "\"Atama ga itai\" có nghĩa là đau đầu."}, "difficulty": "easy"},
    {"question": {"ja": "耳が聞こえにくい方への話しかけ方は？", "vi": "Cách nói chuyện với người khó nghe?"}, "options": [{"ja": "後ろから大声で叫ぶ", "vi": "Hét to từ phía sau"}, {"ja": "正面からゆっくりはっきり話す", "vi": "Nói từ phía trước, chậm và rõ ràng"}, {"ja": "早口で話す", "vi": "Nói nhanh"}, {"ja": "筆談のみ", "vi": "Chỉ viết chữ"}], "correct": 1, "explanation": {"ja": "聴覚障害のある方には正面からゆっくりはっきり話しかけます。", "vi": "Với người có khó khăn thính giác, nói từ phía trước, chậm và rõ ràng."}, "difficulty": "medium"},
    {"question": {"ja": "「目」の読み方は？", "vi": "Cách đọc của \"目\" là gì?"}, "options": [{"ja": "みみ", "vi": "Mimi"}, {"ja": "はな", "vi": "Hana"}, {"ja": "あたま", "vi": "Atama"}, {"ja": "め", "vi": "Me"}], "correct": 3, "explanation": {"ja": "「目」は「め」と読み、視覚器官です。", "vi": "\"目\" đọc là \"me\", là cơ quan thị giác."}, "difficulty": "easy"},
    {"question": {"ja": "鼻水・鼻詰まりがある場合の対応は？", "vi": "Khi có chảy mũi hoặc nghẹt mũi, cách xử lý?"}, "options": [{"ja": "無視する", "vi": "Bỏ qua"}, {"ja": "風邪のサインとして体温測定・看護師報告", "vi": "Đo nhiệt độ như dấu hiệu cảm và báo y tá"}, {"ja": "薬を自分で選んで渡す", "vi": "Tự chọn thuốc và đưa"}, {"ja": "家族に電話する", "vi": "Gọi điện cho gia đình"}], "correct": 1, "explanation": {"ja": "鼻水・鼻詰まりは感染症のサインの可能性があります。体温を測り看護師に報告します。", "vi": "Chảy mũi và nghẹt mũi có thể là dấu hiệu bệnh truyền nhiễm. Đo nhiệt độ và báo y tá."}, "difficulty": "medium"},
    {"question": {"ja": "利用者が「少し頭が痛い」と言った時の適切な対応は？", "vi": "Khi người dùng nói \"đau đầu một chút\", cách xử lý phù hợp?"}, "options": [{"ja": "「少しなら大丈夫」と放置する", "vi": "Bỏ qua vì \"chỉ một chút thì không sao\""}, {"ja": "「少し」でも記録・バイタル測定・看護師報告", "vi": "Dù \"một chút\" vẫn ghi chép, đo sinh hiệu và báo y tá"}, {"ja": "市販薬を渡す", "vi": "Đưa thuốc không kê đơn"}, {"ja": "しばらく待つ", "vi": "Chờ một lúc"}], "correct": 1, "explanation": {"ja": "「少し」という表現でも疾患の初期症状である可能性があります。必ず記録・測定・報告します。", "vi": "Dù nói \"một chút\" cũng có thể là triệu chứng ban đầu của bệnh. Phải luôn ghi chép, đo và báo cáo."}, "difficulty": "hard"}
  ]',
  33, 20
);

-- Lesson 34: て・あし・おなか・こし
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 9 Lesson 34: 身体②（手・足・胴体）", "vi": "Unit 9 Bài 34: Cơ thể ② (Tay, chân, thân)"}',
  '{
    "type": "vocabulary",
    "unit": 9,
    "lesson_number": 34,
    "intro": {"ja": "手・足・腰など介護でよく使う身体部位を学びましょう。", "vi": "Học các bộ phận cơ thể thường dùng trong chăm sóc như tay, chân, lưng."},
    "words": [
      {"word": "て", "reading": "て", "kanji": "手", "meaning": {"vi": "Tay", "ja": "手・腕"}, "examples": [{"ja": "手を貸しましょうか？", "vi": "Để tôi giúp một tay nhé?"}], "care_example": {"ja": "「手すりをしっかり持ってください。」", "vi": "\"Tesuri wo shikkari motte kudasai.\""}},
      {"word": "あし", "reading": "あし", "kanji": "足", "meaning": {"vi": "Chân / Bàn chân", "ja": "足・下肢"}, "examples": [{"ja": "足が痛いですか？", "vi": "Chân bạn có đau không?"}], "care_example": {"ja": "「足がむくんでいますね。看護師に報告します。」", "vi": "\"Ashi ga mukunde imasu ne. Kangoshi ni houkoku shimasu.\""}},
      {"word": "おなか", "reading": "おなか", "kanji": "お腹", "meaning": {"vi": "Bụng", "ja": "腹部"}, "examples": [{"ja": "お腹が痛いですか？", "vi": "Bụng bạn có đau không?"}], "care_example": {"ja": "「お腹の具合はいかがですか？（排便確認）」", "vi": "\"Onaka no guai wa ikaga desu ka? (Kiểm tra đại tiện)\""}},
      {"word": "こし", "reading": "こし", "kanji": "腰", "meaning": {"vi": "Lưng / Eo", "ja": "腰部・下背部"}, "examples": [{"ja": "腰が痛くて起き上がれません。", "vi": "Lưng đau không đứng dậy được."}], "care_example": {"ja": "「腰痛のある方の移乗介助は、腰への負担を考えて行います。」", "vi": "\"Youtsuu no aru kata no ijou kaijo wa, koshi he no futan wo kangaete okonaimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "移乗介助前の確認", "vi": "Kiểm tra trước hỗ trợ chuyển tư thế"},
      "scene": {"ja": "ベッドから車いすへの移乗前の確認", "vi": "Kiểm tra trước khi chuyển từ giường sang xe lăn"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、車いすに移りましょうか。腰は大丈夫ですか？", "vi": "○○ san, chúng ta chuyển sang xe lăn nhé. Lưng bạn có ổn không?"},
        {"speaker": "user", "ja": "腰が少し痛いです。足もむくんでいて。", "vi": "Lưng hơi đau. Chân cũng bị phù."},
        {"speaker": "staff", "ja": "わかりました。ゆっくり一緒に動きましょう。手すりを持ってください。", "vi": "Tôi hiểu rồi. Chúng ta cùng di chuyển từ từ. Hãy nắm thanh tay vịn."},
        {"speaker": "user", "ja": "ありがとうございます。", "vi": "Cảm ơn bạn."}
      ],
      "key_phrases": [
        {"ja": "ゆっくり一緒に動きましょう", "vi": "Cùng di chuyển từ từ nhé", "note_vi": "Hướng dẫn di chuyển an toàn"},
        {"ja": "手すりを持ってください", "vi": "Hãy nắm thanh tay vịn", "note_vi": "Chỉ dẫn phòng ngừa té ngã"}
      ],
      "cultural_note": {"ja": "足のむくみは心臓・腎臓疾患のサインの可能性があります。必ず看護師に報告しましょう。", "vi": "Phù chân có thể là dấu hiệu của bệnh tim hoặc thận. Nhất định phải báo cáo cho y tá."}
    }
  }',
  '[
    {"question": {"ja": "「足がむくんでいる」場合の対応は？", "vi": "Khi \"chân bị phù\", cách xử lý?"}, "options": [{"ja": "様子を見る", "vi": "Chờ xem"}, {"ja": "看護師に報告する", "vi": "Báo cáo cho y tá"}, {"ja": "マッサージだけする", "vi": "Chỉ massage"}, {"ja": "利用者には言わない", "vi": "Không nói với người dùng"}], "correct": 1, "explanation": {"ja": "足のむくみは心臓・腎臓の問題のサインの可能性があるため、看護師に報告します。", "vi": "Phù chân có thể là dấu hiệu vấn đề tim hoặc thận nên báo cáo cho y tá."}, "difficulty": "medium"},
    {"question": {"ja": "「腰」の読み方は？", "vi": "Cách đọc của \"腰\" là gì?"}, "options": [{"ja": "て", "vi": "Te"}, {"ja": "あし", "vi": "Ashi"}, {"ja": "こし", "vi": "Koshi"}, {"ja": "おなか", "vi": "Onaka"}], "correct": 2, "explanation": {"ja": "「腰」は「こし」と読み、腰部のことです。", "vi": "\"腰\" đọc là \"koshi\", là vùng lưng dưới."}, "difficulty": "easy"},
    {"question": {"ja": "移乗介助前に確認すべきことは？", "vi": "Điều cần xác nhận trước khi hỗ trợ chuyển tư thế?"}, "options": [{"ja": "天気", "vi": "Thời tiết"}, {"ja": "本人の痛みの有無・体調確認", "vi": "Kiểm tra đau và tình trạng sức khỏe của người dùng"}, {"ja": "食事の内容", "vi": "Nội dung bữa ăn"}, {"ja": "担当者の名前", "vi": "Tên người phụ trách"}], "correct": 1, "explanation": {"ja": "移乗前は腰・関節の痛みや体調を確認してから安全に行います。", "vi": "Trước khi chuyển tư thế, xác nhận đau lưng, khớp và tình trạng sức khỏe rồi thực hiện an toàn."}, "difficulty": "medium"},
    {"question": {"ja": "「手を貸しましょうか」の意味は？", "vi": "\"Te wo kashimashou ka\" có nghĩa là gì?"}, "options": [{"ja": "手を借りてもいいですか？", "vi": "Tôi có thể mượn tay bạn không?"}, {"ja": "お手伝いしましょうか？", "vi": "Tôi giúp bạn nhé?"}, {"ja": "手を洗いましょうか？", "vi": "Chúng ta rửa tay nhé?"}, {"ja": "手が痛いですか？", "vi": "Tay bạn có đau không?"}], "correct": 1, "explanation": {"ja": "「手を貸す」は「手伝う・助ける」という意味の慣用表現です。", "vi": "\"Te wo kasu\" là thành ngữ có nghĩa là \"giúp đỡ\"."}, "difficulty": "easy"},
    {"question": {"ja": "「腰痛のある方の移乗介助」で注意すべきことは？", "vi": "Điều cần chú ý trong \"hỗ trợ chuyển tư thế cho người đau lưng\"?"}, "options": [{"ja": "素早く動かす", "vi": "Di chuyển nhanh"}, {"ja": "一人で全て行う", "vi": "Một mình làm tất cả"}, {"ja": "腰への負担を最小限に、二人介助や福祉用具を活用", "vi": "Giảm thiểu gánh nặng lưng, sử dụng hỗ trợ 2 người hoặc dụng cụ phúc lợi"}, {"ja": "痛みを我慢してもらう", "vi": "Để họ chịu đau"}], "correct": 2, "explanation": {"ja": "腰痛のある方の移乗は腰への負担を最小限にし、必要に応じて二人介助やスライディングボード等を活用します。", "vi": "Khi chuyển tư thế người đau lưng, giảm thiểu gánh nặng lưng và sử dụng hỗ trợ 2 người hoặc bảng trượt khi cần."}, "difficulty": "hard"}
  ]',
  34, 20
);

-- Lesson 35: いたい・ねつ・くすり・びょういん
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 9 Lesson 35: 健康・医療①（症状・治療）", "vi": "Unit 9 Bài 35: Sức khỏe, y tế ① (Triệu chứng, điều trị)"}',
  '{
    "type": "vocabulary",
    "unit": 9,
    "lesson_number": 35,
    "intro": {"ja": "症状や医療に関する基本語彙を学びましょう。", "vi": "Học từ vựng cơ bản về triệu chứng và y tế."},
    "words": [
      {"word": "いたい", "reading": "いたい", "kanji": "痛い", "meaning": {"vi": "Đau", "ja": "痛みがある"}, "examples": [{"ja": "どこが痛いですか？", "vi": "Bạn đau ở đâu?"}], "care_example": {"ja": "「痛い場所を指で教えてもらえますか？」", "vi": "\"Itai basho wo yubi de oshiete moraemasu ka?\""}},
      {"word": "ねつ", "reading": "ねつ", "kanji": "熱", "meaning": {"vi": "Sốt / Nhiệt", "ja": "発熱"}, "examples": [{"ja": "熱がありますか？", "vi": "Bạn có bị sốt không?"}], "care_example": {"ja": "「体温が三十七度八分あります。熱があります。看護師を呼びます。」", "vi": "\"Taion ga sanjuushichi do hachibus arimasu. Netsu ga arimasu. Kangoshi wo yobimasu.\""}},
      {"word": "くすり", "reading": "くすり", "kanji": "薬", "meaning": {"vi": "Thuốc", "ja": "医薬品"}, "examples": [{"ja": "お薬を飲む時間です。", "vi": "Đến giờ uống thuốc rồi."}], "care_example": {"ja": "「薬の飲み忘れがないよう、服薬確認を行います。」", "vi": "\"Kusuri no nomiwasure ga nai you ni, fukuyaku kakunin wo okonaimasu.\""}},
      {"word": "びょういん", "reading": "びょういん", "kanji": "病院", "meaning": {"vi": "Bệnh viện", "ja": "医療機関"}, "examples": [{"ja": "明日、病院に行きます。", "vi": "Ngày mai tôi đi bệnh viện."}], "care_example": {"ja": "「急変時は病院への緊急搬送が必要です。」", "vi": "\"Kyuuhen ji wa byouin he no kinkyuu hansou ga hitsuyou desu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "体調急変の対応", "vi": "Đối ứng khi sức khỏe đột ngột thay đổi"},
      "scene": {"ja": "利用者の体調が急変した場面", "vi": "Sức khỏe người dùng đột ngột thay đổi"},
      "lines": [
        {"speaker": "user", "ja": "なんか、胸が痛い…苦しい。", "vi": "Sao tôi thấy đau ngực... khó thở."},
        {"speaker": "staff", "ja": "すぐ看護師を呼びます！動かないでください。", "vi": "Tôi gọi y tá ngay! Đừng di chuyển."},
        {"speaker": "nurse", "ja": "体温38度、血圧180あります。今すぐ病院に連絡します。", "vi": "Nhiệt độ 38 độ, huyết áp 180. Tôi liên lạc bệnh viện ngay."},
        {"speaker": "staff", "ja": "家族への連絡は私がします。", "vi": "Tôi sẽ liên lạc gia đình."}
      ],
      "key_phrases": [
        {"ja": "すぐ看護師を呼びます", "vi": "Tôi gọi y tá ngay", "note_vi": "Hành động ngay lập tức trong trường hợp khẩn cấp"},
        {"ja": "動かないでください", "vi": "Đừng di chuyển", "note_vi": "Chỉ dẫn quan trọng khi nghi ngờ cấp cứu"}
      ],
      "cultural_note": {"ja": "急変時の対応：①声かけ②看護師への即報告③動かさない④必要なら119番。介護士は医療行為はできませんが、即時報告と安全確保が重要です。", "vi": "Đối ứng khi cấp cứu: ① Gọi hỏi ② Báo y tá ngay ③ Không di chuyển ④ Gọi 119 nếu cần. Nhân viên chăm sóc không thể thực hiện y tế nhưng báo cáo ngay và đảm bảo an toàn là quan trọng."}
    }
  }',
  '[
    {"question": {"ja": "「熱がある」とはどういう意味？", "vi": "\"Netsu ga aru\" có nghĩa là gì?"}, "options": [{"ja": "頭が痛い", "vi": "Đau đầu"}, {"ja": "発熱している", "vi": "Đang sốt"}, {"ja": "食欲がない", "vi": "Không có cảm giác ngon miệng"}, {"ja": "眠れない", "vi": "Không ngủ được"}], "correct": 1, "explanation": {"ja": "「熱（ねつ）がある」は発熱していることを意味します。", "vi": "\"Netsu ga aru\" có nghĩa là đang sốt."}, "difficulty": "easy"},
    {"question": {"ja": "利用者が「胸が痛い・苦しい」と訴えた時の最初の対応は？", "vi": "Khi người dùng kêu \"đau ngực, khó thở\", hành động đầu tiên?"}, "options": [{"ja": "様子を見る", "vi": "Chờ xem"}, {"ja": "水を飲ませる", "vi": "Cho uống nước"}, {"ja": "すぐに看護師を呼ぶ", "vi": "Gọi y tá ngay"}, {"ja": "家族に電話する", "vi": "Gọi điện cho gia đình"}], "correct": 2, "explanation": {"ja": "胸痛・呼吸困難は心筋梗塞等の可能性があります。すぐに看護師を呼びます。", "vi": "Đau ngực và khó thở có thể là nhồi máu cơ tim. Gọi y tá ngay."}, "difficulty": "medium"},
    {"question": {"ja": "「薬の飲み忘れ」を防ぐための対応は？", "vi": "Cách phòng ngừa \"quên uống thuốc\"?"}, "options": [{"ja": "利用者が自分で管理する", "vi": "Người dùng tự quản lý"}, {"ja": "服薬時に確認し、飲んだことを記録する", "vi": "Xác nhận khi uống thuốc và ghi chép vào hồ sơ"}, {"ja": "まとめて飲ませる", "vi": "Cho uống một lúc"}, {"ja": "薬は重要でないので確認しない", "vi": "Thuốc không quan trọng nên không cần xác nhận"}], "correct": 1, "explanation": {"ja": "服薬確認は介護の基本です。飲んだことを必ず記録します。", "vi": "Xác nhận uống thuốc là cơ bản trong chăm sóc. Phải ghi chép vào hồ sơ sau khi uống."}, "difficulty": "medium"},
    {"question": {"ja": "「薬（くすり）」の読み方は？", "vi": "Cách đọc của \"薬（くすり）\" là gì?"}, "options": [{"ja": "くすり", "vi": "Kusuri"}, {"ja": "びょうき", "vi": "Byouki"}, {"ja": "ねつ", "vi": "Netsu"}, {"ja": "いたみ", "vi": "Itami"}], "correct": 0, "explanation": {"ja": "「薬」は「くすり」と読みます。", "vi": "\"薬\" đọc là \"kusuri\"."}, "difficulty": "easy"},
    {"question": {"ja": "急変時に介護士が行うべきでないことは？", "vi": "Việc nhân viên chăm sóc không nên làm khi có cấp cứu?"}, "options": [{"ja": "看護師への即報告", "vi": "Báo cáo ngay cho y tá"}, {"ja": "安全な体位の確保", "vi": "Đảm bảo tư thế an toàn"}, {"ja": "自己判断での点滴実施", "vi": "Tự ý thực hiện truyền dịch"}, {"ja": "家族への連絡", "vi": "Liên lạc với gia đình"}], "correct": 2, "explanation": {"ja": "点滴等の医療行為は介護士には許可されていません。看護師・医師が行います。", "vi": "Truyền dịch và các hành vi y tế không được phép với nhân viên chăm sóc. Y tá và bác sĩ mới được thực hiện."}, "difficulty": "hard"}
  ]',
  35, 20
);

-- Lesson 36: ねる・おきる・あるく・すわる
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 9 Lesson 36: 動作・ADL", "vi": "Unit 9 Bài 36: Động tác và ADL (Hoạt động hàng ngày)"}',
  '{
    "type": "vocabulary",
    "unit": 9,
    "lesson_number": 36,
    "intro": {"ja": "日常生活動作（ADL）に関する動詞を学びましょう。", "vi": "Học các động từ liên quan đến hoạt động cuộc sống hàng ngày (ADL)."},
    "words": [
      {"word": "ねる", "reading": "ねる", "kanji": "寝る", "meaning": {"vi": "Ngủ / Nằm xuống", "ja": "就寝・横になる"}, "examples": [{"ja": "もう寝ますか？", "vi": "Bạn đi ngủ chưa?"}], "care_example": {"ja": "「就寝介助：「そろそろ寝ましょうか。」」", "vi": "Hỗ trợ ngủ: \"Sorosoro nemashou ka.\""}},
      {"word": "おきる", "reading": "おきる", "kanji": "起きる", "meaning": {"vi": "Thức dậy / Ngồi dậy", "ja": "起床・ベッドから起き上がる"}, "examples": [{"ja": "起き上がれますか？", "vi": "Bạn có thể ngồi dậy không?"}], "care_example": {"ja": "「起床介助：「○○さん、朝ですよ。起きましょうか。」」", "vi": "Hỗ trợ thức dậy: \"○○ san, asa desu yo. Okimashou ka.\""}},
      {"word": "あるく", "reading": "あるく", "kanji": "歩く", "meaning": {"vi": "Đi bộ", "ja": "歩行する"}, "examples": [{"ja": "少し歩きましょうか？", "vi": "Chúng ta đi bộ một chút nhé?"}], "care_example": {"ja": "「歩行介助：「杖を持って、ゆっくり歩きましょう。」」", "vi": "Hỗ trợ đi bộ: \"Tsue wo motte, yukkuri arukimashou.\""}},
      {"word": "すわる", "reading": "すわる", "kanji": "座る", "meaning": {"vi": "Ngồi", "ja": "椅子やベッドに座る"}, "examples": [{"ja": "椅子に座ってください。", "vi": "Xin hãy ngồi vào ghế."}], "care_example": {"ja": "「食事の前に椅子に座ってください。姿勢を整えましょう。」", "vi": "\"Shokuji no mae ni isu ni suwatte kudasai. Shisei wo totonoemas hou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "朝の起床介助", "vi": "Hỗ trợ thức dậy buổi sáng"},
      "scene": {"ja": "朝の起床介助の場面", "vi": "Cảnh hỗ trợ thức dậy buổi sáng"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、おはようございます。朝ですよ。起きましょうか？", "vi": "○○ san, chào buổi sáng. Sáng rồi đấy. Chúng ta dậy nhé?"},
        {"speaker": "user", "ja": "うーん、まだ眠いです。", "vi": "Ừm, tôi vẫn còn buồn ngủ."},
        {"speaker": "staff", "ja": "もう少しで朝食ですよ。座れますか？ゆっくりでいいです。", "vi": "Sắp đến bữa sáng rồi đấy. Bạn có thể ngồi dậy không? Từ từ cũng được."},
        {"speaker": "user", "ja": "じゃあ、起きます。手伝ってください。", "vi": "Vậy thì tôi dậy. Hãy giúp tôi nhé."}
      ],
      "key_phrases": [
        {"ja": "ゆっくりでいいです", "vi": "Từ từ cũng được", "note_vi": "Cách khuyến khích không tạo áp lực"},
        {"ja": "手伝ってください", "vi": "Hãy giúp tôi", "note_vi": "Người dùng yêu cầu hỗ trợ"}
      ],
      "cultural_note": {"ja": "ADL（日常生活動作）のサポートは、自立を尊重しながら必要最小限の支援を行う「自立支援介護」が基本です。", "vi": "Hỗ trợ ADL (Hoạt động cuộc sống hàng ngày) dựa trên \"chăm sóc hỗ trợ tự lập\", cung cấp hỗ trợ tối thiểu cần thiết trong khi tôn trọng tự lập của người dùng."}
    }
  }',
  '[
    {"question": {"ja": "「起きる」の意味は？", "vi": "\"起きる\" có nghĩa là gì?"}, "options": [{"ja": "寝る", "vi": "Ngủ"}, {"ja": "歩く", "vi": "Đi bộ"}, {"ja": "座る", "vi": "Ngồi"}, {"ja": "起床・起き上がる", "vi": "Thức dậy, ngồi dậy"}], "correct": 3, "explanation": {"ja": "「起きる（おきる）」は起床すること・ベッドから起き上がることです。", "vi": "\"Okiru\" là thức dậy hoặc ngồi dậy trên giường."}, "difficulty": "easy"},
    {"question": {"ja": "「歩行介助」で使う杖の持ち方の指示は？", "vi": "Chỉ dẫn về cách cầm gậy trong \"hỗ trợ đi bộ\"?"}, "options": [{"ja": "杖を持って歩きましょう", "vi": "Hãy cầm gậy và đi bộ"}, {"ja": "杖を捨てて歩きましょう", "vi": "Hãy bỏ gậy và đi bộ"}, {"ja": "杖はいりません", "vi": "Không cần gậy"}, {"ja": "杖を両手に持ちましょう", "vi": "Hãy cầm gậy bằng cả hai tay"}], "correct": 0, "explanation": {"ja": "「杖を持って、ゆっくり歩きましょう」が基本的な歩行介助の声かけです。", "vi": "\"Tsue wo motte, yukkuri arukimashou\" là lời hướng dẫn cơ bản trong hỗ trợ đi bộ."}, "difficulty": "easy"},
    {"question": {"ja": "ADL（日常生活動作）に含まれないものは？", "vi": "Điều nào không thuộc ADL (Hoạt động cuộc sống hàng ngày)?"}, "options": [{"ja": "起床・就寝", "vi": "Thức dậy, ngủ"}, {"ja": "歩行・移動", "vi": "Đi bộ, di chuyển"}, {"ja": "食事・排泄", "vi": "Ăn uống, đại tiểu tiện"}, {"ja": "株式投資", "vi": "Đầu tư chứng khoán"}], "correct": 3, "explanation": {"ja": "ADLは基本的な日常生活動作（起床・就寝・歩行・食事・排泄・入浴等）を指します。", "vi": "ADL chỉ các hoạt động cuộc sống hàng ngày cơ bản (thức dậy, ngủ, đi bộ, ăn uống, đại tiểu tiện, tắm rửa, v.v.)."}, "difficulty": "medium"},
    {"question": {"ja": "「自立支援介護」の考え方は？", "vi": "Quan điểm của \"chăm sóc hỗ trợ tự lập\" là gì?"}, "options": [{"ja": "全てスタッフがやる", "vi": "Nhân viên làm tất cả"}, {"ja": "何もしない", "vi": "Không làm gì"}, {"ja": "できることは本人にやってもらい、必要最小限の支援をする", "vi": "Để người dùng tự làm điều có thể và hỗ trợ tối thiểu cần thiết"}, {"ja": "早く終わらせる", "vi": "Kết thúc nhanh"}], "correct": 2, "explanation": {"ja": "自立支援介護とは、本人の残存能力を活かし、必要最小限の支援を行うことです。", "vi": "Chăm sóc hỗ trợ tự lập là tận dụng năng lực còn lại của người dùng và cung cấp hỗ trợ tối thiểu cần thiết."}, "difficulty": "medium"},
    {"question": {"ja": "食事前に座る際の姿勢の重要性は？", "vi": "Tầm quan trọng của tư thế ngồi trước bữa ăn?"}, "options": [{"ja": "特に重要でない", "vi": "Không đặc biệt quan trọng"}, {"ja": "誤嚥予防・安全な食事摂取のため", "vi": "Phòng ngừa sặc và ăn uống an toàn"}, {"ja": "見た目のため", "vi": "Vì vẻ ngoài"}, {"ja": "ルールだから", "vi": "Vì quy định"}], "correct": 1, "explanation": {"ja": "適切な座位姿勢は誤嚥（ごえん）を防ぎ、安全な食事摂取につながります。", "vi": "Tư thế ngồi phù hợp phòng ngừa sặc và dẫn đến ăn uống an toàn."}, "difficulty": "hard"}
  ]',
  36, 20
);

-- Unit 10: 介護動詞・専門表現 (Lessons 37-40)

-- Lesson 37: てつだう・たすける・みまもる・きく
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 10 Lesson 37: 介護動詞①（支援・見守り）", "vi": "Unit 10 Bài 37: Động từ chăm sóc ① (Hỗ trợ, giám sát)"}',
  '{
    "type": "vocabulary",
    "unit": 10,
    "lesson_number": 37,
    "intro": {"ja": "介護の仕事でよく使う動詞を学びましょう。", "vi": "Học các động từ thường dùng trong công việc chăm sóc."},
    "words": [
      {"word": "てつだう", "reading": "てつだう", "kanji": "手伝う", "meaning": {"vi": "Giúp đỡ / Hỗ trợ", "ja": "支援する・助ける"}, "examples": [{"ja": "食事の準備を手伝います。", "vi": "Tôi giúp chuẩn bị bữa ăn."}], "care_example": {"ja": "「必要な時だけ手伝うのが自立支援介護の基本です。」", "vi": "\"Hitsuyou na toki dake tetsudau no ga jiritsu shien kaigo no kihon desu.\""}},
      {"word": "たすける", "reading": "たすける", "kanji": "助ける", "meaning": {"vi": "Cứu giúp / Giúp đỡ (khẩn cấp)", "ja": "危険から救う・助けに行く"}, "examples": [{"ja": "助けてください！", "vi": "Cứu tôi với!"}], "care_example": {"ja": "「転倒しそうな時は「助けます！」と声をかけながら支えます。」", "vi": "\"Tentou shisou na toki wa 'tasukemasu!' to koe wo kakete sasaemasu.\""}},
      {"word": "みまもる", "reading": "みまもる", "kanji": "見守る", "meaning": {"vi": "Giám sát / Trông chừng", "ja": "安全を確認しながら見ている"}, "examples": [{"ja": "歩行を見守ります。", "vi": "Tôi trông chừng việc đi bộ."}], "care_example": {"ja": "「見守り介助：必要に応じて手を差し伸べながら、本人の自立を尊重します。」", "vi": "\"Mimamori kaijo: hitsuyou ni ouji te wo sashinobenagara, honnin no jiritsu wo sonchuu shimasu.\""}},
      {"word": "きく", "reading": "きく", "kanji": "聞く", "meaning": {"vi": "Nghe / Hỏi", "ja": "聞こえる・質問する"}, "examples": [{"ja": "体調を聞いてみます。", "vi": "Tôi hỏi thăm sức khỏe."}], "care_example": {"ja": "「利用者さんの話をしっかり聞くことが信頼関係の基本です。」", "vi": "\"Riyousha san no hanashi wo shikkari kiku koto ga shinrai kankei no kihon desu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "見守り介助の実践", "vi": "Thực hành hỗ trợ giám sát"},
      "scene": {"ja": "歩行訓練中の見守り場面", "vi": "Cảnh giám sát trong quá trình tập đi bộ"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、歩く練習をしましょうか。私が見守ります。", "vi": "○○ san, chúng ta tập đi bộ nhé. Tôi sẽ trông chừng."},
        {"speaker": "user", "ja": "転んだら助けてくれますか？", "vi": "Nếu tôi ngã thì bạn sẽ giúp không?"},
        {"speaker": "staff", "ja": "もちろんです。すぐに手伝います。でもできるだけ自分で歩いてみてください。", "vi": "Tất nhiên rồi. Tôi giúp ngay. Nhưng hãy cố gắng tự đi bộ nhiều nhất có thể."},
        {"speaker": "user", "ja": "わかりました。やってみます。", "vi": "Tôi hiểu rồi. Tôi sẽ thử."}
      ],
      "key_phrases": [
        {"ja": "見守ります", "vi": "Tôi sẽ trông chừng", "note_vi": "Cam kết giám sát an toàn"},
        {"ja": "できるだけ自分で", "vi": "Tự làm nhiều nhất có thể", "note_vi": "Khuyến khích tự lập"}
      ],
      "cultural_note": {"ja": "「見守る」は単なる監視ではなく、本人の自立を尊重しながら安全を確保するケアの姿勢です。", "vi": "\"Mimamoru\" không phải chỉ là giám sát mà là thái độ chăm sóc đảm bảo an toàn trong khi tôn trọng sự tự lập của người dùng."}
    }
  }',
  '[
    {"question": {"ja": "「見守る」の正しい介護的意味は？", "vi": "Nghĩa chăm sóc đúng của \"見守る\" là gì?"}, "options": [{"ja": "監視カメラで見る", "vi": "Quan sát qua camera"}, {"ja": "自立を尊重しながら安全を確保する", "vi": "Đảm bảo an toàn trong khi tôn trọng tự lập"}, {"ja": "全て代わりにやる", "vi": "Làm thay tất cả"}, {"ja": "無視する", "vi": "Bỏ qua"}], "correct": 1, "explanation": {"ja": "見守りとは本人の自立を尊重しながら、必要な時に支援できるよう傍にいることです。", "vi": "\"Mimamoru\" là ở bên cạnh để có thể hỗ trợ khi cần thiết trong khi tôn trọng tự lập của người dùng."}, "difficulty": "medium"},
    {"question": {"ja": "「助けてください！」はどんな場面で使う？", "vi": "\"Tasukete kudasai!\" dùng trong tình huống nào?"}, "options": [{"ja": "食事の時", "vi": "Khi ăn"}, {"ja": "緊急時・危険な時", "vi": "Khi khẩn cấp, nguy hiểm"}, {"ja": "就寝時", "vi": "Khi ngủ"}, {"ja": "挨拶の時", "vi": "Khi chào hỏi"}], "correct": 1, "explanation": {"ja": "「助けてください」は緊急・危険な状況で使う表現です。", "vi": "\"Tasukete kudasai\" là cách diễn đạt dùng trong tình huống khẩn cấp và nguy hiểm."}, "difficulty": "easy"},
    {"question": {"ja": "「手伝う」と「助ける」の違いは？", "vi": "Sự khác nhau giữa \"手伝う\" và \"助ける\"?"}, "options": [{"ja": "同じ意味", "vi": "Cùng nghĩa"}, {"ja": "「手伝う」は日常的支援、「助ける」は緊急・危険時の救助", "vi": "\"Tetsudau\" là hỗ trợ hàng ngày, \"tasukeru\" là cứu trong trường hợp khẩn cấp"}, {"ja": "「助ける」は料理だけ", "vi": "\"Tasukeru\" chỉ dùng cho nấu ăn"}, {"ja": "「手伝う」は夜だけ", "vi": "\"Tetsudau\" chỉ dùng ban đêm"}], "correct": 1, "explanation": {"ja": "「手伝う」は日常的な支援、「助ける」は緊急・危険な状況での救助を意味します。", "vi": "\"Tetsudau\" là hỗ trợ hàng ngày, \"tasukeru\" có nghĩa là cứu trong tình huống khẩn cấp và nguy hiểm."}, "difficulty": "medium"},
    {"question": {"ja": "「聞く」の介護での重要性は？", "vi": "Tầm quan trọng của \"聞く\" trong chăm sóc?"}, "options": [{"ja": "特に重要でない", "vi": "Không đặc biệt quan trọng"}, {"ja": "本人の話を聞くことが信頼関係と個別ケアの基本", "vi": "Lắng nghe câu chuyện của người dùng là cơ bản của quan hệ tin tưởng và chăm sóc cá nhân"}, {"ja": "音楽を聞くため", "vi": "Để nghe nhạc"}, {"ja": "規則だから", "vi": "Vì quy định"}], "correct": 1, "explanation": {"ja": "利用者の話を聴くことは信頼関係の構築と個別ケア計画の基本です。", "vi": "Lắng nghe người dùng là cơ bản để xây dựng quan hệ tin tưởng và lập kế hoạch chăm sóc cá nhân."}, "difficulty": "easy"},
    {"question": {"ja": "自立支援介護で「手伝う」べき場面は？", "vi": "Khi nào nên \"hỗ trợ\" trong chăm sóc hỗ trợ tự lập?"}, "options": [{"ja": "常に全て手伝う", "vi": "Luôn luôn giúp tất cả"}, {"ja": "本人ができることは手伝わず、困難な部分だけ支援する", "vi": "Không giúp điều người dùng có thể tự làm, chỉ hỗ trợ phần khó khăn"}, {"ja": "手伝わない", "vi": "Không giúp gì"}, {"ja": "声だけかける", "vi": "Chỉ gọi hỏi"}], "correct": 1, "explanation": {"ja": "自立支援の観点から、本人の能力を活かし必要な部分だけを支援します。", "vi": "Từ quan điểm hỗ trợ tự lập, tận dụng năng lực của người dùng và chỉ hỗ trợ phần cần thiết."}, "difficulty": "hard"}
  ]',
  37, 20
);

-- Lesson 38: かくにん・ほうこく・きろく・れんらく
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 10 Lesson 38: 介護動詞②（報連相）", "vi": "Unit 10 Bài 38: Động từ chăm sóc ② (Báo cáo, liên lạc, bàn bạc)"}',
  '{
    "type": "vocabulary",
    "unit": 10,
    "lesson_number": 38,
    "intro": {"ja": "介護の「報・連・相」に使う言葉を学びましょう。チームケアの基本です！", "vi": "Học từ dùng trong \"Báo-Liên-Bàn\" của chăm sóc. Đây là cơ bản của chăm sóc nhóm!"},
    "words": [
      {"word": "かくにん", "reading": "かくにん", "kanji": "確認", "meaning": {"vi": "Xác nhận / Kiểm tra", "ja": "確かめること"}, "examples": [{"ja": "服薬の確認をします。", "vi": "Tôi xác nhận việc uống thuốc."}], "care_example": {"ja": "「体温・血圧・食事量・排泄を確認して記録します。」", "vi": "\"Taion, ketsuatsu, shokuji ryou, haisetsu wo kakunin shite kiroku shimasu.\""}},
      {"word": "ほうこく", "reading": "ほうこく", "kanji": "報告", "meaning": {"vi": "Báo cáo", "ja": "情報を伝えること"}, "examples": [{"ja": "体調の変化を看護師に報告します。", "vi": "Tôi báo cáo thay đổi sức khỏe cho y tá."}], "care_example": {"ja": "「気になることは必ず看護師・上司に報告しましょう。」", "vi": "\"Ki ni naru koto wa kanarazu kangoshi, joushi ni houkoku shimashou.\""}},
      {"word": "きろく", "reading": "きろく", "kanji": "記録", "meaning": {"vi": "Ghi chép / Hồ sơ", "ja": "記録すること・ケア記録"}, "examples": [{"ja": "ケア記録を書きます。", "vi": "Tôi viết hồ sơ chăm sóc."}], "care_example": {"ja": "「ケアの記録は正確に、その日のうちに書きましょう。」", "vi": "\"Kea no kiroku wa seikaku ni, sono hi no uchi ni kakimashou.\""}},
      {"word": "れんらく", "reading": "れんらく", "kanji": "連絡", "meaning": {"vi": "Liên lạc / Thông báo", "ja": "情報を知らせること"}, "examples": [{"ja": "家族に連絡します。", "vi": "Tôi liên lạc với gia đình."}], "care_example": {"ja": "「急変時は家族への連絡を速やかに行います。」", "vi": "\"Kyuuhen ji wa kazoku he no renraku wo sumiyaka ni okonaimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "申し送り（引き継ぎ）", "vi": "Bàn giao ca"},
      "scene": {"ja": "日勤から夜勤への引き継ぎ場面", "vi": "Bàn giao từ ca ngày sang ca đêm"},
      "lines": [
        {"speaker": "day_staff", "ja": "田中さんの報告です。今日の体温37.8度、食事量は半分でした。", "vi": "Đây là báo cáo về ông Tanaka. Nhiệt độ hôm nay 37.8 độ, lượng ăn bằng một nửa."},
        {"speaker": "night_staff", "ja": "記録には書いてありますか？", "vi": "Đã ghi vào hồ sơ chưa?"},
        {"speaker": "day_staff", "ja": "はい、ケア記録に書きました。家族への連絡も確認済みです。", "vi": "Vâng, đã ghi vào hồ sơ chăm sóc. Đã xác nhận liên lạc với gia đình rồi."},
        {"speaker": "night_staff", "ja": "わかりました。夜間も体調確認を続けます。", "vi": "Tôi hiểu rồi. Ca đêm tôi sẽ tiếp tục theo dõi sức khỏe."}
      ],
      "key_phrases": [
        {"ja": "〜の報告です", "vi": "Đây là báo cáo về〜", "note_vi": "Cách bắt đầu báo cáo"},
        {"ja": "確認済みです", "vi": "Đã xác nhận rồi", "note_vi": "Xác nhận đã hoàn thành việc kiểm tra"}
      ],
      "cultural_note": {"ja": "「報・連・相」（報告・連絡・相談）はビジネスの基本であり、介護現場では特に重要です。チームでの情報共有がケアの質を左右します。", "vi": "\"Hô-Liên-Bàn\" (Báo cáo-Liên lạc-Bàn bạc) là cơ bản trong kinh doanh và đặc biệt quan trọng trong chăm sóc. Chia sẻ thông tin trong nhóm quyết định chất lượng chăm sóc."}
    }
  }',
  '[
    {"question": {"ja": "「報連相」の「報」は何の略？", "vi": "\"Hô\" trong \"Hô-Liên-Bàn\" là viết tắt của gì?"}, "options": [{"ja": "報告", "vi": "Báo cáo"}, {"ja": "報酬", "vi": "Thù lao"}, {"ja": "報道", "vi": "Truyền thông"}, {"ja": "報知", "vi": "Thông báo"}], "correct": 0, "explanation": {"ja": "「報連相」の「報」は「報告（ほうこく）」のことです。", "vi": "\"Hô\" trong \"Hô-Liên-Bàn\" là \"houkoku\" (báo cáo)."}, "difficulty": "easy"},
    {"question": {"ja": "ケア記録を書く際の注意点は？", "vi": "Điều cần chú ý khi viết hồ sơ chăm sóc?"}, "options": [{"ja": "後でまとめて書く", "vi": "Viết gộp sau"}, {"ja": "正確に・その日のうちに書く", "vi": "Viết chính xác và trong ngày hôm đó"}, {"ja": "上司に任せる", "vi": "Nhờ cấp trên"}, {"ja": "書かなくてもいい", "vi": "Không cần viết"}], "correct": 1, "explanation": {"ja": "ケア記録は正確さと及時性が重要です。その日のうちに正確に書きます。", "vi": "Hồ sơ chăm sóc quan trọng là chính xác và kịp thời. Viết chính xác trong ngày hôm đó."}, "difficulty": "easy"},
    {"question": {"ja": "「連絡」と「報告」の違いは？", "vi": "Sự khác nhau giữa \"liên lạc\" và \"báo cáo\"?"}, "options": [{"ja": "同じ意味", "vi": "Cùng nghĩa"}, {"ja": "「報告」は上司へ、「連絡」は関係者全体への情報共有", "vi": "\"Báo cáo\" là cho cấp trên, \"liên lạc\" là chia sẻ thông tin cho tất cả liên quan"}, {"ja": "「連絡」は電話のみ", "vi": "\"Liên lạc\" chỉ qua điện thoại"}, {"ja": "「報告」は書面のみ", "vi": "\"Báo cáo\" chỉ bằng văn bản"}], "correct": 1, "explanation": {"ja": "「報告」は主に上司へ、「連絡」は関係者全体への情報伝達です。", "vi": "\"Báo cáo\" chủ yếu là cho cấp trên, \"liên lạc\" là truyền đạt thông tin cho tất cả liên quan."}, "difficulty": "medium"},
    {"question": {"ja": "「確認済みです」の意味は？", "vi": "\"Kakunin zumi desu\" có nghĩa là gì?"}, "options": [{"ja": "これから確認します", "vi": "Tôi sẽ xác nhận"}, {"ja": "確認が終わっています", "vi": "Đã xác nhận xong"}, {"ja": "確認できませんでした", "vi": "Không xác nhận được"}, {"ja": "確認中です", "vi": "Đang xác nhận"}], "correct": 1, "explanation": {"ja": "「〜済み（ずみ）」は「すでに〜が終わっている」という意味です。", "vi": "\"〜zumi\" có nghĩa là \"đã〜 xong rồi\"."}, "difficulty": "medium"},
    {"question": {"ja": "急変時の連絡で最優先すべきことは？", "vi": "Điều ưu tiên nhất khi liên lạc trong trường hợp cấp cứu?"}, "options": [{"ja": "記録を書いてから連絡", "vi": "Viết hồ sơ xong rồi liên lạc"}, {"ja": "まず看護師・医師への報告、次に家族連絡", "vi": "Trước tiên báo cáo y tá/bác sĩ, sau đó liên lạc gia đình"}, {"ja": "家族への連絡が最優先", "vi": "Liên lạc gia đình là ưu tiên nhất"}, {"ja": "次の勤務者に任せる", "vi": "Nhờ người làm ca tiếp theo"}], "correct": 1, "explanation": {"ja": "急変時はまず医療職（看護師・医師）への報告が最優先です。その後、必要に応じて家族連絡を行います。", "vi": "Khi cấp cứu, ưu tiên nhất là báo cáo cho nhân viên y tế (y tá, bác sĩ). Sau đó liên lạc gia đình khi cần."}, "difficulty": "hard"}
  ]',
  38, 20
);

-- Lesson 39: あらう・ふく・きがえる・みがく
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 10 Lesson 39: 介護動詞③（清潔保持）", "vi": "Unit 10 Bài 39: Động từ chăm sóc ③ (Giữ vệ sinh)"}',
  '{
    "type": "vocabulary",
    "unit": 10,
    "lesson_number": 39,
    "intro": {"ja": "清潔保持に関する動詞を学びましょう。入浴・整容介助の基本です。", "vi": "Học các động từ liên quan đến giữ vệ sinh. Cơ bản trong hỗ trợ tắm rửa và chăm sóc ngoại hình."},
    "words": [
      {"word": "あらう", "reading": "あらう", "kanji": "洗う", "meaning": {"vi": "Rửa / Giặt", "ja": "水で洗浄する"}, "examples": [{"ja": "手を洗ってください。", "vi": "Hãy rửa tay."}], "care_example": {"ja": "「食事前に手を洗いましょう。感染予防になります。」", "vi": "\"Shokuji mae ni te wo araimashou. Kansen yobou ni narimasu.\""}},
      {"word": "ふく", "reading": "ふく", "kanji": "拭く", "meaning": {"vi": "Lau / Chùi", "ja": "布などで水分や汚れを取る"}, "examples": [{"ja": "顔を拭いてください。", "vi": "Hãy lau mặt."}], "care_example": {"ja": "「清拭介助：温かいタオルで体を丁寧に拭きます。」", "vi": "Hỗ trợ lau người: \"Atatakai taoru de karada wo teinei ni fukimasu.\""}},
      {"word": "きがえる", "reading": "きがえる", "kanji": "着替える", "meaning": {"vi": "Thay quần áo", "ja": "衣服を取り替える"}, "examples": [{"ja": "着替えを手伝いましょうか？", "vi": "Tôi giúp bạn thay quần áo nhé?"}], "care_example": {"ja": "「麻痺のある側の腕から袖を通します。（患側から着る）」", "vi": "\"Mahi no aru gawa no ude kara sode wo toorashimasu. (Kansoku kara kiru)\""}},
      {"word": "みがく", "reading": "みがく", "kanji": "磨く", "meaning": {"vi": "Đánh / Chải / Lau bóng", "ja": "歯ブラシ等で清潔にする"}, "examples": [{"ja": "歯を磨きましょう。", "vi": "Hãy đánh răng."}], "care_example": {"ja": "「口腔ケアは誤嚥性肺炎予防に重要です。毎食後に歯磨きを行います。」", "vi": "\"Koukou kea wa goen sei haien yobou ni juuyou desu. Mainichi shokugo ni hamigaki wo okonaimasu.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "入浴介助の声かけ", "vi": "Gọi hỗ trợ tắm rửa"},
      "scene": {"ja": "入浴前の準備と声かけ", "vi": "Chuẩn bị và gọi hỏi trước khi tắm"},
      "lines": [
        {"speaker": "staff", "ja": "○○さん、今日はお風呂の日です。準備はよいですか？", "vi": "○○ san, hôm nay là ngày tắm. Bạn đã sẵn sàng chưa?"},
        {"speaker": "user", "ja": "体が洗えるか少し心配で。", "vi": "Tôi hơi lo liệu có tự rửa người được không."},
        {"speaker": "staff", "ja": "大丈夫ですよ。必要なところだけ手伝います。着替えは後で一緒にやりましょう。", "vi": "Không sao đâu. Tôi chỉ giúp những chỗ cần thiết thôi. Thay quần áo chúng ta làm cùng nhau sau."},
        {"speaker": "user", "ja": "ありがとうございます。歯も磨きたいです。", "vi": "Cảm ơn. Tôi cũng muốn đánh răng."}
      ],
      "key_phrases": [
        {"ja": "必要なところだけ手伝います", "vi": "Tôi chỉ giúp những chỗ cần thiết thôi", "note_vi": "Nguyên tắc hỗ trợ tự lập"},
        {"ja": "一緒にやりましょう", "vi": "Chúng ta làm cùng nhau nhé", "note_vi": "Cách mời cùng thực hiện"}
      ],
      "cultural_note": {"ja": "着替え介助は「患側（まひのある側）から着て、健側から脱ぐ」が基本です。（脱健着患：だっけんちゃっかん）", "vi": "Hỗ trợ thay quần áo, nguyên tắc cơ bản là \"mặc từ bên liệt, cởi từ bên lành\" (dakken chakkkan)."}
    }
  }',
  '[
    {"question": {"ja": "「手を洗う」の感染予防での意義は？", "vi": "Ý nghĩa phòng ngừa nhiễm khuẩn của \"rửa tay\"?"}, "options": [{"ja": "特に意味はない", "vi": "Không có ý nghĩa gì"}, {"ja": "手についた細菌・ウイルスを除去して感染を防ぐ", "vi": "Loại bỏ vi khuẩn và virus trên tay để phòng ngừa nhiễm khuẩn"}, {"ja": "見た目のため", "vi": "Vì vẻ ngoài"}, {"ja": "規則だから", "vi": "Vì quy định"}], "correct": 1, "explanation": {"ja": "手洗いは介護感染予防の基本で、手についた細菌・ウイルスを除去します。", "vi": "Rửa tay là cơ bản phòng ngừa nhiễm khuẩn trong chăm sóc, loại bỏ vi khuẩn và virus trên tay."}, "difficulty": "easy"},
    {"question": {"ja": "片麻痺がある方の着替え介助の基本は？", "vi": "Cơ bản hỗ trợ thay quần áo cho người liệt nửa người?"}, "options": [{"ja": "健側（元気な方）から着て、患側から脱ぐ", "vi": "Mặc từ bên lành, cởi từ bên liệt"}, {"ja": "患側（まひの方）から着て、健側から脱ぐ", "vi": "Mặc từ bên liệt, cởi từ bên lành"}, {"ja": "どちらでもよい", "vi": "Bên nào cũng được"}, {"ja": "スタッフが決める", "vi": "Nhân viên quyết định"}], "correct": 1, "explanation": {"ja": "「脱健着患（だっけんちゃっかん）」：脱ぐ時は健側から、着る時は患側からが基本です。", "vi": "\"Dakken chakkkan\": Khi cởi từ bên lành, khi mặc từ bên liệt là nguyên tắc cơ bản."}, "difficulty": "medium"},
    {"question": {"ja": "「口腔ケア」が誤嚥性肺炎予防になる理由は？", "vi": "Lý do \"chăm sóc miệng\" giúp phòng ngừa viêm phổi do sặc?"}, "options": [{"ja": "歯が丈夫になるから", "vi": "Vì răng chắc khỏe"}, {"ja": "口の中の細菌が誤嚥で肺に入ることを防ぐため", "vi": "Phòng ngừa vi khuẩn trong miệng xâm nhập phổi qua sặc"}, {"ja": "食欲が増すから", "vi": "Vì tăng cảm giác ngon miệng"}, {"ja": "見た目がよくなるから", "vi": "Vì trông đẹp hơn"}], "correct": 1, "explanation": {"ja": "口腔内の細菌が誤嚥により肺に入ると誤嚥性肺炎になります。口腔ケアでこれを予防します。", "vi": "Vi khuẩn trong miệng vào phổi qua sặc gây viêm phổi do sặc. Chăm sóc miệng phòng ngừa điều này."}, "difficulty": "medium"},
    {"question": {"ja": "「清拭（せいしき）」とは何ですか？", "vi": "\"Seishiki\" (lau người) là gì?"}, "options": [{"ja": "入浴のこと", "vi": "Tắm bồn"}, {"ja": "温かいタオルで体を拭く清潔ケア", "vi": "Chăm sóc vệ sinh bằng cách lau người với khăn ấm"}, {"ja": "シャワーのこと", "vi": "Tắm vòi sen"}, {"ja": "歯磨きのこと", "vi": "Đánh răng"}], "correct": 1, "explanation": {"ja": "清拭は入浴が難しい場合に温かいタオルで体を拭いて清潔を保つケアです。", "vi": "\"Seishiki\" là chăm sóc giữ vệ sinh bằng cách lau người với khăn ấm khi không thể tắm."}, "difficulty": "easy"},
    {"question": {"ja": "着替え介助中のプライバシー配慮として重要なのは？", "vi": "Điều quan trọng về bảo vệ quyền riêng tư trong hỗ trợ thay quần áo?"}, "options": [{"ja": "ドアを開けたまま行う", "vi": "Làm với cửa mở"}, {"ja": "カーテンや衝立でプライバシーを確保する", "vi": "Đảm bảo quyền riêng tư bằng rèm hoặc vách ngăn"}, {"ja": "急いで終わらせる", "vi": "Kết thúc nhanh"}, {"ja": "他のスタッフに見せる", "vi": "Cho nhân viên khác xem"}], "correct": 1, "explanation": {"ja": "着替え介助は肌の露出を伴うため、カーテンや衝立でプライバシーを確保することが重要です。", "vi": "Hỗ trợ thay quần áo liên quan đến da nên quan trọng là đảm bảo quyền riêng tư bằng rèm hoặc vách ngăn."}, "difficulty": "hard"}
  ]',
  39, 20
);

-- Lesson 40: ちがう・わかる・おぼえる・わすれる
INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'vocabulary' LIMIT 1),
  '{"ja": "Unit 10 Lesson 40: 認知・理解の動詞", "vi": "Unit 10 Bài 40: Động từ nhận thức và hiểu biết"}',
  '{
    "type": "vocabulary",
    "unit": 10,
    "lesson_number": 40,
    "intro": {"ja": "認知症ケアにも関連する、理解・記憶に関する動詞を学びましょう。", "vi": "Học các động từ liên quan đến hiểu biết và trí nhớ, cũng liên quan đến chăm sóc sa sút trí tuệ."},
    "words": [
      {"word": "ちがう", "reading": "ちがう", "kanji": "違う", "meaning": {"vi": "Khác / Sai", "ja": "異なる・正しくない"}, "examples": [{"ja": "それは違います。", "vi": "Cái đó không đúng."}], "care_example": {"ja": "（注意）認知症の方に「違います」と言うことで混乱させることがあります。", "vi": "(Chú ý) Nói \"Chigaimasu\" với người bị sa sút trí tuệ có thể làm họ bối rối."}},
      {"word": "わかる", "reading": "わかる", "kanji": "分かる", "meaning": {"vi": "Hiểu / Biết", "ja": "理解できる"}, "examples": [{"ja": "わかりましたか？", "vi": "Bạn hiểu chưa?"}], "care_example": {"ja": "「ゆっくり話して、「わかりましたか？」と確認します。」", "vi": "\"Yukkuri hanashite, 'wakarimashita ka?' to kakunin shimasu.\""}},
      {"word": "おぼえる", "reading": "おぼえる", "kanji": "覚える", "meaning": {"vi": "Nhớ / Ghi nhớ", "ja": "記憶する"}, "examples": [{"ja": "お名前を覚えています。", "vi": "Tôi nhớ tên bạn."}], "care_example": {"ja": "「昔のことをよく覚えていますね。昔話を聞かせてください（回想法）。」", "vi": "\"Mukashi no koto wo yoku oboete imasu ne. Mukashibanashi wo kikasete kudasai (kaisou hou).\""}},
      {"word": "わすれる", "reading": "わすれる", "kanji": "忘れる", "meaning": {"vi": "Quên", "ja": "記憶が失われる"}, "examples": [{"ja": "薬を飲むことを忘れないでください。", "vi": "Đừng quên uống thuốc."}], "care_example": {"ja": "「忘れてしまうことを責めず、やさしくサポートしましょう。」", "vi": "\"Wasurete shimau koto wo semazu, yasashiku sapooto shimashou.\""}
      }
    ],
    "dialogue": {
      "title": {"ja": "認知症ケアでの対話", "vi": "Đối thoại trong chăm sóc sa sút trí tuệ"},
      "scene": {"ja": "記憶の混乱がある利用者との対話", "vi": "Đối thoại với người dùng bị rối loạn trí nhớ"},
      "lines": [
        {"speaker": "user", "ja": "今日は何日ですか？娘はまだ来ていませんか？", "vi": "Hôm nay ngày mấy? Con gái tôi chưa đến à?"},
        {"speaker": "staff", "ja": "今日は4月5日です。お嬢さんは土曜日に来られる予定ですよ。", "vi": "Hôm nay là ngày 5 tháng 4. Con gái bạn dự kiến đến vào thứ Bảy đấy."},
        {"speaker": "user", "ja": "そうでしたか。忘れてしまいました。", "vi": "Vậy sao. Tôi đã quên mất."},
        {"speaker": "staff", "ja": "大丈夫ですよ。昔のことをたくさん覚えていますよね。昔のお話を聞かせてください。", "vi": "Không sao đâu. Bạn nhớ nhiều chuyện ngày xưa lắm đấy. Hãy kể cho tôi nghe chuyện xưa nhé."}
      ],
      "key_phrases": [
        {"ja": "忘れてしまいました", "vi": "Tôi đã quên mất", "note_vi": "Cách diễn đạt đã quên"},
        {"ja": "昔のことをよく覚えていますね", "vi": "Bạn nhớ nhiều chuyện ngày xưa nhỉ", "note_vi": "Khơi dậy trí nhớ dài hạn (liệu pháp hồi ức)"}
      ],
      "cultural_note": {"ja": "認知症の方が忘れたり混乱したりしても、否定や訂正よりも共感が大切です。過去の良い記憶を引き出す「回想法」は有効なケア技術です。", "vi": "Khi người bị sa sút trí tuệ quên hoặc bối rối, đồng cảm quan trọng hơn phủ nhận hay sửa lỗi. \"Liệu pháp hồi ức\" khơi dậy những ký ức tốt đẹp trong quá khứ là kỹ thuật chăm sóc hiệu quả."}
    }
  }',
  '[
    {"question": {"ja": "「わかる」の意味は？", "vi": "\"わかる\" có nghĩa là gì?"}, "options": [{"ja": "忘れる", "vi": "Quên"}, {"ja": "覚える", "vi": "Nhớ"}, {"ja": "理解できる", "vi": "Hiểu"}, {"ja": "違う", "vi": "Khác"}], "correct": 2, "explanation": {"ja": "「わかる（分かる）」は理解できることを意味します。", "vi": "\"Wakaru\" có nghĩa là hiểu."}, "difficulty": "easy"},
    {"question": {"ja": "認知症の方が「忘れた」と言った時の適切な対応は？", "vi": "Khi người bị sa sút trí tuệ nói \"tôi đã quên\", cách xử lý phù hợp?"}, "options": [{"ja": "「なぜ忘れるの！」と叱る", "vi": "Mắng \"Sao lại quên!\""}, {"ja": "「しっかりして」と励ます", "vi": "Khuyến khích \"Hãy chú ý hơn\""}, {"ja": "責めず共感し、サポートする", "vi": "Không trách móc, đồng cảm và hỗ trợ"}, {"ja": "無視する", "vi": "Bỏ qua"}], "correct": 2, "explanation": {"ja": "認知症で忘れることは病気の症状です。責めず「大丈夫ですよ」と共感することが大切です。", "vi": "Quên trong sa sút trí tuệ là triệu chứng bệnh. Quan trọng là không trách móc và đồng cảm bằng \"Daijoubu desu yo\"."}, "difficulty": "medium"},
    {"question": {"ja": "「回想法」とは何ですか？", "vi": "\"Liệu pháp hồi ức\" là gì?"}, "options": [{"ja": "未来の計画を立てる", "vi": "Lập kế hoạch tương lai"}, {"ja": "昔の良い記憶を引き出す会話療法", "vi": "Liệu pháp trò chuyện khơi dậy ký ức tốt đẹp trong quá khứ"}, {"ja": "記憶のテストをする", "vi": "Kiểm tra trí nhớ"}, {"ja": "忘れさせる", "vi": "Làm cho quên"}], "correct": 1, "explanation": {"ja": "回想法は過去の良い経験・記憶を引き出す会話を通じて精神的安定をはかる療法です。", "vi": "Liệu pháp hồi ức là liệu pháp ổn định tâm lý qua cuộc trò chuyện khơi dậy những trải nghiệm và ký ức tốt đẹp trong quá khứ."}, "difficulty": "medium"},
    {"question": {"ja": "「違います」を認知症の方に言う際の注意点は？", "vi": "Điều cần chú ý khi nói \"Chigaimasu\" với người bị sa sút trí tuệ?"}, "options": [{"ja": "積極的に使う", "vi": "Tích cực sử dụng"}, {"ja": "混乱・不安を招くことがあるため共感的対応が望ましい", "vi": "Có thể gây bối rối và lo lắng nên đối ứng đồng cảm là tốt hơn"}, {"ja": "正確な情報のために必ず使う", "vi": "Phải dùng để đảm bảo thông tin chính xác"}, {"ja": "どんな場面でも問題ない", "vi": "Không có vấn đề trong bất kỳ tình huống nào"}], "correct": 1, "explanation": {"ja": "認知症の方に「違います」と否定することで混乱・不安が増すことがあります。共感的アプローチが有効です。", "vi": "Phủ nhận người bị sa sút trí tuệ bằng \"Chigaimasu\" có thể làm tăng bối rối và lo lắng. Cách tiếp cận đồng cảm hiệu quả hơn."}, "difficulty": "hard"},
    {"question": {"ja": "「お名前を覚えています」と言う効果は？", "vi": "Hiệu quả của việc nói \"Onamae wo oboete imasu\"?"}, "options": [{"ja": "特にない", "vi": "Không có gì đặc biệt"}, {"ja": "利用者の自尊心を高め、信頼関係を築く", "vi": "Nâng cao lòng tự trọng của người dùng và xây dựng quan hệ tin tưởng"}, {"ja": "記録のため", "vi": "Để ghi chép"}, {"ja": "規則だから", "vi": "Vì quy định"}], "correct": 1, "explanation": {"ja": "名前を覚えていることを伝えることは、利用者に「自分は大切にされている」という安心感を与えます。", "vi": "Nói rằng mình nhớ tên người dùng mang lại cảm giác an tâm \"mình được trân trọng\" cho họ."}, "difficulty": "easy"}
  ]',
  40, 20
);
