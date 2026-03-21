"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  X,
  Trophy,
  BookOpen,
  Volume2,
} from "lucide-react";

// ============================================================
// 語彙データ (50語: 各課10語 × 5課)
// ============================================================
const VOCAB_SETS: Record<string, {
  word: string;
  reading: string;
  meaning: string;
  translation: { vi: string; en: string; zh: string };
  example: string;
  exampleReading: string;
  exampleTranslation: { vi: string; en: string; zh: string };
  category: string;
}[]> = {
  // 第1課: 体の部位 (10語)
  "lesson-vocab-01": [
    { word: "頭", reading: "あたま", meaning: "頭部", translation: { vi: "đầu", en: "head", zh: "头" }, example: "頭が痛いです。", exampleReading: "あたまが いたいです。", exampleTranslation: { vi: "Tôi bị đau đầu.", en: "My head hurts.", zh: "我头痛。" }, category: "体の部位" },
    { word: "手", reading: "て", meaning: "手・腕", translation: { vi: "tay", en: "hand", zh: "手" }, example: "手を洗ってください。", exampleReading: "てを あらってください。", exampleTranslation: { vi: "Vui lòng rửa tay.", en: "Please wash your hands.", zh: "请洗手。" }, category: "体の部位" },
    { word: "足", reading: "あし", meaning: "足・脚", translation: { vi: "chân", en: "foot/leg", zh: "脚" }, example: "足が痛いです。", exampleReading: "あしが いたいです。", exampleTranslation: { vi: "Tôi bị đau chân.", en: "My leg hurts.", zh: "我脚痛。" }, category: "体の部位" },
    { word: "背中", reading: "せなか", meaning: "背中・背部", translation: { vi: "lưng", en: "back", zh: "背部" }, example: "背中を洗います。", exampleReading: "せなかを あらいます。", exampleTranslation: { vi: "Tôi rửa lưng.", en: "I wash the back.", zh: "我洗背部。" }, category: "体の部位" },
    { word: "お腹", reading: "おなか", meaning: "腹部", translation: { vi: "bụng", en: "stomach/belly", zh: "肚子" }, example: "お腹が痛いですか？", exampleReading: "おなかが いたいですか？", exampleTranslation: { vi: "Bạn có đau bụng không?", en: "Does your stomach hurt?", zh: "你肚子痛吗？" }, category: "体の部位" },
    { word: "胸", reading: "むね", meaning: "胸・胸部", translation: { vi: "ngực", en: "chest", zh: "胸" }, example: "胸が苦しいですか？", exampleReading: "むねが くるしいですか？", exampleTranslation: { vi: "Bạn có khó thở không?", en: "Do you have chest pain?", zh: "你胸闷吗？" }, category: "体の部位" },
    { word: "首", reading: "くび", meaning: "首・頸部", translation: { vi: "cổ", en: "neck", zh: "脖子" }, example: "首が痛いです。", exampleReading: "くびが いたいです。", exampleTranslation: { vi: "Tôi bị đau cổ.", en: "My neck hurts.", zh: "我脖子痛。" }, category: "体の部位" },
    { word: "腰", reading: "こし", meaning: "腰・腰部", translation: { vi: "lưng dưới/hông", en: "lower back/waist", zh: "腰" }, example: "腰が痛くなりました。", exampleReading: "こしが いたくなりました。", exampleTranslation: { vi: "Tôi bị đau lưng.", en: "My lower back started hurting.", zh: "我腰开始痛了。" }, category: "体の部位" },
    { word: "肩", reading: "かた", meaning: "肩・肩部", translation: { vi: "vai", en: "shoulder", zh: "肩膀" }, example: "肩をもみましょうか？", exampleReading: "かたを もみましょうか？", exampleTranslation: { vi: "Tôi xoa bóp vai cho bạn nhé?", en: "Shall I massage your shoulders?", zh: "我给你按摩肩膀吧？" }, category: "体の部位" },
    { word: "膝", reading: "ひざ", meaning: "膝・膝関節", translation: { vi: "đầu gối", en: "knee", zh: "膝盖" }, example: "膝が曲がりますか？", exampleReading: "ひざが まがりますか？", exampleTranslation: { vi: "Bạn có thể cong đầu gối không?", en: "Can you bend your knee?", zh: "你能弯曲膝盖吗？" }, category: "体の部位" },
  ],

  // 第2課: 日常動作 (10語)
  "lesson-vocab-02": [
    { word: "起きる", reading: "おきる", meaning: "起床する", translation: { vi: "thức dậy", en: "to wake up / get up", zh: "起床" }, example: "何時に起きましたか？", exampleReading: "なんじに おきましたか？", exampleTranslation: { vi: "Bạn dậy lúc mấy giờ?", en: "What time did you wake up?", zh: "你几点起床的？" }, category: "日常動作" },
    { word: "食べる", reading: "たべる", meaning: "食事する", translation: { vi: "ăn", en: "to eat", zh: "吃" }, example: "ゆっくり食べてください。", exampleReading: "ゆっくり たべてください。", exampleTranslation: { vi: "Vui lòng ăn chậm thôi.", en: "Please eat slowly.", zh: "请慢慢吃。" }, category: "日常動作" },
    { word: "飲む", reading: "のむ", meaning: "飲み物を摂る", translation: { vi: "uống", en: "to drink", zh: "喝" }, example: "薬を飲みましたか？", exampleReading: "くすりを のみましたか？", exampleTranslation: { vi: "Bạn đã uống thuốc chưa?", en: "Did you take your medicine?", zh: "你喝药了吗？" }, category: "日常動作" },
    { word: "歩く", reading: "あるく", meaning: "歩行する", translation: { vi: "đi bộ", en: "to walk", zh: "走路" }, example: "ゆっくり歩きましょう。", exampleReading: "ゆっくり あるきましょう。", exampleTranslation: { vi: "Hãy đi bộ chậm thôi.", en: "Let's walk slowly.", zh: "慢慢走吧。" }, category: "日常動作" },
    { word: "座る", reading: "すわる", meaning: "着席する", translation: { vi: "ngồi xuống", en: "to sit down", zh: "坐下" }, example: "こちらに座ってください。", exampleReading: "こちらに すわってください。", exampleTranslation: { vi: "Vui lòng ngồi xuống đây.", en: "Please sit down here.", zh: "请坐在这里。" }, category: "日常動作" },
    { word: "立つ", reading: "たつ", meaning: "起立する", translation: { vi: "đứng dậy", en: "to stand up", zh: "站起来" }, example: "ゆっくり立ってください。", exampleReading: "ゆっくり たってください。", exampleTranslation: { vi: "Vui lòng đứng dậy từ từ.", en: "Please stand up slowly.", zh: "请慢慢站起来。" }, category: "日常動作" },
    { word: "洗う", reading: "あらう", meaning: "清潔にする", translation: { vi: "rửa", en: "to wash", zh: "洗" }, example: "顔を洗いましょう。", exampleReading: "かおを あらいましょう。", exampleTranslation: { vi: "Hãy rửa mặt nào.", en: "Let's wash your face.", zh: "来洗脸吧。" }, category: "日常動作" },
    { word: "寝る", reading: "ねる", meaning: "就寝する", translation: { vi: "ngủ / nằm xuống", en: "to sleep / lie down", zh: "睡觉/躺下" }, example: "ベッドで寝てください。", exampleReading: "ベッドで ねてください。", exampleTranslation: { vi: "Vui lòng nằm xuống giường.", en: "Please lie down on the bed.", zh: "请躺在床上。" }, category: "日常動作" },
    { word: "着る", reading: "きる", meaning: "衣服を身につける", translation: { vi: "mặc (áo)", en: "to wear / put on", zh: "穿（上衣）" }, example: "洋服を着ましょう。", exampleReading: "ようふくを きましょう。", exampleTranslation: { vi: "Hãy mặc quần áo vào.", en: "Let's get dressed.", zh: "来穿衣服吧。" }, category: "日常動作" },
    { word: "トイレ", reading: "トイレ", meaning: "化粧室・便所", translation: { vi: "nhà vệ sinh", en: "toilet / restroom", zh: "厕所" }, example: "トイレに行きたいですか？", exampleReading: "トイレに いきたいですか？", exampleTranslation: { vi: "Bạn có muốn đi vệ sinh không?", en: "Do you want to go to the toilet?", zh: "你想去厕所吗？" }, category: "日常動作" },
  ],

  // 第3課: 介護・医療用語 (10語)
  "lesson-vocab-03": [
    { word: "利用者", reading: "りようしゃ", meaning: "介護サービスを利用する人", translation: { vi: "người dùng dịch vụ", en: "service user / resident", zh: "利用者" }, example: "利用者さんのお名前は？", exampleReading: "りようしゃさんの おなまえは？", exampleTranslation: { vi: "Tên của người dùng dịch vụ là gì?", en: "What is the resident's name?", zh: "利用者叫什么名字？" }, category: "介護用語" },
    { word: "介助", reading: "かいじょ", meaning: "日常生活動作を手伝う", translation: { vi: "hỗ trợ sinh hoạt", en: "assistance / care support", zh: "辅助" }, example: "食事介助をします。", exampleReading: "しょくじかいじょを します。", exampleTranslation: { vi: "Tôi hỗ trợ bữa ăn.", en: "I will assist with meals.", zh: "我来辅助进食。" }, category: "介護用語" },
    { word: "入浴", reading: "にゅうよく", meaning: "お風呂に入ること", translation: { vi: "tắm (trong bồn)", en: "bathing", zh: "洗澡" }, example: "今日は入浴の日です。", exampleReading: "きょうは にゅうよくの ひです。", exampleTranslation: { vi: "Hôm nay là ngày tắm.", en: "Today is bath day.", zh: "今天是洗澡日。" }, category: "介護用語" },
    { word: "移乗", reading: "いじょう", meaning: "車椅子などへの乗り移り", translation: { vi: "chuyển người (lên xe lăn)", en: "transfer (to wheelchair etc.)", zh: "转移（到轮椅等）" }, example: "車椅子への移乗を手伝います。", exampleReading: "くるまいすへの いじょうを てつだいます。", exampleTranslation: { vi: "Tôi giúp chuyển lên xe lăn.", en: "I will help transfer to the wheelchair.", zh: "我来帮助转移到轮椅。" }, category: "介護用語" },
    { word: "申し送り", reading: "もうしおくり", meaning: "業務の引き継ぎ", translation: { vi: "bàn giao công việc", en: "shift handover / report", zh: "交接班" }, example: "申し送りを読みましたか？", exampleReading: "もうしおくりを よみましたか？", exampleTranslation: { vi: "Bạn đã đọc báo cáo bàn giao chưa?", en: "Did you read the handover report?", zh: "你读了交接班报告吗？" }, category: "介護用語" },
    { word: "記録", reading: "きろく", meaning: "ケア記録・日誌", translation: { vi: "ghi chép / hồ sơ", en: "record / documentation", zh: "记录" }, example: "記録に書いてください。", exampleReading: "きろくに かいてください。", exampleTranslation: { vi: "Vui lòng ghi vào hồ sơ.", en: "Please write it in the record.", zh: "请写在记录里。" }, category: "介護用語" },
    { word: "施設", reading: "しせつ", meaning: "介護施設・福祉施設", translation: { vi: "cơ sở (điều dưỡng)", en: "facility / care home", zh: "设施" }, example: "この施設は新しいです。", exampleReading: "この しせつは あたらしいです。", exampleTranslation: { vi: "Cơ sở này còn mới.", en: "This facility is new.", zh: "这个设施很新。" }, category: "介護用語" },
    { word: "車椅子", reading: "くるまいす", meaning: "移動用の椅子", translation: { vi: "xe lăn", en: "wheelchair", zh: "轮椅" }, example: "車椅子を押します。", exampleReading: "くるまいすを おします。", exampleTranslation: { vi: "Tôi đẩy xe lăn.", en: "I will push the wheelchair.", zh: "我来推轮椅。" }, category: "介護用語" },
    { word: "体温", reading: "たいおん", meaning: "体の温度", translation: { vi: "nhiệt độ cơ thể", en: "body temperature", zh: "体温" }, example: "体温を測りましょう。", exampleReading: "たいおんを はかりましょう。", exampleTranslation: { vi: "Hãy đo nhiệt độ cơ thể.", en: "Let's take your temperature.", zh: "来量体温吧。" }, category: "介護用語" },
    { word: "血圧", reading: "けつあつ", meaning: "血管内の圧力", translation: { vi: "huyết áp", en: "blood pressure", zh: "血压" }, example: "血圧が高いですか？", exampleReading: "けつあつが たかいですか？", exampleTranslation: { vi: "Huyết áp có cao không?", en: "Is your blood pressure high?", zh: "血压高吗？" }, category: "介護用語" },
  ],

  // 第4課: 痛み・症状 (10語)
  "lesson-vocab-04": [
    { word: "痛い", reading: "いたい", meaning: "痛みがある", translation: { vi: "đau", en: "painful / it hurts", zh: "疼/痛" }, example: "どこが痛いですか？", exampleReading: "どこが いたいですか？", exampleTranslation: { vi: "Bạn đau ở đâu?", en: "Where does it hurt?", zh: "哪里痛？" }, category: "症状" },
    { word: "熱", reading: "ねつ", meaning: "発熱・高体温", translation: { vi: "sốt", en: "fever", zh: "发烧" }, example: "熱がありますか？", exampleReading: "ねつが ありますか？", exampleTranslation: { vi: "Bạn có bị sốt không?", en: "Do you have a fever?", zh: "你发烧了吗？" }, category: "症状" },
    { word: "咳", reading: "せき", meaning: "咳嗽", translation: { vi: "ho", en: "cough", zh: "咳嗽" }, example: "咳が出ますか？", exampleReading: "せきが でますか？", exampleTranslation: { vi: "Bạn có ho không?", en: "Do you have a cough?", zh: "你咳嗽吗？" }, category: "症状" },
    { word: "めまい", reading: "めまい", meaning: "頭がくらくらする", translation: { vi: "chóng mặt", en: "dizziness / vertigo", zh: "头晕" }, example: "めまいがしますか？", exampleReading: "めまいが しますか？", exampleTranslation: { vi: "Bạn có bị chóng mặt không?", en: "Do you feel dizzy?", zh: "你头晕吗？" }, category: "症状" },
    { word: "吐き気", reading: "はきけ", meaning: "嘔吐したい感覚", translation: { vi: "buồn nôn", en: "nausea", zh: "恶心" }, example: "吐き気がありますか？", exampleReading: "はきけが ありますか？", exampleTranslation: { vi: "Bạn có buồn nôn không?", en: "Do you feel nauseous?", zh: "你感到恶心吗？" }, category: "症状" },
    { word: "下痢", reading: "げり", meaning: "水分の多い便", translation: { vi: "tiêu chảy", en: "diarrhea", zh: "腹泻" }, example: "下痢が続いています。", exampleReading: "げりが つづいています。", exampleTranslation: { vi: "Tiêu chảy vẫn tiếp tục.", en: "The diarrhea continues.", zh: "腹泻还在持续。" }, category: "症状" },
    { word: "便秘", reading: "べんぴ", meaning: "排便困難", translation: { vi: "táo bón", en: "constipation", zh: "便秘" }, example: "便秘が続いていますか？", exampleReading: "べんぴが つづいていますか？", exampleTranslation: { vi: "Bạn có bị táo bón kéo dài không?", en: "Have you been constipated?", zh: "你持续便秘吗？" }, category: "症状" },
    { word: "かゆい", reading: "かゆい", meaning: "皮膚に不快感", translation: { vi: "ngứa", en: "itchy", zh: "痒" }, example: "かゆいですか？", exampleReading: "かゆいですか？", exampleTranslation: { vi: "Bạn có cảm thấy ngứa không?", en: "Does it itch?", zh: "你感到痒吗？" }, category: "症状" },
    { word: "腫れ", reading: "はれ", meaning: "患部が膨らむ", translation: { vi: "sưng", en: "swelling", zh: "肿" }, example: "足が腫れています。", exampleReading: "あしが はれています。", exampleTranslation: { vi: "Chân bị sưng.", en: "Your leg is swollen.", zh: "脚肿了。" }, category: "症状" },
    { word: "出血", reading: "しゅっけつ", meaning: "血が出ること", translation: { vi: "chảy máu", en: "bleeding", zh: "出血" }, example: "出血していますか？", exampleReading: "しゅっけつ していますか？", exampleTranslation: { vi: "Bạn có bị chảy máu không?", en: "Are you bleeding?", zh: "你在出血吗？" }, category: "症状" },
  ],

  // 第5課: 方向・場所・数字 (10語)
  "lesson-vocab-05": [
    { word: "右", reading: "みぎ", meaning: "右方向", translation: { vi: "phải", en: "right", zh: "右" }, example: "右に曲がってください。", exampleReading: "みぎに まがってください。", exampleTranslation: { vi: "Vui lòng rẽ phải.", en: "Please turn right.", zh: "请向右转。" }, category: "方向・場所" },
    { word: "左", reading: "ひだり", meaning: "左方向", translation: { vi: "trái", en: "left", zh: "左" }, example: "左のベッドです。", exampleReading: "ひだりの ベッドです。", exampleTranslation: { vi: "Đó là giường bên trái.", en: "It's the left bed.", zh: "是左边的床。" }, category: "方向・場所" },
    { word: "トイレ", reading: "トイレ", meaning: "化粧室", translation: { vi: "nhà vệ sinh", en: "restroom", zh: "厕所" }, example: "トイレはあそこです。", exampleReading: "トイレは あそこです。", exampleTranslation: { vi: "Nhà vệ sinh ở đằng kia.", en: "The restroom is over there.", zh: "厕所在那边。" }, category: "方向・場所" },
    { word: "ナースステーション", reading: "ナースステーション", meaning: "看護師の詰め所", translation: { vi: "trạm y tá", en: "nurse's station", zh: "护士站" }, example: "ナースステーションに来てください。", exampleReading: "ナースステーションに きてください。", exampleTranslation: { vi: "Vui lòng đến trạm y tá.", en: "Please come to the nurse's station.", zh: "请来护士站。" }, category: "方向・場所" },
    { word: "食堂", reading: "しょくどう", meaning: "食事をする部屋", translation: { vi: "phòng ăn", en: "dining room", zh: "餐厅" }, example: "食堂で食べましょう。", exampleReading: "しょくどうで たべましょう。", exampleTranslation: { vi: "Hãy ăn ở phòng ăn.", en: "Let's eat in the dining room.", zh: "在餐厅吃饭吧。" }, category: "方向・場所" },
    { word: "一つ", reading: "ひとつ", meaning: "数量：1", translation: { vi: "một (cái)", en: "one (thing)", zh: "一个" }, example: "薬を一つ飲んでください。", exampleReading: "くすりを ひとつ のんでください。", exampleTranslation: { vi: "Vui lòng uống một viên thuốc.", en: "Please take one tablet.", zh: "请吃一粒药。" }, category: "数字" },
    { word: "毎日", reading: "まいにち", meaning: "日々・デイリー", translation: { vi: "mỗi ngày", en: "every day", zh: "每天" }, example: "毎日薬を飲みます。", exampleReading: "まいにち くすりを のみます。", exampleTranslation: { vi: "Tôi uống thuốc mỗi ngày.", en: "I take medicine every day.", zh: "我每天吃药。" }, category: "数字" },
    { word: "朝", reading: "あさ", meaning: "朝・午前", translation: { vi: "buổi sáng", en: "morning", zh: "早上" }, example: "朝ごはんを食べましたか？", exampleReading: "あさごはんを たべましたか？", exampleTranslation: { vi: "Bạn đã ăn sáng chưa?", en: "Did you eat breakfast?", zh: "你吃早饭了吗？" }, category: "数字" },
    { word: "昼", reading: "ひる", meaning: "昼・正午頃", translation: { vi: "buổi trưa", en: "noon / daytime", zh: "中午" }, example: "昼ごはんは何ですか？", exampleReading: "ひるごはんは なんですか？", exampleTranslation: { vi: "Bữa trưa là gì?", en: "What's for lunch?", zh: "午饭是什么？" }, category: "数字" },
    { word: "夜", reading: "よる", meaning: "夜・夜間", translation: { vi: "buổi tối / ban đêm", en: "night / evening", zh: "晚上" }, example: "夜よく眠れましたか？", exampleReading: "よる よく ねむれましたか？", exampleTranslation: { vi: "Bạn có ngủ ngon đêm qua không?", en: "Did you sleep well last night?", zh: "你昨晚睡得好吗？" }, category: "数字" },
  ],
};

