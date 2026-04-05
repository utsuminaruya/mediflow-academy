-- seed-n5-mock.sql
-- N5 Mock Exam Sets (3 sets, sort_order 1-3, xp_reward 50)
-- course: jlpt_level = 'N5', category = 'mock'
-- Each set: 30 questions covering vocabulary, grammar, reading comprehension

INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'mock' LIMIT 1),
  '{"ja": "模擬試験 第1回（介護語彙・文法）", "vi": "Đề thi thử số 1 (Từ vựng và ngữ pháp chăm sóc)"}'::jsonb,
  '{
    "type": "mock",
    "set_number": 1,
    "intro": {
      "ja": "N5レベルの介護日本語模擬試験です。語彙・文法・読解の30問に挑戦しましょう。時間の目安：45分",
      "vi": "Đây là đề thi thử tiếng Nhật chăm sóc cấp độ N5. Hãy thử sức với 30 câu hỏi về từ vựng, ngữ pháp và đọc hiểu. Thời gian tham khảo: 45 phút"
    },
    "sections": [
      {"name_ja": "語彙（もじ・ごい）", "name_vi": "Từ vựng (chữ và từ)", "questions": "1-15"},
      {"name_ja": "文法（ぶんぽう）", "name_vi": "Ngữ pháp", "questions": "16-25"},
      {"name_ja": "読解（どっかい）", "name_vi": "Đọc hiểu", "questions": "26-30"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "number": 1,
        "section": "語彙",
        "question": {"ja": "「たいおん」の正しい漢字は？", "vi": "Chữ Hán đúng của \"たいおん\" là?"},
        "options": ["体温", "大音", "体音", "台温"],
        "correct": 0,
        "explanation": {"ja": "体温（たいおん）は体の温度です。", "vi": "体温（たいおん）là nhiệt độ cơ thể."},
        "difficulty": "easy"
      },
      {
        "number": 2,
        "section": "語彙",
        "question": {"ja": "「けつあつ」の意味は？", "vi": "\"けつあつ\" có nghĩa là?"},
        "options": ["体温", "血圧", "脈拍", "呼吸"],
        "correct": 1,
        "explanation": {"ja": "血圧（けつあつ）は血管にかかる圧力です。", "vi": "血圧（けつあつ）là áp lực lên thành mạch máu."},
        "difficulty": "easy"
      },
      {
        "number": 3,
        "section": "語彙",
        "question": {"ja": "「えんげ」のベトナム語訳は？", "vi": "Dịch \"えんげ\" sang tiếng Việt là?"},
        "options": ["đi bộ", "nuốt thức ăn", "tắm rửa", "đứng dậy"],
        "correct": 1,
        "explanation": {"ja": "嚥下（えんげ）は食べ物を飲み込む動作です。", "vi": "嚥下（えんげ）là động tác nuốt thức ăn."},
        "difficulty": "easy"
      },
      {
        "number": 4,
        "section": "語彙",
        "question": {"ja": "「ゆっくり」の意味は？", "vi": "\"ゆっくり\" có nghĩa là?"},
        "options": ["nhanh", "từ từ, thong thả", "mạnh", "to lớn"],
        "correct": 1,
        "explanation": {"ja": "ゆっくり＝từ từ です。介護でよく使います。", "vi": "ゆっくり = từ từ. Thường dùng trong chăm sóc."},
        "difficulty": "easy"
      },
      {
        "number": 5,
        "section": "語彙",
        "question": {"ja": "「はいせつ」の漢字は？", "vi": "Chữ Hán của \"はいせつ\" là?"},
        "options": ["排泄", "配設", "廃絶", "排折"],
        "correct": 0,
        "explanation": {"ja": "排泄（はいせつ）は便や尿を体の外に出すことです。", "vi": "排泄（はいせつ）là việc bài tiết phân và nước tiểu ra ngoài cơ thể."},
        "difficulty": "easy"
      },
      {
        "number": 6,
        "section": "語彙",
        "question": {"ja": "「こえかけ」の意味は？", "vi": "\"こえかけ\" có nghĩa là?"},
        "options": ["叫ぶ", "声で呼びかけること", "電話する", "音楽をかける"],
        "correct": 1,
        "explanation": {"ja": "声かけは利用者に話しかけること。介護の基本です。", "vi": "声かけ là việc nói chuyện với người dùng. Là cơ bản của chăm sóc."},
        "difficulty": "easy"
      },
      {
        "number": 7,
        "section": "語彙",
        "question": {"ja": "「くるまいす」の漢字は？", "vi": "Chữ Hán của \"くるまいす\" là?"},
        "options": ["電車", "車椅子", "自動車", "歩行器"],
        "correct": 1,
        "explanation": {"ja": "車椅子（くるまいす）は車輪のついた椅子です。", "vi": "車椅子（くるまいす）là ghế có bánh xe."},
        "difficulty": "easy"
      },
      {
        "number": 8,
        "section": "語彙",
        "question": {"ja": "「ほうこく」の意味は？", "vi": "\"ほうこく\" có nghĩa là?"},
        "options": ["相談", "報告", "記録", "連絡"],
        "correct": 1,
        "explanation": {"ja": "報告（ほうこく）は状況を上司や関係者に知らせることです。", "vi": "報告（ほうこく）là thông báo tình hình cho cấp trên hoặc người liên quan."},
        "difficulty": "easy"
      },
      {
        "number": 9,
        "section": "語彙",
        "question": {"ja": "「にんちしょう」のベトナム語訳は？", "vi": "Dịch \"にんちしょう\" sang tiếng Việt là?"},
        "options": ["cao huyết áp", "sa sút trí tuệ", "tiểu đường", "骨折"],
        "correct": 1,
        "explanation": {"ja": "認知症（にんちしょう）は記憶や認知機能が低下する病気です。", "vi": "認知症（にんちしょう）là bệnh làm giảm trí nhớ và chức năng nhận thức."},
        "difficulty": "medium"
      },
      {
        "number": 10,
        "section": "語彙",
        "question": {"ja": "「そんげん」の意味は？", "vi": "\"そんげん\" có nghĩa là?"},
        "options": ["tình trạng sức khỏe", "phẩm giá, nhân phẩm", "an toàn", "sự tham gia"],
        "correct": 1,
        "explanation": {"ja": "尊厳（そんげん）は人としての価値・誇りです。介護の根本理念です。", "vi": "尊厳（そんげん）là giá trị, phẩm giá của con người. Là lý niệm cơ bản của chăm sóc."},
        "difficulty": "medium"
      },
      {
        "number": 11,
        "section": "語彙",
        "question": {"ja": "「いじょう」（異常）の反対語は？", "vi": "Từ trái nghĩa của \"いじょう\" (異常) là?"},
        "options": ["危険", "正常", "緊急", "急変"],
        "correct": 1,
        "explanation": {"ja": "正常（せいじょう）は異常の反対で、普通の状態です。", "vi": "正常（せいじょう）là trái nghĩa của 異常, là trạng thái bình thường."},
        "difficulty": "medium"
      },
      {
        "number": 12,
        "section": "語彙",
        "question": {"ja": "「ADL」とは何の略ですか？", "vi": "\"ADL\" là viết tắt của gì?"},
        "options": ["Advanced Daily Life", "Activities of Daily Living", "Aged Daily Limit", "Assisted Daily Labor"],
        "correct": 1,
        "explanation": {"ja": "ADL＝Activities of Daily Living＝日常生活動作です。", "vi": "ADL = Activities of Daily Living = hoạt động sinh hoạt hàng ngày."},
        "difficulty": "medium"
      },
      {
        "number": 13,
        "section": "語彙",
        "question": {"ja": "「ほうれんそう」（報・連・相）の「そう」は？", "vi": "\"そう\" trong \"ほうれんそう\" (報・連・相) là?"},
        "options": ["相談", "総合", "送信", "走行"],
        "correct": 0,
        "explanation": {"ja": "ほうれんそう＝報告・連絡・相談。「そう」は相談（そうだん）です。", "vi": "ほうれんそう = 報告・連絡・相談. \"そう\" là 相談 (tham khảo, hỏi ý kiến)."},
        "difficulty": "medium"
      },
      {
        "number": 14,
        "section": "語彙",
        "question": {"ja": "「てんとう」（転倒）のベトナム語訳は？", "vi": "Dịch \"てんとう\" (転倒) sang tiếng Việt là?"},
        "options": ["trượt", "ngã, vấp ngã", "đau", "bệnh"],
        "correct": 1,
        "explanation": {"ja": "転倒（てんとう）は倒れること・転ぶことです。", "vi": "転倒（てんとう）là bị ngã, vấp ngã."},
        "difficulty": "medium"
      },
      {
        "number": 15,
        "section": "語彙",
        "question": {"ja": "「バリデーション」とは何ですか？", "vi": "\"バリデーション\" là gì?"},
        "options": ["入浴の方法", "認知症ケアの技法（感情に共感する）", "バイタルの記録方法", "移乗の手順"],
        "correct": 1,
        "explanation": {"ja": "バリデーションは認知症の方の感情・言葉を否定せず共感する技法です。", "vi": "Validation là kỹ thuật không phủ nhận mà đồng cảm với cảm xúc và lời nói của người bị sa sút trí tuệ."},
        "difficulty": "hard"
      },
      {
        "number": 16,
        "section": "文法",
        "question": {"ja": "「わたし＿かいごしです」の正しい助詞は？", "vi": "Trợ từ đúng trong \"わたし＿かいごしです\" là?"},
        "options": ["を", "は", "に", "が"],
        "correct": 1,
        "explanation": {"ja": "話題・主語を示すときは「は」を使います。", "vi": "Dùng \"は\" để chỉ chủ đề/chủ ngữ."},
        "difficulty": "easy"
      },
      {
        "number": 17,
        "section": "文法",
        "question": {"ja": "「くすり＿のみます」の正しい助詞は？", "vi": "Trợ từ đúng trong \"くすり＿のみます\" là?"},
        "options": ["は", "が", "を", "に"],
        "correct": 2,
        "explanation": {"ja": "動作の対象（目的語）には「を」を使います。", "vi": "Dùng \"を\" cho đối tượng (tân ngữ) của hành động."},
        "difficulty": "easy"
      },
      {
        "number": 18,
        "section": "文法",
        "question": {"ja": "「ゆっくり＿てください」の＿に入る動詞は「おきる」。正しいて形は？", "vi": "Động từ điền vào \"ゆっくり＿てください\" là \"おきる\". Dạng て đúng là?"},
        "options": ["おきて", "おいて", "おいって", "おかて"],
        "correct": 0,
        "explanation": {"ja": "おきる（グループ2・る動詞）→おきて です。", "vi": "おきる (nhóm 2, động từ る) → おきて."},
        "difficulty": "easy"
      },
      {
        "number": 19,
        "section": "文法",
        "question": {"ja": "「トイレに いきたいですか？」の「たい」は何を表す？", "vi": "\"たい\" trong \"トイレに いきたいですか？\" biểu thị điều gì?"},
        "options": ["過去", "希望・願望", "義務", "可能"],
        "correct": 1,
        "explanation": {"ja": "「〜たい」は話し手の希望・願望を表します。", "vi": "\"〜たい\" biểu thị mong muốn, nguyện vọng của người nói."},
        "difficulty": "easy"
      },
      {
        "number": 20,
        "section": "文法",
        "question": {"ja": "「りようしゃは いまたべています」の「〜ています」は何を表す？", "vi": "\"〜ています\" trong \"りようしゃは いまたべています\" biểu thị gì?"},
        "options": ["過去の動作", "現在進行中の動作", "未来の動作", "習慣的な動作"],
        "correct": 1,
        "explanation": {"ja": "「いま〜ています」は現在進行中の動作を表します。", "vi": "\"いま〜ています\" biểu thị hành động đang tiến hành hiện tại."},
        "difficulty": "easy"
      },
      {
        "number": 21,
        "section": "文法",
        "question": {"ja": "「カーテンを あけてもいいですか？」は何を求めている？", "vi": "\"カーテンを あけてもいいですか？\" đang yêu cầu gì?"},
        "options": ["命令", "許可", "禁止", "依頼"],
        "correct": 1,
        "explanation": {"ja": "「〜てもいいですか？」は許可を求める表現です。", "vi": "\"〜てもいいですか？\" là cách xin phép."},
        "difficulty": "medium"
      },
      {
        "number": 22,
        "section": "文法",
        "question": {"ja": "「ひとりで たちあがらないでください」の意味は？", "vi": "\"ひとりで たちあがらないでください\" có nghĩa là?"},
        "options": ["一人で立つように", "一人で立たないように（禁止）", "立つことができない", "立つのを手伝う"],
        "correct": 1,
        "explanation": {"ja": "「〜ないでください」は丁寧な禁止・注意です。", "vi": "\"〜ないでください\" là cấm/nhắc nhở lịch sự."},
        "difficulty": "medium"
      },
      {
        "number": 23,
        "section": "文法",
        "question": {"ja": "「まいにち きろくを かかなければなりません」の意味は？", "vi": "\"まいにち きろくを かかなければなりません\" có nghĩa là?"},
        "options": ["毎日記録を書きたい", "毎日記録を書く義務がある", "毎日記録を書かなくていい", "記録を書いた"],
        "correct": 1,
        "explanation": {"ja": "「〜なければなりません」は義務・必要を表します。", "vi": "\"〜なければなりません\" biểu thị nghĩa vụ, sự cần thiết."},
        "difficulty": "medium"
      },
      {
        "number": 24,
        "section": "文法",
        "question": {"ja": "「これは けつあつを はかるのに つかいます」の「のに」は？", "vi": "\"のに\" trong \"これは けつあつを はかるのに つかいます\" là?"},
        "options": ["逆接", "理由", "目的", "条件"],
        "correct": 2,
        "explanation": {"ja": "「〜のに使う」の「のに」は目的を表します。", "vi": "\"のに\" trong \"〜のに使う\" biểu thị mục đích."},
        "difficulty": "medium"
      },
      {
        "number": 25,
        "section": "文法",
        "question": {"ja": "「ねつが あるかもしれません」の「かもしれません」は？", "vi": "\"かもしれません\" trong \"ねつが あるかもしれません\" là?"},
        "options": ["確実な断定", "不確かな推量", "強い命令", "丁寧な依頼"],
        "correct": 1,
        "explanation": {"ja": "「かもしれません」は30〜50%程度の不確かな推量を表します。", "vi": "\"かもしれません\" biểu thị suy đoán không chắc chắn khoảng 30-50%."},
        "difficulty": "medium"
      },
      {
        "number": 26,
        "section": "読解",
        "passage": {"ja": "田中さんは今朝から体調が悪そうです。顔色が青く、食事もあまり食べられませんでした。体温を測ると38.5度ありました。", "vi": "Bà Tanaka có vẻ sức khỏe không tốt từ sáng nay. Mặt xanh, cũng không ăn được nhiều. Đo nhiệt độ thì ra 38.5 độ."},
        "question": {"ja": "田中さんの体温は？", "vi": "Nhiệt độ của bà Tanaka là?"},
        "options": ["37度", "38.5度", "36.5度", "39度"],
        "correct": 1,
        "explanation": {"ja": "文章に「体温を測ると38.5度ありました」とあります。", "vi": "Trong đoạn văn có \"体温を測ると38.5度ありました\" (Đo nhiệt độ thì ra 38.5 độ)."},
        "difficulty": "easy"
      },
      {
        "number": 27,
        "section": "読解",
        "passage": {"ja": "田中さんは今朝から体調が悪そうです。顔色が青く、食事もあまり食べられませんでした。体温を測ると38.5度ありました。", "vi": "Bà Tanaka có vẻ sức khỏe không tốt từ sáng nay. Mặt xanh, cũng không ăn được nhiều. Đo nhiệt độ thì ra 38.5 độ."},
        "question": {"ja": "田中さんの状態として正しくないのは？", "vi": "Điều nào không đúng về tình trạng của bà Tanaka?"},
        "options": ["体調が悪い", "食事をよく食べた", "顔色が青い", "熱がある"],
        "correct": 1,
        "explanation": {"ja": "文章に「食事もあまり食べられませんでした」とあるので、よく食べたは間違いです。", "vi": "Trong đoạn văn có \"食事もあまり食べられませんでした\" (không ăn được nhiều), nên đã ăn tốt là sai."},
        "difficulty": "medium"
      },
      {
        "number": 28,
        "section": "読解",
        "passage": {"ja": "介護では「ほうれんそう」が大切です。何か変化があったとき、すぐに報告し、関係者に連絡し、わからないことは相談することが重要です。", "vi": "Trong chăm sóc, \"ほうれんそう\" rất quan trọng. Khi có thay đổi, hãy báo cáo ngay, liên lạc những người liên quan, và hỏi ý kiến khi không biết."},
        "question": {"ja": "「ほうれんそう」に含まれないのは？", "vi": "Điều nào không thuộc \"ほうれんそう\"?"},
        "options": ["報告", "連絡", "相談", "記録"],
        "correct": 3,
        "explanation": {"ja": "ほうれんそう＝報告・連絡・相談です。記録は含まれません。", "vi": "ほうれんそう = 報告・連絡・相談. Ghi chép không thuộc nhóm này."},
        "difficulty": "medium"
      },
      {
        "number": 29,
        "section": "読解",
        "passage": {"ja": "認知症の方は同じことを繰り返すことがあります。そのとき、否定せず、気持ちに寄り添うことが大切です。「そうですね」と共感し、安心させましょう。", "vi": "Người bị sa sút trí tuệ có thể nói đi nói lại cùng một điều. Lúc đó, điều quan trọng là không phủ nhận, đồng hành cùng cảm xúc. Hãy đồng cảm bằng \"そうですね\" và làm họ an tâm."},
        "question": {"ja": "認知症の方が同じことを繰り返すとき、正しい対応は？", "vi": "Khi người bị sa sút trí tuệ nói đi nói lại, cách ứng xử đúng là?"},
        "options": ["「それは嘘です」と否定する", "「そうですね」と共感する", "無視する", "怒る"],
        "correct": 1,
        "explanation": {"ja": "文章に「否定せず、気持ちに寄り添い、共感する」とあります。", "vi": "Trong đoạn văn có \"không phủ nhận, đồng hành cùng cảm xúc, đồng cảm\"."},
        "difficulty": "medium"
      },
      {
        "number": 30,
        "section": "読解",
        "passage": {"ja": "移乗介助の前には必ずブレーキを確認します。フットレストを外し、利用者に重心を前にかけてもらってから立ち上がります。介護士は腰を支え、転倒しないように注意します。", "vi": "Trước khi hỗ trợ chuyển vị trí, nhất định phải kiểm tra phanh. Tháo gác chân, nhờ người dùng dồn trọng tâm về phía trước rồi đứng dậy. Nhân viên chăm sóc đỡ lưng và chú ý để không bị ngã."},
        "question": {"ja": "移乗介助で最初にすることは？", "vi": "Việc đầu tiên cần làm khi hỗ trợ chuyển vị trí là?"},
        "options": ["フットレストを外す", "ブレーキを確認する", "立ち上がる", "腰を支える"],
        "correct": 1,
        "explanation": {"ja": "文章に「移乗介助の前には必ずブレーキを確認します」とあります。", "vi": "Trong đoạn văn có \"Trước khi hỗ trợ chuyển vị trí, nhất định phải kiểm tra phanh\"."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  1, 50
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'mock' LIMIT 1),
  '{"ja": "模擬試験 第2回（介護場面・コミュニケーション）", "vi": "Đề thi thử số 2 (Tình huống chăm sóc và giao tiếp)"}'::jsonb,
  '{
    "type": "mock",
    "set_number": 2,
    "intro": {
      "ja": "第2回模擬試験。介護現場でのコミュニケーション、声かけ、状態報告を中心に出題します。時間の目安：45分",
      "vi": "Đề thi thử số 2. Câu hỏi tập trung vào giao tiếp, hỏi thăm và báo cáo tình trạng tại nơi làm việc chăm sóc. Thời gian tham khảo: 45 phút"
    },
    "sections": [
      {"name_ja": "場面別語彙", "name_vi": "Từ vựng theo tình huống", "questions": "1-12"},
      {"name_ja": "会話・コミュニケーション", "name_vi": "Hội thoại và giao tiếp", "questions": "13-22"},
      {"name_ja": "総合読解", "name_vi": "Đọc hiểu tổng hợp", "questions": "23-30"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "number": 1,
        "section": "場面別語彙",
        "question": {"ja": "入浴介助で最初に確認することは？", "vi": "Điều đầu tiên cần kiểm tra trong hỗ trợ tắm là?"},
        "options": ["利用者の好きな歌", "お湯の温度", "今日の天気", "テレビのチャンネル"],
        "correct": 1,
        "explanation": {"ja": "安全のためにお湯の温度を確認することが最優先です。", "vi": "Ưu tiên hàng đầu là kiểm tra nhiệt độ nước để đảm bảo an toàn."},
        "difficulty": "easy"
      },
      {
        "number": 2,
        "section": "場面別語彙",
        "question": {"ja": "「おはようございます」はいつ使う？", "vi": "\"おはようございます\" được dùng khi nào?"},
        "options": ["昼に会ったとき", "朝に会ったとき", "夜に会ったとき", "別れるとき"],
        "correct": 1,
        "explanation": {"ja": "おはようございます＝Chào buổi sáng、朝のあいさつです。", "vi": "おはようございます = Chào buổi sáng, lời chào buổi sáng."},
        "difficulty": "easy"
      },
      {
        "number": 3,
        "section": "場面別語彙",
        "question": {"ja": "「しつれいします」の意味は？", "vi": "\"しつれいします\" có nghĩa là?"},
        "options": ["ありがとう", "こんにちは", "xin lỗi / cho phép tôi", "さようなら"],
        "correct": 2,
        "explanation": {"ja": "失礼します＝Xin lỗi làm phiền / cho phép tôi、ケア前の声かけです。", "vi": "失礼します = Xin lỗi / cho phép tôi, lời hỏi trước khi chăm sóc."},
        "difficulty": "easy"
      },
      {
        "number": 4,
        "section": "場面別語彙",
        "question": {"ja": "「ナースコール」の役割は？", "vi": "Chức năng của \"ナースコール\" là?"},
        "options": ["音楽を流す", "スタッフを呼ぶ", "時間を知らせる", "ドアを開ける"],
        "correct": 1,
        "explanation": {"ja": "ナースコールは緊急時などにスタッフ（介護士・看護師）を呼ぶためのボタンです。", "vi": "ナースコール là nút để gọi nhân viên (nhân viên chăm sóc, y tá) trong trường hợp khẩn cấp."},
        "difficulty": "easy"
      },
      {
        "number": 5,
        "section": "場面別語彙",
        "question": {"ja": "食事で「むせる」とはどういう状態？", "vi": "\"むせる\" khi ăn là trạng thái gì?"},
        "options": ["よく食べている", "食べ物が詰まってせき込む", "食欲がある", "食後に眠い"],
        "correct": 1,
        "explanation": {"ja": "むせるは食べ物や飲み物がのどに詰まってせき込む状態です。誤嚥のリスクがあります。", "vi": "むせる là trạng thái bị nghẹn thức ăn hoặc nước ở họng và ho. Có nguy cơ hít sặc."},
        "difficulty": "easy"
      },
      {
        "number": 6,
        "section": "場面別語彙",
        "question": {"ja": "「ブレーキをかける」の意味（車椅子）は？", "vi": "\"ブレーキをかける\" (xe lăn) có nghĩa là?"},
        "options": ["車椅子を押す", "車椅子を止める・固定する", "車椅子を折りたたむ", "車椅子を持ち上げる"],
        "correct": 1,
        "explanation": {"ja": "ブレーキをかける＝Khóa phanh＝車椅子が動かないように固定することです。", "vi": "ブレーキをかける = Khóa phanh = cố định xe lăn để không di chuyển."},
        "difficulty": "easy"
      },
      {
        "number": 7,
        "section": "場面別語彙",
        "question": {"ja": "「きんきゅう」の漢字は？", "vi": "Chữ Hán của \"きんきゅう\" là?"},
        "options": ["緊急", "近急", "金急", "禁急"],
        "correct": 0,
        "explanation": {"ja": "緊急（きんきゅう）は急を要する状態・非常事態です。", "vi": "緊急（きんきゅう）là tình trạng cần xử lý gấp, tình huống khẩn cấp."},
        "difficulty": "medium"
      },
      {
        "number": 8,
        "section": "場面別語彙",
        "question": {"ja": "「もうしおくり」（申し送り）とは？", "vi": "\"もうしおくり\" (申し送り) là gì?"},
        "options": ["手紙を送ること", "勤務交代時の情報伝達", "薬を届けること", "書類を申請すること"],
        "correct": 1,
        "explanation": {"ja": "申し送りは勤務交代（シフト）のときに次のスタッフに情報を伝えることです。", "vi": "申し送り là việc truyền đạt thông tin cho nhân viên ca tiếp theo khi bàn giao ca."},
        "difficulty": "medium"
      },
      {
        "number": 9,
        "section": "場面別語彙",
        "question": {"ja": "「せいけつ」を保つことの介護的意義は？", "vi": "Ý nghĩa chăm sóc của việc giữ \"せいけつ\" là?"},
        "options": ["見た目がいいから", "感染予防になるから", "コストが下がるから", "利用者が喜ぶから"],
        "correct": 1,
        "explanation": {"ja": "清潔（せいけつ）を保つことは感染症の予防に繋がります。", "vi": "Giữ 清潔（せいけつ）giúp phòng ngừa bệnh truyền nhiễm."},
        "difficulty": "medium"
      },
      {
        "number": 10,
        "section": "場面別語彙",
        "question": {"ja": "「ほしつ」（保湿）の意味は？", "vi": "\"ほしつ\" (保湿) có nghĩa là?"},
        "options": ["体を温める", "皮膚の乾燥を防ぐ", "水を飲む", "消毒する"],
        "correct": 1,
        "explanation": {"ja": "保湿（ほしつ）は皮膚の乾燥を防ぐためにクリームなどで水分を補うことです。", "vi": "保湿（ほしつ）là bổ sung độ ẩm bằng kem để ngăn khô da."},
        "difficulty": "medium"
      },
      {
        "number": 11,
        "section": "場面別語彙",
        "question": {"ja": "「じりつしえん」（自立支援）の考え方は？", "vi": "Quan niệm về \"じりつしえん\" (自立支援) là?"},
        "options": ["全て介護士がする", "できることは自分でしてもらう", "家族に任せる", "機械を使う"],
        "correct": 1,
        "explanation": {"ja": "自立支援は利用者が自分でできることは自分でしてもらい、できないことだけ支援します。", "vi": "自立支援là để người dùng tự làm những gì có thể, chỉ hỗ trợ những gì không làm được."},
        "difficulty": "medium"
      },
      {
        "number": 12,
        "section": "場面別語彙",
        "question": {"ja": "「はいかい」（徘徊）とは認知症のどんな症状？", "vi": "\"はいかい\" (徘徊) là triệu chứng gì của sa sút trí tuệ?"},
        "options": ["眠れない", "目的なく歩き回る", "食べすぎる", "大声を出す"],
        "correct": 1,
        "explanation": {"ja": "徘徊（はいかい）は目的なく歩き回る行動で、認知症の症状の一つです。", "vi": "徘徊（はいかい）là hành vi đi lang thang không mục đích, một trong các triệu chứng sa sút trí tuệ."},
        "difficulty": "hard"
      },
      {
        "number": 13,
        "section": "会話",
        "question": {"ja": "「体調はいかがですか？」への自然な返答は？", "vi": "Câu trả lời tự nhiên cho \"体調はいかがですか？\" là?"},
        "options": ["はい、どうぞ", "おかげさまで、まあまあです", "ありがとうございます、どこですか", "わかりません"],
        "correct": 1,
        "explanation": {"ja": "「いかがですか」は調子を聞く丁寧な質問。「おかげさまで〜」が自然な返答です。", "vi": "\"いかがですか\" là câu hỏi lịch sự về tình trạng. \"おかげさまで〜\" là câu trả lời tự nhiên."},
        "difficulty": "easy"
      },
      {
        "number": 14,
        "section": "会話",
        "question": {"ja": "「ちょっとまってください」の意味は？", "vi": "\"ちょっとまってください\" có nghĩa là?"},
        "options": ["すぐに来て", "少し待って", "行ってください", "もっとゆっくり"],
        "correct": 1,
        "explanation": {"ja": "ちょっと＝một chút、まってください＝xin hãy chờ です。", "vi": "ちょっと = một chút, まってください = xin hãy chờ."},
        "difficulty": "easy"
      },
      {
        "number": 15,
        "section": "会話",
        "question": {"ja": "入浴前「お湯の温度は40度です。熱くないですか？」の目的は？", "vi": "Trước khi tắm \"お湯の温度は40度です。熱くないですか？\" mục đích là?"},
        "options": ["利用者に温度を教える", "利用者の好みを確認し安全を確保する", "お湯の量を聞く", "入浴を断る"],
        "correct": 1,
        "explanation": {"ja": "利用者の好みを確認しながら安全な温度であることを知らせ、同意を得ています。", "vi": "Vừa xác nhận sở thích vừa thông báo nhiệt độ an toàn và lấy sự đồng ý của người dùng."},
        "difficulty": "medium"
      },
      {
        "number": 16,
        "section": "会話",
        "question": {"ja": "「一緒に散歩しませんか？」の「ませんか」は？", "vi": "\"ませんか\" trong \"一緒に散歩しませんか？\" là?"},
        "options": ["否定", "丁寧な誘い・提案", "禁止", "義務"],
        "correct": 1,
        "explanation": {"ja": "「〜ませんか？」は丁寧な誘いを表します。", "vi": "\"〜ませんか？\" biểu thị lời mời lịch sự."},
        "difficulty": "medium"
      },
      {
        "number": 17,
        "section": "会話",
        "question": {"ja": "「終わったらナースコールを押してください」は何の場面？", "vi": "\"終わったらナースコールを押してください\" là tình huống gì?"},
        "options": ["食事介助", "排泄介助でトイレに入ってもらうとき", "入浴後", "バイタル測定中"],
        "correct": 1,
        "explanation": {"ja": "トイレ誘導後に「終わったらナースコールを押して」と伝えるのが一般的です。", "vi": "Sau khi dẫn vào nhà vệ sinh, thường nói \"Khi xong thì bấm chuông gọi\"."},
        "difficulty": "medium"
      },
      {
        "number": 18,
        "section": "会話",
        "question": {"ja": "認知症の方が「家に帰りたい」と言ったとき、正しい対応は？", "vi": "Khi người bị sa sút trí tuệ nói \"家に帰りたい\", cách ứng xử đúng là?"},
        "options": ["「ここが家ですよ」と否定する", "気持ちに共感し別の話題へ誘う", "無視する", "叱る"],
        "correct": 1,
        "explanation": {"ja": "バリデーション技法では否定せず共感し、自然に別の話題や行動へ移行します。", "vi": "Kỹ thuật Validation không phủ nhận, đồng cảm rồi tự nhiên chuyển sang chủ đề hoặc hành động khác."},
        "difficulty": "medium"
      },
      {
        "number": 19,
        "section": "会話",
        "question": {"ja": "「大丈夫ですか？」はどんな場面で使う？", "vi": "\"大丈夫ですか？\" được dùng trong tình huống nào?"},
        "options": ["食事の注文", "利用者の状態確認・心配をするとき", "書類の記入", "レクリエーション中"],
        "correct": 1,
        "explanation": {"ja": "「大丈夫ですか？」は相手の状態を心配して確認するときに使います。", "vi": "\"大丈夫ですか？\" dùng khi lo lắng và muốn xác nhận tình trạng của đối phương."},
        "difficulty": "easy"
      },
      {
        "number": 20,
        "section": "会話",
        "question": {"ja": "「せーの！」はどんな場面で使う？", "vi": "\"せーの！\" được dùng trong tình huống nào?"},
        "options": ["食事のとき", "移乗・立ち上がりなど力を合わせるとき", "寝るとき", "薬を飲むとき"],
        "correct": 1,
        "explanation": {"ja": "「せーの」は「いち、に、さん」の代わりにタイミングを合わせるための掛け声です。", "vi": "\"せーの\" là tiếng hô để phối hợp thời điểm, thay cho \"1, 2, 3\"."},
        "difficulty": "medium"
      },
      {
        "number": 21,
        "section": "会話",
        "question": {"ja": "「残してもいいですよ」と言う意味は？", "vi": "\"残してもいいですよ\" có ý nghĩa gì?"},
        "options": ["全部食べなさい", "食べ残しを許可する（無理しなくていい）", "食事を取り上げる", "もっと食べてほしい"],
        "correct": 1,
        "explanation": {"ja": "利用者の意思を尊重し、無理に食べさせないことを示します。", "vi": "Tôn trọng ý muốn của người dùng, cho thấy không ép ăn."},
        "difficulty": "medium"
      },
      {
        "number": 22,
        "section": "会話",
        "question": {"ja": "緊急時に「冷静に対応しましょう」と言う理由は？", "vi": "Lý do nói \"冷静に対応しましょう\" trong khẩn cấp là?"},
        "options": ["格好いいから", "パニックを防ぎ正確な判断をするため", "時間を節約するため", "上司の命令だから"],
        "correct": 1,
        "explanation": {"ja": "冷静に行動することで判断ミスを防ぎ、適切な対応ができます。", "vi": "Hành động bình tĩnh ngăn sai lầm trong phán đoán và có thể ứng phó phù hợp."},
        "difficulty": "medium"
      },
      {
        "number": 23,
        "section": "読解",
        "passage": {"ja": "今日は山田さんの入浴介助をしました。お湯の温度は38度にしました。床が滑りやすかったので、手すりをしっかり持つように声をかけました。山田さんは「気持ちいいね」とおっしゃっていました。", "vi": "Hôm nay tôi hỗ trợ ông Yamada tắm. Tôi chỉnh nhiệt độ nước là 38 độ. Vì sàn dễ trơn nên tôi nhắc ông nắm chắc tay vịn. Ông Yamada nói \"Dễ chịu thật\"."},
        "question": {"ja": "お湯の温度は何度でしたか？", "vi": "Nhiệt độ nước là bao nhiêu?"},
        "options": ["40度", "38度", "36度", "42度"],
        "correct": 1,
        "explanation": {"ja": "文章に「お湯の温度は38度にしました」とあります。", "vi": "Trong đoạn văn có \"お湯の温度は38度にしました\" (Tôi chỉnh nhiệt độ nước là 38 độ)."},
        "difficulty": "easy"
      },
      {
        "number": 24,
        "section": "読解",
        "passage": {"ja": "今日は山田さんの入浴介助をしました。お湯の温度は38度にしました。床が滑りやすかったので、手すりをしっかり持つように声をかけました。山田さんは「気持ちいいね」とおっしゃっていました。", "vi": "Hôm nay tôi hỗ trợ ông Yamada tắm. Tôi chỉnh nhiệt độ nước là 38 độ. Vì sàn dễ trơn nên tôi nhắc ông nắm chắc tay vịn. Ông Yamada nói \"Dễ chịう thật\"."},
        "question": {"ja": "なぜ手すりを持つように声をかけましたか？", "vi": "Tại sao nhắc ông nắm tay vịn?"},
        "options": ["山田さんが手すりが好きだから", "床が滑りやすかったから", "手すりがきれいだから", "決まりだから"],
        "correct": 1,
        "explanation": {"ja": "文章に「床が滑りやすかったので」とあります。転倒防止のためです。", "vi": "Trong đoạn văn có \"床が滑りやすかったので\" (Vì sàn dễ trơn). Để phòng ngã."},
        "difficulty": "medium"
      },
      {
        "number": 25,
        "section": "読解",
        "passage": {"ja": "介護士は毎日「ほうれんそう」を実践しています。バイタルに異常があれば看護師に報告し、利用者の変化は申し送りで連絡します。わからないことはチームで相談して解決します。", "vi": "Nhân viên chăm sóc thực hành \"ほうれんそう\" mỗi ngày. Nếu sinh hiệu có bất thường thì báo cáo y tá, thay đổi của người dùng thì liên lạc trong bàn giao ca. Điều không biết thì tham khảo với nhóm để giải quyết."},
        "question": {"ja": "バイタルに異常があったとき、誰に報告しますか？", "vi": "Khi sinh hiệu có bất thường, báo cáo cho ai?"},
        "options": ["家族", "看護師", "利用者本人", "管理者"],
        "correct": 1,
        "explanation": {"ja": "文章に「バイタルに異常があれば看護師に報告し」とあります。", "vi": "Trong đoạn văn có \"バイタルに異常があれば看護師に報告し\" (Nếu sinh hiệu có bất thường thì báo cáo y tá)."},
        "difficulty": "medium"
      },
      {
        "number": 26,
        "section": "読解",
        "passage": {"ja": "介護士は毎日「ほうれんそう」を実践しています。バイタルに異常があれば看護師に報告し、利用者の変化は申し送りで連絡します。わからないことはチームで相談して解決します。", "vi": "Nhân viên chăm sóc thực hành \"ほうれんそう\" mỗi ngày. Nếu sinh hiệu có bất thường thì báo cáo y tá, thay đổi của người dùng thì liên lạc trong bàn giao ca. Điều không biết thì tham khảo với nhóm để giải quyết."},
        "question": {"ja": "「わからないこと」はどうやって解決しますか？", "vi": "\"điều không biết\" được giải quyết bằng cách nào?"},
        "options": ["一人で考える", "チームで相談する", "無視する", "インターネットで調べる"],
        "correct": 1,
        "explanation": {"ja": "文章に「わからないことはチームで相談して解決します」とあります。", "vi": "Trong đoạn văn có \"わからないことはチームで相談して解決します\" (Điều không biết thì tham khảo với nhóm để giải quyết)."},
        "difficulty": "medium"
      },
      {
        "number": 27,
        "section": "読解",
        "passage": {"ja": "鈴木さんは認知症があります。今日は「家に帰りたい」と何度もおっしゃっていました。介護士は否定せず「そうですか、お子さんが待っているんですね」と共感し、お茶を飲むことを提案しました。", "vi": "Ông Suzuki bị sa sút trí tuệ. Hôm nay ông liên tục nói \"Muốn về nhà\". Nhân viên chăm sóc không phủ nhận, đồng cảm \"Vậy à, con ông đang chờ nhỉ\" và đề nghị uống trà."},
        "question": {"ja": "介護士はどのように対応しましたか？", "vi": "Nhân viên chăm sóc đã ứng xử thế nào?"},
        "options": ["「嘘です」と言った", "共感してお茶を提案した", "無視した", "家族に電話した"],
        "correct": 1,
        "explanation": {"ja": "文章に「否定せず共感し、お茶を飲むことを提案しました」とあります。", "vi": "Trong đoạn văn có \"不否定せず共感し、お茶を飲むことを提案しました\" (không phủ nhận, đồng cảm và đề nghị uống trà)."},
        "difficulty": "medium"
      },
      {
        "number": 28,
        "section": "読解",
        "passage": {"ja": "鈴木さんは認知症があります。今日は「家に帰りたい」と何度もおっしゃっていました。介護士は否定せず「そうですか、お子さんが待っているんですね」と共感し、お茶を飲むことを提案しました。", "vi": "Ông Suzuki bị sa sút trí tuệ. Hôm nay ông liên tục nói \"Muốn về nhà\". Nhân viên chăm sóc không phủ nhận, đồng cảm \"Vậy à, con ông đang chờ nhỉ\" và đề nghị uống trà."},
        "question": {"ja": "この対応の技法は何ですか？", "vi": "Kỹ thuật ứng xử này là gì?"},
        "options": ["リハビリテーション", "バリデーション", "バイタル測定", "移乗介助"],
        "correct": 1,
        "explanation": {"ja": "否定せず感情に共感するケア技法はバリデーションです。", "vi": "Kỹ thuật chăm sóc không phủ nhận mà đồng cảm với cảm xúc là Validation."},
        "difficulty": "hard"
      },
      {
        "number": 29,
        "section": "読解",
        "passage": {"ja": "「SBAR」は緊急時の報告形式です。S（状況）B（背景）A（評価）R（提案）の順に報告します。例えば「田中さんが倒れました（S）。朝から頭が痛いと言っていました（B）。意識はあります（A）。すぐに看護師が来てください（R）」", "vi": "\"SBAR\" là hình thức báo cáo trong khẩn cấp. Báo cáo theo thứ tự S (tình huống) B (nền) A (đánh giá) R (đề xuất). Ví dụ \"Bà Tanaka ngã rồi (S). Từ sáng bà nói đau đầu (B). Còn tỉnh táo (A). Hãy đến ngay (R)\""},
        "question": {"ja": "SBARの「A」は何ですか？", "vi": "\"A\" trong SBAR là gì?"},
        "options": ["状況（Situation）", "背景（Background）", "評価（Assessment）", "提案（Recommendation）"],
        "correct": 2,
        "explanation": {"ja": "SBARのA＝Assessment（評価）＝現在の状態の評価です。", "vi": "A trong SBAR = Assessment (đánh giá) = đánh giá trạng thái hiện tại."},
        "difficulty": "hard"
      },
      {
        "number": 30,
        "section": "読解",
        "passage": {"ja": "「SBAR」は緊急時の報告形式です。S（状況）B（背景）A（評価）R（提案）の順に報告します。例えば「田中さんが倒れました（S）。朝から頭が痛いと言っていました（B）。意識はあります（A）。すぐに看護師が来てください（R）」", "vi": "\"SBAR\" là hình thức báo cáo trong khẩn cấp. Báo cáo theo thứ tự S (tình huống) B (nền) A (đánh giá) R (đề xuất). Ví dụ \"Bà Tanaka ngã rồi (S). Từ sáng bà nói đau đầu (B). Còn tỉnh táo (A). Hãy đến ngay (R)\""},
        "question": {"ja": "「すぐに看護師が来てください」はSBARのどの部分？", "vi": "\"すぐに看護師が来てください\" thuộc phần nào của SBAR?"},
        "options": ["S（状況）", "B（背景）", "A（評価）", "R（提案）"],
        "correct": 3,
        "explanation": {"ja": "「〜してください」という提案・依頼部分はR（Recommendation）です。", "vi": "Phần đề xuất, yêu cầu \"〜してください\" là R (Recommendation)."},
        "difficulty": "hard"
      }
    ]
  }'::jsonb,
  2, 50
);


