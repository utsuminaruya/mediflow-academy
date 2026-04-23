-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Mediflow Academy N5 Vocabulary Lessons (Unit 5-6 Continued)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Unit 5, Lessons 2-4: Places & Buildings (continued)
-- Unit 6, Lessons 1-4: Basic Verbs

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- UNIT 5 CONTINUED: PLACES & BUILDINGS
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Unit 5, Lesson 2: Rooms in a Building
INSERT INTO lessons (id, course_id, content, quiz_data) VALUES
(gen_random_uuid(), (SELECT id FROM courses WHERE title->'ja' = 'JLPT N5 基本語彙' LIMIT 1),
'{
  "type": "vocabulary",
  "unit": 5,
  "lesson_number": 2,
  "intro": {
    "ja": "家や建物の中の部屋の種類を学びます。リビング、寝室、キッチン、浴室など、毎日使う部屋の名前を習います。",
    "vi": "Học các loại phòng trong nhà và tòa nhà. Phòng khách, phòng ngủ, nhà bếp, phòng tắm..."
  },
  "words": [
    {
      "word": "部屋",
      "reading": "へや",
      "kanji": "部屋",
      "meaning": {"ja": "建物の中の仕切られた空間", "vi": "Phòng, không gian trong tòa nhà"},
      "examples": [
        {"ja": "部屋は広いです", "vi": "Phòng rất rộng"},
        {"ja": "部屋の中は暖かいです", "vi": "Trong phòng ấm"}
      ],
      "care_example": {"ja": "高齢者の部屋は南向きが良いです", "vi": "Phòng người cao tuổi nên hướng nam"}
    },
    {
      "word": "リビング",
      "reading": "りびんぐ",
      "kanji": null,
      "meaning": {"ja": "家族が一緒に過ごす部屋、居間", "vi": "Phòng khách, nơi gia đình聚集"},
      "examples": [
        {"ja": "リビングで家族と過ごします", "vi": "Tôi dành thời gian với gia đình ở phòng khách"},
        {"ja": "リビングはテレビがあります", "vi": "Phòng khách có tivi"}
      ],
      "care_example": {"ja": "介護施設のリビングは、高齢者が交流する場所です", "vi": "Phòng khách ở cơ sở chăm sóc là nơi người cao tuổi giao tiếp"}
    },
    {
      "word": "寝室",
      "reading": "しんしつ",
      "kanji": "寝室",
      "meaning": {"ja": "寝る部屋、ベッドがある部屋", "vi": "Phòng ngủ, phòng có giường"},
      "examples": [
        {"ja": "寝室は静かです", "vi": "Phòng ngủ yên tĩnh"},
        {"ja": "寝室のドアを閉めました", "vi": "Tôi đã đóng cửa phòng ngủ"}
      ],
      "care_example": {"ja": "高齢者の寝室はベッドと手すりが必要です", "vi": "Phòng ngủ người cao tuổi cần giường và tay vịn"}
    },
    {
      "word": "キッチン",
      "reading": "きっちん",
      "kanji": null,
      "meaning": {"ja": "料理する部屋、台所", "vi": "Nhà bếp, phòng nấu nướng"},
      "examples": [
        {"ja": "キッチンで料理をします", "vi": "Tôi nấu nướng ở nhà bếp"},
        {"ja": "キッチンは清潔です", "vi": "Nhà bếp sạch sẽ"}
      ],
      "care_example": {"ja": "介護施設のキッチンは、栄養士が食事を準備します", "vi": "Nhà bếp ở cơ sở chăm sóc, chuyên gia dinh dưỡng chuẩn bị bữa ăn"}
    },
    {
      "word": "浴室",
      "reading": "よくしつ",
      "kanji": "浴室",
      "meaning": {"ja": "風呂に入る部屋", "vi": "Phòng tắm, phòng tắm"},
      "examples": [
        {"ja": "浴室は清潔です", "vi": "Phòng tắm sạch sẽ"},
        {"ja": "毎日、浴室に入ります", "vi": "Mỗi ngày tôi tắm ở phòng tắm"}
      ],
      "care_example": {"ja": "高齢者の浴室は滑らない床が必要です", "vi": "Phòng tắm người cao tuổi cần sàn không trơn"}
    },
    {
      "word": "トイレ",
      "reading": "といれ",
      "kanji": null,
      "meaning": {"ja": "便所、排泄する部屋", "vi": "Nhà vệ sinh, toilet"},
      "examples": [
        {"ja": "トイレは狭いです", "vi": "Nhà vệ sinh hẹp"},
        {"ja": "トイレは清潔にしておきます", "vi": "Tôi giữ nhà vệ sinh sạch sẽ"}
      ],
      "care_example": {"ja": "高齢者のトイレは手すりが必要です", "vi": "Nhà vệ sinh người cao tuổi cần tay vịn"}
    },
    {
      "word": "洗面所",
      "reading": "せんめんじょ",
      "kanji": "洗面所",
      "meaning": {"ja": "顔や手を洗う部屋", "vi": "Phòng rửa mặt, nơi rửa tay"},
      "examples": [
        {"ja": "洗面所で手を洗いました", "vi": "Tôi đã rửa tay ở phòng rửa"},
        {"ja": "洗面所に鏡があります", "vi": "Phòng rửa có gương"}
      ],
      "care_example": {"ja": "高齢者は毎日、洗面所で身体を洗います", "vi": "Người cao tuổi rửa sạch thân thể mỗi ngày ở phòng rửa"}
    },
    {
      "word": "台所",
      "reading": "だいどころ",
      "kanji": "台所",
      "meaning": {"ja": "キッチン、料理をする部屋", "vi": "Nhà bếp, phòng nấu nướng"},
      "examples": [
        {"ja": "台所で朝食を作りました", "vi": "Tôi làm bữa sáng ở nhà bếp"},
        {"ja": "台所は忙しいです", "vi": "Nhà bếp bận rộn"}
      ],
      "care_example": {"ja": "介護施設の台所は、栄養バランスの良い食事を準備します", "vi": "Nhà bếp ở cơ sở chăm sóc chuẩn bị bữa ăn cân bằng"}
    },
    {
      "word": "ドア",
      "reading": "どあ",
      "kanji": null,
      "meaning": {"ja": "部屋の入口を開け閉めする", "vi": "Cửa, mở đóng lối vào"},
      "examples": [
        {"ja": "ドアを開けました", "vi": "Tôi mở cửa"},
        {"ja": "ドアを閉めてください", "vi": "Vui lòng đóng cửa"}
      ],
      "care_example": {"ja": "高齢者のドアは、簡単に開けられるべきです", "vi": "Cửa người cao tuổi nên dễ mở"}
    },
    {
      "word": "窓",
      "reading": "まど",
      "kanji": "窓",
      "meaning": {"ja": "光が入る、空気が流れる開口部", "vi": "Cửa sổ, nơi ánh sáng đi vào"},
      "examples": [
        {"ja": "窓から太陽が入ります", "vi": "Ánh nắng vào qua cửa sổ"},
        {"ja": "窓を開けてください", "vi": "Vui lòng mở cửa sổ"}
      ],
      "care_example": {"ja": "高齢者の部屋は、窓から自然光が入ることが重要です", "vi": "Quan trọng là ánh sáng tự nhiên vào phòng người cao tuổi qua cửa sổ"}
    },
    {
      "word": "ベッド",
      "reading": "べっど",
      "kanji": null,
      "meaning": {"ja": "寝る家具、布団を敷く", "vi": "Giường, nơi ngủ"},
      "examples": [
        {"ja": "ベッドは快適です", "vi": "Giường thoải mái"},
        {"ja": "毎晩、ベッドで寝ます", "vi": "Mỗi tối tôi ngủ trên giường"}
      ],
      "care_example": {"ja": "高齢者のベッドは、医療用の調整ベッドが良いです", "vi": "Giường người cao tuổi nên là giường điều chỉnh y tế"}
    },
    {
      "word": "机",
      "reading": "つくえ",
      "kanji": "机",
      "meaning": {"ja": "仕事や勉強をする家具", "vi": "Bàn, nơi làm việc"},
      "examples": [
        {"ja": "机の上に本があります", "vi": "Có sách trên bàn"},
        {"ja": "机で宿題をします", "vi": "Tôi làm bài tập ở bàn"}
      ],
      "care_example": {"ja": "高齢者の机は、低めが良いかもしれません", "vi": "Bàn người cao tuổi nên thấp"}
    },
    {
      "word": "椅子",
      "reading": "いす",
      "kanji": "椅子",
      "meaning": {"ja": "座る家具、背がある座り物", "vi": "Ghế, nơi ngồi"},
      "examples": [
        {"ja": "椅子に座りました", "vi": "Tôi ngồi trên ghế"},
        {"ja": "椅子は白いです", "vi": "Ghế trắng"}
      ],
      "care_example": {"ja": "高齢者の椅子は、手すりが付いたものが安全です", "vi": "Ghế người cao tuổi nên có tay vịn"}
    },
    {
      "word": "天井",
      "reading": "てんじょう",
      "kanji": "天井",
      "meaning": {"ja": "部屋の上の面、屋根の内側", "vi": "Trần nhà, phần trên của phòng"},
      "examples": [
        {"ja": "天井は高いです", "vi": "Trần nhà cao"},
        {"ja": "天井から雨が漏ってきました", "vi": "Mưa rò rỉ qua trần nhà"}
      ],
      "care_example": {"ja": "天井の照明は、高齢者に十分な明かりを提供するべき", "vi": "Đèn trần nên cung cấp đủ ánh sáng cho người cao tuổi"}
    },
    {
      "word": "床",
      "reading": "ゆか",
      "kanji": "床",
      "meaning": {"ja": "部屋の下の面、歩く場所", "vi": "Sàn, nơi đi bộ"},
      "examples": [
        {"ja": "床は清潔です", "vi": "Sàn sạch sẽ"},
        {"ja": "床が冷たいです", "vi": "Sàn lạnh"}
      ],
      "care_example": {"ja": "高齢者の床は、滑らない材質が必要です", "vi": "Sàn người cao tuổi cần chất liệu không trơn"}
    },
    {
      "word": "壁",
      "reading": "かべ",
      "kanji": "壁",
      "meaning": {"ja": "部屋を仕切る垂直な構造", "vi": "Tường, cấu trúc phân chia phòng"},
      "examples": [
        {"ja": "壁は白いです", "vi": "Tường trắng"},
        {"ja": "壁に絵を掛けました", "vi": "Tôi treo tranh trên tường"}
      ],
      "care_example": {"ja": "壁に手すりを付けることは、高齢者の安全性を高めます", "vi": "Gắn tay vịn trên tường tăng an toàn cho người cao tuổi"}
    }
  ],
  "dialogue": {
    "title": {"ja": "家の中の案内", "vi": "Hướng dẫn trong nhà"},
    "scene": {"ja": "介護士が新しい利用者を、介護施設の各部屋に案内しています", "vi": "Nhân viên chăm sóc dẫn người dùng mới qua các phòng của cơ sở"},
    "lines": [
      {"speaker": "介護士", "text": {"ja": "ようこそ。これが、あなたの部屋です。ベッドと机があります。", "vi": "Chào mừng. Đây là phòng của bạn. Có giường và bàn."}},
      {"speaker": "利用者", "text": {"ja": "ありがとうございます。ここはとても良いです。", "vi": "Cảm ơn. Đây là nơi tuyệt vời."}},
      {"speaker": "介護士", "text": {"ja": "浴室はこちらです。毎日、朝の8時と夜の6時に使えます。", "vi": "Phòng tắm ở đây. Có thể sử dụng lúc 8 sáng và 6 chiều mỗi ngày."}},
      {"speaker": "利用者", "text": {"ja": "わかりました。トイレはどこですか？", "vi": "Được rồi. Nhà vệ sinh ở đâu?"}},
      {"speaker": "介護士", "text": {"ja": "トイレは、廊下の左側です。見てください。手すりがあります。", "vi": "Nhà vệ sinh ở bên trái hành lang. Xem kia. Có tay vịn."}}
    ],
    "key_phrases": [
      {"phrase": "各部屋に案内する", "meaning": {"ja": "全ての部屋を見せる", "vi": "Chỉ các phòng"}},
      {"phrase": "毎日、〜時に使える", "meaning": {"ja": "毎日、その時間に利用できる", "vi": "Có thể sử dụng lúc đó mỗi ngày"}},
      {"phrase": "手すりがある", "meaning": {"ja": "つかまるための取っ手がある", "vi": "Có tay vịn để nắm"}}
    ],
    "cultural_note": {"ja": "日本の介護施設では、利用者が安全に生活するために、各部屋には手すりが付いており、床は滑りにくいように設計されています。", "vi": "Tại các cơ sở chăm sóc Nhật Bản, để người dùng sống an toàn, mỗi phòng có tay vịn và sàn được thiết kế không trơn."}
  }
}',
'[
  {"question": {"ja": "高齢者のベッドは、どのようなものが良いですか？", "vi": "Giường nào tốt cho người cao tuổi?"}, "options": [{"ja": "普通のベッド", "vi": "Giường thường"}, {"ja": "医療用の調整ベッド", "vi": "Giường điều chỉnh y tế"}, {"ja": "布団", "vi": "Chăn"}, {"ja": "ソファベッド", "vi": "Giường sofa"}], "correct": 1, "explanation": {"ja": "医療用の調整ベッドは、高さと角度を調整できるので、高齢者に最適です。", "vi": "Giường điều chỉnh y tế có thể điều chỉnh chiều cao và góc, tối ưu cho người cao tuổi."}, "difficulty": "medium"},
  {"question": {"ja": "高齢者の浴室は、どのような特徴が必要ですか？", "vi": "Phòng tắm người cao tuổi cần đặc điểm gì?"}, "options": [{"ja": "滑りやすい床", "vi": "Sàn trơn"}, {"ja": "滑らない床と手すり", "vi": "Sàn không trơn và tay vịn"}, {"ja": "高い段差", "vi": "Bậc cao"}, {"ja": "小さい浴槽", "vi": "Bồn tắm nhỏ"}], "correct": 1, "explanation": {"ja": "滑らない床と手すりは、高齢者の浴室で怪我を防ぐために必要です。", "vi": "Sàn không trơn và tay vịn cần thiết để ngăn chặn chấn thương ở phòng tắm người cao tuổi."}, "difficulty": "hard"},
  {"question": {"ja": "リビングの主な用途は何ですか？", "vi": "Phòng khách dùng để làm gì?"}, "options": [{"ja": "寝る", "vi": "Ngủ"}, {"ja": "料理をする", "vi": "Nấu nướng"}, {"ja": "家族が一緒に過ごす", "vi": "Gia đình chơi cùng"}, {"ja": "トイレを使う", "vi": "Sử dụng nhà vệ sinh"}], "correct": 2, "explanation": {"ja": "リビングは、家族が一緒に過ごす部屋です。", "vi": "Phòng khách là nơi gia đình聚集."}, "difficulty": "easy"},
  {"question": {"ja": "介護施設の台所の役割は何ですか？", "vi": "Nhà bếp ở cơ sở chăm sóc có vai trò gì?"}, "options": [{"ja": "患者が料理をする", "vi": "Bệnh nhân nấu nướng"}, {"ja": "栄養バランスの良い食事を準備する", "vi": "Chuẩn bị bữa ăn cân bằng dinh dưỡng"}, {"ja": "医療機器を保管する", "vi": "Bảo quản thiết bị y tế"}, {"ja": "患者が休む", "vi": "Bệnh nhân nghỉ"}], "correct": 1, "explanation": {"ja": "介護施設の台所は、栄養士が栄養バランスの良い食事を準備する重要な場所です。", "vi": "Nhà bếp ở cơ sở chăm sóc là nơi chuyên gia dinh dưỡng chuẩn bị bữa ăn cân bằng."}, "difficulty": "hard"},
  {"question": {"ja": "部屋の\\\"天井\\\"は何の役割をしていますか？", "vi": "\\\"Trần nhà\\\" có vai trò gì?"}, "options": [{"ja": "歩く場所", "vi": "Nơi đi bộ"}, {"ja": "部屋の下の面", "vi": "Phần dưới của phòng"}, {"ja": "部屋の上の面、屋根の内側", "vi": "Phần trên của phòng"}, {"ja": "座る場所", "vi": "Nơi ngồi"}], "correct": 2, "explanation": {"ja": "天井は、部屋の上の面で、屋根の内側です。", "vi": "Trần nhà là phần trên của phòng, bên trong mái."}, "difficulty": "easy"}
]');

