'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronLeft, Lock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonView } from '@/components/learning/lesson-view';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface LessonPageProps {
  params: Promise<{ locale: string; id: string }>;
}

type LessonData = {
  courseTitle: { ja: string; vi: string };
  lesson: {
    title: string;
    titleTranslation?: string;
    introduction: string;
    keyPoints: string[];
    vocabulary?: { word: string; reading: string; meaning: string; example?: string }[];
    dialogue?: { speaker: string; japanese: string; reading?: string; translation: string }[];
    examples: { japanese: string; reading?: string; translation: string }[];
    grammarNote?: string;
    quiz?: {
      question: string;
      options: { id: string; text: string }[];
      correctId: string;
      explanation?: string;
    };
    quizzes?: {
      question: string;
      options: { id: string; text: string }[];
      correctId: string;
      explanation?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
    }[];
    xpReward: number;
  };
  isLocked: boolean;
  requiredPlan: string;
};

const mockLessons: Record<string, LessonData> = {
  // ===== N5 ひらがな・カタカナ =====
  'n5-01': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第1回 〜あ行・か行〜',
      titleTranslation: 'Hiragana Bài 1 - Hàng あ và hàng か',
      introduction: `日本語の文字学習の第一歩です。ひらがなは日本語の基本文字で、全部で46字あります。まず「あ行（あいうえお）」と「か行（かきくけこ）」を覚えましょう。

Đây là bước đầu tiên học chữ tiếng Nhật. Hiragana là bộ chữ cơ bản của tiếng Nhật, gồm tất cả 46 ký tự. Hãy bắt đầu với hàng "あ" (a i u e o) và hàng "か" (ka ki ku ke ko).`,
      keyPoints: [
        'あ行：あ（a）・い（i）・う（u）・え（e）・お（o）— 母音5字',
        'か行：か（ka）・き（ki）・く（ku）・け（ke）・こ（ko）— 子音k + 母音',
        '書き順：あは3画、い・う・えは2画、おは3画',
        '発音のコツ：「う」は唇を丸めず、口を少し開けて発音',
        'カタカナとの対応：ア（a）・イ（i）・ウ（u）・エ（e）・オ（o）',
      ],
      vocabulary: [
        { word: 'あお', reading: 'あお', meaning: '青（xanh）', example: 'あおい空（そら）' },
        { word: 'いえ', reading: 'いえ', meaning: '家（nhà）', example: 'わたしのいえ' },
        { word: 'うえ', reading: 'うえ', meaning: '上（phía trên）', example: 'つくえのうえ' },
        { word: 'かお', reading: 'かお', meaning: '顔（khuôn mặt）', example: 'かおをあらう' },
        { word: 'きく', reading: 'きく', meaning: '聞く（nghe）', example: 'おんがくをきく' },
        { word: 'くに', reading: 'くに', meaning: '国（đất nước）', example: 'わたしのくに' },
      ],
      examples: [
        {
          japanese: 'あおい（青い）',
          reading: 'あおい',
          translation: 'màu xanh / 青い (xanh lam)',
        },
        {
          japanese: 'いいえ',
          reading: 'いいえ',
          translation: 'không, không phải vậy / いいえ (Không)',
        },
        {
          japanese: 'おかあさん（お母さん）',
          reading: 'おかあさん',
          translation: 'mẹ / お母さん (mẹ)',
        },
        {
          japanese: 'かいしゃ（会社）',
          reading: 'かいしゃ',
          translation: 'công ty / 会社 (công ty)',
        },
      ],
      grammarNote: `ひらがなの書き順のポイント：
- 基本的に左から右、上から下の順に書く
- 「あ」：横線 → 縦線 → 曲線（3画）
- 「き」：横線2本 → 縦線 → 右の払い（4画）

Quy tắc thứ tự nét viết Hiragana:
- Về cơ bản viết từ trái sang phải, từ trên xuống dưới`,
      quizzes: [
        {
          question: '「か」のローマ字読みは？ / "か" đọc là?',
          options: [
            { id: 'a', text: 'ka' },
            { id: 'b', text: 'ga' },
            { id: 'c', text: 'ki' },
            { id: 'd', text: 'ku' },
          ],
          correctId: 'a',
          explanation: '「か」は「ka」と読みます。か行は k + 母音（a/i/u/e/o）で構成されます。',
          difficulty: 'easy' as const,
        },
        {
          question: '「い」のローマ字読みは？ / "い" đọc là?',
          options: [
            { id: 'a', text: 'u' },
            { id: 'b', text: 'e' },
            { id: 'c', text: 'i' },
            { id: 'd', text: 'a' },
          ],
          correctId: 'c',
          explanation: '「い」は「i」と読みます。あ行の2番目の文字です。',
          difficulty: 'easy' as const,
        },
        {
          question: '「き」のローマ字読みは？ / "き" đọc là?',
          options: [
            { id: 'a', text: 'ke' },
            { id: 'b', text: 'ko' },
            { id: 'c', text: 'ka' },
            { id: 'd', text: 'ki' },
          ],
          correctId: 'd',
          explanation: '「き」は「ki」と読みます。か行の2番目（k + i）です。',
          difficulty: 'easy' as const,
        },
        {
          question: '「うえ」の意味は？ / "うえ" có nghĩa là?',
          options: [
            { id: 'a', text: '下（phía dưới）' },
            { id: 'b', text: '上（phía trên）' },
            { id: 'c', text: '家（nhà）' },
            { id: 'd', text: '川（sông）' },
          ],
          correctId: 'b',
          explanation: '「うえ」は「上」で、「phía trên・上（うえ）」という意味です。',
          difficulty: 'medium' as const,
        },
        {
          question: '「かお」の意味は？ / "かお" có nghĩa là?',
          options: [
            { id: 'a', text: '手（tay）' },
            { id: 'b', text: '足（chân）' },
            { id: 'c', text: '顔（khuôn mặt）' },
            { id: 'd', text: '目（mắt）' },
          ],
          correctId: 'c',
          explanation: '「かお」は「顔（かお）」＝ khuôn mặt / face です。',
          difficulty: 'medium' as const,
        },
      ],
      xpReward: 15,
    },
  },

  // ===== N5 語彙 =====
  'n5-02': {
    courseTitle: { ja: 'N5 基礎語彙100', vi: 'Từ vựng cơ bản N5' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N5語彙 第1回 〜数字・時間〜',
      titleTranslation: 'Từ vựng N5 Bài 1 - Số đếm và thời gian',
      introduction: `数字と時間の表現は日本語学習の最初に習得すべき基本語彙です。介護現場では「何時に薬を飲みますか？」「3回食べてください」など数字が頻繁に使われます。

Số đếm và cách diễn đạt thời gian là từ vựng cơ bản cần nắm đầu tiên. Trong môi trường điều dưỡng, số đếm được dùng thường xuyên như "Mấy giờ uống thuốc?" hay "Hãy ăn 3 lần".`,
      keyPoints: [
        '基本数字：いち(1)・に(2)・さん(3)・し/よん(4)・ご(5)・ろく(6)・なな/しち(7)・はち(8)・く/きゅう(9)・じゅう(10)',
        '時間：～じ（時）= o\'clock、～ふん/ぷん（分）= minutes',
        '4は「よん」、7は「なな」が介護現場では間違いが少ない（し=死、しち=一と聞き間違えやすい）',
        '回数：～かい（回）= times、いっかい（1回）・にかい（2回）・さんかい（3回）',
        '日付：～にち（日）、ついたち（1日）・ふつか（2日）は不規則変化',
      ],
      vocabulary: [
        { word: '一つ', reading: 'ひとつ', meaning: '1つ（một cái）', example: 'りんご一つください' },
        { word: '二つ', reading: 'ふたつ', meaning: '2つ（hai cái）', example: 'くすりを二つ' },
        { word: '時間', reading: 'じかん', meaning: '時間（thời gian）', example: '時間がありません' },
        { word: '毎日', reading: 'まいにち', meaning: '毎日（mỗi ngày）', example: '毎日練習する' },
        { word: '朝', reading: 'あさ', meaning: '朝（buổi sáng）', example: '朝ごはんの時間' },
        { word: '夜', reading: 'よる', meaning: '夜（buổi tối）', example: '夜9時に寝る' },
      ],
      examples: [
        {
          japanese: '薬は一日三回、食後に飲んでください。',
          reading: 'くすりはいちにちさんかい、しょくごにのんでください。',
          translation: 'Hãy uống thuốc 3 lần một ngày sau bữa ăn.',
        },
        {
          japanese: '今、何時ですか？',
          reading: 'いま、なんじですか？',
          translation: 'Bây giờ là mấy giờ?',
        },
        {
          japanese: 'お食事の時間は7時です。',
          reading: 'おしょくじのじかんはしちじです。',
          translation: 'Giờ ăn là 7 giờ.',
        },
        {
          japanese: '体温は36度5分です。',
          reading: 'たいおんは36どごぶです。',
          translation: 'Nhiệt độ cơ thể là 36,5 độ.',
        },
      ],
      grammarNote: `数え方（助数詞）のまとめ：
- 人を数える：〜人（にん）/ ひとり（1人）・ふたり（2人）は不規則
- 薄いものを数える：〜枚（まい）→ 紙1枚・書類2枚
- 小さいものを数える：〜個（こ）→ 薬1個・りんご3個
- 薬の回数：〜回（かい）→ 1日3回

Cách đếm trong tiếng Nhật (trợ từ đếm):
- Đếm người: 〜人（にん）/ ひとり（1）・ふたり（2）là bất quy tắc
- Vật mỏng dẹt: 〜枚（まい）→ 1 tờ giấy, 2 hồ sơ
- Vật nhỏ: 〜個（こ）→ 1 viên thuốc, 3 quả táo`,
      quizzes: [
        {
          question: '「薬は一日三回」の読み方は？ / Cách đọc "薬は一日三回"?',
          options: [
            { id: 'a', text: 'くすりはいちにちさんかい' },
            { id: 'b', text: 'くすりはひとひみっかい' },
            { id: 'c', text: 'くすりはいちにちさんき' },
            { id: 'd', text: 'やくはいちにちさんかい' },
          ],
          correctId: 'a',
          explanation: '「薬」はくすり、「一日」はいちにち、「三回」はさんかい と読みます。',
          difficulty: 'medium' as const,
        },
        {
          question: '「毎日」の読みは？ / "毎日" đọc là?',
          options: [
            { id: 'a', text: 'まいにち' },
            { id: 'b', text: 'まいひ' },
            { id: 'c', text: 'ごにち' },
            { id: 'd', text: 'あさひ' },
          ],
          correctId: 'a',
          explanation: '「毎日」は「まいにち」と読みます。every day / mỗi ngày の意味です。',
          difficulty: 'easy' as const,
        },
        {
          question: '「時間」の読みは？ / "時間" đọc là?',
          options: [
            { id: 'a', text: 'とき' },
            { id: 'b', text: 'じかん' },
            { id: 'c', text: 'しかん' },
            { id: 'd', text: 'じこく' },
          ],
          correctId: 'b',
          explanation: '「時間」は「じかん」と読みます。thời gian / time の意味です。',
          difficulty: 'easy' as const,
        },
        {
          question: '薬を「2回」飲む → 正しい読みは？ / "2回" đọc là?',
          options: [
            { id: 'a', text: 'にかい' },
            { id: 'b', text: 'ふたかい' },
            { id: 'c', text: 'にまわり' },
            { id: 'd', text: 'にほん' },
          ],
          correctId: 'a',
          explanation: '回数（かいすう）は「〜かい」と数えます。1回(いっかい)・2回(にかい)・3回(さんかい)。',
          difficulty: 'medium' as const,
        },
        {
          question: '介護現場で「4」をどう言うのが安全？ / Trong điều dưỡng, nói "4" như thế nào là an toàn?',
          options: [
            { id: 'a', text: 'し' },
            { id: 'b', text: 'よん' },
            { id: 'c', text: 'しん' },
            { id: 'd', text: 'よっつ（数え方のみ）' },
          ],
          correctId: 'b',
          explanation: '「し」は「死」と同じ発音で縁起が悪いため、介護現場では「よん」を使います。同様に7は「なな」を使います。',
          difficulty: 'hard' as const,
        },
      ],
      xpReward: 20,
    },
  },

  // ===== 介護の日本語 =====
  'care-01': {
    courseTitle: { ja: '介護の日本語 N4', vi: 'Tiếng Nhật điều dưỡng N4' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '介護の基本語彙と声かけ — レッスン1',
      titleTranslation: 'Từ vựng điều dưỡng cơ bản và câu hỏi thăm — Bài 1',
      introduction: `介護現場では、利用者さんへの「声かけ」がとても大切です。声かけとは、行動の前に声をかけて本人に安心してもらうことです。「これからお風呂に入りましょうか」など、一言声をかけるだけで、利用者さんの不安が減ります。

Trong môi trường điều dưỡng, việc "hỏi thăm trước khi làm" (声かけ) rất quan trọng. Đây là việc nói với người được chăm sóc trước khi thực hiện hành động để họ cảm thấy an tâm. Chỉ một câu như "Chúng ta vào tắm nhé" cũng giúp giảm lo lắng cho họ rất nhiều.`,
      keyPoints: [
        '声かけの基本：「これから〜しますね」「〜しましょうか？」の形を使う',
        '丁寧語の使い方：「〜してください」より「〜しましょう」の方が柔らかい',
        '体の調子を聞く：「お体の具合はいかがですか？」「どこか痛いところはありますか？」',
        '食事の声かけ：「お食事の準備ができました」「今日は何がお好きですか？」',
        '移動の声かけ：「立ち上がりますよ」「ゆっくりでいいですよ」「一緒にやりましょう」',
        '否定的な言葉は避ける：「ダメです」→「〜した方がいいですよ」',
      ],
      vocabulary: [
        { word: '声かけ', reading: 'こえかけ', meaning: '声をかけること（hỏi thăm trước khi làm）', example: '移動前に声かけをする' },
        { word: '具合', reading: 'ぐあい', meaning: '体の調子（tình trạng sức khỏe）', example: 'お体の具合はいかがですか' },
        { word: '介助', reading: 'かいじょ', meaning: 'お世話・手伝い（hỗ trợ thể chất）', example: '食事介助・入浴介助' },
        { word: '利用者', reading: 'りようしゃ', meaning: '介護サービスを使う人（người sử dụng dịch vụ）', example: '利用者さんの名前を呼ぶ' },
        { word: 'バイタル', reading: 'ばいたる', meaning: '生命兆候（dấu hiệu sinh tồn）', example: '朝のバイタルを測る' },
        { word: '申し送り', reading: 'もうしおくり', meaning: '業務の引き継ぎ（bàn giao ca）', example: '夜勤への申し送り' },
      ],
      dialogue: [
        {
          speaker: '介護士 (Nhân viên)',
          japanese: 'おはようございます。お体の具合はいかがですか？',
          reading: 'おはようございます。おからだのぐあいはいかがですか？',
          translation: 'Chào buổi sáng. Hôm nay cơ thể bạn thế nào ạ?',
        },
        {
          speaker: '利用者 (Người dùng)',
          japanese: '少し腰が痛いですね。',
          reading: 'すこしこしがいたいですね。',
          translation: 'Hơi đau lưng một chút.',
        },
        {
          speaker: '介護士 (Nhân viên)',
          japanese: 'そうですか。これからお食事にしましょうか。ゆっくりでいいですよ。',
          reading: 'そうですか。これからおしょくじにしましょうか。ゆっくりでいいですよ。',
          translation: 'Vậy ạ. Bây giờ chúng ta ăn cơm nhé. Từ từ thôi không sao.',
        },
        {
          speaker: '利用者 (Người dùng)',
          japanese: 'ありがとう。助かります。',
          reading: 'ありがとう。たすかります。',
          translation: 'Cảm ơn. Thật là may.',
        },
      ],
      examples: [
        {
          japanese: 'お体の具合はいかがですか？',
          reading: 'おからだのぐあいはいかがですか？',
          translation: 'Cơ thể bạn cảm thấy thế nào? / Sức khỏe hôm nay ra sao?',
        },
        {
          japanese: 'これからお食事にしましょうか。',
          reading: 'これからおしょくじにしましょうか。',
          translation: 'Chúng ta ăn bây giờ nhé? / Bây giờ mình ăn cơm nhé?',
        },
        {
          japanese: 'ゆっくりでいいですよ。焦らなくて大丈夫です。',
          reading: 'ゆっくりでいいですよ。あせらなくてだいじょうぶです。',
          translation: 'Từ từ thôi không sao. Không cần vội đâu.',
        },
        {
          japanese: 'どこか痛いところはありますか？',
          reading: 'どこかいたいところはありますか？',
          translation: 'Có chỗ nào đau không ạ?',
        },
        {
          japanese: '立ち上がりますよ。いち、に、さん。',
          reading: 'たちあがりますよ。いち、に、さん。',
          translation: 'Mình đứng dậy nhé. Một, hai, ba.',
        },
      ],
      grammarNote: `声かけに使う文型：
1. 「〜しましょうか？」= Shall we...? / 「〜しましょうか」は相手の意向を確認する丁寧な表現
2. 「〜しますね」= I'm going to... / これからする行動を予告する表現
3. 「〜でいいですよ」= It's okay to.../ 相手を安心させる表現
4. 「〜てください」= Please do.../ 丁寧なお願い（強めになることもある）

Mẫu câu dùng khi hỏi thăm:
1. 〜しましょうか = Chúng ta ... nhé? (xác nhận ý muốn của người kia)
2. 〜しますね = Tôi sẽ ... nhé (báo trước hành động sắp làm)
3. 〜でいいですよ = ... cũng được đấy (làm cho người kia yên tâm)`,
      quizzes: [
        {
          question: '「お体の具合はいかがですか？」の意味は？ / Câu này có nghĩa là gì?',
          options: [
            { id: 'a', text: 'ご飯を食べましたか？' },
            { id: 'b', text: '体の調子はどうですか？' },
            { id: 'c', text: 'どこに行きますか？' },
            { id: 'd', text: 'お薬は飲みましたか？' },
          ],
          correctId: 'b',
          explanation: '「具合」は体の状態・調子を意味します。「いかがですか」は「どうですか」の丁寧な言い方です。',
          difficulty: 'easy' as const,
        },
        {
          question: '移動前の正しい声かけはどれですか？ / Câu hỏi thăm đúng trước khi di chuyển?',
          options: [
            { id: 'a', text: '急いでください。' },
            { id: 'b', text: '立ちます！' },
            { id: 'c', text: 'これから立ち上がりますよ。ゆっくりでいいですよ。' },
            { id: 'd', text: '立てますか？ダメですか？' },
          ],
          correctId: 'c',
          explanation: '声かけは「これから〜しますよ」で事前に伝え、「ゆっくりでいいですよ」で安心させるのが基本です。',
          difficulty: 'medium' as const,
        },
        {
          question: '「バイタル」の意味は？ / "バイタル" có nghĩa là gì?',
          options: [
            { id: 'a', text: '朝食（bữa sáng）' },
            { id: 'b', text: '生命兆候（dấu hiệu sinh tồn）' },
            { id: 'c', text: '入浴介助（hỗ trợ tắm）' },
            { id: 'd', text: '業務引き継ぎ（bàn giao ca）' },
          ],
          correctId: 'b',
          explanation: 'バイタル（バイタルサイン）は体温・血圧・脈拍・呼吸数などの生命兆候のことです。dấu hiệu sinh tồn。',
          difficulty: 'easy' as const,
        },
        {
          question: '「申し送り」の意味として正しいのは？ / "申し送り" có nghĩa là?',
          options: [
            { id: 'a', text: '利用者への挨拶（chào người dùng）' },
            { id: 'b', text: '業務の引き継ぎ（bàn giao công việc）' },
            { id: 'c', text: '食事の配膳（phục vụ bữa ăn）' },
            { id: 'd', text: '医師への報告（báo cáo bác sĩ）' },
          ],
          correctId: 'b',
          explanation: '「申し送り」はシフト交代のときに業務の状況を次の担当者へ伝えることです（= bàn giao ca）。',
          difficulty: 'medium' as const,
        },
        {
          question: '否定的な言い方を避けるとき、「ダメです」の代わりに使うのは？ / Thay "ダメです" bằng gì?',
          options: [
            { id: 'a', text: 'そうですね。' },
            { id: 'b', text: '〜した方がいいですよ。' },
            { id: 'c', text: '絶対にやめてください。' },
            { id: 'd', text: '知りません。' },
          ],
          correctId: 'b',
          explanation: '「〜した方がいいですよ」は提案の形で、相手を傷つけずに行動を促せます。介護では否定より提案の表現を使いましょう。',
          difficulty: 'medium' as const,
        },
      ],
      xpReward: 30,
    },
  },

  // ===== 介護記録 =====
  'care-02': {
    courseTitle: { ja: '介護記録・申し送りの書き方', vi: 'Cách viết hồ sơ điều dưỡng' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '介護記録の基本 — 5W1H で書く',
      titleTranslation: 'Cơ bản viết hồ sơ điều dưỡng — Viết theo 5W1H',
      introduction: `介護記録は、利用者さんのケアの内容を正確に記録する重要な書類です。良い介護記録は「5W1H（いつ・どこで・誰が・何を・なぜ・どのように）」を意識して書きます。記録は主観ではなく客観的事実を書き、専門用語を使いながらも分かりやすく書くことが求められます。

Hồ sơ điều dưỡng là tài liệu quan trọng ghi chép chính xác nội dung chăm sóc người dùng dịch vụ. Hồ sơ tốt được viết theo 5W1H (khi nào, ở đâu, ai, cái gì, tại sao, như thế nào). Cần viết sự thật khách quan chứ không phải cảm nhận chủ quan, dùng thuật ngữ chuyên môn nhưng phải dễ hiểu.`,
      keyPoints: [
        '5W1H：いつ（When）・どこで（Where）・誰が（Who）・何を（What）・なぜ（Why）・どのように（How）',
        '客観的事実を書く：「元気そうだった」(NG) → 「笑顔で挨拶された」(OK)',
        '数値で記録する：「少し食べた」(NG) → 「主食5割、副食8割摂取」(OK)',
        '専門用語の活用：経口摂取・自立・一部介助・全介助・残存機能',
        'NG例→OK例：「転んだ」→「居室内にて転倒。右膝に擦過傷あり。Dr報告済み」',
      ],
      vocabulary: [
        { word: '経口摂取', reading: 'けいこうせっしゅ', meaning: '口から食べること（ăn qua miệng）', example: '経口摂取8割' },
        { word: '一部介助', reading: 'いちぶかいじょ', meaning: '一部だけ手伝う（hỗ trợ một phần）', example: '入浴は一部介助で実施' },
        { word: '全介助', reading: 'ぜんかいじょ', meaning: 'すべて手伝う（hỗ trợ toàn phần）', example: '更衣は全介助' },
        { word: '残存機能', reading: 'ざんそんきのう', meaning: '残っている能力（khả năng còn lại）', example: '残存機能を活かす' },
        { word: '訴え', reading: 'うったえ', meaning: '本人の言葉・主張（lời phàn nàn, yêu cầu）', example: '腹痛の訴えあり' },
        { word: 'バイタル測定', reading: 'ばいたるそくてい', meaning: '体温・血圧などを測る（đo dấu hiệu sinh tồn）', example: '朝のバイタル測定実施' },
      ],
      examples: [
        {
          japanese: '9:00 朝食介助。主食9割、副食全量摂取。水分200ml。',
          reading: 'ごぜんくじ あさしょくかいじょ。しゅしょくきゅうわり、ふくしょくぜんりょうせっしゅ。すいぶんにひゃくみりりっとる。',
          translation: '9:00 Hỗ trợ ăn sáng. Ăn 9/10 cơm, ăn hết thức ăn phụ. Nước 200ml.',
        },
        {
          japanese: '10:30 居室にて転倒。右膝に軽度の擦過傷あり。Dr.〇〇に報告済み。経過観察中。',
          reading: 'じゅうじさんじゅっぷん きょしつにててんとう。みぎひざにけいどのさっかしょうあり。',
          translation: '10:30 Ngã trong phòng. Có vết xước nhẹ ở đầu gối phải. Đã báo cáo bác sĩ XX. Đang theo dõi.',
        },
        {
          japanese: '入浴：シャワー浴実施。洗体は一部介助。体温36.8℃、血圧118/76mmHg。「気持ちよかった」との発言あり。',
          reading: 'にゅうよく：しゃわーよくじっし。せんたいはいちぶかいじょ。',
          translation: 'Tắm: Thực hiện tắm vòi sen. Hỗ trợ một phần rửa thân. Nhiệt độ 36,8°C, huyết áp 118/76. Có lời nói "Dễ chịu quá".',
        },
      ],
      grammarNote: `介護記録でよく使う表現：
- 「〜を実施した」= Đã thực hiện ...
- 「〜との訴えあり」= Có phàn nàn về ...
- 「〜は良好」= ... tốt
- 「〜にて」= tại ...（場所を示す書き言葉）
- 「〜済み」= đã ...（Dr報告済み = đã báo cáo bác sĩ）
- 「経過観察中」= đang theo dõi diễn biến`,
      quiz: {
        question: '介護記録で正しい書き方はどれですか？',
        options: [
          { id: 'a', text: '今日は元気そうで、よく食べた' },
          { id: 'b', text: '12:00 昼食、主食8割・副食6割摂取。水分150ml。笑顔で「おいしかった」との発言あり' },
          { id: 'c', text: 'いつもと変わらず普通だった' },
          { id: 'd', text: '食事はあまり食べなかった' },
        ],
        correctId: 'b',
        explanation: 'bが正解。具体的な時間・数値・客観的な事実・本人の言葉（発言）が含まれています。a・c・dは主観的・曖昧すぎます。\nb là đúng. Bao gồm thời gian cụ thể, số liệu, sự thật khách quan và lời nói của người dùng.',
      },
      xpReward: 35,
    },
  },

  // ===== 身体介護 =====
  'care-03': {
    courseTitle: { ja: '身体介護の日本語 〜入浴・移動・食事介助〜', vi: 'Tiếng Nhật chăm sóc thể chất' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '身体介護の声かけ — 移動介助編',
      titleTranslation: 'Câu hỏi thăm khi hỗ trợ thể chất — Phần di chuyển',
      introduction: `移動介助は介護の中で最もよく行われる業務の一つです。ベッドから車椅子への移乗、廊下の歩行介助、トイレへの誘導など、様々な場面で安全に声かけをしながら介助することが求められます。

Hỗ trợ di chuyển là một trong những công việc phổ biến nhất trong điều dưỡng. Từ chuyển từ giường lên xe lăn, hỗ trợ đi bộ ở hành lang, đến dẫn đến nhà vệ sinh — cần hỗ trợ an toàn kết hợp với hỏi thăm trong nhiều tình huống khác nhau.`,
      keyPoints: [
        'ベッドから起き上がる：「これから起き上がりますよ。準備はいいですか？」',
        '立ち上がり：「では、立ち上がりましょう。いち、に、さん。」',
        '歩行介助：「ゆっくり歩きましょう。急がなくて大丈夫ですよ」',
        'トイレ誘導：「お手洗いにご案内します。一緒に行きましょう」',
        '座る：「こちらに腰かけてください。はい、上手ですよ」',
        '車椅子移乗：「ブレーキをかけますね。では、立ち上がりましょう」',
      ],
      vocabulary: [
        { word: '移乗', reading: 'いじょう', meaning: 'ベッドと車椅子の間の移動（chuyển vị trí）', example: 'ベッドから車椅子への移乗' },
        { word: '歩行介助', reading: 'ほこうかいじょ', meaning: '歩くのを手伝う（hỗ trợ đi bộ）', example: '廊下で歩行介助する' },
        { word: 'ブレーキ', reading: 'ぶれーき', meaning: '車椅子のストッパー（phanh xe lăn）', example: 'ブレーキをかけてください' },
        { word: '手すり', reading: 'てすり', meaning: 'つかまる棒（tay vịn）', example: '手すりにつかまってください' },
        { word: '重心', reading: 'じゅうしん', meaning: '体の中心（trọng tâm）', example: '重心を前にかけましょう' },
        { word: '誘導', reading: 'ゆうどう', meaning: '案内・誘う（dẫn đường, hướng dẫn）', example: 'トイレに誘導する' },
      ],
      examples: [
        { japanese: 'ベッドの端に座りましょう。足を床につけてください。ゆっくりでいいですよ。', reading: 'べっどのはしにすわりましょう。あしをゆかにつけてください。ゆっくりでいいですよ。', translation: 'Hãy ngồi ở mép giường. Đặt chân xuống sàn. Từ từ thôi không sao.' },
        { japanese: 'では立ち上がりますよ。私の手につかまってください。いち、に、さん！', reading: 'ではたちあがりますよ。わたしのてにつかまってください。いち、に、さん！', translation: 'Đứng dậy nhé. Hãy nắm tay tôi. Một, hai, ba!' },
        { japanese: 'お手洗いに行きましょうか？一緒にゆっくり行きましょう。', reading: 'おてあらいにいきましょうか？いっしょにゆっくりいきましょう。', translation: 'Mình đi vệ sinh nhé? Cùng nhau đi từ từ thôi.' },
      ],
      grammarNote: `【移動介助の声かけパターン】
事前確認：「〜しましょうか？準備はいいですか？」
開始合図：「では〜します。いち、に、さん。」
安心させる：「ゆっくりでいいですよ。大丈夫ですよ。」
完了確認：「上手でした。はい、座れましたね。」
次の案内：「次は〜しましょう。」`,
      quiz: {
        question: '立ち上がり介助の最初の声かけとして最適なのは？',
        options: [
          { id: 'a', text: 'もう立って！' },
          { id: 'b', text: 'これから立ち上がりますよ。準備はいいですか？' },
          { id: 'c', text: '早く起きてください' },
          { id: 'd', text: '立ち上がれますか？' },
        ],
        correctId: 'b',
        explanation: '移動介助では「これから〜しますよ」と予告してから介助します。突然動かすと利用者さんが驚き、転倒リスクが高まります。\nKhi hỗ trợ di chuyển, phải báo trước "これから〜しますよ" rồi mới hỗ trợ.',
      },
      xpReward: 35,
    },
  },

  // ===== 認知症ケア =====
  'care-04': {
    courseTitle: { ja: '認知症ケアのコミュニケーション', vi: 'Giao tiếp trong chăm sóc người mắc chứng mất trí nhớ' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '認知症の方への言葉かけ — バリデーション技法',
      titleTranslation: 'Cách nói chuyện với người mắc chứng mất trí nhớ — Kỹ thuật Validation',
      introduction: `認知症の方への対応は、一般的な介護とは異なるアプローチが必要です。バリデーション（Validation）とは、相手の感情や現実を否定せず、共感して受け止めることです。「違います」と訂正することで、かえって不穏になることがあります。

Cách tiếp cận với người mắc chứng mất trí nhớ khác với điều dưỡng thông thường. Validation là không phủ nhận cảm xúc và thực tế của người kia mà lắng nghe với sự đồng cảm. Việc sửa lại "Sai rồi" đôi khi khiến họ trở nên bất an hơn.`,
      keyPoints: [
        'バリデーション：感情を否定せず受け入れる「そうですか、そうでしたか」',
        '訂正しない：「違います」→「そうですね、〜ですね」',
        '繰り返し質問への対応：「今どんな気持ちですか？」と気持ちを聞く',
        '帰宅願望：「もうすぐお会いできますよ」「今日はここで過ごしましょう」',
        '非言語コミュニケーション：目線・表情・タッチが大切',
        '「そうですか」の力：共感の言葉で安心感を与える',
      ],
      vocabulary: [
        { word: 'バリデーション', reading: 'ばりでーしょん', meaning: '感情を受け入れる技法（kỹ thuật đồng cảm）', example: 'バリデーションで対応する' },
        { word: '不穏', reading: 'ふおん', meaning: '落ち着かない・不安定な状態（bất ổn）', example: '夜間に不穏になる' },
        { word: '帰宅願望', reading: 'きたくがんぼう', meaning: '家に帰りたがること（muốn về nhà）', example: '帰宅願望が強い' },
        { word: '傾聴', reading: 'けいちょう', meaning: '注意深く聞く（lắng nghe chú tâm）', example: '傾聴することが大切' },
        { word: '共感', reading: 'きょうかん', meaning: '相手の気持ちを理解する（đồng cảm）', example: '共感的な対応をする' },
      ],
      examples: [
        { japanese: '利用者：「家に帰らないといけない」 介護士：「そうですか。ご自宅のことが心配なんですね。今日はここで一緒にいましょう。」', reading: 'りようしゃ：「うちにかえらないといけない」かいごし：「そうですか。ごじたくのことがしんぱいなんですね。きょうはここでいっしょにいましょう。」', translation: 'Người dùng: "Tôi phải về nhà" - ĐD: "Vậy ạ. Bác lo lắng về nhà ạ. Hôm nay mình ở đây cùng nhau nhé."' },
        { japanese: '「そうですか、大変でしたね。よく頑張りましたね。」', reading: 'そうですか、たいへんでしたね。よくがんばりましたね。', translation: '"Vậy ạ, khó khăn thật nhỉ. Bác đã cố gắng lắm đấy."' },
      ],
      grammarNote: `【バリデーションで使う表現】
受け入れる：「そうですか」「そうですね」「そうでしたか」
共感する：「大変でしたね」「心配でしたね」「つらいですね」
気持ちを聞く：「今、どんなお気持ちですか？」
一緒にいる：「私もここにいますよ」「一緒に〜しましょう」

【避けるべき表現】
×「違います」×「そんなことはないですよ」×「さっきも言いましたよ」`,
      quiz: {
        question: '認知症の方が「子供を迎えに行かないと」と言ったとき、最適な対応は？',
        options: [
          { id: 'a', text: '「お子さんはもう大人ですよ」と事実を伝える' },
          { id: 'b', text: '「そうですか。お子さんのことが心配なんですね」と共感する' },
          { id: 'c', text: '「そんなことより食事にしましょう」と話題を変える' },
          { id: 'd', text: '無視する' },
        ],
        correctId: 'b',
        explanation: 'バリデーションでは感情（心配している）を受け入れることが大切。事実の訂正は混乱を招くことがあります。\nTrong Validation, quan trọng là tiếp nhận cảm xúc (đang lo lắng). Sửa thực tế có thể gây thêm nhầm lẫn.',
      },
      xpReward: 35,
    },
  },

  // ===== 夜勤・緊急時 =====
  'care-05': {
    courseTitle: { ja: '夜勤・緊急時の日本語対応', vi: 'Tiếng Nhật khi trực đêm và xử lý khẩn cấp' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '夜勤の見回りと急変対応',
      titleTranslation: 'Tuần tra đêm và xử lý đột biến',
      introduction: `夜勤は少ないスタッフで多くの利用者さんを見守る責任ある業務です。定時の見回り・睡眠確認・急変時の対応・ナースへの報告が主な業務です。緊急時は正確な情報を素早く伝えることが命に関わります。

Trực đêm là công việc trách nhiệm cao khi ít nhân viên phải chăm sóc nhiều người dùng. Công việc chính là tuần tra đúng giờ, kiểm tra giấc ngủ, xử lý đột biến và báo cáo y tá. Trong trường hợp khẩn cấp, truyền đạt thông tin chính xác nhanh chóng liên quan đến tính mạng.`,
      keyPoints: [
        '見回り報告：「〇号室、〇〇様、安眠中です。異常なし」',
        '急変報告：「〇〇様が〜の状態です。すぐ来てください」',
        '転倒発見：「〇号室で転倒を発見しました。意識はあります」',
        '救急要請：「〇〇施設です。救急車をお願いします。〇〇様が〜の状態です」',
        '引き継ぎ：「夜間の特記事項は〜です。〜については経過観察をお願いします」',
      ],
      vocabulary: [
        { word: '見回り', reading: 'みまわり', meaning: '定期的な確認巡回（tuần tra định kỳ）', example: '夜間の見回りをする' },
        { word: '安眠中', reading: 'あんみんちゅう', meaning: '静かに眠っている（đang ngủ yên）', example: '安眠中です、異常なし' },
        { word: '急変', reading: 'きゅうへん', meaning: '急に状態が変わる（đột biến）', example: '急変が発生した' },
        { word: '意識', reading: 'いしき', meaning: '意識（ý thức）', example: '意識があります・意識がありません' },
        { word: '特記事項', reading: 'とっきじこう', meaning: '特別に記録すること（điểm đặc biệt cần ghi）', example: '夜間の特記事項を報告する' },
        { word: '経過観察', reading: 'けいかかんさつ', meaning: '様子を見ること（theo dõi diễn biến）', example: '経過観察をお願いします' },
      ],
      examples: [
        { japanese: '「ナースさん、緊急です。201号室の田中様が呼吸困難の状態です。すぐ来てください。」', reading: 'なーすさん、きんきゅうです。にひゃくいちごうしつのたなかさまがこきゅうこんなんのじょうたいです。すぐきてください。', translation: '"Y tá ơi, khẩn cấp. Ông Tanaka phòng 201 đang trong tình trạng khó thở. Hãy đến ngay."' },
        { japanese: '「119番？〇〇介護施設です。救急車をお願いします。75歳男性が意識不明です。住所は〜です。」', reading: '「ひゃくじゅうきゅうばん？〇〇かいごしせつです。きゅうきゅうしゃをおねがいします。ななじゅうごさいだんせいがいしきふめいです。じゅうしょは〜です。」', translation: '"119 à? Cơ sở điều dưỡng XX. Cho tôi xe cứu thương. Nam 75 tuổi bất tỉnh. Địa chỉ là..."' },
      ],
      grammarNote: `【緊急時の報告構成（SBAR法）】
S（状況）：「〇〇様が〜の状態です」
B（背景）：「〜時から〜の症状がありました」
A（評価）：「〜と思われます」
R（要望）：「すぐ来てください / 指示をお願いします」

【119番通報の流れ】
1. 「救急です（きゅうきゅうです）」
2. 住所（じゅうしょ）
3. 患者の状態（かんじゃのじょうたい）
4. 名前・年齢（なまえ・ねんれい）`,
      quiz: {
        question: '急変を発見したとき、最初にすることは？',
        options: [
          { id: 'a', text: 'まず家族に連絡する' },
          { id: 'b', text: '一人で対応する' },
          { id: 'c', text: 'すぐにナース・上司に報告する' },
          { id: 'd', text: '記録を書く' },
        ],
        correctId: 'c',
        explanation: '急変時はまず「報告」が最優先。「ナース・上司への報告→指示に従って対応→記録」の順です。一人で判断・対応することは危険です。\nKhi có đột biến, ưu tiên đầu tiên là "báo cáo". Thứ tự: Báo cáo y tá/cấp trên → làm theo chỉ đạo → ghi chép.',
      },
      xpReward: 40,
    },
  },

  // ===== 職場の日本語 =====
  'care-06': {
    courseTitle: { ja: 'N3 職場の日本語 〜ビジネス敬語・報連相〜', vi: 'Tiếng Nhật nơi làm việc N3 - Kính ngữ & báo cáo' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '報連相 — 報告・連絡・相談の日本語',
      titleTranslation: 'Báo cáo - Liên lạc - Tham vấn trong tiếng Nhật',
      introduction: `「報連相（ほうれんそう）」は日本の職場文化の基本です。「報告・連絡・相談」の頭文字をとった言葉で、日本のすべての職場で重視されています。特に介護現場では、情報共有が利用者さんの安全に直結するため、報連相が非常に重要です。

「報連相（ほうれんそう）」là nền tảng văn hóa nơi làm việc Nhật Bản — viết tắt của Báo cáo・Liên lạc・Tham vấn. Đặc biệt trong điều dưỡng, chia sẻ thông tin liên quan trực tiếp đến an toàn người dùng nên báo liên tham rất quan trọng.`,
      keyPoints: [
        '報告（ほうこく）：業務終了・問題発生を上司に知らせる',
        '連絡（れんらく）：スタッフ間で情報を共有する',
        '相談（そうだん）：判断に困るとき上司に意見を求める',
        '報告の形：「〜しました。結果は〜です。」',
        '相談の形：「〜について相談させてください。〜の場合、どうすればよいでしょうか」',
        '悪い知らせほど早く：問題は隠さず、すぐに報告する',
      ],
      vocabulary: [
        { word: '報連相', reading: 'ほうれんそう', meaning: '報告・連絡・相談（báo-liên-tham）', example: '報連相を徹底する' },
        { word: 'ご報告します', reading: 'ごほうこくします', meaning: '報告します（kính ngữ）（xin báo cáo）', example: '昨日の件についてご報告します' },
        { word: '確認をお願いします', reading: 'かくにんをおねがいします', meaning: 'チェックしてください（nhờ xác nhận）', example: '記録の確認をお願いします' },
        { word: 'ご相談があります', reading: 'ごそうだんがあります', meaning: '相談したい（tôi muốn tham khảo ý kiến）', example: 'ちょっとご相談があります' },
        { word: '申し訳ありません', reading: 'もうしわけありません', meaning: 'すみません（xin lỗi - rất trang trọng）', example: 'ご迷惑をおかけして申し訳ありません' },
      ],
      examples: [
        { japanese: '「主任、ご報告があります。田中様が今朝から食欲がなく、半分しか食べられていません。どのように対応すればよいでしょうか？」', reading: 'しゅにん、ごほうこくがあります。たなかさまがけさからしょくよくがなく、はんぶんしかたべられていません。どのようにたいおうすればよいでしょうか？', translation: '"Trưởng nhóm ơi, tôi muốn báo cáo. Ông Tanaka từ sáng không có cảm giác thèm ăn, chỉ ăn được một nửa. Nên xử lý thế nào ạ?"' },
        { japanese: '「先輩、少しご相談させてください。〇〇さんへの対応について迷っています。」', reading: 'せんぱい、すこしごそうだんさせてください。〇〇さんへのたいおうについてまよっています。', translation: '"Tiền bối ơi, cho tôi hỏi chút ạ. Tôi đang phân vân về cách xử lý với ông/bà XX."' },
      ],
      grammarNote: `【報告の基本構成】
1. 事実：「〜しました」「〜がありました」
2. 状況：「〜の状態です」「〜という結果でした」
3. 自分の判断（あれば）：「〜と思います」
4. 相談・依頼：「〜はどうすればよいでしょうか」

【相談の丁寧な表現】
「ちょっとよろしいですか？」= 少しいいですか？
「〜についてご相談があります」= 相談したい
「〜していただけますか」= してもらえますか？`,
      quiz: {
        question: '「報連相」の「連」は何を意味しますか？',
        options: [
          { id: 'a', text: '連絡（れんらく）' },
          { id: 'b', text: '連続（れんぞく）' },
          { id: 'c', text: '連帯（れんたい）' },
          { id: 'd', text: '連携（れんけい）' },
        ],
        correctId: 'a',
        explanation: '報連相 = 報告（ほうこく）・連絡（れんらく）・相談（そうだん）。「連」は連絡のことです。\n報連相 = Báo cáo・Liên lạc・Tham vấn. "連" là viết tắt của 連絡.',
      },
      xpReward: 35,
    },
  },

  // ===== 薬の管理 =====
  'care-07': {
    courseTitle: { ja: '薬の管理と服薬介助の日本語', vi: 'Tiếng Nhật quản lý thuốc và hỗ trợ uống thuốc' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: '薬の種類と服薬介助の言葉',
      titleTranslation: 'Loại thuốc và từ ngữ khi hỗ trợ uống thuốc',
      introduction: `薬の管理は介護業務の中でも特に慎重を要する業務です。誤薬（間違った薬を渡す）は重大な事故につながります。薬の種類・飲み方・注意事項を日本語で正確に理解し、利用者さんに分かりやすく説明できる能力が必要です。

Quản lý thuốc là công việc đòi hỏi đặc biệt thận trọng trong điều dưỡng. Nhầm thuốc (đưa sai thuốc) dẫn đến tai nạn nghiêm trọng. Cần hiểu chính xác bằng tiếng Nhật về loại thuốc, cách uống, lưu ý và có khả năng giải thích dễ hiểu cho người dùng.`,
      keyPoints: [
        '内服薬の種類：錠剤・カプセル・粉薬・液体薬・貼り薬・塗り薬',
        '飲むタイミング：食前（しょくぜん）・食後（しょくご）・食間（しょっかん）・就寝前（しゅうしんまえ）',
        '誤薬防止：「薬の名前・量・時間」の3確認（三つのチェック）',
        '服薬拒否：「お薬ですよ。飲むと〜が楽になりますよ」',
        '服薬確認：「全部飲めましたか？」「口の中に残っていませんか？」',
      ],
      vocabulary: [
        { word: '錠剤', reading: 'じょうざい', meaning: '固形の薬（thuốc viên）', example: '血圧の錠剤を飲む' },
        { word: '粉薬', reading: 'こなぐすり', meaning: '粉末の薬（thuốc bột）', example: '粉薬は飲みにくい' },
        { word: '食後', reading: 'しょくご', meaning: '食事の後（sau bữa ăn）', example: '食後30分以内に飲む' },
        { word: '食間', reading: 'しょっかん', meaning: '食事と食事の間（giữa hai bữa ăn）', example: '食間：食後2時間後' },
        { word: '誤薬', reading: 'ごやく', meaning: '間違った薬を渡す（nhầm thuốc）', example: '誤薬インシデントを防ぐ' },
        { word: '服薬確認', reading: 'ふくやくかくにん', meaning: '薬を飲んだか確認（xác nhận đã uống thuốc）', example: '服薬確認を行う' },
      ],
      examples: [
        { japanese: 'お薬の時間です。今日の朝の分ですよ。「水と一緒に飲んでください。全部飲めましたか？」', reading: 'おくすりのじかんです。きょうのあさのぶんですよ。「みずといっしょにのんでください。ぜんぶのめましたか？」', translation: 'Đến giờ uống thuốc rồi. Đây là phần buổi sáng hôm nay. "Hãy uống với nước nhé. Uống hết chưa ạ?"' },
        { japanese: 'お薬を飲むのが嫌ですか？この薬は頭痛が楽になりますよ。一緒に飲みましょう。', reading: 'おくすりをのむのがいやですか？このくすりはずつうがらくになりますよ。いっしょにのみましょう。', translation: 'Không muốn uống thuốc ạ? Thuốc này sẽ giảm đau đầu đấy. Cùng uống nhé.' },
      ],
      grammarNote: `【服薬介助の確認ポイント】
5Rチェック（正しい介助のために）:
1. 正しい利用者（Right resident）
2. 正しい薬（Right medication）
3. 正しい量（Right dose）
4. 正しい時間（Right time）
5. 正しい方法（Right route）

【飲み方の時間帯】
食前 = 食事の30分前 / 食後 = 食後30分以内
食間 = 食後2時間 / 就寝前 = 寝る前`,
      quiz: {
        question: '「食間」に薬を飲む正しいタイミングは？',
        options: [
          { id: 'a', text: '食事中' },
          { id: 'b', text: '食事の直前' },
          { id: 'c', text: '食後約2時間後（食事と食事の間）' },
          { id: 'd', text: '就寝直前' },
        ],
        correctId: 'c',
        explanation: '「食間（しょっかん）」は食事と食事の間の時間を指し、通常は食後2時間後頃です。食事中ではないので注意。\n「食間」là giữa hai bữa ăn, thường khoảng 2 giờ sau bữa ăn. Không phải trong khi ăn.',
      },
      xpReward: 40,
    },
  },

  // ===== 家族・ケアマネ =====
  'care-08': {
    courseTitle: { ja: '家族・ケアマネとの連携の日本語', vi: 'Tiếng Nhật phối hợp với gia đình và quản lý chăm sóc' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: 'ご家族への状況説明と電話応対',
      titleTranslation: 'Giải thích tình trạng và ứng đáp điện thoại với gia đình',
      introduction: `介護施設では、利用者さんのご家族に定期的に状況を報告したり、急変時に連絡したりすることが必要です。ご家族は利用者さんのことを心配されているので、丁寧かつ正確な説明が求められます。電話応対でも、聞き取りにくい場合は繰り返しを依頼する勇気が必要です。

Trong cơ sở điều dưỡng, cần định kỳ báo cáo tình trạng cho gia đình người dùng và liên hệ khi có đột biến. Gia đình lo lắng cho người thân nên cần giải thích lịch sự và chính xác. Khi nghe điện thoại không rõ, cần dũng cảm nhờ nói lại.`,
      keyPoints: [
        '電話の受け方：「はい、〇〇施設でございます」',
        '状況報告：「〇〇様は最近〜の様子で、〜を楽しんでいらっしゃいます」',
        '悪い知らせ：「実は〜という状況が発生しました。ご心配をおかけして申し訳ありません」',
        '聞き返す：「恐れ入りますが、もう一度おっしゃっていただけますか」',
        '確認の取り方：「〇〇様でいらっしゃいますか？ご確認いただけますか？」',
      ],
      vocabulary: [
        { word: 'いらっしゃいます', reading: 'いらっしゃいます', meaning: 'います の尊敬語（có mặt - kính ngữ）', example: 'お父様はいらっしゃいますか' },
        { word: '恐れ入りますが', reading: 'おそれいりますが', meaning: '申し訳ないですが（xin lỗi vì điều này）', example: '恐れ入りますが、お名前を' },
        { word: '伝言', reading: 'でんごん', meaning: 'メッセージ（tin nhắn, lời nhắn）', example: '伝言をお伝えします' },
        { word: '折り返す', reading: 'おりかえす', meaning: '電話を掛け直す（gọi lại）', example: '折り返しご連絡します' },
        { word: 'ご心配', reading: 'ごしんぱい', meaning: '心配 の丁寧語（lo lắng - kính ngữ）', example: 'ご心配をおかけしました' },
      ],
      examples: [
        { japanese: '「もしもし、〇〇様のご家族の方でいらっしゃいますか？私、担当の〇〇と申します。お父様ですが、今朝から食欲がなく、体温も37.5度と少し高めです。ご心配をおかけして申し訳ありません。経過観察しておりますが、何かご不明な点はございますか？」', reading: '', translation: '"Xin chào, đây có phải là gia đình của ông/bà XX không? Tôi là XX, người phụ trách. Về phía cha/mẹ của bạn, sáng nay không có cảm giác thèm ăn và nhiệt độ cũng hơi cao 37,5 độ. Xin lỗi vì đã làm bạn lo lắng. Chúng tôi đang theo dõi, bạn có điều gì chưa rõ không?"' },
      ],
      grammarNote: `【電話応対の基本フロー】
1. 受ける：「はい、〇〇施設でございます」
2. 確認する：「〇〇様でいらっしゃいますか？」
3. 用件を聞く：「本日はどのようなご用件でしょうか？」
4. 担当者につなぐ/報告する
5. 終わる：「失礼いたします」

【聞き返す丁寧な表現】
「恐れ入りますが、もう一度おっしゃっていただけますか？」
「お電話が少し遠いようで、〜の部分をもう一度お願いできますか？」`,
      quiz: {
        question: '電話で相手の声が聞き取れなかった場合の適切な表現は？',
        options: [
          { id: 'a', text: 'もう一回言って！' },
          { id: 'b', text: '聞こえません' },
          { id: 'c', text: '恐れ入りますが、もう一度おっしゃっていただけますか？' },
          { id: 'd', text: '電話が悪いですね' },
        ],
        correctId: 'c',
        explanation: '「恐れ入りますが」はビジネスで「申し訳ありませんが」の意味で使う丁寧な表現。聞き返す際の基本フレーズです。\n「恐れ入りますが」là biểu đạt lịch sự nghĩa "xin lỗi nhưng..." trong môi trường công việc.',
      },
      xpReward: 40,
    },
  },

  // ===== N4 文法 =====
  'n4-02': {
    courseTitle: { ja: 'N4 文法完全対策', vi: 'Ngữ pháp N4 toàn diện' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N4文法: 〜てしまう / 〜ちゃう',
      titleTranslation: 'Ngữ pháp N4: 〜てしまう / 〜ちゃう',
      introduction: `「〜てしまう」は2つの意味を持つ重要な文法です。
①完了：動作が完全に終わったことを表す（中国語の「完」のニュアンス）
②後悔・意図しない結果：望ましくないことが起きたときの感情を表す

「〜ちゃった」は「〜てしまった」の口語形で、友人や同僚との会話でよく使います。
介護現場での使用例：「薬を飲み忘れてしまいました」「転んでしまって...」

「〜てしまう」 có 2 nghĩa quan trọng:
1. Hoàn thành: hành động đã hoàn toàn kết thúc
2. Hối tiếc / kết quả không mong muốn: diễn đạt cảm xúc khi điều không hay xảy ra`,
      keyPoints: [
        '接続：動詞て形 + しまう（例：食べて + しまう = 食べてしまう）',
        '完了の意味：「全部食べてしまった」= 食べ終えた、もうない',
        '後悔の意味：「壊してしまった」= 壊したことへの後悔・申し訳なさ',
        '口語形：〜てしまう→〜ちゃう、〜でしまう→〜じゃう（例：飲んじゃった）',
        '介護での用例：「薬を飲み忘れてしまいました」「転倒させてしまいました」',
        '丁寧形：〜てしまいました（過去・丁寧）、〜てしまいます（現在・丁寧）',
      ],
      vocabulary: [
        { word: '忘れる', reading: 'わすれる', meaning: '忘れる（quên）', example: '薬を忘れてしまった' },
        { word: '転ぶ', reading: 'ころぶ', meaning: '転ぶ（ngã）', example: '廊下で転んでしまった' },
        { word: '壊す', reading: 'こわす', meaning: '壊す（làm hỏng）', example: '機械を壊してしまった' },
        { word: '飲む', reading: 'のむ', meaning: '飲む（uống）', example: '水薬を全部飲んでしまった' },
        { word: '間違える', reading: 'まちがえる', meaning: '間違える（nhầm lẫn）', example: '部屋を間違えてしまった' },
      ],
      examples: [
        {
          japanese: '全部食べてしまいました。',
          reading: 'ぜんぶたべてしまいました。',
          translation: 'Tôi đã ăn hết rồi. (hoàn thành)',
        },
        {
          japanese: '薬を飲み忘れてしまいました。すみません。',
          reading: 'くすりをのみわすれてしまいました。すみません。',
          translation: 'Tôi đã quên uống thuốc mất. Xin lỗi.',
        },
        {
          japanese: '廊下で転倒させてしまって、本当に申し訳ありません。',
          reading: 'ろうかでてんとうさせてしまって、ほんとうにもうしわけありません。',
          translation: 'Tôi thực sự xin lỗi vì để xảy ra té ngã ở hành lang.',
        },
        {
          japanese: 'もう食べちゃった？（口語）',
          reading: 'もうたべちゃった？',
          translation: 'Ăn hết rồi sao? (khẩu ngữ)',
        },
      ],
      grammarNote: `【形の作り方 — Cách cấu tạo】
動詞て形 → + しまう
・食べる → 食べて + しまう = 食べてしまう
・飲む → 飲んで + しまう = 飲んでしまう  ※「で」に変化
・転ぶ → 転んで + しまう = 転んでしまう

【口語形 — Khẩu ngữ】
〜てしまった → 〜ちゃった（例：食べちゃった）
〜でしまった → 〜じゃった（例：飲んじゃった）

【介護現場でよく使うシーン】
・ミスを報告するとき：「〜してしまいました。申し訳ありません」
・完了報告：「薬の準備ができてしまいました（完了）」`,
      quiz: {
        question: '「鍵を忘れてしまった」の意味として最も適切なものは？',
        options: [
          { id: 'a', text: '鍵を見つけた' },
          { id: 'b', text: '鍵を忘れたことへの後悔がある' },
          { id: 'c', text: '鍵を持っている' },
          { id: 'd', text: '鍵を作った' },
        ],
        correctId: 'b',
        explanation: '「〜てしまう」は後悔や意図しない結果を表します。鍵を忘れたことを残念・申し訳なく思っているニュアンスです。\n「〜てしまう」biểu đạt sự hối tiếc hoặc kết quả không mong muốn. Mang sắc thái tiếc nuối, xin lỗi vì đã quên chìa khóa.',
      },
      xpReward: 25,
    },
  },

  // ===== 介護福祉士試験 =====
  'pro-01': {
    courseTitle: { ja: '介護福祉士 国家試験 筆記対策', vi: 'Ôn thi viết quốc gia chứng chỉ điều dưỡng viên' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '介護福祉士試験: 人間の尊厳と自立',
      titleTranslation: 'Thi điều dưỡng viên: Phẩm giá con người và tự lập',
      introduction: `介護福祉士国家試験の第1科目「人間の尊厳と自立」は、介護の根本理念を問う分野です。ICF（国際生活機能分類）・ノーマライゼーション・QOLなどの概念を理解し、利用者さんの権利擁護と自立支援の考え方を学びます。

Khoa học đầu tiên của kỳ thi quốc gia điều dưỡng viên "Phẩm giá và sự tự lập của con người" kiểm tra lý niệm căn bản của điều dưỡng. Cần hiểu các khái niệm ICF, Normalization, QOL và học về bảo vệ quyền lợi và hỗ trợ tự lập cho người dùng dịch vụ.`,
      keyPoints: [
        'ノーマライゼーション：障がい者も普通の生活を送る権利がある',
        'ICF（国際生活機能分類）：心身機能・活動・参加の三つの側面',
        'QOL（生活の質）：利用者さんが望む生活の実現',
        '権利擁護（アドボカシー）：利用者さんの権利を守る支援',
        '自立支援：自分でできることは自分でやる（残存機能の活用）',
        '尊厳を守る：プライバシー保護・羞恥心への配慮',
      ],
      vocabulary: [
        { word: 'ノーマライゼーション', reading: 'のーまらいぜーしょん', meaning: '障がい者の社会参加を支援する考え方（Normalization）', example: 'ノーマライゼーションの理念' },
        { word: 'QOL', reading: 'きゅーおーえる', meaning: '生活の質（chất lượng cuộc sống）', example: 'QOLの向上を目指す' },
        { word: '権利擁護', reading: 'けんりようご', meaning: '利用者の権利を守ること（bảo vệ quyền lợi）', example: '権利擁護（アドボカシー）' },
        { word: '残存機能', reading: 'ざんそんきのう', meaning: '残っている機能・能力（khả năng còn lại）', example: '残存機能を活かしたケア' },
        { word: '自立支援', reading: 'じりつしえん', meaning: '自分でできることを支援（hỗ trợ tự lập）', example: '自立支援の視点でケアする' },
      ],
      examples: [
        { japanese: '【試験問題例】ICFの「活動」の説明として正しいのはどれか。1.心身機能・構造 2.個人の課題遂行 3.生活・人生場面への関与 4.環境因子', reading: '', translation: '【Ví dụ đề thi】Giải thích đúng về "hoạt động" trong ICF là gì? 1.Chức năng/cấu trúc thể chất 2.Thực hiện nhiệm vụ cá nhân 3.Tham gia vào cuộc sống 4.Yếu tố môi trường' },
        { japanese: 'ノーマライゼーションとは、障がいのある人も地域社会の中で普通の生活を営む権利があるという考え方である。', reading: 'のーまらいぜーしょんとは、しょうがいのあるひともちいきしゃかいのなかでふつうのせいかつをいとなむけんりがあるというかんがえかたである。', translation: 'Normalization là quan điểm cho rằng người khuyết tật cũng có quyền sống cuộc sống bình thường trong cộng đồng.' },
      ],
      grammarNote: `【介護福祉士試験の科目構成】
領域I: 人間と社会（人間の尊厳・人間関係・社会の理解）
領域II: 介護（介護の基本・コミュニケーション・生活支援技術）
領域III: こころとからだのしくみ（発達と老化・認知症・障害の理解）
領域IV: 医療的ケア

【出題形式】
・5択問題 × 125問
・合格基準：総得点の60%以上かつ各領域で足切りなし`,
      quiz: {
        question: 'ICFの三つの側面に含まれないのはどれか？',
        options: [
          { id: 'a', text: '心身機能・身体構造' },
          { id: 'b', text: '活動' },
          { id: 'c', text: '参加' },
          { id: 'd', text: '知能指数' },
        ],
        correctId: 'd',
        explanation: 'ICF（国際生活機能分類）の三つの側面は「心身機能・身体構造」「活動」「参加」です。知能指数はICFの側面ではありません。\nBa khía cạnh của ICF: "Chức năng/cấu trúc thể chất" "Hoạt động" "Tham gia". Chỉ số trí tuệ không thuộc ICF.',
      },
      xpReward: 50,
    },
  },

  // ===== 看護補助 =====
  'pro-03': {
    courseTitle: { ja: '看護補助・看護実務の日本語', vi: 'Tiếng Nhật hỗ trợ điều dưỡng và thực hành y tế' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: 'バイタルサインの測定と報告',
      titleTranslation: 'Đo và báo cáo dấu hiệu sinh tồn',
      introduction: `看護補助として働く際、バイタルサインの測定と報告は基本業務の一つです。体温・血圧・脈拍・呼吸・SpO2（血中酸素飽和度）を正確に測定し、異常値の判断と報告ができることが求められます。

Khi làm trợ lý y tá, đo và báo cáo dấu hiệu sinh tồn là một trong những công việc cơ bản. Cần đo chính xác nhiệt độ, huyết áp, mạch đập, nhịp thở, SpO2 (độ bão hòa oxy) và có khả năng nhận biết giá trị bất thường để báo cáo.`,
      keyPoints: [
        '体温（たいおん）：正常値36.0〜37.0℃ / 37.5℃以上 = 発熱',
        '血圧（けつあつ）：正常120/80mmHg以下 / 140/90以上 = 高血圧',
        '脈拍（みゃくはく）：正常60〜100回/分 / 100以上 = 頻脈',
        '呼吸（こきゅう）：正常12〜20回/分 / 24以上 = 頻呼吸',
        'SpO2：正常96〜100% / 94%以下 = 異常（ドクターへ報告）',
        '報告の形：「〇〇様のバイタルです。体温〇〇℃、血圧〇〇/〇〇です」',
      ],
      vocabulary: [
        { word: '発熱', reading: 'はつねつ', meaning: '体温が高い（sốt）', example: '37.5℃以上は発熱' },
        { word: '頻脈', reading: 'ひんみゃく', meaning: '脈が速い（nhịp tim nhanh）', example: '100回以上は頻脈' },
        { word: 'SpO2', reading: 'えすぴーおーつー', meaning: '血中酸素飽和度（độ bão hòa oxy）', example: 'SpO2が94%以下は異常' },
        { word: '収縮期血圧', reading: 'しゅうしゅくきけつあつ', meaning: '上の血圧（huyết áp tâm thu）', example: '収縮期血圧140以上は高血圧' },
        { word: '拡張期血圧', reading: 'かくちょうきけつあつ', meaning: '下の血圧（huyết áp tâm trương）', example: '拡張期血圧90以上は高血圧' },
      ],
      examples: [
        { japanese: '「鈴木ナース、田中様のバイタルを報告します。体温37.8℃、血圧152/94、脈拍88、SpO295%です。体温と血圧がやや高めです。ご確認をお願いします。」', reading: 'すずきなーす、たなかさまのばいたるをほうこくします。たいおんさんじゅうしちどはちぶ、けつあつひゃくごじゅうに、きゅうじゅうし、みゃくはくはちじゅうはち、えすぴーおーつーきゅうじゅうごぱーせんとです。', translation: '"Y tá Suzuki ơi, tôi báo cáo dấu hiệu sinh tồn của ông Tanaka. Nhiệt độ 37,8°C, huyết áp 152/94, mạch 88, SpO2 95%. Nhiệt độ và huyết áp hơi cao. Nhờ xác nhận giúp."' },
      ],
      grammarNote: `【バイタル報告の順番と表現】
1. 「〇〇様のバイタルを報告します」
2. 「体温〇〇度」「血圧〇〇の〇〇」「脈拍〇〇」「SpO2〇〇パーセント」
3. 「〇〇がやや高め/低めです」
4. 「ご確認をお願いします/指示をお願いします」

【血圧の読み方】
120/80 = 「百二十のはちじゅう」or「上が百二十、下がはちじゅう」`,
      quiz: {
        question: '体温が38.2℃の場合の適切な対応は？',
        options: [
          { id: 'a', text: '正常なので記録だけする' },
          { id: 'b', text: '発熱があるため、すぐにナース・上司に報告する' },
          { id: 'c', text: '自分で判断して解熱剤を渡す' },
          { id: 'd', text: '様子を見て何もしない' },
        ],
        correctId: 'b',
        explanation: '38℃以上は高熱。37.5℃以上を発熱と判断し、看護師・上司への報告が必要です。自己判断で薬を渡すことは禁止されています。\n38°C trở lên là sốt cao. 37,5°C trở lên là sốt, cần báo cáo y tá/cấp trên. Nghiêm cấm tự ý đưa thuốc.',
      },
      xpReward: 50,
    },
  },

  // ===== 就職面接 =====
  'pro-04': {
    courseTitle: { ja: '就職面接 実践演習 〜介護・医療職〜', vi: 'Luyện phỏng vấn xin việc - Điều dưỡng & y tế' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '介護施設の面接: 志望動機と自己PR',
      titleTranslation: 'Phỏng vấn cơ sở điều dưỡng: Lý do nộp đơn và tự PR bản thân',
      introduction: `介護・医療施設の就職面接では、日本語能力だけでなく、介護への情熱・チームワーク・コミュニケーション能力が評価されます。「なぜ介護の仕事をしたいのか」「自分の強みは何か」を日本語で明確に伝えられる準備が必要です。

Phỏng vấn xin việc tại cơ sở điều dưỡng và y tế không chỉ đánh giá tiếng Nhật mà còn đam mê với điều dưỡng, làm việc nhóm và khả năng giao tiếp. Cần chuẩn bị truyền đạt rõ ràng bằng tiếng Nhật "tại sao muốn làm điều dưỡng" và "điểm mạnh của bản thân là gì".`,
      keyPoints: [
        '志望動機の構成：きっかけ→経験・強み→将来の目標',
        '自己PRの構成：強み→具体的なエピソード→仕事への活かし方',
        '介護への動機：「〜がきっかけで介護に興味を持ちました」',
        'ベトナム人としての強み：「母国語・日本語・文化理解」',
        '逆質問：「御施設で働く上で大切にしていることは何ですか？」',
        '敬語の使い方：面接では常に敬語・丁寧語を使う',
      ],
      vocabulary: [
        { word: '志望動機', reading: 'しぼうどうき', meaning: '応募した理由（lý do ứng tuyển）', example: '志望動機を教えてください' },
        { word: '自己PR', reading: 'じこぴーあーる', meaning: '自分の強みをアピール（tự giới thiệu điểm mạnh）', example: '自己PRをお願いします' },
        { word: '貢献する', reading: 'こうけんする', meaning: '役に立つ（đóng góp）', example: '御施設に貢献したい' },
        { word: '向上心', reading: 'こうじょうしん', meaning: 'もっとよくなりたい気持ち（tinh thần cầu tiến）', example: '向上心があります' },
        { word: 'やりがい', reading: 'やりがい', meaning: '仕事の充実感（sự thỏa mãn trong công việc）', example: '介護のやりがいを感じる' },
      ],
      examples: [
        { japanese: '「私が介護の仕事を志望した理由は、祖父の介護を経験したことです。その時、介護士さんの優しい声かけに感動し、私も同じように人の役に立ちたいと思いました。ベトナム語・日本語を活かして、外国にルーツを持つ利用者さんの支援にも貢献できると考えています。」', reading: '', translation: '"Lý do tôi muốn làm công việc điều dưỡng là vì tôi đã có kinh nghiệm chăm sóc ông nội. Lúc đó tôi rất cảm động trước những lời hỏi thăm ân cần của nhân viên điều dưỡng và muốn được giúp ích cho người khác như vậy. Tôi nghĩ mình có thể đóng góp cho việc hỗ trợ người dùng có gốc nước ngoài bằng tiếng Việt và tiếng Nhật."' },
      ],
      grammarNote: `【面接でよく使う表現】
自己紹介：「〜と申します。本日はよろしくお願いいたします。」
志望動機：「〜がきっかけで、〜と思いました。」
強みを言う：「私の強みは〜です。例えば〜の経験から〜を学びました。」
質問への答え：「おっしゃる通りです。/ご指摘ありがとうございます。」
逆質問：「〜についてお聞きしてもよろしいでしょうか？」`,
      quiz: {
        question: '面接の「志望動機」を答えるとき、最初に入れるべき内容は？',
        options: [
          { id: 'a', text: '給与・待遇への期待' },
          { id: 'b', text: '介護に興味を持ったきっかけ・動機' },
          { id: 'c', text: '他の会社との比較' },
          { id: 'd', text: '自分の弱点' },
        ],
        correctId: 'b',
        explanation: '志望動機では「なぜこの仕事をしたいか」という動機・きっかけを最初に述べます。給与や待遇の話は志望動機には含めません。\nKhi trả lời "lý do ứng tuyển", đầu tiên nêu động cơ/cơ duyên "tại sao muốn làm công việc này".',
      },
      xpReward: 50,
    },
  },

  // ===== 看護師試験 =====
  'pro-05': {
    courseTitle: { ja: 'N2 看護師国家試験対策 日本語読解', vi: 'Luyện đọc hiểu tiếng Nhật cho kỳ thi y tá quốc gia N2' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '看護師試験の問題文読解: 医療用語と設問パターン',
      titleTranslation: 'Đọc đề thi y tá: Thuật ngữ y tế và dạng câu hỏi',
      introduction: `看護師国家試験の問題文は、専門的な医療用語と複雑な日本語表現が混在します。「〜について正しいのはどれか」「〜に対して最も優先されるのはどれか」などの設問パターンを理解し、問題の意図を正確に読み取ることが合格への鍵です。

Đề thi y tá quốc gia kết hợp thuật ngữ y tế chuyên môn và biểu đạt tiếng Nhật phức tạp. Hiểu các dạng câu hỏi như "Cái nào đúng về..." và "Điều gì được ưu tiên nhất..." và đọc chính xác ý định của câu hỏi là chìa khóa để đỗ.`,
      keyPoints: [
        '設問パターン1：「〜について正しいのはどれか」= 知識を問う',
        '設問パターン2：「最も適切なのはどれか」= 判断力を問う',
        '設問パターン3：「最初に行うのはどれか」= 優先順位を問う',
        '否定設問：「誤っているのはどれか」「適切でないのはどれか」',
        '文脈から専門用語の意味を推測する',
        '長文問題：患者情報を整理してから設問を読む',
      ],
      vocabulary: [
        { word: '浮腫', reading: 'ふしゅ', meaning: 'むくみ（phù nề）', example: '下肢に浮腫がある' },
        { word: '貧血', reading: 'ひんけつ', meaning: '血液中のヘモグロビンが少ない（thiếu máu）', example: '鉄欠乏性貧血' },
        { word: '起立性低血圧', reading: 'きりつせいていけつあつ', meaning: '立つと血圧が下がる（hạ huyết áp tư thế）', example: '起立性低血圧に注意する' },
        { word: '褥瘡', reading: 'じょくそう', meaning: '床ずれ（loét do tỳ đè）', example: '褥瘡の予防が重要' },
        { word: '誤嚥', reading: 'ごえん', meaning: '食べ物が気管に入る（hít sặc）', example: '誤嚥リスクのある患者' },
      ],
      examples: [
        { japanese: '【問題例】80歳の女性。骨粗鬆症で入院中。転倒リスクが高い。看護師が最初に行うべきことはどれか。1.骨密度検査 2.転倒リスクアセスメント実施 3.家族への連絡 4.安静指示', reading: '', translation: '【Ví dụ】Phụ nữ 80 tuổi. Đang nhập viện vì loãng xương. Nguy cơ té ngã cao. Điều y tá cần làm đầu tiên là gì? 1.Kiểm tra mật độ xương 2.Đánh giá nguy cơ té ngã 3.Liên hệ gia đình 4.Hướng dẫn nghỉ ngơi' },
      ],
      grammarNote: `【試験問題の読み方】
Step1: 患者情報を整理（年齢・性別・診断名・症状）
Step2: 設問パターンを確認（正しい・最も適切・最初に・誤り）
Step3: 選択肢を読む前に自分で答えを考える
Step4: 各選択肢を根拠をもって判断する

【「最も優先される」問題の考え方】
→ ABC（気道・呼吸・循環）が最優先
→ 安全・安楽・患者の意思を考慮`,
      quiz: {
        question: '「誤っているのはどれか」という設問への対応として正しいのは？',
        options: [
          { id: 'a', text: '正しい選択肢を探す' },
          { id: 'b', text: '誤り（間違い）の選択肢を探す' },
          { id: 'c', text: '最も重要な選択肢を探す' },
          { id: 'd', text: '全て正しいかどうか確認する' },
        ],
        correctId: 'b',
        explanation: '「誤っているのはどれか」は他の設問と逆で、間違いを選ぶ問題です。見落としやすいので、設問をよく確認してから回答しましょう。\n「誤っているのはどれか」là ngược lại — tìm đáp án SAI. Dễ bỏ sót nên cần đọc kỹ câu hỏi.',
      },
      xpReward: 50,
    },
  },

  // ===== 医療ソーシャルワーカー =====
  'pro-06': {
    courseTitle: { ja: '医療ソーシャルワーカーの日本語', vi: 'Tiếng Nhật công tác xã hội y tế' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '退院支援の日本語 — 患者・家族への説明',
      titleTranslation: 'Tiếng Nhật hỗ trợ xuất viện — Giải thích cho bệnh nhân và gia đình',
      introduction: `医療ソーシャルワーカー（MSW）は、患者さんの退院後の生活を支援する専門職です。複雑な福祉制度を患者さんと家族に分かりやすく説明する日本語力が必要です。「介護保険・障害者サービス・生活保護」などの制度説明を専門用語と平易な言葉を使い分けて説明できることが求められます。

Nhân viên công tác xã hội y tế (MSW) là chuyên gia hỗ trợ cuộc sống sau xuất viện của bệnh nhân. Cần tiếng Nhật để giải thích rõ ràng các chế độ phúc lợi phức tạp cho bệnh nhân và gia đình. Cần có khả năng giải thích chế độ 介護保険・障害者サービス vừa dùng thuật ngữ chuyên môn vừa dùng ngôn ngữ đơn giản.`,
      keyPoints: [
        '退院支援の目的：患者さんが安全に退院後の生活を送れるよう準備',
        '介護保険制度：65歳以上・40〜64歳（特定疾病）が利用可能',
        '要介護認定：要支援1〜2・要介護1〜5の7段階',
        '在宅サービス：訪問介護・訪問看護・デイサービス・ショートステイ',
        '施設サービス：特別養護老人ホーム・老人保健施設',
        '家族への説明：専門用語をかみ砕いて分かりやすく説明する',
      ],
      vocabulary: [
        { word: '退院支援', reading: 'たいいんしえん', meaning: '退院後の生活を支援（hỗ trợ sau xuất viện）', example: '退院支援計画を立てる' },
        { word: '介護保険', reading: 'かいごほけん', meaning: '介護サービスの公的保険（bảo hiểm chăm sóc）', example: '介護保険を申請する' },
        { word: '要介護認定', reading: 'ようかいごにんてい', meaning: '介護の必要度を認定（đánh giá mức độ cần chăm sóc）', example: '要介護2の認定を受ける' },
        { word: '訪問介護', reading: 'ほうもんかいご', meaning: '自宅に来て介護（dịch vụ chăm sóc tại nhà）', example: '週3回の訪問介護' },
        { word: 'ケアマネジャー', reading: 'けあまねじゃー', meaning: 'ケアプランを作る専門家（quản lý chăm sóc）', example: 'ケアマネジャーに相談する' },
      ],
      examples: [
        { japanese: '「お父様の退院後の生活についてご説明させていただきます。介護保険という制度を使って、自宅でもヘルパーさんに来てもらうことができます。まずは役所に申請が必要です。お手伝いできますが、いかがでしょうか？」', reading: '', translation: '"Để tôi giải thích về cuộc sống của cha bạn sau khi xuất viện. Sử dụng chế độ bảo hiểm chăm sóc, có thể nhận người hỗ trợ đến nhà. Trước tiên cần đăng ký ở cơ quan chức năng. Tôi có thể giúp đỡ, bạn thấy thế nào?"' },
      ],
      grammarNote: `【福祉制度の説明で使う表現】
導入：「〜という制度があります」「〜を利用することができます」
条件：「〜歳以上の方が対象です」「〜の場合に使えます」
手続き：「まず〜に申請します」「次に〜が必要です」
費用：「自己負担は〜です」「保険適用で〜になります」
提案：「〜はいかがでしょうか？ご検討ください」`,
      quiz: {
        question: '介護保険サービスを利用するために最初に必要なことは？',
        options: [
          { id: 'a', text: 'ケアマネジャーに連絡する' },
          { id: 'b', text: '市区町村に要介護認定の申請をする' },
          { id: 'c', text: '病院のソーシャルワーカーに相談する' },
          { id: 'd', text: '特別養護老人ホームに入居する' },
        ],
        correctId: 'b',
        explanation: '介護保険サービス利用には「要介護認定」が必要。申請先は市区町村（役所）。認定を受けてからケアマネジャーを選び、ケアプランを作成します。\nĐể sử dụng dịch vụ bảo hiểm chăm sóc cần "đánh giá mức độ cần chăm sóc". Nộp đơn ở UBND. Sau đó chọn quản lý chăm sóc và lập kế hoạch.',
      },
      xpReward: 50,
    },
  },

  // ===== 外国人患者対応 =====
  'pro-07': {
    courseTitle: { ja: '外国人患者対応の日本語 〜文化的配慮〜', vi: 'Tiếng Nhật tiếp nhận bệnh nhân nước ngoài - Chú ý văn hóa' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '外国人患者への対応と文化的配慮',
      titleTranslation: 'Tiếp nhận bệnh nhân nước ngoài và chú ý văn hóa',
      introduction: `日本の医療機関でも外国人患者が増えています。文化・宗教・言語の違いを理解した上で適切な対応をすることが求められます。特に食事制限（ハラール・ベジタリアン）・宗教的慣習・インフォームドコンセントの文化差への配慮が重要です。

Số bệnh nhân nước ngoài tại các cơ sở y tế Nhật Bản đang tăng. Cần xử lý phù hợp với sự hiểu biết về sự khác biệt về văn hóa, tôn giáo và ngôn ngữ. Đặc biệt quan trọng là chú ý đến hạn chế ăn uống (Halal, chay), tập tục tôn giáo và sự khác biệt văn hóa trong thông báo đồng ý điều trị.`,
      keyPoints: [
        '食事制限への対応：「宗教上の食事制限はございますか？」',
        'ハラール食：イスラム教徒はアルコール・豚肉を避ける',
        '宗教的な配慮：礼拝の時間・方向・場所への配慮',
        '通訳ツールの活用：翻訳アプリ・医療通訳サービスの利用',
        '文化差への理解：直接的な表現を好む文化・間接的な文化',
        '家族の決定権：国によっては家族が医療の意思決定をする',
      ],
      vocabulary: [
        { word: 'ハラール', reading: 'はらーる', meaning: 'イスラム法で許可された食品（thực phẩm Halal）', example: 'ハラール食を提供する' },
        { word: '宗教上の理由', reading: 'しゅうきょうじょうのりゆう', meaning: '宗教的な事情（lý do tôn giáo）', example: '宗教上の理由で食べられない' },
        { word: '文化的背景', reading: 'ぶんかてきはいけい', meaning: '文化からくる背景（nền tảng văn hóa）', example: '文化的背景を理解する' },
        { word: '多言語対応', reading: 'たげんごたいおう', meaning: '複数の言語で対応する（hỗ trợ đa ngôn ngữ）', example: '多言語対応の案内板' },
        { word: 'インフォームドコンセント', reading: 'いんふぉーむどこんせんと', meaning: '説明と同意（thông báo và đồng ý）', example: 'ICをしっかり行う' },
      ],
      examples: [
        { japanese: '「食事についてお伺いします。宗教上の理由やアレルギーなどで食べられないものはございますか？ハラール食のご用意もできます。」', reading: 'しょくじについておうかがいします。しゅうきょうじょうのりゆうやあれるぎーなどでたべられないものはございますか？はらーるしょくのごようしいもできます。', translation: '"Cho tôi hỏi về bữa ăn. Có thứ gì không ăn được vì lý do tôn giáo hoặc dị ứng không? Chúng tôi cũng có thể chuẩn bị thức ăn Halal."' },
        { japanese: '「お祈りの時間や場所について、何かご要望はございますか？できる限りご対応いたします。」', reading: 'おいのりのじかんやばしょについて、なにかごようぼうはございますか？できるかぎりごたいおういたします。', translation: '"Về thời gian và nơi cầu nguyện, bạn có yêu cầu gì không? Chúng tôi sẽ cố gắng đáp ứng hết mức có thể."' },
      ],
      grammarNote: `【外国人対応のコミュニケーション工夫】
やさしい日本語を使う：
・専門用語を避ける / 短い文にする
・「〜してください」ではなく「〜お願いします」
・絵・写真・ジェスチャーを活用

確認の取り方：
・「分かりましたか？」ではなく「〜はどういう意味ですか？」と聞く
・「はい」の返事が「理解した」とは限らない

通訳サービス：
・医療通訳電話サービス（みんなの日本語）
・タブレット・タブレット翻訳アプリ`,
      quiz: {
        question: '外国人患者への対応で「やさしい日本語」の特徴は？',
        options: [
          { id: 'a', text: '専門用語を多く使う' },
          { id: 'b', text: '短い文・簡単な語彙・具体的な表現を使う' },
          { id: 'c', text: 'できるだけ敬語を使う' },
          { id: 'd', text: '英語を混ぜる' },
        ],
        correctId: 'b',
        explanation: '「やさしい日本語」は専門用語を避け、短い文・簡単な言葉・具体的な表現を使い、外国人や高齢者にも分かりやすく伝える日本語です。\n「やさしい日本語」là tiếng Nhật dễ hiểu: tránh thuật ngữ, dùng câu ngắn, từ ngữ đơn giản và biểu đạt cụ thể.',
      },
      xpReward: 50,
    },
  },

  // ===== 医療通訳 =====
  'pro-02': {
    courseTitle: { ja: '医療通訳 入門コース', vi: 'Khóa nhập môn phiên dịch y tế' },
    isLocked: false,
    requiredPlan: 'pro',
    lesson: {
      title: '医療通訳の基礎 — 診察室でのやりとり',
      titleTranslation: 'Nền tảng phiên dịch y tế — Hội thoại trong phòng khám',
      introduction: `医療通訳は、医師と患者の間で言語だけでなく文化・価値観の橋渡しをする専門職です。Dungさんも「医師の言葉を正確に訳すだけでなく、患者さんが本当に理解しているか確認することが大切」と言っています。

診察室での通訳は「逐次通訳（一文ずつ訳す）」が基本です。医師の言葉・患者の言葉、どちらも正確に伝えることが求められます。

Phiên dịch y tế là nghề bắc cầu không chỉ ngôn ngữ mà còn cả văn hóa và giá trị quan giữa bác sĩ và bệnh nhân. Dung cũng nói: "Không chỉ dịch chính xác lời bác sĩ mà còn cần xác nhận bệnh nhân có thực sự hiểu không".`,
      keyPoints: [
        '逐次通訳の原則：医師が話したら止めてもらい、正確に訳す（一文ずつ）',
        '医師への依頼：「すみません、少し止めていただけますか？（phiên dịch yêu cầu dừng lại）」',
        '確認技法：「〜というのは、〜という意味ですよ、分かりましたか？」',
        '中立性を保つ：通訳者自身の意見は入れない（患者の代わりに意思決定しない）',
        '専門用語の通訳：まず正確な訳、必要なら平易な説明を付加',
        '感情の通訳：患者の不安・怒りも言葉に含めて通訳する',
      ],
      vocabulary: [
        { word: '診察', reading: 'しんさつ', meaning: '医師による検査（khám bệnh）', example: '今日は初診です' },
        { word: '症状', reading: 'しょうじょう', meaning: '病気の状態（triệu chứng）', example: '症状を教えてください' },
        { word: '処方箋', reading: 'しょほうせん', meaning: '薬の処方書（đơn thuốc）', example: '処方箋を薬局に持っていく' },
        { word: 'インフォームドコンセント', reading: 'いんふぉーむどこんせんと', meaning: '説明と同意（thông báo đồng ý điều trị）', example: '手術前のIC（IC = IC、đồng ý điều trị）' },
        { word: '既往歴', reading: 'きおうれき', meaning: '過去の病気（tiền sử bệnh）', example: '既往歴を確認する' },
        { word: 'アレルギー', reading: 'あれるぎー', meaning: 'アレルギー（dị ứng）', example: '薬のアレルギーはありますか' },
      ],
      examples: [
        {
          japanese: '先生：「どんな症状がありますか？」→ 通訳：「Bạn có triệu chứng gì?」',
          reading: 'せんせい：「どんなしょうじょうがありますか？」',
          translation: '医師の質問を患者の言語に訳す基本例',
        },
        {
          japanese: '患者：「Tôi bị đau bụng từ sáng」→ 通訳：「朝から腹痛があります」',
          reading: 'かんじゃ：（ベトナム語）→ つうやく：「あさからふくつうがあります」',
          translation: '患者の言葉を医師の言語に訳す例',
        },
        {
          japanese: '先生、少々お待ちください。確認させてください。（通訳が医師に依頼）',
          reading: 'せんせい、しょうしょうおまちください。かくにんさせてください。',
          translation: 'Thưa bác sĩ, cho tôi một chút. Để tôi xác nhận lại.',
        },
        {
          japanese: '〇〇さん、先生は「手術が必要です」とおっしゃっています。分かりましたか？',
          reading: 'せんせいは「しゅじゅつがひつようです」とおっしゃっています。わかりましたか？',
          translation: 'Thưa anh/chị XX, bác sĩ nói "cần phẫu thuật". Anh/chị hiểu chưa?',
        },
      ],
      grammarNote: `【医療通訳でよく使う表現】
依頼する：
・「〜していただけますか」= Nhờ bác sĩ/bệnh nhân...
・「少々お待ちください」= Cho tôi một chút

確認する：
・「〜というのは〜ということですね？」= ... có nghĩa là ... đúng không?
・「もう一度おっしゃっていただけますか」= Xin nhắc lại được không?

中立の立場を示す：
・「通訳として申し上げますが...」= Tôi nói với tư cách phiên dịch...
・「先生がおっしゃるには...」= Theo lời bác sĩ...`,
      quiz: {
        question: '医療通訳の正しい姿勢として最も適切なものは？',
        options: [
          { id: 'a', text: '患者の代わりに医師の説明が正しいかどうか判断する' },
          { id: 'b', text: '医師と患者の言葉を中立的・正確に通訳し、必要な確認を行う' },
          { id: 'c', text: '通訳中に自分の医療知識を加えて補足説明する' },
          { id: 'd', text: '患者の代わりに医師に治療方針を決めてもらう' },
        ],
        correctId: 'b',
        explanation: '医療通訳者は中立を保ち、双方の言葉を正確に通訳することが原則です。自分の判断や意見を入れると信頼関係が崩れます。\nPhiên dịch y tế cần giữ trung lập và dịch chính xác lời của cả hai bên.',
      },
      xpReward: 50,
    },
  },

  // ===== N5 文法 =====
  'n5-03': {
    courseTitle: { ja: 'N5 基礎文法 〜です・ます体〜', vi: 'Ngữ pháp cơ bản N5 - thể lịch sự' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N5文法: です・ます体と助詞は・が・を',
      titleTranslation: 'Ngữ pháp N5: Thể lịch sự và trợ từ は・が・を',
      introduction: `日本語の丁寧な話し方「です・ます体」は、職場・初対面・目上の人との会話で必須です。介護現場では利用者さんや上司に対して常にです・ます体を使います。

「です・ます体」(thể lịch sự) là cách nói lịch sự trong tiếng Nhật, bắt buộc khi nói chuyện nơi làm việc, gặp lần đầu, hoặc với người trên. Trong môi trường điều dưỡng, luôn dùng thể này với người được chăm sóc và cấp trên.`,
      keyPoints: [
        '名詞文：〜は〜です（例：わたしはベトナム人です）',
        '動詞文：ます形（例：食べます・飲みます・行きます）',
        '助詞は：テーマを示す（「わたしは〜」「今日は〜」）',
        '助詞が：主語を強調（「これが薬です」「だれが来ましたか？」）',
        '助詞を：動作の対象（「薬を飲む」「ご飯を食べる」「廊下を歩く」）',
        '否定形：〜ません（飲みません）、〜ではありません（医者ではありません）',
      ],
      vocabulary: [
        { word: '飲みます', reading: 'のみます', meaning: '飲む（uống）', example: '薬を飲みます' },
        { word: '食べます', reading: 'たべます', meaning: '食べる（ăn）', example: 'ご飯を食べます' },
        { word: '行きます', reading: 'いきます', meaning: '行く（đi）', example: 'トイレに行きます' },
        { word: '起きます', reading: 'おきます', meaning: '起きる（thức dậy）', example: '7時に起きます' },
        { word: '休みます', reading: 'やすみます', meaning: '休む（nghỉ）', example: 'ゆっくり休みます' },
        { word: '手伝います', reading: 'てつだいます', meaning: '手伝う（giúp đỡ）', example: 'お着替えを手伝います' },
      ],
      examples: [
        { japanese: 'わたしはベトナムから来ました。', reading: 'わたしはベトナムからきました。', translation: 'Tôi đến từ Việt Nam.' },
        { japanese: '毎朝7時に薬を飲みます。', reading: 'まいあさしちじにくすりをのみます。', translation: 'Mỗi sáng uống thuốc lúc 7 giờ.' },
        { japanese: 'お体の具合はよくありません。', reading: 'おからだのぐあいはよくありません。', translation: 'Tình trạng sức khỏe không tốt.' },
        { japanese: 'これがお部屋の鍵です。', reading: 'これがおへやのかぎです。', translation: 'Đây là chìa khóa phòng.' },
      ],
      grammarNote: `【です・ます体の活用】
現在肯定：〜ます（飲みます）
現在否定：〜ません（飲みません）
過去肯定：〜ました（飲みました）
過去否定：〜ませんでした（飲みませんでした）

【助詞まとめ】
は = テーマ・対比 / が = 主語強調 / を = 動作対象
に = 場所・時間・方向 / で = 手段・場所（動作）`,
      quiz: {
        question: '正しい文はどれですか？',
        options: [
          { id: 'a', text: '薬は飲みます（を→は）' },
          { id: 'b', text: '薬を飲みます' },
          { id: 'c', text: '薬が飲みます' },
          { id: 'd', text: '薬に飲みます' },
        ],
        correctId: 'b',
        explanation: '「を」は動作の対象を表す助詞。「薬を飲む」のように、何を飲むかを示します。\n「を」là trợ từ chỉ đối tượng của hành động. "薬を飲む" = uống thuốc.',
      },
      xpReward: 20,
    },
  },

  // ===== N5 会話 =====
  'n5-04': {
    courseTitle: { ja: 'N5 日常会話 はじめの一歩', vi: 'Hội thoại hàng ngày N5 - Bước đầu tiên' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N5会話: 自己紹介と挨拶',
      titleTranslation: 'Hội thoại N5: Tự giới thiệu và chào hỏi',
      introduction: `日本語の挨拶と自己紹介は人間関係の基本です。介護の仕事では、利用者さん・ご家族・同僚に毎日挨拶します。正しい挨拶は信頼関係を作る第一歩です。

Lời chào và tự giới thiệu trong tiếng Nhật là nền tảng của quan hệ con người. Trong công việc điều dưỡng, bạn chào hỏi người được chăm sóc, gia đình họ và đồng nghiệp mỗi ngày.`,
      keyPoints: [
        '朝の挨拶：おはようございます（丁寧）/ おはよう（親しい相手）',
        '昼・夜：こんにちは（昼）/ こんばんは（夜）',
        '自己紹介：はじめまして。〜と申します。よろしくお願いします。',
        '出勤時：おはようございます / 退勤時：お疲れ様でした',
        '感謝：ありがとうございます / 謝罪：すみません・申し訳ありません',
        '返事：はい（yes）/ いいえ（no）/ そうですか（I see）',
      ],
      vocabulary: [
        { word: 'はじめまして', reading: 'はじめまして', meaning: 'はじめて会う（Xin chào lần đầu）', example: 'はじめまして、グエンです' },
        { word: '申します', reading: 'もうします', meaning: '〜という（tên tôi là...）', example: 'グエンと申します' },
        { word: 'よろしく', reading: 'よろしく', meaning: 'お願いします（nhờ vả）', example: 'よろしくお願いします' },
        { word: 'お疲れ様', reading: 'おつかれさま', meaning: 'お仕事お疲れ様（Cảm ơn vì đã vất vả）', example: 'お疲れ様でした' },
        { word: '失礼します', reading: 'しつれいします', meaning: '失礼（xin phép/xin lỗi）', example: '失礼します（部屋に入るとき）' },
      ],
      examples: [
        { japanese: 'はじめまして。グエンと申します。ベトナムから来ました。よろしくお願いします。', reading: 'はじめまして。グエンともうします。ベトナムからきました。よろしくおねがいします。', translation: 'Xin chào. Tôi tên là Nguyễn. Tôi đến từ Việt Nam. Rất vui được làm quen.' },
        { japanese: 'おはようございます。今日もよろしくお願いします。', reading: 'おはようございます。きょうもよろしくおねがいします。', translation: 'Chào buổi sáng. Hôm nay cũng nhờ mọi người nhiều nhé.' },
        { japanese: 'お疲れ様でした。また明日よろしくお願いします。', reading: 'おつかれさまでした。またあしたよろしくおねがいします。', translation: 'Cảm ơn vì đã vất vả. Ngày mai cũng nhờ mọi người nhé.' },
      ],
      grammarNote: `【状況別挨拶まとめ】
朝（〜10時）：おはようございます
昼（10時〜17時）：こんにちは
夜（17時〜）：こんばんは
別れ：さようなら / またね（親しい）/ 失礼します（正式）
就寝前：おやすみなさい

【敬語の度合い】
おはよう < おはようございます
ありがとう < ありがとうございます
すみません < 申し訳ありません`,
      quiz: {
        question: '職場で上司に言う正しい退勤の挨拶は？',
        options: [
          { id: 'a', text: 'バイバイ！' },
          { id: 'b', text: 'お疲れ様でした' },
          { id: 'c', text: 'じゃあね' },
          { id: 'd', text: 'また明日' },
        ],
        correctId: 'b',
        explanation: '「お疲れ様でした」は職場での退勤時・仕事終わりの標準的な挨拶です。上司・同僚に使えます。\n「お疲れ様でした」là lời chào chuẩn khi kết thúc ca làm trong môi trường làm việc.',
      },
      xpReward: 20,
    },
  },

  // ===== N5 漢字 =====
  'n5-05': {
    courseTitle: { ja: 'N5 漢字入門 〜80字〜', vi: 'Nhập môn Kanji N5 - 80 chữ' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N5漢字: 人・日・時・体・食',
      titleTranslation: 'Kanji N5: 人・日・時・体・食 — Thường dùng trong điều dưỡng',
      introduction: `N5の漢字80字の中で、介護現場で最もよく使う5つの漢字を学びます。「人・日・時・体・食」はケア記録や日常会話に毎日登場します。

Trong 80 chữ Kanji N5, hãy học 5 chữ dùng nhiều nhất trong môi trường điều dưỡng: 人・日・時・体・食. Các chữ này xuất hiện hàng ngày trong hồ sơ chăm sóc và giao tiếp hàng ngày.`,
      keyPoints: [
        '人（ひと・じん・にん）: 人（ひと）、日本人（にほんじん）、一人（ひとり）',
        '日（ひ・にち・じつ）: 今日（きょう）、毎日（まいにち）、日曜日（にちようび）',
        '時（とき・じ）: 時間（じかん）、何時（なんじ）、時々（ときどき）',
        '体（からだ・たい）: 体（からだ）、体温（たいおん）、体調（たいちょう）',
        '食（しょく・た）: 食事（しょくじ）、食べる（たべる）、食後（しょくご）',
      ],
      vocabulary: [
        { word: '一人', reading: 'ひとり', meaning: '1人（một người）', example: '一人で歩く' },
        { word: '毎日', reading: 'まいにち', meaning: '毎日（mỗi ngày）', example: '毎日薬を飲む' },
        { word: '体温', reading: 'たいおん', meaning: '体の温度（nhiệt độ cơ thể）', example: '体温を測る' },
        { word: '食後', reading: 'しょくご', meaning: '食事の後（sau bữa ăn）', example: '食後に薬を飲む' },
        { word: '時間', reading: 'じかん', meaning: '時間（thời gian）', example: 'お食事の時間' },
        { word: '体調', reading: 'たいちょう', meaning: '体の状態（tình trạng sức khỏe）', example: '体調はいかがですか' },
      ],
      examples: [
        { japanese: '体温は36度です。食後に薬を飲んでください。', reading: 'たいおんは36どです。しょくごにくすりをのんでください。', translation: 'Nhiệt độ cơ thể là 36 độ. Hãy uống thuốc sau bữa ăn.' },
        { japanese: '今日は一人で食事ができました。', reading: 'きょうはひとりでしょくじができました。', translation: 'Hôm nay đã tự ăn được một mình.' },
        { japanese: '毎日の体調チェックが大切です。', reading: 'まいにちのたいちょうちぇっくがたいせつです。', translation: 'Kiểm tra sức khỏe hàng ngày rất quan trọng.' },
      ],
      grammarNote: `【漢字の読み方パターン】
音読み（おんよみ）= 中国語由来の読み方 → 熟語に多い
訓読み（くんよみ）= 日本語の読み方 → 単独使用に多い

例：体（からだ）訓読み ← 単独
   体温（たいおん）音読み ← 熟語

【介護で毎日使う漢字熟語】
体温・体調・食事・食後・時間・毎日・一人・本人`,
      quiz: {
        question: '「食後」の読み方は？',
        options: [
          { id: 'a', text: 'たべご' },
          { id: 'b', text: 'しょくご' },
          { id: 'c', text: 'しょくこう' },
          { id: 'd', text: 'たべあと' },
        ],
        correctId: 'b',
        explanation: '食後（しょくご）= 食事の後。「食」の音読みは「しょく」、「後」の音読みは「ご・こう」。食後に使うことが多い表現です。\n食後（しょくご）= sau bữa ăn. Âm on của 食 là "shoku".',
      },
      xpReward: 25,
    },
  },

  // ===== N4 語彙 =====
  'n4-01': {
    courseTitle: { ja: 'N4 語彙マスター 〜1,000語〜', vi: 'Từ vựng N4 Master - 1000 từ' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N4語彙: 介護・医療でよく使う動詞',
      titleTranslation: 'Từ vựng N4: Động từ thường dùng trong điều dưỡng & y tế',
      introduction: `N4レベルでは約1,000語の語彙が必要です。今回は介護・医療現場で最もよく使う動詞を中心に学びます。「測る・確認する・記録する・報告する」はケア業務の基本動詞です。

Cấp N4 cần khoảng 1.000 từ vựng. Lần này tập trung học các động từ dùng nhiều nhất. "測る・確認する・記録する・報告する" là động từ cơ bản trong công việc chăm sóc.`,
      keyPoints: [
        '測る（はかる）: 体温・血圧・体重を測る',
        '確認する（かくにんする）: 薬・状態・名前を確認する',
        '記録する（きろくする）: バイタル・食事量を記録する',
        '報告する（ほうこくする）: 上司・ナースに報告する',
        '介助する（かいじょする）: 食事・入浴・移動を介助する',
        '観察する（かんさつする）: 表情・様子を観察する',
      ],
      vocabulary: [
        { word: '測る', reading: 'はかる', meaning: '計測する（đo）', example: '血圧を測る' },
        { word: '確認する', reading: 'かくにんする', meaning: 'チェックする（xác nhận）', example: '薬の名前を確認する' },
        { word: '記録する', reading: 'きろくする', meaning: '書き留める（ghi chép）', example: '食事量を記録する' },
        { word: '報告する', reading: 'ほうこくする', meaning: '知らせる（báo cáo）', example: '急変を報告する' },
        { word: '観察する', reading: 'かんさつする', meaning: '注意して見る（quan sát）', example: '様子を観察する' },
        { word: '対応する', reading: 'たいおうする', meaning: '処理する（xử lý）', example: '緊急事態に対応する' },
      ],
      examples: [
        { japanese: '朝9時に血圧を測り、記録しました。', reading: 'あさくじにけつあつをはかり、きろくしました。', translation: 'Đã đo huyết áp lúc 9 giờ sáng và ghi chép lại.' },
        { japanese: '利用者さんの様子を観察し、上司に報告しました。', reading: 'りようしゃさんのようすをかんさつし、じょうしにほうこくしました。', translation: 'Đã quan sát tình trạng người dùng và báo cáo cấp trên.' },
        { japanese: '薬の種類と量を確認してから介助します。', reading: 'くすりのしゅるいとりょうをかくにんしてからかいじょします。', translation: 'Xác nhận loại và liều lượng thuốc trước khi hỗ trợ.' },
      ],
      grammarNote: `【サ変動詞の活用】
〜する → します → しました → して
例：確認する → 確認します → 確認しました

【N4重要：〜し忘れる・〜し直す・〜し続ける】
確認し忘れる = quên xác nhận
書き直す = viết lại
観察し続ける = tiếp tục quan sát`,
      quiz: {
        question: '「バイタルを（　）しました」に入る動詞は？',
        options: [
          { id: 'a', text: '食べ' },
          { id: 'b', text: '測定' },
          { id: 'c', text: '歩き' },
          { id: 'd', text: '話し' },
        ],
        correctId: 'b',
        explanation: 'バイタルサイン（体温・血圧・脈拍）は「測定（そくてい）する」が正しい表現。「測る」も使えます。\n"Dấu hiệu sinh tồn" dùng động từ 測定する hoặc 測る.',
      },
      xpReward: 25,
    },
  },

  // ===== N4 読解 =====
  'n4-03': {
    courseTitle: { ja: 'N4 読解入門 〜短文から段落へ〜', vi: 'Đọc hiểu nhập môn N4' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N4読解: 案内文・お知らせを読む',
      titleTranslation: 'Đọc hiểu N4: Đọc thông báo và hướng dẫn',
      introduction: `N4の読解では案内文・お知らせ・日常のメモなどの実用的な文章が出題されます。介護施設でもシフト表・連絡事項・研修案内など読む機会が多いです。

Đọc hiểu N4 thường có các văn bản thực dụng như thông báo, hướng dẫn, ghi chú hàng ngày. Trong cơ sở điều dưỡng cũng có nhiều dịp đọc bảng phân ca, thông báo liên lạc, thông báo đào tạo.`,
      keyPoints: [
        '設問パターン：「何のお知らせ？」「いつ？」「だれが対象？」',
        '重要情報：日付・時間・場所・条件を素早く見つける',
        '否定・条件表現に注意：「〜の場合」「〜を除いて」「〜が必要」',
        '接続語：「しかし・また・そのため・ただし・なお」',
      ],
      vocabulary: [
        { word: 'お知らせ', reading: 'おしらせ', meaning: '通知（thông báo）', example: '施設からのお知らせ' },
        { word: '対象', reading: 'たいしょう', meaning: '対象となる人（đối tượng）', example: '全スタッフが対象' },
        { word: 'ただし', reading: 'ただし', meaning: '例外・条件（tuy nhiên）', example: 'ただし、休日は除く' },
        { word: '締め切り', reading: 'しめきり', meaning: '期限（hạn chót）', example: '申し込み締め切りは金曜日' },
        { word: '必須', reading: 'ひっす', meaning: '必ず必要（bắt buộc）', example: 'エプロンの着用は必須' },
      ],
      examples: [
        { japanese: '【お知らせ】4月1日より夕食の時間が18:00から17:30に変更になります。', reading: '【おしらせ】しがつついたちよりゆうしょくのじかんがじゅうはちじからじゅうしちじさんじゅっぷんにへんこうになります。', translation: '【Thông báo】Từ ngày 1/4, giờ bữa tối sẽ đổi từ 18:00 thành 17:30.' },
        { japanese: '研修参加は全員必須です。ただし、夜勤者は翌日参加可能です。', reading: 'けんしゅうさんかはぜんいんひっすです。ただし、やきんしゃはよくじつさんかかのうです。', translation: 'Tham gia đào tạo là bắt buộc. Tuy nhiên, nhân viên trực đêm có thể tham gia hôm sau.' },
      ],
      grammarNote: `【読解のコツ】
1. タイトルと最初・最後の文を先に読む
2. 設問を先に確認する
3. 「ただし・なお・しかし」の後は重要な補足情報

【N4頻出接続表現】
また = ngoài ra / そのため = vì vậy
ただし = tuy nhiên / したがって = do đó`,
      quiz: {
        question: '「ただし、当日参加できない方は事前に連絡してください」の意味は？',
        options: [
          { id: 'a', text: '全員当日参加が必須' },
          { id: 'b', text: '当日来られない人は前もって知らせること' },
          { id: 'c', text: '当日参加は禁止' },
          { id: 'd', text: '連絡は不要' },
        ],
        correctId: 'b',
        explanation: '「ただし」は例外・条件を示します。「事前に連絡する」= 前もって知らせること。\n「ただし」chỉ ngoại lệ. 「事前に連絡する」= thông báo trước.',
      },
      xpReward: 25,
    },
  },

  // ===== N4 聴解 =====
  'n4-04': {
    courseTitle: { ja: 'N4 聴解トレーニング', vi: 'Luyện nghe N4' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N4聴解: 職場の会話を聞き取る',
      titleTranslation: 'Nghe hiểu N4: Nghe hội thoại nơi làm việc',
      introduction: `N4の聴解では日常会話・職場の会話・短いアナウンスが出ます。介護現場では申し送り・業務連絡・上司の指示を正確に聞き取ることが大切です。音の省略形に慣れましょう。

Nghe hiểu N4 có hội thoại hàng ngày, hội thoại nơi làm việc, thông báo ngắn. Cần làm quen với các dạng rút gọn của âm trong tiếng Nhật thông thường.`,
      keyPoints: [
        '音の省略：「〜ています」→「〜てます」、「〜ておく」→「〜とく」',
        '数字の聞き分け：4（し/よん）、7（しち/なな）',
        '質問パターン：「何を頼まれましたか」「何時に？」「問題は？」',
        '相づち：「はい・そうですか・なるほど・分かりました」',
      ],
      vocabulary: [
        { word: 'なるほど', reading: 'なるほど', meaning: 'I see（ra vậy）', example: 'なるほど、分かりました' },
        { word: '〜とく', reading: 'とく', meaning: '〜ておく の省略（làm sẵn）', example: '準備しとくね' },
        { word: '〜てる', reading: 'てる', meaning: '〜ている の省略（đang...）', example: '今、確認してる' },
      ],
      examples: [
        { japanese: '「バイタル、もう測った？」「まだです。今から測ります。」', reading: '「ばいたる、もうはかった？」「まだです。いまからはかります。」', translation: '"Đo dấu hiệu sinh tồn chưa?" "Chưa. Bây giờ đi đo."' },
        { japanese: '「田中さん、今日の夕食、半分しか食べなかったよ」「分かった、記録しとく」', reading: '「たなかさん、きょうのゆうしょく、はんぶんしかたべなかったよ」「わかった、きろくしとく」', translation: '"Ông Tanaka chỉ ăn một nửa bữa tối" "Hiểu rồi, tôi ghi lại"' },
      ],
      grammarNote: `【省略形まとめ】
〜ています → 〜てます / 〜てる
〜ておく → 〜とく
〜てしまう → 〜ちゃう / 〜じゃう
〜なければならない → 〜なきゃ

【注意：数字の読み方】
介護現場では誤解防止のため「よん・なな」を推奨`,
      quiz: {
        question: '「準備しとくね」の正式な表現は？',
        options: [
          { id: 'a', text: '準備してしまうね' },
          { id: 'b', text: '準備しておくね' },
          { id: 'c', text: '準備していくね' },
          { id: 'd', text: '準備してきたね' },
        ],
        correctId: 'b',
        explanation: '「しとく」は「しておく（事前にやっておく）」の口語的な省略形です。\n「しとく」là dạng rút gọn của 「しておく」(làm sẵn, làm trước).',
      },
      xpReward: 25,
    },
  },

  // ===== N4 漢字 =====
  'n4-05': {
    courseTitle: { ja: 'N4 漢字300字 完全習得', vi: 'Hoàn thiện 300 chữ Kanji N4' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N4漢字: 薬・病・院・護・祉',
      titleTranslation: 'Kanji N4: Nhóm chữ Hán y tế và phúc lợi xã hội',
      introduction: `N4の300漢字のうち、介護・医療現場で特に使用頻度が高いグループを学びます。「薬・病・院・護・祉」は記録や書類で毎日目にする漢字です。

Học nhóm Kanji N4 dùng nhiều nhất trong y tế và điều dưỡng. 薬・病・院・護・祉 xuất hiện hàng ngày trong hồ sơ và tài liệu.`,
      keyPoints: [
        '薬（くすり・やく）: 薬・薬局・薬剤師',
        '病（やまい・びょう）: 病気・病院・病棟',
        '院（いん）: 病院・入院・退院・転院',
        '護（ご）: 介護・看護・保護',
        '祉（し）: 福祉・社会福祉',
      ],
      vocabulary: [
        { word: '薬局', reading: 'やっきょく', meaning: '薬を売る店（nhà thuốc）', example: '薬局で薬を受け取る' },
        { word: '病棟', reading: 'びょうとう', meaning: '入院患者のフロア（khu bệnh viện）', example: '病棟を巡回する' },
        { word: '入院', reading: 'にゅういん', meaning: '病院に入る（nhập viện）', example: '来週入院します' },
        { word: '看護', reading: 'かんご', meaning: '病気の人の世話（điều dưỡng）', example: '看護師に報告する' },
        { word: '福祉', reading: 'ふくし', meaning: '人々の幸福（phúc lợi）', example: '社会福祉法人' },
        { word: '退院', reading: 'たいいん', meaning: '病院を出る（xuất viện）', example: '来月退院の予定' },
      ],
      examples: [
        { japanese: '病院で薬をもらい、薬局で受け取りました。', reading: 'びょういんでくすりをもらい、やっきょくでうけとりました。', translation: 'Được kê thuốc ở bệnh viện và nhận tại nhà thuốc.' },
        { japanese: '介護福祉士の資格を取るために勉強しています。', reading: 'かいごふくしし のしかくをとるためにべんきょうしています。', translation: 'Đang học để lấy chứng chỉ điều dưỡng viên phúc lợi.' },
      ],
      grammarNote: `【部首で覚える医療漢字】
疒（やまいだれ）= 病気に関係: 病・痛・疲・療
月（にくづき）= 体の部位: 体・腕・脚・胸・腰

部首を知ると新しい漢字の意味が推測できます！`,
      quiz: {
        question: '「入院」の反対語は？',
        options: [
          { id: 'a', text: '通院' },
          { id: 'b', text: '病院' },
          { id: 'c', text: '退院' },
          { id: 'd', text: '転院' },
        ],
        correctId: 'c',
        explanation: '入院（にゅういん）の反対は退院（たいいん）。通院は病院に通うこと、転院は別の病院に移ること。\nTrái nghĩa của 入院 là 退院 (xuất viện).',
      },
      xpReward: 25,
    },
  },

  // ===== N3 文法・語彙 =====
  'n3-01': {
    courseTitle: { ja: 'N3 文法・語彙総まとめ', vi: 'Tổng hợp ngữ pháp & từ vựng N3' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N3文法: 複合助詞〜に対して・〜について・〜によって',
      titleTranslation: 'Ngữ pháp N3: Trợ từ phức hợp 〜に対して・〜について・〜によって',
      introduction: `N3から複合助詞が増えます。「〜に対して・〜について・〜によって」はビジネス・職場・報告書など多くの場面で使います。介護現場では「利用者さんに対して丁寧に対応する」「状態の変化によって対応が変わる」など頻繁に使います。

Từ N3, trợ từ phức hợp tăng lên. 〜に対して・〜について・〜によって dùng trong nhiều tình huống như công việc, nơi làm việc, báo cáo. Trong điều dưỡng dùng thường xuyên như "対応利用者さんに対して丁寧に" hay "状態によって対応が変わる".`,
      keyPoints: [
        '〜に対して: 相手・対象への態度・行動（đối với, hướng tới）',
        '〜について: テーマ・話題（về, liên quan đến）',
        '〜によって: 手段・原因・違い（bởi, tùy theo, do）',
        '〜に関して: 〜についてのフォーマルな表現（liên quan đến, trang trọng hơn）',
        '〜をめぐって: 問題・議論の対象（xung quanh vấn đề）',
      ],
      vocabulary: [
        { word: '〜に対して', reading: 'にたいして', meaning: '〜に向けて（đối với）', example: '利用者さんに対して丁寧に話す' },
        { word: '〜について', reading: 'について', meaning: '〜のことで（về）', example: '薬について説明する' },
        { word: '〜によって', reading: 'によって', meaning: '〜で・〜に従って（do, tùy theo）', example: '状態によって対応が変わる' },
        { word: '〜に関して', reading: 'にかんして', meaning: '〜についての正式な表現（liên quan đến）', example: '契約に関して確認する' },
        { word: '丁寧', reading: 'ていねい', meaning: '礼儀正しい（lịch sự, cẩn thận）', example: '丁寧に対応する' },
      ],
      examples: [
        { japanese: '利用者さんに対して、常に敬語で話しましょう。', reading: 'りようしゃさんにたいして、つねにけいごではなしましょう。', translation: 'Hãy luôn nói kính ngữ với người được chăm sóc.' },
        { japanese: '認知症について、もっと勉強したいと思っています。', reading: 'にんちしょうについて、もっとべんきょうしたいとおもっています。', translation: 'Tôi muốn học thêm về chứng mất trí nhớ.' },
        { japanese: '体調によって、食事の量を調整します。', reading: 'たいちょうによって、しょくじのりょうをちょうせいします。', translation: 'Điều chỉnh lượng ăn tùy theo tình trạng sức khỏe.' },
      ],
      grammarNote: `【〜に対して / 〜について / 〜によって の違い】
に対して = 対象・相手に向けた行動・感情
  例：「患者に対して優しくする」
について = 話題・テーマ
  例：「薬について説明する」
によって = 手段・原因・人によって異なること
  例：「状態によって対応が異なる」`,
      quiz: {
        question: '「利用者さん（　）いつも丁寧に話しかけましょう」に入るのは？',
        options: [
          { id: 'a', text: 'によって' },
          { id: 'b', text: 'について' },
          { id: 'c', text: 'に対して' },
          { id: 'd', text: 'をめぐって' },
        ],
        correctId: 'c',
        explanation: '利用者さんへの態度・行動を示すので「に対して」が正解。「について」はテーマ、「によって」は手段・違い。\n「に対して」chỉ thái độ, hành động hướng tới đối tượng.',
      },
      xpReward: 30,
    },
  },

  // ===== N3 読解 =====
  'n3-02': {
    courseTitle: { ja: 'N3 読解練習 〜新聞・説明文〜', vi: 'Luyện đọc N3 - Báo và văn bản thông tin' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N3読解: 説明文の構造を読む',
      titleTranslation: 'Đọc hiểu N3: Đọc cấu trúc văn bản thông tin',
      introduction: `N3の読解では、説明文・論説文・新聞記事などが出ます。「話題提示→説明→まとめ」という文章の流れを理解することが重要です。介護職では研修資料・ケアプラン・医療情報を読む機会が多いです。

Đọc hiểu N3 có văn bản thông tin, văn nghị luận, bài báo. Quan trọng là hiểu cấu trúc "đưa ra chủ đề → giải thích → tổng kết". Trong ngành điều dưỡng, thường xuyên đọc tài liệu đào tạo, kế hoạch chăm sóc, thông tin y tế.`,
      keyPoints: [
        '文章の構造：話題提示 → 説明・例示 → まとめ・主張',
        '話題文を見つける：段落の最初か最後の文が多い',
        '指示語に注意：「この・その・これ・それ」が何を指すか確認',
        '論理の流れ：「なぜなら・したがって・一方・しかし」',
        '筆者の主張を見つける：「〜と思う・〜べきだ・〜が大切だ」',
      ],
      vocabulary: [
        { word: '一方', reading: 'いっぽう', meaning: '他方・反対に（mặt khác）', example: '入院患者が増える一方、スタッフが不足している' },
        { word: 'したがって', reading: 'したがって', meaning: 'そのため（do đó）', example: 'したがって、予防が大切だ' },
        { word: '〜べき', reading: 'べき', meaning: '〜しなければならない（nên, phải）', example: '安全を確保すべきだ' },
        { word: 'なぜなら', reading: 'なぜなら', meaning: 'その理由は（vì rằng）', example: 'なぜなら高齢化が進んでいるからだ' },
        { word: '課題', reading: 'かだい', meaning: '問題・テーマ（vấn đề, thách thức）', example: '介護の課題は多い' },
      ],
      examples: [
        { japanese: '日本では高齢化が急速に進んでいる。したがって、介護士の需要が高まっている。外国人介護士の受け入れは、この課題への一つの解決策と言える。', reading: 'にほんではこうれいかがきゅうそくにすすんでいる。したがって、かいごしのじゅようがたかまっている。', translation: 'Nhật Bản đang già hóa dân số nhanh chóng. Do đó, nhu cầu điều dưỡng viên đang tăng cao. Tiếp nhận điều dưỡng viên nước ngoài có thể nói là một giải pháp cho thách thức này.' },
      ],
      grammarNote: `【説明文の読み方ステップ】
1. 段落の数を確認する
2. 各段落の最初の文を読む（トピックセンテンス）
3. 接続語（したがって・一方・なぜなら）を確認
4. 最終段落に筆者の主張が集中する

【N3頻出表現】
〜べきだ = should / 〜に違いない = must be
〜とは限らない = not always / 〜に過ぎない = nothing but`,
      quiz: {
        question: '「したがって」の使い方として正しいものは？',
        options: [
          { id: 'a', text: '二つの反対の事実を並べる' },
          { id: 'b', text: '前の内容の結果や結論を示す' },
          { id: 'c', text: '例外を示す' },
          { id: 'd', text: '質問を示す' },
        ],
        correctId: 'b',
        explanation: '「したがって」は前の内容から導かれる結論・結果を示す接続詞です。「そのため・だから」と同じ意味で、書き言葉でよく使います。\n「したがって」là liên từ chỉ kết quả/kết luận được rút ra từ nội dung trước.',
      },
      xpReward: 30,
    },
  },

  // ===== N3 聴解 =====
  'n3-03': {
    courseTitle: { ja: 'N3 聴解・速読トレーニング', vi: 'Luyện nghe & đọc nhanh N3' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N3聴解: 長めの会話と場面理解',
      titleTranslation: 'Nghe hiểu N3: Hội thoại dài và hiểu bối cảnh',
      introduction: `N3の聴解では長めの会話・電話・アナウンスなどが出ます。「この会話はどんな場面か」「話者の感情・意図は何か」を理解することが求められます。介護現場では電話応対・申し送り・ケアカンファレンスでの会話理解が重要です。

Nghe hiểu N3 có hội thoại dài hơn, điện thoại, thông báo. Cần hiểu "đây là tình huống gì" và "cảm xúc, ý định của người nói là gì". Trong điều dưỡng, hiểu hội thoại qua điện thoại, bàn giao ca, hội nghị chăm sóc rất quan trọng.`,
      keyPoints: [
        '場面を把握：誰が誰に・どこで・何の目的で話しているか',
        '感情を読む：声のトーン・言葉遣いから感情を判断',
        '意図を理解：依頼・提案・断り・謝罪の区別',
        '長い会話：最初と最後に重要情報が集中することが多い',
        '間接表現：「〜ちょっと...」= 断り、「〜かもしれません」= 不確かさ',
      ],
      vocabulary: [
        { word: 'ご連絡', reading: 'ごれんらく', meaning: '連絡（liên lạc - kính ngữ）', example: 'ご連絡ありがとうございます' },
        { word: 'おかげさまで', reading: 'おかげさまで', meaning: 'Thanks to you（nhờ ơn）', example: 'おかげさまで元気です' },
        { word: '〜でございます', reading: 'でございます', meaning: '〜です の丁寧形（thể rất lịch sự）', example: '山田でございます' },
        { word: '承知しました', reading: 'しょうちしました', meaning: '分かりました（tôi hiểu rồi, formal）', example: '承知しました。すぐに対応します' },
        { word: '折り返す', reading: 'おりかえす', meaning: '電話を掛け直す（gọi lại）', example: '折り返しご連絡します' },
      ],
      examples: [
        { japanese: 'A：「田中さんのご家族の方から電話がありました」B：「分かりました。折り返しご連絡します」', reading: 'A：「たなかさんのごかぞくのかたからでんわがありました」B：「わかりました。おりかえしごれんらくします」', translation: 'A: "Gia đình ông Tanaka đã gọi điện" B: "Tôi hiểu. Tôi sẽ gọi lại."' },
        { japanese: 'A：「今日の申し送りですが、山田さんの血圧が高めです」B：「承知しました。注意して観察します」', reading: 'A：「きょうのもうしおくりですが、やまださんのけつあつがたかめです」B：「しょうちしました。ちゅういしてかんさつします」', translation: 'A: "Bàn giao hôm nay: huyết áp ông Yamada hơi cao" B: "Tôi hiểu. Tôi sẽ chú ý quan sát."' },
      ],
      grammarNote: `【電話応対の基本表現】
受ける：「はい、〇〇施設でございます」
確認する：「〇〇様でいらっしゃいますか？」
保留：「少々お待ちください」
折り返す：「折り返しご連絡いたします」
不在の場合：「ただいま席を外しております」`,
      quiz: {
        question: '「ちょっと...」と言うとき、話者の意図は？',
        options: [
          { id: 'a', text: '強い賛成' },
          { id: 'b', text: '遠回しな断り・困惑' },
          { id: 'c', text: '急いでいる' },
          { id: 'd', text: '怒っている' },
        ],
        correctId: 'b',
        explanation: '日本語の「ちょっと...（言いにくいことがある）」は遠回しな断りや困惑を表します。直接的な断りを避ける文化的表現です。\nTrong tiếng Nhật, "ちょっと..." thường là cách từ chối gián tiếp hoặc bày tỏ sự ngại ngùng.',
      },
      xpReward: 30,
    },
  },

  // ===== N3 語彙強化 =====
  'n3-04': {
    courseTitle: { ja: 'N3 語彙強化 〜カタカナ語・複合語〜', vi: 'Củng cố từ vựng N3 - Từ Katakana và từ ghép' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N3語彙: 医療・介護のカタカナ語',
      titleTranslation: 'Từ vựng N3: Từ Katakana trong y tế và điều dưỡng',
      introduction: `医療・介護現場では多くのカタカナ語（外来語）が使われます。これらは英語が元になっているものが多いですが、発音や意味が英語と少し異なることもあります。よく使うカタカナ語をマスターすることで、現場での会話がスムーズになります。

Trong y tế và điều dưỡng, nhiều từ Katakana (từ ngoại lai) được dùng. Nhiều từ có gốc tiếng Anh nhưng đôi khi phát âm và nghĩa khác một chút. Nắm vững các từ Katakana thường dùng giúp giao tiếp tại nơi làm việc trơn tru hơn.`,
      keyPoints: [
        'バイタル（vital）: バイタルサイン — dấu hiệu sinh tồn',
        'ケア（care）: ケアプラン・ケアマネ — kế hoạch chăm sóc',
        'リハビリ（rehabilitation）: リハビリテーション の略 — phục hồi chức năng',
        'インシデント（incident）: 事故・ヒヤリハット — sự cố',
        'コミュニケーション（communication）: 意思疎通 — giao tiếp',
        'モニタリング（monitoring）: 状態確認 — theo dõi',
      ],
      vocabulary: [
        { word: 'バイタル', reading: 'ばいたる', meaning: '生命兆候（dấu hiệu sinh tồn）', example: '朝のバイタルを測る' },
        { word: 'リハビリ', reading: 'りはびり', meaning: '機能回復訓練（phục hồi chức năng）', example: 'リハビリの時間です' },
        { word: 'インシデント', reading: 'いんしでんと', meaning: '事故・ヒヤリハット（sự cố）', example: 'インシデントを報告する' },
        { word: 'モニタリング', reading: 'もにたりんぐ', meaning: '継続的な確認（giám sát, theo dõi）', example: '状態をモニタリングする' },
        { word: 'ケアプラン', reading: 'けあぷらん', meaning: '介護の計画書（kế hoạch chăm sóc）', example: 'ケアプランを作成する' },
      ],
      examples: [
        { japanese: '朝のバイタルを測ってから、リハビリの準備をします。', reading: 'あさのばいたるをはかってから、りはびりのじゅんびをします。', translation: 'Đo dấu hiệu sinh tồn buổi sáng xong rồi chuẩn bị cho phục hồi chức năng.' },
        { japanese: 'インシデントがあった場合、すぐに上司に報告してください。', reading: 'いんしでんとがあったばあい、すぐにじょうしにほうこくしてください。', translation: 'Nếu có sự cố, hãy báo cáo ngay với cấp trên.' },
      ],
      grammarNote: `【カタカナ語の作り方】
英語の長い単語は短く切る：
rehabilitation → リハビリ（リハビリテーション）
communication → コミュニケーション

【医療・介護でよく使うカタカナ語一覧】
バイタル / ケア / リハビリ / インシデント
モニタリング / カルテ / マニュアル / スタッフ
ミーティング / カンファレンス / ヒヤリハット`,
      quiz: {
        question: '「リハビリ」は何の略ですか？',
        options: [
          { id: 'a', text: 'リハビリテーション' },
          { id: 'b', text: 'リハビリタル' },
          { id: 'c', text: 'リハビリーション' },
          { id: 'd', text: 'リハビリント' },
        ],
        correctId: 'a',
        explanation: '「リハビリ」は「リハビリテーション（rehabilitation）」の略。身体・精神機能の回復訓練のことです。\n"リハビリ" là viết tắt của "リハビリテーション" (rehabilitation) — phục hồi chức năng.',
      },
      xpReward: 30,
    },
  },

  // ===== N2 読解 =====
  'n2-02': {
    courseTitle: { ja: 'N2 読解・論説文対策', vi: 'Đọc hiểu & văn nghị luận N2' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N2読解: 論説文の主張と根拠を読む',
      titleTranslation: 'Đọc hiểu N2: Đọc luận điểm và lý do trong văn nghị luận',
      introduction: `N2の読解では、筆者の主張・根拠・反論・結論という構造を持つ論説文が中心です。長い文章の中から「筆者が最も言いたいこと」を素早く見つける力が必要です。

Đọc hiểu N2 chủ yếu là văn nghị luận với cấu trúc: luận điểm → lý do → phản biện → kết luận. Cần kỹ năng nhanh chóng tìm "điều tác giả muốn nói nhất" trong bài dài.`,
      keyPoints: [
        '論説文の構造：主張→根拠→反論への応答→結論',
        '筆者の主張を見つける：「〜べきだ・〜ではないか・〜が重要だ」',
        '根拠の表現：「なぜなら・〜からだ・〜ためだ」',
        '反論への対応：「確かに〜しかし・〜とはいえ・〜ものの」',
        '結論の表現：「以上のことから・このように・したがって」',
      ],
      vocabulary: [
        { word: '主張', reading: 'しゅちょう', meaning: '意見・論点（luận điểm）', example: '筆者の主張を読み取る' },
        { word: '根拠', reading: 'こんきょ', meaning: '理由・証拠（lý do, căn cứ）', example: '根拠を示す' },
        { word: 'とはいえ', reading: 'とはいえ', meaning: 'しかし・それでも（tuy nhiên）', example: 'とはいえ、完全な解決は難しい' },
        { word: '以上のことから', reading: 'いじょうのことから', meaning: '以上の内容をまとめると（từ những điều trên）', example: '以上のことから、改善が必要だ' },
        { word: '一般的に', reading: 'いっぱんてきに', meaning: '普通は（thông thường）', example: '一般的に言えば' },
      ],
      examples: [
        { japanese: '高齢化社会において、介護の質向上は急務である。確かに費用の問題はある。とはいえ、人材育成への投資は不可欠だ。以上のことから、外国人介護士の積極的な受け入れが求められる。', reading: 'こうれいかしゃかいにおいて、かいごのしつこうじょうはきゅうむである。', translation: 'Trong xã hội già hóa, cải thiện chất lượng điều dưỡng là cấp bách. Tuy chi phí là vấn đề, nhưng đầu tư vào đào tạo nhân lực là không thể thiếu. Từ những điều trên, cần tích cực tiếp nhận điều dưỡng viên nước ngoài.' },
      ],
      grammarNote: `【論説文の典型的な流れ】
1. 問題提起（〜が問題である・〜が増えている）
2. 現状説明（現在〜の状況だ）
3. 筆者の主張（〜べきだ・〜が必要だ）
4. 根拠（なぜなら〜からだ）
5. 反論への応答（確かに〜。とはいえ〜）
6. 結論（以上のことから〜）`,
      quiz: {
        question: '論説文で筆者の主張を示す表現は？',
        options: [
          { id: 'a', text: 'なぜなら〜からだ' },
          { id: 'b', text: '確かに〜しかし' },
          { id: 'c', text: '〜べきだ・〜が重要だ' },
          { id: 'd', text: '一般的に言えば' },
        ],
        correctId: 'c',
        explanation: '「〜べきだ・〜が重要だ」は筆者の意見・主張を示す表現。「なぜなら」は根拠、「確かに〜しかし」は反論への対応、「一般的に」は一般論を示します。\n「〜べきだ」biểu thị ý kiến, luận điểm của tác giả.',
      },
      xpReward: 35,
    },
  },

  // ===== N2 聴解 =====
  'n2-03': {
    courseTitle: { ja: 'N2 聴解実践 〜会議・講義〜', vi: 'Luyện nghe thực chiến N2 - Họp và bài giảng' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N2聴解: 会議・カンファレンスの聞き取り',
      titleTranslation: 'Nghe hiểu N2: Nghe hội nghị và cuộc họp',
      introduction: `N2の聴解では会議・講義・インタビューなど長い音声が出ます。要点をメモしながら聞く練習が重要です。介護現場ではケアカンファレンス・研修・スタッフ会議での発言内容を正確に理解する必要があります。

Nghe hiểu N2 có âm thanh dài như cuộc họp, bài giảng, phỏng vấn. Luyện nghe và ghi chú điểm chính rất quan trọng. Trong điều dưỡng cần hiểu chính xác nội dung phát biểu trong hội nghị chăm sóc, đào tạo, họp nhân viên.`,
      keyPoints: [
        'メモの技術：キーワードのみを書く（全文は書かない）',
        '話の構造を掴む：話題→説明→提案→結論',
        '数字・名前は慎重に聞き取る',
        '「〜ということは」「要するに」= 結論・まとめのサイン',
        '依頼・提案の表現：「〜していただけますか・〜はいかがでしょうか」',
      ],
      vocabulary: [
        { word: 'カンファレンス', reading: 'かんふぁれんす', meaning: '会議・ケア会議（hội nghị）', example: 'ケアカンファレンスを開く' },
        { word: '要するに', reading: 'ようするに', meaning: 'つまり・まとめると（tóm lại）', example: '要するに、早期対応が必要です' },
        { word: '議題', reading: 'ぎだい', meaning: '会議のテーマ（chủ đề cuộc họp）', example: '本日の議題は〇〇です' },
        { word: '提案する', reading: 'ていあんする', meaning: '意見を出す（đề xuất）', example: '新しい方法を提案する' },
        { word: 'まとめる', reading: 'まとめる', meaning: '整理する（tổng hợp, tóm tắt）', example: '会議内容をまとめる' },
      ],
      examples: [
        { japanese: '本日のカンファレンスの議題は、田中様のケアプラン見直しです。要するに、現在の介護量では対応が難しくなっています。皆さんのご意見をいただけますか。', reading: 'ほんじつのかんふぁれんすのぎだいは、たなかさまのけあぷらんみなおしです。', translation: 'Chủ đề hội nghị hôm nay là xem xét lại kế hoạch chăm sóc của ông Tanaka. Tóm lại, với lượng chăm sóc hiện tại đang khó xử lý. Xin ý kiến của mọi người.' },
      ],
      grammarNote: `【会議でよく使う表現】
開始：「本日の議題は〜です」
意見を言う：「〜と思います・〜ではないでしょうか」
同意：「おっしゃる通りです・確かにそうですね」
反対：「〜という点については、少し〜」
まとめ：「要するに〜・以上のことから〜」
宿題：「〜については、次回までに確認します」`,
      quiz: {
        question: '「要するに」の意味は？',
        options: [
          { id: 'a', text: 'なぜなら' },
          { id: 'b', text: 'つまり・まとめると' },
          { id: 'c', text: 'しかし' },
          { id: 'd', text: 'たとえば' },
        ],
        correctId: 'b',
        explanation: '「要するに」は話の内容をまとめて言い直すときに使います。「つまり・言い換えると」と同じ意味。\n「要するに」dùng khi tóm tắt lại nội dung. Nghĩa là "tóm lại, nói cách khác".',
      },
      xpReward: 35,
    },
  },

  // ===== N2 語彙 =====
  'n2-04': {
    courseTitle: { ja: 'N2 語彙・慣用表現 完全攻略', vi: 'Chinh phục từ vựng và thành ngữ N2' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N2語彙: 慣用句と四字熟語',
      titleTranslation: 'Từ vựng N2: Thành ngữ và tứ tự thành ngữ',
      introduction: `N2レベルでは慣用句・ことわざ・四字熟語が多く出ます。これらは文字通りの意味ではなく、比喩的な意味を持ちます。介護・医療の職場では「一石二鳥・試行錯誤・自業自得」など職場でも使われます。

Cấp N2 có nhiều thành ngữ, tục ngữ, tứ tự thành ngữ. Các từ này không mang nghĩa đen mà có nghĩa bóng. Nơi làm việc điều dưỡng cũng dùng các từ như "一石二鳥・試行錯誤".`,
      keyPoints: [
        '慣用句：体の部位を使った表現（手が離せない・目をかける）',
        '四字熟語：4つの漢字で意味を表す（一石二鳥・試行錯誤）',
        'ことわざ：生活の知恵・教訓（七転び八起き）',
        '類義語・対義語：同じ意味・反対の意味の表現',
        '文脈からの推測：知らない表現も文脈で意味を推測',
      ],
      vocabulary: [
        { word: '一石二鳥', reading: 'いっせきにちょう', meaning: '一つの行動で二つの効果（một mũi tên trúng hai đích）', example: '研修は知識と仲間作りで一石二鳥だ' },
        { word: '試行錯誤', reading: 'しこうさくご', meaning: '試してみて改善する（thử và sai để cải thiện）', example: '介護方法を試行錯誤する' },
        { word: '手が離せない', reading: 'てがはなせない', meaning: '今は忙しくて手が空かない（đang bận, không rảnh tay）', example: '今手が離せません' },
        { word: '七転び八起き', reading: 'ななころびやおき', meaning: '何度転んでも起き上がる（thất bại nhiều lần vẫn đứng dậy）', example: '七転び八起きの精神で頑張る' },
        { word: '目をかける', reading: 'めをかける', meaning: '注意して世話をする（quan tâm, chú ý）', example: '新人スタッフに目をかける' },
      ],
      examples: [
        { japanese: '今は手が離せません。5分後に折り返します。', reading: 'いまはてがはなせません。ごふんごにおりかえします。', translation: 'Bây giờ đang bận không rảnh tay. Tôi sẽ gọi lại sau 5 phút.' },
        { japanese: '試行錯誤を重ねて、ようやくよいケアの方法が見つかりました。', reading: 'しこうさくごをかさねて、ようやくよいけあのほうほうがみつかりました。', translation: 'Sau nhiều lần thử và sai, cuối cùng đã tìm được phương pháp chăm sóc tốt.' },
      ],
      grammarNote: `【体の部位を使う慣用句】
手：手が離せない（忙しい）/ 手を貸す（手伝う）/ 手を抜く（手を抜く）
目：目をかける（世話する）/ 目が離せない（注意が必要）
口：口が重い（無口）/ 口を挟む（横から割り込む）
耳：耳が痛い（聞いて辛い）/ 耳を傾ける（注意して聞く）`,
      quiz: {
        question: '「手が離せない」の意味は？',
        options: [
          { id: 'a', text: '手が使えない（障害がある）' },
          { id: 'b', text: '今は忙しくて対応できない' },
          { id: 'c', text: '手を洗う必要がある' },
          { id: 'd', text: '手が汚れている' },
        ],
        correctId: 'b',
        explanation: '「手が離せない」は今の作業が忙しくて、他のことができない状態を表す慣用句です。「今ちょっと〜」という意味で使います。\n「手が離せない」là thành ngữ nghĩa là "đang bận việc không rảnh để làm việc khác".',
      },
      xpReward: 35,
    },
  },

  // ===== N1 文法 =====
  'n1-01': {
    courseTitle: { ja: 'N1 最難関文法 完全攻略', vi: 'Chinh phục ngữ pháp N1 khó nhất' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N1文法: 〜をよそに・〜ならではの・〜にもまして',
      titleTranslation: 'Ngữ pháp N1: 〜をよそに・〜ならではの・〜にもまして',
      introduction: `N1の文法は非常に難解で、微妙なニュアンスの違いが問われます。「〜をよそに・〜ならではの・〜にもまして」は文学・社説・報告書などで使われる高度な表現です。

Ngữ pháp N1 rất khó, thường kiểm tra sự khác biệt về sắc thái tinh tế. 〜をよそに・〜ならではの・〜にもまして là các biểu đạt nâng cao dùng trong văn học, xã luận, báo cáo.`,
      keyPoints: [
        '〜をよそに: 〜を無視して・気にせずに（bất chấp, không quan tâm đến）',
        '〜ならではの: 〜にしかできない・〜独特の（đặc trưng của, chỉ ... mới có）',
        '〜にもまして: 〜以上に・〜より更に（hơn cả, vượt hơn）',
        '〜にほかならない: まさに〜だ（chính là, không gì khác ngoài）',
        '接続の注意：各表現の接続形（名詞・動詞・形容詞）を確認',
      ],
      vocabulary: [
        { word: '〜をよそに', reading: 'をよそに', meaning: '〜を無視して（bất chấp）', example: '反対の声をよそに計画を進めた' },
        { word: '〜ならではの', reading: 'ならではの', meaning: '〜独特の（đặc trưng của）', example: '日本ならではのおもてなし' },
        { word: '〜にもまして', reading: 'にもまして', meaning: '〜より更に（hơn cả）', example: '以前にもまして熱心に働く' },
        { word: '〜にほかならない', reading: 'にほかならない', meaning: '〜である（chính là）', example: 'これは努力の成果にほかならない' },
      ],
      examples: [
        { japanese: '利用者さんの不安をよそに、スタッフは淡々と作業を続けた。（否定的ニュアンス）', reading: 'りようしゃさんのふあんをよそに、すたっふはたんたんとさぎょうをつづけた。', translation: 'Bất chấp sự lo lắng của người được chăm sóc, nhân viên tiếp tục công việc một cách thờ ơ. (sắc thái tiêu cực)' },
        { japanese: 'これぞ職人ならではの技だ。', reading: 'これぞしょくにんならではのわざだ。', translation: 'Đây chính là kỹ thuật đặc trưng chỉ người thợ lành nghề mới có.' },
        { japanese: '今年は例年にもまして応募者が多い。', reading: 'ことしはれいねんにもまして おうぼしゃがおおい。', translation: 'Năm nay số người nộp đơn nhiều hơn cả những năm thường lệ.' },
      ],
      grammarNote: `【〜をよそに の使い方】
接続：名詞 + をよそに
意味：その状況を気にせず行動する（多くは批判的ニュアンス）
例：「家族の心配をよそに旅に出た」

【〜ならではの の使い方】
接続：名詞 + ならではの + 名詞
意味：そのものに特有・そこでしかできない
例：「京都ならではの文化」

【〜にもまして の使い方】
接続：名詞/疑問詞 + にもまして
意味：比較対象より程度が高い
例：「何にもまして大切なのは〜」`,
      quiz: {
        question: '「日本（　）おもてなし文化が世界に知られている」に入るのは？',
        options: [
          { id: 'a', text: 'をよそに' },
          { id: 'b', text: 'ならではの' },
          { id: 'c', text: 'にもまして' },
          { id: 'd', text: 'にほかならない' },
        ],
        correctId: 'b',
        explanation: '「日本ならでは = 日本に特有の・日本にしかない」。おもてなし文化は日本独特のものなので「ならではの」が正解。\n「ならではの」có nghĩa "đặc trưng của, chỉ ... mới có" — văn hóa omotenashi là đặc trưng của Nhật Bản.',
      },
      xpReward: 50,
    },
  },

  // ===== N1 語彙 =====
  'n1-02': {
    courseTitle: { ja: 'N1 語彙・熟語・慣用句マスター', vi: 'Từ vựng - Thành ngữ - Quán ngữ N1' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N1語彙: 文脈から意味を推測する技術',
      titleTranslation: 'Từ vựng N1: Kỹ năng đoán nghĩa từ ngữ cảnh',
      introduction: `N1の語彙問題では、未知の語彙でも文脈から意味を推測する力が試されます。漢字の構成要素（部首・漢字の意味）から意味を推測する技術も重要です。

Trong câu hỏi từ vựng N1, kỹ năng đoán nghĩa từ ngữ cảnh ngay cả với từ chưa biết rất quan trọng. Kỹ năng đoán nghĩa từ thành phần Kanji (bộ thủ, nghĩa chữ Hán) cũng quan trọng.`,
      keyPoints: [
        '文脈推測：前後の文から意味を絞り込む',
        '漢字分解：「不・無・未・非」= 否定 / 「〜化・〜性・〜的」= 意味の変換',
        '類義語問題：最も近い意味の選択肢を選ぶ',
        '文脈の手がかり：接続詞・具体例・対比から意味を推測',
        '高頻度N1語彙：看過する・俯瞰する・逡巡する・蔑ろにする',
      ],
      vocabulary: [
        { word: '看過する', reading: 'かんかする', meaning: '見逃す（bỏ qua, không chú ý）', example: '安全上のリスクを看過してはならない' },
        { word: '俯瞰する', reading: 'ふかんする', meaning: '高い視点から全体を見る（nhìn tổng quan từ trên cao）', example: '問題を俯瞰して考える' },
        { word: '醸成する', reading: 'じょうせいする', meaning: '少しずつ作り上げる（hình thành dần dần）', example: '信頼関係を醸成する' },
        { word: '顕著な', reading: 'けんちょな', meaning: '明らかに目立つ（rõ ràng, nổi bật）', example: '顕著な改善が見られた' },
        { word: '是正する', reading: 'ぜせいする', meaning: '間違いを正す（chỉnh sửa, cải chính）', example: '問題点を是正する' },
      ],
      examples: [
        { japanese: '小さなリスクを看過した結果、大きな事故につながった。', reading: 'ちいさなりすくをかんかした けっか、おおきなじこにつながった。', translation: 'Kết quả của việc bỏ qua rủi ro nhỏ đã dẫn đến tai nạn lớn.' },
        { japanese: '問題を俯瞰することで、本質的な原因が見えてきた。', reading: 'もんだいをふかんすることで、ほんしつてきなげんいんがみえてきた。', translation: 'Nhờ nhìn tổng quan vấn đề, nguyên nhân cốt lõi đã hiện ra.' },
      ],
      grammarNote: `【N1語彙推測のヒント — Gợi ý đoán từ N1】
接頭辞：
・不〜 = không ... (不安・不満・不明)
・無〜 = không có ... (無理・無料・無効)
・未〜 = chưa ... (未来・未定・未経験)
・超〜 = siêu ... (超高齢・超難関)

接尾辞：
・〜化 = biến thành ... (高齢化・国際化)
・〜性 = tính chất ... (重要性・可能性)
・〜的 = mang tính ... (効果的・具体的)`,
      quiz: {
        question: '「顕著な改善」の「顕著」の意味として最も近いのは？',
        options: [
          { id: 'a', text: 'わずかな' },
          { id: 'b', text: 'ゆっくりした' },
          { id: 'c', text: '明らかに目立つ' },
          { id: 'd', text: '予想外の' },
        ],
        correctId: 'c',
        explanation: '「顕著（けんちょ）」は「明らかに目立つ・はっきりと分かる」という意味。「著（あらわ）」には「目立つ」の意味があります。\n「顕著」có nghĩa là "rõ ràng nổi bật, dễ thấy".',
      },
      xpReward: 50,
    },
  },

  // ===== N1 読解 =====
  'n1-03': {
    courseTitle: { ja: 'N1 読解・論述文 実戦演習', vi: 'Luyện đọc hiểu và văn nghị luận N1 thực chiến' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N1読解: 複数文章の比較と統合',
      titleTranslation: 'Đọc hiểu N1: So sánh và tổng hợp nhiều văn bản',
      introduction: `N1の読解の最難関は「複数の文章を比較して共通点・相違点・関係性を読み取る」問題です。二つの文章を読んで「筆者Aは〜と主張しているが、筆者Bは〜と考えている。共通しているのは〜だ」という統合的な理解が求められます。

Dạng khó nhất trong đọc hiểu N1 là "đọc nhiều văn bản và tìm điểm giống, khác nhau, mối quan hệ". Cần hiểu tổng hợp như "Tác giả A lập luận X nhưng tác giả B nghĩ Y. Điểm chung là Z".`,
      keyPoints: [
        '複数文章問題：2つ以上の文章の関係（補完・対立・例示）',
        '比較の視点：共通点・相違点・前提・結論を整理',
        '評価・批判：「A の主張に対して B は〜と述べている」',
        '時間をかけない：各文章3〜4分で要旨を把握',
        '設問から先に読む：何が問われているかを把握してから読む',
      ],
      vocabulary: [
        { word: '前提', reading: 'ぜんてい', meaning: 'もともとの仮定（tiền đề）', example: '同じ前提に基づく議論' },
        { word: '論拠', reading: 'ろんきょ', meaning: '主張の根拠（luận cứ）', example: '論拠が弱い主張' },
        { word: '踏まえて', reading: 'ふまえて', meaning: '〜を考慮して（dựa trên, xem xét）', example: '現状を踏まえて判断する' },
        { word: '一致する', reading: 'いっちする', meaning: '同じになる（trùng khớp, nhất trí）', example: '二人の意見が一致した' },
        { word: '相反する', reading: 'あいはんする', meaning: '反対になる（mâu thuẫn, trái ngược）', example: '二つの主張が相反する' },
      ],
      examples: [
        { japanese: '【文章A】高齢化対策として、介護ロボットの導入が急務だ。【文章B】人によるケアの温かさは機械に代替できない。【問】二人の筆者の共通点は何か？', reading: '', translation: '【Bài A】Đưa robot chăm sóc vào là cấp bách để đối phó với già hóa. 【Bài B】Sự ấm áp của chăm sóc bởi con người không thể thay thế bằng máy móc. 【Câu hỏi】Điểm chung của hai tác giả là gì?' },
      ],
      grammarNote: `【複数文章問題の解き方】
Step 1: 設問を読む（何を聞かれているか確認）
Step 2: 各文章の主張を1文で要約する
Step 3: 共通点・相違点を表にまとめる
Step 4: 設問に答える

【よく問われる関係】
・対立する主張（A vs B）
・補完する主張（AはX、BはY → 合わせるとZ）
・同じ前提・異なる結論`,
      quiz: {
        question: '「相反する」の意味は？',
        options: [
          { id: 'a', text: '同じ意見を持つ' },
          { id: 'b', text: '補い合う' },
          { id: 'c', text: '反対・矛盾する' },
          { id: 'd', text: '無関係' },
        ],
        correctId: 'c',
        explanation: '「相反する（あいはんする）」は二つのものが反対・矛盾することを意味します。「相（あい）= お互い」+「反（はん）= 反対」。\n「相反する」có nghĩa là "mâu thuẫn với nhau, trái ngược nhau".',
      },
      xpReward: 50,
    },
  },

  // ===== N2 文法 =====
  'n2-01': {
    courseTitle: { ja: 'N2 上級文法マスター', vi: 'Ngữ pháp nâng cao N2' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: 'N2文法: 〜にもかかわらず / 〜にもかかわらず',
      titleTranslation: 'Ngữ pháp N2: Mặc dù... / Bất chấp...',
      introduction: `「〜にもかかわらず」は「〜なのに、それでも」という意味の接続表現です。予想に反する結果を表すときに使います。N2レベルの書き言葉・フォーマルな文章でよく出てきます。

「〜にかかわらず」（関係なく）とも混同しやすいので注意が必要です。

「〜にもかかわらず」 có nghĩa là "mặc dù..., vẫn..." - dùng khi kết quả trái với kỳ vọng. Thường xuất hiện trong văn viết và văn trang trọng cấp N2.`,
      keyPoints: [
        '接続：名詞・普通形 + にもかかわらず',
        '意味：「〜なのに（予想外に）」「〜であるにもかかわらず」',
        '書き言葉的：公式文書・ビジネス文書・論文などで使う',
        'N2頻出：試験では「にかかわらず」（regardless of）との区別問題が出る',
        '用例：「大雨にもかかわらず、多くの方が参加してくださいました」',
      ],
      vocabulary: [
        { word: '〜にもかかわらず', reading: 'にもかかわらず', meaning: 'mặc dù ... (vẫn)', example: '反対意見にもかかわらず、計画を実行した' },
        { word: '〜にかかわらず', reading: 'にかかわらず', meaning: '... に関係なく（bất kể）', example: '国籍にかかわらず応募できる' },
        { word: 'かつ', reading: 'かつ', meaning: 'そして・また（và đồng thời）', example: '安全かつ確実に' },
        { word: 'いかんにかかわらず', reading: 'いかんにかかわらず', meaning: 'どうであっても（dù thế nào）', example: '結果のいかんにかかわらず' },
      ],
      examples: [
        {
          japanese: '大雨にもかかわらず、多くの患者様がいらっしゃいました。',
          reading: 'おおあめにもかかわらず、おおくのかんじゃさまがいらっしゃいました。',
          translation: 'Mặc dù trời mưa to, vẫn có nhiều bệnh nhân đến.',
        },
        {
          japanese: '高齢にもかかわらず、大変お元気でいらっしゃいます。',
          reading: 'こうれいにもかかわらず、たいへんおげんきでいらっしゃいます。',
          translation: 'Mặc dù tuổi cao nhưng vẫn rất khỏe mạnh.',
        },
        {
          japanese: '十分な説明にもかかわらず、ご理解いただけなかった。',
          reading: 'じゅうぶんなせつめいにもかかわらず、ごりかいいただけなかった。',
          translation: 'Mặc dù đã giải thích đầy đủ nhưng vẫn không được hiểu.',
        },
      ],
      grammarNote: `【〜にもかかわらず vs 〜にかかわらず の違い】

〜にもかかわらず（mặc dù ... vẫn）
→ 逆接：Aという状況なのに、Bという予想外の結果
例：「反対にもかかわらず実行した」= Mặc dù có phản đối vẫn thực hiện

〜にかかわらず（bất kể）
→ 無関係：Aの状況に関係なく、Bが成立する
例：「天気にかかわらず開催する」= Dù thời tiết thế nào vẫn tổ chức

【N2試験対策ポイント】
選択肢に両方が出る場合、逆接（反対の結果）なら「にもかかわらず」、無関係（条件を問わず）なら「にかかわらず」`,
      quiz: {
        question: 'どちらが正しいですか？「彼女は忙しい（　）、いつも笑顔だ」',
        options: [
          { id: 'a', text: 'にかかわらず' },
          { id: 'b', text: 'にもかかわらず' },
          { id: 'c', text: 'にしたがって' },
          { id: 'd', text: 'にくわえて' },
        ],
        correctId: 'b',
        explanation: '「忙しいのに笑顔」は予想外の結果（逆接）なので「にもかかわらず」が正解。「にかかわらず」は無関係・条件を問わない場合に使います。\n"Dù bận nhưng vẫn luôn mỉm cười" là kết quả bất ngờ (nghịch nghĩa) nên dùng "にもかかわらず".',
      },
      xpReward: 40,
    },
  },

  // ===== N5 ひらがな L2 =====
  'n5-01-2': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第2回 〜さ行・た行〜',
      titleTranslation: 'Hiragana Bài 2 - Hàng さ và hàng た',
      introduction: `前回の「あ行・か行」に続き、今回は「さ行（さしすせそ）」と「た行（たちつてと）」を学びます。さ行は英語の「s」音、た行は「t」音が基本ですが、「し・ち・つ」は注意が必要です。

Tiếp theo "hàng あ・か", lần này học "hàng さ (sa si su se so)" và "hàng た (ta chi tsu te to)". Hàng さ có âm "s", hàng た có âm "t" làm cơ bản, nhưng chú ý đặc biệt với し・ち・つ.`,
      keyPoints: [
        'さ行：さ(sa)・し(shi)・す(su)・せ(se)・そ(so)　※し = "shi" 注意',
        'た行：た(ta)・ち(chi)・つ(tsu)・て(te)・と(to)　※ち=chi, つ=tsu 注意',
        '「し」は英語の "she" のような音：舌先を上顎の前に近づけて発音',
        '「つ」は英語にない音：「t」+「su」を素早く一音で発音',
        '「ち」も独特：英語 "cheese" の "ch" に近い',
        'カタカナ対応：サ・シ・ス・セ・ソ / タ・チ・ツ・テ・ト',
      ],
      vocabulary: [
        { word: 'さくら', reading: 'さくら', meaning: '桜（hoa anh đào）', example: 'さくらがきれいです' },
        { word: 'すし', reading: 'すし', meaning: '寿司（sushi）', example: 'おすしを食べる' },
        { word: 'せかい', reading: 'せかい', meaning: '世界（thế giới）', example: 'せかいじゅう' },
        { word: 'たべる', reading: 'たべる', meaning: '食べる（ăn）', example: 'ごはんをたべる' },
        { word: 'ちかい', reading: 'ちかい', meaning: '近い（gần）', example: 'えきがちかい' },
        { word: 'つくえ', reading: 'つくえ', meaning: '机（bàn）', example: 'つくえのうえ' },
        { word: 'てがみ', reading: 'てがみ', meaning: '手紙（thư）', example: 'てがみをかく' },
        { word: 'とけい', reading: 'とけい', meaning: '時計（đồng hồ）', example: 'とけいをみる' },
      ],
      examples: [
        { japanese: 'すしとさしみが好きです。', reading: 'すしとさしみがすきです。', translation: 'Tôi thích sushi và sashimi.' },
        { japanese: 'つくえのうえにとけいがあります。', reading: 'つくえのうえにとけいがあります。', translation: 'Trên bàn có đồng hồ.' },
        { japanese: 'せかいじゅうのひとに、ちかいしょうらいたいせつです。', reading: 'せかいじゅうのひとに、ちかいしょうらいたいせつです。', translation: 'Tương lai gần quan trọng với người trên toàn thế giới.' },
      ],
      grammarNote: `【さ行・た行の発音まとめ】
さ=sa　し=shi（!）　す=su　せ=se　そ=so
た=ta　ち=chi（!）　つ=tsu（!）　て=te　と=to

【介護でよく使う さ・た行の言葉】
さん（Mr./さん付けで呼ぶ）/ して（〜して下さい）/ すみません
たすけてください / ちょっとまって / つかまって / てをつないで

Trong điều dưỡng hay dùng: すみません (xin lỗi), たすけて (giúp với), ちょっとまって (đợi một chút)`,
      quizzes: [
        {
          question: '「し」の正しい読みはどれですか？',
          options: [{ id: 'a', text: 'si' }, { id: 'b', text: 'shi' }, { id: 'c', text: 'chi' }, { id: 'd', text: 'zi' }],
          correctId: 'b',
          explanation: '「し」はローマ字で "shi" と書きます。英語の "she" に近い発音です。\n「し」được viết là "shi" trong romaji, phát âm gần giống "she" trong tiếng Anh.',
          difficulty: 'easy' as const,
        },
        {
          question: '「つ」の正しい読みはどれですか？',
          options: [{ id: 'a', text: 'tu' }, { id: 'b', text: 'chu' }, { id: 'c', text: 'tsu' }, { id: 'd', text: 'su' }],
          correctId: 'c',
          explanation: '「つ」は "tsu" — t音とsu音を合わせた特殊な音です。\n「つ」là "tsu" — âm đặc biệt kết hợp t và su.',
          difficulty: 'easy' as const,
        },
        {
          question: '「すし」をひらがなで書くと？',
          options: [{ id: 'a', text: 'しすし' }, { id: 'b', text: 'すし' }, { id: 'c', text: 'すしい' }, { id: 'd', text: 'すいし' }],
          correctId: 'b',
          explanation: '寿司は「すし」と書きます。す(su)+し(shi)。\nSushi viết là すし = す (su) + し (shi).',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 20,
    },
  },

  // ===== N5 ひらがな L3 =====
  'n5-01-3': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第3回 〜な行・は行〜',
      titleTranslation: 'Hiragana Bài 3 - Hàng な và hàng は',
      introduction: `今回は「な行（なにぬねの）」と「は行（はひふへほ）」を学びます。「ふ」は唇から出る特殊な音、「は行」は語中・語尾で発音が変わることがあります。

Lần này học "hàng な (na ni nu ne no)" và "hàng は (ha hi fu he ho)". Chú ý "ふ" là âm đặc biệt từ môi, và hàng は có thể thay đổi cách đọc ở giữa hay cuối từ.`,
      keyPoints: [
        'な行：な(na)・に(ni)・ぬ(nu)・ね(ne)・の(no)',
        'は行：は(ha)・ひ(hi)・ふ(fu)・へ(he)・ほ(ho)',
        '「ふ」は英語の "f" ではなく、両唇を近づけて息を出す音（発音注意）',
        '助詞の「は」= "wa"、「へ」= "e" と発音が変わる',
        '介護で頻出：「はい」「ひとり」「ふとん」「ほんじつ」',
        'カタカナ対応：ナ・ニ・ヌ・ネ・ノ / ハ・ヒ・フ・ヘ・ホ',
      ],
      vocabulary: [
        { word: 'なまえ', reading: 'なまえ', meaning: '名前（tên）', example: 'おなまえはなんですか' },
        { word: 'にほん', reading: 'にほん', meaning: '日本（Nhật Bản）', example: 'にほんごをべんきょうする' },
        { word: 'ねる', reading: 'ねる', meaning: '寝る（ngủ）', example: 'よるにねる' },
        { word: 'はなす', reading: 'はなす', meaning: '話す（nói）', example: 'にほんごではなす' },
        { word: 'ひとり', reading: 'ひとり', meaning: '一人（một mình）', example: 'ひとりでできる' },
        { word: 'ふとん', reading: 'ふとん', meaning: '布団（chăn đệm）', example: 'ふとんをしく' },
        { word: 'ほんじつ', reading: 'ほんじつ', meaning: '本日（hôm nay（lịch sự））', example: 'ほんじつのメニュー' },
        { word: 'のむ', reading: 'のむ', meaning: '飲む（uống）', example: 'くすりをのむ' },
      ],
      examples: [
        { japanese: 'おなまえはなんですか？', reading: 'おなまえはなんですか？', translation: 'Tên bạn là gì?' },
        { japanese: 'ひとりでふとんにはいれますか？', reading: 'ひとりでふとんにはいれますか？', translation: 'Bạn có thể tự vào chăn đệm không?' },
        { japanese: 'くすりをのんでください。', reading: 'くすりをのんでください。', translation: 'Hãy uống thuốc đi.' },
      ],
      grammarNote: `【は行の発音の注意点】
通常：は=ha、ひ=hi、ふ=fu、へ=he、ほ=ho
助詞として：
  は（テーマ）→ "wa" と発音：「わたし は」
  へ（方向）→ "e" と発音：「東京 へ」

【「ふ」の発音】
英語のfとは違い、上の歯を下唇につけない！
両唇を近づけて、軽くふうっと息を出す感覚。

Phát âm ふ: Không giống f tiếng Anh, không chạm răng vào môi. Thổi hơi nhẹ giữa hai môi.`,
      quizzes: [
        {
          question: '助詞「は」の発音は？',
          options: [{ id: 'a', text: 'ha' }, { id: 'b', text: 'wa' }, { id: 'c', text: 'ba' }, { id: 'd', text: 'pa' }],
          correctId: 'b',
          explanation: '助詞として使う「は」は "wa" と発音します。「わたし は グエンです」→ wa。\nKhi là trợ từ, は đọc là "wa". Ví dụ: "わたし は グエンです"',
          difficulty: 'medium' as const,
        },
        {
          question: '「ひとり」の意味は？',
          options: [{ id: 'a', text: '二人' }, { id: 'b', text: '一日' }, { id: 'c', text: '一人' }, { id: 'd', text: '一つ' }],
          correctId: 'c',
          explanation: '「ひとり」は「一人（いちにん）」= 1人のこと。介護でよく使う「おひとりで大丈夫ですか？」\n「ひとり」= một người. Hay dùng trong điều dưỡng: "おひとりで大丈夫ですか？"',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 20,
    },
  },

  // ===== N5 ひらがな L4 =====
  'n5-01-4': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第4回 〜ま行・や行・ら行・わ行・ん〜',
      titleTranslation: 'Hiragana Bài 4 - Hàng ま, や, ら, わ và ん',
      introduction: `今回でひらがな全46字が揃います。「ま行・や行・ら行・わ行」と特別な文字「ん」を学びます。「ら行」のrは英語のr・lとも異なる独特の音です。また「ん」は唯一の子音単独字です。

Lần này hoàn thành đủ 46 chữ Hiragana. Học hàng ま, や, ら, わ và ký tự đặc biệt ん. Âm "r" của hàng ら khác với r/l tiếng Anh. ん là ký tự phụ âm duy nhất đứng một mình.`,
      keyPoints: [
        'ま行：ま(ma)・み(mi)・む(mu)・め(me)・も(mo)',
        'や行：や(ya)・ゆ(yu)・よ(yo)　※3字のみ',
        'ら行：ら(ra)・り(ri)・る(ru)・れ(re)・ろ(ro)　※独特のr音',
        'わ行：わ(wa)・を(wo)　※「を」は助詞専用',
        'ん：単独の子音字、語末・語中にのみ現れる',
        '「ら行」のrは舌先を上顎に一度弾く音（フラップ音）',
      ],
      vocabulary: [
        { word: 'まいにち', reading: 'まいにち', meaning: '毎日（mỗi ngày）', example: 'まいにちれんしゅうする' },
        { word: 'みず', reading: 'みず', meaning: '水（nước）', example: 'みずをのむ' },
        { word: 'やさしい', reading: 'やさしい', meaning: '優しい（nhẹ nhàng）', example: 'やさしいひと' },
        { word: 'ゆっくり', reading: 'ゆっくり', meaning: 'ゆっくり（từ từ）', example: 'ゆっくりはなす' },
        { word: 'よい', reading: 'よい', meaning: '良い（tốt）', example: 'よいてんき' },
        { word: 'りょうり', reading: 'りょうり', meaning: '料理（nấu ăn）', example: 'りょうりをつくる' },
        { word: 'われる', reading: 'われる', meaning: '割れる（vỡ）', example: 'コップがわれる' },
        { word: 'にほん', reading: 'にほん', meaning: '日本（Nhật）', example: 'にほんにいます' },
      ],
      examples: [
        { japanese: 'ゆっくりでいいですよ。', reading: 'ゆっくりでいいですよ。', translation: 'Cứ từ từ thôi nhé. （介護の声かけ）' },
        { japanese: 'まいにちれんしゅうしましょう。', reading: 'まいにちれんしゅうしましょう。', translation: 'Hãy luyện tập mỗi ngày nhé.' },
        { japanese: 'みずをのみますか？', reading: 'みずをのみますか？', translation: 'Bạn có muốn uống nước không?' },
      ],
      grammarNote: `【ら行の発音のコツ】
英語のr でも l でもない！
舌先を上の歯茎のすぐ後ろに当てて、弾く（flap）
→ スペイン語の "r" に近い感覚

【「を」について】
「を」は動作の対象を示す助詞専用：
　みず を のむ（水を飲む）
　くすり を のむ（薬を飲む）
発音は "o" （現代語では「お」と同じ発音）

【「ん」の発音】
語末：にほ ん → 「n」のまま止める
語中：さんぽ → 「m」に近い
母音の前：まんえん → 「ng」に近い`,
      quizzes: [
        {
          question: '「ゆっくり」の意味として正しいのは？',
          options: [{ id: 'a', text: 'はやく' }, { id: 'b', text: 'ゆっくり' }, { id: 'c', text: 'だんだん' }, { id: 'd', text: 'すぐに' }],
          correctId: 'b',
          explanation: '「ゆっくり」は "slowly / calmly"。介護現場で「ゆっくりで大丈夫ですよ」と声をかけます。\nゆっくり = từ từ/chậm. Trong điều dưỡng: "ゆっくりで大丈夫ですよ" (Từ từ cũng được đâu)',
          difficulty: 'easy' as const,
        },
        {
          question: 'ひらがなで「水を飲む」を書くと？',
          options: [{ id: 'a', text: 'みずはのむ' }, { id: 'b', text: 'みずをのむ' }, { id: 'c', text: 'みずがのむ' }, { id: 'd', text: 'みずにのむ' }],
          correctId: 'b',
          explanation: '動作の対象には助詞「を」を使います。「みず を のむ」（水を飲む）。\nDùng trợ từ を cho đối tượng của hành động: みず を のむ',
          difficulty: 'medium' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 ひらがな L5 =====
  'n5-01-5': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第5回 〜濁音・半濁音〜',
      titleTranslation: 'Hiragana Bài 5 - Âm đục (dakuten) và bán đục (handakuten)',
      introduction: `清音（基本のひらがな）に加え、濁点（゛）や半濁点（°）をつけることで新しい音が生まれます。これを「濁音」「半濁音」といいます。20字以上の新しい音を習得します。

Thêm vào Hiragana cơ bản (seion), dấu " (dakuten) và dấu ° (handakuten) tạo ra các âm mới gọi là "dakuon" và "handakuon". Sẽ học hơn 20 âm mới.`,
      keyPoints: [
        'が行：が(ga)・ぎ(gi)・ぐ(gu)・げ(ge)・ご(go)　← か行 ＋ ゛',
        'ざ行：ざ(za)・じ(ji)・ず(zu)・ぜ(ze)・ぞ(zo)　← さ行 ＋ ゛',
        'だ行：だ(da)・ぢ(ji)・づ(zu)・で(de)・ど(do)　← た行 ＋ ゛',
        'ば行：ば(ba)・び(bi)・ぶ(bu)・べ(be)・ぼ(bo)　← は行 ＋ ゛',
        'ぱ行：ぱ(pa)・ぴ(pi)・ぷ(pu)・ぺ(pe)・ぽ(po)　← は行 ＋ ° （半濁点）',
        '「じ」は「ぢ」と、「ず」は「づ」と同じ発音（現代語では）',
      ],
      vocabulary: [
        { word: 'がんばる', reading: 'がんばる', meaning: '頑張る（cố gắng）', example: 'がんばってください' },
        { word: 'ごはん', reading: 'ごはん', meaning: 'ご飯（cơm）', example: 'ごはんをたべる' },
        { word: 'じかん', reading: 'じかん', meaning: '時間（thời gian）', example: 'じかんをまもる' },
        { word: 'ずっと', reading: 'ずっと', meaning: 'ずっと（mãi mãi）', example: 'ずっとげんきで' },
        { word: 'でんわ', reading: 'でんわ', meaning: '電話（điện thoại）', example: 'でんわをかける' },
        { word: 'びょういん', reading: 'びょういん', meaning: '病院（bệnh viện）', example: 'びょういんにいく' },
        { word: 'ぶどう', reading: 'ぶどう', meaning: '葡萄（nho）', example: 'ぶどうをたべる' },
        { word: 'ぽかぽか', reading: 'ぽかぽか', meaning: '暖かい感じ（ấm áp）', example: 'ぽかぽかあたたかい' },
      ],
      examples: [
        { japanese: 'ごはんのじかんですよ。', reading: 'ごはんのじかんですよ。', translation: 'Đến giờ ăn rồi đấy. （介護の声かけ）' },
        { japanese: 'びょういんにでんわをかけます。', reading: 'びょういんにでんわをかけます。', translation: 'Tôi gọi điện cho bệnh viện.' },
        { japanese: 'がんばってください！おうえんしています。', reading: 'がんばってください！おうえんしています。', translation: 'Cố lên! Tôi đang cổ vũ bạn.' },
      ],
      grammarNote: `【濁音・半濁音のまとめ一覧】
か→が　き→ぎ　く→ぐ　け→げ　こ→ご
さ→ざ　し→じ　す→ず　せ→ぜ　そ→ぞ
た→だ　ち→ぢ　つ→づ　て→で　と→ど
は→ば　ひ→び　ふ→ぶ　へ→べ　ほ→ぼ
は→ぱ　ひ→ぴ　ふ→ぷ　へ→ぺ　ほ→ぽ

【介護で頻出の濁音語彙】
ごはん（ご飯）/ でんわ（電話）/ びょういん（病院）
ざんぎょう（残業）/ ぶんかい（分解）/ でぐち（出口）`,
      quizzes: [
        {
          question: '「ごはん」をひらがなで書くと？',
          options: [{ id: 'a', text: 'こはん' }, { id: 'b', text: 'ごはん' }, { id: 'c', text: 'ごばん' }, { id: 'd', text: 'こばん' }],
          correctId: 'b',
          explanation: '「ご飯」は「ごはん」。「こ」に濁点がついて「ご」になります。\n「ご飯」viết là ごはん. こ + ゛= ご',
          difficulty: 'easy' as const,
        },
        {
          question: '半濁点（°）を使う行は？',
          options: [{ id: 'a', text: 'か行' }, { id: 'b', text: 'さ行' }, { id: 'c', text: 'た行' }, { id: 'd', text: 'は行' }],
          correctId: 'd',
          explanation: '半濁点（°）はは行にのみ付きます：ぱぴぷぺぽ\nDấu ° (handakuten) chỉ thêm vào hàng は: ぱぴぷぺぽ',
          difficulty: 'medium' as const,
        },
        {
          question: '「びょういん」の意味は？',
          options: [{ id: 'a', text: '銀行' }, { id: 'b', text: '学校' }, { id: 'c', text: '病院' }, { id: 'd', text: '薬局' }],
          correctId: 'c',
          explanation: '「びょういん」=「病院」（bệnh viện）。介護現場では頻出の語彙です。\nびょういん = bệnh viện. Từ vựng rất hay gặp trong môi trường điều dưỡng.',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 ひらがな L6 =====
  'n5-01-6': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'ひらがな第6回 〜拗音・長音・促音〜',
      titleTranslation: 'Hiragana Bài 6 - Âm thu nhỏ, âm dài và âm ngừng',
      introduction: `ひらがなの特殊な使い方を学びます。「きゃ・しゅ・ちょ」などの「拗音」、「おかあさん」のような「長音」、「きって」などの「促音（小さいっ）」は日本語の重要なルールです。

Học cách dùng đặc biệt của Hiragana. "拗音" như きゃ・しゅ・ちょ, "長音" như おかあさん (âm dài), và "促音" (っ nhỏ) như きって là các quy tắc quan trọng của tiếng Nhật.`,
      keyPoints: [
        '拗音：小さい「ゃ・ゅ・ょ」を組み合わせる — きゃ・きゅ・きょ / しゃ・しゅ・しょ / ちゃ・ちゅ・ちょ など',
        '長音：同じ母音を伸ばす — ああ・いい・うう・ええ・おお（おう）',
        '促音：小さい「っ」 — 次の子音を一瞬止める — きって・ざっし・もっと',
        '「ぎゃ・びゅ・ぴょ」など濁音・半濁音にも拗音がつく',
        '介護で重要：「ちょっと」「きって」「ざっし」「しゅっきん」',
        '長音の「え列+い」と「お列+う」は特別：けいたい(携帯)、おうじ(王子)',
      ],
      vocabulary: [
        { word: 'きゃく', reading: 'きゃく', meaning: '客（khách）', example: 'おきゃくさま' },
        { word: 'しゃしん', reading: 'しゃしん', meaning: '写真（ảnh）', example: 'しゃしんをとる' },
        { word: 'ちょっと', reading: 'ちょっと', meaning: 'ちょっと（một chút）', example: 'ちょっとまってください' },
        { word: 'びょういん', reading: 'びょういん', meaning: '病院（bệnh viện）', example: 'びょういんへいく' },
        { word: 'きって', reading: 'きって', meaning: '切手（tem）', example: 'きってをはる' },
        { word: 'ざっし', reading: 'ざっし', meaning: '雑誌（tạp chí）', example: 'ざっしをよむ' },
        { word: 'しゅっきん', reading: 'しゅっきん', meaning: '出勤（đi làm）', example: 'しゅっきんじかん' },
        { word: 'にゅういん', reading: 'にゅういん', meaning: '入院（nhập viện）', example: 'にゅういんする' },
      ],
      examples: [
        { japanese: 'ちょっとまってください。', reading: 'ちょっとまってください。', translation: 'Vui lòng đợi một chút. （介護の声かけ）' },
        { japanese: 'にゅういんのしゅっきんじかんは9じです。', reading: 'にゅういんのしゅっきんじかんは9じです。', translation: 'Giờ đi làm ở nội trú là 9 giờ.' },
        { japanese: 'しゃしんをとってもいいですか？', reading: 'しゃしんをとってもいいですか？', translation: 'Tôi có thể chụp ảnh không?' },
      ],
      grammarNote: `【拗音の組み合わせ一覧（主要）】
きゃ・きゅ・きょ / ぎゃ・ぎゅ・ぎょ
しゃ・しゅ・しょ / じゃ・じゅ・じょ
ちゃ・ちゅ・ちょ
にゃ・にゅ・にょ
ひゃ・ひゅ・ひょ / びゃ・びゅ・びょ / ぴゃ・ぴゅ・ぴょ
みゃ・みゅ・みょ
りゃ・りゅ・りょ

【促音のコツ】
「っ」= 次の子音の前で息を止めて一拍置く
きっ・て（kit-te）/ ざっ・し（zas-shi）/ もっ・と（mot-to）`,
      quizzes: [
        {
          question: '「ちょっとまって」の「っ」は何を表す？',
          options: [{ id: 'a', text: '長音（伸ばす）' }, { id: 'b', text: '促音（一瞬止める）' }, { id: 'c', text: '濁音' }, { id: 'd', text: '半濁音' }],
          correctId: 'b',
          explanation: '小さい「っ」は「促音」。次の子音の前で一拍止めます。ちょっ-と（chot-to）\nっ nhỏ là "促音" (âm ngừng). Ngừng lại một nhịp trước phụ âm tiếp theo.',
          difficulty: 'medium' as const,
        },
        {
          question: '「にゅういん」の意味は？',
          options: [{ id: 'a', text: '退院' }, { id: 'b', text: '入院' }, { id: 'c', text: '出勤' }, { id: 'd', text: '通院' }],
          correctId: 'b',
          explanation: '「にゅういん」=「入院」(nhập viện)。「にゅ」は拗音 = に+小さいゅ。\nにゅういん = nhập viện. にゅ là âm thu nhỏ = に + ゅ nhỏ.',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 カタカナ L7 =====
  'n5-01-7': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'カタカナ第1回 〜ア行〜サ行〜',
      titleTranslation: 'Katakana Bài 1 - Hàng ア đến hàng サ',
      introduction: `ひらがなをマスターしたら、次はカタカナです。カタカナは主に外来語・外国人名・医療用語・擬音語に使います。ひらがなと同じ発音で、形だけが違います。

Sau khi thành thạo Hiragana, tiếp theo là Katakana. Katakana chủ yếu dùng cho từ ngoại lai, tên người nước ngoài, thuật ngữ y tế và từ tượng thanh. Phát âm giống Hiragana, chỉ khác hình dạng.`,
      keyPoints: [
        'ア行：ア(a)・イ(i)・ウ(u)・エ(e)・オ(o)　← あいうえお と同じ発音',
        'カ行：カ(ka)・キ(ki)・ク(ku)・ケ(ke)・コ(ko)',
        'サ行：サ(sa)・シ(shi)・ス(su)・セ(se)・ソ(so)',
        'カタカナは直線的で角張った形が特徴',
        '長音記号「ー」：ナース（nurse）、ドア（door）など母音を伸ばす',
        '医療でよく使うカタカナ：ナース・ケア・スタッフ・サービス・スキル',
      ],
      vocabulary: [
        { word: 'ナース', reading: 'ナース', meaning: '看護師（y tá）', example: 'ナースコール' },
        { word: 'ケア', reading: 'ケア', meaning: 'ケア（chăm sóc）', example: 'スキンケア' },
        { word: 'スタッフ', reading: 'スタッフ', meaning: 'スタッフ（nhân viên）', example: 'スタッフ全員' },
        { word: 'アイス', reading: 'アイス', meaning: 'アイス（kem）', example: 'アイスクリーム' },
        { word: 'コーヒー', reading: 'コーヒー', meaning: 'コーヒー（cà phê）', example: 'コーヒーをのむ' },
        { word: 'スキル', reading: 'スキル', meaning: '技能（kỹ năng）', example: 'スキルをあげる' },
        { word: 'サービス', reading: 'サービス', meaning: 'サービス（dịch vụ）', example: 'かいごサービス' },
        { word: 'セーター', reading: 'セーター', meaning: 'セーター（áo len）', example: 'セーターをきる' },
      ],
      examples: [
        { japanese: 'ナースコールをおしてください。', reading: 'ナースコールをおしてください。', translation: 'Hãy nhấn chuông gọi y tá. （介護の声かけ）' },
        { japanese: 'スタッフにきいてください。', reading: 'スタッフにきいてください。', translation: 'Hãy hỏi nhân viên.' },
        { japanese: 'スキンケアはたいせつです。', reading: 'スキンケアはたいせつです。', translation: 'Chăm sóc da rất quan trọng.' },
      ],
      grammarNote: `【カタカナとひらがなの対応】
あ→ア　い→イ　う→ウ　え→エ　お→オ
か→カ　き→キ　く→ク　け→ケ　こ→コ
さ→サ　し→シ　す→ス　せ→セ　そ→ソ

【カタカナの長音「ー」】
母音を1拍分伸ばす記号
ナ ー ス（na-a-su = nurse）
コ ー ヒ ー（ko-o-hi-i = coffee）
ケ ア（ke-a = care）

【介護施設でよく見るカタカナ掲示】
ナースステーション / スタッフルーム / サービスセンター`,
      quizzes: [
        {
          question: '「ナース」の意味は？',
          options: [{ id: 'a', text: '医師' }, { id: 'b', text: '看護師' }, { id: 'c', text: '薬剤師' }, { id: 'd', text: '介護士' }],
          correctId: 'b',
          explanation: '「ナース」= nurse = 看護師。英語のnurseをカタカナにしたものです。\n「ナース」= nurse = y tá. Chữ Katakana của từ tiếng Anh "nurse".',
          difficulty: 'easy' as const,
        },
        {
          question: 'カタカナで長音を表すのは？',
          options: [{ id: 'a', text: 'っ' }, { id: 'b', text: 'ー' }, { id: 'c', text: 'ん' }, { id: 'd', text: 'ゃ' }],
          correctId: 'b',
          explanation: 'カタカナでは「ー」が長音を表します。ナース・コーヒー・サービスなど。\nTrong Katakana, ー là ký hiệu âm dài. Ví dụ: ナース・コーヒー・サービス',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 カタカナ L8 =====
  'n5-01-8': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'カタカナ第2回 〜タ行〜ハ行〜',
      titleTranslation: 'Katakana Bài 2 - Hàng タ đến hàng ハ',
      introduction: `前回に続き、カタカナの「タ行・ナ行・ハ行」を学びます。医療・介護でよく使う外来語（バイタル・ヘルパー・トイレなど）を中心に覚えましょう。

Tiếp tục học Katakana hàng タ・ナ・ハ. Tập trung vào từ ngoại lai hay dùng trong y tế và điều dưỡng như バイタル・ヘルパー・トイレ.`,
      keyPoints: [
        'タ行：タ(ta)・チ(chi)・ツ(tsu)・テ(te)・ト(to)',
        'ナ行：ナ(na)・ニ(ni)・ヌ(nu)・ネ(ne)・ノ(no)',
        'ハ行：ハ(ha)・ヒ(hi)・フ(fu)・ヘ(he)・ホ(ho)',
        '濁音：ダ・ヂ・ヅ・デ・ド / バ・ビ・ブ・ベ・ボ',
        '半濁音：パ・ピ・プ・ペ・ポ',
        '医療頻出：バイタル・ヘルパー・トイレ・ナースステーション・パジャマ',
      ],
      vocabulary: [
        { word: 'バイタル', reading: 'バイタル', meaning: 'バイタルサイン（dấu hiệu sinh tồn）', example: 'バイタルをはかる' },
        { word: 'ヘルパー', reading: 'ヘルパー', meaning: 'ホームヘルパー（người hỗ trợ）', example: 'ヘルパーさん' },
        { word: 'トイレ', reading: 'トイレ', meaning: 'トイレ（nhà vệ sinh）', example: 'トイレにいく' },
        { word: 'パジャマ', reading: 'パジャマ', meaning: 'パジャマ（pyjama）', example: 'パジャマにきがえる' },
        { word: 'テーブル', reading: 'テーブル', meaning: 'テーブル（bàn ăn）', example: 'テーブルにつく' },
        { word: 'ノート', reading: 'ノート', meaning: 'ノート（vở ghi chép）', example: 'ノートにかく' },
        { word: 'ベッド', reading: 'ベッド', meaning: 'ベッド（giường）', example: 'ベッドにはいる' },
        { word: 'ドア', reading: 'ドア', meaning: 'ドア（cửa）', example: 'ドアをしめる' },
      ],
      examples: [
        { japanese: 'バイタルをはかります。たいおん・けつあつ・みゃくはくです。', reading: 'バイタルをはかります。たいおん・けつあつ・みゃくはくです。', translation: 'Tôi đo dấu hiệu sinh tồn. Gồm nhiệt độ, huyết áp và mạch.' },
        { japanese: 'トイレにいきたいですか？', reading: 'トイレにいきたいですか？', translation: 'Bạn muốn đi vệ sinh không?' },
        { japanese: 'ベッドにもどりましょう。', reading: 'ベッドにもどりましょう。', translation: 'Hãy quay lại giường nhé.' },
      ],
      grammarNote: `【タ行〜ハ行 カタカナ対応】
た→タ　ち→チ　つ→ツ　て→テ　と→ト
な→ナ　に→ニ　ぬ→ヌ　ね→ネ　の→ノ
は→ハ　ひ→ヒ　ふ→フ　へ→ヘ　ほ→ホ

【介護施設でよく使うカタカナ語】
バイタル（vital signs）
ヘルパー（helper/care worker）
トイレ（toilet）
ベッド（bed）
テーブル（table）
パジャマ（pajama/nightwear）
ノート（notebook/care record）`,
      quizzes: [
        {
          question: '「バイタル」とは何を指す？',
          options: [{ id: 'a', text: '食事の量' }, { id: 'b', text: '体温・血圧・脈拍などの生命兆候' }, { id: 'c', text: '排泄記録' }, { id: 'd', text: 'ベッドの位置' }],
          correctId: 'b',
          explanation: 'バイタル（バイタルサイン）= vital signs = 体温・血圧・脈拍・呼吸数など。介護の基本業務です。\nバイタル = dấu hiệu sinh tồn = nhiệt độ, huyết áp, mạch...',
          difficulty: 'easy' as const,
        },
        {
          question: '「ベッド」をひらがなで書くと？（発音）',
          options: [{ id: 'a', text: 'べっど' }, { id: 'b', text: 'べど' }, { id: 'c', text: 'べっと' }, { id: 'd', text: 'べつど' }],
          correctId: 'a',
          explanation: '「ベッド」= べっど（促音あり）。カタカナのッはひらがなのっと同じ促音。\nベッド phát âm là べっど (có âm ngừng っ).',
          difficulty: 'medium' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 カタカナ L9 =====
  'n5-01-9': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: 'カタカナ第3回 〜マ行〜ワ行・外来語の読み方〜',
      titleTranslation: 'Katakana Bài 3 - Hàng マ〜ワ và cách đọc từ ngoại lai',
      introduction: `カタカナの残りの行「マ行・ヤ行・ラ行・ワ行」を学びます。また、英語をカタカナに変換するルールを覚えると、新しいカタカナ語を見たとき自力で読めるようになります。

Học các hàng còn lại của Katakana: マ・ヤ・ラ・ワ. Và nếu nhớ quy tắc chuyển từ tiếng Anh sang Katakana, bạn có thể tự đọc từ Katakana mới.`,
      keyPoints: [
        'マ行：マ(ma)・ミ(mi)・ム(mu)・メ(me)・モ(mo)',
        'ヤ行：ヤ(ya)・ユ(yu)・ヨ(yo)',
        'ラ行：ラ(ra)・リ(ri)・ル(ru)・レ(re)・ロ(ro)',
        'ワ行：ワ(wa)・ヲ(wo)・ン(n)',
        '英→カタカナ：語末の子音は省く/母音を加える、th→ス/ズ、v→ヴ/ブ',
        '医療・介護で最重要：リハビリ・マスク・メディカル・モニター・ユニット',
      ],
      vocabulary: [
        { word: 'リハビリ', reading: 'リハビリ', meaning: 'リハビリテーション（phục hồi chức năng）', example: 'リハビリをする' },
        { word: 'マスク', reading: 'マスク', meaning: 'マスク（khẩu trang）', example: 'マスクをつける' },
        { word: 'メディカル', reading: 'メディカル', meaning: '医療（y tế）', example: 'メディカルチェック' },
        { word: 'モニター', reading: 'モニター', meaning: 'モニター（màn hình）', example: 'モニターをみる' },
        { word: 'ユニット', reading: 'ユニット', meaning: 'ユニット（đơn vị khu）', example: 'ユニットリーダー' },
        { word: 'ラジオ', reading: 'ラジオ', meaning: 'ラジオ（radio）', example: 'ラジオをきく' },
        { word: 'ミキサー', reading: 'ミキサー', meaning: 'ミキサー（máy xay）', example: 'ミキサーしょく' },
        { word: 'ロール', reading: 'ロール', meaning: '役割（vai trò）', example: 'ロールプレイ' },
      ],
      examples: [
        { japanese: 'リハビリのじかんです。がんばりましょう。', reading: 'リハビリのじかんです。がんばりましょう。', translation: 'Đến giờ phục hồi chức năng. Cùng cố gắng nhé.' },
        { japanese: 'マスクをしてください。かんせんよぼうのため。', reading: 'マスクをしてください。かんせんよぼうのため。', translation: 'Hãy đeo khẩu trang để phòng ngừa lây nhiễm.' },
        { japanese: 'ミキサーしょくにしますか？', reading: 'ミキサーしょくにしますか？', translation: 'Bạn muốn dùng cơm nghiền máy xay không?' },
      ],
      grammarNote: `【マ〜ワ行 カタカナ対応】
ま→マ　み→ミ　む→ム　め→メ　も→モ
や→ヤ　ゆ→ユ　よ→ヨ
ら→ラ　り→リ　る→ル　れ→レ　ろ→ロ
わ→ワ　を→ヲ　ん→ン

【英語→カタカナ変換のルール】
語末子音：bed→ベッド / mask→マスク
th：health→ヘルス / bath→バス
l と r：どちらも「ラ行」で表す
er/or(語末)：→「ー」: water→ウォーター

【介護のカタカナ重要語一覧】
リハビリ / マスク / モニター / ユニット
ミキサー食 / バイタル / ヘルパー / ケア`,
      quizzes: [
        {
          question: '「リハビリ」とは何の略？',
          options: [{ id: 'a', text: 'リハビリテーション' }, { id: 'b', text: 'リズムバランス' }, { id: 'c', text: 'リラクゼーション' }, { id: 'd', text: 'リソースマネジメント' }],
          correctId: 'a',
          explanation: 'リハビリ = リハビリテーション（rehabilitation）。機能回復訓練のことです。\nリハビリ = リハビリテーション = phục hồi chức năng.',
          difficulty: 'easy' as const,
        },
        {
          question: '「ミキサー食」とは？',
          options: [{ id: 'a', text: '冷凍食品' }, { id: 'b', text: '細かく刻んだ食事' }, { id: 'c', text: 'ミキサーで滑らかにした食事' }, { id: 'd', text: '温かい食事' }],
          correctId: 'c',
          explanation: 'ミキサー食はミキサー（blender）で食材を滑らかにした流動食。嚥下困難者に提供します。\nMixa食 = thức ăn xay nhuyễn bằng máy, dành cho người khó nuốt.',
          difficulty: 'medium' as const,
        },
      ],
      xpReward: 25,
    },
  },

  // ===== N5 総復習 L10 =====
  'n5-01-10': {
    courseTitle: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    isLocked: false, requiredPlan: 'free',
    lesson: {
      title: '総復習 〜ひらがな・カタカナ全46字テスト〜',
      titleTranslation: 'Ôn tập tổng hợp - Kiểm tra toàn bộ 46 chữ Hiragana và Katakana',
      introduction: `10回のレッスンの集大成です。ひらがな46字・カタカナ46字すべての読み書きと、介護現場でよく使う語彙を総復習します。このレッスンをクリアすれば、日本語の文字の基礎が完成です！

Đây là tổng kết 10 bài học. Ôn tổng hợp toàn bộ 46 chữ Hiragana, 46 chữ Katakana và từ vựng hay dùng trong điều dưỡng. Hoàn thành bài này là bạn đã xong nền tảng chữ tiếng Nhật!`,
      keyPoints: [
        'ひらがな46字 完全制覇：あ〜ん、濁音・半濁音・拗音・促音・長音',
        'カタカナ46字 完全制覇：ア〜ン、外来語・医療用語への応用',
        '読み書きの総確認：両方向の変換ができるか確認',
        '介護現場の必須語彙：バイタル・ナース・ケア・トイレ・リハビリ',
        '発音の注意点総まとめ：し・ち・つ・ふ、濁音・拗音・促音',
        'おめでとう！このコースで日本語学習の土台が完成しました',
      ],
      vocabulary: [
        { word: 'おつかれさまでした', reading: 'おつかれさまでした', meaning: 'お疲れ様でした（Cảm ơn vì đã vất vả）', example: '（退勤時に）おつかれさまでした' },
        { word: 'ありがとうございます', reading: 'ありがとうございます', meaning: 'ありがとう（Cảm ơn）', example: 'こころからありがとうございます' },
        { word: 'すみません', reading: 'すみません', meaning: 'すみません（Xin lỗi/Excuse me）', example: 'すみません、たすけてください' },
        { word: 'よろしくおねがいします', reading: 'よろしくおねがいします', meaning: 'よろしく（Nhờ vào）', example: 'これからよろしくおねがいします' },
        { word: 'バイタルチェック', reading: 'バイタルチェック', meaning: '生命兆候確認（kiểm tra dấu hiệu sinh tồn）', example: 'まいあさバイタルチェック' },
        { word: 'ケアプラン', reading: 'ケアプラン', meaning: '介護計画（kế hoạch chăm sóc）', example: 'ケアプランをたてる' },
        { word: 'リハビリ', reading: 'リハビリ', meaning: '機能回復訓練（phục hồi chức năng）', example: 'デイサービスでリハビリ' },
        { word: 'コミュニケーション', reading: 'コミュニケーション', meaning: '意思疎通（giao tiếp）', example: 'りようしゃとのコミュニケーション' },
      ],
      examples: [
        { japanese: 'おはようございます！バイタルをはかりますね。', reading: 'おはようございます！バイタルをはかりますね。', translation: 'Chào buổi sáng! Tôi đo dấu hiệu sinh tồn nhé.' },
        { japanese: 'ケアプランにしたがって、リハビリをおこないます。', reading: 'ケアプランにしたがって、リハビリをおこないます。', translation: 'Thực hiện phục hồi chức năng theo kế hoạch chăm sóc.' },
        { japanese: 'りようしゃとのコミュニケーションがいちばんたいせつです。', reading: 'りようしゃとのコミュニケーションがいちばんたいせつです。', translation: 'Giao tiếp với người dùng dịch vụ là quan trọng nhất.' },
      ],
      grammarNote: `【ひらがな・カタカナ 総まとめ】

■ ひらがな 全一覧
清音：あいうえお かきくけこ さしすせそ たちつてと
     なにぬねの はひふへほ まみむめも やゆよ
     らりるれろ わをん
濁音：がぎぐげご ざじずぜぞ だぢづでど ばびぶべぼ
半濁音：ぱぴぷぺぽ
拗音：きゃきゅきょ しゃしゅしょ ちゃちゅちょ etc.

■ カタカナ 全一覧
アイウエオ カキクケコ サシスセソ タチツテト
ナニヌネノ ハヒフヘホ マミムメモ ヤユヨ
ラリルレロ ワヲン

■ 介護現場で最重要の語彙
ひらがな：ごはん・くすり・おふろ・みずをのむ・ゆっくり
カタカナ：バイタル・ナース・ケア・ベッド・トイレ・リハビリ`,
      quizzes: [
        {
          question: 'カタカナで「リハビリ・テーブル・マスク」をひらがな（発音）に直すと？',
          options: [
            { id: 'a', text: 'りはびり・てーぶる・ますく' },
            { id: 'b', text: 'りあびり・てぶる・ますく' },
            { id: 'c', text: 'りはびる・てーぶ・ますっく' },
            { id: 'd', text: 'りはびり・てーぶ・ますく' },
          ],
          correctId: 'a',
          explanation: 'カタカナとひらがなは同じ発音。ー（長音記号）はそのまま伸ばします。\nKatakana và Hiragana đọc giống nhau. ー là dấu kéo dài âm.',
          difficulty: 'medium' as const,
        },
        {
          question: '介護現場でよく使うカタカナ語として正しいのは？',
          options: [
            { id: 'a', text: 'バイタル・ケア・リハビリ' },
            { id: 'b', text: 'サッカー・テニス・ゴルフ' },
            { id: 'c', text: 'レストラン・ホテル・カフェ' },
            { id: 'd', text: 'テレビ・ゲーム・アニメ' },
          ],
          correctId: 'a',
          explanation: '介護現場で頻出：バイタル(vital signs)・ケア(care)・リハビリ(rehabilitation)\nHay gặp trong điều dưỡng: バイタル・ケア・リハビリ',
          difficulty: 'easy' as const,
        },
        {
          question: '「おつかれさまでした」はどんなときに使う？',
          options: [
            { id: 'a', text: '朝のあいさつ' },
            { id: 'b', text: '仕事終わりや退勤のとき' },
            { id: 'c', text: '食事の前' },
            { id: 'd', text: '誰かに会ったとき' },
          ],
          correctId: 'b',
          explanation: '「おつかれさまでした」は仕事終わりや退勤時に使います。上司・同僚どちらにも使えます。\nDùng khi kết thúc ca làm. Dùng được với cả cấp trên và đồng nghiệp.',
          difficulty: 'easy' as const,
        },
      ],
      xpReward: 50,
    },
  },
};

// Fallback lesson for unknown IDs
const fallbackLesson: LessonData = {
  courseTitle: { ja: 'コース', vi: 'Khóa học' },
  isLocked: false,
  requiredPlan: 'free',
  lesson: {
    title: '介護の基本語彙 — レッスン1',
    titleTranslation: 'Từ vựng điều dưỡng cơ bản — Bài 1',
    introduction: `今日は介護現場でよく使う基本的な言葉を学びましょう。\n\nHôm nay chúng ta sẽ học những từ cơ bản thường dùng trong môi trường chăm sóc điều dưỡng.`,
    keyPoints: [
      'お体の具合はいかがですか？— 体調を確認する',
      'お食事の時間です — 食事の時間を知らせる',
      'ゆっくりでいいですよ — 焦らせずに安心させる',
    ],
    vocabulary: [
      { word: '具合', reading: 'ぐあい', meaning: '体の調子（tình trạng sức khỏe）', example: '具合はいかがですか' },
      { word: '食事', reading: 'しょくじ', meaning: '食べること（bữa ăn）', example: 'お食事の時間' },
    ],
    examples: [
      { japanese: 'お体の具合はいかがですか？', reading: 'おからだのぐあいはいかがですか？', translation: 'Cơ thể bạn cảm thấy thế nào?' },
      { japanese: 'ゆっくり休んでください。', reading: 'ゆっくりやすんでください。', translation: 'Hãy nghỉ ngơi từ từ nhé.' },
    ],
    quiz: {
      question: '「お体の具合はいかがですか？」の意味は？',
      options: [
        { id: 'a', text: 'ご飯を食べましたか？' },
        { id: 'b', text: '体の調子はどうですか？' },
        { id: 'c', text: 'どこに行きますか？' },
        { id: 'd', text: '何時ですか？' },
      ],
      correctId: 'b',
      explanation: '「具合」は「調子・状態」という意味です。相手の健康状態を丁寧に聞く表現です。\n"具合" có nghĩa là "tình trạng". Đây là cách hỏi lịch sự về sức khỏe.',
    },
    xpReward: 20,
  },
};

// ── Course lesson lists ──────────────────────────────────────
const courseLessonMap: Record<string, string[]> = {
  'n5-01': ['n5-01', 'n5-01-2', 'n5-01-3', 'n5-01-4', 'n5-01-5', 'n5-01-6', 'n5-01-7', 'n5-01-8', 'n5-01-9', 'n5-01-10'],
};

const lessonShortTitle: Record<string, { ja: string; vi: string }> = {
  'n5-01':    { ja: 'あ行・か行', vi: 'Hàng あ・か' },
  'n5-01-2':  { ja: 'さ行・た行', vi: 'Hàng さ・た' },
  'n5-01-3':  { ja: 'な行・は行', vi: 'Hàng な・は' },
  'n5-01-4':  { ja: 'ま行〜ん', vi: 'Hàng ま〜ん' },
  'n5-01-5':  { ja: '濁音・半濁音', vi: 'Âm đục/bán đục' },
  'n5-01-6':  { ja: '拗音・長音・促音', vi: 'Âm đặc biệt' },
  'n5-01-7':  { ja: 'カタカナ①', vi: 'Katakana①' },
  'n5-01-8':  { ja: 'カタカナ②', vi: 'Katakana②' },
  'n5-01-9':  { ja: 'カタカナ③', vi: 'Katakana③' },
  'n5-01-10': { ja: '総復習テスト', vi: 'Kiểm tra tổng hợp' },
};

// Find course ID for a given lesson ID
function getCourseId(lessonId: string): string | null {
  for (const [courseId, lessons] of Object.entries(courseLessonMap)) {
    if (lessons.includes(lessonId)) return courseId;
  }
  return null;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { locale, id } = use(params);
  const t = useTranslations();
  const [isComplete, setIsComplete] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [userPlan, setUserPlan] = useState<'free' | 'basic' | 'pro'>('free');

  useEffect(() => {
    const loadPlan = async () => {
      if (!isSupabaseConfigured) return;
      const supabase = createClient();
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: userData } = await supabase
        .from('users')
        .select('plan')
        .eq('id', session.user.id)
        .single();
      if (userData?.plan) setUserPlan(userData.plan as 'free' | 'basic' | 'pro');
    };
    loadPlan();
  }, []);

  const data = mockLessons[id] ?? fallbackLesson;
  const { lesson, courseTitle } = data;

  const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const effectivelyLocked = planOrder[data.requiredPlan] > planOrder[userPlan];

  // Course-level navigation
  const courseId = getCourseId(id);
  const lessonList = courseId ? courseLessonMap[courseId] : null;
  const lessonIndex = lessonList ? lessonList.indexOf(id) : -1;
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : null;
  const totalLessons = lessonList ? lessonList.length : null;
  const prevLessonId = lessonList && lessonIndex > 0 ? lessonList[lessonIndex - 1] : null;
  const nextLessonId = lessonList && lessonIndex < lessonList.length - 1 ? lessonList[lessonIndex + 1] : null;

  const handleComplete = (score: number) => {
    const xpEarned = Math.round((score / 100) * lesson.xpReward);
    setEarnedXp(xpEarned);
    setIsComplete(true);
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: id, status: 'completed', quizScore: score, xpEarned }),
    }).catch(() => {});
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header nav */}
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/${locale}/courses`}>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <ChevronLeft className="h-4 w-4" />
            {locale === 'ja' ? courseTitle.ja : courseTitle.vi}
          </Button>
        </Link>
      </div>

      {/* Lesson progress bar (multi-lesson courses only) */}
      {lessonNumber && totalLessons && (
        <div style={{
          background: 'var(--white)', border: '1px solid var(--line)',
          borderRadius: 16, padding: '16px 20px', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>
              {locale === 'ja'
                ? `レッスン ${lessonNumber} / ${totalLessons}`
                : `Bài ${lessonNumber} / ${totalLessons}`}
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              {locale === 'ja'
                ? lessonShortTitle[id]?.ja ?? ''
                : lessonShortTitle[id]?.vi ?? ''}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ background: 'var(--line)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 100,
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
              width: `${(lessonNumber / totalLessons) * 100}%`,
              transition: 'width 0.4s ease',
            }}/>
          </div>
          {/* Lesson dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {lessonList!.map((lid, idx) => (
              <Link key={lid} href={`/${locale}/courses/${lid}`} style={{ textDecoration: 'none' }}>
                <div title={locale === 'ja' ? lessonShortTitle[lid]?.ja : lessonShortTitle[lid]?.vi} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: idx < lessonIndex ? 'var(--primary)' : idx === lessonIndex ? 'var(--ink)' : 'var(--line)',
                  color: idx <= lessonIndex ? '#fff' : 'var(--ink-soft)',
                  border: idx === lessonIndex ? '2px solid var(--ink)' : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {idx + 1}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {effectivelyLocked && (
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            {locale === 'ja' ? 'このレッスンはロックされています' : 'Bài học này đã bị khóa'}
          </h2>
          <p className="text-gray-500 mb-6">
            {data.requiredPlan === 'pro'
              ? locale === 'ja' ? 'PROプランにアップグレードして全コースにアクセス' : 'Nâng cấp lên gói PRO để truy cập tất cả khóa học'
              : locale === 'ja' ? 'BASICプランにアップグレードして解除' : 'Nâng cấp lên gói BASIC để mở khóa'
            }
          </p>
          <Link href={`/${locale}/pricing`}>
            <Button>{t('pricing.upgrade')}</Button>
          </Link>
        </div>
      )}

      {/* Lesson */}
      {!effectivelyLocked && !isComplete && (
        <LessonView lesson={lesson} onComplete={handleComplete} locale={locale} />
      )}

      {/* Completion */}
      {!effectivelyLocked && isComplete && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Star className="h-12 w-12 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'ja' ? 'レッスン完了！' : 'Hoàn thành bài học!'}
          </h2>
          <div className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-flex mb-8 mx-auto">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-700 font-bold text-xl">+{earnedXp} XP {t('lesson.xpEarned')}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            {nextLessonId ? (
              <Link href={`/${locale}/courses/${nextLessonId}`}>
                <Button className="gap-2">
                  {locale === 'ja'
                    ? `次のレッスンへ → ${lessonShortTitle[nextLessonId]?.ja ?? ''}`
                    : `Bài tiếp theo → ${lessonShortTitle[nextLessonId]?.vi ?? ''}`}
                </Button>
              </Link>
            ) : null}
            <Link href={`/${locale}/courses`}>
              <Button variant="outline">
                {locale === 'ja' ? 'コース一覧に戻る' : 'Về danh sách khóa học'}
              </Button>
            </Link>
            <Link href={`/${locale}/ai-tutor`}>
              <Button variant="outline">
                {locale === 'ja' ? 'Medi先生に質問する' : 'Hỏi Medi-sensei'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
