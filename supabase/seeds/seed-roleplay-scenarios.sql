-- Roleplay Scenarios Seed Data
-- 9 scenarios covering key care situations

INSERT INTO roleplay_scenarios (slug, title, description, category, difficulty, estimated_minutes, required_plan, ai_character, user_role, scene_setting, learning_objectives, key_phrases, success_criteria, ai_system_prompt, sort_order, is_active) VALUES

-- 1. 朝のケア（N5・無料）
(
  'morning-greeting-n5',
  '{"ja": "朝のあいさつと声かけ", "vi": "Chào buổi sáng và hỏi thăm"}',
  '{"ja": "利用者さんに朝のあいさつをして、体調を確認しましょう", "vi": "Chào hỏi buổi sáng và kiểm tra sức khỏe của người cao tuổi"}',
  'morning_care',
  'N5',
  5,
  'free',
  '{"role": "resident", "name": "田中さん", "age": 82, "personality": {"ja": "穏やかで話好き。少し耳が遠い。", "vi": "Hiền lành, thích nói chuyện. Nghe hơi kém."}, "background": {"ja": "元教師。毎朝体操をするのが日課。", "vi": "Nguyên là giáo viên. Thói quen thể dục mỗi sáng."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "朝7時。田中さんの居室に起床の声かけに来ました。カーテンを開けて明るくする前に声かけをします。", "vi": "7 giờ sáng. Bạn đến phòng ông Tanaka để gọi dậy. Hãy nói chuyện trước khi mở rèm."}',
  '["朝のあいさつができる", "体調確認の言葉を使える", "丁寧な敬語が使える"]',
  '[{"phrase": "おはようございます、田中さん", "meaning": {"ja": "朝のあいさつ", "vi": "Chào buổi sáng"}}, {"phrase": "お体の具合はいかがですか", "meaning": {"ja": "体調確認", "vi": "Hỏi thăm sức khỏe"}}, {"phrase": "よく眠れましたか", "meaning": {"ja": "睡眠の確認", "vi": "Hỏi về giấc ngủ"}}, {"phrase": "今日もよい一日にしましょう", "meaning": {"ja": "励ましの言葉", "vi": "Lời động viên"}}]',
  '{"ja": ["敬語を使ってあいさつできた", "体調を丁寧に確認できた", "利用者が安心して目覚められた"], "vi": ["Chào hỏi bằng kính ngữ", "Hỏi thăm sức khỏe lịch sự", "Người dùng thức dậy thoải mái"]}',
  'あなたは82歳の田中さんです。元教師で穏やかな性格。少し耳が遠いです。朝は体操が日課で、いつも元気に過ごしています。介護スタッフが朝の声かけに来ています。自然な会話をしてください。敬語で話しかけてもらえると喜びます。体調は良好ですが、昨夜は少し眠れなかったと話してみてください。',
  1,
  true
),

