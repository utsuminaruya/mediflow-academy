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

  // ============================================================
  // 介護の日本語 基礎コース 語彙
  // ============================================================

  // 第1課: 施設・職種・道具 (15語)
  "lesson-vocab-06": [
    { word: "介護福祉士", reading: "かいごふくしし", meaning: "介護の国家資格者", translation: { vi: "kỹ sư phúc lợi chăm sóc", en: "certified care worker", zh: "护理福利士" }, example: "介護福祉士の資格を取りたいです。", exampleReading: "かいごふくししの しかくを とりたいです。", exampleTranslation: { vi: "Tôi muốn lấy bằng chăm sóc phúc lợi.", en: "I want to get the certified care worker license.", zh: "我想取得护理福利士资格。" }, category: "職種" },
    { word: "看護師", reading: "かんごし", meaning: "医療・看護の専門家", translation: { vi: "y tá", en: "nurse", zh: "护士" }, example: "看護師に報告します。", exampleReading: "かんごしに ほうこくします。", exampleTranslation: { vi: "Tôi báo cáo cho y tá.", en: "I will report to the nurse.", zh: "我向护士汇报。" }, category: "職種" },
    { word: "ヘルパー", reading: "ヘルパー", meaning: "生活援助の介護職員", translation: { vi: "nhân viên trợ giúp", en: "home helper / care helper", zh: "护理员" }, example: "ヘルパーが来る日です。", exampleReading: "ヘルパーが くる ひです。", exampleTranslation: { vi: "Hôm nay nhân viên trợ giúp sẽ đến.", en: "The helper is coming today.", zh: "今天护理员要来。" }, category: "職種" },
    { word: "相談員", reading: "そうだんいん", meaning: "相談・連絡担当の職員", translation: { vi: "nhân viên tư vấn", en: "social worker / counselor", zh: "咨询员" }, example: "相談員に連絡しました。", exampleReading: "そうだんいんに れんらくしました。", exampleTranslation: { vi: "Tôi đã liên hệ với nhân viên tư vấn.", en: "I contacted the social worker.", zh: "我联系了咨询员。" }, category: "職種" },
    { word: "デイサービス", reading: "デイサービス", meaning: "日中のみ利用する通所介護", translation: { vi: "dịch vụ ban ngày", en: "day service / day care", zh: "日间照料服务" }, example: "今日はデイサービスの日です。", exampleReading: "きょうは デイサービスの ひです。", exampleTranslation: { vi: "Hôm nay là ngày dịch vụ ban ngày.", en: "Today is a day service day.", zh: "今天是日间照料服务日。" }, category: "施設" },
    { word: "特別養護老人ホーム", reading: "とくべつようごろうじんホーム", meaning: "要介護度の高い人が入所する施設", translation: { vi: "trại dưỡng lão đặc biệt", en: "special nursing home", zh: "特别养老院" }, example: "特別養護老人ホームで働いています。", exampleReading: "とくべつようごろうじんホームで はたらいています。", exampleTranslation: { vi: "Tôi đang làm việc tại trại dưỡng lão đặc biệt.", en: "I work at a special nursing home.", zh: "我在特别养老院工作。" }, category: "施設" },
    { word: "浴槽", reading: "よくそう", meaning: "お風呂の湯船", translation: { vi: "bồn tắm", en: "bathtub", zh: "浴缸" }, example: "浴槽に入りましょう。", exampleReading: "よくそうに はいりましょう。", exampleTranslation: { vi: "Hãy vào bồn tắm.", en: "Let's get into the bathtub.", zh: "来进入浴缸吧。" }, category: "道具" },
    { word: "手すり", reading: "てすり", meaning: "掴まるための棒", translation: { vi: "tay vịn / thanh vịn", en: "handrail / grab bar", zh: "扶手" }, example: "手すりを持ってください。", exampleReading: "てすりを もってください。", exampleTranslation: { vi: "Vui lòng nắm tay vịn.", en: "Please hold the handrail.", zh: "请扶住扶手。" }, category: "道具" },
    { word: "ポータブルトイレ", reading: "ポータブルトイレ", meaning: "持ち運べる簡易トイレ", translation: { vi: "bồn vệ sinh di động", en: "portable commode / portable toilet", zh: "移动式马桶" }, example: "ポータブルトイレを使いますか？", exampleReading: "ポータブルトイレを つかいますか？", exampleTranslation: { vi: "Bạn có muốn dùng bồn vệ sinh di động không?", en: "Would you like to use the portable commode?", zh: "您要使用移动式马桶吗？" }, category: "道具" },
    { word: "紙おむつ", reading: "かみおむつ", meaning: "使い捨ての吸収型下着", translation: { vi: "bỉm / tã giấy người lớn", en: "disposable incontinence pad / adult diaper", zh: "纸尿裤（成人）" }, example: "紙おむつを交換します。", exampleReading: "かみおむつを こうかんします。", exampleTranslation: { vi: "Tôi thay bỉm.", en: "I will change the incontinence pad.", zh: "我来换纸尿裤。" }, category: "道具" },
    { word: "歩行器", reading: "ほこうき", meaning: "歩行を助ける器具", translation: { vi: "khung tập đi", en: "walker / walking frame", zh: "助行器" }, example: "歩行器を使って歩きましょう。", exampleReading: "ほこうきを つかって あるきましょう。", exampleTranslation: { vi: "Hãy đi bộ bằng khung tập đi.", en: "Let's walk using the walker.", zh: "用助行器走路吧。" }, category: "道具" },
    { word: "杖", reading: "つえ", meaning: "歩行を補助する棒", translation: { vi: "gậy / cây gậy", en: "cane / walking stick", zh: "拐杖" }, example: "杖を持って歩いてください。", exampleReading: "つえを もって あるいてください。", exampleTranslation: { vi: "Vui lòng đi bộ cùng gậy.", en: "Please walk with your cane.", zh: "请拄着拐杖走。" }, category: "道具" },
    { word: "吸引器", reading: "きゅういんき", meaning: "痰を吸い取る機械", translation: { vi: "máy hút đờm", en: "suction machine", zh: "吸痰器" }, example: "吸引器を準備してください。", exampleReading: "きゅういんきを じゅんびしてください。", exampleTranslation: { vi: "Vui lòng chuẩn bị máy hút đờm.", en: "Please prepare the suction machine.", zh: "请准备好吸痰器。" }, category: "道具" },
    { word: "ベッド柵", reading: "ベッドさく", meaning: "ベッドからの転落を防ぐ柵", translation: { vi: "thanh chắn giường", en: "bed rail / bed guard", zh: "床栏" }, example: "ベッド柵を上げてください。", exampleReading: "ベッドさくを あげてください。", exampleTranslation: { vi: "Vui lòng kéo thanh chắn giường lên.", en: "Please raise the bed rail.", zh: "请把床栏抬起来。" }, category: "道具" },
    { word: "褥瘡", reading: "じょくそう", meaning: "床ずれ・圧迫による皮膚の傷", translation: { vi: "loét tì đè / vết loét do nằm lâu", en: "pressure ulcer / bedsore", zh: "压疮 / 褥疮" }, example: "褥瘡を予防するために体位変換します。", exampleReading: "じょくそうを よぼうするために たいいへんかんします。", exampleTranslation: { vi: "Tôi thay đổi tư thế để phòng ngừa loét tì đè.", en: "I reposition to prevent pressure ulcers.", zh: "我翻身以预防压疮。" }, category: "医療" },
  ],

  // 第2課: 食事・水分管理 (15語)
  "lesson-vocab-07": [
    { word: "嚥下", reading: "えんげ", meaning: "食べ物を飲み込む動作", translation: { vi: "nuốt / nhai nuốt", en: "swallowing / deglutition", zh: "吞咽" }, example: "嚥下に問題があります。", exampleReading: "えんげに もんだいが あります。", exampleTranslation: { vi: "Có vấn đề về nuốt.", en: "There is a swallowing problem.", zh: "吞咽有问题。" }, category: "食事管理" },
    { word: "誤嚥", reading: "ごえん", meaning: "食べ物が気管に入ること", translation: { vi: "sặc / hít sặc thức ăn", en: "aspiration / choking", zh: "误吸 / 呛咳" }, example: "誤嚥に注意してください。", exampleReading: "ごえんに ちゅういしてください。", exampleTranslation: { vi: "Vui lòng chú ý tránh sặc.", en: "Please be careful about aspiration.", zh: "请注意防止误吸。" }, category: "食事管理" },
    { word: "刻み食", reading: "きざみしょく", meaning: "細かく切った食事形態", translation: { vi: "thức ăn thái nhỏ", en: "minced diet / chopped food", zh: "切碎食物" }, example: "刻み食で提供します。", exampleReading: "きざみしょくで ていきょうします。", exampleTranslation: { vi: "Chúng tôi phục vụ thức ăn thái nhỏ.", en: "We will serve minced food.", zh: "我们提供切碎的食物。" }, category: "食事管理" },
    { word: "とろみ", reading: "とろみ", meaning: "液体に粘度をつけること", translation: { vi: "độ sệt / chất làm đặc", en: "thickened liquid / thickening agent", zh: "增稠（饮料）" }, example: "お茶にとろみをつけてください。", exampleReading: "おちゃに とろみを つけてください。", exampleTranslation: { vi: "Vui lòng làm đặc trà.", en: "Please thicken the tea.", zh: "请把茶加增稠剂。" }, category: "食事管理" },
    { word: "経管栄養", reading: "けいかんえいよう", meaning: "チューブで栄養を投与する方法", translation: { vi: "nuôi dưỡng qua ống (ống thông dạ dày)", en: "tube feeding / enteral nutrition", zh: "管饲营养" }, example: "経管栄養の時間です。", exampleReading: "けいかんえいようの じかんです。", exampleTranslation: { vi: "Đến giờ nuôi dưỡng qua ống.", en: "It's time for tube feeding.", zh: "到管饲营养的时间了。" }, category: "食事管理" },
    { word: "食事摂取量", reading: "しょくじせっしゅりょう", meaning: "食べた量の割合", translation: { vi: "lượng thức ăn tiêu thụ", en: "food intake amount", zh: "进食量" }, example: "食事摂取量は8割でした。", exampleReading: "しょくじせっしゅりょうは 8わりでした。", exampleTranslation: { vi: "Lượng thức ăn tiêu thụ là 80%.", en: "Food intake was 80%.", zh: "进食量为8成。" }, category: "食事管理" },
    { word: "水分補給", reading: "すいぶんほきゅう", meaning: "水分を体に取り入れること", translation: { vi: "bổ sung nước / uống nước", en: "hydration / fluid intake", zh: "补充水分" }, example: "水分補給を忘れないでください。", exampleReading: "すいぶんほきゅうを わすれないでください。", exampleTranslation: { vi: "Đừng quên bổ sung nước.", en: "Please don't forget to stay hydrated.", zh: "请不要忘记补充水分。" }, category: "食事管理" },
    { word: "脱水", reading: "だっすい", meaning: "体内の水分が不足した状態", translation: { vi: "mất nước / thiếu nước", en: "dehydration", zh: "脱水" }, example: "脱水症状が見られます。", exampleReading: "だっすいしょうじょうが みられます。", exampleTranslation: { vi: "Có thể thấy các triệu chứng mất nước.", en: "Signs of dehydration are observed.", zh: "可以看到脱水症状。" }, category: "食事管理" },
    { word: "全粥", reading: "ぜんがゆ", meaning: "柔らかく炊いたお粥", translation: { vi: "cháo trắng / cháo đặc", en: "soft rice porridge / full congee", zh: "全粥（软烂的粥）" }, example: "今日の昼食は全粥です。", exampleReading: "きょうの ちゅうしょくは ぜんがゆです。", exampleTranslation: { vi: "Bữa trưa hôm nay là cháo.", en: "Today's lunch is soft rice porridge.", zh: "今天午餐是全粥。" }, category: "食事形態" },
    { word: "軟食", reading: "なんしょく", meaning: "柔らかく調理した食事", translation: { vi: "thức ăn mềm", en: "soft diet", zh: "软食" }, example: "軟食で対応しています。", exampleReading: "なんしょくで たいおうしています。", exampleTranslation: { vi: "Chúng tôi phục vụ thức ăn mềm.", en: "We serve soft diet food.", zh: "我们提供软食。" }, category: "食事形態" },
    { word: "禁食", reading: "きんしょく", meaning: "食事を与えてはいけない状態", translation: { vi: "không được ăn / nhịn ăn", en: "nil by mouth / fasting (NPO)", zh: "禁食" }, example: "手術前は禁食です。", exampleReading: "しゅじゅつまえは きんしょくです。", exampleTranslation: { vi: "Trước phẫu thuật phải nhịn ăn.", en: "No eating before surgery.", zh: "手术前禁食。" }, category: "食事管理" },
    { word: "配膳", reading: "はいぜん", meaning: "食事を各利用者に配ること", translation: { vi: "phân phát thức ăn", en: "meal serving / food distribution", zh: "分餐" }, example: "配膳を手伝います。", exampleReading: "はいぜんを てつだいます。", exampleTranslation: { vi: "Tôi giúp phân phát thức ăn.", en: "I will help with meal serving.", zh: "我来帮助分餐。" }, category: "食事介助" },
    { word: "下膳", reading: "げぜん", meaning: "食後に食器を下げること", translation: { vi: "thu dọn bát đĩa", en: "clearing dishes / table clearance", zh: "撤餐" }, example: "食事が終わったら下膳します。", exampleReading: "しょくじが おわったら げぜんします。", exampleTranslation: { vi: "Sau khi ăn xong tôi thu dọn bát đĩa.", en: "I will clear the dishes after the meal.", zh: "用餐结束后我来撤餐。" }, category: "食事介助" },
    { word: "食札", reading: "しょくふだ", meaning: "利用者の食事指示カード", translation: { vi: "thẻ chỉ định khẩu phần ăn", en: "meal label / diet card", zh: "饮食标签" }, example: "食札を確認してから配膳します。", exampleReading: "しょくふだを かくにんしてから はいぜんします。", exampleTranslation: { vi: "Tôi xác nhận thẻ chỉ định trước khi phân phát.", en: "I confirm the meal label before serving.", zh: "核对饮食标签后再分餐。" }, category: "食事介助" },
    { word: "胃ろう", reading: "いろう", meaning: "胃に直接つけた栄養の管", translation: { vi: "ống dẫn thức ăn vào dạ dày (PEG)", en: "gastrostomy / PEG tube", zh: "胃造瘘（PEG管）" }, example: "胃ろうの管理をします。", exampleReading: "いろうの かんりを します。", exampleTranslation: { vi: "Tôi quản lý ống PEG.", en: "I will manage the PEG tube.", zh: "我来管理胃造瘘管。" }, category: "食事管理" },
  ],

  // 第3課: 排泄・清潔ケア (15語)
  "lesson-vocab-08": [
    { word: "排泄", reading: "はいせつ", meaning: "尿や便を体外に出すこと", translation: { vi: "thải tiết / đại tiểu tiện", en: "excretion / elimination", zh: "排泄" }, example: "排泄の介助をします。", exampleReading: "はいせつの かいじょを します。", exampleTranslation: { vi: "Tôi hỗ trợ việc đại tiểu tiện.", en: "I will assist with elimination.", zh: "我来协助排泄。" }, category: "排泄ケア" },
    { word: "排尿", reading: "はいにょう", meaning: "尿を出すこと", translation: { vi: "đi tiểu", en: "urination", zh: "排尿" }, example: "排尿できましたか？", exampleReading: "はいにょう できましたか？", exampleTranslation: { vi: "Bạn có đi tiểu được không?", en: "Were you able to urinate?", zh: "您排尿了吗？" }, category: "排泄ケア" },
    { word: "排便", reading: "はいべん", meaning: "便を出すこと", translation: { vi: "đi đại tiện", en: "defecation / bowel movement", zh: "排便" }, example: "今日は排便がありましたか？", exampleReading: "きょうは はいべんが ありましたか？", exampleTranslation: { vi: "Hôm nay bạn có đi đại tiện không?", en: "Did you have a bowel movement today?", zh: "您今天排便了吗？" }, category: "排泄ケア" },
    { word: "失禁", reading: "しっきん", meaning: "尿や便が漏れてしまうこと", translation: { vi: "tiểu không tự chủ / không kiểm soát được", en: "incontinence", zh: "失禁" }, example: "尿失禁のある方です。", exampleReading: "にょうしっきんの ある かたです。", exampleTranslation: { vi: "Đây là người bị tiểu không tự chủ.", en: "This person has urinary incontinence.", zh: "这位是有尿失禁的人。" }, category: "排泄ケア" },
    { word: "陰部洗浄", reading: "いんぶせいじょう", meaning: "排泄後の外陰部を洗うケア", translation: { vi: "vệ sinh vùng kín", en: "perineal care / genital washing", zh: "会阴护理" }, example: "陰部洗浄を行います。", exampleReading: "いんぶせいじょうを おこないます。", exampleTranslation: { vi: "Tôi thực hiện vệ sinh vùng kín.", en: "I will perform perineal care.", zh: "我来进行会阴护理。" }, category: "排泄ケア" },
    { word: "清拭", reading: "せいしき", meaning: "体を拭いて清潔にするケア", translation: { vi: "lau người / tắm khô", en: "bed bath / body wiping", zh: "擦浴 / 床上擦洗" }, example: "今日は清拭を行います。", exampleReading: "きょうは せいしきを おこないます。", exampleTranslation: { vi: "Hôm nay tôi sẽ thực hiện lau người.", en: "Today I will perform a bed bath.", zh: "今天进行擦浴。" }, category: "清潔ケア" },
    { word: "口腔ケア", reading: "こうくうケア", meaning: "口の中を清潔に保つケア", translation: { vi: "chăm sóc vệ sinh răng miệng", en: "oral care / oral hygiene", zh: "口腔护理" }, example: "食後に口腔ケアをしましょう。", exampleReading: "しょくごに こうくうケアを しましょう。", exampleTranslation: { vi: "Hãy chăm sóc răng miệng sau bữa ăn.", en: "Let's do oral care after meals.", zh: "饭后进行口腔护理吧。" }, category: "清潔ケア" },
    { word: "義歯", reading: "ぎし", meaning: "入れ歯", translation: { vi: "răng giả", en: "dentures / false teeth", zh: "假牙" }, example: "義歯を外してからケアします。", exampleReading: "ぎしを はずしてから ケアします。", exampleTranslation: { vi: "Tôi sẽ tháo răng giả trước khi chăm sóc.", en: "I will remove the dentures before care.", zh: "取下假牙后再护理。" }, category: "清潔ケア" },
    { word: "更衣", reading: "こうい", meaning: "衣服を着替えること・着替えの介助", translation: { vi: "thay quần áo", en: "changing clothes / dressing", zh: "更衣 / 换衣服" }, example: "更衣介助をします。", exampleReading: "こういかいじょを します。", exampleTranslation: { vi: "Tôi hỗ trợ thay quần áo.", en: "I will assist with changing clothes.", zh: "我来协助更衣。" }, category: "清潔ケア" },
    { word: "体位変換", reading: "たいいへんかん", meaning: "床ずれ予防のため体の向きを変えること", translation: { vi: "thay đổi tư thế nằm", en: "repositioning / turning", zh: "翻身 / 体位变换" }, example: "2時間ごとに体位変換します。", exampleReading: "2じかんごとに たいいへんかんします。", exampleTranslation: { vi: "Tôi thay đổi tư thế mỗi 2 tiếng.", en: "I reposition every 2 hours.", zh: "每2小时翻一次身。" }, category: "清潔ケア" },
    { word: "側臥位", reading: "そくがい", meaning: "横向きに寝た姿勢", translation: { vi: "tư thế nằm nghiêng", en: "lateral position / side-lying", zh: "侧卧位" }, example: "右側臥位にしてください。", exampleReading: "みぎそくがいに してください。", exampleTranslation: { vi: "Vui lòng đặt nằm nghiêng bên phải.", en: "Please place in right lateral position.", zh: "请摆成右侧卧位。" }, category: "体位" },
    { word: "仰臥位", reading: "ぎょうがい", meaning: "あお向けに寝た姿勢", translation: { vi: "tư thế nằm ngửa", en: "supine position / lying on back", zh: "仰卧位" }, example: "仰臥位のままでいてください。", exampleReading: "ぎょうがいの ままで いてください。", exampleTranslation: { vi: "Vui lòng giữ nguyên tư thế nằm ngửa.", en: "Please stay in the supine position.", zh: "请保持仰卧位。" }, category: "体位" },
    { word: "端坐位", reading: "たんざい", meaning: "ベッドの端に腰掛けた姿勢", translation: { vi: "tư thế ngồi thẳng trên mép giường", en: "sitting on edge of bed / dangling", zh: "端坐位（坐在床边）" }, example: "端坐位で少し休みましょう。", exampleReading: "たんざいで すこし やすみましょう。", exampleTranslation: { vi: "Hãy ngồi nghỉ một chút ở mép giường.", en: "Let's rest a moment in the sitting position.", zh: "以端坐位休息一下吧。" }, category: "体位" },
    { word: "爪切り", reading: "つめきり", meaning: "爪を切ること・その道具", translation: { vi: "cắt móng tay", en: "nail clipping / nail clipper", zh: "剪指甲" }, example: "爪切りをしてもよいですか？", exampleReading: "つめきりを してもよいですか？", exampleTranslation: { vi: "Tôi có thể cắt móng tay cho bạn không?", en: "May I clip your nails?", zh: "我可以帮您剪指甲吗？" }, category: "清潔ケア" },
    { word: "導尿カテーテル", reading: "どうにょうカテーテル", meaning: "尿を体外に排出するための管", translation: { vi: "ống thông tiểu", en: "urinary catheter", zh: "导尿管" }, example: "導尿カテーテルが入っています。", exampleReading: "どうにょうカテーテルが はいっています。", exampleTranslation: { vi: "Có ống thông tiểu đang được đặt.", en: "A urinary catheter is in place.", zh: "已插有导尿管。" }, category: "排泄ケア" },
  ],

  // 第4課: コミュニケーション・ご家族対応 (15語)
  "lesson-vocab-09": [
    { word: "声かけ", reading: "こえかけ", meaning: "利用者に話しかける行為", translation: { vi: "nói chuyện / gọi hỏi thăm", en: "verbal communication / speaking to", zh: "打招呼 / 与人交谈" }, example: "ケア前に必ず声かけします。", exampleReading: "ケアまえに かならず こえかけします。", exampleTranslation: { vi: "Nhất định phải gọi hỏi trước khi chăm sóc.", en: "Always speak to the person before providing care.", zh: "护理前一定要打招呼。" }, category: "コミュニケーション" },
    { word: "傾聴", reading: "けいちょう", meaning: "相手の話をしっかり聞くこと", translation: { vi: "lắng nghe chủ động", en: "active listening", zh: "倾听" }, example: "傾聴することが大切です。", exampleReading: "けいちょうすることが たいせつです。", exampleTranslation: { vi: "Lắng nghe chủ động là điều quan trọng.", en: "Active listening is important.", zh: "倾听是很重要的。" }, category: "コミュニケーション" },
    { word: "共感", reading: "きょうかん", meaning: "相手の気持ちを共に感じること", translation: { vi: "đồng cảm", en: "empathy", zh: "共情 / 同理心" }, example: "共感の言葉をかけましょう。", exampleReading: "きょうかんの ことばを かけましょう。", exampleTranslation: { vi: "Hãy nói những lời đồng cảm.", en: "Let's offer empathetic words.", zh: "说一些表达同理心的话吧。" }, category: "コミュニケーション" },
    { word: "尊厳", reading: "そんげん", meaning: "人としての価値・品位", translation: { vi: "phẩm giá / sự tôn trọng", en: "dignity", zh: "尊严" }, example: "利用者の尊厳を守ります。", exampleReading: "りようしゃの そんげんを まもります。", exampleTranslation: { vi: "Tôi bảo vệ phẩm giá của người dùng dịch vụ.", en: "I protect the dignity of the resident.", zh: "我维护利用者的尊严。" }, category: "倫理" },
    { word: "プライバシー", reading: "プライバシー", meaning: "個人の秘密・私的な情報", translation: { vi: "quyền riêng tư", en: "privacy", zh: "隐私" }, example: "プライバシーを守ってください。", exampleReading: "プライバシーを まもってください。", exampleTranslation: { vi: "Vui lòng bảo vệ quyền riêng tư.", en: "Please protect privacy.", zh: "请保护隐私。" }, category: "倫理" },
    { word: "ほうれんそう", reading: "ほうれんそう", meaning: "報告・連絡・相談の略称", translation: { vi: "báo cáo - liên lạc - tham vấn", en: "report-contact-consult (RCC)", zh: "报告・联络・商量（报联商）" }, example: "何かあればほうれんそうをしてください。", exampleReading: "なにかあれば ほうれんそうを してください。", exampleTranslation: { vi: "Nếu có gì hãy báo cáo, liên lạc, tham vấn.", en: "If anything happens, please report, contact, or consult.", zh: "有什么情况请做到报联商。" }, category: "業務" },
    { word: "カンファレンス", reading: "カンファレンス", meaning: "多職種で行うケアの会議", translation: { vi: "hội nghị chăm sóc / hội chẩn", en: "care conference / team meeting", zh: "护理会议 / 团队会议" }, example: "今日はカンファレンスがあります。", exampleReading: "きょうは カンファレンスが あります。", exampleTranslation: { vi: "Hôm nay có hội nghị chăm sóc.", en: "There is a care conference today.", zh: "今天有护理会议。" }, category: "業務" },
    { word: "個人情報", reading: "こじんじょうほう", meaning: "個人を特定できる情報", translation: { vi: "thông tin cá nhân", en: "personal information / personal data", zh: "个人信息" }, example: "個人情報を外に出してはいけません。", exampleReading: "こじんじょうほうを そとに だしてはいけません。", exampleTranslation: { vi: "Không được để lộ thông tin cá nhân ra ngoài.", en: "Personal information must not be disclosed outside.", zh: "不能将个人信息泄露出去。" }, category: "倫理" },
    { word: "守秘義務", reading: "しゅひぎむ", meaning: "秘密を守る義務", translation: { vi: "nghĩa vụ bảo mật", en: "duty of confidentiality", zh: "保密义务" }, example: "守秘義務があります。", exampleReading: "しゅひぎむが あります。", exampleTranslation: { vi: "Chúng tôi có nghĩa vụ bảo mật.", en: "We have a duty of confidentiality.", zh: "我们有保密义务。" }, category: "倫理" },
    { word: "家族対応", reading: "かぞくたいおう", meaning: "ご家族への説明・対応", translation: { vi: "tiếp đón gia đình", en: "family communication / responding to family", zh: "应对家属" }, category: "コミュニケーション", example: "家族対応は丁寧に行います。", exampleReading: "かぞくたいおうは ていねいに おこないます。", exampleTranslation: { vi: "Tôi tiếp đón gia đình một cách chu đáo.", en: "I handle family communication carefully.", zh: "我认真应对家属。" } },
    { word: "苦情", reading: "くじょう", meaning: "不満・クレームの申し出", translation: { vi: "khiếu nại / phàn nàn", en: "complaint / grievance", zh: "投诉 / 抱怨" }, example: "苦情があれば相談員に伝えます。", exampleReading: "くじょうが あれば そうだんいんに つたえます。", exampleTranslation: { vi: "Nếu có khiếu nại, tôi sẽ báo cho nhân viên tư vấn.", en: "If there is a complaint, I will inform the counselor.", zh: "如有投诉，我会告知咨询员。" }, category: "コミュニケーション" },
    { word: "インフォームドコンセント", reading: "インフォームドコンセント", meaning: "説明を受けたうえでの同意", translation: { vi: "thông báo và đồng ý / chấp thuận có thông tin", en: "informed consent", zh: "知情同意" }, example: "インフォームドコンセントが大切です。", exampleReading: "インフォームドコンセントが たいせつです。", exampleTranslation: { vi: "Thông báo và đồng ý là điều quan trọng.", en: "Informed consent is important.", zh: "知情同意非常重要。" }, category: "倫理" },
    { word: "緊急連絡", reading: "きんきゅうれんらく", meaning: "緊急時の連絡", translation: { vi: "liên lạc khẩn cấp", en: "emergency contact", zh: "紧急联络" }, example: "緊急連絡先はどこですか？", exampleReading: "きんきゅうれんらくさきは どこですか？", exampleTranslation: { vi: "Địa chỉ liên lạc khẩn cấp là đâu?", en: "Where is the emergency contact?", zh: "紧急联络方式是什么？" }, category: "業務" },
    { word: "利用者本位", reading: "りようしゃほんい", meaning: "利用者を中心に考えるケアの考え方", translation: { vi: "lấy người dùng làm trung tâm", en: "resident-centered care / user-centered", zh: "以利用者为中心" }, example: "利用者本位のケアをします。", exampleReading: "りようしゃほんいの ケアを します。", exampleTranslation: { vi: "Tôi thực hiện chăm sóc lấy người dùng làm trung tâm.", en: "I provide resident-centered care.", zh: "我提供以利用者为中心的护理。" }, category: "倫理" },
    { word: "申し送り書", reading: "もうしおくりしょ", meaning: "引き継ぎのために書く書類", translation: { vi: "tài liệu bàn giao ca", en: "shift handover report / handover sheet", zh: "交班记录 / 交接班文件" }, example: "申し送り書を確認しました。", exampleReading: "もうしおくりしょを かくにんしました。", exampleTranslation: { vi: "Tôi đã xem tài liệu bàn giao ca.", en: "I checked the handover report.", zh: "我确认了交班记录。" }, category: "業務" },
  ],

  // ============================================================
  // 特定技能「介護」試験対策 語彙
  // ============================================================

  // 第1課: 介護技術用語 (15語)
  "lesson-vocab-10": [
    { word: "ADL", reading: "ADL（エーディーエル）", meaning: "日常生活動作 Activities of Daily Living", translation: { vi: "hoạt động sinh hoạt hàng ngày", en: "activities of daily living (ADL)", zh: "日常生活动作（ADL）" }, example: "ADLの維持が目標です。", exampleReading: "ADLの いじが もくひょうです。", exampleTranslation: { vi: "Mục tiêu là duy trì ADL.", en: "The goal is to maintain ADL.", zh: "目标是维持ADL。" }, category: "介護技術" },
    { word: "廃用症候群", reading: "はいようしょうこうぐん", meaning: "安静・不動状態が続くことで起こる機能低下", translation: { vi: "hội chứng không vận động / teo cơ do nằm lâu", en: "disuse syndrome / deconditioning", zh: "废用综合征" }, example: "廃用症候群を予防します。", exampleReading: "はいようしょうこうぐんを よぼうします。", exampleTranslation: { vi: "Tôi phòng ngừa hội chứng không vận động.", en: "I prevent disuse syndrome.", zh: "我预防废用综合征。" }, category: "介護技術" },
    { word: "拘縮", reading: "こうしゅく", meaning: "関節が固まって動かなくなること", translation: { vi: "co cứng khớp / cứng khớp", en: "contracture / joint stiffness", zh: "挛缩 / 关节僵硬" }, example: "拘縮の予防には関節を動かすことが大切です。", exampleReading: "こうしゅくの よぼうには かんせつを うごかすことが たいせつです。", exampleTranslation: { vi: "Việc cử động khớp là quan trọng để phòng co cứng.", en: "Moving joints is important to prevent contracture.", zh: "活动关节对预防挛缩很重要。" }, category: "介護技術" },
    { word: "リハビリテーション", reading: "リハビリテーション", meaning: "機能回復・維持のための訓練", translation: { vi: "phục hồi chức năng", en: "rehabilitation", zh: "康复训练" }, example: "毎日リハビリをしています。", exampleReading: "まいにち リハビリを しています。", exampleTranslation: { vi: "Tôi tập phục hồi chức năng mỗi ngày.", en: "I do rehabilitation every day.", zh: "我每天都做康复训练。" }, category: "介護技術" },
    { word: "歩行訓練", reading: "ほこうくんれん", meaning: "歩く能力を回復・維持するための練習", translation: { vi: "tập đi bộ / huấn luyện dáng đi", en: "gait training / walking practice", zh: "步行训练" }, example: "歩行訓練をリハビリ士と行います。", exampleReading: "ほこうくんれんを リハビリしと おこないます。", exampleTranslation: { vi: "Tôi tập đi bộ cùng chuyên viên phục hồi chức năng.", en: "I do gait training with the physical therapist.", zh: "我和康复治疗师一起做步行训练。" }, category: "介護技術" },
    { word: "移乗介助", reading: "いじょうかいじょ", meaning: "ベッドから車椅子などへの乗り移り介助", translation: { vi: "hỗ trợ chuyển người (từ giường sang xe lăn)", en: "transfer assistance / assisted transfer", zh: "移乘辅助" }, example: "移乗介助の際はボディメカニクスを使います。", exampleReading: "いじょうかいじょの さいは ボディメカニクスを つかいます。", exampleTranslation: { vi: "Khi hỗ trợ chuyển người, tôi dùng cơ học cơ thể.", en: "I use body mechanics during transfer assistance.", zh: "移乘辅助时运用人体力学。" }, category: "介護技術" },
    { word: "ボディメカニクス", reading: "ボディメカニクス", meaning: "体の力を効率よく使う動作の原則", translation: { vi: "cơ học cơ thể (nguyên tắc di chuyển hiệu quả)", en: "body mechanics", zh: "人体力学" }, example: "ボディメカニクスで腰を守ります。", exampleReading: "ボディメカニクスで こしを まもります。", exampleTranslation: { vi: "Tôi bảo vệ lưng bằng nguyên tắc cơ học cơ thể.", en: "I protect my back using body mechanics.", zh: "用人体力学保护腰部。" }, category: "介護技術" },
    { word: "標準予防策", reading: "ひょうじゅんよぼうさく", meaning: "感染症予防のための基本的な対策", translation: { vi: "phòng ngừa chuẩn / biện pháp phòng chuẩn", en: "standard precautions", zh: "标准预防措施" }, example: "標準予防策としてグローブをつけます。", exampleReading: "ひょうじゅんよぼうさくとして グローブを つけます。", exampleTranslation: { vi: "Tôi đeo găng tay theo biện pháp phòng chuẩn.", en: "I wear gloves as part of standard precautions.", zh: "作为标准预防措施，我戴手套。" }, category: "感染管理" },
    { word: "手指衛生", reading: "しゅしえいせい", meaning: "手洗い・アルコール消毒による感染予防", translation: { vi: "vệ sinh tay", en: "hand hygiene / hand sanitization", zh: "手卫生" }, example: "ケアの前後に手指衛生を行います。", exampleReading: "ケアの ぜんごに しゅしえいせいを おこないます。", exampleTranslation: { vi: "Tôi thực hiện vệ sinh tay trước và sau chăm sóc.", en: "I perform hand hygiene before and after care.", zh: "护理前后进行手卫生。" }, category: "感染管理" },
    { word: "転倒予防", reading: "てんとうよぼう", meaning: "転倒事故を防ぐためのケア", translation: { vi: "phòng ngừa ngã", en: "fall prevention", zh: "预防跌倒" }, example: "転倒予防のために環境整備をします。", exampleReading: "てんとうよぼうのために かんきょうせいびを します。", exampleTranslation: { vi: "Tôi chỉnh đốn môi trường để phòng ngừa ngã.", en: "I arrange the environment for fall prevention.", zh: "我整理环境以预防跌倒。" }, category: "安全管理" },
    { word: "身体拘束", reading: "しんたいこうそく", meaning: "体を縛ること（原則禁止）", translation: { vi: "kiềm chế thể chất (nguyên tắc cấm)", en: "physical restraint (prohibited in principle)", zh: "身体约束（原则上禁止）" }, example: "身体拘束は原則禁止です。", exampleReading: "しんたいこうそくは げんそくきんしです。", exampleTranslation: { vi: "Về nguyên tắc, kiềm chế thể chất bị cấm.", en: "Physical restraint is prohibited in principle.", zh: "原则上禁止身体约束。" }, category: "安全管理" },
    { word: "ヒヤリハット", reading: "ヒヤリハット", meaning: "事故には至らなかった危険なできごと", translation: { vi: "sự cố suýt xảy ra / gần xảy ra tai nạn", en: "near-miss incident / close call", zh: "险些事故 / 未遂事件" }, example: "ヒヤリハットを記録しました。", exampleReading: "ヒヤリハットを きろくしました。", exampleTranslation: { vi: "Tôi đã ghi lại sự cố suýt xảy ra.", en: "I recorded the near-miss incident.", zh: "我记录了未遂事件。" }, category: "安全管理" },
    { word: "事故報告書", reading: "じこほうこくしょ", meaning: "事故が起きたときに書く書類", translation: { vi: "báo cáo tai nạn / biên bản sự cố", en: "incident report", zh: "事故报告书" }, example: "事故報告書を提出します。", exampleReading: "じこほうこくしょを ていしゅつします。", exampleTranslation: { vi: "Tôi nộp báo cáo tai nạn.", en: "I will submit the incident report.", zh: "我提交事故报告书。" }, category: "安全管理" },
    { word: "福祉用具", reading: "ふくしようぐ", meaning: "介護・生活を助ける補助器具", translation: { vi: "dụng cụ phúc lợi / thiết bị hỗ trợ", en: "assistive devices / welfare equipment", zh: "福利辅助器具" }, example: "福祉用具を活用します。", exampleReading: "ふくしようぐを かつようします。", exampleTranslation: { vi: "Tôi tận dụng các dụng cụ phúc lợi.", en: "I make use of assistive devices.", zh: "我活用福利辅助器具。" }, category: "介護技術" },
    { word: "自立支援", reading: "じりつしえん", meaning: "自分でできることを増やすための支援", translation: { vi: "hỗ trợ tự lập", en: "independence support / autonomy promotion", zh: "自立支援" }, example: "自立支援を意識したケアをします。", exampleReading: "じりつしえんを いしきした ケアを します。", exampleTranslation: { vi: "Tôi thực hiện chăm sóc có ý thức hỗ trợ tự lập.", en: "I provide care with independence support in mind.", zh: "我提供有意识促进自立的护理。" }, category: "介護理念" },
  ],

  // 第2課: 疾患・医療用語 (15語)
  "lesson-vocab-11": [
    { word: "認知症", reading: "にんちしょう", meaning: "脳の機能低下による認知機能の障害", translation: { vi: "sa sút trí tuệ / mất trí nhớ", en: "dementia", zh: "认知症 / 失智症" }, example: "認知症の方への声かけは大切です。", exampleReading: "にんちしょうの かたへの こえかけは たいせつです。", exampleTranslation: { vi: "Việc nói chuyện với người bị sa sút trí tuệ là quan trọng.", en: "Speaking to people with dementia is important.", zh: "向认知症患者打招呼是很重要的。" }, category: "疾患" },
    { word: "アルツハイマー型認知症", reading: "アルツハイマーがたにんちしょう", meaning: "最も多い認知症の種類", translation: { vi: "sa sút trí tuệ kiểu Alzheimer", en: "Alzheimer's type dementia", zh: "阿尔茨海默型认知症" }, example: "アルツハイマー型認知症の方が多いです。", exampleReading: "アルツハイマーがたにんちしょうの かたが おおいです。", exampleTranslation: { vi: "Có nhiều người bị sa sút trí tuệ kiểu Alzheimer.", en: "There are many people with Alzheimer's type dementia.", zh: "阿尔茨海默型认知症的人很多。" }, category: "疾患" },
    { word: "BPSD", reading: "BPSD（ビーピーエスディー）", meaning: "認知症の行動・心理症状", translation: { vi: "triệu chứng hành vi và tâm lý của sa sút trí tuệ", en: "behavioral and psychological symptoms of dementia (BPSD)", zh: "认知症的行为和心理症状" }, example: "BPSDへの対応が難しいです。", exampleReading: "BPSDへの たいおうが むずかしいです。", exampleTranslation: { vi: "Ứng phó với BPSD rất khó.", en: "Responding to BPSD is challenging.", zh: "应对BPSD很困难。" }, category: "疾患" },
    { word: "脳梗塞", reading: "のうこうそく", meaning: "脳の血管が詰まる病気", translation: { vi: "nhồi máu não / đột quỵ", en: "cerebral infarction / ischemic stroke", zh: "脑梗塞" }, example: "脳梗塞で片麻痺があります。", exampleReading: "のうこうそくで かたまひが あります。", exampleTranslation: { vi: "Có liệt một bên do nhồi máu não.", en: "There is hemiplegia due to cerebral infarction.", zh: "因脑梗塞有偏瘫。" }, category: "疾患" },
    { word: "糖尿病", reading: "とうにょうびょう", meaning: "血糖値が高くなる生活習慣病", translation: { vi: "bệnh tiểu đường / đái tháo đường", en: "diabetes mellitus", zh: "糖尿病" }, example: "糖尿病があるので食事に注意します。", exampleReading: "とうにょうびょうが あるので しょくじに ちゅういします。", exampleTranslation: { vi: "Vì có bệnh tiểu đường nên chú ý đến bữa ăn.", en: "I pay attention to diet because of diabetes.", zh: "因为有糖尿病，所以注意饮食。" }, category: "疾患" },
    { word: "高血圧", reading: "こうけつあつ", meaning: "血圧が持続して高い状態", translation: { vi: "cao huyết áp / tăng huyết áp", en: "hypertension / high blood pressure", zh: "高血压" }, example: "高血圧の薬を飲んでいます。", exampleReading: "こうけつあつの くすりを のんでいます。", exampleTranslation: { vi: "Tôi đang uống thuốc cao huyết áp.", en: "I am taking medication for hypertension.", zh: "我正在服用高血压药。" }, category: "疾患" },
    { word: "パーキンソン病", reading: "パーキンソンびょう", meaning: "動作が遅くなる・振戦などの神経疾患", translation: { vi: "bệnh Parkinson", en: "Parkinson's disease", zh: "帕金森病" }, example: "パーキンソン病で手が震えています。", exampleReading: "パーキンソンびょうで てが ふるえています。", exampleTranslation: { vi: "Tay run vì bệnh Parkinson.", en: "Hands are trembling due to Parkinson's disease.", zh: "因帕金森病手在颤抖。" }, category: "疾患" },
    { word: "骨粗しょう症", reading: "こつそしょうしょう", meaning: "骨が脆くなる病気", translation: { vi: "loãng xương", en: "osteoporosis", zh: "骨质疏松症" }, example: "骨粗しょう症で骨折しやすいです。", exampleReading: "こつそしょうしょうで こっせつしやすいです。", exampleTranslation: { vi: "Dễ gãy xương vì loãng xương.", en: "Prone to fractures due to osteoporosis.", zh: "因骨质疏松症容易骨折。" }, category: "疾患" },
    { word: "大腿骨骨折", reading: "だいたいこつこっせつ", meaning: "股関節付近の骨折（高齢者に多い）", translation: { vi: "gãy xương đùi / gãy cổ xương đùi", en: "femoral fracture / hip fracture", zh: "股骨骨折 / 髋部骨折" }, example: "大腿骨骨折後のリハビリ中です。", exampleReading: "だいたいこつこっせつごの リハビリちゅうです。", exampleTranslation: { vi: "Đang phục hồi chức năng sau gãy xương đùi.", en: "Undergoing rehabilitation after hip fracture.", zh: "正在股骨骨折后的康复期。" }, category: "疾患" },
    { word: "誤嚥性肺炎", reading: "ごえんせいはいえん", meaning: "誤嚥によって起こる肺炎", translation: { vi: "viêm phổi do hít sặc", en: "aspiration pneumonia", zh: "吸入性肺炎" }, example: "誤嚥性肺炎の予防が大切です。", exampleReading: "ごえんせいはいえんの よぼうが たいせつです。", exampleTranslation: { vi: "Phòng ngừa viêm phổi do hít sặc rất quan trọng.", en: "Prevention of aspiration pneumonia is important.", zh: "预防吸入性肺炎很重要。" }, category: "疾患" },
    { word: "心不全", reading: "しんふぜん", meaning: "心臓のポンプ機能が低下した状態", translation: { vi: "suy tim", en: "heart failure", zh: "心力衰竭" }, example: "心不全があるので水分制限があります。", exampleReading: "しんふぜんが あるので すいぶんせいげんが あります。", exampleTranslation: { vi: "Vì có suy tim nên phải hạn chế nước.", en: "Fluid is restricted due to heart failure.", zh: "因为有心力衰竭，所以限制水分。" }, category: "疾患" },
    { word: "せん妄", reading: "せんもう", meaning: "急性の意識混濁・混乱状態", translation: { vi: "mê sảng / lú lẫn cấp tính", en: "delirium", zh: "谵妄" }, example: "夜間にせん妄が見られます。", exampleReading: "やかんに せんもうが みられます。", exampleTranslation: { vi: "Có thể thấy mê sảng vào ban đêm.", en: "Delirium is observed at night.", zh: "夜间可见谵妄。" }, category: "疾患" },
    { word: "尿路感染症", reading: "にょうろかんせんしょう", meaning: "腎臓・膀胱などの尿路の感染症", translation: { vi: "nhiễm trùng đường tiết niệu", en: "urinary tract infection (UTI)", zh: "尿路感染" }, example: "尿路感染症の症状に注意します。", exampleReading: "にょうろかんせんしょうの しょうじょうに ちゅういします。", exampleTranslation: { vi: "Tôi chú ý các triệu chứng nhiễm trùng đường tiết niệu.", en: "I watch for symptoms of urinary tract infection.", zh: "我注意尿路感染的症状。" }, category: "疾患" },
    { word: "浮腫", reading: "ふしゅ", meaning: "体にむくみが生じた状態", translation: { vi: "phù nề / sưng phù", en: "edema / swelling", zh: "水肿 / 浮肿" }, example: "足に浮腫が見られます。", exampleReading: "あしに ふしゅが みられます。", exampleTranslation: { vi: "Có thể thấy phù nề ở chân.", en: "Edema is observed in the legs.", zh: "腿部可见水肿。" }, category: "症状" },
    { word: "褥瘡ステージ", reading: "じょくそうステージ", meaning: "床ずれの重症度の分類（ステージ1〜4）", translation: { vi: "giai đoạn loét tì đè", en: "pressure ulcer staging (Stage 1-4)", zh: "压疮分期（1-4期）" }, example: "ステージ2の褥瘡があります。", exampleReading: "ステージ2の じょくそうが あります。", exampleTranslation: { vi: "Có loét tì đè giai đoạn 2.", en: "There is a Stage 2 pressure ulcer.", zh: "有2期压疮。" }, category: "疾患" },
  ],

  // 第3課: 法律・制度用語 (15語)
  "lesson-vocab-12": [
    { word: "介護保険", reading: "かいごほけん", meaning: "介護サービスに使える社会保険制度", translation: { vi: "bảo hiểm chăm sóc dài hạn", en: "long-term care insurance", zh: "护理保险" }, example: "介護保険で施設に入りました。", exampleReading: "かいごほけんで しせつに はいりました。", exampleTranslation: { vi: "Tôi vào cơ sở theo bảo hiểm chăm sóc dài hạn.", en: "I entered the facility under long-term care insurance.", zh: "通过护理保险入住了设施。" }, category: "制度" },
    { word: "要介護度", reading: "ようかいごど", meaning: "介護が必要な程度（要支援1〜2・要介護1〜5）", translation: { vi: "mức độ cần chăm sóc", en: "care need level / care level (1-5)", zh: "护理需求等级（1-5级）" }, example: "要介護3の方です。", exampleReading: "ようかいご3の かたです。", exampleTranslation: { vi: "Đây là người ở mức độ cần chăm sóc 3.", en: "This person has care level 3.", zh: "这位是护理需求3级的人。" }, category: "制度" },
    { word: "ケアプラン", reading: "ケアプラン", meaning: "介護サービスの計画書", translation: { vi: "kế hoạch chăm sóc", en: "care plan", zh: "护理计划" }, example: "ケアプランを確認します。", exampleReading: "ケアプランを かくにんします。", exampleTranslation: { vi: "Tôi xem kế hoạch chăm sóc.", en: "I will check the care plan.", zh: "我确认护理计划。" }, category: "制度" },
    { word: "ケアマネジャー", reading: "ケアマネジャー", meaning: "ケアプランを作成する専門家（介護支援専門員）", translation: { vi: "quản lý chăm sóc / điều phối viên chăm sóc", en: "care manager / care coordinator", zh: "护理经理 / 照护协调员" }, example: "ケアマネジャーに相談します。", exampleReading: "ケアマネジャーに そうだんします。", exampleTranslation: { vi: "Tôi tham vấn với quản lý chăm sóc.", en: "I will consult the care manager.", zh: "我向护理经理咨询。" }, category: "職種" },
    { word: "特定技能", reading: "とくていぎのう", meaning: "外国人介護士が使う在留資格（1号）", translation: { vi: "kỹ năng đặc định", en: "specified skilled worker (SSW)", zh: "特定技能" }, example: "特定技能1号で働いています。", exampleReading: "とくていぎのう1ごうで はたらいています。", exampleTranslation: { vi: "Tôi đang làm việc theo visa kỹ năng đặc định số 1.", en: "I am working on Specified Skilled Worker status No.1.", zh: "我以特定技能1号身份工作。" }, category: "制度" },
    { word: "在留資格", reading: "ざいりゅうしかく", meaning: "日本に滞在できる法的資格", translation: { vi: "tư cách lưu trú / visa", en: "residence status / visa status", zh: "居留资格" }, example: "在留資格を確認してください。", exampleReading: "ざいりゅうしかくを かくにんしてください。", exampleTranslation: { vi: "Vui lòng xác nhận tư cách lưu trú.", en: "Please check your residence status.", zh: "请确认居留资格。" }, category: "制度" },
    { word: "技能実習", reading: "ぎのうじっしゅう", meaning: "外国人技能実習制度", translation: { vi: "thực tập kỹ năng", en: "technical intern training", zh: "技能实习" }, example: "技能実習生として来日しました。", exampleReading: "ぎのうじっしゅうせいとして らいにちしました。", exampleTranslation: { vi: "Tôi đến Nhật với tư cách thực tập sinh kỹ năng.", en: "I came to Japan as a technical intern.", zh: "我作为技能实习生来到日本。" }, category: "制度" },
    { word: "介護福祉士", reading: "かいごふくしし", meaning: "介護の国家資格（試験合格が必要）", translation: { vi: "kỹ sư phúc lợi chăm sóc (bằng quốc gia)", en: "certified care worker (national qualification)", zh: "护理福利士（国家资格）" }, example: "介護福祉士の国家試験を受けます。", exampleReading: "かいごふくししの こっかしけんを うけます。", exampleTranslation: { vi: "Tôi thi kỳ thi quốc gia kỹ sư phúc lợi chăm sóc.", en: "I will take the certified care worker national exam.", zh: "我参加护理福利士国家考试。" }, category: "資格" },
    { word: "虐待防止", reading: "ぎゃくたいぼうし", meaning: "高齢者・障害者への虐待を防ぐこと", translation: { vi: "phòng chống lạm dụng", en: "abuse prevention / elder abuse prevention", zh: "防止虐待" }, example: "虐待防止のために研修を受けます。", exampleReading: "ぎゃくたいぼうしのために けんしゅうを うけます。", exampleTranslation: { vi: "Tôi tham gia đào tạo để phòng chống lạm dụng.", en: "I attend training for abuse prevention.", zh: "为防止虐待，我接受培训。" }, category: "倫理・法律" },
    { word: "権利擁護", reading: "けんりようご", meaning: "利用者の権利・利益を守ること", translation: { vi: "bảo vệ quyền lợi", en: "rights advocacy / rights protection", zh: "权益保护" }, category: "倫理・法律", example: "利用者の権利擁護に努めます。", exampleReading: "りようしゃの けんりようごに つとめます。", exampleTranslation: { vi: "Tôi nỗ lực bảo vệ quyền lợi của người dùng dịch vụ.", en: "I strive to protect the rights of residents.", zh: "我努力保护利用者的权益。" } },
    { word: "身体拘束禁止", reading: "しんたいこうそくきんし", meaning: "介護保険施設での身体拘束の原則禁止", translation: { vi: "cấm kiềm chế thể chất", en: "prohibition of physical restraint", zh: "禁止身体约束" }, example: "身体拘束禁止の3要件を理解します。", exampleReading: "しんたいこうそくきんしの 3ようけんを りかいします。", exampleTranslation: { vi: "Tôi hiểu 3 điều kiện của lệnh cấm kiềm chế thể chất.", en: "I understand the 3 conditions for prohibition of physical restraint.", zh: "我理解禁止身体约束的3个条件。" }, category: "倫理・法律" },
    { word: "個人情報保護法", reading: "こじんじょうほうほごほう", meaning: "個人データを守る法律", translation: { vi: "luật bảo vệ thông tin cá nhân", en: "Personal Information Protection Act", zh: "个人信息保护法" }, example: "個人情報保護法を守ります。", exampleReading: "こじんじょうほうほごほうを まもります。", exampleTranslation: { vi: "Tôi tuân thủ luật bảo vệ thông tin cá nhân.", en: "I comply with the Personal Information Protection Act.", zh: "我遵守个人信息保护法。" }, category: "倫理・法律" },
    { word: "サービス担当者会議", reading: "サービスたんとうしゃかいぎ", meaning: "ケアプラン作成時に多職種で行う会議", translation: { vi: "hội nghị phụ trách dịch vụ", en: "service coordinator conference / team meeting", zh: "服务负责人会议" }, example: "サービス担当者会議に参加します。", exampleReading: "サービスたんとうしゃかいぎに さんかします。", exampleTranslation: { vi: "Tôi tham dự hội nghị phụ trách dịch vụ.", en: "I will participate in the service coordinator conference.", zh: "我参加服务负责人会议。" }, category: "制度" },
    { word: "苦情解決", reading: "くじょうかいけつ", meaning: "利用者・家族からの苦情を解決する仕組み", translation: { vi: "giải quyết khiếu nại", en: "complaint resolution", zh: "解决投诉" }, example: "苦情解決の窓口を設けています。", exampleReading: "くじょうかいけつの まどぐちを もうけています。", exampleTranslation: { vi: "Chúng tôi có cửa sổ giải quyết khiếu nại.", en: "We have a window for complaint resolution.", zh: "我们设有解决投诉的窗口。" }, category: "制度" },
    { word: "リスクマネジメント", reading: "リスクマネジメント", meaning: "事故・トラブルのリスクを管理・予防すること", translation: { vi: "quản lý rủi ro", en: "risk management", zh: "风险管理" }, example: "リスクマネジメントが重要です。", exampleReading: "リスクマネジメントが じゅうようです。", exampleTranslation: { vi: "Quản lý rủi ro là quan trọng.", en: "Risk management is important.", zh: "风险管理很重要。" }, category: "安全管理" },
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

  // ============================================================
  // 介護の日本語 基礎コース 文法
  // ============================================================

  "lesson-grammar-06": {
    title: "申し送りの表現 〜でした / 〜ていました",
    pattern: "名詞 + でした / 動詞（て形）+ いました",
    meaning: "申し送り・記録で使う過去の状態表現",
    explanation: "申し送りでは「その時の状態」を正確に伝えることが大切です。「〜でした」は名詞・形容詞の過去、「〜ていました」は過去のある時点で続いていた動作・状態を表します。",
    examples: [
      { ja: "昨夜は38度の熱でした。", reading: "ゆうべは 38どの ねつでした。", vi: "Tối qua bị sốt 38 độ.", en: "Last night had a fever of 38 degrees.", zh: "昨晚发烧38度。" },
      { ja: "朝から食欲がありませんでした。", reading: "あさから しょくよくが ありませんでした。", vi: "Từ sáng không có cảm giác thèm ăn.", en: "Had no appetite since the morning.", zh: "从早上开始没有食欲。" },
      { ja: "夜中ずっと眠れていませんでした。", reading: "よなかずっと ねむれていませんでした。", vi: "Suốt đêm không ngủ được.", en: "Was unable to sleep throughout the night.", zh: "整夜都无法入睡。" },
      { ja: "16時ごろ、ソファで休んでいました。", reading: "16じごろ、ソファで やすんでいました。", vi: "Khoảng 16 giờ đang nghỉ ngơi trên ghế sofa.", en: "Around 4 PM, was resting on the sofa.", zh: "16点左右在沙发上休息。" },
    ],
    practiceQuestions: [
      { question: "昨日の夜は痛み___（ある・過去）。", blanks: ["がありました"], answer: "がありました", hint: "「ある」の過去形は「ありました」" },
      { question: "午前中ずっとベッドで ___（横になる・過去進行）。", blanks: ["横になっていました"], answer: "横になっていました", hint: "「横になる」→て形「横になって」+いました" },
    ],
  },

  "lesson-grammar-07": {
    title: "確認・依頼の丁寧表現 〜ましょうか / 〜ていただけますか",
    pattern: "動詞（ます形）+ ましょうか / 動詞（て形）+ いただけますか",
    meaning: "申し出・丁寧な依頼",
    explanation: "「〜ましょうか」は相手のために何かをする申し出、「〜ていただけますか」は「〜してもらえますか」より丁寧な依頼表現です。ご家族への対応や上司へのお願いに使います。",
    examples: [
      { ja: "毛布をかけましょうか？", reading: "もうふを かけましょうか？", vi: "Tôi đắp chăn cho bạn nhé?", en: "Shall I put a blanket on you?", zh: "我给您盖毯子吧？" },
      { ja: "車椅子を押しましょうか？", reading: "くるまいすを おしましょうか？", vi: "Tôi đẩy xe lăn cho bạn nhé?", en: "Shall I push your wheelchair?", zh: "我推轮椅吧？" },
      { ja: "こちらにサインしていただけますか？", reading: "こちらに サインして いただけますか？", vi: "Bạn có thể ký vào đây không?", en: "Could you please sign here?", zh: "请您在这里签名好吗？" },
      { ja: "もう一度ゆっくり話していただけますか？", reading: "もういちど ゆっくり はなして いただけますか？", vi: "Bạn có thể nói lại chậm hơn không?", en: "Could you please speak more slowly once more?", zh: "请您再慢慢说一遍好吗？" },
    ],
    practiceQuestions: [
      { question: "荷物を持ち ___（申し出）？", blanks: ["ましょうか"], answer: "ましょうか", hint: "「〜ましょうか」は申し出の表現" },
      { question: "名前を教えて ___（丁寧な依頼）？", blanks: ["いただけますか"], answer: "いただけますか", hint: "「〜ていただけますか」は丁寧な依頼" },
    ],
  },

  "lesson-grammar-08": {
    title: "報告・連絡表現 〜ようです / 〜と思われます",
    pattern: "動詞・形容詞 + ようです / と思われます",
    meaning: "観察した内容を客観的に報告する表現",
    explanation: "介護記録や看護師への報告では、自分の観察を断定せず「〜ようです」「〜と思われます」など客観的な表現を使うことが重要です。",
    examples: [
      { ja: "呼吸が速くなっているようです。", reading: "こきゅうが はやくなっている ようです。", vi: "Có vẻ như nhịp thở đang nhanh hơn.", en: "The breathing seems to be getting faster.", zh: "呼吸好像在加快。" },
      { ja: "右膝の腫れが増しているように見えます。", reading: "みぎひざの はれが ましている ように みえます。", vi: "Có vẻ như sưng ở đầu gối phải đang tăng lên.", en: "The swelling in the right knee appears to be increasing.", zh: "右膝的肿胀似乎在增加。" },
      { ja: "食欲がないのは気分のせいだと思われます。", reading: "しょくよくが ないのは きぶんの せいだと おもわれます。", vi: "Có vẻ như việc không có cảm giác thèm ăn là do tâm trạng.", en: "The lack of appetite seems to be due to mood.", zh: "食欲不振似乎是因为心情原因。" },
      { ja: "昨夜から痛みが続いているようです。", reading: "ゆうべから いたみが つづいている ようです。", vi: "Có vẻ như cơn đau đã tiếp diễn từ tối qua.", en: "The pain seems to have continued since last night.", zh: "疼痛好像从昨晚开始持续。" },
    ],
    practiceQuestions: [
      { question: "顔色が悪い ___（推量）。", blanks: ["ようです"], answer: "ようです", hint: "「〜ようです」は観察からの推量" },
      { question: "転倒したのは段差が原因だ ___（客観的推測）。", blanks: ["と思われます"], answer: "と思われます", hint: "「〜と思われます」は客観的な推測" },
    ],
  },

  "lesson-grammar-09": {
    title: "緊急時・報告の表現",
    pattern: "すぐに〜します / 〜が起きました / 〜してください（緊急）",
    meaning: "緊急時の迅速・正確な報告表現",
    explanation: "緊急時には「いつ・どこで・誰が・何が・どのように」を素早く正確に伝えることが大切です。落ち着いた声で、簡潔に報告しましょう。",
    examples: [
      { ja: "○○さんが廊下で転倒しました。すぐに来てください！", reading: "〇〇さんが ろうかで てんとうしました。すぐに きてください！", vi: "Ông/bà XX đã ngã ở hành lang. Hãy đến ngay!", en: "Mr./Ms. XX fell in the hallway. Please come immediately!", zh: "XX先生/女士在走廊跌倒了，请马上来！" },
      { ja: "意識がないように見えます。救急車を呼んでください。", reading: "いしきが ないように みえます。きゅうきゅうしゃを よんでください。", vi: "Có vẻ như không có ý thức. Hãy gọi xe cấp cứu.", en: "They appear to be unconscious. Please call an ambulance.", zh: "看起来没有意识，请叫救护车。" },
      { ja: "呼吸が止まっています。AEDを持ってきてください！", reading: "こきゅうが とまっています。AEDを もってきてください！", vi: "Hô hấp đã ngừng. Hãy lấy AED đến đây!", en: "Breathing has stopped. Please bring the AED!", zh: "呼吸停止了，请拿AED过来！" },
      { ja: "15時30分に居室で発見しました。出血があります。", reading: "15じ30ぷんに きょしつで はっけんしました。しゅっけつが あります。", vi: "Phát hiện lúc 15:30 tại phòng. Có xuất huyết.", en: "Found at 3:30 PM in the room. There is bleeding.", zh: "15点30分在房间发现，有出血。" },
    ],
    practiceQuestions: [
      { question: "利用者が転倒し ___（報告・過去）。すぐに看護師に___（報告する）。", blanks: ["ました", "報告します"], answer: "ました、報告します", hint: "過去形と現在形を使い分ける" },
      { question: "意識がない ___ みえます（様子の報告）。", blanks: ["ように"], answer: "ように", hint: "「〜ように見えます」は様子の客観的報告" },
    ],
  },

  // ============================================================
  // 特定技能「介護」試験対策 文法・読解
  // ============================================================

  "lesson-grammar-10": {
    title: "試験に出る読解表現",
    pattern: "〜について / 〜に関して / 〜にとって / 〜に対して",
    meaning: "試験問題文で使われる重要な表現",
    explanation: "特定技能の日本語試験では長文読解が出題されます。「〜について」「〜に関して」（〜に関することで）、「〜にとって」（〜の立場から見て）、「〜に対して」（〜に向けて）の違いを理解しましょう。",
    examples: [
      { ja: "利用者の安全について、職員全員が責任を持つ必要があります。", reading: "りようしゃの あんぜんについて、しょくいんぜんいんが せきにんを もつ ひつようが あります。", vi: "Về sự an toàn của người dùng dịch vụ, tất cả nhân viên cần có trách nhiệm.", en: "Regarding the safety of residents, all staff need to take responsibility.", zh: "关于利用者的安全，所有工作人员都需要承担责任。" },
      { ja: "高齢者にとって、転倒は大変危険なことです。", reading: "こうれいしゃにとって、てんとうは たいへん きけんな ことです。", vi: "Đối với người cao tuổi, ngã là điều rất nguy hiểm.", en: "For elderly people, falling is very dangerous.", zh: "对老年人来说，跌倒是非常危险的事情。" },
      { ja: "認知症の方に対して、穏やかに声をかけることが大切です。", reading: "にんちしょうの かたに たいして、おだやかに こえを かけることが たいせつです。", vi: "Điều quan trọng là nói chuyện nhẹ nhàng với người bị sa sút trí tuệ.", en: "It is important to speak gently to people with dementia.", zh: "对认知症患者，温柔地打招呼是很重要的。" },
      { ja: "介護に関する法律は定期的に改正されます。", reading: "かいごに かんする ほうりつは ていきてきに かいせいされます。", vi: "Các luật liên quan đến chăm sóc được sửa đổi định kỳ.", en: "Laws related to caregiving are periodically revised.", zh: "与护理相关的法律会定期修订。" },
    ],
    practiceQuestions: [
      { question: "利用者の気持ち___（の立場から）、笑顔で接します。", blanks: ["にとって"], answer: "にとって", hint: "「〜にとって」は「〜の立場・観点から」の意味" },
      { question: "感染症___（その話題で）注意が必要です。", blanks: ["について"], answer: "について", hint: "「〜について」はテーマ・話題を示す" },
    ],
  },

  "lesson-grammar-11": {
    title: "ケアプラン・記録の表現",
    pattern: "〜を目標とする / 〜を実施する / 〜に努める / 〜が見られた",
    meaning: "公式文書・記録で使う書き言葉表現",
    explanation: "介護記録やケアプランは「書き言葉」で書きます。「〜しました」ではなく「〜した」「〜を行った」「〜が見られた」などの書き言葉表現を使います。",
    examples: [
      { ja: "本日16時に居室を訪問した。利用者は椅子に座って休んでいた。", reading: "ほんじつ16じに きょしつを ほうもんした。りようしゃは いすに すわって やすんでいた。", vi: "Hôm nay lúc 16 giờ thăm phòng. Người dùng dịch vụ đang ngồi nghỉ trên ghế.", en: "Visited the room at 4 PM today. Resident was sitting and resting in a chair.", zh: "今日16时前往房间探视。利用者正坐在椅子上休息。" },
      { ja: "食事摂取量は7割程度であった。水分補給は十分に行われた。", reading: "しょくじせっしゅりょうは 7わりていどで あった。すいぶんほきゅうは じゅうぶんに おこなわれた。", vi: "Lượng thức ăn tiêu thụ khoảng 70%. Việc bổ sung nước được thực hiện đầy đủ.", en: "Food intake was approximately 70%. Hydration was adequately provided.", zh: "进食量约为7成。水分补充已充分进行。" },
      { ja: "右足に軽度の浮腫が見られた。看護師に報告し経過観察とした。", reading: "みぎあしに けいどの ふしゅが みられた。かんごしに ほうこくし けいかかんさつと した。", vi: "Chân phải có phù nề nhẹ. Đã báo cáo y tá và theo dõi tiến triển.", en: "Mild edema was observed in the right foot. Reported to nurse and set for observation.", zh: "右脚可见轻度水肿，已向护士汇报并设为观察。" },
      { ja: "自立歩行を目標とし、毎日歩行訓練を実施した。", reading: "じりつほこうを もくひょうとし、まいにち ほこうくんれんを じっしした。", vi: "Đặt mục tiêu đi bộ độc lập và thực hiện tập đi mỗi ngày.", en: "Set independent walking as the goal and implemented daily gait training.", zh: "以自立步行为目标，每日实施步行训练。" },
    ],
    practiceQuestions: [
      { question: "入浴介助を ___ した（実行したことを示す書き言葉）。", blanks: ["実施"], answer: "実施", hint: "「実施（じっし）した」は「行った」の書き言葉" },
      { question: "右手に腫れが ___ た（観察の書き言葉）。", blanks: ["見られ"], answer: "見られ", hint: "「〜が見られた」は観察内容の客観的記録" },
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

  // ============================================================
  // 介護の日本語 基礎コース クイズ (各10問 × 4セット)
  // ============================================================

  "lesson-quiz-04": [
    { question: "「介護福祉士（かいごふくしし）」の英語は？", options: [{ text: "certified care worker", isCorrect: true }, { text: "nurse", isCorrect: false }, { text: "doctor", isCorrect: false }, { text: "pharmacist", isCorrect: false }], explanation: "介護福祉士は certified care worker（または care worker）です。国家試験に合格した介護の専門職です。看護師は nurse、医師は doctor です。", difficulty: 1 },
    { question: "「手すり（てすり）」を使う目的は？", options: [{ text: "歩行時の転倒を防ぐため", isCorrect: true }, { text: "荷物を置くため", isCorrect: false }, { text: "壁を飾るため", isCorrect: false }, { text: "ドアを開けるため", isCorrect: false }], explanation: "手すり（handrail / grab bar）は壁や廊下・浴室に設置し、歩行や立ち上がり時の転倒予防に使います。高齢者の安全を守る重要な設備です。", difficulty: 1 },
    { question: "「褥瘡（じょくそう）」を予防するには？", options: [{ text: "定期的に体位変換をする", isCorrect: true }, { text: "たくさん食べさせる", isCorrect: false }, { text: "水分を控える", isCorrect: false }, { text: "ベッドに固定する", isCorrect: false }], explanation: "褥瘡（pressure ulcer / bedsore）は同じ姿勢で長時間圧迫されることで発生します。2時間ごとの体位変換（repositioning）が基本的な予防策です。", difficulty: 2 },
    { question: "デイサービスとはどんな施設？", options: [{ text: "日中だけ利用する通所型の介護施設", isCorrect: true }, { text: "夜だけ利用する泊まりの施設", isCorrect: false }, { text: "入院できる医療施設", isCorrect: false }, { text: "薬を購入できる施設", isCorrect: false }], explanation: "デイサービス（day service）は利用者が自宅から通う日中型のサービスです。入浴・食事・レクリエーション・機能訓練などを提供します。", difficulty: 1 },
    { question: "「歩行器（ほこうき）」のベトナム語は？", options: [{ text: "khung tập đi", isCorrect: true }, { text: "xe lăn", isCorrect: false }, { text: "gậy", isCorrect: false }, { text: "máy tập", isCorrect: false }], explanation: "歩行器は khung tập đi（歩行補助フレーム）です。車椅子（xe lăn）、杖（gậy）とは区別して覚えましょう。", difficulty: 2 },
    { question: "「ポータブルトイレ」を使うのはどんな時？", options: [{ text: "トイレまで歩くのが困難な利用者のとき", isCorrect: true }, { text: "施設のトイレが壊れているとき", isCorrect: false }, { text: "入浴の代わりに使うとき", isCorrect: false }, { text: "薬を飲む前に使うとき", isCorrect: false }], explanation: "ポータブルトイレ（portable commode）はベッドサイドに置き、トイレまで移動が困難な方が使用します。排泄の自立支援や尊厳の保持に繋がります。", difficulty: 2 },
    { question: "「申し送り書（もうしおくりしょ）」の目的は？", options: [{ text: "シフト交代時に利用者の情報を引き継ぐため", isCorrect: true }, { text: "家族に手紙を書くため", isCorrect: false }, { text: "食事メニューを記録するため", isCorrect: false }, { text: "薬の在庫を管理するため", isCorrect: false }], explanation: "申し送り書（handover report）は shift handover（引き継ぎ）の際に使う重要書類です。利用者の状態変化、ケア内容、特記事項を次のシフトへ正確に伝えます。", difficulty: 2 },
    { question: "「〜ましょうか」の使い方として正しいものは？", options: [{ text: "「荷物を持ちましょうか？」（申し出）", isCorrect: true }, { text: "「薬を飲みましょうか。」（記録）", isCorrect: false }, { text: "「食事でした。」（過去報告）", isCorrect: false }, { text: "「走らないでください。」（禁止）", isCorrect: false }], explanation: "「〜ましょうか」は相手のために何かをする「申し出」の表現です。Shall I 〜? に相当します。ケア前の声かけに欠かせない表現です。", difficulty: 2 },
    { question: "利用者の「プライバシー」を守るためにしてはいけないことは？", options: [{ text: "利用者の病名を廊下で大声で話す", isCorrect: true }, { text: "カーテンを閉めてケアする", isCorrect: false }, { text: "個室のドアをノックする", isCorrect: false }, { text: "申し送り書を鍵のかかる場所に保管する", isCorrect: false }], explanation: "個人情報・プライバシーの保護は介護の基本原則です。利用者の病名・家族情報・財産などを不必要に他者に話すことは個人情報保護法違反になります。", difficulty: 3 },
    { question: "「傾聴（けいちょう）」の意味は？", options: [{ text: "相手の話を注意深く、共感的に聞くこと", isCorrect: true }, { text: "相手より先に話すこと", isCorrect: false }, { text: "相手の話を記録すること", isCorrect: false }, { text: "相手の話を否定すること", isCorrect: false }], explanation: "傾聴（active listening）は相手の言葉に耳を傾け、気持ちを受け止めながら聴くことです。「うなずく」「目を合わせる」「繰り返す」などのスキルがあります。", difficulty: 2 },
  ],

  "lesson-quiz-05": [
    { question: "「嚥下（えんげ）」の意味は？", options: [{ text: "食べ物や飲み物を飲み込む動作", isCorrect: true }, { text: "食事を準備すること", isCorrect: false }, { text: "食器を洗うこと", isCorrect: false }, { text: "食欲があること", isCorrect: false }], explanation: "嚥下（swallowing / deglutition）は口から食物を胃に送る動作です。加齢や疾患で嚥下機能が低下すると誤嚥のリスクが上がります。", difficulty: 1 },
    { question: "「とろみ」をお茶につける理由は？", options: [{ text: "嚥下障害のある方が誤嚥しないため", isCorrect: true }, { text: "お茶を甘くするため", isCorrect: false }, { text: "冷たさを保つため", isCorrect: false }, { text: "消化を助けるため", isCorrect: false }], explanation: "とろみ（thickening agent）をつけることで液体の速度を遅らせ、嚥下障害（えんげしょうがい）のある方が飲み込みやすくなります。誤嚥性肺炎の予防に重要です。", difficulty: 2 },
    { question: "「排泄介助」で最も大切なことは？", options: [{ text: "利用者の尊厳を守り、プライバシーに配慮すること", isCorrect: true }, { text: "できるだけ速く終わらせること", isCorrect: false }, { text: "おむつを使い続けること", isCorrect: false }, { text: "家族に毎回報告すること", isCorrect: false }], explanation: "排泄介助は利用者にとって最もデリケートなケアのひとつです。カーテンを閉める、声かけをする、自尊心を傷つけない言葉を使うなど、尊厳への配慮が不可欠です。", difficulty: 3 },
    { question: "「清拭（せいしき）」とは何ですか？", options: [{ text: "体を蒸しタオルなどで拭いて清潔にすること", isCorrect: true }, { text: "口の中を清潔にすること", isCorrect: false }, { text: "部屋を掃除すること", isCorrect: false }, { text: "洗濯をすること", isCorrect: false }], explanation: "清拭（bed bath）は入浴できない方に対して、温かいタオルや清拭タオルで体を拭くケアです。皮膚の清潔保持、血行促進、床ずれ予防にもなります。", difficulty: 1 },
    { question: "「口腔ケア（こうくうケア）」を行う目的として正しくないものは？", options: [{ text: "髪の毛をきれいにするため", isCorrect: true }, { text: "誤嚥性肺炎を予防するため", isCorrect: false }, { text: "口臭を防ぐため", isCorrect: false }, { text: "義歯を清潔に保つため", isCorrect: false }], explanation: "口腔ケアは口の中の細菌を減らし、誤嚥性肺炎・虫歯・口臭を予防します。特に嚥下機能が低下した高齢者には毎食後の口腔ケアが推奨されます。", difficulty: 2 },
    { question: "「体位変換（たいいへんかん）」はなぜ行いますか？", options: [{ text: "褥瘡（床ずれ）を予防するため", isCorrect: true }, { text: "食欲を高めるため", isCorrect: false }, { text: "睡眠の質を下げるため", isCorrect: false }, { text: "血圧を上げるため", isCorrect: false }], explanation: "体位変換（repositioning）は長時間の圧迫による褥瘡（pressure ulcer）を防ぐために行います。一般的に2時間ごとに行うことが推奨されています。", difficulty: 2 },
    { question: "「食事摂取量が8割」の意味は？", options: [{ text: "用意した食事の80%を食べた", isCorrect: true }, { text: "8種類の食べ物を食べた", isCorrect: false }, { text: "8分かけて食べた", isCorrect: false }, { text: "8回に分けて食べた", isCorrect: false }], explanation: "食事摂取量（food intake）はパーセントや割合で表します。「8割（はちわり）」= 80%です。記録には「朝食：8割摂取」のように記載します。", difficulty: 2 },
    { question: "「仰臥位（ぎょうがい）」はどんな姿勢？", options: [{ text: "あおむけに寝た姿勢（supine position）", isCorrect: true }, { text: "横向きに寝た姿勢", isCorrect: false }, { text: "うつぶせに寝た姿勢", isCorrect: false }, { text: "ベッドに座った姿勢", isCorrect: false }], explanation: "仰臥位（supine position）はあおむけ（背中を下にして寝た状態）です。側臥位（そくがい）は横向き、腹臥位（ふくがい）はうつぶせ、端坐位（たんざい）はベッドの端に腰掛けた姿勢です。", difficulty: 2 },
    { question: "「脱水（だっすい）」のサインとして正しいものは？", options: [{ text: "口が渇く・尿量が減る・皮膚の弾力が低下する", isCorrect: true }, { text: "体重が増える・顔が赤くなる", isCorrect: false }, { text: "食欲が増える・水をたくさん飲む", isCorrect: false }, { text: "体が冷える・汗をかく", isCorrect: false }], explanation: "脱水（dehydration）のサインは口の渇き、尿量減少、皮膚のハリ低下、倦怠感などです。高齢者は脱水になりやすく、特に夏場は水分補給（hydration）の管理が重要です。", difficulty: 3 },
    { question: "「禁食（きんしょく）」の状態のとき、介護士がすべきことは？", options: [{ text: "看護師・医師の指示に従い、飲食物を与えない", isCorrect: true }, { text: "少しならよいと判断して流動食を与える", isCorrect: false }, { text: "利用者が欲しがれば水だけ与える", isCorrect: false }, { text: "家族に判断を委ねる", isCorrect: false }], explanation: "禁食（nil by mouth / NPO）は医師・看護師の医療指示です。手術前や誤嚥リスクが高い場合に指示されます。介護士は自己判断せず、必ず指示を守りましょう。", difficulty: 3 },
  ],

  "lesson-quiz-06": [
    { question: "「声かけ（こえかけ）」はなぜ大切ですか？", options: [{ text: "ケア前に利用者の同意を得るため・安心感を与えるため", isCorrect: true }, { text: "業務の時間を短縮するため", isCorrect: false }, { text: "利用者に命令するため", isCorrect: false }, { text: "記録を残すため", isCorrect: false }], explanation: "声かけはインフォームドコンセント（説明と同意）の基本です。「これから〇〇しますね」と伝えることで利用者の心理的安全が確保され、信頼関係が生まれます。", difficulty: 1 },
    { question: "「ほうれんそう」とは何ですか？", options: [{ text: "報告・連絡・相談の略", isCorrect: true }, { text: "野菜の名前", isCorrect: false }, { text: "朝のあいさつ", isCorrect: false }, { text: "体操の種類", isCorrect: false }], explanation: "「ほうれんそう」は報告（ほうこく）・連絡（れんらく）・相談（そうだん）の頭文字です。組織の中でスムーズに業務を進めるための重要なコミュニケーションルールです。", difficulty: 1 },
    { question: "「〜ていただけますか」は「〜てください」と比べると？", options: [{ text: "より丁寧な依頼表現", isCorrect: true }, { text: "より命令的な表現", isCorrect: false }, { text: "過去の表現", isCorrect: false }, { text: "否定の表現", isCorrect: false }], explanation: "「〜ていただけますか」= Could you please 〜? は「〜てください」= Please 〜 より丁寧です。ご家族や上司への依頼、医療職へのお願いなど場面に応じて使い分けましょう。", difficulty: 2 },
    { question: "「個人情報保護（こじんじょうほうほご）」として正しい行動は？", options: [{ text: "利用者の情報を外部に漏らさない", isCorrect: true }, { text: "友人に施設の話を詳しくする", isCorrect: false }, { text: "SNSに利用者の写真を投稿する", isCorrect: false }, { text: "記録を施設の外に持ち出す", isCorrect: false }], explanation: "個人情報保護法により、利用者の氏名・病状・家族情報などは厳重に管理する義務があります。SNSへの投稿・私的な会話での開示・書類の持ち出しは違反になります。", difficulty: 2 },
    { question: "「カンファレンス（care conference）」の目的は？", options: [{ text: "多職種が集まってケアの方針を話し合う", isCorrect: true }, { text: "利用者に食事を提供する", isCorrect: false }, { text: "職員の勤務シフトを決める", isCorrect: false }, { text: "施設の掃除をする", isCorrect: false }], explanation: "カンファレンスには介護士・看護師・ケアマネジャー・リハビリ士・栄養士などが参加し、利用者のケア方針を多職種で検討します。情報共有と連携が目的です。", difficulty: 2 },
    { question: "「守秘義務（しゅひぎむ）」とは？", options: [{ text: "業務上知った秘密を他者に漏らさない義務", isCorrect: true }, { text: "秘密の食べ物を守る義務", isCorrect: false }, { text: "秘密の場所を守る義務", isCorrect: false }, { text: "書類を隠す義務", isCorrect: false }], explanation: "守秘義務（duty of confidentiality）は職業上の義務で、業務中に知った利用者・家族の個人情報を正当な理由なく他者に開示してはいけません。退職後も続きます。", difficulty: 2 },
    { question: "「〜ようです」を使う適切な場面は？", options: [{ text: "「熱があるようです」（観察からの判断）", isCorrect: true }, { text: "「熱があります」（確定した事実）", isCorrect: false }, { text: "「熱を測ってください」（指示）", isCorrect: false }, { text: "「熱でした」（過去の報告）", isCorrect: false }], explanation: "「〜ようです」は直接確認していないが、様子から判断したことを表す表現です。介護士は医療的な断定を避け、看護師への報告時にこのような客観的表現を使います。", difficulty: 2 },
    { question: "利用者から苦情があった場合の対応として正しいのは？", options: [{ text: "まず傾聴し、上司や相談員に報告する", isCorrect: true }, { text: "自分で解決しようとして黙っている", isCorrect: false }, { text: "苦情を言った利用者を避ける", isCorrect: false }, { text: "「仕方ない」と断る", isCorrect: false }], explanation: "苦情対応は「傾聴→謝罪（必要なら）→報告→解決→記録」の流れで行います。一人で抱え込まず、必ず上司・相談員に報告し組織として対応します。", difficulty: 3 },
    { question: "「尊厳（そんげん）」を守るケアとして適切なものは？", options: [{ text: "入浴時にカーテンや衝立で周囲から見えないようにする", isCorrect: true }, { text: "利用者を子ども扱いした言葉遣いをする", isCorrect: false }, { text: "ケア中に他の利用者のことを話す", isCorrect: false }, { text: "おむつ交換を大部屋で行う", isCorrect: false }], explanation: "尊厳（dignity）とは人としての価値・品位のことです。入浴・排泄など羞恥心を伴うケアでは必ずプライバシーを確保し、本人の意思を尊重します。", difficulty: 3 },
    { question: "「利用者本位（りようしゃほんい）」とはどういう意味ですか？", options: [{ text: "利用者の意思・希望を中心にケアを考えること", isCorrect: true }, { text: "職員の都合でケアを行うこと", isCorrect: false }, { text: "施設のルールを最優先にすること", isCorrect: false }, { text: "コストを最小限にすること", isCorrect: false }], explanation: "利用者本位（resident-centered care）は介護の基本理念です。「その人らしい生活」を支えるため、個々の希望・価値観・生活習慣を尊重したケアを提供します。", difficulty: 2 },
  ],

  "lesson-quiz-07": [
    { question: "「申し送り」で伝えるべき最も重要な内容は？", options: [{ text: "利用者の状態変化・ケアの実施内容・特記事項", isCorrect: true }, { text: "今日の天気と食事メニュー", isCorrect: false }, { text: "職員の個人的な感想", isCorrect: false }, { text: "来週の行事予定", isCorrect: false }], explanation: "申し送りでは利用者の体調変化（バイタル・症状）、実施したケアの内容、次のシフトで注意すべき点を正確に伝えます。「5W1H」を意識して簡潔に伝えましょう。", difficulty: 2 },
    { question: "「〜でした / 〜ていました」のどちらを使うか正しいのは？", options: [{ text: "「昨夜は38度でした」「夜中ずっと眠れていませんでした」", isCorrect: true }, { text: "「昨夜は38度ていました」「眠れませんでした」", isCorrect: false }, { text: "「38度ています」「眠りましょう」", isCorrect: false }, { text: "「38度でしょう」「眠れていません」", isCorrect: false }], explanation: "「〜でした」は名詞・形容詞の過去形、「〜ていました」は過去の継続・状態を表します。申し送りでは正確な時制の使い分けが重要です。", difficulty: 2 },
    { question: "「〜ようです」を報告で使う理由は？", options: [{ text: "観察した内容を断定せずに客観的に伝えるため", isCorrect: true }, { text: "不確かなのでごまかすため", isCorrect: false }, { text: "丁寧に聞こえるようにするため", isCorrect: false }, { text: "過去のことを表すため", isCorrect: false }], explanation: "介護士が医療的な診断をすることはできません。「〜ようです・〜と思われます」など推量表現を使い、観察事実を客観的に看護師に報告することが正しい対応です。", difficulty: 3 },
    { question: "介護記録（書き言葉）で正しい表現は？", options: [{ text: "「15時に居室を訪問した。利用者は食事中であった。」", isCorrect: true }, { text: "「15時に居室に行きました。ご飯を食べていました。」", isCorrect: false }, { text: "「15時に行って、ご飯中でした。」", isCorrect: false }, { text: "「15時ごろ行ったかな。食べてたっぽいです。」", isCorrect: false }], explanation: "介護記録は「書き言葉（文体）」で書きます。「〜した」「〜であった」「〜が見られた」のような形式を使い、時刻・場所・状況を客観的・簡潔に記録します。", difficulty: 3 },
    { question: "「緊急時の報告」で最初に伝えるべき情報は？", options: [{ text: "誰が・いつ・どこで・何が起きたか（5W1H）", isCorrect: true }, { text: "自分の名前と部署名", isCorrect: false }, { text: "昨日の申し送り内容", isCorrect: false }, { text: "施設の住所と電話番号", isCorrect: false }], explanation: "緊急報告では「○○さんが、今○時に、○○で、○○しました」と5W1H（誰が・いつ・どこで・何が・どのように・なぜ）を素早く伝えることが最優先です。", difficulty: 2 },
    { question: "「浮腫（ふしゅ）」が見られる場合の対応は？", options: [{ text: "観察内容を記録し、看護師に報告する", isCorrect: true }, { text: "自分でマッサージをする", isCorrect: false }, { text: "水分を多く飲ませる", isCorrect: false }, { text: "そのまま様子を見るだけ", isCorrect: false }], explanation: "浮腫（edema）は心不全・腎臓病・低栄養などの症状として現れる場合があります。介護士は観察・記録し、看護師に報告（ほうれんそう）することが正しい対応です。", difficulty: 3 },
    { question: "「自立支援（じりつしえん）」の意味として正しいのは？", options: [{ text: "利用者が自分でできることを増やし、その人らしい生活を支える", isCorrect: true }, { text: "すべてのことを介護士がやってあげること", isCorrect: false }, { text: "利用者を施設に閉じ込めること", isCorrect: false }, { text: "家族に任せること", isCorrect: false }], explanation: "自立支援（independence support）は「できることはできるだけ自分でやってもらう」という介護の基本的考え方です。過度な介助は廃用症候群（機能低下）の原因になります。", difficulty: 2 },
    { question: "「インフォームドコンセント」の意味は？", options: [{ text: "十分な説明を受けたうえで、本人が同意すること", isCorrect: true }, { text: "医師が患者に命令すること", isCorrect: false }, { text: "家族だけが決定すること", isCorrect: false }, { text: "施設が一方的に決めること", isCorrect: false }], explanation: "インフォームドコンセント（informed consent）は本人が十分な情報を得たうえで自由に同意する権利です。介護でも、ケアの内容を説明し利用者の同意を得ることが原則です。", difficulty: 2 },
    { question: "「〜ていただけますか」は「〜てください」と比べてどう違う？", options: [{ text: "より丁寧で、相手への敬意がある", isCorrect: true }, { text: "より命令的で強制力がある", isCorrect: false }, { text: "同じ意味・同じ丁寧さ", isCorrect: false }, { text: "禁止の意味になる", isCorrect: false }], explanation: "「〜てください」= Please do 〜（依頼）、「〜ていただけますか」= Could you please 〜?（丁寧な依頼）です。ご家族・医療職・上司には後者を使いましょう。", difficulty: 2 },
    { question: "「ケアの記録」に書いてはいけない内容は？", options: [{ text: "介護士の個人的な感情や主観的な判断", isCorrect: true }, { text: "利用者の食事摂取量", isCorrect: false }, { text: "バイタルサインの数値", isCorrect: false }, { text: "ケアを実施した時刻", isCorrect: false }], explanation: "記録は客観的事実を書くものです。「〜だと思う」「なんとなく悪そう」などの主観的表現は不適切です。「血圧が120/80 mmHgであった」のように数値・観察事実を記録します。", difficulty: 3 },
  ],

  // ============================================================
  // 特定技能「介護」試験対策 クイズ (各10問 × 7セット + 最終15問)
  // ============================================================

  "lesson-quiz-08": [
    { question: "「ADL（エーディーエル）」とは何ですか？", options: [{ text: "日常生活動作（Activities of Daily Living）", isCorrect: true }, { text: "食事の量を記録すること", isCorrect: false }, { text: "薬の管理方法", isCorrect: false }, { text: "施設の設備基準", isCorrect: false }], explanation: "ADL（Activities of Daily Living）は食事・排泄・入浴・更衣・移動・整容など日常生活に必要な基本的動作の総称です。介護目標の設定やケアプランに使われます。", difficulty: 1 },
    { question: "「廃用症候群（はいようしょうこうぐん）」の原因は？", options: [{ text: "長期間の安静・不動による身体機能の低下", isCorrect: true }, { text: "過度な運動による疲労", isCorrect: false }, { text: "食べ過ぎによる肥満", isCorrect: false }, { text: "ストレスによる精神的不調", isCorrect: false }], explanation: "廃用症候群（disuse syndrome）は、安静・寝たきりが続くことで起こる筋力低下・関節拘縮・骨粗しょう症・起立性低血圧・うつなどの複合的症状です。早期離床・リハビリが重要です。", difficulty: 2 },
    { question: "「ボディメカニクス」の原則として正しいものは？", options: [{ text: "支持基底面を広げ、重心を低くして介助する", isCorrect: true }, { text: "腰を丸めて利用者を持ち上げる", isCorrect: false }, { text: "速く動いて時間を節約する", isCorrect: false }, { text: "利用者の体を引きずって移動する", isCorrect: false }], explanation: "ボディメカニクス（body mechanics）は、足を肩幅に広げ（支持基底面を広げる）、膝を曲げて重心を下げ、体を利用者に近づけ、腰を守る介助法です。腰痛予防に必須の技術です。", difficulty: 2 },
    { question: "「移乗介助」でベッドから車椅子に移る際の正しい手順は？", options: [{ text: "声かけ→端坐位→立位→回転→着席", isCorrect: true }, { text: "突然持ち上げる→車椅子に乗せる", isCorrect: false }, { text: "仰臥位から直接車椅子に乗せる", isCorrect: false }, { text: "利用者一人でやってもらう", isCorrect: false }], explanation: "移乗介助の手順は①声かけ②端坐位（ベッドの端に座る）③足を床につける④立位③体を回す④着席です。麻痺がある場合は健側（良い側）から行います。", difficulty: 3 },
    { question: "「標準予防策（ひょうじゅんよぼうさく）」で手袋をつけるのはいつ？", options: [{ text: "血液・体液・排泄物に触れる可能性があるとき", isCorrect: true }, { text: "食事介助のときだけ", isCorrect: false }, { text: "利用者と話すときだけ", isCorrect: false }, { text: "記録を書くときだけ", isCorrect: false }], explanation: "標準予防策（Standard Precautions）では、すべての利用者の血液・体液・分泌物・排泄物・皮膚の傷等は感染性があるとみなし、手袋・マスク・エプロンなどを適切に使用します。", difficulty: 2 },
    { question: "「拘縮（こうしゅく）」の予防として正しいのは？", options: [{ text: "関節を定期的に動かすこと（関節可動域訓練）", isCorrect: true }, { text: "できるだけ動かさないこと", isCorrect: false }, { text: "硬い場所に寝かせること", isCorrect: false }, { text: "水分を多く飲ませること", isCorrect: false }], explanation: "拘縮（contracture）は関節が固まって動かなくなる状態です。予防のために、毎日の関節可動域（ROM）訓練・体位変換・適切なポジショニングが重要です。", difficulty: 2 },
    { question: "「転倒（てんとう）のリスクを高める要因」として正しいものは？", options: [{ text: "筋力低下・服薬（睡眠薬など）・環境（段差・暗さ）", isCorrect: true }, { text: "食事量が多いこと", isCorrect: false }, { text: "友人が多いこと", isCorrect: false }, { text: "読書をすること", isCorrect: false }], explanation: "転倒のリスク因子は内的（筋力低下・バランス障害・視力低下・服薬）と外的（段差・滑りやすい床・照明不足）があります。多面的なアセスメントが重要です。", difficulty: 3 },
    { question: "「身体拘束（しんたいこうそく）」が例外的に認められる3要件は？", options: [{ text: "切迫性・非代替性・一時性の3つ", isCorrect: true }, { text: "安全性・効率性・経済性の3つ", isCorrect: false }, { text: "家族の同意・職員の判断・施設の方針の3つ", isCorrect: false }, { text: "緊急性・法的根拠・管理者の承認の3つ", isCorrect: false }], explanation: "身体拘束は原則禁止ですが、①切迫性（生命の危険）②非代替性（他の方法がない）③一時性（一時的なものである）の3要件を満たす場合のみ例外として認められます。", difficulty: 3 },
    { question: "「ヒヤリハット」報告を行う目的は？", options: [{ text: "事故を未然に防ぐための情報共有と再発防止", isCorrect: true }, { text: "問題を起こした職員を罰するため", isCorrect: false }, { text: "家族に報告するため", isCorrect: false }, { text: "保険会社に申請するため", isCorrect: false }], explanation: "ヒヤリハット（near-miss）報告は「ヒヤリとした・ハッとした」体験を共有し、同様の事故を防ぐための組織的な取り組みです。責任追及ではなく、改善が目的です。", difficulty: 2 },
    { question: "「福祉用具（ふくしようぐ）」の例として正しいものは？", options: [{ text: "車椅子・歩行器・特殊寝台（介護ベッド）", isCorrect: true }, { text: "テレビ・洗濯機・冷蔵庫", isCorrect: false }, { text: "包丁・フライパン・食器", isCorrect: false }, { text: "教科書・ノート・鉛筆", isCorrect: false }], explanation: "福祉用具（assistive devices）には、車椅子・歩行補助具・特殊寝台・褥瘡予防マットレス・入浴用品・ポータブルトイレなどがあります。介護保険でレンタル・購入できるものがあります。", difficulty: 1 },
  ],

  "lesson-quiz-09": [
    { question: "「認知症（にんちしょう）」の最も多い種類は？", options: [{ text: "アルツハイマー型認知症", isCorrect: true }, { text: "レビー小体型認知症", isCorrect: false }, { text: "血管性認知症", isCorrect: false }, { text: "前頭側頭型認知症", isCorrect: false }], explanation: "認知症の中で最も多いのはアルツハイマー型認知症（60〜70%）で、記憶障害・見当識障害から始まります。次いで血管性認知症・レビー小体型が多いです。", difficulty: 1 },
    { question: "「BPSD（ビーピーエスディー）」に含まれる症状は？", options: [{ text: "徘徊・暴言・幻覚・夜間不眠", isCorrect: true }, { text: "骨折・腰痛・関節炎", isCorrect: false }, { text: "高血圧・糖尿病・肥満", isCorrect: false }, { text: "発熱・咳・鼻水", isCorrect: false }], explanation: "BPSD（認知症の行動・心理症状）には、徘徊・暴言・暴力・幻覚・妄想・不眠・抑うつ・拒否などがあります。環境整備・声かけ・ユマニチュードなどのアプローチが効果的です。", difficulty: 2 },
    { question: "認知症の方への声かけとして適切なのは？", options: [{ text: "「一緒に散歩しましょうか？」と穏やかに誘う", isCorrect: true }, { text: "「なぜ同じことを何度も言うのですか！」と叱る", isCorrect: false }, { text: "「認知症だから仕方ない」と無視する", isCorrect: false }, { text: "「早くしてください！」と急かす", isCorrect: false }], explanation: "認知症の方は混乱・不安・孤独を感じています。穏やかなトーン・ゆっくりした話し方・笑顔・アイコンタクトが重要です。叱責・急かすことはBPSDを悪化させます。", difficulty: 2 },
    { question: "「脳梗塞（のうこうそく）」後に起こりやすい後遺症は？", options: [{ text: "片麻痺・言語障害・嚥下障害", isCorrect: true }, { text: "視力が良くなる", isCorrect: false }, { text: "食欲が大幅に増加する", isCorrect: false }, { text: "記憶力が向上する", isCorrect: false }], explanation: "脳梗塞（ischemic stroke）は脳の血管が詰まる病気です。障害された部位により、片麻痺（かたまひ）・構音障害・失語・嚥下障害・高次脳機能障害などが後遺症として残ります。", difficulty: 2 },
    { question: "「せん妄（せんもう）」と「認知症」の違いは？", options: [{ text: "せん妄は急性で回復可能・認知症は慢性で進行性", isCorrect: true }, { text: "どちらも同じ病気", isCorrect: false }, { text: "認知症の方がせん妄より短期間で治る", isCorrect: false }, { text: "せん妄は高齢者にしか起こらない", isCorrect: false }], explanation: "せん妄（delirium）は感染症・術後・薬・脱水などが原因で急に起こる意識混濁です。原因を治療すると回復します。認知症は脳の変性による慢性・進行性の認知機能低下です。", difficulty: 3 },
    { question: "「誤嚥性肺炎（ごえんせいはいえん）」の予防で最も重要なことは？", options: [{ text: "口腔ケアと食形態の調整・体位管理", isCorrect: true }, { text: "毎日激しい運動をすること", isCorrect: false }, { text: "水分を控えること", isCorrect: false }, { text: "昼間はずっと寝かせること", isCorrect: false }], explanation: "誤嚥性肺炎（aspiration pneumonia）は口腔内の細菌が気管に入ることで起こります。毎食後の口腔ケア・食形態の調整（とろみ・刻み食）・30〜45度のギャッジアップが予防に効果的です。", difficulty: 2 },
    { question: "「パーキンソン病」の介護で注意すべきことは？", options: [{ text: "すくみ足・転倒・嚥下障害に注意する", isCorrect: true }, { text: "水分を制限する", isCorrect: false }, { text: "ベッドに固定する", isCorrect: false }, { text: "会話を禁止する", isCorrect: false }], explanation: "パーキンソン病は振戦（手の震え）・固縮・無動・姿勢反射障害が特徴です。すくみ足による転倒リスクが高いため、環境整備・手すりの活用・声かけが重要です。", difficulty: 2 },
    { question: "「糖尿病（とうにょうびょう）」の利用者への食事介助で注意することは？", options: [{ text: "食事制限・カロリー管理・低血糖サインの観察", isCorrect: true }, { text: "甘いものを積極的に提供する", isCorrect: false }, { text: "食事の時間を固定しない", isCorrect: false }, { text: "水分を全く与えない", isCorrect: false }], explanation: "糖尿病患者の介護では食事制限の遵守・カロリー管理が重要です。また、インスリン使用者は低血糖（冷汗・震え・意識低下）に注意し、発見したら速やかに看護師に報告します。", difficulty: 3 },
    { question: "「大腿骨骨折（だいたいこつこっせつ）」の術後介護で大切なことは？", options: [{ text: "早期離床・リハビリと廃用症候群の予防", isCorrect: true }, { text: "なるべく動かさない", isCorrect: false }, { text: "痛み止めを大量に使う", isCorrect: false }, { text: "手術した側を積極的に使う", isCorrect: false }], explanation: "大腿骨骨折（hip fracture）の術後は、廃用症候群予防のために早期離床・リハビリが重要です。看護師・理学療法士と連携し、安全な移乗介助・歩行訓練を支援します。", difficulty: 3 },
    { question: "「浮腫（ふしゅ）」が起こりやすい疾患は？", options: [{ text: "心不全・腎臓病・低栄養状態", isCorrect: true }, { text: "高血圧のみ", isCorrect: false }, { text: "骨粗しょう症のみ", isCorrect: false }, { text: "認知症のみ", isCorrect: false }], explanation: "浮腫（edema）は心不全（心臓のポンプ機能低下）・腎機能低下（水分排出障害）・低アルブミン血症（栄養不足）などで起こります。体重増加・下肢のむくみが主な症状です。", difficulty: 3 },
  ],

  "lesson-quiz-10": [
    { question: "「介護保険（かいごほけん）」の要介護認定の区分は？", options: [{ text: "要支援1〜2・要介護1〜5の7段階", isCorrect: true }, { text: "要介護のみ1〜10の10段階", isCorrect: false }, { text: "重症・中症・軽症の3段階", isCorrect: false }, { text: "A・B・Cの3段階", isCorrect: false }], explanation: "介護保険の認定区分は要支援1・2、要介護1〜5の7段階です。数字が大きいほど介護が多く必要な状態です。認定によって受けられるサービスの種類・量が変わります。", difficulty: 2 },
    { question: "「特定技能1号（とくていぎのう）」で介護の仕事ができるようになる条件は？", options: [{ text: "技能試験と日本語試験（N4以上相当）に合格すること", isCorrect: true }, { text: "日本語が全く話せなくてもよい", isCorrect: false }, { text: "日本国籍が必要", isCorrect: false }, { text: "医師の資格が必要", isCorrect: false }], explanation: "特定技能1号（介護）は、介護技能評価試験と日本語能力試験（JLPT N4相当以上）に合格することで取得できます。在留期間は最長5年です。", difficulty: 2 },
    { question: "「ケアプラン（care plan）」を作成するのは誰ですか？", options: [{ text: "介護支援専門員（ケアマネジャー）", isCorrect: true }, { text: "介護士", isCorrect: false }, { text: "看護師", isCorrect: false }, { text: "利用者本人", isCorrect: false }], explanation: "ケアプランは介護支援専門員（ケアマネジャー）が作成します。利用者の状態・希望・家族の意向を踏まえ、必要なサービスを組み合わせた計画書です。介護士はケアプランに沿ってケアを提供します。", difficulty: 1 },
    { question: "「虐待（ぎゃくたい）」に当たる行為として正しいものは？", options: [{ text: "怒鳴る・無視する・叩く・財産を奪う", isCorrect: true }, { text: "笑顔で接する", isCorrect: false }, { text: "食事介助をする", isCorrect: false }, { text: "体操を一緒にする", isCorrect: false }], explanation: "高齢者虐待は身体的（叩く）・心理的（怒鳴る・無視）・経済的（財産搾取）・性的・ネグレクト（必要なケアをしない）の5種類があります。発見・疑いがあれば市町村に通報する義務があります。", difficulty: 2 },
    { question: "「事故報告書（じこほうこくしょ）」を書く目的は？", options: [{ text: "事故の原因を分析し、再発を防止するため", isCorrect: true }, { text: "問題のある職員を処罰するため", isCorrect: false }, { text: "利用者に謝罪するため", isCorrect: false }, { text: "保険会社への報告のみのため", isCorrect: false }], explanation: "事故報告書（incident report）は事故の状況・原因・対応・再発防止策を記録する書類です。責任追及ではなく、組織全体で再発防止策を考えることが目的です。", difficulty: 2 },
    { question: "「身体拘束禁止（しんたいこうそくきんし）」の例外となる「切迫性（せっぱくせい）」とは？", options: [{ text: "利用者本人や他者の生命・身体に危険が迫っていること", isCorrect: true }, { text: "職員の手が足りないこと", isCorrect: false }, { text: "利用者が希望していること", isCorrect: false }, { text: "家族が許可していること", isCorrect: false }], explanation: "身体拘束の例外3要件の「切迫性」とは、「本人または他者の生命・身体の安全に著しい危険が迫っている」という状態です。3要件すべてを満たし、記録と家族への説明が必要です。", difficulty: 3 },
    { question: "「リスクマネジメント（risk management）」の目的は？", options: [{ text: "事故・トラブルのリスクを予測・予防・最小化すること", isCorrect: true }, { text: "費用を削減すること", isCorrect: false }, { text: "職員を管理すること", isCorrect: false }, { text: "行政に報告すること", isCorrect: false }], explanation: "リスクマネジメントは施設でのリスク（転倒・誤薬・感染など）を組織的に管理する取り組みです。ヒヤリハット報告・事故分析・再発防止策の実施が含まれます。", difficulty: 2 },
    { question: "「苦情解決（くじょうかいけつ）」の手順として正しいのは？", options: [{ text: "傾聴→事実確認→上司に報告→改善→記録", isCorrect: true }, { text: "無視→否定→記録", isCorrect: false }, { text: "謝罪→終了", isCorrect: false }, { text: "家族に丸投げ", isCorrect: false }], explanation: "苦情対応は①傾聴と感謝②事実確認③責任者への報告④改善策の検討と実行⑤フォローアップ⑥記録の流れで行います。苦情はサービス改善の機会として前向きに捉えましょう。", difficulty: 3 },
    { question: "「権利擁護（けんりようご）」の具体的な内容として正しいものは？", options: [{ text: "成年後見制度・日常生活自立支援事業の活用", isCorrect: true }, { text: "利用者の財産を職員が管理すること", isCorrect: false }, { text: "家族だけが決定権を持つこと", isCorrect: false }, { text: "施設の方針を一方的に押し付けること", isCorrect: false }], explanation: "権利擁護（rights advocacy）では、判断能力が低下した方の権利を守るために成年後見制度・日常生活自立支援事業・虐待防止などの制度を活用します。", difficulty: 3 },
    { question: "「個人情報保護法（こじんじょうほうほごほう）」に違反する行為は？", options: [{ text: "利用者の情報をSNSに投稿する", isCorrect: true }, { text: "利用者の情報を鍵のかかる場所に保管する", isCorrect: false }, { text: "業務上必要な情報を同僚に伝える", isCorrect: false }, { text: "ケア記録を施設内で保管する", isCorrect: false }], explanation: "個人情報保護法では、利用者の氏名・病状・家族構成などを本人の同意なく第三者に提供することを原則として禁じています。SNS投稿・施設外への書類持ち出しなどは違反です。", difficulty: 2 },
  ],

  "lesson-quiz-11": [
    { question: "次の文章の（　）に入る語句は何ですか？「介護士は利用者の（　）を守り、その人らしい生活を支援する。」", options: [{ text: "尊厳", isCorrect: true }, { text: "財産", isCorrect: false }, { text: "秘密", isCorrect: false }, { text: "申し送り", isCorrect: false }], explanation: "「尊厳（dignity）を守る」は介護の基本理念です。利用者が人としての価値を保ち、その人らしく生きられるよう支援することが介護の目的です。", difficulty: 2 },
    { question: "「介護記録には（　）を使って書く。」（　）に入るのは？", options: [{ text: "客観的な事実と書き言葉", isCorrect: true }, { text: "主観的な感想や推測", isCorrect: false }, { text: "他の利用者の情報", isCorrect: false }, { text: "介護士の個人的な意見", isCorrect: false }], explanation: "介護記録は「客観的な事実を書き言葉（文体）で記録する」ものです。「〜であった」「〜が見られた」のような表現を使い、時刻・場所・状況を正確に記録します。", difficulty: 2 },
    { question: "「食事摂取量が（　）の場合、看護師に報告する。」（　）に入るのは？", options: [{ text: "半分以下（5割未満）", isCorrect: true }, { text: "100%の場合", isCorrect: false }, { text: "いつもと同じ場合", isCorrect: false }, { text: "8割の場合", isCorrect: false }], explanation: "食事摂取量が極端に少ない場合（概ね5割未満が続くなど）は、栄養不足・嚥下障害・疾患の悪化を示すサインです。記録するとともに、状況に応じて看護師に報告します。", difficulty: 2 },
    { question: "「自立支援では、できることは（　）にやってもらう。」（　）に入るのは？", options: [{ text: "本人（利用者）", isCorrect: true }, { text: "介護士", isCorrect: false }, { text: "家族", isCorrect: false }, { text: "看護師", isCorrect: false }], explanation: "自立支援では「できることはできるだけ自分でやってもらう」ことが大切です。過度な介助は廃用症候群を招き、自立を阻害します。残存機能（残っている能力）を活かすケアを心がけましょう。", difficulty: 1 },
    { question: "「緊急時にまず行うこと」として正しい順序は？", options: [{ text: "①利用者の安全確保 ②看護師・上司に報告 ③記録", isCorrect: true }, { text: "①記録 ②家族に連絡 ③看護師に報告", isCorrect: false }, { text: "①帰宅 ②翌日報告 ③記録", isCorrect: false }, { text: "①一人で対応 ②様子を見る ③必要なら報告", isCorrect: false }], explanation: "緊急時の対応は①利用者の安全確保（転倒なら動かさない・出血なら止血）②ナースコール・大声で応援を呼ぶ③看護師・上司に状況報告④記録の順です。", difficulty: 2 },
    { question: "「口腔ケアを行う最適なタイミングは？」", options: [{ text: "毎食後と就寝前", isCorrect: true }, { text: "週に1回のみ", isCorrect: false }, { text: "入浴の前だけ", isCorrect: false }, { text: "起床直後のみ", isCorrect: false }], explanation: "口腔ケアは毎食後（食物残渣の除去）と就寝前（夜間の細菌増殖防止）が基本です。特に嚥下機能が低下している方は、細菌が肺に入ることによる誤嚥性肺炎予防のためにも重要です。", difficulty: 2 },
    { question: "「感染予防の手洗い」で正しいのは？", options: [{ text: "ケアの前後・手袋を外した後・食事介助の前", isCorrect: true }, { text: "退勤時の1回だけ", isCorrect: false }, { text: "利用者が感染症の時だけ", isCorrect: false }, { text: "水洗いだけで十分", isCorrect: false }], explanation: "手指衛生（hand hygiene）は感染予防の最も重要な手段です。流水と石鹸で15〜20秒洗う、またはアルコール消毒剤を使用します。タイミングは5つのモーメント（WHO基準）を参考にしましょう。", difficulty: 2 },
    { question: "「ケアマネジャー（介護支援専門員）」の主な役割は？", options: [{ text: "ケアプランの作成と介護サービスのコーディネート", isCorrect: true }, { text: "直接的な身体介護を行う", isCorrect: false }, { text: "医療行為を行う", isCorrect: false }, { text: "施設の経理を担当する", isCorrect: false }], explanation: "ケアマネジャーは利用者の状態を評価し、適切なサービスを組み合わせたケアプランを作成します。また、各サービス事業者間のコーディネート（調整）も重要な役割です。", difficulty: 1 },
    { question: "「在留資格（ざいりゅうしかく）」とは何ですか？", options: [{ text: "外国人が日本に滞在し活動するために必要な法的資格", isCorrect: true }, { text: "日本語能力試験の証明書", isCorrect: false }, { text: "介護施設の資格", isCorrect: false }, { text: "健康保険証", isCorrect: false }], explanation: "在留資格（residence status）は外国人が日本に適法に滞在し、一定の活動を行うために必要な資格です。「特定技能」「技能実習」「介護」「永住者」などの種類があります。", difficulty: 1 },
    { question: "「ほうれんそう（報告・連絡・相談）」で「相談（そうだん）」が必要な場面は？", options: [{ text: "判断に迷うことがある・一人では対応が難しい", isCorrect: true }, { text: "業務が順調に進んでいる", isCorrect: false }, { text: "利用者が元気にしている", isCorrect: false }, { text: "食事が全量摂取できた", isCorrect: false }], explanation: "「相談」は自分だけの判断が難しい場合に上司・同僚・専門職に意見を求めることです。「こんな些細なことで相談していいのか」と躊躇わず、積極的に相談することが安全なケアにつながります。", difficulty: 2 },
  ],

  "lesson-quiz-12": [
    { question: "介護技能評価試験で「入浴介助」に関する問題が出た場合、最も重要な観点は？", options: [{ text: "安全性と利用者の尊厳の保持", isCorrect: true }, { text: "速度と効率", isCorrect: false }, { text: "道具の種類と数", isCorrect: false }, { text: "施設の広さ", isCorrect: false }], explanation: "入浴介助では①安全（転倒防止・溺水防止）②尊厳の保持（プライバシー・羞恥心への配慮）③利用者の健康状態確認が最重要です。効率よりも安全と尊厳を優先します。", difficulty: 2 },
    { question: "「食事介助」の基本姿勢として正しいのは？", options: [{ text: "利用者と目線を合わせ、ゆっくり・安全なペースで介助する", isCorrect: true }, { text: "立ったまま素早く食べさせる", isCorrect: false }, { text: "利用者が嫌がっても無理やり食べさせる", isCorrect: false }, { text: "食事中は会話を一切しない", isCorrect: false }], explanation: "食事介助は①座位または30〜45度のギャッジアップ②ゆっくりしたペース③一口ずつ確認④嚥下確認が基本です。利用者の意思を尊重し、楽しい食事の時間を提供します。", difficulty: 2 },
    { question: "「排泄介助」でおむつ交換の際に最も注意すべきことは？", options: [{ text: "プライバシーの確保と皮膚の状態観察", isCorrect: true }, { text: "できるだけ長時間放置しない", isCorrect: false }, { text: "利用者に知らせずに行う", isCorrect: false }, { text: "一人で行うのが原則", isCorrect: false }], explanation: "おむつ交換では①カーテン・衝立でプライバシー確保②声かけと同意③皮膚の発赤・褥瘡チェック④手袋着用⑤適切な廃棄が重要です。皮膚の状態変化は記録・報告します。", difficulty: 2 },
    { question: "「車椅子からベッドへの移乗」で麻痺がある場合、どちらを車椅子に近づけるか？", options: [{ text: "健側（良い方）をベッドに近づける", isCorrect: true }, { text: "患側（麻痺している方）をベッドに近づける", isCorrect: false }, { text: "どちらでもよい", isCorrect: false }, { text: "必ず正面から介助する", isCorrect: false }], explanation: "片麻痺のある方の移乗では、健側（機能している側）をベッドに近づけ、健側の筋力を活かして立ち上がります。患側に車椅子を近づけると転倒リスクが上がります。", difficulty: 3 },
    { question: "「体位変換」の介助で腰を守るために重要なことは？", options: [{ text: "ボディメカニクスを使い、膝を曲げて低い姿勢で行う", isCorrect: true }, { text: "腰を曲げて利用者を持ち上げる", isCorrect: false }, { text: "一人で急いで行う", isCorrect: false }, { text: "利用者を引きずる", isCorrect: false }], explanation: "体位変換では①ボディメカニクスを活用②足を広げて支持基底面を確保③膝を曲げて腰を低くする④利用者を引き寄せる⑤できるだけ二人介助で行うことが腰痛予防の基本です。", difficulty: 2 },
    { question: "「経管栄養（けいかんえいよう）」の注入中に観察すべき症状は？", options: [{ text: "嘔吐・腹部膨満・顔色変化・呼吸状態の変化", isCorrect: true }, { text: "血圧のみ", isCorrect: false }, { text: "体重のみ", isCorrect: false }, { text: "視力のみ", isCorrect: false }], explanation: "経管栄養（tube feeding）中は嘔吐・逆流・腹部膨満・下痢・顔色変化・呼吸困難などに注意します。異常を発見したら注入を止め、すぐに看護師に報告します。介護士が直接操作を行う場合は医師・看護師の指示に従います。", difficulty: 3 },
    { question: "「ポジショニング（体位管理）」の目的として正しいものは？", options: [{ text: "褥瘡予防・拘縮予防・呼吸機能維持", isCorrect: true }, { text: "食欲増進", isCorrect: false }, { text: "睡眠を深くする", isCorrect: false }, { text: "体重を増やす", isCorrect: false }], explanation: "ポジショニング（positioning）は適切な体位を保持することで①褥瘡予防（圧力分散）②拘縮予防（関節の適切な角度維持）③呼吸機能の維持を目的とします。", difficulty: 2 },
    { question: "「感染症が施設内で流行した場合」の対応として正しいのは？", options: [{ text: "感染者を隔離し、標準予防策を徹底する", isCorrect: true }, { text: "感染者に特別なケアは不要", isCorrect: false }, { text: "家族にのみ報告する", isCorrect: false }, { text: "施設を閉鎖する", isCorrect: false }], explanation: "施設内感染（院内感染）発生時は①感染者の隔離②標準予防策+感染経路別予防策の徹底③職員の手指衛生④行政への報告（感染症によっては義務）⑤家族への連絡が必要です。", difficulty: 3 },
    { question: "「ユマニチュード（Humanitude）」とは？", options: [{ text: "認知症ケアに有効な「見る・話す・触れる・立つ」を基本とするケア技法", isCorrect: true }, { text: "食事介助の特別な方法", isCorrect: false }, { text: "入浴介助の技術", isCorrect: false }, { text: "記録の書き方", isCorrect: false }], explanation: "ユマニチュードはフランス発の認知症ケア哲学・技法です。「見る（目線を合わせる）」「話す（穏やかに）」「触れる（優しく）」「立つ（自立支援）」の4つを基本とし、BPSD軽減に効果的です。", difficulty: 3 },
    { question: "「ターミナルケア（terminal care）・看取りケア」で介護士の役割は？", options: [{ text: "利用者が安心・安楽に過ごせるよう寄り添い、ご家族を支援する", isCorrect: true }, { text: "医療行為を行う", isCorrect: false }, { text: "利用者と面会しない", isCorrect: false }, { text: "家族に代わって全決定を行う", isCorrect: false }], explanation: "看取りケアでは医療処置よりも「その人らしい最期」を支えることが大切です。介護士は傾聴・寄り添い・環境整備・家族への精神的サポートを行います。多職種での連携が不可欠です。", difficulty: 3 },
  ],

  "lesson-quiz-13": [
    { question: "次の申し送り文の空欄に入る正しい表現は？「田中様は朝から食欲がなく、昼食の摂取量は（　）でした。」", options: [{ text: "3割程度", isCorrect: true }, { text: "3割ぐらい食べた感じ", isCorrect: false }, { text: "あまり食べていない", isCorrect: false }, { text: "食欲がない", isCorrect: false }], explanation: "記録や申し送りでは「〜割程度」「〜%」のように具体的な数値で表現します。「あまり」「少し」などの曖昧な表現は避け、客観的に記録しましょう。", difficulty: 2 },
    { question: "「介護保険施設での身体拘束」について正しい記述は？", options: [{ text: "原則禁止。例外は切迫性・非代替性・一時性の3要件を満たす場合のみ", isCorrect: true }, { text: "職員が必要と判断すれば自由に行える", isCorrect: false }, { text: "家族の同意があれば常に許可される", isCorrect: false }, { text: "高齢者には常に必要", isCorrect: false }], explanation: "介護保険法では身体拘束を原則禁止しています。例外的に認める場合も3要件（切迫性・非代替性・一時性）すべてを満たし、家族への説明・記録が必要です。", difficulty: 3 },
    { question: "「特定技能介護」で就労する外国人が取得すべき試験は？", options: [{ text: "介護技能評価試験 + 日本語能力試験（N4相当以上）", isCorrect: true }, { text: "介護福祉士国家試験のみ", isCorrect: false }, { text: "英語試験のみ", isCorrect: false }, { text: "試験は不要", isCorrect: false }], explanation: "特定技能（介護）を取得するには介護技能評価試験（介護の知識・技術）と日本語試験（JLPT N4以上またはJFT-Basic）に合格する必要があります。", difficulty: 2 },
    { question: "「利用者の「せん妄（delirium）」を発見した際の対応は？", options: [{ text: "安全を確保し、看護師に報告する", isCorrect: true }, { text: "一人で対応し、記録に残さない", isCorrect: false }, { text: "利用者の話を全て信じて行動する", isCorrect: false }, { text: "翌日まで様子を見る", isCorrect: false }], explanation: "せん妄は急性の意識障害です。利用者の安全を確保（ベッドから落ちないよう確認など）し、すぐに看護師に報告します。原因（脱水・感染・薬など）の特定と治療が必要です。", difficulty: 3 },
    { question: "「口腔ケア」を怠るとどのような問題が起きますか？", options: [{ text: "誤嚥性肺炎・虫歯・口臭・口腔機能の低下", isCorrect: true }, { text: "体重が増加する", isCorrect: false }, { text: "血圧が上がる", isCorrect: false }, { text: "記憶力が低下する", isCorrect: false }], explanation: "口腔ケアを怠ると、口腔内細菌が増殖し誤嚥性肺炎（aspiration pneumonia）・虫歯・歯周病・口臭・口腔機能低下につながります。毎食後と就寝前のケアが重要です。", difficulty: 2 },
    { question: "「高齢者の転倒」で最も骨折しやすい部位は？", options: [{ text: "大腿骨（股関節付近）・手首・背骨（脊椎圧迫骨折）", isCorrect: true }, { text: "指・耳・鼻", isCorrect: false }, { text: "頭部のみ", isCorrect: false }, { text: "胃・腸", isCorrect: false }], explanation: "骨粗しょう症のある高齢者が転倒した場合、最も多い骨折部位は大腿骨頸部（hip）・橈骨遠位端（wrist）・脊椎（spine）・上腕骨（shoulder）です。早期発見・早期治療が重要です。", difficulty: 2 },
    { question: "「カンファレンス（care conference）」への参加者として適切なのは？", options: [{ text: "ケアマネジャー・介護士・看護師・リハビリ職・栄養士・家族", isCorrect: true }, { text: "介護士のみ", isCorrect: false }, { text: "医師と看護師のみ", isCorrect: false }, { text: "家族のみ", isCorrect: false }], explanation: "カンファレンスには多職種（ケアマネジャー・介護士・看護師・理学療法士・作業療法士・管理栄養士・相談員など）が参加します。利用者・家族も参加することがあります。", difficulty: 2 },
    { question: "「介護記録の重要性」として正しいのは？", options: [{ text: "ケアの継続性・証拠・情報共有・サービス評価に必要", isCorrect: true }, { text: "特に重要でない", isCorrect: false }, { text: "自分だけが見るメモ", isCorrect: false }, { text: "家族に見せる日記", isCorrect: false }], explanation: "介護記録は①ケアの継続性（申し送り）②法的証拠③多職種間の情報共有④サービスの質評価⑤利用者・家族への説明資料として重要です。正確・客観的・タイムリーな記録が求められます。", difficulty: 2 },
    { question: "「ノロウイルス感染症」が施設で発生した場合の対応は？", options: [{ text: "嘔吐物の適切な処理・手洗い徹底・隔離・施設長への報告", isCorrect: true }, { text: "そのまま通常業務を続ける", isCorrect: false }, { text: "感染者に面会禁止とするだけ", isCorrect: false }, { text: "消毒液を廊下に撒く", isCorrect: false }], explanation: "ノロウイルス（norovirus）は感染力が強く、施設内アウトブレイクに注意が必要です。嘔吐物処理には次亜塩素酸ナトリウム（0.1%）使用、手洗い徹底、患者の隔離、保健所への届出（集団感染時）が必要です。", difficulty: 3 },
    { question: "「在宅介護と施設介護の違い」として正しい記述は？", options: [{ text: "在宅は自宅でサービスを受け、施設は入所してサービスを受ける", isCorrect: true }, { text: "在宅は病院でのサービス、施設は外出してのサービス", isCorrect: false }, { text: "どちらも同じ場所で行われる", isCorrect: false }, { text: "在宅の方が重度の方に適している", isCorrect: false }], explanation: "在宅介護は自宅でヘルパー・訪問看護・デイサービスなどを活用するサービスです。施設介護は特別養護老人ホーム・介護老人保健施設・グループホームなどへ入所するサービスです。", difficulty: 1 },
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
  // ============================================================
  // 介護の日本語 基礎コース レッスンマップ (12レッスン)
  // ============================================================
  "l2000000-0000-0000-0000-000000000001": { type: "vocabulary", vocabKey: "lesson-vocab-06", title: "第1課: 施設・職種・道具（15語）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "介護現場で使う施設・職種・器具の名前" },
  "l2000000-0000-0000-0000-000000000002": { type: "vocabulary", vocabKey: "lesson-vocab-07", title: "第2課: 食事・水分管理（15語）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "嚥下・食形態・経管栄養など食事管理の用語" },
  "l2000000-0000-0000-0000-000000000003": { type: "vocabulary", vocabKey: "lesson-vocab-08", title: "第3課: 排泄・清潔ケア（15語）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "排泄介助・体位・清潔ケアの専門語彙" },
  "l2000000-0000-0000-0000-000000000004": { type: "vocabulary", vocabKey: "lesson-vocab-09", title: "第4課: コミュニケーション・ご家族対応（15語）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "声かけ・傾聴・ほうれんそう・個人情報保護" },
  "l2000000-0000-0000-0000-000000000005": { type: "grammar", grammarKey: "lesson-grammar-06", title: "文法1: 申し送りの表現〜でした/〜ていました", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "過去の状態を正確に伝える申し送り・記録表現" },
  "l2000000-0000-0000-0000-000000000006": { type: "grammar", grammarKey: "lesson-grammar-07", title: "文法2: 確認・依頼の丁寧表現", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "〜ましょうか・〜ていただけますか" },
  "l2000000-0000-0000-0000-000000000007": { type: "grammar", grammarKey: "lesson-grammar-08", title: "文法3: 報告・観察の表現", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "〜ようです・〜と思われます（客観的報告）" },
  "l2000000-0000-0000-0000-000000000008": { type: "grammar", grammarKey: "lesson-grammar-09", title: "文法4: 緊急時の対応表現", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "5W1Hで正確・迅速に報告する緊急時表現" },
  "l2000000-0000-0000-0000-000000000009": { type: "quiz", quizKey: "lesson-quiz-04", title: "確認テスト①: 施設語彙・道具（10問）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "施設・職種・道具の語彙理解度チェック" },
  "l2000000-0000-0000-0000-000000000010": { type: "quiz", quizKey: "lesson-quiz-05", title: "確認テスト②: 食事・排泄ケア（10問）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "食事管理・排泄・清潔ケアの知識チェック" },
  "l2000000-0000-0000-0000-000000000011": { type: "quiz", quizKey: "lesson-quiz-06", title: "確認テスト③: コミュニケーション実践（10問）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "声かけ・報告・個人情報保護の実践チェック" },
  "l2000000-0000-0000-0000-000000000012": { type: "quiz", quizKey: "lesson-quiz-07", title: "確認テスト④: 総合まとめ（10問）", courseId: "c2000000-0000-0000-0000-000000000001", subtitle: "介護の日本語 基礎コース 総合力確認" },

  // ============================================================
  // 特定技能「介護」試験対策 レッスンマップ (13レッスン)
  // ============================================================
  "l3000000-0000-0000-0000-000000000001": { type: "vocabulary", vocabKey: "lesson-vocab-10", title: "第1課: 介護技術用語（15語）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "ADL・廃用症候群・ボディメカニクス・感染予防など試験必須語彙" },
  "l3000000-0000-0000-0000-000000000002": { type: "vocabulary", vocabKey: "lesson-vocab-11", title: "第2課: 疾患・医療用語（15語）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "認知症・脳梗塞・糖尿病・パーキンソン病など疾患語彙" },
  "l3000000-0000-0000-0000-000000000003": { type: "vocabulary", vocabKey: "lesson-vocab-12", title: "第3課: 法律・制度用語（15語）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "介護保険・特定技能・ケアプラン・権利擁護など制度用語" },
  "l3000000-0000-0000-0000-000000000004": { type: "grammar", grammarKey: "lesson-grammar-10", title: "文法1: 試験に出る読解表現", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "〜について・〜にとって・〜に対してなど重要構文" },
  "l3000000-0000-0000-0000-000000000005": { type: "grammar", grammarKey: "lesson-grammar-11", title: "文法2: ケアプラン・記録の書き言葉", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "〜を実施した・〜が見られた・〜を目標とするなど記録文体" },
  "l3000000-0000-0000-0000-000000000006": { type: "quiz", quizKey: "lesson-quiz-08", title: "技能試験対策①: 介護技術・安全管理（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "ADL・ボディメカニクス・拘縮・標準予防策など" },
  "l3000000-0000-0000-0000-000000000007": { type: "quiz", quizKey: "lesson-quiz-09", title: "技能試験対策②: 認知症・疾患ケア（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "認知症・BPSD・脳梗塞・誤嚥性肺炎など疾患対応" },
  "l3000000-0000-0000-0000-000000000008": { type: "quiz", quizKey: "lesson-quiz-10", title: "技能試験対策③: 制度・法律・倫理（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "介護保険・特定技能・虐待防止・権利擁護など" },
  "l3000000-0000-0000-0000-000000000009": { type: "quiz", quizKey: "lesson-quiz-11", title: "日本語試験対策①: 読解・記録表現（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "記録文の穴埋め・申し送り・緊急報告の表現" },
  "l3000000-0000-0000-0000-000000000010": { type: "quiz", quizKey: "lesson-quiz-12", title: "日本語試験対策②: 介護技術応用（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "入浴・食事・排泄・移乗介助の実践的知識" },
  "l3000000-0000-0000-0000-000000000011": { type: "quiz", quizKey: "lesson-quiz-13", title: "模擬試験①: 総合実力チェック（10問）", courseId: "c3000000-0000-0000-0000-000000000001", subtitle: "技能・日本語・制度を組み合わせた総合問題" },
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