// ============================================================
// 文法データ (10項目)
// ============================================================
const GRAMMAR_DATA: Record<string, {
  title: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: { ja: string; reading: string; vi: string; en: string; zh: string }[];
  practiceQuestions: { question: string; blanks: string[]; answer: string; hint: string }[];
}> = {
  "lesson-grammar-01": {
    title: "〜てください",
    pattern: "動詞（て形）+ ください",
    meaning: "丁寧な依頼・指示",
    explanation: "人に何かをお願いするときや、丁寧に指示するときに使います。介護の現場でよく使う表現です。",
    examples: [
      { ja: "座ってください。", reading: "すわってください。", vi: "Vui lòng ngồi xuống.", en: "Please sit down.", zh: "请坐下。" },
      { ja: "ゆっくり食べてください。", reading: "ゆっくり たべてください。", vi: "Vui lòng ăn chậm thôi.", en: "Please eat slowly.", zh: "请慢慢吃。" },
      { ja: "名前を教えてください。", reading: "なまえを おしえてください。", vi: "Vui lòng cho tôi biết tên bạn.", en: "Please tell me your name.", zh: "请告诉我您的名字。" },
      { ja: "ここに署名してください。", reading: "ここに しょめいしてください。", vi: "Vui lòng ký tên ở đây.", en: "Please sign here.", zh: "请在这里签名。" },
    ],
    practiceQuestions: [
      { question: "手を ___（洗う）ください。", blanks: ["洗って"], answer: "洗って", hint: "「洗う」のて形は「洗って」" },
      { question: "ベッドに ___（寝る）ください。", blanks: ["寝て"], answer: "寝て", hint: "「寝る」のて形は「寝て」" },
    ],
  },
  "lesson-grammar-02": {
    title: "〜ています",
    pattern: "動詞（て形）+ います",
    meaning: "現在進行中の動作 / 継続状態",
    explanation: "今まさに行っている動作（〜しているところ）や、状態が続いていることを表します。",
    examples: [
      { ja: "熱があります。（体温が高い状態）", reading: "ねつが あります。", vi: "Tôi đang bị sốt.", en: "I have a fever.", zh: "我在发烧。" },
      { ja: "お粥を食べています。", reading: "おかゆを たべています。", vi: "Tôi đang ăn cháo.", en: "I am eating porridge.", zh: "我正在吃粥。" },
      { ja: "薬を飲んでいます。", reading: "くすりを のんでいます。", vi: "Tôi đang uống thuốc.", en: "I am taking medicine.", zh: "我正在吃药。" },
      { ja: "足が腫れています。", reading: "あしが はれています。", vi: "Chân đang bị sưng.", en: "My leg is swollen.", zh: "我的脚正在肿着。" },
    ],
    practiceQuestions: [
      { question: "今、入浴 ___（入る）います。", blanks: ["して"], answer: "して", hint: "入浴する→入浴しています" },
      { question: "利用者さんが食事 ___（食べる）います。", blanks: ["食べて"], answer: "食べて", hint: "「食べる」のて形は「食べて」" },
    ],
  },
  "lesson-grammar-03": {
    title: "〜ましょう",
    pattern: "動詞（ます形）+ ましょう",
    meaning: "一緒に何かをしようと誘う・提案する",
    explanation: "一緒に何かをしようと提案したり、相手を誘うときに使います。介護士が利用者に声をかけるときによく使います。",
    examples: [
      { ja: "一緒に散歩しましょう。", reading: "いっしょに さんぽしましょう。", vi: "Hãy cùng đi dạo nhé.", en: "Let's go for a walk together.", zh: "我们一起散步吧。" },
      { ja: "食堂へ行きましょう。", reading: "しょくどうへ いきましょう。", vi: "Hãy cùng đến phòng ăn.", en: "Let's go to the dining room.", zh: "我们去餐厅吧。" },
      { ja: "体温を測りましょう。", reading: "たいおんを はかりましょう。", vi: "Hãy đo nhiệt độ cơ thể.", en: "Let's take your temperature.", zh: "来量体温吧。" },
      { ja: "着替えましょう。", reading: "きがえましょう。", vi: "Hãy thay quần áo nào.", en: "Let's change your clothes.", zh: "来换衣服吧。" },
    ],
    practiceQuestions: [
      { question: "一緒に体操 ___（する）。", blanks: ["しましょう"], answer: "しましょう", hint: "「する」のます形+ましょう" },
      { question: "ゆっくり歩き ___（歩く）。", blanks: ["ましょう"], answer: "ましょう", hint: "「歩く」→「歩き」+ましょう" },
    ],
  },
  "lesson-grammar-04": {
    title: "〜ました / 〜ませんでした",
    pattern: "動詞（ます形）+ ました / ませんでした",
    meaning: "過去の出来事（した / しなかった）",
    explanation: "過去に行ったことや、行わなかったことを表します。申し送りや記録を書くときに重要な表現です。",
    examples: [
      { ja: "薬を飲みました。", reading: "くすりを のみました。", vi: "Tôi đã uống thuốc.", en: "I took medicine.", zh: "我吃了药。" },
      { ja: "今日は入浴しませんでした。", reading: "きょうは にゅうよくしませんでした。", vi: "Hôm nay không tắm.", en: "Didn't take a bath today.", zh: "今天没有洗澡。" },
      { ja: "朝ごはんを全部食べました。", reading: "あさごはんを ぜんぶ たべました。", vi: "Đã ăn hết bữa sáng.", en: "Ate all of breakfast.", zh: "把早饭全部吃完了。" },
      { ja: "昨夜よく眠れませんでした。", reading: "ゆうべ よく ねむれませんでした。", vi: "Tối qua không ngủ được.", en: "Couldn't sleep well last night.", zh: "昨晚睡不好。" },
    ],
    practiceQuestions: [
      { question: "血圧を ___（測る・過去肯定）。", blanks: ["測りました"], answer: "測りました", hint: "「測る」→「測ります」→「測りました」" },
      { question: "食事を ___（食べる・過去否定）。", blanks: ["食べませんでした"], answer: "食べませんでした", hint: "食べません + でした" },
    ],
  },
  "lesson-grammar-05": {
    title: "〜ないでください",
    pattern: "動詞（ない形）+ でください",
    meaning: "〜しないようにお願いする（禁止の依頼）",
    explanation: "相手に何かをしないようお願いするときに使います。転倒予防や安全確保のために介護現場で使う表現です。",
    examples: [
      { ja: "一人で立たないでください。", reading: "ひとりで たたないでください。", vi: "Vui lòng không tự đứng dậy một mình.", en: "Please don't stand up by yourself.", zh: "请不要一个人站起来。" },
      { ja: "ベッドから降りないでください。", reading: "ベッドから おりないでください。", vi: "Vui lòng không xuống giường.", en: "Please don't get off the bed.", zh: "请不要下床。" },
      { ja: "急いで食べないでください。", reading: "いそいで たべないでください。", vi: "Vui lòng không ăn vội.", en: "Please don't eat hastily.", zh: "请不要匆忙进食。" },
      { ja: "心配しないでください。", reading: "しんぱいしないでください。", vi: "Vui lòng đừng lo lắng.", en: "Please don't worry.", zh: "请不要担心。" },
    ],
    practiceQuestions: [
      { question: "廊下で ___（走る・禁止依頼）。", blanks: ["走らないでください"], answer: "走らないでください", hint: "「走る」のない形は「走らない」" },
      { question: "薬を勝手に ___（飲む・禁止依頼）。", blanks: ["飲まないでください"], answer: "飲まないでください", hint: "「飲む」のない形は「飲まない」" },
    ],
  },
};