-- 2. 食事介助（N5・無料）
(
  'meal-assistance-n5',
  '{"ja": "食事の準備と声かけ", "vi": "Chuẩn bị bữa ăn và hỏi thăm"}',
  '{"ja": "昼食の準備をして利用者さんに食事の声かけをしましょう", "vi": "Chuẩn bị bữa trưa và mời người cao tuổi dùng bữa"}',
  'meal_assistance',
  'N5',
  5,
  'free',
  '{"role": "resident", "name": "山田さん", "age": 75, "personality": {"ja": "食べることが大好き。食欲旺盛。", "vi": "Rất thích ăn uống. Ăn ngon miệng."}, "background": {"ja": "料理が得意だった主婦。食事の話題が好き。", "vi": "Từng là nội trợ giỏi nấu ăn. Thích nói về ẩm thực."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "昼12時。食堂に山田さんを迎えに行きます。今日の昼食はうどんです。", "vi": "12 giờ trưa. Bạn đến đón bà Yamada đến phòng ăn. Bữa trưa hôm nay là mì udon."}',
  '["食事の声かけができる", "メニューを説明できる", "食欲確認ができる"]',
  '[{"phrase": "お食事のお時間です", "meaning": {"ja": "食事の案内", "vi": "Thông báo giờ ăn"}}, {"phrase": "今日はうどんですよ", "meaning": {"ja": "メニュー説明", "vi": "Giới thiệu món ăn"}}, {"phrase": "一緒に食堂へ行きましょう", "meaning": {"ja": "誘導の言葉", "vi": "Mời đi cùng"}}, {"phrase": "お腹はすいていますか", "meaning": {"ja": "空腹確認", "vi": "Hỏi có đói không"}}]',
  '{"ja": ["食事の案内が丁寧にできた", "メニューを説明できた", "利用者が食堂へ移動した"], "vi": ["Mời ăn lịch sự", "Giải thích được món ăn", "Người dùng đến phòng ăn"]}',
  'あなたは75歳の山田さんです。食べることが大好きで食欲旺盛。料理が得意だった元主婦です。昼食の時間になり、介護スタッフが声をかけに来ています。うどんと聞いて喜んでください。食事の話題で楽しく会話してください。',
  2,
  true
),

-- 3. 入浴介助（N4・ベーシック）
(
  'bathing-assistance-n4',
  '{"ja": "入浴前の確認と声かけ", "vi": "Kiểm tra trước khi tắm"}',
  '{"ja": "入浴前に体調確認をして、安全に入浴の準備をしましょう", "vi": "Kiểm tra sức khỏe trước khi tắm và chuẩn bị an toàn"}',
  'bathing',
  'N4',
  8,
  'basic',
  '{"role": "resident", "name": "佐藤さん", "age": 78, "personality": {"ja": "お風呂が大好き。でも最近足元が不安定。", "vi": "Rất thích tắm. Nhưng dạo này bước đi không vững."}, "background": {"ja": "元銀行員。几帳面な性格。清潔感を大切にしている。", "vi": "Nguyên nhân viên ngân hàng. Tỉ mỉ, cẩn thận. Coi trọng vệ sinh."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "午後2時。佐藤さんの入浴の日です。浴室の準備は整っています。体調を確認してから案内します。", "vi": "2 giờ chiều. Hôm nay là ngày tắm của ông Sato. Phòng tắm đã sẵn sàng. Kiểm tra sức khỏe trước khi đưa vào."}',
  '["入浴前の体調確認ができる", "安全への配慮を伝えられる", "丁寧に入浴に誘導できる"]',
  '[{"phrase": "本日はお風呂の日です", "meaning": {"ja": "入浴案内", "vi": "Thông báo ngày tắm"}}, {"phrase": "体調はいかがですか", "meaning": {"ja": "体調確認", "vi": "Hỏi thăm sức khỏe"}}, {"phrase": "足元にお気をつけください", "meaning": {"ja": "安全への声かけ", "vi": "Nhắc chú ý bước đi"}}, {"phrase": "お湯の温度はいかがですか", "meaning": {"ja": "温度確認", "vi": "Hỏi nhiệt độ nước"}}]',
  '{"ja": ["体調確認が適切にできた", "安全への配慮が伝えられた", "利用者が安心して入浴準備できた"], "vi": ["Kiểm tra sức khỏe phù hợp", "Truyền đạt được sự chú ý an toàn", "Người dùng chuẩn bị tắm thoải mái"]}',
  'あなたは78歳の佐藤さんです。お風呂が大好きですが、最近足元が不安定です。元銀行員で几帳面な性格。今日は入浴の日で楽しみにしています。でも少し膝が痛いことを話してみてください。介護スタッフの安全への配慮の言葉に感謝してください。',
  3,
  true
),

