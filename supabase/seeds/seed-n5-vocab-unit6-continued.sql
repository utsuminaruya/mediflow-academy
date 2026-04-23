-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Mediflow Academy N5 Vocabulary: Unit 6 Continued (Lessons 2-4)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Daily Actions Part 2, 3, 4 - Continued Action Verbs and Expressions
-- Total: 3 lessons

-- Unit 6, Lesson 2: Daily Actions Part 2 - Movement and Physical Actions
INSERT INTO lessons (id, course_id, type, unit, lesson_number, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  'vocabulary',
  6,
  2,
  jsonb_build_object(
    'intro', jsonb_build_object(
      'ja', '日常の動作と身体の動きを学びます。立つ、座る、寝る、歩く、走るなど、毎日使う基本動作の表現を習得します。介護現場でも頻繁に使う動作語彙です。',
      'vi', 'Học các động tác hàng ngày và chuyển động cơ thể. Đứng, ngồi, nằm, đi bộ, chạy... Nắm vững những biểu hiện động tác cơ bản sử dụng hàng ngày. Đây là từ vựng về động tác thường xuyên sử dụng ở nơi làm việc chăm sóc.'
    ),
    'words', jsonb_build_array(
      jsonb_build_object(
        'word', '立つ', 'reading', 'たつ', 'kanji', '立つ',
        'meaning', jsonb_build_object('ja', 'đứng lên', 'vi', 'đứng dậy'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'ご利用者様が立ちました。', 'vi', 'Khách hàng đứng lên rồi.'),
          jsonb_build_object('ja', '立ってください。', 'vi', 'Làm ơn đứng lên.')
        ),
        'care_example', '朝、ご利用者様が自分で立つのをサポートします。'
      ),
      jsonb_build_object(
        'word', '座る', 'reading', 'すわる', 'kanji', '座る',
        'meaning', jsonb_build_object('ja', 'ngồi', 'vi', 'ngồi xuống'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'ここに座ってください。', 'vi', 'Xin hãy ngồi ở đây.'),
          jsonb_build_object('ja', 'イスに座ります。', 'vi', 'Tôi ngồi vào ghế.')
        ),
        'care_example', '食事のときに座ってもらいます。'
      ),
      jsonb_build_object(
        'word', '寝る', 'reading', 'ねる', 'kanji', '寝る',
        'meaning', jsonb_build_object('ja', 'nằm ngủ', 'vi', 'nằm ngủ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '寝ましょう。', 'vi', 'Chúng ta nằm ngủ nhé.'),
          jsonb_build_object('ja', 'ベッドで寝ます。', 'vi', 'Tôi nằm trên giường.')
        ),
        'care_example', 'ご利用者様を寝かしつけます。'
      ),
      jsonb_build_object(
        'word', '起きる', 'reading', 'おきる', 'kanji', '起きる',
        'meaning', jsonb_build_object('ja', 'thức dậy', 'vi', 'thức dậy'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '朝、起きてください。', 'vi', 'Sáng nay, xin thức dậy.'),
          jsonb_build_object('ja', 'もう起きました。', 'vi', 'Tôi đã thức dậy rồi.')
        ),
        'care_example', '毎朝、ご利用者様を起こします。'
      ),
      jsonb_build_object(
        'word', '歩く', 'reading', 'あるく', 'kanji', '歩く',
        'meaning', jsonb_build_object('ja', 'đi bộ', 'vi', 'đi bộ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '散歩に歩きます。', 'vi', 'Tôi đi bộ tản bộ.'),
          jsonb_build_object('ja', 'ゆっくり歩いてください。', 'vi', 'Xin hãy đi từ từ.')
        ),
        'care_example', 'リハビリで毎日歩く練習をします。'
      ),
      jsonb_build_object(
        'word', '走る', 'reading', 'はしる', 'kanji', '走る',
        'meaning', jsonb_build_object('ja', 'chạy', 'vi', 'chạy'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '子どもが走っています。', 'vi', 'Đứa trẻ đang chạy.'),
          jsonb_build_object('ja', '走らないでください。', 'vi', 'Xin đừng chạy.')
        ),
        'care_example', '安全のため、走らないようにしてください。'
      ),
      jsonb_build_object(
        'word', '握る', 'reading', 'にぎる', 'kanji', '握る',
        'meaning', jsonb_build_object('ja', 'nắm', 'vi', 'nắm tay'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '手を握ってください。', 'vi', 'Xin hãy nắm tay.'),
          jsonb_build_object('ja', 'スプーンを握ります。', 'vi', 'Tôi cầm muỗng.')
        ),
        'care_example', 'ご利用者様の手を握ってサポートします。'
      ),
      jsonb_build_object(
        'word', '身体を動かす', 'reading', 'しんたいをうごかす', 'kanji', '身体を動かす',
        'meaning', jsonb_build_object('ja', 'cử động cơ thể', 'vi', 'cử động cơ thể'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '身体を動かしましょう。', 'vi', 'Hãy cử động cơ thể.'),
          jsonb_build_object('ja', 'リハビリで身体を動かします。', 'vi', 'Ở phòng vật liệu trị, chúng ta cử động cơ thể.')
        ),
        'care_example', '毎日リハビリで身体を動かします。'
      ),
      jsonb_build_object(
        'word', '伸ばす', 'reading', 'のばす', 'kanji', '伸ばす',
        'meaning', jsonb_build_object('ja', 'duỗi', 'vi', 'duỗi'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '足を伸ばしてください。', 'vi', 'Xin hãy duỗi chân.'),
          jsonb_build_object('ja', '腕を伸ばします。', 'vi', 'Tôi duỗi tay.')
        ),
        'care_example', 'リハビリで足や腕を伸ばす訓練をします。'
      ),
      jsonb_build_object(
        'word', '曲げる', 'reading', 'まげる', 'kanji', '曲げる',
        'meaning', jsonb_build_object('ja', 'gập', 'vi', 'gập'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '膝を曲げてください。', 'vi', 'Xin hãy gập đầu gối.'),
          jsonb_build_object('ja', '肘を曲げます。', 'vi', 'Tôi gập khuỷu tay.')
        ),
        'care_example', 'ご利用者様の足を曲げる運動をします。'
      ),
      jsonb_build_object(
        'word', '回す', 'reading', 'まわす', 'kanji', '回す',
        'meaning', jsonb_build_object('ja', 'quay', 'vi', 'quay'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '首を回してください。', 'vi', 'Xin hãy quay cổ.'),
          jsonb_build_object('ja', 'ドアのノブを回します。', 'vi', 'Tôi quay nút cửa.')
        ),
        'care_example', '首や肩を回して、ストレッチをします。'
      ),
      jsonb_build_object(
        'word', '持つ', 'reading', 'もつ', 'kanji', '持つ',
        'meaning', jsonb_build_object('ja', 'cầm', 'vi', 'cầm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'カップを持ってください。', 'vi', 'Xin hãy cầm cốc.'),
          jsonb_build_object('ja', 'この荷物を持ちます。', 'vi', 'Tôi cầm tinh bì này.')
        ),
        'care_example', 'ご利用者様が食器を持つのをサポートします。'
      ),
      jsonb_build_object(
        'word', '支える', 'reading', 'ささえる', 'kanji', '支える',
        'meaning', jsonb_build_object('ja', 'hỗ trợ', 'vi', 'hỗ trợ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'ご利用者様を支えます。', 'vi', 'Tôi hỗ trợ khách hàng.'),
          jsonb_build_object('ja', 'しっかり支えてください。', 'vi', 'Xin hãy hỗ trợ chắc chắn.')
        ),
        'care_example', '歩くときにご利用者様の身体を支えます。'
      ),
      jsonb_build_object(
        'word', '倒れる', 'reading', 'たおれる', 'kanji', '倒れる',
        'meaning', jsonb_build_object('ja', 'ngã', 'vi', 'ngã'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'ご利用者様が倒れました。', 'vi', 'Khách hàng ngã rồi.'),
          jsonb_build_object('ja', '倒れないようにしてください。', 'vi', 'Xin hãy tránh ngã.')
        ),
        'care_example', '転倒を防ぐためにサポートします。'
      ),
      jsonb_build_object(
        'word', '上がる', 'reading', 'あがる', 'kanji', '上がる',
        'meaning', jsonb_build_object('ja', 'lên', 'vi', 'lên'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '階段を上がってください。', 'vi', 'Xin hãy lên cầu thang.'),
          jsonb_build_object('ja', 'ベッドに上がります。', 'vi', 'Tôi lên giường.')
        ),
        'care_example', 'ご利用者様をベッドに上がるのをサポートします。'
      ),
      jsonb_build_object(
        'word', '下りる', 'reading', 'おりる', 'kanji', '下りる',
        'meaning', jsonb_build_object('ja', 'xuống', 'vi', 'xuống'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '階段を下りてください。', 'vi', 'Xin hãy xuống cầu thang.'),
          jsonb_build_object('ja', 'ベッドから下ります。', 'vi', 'Tôi xuống từ giường.')
        ),
        'care_example', 'ご利用者様がベッドから下りるのをサポートします。'
      )
    ),
    'dialogue', jsonb_build_array(
      jsonb_build_object(
        'role', '介護職', 'ja', 'おはよう。もう起きましたか？',
        'vi', 'Chào buổi sáng. Anh/chị đã thức dậy rồi chưa?'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'はい、起きました。',
        'vi', 'Vâng, tôi đã thức dậy rồi.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、ゆっくり起きてください。手を握ります。',
        'vi', 'Vậy thì xin từ từ mà thức dậy. Tôi sẽ nắm tay anh/chị.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'ありがとう。',
        'vi', 'Cảm ơn.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、椅子に座ってください。',
        'vi', 'Vậy thì xin ngồi vào ghế.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'はい。身体が重いです。',
        'vi', 'Vâng. Cơ thể tôi nặng lắm.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'わかりました。しっかり支えます。',
        'vi', 'Hiểu rồi. Tôi sẽ hỗ trợ chắc chắn.'
      )
    ),
    'key_phrases', jsonb_build_array(
      jsonb_build_object('ja', 'ゆっくり立ってください', 'vi', 'Xin từ từ mà đứng lên'),
      jsonb_build_object('ja', 'ゆっくり座ってください', 'vi', 'Xin từ từ mà ngồi xuống'),
      jsonb_build_object('ja', 'ゆっくり歩きましょう', 'vi', 'Chúng ta từ từ mà đi bộ'),
      jsonb_build_object('ja', '手を握ります', 'vi', 'Tôi sẽ nắm tay')
    ),
    'cultural_note', jsonb_build_object(
      'ja', '介護の現場では、ご利用者様の身体を支えることが重要です。安全と信頼が大切です。',
      'vi', 'Trong nơi làm việc chăm sóc, việc hỗ trợ cơ thể khách hàng rất quan trọng. An toàn và tin tưởng là điều tối quan trọng.'
    ),
    'quiz', jsonb_build_array(
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '朝、ご利用者様に何と声かけしますか？',
          'vi', 'Sáng nay, bạn nói gì với khách hàng?'
        ),
        'options', jsonb_build_array(
          '「おはよう。起きてください。」',
          '「こんにちは。食べましょう。」',
          '「おやすみなさい。寝てください。」',
          '「さようなら。帰ります。」'
        ),
        'correct_answer', 0,
        'explanation', jsonb_build_object(
          'ja', '朝の挨拶は「おはよう」が適切です。',
          'vi', 'Lời chào buổi sáng thích hợp là "Ohayou".'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '食事のとき、ご利用者様はどこに座りますか？',
          'vi', 'Bạn ngồi ở đâu khi ăn cơm?'
        ),
        'options', jsonb_build_array(
          'ベッドに座ります',
          'トイレに座ります',
          '椅子に座ります',
          '床に座ります'
        ),
        'correct_answer', 2,
        'explanation', jsonb_build_object(
          'ja', '食事のときは、椅子に座るのが一般的です。',
          'vi', 'Khi ăn cơm, người ta thường ngồi trên ghế.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'リハビリで何をしますか？',
          'vi', 'Ở phòng vật liệu trị, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          '寝てします',
          '身体を動かします',
          '食べます',
          '話します'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'リハビリでは、身体を動かす訓練をします。',
          'vi', 'Ở phòng vật liệu trị, chúng ta luyện tập cử động cơ thể.'
        ),
        'difficulty', 'medium'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '「階段を上ってください」は何を意味しますか？',
          'vi', '「Xin lên cầu thang」có nghĩa là gì?'
        ),
        'options', jsonb_build_array(
          '座ってください',
          '走ってください',
          '歩いて上ってください',
          '寝てください'
        ),
        'correct_answer', 2,
        'explanation', jsonb_build_object(
          'ja', 'これは「歩いて階段を上ってください」という意味です。',
          'vi', 'Nó có nghĩa là "Xin đi bộ lên cầu thang".'
        ),
        'difficulty', 'hard'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '転倒を防ぐために何をしますか？',
          'vi', 'Để tránh ngã, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          'ご利用者様を走らせる',
          'ご利用者様の身体を支える',
          'ご利用者様を一人で歩かせる',
          'ご利用者様に靴を脱ぐよう言う'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'ご利用者様の身体を支えることで、転倒を防ぎます。',
          'vi', 'Bằng cách hỗ trợ cơ thể khách hàng, chúng ta tránh ngã.'
        ),
        'difficulty', 'hard'
      )
    )
  )
);