-- Unit 5, Lesson 3: Going Places and Transportation
INSERT INTO lessons (id, course_id, content, quiz_data) VALUES
(gen_random_uuid(), (SELECT id FROM courses WHERE title->'ja' = 'JLPT N5 基本語彙' LIMIT 1),
'{
  "type": "vocabulary",
  "unit": 5,
  "lesson_number": 3,
  "intro": {
    "ja": "病院に行く、駅に向かう、散歩に出かけるなど、場所への移動や交通手段について学びます。",
    "vi": "Học về đi đến các nơi như bệnh viện, ga tàu, và các phương tiện giao thông."
  },
  "words": [
    {
      "word": "行く",
      "reading": "いく",
      "kanji": "行く",
      "meaning": {"ja": "場所へ移動する", "vi": "Đi đến, di chuyển"},
      "examples": [
        {"ja": "病院に行きました", "vi": "Tôi đã đi đến bệnh viện"},
        {"ja": "毎日、学校に行きます", "vi": "Mỗi ngày tôi đi đến trường"}
      ],
      "care_example": {"ja": "高齢者は一人で行くことが困難です", "vi": "Người cao tuổi khó đi một mình"}
    },
    {
      "word": "来る",
      "reading": "くる",
      "kanji": "来る",
      "meaning": {"ja": "ある場所にやってくる", "vi": "Đến, tới"},
      "examples": [
        {"ja": "医者が来ました", "vi": "Bác sĩ đã đến"},
        {"ja": "朝、家族が来ます", "vi": "Gia đình sáng mai sẽ tới"}
      ],
      "care_example": {"ja": "訪問看護師が毎週来ます", "vi": "Y tá chăm sóc tại nhà đến mỗi tuần"}
    },
    {
      "word": "乗る",
      "reading": "のる",
      "kanji": "乗る",
      "meaning": {"ja": "車や電車に乗る", "vi": "Lên, đi bằng (xe, tàu)"},
      "examples": [
        {"ja": "電車に乗りました", "vi": "Tôi đã lên tàu"},
        {"ja": "タクシーに乗ってください", "vi": "Vui lòng lên taxi"}
      ],
      "care_example": {"ja": "高齢者は車に乗り降りするのが困難", "vi": "Khó cho người cao tuổi lên xuống xe"}
    },
    {
      "word": "降りる",
      "reading": "おりる",
      "kanji": "降りる",
      "meaning": {"ja": "車や電車から下りる", "vi": "Xuống (xe, tàu)"},
      "examples": [
        {"ja": "駅で降りました", "vi": "Tôi đã xuống ở ga"},
        {"ja": "ここで降りてください", "vi": "Vui lòng xuống ở đây"}
      ],
      "care_example": {"ja": "高齢者が降りるときは、手伝います", "vi": "Tôi giúp đỡ khi người cao tuổi xuống"}
    },
    {
      "word": "歩く",
      "reading": "あるく",
      "kanji": "歩く",
      "meaning": {"ja": "足で移動する、散歩する", "vi": "Đi bộ, bước đi"},
      "examples": [
        {"ja": "公園を歩きました", "vi": "Tôi đã đi bộ trong công viên"},
        {"ja": "毎日、歩きます", "vi": "Mỗi ngày tôi đi bộ"}
      ],
      "care_example": {"ja": "毎日の散歩は、高齢者の健康に重要", "vi": "Đi bộ hàng ngày quan trọng cho sức khỏe người cao tuổi"}
    },
    {
      "word": "走る",
      "reading": "はしる",
      "kanji": "走る",
      "meaning": {"ja": "速く移動する、走行する", "vi": "Chạy, di chuyển nhanh"},
      "examples": [
        {"ja": "子供が走っています", "vi": "Đứa trẻ đang chạy"},
        {"ja": "走らないでください", "vi": "Vui lòng không chạy"}
      ],
      "care_example": {"ja": "高齢者は走らないようにしましょう", "vi": "Người cao tuổi không nên chạy"}
    },
    {
      "word": "車",
      "reading": "くるま",
      "kanji": "車",
      "meaning": {"ja": "4つの車輪がある乗り物", "vi": "Xe, phương tiện có bánh xe"},
      "examples": [
        {"ja": "車で行きました", "vi": "Tôi đã đi bằng xe"},
        {"ja": "私の車は赤いです", "vi": "Xe của tôi màu đỏ"}
      ],
      "care_example": {"ja": "高齢者は車の中でも安全が大切", "vi": "An toàn quan trọng khi người cao tuổi ở trong xe"}
    },
    {
      "word": "タクシー",
      "reading": "たくしー",
      "kanji": null,
      "meaning": {"ja": "運転手がいる、お金を払う乗り物", "vi": "Taxi, phương tiện trả tiền"},
      "examples": [
        {"ja": "タクシーに乗りました", "vi": "Tôi đã lên taxi"},
        {"ja": "タクシーを呼んでください", "vi": "Vui lòng gọi taxi"}
      ],
      "care_example": {"ja": "高齢者にはタクシーが便利です", "vi": "Taxi tiện lợi cho người cao tuổi"}
    },
    {
      "word": "電車",
      "reading": "でんしゃ",
      "kanji": "電車",
      "meaning": {"ja": "線路の上を走る乗り物", "vi": "Tàu điện, phương tiện chạy trên đường ray"},
      "examples": [
        {"ja": "電車で行きます", "vi": "Tôi sẽ đi bằng tàu"},
        {"ja": "電車は混んでいます", "vi": "Tàu rất đông"}
      ],
      "care_example": {"ja": "高齢者は電車の乗り降りが大変", "vi": "Khó cho người cao tuổi lên xuống tàu"}
    },
    {
      "word": "バス",
      "reading": "ばす",
      "kanji": null,
      "meaning": {"ja": "大きな乗り物、バス停がある", "vi": "Xe buýt, phương tiện lớn"},
      "examples": [
        {"ja": "バスで行きました", "vi": "Tôi đã đi bằng xe buýt"},
        {"ja": "バス停はどこですか？", "vi": "Trạm xe buýt ở đâu?"}
      ],
      "care_example": {"ja": "バスのステップが高いので、高齢者は注意が必要", "vi": "Bậc xe buýt cao, người cao tuổi phải cẩn thận"}
    },
    {
      "word": "自転車",
      "reading": "じてんしゃ",
      "kanji": "自転車",
      "meaning": {"ja": "足でペダルをこぐ乗り物", "vi": "Xe đạp, phương tiện bằng chân"},
      "examples": [
        {"ja": "自転車で行きます", "vi": "Tôi sẽ đi bằng xe đạp"},
        {"ja": "自転車は便利です", "vi": "Xe đạp tiện lợi"}
      ],
      "care_example": {"ja": "高齢者は自転車に乗らないほうが安全です", "vi": "An toàn hơn nếu người cao tuổi không đạp xe"}
    },
    {
      "word": "道",
      "reading": "みち",
      "kanji": "道",
      "meaning": {"ja": "歩く、移動する路", "vi": "Đường, lối đi"},
      "examples": [
        {"ja": "この道を曲がってください", "vi": "Vui lòng queo ở đường này"},
        {"ja": "道はきれいです", "vi": "Đường sạch sẽ"}
      ],
      "care_example": {"ja": "介護施設の周りの道は、高齢者が安全に歩ける必要", "vi": "Đường quanh cơ sở chăm sóc cần an toàn cho người cao tuổi"}
    }
  ],
  "dialogue": {
    "title": {"ja": "介護施設からの外出", "vi": "Đi ra ngoài từ cơ sở chăm sóc"},
    "scene": {"ja": "介護士が高齢者を、散歩に連れていく準備をしています", "vi": "Nhân viên chăm sóc chuẩn bị đưa người cao tuổi đi bộ"},
    "lines": [
      {"speaker": "介護士", "text": {"ja": "散歩に行きませんか？天気がいいです。", "vi": "Bạn muốn đi bộ không? Thời tiết rất tốt."}},
      {"speaker": "利用者", "text": {"ja": "いいですね。でも、足が疲れています。歩くのが遅いです。", "vi": "Tốt lắm. Nhưng chân tôi mệt. Tôi đi bộ chậm."}},
      {"speaker": "介護士", "text": {"ja": "大丈夫です。ゆっくり歩きましょう。杖も持ちます。", "vi": "Không sao. Chúng ta sẽ đi bộ từ từ. Tôi sẽ mang gậy."}},
      {"speaker": "利用者", "text": {"ja": "ありがとうございます。公園に行きたいです。", "vi": "Cảm ơn. Tôi muốn đi đến công viên."}},
      {"speaker": "介護士", "text": {"ja": "公園は、ここから歩いて10分です。車でも行けます。どちらがいいですか？", "vi": "Công viên cách đây 10 phút đi bộ. Chúng ta cũng có thể đi bằng xe. Cách nào bạn thích?"}}
    ],
    "key_phrases": [
      {"phrase": "散歩に行く", "meaning": {"ja": "歩いて出かける、散歩をする", "vi": "Đi bộ, đi dạo"}},
      {"phrase": "ゆっくり歩く", "meaning": {"ja": "速くなく、ゆっとり歩く", "vi": "Đi bộ từ từ"}},
      {"phrase": "どちらがいい", "meaning": {"ja": "2つの選択肢の中で、どれが良いか", "vi": "Cái nào tốt hơn"}}
    ],
    "cultural_note": {"ja": "日本の介護施設では、高齢者の健康維持のために、毎日の散歩や外出活動が奨励されています。", "vi": "Tại các cơ sở chăm sóc Nhật Bản, đi bộ hàng ngày và hoạt động ngoài trời được khuyến khích để duy trì sức khỏe người cao tuổi."}
  }
}',
'[
  {"question": {"ja": "\"行く\"と\"来る\"の違いは何ですか？", "vi": "Sự khác nhau giữa \"đi\" và \"đến\" là gì?"}, "options": [{"ja": "同じ意味", "vi": "Có nghĩa giống nhau"}, {"ja": "行くは移動する、来るはやってくる", "vi": "Đi là di chuyển, đến là tới"}, {"ja": "行くはゆっくり、来るは速い", "vi": "Đi là chậm, đến là nhanh"}, {"ja": "行くは車で、来るは歩く", "vi": "Đi bằng xe, đến bằng đi bộ"}], "correct": 1, "explanation": {"ja": "行くは場所へ移動すること、来るはある場所にやってくることです。", "vi": "Đi là di chuyển đến nơi, đến là tới một nơi."}, "difficulty": "medium"},
  {"question": {"ja": "高齢者の散歩の利点は何ですか？", "vi": "Lợi ích của đi bộ cho người cao tuổi là gì?"}, "options": [{"ja": "足が疲れる", "vi": "Chân mệt"}, {"ja": "健康維持に重要", "vi": "Quan trọng cho sức khỏe"}, {"ja": "時間が浪費される", "vi": "Lãng phí thời gian"}, {"ja": "外出するのが大変", "vi": "Khó đi ra ngoài"}], "correct": 1, "explanation": {"ja": "毎日の散歩は、高齢者の健康維持に重要です。", "vi": "Đi bộ hàng ngày quan trọng để duy trì sức khỏe người cao tuổi."}, "difficulty": "easy"},
  {"question": {"ja": "高齢者にとって、何が最も安全な移動手段ですか？", "vi": "Phương tiện giao thông nào an toàn nhất cho người cao tuổi?"}, "options": [{"ja": "自転車", "vi": "Xe đạp"}, {"ja": "電車", "vi": "Tàu điện"}, {"ja": "タクシーまたは車", "vi": "Taxi hoặc xe ô tô"}, {"ja": "バス", "vi": "Xe buýt"}], "correct": 2, "explanation": {"ja": "タクシーまたは車は、高齢者の安全性が最も高い移動手段です。", "vi": "Taxi hoặc xe ô tô là phương tiện giao thông an toàn nhất cho người cao tuổi."}, "difficulty": "hard"},
  {"question": {"ja": "\\\"杖\\\"の用途は何ですか？", "vi": "Gậy được dùng để làm gì?"}, "options": [{"ja": "跳ねる", "vi": "Bật nhảy"}, {"ja": "歩くのをサポート", "vi": "Hỗ trợ đi bộ"}, {"ja": "運動をする", "vi": "Tập thể dục"}, {"ja": "戦う", "vi": "Chiến đấu"}], "correct": 1, "explanation": {"ja": "杖は、高齢者が歩くときの支援道具です。", "vi": "Gậy là công cụ hỗ trợ đi bộ cho người cao tuổi."}, "difficulty": "easy"},
  {"question": {"ja": "バスに乗るときに、高齢者が注意すべきことは何ですか？", "vi": "Người cao tuổi nên cẩn thận điều gì khi lên xe buýt?"}, "options": [{"ja": "バスのステップが高い", "vi": "Bậc xe buýt cao"}, {"ja": "バスが色鮮やか", "vi": "Xe buýt đầy màu sắc"}, {"ja": "バスが大きい", "vi": "Xe buýt lớn"}, {"ja": "バスが速い", "vi": "Xe buýt nhanh"}], "correct": 0, "explanation": {"ja": "バスのステップが高いので、高齢者は注意が必要です。", "vi": "Bậc xe buýt cao, người cao tuổi phải cẩn thận."}, "difficulty": "medium"}
]');