-- 4. 排泄介助（N4・ベーシック）
(
  'toileting-assistance-n4',
  '{"ja": "トイレ介助の声かけ", "vi": "Hỗ trợ vệ sinh"}',
  '{"ja": "定時のトイレ誘導と排泄介助を丁寧に行いましょう", "vi": "Hỗ trợ vệ sinh định kỳ một cách chu đáo"}',
  'toileting',
  'N4',
  8,
  'basic',
  '{"role": "resident", "name": "鈴木さん", "age": 85, "personality": {"ja": "プライドが高い。自立心が強い。", "vi": "Tự trọng cao. Ý thức tự lập mạnh."}, "background": {"ja": "元会社社長。指示されるのが苦手。", "vi": "Nguyên giám đốc công ty. Không quen được chỉ bảo."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "午後3時。定時のトイレ誘導の時間です。鈴木さんはプライドが高いため、さりげなく誘導することが大切です。", "vi": "3 giờ chiều. Giờ đưa đi vệ sinh định kỳ. Ông Suzuki tự trọng cao nên cần khéo léo mời đi."}',
  '["プライバシーへの配慮ができる", "さりげなく誘導できる", "利用者の自尊心を傷つけない"]',
  '[{"phrase": "少しお時間よろしいですか", "meaning": {"ja": "誘導の始め方", "vi": "Bắt đầu mời đi"}}, {"phrase": "お手洗いはいかがでしょうか", "meaning": {"ja": "トイレの誘導", "vi": "Mời đi vệ sinh"}}, {"phrase": "ご一緒します", "meaning": {"ja": "付き添いの提案", "vi": "Đề nghị đi cùng"}}, {"phrase": "お時間を取らせてしまい申し訳ありません", "meaning": {"ja": "配慮の言葉", "vi": "Lời thông cảm"}}]',
  '{"ja": ["プライバシーに配慮した声かけができた", "利用者の自尊心を保てた", "スムーズにトイレ誘導できた"], "vi": ["Nói chuyện với sự tôn trọng riêng tư", "Giữ được tự trọng của người dùng", "Dẫn đi vệ sinh suôn sẻ"]}',
  'あなたは85歳の鈴木さんです。元会社社長でプライドが高い。自分のことは自分でしたい気持ちが強いです。介護スタッフがトイレに誘導しようとしています。最初は「大丈夫です」と断ってみてください。でも丁寧に配慮ある声かけをされたら、「そうですね、お願いします」と受け入れてください。',
  4,
  true
),

-- 5. 移動介助（N4・ベーシック）
(
  'mobility-assistance-n4',
  '{"ja": "歩行介助と移乗", "vi": "Hỗ trợ đi lại và chuyển tư thế"}',
  '{"ja": "安全な歩行介助と車いすへの移乗をサポートしましょう", "vi": "Hỗ trợ đi lại an toàn và chuyển sang xe lăn"}',
  'mobility',
  'N4',
  10,
  'basic',
  '{"role": "resident", "name": "高橋さん", "age": 79, "personality": {"ja": "明るくポジティブ。リハビリに積極的。", "vi": "Vui vẻ, tích cực. Chủ động phục hồi chức năng."}, "background": {"ja": "元スポーツ選手。体を動かすことが好き。", "vi": "Nguyên vận động viên thể thao. Thích vận động."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "リハビリの時間。高橋さんを歩行器を使ってリハビリ室から食堂へ移動します。途中で車いすへの移乗も行います。", "vi": "Giờ phục hồi chức năng. Đưa ông Takahashi từ phòng tập đến phòng ăn bằng khung tập đi. Giữa đường chuyển sang xe lăn."}',
  '["移動介助の声かけができる", "安全への配慮が伝えられる", "利用者のペースに合わせられる"]',
  '[{"phrase": "ゆっくりで大丈夫ですよ", "meaning": {"ja": "安心させる言葉", "vi": "Lời trấn an"}}, {"phrase": "右手でしっかり握ってください", "meaning": {"ja": "具体的な指示", "vi": "Hướng dẫn cụ thể"}}, {"phrase": "もう少しですよ", "meaning": {"ja": "励ましの言葉", "vi": "Lời động viên"}}, {"phrase": "車いすに移りましょうか", "meaning": {"ja": "移乗の提案", "vi": "Đề nghị chuyển sang xe lăn"}}]',
  '{"ja": ["安全に移動介助できた", "適切なタイミングで声かけができた", "利用者のペースを尊重できた"], "vi": ["Hỗ trợ di chuyển an toàn", "Nói chuyện đúng lúc", "Tôn trọng tốc độ của người dùng"]}',
  'あなたは79歳の高橋さんです。元スポーツ選手で明るくリハビリに積極的。歩行器を使って移動しています。少し疲れてきたことを話してみてください。介護スタッフの声かけに元気よく答えてください。車いすへの移乗は少し不安そうにしてみてください。',
  5,
  true
),