-- Unit 6, Lesson 3: Daily Actions Part 3 - Routine and Self-care Actions
INSERT INTO lessons (id, course_id, type, unit, lesson_number, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  'vocabulary',
  6,
  3,
  jsonb_build_object(
    'intro', jsonb_build_object(
      'ja', '朝、夜の生活習慣に関する言葉を学びます。洗う、磨く、着替える、化粧するなど、毎日のルーティンに使う表現を習得します。',
      'vi', 'Học từ liên quan đến thói quen sinh hoạt buổi sáng và tối. Từ rửa, đánh răng, thay đồ, trang điểm... Nắm vững những biểu hiện sử dụng trong lịch trình hàng ngày.'
    ),
    'words', jsonb_build_array(
      jsonb_build_object(
        'word', '洗う', 'reading', 'あらう', 'kanji', '洗う',
        'meaning', jsonb_build_object('ja', 'rửa', 'vi', 'rửa'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '手を洗ってください。', 'vi', 'Xin hãy rửa tay.'),
          jsonb_build_object('ja', '顔を洗います。', 'vi', 'Tôi rửa mặt.')
        ),
        'care_example', 'ご利用者様が手を洗うのをサポートします。'
      ),
      jsonb_build_object(
        'word', '磨く', 'reading', 'みがく', 'kanji', '磨く',
        'meaning', jsonb_build_object('ja', 'đánh (răng)', 'vi', 'đánh (răng)'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '歯を磨いてください。', 'vi', 'Xin hãy đánh răng.'),
          jsonb_build_object('ja', '毎晩、歯を磨きます。', 'vi', 'Mỗi tối, tôi đánh răng.')
        ),
        'care_example', 'ご利用者様が歯を磨くのをサポートします。'
      ),
      jsonb_build_object(
        'word', '拭く', 'reading', 'ふく', 'kanji', '拭く',
        'meaning', jsonb_build_object('ja', 'lau', 'vi', 'lau'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'タオルで拭きます。', 'vi', 'Tôi lau bằng khăn.'),
          jsonb_build_object('ja', '口を拭いてください。', 'vi', 'Xin hãy lau miệng.')
        ),
        'care_example', 'お風呂のあとで、ご利用者様の身体を拭きます。'
      ),
      jsonb_build_object(
        'word', '着る', 'reading', 'きる', 'kanji', '着る',
        'meaning', jsonb_build_object('ja', 'mặc', 'vi', 'mặc'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'シャツを着てください。', 'vi', 'Xin hãy mặc áo.'),
          jsonb_build_object('ja', '服を着ます。', 'vi', 'Tôi mặc quần áo.')
        ),
        'care_example', 'ご利用者様に朝、新しい服を着せます。'
      ),
      jsonb_build_object(
        'word', '脱ぐ', 'reading', 'ぬぐ', 'kanji', '脱ぐ',
        'meaning', jsonb_build_object('ja', 'cởi', 'vi', 'cởi'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'シャツを脱いでください。', 'vi', 'Xin hãy cởi áo.'),
          jsonb_build_object('ja', '靴を脱ぎます。', 'vi', 'Tôi cởi giày.')
        ),
        'care_example', 'お風呂の前に、ご利用者様の服を脱がせます。'
      ),
      jsonb_build_object(
        'word', 'くし', 'reading', 'くし', 'kanji', 'くし',
        'meaning', jsonb_build_object('ja', 'lược', 'vi', 'lược'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'くしで髪をとかします。', 'vi', 'Tôi chải tóc bằng lược.'),
          jsonb_build_object('ja', 'くしを使ってください。', 'vi', 'Xin hãy dùng lược.')
        ),
        'care_example', 'ご利用者様の髪をくしでときます。'
      ),
      jsonb_build_object(
        'word', '髪', 'reading', 'かみ', 'kanji', '髪',
        'meaning', jsonb_build_object('ja', 'tóc', 'vi', 'tóc'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '髪を洗います。', 'vi', 'Tôi gội tóc.'),
          jsonb_build_object('ja', 'きれいな髪ですね。', 'vi', 'Tóc bạn đẹp lắm.')
        ),
        'care_example', 'ご利用者様の髪を洗うのをサポートします。'
      ),
      jsonb_build_object(
        'word', '化粧', 'reading', 'けしょう', 'kanji', '化粧',
        'meaning', jsonb_build_object('ja', 'trang điểm', 'vi', 'trang điểm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '化粧をします。', 'vi', 'Tôi trang điểm.'),
          jsonb_build_object('ja', 'きれいに化粧してください。', 'vi', 'Xin trang điểm đẹp đẽ.')
        ),
        'care_example', 'おばあさんが好きな化粧をします。'
      ),
      jsonb_build_object(
        'word', 'シャンプー', 'reading', 'しゃんぷー', 'kanji', 'シャンプー',
        'meaning', jsonb_build_object('ja', 'dầu gội', 'vi', 'dầu gội'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'シャンプーを使います。', 'vi', 'Tôi dùng dầu gội.'),
          jsonb_build_object('ja', 'いいシャンプーですね。', 'vi', 'Dầu gội này tốt lắm.')
        ),
        'care_example', 'ご利用者様にシャンプーで髪を洗います。'
      ),
      jsonb_build_object(
        'word', '石鹸', 'reading', 'せっけん', 'kanji', '石鹸',
        'meaning', jsonb_build_object('ja', 'xà phòng', 'vi', 'xà phòng'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '石鹸で洗います。', 'vi', 'Tôi rửa bằng xà phòng.'),
          jsonb_build_object('ja', 'いい石鹸ですね。', 'vi', 'Xà phòng này tốt lắm.')
        ),
        'care_example', 'ご利用者様が石鹸で手を洗うのをサポートします。'
      ),
      jsonb_build_object(
        'word', 'タオル', 'reading', 'たおる', 'kanji', 'タオル',
        'meaning', jsonb_build_object('ja', 'khăn', 'vi', 'khăn'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'タオルで拭いてください。', 'vi', 'Xin hãy lau bằng khăn.'),
          jsonb_build_object('ja', 'きれいなタオルです。', 'vi', 'Cái khăn này sạch lắm.')
        ),
        'care_example', 'お風呂のあと、タオルでご利用者様を拭きます。'
      ),
      jsonb_build_object(
        'word', 'トイレ', 'reading', 'といれ', 'kanji', 'トイレ',
        'meaning', jsonb_build_object('ja', 'nhà vệ sinh', 'vi', 'nhà vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレに行きます。', 'vi', 'Tôi đi nhà vệ sinh.'),
          jsonb_build_object('ja', 'トイレはどこですか？', 'vi', 'Nhà vệ sinh ở đâu?')
        ),
        'care_example', 'ご利用者様がトイレに行くのをサポートします。'
      ),
      jsonb_build_object(
        'word', 'トイレットペーパー', 'reading', 'といれっとぺーぱー', 'kanji', 'トイレットペーパー',
        'meaning', jsonb_build_object('ja', 'giấy vệ sinh', 'vi', 'giấy vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレットペーパーを使います。', 'vi', 'Tôi dùng giấy vệ sinh.'),
          jsonb_build_object('ja', 'トイレットペーパーをください。', 'vi', 'Xin cho tôi giấy vệ sinh.')
        ),
        'care_example', 'トイレットペーパーがなくなったら、新しいのを付けます。'
      ),
      jsonb_build_object(
        'word', '鏡', 'reading', 'かがみ', 'kanji', '鏡',
        'meaning', jsonb_build_object('ja', 'gương', 'vi', 'gương'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'では、鏡を見てください。', 'vi', 'Vậy thì xin nhìn vào gương.'),
          jsonb_build_object('ja', '大きな鏡です。', 'vi', 'Cái gương này lớn lắm.')
        ),
        'care_example', 'ご利用者様が鏡を見て化粧するのをサポートします。'
      ),
      jsonb_build_object(
        'word', '着替える', 'reading', 'きがえる', 'kanji', '着替える',
        'meaning', jsonb_build_object('ja', 'thay đồ', 'vi', 'thay đồ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'では、着替えましょう。', 'vi', 'Vậy thì chúng ta thay đồ.'),
          jsonb_build_object('ja', 'きれいに着替えました。', 'vi', 'Tôi thay đồ sạch đẽ rồi.')
        ),
        'care_example', 'ご利用者様に朝、新しい服に着替えさせます。'
      ),
      jsonb_build_object(
        'word', 'パジャマ', 'reading', 'ぱじゃま', 'kanji', 'パジャマ',
        'meaning', jsonb_build_object('ja', 'bộ đồ ngủ', 'vi', 'bộ đồ ngủ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'パジャマに着替えてください。', 'vi', 'Xin mặc bộ đồ ngủ.'),
          jsonb_build_object('ja', 'いいパジャマですね。', 'vi', 'Bộ đồ ngủ này đẹp lắm.')
        ),
        'care_example', 'ご利用者様にパジャマに着替えさせて、寝かしつけます。'
      )
    ),
    'dialogue', jsonb_build_array(
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、お風呂から上がったので、タオルで拭きます。',
        'vi', 'Vậy thì anh/chị đã ra khỏi bồn tắm, tôi sẽ lau bằng khăn.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'はい、ありがとう。',
        'vi', 'Vâng, cảm ơn.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', '次に、新しい服に着替えましょう。どの服がいいですか？',
        'vi', 'Tiếp theo, chúng ta thay vào bộ quần áo mới. Anh/chị muốn mặc bộ nào?'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'この青いシャツがいいです。',
        'vi', 'Chiếc áo xanh này tốt.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'わかりました。では、青いシャツに着替えてください。',
        'vi', 'Hiểu rồi. Vậy thì xin mặc chiếc áo xanh.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'では、髪をとかします。',
        'vi', 'Vậy thì tôi sẽ chải tóc.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'いいですね。くしで髪をとかしてください。',
        'vi', 'Tốt. Xin chải tóc bằng lược.'
      )
    ),
    'key_phrases', jsonb_build_array(
      jsonb_build_object('ja', 'お風呂から上がりました', 'vi', 'Đã ra khỏi bồn tắm'),
      jsonb_build_object('ja', '新しい服に着替えます', 'vi', 'Thay vào bộ quần áo mới'),
      jsonb_build_object('ja', '髪をとかします', 'vi', 'Chải tóc'),
      jsonb_build_object('ja', 'きれいになりました', 'vi', 'Trở nên sạch đẽ')
    ),
    'cultural_note', jsonb_build_object(
      'ja', '日本では、朝と夜に身体を清潔に保つことが重要な習慣です。介護でも、ご利用者様の清潔を大切にします。',
      'vi', 'Ở Nhật Bản, việc giữ cơ thể sạch sẽ vào buổi sáng và tối là thói quen quan trọng. Ở nơi làm việc chăm sóc, chúng ta cũng coi trọng sạch sẽ của khách hàng.'
    ),
    'quiz', jsonb_build_array(
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'お風呂の後、何をしますか？',
          'vi', 'Sau khi tắm, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          'タオルで拭きます',
          'もう一度お風呂に入ります',
          '靴を着ます',
          '外に出ます'
        ),
        'correct_answer', 0,
        'explanation', jsonb_build_object(
          'ja', 'お風呂の後は、タオルで身体を拭きます。',
          'vi', 'Sau khi tắm, bạn dùng khăn để lau cơ thể.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '朝、する一番最初のことは？',
          'vi', 'Sáng nay, việc đầu tiên bạn làm là gì?'
        ),
        'options', jsonb_build_array(
          '食べます',
          '着替えます',
          '寝ます',
          '走ります'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', '朝、一番最初に着替えるのが一般的です。',
          'vi', 'Sáng nay, việc đầu tiên thường là thay đồ.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '歯を磨く前に何をしますか？',
          'vi', 'Trước khi đánh răng, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          'ご飯を食べます',
          '手を洗います',
          '寝ます',
          '外に出ます'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', '歯を磨く前に、手を洗うのが一般的です。',
          'vi', 'Trước khi đánh răng, bạn thường rửa tay.'
        ),
        'difficulty', 'medium'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'ご利用者様の髪をとく道具は何ですか？',
          'vi', 'Dụng cụ để chải tóc là gì?'
        ),
        'options', jsonb_build_array(
          'タオル',
          'くし',
          'シャンプー',
          '石鹸'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'くしで髪をときます。',
          'vi', 'Dùng lược để chải tóc.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', '夜、パジャマに着替えるのはいつですか？',
          'vi', 'Khi nào bạn mặc bộ đồ ngủ?'
        ),
        'options', jsonb_build_array(
          '朝です',
          '昼です',
          '夜です',
          'いつでもいいです'
        ),
        'correct_answer', 2,
        'explanation', jsonb_build_object(
          'ja', '夜に、パジャマに着替えて、寝ます。',
          'vi', 'Vào buổi tối, bạn mặc bộ đồ ngủ và nằm ngủ.'
        ),
        'difficulty', 'easy'
      )
    )
  )
);