// ============================================================
// クイズデータ (30問: 各クイズ10問 × 3セット)
// ============================================================
const QUIZ_DATA: Record<string, {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
  difficulty: number;
}[]> = {
  "lesson-quiz-01": [
    { question: "「頭」の正しい読み方はどれですか？", options: [{ text: "あたま", isCorrect: true }, { text: "せなか", isCorrect: false }, { text: "むね", isCorrect: false }, { text: "ひざ", isCorrect: false }], explanation: "「頭」は「あたま」と読みます。英語では head、ベトナム語では đầu です。", difficulty: 1 },
    { question: "「座ってください」の意味は？", options: [{ text: "Please sit down.", isCorrect: true }, { text: "Please stand up.", isCorrect: false }, { text: "Please lie down.", isCorrect: false }, { text: "Please walk.", isCorrect: false }], explanation: "「座る（すわる）」は to sit down の意味です。「〜てください」は丁寧な依頼の表現です。", difficulty: 1 },
    { question: "体温を測るときに使う道具は？", options: [{ text: "体温計（たいおんけい）", isCorrect: true }, { text: "血圧計（けつあつけい）", isCorrect: false }, { text: "聴診器（ちょうしんき）", isCorrect: false }, { text: "注射器（ちゅうしゃき）", isCorrect: false }], explanation: "体温を測るときは「体温計（たいおんけい）」を使います。thermometer の意味です。", difficulty: 1 },
    { question: "「めまい」の英語は？", options: [{ text: "dizziness", isCorrect: true }, { text: "nausea", isCorrect: false }, { text: "fever", isCorrect: false }, { text: "cough", isCorrect: false }], explanation: "「めまい」は dizziness（目が回る感覚）です。「吐き気」は nausea、「熱」は fever、「咳」は cough です。", difficulty: 2 },
    { question: "介護の申し送りの目的は？", options: [{ text: "前のシフトから次のシフトへ情報を伝える", isCorrect: true }, { text: "利用者に薬を渡す", isCorrect: false }, { text: "入浴の順番を決める", isCorrect: false }, { text: "食事メニューを決める", isCorrect: false }], explanation: "申し送り（もうしおくり）は shift handover のことで、勤務の引き継ぎを目的とした情報伝達です。", difficulty: 2 },
    { question: "「食べています」は何を表しますか？", options: [{ text: "今まさに食べている（進行形）", isCorrect: true }, { text: "食べたことがある（経験）", isCorrect: false }, { text: "食べるつもり（意志）", isCorrect: false }, { text: "食べたい（願望）", isCorrect: false }], explanation: "「〜ています」は現在進行中の動作を表します。「食べています」= I am eating.", difficulty: 2 },
    { question: "「一緒に散歩しましょう」の「しましょう」が表すのは？", options: [{ text: "一緒に〜しようという提案・勧誘", isCorrect: true }, { text: "命令・強制", isCorrect: false }, { text: "過去の出来事", isCorrect: false }, { text: "禁止", isCorrect: false }], explanation: "「〜ましょう」は Let's 〜 と同じ意味で、提案や勧誘を表します。", difficulty: 2 },
    { question: "利用者が「足が腫れています」と言いました。正しい対応は？", options: [{ text: "すぐに看護師に報告する", isCorrect: true }, { text: "そのままにして様子を見る", isCorrect: false }, { text: "自分でマッサージをする", isCorrect: false }, { text: "薬を渡す", isCorrect: false }], explanation: "腫れ（はれ）= swelling は医療的なサインかもしれません。介護士は自己判断せず、すぐに看護師に報告することが大切です。", difficulty: 3 },
    { question: "「昨夜よく眠れませんでした」の「ませんでした」が表すのは？", options: [{ text: "過去の否定（〜しなかった）", isCorrect: true }, { text: "現在の否定", isCorrect: false }, { text: "未来の否定", isCorrect: false }, { text: "提案の否定", isCorrect: false }], explanation: "「〜ませんでした」は過去の否定形です。「眠れませんでした」= couldn't sleep.", difficulty: 2 },
    { question: "介護記録に書くべき内容として正しいものは？", options: [{ text: "利用者の状態・食事量・排泄・バイタルサイン", isCorrect: true }, { text: "介護士の個人的な感想や意見", isCorrect: false }, { text: "他の利用者のプライベート情報", isCorrect: false }, { text: "介護士の勤怠情報", isCorrect: false }], explanation: "介護記録（きろく）には利用者の客観的な状態を記録します。バイタルサイン、食事量、排泄状況、特記事項などが基本項目です。", difficulty: 3 },
  ],
  "lesson-quiz-02": [
    { question: "「移乗（いじょう）」の意味は？", options: [{ text: "ベッドから車椅子などへ乗り移ること", isCorrect: true }, { text: "食事を別の容器に移すこと", isCorrect: false }, { text: "施設を移転すること", isCorrect: false }, { text: "薬を別の袋に移すこと", isCorrect: false }], explanation: "移乗（いじょう）= transfer。ベッドから車椅子、または車椅子から椅子などへの移動を介助することです。", difficulty: 2 },
    { question: "「血圧」の正しい読み方は？", options: [{ text: "けつあつ", isCorrect: true }, { text: "ちあつ", isCorrect: false }, { text: "けっぱく", isCorrect: false }, { text: "けつりょく", isCorrect: false }], explanation: "「血圧」は「けつあつ」と読み、blood pressure を意味します。", difficulty: 1 },
    { question: "「一人で立たないでください」を使う場面は？", options: [{ text: "転倒リスクのある利用者に安全を促すとき", isCorrect: true }, { text: "利用者に運動を勧めるとき", isCorrect: false }, { text: "利用者を怒るとき", isCorrect: false }, { text: "利用者に食事を勧めるとき", isCorrect: false }], explanation: "「〜ないでください」は禁止の依頼表現です。転倒（てんとう）予防のために「一人で立たないでください」と声をかけることは介護現場で非常に重要です。", difficulty: 2 },
    { question: "「お腹」の読み方は？", options: [{ text: "おなか", isCorrect: true }, { text: "おはら", isCorrect: false }, { text: "おなか", isCorrect: true }, { text: "ふくぶ", isCorrect: false }], explanation: "「お腹」は「おなか」と読みます。stomach / belly の意味です。医学用語では「腹部（ふくぶ）」とも言います。", difficulty: 1 },
    { question: "介護現場で「バイタルサイン」といえば？", options: [{ text: "体温・血圧・脈拍・呼吸数", isCorrect: true }, { text: "身長・体重・年齢", isCorrect: false }, { text: "食事量・水分量・排泄量", isCorrect: false }, { text: "住所・緊急連絡先", isCorrect: false }], explanation: "バイタルサイン（vital signs）は体温・血圧・脈拍・呼吸数の4つが基本です。介護士は毎日の測定と記録が重要です。", difficulty: 3 },
    { question: "「熱があります」の「熱」の読み方は？", options: [{ text: "ねつ", isCorrect: true }, { text: "あつ", isCorrect: false }, { text: "かねつ", isCorrect: false }, { text: "たいねつ", isCorrect: false }], explanation: "「熱」は「ねつ」と読みます。fever の意味です。体温計で37.5度以上あると「熱がある」と言います。", difficulty: 1 },
    { question: "「薬を飲みました」→ 次に起こりうることは？", options: [{ text: "記録に「〇〇時に薬を飲みました」と書く", isCorrect: true }, { text: "「飲みましょう」と声をかける", isCorrect: false }, { text: "「飲まないでください」と止める", isCorrect: false }, { text: "「飲んでいます」と現在進行形にする", isCorrect: false }], explanation: "薬の服用（ふくよう）は必ず記録に残します。「〜ました（過去形）」を使って、いつ何をしたかを明確に書きましょう。", difficulty: 3 },
    { question: "「咳が出ますか？」のベトナム語は？", options: [{ text: "Bạn có ho không?", isCorrect: true }, { text: "Bạn có sốt không?", isCorrect: false }, { text: "Bạn có đau không?", isCorrect: false }, { text: "Bạn có buồn nôn không?", isCorrect: false }], explanation: "「咳（せき）= ho」。「〜が出ますか」= Bạn có 〜 không?。「熱」はsốt、「痛い」はđau、「吐き気」はbuồn nôn です。", difficulty: 3 },
    { question: "「下痢」の読み方と意味は？", options: [{ text: "げり / diarrhea（軟便・水様便）", isCorrect: true }, { text: "べんぴ / constipation（便秘）", isCorrect: false }, { text: "はきけ / nausea（吐き気）", isCorrect: false }, { text: "しゅっけつ / bleeding（出血）", isCorrect: false }], explanation: "「下痢」は「げり」と読み、diarrhea（水分の多い便が続く状態）です。「便秘（べんぴ）」と混同しやすいので注意しましょう。", difficulty: 2 },
    { question: "朝、利用者に最初にかける言葉として適切なのは？", options: [{ text: "「おはようございます。よく眠れましたか？」", isCorrect: true }, { text: "「早く起きてください。」", isCorrect: false }, { text: "「薬を飲んでいますか？」", isCorrect: false }, { text: "「体重を測ってください。」", isCorrect: false }], explanation: "朝の声かけは「おはようございます」から始め、体調確認を自然な流れで行います。「よく眠れましたか？」は睡眠状況を確認する大切な質問です。", difficulty: 2 },
  ],
  "lesson-quiz-03": [
    { question: "「施設（しせつ）」の英語は？", options: [{ text: "facility / care home", isCorrect: true }, { text: "hospital", isCorrect: false }, { text: "pharmacy", isCorrect: false }, { text: "clinic", isCorrect: false }], explanation: "「施設」は facility または care home。「病院」は hospital、「薬局」は pharmacy、「クリニック」は clinic です。", difficulty: 1 },
    { question: "「膝（ひざ）」とはどこの部位？", options: [{ text: "脚の曲がる関節（knee）", isCorrect: true }, { text: "足の甲（top of the foot）", isCorrect: false }, { text: "太もも（thigh）", isCorrect: false }, { text: "足首（ankle）", isCorrect: false }], explanation: "「膝（ひざ）」は knee（脚を曲げる関節部分）です。高齢者に多い「膝痛（ひざいた）」は knee pain です。", difficulty: 1 },
    { question: "「ナースステーション」でしてはいけないことは？", options: [{ text: "利用者の個人情報を大声で話す", isCorrect: true }, { text: "申し送りをする", isCorrect: false }, { text: "記録を確認する", isCorrect: false }, { text: "看護師に報告する", isCorrect: false }], explanation: "個人情報保護の観点から、利用者の情報を大声で話したり、見えやすい場所に置くことは避けましょう。プライバシーの保護は介護の基本です。", difficulty: 3 },
    { question: "「毎日（まいにち）」の意味は？", options: [{ text: "every day（毎日）", isCorrect: true }, { text: "every week（毎週）", isCorrect: false }, { text: "every month（毎月）", isCorrect: false }, { text: "every year（毎年）", isCorrect: false }], explanation: "「毎〜」は every 〜 の意味です。毎日=every day、毎週=まいしゅう=every week、毎月=まいつき=every month。", difficulty: 1 },
    { question: "「出血していますか？」に対して「はい」と言われたら？", options: [{ text: "すぐに看護師に報告し、止血の処置を求める", isCorrect: true }, { text: "様子を見てから後で報告する", isCorrect: false }, { text: "絆創膏を自分で貼る", isCorrect: false }, { text: "「大丈夫ですか？」と聞いてから帰る", isCorrect: false }], explanation: "出血（しゅっけつ）= bleeding は緊急性が高い場合があります。介護士は医療行為はできませんが、すぐに看護師に報告し、適切な対応を求めることが重要です。", difficulty: 3 },
    { question: "「ゆっくり食べてください」を英語にすると？", options: [{ text: "Please eat slowly.", isCorrect: true }, { text: "Please eat quickly.", isCorrect: false }, { text: "Please don't eat.", isCorrect: false }, { text: "Let's eat together.", isCorrect: false }], explanation: "「ゆっくり」= slowly、「食べてください」= Please eat。嚥下（えんげ）に問題のある方には必ず声かけが必要です。", difficulty: 2 },
    { question: "「肩（かた）」に対応する中国語は？", options: [{ text: "肩膀（jiānbǎng）", isCorrect: true }, { text: "手臂（shǒubì）", isCorrect: false }, { text: "脖子（bózi）", isCorrect: false }, { text: "腰（yāo）", isCorrect: false }], explanation: "肩=肩膀（jiānbǎng）、手臂=腕、脖子=首（くび）、腰=腰（こし）です。中国語を話す利用者への対応に役立ちます。", difficulty: 3 },
    { question: "「記録（きろく）」で使う正しい時制は？", options: [{ text: "過去形（〜しました）", isCorrect: true }, { text: "現在進行形（〜しています）", isCorrect: false }, { text: "未来形（〜します）", isCorrect: false }, { text: "提案形（〜しましょう）", isCorrect: false }], explanation: "介護記録は起きた出来事を後から書くので、必ず過去形「〜しました/〜ませんでした」を使います。正確な時刻とともに記録しましょう。", difficulty: 2 },
    { question: "「腫れ（はれ）」が見られるとき、最初に確認することは？", options: [{ text: "いつから・どこが・どのくらい腫れているか", isCorrect: true }, { text: "利用者の好きな食べ物", isCorrect: false }, { text: "今日の天気", isCorrect: false }, { text: "昨日の入浴の有無", isCorrect: false }], explanation: "症状を看護師に報告するには、5W1H（いつ・どこが・どのくらい・どんな様子）を明確に伝えることが大切です。「SBAR（状況・背景・評価・提案）」を意識しましょう。", difficulty: 3 },
    { question: "介護士が利用者に「一緒に体操しましょう」と声をかける意味は？", options: [{ text: "楽しく身体機能を維持するための提案", isCorrect: true }, { text: "強制的に運動させる命令", isCorrect: false }, { text: "運動しないことへの批判", isCorrect: false }, { text: "業務の報告", isCorrect: false }], explanation: "「〜しましょう」は Let's 〜 の意味で、強制ではなく楽しい提案です。利用者のADL（日常生活動作）維持のために積極的に声かけすることが大切です。", difficulty: 2 },
  ],
};