-- 6. バイタル確認（N3・プロ）
(
  'vital-check-n3',
  '{"ja": "バイタルサインの測定と記録", "vi": "Đo và ghi chép dấu hiệu sinh tồn"}',
  '{"ja": "血圧・体温・脈拍の測定をして、異常がないか確認しましょう", "vi": "Đo huyết áp, nhiệt độ, mạch và kiểm tra bất thường"}',
  'vital_check',
  'N3',
  10,
  'pro',
  '{"role": "resident", "name": "中村さん", "age": 80, "personality": {"ja": "心配性。数値が気になる。", "vi": "Hay lo lắng. Quan tâm đến các chỉ số."}, "background": {"ja": "元医療事務員。医療用語を少し知っている。", "vi": "Nguyên nhân viên hành chính y tế. Biết chút ít thuật ngữ y tế."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "朝9時のバイタル測定の時間。中村さんは血圧が高めで経過観察中。今日の測定値を適切に伝える必要があります。", "vi": "9 giờ sáng đo dấu hiệu sinh tồn. Bà Nakamura đang được theo dõi huyết áp cao. Cần thông báo kết quả đo hôm nay phù hợp."}',
  '["バイタル測定の手順を説明できる", "測定値を適切に伝えられる", "異常時の対応を説明できる"]',
  '[{"phrase": "血圧を測らせていただきます", "meaning": {"ja": "測定の開始", "vi": "Bắt đầu đo huyết áp"}}, {"phrase": "腕をリラックスさせてください", "meaning": {"ja": "測定前の指示", "vi": "Hướng dẫn trước khi đo"}}, {"phrase": "本日の血圧は〇〇です", "meaning": {"ja": "測定値の報告", "vi": "Báo kết quả đo"}}, {"phrase": "いつもより少し高めですが、安静にしていれば大丈夫です", "meaning": {"ja": "異常値の説明", "vi": "Giải thích giá trị bất thường"}}]',
  '{"ja": ["バイタル測定の手順が説明できた", "測定値を正確に伝えられた", "利用者の不安を和らげられた"], "vi": ["Giải thích được quy trình đo", "Thông báo kết quả chính xác", "Xoa dịu lo lắng của người dùng"]}',
  'あなたは80歳の中村さんです。元医療事務員で心配性。血圧が高めで毎日気にしています。介護スタッフがバイタル測定に来ています。「今日の血圧はどうですか」「前より高いですか」など数値について質問してください。測定値を聞いて少し心配しますが、スタッフの説明で安心してください。',
  6,
  true
),