INSERT INTO lessons (course_id, title, content, quiz_data, sort_order, xp_reward) VALUES (
  (SELECT id FROM courses WHERE jlpt_level = 'N5' AND category = 'mock' LIMIT 1),
  '{"ja": "模擬試験 第3回（総合・応用）", "vi": "Đề thi thử số 3 (Tổng hợp và ứng dụng)"}'::jsonb,
  '{
    "type": "mock",
    "set_number": 3,
    "intro": {
      "ja": "第3回総合模擬試験。N5レベルの全範囲から出題。介護現場での実践的な日本語力を確認します。時間の目安：45分",
      "vi": "Đề thi thử tổng hợp số 3. Câu hỏi từ toàn bộ phạm vi cấp N5. Xác nhận năng lực tiếng Nhật thực tế tại nơi làm việc chăm sóc. Thời gian tham khảo: 45 phút"
    },
    "sections": [
      {"name_ja": "語彙・漢字", "name_vi": "Từ vựng và chữ Hán", "questions": "1-10"},
      {"name_ja": "文法・表現", "name_vi": "Ngữ pháp và cách diễn đạt", "questions": "11-22"},
      {"name_ja": "読解・応用", "name_vi": "Đọc hiểu và ứng dụng", "questions": "23-30"}
    ]
  }'::jsonb,
  '{
    "questions": [
      {
        "number": 1,
        "section": "語彙",
        "question": {"ja": "「みゃくはく」の漢字は？", "vi": "Chữ Hán của \"みゃくはく\" là?"},
        "options": ["脈拍", "脈白", "命拍", "脈博"],
        "correct": 0,
        "explanation": {"ja": "脈拍（みゃくはく）は心臓の拍動が血管に伝わる動きです。", "vi": "脈拍（みゃくはく）là chuyển động của nhịp tim truyền qua mạch máu."},
        "difficulty": "medium"
      },
      {
        "number": 2,
        "section": "語彙",
        "question": {"ja": "「かいごし」のベトナム語訳は？", "vi": "Dịch \"かいごし\" sang tiếng Việt là?"},
        "options": ["bác sĩ", "y tá", "nhân viên chăm sóc", "nhân viên hành chính"],
        "correct": 2,
        "explanation": {"ja": "介護士（かいごし）は介護の専門職員です。", "vi": "介護士（かいごし）là nhân viên chuyên môn chăm sóc."},
        "difficulty": "easy"
      },
      {
        "number": 3,
        "section": "語彙",
        "question": {"ja": "「りようしゃ」の漢字は？", "vi": "Chữ Hán của \"りようしゃ\" là?"},
        "options": ["利用者", "旅行者", "料理者", "理容者"],
        "correct": 0,
        "explanation": {"ja": "利用者（りようしゃ）は施設のサービスを利用する人です。", "vi": "利用者（りようしゃ）là người sử dụng dịch vụ của cơ sở."},
        "difficulty": "easy"
      },
      {
        "number": 4,
        "section": "語彙",
        "question": {"ja": "「てすり」の意味は？", "vi": "\"てすり\" có nghĩa là?"},
        "options": ["タオル", "手袋", "手すり（安全バー）", "手洗い"],
        "correct": 2,
        "explanation": {"ja": "手すり（てすり）はトイレや廊下に設置された安全のためのバーです。", "vi": "手すり（てすり）là thanh vịn an toàn lắp ở nhà vệ sinh hay hành lang."},
        "difficulty": "easy"
      },
      {
        "number": 5,
        "section": "語彙",
        "question": {"ja": "「じゅうしん」（重心）の意味は？", "vi": "\"じゅうしん\" (重心) có nghĩa là?"},
        "options": ["体重", "重さの中心（バランス）", "心の重さ", "重要なこと"],
        "correct": 1,
        "explanation": {"ja": "重心（じゅうしん）は物体の重さが均等に分散する中心点です。移乗介助で使います。", "vi": "重心（じゅうしん）là điểm trung tâm nơi trọng lượng vật thể phân bổ đều. Dùng trong hỗ trợ chuyển vị trí."},
        "difficulty": "medium"
      },
      {
        "number": 6,
        "section": "語彙",
        "question": {"ja": "「たおれる」のベトナム語訳は？", "vi": "Dịch \"たおれる\" sang tiếng Việt là?"},
        "options": ["đứng dậy", "ngã xuống, ngất", "ngồi xuống", "nằm xuống"],
        "correct": 1,
        "explanation": {"ja": "倒れる（たおれる）は立っている状態から横になる・崩れることです。", "vi": "倒れる（たおれる）là từ trạng thái đứng bị ngã hoặc sụp xuống."},
        "difficulty": "medium"
      },
      {
        "number": 7,
        "section": "語彙",
        "question": {"ja": "「きゅうきゅうしゃ」の役割は？", "vi": "Chức năng của \"きゅうきゅうしゃ\" là?"},
        "options": ["荷物を運ぶ", "緊急患者を病院に運ぶ", "薬を配達する", "食事を運ぶ"],
        "correct": 1,
        "explanation": {"ja": "救急車（きゅうきゅうしゃ）は緊急時に患者を病院に搬送する車です。", "vi": "救急車（きゅうきゅうしゃ）là xe vận chuyển bệnh nhân đến bệnh viện trong trường hợp khẩn cấp."},
        "difficulty": "easy"
      },
      {
        "number": 8,
        "section": "語彙",
        "question": {"ja": "「えがお」の意味は？", "vi": "\"えがお\" có nghĩa là?"},
        "options": ["nụ cười", "khuôn mặt buồn", "khuôn mặt mệt mỏi", "khuôn mặt tức giận"],
        "correct": 0,
        "explanation": {"ja": "笑顔（えがお）は笑っている顔・微笑みです。利用者に安心感を与えます。", "vi": "笑顔（えがお）là khuôn mặt đang cười, nụ cười. Mang lại cảm giác an tâm cho người dùng."},
        "difficulty": "easy"
      },
      {
        "number": 9,
        "section": "語彙",
        "question": {"ja": "「よりそう」（寄り添う）の意味は？", "vi": "\"よりそう\" (寄り添う) có nghĩa là?"},
        "options": ["離れる", "ずっとそばにいて支える", "見守る", "記録する"],
        "correct": 1,
        "explanation": {"ja": "寄り添う（よりそう）はそばに寄って支えること。認知症ケアで特に重要です。", "vi": "寄り添う（よりそう）là ở bên cạnh và hỗ trợ. Đặc biệt quan trọng trong chăm sóc sa sút trí tuệ."},
        "difficulty": "medium"
      },
      {
        "number": 10,
        "section": "語彙",
        "question": {"ja": "「ボディメカニクス」とは？", "vi": "\"ボディメカニクス\" là gì?"},
        "options": ["ロボット介護", "力学的に効率的な身体の使い方（腰痛予防）", "体の測定", "運動療法"],
        "correct": 1,
        "explanation": {"ja": "ボディメカニクスは力学原理を使った効率的な身体の使い方で、介護士の腰痛を防ぎます。", "vi": "Body mechanics là cách sử dụng cơ thể hiệu quả dựa trên nguyên lý cơ học, phòng ngừa đau lưng cho nhân viên chăm sóc."},
        "difficulty": "hard"
      },
      {
        "number": 11,
        "section": "文法",
        "question": {"ja": "「ろうかに りようしゃが ＿」正しいのは？", "vi": "Điền đúng vào \"ろうかに りようしゃが ＿\"?"},
        "options": ["あります", "います", "です", "ます"],
        "correct": 1,
        "explanation": {"ja": "人の存在は「います」を使います。", "vi": "Sự tồn tại của người dùng \"います\"."},
        "difficulty": "easy"
      },
      {
        "number": 12,
        "section": "文法",
        "question": {"ja": "「あらう」のて形は？", "vi": "Dạng て của \"あらう\" là?"},
        "options": ["あらって", "あらいて", "あって", "あらえて"],
        "correct": 0,
        "explanation": {"ja": "う→って（あらう→あらって）です。", "vi": "う→って (あらう→あらって)."},
        "difficulty": "easy"
      },
      {
        "number": 13,
        "section": "文法",
        "question": {"ja": "「一緒に歩き＿」利用者を誘う表現は？", "vi": "Cách điền để mời người dùng cùng đi trong \"一緒に歩き＿\"?"},
        "options": ["たい", "ませんか", "ましょう", "ます"],
        "correct": 1,
        "explanation": {"ja": "「〜ませんか？」は相手の意向を尊重した丁寧な誘いです。", "vi": "\"〜ませんか？\" là lời mời lịch sự tôn trọng ý muốn của đối phương."},
        "difficulty": "medium"
      },
      {
        "number": 14,
        "section": "文法",
        "question": {"ja": "「この体温計はたいおんをはかる＿つかいます」の＿は？", "vi": "Điền vào \"この体温計はたいおんをはかる＿つかいます\"?"},
        "options": ["ために", "のに", "けれど", "から"],
        "correct": 1,
        "explanation": {"ja": "「〜のに使う」は目的を表す表現です。", "vi": "\"〜のに使う\" là cách diễn đạt chỉ mục đích."},
        "difficulty": "medium"
      },
      {
        "number": 15,
        "section": "文法",
        "question": {"ja": "「ゆかが すべるから、てすりを もって＿」の＿は？", "vi": "Điền vào \"ゆかが すべるから、てすりを もって＿\"?"},
        "options": ["ください", "います", "ません", "ましょうか"],
        "correct": 0,
        "explanation": {"ja": "「〜てください」は丁寧な依頼・指示です。", "vi": "\"〜てください\" là yêu cầu, hướng dẫn lịch sự."},
        "difficulty": "medium"
      },
      {
        "number": 16,
        "section": "文法",
        "question": {"ja": "「ひとりで たちあがら＿でください」の＿は？", "vi": "Điền vào \"ひとりで たちあがら＿でください\"?"},
        "options": ["て", "ない", "れ", "い"],
        "correct": 1,
        "explanation": {"ja": "「〜ないでください」は禁止・注意の表現。「たちあがらないでください」となります。", "vi": "\"〜ないでください\" là cách diễn đạt cấm/nhắc nhở. Thành \"たちあがらないでください\"."},
        "difficulty": "medium"
      },
      {
        "number": 17,
        "section": "文法",
        "question": {"ja": "「きろくを かか＿なりません」の＿は？", "vi": "Điền vào \"きろくを かか＿なりません\"?"},
        "options": ["なければ", "ないで", "なくて", "ないと"],
        "correct": 0,
        "explanation": {"ja": "「〜なければなりません」は義務を表します。", "vi": "\"〜なければなりません\" biểu thị nghĩa vụ."},
        "difficulty": "medium"
      },
      {
        "number": 18,
        "section": "文法",
        "question": {"ja": "「みずを のみ＿です」（希望）の＿は？", "vi": "Điền vào \"みずを のみ＿です\" (mong muốn)?"},
        "options": ["ます", "たい", "て", "ない"],
        "correct": 1,
        "explanation": {"ja": "「〜たいです」は希望・願望を表します。", "vi": "\"〜たいです\" biểu thị mong muốn, nguyện vọng."},
        "difficulty": "easy"
      },
      {
        "number": 19,
        "section": "文法",
        "question": {"ja": "「たなかさんは ねて＿」（現在進行形）の＿は？", "vi": "Điền vào \"たなかさんは ねて＿\" (tiến hành hiện tại)?"},
        "options": ["います", "ます", "ある", "いない"],
        "correct": 0,
        "explanation": {"ja": "「〜ています」は現在進行中の動作を表します。", "vi": "\"〜ています\" biểu thị hành động đang tiến hành hiện tại."},
        "difficulty": "easy"
      },
      {
        "number": 20,
        "section": "文法",
        "question": {"ja": "「かいごの しごとを した＿があります」（経験）の＿は？", "vi": "Điền vào \"かいごの しごとを した＿があります\" (kinh nghiệm)?"},
        "options": ["こと", "もの", "とき", "ため"],
        "correct": 0,
        "explanation": {"ja": "「〜たことがあります」は経験を表す表現です。", "vi": "\"〜たことがあります\" là cách diễn đạt kinh nghiệm."},
        "difficulty": "medium"
      },
      {
        "number": 21,
        "section": "文法",
        "question": {"ja": "「ねつが ある＿おもいます」（推量）の＿は？", "vi": "Điền vào \"ねつが ある＿おもいます\" (suy đoán)?"},
        "options": ["と", "が", "で", "を"],
        "correct": 0,
        "explanation": {"ja": "「〜と思います」は意見・推量を表す表現です。", "vi": "\"〜と思います\" là cách diễn đạt ý kiến, suy đoán."},
        "difficulty": "medium"
      },
      {
        "number": 22,
        "section": "文法",
        "question": {"ja": "「ベッドから おりない＿ください」（禁止）の＿は？", "vi": "Điền vào \"ベッドから おりない＿ください\" (cấm)?"},
        "options": ["で", "て", "を", "に"],
        "correct": 0,
        "explanation": {"ja": "「〜ないでください」は丁寧な禁止を表します。", "vi": "\"〜ないでください\" biểu thị cấm lịch sự."},
        "difficulty": "medium"
      },
      {
        "number": 23,
        "section": "読解",
        "passage": {"ja": "介護では「インフォームドコンセント」が大切です。何かをする前に、利用者に説明し、同意を得ることが必要です。「〜してもいいですか？」と許可を求めることで、利用者の自己決定を尊重します。", "vi": "Trong chăm sóc, \"Informed Consent\" rất quan trọng. Trước khi làm gì, cần giải thích cho người dùng và lấy sự đồng ý. Bằng cách xin phép \"〜してもいいですか？\", chúng ta tôn trọng quyền tự quyết của người dùng."},
        "question": {"ja": "「インフォームドコンセント」とは？", "vi": "\"インフォームドコンセント\" là gì?"},
        "options": ["緊急対応", "説明と同意", "記録の記入", "申し送り"],
        "correct": 1,
        "explanation": {"ja": "インフォームドコンセント＝Informed Consent＝説明と同意です。", "vi": "インフォームドコンセント = Informed Consent = giải thích và đồng ý."},
        "difficulty": "medium"
      },
      {
        "number": 24,
        "section": "読解",
        "passage": {"ja": "介護では「インフォームドコンセント」が大切です。何かをする前に、利用者に説明し、同意を得ることが必要です。「〜してもいいですか？」と許可を求めることで、利用者の自己決定を尊重します。", "vi": "Trong chăm sóc, \"Informed Consent\" rất quan trọng. Trước khi làm gì, cần giải thích cho người dùng và lấy sự đồng ý. Bằng cách xin phép \"〜してもいいですか？\", chúng ta tôn trọng quyền tự quyết của người dùng."},
        "question": {"ja": "「自己決定」を尊重するための表現は？", "vi": "Cách diễn đạt để tôn trọng \"自己決定\" là?"},
        "options": ["〜てください", "〜してもいいですか？", "〜なければなりません", "〜ましょう"],
        "correct": 1,
        "explanation": {"ja": "「〜してもいいですか？」は利用者に許可を求め、自己決定を尊重する表現です。", "vi": "\"〜してもいいですか？\" là cách xin phép người dùng, tôn trọng quyền tự quyết."},
        "difficulty": "medium"
      },
      {
        "number": 25,
        "section": "読解",
        "passage": {"ja": "移乗介助では安全が最優先です。①ブレーキを確認する、②フットレストを外す、③重心を前にかける、④立ち上がる、⑤安全に座る、という順序を守ります。", "vi": "Trong hỗ trợ chuyển vị trí, an toàn là ưu tiên hàng đầu. Tuân theo thứ tự: ①Kiểm tra phanh, ②Tháo gác chân, ③Dồn trọng tâm ra trước, ④Đứng dậy, ⑤Ngồi xuống an toàn."},
        "question": {"ja": "移乗介助の手順として正しい順序は？", "vi": "Thứ tự đúng của quy trình hỗ trợ chuyển vị trí là?"},
        "options": ["立つ→ブレーキ→重心→座る", "ブレーキ→フットレスト外す→重心前→立つ→座る", "重心→ブレーキ→立つ→フットレスト→座る", "フットレスト→立つ→ブレーキ→重心→座る"],
        "correct": 1,
        "explanation": {"ja": "正しい手順：ブレーキ→フットレストを外す→重心を前→立つ→座る です。", "vi": "Thứ tự đúng: Phanh → Tháo gác chân → Trọng tâm ra trước → Đứng → Ngồi."},
        "difficulty": "hard"
      },
      {
        "number": 26,
        "section": "読解",
        "passage": {"ja": "移乗介助では安全が最優先です。①ブレーキを確認する、②フットレストを外す、③重心を前にかける、④立ち上がる、⑤安全に座る、という順序を守ります。", "vi": "Trong hỗ trợ chuyển vị trí, an toàn là ưu tiên hàng đầu. Tuân theo thứ tự: ①Kiểm tra phanh, ②Tháo gác chân, ③Dồn trọng tâm ra trước, ④Đứng dậy, ⑤Ngồi xuống an toàn."},
        "question": {"ja": "「重心を前にかける」は何番目の手順？", "vi": "\"重心を前にかける\" là bước thứ mấy?"},
        "options": ["1番目", "2番目", "3番目", "4番目"],
        "correct": 2,
        "explanation": {"ja": "①ブレーキ→②フットレスト→③重心を前にかける、なので3番目です。", "vi": "①Phanh → ②Gác chân → ③Dồn trọng tâm ra trước, nên là bước thứ 3."},
        "difficulty": "medium"
      },
      {
        "number": 27,
        "section": "読解",
        "passage": {"ja": "介護士のAさんは今日の申し送りで「田中さんは午後から熱が37.5度あります。食事は半分食べられました。水分摂取は少ないと思います。引き続き観察をお願いします」と伝えました。", "vi": "Nhân viên chăm sóc A hôm nay bàn giao ca: \"Bà Tanaka từ chiều sốt 37.5 độ. Ăn được một nửa bữa ăn. Tôi nghĩ uống nước ít. Nhờ tiếp tục theo dõi\"."},
        "question": {"ja": "田中さんの体温は何度ですか？", "vi": "Nhiệt độ của bà Tanaka là bao nhiêu?"},
        "options": ["36.5度", "37度", "37.5度", "38度"],
        "correct": 2,
        "explanation": {"ja": "申し送りに「熱が37.5度あります」とあります。", "vi": "Trong bàn giao ca có \"熱が37.5度あります\" (sốt 37.5 độ)."},
        "difficulty": "easy"
      },
      {
        "number": 28,
        "section": "読解",
        "passage": {"ja": "介護士のAさんは今日の申し送りで「田中さんは午後から熱が37.5度あります。食事は半分食べられました。水分摂取は少ないと思います。引き続き観察をお願いします」と伝えました。", "vi": "Nhân viên chăm sóc A hôm nay bàn giao ca: \"Bà Tanaka từ chiều sốt 37.5 độ. Ăn được một nửa bữa ăn. Tôi nghĩ uống nước ít. Nhờ tiếp tục theo dõi\"."},
        "question": {"ja": "「水分摂取は少ないと思います」のような表現を使う理由は？", "vi": "Lý do dùng cách diễn đạt như \"水分摂取は少ないと思います\" là?"},
        "options": ["確実にわかっているから", "測定したから", "推量・観察であることを示すため", "記録に書いてあるから"],
        "correct": 2,
        "explanation": {"ja": "「〜と思います」は確定ではなく観察・推量であることを示します。報告に適切な表現です。", "vi": "\"〜と思います\" cho thấy đây là quan sát, suy đoán chứ không chắc chắn. Là cách diễn đạt phù hợp trong báo cáo."},
        "difficulty": "hard"
      },
      {
        "number": 29,
        "section": "読解",
        "passage": {"ja": "日本の介護では「人権の尊重」「自立支援」「社会参加」の3つの理念が重要です。利用者を一人の人間として尊重し、できることは自分でしてもらい、社会との繋がりを保ちます。", "vi": "Trong chăm sóc Nhật Bản, 3 lý niệm \"尊重nhân quyền\", \"Hỗ trợ tự lập\" và \"Tham gia xã hội\" rất quan trọng. Tôn trọng người dùng như một con người, để họ tự làm những gì có thể và duy trì mối liên kết với xã hội."},
        "question": {"ja": "介護の3つの理念として含まれないのは？", "vi": "Điều nào không thuộc 3 lý niệm của chăm sóc?"},
        "options": ["人権の尊重", "自立支援", "社会参加", "効率優先"],
        "correct": 3,
        "explanation": {"ja": "3つの理念は「人権の尊重」「自立支援」「社会参加」です。効率優先は含まれません。", "vi": "3 lý niệm là \"Tôn trọng nhân quyền\", \"Hỗ trợ tự lập\", \"Tham gia xã hội\". Hiệu quả ưu tiên không thuộc nhóm này."},
        "difficulty": "hard"
      },
      {
        "number": 30,
        "section": "読解",
        "passage": {"ja": "日本の介護では「人権の尊重」「自立支援」「社会参加」の3つの理念が重要です。利用者を一人の人間として尊重し、できることは自分でしてもらい、社会との繋がりを保ちます。", "vi": "Trong chăm sóc Nhật Bản, 3 lý niệm \"Tôn trọng nhân quyền\", \"Hỗ trợ tự lập\" và \"Tham gia xã hội\" rất quan trọng. Tôn trọng người dùng như một con người, để họ tự làm những gì có thể và duy trì mối liên kết với xã hội."},
        "question": {"ja": "「自立支援」の説明として正しいのは？", "vi": "Mô tả đúng về \"自立支援\" là?"},
        "options": ["全て介護士がする", "できることは自分でしてもらう", "利用者を部屋に閉じ込める", "家族に全てまかせる"],
        "correct": 1,
        "explanation": {"ja": "自立支援はできることは自分でしてもらい、できないことのみ支援する考え方です。", "vi": "自立支援là quan niệm để người dùng tự làm những gì có thể, chỉ hỗ trợ những gì không làm được."},
        "difficulty": "medium"
      }
    ]
  }'::jsonb,
  3, 50
);