-- Unit 6, Lesson 4: Daily Actions Part 4 - Bathroom and Hygiene-related Actions
INSERT INTO lessons (id, course_id, type, unit, lesson_number, content) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM courses WHERE title->>'ja' = 'JLPT N5 基本語彙' LIMIT 1),
  'vocabulary',
  6,
  4,
  jsonb_build_object(
    'intro', jsonb_build_object(
      'ja', 'トイレや浴室での生活動作を学びます。トイレ、お風呂、洗面所での基本的な動作と関連する言葉を習得します。介護現場で毎日使う重要な動作語彙です。',
      'vi', 'Học các động tác sinh hoạt ở nhà vệ sinh và phòng tắm. Nắm vững các động tác cơ bản và từ liên quan ở nhà vệ sinh, phòng tắm, khu rửa mặt. Đây là từ vựng về động tác quan trọng sử dụng hàng ngày ở nơi làm việc chăm sóc.'
    ),
    'words', jsonb_build_array(
      jsonb_build_object(
        'word', 'トイレ', 'reading', 'といれ', 'kanji', 'トイレ',
        'meaning', jsonb_build_object('ja', 'nhà vệ sinh', 'vi', 'nhà vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレに行きます。', 'vi', 'Tôi đi nhà vệ sinh.'),
          jsonb_build_object('ja', 'トイレはどこですか？', 'vi', 'Nhà vệ sinh ở đâu?')
        ),
        'care_example', 'ご利用者様がトイレに行きたいと言ったら、サポートします。'
      ),
      jsonb_build_object(
        'word', 'お便所', 'reading', 'おべんじょ', 'kanji', 'お便所',
        'meaning', jsonb_build_object('ja', 'nhà vệ sinh (lịch sự)', 'vi', 'nhà vệ sinh (trang trọng)'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'お便所に参ります。', 'vi', 'Tôi xin phép đi vào nhà vệ sinh.'),
          jsonb_build_object('ja', 'お便所を貸してください。', 'vi', 'Xin cho tôi dùng nhà vệ sinh.')
        ),
        'care_example', '高齢のご利用者様には、お便所と言うことが多いです。'
      ),
      jsonb_build_object(
        'word', 'トイレットペーパー', 'reading', 'といれっとぺーぱー', 'kanji', 'トイレットペーパー',
        'meaning', jsonb_build_object('ja', 'giấy vệ sinh', 'vi', 'giấy vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレットペーパーを使います。', 'vi', 'Tôi dùng giấy vệ sinh.'),
          jsonb_build_object('ja', 'トイレットペーパーがなくなりました。', 'vi', 'Giấy vệ sinh hết rồi.')
        ),
        'care_example', 'トイレットペーパーがなくなったら、新しいのを付けます。'
      ),
      jsonb_build_object(
        'word', 'お風呂', 'reading', 'おふろ', 'kanji', 'お風呂',
        'meaning', jsonb_build_object('ja', 'bồn tắm', 'vi', 'bồn tắm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'お風呂に入ります。', 'vi', 'Tôi vào bồn tắm.'),
          jsonb_build_object('ja', 'お風呂のお湯が熱いです。', 'vi', 'Nước ở bồn tắm nóng lắm.')
        ),
        'care_example', 'ご利用者様がお風呂に入るのをサポートします。'
      ),
      jsonb_build_object(
        'word', 'お湯', 'reading', 'おゆ', 'kanji', 'お湯',
        'meaning', jsonb_build_object('ja', 'nước nóng', 'vi', 'nước nóng'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'お湯が熱すぎます。', 'vi', 'Nước nóng quá.'),
          jsonb_build_object('ja', 'お湯の温度を確認します。', 'vi', 'Tôi kiểm tra nhiệt độ nước.')
        ),
        'care_example', 'ご利用者様が火傷しないように、お湯の温度を確認します。'
      ),
      jsonb_build_object(
        'word', '温度', 'reading', 'おんど', 'kanji', '温度',
        'meaning', jsonb_build_object('ja', 'nhiệt độ', 'vi', 'nhiệt độ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '温度は何度ですか？', 'vi', 'Nhiệt độ bao nhiêu độ?'),
          jsonb_build_object('ja', 'いい温度です。', 'vi', 'Nhiệt độ tốt.')
        ),
        'care_example', 'お風呂の温度を38度くらいに設定します。'
      ),
      jsonb_build_object(
        'word', 'シャワー', 'reading', 'しゃわー', 'kanji', 'シャワー',
        'meaning', jsonb_build_object('ja', 'vòi tắm', 'vi', 'vòi tắm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'シャワーを浴びます。', 'vi', 'Tôi tắm bằng vòi tắm.'),
          jsonb_build_object('ja', 'シャワーが出ません。', 'vi', 'Nước tắm không chảy.')
        ),
        'care_example', 'ご利用者様にシャワーで身体を洗うのをサポートします。'
      ),
      jsonb_build_object(
        'word', '浴槽', 'reading', 'よくそう', 'kanji', '浴槽',
        'meaning', jsonb_build_object('ja', 'bồn tắm', 'vi', 'bồn tắm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '浴槽にお湯を入れます。', 'vi', 'Tôi đổ nước nóng vào bồn tắm.'),
          jsonb_build_object('ja', '浴槽はきれいです。', 'vi', 'Bồn tắm sạch.')
        ),
        'care_example', 'ご利用者様を浴槽に安全に入れるようにします。'
      ),
      jsonb_build_object(
        'word', 'シャンプー', 'reading', 'しゃんぷー', 'kanji', 'シャンプー',
        'meaning', jsonb_build_object('ja', 'dầu gội', 'vi', 'dầu gội'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'シャンプーを使って髪を洗います。', 'vi', 'Tôi dùng dầu gội để gội tóc.'),
          jsonb_build_object('ja', 'いい香りのシャンプーです。', 'vi', 'Dầu gội này có mùi thơm.')
        ),
        'care_example', 'ご利用者様の髪をシャンプーで洗います。'
      ),
      jsonb_build_object(
        'word', 'ボディソープ', 'reading', 'ぼでぃーそーぷ', 'kanji', 'ボディソープ',
        'meaning', jsonb_build_object('ja', 'xà phòng tắm', 'vi', 'xà phòng tắm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'ボディソープで身体を洗います。', 'vi', 'Tôi rửa cơ thể bằng xà phòng tắm.'),
          jsonb_build_object('ja', 'いい香りのボディソープですね。', 'vi', 'Xà phòng tắm này có mùi thơm.')
        ),
        'care_example', 'ご利用者様の身体をボディソープで洗います。'
      ),
      jsonb_build_object(
        'word', 'タオル', 'reading', 'たおる', 'kanji', 'タオル',
        'meaning', jsonb_build_object('ja', 'khăn tắm', 'vi', 'khăn tắm'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'タオルで拭きます。', 'vi', 'Tôi lau bằng khăn.'),
          jsonb_build_object('ja', 'きれいなタオルです。', 'vi', 'Khăn này sạch.')
        ),
        'care_example', 'お風呂のあと、きれいなタオルでご利用者様を拭きます。'
      ),
      jsonb_build_object(
        'word', 'トイレットブラシ', 'reading', 'といれっとぶらし', 'kanji', 'トイレットブラシ',
        'meaning', jsonb_build_object('ja', 'cọ vệ sinh', 'vi', 'cọ vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレットブラシで掃除します。', 'vi', 'Tôi lau bồn cầu bằng cọ vệ sinh.'),
          jsonb_build_object('ja', 'トイレットブラシはどこですか？', 'vi', 'Cọ vệ sinh ở đâu?')
        ),
        'care_example', 'トイレットブラシを使ってトイレをきれいに掃除します。'
      ),
      jsonb_build_object(
        'word', '掃除', 'reading', 'そうじ', 'kanji', '掃除',
        'meaning', jsonb_build_object('ja', 'vệ sinh', 'vi', 'vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレの掃除をします。', 'vi', 'Tôi vệ sinh nhà vệ sinh.'),
          jsonb_build_object('ja', '毎日、掃除します。', 'vi', 'Mỗi ngày, tôi vệ sinh.')
        ),
        'care_example', 'ご利用者様が使った後、すぐに掃除します。'
      ),
      jsonb_build_object(
        'word', '洗面台', 'reading', 'せんめんだい', 'kanji', '洗面台',
        'meaning', jsonb_build_object('ja', 'chậu rửa mặt', 'vi', 'chậu rửa mặt'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '洗面台で顔を洗います。', 'vi', 'Tôi rửa mặt ở chậu rửa.'),
          jsonb_build_object('ja', '洗面台の水が出ません。', 'vi', 'Nước ở chậu rửa không chảy.')
        ),
        'care_example', 'ご利用者様が洗面台で顔を洗うのをサポートします。'
      ),
      jsonb_build_object(
        'word', '排泄', 'reading', 'はいせつ', 'kanji', '排泄',
        'meaning', jsonb_build_object('ja', 'đi vệ sinh', 'vi', 'đi vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '排泄をサポートします。', 'vi', 'Tôi hỗ trợ đi vệ sinh.'),
          jsonb_build_object('ja', 'トイレの排泄を介助します。', 'vi', 'Tôi hỗ trợ sinh lý ở nhà vệ sinh.')
        ),
        'care_example', 'ご利用者様の排泄介助は、介護職の大切な仕事です。'
      ),
      jsonb_build_object(
        'word', '清潔', 'reading', 'せいけつ', 'kanji', '清潔',
        'meaning', jsonb_build_object('ja', 'sạch sẽ', 'vi', 'sạch sẽ'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', '清潔にします。', 'vi', 'Tôi làm sạch sẽ.'),
          jsonb_build_object('ja', 'トイレを清潔に保ちます。', 'vi', 'Tôi giữ nhà vệ sinh sạch sẽ.')
        ),
        'care_example', 'ご利用者様と施設の清潔を保つことは、とても重要です。'
      ),
      jsonb_build_object(
        'word', 'トイレットスリッパ', 'reading', 'といれっとすりっぱ', 'kanji', 'トイレットスリッパ',
        'meaning', jsonb_build_object('ja', 'dép nhà vệ sinh', 'vi', 'dép nhà vệ sinh'),
        'examples', jsonb_build_array(
          jsonb_build_object('ja', 'トイレットスリッパを履きます。', 'vi', 'Tôi mang dép nhà vệ sinh.'),
          jsonb_build_object('ja', 'トイレットスリッパはどこですか？', 'vi', 'Dép nhà vệ sinh ở đâu?')
        ),
        'care_example', 'ご利用者様に、トイレットスリッパを履いてもらいます。'
      )
    ),
    'dialogue', jsonb_build_array(
      jsonb_build_object(
        'role', '介護職', 'ja', 'ご利用者様、トイレに行きたいですか？',
        'vi', 'Anh/chị muốn đi nhà vệ sinh không?'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'はい、お便所に行きたいです。',
        'vi', 'Vâng, tôi muốn đi vệ sinh.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、トイレットスリッパを履いて、行きましょう。',
        'vi', 'Vậy thì mang dép vệ sinh lên và chúng ta đi.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', 'はい。',
        'vi', 'Vâng.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、終わったら、手を洗ってください。',
        'vi', 'Sau khi xong, xin hãy rửa tay.'
      ),
      jsonb_build_object(
        'role', 'ご利用者様', 'ja', '了解です。',
        'vi', 'Hiểu rồi.'
      ),
      jsonb_build_object(
        'role', '介護職', 'ja', 'では、洗面台で手を洗いましょう。',
        'vi', 'Vậy thì rửa tay ở chậu rửa mặt.'
      )
    ),
    'key_phrases', jsonb_build_array(
      jsonb_build_object('ja', 'トイレに行きたいです', 'vi', 'Tôi muốn đi vệ sinh'),
      jsonb_build_object('ja', 'お風呂に入ります', 'vi', 'Tôi vào bồn tắm'),
      jsonb_build_object('ja', '清潔に保ちます', 'vi', 'Giữ sạch sẽ'),
      jsonb_build_object('ja', '温度を確認します', 'vi', 'Kiểm tra nhiệt độ')
    ),
    'cultural_note', jsonb_build_object(
      'ja', '日本では、トイレと浴室の清潔が特に大切です。介護現場では、ご利用者様の快適さと安全が最優先です。',
      'vi', 'Ở Nhật Bản, sạch sẽ của nhà vệ sinh và phòng tắm đặc biệt quan trọng. Ở nơi làm việc chăm sóc, sự thoải mái và an toàn của khách hàng là ưu tiên hàng đầu.'
    ),
    'quiz', jsonb_build_array(
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'ご利用者様がトイレに行きたいと言ったら、何をしますか？',
          'vi', 'Nếu khách hàng muốn đi vệ sinh, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          'サポートします',
          'ご飯を作ります',
          '寝かしつけます',
          '何もしません'
        ),
        'correct_answer', 0,
        'explanation', jsonb_build_object(
          'ja', 'ご利用者様がトイレに行きたいと言ったら、すぐにサポートします。',
          'vi', 'Nếu khách hàng muốn đi vệ sinh, bạn phải hỗ trợ ngay.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'お風呂のお湯の温度は何度くらいがいいですか？',
          'vi', 'Nhiệt độ nước ở bồn tắm nên bao nhiêu độ?'
        ),
        'options', jsonb_build_array(
          '25度くらい',
          '38度くらい',
          '50度くらい',
          '60度くらい'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'お風呂のお湯の温度は、38度くらいが適切です。',
          'vi', 'Nhiệt độ nước ở bồn tắm nên khoảng 38 độ.'
        ),
        'difficulty', 'medium'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'トイレの後、何をしますか？',
          'vi', 'Sau khi đi vệ sinh, bạn làm gì?'
        ),
        'options', jsonb_build_array(
          'ご飯を食べます',
          'すぐに寝ます',
          '手を洗います',
          '外に出ます'
        ),
        'correct_answer', 2,
        'explanation', jsonb_build_object(
          'ja', 'トイレの後に、手を洗うことが大切です。',
          'vi', 'Sau khi đi vệ sinh, việc rửa tay là quan trọng.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'お風呂で何を使って身体を洗いますか？',
          'vi', 'Bạn dùng cái gì để rửa cơ thể ở bồn tắm?'
        ),
        'options', jsonb_build_array(
          'トイレットペーパー',
          'ボディソープ',
          'タオル',
          'くし'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'お風呂で、ボディソープを使って身体を洗います。',
          'vi', 'Ở bồn tắm, bạn dùng xà phòng tắm để rửa cơ thể.'
        ),
        'difficulty', 'easy'
      ),
      jsonb_build_object(
        'question', jsonb_build_object(
          'ja', 'ご利用者様のお風呂の介助で、一番大切なことは何ですか？',
          'vi', 'Điều quan trọng nhất khi hỗ trợ khách hàng tắm là gì?'
        ),
        'options', jsonb_build_array(
          'すぐに終わらせること',
          '安全と快適さを保つこと',
          '冷たいお湯を使うこと',
          'ご利用者様だけで入らせること'
        ),
        'correct_answer', 1,
        'explanation', jsonb_build_object(
          'ja', 'ご利用者様のお風呂の介助では、安全と快適さが最優先です。',
          'vi', 'Khi hỗ trợ khách hàng tắm, an toàn và sự thoải mái là ưu tiên hàng đầu.'
        ),
        'difficulty', 'hard'
      )
    )
  )
);