-- 7. 申し送り（N3・プロ）
(
  'handover-n3',
  '{"ja": "申し送りと情報共有", "vi": "Bàn giao và chia sẻ thông tin"}',
  '{"ja": "シフト交代時の申し送りを正確に行いましょう", "vi": "Bàn giao ca trực chính xác khi thay ca"}',
  'handover',
  'N3',
  12,
  'pro',
  '{"role": "senior_staff", "name": "吉田主任", "age": 45, "personality": {"ja": "ベテランで厳しいが公平。正確な情報を求める。", "vi": "Lâu năm kinh nghiệm, nghiêm khắc nhưng công bằng. Yêu cầu thông tin chính xác."}, "background": {"ja": "介護歴20年のベテランスタッフ。", "vi": "Nhân viên chăm sóc 20 năm kinh nghiệm."}}',
  '{"ja": "新人介護スタッフ", "vi": "Nhân viên chăm sóc mới"}',
  '{"ja": "午後3時のシフト交代。日勤から夜勤への申し送り。田中さんの体調変化と山田さんの食事量の変化を報告する必要があります。", "vi": "3 giờ chiều thay ca. Bàn giao từ ca ngày sang ca đêm. Cần báo cáo thay đổi sức khỏe của ông Tanaka và thay đổi lượng ăn của bà Yamada."}',
  '["申し送りの形式で報告できる", "重要な変化を正確に伝えられる", "質問に適切に答えられる"]',
  '[{"phrase": "田中様の本日の状況をご報告します", "meaning": {"ja": "申し送りの開始", "vi": "Bắt đầu bàn giao"}}, {"phrase": "午前中から食欲が低下していました", "meaning": {"ja": "症状の報告", "vi": "Báo cáo triệu chứng"}}, {"phrase": "体温は37.2度で、平熱より少し高めです", "meaning": {"ja": "数値の報告", "vi": "Báo cáo chỉ số"}}, {"phrase": "引き続き経過観察が必要です", "meaning": {"ja": "対応の申し送り", "vi": "Bàn giao tiếp tục theo dõi"}}]',
  '{"ja": ["申し送りの形式で報告できた", "重要事項を漏れなく伝えた", "質問に的確に答えられた"], "vi": ["Báo cáo đúng hình thức bàn giao", "Không sót thông tin quan trọng", "Trả lời câu hỏi chính xác"]}',
  'あなたは介護歴20年の吉田主任です。厳しいが公平なベテランスタッフ。新人スタッフからの申し送りを聞いています。「田中さんの体温はいつ測りましたか」「食事量は何割くらいでしたか」など具体的な質問をしてください。報告が不明確な場合は「もう少し詳しく教えてください」と追加質問してください。',
  7,
  true
),

-- 8. 家族対応（N3・プロ）
(
  'family-communication-n3',
  '{"ja": "ご家族への状況説明", "vi": "Giải thích tình hình cho gia đình"}',
  '{"ja": "面会に来たご家族に利用者さんの状況を丁寧に説明しましょう", "vi": "Giải thích tình hình của người cao tuổi cho gia đình đến thăm"}',
  'family_communication',
  'N3',
  12,
  'pro',
  '{"role": "family", "name": "田中様のご家族（息子さん）", "age": 55, "personality": {"ja": "心配性で少し感情的になりやすい。", "vi": "Hay lo lắng và dễ xúc động."}, "background": {"ja": "遠方に住んでいて月2回面会に来る。", "vi": "Sống xa, mỗi tháng đến thăm 2 lần."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "日曜日の面会時間。田中さんの息子さんが面会に来ました。最近食欲が落ちていることが気になっているようです。", "vi": "Giờ thăm chủ nhật. Con trai ông Tanaka đến thăm. Họ có vẻ lo lắng về việc cha gần đây ăn ít."}',
  '["家族への状況説明ができる", "不安を和らげる言葉かけができる", "具体的な対応策を説明できる"]',
  '[{"phrase": "いつもご来所ありがとうございます", "meaning": {"ja": "家族への感謝", "vi": "Cảm ơn gia đình đến thăm"}}, {"phrase": "最近の田中様のご様子をご説明します", "meaning": {"ja": "説明の始め方", "vi": "Bắt đầu giải thích"}}, {"phrase": "食欲については私たちも気にかけています", "meaning": {"ja": "共感の言葉", "vi": "Lời đồng cảm"}}, {"phrase": "栄養士と相談して対応しています", "meaning": {"ja": "対応策の説明", "vi": "Giải thích biện pháp xử lý"}}]',
  '{"ja": ["家族に状況を丁寧に説明できた", "不安を和らげることができた", "対応策を具体的に伝えられた"], "vi": ["Giải thích tình hình lịch sự cho gia đình", "Xoa dịu được lo lắng", "Truyền đạt biện pháp xử lý cụ thể"]}',
  'あなたは55歳の田中さんの息子さんです。遠方に住んでいて心配性。月2回面会に来ています。「父の食欲が落ちていると聞いたのですが」と心配そうに聞いてください。「何か病気ではないですか」と不安を表現してください。介護スタッフから具体的な対応策を聞いて、少し安心してください。最後に「よろしくお願いします」と感謝してください。',
  8,
  true
),