-- Unit 5, Lesson 4: Time and Directions
INSERT INTO lessons (id, course_id, content, quiz_data) VALUES
(gen_random_uuid(), (SELECT id FROM courses WHERE title->'ja' = 'JLPT N5 基本語彙' LIMIT 1),
'{
  "type": "vocabulary",
  "unit": 5,
  "lesson_number": 4,
  "intro": {
    "ja": "左、右、前、後ろなどの方向と、近い、遠い、長いなどの距離や時間について学びます。",
    "vi": "Học về hướng như trái, phải, trước, sau và khoảng cách, thời gian như gần, xa, lâu."
  },
  "words": [
    {
      "word": "左",
      "reading": "ひだり",
      "kanji": "左",
      "meaning": {"ja": "方向、左側", "vi": "Hướng trái, bên trái"},
      "examples": [
        {"ja": "左に曲がってください", "vi": "Vui lòng queo trái"},
        {"ja": "左側に何があります", "vi": "Có gì ở bên trái"}
      ],
      "care_example": {"ja": "左に手すりがあります", "vi": "Có tay vịn ở bên trái"}
    },
    {
      "word": "右",
      "reading": "みぎ",
      "kanji": "右",
      "meaning": {"ja": "方向、右側", "vi": "Hướng phải, bên phải"},
      "examples": [
        {"ja": "右に曲がってください", "vi": "Vui lòng queo phải"},
        {"ja": "右側は駐車場です", "vi": "Bên phải là bãi đậu xe"}
      ],
      "care_example": {"ja": "右側に医者の部屋があります", "vi": "Phòng bác sĩ ở bên phải"}
    },
    {
      "word": "前",
      "reading": "まえ",
      "kanji": "前",
      "meaning": {"ja": "前方、顔の方向", "vi": "Phía trước, hướng về phía trước"},
      "examples": [
        {"ja": "前に行ってください", "vi": "Vui lòng đi phía trước"},
        {"ja": "前は病院です", "vi": "Phía trước là bệnh viện"}
      ],
      "care_example": {"ja": "前に見える建物が介護施設です", "vi": "Tòa nhà nhìn thấy phía trước là cơ sở chăm sóc"}
    },
    {
      "word": "後ろ",
      "reading": "うしろ",
      "kanji": "後ろ",
      "meaning": {"ja": "背後、後方", "vi": "Phía sau, hướng về phía sau"},
      "examples": [
        {"ja": "後ろを見てください", "vi": "Vui lòng nhìn phía sau"},
        {"ja": "後ろに何があります", "vi": "Có gì phía sau"}
      ],
      "care_example": {"ja": "後ろから支えます", "vi": "Tôi sẽ hỗ trợ từ phía sau"}
    },
    {
      "word": "近い",
      "reading": "ちかい",
      "kanji": "近い",
      "meaning": {"ja": "距離が短い、すぐそこ", "vi": "Gần, khoảng cách ngắn"},
      "examples": [
        {"ja": "駅は近いです", "vi": "Ga tàu gần"},
        {"ja": "近い将来", "vi": "Tương lai gần"}
      ],
      "care_example": {"ja": "病院は近いです", "vi": "Bệnh viện gần"}
    },
    {
      "word": "遠い",
      "reading": "とおい",
      "kanji": "遠い",
      "meaning": {"ja": "距離が長い、遠い場所", "vi": "Xa, khoảng cách dài"},
      "examples": [
        {"ja": "公園は遠いです", "vi": "Công viên xa"},
        {"ja": "遠い国", "vi": "Đất nước xa"}
      ],
      "care_example": {"ja": "高齢者にとって、遠い場所は大変", "vi": "Nơi xa lạnh khó cho người cao tuổi"}
    },
    {
      "word": "短い",
      "reading": "みじかい",
      "kanji": "短い",
      "meaning": {"ja": "長さが短い、時間が少ない", "vi": "Ngắn, chiều dài ngắn"},
      "examples": [
        {"ja": "短い髪", "vi": "Tóc ngắn"},
        {"ja": "短い時間", "vi": "Thời gian ngắn"}
      ],
      "care_example": {"ja": "散歩の時間を短くしましょう", "vi": "Hãy rút ngắn thời gian đi bộ"}
    },
    {
      "word": "長い",
      "reading": "ながい",
      "kanji": "長い",
      "meaning": {"ja": "長さが長い、時間が多い", "vi": "Dài, chiều dài dài"},
      "examples": [
        {"ja": "長い道", "vi": "Đường dài"},
        {"ja": "長い時間", "vi": "Thời gian lâu"}
      ],
      "care_example": {"ja": "長い立ったままは避ける", "vi": "Tránh đứng lâu"}
    },
    {
      "word": "高い",
      "reading": "たかい",
      "kanji": "高い",
      "meaning": {"ja": "高さが高い、値段が高い", "vi": "Cao, giá cao"},
      "examples": [
        {"ja": "高い建物", "vi": "Tòa nhà cao"},
        {"ja": "高い値段", "vi": "Giá cao"}
      ],
      "care_example": {"ja": "棚が高すぎます", "vi": "Kệ quá cao"}
    },
    {
      "word": "低い",
      "reading": "ひくい",
      "kanji": "低い",
      "meaning": {"ja": "高さが低い、値段が安い", "vi": "Thấp, giá rẻ"},
      "examples": [
        {"ja": "低いテーブル", "vi": "Bàn thấp"},
        {"ja": "低い値段", "vi": "Giá rẻ"}
      ],
      "care_example": {"ja": "高齢者のテーブルは低めが良い", "vi": "Bàn cho người cao tuổi nên thấp"}
    }
  ],
  "dialogue": {
    "title": {"ja": "施設の案内と方向", "vi": "Hướng dẫn cơ sở và hướng đi"},
    "scene": {"ja": "新しい利用者が、介護施設の案内をしてもらっています", "vi": "Người dùng mới được hướng dẫn cơ sở chăm sóc"},
    "lines": [
      {"speaker": "介護士", "text": {"ja": "右に曲がってください。医者の部屋です。", "vi": "Vui lòng queo phải. Đây là phòng bác sĩ."}},
      {"speaker": "利用者", "text": {"ja": "ありがとうございます。トイレはどこですか？", "vi": "Cảm ơn. Nhà vệ sinh ở đâu?"}},
      {"speaker": "介護士", "text": {"ja": "トイレは左です。廊下の左側に見えます。", "vi": "Nhà vệ sinh ở bên trái. Bạn sẽ thấy ở bên trái hành lang."}},
      {"speaker": "利用者", "text": {"ja": "遠いですか？", "vi": "Có xa không?"}},
      {"speaker": "介護士", "text": {"ja": "いいえ、近いです。歩いて1分です。", "vi": "Không, gần. Chỉ cách đây 1 phút đi bộ."}}
    ],
    "key_phrases": [
      {"phrase": "〜に曲がる", "meaning": {"ja": "方向を変える", "vi": "Thay đổi hướng"}},
      {"phrase": "左側に見える", "meaning": {"ja": "左のほうに見える", "vi": "Nhìn thấy ở bên trái"}},
      {"phrase": "歩いて〜分", "meaning": {"ja": "徒歩でかかる時間", "vi": "Thời gian đi bộ"}}
    ],
    "cultural_note": {"ja": "日本の介護施設では、新しい利用者に対して、施設内の主な場所を丁寧に説明し、安心させることが重視されます。", "vi": "Tại các cơ sở chăm sóc Nhật Bản, quan trọng là giải thích cẩn thận các nơi chính trong cơ sở cho những người dùng mới để họ cảm thấy tự tin."}
  }
}',
'[
  {"question": {"ja": "\"左\"と\"右\"の違いは何ですか？", "vi": "Sự khác nhau giữa \"trái\" và \"phải\" là gì?"}, "options": [{"ja": "左は赤い、右は青い", "vi": "Trái đỏ, phải xanh"}, {"ja": "左は前、右は後ろ", "vi": "Trái trước, phải sau"}, {"ja": "左は方向、右も方向", "vi": "Cả trái và phải đều là hướng"}, {"ja": "左は反対側、右も反対側", "vi": "Cả trái và phải đều bên đối diện"}], "correct": 2, "explanation": {"ja": "左と右は両方とも方向を示します。", "vi": "Cả trái và phải đều chỉ hướng."}, "difficulty": "easy"},
  {"question": {"ja": "\\\"近い\\\"と\\\"遠い\\\"の正しい説明は？", "vi": "Giải thích đúng về \"gần\" và \"xa\" là gì?"}, "options": [{"ja": "近いは長い、遠いは短い", "vi": "Gần dài, xa ngắn"}, {"ja": "近いは時間、遠いは距離", "vi": "Gần thời gian, xa khoảng cách"}, {"ja": "近いは距離が短い、遠いは距離が長い", "vi": "Gần khoảng cách ngắn, xa khoảng cách dài"}, {"ja": "近いと遠いは同じ意味", "vi": "Gần và xa có nghĩa giống nhau"}], "correct": 2, "explanation": {"ja": "近いは距離が短い、遠いは距離が長いです。", "vi": "Gần là khoảng cách ngắn, xa là khoảng cách dài."}, "difficulty": "medium"},
  {"question": {"ja": "\\\"高い\\\"と\\\"低い\\\"はどう使いますか？", "vi": "Làm sao sử dụng \"cao\" và \"thấp\"?"}, "options": [{"ja": "高いは色、低いも色", "vi": "Cao màu, thấp màu"}, {"ja": "高いは高さ、低いも高さ", "vi": "Cao độ cao, thấp độ cao"}, {"ja": "高いは値段、低いも値段", "vi": "Cao giá, thấp giá"}, {"ja": "高いは高さと値段、低いもそう", "vi": "Cao độ cao và giá, thấp cũng vậy"}], "correct": 3, "explanation": {"ja": "高いと低いは、高さと値段の両方に使えます。", "vi": "Cao và thấp có thể dùng cho cả độ cao và giá."}, "difficulty": "hard"},
  {"question": {"ja": "高齢者にとって、好ましいテーブルの高さはどのくらい？", "vi": "Chiều cao bàn thích hợp cho người cao tuổi là bao nhiêu?"}, "options": [{"ja": "高い", "vi": "Cao"}, {"ja": "低い", "vi": "Thấp"}, {"ja": "中程度", "vi": "Vừa phải"}, {"ja": "テーブルは必要ない", "vi": "Bàn không cần thiết"}], "correct": 1, "explanation": {"ja": "高齢者のテーブルは、低めが使いやすいです。", "vi": "Bàn cho người cao tuổi nên thấp để dễ sử dụng."}, "difficulty": "medium"},
  {"question": {"ja": "病院が近くにあることの利点は？", "vi": "Lợi ích của việc bệnh viện ở gần là gì?"}, "options": [{"ja": "すぐに医療が受けられる", "vi": "Có thể nhận chăm sóc y tế nhanh"}, {"ja": "値段が安い", "vi": "Giá rẻ"}, {"ja": "より遠くへ行ける", "vi": "Có thể đi xa hơn"}, {"ja": "歩く時間が長くなる", "vi": "Thời gian đi bộ dài hơn"}], "correct": 0, "explanation": {"ja": "病院が近くにあると、高齢者は緊急時にすぐに医療が受けられます。", "vi": "Khi bệnh viện ở gần, người cao tuổi có thể nhận chăm sóc y tế nhanh trong trường hợp khẩn cấp."}, "difficulty": "hard"}
]');

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- UNIT 6: BASIC VERBS (Lessons 6-1 to 6-4)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Unit 6, Lesson 1: Daily Actions Part 1
INSERT INTO lessons (id, course_id, content, quiz_data) VALUES
(gen_random_uuid(), (SELECT id FROM courses WHERE title->'ja' = 'JLPT N5 基本語彙' LIMIT 1),
'{
  "type": "vocabulary",
  "unit": 6,
  "lesson_number": 1,
  "intro": {
    "ja": "する、なる、ある、いる、できるなど、毎日使う基本的な動詞を学びます。これらは日本語で最も重要な動詞です。",
    "vi": "Học các động từ cơ bản được sử dụng hàng ngày như làm, trở thành, có, ở, có thể làm. Đây là những động từ quan trọng nhất trong tiếng Nhật."
  },
  "words": [
    {
      "word": "する",
      "reading": "する",
      "kanji": "する",
      "meaning": {"ja": "行動をする、実行する", "vi": "Làm, thực hiện"},
      "examples": [
        {"ja": "毎日、散歩をします", "vi": "Mỗi ngày tôi đi bộ"},
        {"ja": "介護をします", "vi": "Tôi chăm sóc"}
      ],
      "care_example": {"ja": "高齢者は介護を受けます", "vi": "Người cao tuổi nhận chăm sóc"}
    },
    {
      "word": "できる",
      "reading": "できる",
      "kanji": "出来る",
      "meaning": {"ja": "可能である、実行できる", "vi": "Có thể, khả năng"},
      "examples": [
        {"ja": "日本語ができます", "vi": "Tôi có thể nói tiếng Nhật"},
        {"ja": "歩くことができます", "vi": "Tôi có thể đi bộ"}
      ],
      "care_example": {"ja": "高齢者ができることを手伝う", "vi": "Giúp đỡ những gì người cao tuổi có thể làm"}
    },
    {
      "word": "ある",
      "reading": "ある",
      "kanji": "有る",
      "meaning": {"ja": "存在する、所有する", "vi": "Có, tồn tại"},
      "examples": [
        {"ja": "私は家があります", "vi": "Tôi có nhà"},
        {"ja": "ここに病院があります", "vi": "Có bệnh viện ở đây"}
      ],
      "care_example": {"ja": "施設に医者があります", "vi": "Có bác sĩ ở cơ sở"}
    },
    {
      "word": "いる",
      "reading": "いる",
      "kanji": "居る",
      "meaning": {"ja": "そこにいる、存在する（人や動物）", "vi": "Ở, tồn tại (người hoặc động vật)"},
      "examples": [
        {"ja": "私はここにいます", "vi": "Tôi ở đây"},
        {"ja": "医者がいます", "vi": "Có bác sĩ"}
      ],
      "care_example": {"ja": "看護師がいつもいます", "vi": "Luôn có y tá ở đây"}
    },
    {
      "word": "なる",
      "reading": "なる",
      "kanji": "成る",
      "meaning": {"ja": "変化する、〜になる", "vi": "Trở thành, thay đổi"},
      "examples": [
        {"ja": "春になりました", "vi": "Đã tới mùa xuân"},
        {"ja": "医者になりたいです", "vi": "Tôi muốn trở thành bác sĩ"}
      ],
      "care_example": {"ja": "年を取ると、体が弱くなります", "vi": "Khi tuổi tác, cơ thể trở nên yếu"}
    },
    {
      "word": "わかる",
      "reading": "わかる",
      "kanji": "分かる",
      "meaning": {"ja": "理解する、知っている", "vi": "Hiểu, biết"},
      "examples": [
        {"ja": "わかりました", "vi": "Tôi hiểu"},
        {"ja": "日本語がわかります", "vi": "Tôi hiểu tiếng Nhật"}
      ],
      "care_example": {"ja": "高齢者が指示を理解できるようにします", "vi": "Đảm bảo người cao tuổi hiểu hướng dẫn"}
    },
    {
      "word": "知る",
      "reading": "しる",
      "kanji": "知る",
      "meaning": {"ja": "情報を持っている、認識している", "vi": "Biết, nhận thức"},
      "examples": [
        {"ja": "私は彼を知っています", "vi": "Tôi biết anh ấy"},
        {"ja": "あなたは病院を知っていますか？", "vi": "Bạn biết bệnh viện không?"}
      ],
      "care_example": {"ja": "高齢者の病歴を知ることが重要", "vi": "Quan trọng là biết lịch sử bệnh của người cao tuổi"}
    },
    {
      "word": "思う",
      "reading": "おもう",
      "kanji": "思う",
      "meaning": {"ja": "考える、意見を持つ", "vi": "Nghĩ, có ý kiến"},
      "examples": [
        {"ja": "私はそう思います", "vi": "Tôi nghĩ vậy"},
        {"ja": "いいと思います", "vi": "Tôi nghĩ nó tốt"}
      ],
      "care_example": {"ja": "高齢者の意見を尊重する", "vi": "Tôn trọng ý kiến của người cao tuổi"}
    },
    {
      "word": "聞く",
      "reading": "きく",
      "kanji": "聞く",
      "meaning": {"ja": "耳で聞く、質問をする", "vi": "Nghe, hỏi"},
      "examples": [
        {"ja": "何か聞こえますか？", "vi": "Bạn nghe được gì không?"},
        {"ja": "質問があります。聞いてもいいですか？", "vi": "Tôi có câu hỏi. Tôi có thể hỏi được không?"}
      ],
      "care_example": {"ja": "高齢者の話を聞く", "vi": "Lắng nghe câu chuyện của người cao tuổi"}
    },
    {
      "word": "見る",
      "reading": "みる",
      "kanji": "見る",
      "meaning": {"ja": "目で見る、観察する", "vi": "Nhìn, quan sát"},
      "examples": [
        {"ja": "これを見てください", "vi": "Vui lòng xem cái này"},
        {"ja": "医者が患者を見ます", "vi": "Bác sĩ khám bệnh nhân"}
      ],
      "care_example": {"ja": "高齢者の症状を見守る", "vi": "Theo dõi triệu chứng của người cao tuổi"}
    },
    {
      "word": "感じる",
      "reading": "かんじる",
      "kanji": "感じる",
      "meaning": {"ja": "感覚を持つ、感情を持つ", "vi": "Cảm thấy, có cảm giác"},
      "examples": [
        {"ja": "暑さを感じます", "vi": "Tôi cảm thấy nóng"},
        {"ja": "幸せを感じます", "vi": "Tôi cảm thấy hạnh phúc"}
      ],
      "care_example": {"ja": "高齢者の痛みを理解する", "vi": "Hiểu cơn đau của người cao tuổi"}
    },
    {
      "word": "必要",
      "reading": "ひつよう",
      "kanji": "必要",
      "meaning": {"ja": "不可欠である、~が必要", "vi": "Cần thiết, yêu cầu"},
      "examples": [
        {"ja": "これが必要です", "vi": "Cái này cần thiết"},
        {"ja": "医者の助けが必要です", "vi": "Cần sự giúp đỡ của bác sĩ"}
      ],
      "care_example": {"ja": "高齢者の介護は24時間必要です", "vi": "Chăm sóc người cao tuổi cần thiết 24/7"}
    }
  ],
  "dialogue": {
    "title": {"ja": "能力についての会話", "vi": "Hội thoại về khả năng"},
    "scene": {"ja": "介護士が、高齢者ができることとできないことを確認しています", "vi": "Nhân viên chăm sóc xác nhận những gì người cao tuổi có thể và không thể làm"},
    "lines": [
      {"speaker": "介護士", "text": {"ja": "これはできますか？", "vi": "Bạn có thể làm được cái này không?"}},
      {"speaker": "利用者", "text": {"ja": "はい、できます。でも、歩くことは難しいです。", "vi": "Có, tôi có thể. Nhưng đi bộ khó."}},
      {"speaker": "介護士", "text": {"ja": "わかりました。杖を使いましょう。", "vi": "Được rồi. Hãy sử dụng gậy."}},
      {"speaker": "利用者", "text": {"ja": "ありがとうございます。何か聞いてもいいですか？", "vi": "Cảm ơn. Tôi có thể hỏi điều gì đó được không?"}},
      {"speaker": "介護士", "text": {"ja": "もちろんです。何でも聞いてください。", "vi": "Tất nhiên rồi. Bạn hỏi bất cứ điều gì."}}
    ],
    "key_phrases": [
      {"phrase": "〜ができる", "meaning": {"ja": "〜する能力がある", "vi": "Có khả năng làm ~"}},
      {"phrase": "何か聞いてもいいですか？", "meaning": {"ja": "質問をしてもいいですか？", "vi": "Tôi có thể hỏi không?"}},
      {"phrase": "わかりました", "meaning": {"ja": "理解しました", "vi": "Tôi hiểu"}}
    ],
    "cultural_note": {"ja": "日本の介護では、高齢者の能力を尊重し、できる限り自立を促進することが重視されます。", "vi": "Trong chăm sóc Nhật Bản, tôn trọng khả năng của người cao tuổi và khuyến khích độc lập là quan trọng."}
  }
}',
'[
  {"question": {"ja": "\\\"できる\\\"の意味は何ですか？", "vi": "Nghĩa của \"có thể\" là gì?"}, "options": [{"ja": "実行する", "vi": "Thực hiện"}, {"ja": "可能である", "vi": "Có thể, khả năng"}, {"ja": "存在する", "vi": "Tồn tại"}, {"ja": "なる", "vi": "Trở thành"}], "correct": 1, "explanation": {"ja": "できるは、何かを実行できる能力があることを意味します。", "vi": "Có thể có nghĩa là có khả năng thực hiện điều gì đó."}, "difficulty": "easy"},
  {"question": {"ja": "\\\"ある\\\"と\\\"いる\\\"の違いは何ですか？", "vi": "Sự khác nhau giữa \"có\" và \"ở\" là gì?"}, "options": [{"ja": "同じ意味", "vi": "Có nghĩa giống nhau"}, {"ja": "あるは人、いるは物", "vi": "Có là người, ở là vật"}, {"ja": "あるは物、いるは人や動物", "vi": "Có là vật, ở là người hoặc động vật"}, {"ja": "あるは存在、いるは位置", "vi": "Có là tồn tại, ở là vị trí"}], "correct": 2, "explanation": {"ja": "あるは物の存在、いるは人や動物の存在を表します。", "vi": "Có chỉ sự tồn tại của vật, ở chỉ sự tồn tại của người hoặc động vật."}, "difficulty": "medium"},
  {"question": {"ja": "\\\"なる\\\"と\\\"する\\\"の違いは何ですか？", "vi": "Sự khác nhau giữa \"trở thành\" và \"làm\" là gì?"}, "options": [{"ja": "同じ意味", "vi": "Có nghĩa giống nhau"}, {"ja": "なるは自然変化、するは行動", "vi": "Trở thành là thay đổi tự nhiên, làm là hành động"}, {"ja": "なるは物、するは人", "vi": "Trở thành là vật, làm là người"}, {"ja": "なるは過去、するは現在", "vi": "Trở thành quá khứ, làm hiện tại"}], "correct": 1, "explanation": {"ja": "なるは自然な変化、するは積極的な行動を表します。", "vi": "Trở thành chỉ thay đổi tự nhiên, làm chỉ hành động tích cực."}, "difficulty": "hard"},
  {"question": {"ja": "高齢者の介護で、どのような能力を尊重するべきですか？", "vi": "Chúng ta nên tôn trọng những khả năng nào khi chăm sóc người cao tuổi?"}, "options": [{"ja": "すべての能力を無視する", "vi": "Bỏ qua tất cả khả năng"}, {"ja": "できる限りの自立を促進する", "vi": "Khuyến khích độc lập tối đa"}, {"ja": "すべての作業を代わりにする", "vi": "Thay thế tất cả công việc"}, {"ja": "能力を制限する", "vi": "Giới hạn khả năng"}], "correct": 1, "explanation": {"ja": "高齢者の自立を尊重し、できることはサポートする方法で助けることが重要です。", "vi": "Quan trọng là tôn trọng độc lập của người cao tuổi và hỗ trợ những gì họ có thể làm."}, "difficulty": "hard"},
  {"question": {"ja": "\\\"感じる\\\"はどのような場面で使いますか？", "vi": "\\\"Cảm thấy\\\" được sử dụng trong những tình huống nào?"}, "options": [{"ja": "視覚的な情報", "vi": "Thông tin hình ảnh"}, {"ja": "聴覚的な情報", "vi": "Thông tin âm thanh"}, {"ja": "感覚と感情", "vi": "Cảm giác và cảm xúc"}, {"ja": "移動すること", "vi": "Di chuyển"}], "correct": 2, "explanation": {"ja": "感じるは、物理的な感覚（暑さ、冷たさ）と感情を表します。", "vi": "Cảm thấy diễn tả cảm giác vật lý (nóng, lạnh) và cảm xúc."}, "difficulty": "medium"}
]');

-- Continue with remaining lessons (6-2, 6-3, 6-4)...
-- These will be in the next section due to length constraints