// ============================================================
// レッスンデータ統合
// ============================================================
type LessonContent =
  | { type: "vocabulary"; vocabKey: string; title: string; courseId: string; subtitle: string }
  | { type: "grammar"; grammarKey: string; title: string; courseId: string; subtitle: string }
  | { type: "quiz"; quizKey: string; title: string; courseId: string; subtitle: string };

const LESSON_MAP: Record<string, LessonContent> = {
  // JLPT N5コース語彙レッスン
  "l1000000-0000-0000-0000-000000000001": { type: "vocabulary", vocabKey: "lesson-vocab-01", title: "第1課: 体の部位（10語）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "頭・手・足など体の各部位を覚えよう" },
  "l1000000-0000-0000-0000-000000000002": { type: "vocabulary", vocabKey: "lesson-vocab-02", title: "第2課: 日常動作（10語）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "起きる・食べる・歩くなど介護現場の動作動詞" },
  "l1000000-0000-0000-0000-000000000003": { type: "vocabulary", vocabKey: "lesson-vocab-03", title: "第3課: 介護・医療用語（10語）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "現場で必須の介護専門用語を習得" },
  "l1000000-0000-0000-0000-000000000004": { type: "vocabulary", vocabKey: "lesson-vocab-04", title: "第4課: 痛み・症状（10語）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "利用者の訴えを正確に理解する症状語彙" },
  "l1000000-0000-0000-0000-000000000005": { type: "vocabulary", vocabKey: "lesson-vocab-05", title: "第5課: 方向・場所・時間（10語）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "施設内での案内と時間表現を学ぼう" },
  // 文法レッスン
  "l1000000-0000-0000-0000-000000000006": { type: "grammar", grammarKey: "lesson-grammar-01", title: "文法1: 〜てください（依頼）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "丁寧な依頼・指示の基本表現" },
  "l1000000-0000-0000-0000-000000000007": { type: "grammar", grammarKey: "lesson-grammar-02", title: "文法2: 〜ています（進行・状態）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "現在の動作と状態を表す表現" },
  "l1000000-0000-0000-0000-000000000008": { type: "grammar", grammarKey: "lesson-grammar-03", title: "文法3: 〜ましょう（提案・勧誘）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "一緒に行動を誘う表現" },
  "l1000000-0000-0000-0000-000000000009": { type: "grammar", grammarKey: "lesson-grammar-04", title: "文法4: 〜ました・〜ませんでした（過去）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "記録・申し送りで使う過去形" },
  "l1000000-0000-0000-0000-000000000010": { type: "grammar", grammarKey: "lesson-grammar-05", title: "文法5: 〜ないでください（禁止依頼）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "安全確保のための禁止表現" },
  // クイズ
  "l1000000-0000-0000-0000-000000000011": { type: "quiz", quizKey: "lesson-quiz-01", title: "確認テスト① 語彙・文法 基礎（10問）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "第1〜3課の語彙と文法の理解度チェック" },
  "l1000000-0000-0000-0000-000000000012": { type: "quiz", quizKey: "lesson-quiz-02", title: "確認テスト② 介護実践語彙（10問）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "介護現場で使う語彙の応用力チェック" },
  "l1000000-0000-0000-0000-000000000013": { type: "quiz", quizKey: "lesson-quiz-03", title: "確認テスト③ 総合まとめ（10問）", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "JLPT N5 介護日本語 総合力確認" },
  // 以前の互換用
  "l1000000-0000-0000-0000-000000000005_old": { type: "quiz", quizKey: "lesson-quiz-01", title: "確認テスト: 第1〜4課", courseId: "c1000000-0000-0000-0000-000000000001", subtitle: "語彙と文法の確認テスト" },
};

// ============================================================
// 語彙フラッシュカードコンポーネント
// ============================================================
function VocabularyLesson({ vocabKey, locale }: { vocabKey: string; locale: string }) {
  const vocab = VOCAB_SETS[vocabKey];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [againCards, setAgainCards] = useState<Set<number>>(new Set());

  if (!vocab) return <div className="text-center py-16 text-gray-500">語彙データが見つかりません</div>;

  const current = vocab[currentIndex];
  const isLast = currentIndex === vocab.length - 1;
  const progress = Math.round((knownCards.size / vocab.length) * 100);

  const getTranslation = (t: { vi: string; en: string; zh: string }) => {
    if (locale === "vi") return t.vi;
    if (locale === "zh") return t.zh;
    return t.en;
  };

  const handleKnow = () => {
    setKnownCards(prev => new Set([...prev, currentIndex]));
    if (!isLast) { setCurrentIndex(currentIndex + 1); setShowBack(false); }
  };

  const handleAgain = () => {
    setAgainCards(prev => new Set([...prev, currentIndex]));
    if (!isLast) { setCurrentIndex(currentIndex + 1); setShowBack(false); }
  };

  if (knownCards.size === vocab.length) {
    return (
      <div className="text-center py-16">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">レッスン完了！🎉</h2>
        <p className="text-muted mb-2">{vocab.length}語をすべて学習しました</p>
        {againCards.size > 0 && <p className="text-sm text-orange-500 mb-2">{againCards.size}語は復習が必要です</p>}
        <p className="text-sm text-muted mb-8">合計 {vocab.length} 語のうち {knownCards.size} 語習得！</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setCurrentIndex(0); setShowBack(false); setKnownCards(new Set()); setAgainCards(new Set()); }} className="btn-outline">もう一度</button>
          <Link href={`/${locale}/courses/c1000000-0000-0000-0000-000000000001`} className="btn-primary">コースに戻る →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>{currentIndex + 1} / {vocab.length}</span>
          <span className="flex gap-3">
            <span className="text-green-600">✓ {knownCards.size}</span>
            <span className="text-orange-500">↩ {againCards.size}</span>
          </span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="mb-3">
        <span className="badge bg-blue-50 text-blue-700 text-xs">{current.category}</span>
      </div>

      <div className="card shadow-lg cursor-pointer min-h-72 flex flex-col items-center justify-center text-center transition-all hover:shadow-xl" onClick={() => setShowBack(!showBack)}>
        {!showBack ? (
          <>
            <p className="text-6xl font-bold text-gray-900 mb-3">{current.word}</p>
            <p className="text-2xl text-gray-400 mb-2">{current.reading}</p>
            <p className="text-sm text-muted mt-4">タップして意味を確認 👆</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-gray-900 mb-1">{current.word}</p>
            <p className="text-lg text-gray-400 mb-3">{current.reading}</p>
            <div className="bg-primary-50 rounded-xl p-4 w-full mb-4">
              <p className="text-xl font-bold text-primary-700">{getTranslation(current.translation)}</p>
              <p className="text-sm text-primary-500 mt-1">{current.meaning}</p>
            </div>
            <div className="text-left w-full bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-500 font-medium">例文</p>
              </div>
              <p className="text-sm font-medium text-gray-800">{current.example}</p>
              <p className="text-xs text-gray-500">{current.exampleReading}</p>
              <p className="text-xs text-primary-600 mt-1">{getTranslation(current.exampleTranslation)}</p>
            </div>
          </>
        )}
      </div>

      {showBack ? (
        <div className="flex gap-3 mt-6">
          <button onClick={handleAgain} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-orange-200 bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 transition-all">
            <RotateCcw className="w-5 h-5" />もう一度
          </button>
          <button onClick={handleKnow} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-green-200 bg-green-50 text-green-600 font-bold hover:bg-green-100 transition-all">
            <CheckCircle className="w-5 h-5" />覚えた！
          </button>
        </div>
      ) : (
        <div className="flex gap-3 mt-6">
          <button onClick={() => currentIndex > 0 && (setCurrentIndex(currentIndex - 1), setShowBack(false))} disabled={currentIndex === 0} className="p-4 rounded-2xl border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setShowBack(true)} className="flex-1 btn-primary">確認する</button>
          <button onClick={() => !isLast && (setCurrentIndex(currentIndex + 1), setShowBack(false))} disabled={isLast} className="p-4 rounded-2xl border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 文法レッスンコンポーネント
// ============================================================
function GrammarLesson({ grammarKey, locale }: { grammarKey: string; locale: string }) {
  const grammar = GRAMMAR_DATA[grammarKey];
  const [currentExample, setCurrentExample] = useState(0);

  if (!grammar) return <div className="text-center py-16 text-gray-500">文法データが見つかりません</div>;

  const getTranslation = (ex: { vi: string; en: string; zh: string }) => {
    if (locale === "vi") return ex.vi;
    if (locale === "zh") return ex.zh;
    return ex.en;
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* 文法ポイント */}
      <div className="card mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">文</div>
          <div>
            <h2 className="text-xl font-bold text-primary-700">{grammar.title}</h2>
            <p className="text-sm text-primary-500">{grammar.pattern}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">意味・用法:</p>
          <p className="text-gray-600 text-sm">{grammar.explanation}</p>
        </div>
      </div>

      {/* 例文スライダー */}
      <div className="card mb-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-500" />
          例文 ({currentExample + 1}/{grammar.examples.length})
        </h3>
        <div className="bg-gray-50 rounded-xl p-5 min-h-32 flex flex-col justify-center">
          <p className="text-2xl font-bold text-gray-900 mb-2 text-center">{grammar.examples[currentExample].ja}</p>
          <p className="text-sm text-gray-400 text-center mb-3">{grammar.examples[currentExample].reading}</p>
          <div className="bg-primary-50 rounded-lg p-3 text-center">
            <p className="text-primary-700 font-medium">{getTranslation(grammar.examples[currentExample])}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => setCurrentExample(Math.max(0, currentExample - 1))} disabled={currentExample === 0} className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-all text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />前へ
          </button>
          <button onClick={() => setCurrentExample(Math.min(grammar.examples.length - 1, currentExample + 1))} disabled={currentExample === grammar.examples.length - 1} className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-all text-sm font-medium">
            次へ<ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 練習問題 */}
      <div className="card mb-6">
        <h3 className="font-bold text-gray-900 mb-4">📝 練習問題</h3>
        {grammar.practiceQuestions.map((q, idx) => (
          <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
            <p className="text-sm font-medium text-gray-800 mb-2">{q.question}</p>
            <p className="text-xs text-gray-500">ヒント: {q.hint}</p>
            <div className="mt-2 bg-white rounded-lg p-2">
              <p className="text-xs text-gray-400">答え: <span className="text-primary-600 font-bold">{q.answer}</span></p>
            </div>
          </div>
        ))}
      </div>

      <Link href={`/${locale}/ai-tutor`} className="btn-primary w-full text-center flex items-center justify-center gap-2">
        🤖 Medi先生にもっと練習する
      </Link>
    </div>
  );
}

// ============================================================
// クイズコンポーネント
// ============================================================
function QuizLesson({ quizKey, locale }: { quizKey: string; locale: string }) {
  const questions = QUIZ_DATA[quizKey];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (!questions) return <div className="text-center py-16 text-gray-500">クイズデータが見つかりません</div>;

  const question = questions[currentQ];
  const isAnswered = selected !== null;
  const isLast = currentQ === questions.length - 1;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    const isCorrect = question.options[idx].isCorrect;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (isLast) setShowResult(true);
    else { setCurrentQ(currentQ + 1); setSelected(null); }
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 max-w-md mx-auto">
        <div className="text-7xl mb-6">{pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "😊" : "😅"}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">テスト完了！</h2>
        <p className="text-2xl font-bold mb-1">
          <span className={pct >= 70 ? "text-green-600" : "text-orange-500"}>{score}</span>
          <span className="text-gray-500"> / {questions.length} 問正解</span>
        </p>
        <p className="text-lg text-muted mb-6">{pct}%</p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
          {pct >= 90 && <p className="text-green-600 font-medium">🌟 完璧です！次のレッスンに進みましょう！</p>}
          {pct >= 70 && pct < 90 && <p className="text-blue-600 font-medium">👍 よくできました！間違えた問題を復習しましょう。</p>}
          {pct >= 50 && pct < 70 && <p className="text-yellow-600 font-medium">📚 もう少し練習が必要です。AI家庭教師に相談しましょう！</p>}
          {pct < 50 && <p className="text-red-500 font-medium">🤖 Medi先生と一緒にもう一度学習しましょう！</p>}
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setShowResult(false); setAnswers([]); }} className="flex-1 btn-outline">もう一度</button>
          <Link href={`/${locale}/ai-tutor`} className="flex-1 btn-primary text-center">Medi先生に質問</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>問題 {currentQ + 1} / {questions.length}</span>
          <div className="flex items-center gap-2">
            {"★".repeat(question.difficulty)}{"☆".repeat(5 - question.difficulty)}
            <span className="text-xs">難易度</span>
          </div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} /></div>
      </div>

      <div className="card mb-4">
        <p className="text-xs font-semibold text-primary-500 mb-2">Q{currentQ + 1}</p>
        <p className="text-gray-800 font-medium leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          let style = "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50";
          if (isAnswered) {
            if (option.isCorrect) style = "border-green-400 bg-green-50 text-green-800";
            else if (selected === idx) style = "border-red-400 bg-red-50 text-red-700";
            else style = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={isAnswered} className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${style}`}>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm flex-shrink-0">{String.fromCharCode(65 + idx)}</span>
                <span className="flex-1">{option.text}</span>
                {isAnswered && option.isCorrect && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                {isAnswered && selected === idx && !option.isCorrect && <X className="w-5 h-5 text-red-500 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <>
          <div className={`rounded-xl p-4 mb-4 ${answers[answers.length - 1] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <p className="text-sm font-semibold mb-1">{answers[answers.length - 1] ? "✅ 正解！" : "❌ 不正解"}</p>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>
          <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
            {isLast ? "結果を見る 🎉" : "次の問題 →"}
          </button>
        </>
      )}
    </div>
  );
}

// ============================================================
// メインページ
// ============================================================
export default function LessonPage({ params }: { params: Promise<{ locale: string; lessonId: string }> }) {
  const { locale, lessonId } = use(params);
  const lesson = LESSON_MAP[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">レッスンが見つかりません</p>
          <Link href={`/${locale}/courses`} className="btn-primary">コース一覧へ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto max-w-xl flex items-center gap-3">
          <Link href={`/${locale}/courses/${lesson.courseId}`} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm truncate">{lesson.title}</h1>
            <p className="text-xs text-muted">{lesson.subtitle}</p>
          </div>
          <Link href={`/${locale}/ai-tutor`} className="p-2 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors" title="AI家庭教師">
            <span className="text-lg">🤖</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-xl px-4 py-8">
        {lesson.type === "vocabulary" && <VocabularyLesson vocabKey={lesson.vocabKey} locale={locale} />}
        {lesson.type === "grammar" && <GrammarLesson grammarKey={lesson.grammarKey} locale={locale} />}
        {lesson.type === "quiz" && <QuizLesson quizKey={lesson.quizKey} locale={locale} />}
      </div>
    </div>
  );
}