-- 9. 緊急対応（N3・プロ）
(
  'emergency-response-n3',
  '{"ja": "緊急時の対応と報告", "vi": "Xử lý và báo cáo tình huống khẩn cấp"}',
  '{"ja": "利用者さんが転倒した際の初期対応と上司への報告を練習しましょう", "vi": "Luyện tập xử lý ban đầu và báo cáo cấp trên khi người dùng bị ngã"}',
  'emergency',
  'N3',
  15,
  'pro',
  '{"role": "senior_staff", "name": "山本リーダー", "age": 38, "personality": {"ja": "冷静で迅速。正確な報告を求める。", "vi": "Bình tĩnh và nhanh nhẹn. Yêu cầu báo cáo chính xác."}, "background": {"ja": "介護リーダーとして5年のキャリア。緊急時対応が得意。", "vi": "5 năm kinh nghiệm làm trưởng nhóm chăm sóc. Giỏi xử lý tình huống khẩn cấp."}}',
  '{"ja": "介護スタッフ", "vi": "Nhân viên chăm sóc"}',
  '{"ja": "廊下で鈴木さんが転倒しているのを発見しました。意識はあり、右膝の痛みを訴えています。すぐに山本リーダーに報告します。", "vi": "Phát hiện ông Suzuki ngã ở hành lang. Tỉnh táo, kêu đau đầu gối phải. Cần báo cáo ngay cho trưởng nhóm Yamamoto."}',
  '["緊急時の報告ができる", "5W1Hで状況を説明できる", "適切な対応を提案できる"]',
  '[{"phrase": "鈴木様が転倒されました、すぐ来てください", "meaning": {"ja": "緊急の呼び出し", "vi": "Gọi khẩn cấp"}}, {"phrase": "現在、廊下の〇〇付近です", "meaning": {"ja": "場所の報告", "vi": "Báo cáo vị trí"}}, {"phrase": "意識はありますが、右膝を痛がっています", "meaning": {"ja": "状態の報告", "vi": "Báo cáo tình trạng"}}, {"phrase": "現在、安静にして状態を確認しています", "meaning": {"ja": "対応の報告", "vi": "Báo cáo xử lý hiện tại"}}]',
  '{"ja": ["緊急事態を素早く報告できた", "状況を正確に説明できた", "適切な初期対応が伝えられた"], "vi": ["Báo cáo khẩn cấp nhanh chóng", "Mô tả tình huống chính xác", "Truyền đạt xử lý ban đầu phù hợp"]}',
  'あなたは山本リーダーです。介護リーダーとして冷静で迅速に対応します。スタッフから緊急の報告を受けています。「いつ転倒を発見しましたか」「バイタルは確認しましたか」「他のスタッフはいますか」など具体的な質問をしてください。報告が不十分な場合は追加質問してください。最後に「よく報告してくれました、一緒に対応しましょう」と言ってください。',
  9,
  true
);
