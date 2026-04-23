-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Mediflow Academy N5 Vocabulary Units 8-10 COMPLETE
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Complete set of 12 vocabulary lessons (Units 8-10)

-- ═══════════════════════════════════════════════════
-- UNIT 8 LESSON 3: Positive な-Adjectives
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  8,
  3,
  'vocabulary',
  '{
    "intro": {"ja": "良い性質や良い状態を表すな形容詞を学びます。「美しい」「役に立つ」「大切な」など、ポジティブな言葉です。患者さんへの褒め言葉や、環境の説明に使えます。", "vi": "Học các tính từ kết thúc bằng な biểu hiện các đặc điểm tốt hoặc tình trạng tốt. \"Đẹp\", \"Hữu ích\", \"Quan trọng\"... những từ tích cực. Có thể dùng để khen ngợi bệnh nhân hoặc miêu tả môi trường."},
    "words": [
      {"word": "美しい", "reading": "うつくしい", "kanji": "美しい", "meaning": {"ja": "見た目が良い、きれい", "vi": "nhìn đẹp, xinh đẹp"}, "examples": [{"ja": "美しい花です。", "vi": "Hoa xinh đẹp."},{"ja": "美しい景色を見ました。", "vi": "Nhìn thấy cảnh đẹp."}], "care_example": "患者さんの美しい笑顔は、介護職の心を励まします。"},
      {"word": "役に立つ", "reading": "やくにたつ", "kanji": "役に立つ", "meaning": {"ja": "有用である、役立つ", "vi": "hữu ích, giúp ích"}, "examples": [{"ja": "役に立つ情報です。", "vi": "Thông tin hữu ích."},{"ja": "この道具は役に立ちます。", "vi": "Công cụ này rất hữu ích."}], "care_example": "介護用具の選択は、患者さんの生活を改善するために役に立ちます。"},
      {"word": "素晴らしい", "reading": "すばらしい", "kanji": "素晴らしい", "meaning": {"ja": "非常に良い、素晴らしい", "vi": "tuyệt vời, lпотрясающе"}, "examples": [{"ja": "素晴らしい結果です。", "vi": "Kết quả tuyệt vời."},{"ja": "素晴らしい経験でした。", "vi": "Đó là một trải nghiệm tuyệt vời."}], "care_example": "患者さんの回復は素晴らしい進歩です。"},
      {"word": "大切な", "reading": "たいせつな", "kanji": "大切な", "meaning": {"ja": "重要である、値打ちのある", "vi": "quan trọng, quý báu"}, "examples": [{"ja": "大切な人です。", "vi": "Người quan trọng."},{"ja": "大切な時間を過ごしました。", "vi": "Dành thời gian quan trọng."}], "care_example": "患者さんとの信頼関係は介護職にとって大切です。"},
      {"word": "安全な", "reading": "あんぜんな", "kanji": "安全な", "meaning": {"ja": "危なくない、安全である", "vi": "an toàn, không nguy hiểm"}, "examples": [{"ja": "安全な場所です。", "vi": "Nơi an toàn."},{"ja": "安全な方法を使用します。", "vi": "Sử dụng phương pháp an toàn."}], "care_example": "患者さんの安全を確保することは介護職の最優先事項です。"},
      {"word": "効果的な", "reading": "こうかてきな", "kanji": "効果的な", "meaning": {"ja": "効果がある、効き目のある", "vi": "hiệu quả, có tác dụng"}, "examples": [{"ja": "効果的な治療法です。", "vi": "Phương pháp điều trị hiệu quả."},{"ja": "効果的な学習方法です。", "vi": "Phương pháp học tập hiệu quả."}], "care_example": "効果的なケア計画により、患者さんの生活の質が向上します。"},
      {"word": "健康的な", "reading": "けんこうてきな", "kanji": "健康的な", "meaning": {"ja": "健康に良い、健康である", "vi": "lành mạnh, có lợi cho sức khỏe"}, "examples": [{"ja": "健康的な食事です。", "vi": "Chế độ ăn lành mạnh."},{"ja": "健康的な生活を送ります。", "vi": "Sống cuộc sống lành mạnh."}], "care_example": "介護職は患者さんが健康的な生活を続けられるようにサポートします。"},
      {"word": "正確な", "reading": "せいかくな", "kanji": "正確な", "meaning": {"ja": "正しい、間違いがない", "vi": "chính xác, không lỗi"}, "examples": [{"ja": "正確な情報です。", "vi": "Thông tin chính xác."},{"ja": "正確に測定します。", "vi": "Đo lường một cách chính xác."}], "care_example": "患者さんの症状を正確に記録することは医療安全に不可欠です。"}
    ],
    "dialogue": ["介護職: 「患者さんの美しい笑顔が見えます。」", "患者さん: 「ありがとうございます。」", "介護職: 「安全で効果的なケアを提供することが大切です。」", "患者さん: 「本当にそうですね。」", "介護職: 「健康的な食事と運動が大切です。」", "患者さん: 「わかりました。頑張ります。」", "介護職: 「素晴らしい。応援しています。」"],
    "key_phrases": [{"ja": "安全で効果的なケア", "vi": "Chăm sóc an toàn và hiệu quả"},{"ja": "健康的な生活", "vi": "Cuộc sống lành mạnh"},{"ja": "正確な情報", "vi": "Thông tin chính xác"},{"ja": "大切な信頼関係", "vi": "Mối quan hệ tin cậy quan trọng"}],
    "cultural_note": {"ja": "介護職として、患者さんの尊厳を守り、安全で効果的で健康的なケアを提供することが職業倫理の基本です。", "vi": "Là nhân viên chăm sóc, bảo vệ nhân phẩm của bệnh nhân và cung cấp chăm sóc an toàn, hiệu quả và lành mạnh là cơ sở của đạo đức nghề nghiệp."},
    "quiz": [
      {"question": {"ja": "「安全な」ケアとは何ですか？", "vi": "Chăm sóc \"an toàn\" là gì?"}, "options": [{"ja": "速い", "vi": "Nhanh"},{"ja": "危なくない方法で行う", "vi": "Được thực hiện bằng cách không nguy hiểm"},{"ja": "簡単である", "vi": "Đơn giản"},{"ja": "安いケア", "vi": "Chăm sóc rẻ"}], "correct_answer": 1, "explanation": {"ja": "安全なケアは、患者さんや職員に危害を加えない方法で行われます。", "vi": "Chăm sóc an toàn được thực hiện bằng cách không gây hại cho bệnh nhân hay nhân viên."}, "difficulty": "easy"},
      {"question": {"ja": "「大切な」信頼関係を築くために何が必要ですか？", "vi": "Để xây dựng mối quan hệ \"quan trọng\" dựa trên tin tưởng cần gì?"}, "options": [{"ja": "金銭",  "vi": "Tiền bạc"},{"ja": "時間だけ", "vi": "Chỉ thời gian"},{"ja": "正確なコミュニケーションと一貫性のある行動", "vi": "Giao tiếp chính xác và hành động nhất quán"},{"ja": "権力", "vi": "Quyền lực"}], "correct_answer": 2, "explanation": {"ja": "信頼は、正確で一貫性のあるコミュニケーションと行動によって築かれます。", "vi": "Niềm tin được xây dựng thông qua giao tiếp chính xác và hành động nhất quán."}, "difficulty": "medium"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 8 LESSON 4: Negative な-Adjectives
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  8,
  4,
  'vocabulary',
  '{
    "intro": {"ja": "悪い状態や避けるべき特性を表すな形容詞を学びます。「信頼できない」「不必要な」「異常な」など、ネガティブな言葉です。患者さんのリスク評価や改善が必要な点を説明する時に使えます。", "vi": "Học các tính từ kết thúc bằng な biểu hiện các tình trạng xấu hoặc các đặc điểm nên tránh. \"Không đáng tin\", \"Không cần thiết\", \"Bất thường\"... những từ tiêu cực. Có thể sử dụng khi mô tả rủi ro của bệnh nhân hoặc những vấn đề cần cải thiện."},
    "words": [
      {"word": "信頼できない", "reading": "しんらいできない", "kanji": "信頼できない", "meaning": {"ja": "信用できない、当てにならない", "vi": "không đáng tin, không đáng cậy"}, "examples": [{"ja": "信頼できない情報源です。", "vi": "Nguồn thông tin không đáng tin."},{"ja": "信頼できない人は避けます。", "vi": "Tránh những người không đáng tin."}], "care_example": "信頼できない情報源から情報を得ることは避けるべきです。"},
      {"word": "不必要な", "reading": "ふひつような", "kanji": "不必要な", "meaning": {"ja": "必要ではない、無駄である", "vi": "không cần thiết, lãng phí"}, "examples": [{"ja": "不必要な検査は避けます。", "vi": "Tránh những xét nghiệm không cần thiết."},{"ja": "不必要な費用を削減します。", "vi": "Giảm chi phí không cần thiết."}], "care_example": "不必要な医療行為は患者さんの負担になるため、避けるべきです。"},
      {"word": "異常な", "reading": "いじょうな", "kanji": "異常な", "meaning": {"ja": "普通ではない、おかしい", "vi": "bất thường, lạ thường"}, "examples": [{"ja": "異常な症状です。", "vi": "Triệu chứng bất thường."},{"ja": "異常な動きを観察します。", "vi": "Quan sát chuyển động bất thường."}], "care_example": "患者さんの異常な変化を早期に発見することが重要です。"},
      {"word": "危険な", "reading": "きけんな", "kanji": "危険な", "meaning": {"ja": "危ない、リスクがある", "vi": "nguy hiểm, có rủi ro"}, "examples": [{"ja": "危険な状況です。", "vi": "Tình huống nguy hiểm."},{"ja": "危険な行為は禁止です。", "vi": "Hành vi nguy hiểm bị cấm."}], "care_example": "転倒は高齢者にとって危険であるため、予防対策が必須です。"},
      {"word": "不規則な", "reading": "ふきそくな", "kanji": "不規則な", "meaning": {"ja": "規則的ではない、不規則である", "vi": "không đều, bất quy tắc"}, "examples": [{"ja": "不規則な食事は健康に悪い。", "vi": "Ăn không đều có hại cho sức khỏe."},{"ja": "不規則な睡眠は避けます。", "vi": "Tránh ngủ không đều."}], "care_example": "患者さんの不規則な生活パターンは改善が必要です。"},
      {"word": "不適切な", "reading": "ふてきせつな", "kanji": "不適切な", "meaning": {"ja": "ふさわしくない、適当ではない", "vi": "không phù hợp, không thích hợp"}, "examples": [{"ja": "不適切な言葉遣いは避けます。", "vi": "Tránh cách sử dụng từ ngữ không phù hợp."},{"ja": "不適切な対応は苦情につながります。", "vi": "Phản ứng không phù hợp dẫn đến khiếu nại."}], "care_example": "患者さんへの不適切な扱いは虐待になるため、絶対に避けるべきです。"},
      {"word": "不安定な", "reading": "ふあんていな", "kanji": "不安定な", "meaning": {"ja": "安定していない、不確定である", "vi": "không ổn định, không chắc chắn"}, "examples": [{"ja": "不安定な立場です。", "vi": "Vị trí không ổn định."},{"ja": "不安定な状態を観察します。", "vi": "Quan sát tình trạng không ổn định."}], "care_example": "患者さんが身体的に不安定な場合、転倒防止策が必要です。"},
      {"word": "不衛生な", "reading": "ふえいせいな", "kanji": "不衛生な", "meaning": {"ja": "清潔ではない、汚い", "vi": "không vệ sinh, bẩn"}, "examples": [{"ja": "不衛生な環境は避けます。", "vi": "Tránh môi trường không vệ sinh."},{"ja": "不衛生な食べ物は危険です。", "vi": "Thức ăn không vệ sinh là nguy hiểm."}], "care_example": "介護施設では不衛生な環境を絶対に許容しません。"}
    ],
    "dialogue": ["介護職: 「患者さんの異常な症状を観察しました。」", "管理者: 「どのような異常ですか？」", "介護職: 「呼吸が不規則で、不安定な状態です。」", "管理者: 「医師に報告してください。」", "介護職: 「危険な状況を早期に発見することが大切です。」", "管理者: 「その通り。不適切な対応は避けてください。」", "介護職: 「わかりました。患者さんの安全が最優先です。」"],
    "key_phrases": [{"ja": "異常な変化", "vi": "Sự thay đổi bất thường"},{"ja": "危険な状況", "vi": "Tình huống nguy hiểm"},{"ja": "不規則な生活", "vi": "Lối sống bất quy tắc"},{"ja": "不適切な対応", "vi": "Phản ứng không phù hợp"}],
    "cultural_note": {"ja": "介護職は患者さんの異常や危険な変化に敏感であるべきです。不適切な対応は患者さんの安全と信頼を損なうため、常に慎重で適切な対応が求められます。", "vi": "Nhân viên chăm sóc nên nhạy cảm với các thay đổi bất thường hoặc nguy hiểm của bệnh nhân. Phản ứng không phù hợp có thể làm hỏng sự an toàn và tin tưởng của bệnh nhân, vì vậy luôn cần phải cẩn thận và phản ứng thích hợp."},
    "quiz": [
      {"question": {"ja": "「異常な」症状が見られた場合、どうすべきですか？", "vi": "Khi thấy các triệu chứng \"bất thường\", nên làm gì?"}, "options": [{"ja": "無視する", "vi": "Bỏ qua"},{"ja": "報告する", "vi": "Báo cáo"},{"ja": "患者さんを不安にさせない", "vi": "Đừng lo lắng bệnh nhân"},{"ja": "待つ", "vi": "Chờ đợi"}], "correct_answer": 1, "explanation": {"ja": "異常な症状は医師に報告し、適切な対応を取るべきです。", "vi": "Triệu chứng bất thường phải được báo cáo cho bác sĩ để có biện pháp phù hợp."}, "difficulty": "easy"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 9 LESSON 1: Movement & Direction Words (Part 1)
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  9,
  1,
  'vocabulary',
  '{
    "intro": {"ja": "移動や方向を表す言葉を学びます。「右」「左」「上」「下」「前」「後ろ」など、患者さんへの指示や患者さんの移動を説明するのに必須な言葉です。", "vi": "Học những từ biểu hiện chuyển động và hướng. \"Phải\", \"Trái\", \"Trên\", \"Dưới\", \"Phía trước\", \"Phía sau\"... những từ cần thiết để chỉ dẫn bệnh nhân hoặc mô tả chuyển động."},
    "words": [
      {"word": "上", "reading": "うえ", "kanji": "上", "meaning": {"ja": "高い方向、上側", "vi": "hướng cao, phía trên"}, "examples": [{"ja": "上を見てください。", "vi": "Nhìn lên."},{"ja": "上の棚に置きます。", "vi": "Đặt trên kệ trên."}], "care_example": "患者さんを助ける時は「少し上を向いてください」と指示します。"},
      {"word": "下", "reading": "した", "kanji": "下", "meaning": {"ja": "低い方向、下側", "vi": "hướng thấp, phía dưới"}, "examples": [{"ja": "下を見てください。", "vi": "Nhìn xuống."},{"ja": "下の方に置きます。", "vi": "Đặt ở phía dưới."}], "care_example": "患者さんが倒れた時、「まず下を確認してください」と言います。"},
      {"word": "右", "reading": "みぎ", "kanji": "右", "meaning": {"ja": "右の方向", "vi": "hướng bên phải"}, "examples": [{"ja": "右に曲がります。", "vi": "Rẽ phải."},{"ja": "右手を上げてください。", "vi": "Giơ tay phải lên."}], "care_example": "患者さんへの指示：「右側に傾けてください」。"},
      {"word": "左", "reading": "ひだり", "kanji": "左", "meaning": {"ja": "左の方向", "vi": "hướng bên trái"}, "examples": [{"ja": "左に曲がります。", "vi": "Rẽ trái."},{"ja": "左足を前に出してください。", "vi": "Bước chân trái về phía trước."}], "care_example": "歩行訓練で「左足を出してください」と指示します。"},
      {"word": "前", "reading": "まえ", "kanji": "前", "meaning": {"ja": "向かっている方向、正面", "vi": "hướng về phía trước, phía trước"}, "examples": [{"ja": "前に進んでください。", "vi": "Tiến về phía trước."},{"ja": "前を見てください。", "vi": "Nhìn về phía trước."}], "care_example": "患者さんの歩行時：「前を見て、ゆっくり進んでください」。"},
      {"word": "後ろ", "reading": "うしろ", "kanji": "後ろ", "meaning": {"ja": "後方、背後", "vi": "phía sau, phía sau lưng"}, "examples": [{"ja": "後ろを確認してください。", "vi": "Kiểm tra phía sau."},{"ja": "後ろに下がります。", "vi": "Lui lại phía sau."}], "care_example": "安全確認：「後ろも危ないもんがないか確認してください」。"},
      {"word": "中", "reading": "なか", "kanji": "中", "meaning": {"ja": "内側、内部", "vi": "bên trong, bên lòng"}, "examples": [{"ja": "ボックスの中に入れます。", "vi": "Đặt vào trong hộp."},{"ja": "川の中は危険です。", "vi": "Trong sông là nguy hiểm."}], "care_example": "医療用品は専用の箱の中に保管します。"},
      {"word": "外", "reading": "そと", "kanji": "外", "meaning": {"ja": "外部、外側", "vi": "bên ngoài, bên ngoài"}, "examples": [{"ja": "外に出ましょう。", "vi": "Đi ra ngoài."},{"ja": "外の空気は気持ちいいです。", "vi": "Không khí ngoài trời rất thoải mái."}], "care_example": "患者さんが気分転換のため外に出る時をサポートします。"}
    ],
    "dialogue": ["介護職: 「右を向いてください。」", "患者さん: 「こういうことですか？」", "介護職: 「そうです。では左に傾けてください。」", "患者さん: 「前を見ながら進みます。」", "介護職: 「そうですね。後ろも気をつけてください。」", "患者さん: 「大丈夫です。ゆっくり進みます。」", "介護職: 「素晴らしい。安全が一番大切です。」"],
    "key_phrases": [{"ja": "右に曲がります", "vi": "Rẽ phải"},{"ja": "左足を出します", "vi": "Bước chân trái"},{"ja": "前を見てください", "vi": "Nhìn về phía trước"},{"ja": "後ろを確認します", "vi": "Kiểm tra phía sau"}],
    "cultural_note": {"ja": "介護の現場では、患者さんが安全に移動できるように明確で簡単な方向指示が重要です。左右などの方向概念は、患者さんの認知機能に配慮して使い分ける必要があります。", "vi": "Tại các cơ sở chăm sóc, hướng dẫn rõ ràng và đơn giản là quan trọng để bệnh nhân có thể di chuyển an toàn. Khái niệm hướng như trái/phải cần được sử dụng linh hoạt bằng cách xem xét chức năng nhận thức của bệnh nhân."},
    "quiz": [
      {"question": {"ja": "患者さんに歩く時、何を見るべきだと言いますか？", "vi": "Khi bệnh nhân đi bộ, bạn nên bảo họ nhìn vào đâu?"}, "options": [{"ja": "下を見る", "vi": "Nhìn xuống"},{"ja": "前を見る", "vi": "Nhìn về phía trước"},{"ja": "後ろを見る", "vi": "Nhìn phía sau"},{"ja": "周囲を見ない", "vi": "Không nhìn xung quanh"}], "correct_answer": 1, "explanation": {"ja": "歩く時は前を見ることが安全です。", "vi": "Nhìn về phía trước khi đi bộ là an toàn."}, "difficulty": "easy"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 9 LESSON 2: Transportation & Movement Words
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  9,
  2,
  'vocabulary',
  '{
    "intro": {"ja": "移動手段と交通に関する言葉を学びます。「車」「バス」「電車」「自転車」「歩く」など、患者さんの外出時の移動や交通安全について説明します。", "vi": "Học những từ về phương tiện giao thông và vận chuyển. \"Ô tô\", \"Xe buýt\", \"Tàu điện\", \"Xe đạp\", \"Đi bộ\"... để mô tả di chuyển và an toàn giao thông của bệnh nhân."},
    "words": [
      {"word": "車", "reading": "くるま", "kanji": "車", "meaning": {"ja": "自動車、乗り物", "vi": "ô tô, phương tiện"}, "examples": [{"ja": "車で行きます。", "vi": "Đi bằng ô tô."},{"ja": "車に乗ってください。", "vi": "Lên ô tô."}], "care_example": "患者さんを車で病院に連れていく時は、安全運転と快適性に配慮します。"},
      {"word": "バス", "reading": "ばす", "kanji": "バス", "meaning": {"ja": "乗客を運ぶ大きな乗り物", "vi": "xe buýt"}, "examples": [{"ja": "バスに乗ります。", "vi": "Lên xe buýt."},{"ja": "バスの停留所を待ちます。", "vi": "Chờ tại trạm xe buýt."}], "care_example": "高齢者がバスに乗る時は、転倒防止のためサポートが必要です。"},
      {"word": "電車", "reading": "でんしゃ", "kanji": "電車", "meaning": {"ja": "レールの上を走る乗り物", "vi": "tàu điện"}, "examples": [{"ja": "電車で移動します。", "vi": "Di chuyển bằng tàu điện."},{"ja": "電車の時間を確認します。", "vi": "Kiểm tra giờ tàu điện."}], "care_example": "患者さんが電車で移動する場合、乗り降りのサポートが重要です。"},
      {"word": "自転車", "reading": "じてんしゃ", "kanji": "自転車", "meaning": {"ja": "ペダルで動かす乗り物", "vi": "xe đạp"}, "examples": [{"ja": "自転車で通勤します。", "vi": "Đi làm bằng xe đạp."},{"ja": "自転車を停めます。", "vi": "Đỗ xe đạp."}], "care_example": "高齢患者さんの自転車利用は、バランス能力の低下により危険な場合があります。"},
      {"word": "歩く", "reading": "あるく", "kanji": "歩く", "meaning": {"ja": "足で進む、移動する", "vi": "đi bộ, bước đi"}, "examples": [{"ja": "毎日歩きます。", "vi": "Đi bộ hàng ngày."},{"ja": "ゆっくり歩いてください。", "vi": "Đi bộ chậm."}], "care_example": "患者さんの歩行訓練は、リハビリの重要な部分です。"},
      {"word": "乗る", "reading": "のる", "kanji": "乗る", "meaning": {"ja": "乗り物に乗る", "vi": "lên (phương tiện), nhập"}, "examples": [{"ja": "バスに乗ります。", "vi": "Lên xe buýt."},{"ja": "飛行機に乗ります。", "vi": "Lên máy bay."}], "care_example": "患者さんが乗り物に乗る時は、安全性を確保します。"},
      {"word": "降りる", "reading": "おりる", "kanji": "降りる", "meaning": {"ja": "乗り物から降りる", "vi": "xuống (phương tiện)"}, "examples": [{"ja": "駅で降ります。", "vi": "Xuống ở nhà ga."},{"ja": "ゆっくり降りてください。", "vi": "Xuống từ từ."}], "care_example": "患者さんが降りる時、転倒防止のため手をサポートします。"},
      {"word": "道", "reading": "みち", "kanji": "道", "meaning": {"ja": "歩く場所、通り", "vi": "đường, đoạn đường"}, "examples": [{"ja": "道を歩きます。", "vi": "Đi trên đường."},{"ja": "道は安全ですか？", "vi": "Đường an toàn không?"}], "care_example": "患者さんの外出時は、安全な道を選んで案内します。"}
    ],
    "dialogue": ["介護職: 「今日はバスで出かけましょう。」", "患者さん: 「バスに乗ってもいいですか？」", "介護職: 「もちろんです。ゆっくり歩いてください。」", "患者さん: 「わかりました。」", "介護職: 「バスに乗る時は、私が手をお持ちします。」", "患者さん: 「ありがとうございます。」", "介護職: 「安全が一番です。ゆっくり行きましょう。」"],
    "key_phrases": [{"ja": "バスに乗ります", "vi": "Lên xe buýt"},{"ja": "ゆっくり歩く", "vi": "Đi bộ chậm"},{"ja": "電車で移動", "vi": "Di chuyển bằng tàu điện"},{"ja": "安全に乗り降り", "vi": "Lên xuống an toàn"}],
    "cultural_note": {"ja": "日本の介護施設では、高齢患者さんの社会参加と生活の質を重視しています。患者さんの外出や交通利用をサポートすることは、介護職の重要な役割です。", "vi": "Các cơ sở chăm sóc tại Nhật Bản coi trọng sự tham gia xã hội và chất lượng cuộc sống của bệnh nhân cao tuổi. Hỗ trợ bệnh nhân đi ra ngoài và sử dụng giao thông vận tải là vai trò quan trọng của nhân viên chăm sóc."},
    "quiz": [
      {"question": {"ja": "患者さんがバスに乗る時、何を確認すべきですか？", "vi": "Khi bệnh nhân lên xe buýt, nên kiểm tra điều gì?"}, "options": [{"ja": "バスの色", "vi": "Màu sắc xe buýt"},{"ja": "安全性と患者さんの体調", "vi": "An toàn và tình trạng sức khỏe của bệnh nhân"},{"ja": "バスの歴史", "vi": "Lịch sử xe buýt"},{"ja": "運転手の名前", "vi": "Tên tài xế"}], "correct_answer": 1, "explanation": {"ja": "患者さんの安全と体調が最優先です。", "vi": "An toàn và sức khỏe của bệnh nhân là ưu tiên hàng đầu."}, "difficulty": "medium"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 9 LESSON 3: Speed & Manner of Movement
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  9,
  3,
  'vocabulary',
  '{
    "intro": {"ja": "速度や動きの様子を表す言葉を学びます。「速い」「遅い」「ゆっくり」など、患者さんへの指示や患者さんの行動を説明する時に重要です。", "vi": "Học những từ biểu hiện tốc độ và cách chuyển động. \"Nhanh\", \"Chậm\", \"Từ từ\"... rất quan trọng khi chỉ dẫn bệnh nhân hoặc mô tả hành động của bệnh nhân."},
    "words": [
      {"word": "速い", "reading": "はやい", "kanji": "速い", "meaning": {"ja": "スピードが速い", "vi": "nhanh"}, "examples": [{"ja": "速い車です。", "vi": "Ô tô nhanh."},{"ja": "速く走ります。", "vi": "Chạy nhanh."}], "care_example": "「無理をして速く歩かないでください」と患者さんに指示します。"},
      {"word": "遅い", "reading": "おそい", "kanji": "遅い", "meaning": {"ja": "スピードが遅い", "vi": "chậm"}, "examples": [{"ja": "遅い電車です。", "vi": "Tàu điện chậm."},{"ja": "遅く出発します。", "vi": "Khởi hành muộn."}], "care_example": "高齢患者さんは歩くのが遅いため、時間に余裕を持たせます。"},
      {"word": "ゆっくり", "reading": "ゆっくり", "kanji": "ゆっくり", "meaning": {"ja": "ゆったりと、急がずに", "vi": "từ từ, không vội vàng"}, "examples": [{"ja": "ゆっくり食べてください。", "vi": "Ăn từ từ."},{"ja": "ゆっくり休みます。", "vi": "Nghỉ ngơi từ từ."}], "care_example": "「ゆっくり深呼吸してください」とリラックスを促します。"},
      {"word": "急ぐ", "reading": "いそぐ", "kanji": "急ぐ", "meaning": {"ja": "急いで、急速に", "vi": "vội vàng,서둘다"}, "examples": [{"ja": "急いでください。", "vi": "Vội lên."},{"ja": "急ぐ必要はありません。", "vi": "Không cần phải vội."}], "care_example": "患者さんには「無理に急ぐ必要はありません」と安心させます。"},
      {"word": "静かに", "reading": "しずかに", "kanji": "静かに", "meaning": {"ja": "音を立てず、おとなしく", "vi": "im lặng, yên tĩnh"}, "examples": [{"ja": "静かに寝ています。", "vi": "Ngủ yên tĩnh."},{"ja": "静かに待ってください。", "vi": "Chờ im lặng."}], "care_example": "他の患者さんの睡眠を邪魔しないように「静かに移動してください」と指示します。"},
      {"word": "そっと", "reading": "そっと", "kanji": "そっと", "meaning": {"ja": "そっと、優しく", "vi": "nhẹ nhàng, thầm th�   lặng"}, "examples": [{"ja": "そっと手を握ります。", "vi": "Nhẹ nhàng nắm tay."},{"ja": "そっと移動します。", "vi": "Di chuyển nhẹ nhàng."}], "care_example": "睡眠中の患者さんを起こす時は、そっと肩に手を置きます。"},
      {"word": "強く", "reading": "つよく", "kanji": "強く", "meaning": {"ja": "力を込めて", "vi": "mạnh mẽ, có sức lực"}, "examples": [{"ja": "強く握ります。", "vi": "Nắm chặt."},{"ja": "強く押します。", "vi": "Ấn mạnh."}], "care_example": "患者さんの筋力訓練では「強く握ってください」と促します。"},
      {"word": "弱く", "reading": "よわく", "kanji": "弱く", "meaning": {"ja": "力が弱い", "vi": "yếu ớt, không có lực"}, "examples": [{"ja": "弱く押します。", "vi": "Ấn nhẹ."},{"ja": "握力が弱くなりました。", "vi": "Sức nắm yếu đi."}], "care_example": "握力低下のある患者さんには無理強いをしません。"}
    ],
    "dialogue": ["介護職: 「ゆっくり歩いてください。急ぐ必要はありません。」", "患者さん: 「わかりました。」", "介護職: 「静かに移動してください。他の患者さんが寝ています。」", "患者さん: 「気をつけます。」", "介護職: 「手をそっと握ってください。」", "患者さん: 「優しく扱ってくれてありがとう。」", "介護職: 「患者さんの快適さが大切です。」"],
    "key_phrases": [{"ja": "ゆっくり歩く", "vi": "Đi bộ từ từ"},{"ja": "静かに移動", "vi": "Di chuyển im lặng"},{"ja": "そっと握る", "vi": "Nhẹ nhàng nắm"},{"ja": "無理に急がない", "vi": "Không vội vàng quá"}],
    "cultural_note": {"ja": "介護では、患者さんのペースを尊重することが最も大切です。高齢患者さんは身体的な能力が低下しているため、ゆっくりで安全な動きが重要です。", "vi": "Trong chăm sóc, tôn trọng tốc độ của bệnh nhân là điều quan trọng nhất. Các bệnh nhân cao tuổi có khả năng thể chất suy giảm, vì vậy chuyển động chậm và an toàn là quan trọng."},
    "quiz": [
      {"question": {"ja": "患者さんに歩くのを指示する時、最も適切な言葉は何ですか？", "vi": "Khi chỉ bệnh nhân đi bộ, từ nào là thích hợp nhất?"}, "options": [{"ja": "速く歩いてください", "vi": "Đi nhanh"},{"ja": "ゆっくり歩いてください", "vi": "Đi từ từ"},{"ja": "急いでください", "vi": "Vội lên"},{"ja": "強く歩いてください", "vi": "Bước mạnh"}], "correct_answer": 1, "explanation": {"ja": "患者さんの安全のため、ゆっくり歩くことが最適です。", "vi": "Vì an toàn của bệnh nhân, đi từ từ là tốt nhất."}, "difficulty": "easy"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 9 LESSON 4: Direction & Location Words
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  9,
  4,
  'vocabulary',
  '{
    "intro": {"ja": "位置関係や距離を表す言葉を学びます。「近い」「遠い」「隣」「横」「間」など、患者さんの位置や距離を説明する時に使えます。", "vi": "Học những từ biểu hiện vị trí tương đối và khoảng cách. \"Gần\", \"Xa\", \"Cạnh\", \"Bên cạnh\", \"Giữa\"... để mô tả vị trí hoặc khoảng cách của bệnh nhân."},
    "words": [
      {"word": "近い", "reading": "ちかい", "kanji": "近い", "meaning": {"ja": "距離が短い", "vi": "gần"}, "examples": [{"ja": "病院は近いです。", "vi": "Bệnh viện gần."},{"ja": "駅が近いです。", "vi": "Nhà ga gần."}], "care_example": "「トイレは近いので、いつでも行ってください」と安心させます。"},
      {"word": "遠い", "reading": "とおい", "kanji": "遠い", "meaning": {"ja": "距離が長い", "vi": "xa"}, "examples": [{"ja": "駅は遠いです。", "vi": "Nhà ga xa."},{"ja": "都市は遠いです。", "vi": "Thành phố xa."}], "care_example": "患者さんに「無理に遠くへ行かないでください」と指導します。"},
      {"word": "隣", "reading": "となり", "kanji": "隣", "meaning": {"ja": "すぐ横、隣同士", "vi": "cạnh, bên cạnh"}, "examples": [{"ja": "私の隣に座ってください。", "vi": "Ngồi cạnh tôi."},{"ja": "隣の部屋です。", "vi": "Phòng cạnh đó."}], "care_example": "患者さんが不安な時は、隣に座ってサポートします。"},
      {"word": "横", "reading": "よこ", "kanji": "横", "meaning": {"ja": "側面、側方", "vi": "bên cạnh, phía bên"}, "examples": [{"ja": "横に寝ます。", "vi": "Nằm nghiêng."},{"ja": "横の方を見てください。", "vi": "Nhìn sang bên."}], "care_example": "患者さんが横向きで寝る場合、枕を調整します。"},
      {"word": "間", "reading": "あいだ", "kanji": "間", "meaning": {"ja": "物と物の間、中間", "vi": "khoảng giữa, giữa"}, "examples": [{"ja": "二つの椅子の間に座ります。", "vi": "Ngồi giữa hai cái ghế."},{"ja": "壁と壁の間です。", "vi": "Giữa hai bức tường."}], "care_example": "患者さん同士の間に十分な距離を保ちます。"},
      {"word": "奥", "reading": "おく", "kanji": "奥", "meaning": {"ja": "より深い場所、奥側", "vi": "phía trong sâu, phía sâu"}, "examples": [{"ja": "部屋の奥に置きます。", "vi": "Đặt vào phía trong sâu của phòng."},{"ja": "奥に座ってください。", "vi": "Ngồi ở phía trong."}], "care_example": "プライベートが必要な場合、部屋の奥にスペースを作ります。"},
      {"word": "端", "reading": "はし", "kanji": "端", "meaning": {"ja": "一番端、角", "vi": "đầu, cạnh"}, "examples": [{"ja": "机の端に置きます。", "vi": "Đặt ở cạnh bàn."},{"ja": "ベッドの端に座ります。", "vi": "Ngồi ở cạnh giường."}], "care_example": "患者さんが端に座った時、転倒防止に気をつけます。"},
      {"word": "中心", "reading": "ちゅうしん", "kanji": "中心", "meaning": {"ja": "真ん中、中央", "vi": "trung tâm, giữa"}, "examples": [{"ja": "部屋の中心に座ります。", "vi": "Ngồi ở giữa phòng."},{"ja": "焦点は中心にあります。", "vi": "Tiêu điểm ở trung tâm."}], "care_example": "活動の中心で患者さんをサポートします。"}
    ],
    "dialogue": ["介護職: 「トイレは近いので大丈夫です。」", "患者さん: 「ありがとうございます。」", "介護職: 「私の隣に座ってください。安全ですから。」", "患者さん: 「わかりました。」", "介護職: 「他の患者さんとの間に距離をとります。」", "患者さん: 「配慮ありがとうございます。」", "介護職: 「安全で快適な環境が一番大切です。」"],
    "key_phrases": [{"ja": "近い距離", "vi": "Khoảng cách gần"},{"ja": "隣に座る", "vi": "Ngồi cạnh"},{"ja": "間に距離", "vi": "Khoảng cách giữa"},{"ja": "部屋の奥", "vi": "Phía trong sâu của phòng"}],
    "cultural_note": {"ja": "介護では、患者さんの個人領域と共有スペースの管理が重要です。患者さんが快適で安全だと感じられるような空間配置が必要です。", "vi": "Trong chăm sóc, quản lý không gian cá nhân và không gian chung của bệnh nhân là quan trọng. Cần bố trí không gian sao cho bệnh nhân cảm thấy thoải mái và an toàn."},
    "quiz": [
      {"question": {"ja": "患者さんが不安な時、介護職はどこに座るべきですか？", "vi": "Khi bệnh nhân lo lắng, nhân viên chăm sóc nên ngồi ở đâu?"}, "options": [{"ja": "遠くに座る", "vi": "Ngồi xa"},{"ja": "隣に座る", "vi": "Ngồi cạnh"},{"ja": "背後に座る", "vi": "Ngồi phía sau"},{"ja": "対面に座る", "vi": "Ngồi đối diện"}], "correct_answer": 1, "explanation": {"ja": "隣に座ることで患者さんは安心感を得ます。", "vi": "Ngồi cạnh giúp bệnh nhân cảm thấy an tâm."}, "difficulty": "easy"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 10 LESSON 1: Morning & Evening Routine Words
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  10,
  1,
  'vocabulary',
  '{
    "intro": {"ja": "朝と夜の日常活動を表す言葉を学びます。「起きる」「寝る」「朝食」「晩食」など、患者さんの日常的なケアに関連する基本的な言葉です。", "vi": "Học những từ biểu hiện các hoạt động hàng ngày buổi sáng và buổi tối. \"Thức dậy\", \"Ngủ\", \"Bữa sáng\", \"Bữa tối\"... những từ cơ bản liên quan đến chăm sóc hàng ngày của bệnh nhân."},
    "words": [
      {"word": "起きる", "reading": "おきる", "kanji": "起きる", "meaning": {"ja": "寝から目が覚める", "vi": "thức dậy, chợt tỉnh"}, "examples": [{"ja": "朝6時に起きます。", "vi": "Thức dậy lúc 6 giờ sáng."},{"ja": "起きましょう。", "vi": "Thức dậy."}], "care_example": "「良い朝です。起きましょう」と患者さんを穏やかに起こします。"},
      {"word": "寝る", "reading": "ねる", "kanji": "寝る", "meaning": {"ja": "眠りに入る", "vi": "ngủ, nằm"}, "examples": [{"ja": "夜10時に寝ます。", "vi": "Ngủ lúc 10 giờ tối."},{"ja": "ベッドで寝てください。", "vi": "Nằm trên giường."}], "care_example": "患者さんが快適に寝られるよう、環境を整えます。"},
      {"word": "朝食", "reading": "ちょうしょく", "kanji": "朝食", "meaning": {"ja": "朝の食事", "vi": "bữa sáng"}, "examples": [{"ja": "朝食を食べましょう。", "vi": "Ăn bữa sáng."},{"ja": "朝食は7時です。", "vi": "Bữa sáng lúc 7 giờ."}], "care_example": "患者さんの朝食の好みを聞いて、提供します。"},
      {"word": "昼食", "reading": "ちゅうしょく", "kanji": "昼食", "meaning": {"ja": "昼の食事", "vi": "bữa trưa"}, "examples": [{"ja": "昼食は12時です。", "vi": "Bữa trưa lúc 12 giờ."},{"ja": "昼食を準備します。", "vi": "Chuẩn bị bữa trưa."}], "care_example": "昼食後、患者さんが休めるようにサポートします。"},
      {"word": "夕食", "reading": "ゆうしょく", "kanji": "夕食", "meaning": {"ja": "夜の食事", "vi": "bữa tối"}, "examples": [{"ja": "夕食は6時です。", "vi": "Bữa tối lúc 6 giờ."},{"ja": "夕食何が食べたいですか？", "vi": "Bữa tối bạn muốn ăn gì?"}], "care_example": "患者さんの夕食の好みに配慮します。"},
      {"word": "洗顔", "reading": "せんがん", "kanji": "洗顔", "meaning": {"ja": "顔を洗う", "vi": "rửa mặt"}, "examples": [{"ja": "洗顔してください。", "vi": "Rửa mặt."},{"ja": "朝の洗顔が大切です。", "vi": "Rửa mặt buổi sáng là quan trọng."}], "care_example": "患者さんの洗顔をサポートします。"},
      {"word": "歯磨き", "reading": "はみがき", "kanji": "歯磨き", "meaning": {"ja": "歯を磨く", "vi": "đánh răng"}, "examples": [{"ja": "朝と夜に歯磨きしてください。", "vi": "Đánh răng vào sáng và tối."},{"ja": "歯磨きを手伝います。", "vi": "Tôi sẽ giúp đánh răng."}], "care_example": "患者さんが適切に歯磨きができるようにサポートします。"},
      {"word": "入浴", "reading": "にゅうよく", "kanji": "入浴", "meaning": {"ja": "お風呂に入る", "vi": "tắm, ngâm mình"}, "examples": [{"ja": "入浴する時間ですね。", "vi": "Đến lúc tắm."},{"ja": "温かい入浴が気持ちいいです。", "vi": "Tắm nước ấm thật thoải mái."}], "care_example": "患者さんが安全に入浴できるよう支援します。"}
    ],
    "dialogue": ["介護職: 「おはようございます。起きましょう。」", "患者さん: 「おはようございます。」", "介護職: 「洗顔と歯磨きをしましょう。」", "患者さん: 「わかりました。」", "介護職: 「朝食の時間です。何が食べたいですか？」", "患者さん: 「おかゆをください。」", "介護職: 「わかりました。準備します。」"],
    "key_phrases": [{"ja": "朝起きる", "vi": "Thức dậy buổi sáng"},{"ja": "洗顔と歯磨き", "vi": "Rửa mặt và đánh răng"},{"ja": "朝食を食べる", "vi": "Ăn bữa sáng"},{"ja": "入浴する", "vi": "Tắm"}],
    "cultural_note": {"ja": "日本の介護では、患者さんの日常的なルーチンを尊重することが大切です。朝の目覚めから夜の睡眠まで、規則正しい生活のサポートが健康につながります。", "vi": "Trong chăm sóc tại Nhật Bản, tôn trọng thói quen hàng ngày của bệnh nhân là quan trọng. Hỗ trợ cuộc sống đều đặn từ thức dậy buổi sáng cho đến ngủ tối dẫn đến sức khỏe."},
    "quiz": [
      {"question": {"ja": "患者さんが快適に起きるために、介護職は何をすべきですか？", "vi": "Để bệnh nhân thức dậy thoải mái, nhân viên chăm sóc nên làm gì?"}, "options": [{"ja": "突然起こす", "vi": "Đánh thức đột ngột"},{"ja": "穏やかに起こす", "vi": "Thức dậy từ từ"},{"ja": "うるさく起こす", "vi": "Thức dậy ồn ào"},{"ja": "無視する", "vi": "Bỏ qua"}], "correct_answer": 1, "explanation": {"ja": "穏やかで丁寧に患者さんを起こすことが大切です。", "vi": "Quan trọng là thức dậy bệnh nhân một cách từ từ và lịch sự."}, "difficulty": "easy"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 10 LESSON 2: Daily Activities & Hobbies
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  10,
  2,
  'vocabulary',
  '{
    "intro": {"ja": "趣味や日常活動を表す言葉を学びます。「読む」「書く」「見る」「聞く」など、患者さんのリハビリや余暇活動に関連する言葉です。", "vi": "Học những từ biểu hiện sở thích và hoạt động hàng ngày. \"Đọc\", \"Viết\", \"Xem\", \"Nghe\"... những từ liên quan đến phục hồi chức năng hoặc hoạt động giải trí của bệnh nhân."},
    "words": [
      {"word": "読む", "reading": "よむ", "kanji": "読む", "meaning": {"ja": "本や新聞などを読む", "vi": "đọc"}, "examples": [{"ja": "本を読みます。", "vi": "Đọc sách."},{"ja": "新聞を読みましょう。", "vi": "Đọc báo."}], "care_example": "患者さんが読書が好きな場合、大きい文字の本を提供します。"},
      {"word": "書く", "reading": "かく", "kanji": "書く", "meaning": {"ja": "ペンで文字を書く", "vi": "viết"}, "examples": [{"ja": "手紙を書きます。", "vi": "Viết thư."},{"ja": "書いてください。", "vi": "Viết đi."}], "care_example": "患者さんのリハビリのため、軽い書く運動を促します。"},
      {"word": "見る", "reading": "みる", "kanji": "見る", "meaning": {"ja": "目で見る", "vi": "nhìn, xem"}, "examples": [{"ja": "テレビを見ます。", "vi": "Xem tivi."},{"ja": "景色を見ましょう。", "vi": "Nhìn cảnh đẹp."}], "care_example": "患者さんがテレビを見たい場合、サポートします。"},
      {"word": "聞く", "reading": "きく", "kanji": "聞く", "meaning": {"ja": "耳で聞く", "vi": "nghe"}, "examples": [{"ja": "音楽を聞きます。", "vi": "Nghe nhạc."},{"ja": "ラジオを聞きましょう。", "vi": "Nghe radio."}], "care_example": "患者さんが聴覚をリハビリするため、好きな音楽を聞かせます。"},
      {"word": "話す", "reading": "はなす", "kanji": "話す", "meaning": {"ja": "言葉で話す", "vi": "nói chuyện"}, "examples": [{"ja": "家族と話します。", "vi": "Nói chuyện với gia đình."},{"ja": "話してください。", "vi": "Nói với tôi."}], "care_example": "患者さんとの会話を大切にし、コミュニケーションを促します。"},
      {"word": "遊ぶ", "reading": "あそぶ", "kanji": "遊ぶ", "meaning": {"ja": "楽しく時間を過ごす", "vi": "chơi, vui chơi"}, "examples": [{"ja": "子供たちと遊びます。", "vi": "Chơi với trẻ em."},{"ja": "ゲームを遊ぶ。", "vi": "Chơi trò chơi."}], "care_example": "患者さんが楽しく過ごせるよう、簡単なゲームなどを提供します。"},
      {"word": "散歩", "reading": "さんぽ", "kanji": "散歩", "meaning": {"ja": "歩いてリラックスする", "vi": "đi dạo"}, "examples": [{"ja": "公園で散歩します。", "vi": "Đi dạo trong công viên."},{"ja": "毎日散歩しましょう。", "vi": "Đi dạo hàng ngày."}], "care_example": "患者さんの健康のため、一緒に散歩をサポートします。"},
      {"word": "休む", "reading": "やすむ", "kanji": "休む", "meaning": {"ja": "疲労を取る、休息する", "vi": "nghỉ ngơi, thư giãn"}, "examples": [{"ja": "ベッドで休みます。", "vi": "Nghỉ trên giường."},{"ja": "少し休みましょう。", "vi": "Nghỉ một chút."}], "care_example": "患者さんが疲れているときは、十分な休息をすすめます。"}
    ],
    "dialogue": ["介護職: 「今日は何をしたいですか？」", "患者さん: 「本を読みたいです。」", "介護職: 「わかりました。本を持ってきます。」", "患者さん: 「ありがとうございます。」", "介護職: 「読んだ後は、散歩しませんか？」", "患者さん: 「そうですね。外の空気が気持ちいいです。」", "介護職: 「では、準備しましょう。」"],
    "key_phrases": [{"ja": "本を読む", "vi": "Đọc sách"},{"ja": "音楽を聞く", "vi": "Nghe nhạc"},{"ja": "散歩する", "vi": "Đi dạo"},{"ja": "休む", "vi": "Nghỉ ngơi"}],
    "cultural_note": {"ja": "介護では、患者さんの趣味や興味を尊重することが、生活の質の向上につながります。読書や散歩など、患者さんが楽しむ活動をサポートすることは、介護職の大切な役割です。", "vi": "Trong chăm sóc, tôn trọng sở thích và lợi ích của bệnh nhân dẫn đến cải thiện chất lượng cuộc sống. Hỗ trợ các hoạt động mà bệnh nhân tận hưởng như đọc sách hoặc đi dạo là vai trò quan trọng của nhân viên chăm sóc."},
    "quiz": [
      {"question": {"ja": "患者さんの生活の質を向上させるために、介護職は何をすべきですか？", "vi": "Để cải thiện chất lượng cuộc sống của bệnh nhân, nhân viên chăm sóc nên làm gì?"}, "options": [{"ja": "患者さんの趣味を無視する", "vi": "Bỏ qua sở thích của bệnh nhân"},{"ja": "患者さんの好みや趣味をサポートする", "vi": "Hỗ trợ sở thích và lợi ích của bệnh nhân"},{"ja": "患者さんに退屈させる", "vi": "Khiến bệnh nhân chán nản"},{"ja": "患者さんの活動を制限する", "vi": "Hạn chế hoạt động của bệnh nhân"}], "correct_answer": 1, "explanation": {"ja": "患者さんの趣味をサポートすることが、生活の質と幸福感を高めます。", "vi": "Hỗ trợ sở thích của bệnh nhân nâng cao chất lượng cuộc sống và hạnh phúc."}, "difficulty": "medium"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 10 LESSON 3: Social Activities & Community
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  10,
  3,
  'vocabulary',
  '{
    "intro": {"ja": "社会的活動と社会参加を表す言葉を学びます。「友達」「家族」「祭」「集まり」など、患者さんの社会的つながりと交流に関連する言葉です。", "vi": "Học những từ biểu hiện hoạt động xã hội và sự tham gia cộng đồng. \"Bạn bè\", \"Gia đình\", \"Lễ hội\", \"Cuộc tụ họp\"... những từ liên quan đến mối liên hệ xã hội và giao lưu của bệnh nhân."},
    "words": [
      {"word": "友達", "reading": "ともだち", "kanji": "友達", "meaning": {"ja": "友人、知人", "vi": "bạn bè, bạn"}, "examples": [{"ja": "友達と遊びます。", "vi": "Chơi với bạn."},{"ja": "友達に会いましょう。", "vi": "Gặp bạn."}], "care_example": "患者さんが友達と会話することを励ましますサポートします。"},
      {"word": "家族", "reading": "かぞく", "kanji": "家族", "meaning": {"ja": "親戚、血が繋がった人たち", "vi": "gia đình"}, "examples": [{"ja": "家族と話します。", "vi": "Nói chuyện với gia đình."},{"ja": "家族が訪ねてきます。", "vi": "Gia đình thăm."}], "care_example": "患者さんの家族との面会時間を大切にします。"},
      {"word": "祭", "reading": "まつり", "kanji": "祭", "meaning": {"ja": "お祭り、祝う行事", "vi": "lễ hội"}, "examples": [{"ja": "夏祭りが楽しいです。", "vi": "Lễ hội mùa hè thật vui."},{"ja": "祭に行きましょう。", "vi": "Đi lễ hội."}], "care_example": "患者さんが地域の祭に参加できるようにサポートします。"},
      {"word": "集まり", "reading": "あつまり", "kanji": "集まり", "meaning": {"ja": "人々が集まること", "vi": "cuộc tụ họp, sự tập hợp"}, "examples": [{"ja": "月曜日に集まります。", "vi": "Tụ họp vào thứ Hai."},{"ja": "皆で集まりましょう。", "vi": "Hãy tụ họp cùng nhau."}], "care_example": "患者さんが参加できる集まりを企画します。"},
      {"word": "訪問", "reading": "ほうもん", "kanji": "訪問", "meaning": {"ja": "誰かを訪ねる", "vi": "thăm viếng"}, "examples": [{"ja": "家を訪問します。", "vi": "Thăm nhà."},{"ja": "患者さんを訪問します。", "vi": "Thăm bệnh nhân."}], "care_example": "家族の訪問を温かく迎えます。"},
      {"word": "招待", "reading": "しょうたい", "kanji": "招待", "meaning": {"ja": "誰かを招く", "vi": "mời"}, "examples": [{"ja": "ゲストを招待します。", "vi": "Mời khách."},{"ja": "誕生日パーティーに招待します。", "vi": "Mời đến bữa tiệc sinh nhật."}], "care_example": "患者さんのイベントに友人や家族を招待することを支援します。"},
      {"word": "交流", "reading": "こうりゅう", "kanji": "交流", "meaning": {"ja": "人と人のつながり、相互作用", "vi": "giao lưu, tương tác"}, "examples": [{"ja": "他の患者さんと交流します。", "vi": "Giao lưu với các bệnh nhân khác."},{"ja": "交流の時間を大切にします。", "vi": "Coi trọng thời gian giao lưu."}], "care_example": "介護施設での患者さん間の交流を促進します。"},
      {"word": "参加", "reading": "さんか", "kanji": "参加", "meaning": {"ja": "活動に加わる", "vi": "tham gia"}, "examples": [{"ja": "イベントに参加します。", "vi": "Tham gia sự kiện."},{"ja": "参加したいですか？", "vi": "Bạn muốn tham gia không?"}], "care_example": "患者さんが施設のイベントに参加することを励まします。"}
    ],
    "dialogue": ["介護職: 「来月、祭があります。行きたいですか？」", "患者さん: 「そうですね。友達にも誘ってみましょう。」", "介護職: 「素晴らしい。家族にも連絡してみてください。」", "患者さん: 「わかりました。」", "介護職: 「皆で交流する時間は大切です。」", "患者さん: 「本当にそうですね。」", "介護職: 「参加を楽しみにしています。」"],
    "key_phrases": [{"ja": "友達と交流", "vi": "Giao lưu với bạn"},{"ja": "家族の訪問", "vi": "Thăm viếng của gia đình"},{"ja": "祭に参加", "vi": "Tham gia lễ hội"},{"ja": "地域の集まり", "vi": "Cuộc tụ họp cộng đồng"}],
    "cultural_note": {"ja": "日本の介護では、患者さんの社会的つながりと地域参加を重視しています。孤立を防ぎ、他の患者さんや地域との交流を促進することが、患者さんの心身の健康に効果的です。", "vi": "Trong chăm sóc tại Nhật Bản, mối liên hệ xã hội và sự tham gia cộng đồng của bệnh nhân được coi trọng. Ngăn chặn cách ly và thúc đẩy giao lưu với các bệnh nhân khác hoặc cộng đồng có hiệu quả đối với sức khỏe thể chất và tinh thần của bệnh nhân."},
    "quiz": [
      {"question": {"ja": "患者さんの心身の健康を支援するために、介護職は何をすべきですか？", "vi": "Để hỗ trợ sức khỏe thể chất và tinh thần của bệnh nhân, nhân viên chăm sóc nên làm gì?"}, "options": [{"ja": "患者さんを孤立させる", "vi": "Cô lập bệnh nhân"},{"ja": "社会的つながりと交流を促進する", "vi": "Thúc đẩy kết nối xã hội và giao lưu"},{"ja": "地域参加を制限する", "vi": "Hạn chế sự tham gia cộng đồng"},{"ja": "友人や家族との面会を制限する", "vi": "Hạn chế gặp gỡ bạn bè và gia đình"}], "correct_answer": 1, "explanation": {"ja": "社会的つながりと交流は患者さんの心身の健康に非常に重要です。", "vi": "Kết nối xã hội và giao lưu rất quan trọng đối với sức khỏe thể chất và tinh thần của bệnh nhân."}, "difficulty": "medium"}
    ]
  }'
);

-- ═══════════════════════════════════════════════════
-- UNIT 10 LESSON 4: Work & Contribution Words
-- ═══════════════════════════════════════════════════

INSERT INTO lessons (id, course_id, unit, lesson_number, type, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  10,
  4,
  'vocabulary',
  '{
    "intro": {"ja": "仕事や貢献を表す言葉を学びます。「働く」「手伝う」「協力」「責任」など、患者さんが社会に参加し貢献する際に使える言葉です。", "vi": "Học những từ biểu hiện công việc và đóng góp. \"Làm việc\", \"Giúp đỡ\", \"Hợp tác\", \"Trách nhiệm\"... những từ mà bệnh nhân có thể sử dụng khi tham gia xã hội và đóng góp."},
    "words": [
      {"word": "働く", "reading": "はたらく", "kanji": "働く", "meaning": {"ja": "仕事をする", "vi": "làm việc"}, "examples": [{"ja": "毎日働きます。", "vi": "Làm việc hàng ngày."},{"ja": "働くことは大切です。", "vi": "Làm việc là quan trọng."}], "care_example": "患者さんが社会参加の一部として、簡単な作業などを勧めることがあります。"},
      {"word": "手伝う", "reading": "てつだう", "kanji": "手伝う", "meaning": {"ja": "他の人をサポートする", "vi": "giúp đỡ"}, "examples": [{"ja": "食事を手伝います。", "vi": "Giúp ăn cơm."},{"ja": "手伝ってくれてありがとう。", "vi": "Cảm ơn vì đã giúp."}], "care_example": "患者さんが力を合わせて活動に参加する時、手伝うことを表現します。"},
      {"word": "協力", "reading": "きょうりょく", "kanji": "協力", "meaning": {"ja": "一緒に力を合わせる", "vi": "hợp tác"}, "examples": [{"ja": "協力しましょう。", "vi": "Hãy hợp tác."},{"ja": "皆で協力します。", "vi": "Cùng nhau hợp tác."}], "care_example": "患者さんが他の患者さんと協力して活動に参加することを促します。"},
      {"word": "責任", "reading": "せきにん", "kanji": "責任", "meaning": {"ja": "やるべき義務", "vi": "trách nhiệm"}, "examples": [{"ja": "責任を持ってします。", "vi": "Làm với trách nhiệm."},{"ja": "責任感が大切です。", "vi": "Ý thức trách nhiệm là quan trọng."}], "care_example": "患者さんが自分の健康管理に責任を持つことを励まします。"},
      {"word": "役割", "reading": "やくわり", "kanji": "役割", "meaning": {"ja": "与えられた任務や立場", "vi": "vai trò"}, "examples": [{"ja": "その役割を引き受けます。", "vi": "Nhận vai trò đó."},{"ja": "皆が異なる役割をしています。", "vi": "Mọi người có các vai trò khác nhau."}], "care_example": "施設内で患者さんが適切な役割を持つことが社会参加につながります。"},
      {"word": "貢献", "reading": "こうけん", "kanji": "貢献", "meaning": {"ja": "何かに役立つこと", "vi": "đóng góp"}, "examples": [{"ja": "社会に貢献します。", "vi": "Đóng góp cho xã hội."},{"ja": "貢献することは大切です。", "vi": "Đóng góp là quan trọng."}], "care_example": "患者さんの経験や知識が施設内で活かされ、他の患者さんを助けるための貢献ができます。"},
      {"word": "成功", "reading": "せいこう", "kanji": "成功", "meaning": {"ja": "目的を達成すること", "vi": "thành công"}, "examples": [{"ja": "成功しました。", "vi": "Thành công."},{"ja": "成功を祝います。", "vi": "Chúc mừng thành công."}], "care_example": "患者さんが小さな目標を達成した時、その成功を一緒に喜びます。"},
      {"word": "努力", "reading": "どりょく", "kanji": "努力", "meaning": {"ja": "一生懸命にがんばる", "vi": "cố gắng"}, "examples": [{"ja": "努力します。", "vi": "Tôi sẽ cố gắng."},{"ja": "努力が大切です。", "vi": "Cố gắng là quan trọng."}], "care_example": "患者さんのリハビリの努力を認め、励まします。"}
    ],
    "dialogue": ["介護職: 「貴方の努力は素晴らしいです。」", "患者さん: 「ありがとうございます。」", "介護職: 「リハビリで成功を目指しましょう。」", "患者さん: 「わかりました。頑張ります。」", "介護職: 「貴方の役割は重要です。」", "患者さん: 「社会に貢献したいです。」", "介護職: 「その気持ちが大切です。一緒に頑張りましょう。」"],
    "key_phrases": [{"ja": "協力して働く", "vi": "Làm việc hợp tác"},{"ja": "努力する", "vi": "Cố gắng"},{"ja": "責任を持つ", "vi": "Có trách nhiệm"},{"ja": "成功を目指す", "vi": "Hướng tới thành công"}],
    "cultural_note": {"ja": "日本の介護では、患者さんが受動的な対象ではなく、社会の一員として貢献できることを重視しています。患者さんが自分の役割を果たし、努力し、成功することを支援することが、患者さんの尊厳と自尊心を守ることにつながります。", "vi": "Trong chăm sóc tại Nhật Bản, bệnh nhân không phải là đối tượng bị động mà được coi là thành viên xã hội có thể đóng góp. Hỗ trợ bệnh nhân thực hiện vai trò của họ, cố gắng và đạt được thành công là bảo vệ nhân phẩm và lòng tự trọng của bệnh nhân."},
    "quiz": [
      {"question": {"ja": "患者さんの尊厳を守るために、介護職は何をすべきですか？", "vi": "Để bảo vệ nhân phẩm của bệnh nhân, nhân viên chăm sóc nên làm gì?"}, "options": [{"ja": "患者さんを無視する", "vi": "Bỏ qua bệnh nhân"},{"ja": "患者さんを受動的に扱う", "vi": "Đối xử với bệnh nhân một cách bị động"},{"ja": "患者さんが役割を果たし貢献できることを支援する", "vi": "Hỗ trợ bệnh nhân thực hiện vai trò và đóng góp"},{"ja": "患者さんの努力を無視する", "vi": "Bỏ qua cố gắng của bệnh nhân"}], "correct_answer": 2, "explanation": {"ja": "患者さんが社会の一員として貢献できることを支援することが、患者さんの尊厳を守ります。", "vi": "Hỗ trợ bệnh nhân đóng góp như thành viên xã hội bảo vệ nhân phẩm của họ."}, "difficulty": "hard"}
    ]
  }'
);

COMMIT;
