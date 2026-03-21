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

  // ============================================================
  // JLPT N4 コース 語彙データ
  // ============================================================

  // N4 第1課: コミュニケーション・業務用語 (15語)
  "lesson-vocab-n4-01": [
    { word: "連絡", reading: "れんらく", meaning: "情報を伝えること", translation: { vi: "liên lạc / thông báo", en: "contact / communication", zh: "联络" }, example: "すぐに上司に連絡してください。", exampleReading: "すぐに じょうしに れんらくしてください。", exampleTranslation: { vi: "Vui lòng liên lạc với cấp trên ngay.", en: "Please contact your supervisor right away.", zh: "请立刻联络上司。" }, category: "コミュニケーション" },
    { word: "説明", reading: "せつめい", meaning: "わかりやすく伝えること", translation: { vi: "giải thích", en: "explanation", zh: "说明" }, example: "ご家族に病状を説明しました。", exampleReading: "ごかぞくに びょうじょうを せつめいしました。", exampleTranslation: { vi: "Tôi đã giải thích tình trạng bệnh cho gia đình.", en: "I explained the condition to the family.", zh: "我向家属说明了病情。" }, category: "コミュニケーション" },
    { word: "確認", reading: "かくにん", meaning: "正しいかどうか調べること", translation: { vi: "xác nhận / kiểm tra", en: "confirmation / check", zh: "确认" }, example: "薬の種類を確認してください。", exampleReading: "くすりの しゅるいを かくにんしてください。", exampleTranslation: { vi: "Vui lòng xác nhận loại thuốc.", en: "Please confirm the type of medicine.", zh: "请确认药物种类。" }, category: "業務" },
    { word: "報告", reading: "ほうこく", meaning: "上司や同僚に知らせること", translation: { vi: "báo cáo", en: "report", zh: "报告" }, example: "変化があれば看護師に報告します。", exampleReading: "へんかが あれば かんごしに ほうこくします。", exampleTranslation: { vi: "Nếu có thay đổi, tôi báo cáo với y tá.", en: "I will report any changes to the nurse.", zh: "如有变化，就向护士报告。" }, category: "業務" },
    { word: "相談", reading: "そうだん", meaning: "意見を聞いて一緒に考えること", translation: { vi: "tư vấn / thảo luận", en: "consultation / advice", zh: "商量 / 咨询" }, example: "困ったことは上司に相談しましょう。", exampleReading: "こまったことは じょうしに そうだんしましょう。", exampleTranslation: { vi: "Hãy thảo luận với cấp trên khi gặp khó khăn.", en: "Let's consult your supervisor when you have problems.", zh: "有困难就和上司商量吧。" }, category: "コミュニケーション" },
    { word: "提案", reading: "ていあん", meaning: "新しいアイデアや方法を提示すること", translation: { vi: "đề xuất", en: "proposal / suggestion", zh: "提案" }, example: "新しいケア方法を提案しました。", exampleReading: "あたらしい ケアほうほうを ていあんしました。", exampleTranslation: { vi: "Tôi đã đề xuất phương pháp chăm sóc mới.", en: "I proposed a new care method.", zh: "我提案了新的护理方法。" }, category: "業務" },
    { word: "判断", reading: "はんだん", meaning: "正しいかどうか決めること", translation: { vi: "phán đoán / quyết định", en: "judgment / decision", zh: "判断" }, example: "一人で判断せず相談しましょう。", exampleReading: "ひとりで はんだんせず そうだんしましょう。", exampleTranslation: { vi: "Đừng tự quyết định một mình, hãy tham khảo ý kiến.", en: "Don't decide alone, consult others.", zh: "不要独自判断，请商量。" }, category: "業務" },
    { word: "指示", reading: "しじ", meaning: "やることを教えること・命令", translation: { vi: "chỉ thị / hướng dẫn", en: "instruction / direction", zh: "指示" }, example: "看護師の指示に従います。", exampleReading: "かんごしの しじに したがいます。", exampleTranslation: { vi: "Tôi tuân theo chỉ thị của y tá.", en: "I follow the nurse's instructions.", zh: "我遵从护士的指示。" }, category: "業務" },
    { word: "許可", reading: "きょか", meaning: "してもよいと認めること", translation: { vi: "cho phép", en: "permission / approval", zh: "许可" }, example: "外出には許可が必要です。", exampleReading: "がいしゅつには きょかが ひつようです。", exampleTranslation: { vi: "Cần có sự cho phép để ra ngoài.", en: "Permission is required for outings.", zh: "外出需要许可。" }, category: "業務" },
    { word: "禁止", reading: "きんし", meaning: "してはいけないと決めること", translation: { vi: "cấm", en: "prohibition / ban", zh: "禁止" }, example: "この薬の使用は医師以外に禁止されています。", exampleReading: "この くすりの しようは いし いがいに きんしされています。", exampleTranslation: { vi: "Việc sử dụng thuốc này bị cấm đối với người không phải bác sĩ.", en: "Use of this medication is prohibited except by doctors.", zh: "此药的使用除医生外是被禁止的。" }, category: "業務" },
    { word: "手続き", reading: "てつづき", meaning: "必要な順序に従って進める作業", translation: { vi: "thủ tục", en: "procedure / formality", zh: "手续" }, example: "入所の手続きをします。", exampleReading: "にゅうしょの てつづきを します。", exampleTranslation: { vi: "Tôi làm thủ tục nhập viện.", en: "I will complete the admission procedure.", zh: "我办理入住手续。" }, category: "業務" },
    { word: "担当", reading: "たんとう", meaning: "ある仕事を受け持つこと・その人", translation: { vi: "phụ trách", en: "person in charge / responsible person", zh: "负责人" }, example: "田中様の担当は山田さんです。", exampleReading: "たなかさまの たんとうは やまださんです。", exampleTranslation: { vi: "Người phụ trách của ông/bà Tanaka là anh/chị Yamada.", en: "Mr. Yamada is in charge of Mr. Tanaka.", zh: "田中先生的负责人是山田。" }, category: "業務" },
    { word: "交代", reading: "こうたい", meaning: "人が替わること・シフト変更", translation: { vi: "bàn giao / thay ca", en: "shift change / handover", zh: "交班" }, category: "業務", example: "夜勤の交代をします。", exampleReading: "やきんの こうたいを します。", exampleTranslation: { vi: "Tôi bàn giao ca đêm.", en: "I will do the night shift handover.", zh: "我进行夜班交班。" } },
    { word: "書類", reading: "しょるい", meaning: "情報が書かれた紙・文書", translation: { vi: "tài liệu / văn bản", en: "document / paperwork", zh: "文件" }, example: "入所に必要な書類を集めます。", exampleReading: "にゅうしょに ひつような しょるいを あつめます。", exampleTranslation: { vi: "Tôi thu thập tài liệu cần thiết để nhập viện.", en: "I will gather the documents needed for admission.", zh: "我收集入住所需文件。" }, category: "業務" },
    { word: "引継ぎ", reading: "ひきつぎ", meaning: "仕事を次の人に渡すこと", translation: { vi: "bàn giao công việc", en: "handover / turnover", zh: "工作交接" }, example: "退職前に引継ぎをします。", exampleReading: "たいしょくまえに ひきつぎを します。", exampleTranslation: { vi: "Trước khi nghỉ việc, tôi bàn giao công việc.", en: "I will do the handover before leaving.", zh: "辞职前我进行工作交接。" }, category: "業務" },
  ],

  // N4 第2課: 医療・健康・ケア用語 (15語)
  "lesson-vocab-n4-02": [
    { word: "症状", reading: "しょうじょう", meaning: "病気やケガのサイン・現れ", translation: { vi: "triệu chứng", en: "symptom", zh: "症状" }, example: "どんな症状がありますか？", exampleReading: "どんな しょうじょうが ありますか？", exampleTranslation: { vi: "Bạn có triệu chứng gì?", en: "What symptoms do you have?", zh: "有什么症状？" }, category: "医療" },
    { word: "診断", reading: "しんだん", meaning: "医師が病気を判定すること", translation: { vi: "chẩn đoán", en: "diagnosis", zh: "诊断" }, example: "医師から診断結果を聞きました。", exampleReading: "いしから しんだんけっかを ききました。", exampleTranslation: { vi: "Tôi nghe kết quả chẩn đoán từ bác sĩ.", en: "I heard the diagnosis result from the doctor.", zh: "我听了医生的诊断结果。" }, category: "医療" },
    { word: "治療", reading: "ちりょう", meaning: "病気やケガを治す処置", translation: { vi: "điều trị", en: "treatment / therapy", zh: "治疗" }, example: "リハビリの治療を続けます。", exampleReading: "リハビリの ちりょうを つづけます。", exampleTranslation: { vi: "Tôi tiếp tục điều trị phục hồi chức năng.", en: "I will continue rehabilitation treatment.", zh: "我继续进行康复治疗。" }, category: "医療" },
    { word: "処方", reading: "しょほう", meaning: "医師が薬を指定すること", translation: { vi: "kê đơn thuốc", en: "prescription", zh: "处方" }, example: "医師が薬を処方しました。", exampleReading: "いしが くすりを しょほうしました。", exampleTranslation: { vi: "Bác sĩ đã kê đơn thuốc.", en: "The doctor prescribed medicine.", zh: "医生开了处方药。" }, category: "医療" },
    { word: "投薬", reading: "とうやく", meaning: "薬を患者に与えること", translation: { vi: "dùng thuốc / cho uống thuốc", en: "medication administration / drug administration", zh: "投药" }, example: "投薬のタイミングを守ります。", exampleReading: "とうやくの タイミングを まもります。", exampleTranslation: { vi: "Tôi tuân thủ thời gian dùng thuốc.", en: "I will follow the medication timing.", zh: "我遵守投药时间。" }, category: "医療" },
    { word: "副作用", reading: "ふくさよう", meaning: "薬の不要な効果・悪影響", translation: { vi: "tác dụng phụ", en: "side effect", zh: "副作用" }, example: "この薬には副作用がありますか？", exampleReading: "この くすりには ふくさようが ありますか？", exampleTranslation: { vi: "Thuốc này có tác dụng phụ không?", en: "Does this medicine have side effects?", zh: "这个药有副作用吗？" }, category: "医療" },
    { word: "アレルギー", reading: "アレルギー", meaning: "特定のものに対する過敏反応", translation: { vi: "dị ứng", en: "allergy", zh: "过敏" }, example: "卵アレルギーがあります。", exampleReading: "たまごアレルギーが あります。", exampleTranslation: { vi: "Tôi bị dị ứng trứng.", en: "I have an egg allergy.", zh: "我有鸡蛋过敏。" }, category: "健康" },
    { word: "検査", reading: "けんさ", meaning: "状態を調べること", translation: { vi: "kiểm tra / xét nghiệm", en: "examination / test / check-up", zh: "检查" }, example: "血液検査の結果が出ました。", exampleReading: "けつえきけんさの けっかが でました。", exampleTranslation: { vi: "Kết quả xét nghiệm máu đã có.", en: "The blood test results are out.", zh: "血液检查结果出来了。" }, category: "医療" },
    { word: "手術", reading: "しゅじゅつ", meaning: "体を切って治療する医療行為", translation: { vi: "phẫu thuật", en: "surgery / operation", zh: "手术" }, example: "来週手術を受けます。", exampleReading: "らいしゅう しゅじゅつを うけます。", exampleTranslation: { vi: "Tuần tới tôi sẽ phẫu thuật.", en: "I will have surgery next week.", zh: "下周我要做手术。" }, category: "医療" },
    { word: "回復", reading: "かいふく", meaning: "病気やケガから良くなること", translation: { vi: "hồi phục", en: "recovery", zh: "康复" }, example: "回復が順調に進んでいます。", exampleReading: "かいふくが じゅんちょうに すすんでいます。", exampleTranslation: { vi: "Quá trình hồi phục đang tiến triển tốt.", en: "Recovery is progressing smoothly.", zh: "康复进展顺利。" }, category: "健康" },
    { word: "慢性", reading: "まんせい", meaning: "長期間続く病気・症状", translation: { vi: "mãn tính", en: "chronic", zh: "慢性" }, example: "慢性疾患の管理が必要です。", exampleReading: "まんせいしっかんの かんりが ひつようです。", exampleTranslation: { vi: "Cần quản lý bệnh mãn tính.", en: "Management of chronic disease is necessary.", zh: "需要管理慢性疾病。" }, category: "医療" },
    { word: "急性", reading: "きゅうせい", meaning: "急に起こる・短期間の病気・症状", translation: { vi: "cấp tính", en: "acute", zh: "急性" }, example: "急性症状のため救急を呼びました。", exampleReading: "きゅうせいしょうじょうのため きゅうきゅうを よびました。", exampleTranslation: { vi: "Do triệu chứng cấp tính, tôi đã gọi cấp cứu.", en: "I called emergency services due to acute symptoms.", zh: "因急性症状，我叫了救护车。" }, category: "医療" },
    { word: "安静", reading: "あんせい", meaning: "体を動かさず休むこと", translation: { vi: "nghỉ ngơi / nằm yên", en: "rest / bed rest", zh: "安静/静养" }, example: "しばらく安静にしてください。", exampleReading: "しばらく あんせいに してください。", exampleTranslation: { vi: "Vui lòng nghỉ ngơi một lúc.", en: "Please rest for a while.", zh: "请静养一段时间。" }, category: "ケア" },
    { word: "通院", reading: "つういん", meaning: "定期的に病院へ行くこと", translation: { vi: "khám ngoại trú / đến bệnh viện định kỳ", en: "outpatient visit / hospital visit", zh: "门诊 / 就诊" }, example: "週に一度通院しています。", exampleReading: "しゅうに いちど つういんしています。", exampleTranslation: { vi: "Tôi đến bệnh viện mỗi tuần một lần.", en: "I visit the hospital once a week.", zh: "我每周就诊一次。" }, category: "医療" },
    { word: "退院", reading: "たいいん", meaning: "入院を終えて病院から帰ること", translation: { vi: "xuất viện", en: "hospital discharge", zh: "出院" }, example: "明日退院できる予定です。", exampleReading: "あした たいいんできる よていです。", exampleTranslation: { vi: "Dự kiến ngày mai tôi sẽ xuất viện.", en: "I am scheduled to be discharged tomorrow.", zh: "预计明天可以出院。" }, category: "医療" },
  ],

  // N4 第3課: 感情・態度・人間関係 (15語)
  "lesson-vocab-n4-03": [
    { word: "不安", reading: "ふあん", meaning: "心配で落ち着かない気持ち", translation: { vi: "lo lắng / bất an", en: "anxiety / unease", zh: "不安" }, example: "利用者が不安そうにしています。", exampleReading: "りようしゃが ふあんそうに しています。", exampleTranslation: { vi: "Người dùng dịch vụ có vẻ lo lắng.", en: "The resident seems anxious.", zh: "利用者看起来很不安。" }, category: "感情" },
    { word: "安心", reading: "あんしん", meaning: "心配がなく落ち着いている状態", translation: { vi: "an tâm / yên tâm", en: "reassurance / relief / peace of mind", zh: "放心 / 安心" }, example: "「大丈夫ですよ」と言って安心させます。", exampleReading: "「だいじょうぶですよ」と いって あんしんさせます。", exampleTranslation: { vi: "Tôi nói 'Không sao đâu' để họ yên tâm.", en: "I say 'It's okay' to reassure them.", zh: "我说'没关系'让他们放心。" }, category: "感情" },
    { word: "信頼", reading: "しんらい", meaning: "信じて頼ること", translation: { vi: "tin tưởng", en: "trust / confidence", zh: "信任" }, example: "利用者から信頼される介護士になりたいです。", exampleReading: "りようしゃから しんらいされる かいごしに なりたいです。", exampleTranslation: { vi: "Tôi muốn trở thành nhân viên chăm sóc được tin tưởng.", en: "I want to be a caregiver trusted by residents.", zh: "我想成为被利用者信任的护理员。" }, category: "人間関係" },
    { word: "尊重", reading: "そんちょう", meaning: "大切にすること・敬うこと", translation: { vi: "tôn trọng", en: "respect / regard", zh: "尊重" }, example: "利用者の意思を尊重します。", exampleReading: "りようしゃの いしを そんちょうします。", exampleTranslation: { vi: "Tôi tôn trọng ý muốn của người dùng dịch vụ.", en: "I respect the wishes of the resident.", zh: "我尊重利用者的意愿。" }, category: "態度" },
    { word: "協力", reading: "きょうりょく", meaning: "一緒に力を合わせること", translation: { vi: "hợp tác", en: "cooperation / collaboration", zh: "合作" }, example: "チームで協力してケアします。", exampleReading: "チームで きょうりょくして ケアします。", exampleTranslation: { vi: "Chúng tôi chăm sóc bằng sự hợp tác của nhóm.", en: "We provide care through team cooperation.", zh: "我们团队合作提供护理。" }, category: "人間関係" },
    { word: "感謝", reading: "かんしゃ", meaning: "ありがたいと思う気持ち", translation: { vi: "cảm ơn / biết ơn", en: "gratitude / appreciation", zh: "感谢" }, category: "感情", example: "利用者から感謝されてうれしいです。", exampleReading: "りようしゃから かんしゃされて うれしいです。", exampleTranslation: { vi: "Tôi vui khi được người dùng dịch vụ cảm ơn.", en: "I am happy to be thanked by residents.", zh: "被利用者感谢让我很高兴。" } },
    { word: "謝罪", reading: "しゃざい", meaning: "申し訳なかったと詫びること", translation: { vi: "xin lỗi / tạ lỗi", en: "apology", zh: "道歉" }, example: "失礼があり謝罪します。", exampleReading: "しつれいが あり しゃざいします。", exampleTranslation: { vi: "Tôi xin lỗi vì đã thất lễ.", en: "I apologize for the inconvenience.", zh: "我为失礼道歉。" }, category: "態度" },
    { word: "我慢", reading: "がまん", meaning: "つらいことを耐えること", translation: { vi: "chịu đựng / kiên nhẫn", en: "endurance / patience / tolerate", zh: "忍耐" }, example: "痛みを我慢しないでください。", exampleReading: "いたみを がまんしないでください。", exampleTranslation: { vi: "Đừng cố chịu đựng cơn đau.", en: "Please don't endure the pain.", zh: "请不要忍耐疼痛。" }, category: "感情" },
    { word: "遠慮", reading: "えんりょ", meaning: "遠慮して控えること", translation: { vi: "ngại ngùng / e ngại", en: "hesitation / reserve / holding back", zh: "客气 / 顾虑" }, example: "遠慮なく声をかけてください。", exampleReading: "えんりょなく こえをかけてください。", exampleTranslation: { vi: "Đừng ngại, cứ gọi tôi nhé.", en: "Please feel free to call on me.", zh: "请不要客气，随时叫我。" }, category: "態度" },
    { word: "丁寧", reading: "ていねい", meaning: "礼儀正しく注意深くすること", translation: { vi: "tỉ mỉ / lịch sự / cẩn thận", en: "polite / careful / thorough", zh: "礼貌/仔细" }, example: "丁寧なケアを心がけています。", exampleReading: "ていねいな ケアを こころがけています。", exampleTranslation: { vi: "Tôi luôn cố gắng chăm sóc cẩn thận.", en: "I always strive to provide careful care.", zh: "我努力提供细心的护理。" }, category: "態度" },
    { word: "積極的", reading: "せっきょくてき", meaning: "前向きに進んで行動すること", translation: { vi: "tích cực / chủ động", en: "proactive / positive / active", zh: "积极" }, example: "積極的にコミュニケーションを取ります。", exampleReading: "せっきょくてきに コミュニケーションを とります。", exampleTranslation: { vi: "Tôi tích cực giao tiếp.", en: "I proactively communicate.", zh: "我积极地沟通。" }, category: "態度" },
    { word: "消極的", reading: "しょうきょくてき", meaning: "消えがちで控えめな態度", translation: { vi: "tiêu cực / thụ động", en: "passive / negative / reserved", zh: "消极" }, example: "消極的にならないで、相談しましょう。", exampleReading: "しょうきょくてきに ならないで、そうだんしましょう。", exampleTranslation: { vi: "Đừng tiêu cực, hãy thảo luận nhé.", en: "Don't be passive, let's consult.", zh: "不要消极，来商量吧。" }, category: "態度" },
    { word: "穏やか", reading: "おだやか", meaning: "落ち着いて優しい様子", translation: { vi: "hiền lành / điềm tĩnh", en: "calm / gentle / serene", zh: "温和 / 平静" }, example: "穏やかな話し方が大切です。", exampleReading: "おだやかな はなしかたが たいせつです。", exampleTranslation: { vi: "Cách nói chuyện điềm tĩnh rất quan trọng.", en: "A calm way of speaking is important.", zh: "温和的说话方式很重要。" }, category: "態度" },
    { word: "不満", reading: "ふまん", meaning: "満足できない気持ち", translation: { vi: "không hài lòng / bất mãn", en: "dissatisfaction / discontent", zh: "不满" }, category: "感情", example: "利用者の不満を聞いて対応します。", exampleReading: "りようしゃの ふまんを きいて たいおうします。", exampleTranslation: { vi: "Tôi lắng nghe sự không hài lòng của người dùng và xử lý.", en: "I listen to resident complaints and respond.", zh: "我听取利用者的不满并处理。" } },
    { word: "満足", reading: "まんぞく", meaning: "十分に良いと感じる気持ち", translation: { vi: "hài lòng / thỏa mãn", en: "satisfaction / contentment", zh: "满足" }, example: "利用者に満足してもらえるケアをします。", exampleReading: "りようしゃに まんぞくしてもらえる ケアを します。", exampleTranslation: { vi: "Tôi cung cấp dịch vụ chăm sóc khiến người dùng hài lòng.", en: "I provide care that satisfies residents.", zh: "我提供让利用者满意的护理。" }, category: "感情" },
  ],

  // N4 第4課: 職場・施設・社会生活 (15語)
  "lesson-vocab-n4-04": [
    { word: "業務", reading: "ぎょうむ", meaning: "仕事の内容・やること", translation: { vi: "công việc / nhiệm vụ", en: "work / duties / task", zh: "业务 / 工作" }, example: "今日の業務内容を確認します。", exampleReading: "きょうの ぎょうむないようを かくにんします。", exampleTranslation: { vi: "Tôi xác nhận nội dung công việc hôm nay.", en: "I will confirm today's work duties.", zh: "我确认今天的工作内容。" }, category: "職場" },
    { word: "勤務", reading: "きんむ", meaning: "職場で働くこと・シフト", translation: { vi: "làm việc / ca làm việc", en: "work / duty / shift", zh: "上班 / 勤务" }, example: "今月の勤務表を確認しました。", exampleReading: "こんげつの きんむひょうを かくにんしました。", exampleTranslation: { vi: "Tôi đã xác nhận lịch làm việc tháng này.", en: "I confirmed this month's work schedule.", zh: "我确认了本月的排班表。" }, category: "職場" },
    { word: "残業", reading: "ざんぎょう", meaning: "定時以降も働くこと", translation: { vi: "làm thêm giờ", en: "overtime work", zh: "加班" }, example: "今日は残業になりました。", exampleReading: "きょうは ざんぎょうに なりました。", exampleTranslation: { vi: "Hôm nay tôi phải làm thêm giờ.", en: "I had to work overtime today.", zh: "今天我加班了。" }, category: "職場" },
    { word: "有給", reading: "ゆうきゅう", meaning: "給料をもらいながら休む休暇", translation: { vi: "nghỉ phép có lương", en: "paid leave / paid vacation", zh: "有薪假" }, example: "有給を取って休みます。", exampleReading: "ゆうきゅうを とって やすみます。", exampleTranslation: { vi: "Tôi lấy nghỉ phép có lương.", en: "I will take a paid day off.", zh: "我请有薪假休息。" }, category: "職場" },
    { word: "研修", reading: "けんしゅう", meaning: "仕事を学ぶための訓練・勉強", translation: { vi: "đào tạo / tập huấn", en: "training / workshop", zh: "培训" }, example: "新しい研修に参加します。", exampleReading: "あたらしい けんしゅうに さんかします。", exampleTranslation: { vi: "Tôi tham gia đào tạo mới.", en: "I will participate in new training.", zh: "我参加新的培训。" }, category: "職場" },
    { word: "評価", reading: "ひょうか", meaning: "仕事の良し悪しを判断すること", translation: { vi: "đánh giá", en: "evaluation / assessment", zh: "评价 / 评估" }, example: "年に2回評価があります。", exampleReading: "ねんに 2かい ひょうかが あります。", exampleTranslation: { vi: "Có đánh giá 2 lần mỗi năm.", en: "There is an evaluation twice a year.", zh: "每年有2次评价。" }, category: "職場" },
    { word: "目標", reading: "もくひょう", meaning: "達成したい目的", translation: { vi: "mục tiêu", en: "goal / target / objective", zh: "目标" }, example: "今年の目標を設定しました。", exampleReading: "ことしの もくひょうを せっていしました。", exampleTranslation: { vi: "Tôi đã đặt mục tiêu cho năm nay.", en: "I set goals for this year.", zh: "我设定了今年的目标。" }, category: "職場" },
    { word: "改善", reading: "かいぜん", meaning: "より良くすること", translation: { vi: "cải thiện / cải tiến", en: "improvement / kaizen", zh: "改善" }, example: "ケアの質を改善します。", exampleReading: "ケアの しつを かいぜんします。", exampleTranslation: { vi: "Tôi cải thiện chất lượng chăm sóc.", en: "I will improve the quality of care.", zh: "我改善护理质量。" }, category: "職場" },
    { word: "問題", reading: "もんだい", meaning: "解決が必要なこと・困りごと", translation: { vi: "vấn đề", en: "problem / issue", zh: "问题" }, example: "問題があればすぐに報告してください。", exampleReading: "もんだいが あれば すぐに ほうこくしてください。", exampleTranslation: { vi: "Nếu có vấn đề, vui lòng báo cáo ngay.", en: "If there is a problem, please report it immediately.", zh: "如有问题，请立即报告。" }, category: "職場" },
    { word: "解決", reading: "かいけつ", meaning: "問題をなくすこと・答えを出すこと", translation: { vi: "giải quyết", en: "resolution / solution", zh: "解决" }, example: "問題を協力して解決します。", exampleReading: "もんだいを きょうりょくして かいけつします。", exampleTranslation: { vi: "Chúng tôi hợp tác giải quyết vấn đề.", en: "We will solve the problem through cooperation.", zh: "我们合作解决问题。" }, category: "職場" },
    { word: "申請", reading: "しんせい", meaning: "公式に申し込むこと", translation: { vi: "đăng ký / nộp đơn xin", en: "application / request", zh: "申请" }, category: "社会生活", example: "介護保険の申請をします。", exampleReading: "かいごほけんの しんせいを します。", exampleTranslation: { vi: "Tôi đăng ký bảo hiểm chăm sóc.", en: "I will apply for long-term care insurance.", zh: "我申请护理保险。" } },
    { word: "休憩", reading: "きゅうけい", meaning: "仕事の間に休むこと", translation: { vi: "nghỉ giải lao", en: "break / rest", zh: "休息" }, example: "12時から1時間休憩です。", exampleReading: "12じから 1じかん きゅうけいです。", exampleTranslation: { vi: "Từ 12 giờ nghỉ giải lao 1 tiếng.", en: "There is a 1-hour break from 12 o'clock.", zh: "从12点开始休息1小时。" }, category: "職場" },
    { word: "勤怠", reading: "きんたい", meaning: "出勤・欠勤・遅刻などの管理", translation: { vi: "quản lý chấm công / điểm danh", en: "attendance / time management", zh: "考勤" }, example: "勤怠管理システムを使います。", exampleReading: "きんたいかんりシステムを つかいます。", exampleTranslation: { vi: "Tôi sử dụng hệ thống quản lý chấm công.", en: "I use an attendance management system.", zh: "我使用考勤管理系统。" }, category: "職場" },
    { word: "会議", reading: "かいぎ", meaning: "複数人で話し合うこと", translation: { vi: "cuộc họp", en: "meeting / conference", zh: "会议" }, example: "毎週月曜日にチーム会議があります。", exampleReading: "まいしゅう げつようびに チームかいぎが あります。", exampleTranslation: { vi: "Mỗi thứ Hai hàng tuần có cuộc họp nhóm.", en: "There is a team meeting every Monday.", zh: "每周一有团队会议。" }, category: "職場" },
    { word: "役割", reading: "やくわり", meaning: "自分が担当する仕事・役目", translation: { vi: "vai trò", en: "role / responsibility", zh: "角色 / 职责" }, example: "チームでの自分の役割を理解します。", exampleReading: "チームでの じぶんの やくわりを りかいします。", exampleTranslation: { vi: "Tôi hiểu vai trò của mình trong nhóm.", en: "I understand my role in the team.", zh: "我理解自己在团队中的角色。" }, category: "職場" },
  ],

  // ============================================================
  // JLPT N3 コース 語彙データ
  // ============================================================

  // N3 第1課: ビジネス・職場表現 (15語)
  "lesson-vocab-n3-01": [
    { word: "企業", reading: "きぎょう", meaning: "会社・ビジネスの組織", translation: { vi: "doanh nghiệp / công ty", en: "company / enterprise", zh: "企业" }, example: "介護企業に就職しました。", exampleReading: "かいごきぎょうに しゅうしょくしました。", exampleTranslation: { vi: "Tôi đã vào làm tại doanh nghiệp chăm sóc.", en: "I joined a care company.", zh: "我就职于护理企业。" }, category: "ビジネス" },
    { word: "組織", reading: "そしき", meaning: "会社・団体の構成・仕組み", translation: { vi: "tổ chức", en: "organization / structure", zh: "组织" }, example: "組織の一員として働きます。", exampleReading: "そしきの いちいんとして はたらきます。", exampleTranslation: { vi: "Tôi làm việc như một thành viên của tổ chức.", en: "I work as a member of the organization.", zh: "我作为组织的一员工作。" }, category: "ビジネス" },
    { word: "方針", reading: "ほうしん", meaning: "基本的な考え方・進む方向", translation: { vi: "phương châm / chính sách", en: "policy / direction / guideline", zh: "方针" }, category: "ビジネス", example: "施設の介護方針に従います。", exampleReading: "しせつの かいごほうしんに したがいます。", exampleTranslation: { vi: "Tôi tuân theo phương châm chăm sóc của cơ sở.", en: "I follow the facility's care policy.", zh: "我遵循设施的护理方针。" } },
    { word: "業績", reading: "ぎょうせき", meaning: "仕事の成果・結果", translation: { vi: "thành tích / kết quả công việc", en: "performance / achievement / results", zh: "业绩" }, example: "業績を評価されました。", exampleReading: "ぎょうせきを ひょうかされました。", exampleTranslation: { vi: "Thành tích của tôi được đánh giá.", en: "My performance was evaluated.", zh: "我的业绩受到了评价。" }, category: "ビジネス" },
    { word: "効率", reading: "こうりつ", meaning: "少ない労力で多くの成果を出すこと", translation: { vi: "hiệu quả", en: "efficiency", zh: "效率" }, example: "業務の効率を上げましょう。", exampleReading: "ぎょうむの こうりつを あげましょう。", exampleTranslation: { vi: "Hãy nâng cao hiệu quả công việc.", en: "Let's improve work efficiency.", zh: "让我们提高工作效率。" }, category: "ビジネス" },
    { word: "改革", reading: "かいかく", meaning: "より良くするための大きな変化", translation: { vi: "cải cách", en: "reform / restructuring", zh: "改革" }, example: "介護業界の改革が進んでいます。", exampleReading: "かいごぎょうかいの かいかくが すすんでいます。", exampleTranslation: { vi: "Cải cách trong ngành chăm sóc đang tiến triển.", en: "Reform in the care industry is progressing.", zh: "护理行业的改革正在推进。" }, category: "ビジネス" },
    { word: "契約", reading: "けいやく", meaning: "約束を文書で結ぶこと", translation: { vi: "hợp đồng", en: "contract / agreement", zh: "合同" }, example: "雇用契約書に署名します。", exampleReading: "こようけいやくしょに しょめいします。", exampleTranslation: { vi: "Tôi ký hợp đồng lao động.", en: "I will sign the employment contract.", zh: "我签署雇用合同。" }, category: "ビジネス" },
    { word: "承認", reading: "しょうにん", meaning: "公式に認めること", translation: { vi: "chấp thuận / phê duyệt", en: "approval / authorization", zh: "批准 / 认可" }, example: "上司の承認を得てから進めます。", exampleReading: "じょうしの しょうにんを えてから すすめます。", exampleTranslation: { vi: "Tôi tiến hành sau khi được cấp trên phê duyệt.", en: "I will proceed after getting supervisor approval.", zh: "得到上司批准后再推进。" }, category: "ビジネス" },
    { word: "却下", reading: "きゃっか", meaning: "申請・提案が認められないこと", translation: { vi: "từ chối / bác bỏ", en: "rejection / dismissal", zh: "驳回 / 否决" }, example: "申請が却下されました。", exampleReading: "しんせいが きゃっかされました。", exampleTranslation: { vi: "Đơn đăng ký bị từ chối.", en: "The application was rejected.", zh: "申请被驳回了。" }, category: "ビジネス" },
    { word: "責任者", reading: "せきにんしゃ", meaning: "責任を持っている人・管理者", translation: { vi: "người chịu trách nhiệm / người phụ trách", en: "person in charge / manager / supervisor", zh: "负责人" }, example: "責任者に確認してください。", exampleReading: "せきにんしゃに かくにんしてください。", exampleTranslation: { vi: "Vui lòng xác nhận với người phụ trách.", en: "Please confirm with the person in charge.", zh: "请向负责人确认。" }, category: "職場" },
    { word: "代表", reading: "だいひょう", meaning: "グループを代わりに表す人・理事長", translation: { vi: "đại diện", en: "representative / director", zh: "代表" }, example: "施設長は法人の代表です。", exampleReading: "しせつちょうは ほうじんの だいひょうです。", exampleTranslation: { vi: "Giám đốc cơ sở là đại diện của pháp nhân.", en: "The facility director is the representative of the corporation.", zh: "设施长是法人的代表。" }, category: "職場" },
    { word: "交渉", reading: "こうしょう", meaning: "相手と話し合って条件を決めること", translation: { vi: "đàm phán / thương lượng", en: "negotiation / bargaining", zh: "谈判 / 交涉" }, example: "給与について交渉しました。", exampleReading: "きゅうよに ついて こうしょうしました。", exampleTranslation: { vi: "Tôi đã thương lượng về tiền lương.", en: "I negotiated about the salary.", zh: "我就薪资进行了谈判。" }, category: "ビジネス" },
    { word: "提携", reading: "ていけい", meaning: "協力関係を結ぶこと", translation: { vi: "hợp tác / liên kết", en: "partnership / alliance / tie-up", zh: "合作 / 联盟" }, example: "病院と提携してケアを提供します。", exampleReading: "びょういんと ていけいして ケアを ていきょうします。", exampleTranslation: { vi: "Chúng tôi cung cấp dịch vụ chăm sóc thông qua hợp tác với bệnh viện.", en: "We provide care through a hospital partnership.", zh: "我们与医院合作提供护理。" }, category: "ビジネス" },
    { word: "担当者", reading: "たんとうしゃ", meaning: "ある業務を担当している人", translation: { vi: "người phụ trách", en: "person in charge / contact person", zh: "负责人" }, example: "担当者に連絡してください。", exampleReading: "たんとうしゃに れんらくしてください。", exampleTranslation: { vi: "Vui lòng liên hệ người phụ trách.", en: "Please contact the person in charge.", zh: "请联系负责人。" }, category: "職場" },
    { word: "経営", reading: "けいえい", meaning: "会社・施設を運営すること", translation: { vi: "kinh doanh / quản lý", en: "management / business operation", zh: "经营" }, example: "施設の経営方針を学びます。", exampleReading: "しせつの けいえいほうしんを まなびます。", exampleTranslation: { vi: "Tôi học phương châm kinh doanh của cơ sở.", en: "I will learn the facility's management policy.", zh: "我学习设施的经营方针。" }, category: "ビジネス" },
  ],

  // N3 第2課: 社会・制度・法律 (15語)
  "lesson-vocab-n3-02": [
    { word: "政策", reading: "せいさく", meaning: "政府が決めた方針・計画", translation: { vi: "chính sách", en: "policy / measure", zh: "政策" }, example: "介護政策が変わりました。", exampleReading: "かいごせいさくが かわりました。", exampleTranslation: { vi: "Chính sách chăm sóc đã thay đổi.", en: "The care policy has changed.", zh: "护理政策改变了。" }, category: "社会" },
    { word: "義務", reading: "ぎむ", meaning: "しなければならないこと", translation: { vi: "nghĩa vụ", en: "obligation / duty", zh: "义务" }, example: "守秘義務を守ります。", exampleReading: "しゅひぎむを まもります。", exampleTranslation: { vi: "Tôi tuân thủ nghĩa vụ bảo mật.", en: "I comply with the duty of confidentiality.", zh: "我遵守保密义务。" }, category: "法律" },
    { word: "権利", reading: "けんり", meaning: "正当にできること・もつべきもの", translation: { vi: "quyền lợi", en: "right / entitlement", zh: "权利" }, example: "利用者の権利を守ります。", exampleReading: "りようしゃの けんりを まもります。", exampleTranslation: { vi: "Tôi bảo vệ quyền lợi của người dùng.", en: "I protect the rights of residents.", zh: "我保护利用者的权利。" }, category: "法律" },
    { word: "福祉", reading: "ふくし", meaning: "幸福な生活を支える取り組み", translation: { vi: "phúc lợi", en: "welfare / well-being", zh: "福利" }, example: "社会福祉の仕事をしています。", exampleReading: "しゃかいふくしの しごとを しています。", exampleTranslation: { vi: "Tôi làm công việc phúc lợi xã hội.", en: "I work in social welfare.", zh: "我从事社会福利工作。" }, category: "社会" },
    { word: "補助", reading: "ほじょ", meaning: "助けること・お金の援助", translation: { vi: "trợ cấp / hỗ trợ", en: "subsidy / assistance / support", zh: "补助" }, example: "介護用品に補助が出ます。", exampleReading: "かいごようひんに ほじょが でます。", exampleTranslation: { vi: "Có trợ cấp cho dụng cụ chăm sóc.", en: "There is a subsidy for care products.", zh: "护理用品有补助。" }, category: "社会" },
    { word: "認定", reading: "にんてい", meaning: "正式に認めること（介護度など）", translation: { vi: "công nhận / chứng nhận", en: "certification / recognition / authorization", zh: "认定" }, example: "要介護認定を受けました。", exampleReading: "ようかいごにんていを うけました。", exampleTranslation: { vi: "Tôi đã được công nhận mức độ cần chăm sóc.", en: "I received the long-term care certification.", zh: "我获得了需要护理认定。" }, category: "制度" },
    { word: "基準", reading: "きじゅん", meaning: "判断の目安・標準", translation: { vi: "tiêu chuẩn", en: "standard / criterion", zh: "标准 / 基准" }, example: "介護の基準を守ります。", exampleReading: "かいごの きじゅんを まもります。", exampleTranslation: { vi: "Tôi tuân theo tiêu chuẩn chăm sóc.", en: "I adhere to care standards.", zh: "我遵守护理标准。" }, category: "制度" },
    { word: "対象", reading: "たいしょう", meaning: "目標や行動が向けられる人・もの", translation: { vi: "đối tượng", en: "target / subject / eligible person", zh: "对象" }, example: "65歳以上が介護保険の対象です。", exampleReading: "65さいいじょうが かいごほけんの たいしょうです。", exampleTranslation: { vi: "Người từ 65 tuổi trở lên là đối tượng của bảo hiểm chăm sóc.", en: "People 65 and over are eligible for long-term care insurance.", zh: "65岁以上是护理保险的对象。" }, category: "制度" },
    { word: "条件", reading: "じょうけん", meaning: "何かをするために必要なこと", translation: { vi: "điều kiện", en: "condition / requirement", zh: "条件" }, example: "特定技能の条件を確認します。", exampleReading: "とくていぎのうの じょうけんを かくにんします。", exampleTranslation: { vi: "Tôi xác nhận điều kiện kỹ năng đặc định.", en: "I will confirm the requirements for Specified Skilled Worker.", zh: "我确认特定技能的条件。" }, category: "制度" },
    { word: "期限", reading: "きげん", meaning: "決められた時間の終わり", translation: { vi: "thời hạn", en: "deadline / expiration / limit", zh: "期限" }, category: "制度", example: "ビザの期限を確認してください。", exampleReading: "ビザの きげんを かくにんしてください。", exampleTranslation: { vi: "Vui lòng kiểm tra thời hạn visa.", en: "Please check the visa expiration date.", zh: "请确认签证期限。" } },
    { word: "更新", reading: "こうしん", meaning: "新しくやり直すこと・延長すること", translation: { vi: "gia hạn / đổi mới", en: "renewal / update", zh: "更新 / 续签" }, example: "在留資格の更新手続きをします。", exampleReading: "ざいりゅうしかくの こうしんてつづきを します。", exampleTranslation: { vi: "Tôi thực hiện thủ tục gia hạn tư cách lưu trú.", en: "I will complete the renewal procedure for residence status.", zh: "我办理在留资格更新手续。" }, category: "制度" },
    { word: "申請", reading: "しんせい", meaning: "公式に申し込むこと", translation: { vi: "đăng ký / nộp đơn", en: "application / request", zh: "申请" }, example: "介護保険の申請をします。", exampleReading: "かいごほけんの しんせいを します。", exampleTranslation: { vi: "Tôi nộp đơn xin bảo hiểm chăm sóc.", en: "I will apply for long-term care insurance.", zh: "我申请护理保险。" }, category: "社会" },
    { word: "保護", reading: "ほご", meaning: "守ること・危険から防ぐこと", translation: { vi: "bảo vệ / bảo hộ", en: "protection", zh: "保护" }, example: "個人情報保護を徹底します。", exampleReading: "こじんじょうほうほごを てっていします。", exampleTranslation: { vi: "Tôi thực hiện đầy đủ bảo vệ thông tin cá nhân.", en: "I thoroughly implement personal information protection.", zh: "我彻底执行个人信息保护。" }, category: "法律" },
    { word: "規則", reading: "きそく", meaning: "守るべき決まりごと", translation: { vi: "quy tắc / nội quy", en: "rule / regulation", zh: "规则" }, example: "職場の規則を守ります。", exampleReading: "しょくばの きそくを まもります。", exampleTranslation: { vi: "Tôi tuân thủ nội quy nơi làm việc.", en: "I follow workplace rules.", zh: "我遵守职场规则。" }, category: "社会" },
    { word: "支援", reading: "しえん", meaning: "助けること・サポートすること", translation: { vi: "hỗ trợ / giúp đỡ", en: "support / assistance / aid", zh: "支援 / 帮助" }, example: "自立支援のケアを提供します。", exampleReading: "じりつしえんの ケアを ていきょうします。", exampleTranslation: { vi: "Tôi cung cấp dịch vụ chăm sóc hỗ trợ tự lập.", en: "I provide independence support care.", zh: "我提供自立支援护理。" }, category: "社会" },
  ],

  // N3 第3課: 感情・心理・コミュニケーション (15語)
  "lesson-vocab-n3-03": [
    { word: "葛藤", reading: "かっとう", meaning: "心の中で二つの気持ちが争うこと", translation: { vi: "mâu thuẫn nội tâm / day dứt", en: "conflict / inner struggle", zh: "内心冲突 / 纠结" }, example: "仕事とプライベートの葛藤があります。", exampleReading: "しごとと プライベートの かっとうが あります。", exampleTranslation: { vi: "Tôi có mâu thuẫn giữa công việc và cuộc sống riêng.", en: "I have a conflict between work and personal life.", zh: "我在工作和私生活之间感到纠结。" }, category: "心理" },
    { word: "共感", reading: "きょうかん", meaning: "相手の気持ちを理解し共に感じること", translation: { vi: "đồng cảm / thấu cảm", en: "empathy / sympathy", zh: "共情 / 共鸣" }, example: "利用者に共感する姿勢が大切です。", exampleReading: "りようしゃに きょうかんする しせいが たいせつです。", exampleTranslation: { vi: "Thái độ đồng cảm với người dùng dịch vụ rất quan trọng.", en: "An empathetic attitude toward residents is important.", zh: "对利用者共情的态度很重要。" }, category: "コミュニケーション" },
    { word: "配慮", reading: "はいりょ", meaning: "相手のことを考えて行動すること", translation: { vi: "quan tâm / chú ý đến", en: "consideration / thoughtfulness", zh: "关怀 / 体贴" }, example: "高齢者への配慮が必要です。", exampleReading: "こうれいしゃへの はいりょが ひつようです。", exampleTranslation: { vi: "Cần quan tâm đến người cao tuổi.", en: "Consideration for elderly people is necessary.", zh: "需要对老年人的关怀。" }, category: "態度" },
    { word: "受容", reading: "じゅよう", meaning: "相手をありのままに受け入れること", translation: { vi: "chấp nhận / đón nhận", en: "acceptance / receptiveness", zh: "接受" }, example: "利用者の気持ちを受容します。", exampleReading: "りようしゃの きもちを じゅようします。", exampleTranslation: { vi: "Tôi chấp nhận cảm xúc của người dùng dịch vụ.", en: "I accept the feelings of residents.", zh: "我接受利用者的情感。" }, category: "コミュニケーション" },
    { word: "察する", reading: "さっする", meaning: "言葉なしに相手の気持ちを理解すること", translation: { vi: "đoán / hiểu ý (không cần nói)", en: "to sense / to read between the lines", zh: "体察 / 察觉" }, example: "利用者の様子から気持ちを察します。", exampleReading: "りようしゃの ようすから きもちを さっします。", exampleTranslation: { vi: "Tôi đoán cảm xúc từ cách cư xử của người dùng.", en: "I sense feelings from the resident's behavior.", zh: "我从利用者的状态察觉其情感。" }, category: "コミュニケーション" },
    { word: "拒絶", reading: "きょぜつ", meaning: "断ること・受け入れないこと", translation: { vi: "từ chối / phản đối", en: "rejection / refusal", zh: "拒绝" }, example: "ケアへの拒絶がある場合は無理に行いません。", exampleReading: "ケアへの きょぜつが ある ばあいは むりに おこないません。", exampleTranslation: { vi: "Khi có từ chối về chăm sóc, tôi không ép buộc.", en: "When there is resistance to care, I do not force it.", zh: "当有拒绝护理时，我不强迫。" }, category: "心理" },
    { word: "主張", reading: "しゅちょう", meaning: "自分の意見を強く言うこと", translation: { vi: "khẳng định / lên tiếng", en: "assertion / claim / argument", zh: "主张 / 坚持" }, example: "利用者が自分の意見を主張しました。", exampleReading: "りようしゃが じぶんの いけんを しゅちょうしました。", exampleTranslation: { vi: "Người dùng dịch vụ đã lên tiếng về ý kiến của mình.", en: "The resident asserted their opinion.", zh: "利用者主张了自己的意见。" }, category: "コミュニケーション" },
    { word: "妥協", reading: "だきょう", meaning: "お互いに譲り合って折り合いをつけること", translation: { vi: "thỏa hiệp / nhượng bộ", en: "compromise", zh: "妥协" }, example: "お互いが妥協して解決しました。", exampleReading: "おたがいが だきょうして かいけつしました。", exampleTranslation: { vi: "Chúng tôi thỏa hiệp và giải quyết.", en: "We reached a compromise and resolved it.", zh: "我们相互妥协解决了问题。" }, category: "コミュニケーション" },
    { word: "誤解", reading: "ごかい", meaning: "正しく理解できないこと", translation: { vi: "hiểu nhầm", en: "misunderstanding", zh: "误解" }, example: "誤解を招かないように説明します。", exampleReading: "ごかいを まねかないように せつめいします。", exampleTranslation: { vi: "Tôi giải thích để tránh hiểu nhầm.", en: "I explain to avoid misunderstandings.", zh: "我进行说明以避免误解。" }, category: "コミュニケーション" },
    { word: "反省", reading: "はんせい", meaning: "自分の行動を振り返って考えること", translation: { vi: "phản tỉnh / kiểm điểm", en: "reflection / self-examination", zh: "反省" }, example: "ミスを反省して改善します。", exampleReading: "ミスを はんせいして かいぜんします。", exampleTranslation: { vi: "Tôi phản tỉnh về lỗi lầm và cải thiện.", en: "I reflect on my mistakes and improve.", zh: "我反省错误并改善。" }, category: "心理" },
    { word: "後悔", reading: "こうかい", meaning: "あのとき違えばよかったと思うこと", translation: { vi: "hối hận", en: "regret / remorse", zh: "后悔" }, example: "対応が遅れて後悔しました。", exampleReading: "たいおうが おくれて こうかいしました。", exampleTranslation: { vi: "Tôi hối hận vì đã phản ứng chậm.", en: "I regretted the delayed response.", zh: "我后悔反应迟了。" }, category: "心理" },
    { word: "決意", reading: "けつい", meaning: "強く心に決めること", translation: { vi: "quyết tâm / quyết định", en: "determination / resolve", zh: "决心" }, example: "介護士になる決意を固めました。", exampleReading: "かいごしに なる けついを かためました。", exampleTranslation: { vi: "Tôi đã củng cố quyết tâm trở thành nhân viên chăm sóc.", en: "I have strengthened my resolve to become a caregiver.", zh: "我下定决心成为护理员。" }, category: "心理" },
    { word: "理解", reading: "りかい", meaning: "意味・内容をわかること", translation: { vi: "hiểu / thông hiểu", en: "understanding / comprehension", zh: "理解" }, example: "利用者の状況を理解します。", exampleReading: "りようしゃの じょうきょうを りかいします。", exampleTranslation: { vi: "Tôi hiểu tình trạng của người dùng dịch vụ.", en: "I understand the resident's situation.", zh: "我理解利用者的情况。" }, category: "コミュニケーション" },
    { word: "折衝", reading: "せっしょう", meaning: "意見の違いを話し合いで解決すること", translation: { vi: "thương lượng / dàn xếp", en: "negotiation / mediation", zh: "交涉 / 协商" }, example: "家族と施設の間で折衝します。", exampleReading: "かぞくと しせつの あいだで せっしょうします。", exampleTranslation: { vi: "Tôi dàn xếp giữa gia đình và cơ sở.", en: "I mediate between the family and the facility.", zh: "我在家属和设施之间进行协商。" }, category: "コミュニケーション" },
    { word: "共有", reading: "きょうゆう", meaning: "情報・物などを一緒に持つこと", translation: { vi: "chia sẻ", en: "sharing / sharing information", zh: "共享 / 分享" }, example: "チームで情報を共有します。", exampleReading: "チームで じょうほうを きょうゆうします。", exampleTranslation: { vi: "Chúng tôi chia sẻ thông tin trong nhóm.", en: "We share information as a team.", zh: "我们在团队中共享信息。" }, category: "コミュニケーション" },
  ],

  // N3 第4課: 医療・科学・専門技術 (15語)
  "lesson-vocab-n3-04": [
    { word: "臨床", reading: "りんしょう", meaning: "実際の患者に対して行う医療", translation: { vi: "lâm sàng", en: "clinical / bedside", zh: "临床" }, example: "臨床経験を積んでいます。", exampleReading: "りんしょうけいけんを つんでいます。", exampleTranslation: { vi: "Tôi đang tích lũy kinh nghiệm lâm sàng.", en: "I am gaining clinical experience.", zh: "我在积累临床经验。" }, category: "医療" },
    { word: "予防", reading: "よぼう", meaning: "病気や事故を未然に防ぐこと", translation: { vi: "phòng ngừa", en: "prevention / prophylaxis", zh: "预防" }, example: "褥瘡予防のケアをします。", exampleReading: "じょくそうよぼうの ケアを します。", exampleTranslation: { vi: "Tôi thực hiện chăm sóc phòng ngừa loét tì đè.", en: "I provide care to prevent pressure ulcers.", zh: "我提供预防压疮的护理。" }, category: "医療" },
    { word: "リハビリテーション", reading: "リハビリテーション", meaning: "機能回復のための訓練・療法", translation: { vi: "phục hồi chức năng", en: "rehabilitation", zh: "康复训练" }, example: "リハビリテーションを週3回行います。", exampleReading: "リハビリテーションを しゅう3かい おこないます。", exampleTranslation: { vi: "Thực hiện phục hồi chức năng 3 lần mỗi tuần.", en: "Rehabilitation is done 3 times a week.", zh: "每周进行3次康复训练。" }, category: "医療" },
    { word: "機能訓練", reading: "きのうくんれん", meaning: "身体機能を維持・改善する訓練", translation: { vi: "luyện tập chức năng / phục hồi chức năng", en: "functional training / functional exercise", zh: "功能训练" }, example: "機能訓練で筋力を維持します。", exampleReading: "きのうくんれんで きんりょくを いじします。", exampleTranslation: { vi: "Tôi duy trì sức cơ bằng luyện tập chức năng.", en: "Muscle strength is maintained through functional training.", zh: "通过功能训练维持肌肉力量。" }, category: "医療" },
    { word: "QOL", reading: "クオリティオブライフ", meaning: "生活の質（Quality of Life）", translation: { vi: "chất lượng cuộc sống", en: "quality of life (QOL)", zh: "生活质量" }, example: "QOLの向上が介護の目標です。", exampleReading: "QOLの こうじょうが かいごの もくひょうです。", exampleTranslation: { vi: "Nâng cao chất lượng cuộc sống là mục tiêu chăm sóc.", en: "Improving QOL is the goal of care.", zh: "提高生活质量是护理目标。" }, category: "介護専門" },
    { word: "ICF", reading: "アイシーエフ", meaning: "国際生活機能分類（World Health Organization）", translation: { vi: "Phân loại chức năng quốc tế (ICF)", en: "International Classification of Functioning (ICF)", zh: "国际功能分类（ICF）" }, example: "ICFを基にアセスメントします。", exampleReading: "ICFを もとに アセスメントします。", exampleTranslation: { vi: "Tôi đánh giá dựa trên ICF.", en: "I assess based on ICF.", zh: "我基于ICF进行评估。" }, category: "介護専門" },
    { word: "アセスメント", reading: "アセスメント", meaning: "利用者の状態を評価・分析すること", translation: { vi: "đánh giá / thẩm định", en: "assessment / evaluation", zh: "评估" }, example: "入所時にアセスメントを行います。", exampleReading: "にゅうしょじに アセスメントを おこないます。", exampleTranslation: { vi: "Tôi thực hiện đánh giá khi nhập viện.", en: "An assessment is conducted upon admission.", zh: "入住时进行评估。" }, category: "介護専門" },
    { word: "モニタリング", reading: "モニタリング", meaning: "定期的に状態を観察・確認すること", translation: { vi: "theo dõi / giám sát", en: "monitoring", zh: "监测 / 定期检查" }, example: "月1回ケアのモニタリングをします。", exampleReading: "つき1かい ケアの モニタリングを します。", exampleTranslation: { vi: "Tôi theo dõi dịch vụ chăm sóc mỗi tháng một lần.", en: "Care monitoring is done once a month.", zh: "每月进行一次护理监测。" }, category: "介護専門" },
    { word: "インシデント", reading: "インシデント", meaning: "事故に至らなかったヒヤリハット・事象", translation: { vi: "sự cố (suýt xảy ra tai nạn)", en: "incident / near-miss event", zh: "事故苗头 / 险情" }, example: "インシデントをすぐに報告します。", exampleReading: "インシデントを すぐに ほうこくします。", exampleTranslation: { vi: "Tôi báo cáo ngay các sự cố.", en: "I report incidents immediately.", zh: "我立即报告险情。" }, category: "安全管理" },
    { word: "ヒヤリハット", reading: "ヒヤリハット", meaning: "事故になりそうだった危険な体験", translation: { vi: "suýt xảy ra tai nạn / cận sự cố", en: "near-miss / close call", zh: "险情 / 惊险经历" }, example: "ヒヤリハット報告書を書きます。", exampleReading: "ヒヤリハット ほうこくしょを かきます。", exampleTranslation: { vi: "Tôi viết báo cáo về cận sự cố.", en: "I write a near-miss report.", zh: "我填写险情报告。" }, category: "安全管理" },
    { word: "BCP", reading: "ビーシーピー", meaning: "事業継続計画（Business Continuity Plan）", translation: { vi: "kế hoạch tiếp tục kinh doanh (BCP)", en: "Business Continuity Plan (BCP)", zh: "业务持续计划（BCP）" }, example: "災害時のBCPを確認します。", exampleReading: "さいがいじの BCPを かくにんします。", exampleTranslation: { vi: "Tôi xác nhận kế hoạch BCP trong trường hợp thiên tai.", en: "I will confirm the BCP for disasters.", zh: "我确认灾害时的BCP。" }, category: "安全管理" },
    { word: "エビデンス", reading: "エビデンス", meaning: "科学的根拠・証拠", translation: { vi: "bằng chứng khoa học", en: "evidence", zh: "证据 / 循证" }, example: "エビデンスに基づくケアをします。", exampleReading: "エビデンスに もとづく ケアを します。", exampleTranslation: { vi: "Tôi thực hiện chăm sóc dựa trên bằng chứng.", en: "I provide evidence-based care.", zh: "我提供基于证据的护理。" }, category: "医療" },
    { word: "自立支援", reading: "じりつしえん", meaning: "自分でできる力を育てる支援", translation: { vi: "hỗ trợ tự lập", en: "independence support", zh: "自立支援" }, example: "自立支援を重視したケアを提供します。", exampleReading: "じりつしえんを じゅうしした ケアを ていきょうします。", exampleTranslation: { vi: "Tôi cung cấp dịch vụ chăm sóc coi trọng hỗ trợ tự lập.", en: "I provide care that emphasizes independence support.", zh: "我提供重视自立支援的护理。" }, category: "介護専門" },
    { word: "プロトコル", reading: "プロトコル", meaning: "標準化された手順・規則", translation: { vi: "quy trình / giao thức", en: "protocol / standard procedure", zh: "规程 / 方案" }, example: "感染予防のプロトコルを守ります。", exampleReading: "かんせんよぼうの プロトコルを まもります。", exampleTranslation: { vi: "Tôi tuân theo quy trình phòng chống lây nhiễm.", en: "I follow the infection prevention protocol.", zh: "我遵守感染预防规程。" }, category: "医療" },
    { word: "PDCAサイクル", reading: "ピーディーシーエー サイクル", meaning: "計画・実行・評価・改善の繰り返し", translation: { vi: "vòng PDCA (Lập kế hoạch-Thực hiện-Kiểm tra-Cải tiến)", en: "PDCA cycle (Plan-Do-Check-Act)", zh: "PDCA循环" }, example: "PDCAサイクルで質を向上させます。", exampleReading: "PDCAサイクルで しつを こうじょうさせます。", exampleTranslation: { vi: "Tôi nâng cao chất lượng bằng vòng PDCA.", en: "I improve quality through the PDCA cycle.", zh: "我通过PDCA循环提高质量。" }, category: "管理" },
  ],

  // N3 第5課: 社会問題・時事用語 (15語)
  "lesson-vocab-n3-05": [
    { word: "少子高齢化", reading: "しょうしこうれいか", meaning: "子供が減り高齢者が増える社会現象", translation: { vi: "già hóa dân số / ít trẻ em nhiều người già", en: "declining birthrate and aging population", zh: "少子老龄化" }, example: "少子高齢化で介護職の需要が増えています。", exampleReading: "しょうしこうれいかで かいごしょくの じゅようが ふえています。", exampleTranslation: { vi: "Nhu cầu về nhân viên chăm sóc tăng lên do già hóa dân số.", en: "The demand for caregivers is increasing due to the aging population.", zh: "因少子老龄化，护理人员需求增加。" }, category: "社会問題" },
    { word: "人口減少", reading: "じんこうげんしょう", meaning: "人の数が減ること", translation: { vi: "dân số giảm", en: "population decline / depopulation", zh: "人口减少" }, example: "人口減少で労働力不足が深刻です。", exampleReading: "じんこうげんしょうで ろうどうりょくぶそくが しんこくです。", exampleTranslation: { vi: "Tình trạng thiếu lao động ngày càng nghiêm trọng do dân số giảm.", en: "Labor shortages are serious due to population decline.", zh: "人口减少导致劳动力短缺严重。" }, category: "社会問題" },
    { word: "労働力不足", reading: "ろうどうりょくぶそく", meaning: "働く人の数が足りないこと", translation: { vi: "thiếu lao động", en: "labor shortage / workforce shortage", zh: "劳动力不足" }, example: "介護業界では労働力不足が続いています。", exampleReading: "かいごぎょうかいでは ろうどうりょくぶそくが つづいています。", exampleTranslation: { vi: "Ngành chăm sóc tiếp tục thiếu lao động.", en: "Labor shortages continue in the care industry.", zh: "护理行业持续存在劳动力不足。" }, category: "社会問題" },
    { word: "外国人労働者", reading: "がいこくじんろうどうしゃ", meaning: "外国から来て働いている人", translation: { vi: "lao động nước ngoài", en: "foreign worker / immigrant worker", zh: "外国劳动者" }, example: "外国人労働者が介護業界を支えています。", exampleReading: "がいこくじんろうどうしゃが かいごぎょうかいを ささえています。", exampleTranslation: { vi: "Lao động nước ngoài đang hỗ trợ ngành chăm sóc.", en: "Foreign workers are supporting the care industry.", zh: "外国劳动者正在支撑护理行业。" }, category: "社会問題" },
    { word: "多文化共生", reading: "たぶんかきょうせい", meaning: "異なる文化を持つ人々が共に生活すること", translation: { vi: "cùng tồn tại đa văn hóa", en: "multicultural coexistence", zh: "多元文化共生" }, example: "多文化共生の社会を目指します。", exampleReading: "たぶんかきょうせいの しゃかいを めざします。", exampleTranslation: { vi: "Chúng tôi hướng tới xã hội cùng tồn tại đa văn hóa.", en: "We aim for a multicultural coexistence society.", zh: "我们致力于多元文化共生的社会。" }, category: "社会" },
    { word: "ダイバーシティ", reading: "ダイバーシティ", meaning: "多様性・様々な人が共存すること", translation: { vi: "đa dạng / sự đa dạng", en: "diversity", zh: "多样性" }, example: "ダイバーシティを尊重した職場を目指します。", exampleReading: "ダイバーシティを そんちょうした しょくばを めざします。", exampleTranslation: { vi: "Chúng tôi hướng tới nơi làm việc tôn trọng sự đa dạng.", en: "We aim for a workplace that respects diversity.", zh: "我们致力于尊重多样性的职场。" }, category: "社会" },
    { word: "インクルージョン", reading: "インクルージョン", meaning: "誰もが社会に参加できること", translation: { vi: "hòa nhập / bao gồm", en: "inclusion", zh: "包容 / 融合" }, example: "インクルージョンの視点でケアします。", exampleReading: "インクルージョンの してんで ケアします。", exampleTranslation: { vi: "Tôi chăm sóc từ góc độ hòa nhập.", en: "I provide care from an inclusion perspective.", zh: "我从包容的角度提供护理。" }, category: "社会" },
    { word: "SDGs", reading: "エスディージーズ", meaning: "持続可能な開発目標（国連）", translation: { vi: "Mục tiêu Phát triển Bền vững (SDGs)", en: "Sustainable Development Goals (SDGs)", zh: "可持续发展目标（SDGs）" }, example: "SDGsの目標に沿った事業を行います。", exampleReading: "SDGsの もくひょうに そった じぎょうを おこないます。", exampleTranslation: { vi: "Chúng tôi thực hiện kinh doanh theo mục tiêu SDGs.", en: "We conduct business in line with SDG goals.", zh: "我们开展符合SDGs目标的业务。" }, category: "環境" },
    { word: "持続可能", reading: "じぞくかのう", meaning: "長期間続けられる・環境に優しい", translation: { vi: "bền vững", en: "sustainable", zh: "可持续" }, example: "持続可能な介護システムを作ります。", exampleReading: "じぞくかのうな かいごシステムを つくります。", exampleTranslation: { vi: "Chúng tôi xây dựng hệ thống chăm sóc bền vững.", en: "We will create a sustainable care system.", zh: "我们构建可持续的护理体系。" }, category: "環境" },
    { word: "デジタル化", reading: "デジタルか", meaning: "情報をデジタルで管理・処理すること", translation: { vi: "số hóa", en: "digitalization / digitization", zh: "数字化" }, example: "介護記録のデジタル化が進んでいます。", exampleReading: "かいごきろくの デジタルかが すすんでいます。", exampleTranslation: { vi: "Số hóa hồ sơ chăm sóc đang được thúc đẩy.", en: "Digitalization of care records is progressing.", zh: "护理记录的数字化正在推进。" }, category: "テクノロジー" },
    { word: "AI活用", reading: "エーアイかつよう", meaning: "人工知能を仕事に使うこと", translation: { vi: "ứng dụng AI", en: "AI utilization / AI application", zh: "AI应用" }, example: "介護でのAI活用が広がっています。", exampleReading: "かいごでの エーアイかつようが ひろがっています。", exampleTranslation: { vi: "Việc ứng dụng AI trong chăm sóc đang lan rộng.", en: "AI utilization in care is expanding.", zh: "AI在护理中的应用正在扩大。" }, category: "テクノロジー" },
    { word: "グローバル化", reading: "グローバルか", meaning: "世界規模でつながること", translation: { vi: "toàn cầu hóa", en: "globalization", zh: "全球化" }, example: "グローバル化で外国人介護士が増えています。", exampleReading: "グローバルかで がいこくじん かいごしが ふえています。", exampleTranslation: { vi: "Số lượng nhân viên chăm sóc nước ngoài tăng do toàn cầu hóa.", en: "Globalization has increased the number of foreign caregivers.", zh: "全球化使外国护理员增加。" }, category: "社会" },
    { word: "環境問題", reading: "かんきょうもんだい", meaning: "地球環境に関する問題", translation: { vi: "vấn đề môi trường", en: "environmental issues", zh: "环境问题" }, example: "環境問題への意識を高めます。", exampleReading: "かんきょうもんだいへの いしきを たかめます。", exampleTranslation: { vi: "Tôi nâng cao nhận thức về vấn đề môi trường.", en: "I raise awareness of environmental issues.", zh: "我提高对环境问题的意识。" }, category: "環境" },
    { word: "温暖化", reading: "おんだんか", meaning: "地球の平均気温が上がること", translation: { vi: "nóng lên toàn cầu", en: "global warming", zh: "全球变暖" }, example: "温暖化対策に取り組んでいます。", exampleReading: "おんだんかたいさくに とりくんでいます。", exampleTranslation: { vi: "Tôi đang tích cực ứng phó với hiện tượng nóng lên toàn cầu.", en: "I am working on global warming countermeasures.", zh: "我正在致力于应对全球变暖。" }, category: "環境" },
    { word: "再生可能エネルギー", reading: "さいせいかのうエネルギー", meaning: "繰り返し使えるクリーンエネルギー", translation: { vi: "năng lượng tái tạo", en: "renewable energy", zh: "可再生能源" }, example: "再生可能エネルギーの導入を検討します。", exampleReading: "さいせいかのうエネルギーの どうにゅうを けんとうします。", exampleTranslation: { vi: "Tôi xem xét việc áp dụng năng lượng tái tạo.", en: "I will consider introducing renewable energy.", zh: "我将研究引入可再生能源。" }, category: "環境" },
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

  // ============================================================
  // JLPT N4 対策コース 文法データ (4パターン)
  // ============================================================

  "lesson-grammar-n4-01": {
    title: "〜てみる・〜てしまう",
    pattern: "動詞（て形）+ みる / 動詞（て形）+ しまう",
    meaning: "試みる行動と完了・後悔",
    explanation: "「〜てみる」は「試しにやってみる」という意味です。「〜てしまう」は「完全に終わった」または「後悔・残念な気持ち」を表します。介護現場では新しい方法を試したり、ミスを報告する場面で使います。",
    examples: [
      { ja: "この新しい入浴の方法を試してみましょう。", reading: "この あたらしい にゅうよくの ほうほうを ためしてみましょう。", vi: "Hãy thử phương pháp tắm mới này.", en: "Let's try this new bathing method.", zh: "让我们试试这个新的洗澡方法。" },
      { ja: "利用者さんに声をかけてみたら、すぐに答えてくれました。", reading: "りようしゃさんに こえをかけてみたら、すぐに こたえてくれました。", vi: "Khi tôi thử gọi hỏi người dùng dịch vụ, họ đã trả lời ngay.", en: "When I tried talking to the resident, they responded right away.", zh: "我试着跟利用者打招呼，他们马上回答了。" },
      { ja: "薬を飲む時間を間違えてしまいました。すぐに看護師に報告します。", reading: "くすりを のむ じかんを まちがえてしまいました。すぐに かんごしに ほうこくします。", vi: "Tôi đã lỡ nhầm giờ uống thuốc. Tôi sẽ báo cáo y tá ngay.", en: "I made a mistake with the medication time. I'll report to the nurse immediately.", zh: "我把吃药时间弄错了。我马上报告护士。" },
      { ja: "書類をなくしてしまって、本当に困っています。", reading: "しょるいを なくしてしまって、ほんとうに こまっています。", vi: "Tôi đã làm mất tài liệu, tôi thực sự đang rất khó xử.", en: "I've lost the documents and I'm really in trouble.", zh: "我把文件弄丢了，真的很困扰。" },
    ],
    practiceQuestions: [
      { question: "新しいケア方法を ___ みましょう（試みの表現）。", blanks: ["試して"], answer: "試して", hint: "「試す」→て形「試して」＋みましょう" },
      { question: "記録を書くのを忘れて ___（後悔・完了）。", blanks: ["しまいました"], answer: "しまいました", hint: "「〜てしまいました」は後悔・完了を表す" },
    ],
  },

  "lesson-grammar-n4-02": {
    title: "〜ので・〜から・〜ため",
    pattern: "普通形/丁寧形 + ので / から / ため（に）",
    meaning: "理由・原因を丁寧に述べる表現",
    explanation: "「〜ので」「〜から」「〜ため」はどれも理由・原因を表しますが、ニュアンスが異なります。「〜ので」は客観的・丁寧な理由、「〜から」は主観的な理由や口語的表現、「〜ため」は書き言葉や改まった説明に使います。",
    examples: [
      { ja: "利用者さんの体調が悪いので、入浴は明日にします。", reading: "りようしゃさんの たいちょうが わるいので、にゅうよくは あしたに します。", vi: "Vì tình trạng sức khỏe của người dùng dịch vụ không tốt nên sẽ tắm vào ngày mai.", en: "Since the resident's condition is poor, we'll do the bath tomorrow.", zh: "因为利用者身体状况不好，所以明天再洗澡。" },
      { ja: "会議があるから、早く来てください。", reading: "かいぎが あるから、はやく きてください。", vi: "Vì có họp nên hãy đến sớm.", en: "Please come early because there's a meeting.", zh: "因为有会议，请早点来。" },
      { ja: "感染予防のため、手洗いを徹底してください。", reading: "かんせんよぼうの ため、てあらいを てっていしてください。", vi: "Để phòng ngừa lây nhiễm, hãy rửa tay triệt để.", en: "Please wash your hands thoroughly for infection prevention.", zh: "为了预防感染，请彻底洗手。" },
      { ja: "転倒リスクがあるので、一人で歩かないでください。", reading: "てんとうリスクが あるので、ひとりで あるかないでください。", vi: "Vì có nguy cơ ngã nên đừng đi bộ một mình.", en: "Since there's a fall risk, please don't walk alone.", zh: "因为有跌倒风险，请不要独自行走。" },
    ],
    practiceQuestions: [
      { question: "熱がある ___ 、今日は安静にしてください（理由・丁寧）。", blanks: ["ので"], answer: "ので", hint: "「〜ので」は丁寧な理由の表現" },
      { question: "利用者の安全を守る ___ 、スタッフ全員で協力します（目的・書き言葉）。", blanks: ["ため"], answer: "ため", hint: "「〜ため」は目的・改まった理由の表現" },
    ],
  },

  "lesson-grammar-n4-03": {
    title: "〜ながら・〜てから・〜た後で",
    pattern: "動詞（ます形）+ ながら / 動詞（て形）+ から / 動詞（た形）+ 後で",
    meaning: "時間の順序と同時進行を表す表現",
    explanation: "「〜ながら」は二つの動作を同時に行う表現です。「〜てから」は「〜した後で次の行動」を表し、順序が重要な手順を説明するときに使います。「〜た後で」も同じように順序を示しますが、完了を強調します。",
    examples: [
      { ja: "声をかけながら、体を拭いてください。", reading: "こえをかけながら、からだを ふいてください。", vi: "Vừa gọi hỏi vừa lau người cho người dùng dịch vụ.", en: "Please wipe the body while talking to the resident.", zh: "一边打招呼一边擦拭身体。" },
      { ja: "手を洗ってから、食事の準備をします。", reading: "てを あらってから、しょくじの じゅんびを します。", vi: "Sau khi rửa tay xong sẽ chuẩn bị bữa ăn.", en: "After washing my hands, I'll prepare the meal.", zh: "洗完手后准备饭食。" },
      { ja: "バイタルを測った後で、記録に書きます。", reading: "バイタルを はかった あとで、きろくに かきます。", vi: "Sau khi đo sinh hiệu xong sẽ ghi vào hồ sơ.", en: "After taking the vitals, I'll write in the record.", zh: "量完生命体征后记录在案。" },
      { ja: "テレビを見ながら食事をするのは、誤嚥のリスクがあります。", reading: "テレビを みながら しょくじを するのは、ごえんの リスクが あります。", vi: "Việc vừa xem TV vừa ăn có nguy cơ sặc thức ăn.", en: "Eating while watching TV carries a risk of aspiration.", zh: "边看电视边吃饭有误吸的风险。" },
    ],
    practiceQuestions: [
      { question: "音楽を聴き ___ 、入浴介助をします（同時進行）。", blanks: ["ながら"], answer: "ながら", hint: "「〜ながら」は二つの動作を同時に行う" },
      { question: "申し送りを読んで ___ 、業務を開始します（順序）。", blanks: ["から"], answer: "から", hint: "「〜てから」は「〜した後で次の行動」を表す" },
    ],
  },

  "lesson-grammar-n4-04": {
    title: "〜そうだ・〜らしい・〜ようだ",
    pattern: "動詞/形容詞 + そうだ / らしい / ようだ",
    meaning: "推測・様子・伝聞を表す表現",
    explanation: "「〜そうだ」は見た目・様子から推測する表現（様態）または伝聞（〜だそうだ）、「〜らしい」は信頼できる情報源からの推測・伝聞、「〜ようだ」は証拠・根拠に基づく客観的な推測です。介護記録や報告では区別して使うことが重要です。",
    examples: [
      { ja: "利用者さんは疲れているようです。（根拠から推測）", reading: "りようしゃさんは つかれている ようです。", vi: "Có vẻ như người dùng dịch vụ đang mệt mỏi.", en: "The resident appears to be tired.", zh: "利用者好像很疲惫。" },
      { ja: "今日は食欲がなさそうです。（様子から推測）", reading: "きょうは しょくよくが なさそうです。", vi: "Hôm nay có vẻ không có cảm giác thèm ăn.", en: "Today it seems like there's no appetite.", zh: "今天似乎没有食欲。" },
      { ja: "来週から新しいスタッフが来るらしいです。（伝聞）", reading: "らいしゅうから あたらしい スタッフが くる らしいです。", vi: "Nghe nói từ tuần sau sẽ có nhân viên mới đến.", en: "It seems a new staff member is coming from next week.", zh: "听说从下周起会来新员工。" },
      { ja: "足が腫れているようなので、看護師に報告しました。（根拠に基づく）", reading: "あしが はれている ようなので、かんごしに ほうこくしました。", vi: "Vì có vẻ như chân bị sưng nên tôi đã báo cáo y tá.", en: "Since the foot appeared to be swollen, I reported it to the nurse.", zh: "因为脚好像肿了，所以向护士汇报了。" },
    ],
    practiceQuestions: [
      { question: "利用者さんが眠れなかった ___ です（信頼できる情報源からの伝聞）。", blanks: ["らしい"], answer: "らしい", hint: "「〜らしい」は信頼できる情報源からの推測・伝聞" },
      { question: "呼吸が速くなっている ___ です（根拠からの客観的推測）。", blanks: ["ようだ / ようです"], answer: "ようです", hint: "「〜ようだ」は証拠・観察に基づく客観的推測" },
    ],
  },

  // ============================================================
  // JLPT N3 対策コース 文法データ (5パターン)
  // ============================================================

  "lesson-grammar-n3-01": {
    title: "〜によって・〜による",
    pattern: "名詞 + によって / による + 名詞",
    meaning: "手段・原因・相違・受動の動作主を表す表現",
    explanation: "「〜によって」は①手段・方法（〜を使って）②原因（〜が理由で）③相違（〜次第で異なる）④受け身の動作主（〜に）を表します。ビジネス文書や公式な場面でよく使われる重要な表現です。",
    examples: [
      { ja: "ケアプランは利用者の状態によって変わります。", reading: "ケアプランは りようしゃの じょうたいによって かわります。", vi: "Kế hoạch chăm sóc thay đổi tùy theo tình trạng của người dùng dịch vụ.", en: "The care plan changes depending on the resident's condition.", zh: "护理计划根据利用者的状态而变化。" },
      { ja: "この規則は介護保険法によって定められています。", reading: "この きそくは かいごほけんほうによって さだめられています。", vi: "Quy tắc này được quy định bởi Luật Bảo hiểm Chăm sóc.", en: "This rule is established by the Long-term Care Insurance Law.", zh: "这条规则是由介护保险法规定的。" },
      { ja: "スタッフによる丁寧なケアが利用者の回復を支えています。", reading: "スタッフによる ていねいな ケアが りようしゃの かいふくを ささえています。", vi: "Sự chăm sóc tận tình của nhân viên hỗ trợ sự hồi phục của người dùng dịch vụ.", en: "Careful care by staff supports the resident's recovery.", zh: "员工细心的护理支持着利用者的康复。" },
      { ja: "外国人労働者の受け入れ方針は施設によって異なります。", reading: "がいこくじんろうどうしゃの うけいれ ほうしんは しせつによって ことなります。", vi: "Chính sách tiếp nhận người lao động nước ngoài khác nhau tùy từng cơ sở.", en: "The policy for accepting foreign workers differs by facility.", zh: "接受外国劳动者的方针因设施而异。" },
    ],
    practiceQuestions: [
      { question: "感染経路 ___ 対策が違います（相違）。", blanks: ["によって"], answer: "によって", hint: "「〜によって」は「〜次第で異なる」の意味" },
      { question: "新しい制度は政府の決定 ___ 実施されます（手段・根拠）。", blanks: ["によって"], answer: "によって", hint: "「〜によって実施される」は「〜を根拠として」の意味" },
    ],
  },

  "lesson-grammar-n3-02": {
    title: "〜ために・〜ように",
    pattern: "動詞（辞書形/ない形）+ ために / ように",
    meaning: "目的と変化の目標を正確に使い分ける",
    explanation: "「〜ために」は意志的な行動の目的（主語が意図的に行う）を表します。「〜ように」は変化の目標や、自分でコントロールできないことへの希望・願望を表します。介護では「自立のために訓練する」「一人で歩けるようになる」など重要な表現です。",
    examples: [
      { ja: "利用者の自立を支援するために、毎日訓練を行います。", reading: "りようしゃの じりつを しえんするために、まいにち くんれんを おこないます。", vi: "Để hỗ trợ sự tự lập của người dùng dịch vụ, chúng tôi thực hiện tập luyện mỗi ngày.", en: "In order to support the resident's independence, we conduct training every day.", zh: "为了支持利用者的自立，我们每天进行训练。" },
      { ja: "一人でトイレに行けるように、歩行訓練をしています。", reading: "ひとりで トイレに いけるように、ほこうくんれんを しています。", vi: "Chúng tôi đang luyện tập đi bộ để người dùng có thể tự đi vệ sinh một mình.", en: "We are doing walking training so they can go to the toilet by themselves.", zh: "为了能独自去厕所，正在进行步行训练。" },
      { ja: "薬を忘れないように、毎朝確認しています。", reading: "くすりを わすれないように、まいあさ かくにんしています。", vi: "Để không quên uống thuốc, tôi kiểm tra mỗi buổi sáng.", en: "So as not to forget the medicine, I check every morning.", zh: "为了不忘记吃药，每天早上确认。" },
      { ja: "JLPT N3に合格するために、毎日勉強しています。", reading: "JLPT N3に ごうかくするために、まいにち べんきょうしています。", vi: "Để đạt được JLPT N3, tôi học mỗi ngày.", en: "I study every day in order to pass JLPT N3.", zh: "为了通过JLPT N3，每天都在学习。" },
    ],
    practiceQuestions: [
      { question: "転倒を防ぐ ___ 、手すりを設置しました（目的・意図的行動）。", blanks: ["ために"], answer: "ために", hint: "「〜ために」は意志的行動の目的" },
      { question: "利用者さんが安心して眠れる ___ 、環境を整えます（変化の目標）。", blanks: ["ように"], answer: "ように", hint: "「〜ように」は変化の目標・願望" },
    ],
  },

  "lesson-grammar-n3-03": {
    title: "〜ば〜のに・〜たら〜のに",
    pattern: "動詞（ば形/たら形）+ のに",
    meaning: "反事実の仮定・後悔・惜しみを表す表現",
    explanation: "「〜ば〜のに」「〜たら〜のに」は「実際にはそうでないが、もしそうだったら〜」という反事実の仮定を表します。後悔・残念・惜しいという気持ちを伴います。過去のミスや現状への不満を表現する際に使います。",
    examples: [
      { ja: "もっと早く気づいていれば、対処できたのに。", reading: "もっと はやく きづいていれば、たいしょできたのに。", vi: "Nếu nhận ra sớm hơn thì đã có thể xử lý được.", en: "If I had noticed sooner, I could have handled it.", zh: "如果早点注意到就能处理了。" },
      { ja: "申し送りをしっかり読んでいたら、ミスしなかったのに。", reading: "もうしおくりを しっかり よんでいたら、ミスしなかったのに。", vi: "Nếu đọc kỹ báo cáo bàn giao thì đã không bị nhầm.", en: "If I had read the handover report carefully, I wouldn't have made a mistake.", zh: "如果认真看了交接班报告就不会出错了。" },
      { ja: "もっと日本語が上手ければ、もっとうまく説明できるのに。", reading: "もっと にほんごが じょうずなら、もっと うまく せつめいできるのに。", vi: "Nếu tiếng Nhật tốt hơn thì đã có thể giải thích tốt hơn.", en: "If my Japanese were better, I could explain more clearly.", zh: "如果日语更好的话，就能解释得更清楚了。" },
      { ja: "スタッフが多ければ、もっと丁寧なケアができるのに。", reading: "スタッフが おおければ、もっと ていねいな ケアが できるのに。", vi: "Nếu có nhiều nhân viên hơn thì đã có thể chăm sóc tận tình hơn.", en: "If there were more staff, we could provide more careful care.", zh: "如果员工多一些，就能提供更细心的护理了。" },
    ],
    practiceQuestions: [
      { question: "もっと早く来てい ___ 、間に合ったのに（反事実・後悔）。", blanks: ["れば"], answer: "れば", hint: "「〜ていれば〜のに」は反事実の後悔" },
      { question: "マニュアルを確認してい ___ 、間違えなかったのに（仮定・後悔）。", blanks: ["たら"], answer: "たら", hint: "「〜ていたら〜のに」も反事実の仮定" },
    ],
  },

  "lesson-grammar-n3-04": {
    title: "〜ておく・〜てある・〜ていく",
    pattern: "動詞（て形）+ おく / ある / いく",
    meaning: "準備・意図的結果・継続的変化を表す表現",
    explanation: "「〜ておく」は将来のために準備する行為、「〜てある」は誰かが意図的に行った行為の結果が残っている状態、「〜ていく」は今後も継続する変化や行為を表します。介護計画や業務準備を表現するのに重要です。",
    examples: [
      { ja: "夜間に備えて、緊急連絡先を確認しておきます。", reading: "やかんに そなえて、きんきゅうれんらくさきを かくにんしておきます。", vi: "Để chuẩn bị cho ban đêm, tôi sẽ xác nhận trước địa chỉ liên lạc khẩn cấp.", en: "In preparation for the night, I'll confirm the emergency contact in advance.", zh: "为了夜间做准备，先确认紧急联系方式。" },
      { ja: "次の担当者のために、記録が書いてあります。", reading: "つぎの たんとうしゃの ために、きろくが かいてあります。", vi: "Hồ sơ đã được ghi sẵn cho người phụ trách tiếp theo.", en: "The record has been written for the next person in charge.", zh: "已经为下一位负责人写好了记录。" },
      { ja: "今後も継続してリハビリを続けていきます。", reading: "こんごも けいぞくして リハビリを つづけていきます。", vi: "Chúng tôi sẽ tiếp tục phục hồi chức năng trong tương lai.", en: "We will continue rehabilitation going forward.", zh: "今后也将持续进行康复训练。" },
      { ja: "会議室は掃除してありますので、すぐ使えます。", reading: "かいぎしつは そうじしてありますので、すぐ つかえます。", vi: "Phòng họp đã được dọn dẹp xong nên có thể dùng ngay.", en: "The meeting room has been cleaned, so it can be used immediately.", zh: "会议室已经打扫好了，可以立即使用。" },
    ],
    practiceQuestions: [
      { question: "引継ぎのため、情報をまとめて ___ （準備）。", blanks: ["おきます / おいた"], answer: "おきます", hint: "「〜ておく」は将来のための準備" },
      { question: "車椅子はもう用意し ___ ます（意図的行為の結果）。", blanks: ["てあり"], answer: "てあり", hint: "「〜てある」は意図的行為の結果が残っている状態" },
    ],
  },

  "lesson-grammar-n3-05": {
    title: "〜だけでなく〜も・〜はもちろん〜も",
    pattern: "名詞/動詞 + だけでなく〜も / 名詞 + はもちろん〜も",
    meaning: "列挙・強調・付加を表す接続表現",
    explanation: "「〜だけでなく〜も」は「〜のみならず〜も」と同じ意味で、一つのことに加えて別のことも当てはまることを表します。「〜はもちろん〜も」は「〜は言うまでもなく〜も」という強調の表現です。多文化共生や職場の多様性について話す際によく使います。",
    examples: [
      { ja: "日本語の力だけでなく、介護の専門知識も必要です。", reading: "にほんごの ちからだけでなく、かいごの せんもんちしきも ひつようです。", vi: "Không chỉ cần năng lực tiếng Nhật mà còn cần kiến thức chuyên môn về chăm sóc.", en: "Not only Japanese language ability but also professional knowledge of care is needed.", zh: "不仅需要日语能力，还需要护理专业知识。" },
      { ja: "ベトナム語はもちろん、英語や中国語でも対応できます。", reading: "ベトナムごは もちろん、えいごや ちゅうごくごでも たいおうできます。", vi: "Không chỉ tiếng Việt mà chúng tôi còn có thể phục vụ bằng tiếng Anh và tiếng Trung.", en: "Of course Vietnamese, we can also respond in English and Chinese.", zh: "不用说越南语，英语和中文也可以应对。" },
      { ja: "身体的なケアだけでなく、心のケアも大切にしています。", reading: "しんたいてきな ケアだけでなく、こころの ケアも たいせつに しています。", vi: "Không chỉ chăm sóc thể chất mà chúng tôi còn coi trọng chăm sóc tinh thần.", en: "Not only physical care but also emotional care is valued.", zh: "不仅重视身体护理，也重视心理护理。" },
      { ja: "高齢者はもちろん、障害者や子どもの支援も行っています。", reading: "こうれいしゃは もちろん、しょうがいしゃや こどもの しえんも おこなっています。", vi: "Không chỉ người cao tuổi, chúng tôi còn hỗ trợ cả người khuyết tật và trẻ em.", en: "Of course we support the elderly, but also people with disabilities and children.", zh: "当然支持老年人，也支持残疾人和儿童。" },
    ],
    practiceQuestions: [
      { question: "介護技術 ___ 、コミュニケーション能力も大切です（付加）。", blanks: ["だけでなく"], answer: "だけでなく", hint: "「〜だけでなく〜も」は「〜のみならず〜も」の意味" },
      { question: "日本語 ___ 、他の言語も学んでいます（強調・当然）。", blanks: ["はもちろん"], answer: "はもちろん", hint: "「〜はもちろん」は「〜は言うまでもなく」の意味" },
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

  // ============================================================
  // JLPT N4 対策コース クイズ (各10問 × 4セット)
  // ============================================================

  "lesson-quiz-n4-01": [
    { question: "「連絡（れんらく）」の英語は？", options: [{ text: "contact / communication", isCorrect: true }, { text: "contract", isCorrect: false }, { text: "cooperation", isCorrect: false }, { text: "confirmation", isCorrect: false }], explanation: "「連絡（れんらく）」はcontact / communicationです。「連絡する」は「情報を伝える・知らせる」意味です。ベトナム語ではliên lạcです。", difficulty: 1 },
    { question: "「確認（かくにん）」の意味として最も近いものは？", options: [{ text: "正しいかどうかを調べて確かめること", isCorrect: true }, { text: "情報を他の人に伝えること", isCorrect: false }, { text: "仕事を別の人に任せること", isCorrect: false }, { text: "問題を解決すること", isCorrect: false }], explanation: "「確認（かくにん）」はverification / confirmationの意味です。「確認する」=「チェックする・間違いがないか調べる」。英語ではto confirm / to check。", difficulty: 1 },
    { question: "「相談（そうだん）」を使う正しい場面は？", options: [{ text: "困ったことを上司に話して意見を求めるとき", isCorrect: true }, { text: "命令を部下に伝えるとき", isCorrect: false }, { text: "仕事が終わったと報告するとき", isCorrect: false }, { text: "書類にサインするとき", isCorrect: false }], explanation: "「相談（そうだん）」はconsultation / discussionです。困ったことや判断が必要なことを上司や同僚に話す行為です。ベトナム語ではtham khảo / hỏi ý kiến。", difficulty: 2 },
    { question: "「提案（ていあん）」のベトナム語は？", options: [{ text: "đề xuất / đề nghị", isCorrect: true }, { text: "báo cáo", isCorrect: false }, { text: "xác nhận", isCorrect: false }, { text: "hướng dẫn", isCorrect: false }], explanation: "「提案（ていあん）」はproposal / suggestionです。ベトナム語ではđề xuất（提案）またはđề nghị（お願い・提案）です。「報告」はbáo cáo、「確認」はxác nhận。", difficulty: 2 },
    { question: "「引継ぎ（ひきつぎ）」として正しい行動は？", options: [{ text: "業務の状況を次の担当者に正確に伝える", isCorrect: true }, { text: "仕事を全部自分でやりきってから帰る", isCorrect: false }, { text: "次の担当者が来るまで休憩する", isCorrect: false }, { text: "業務の引継ぎは不要と伝える", isCorrect: false }], explanation: "「引継ぎ（ひきつぎ）」はhandover / shift changeです。次の担当者に現状・注意点・未完了の業務などを正確に伝えることが重要です。", difficulty: 2 },
    { question: "「判断（はんだん）」が難しいとき、介護士がまずすべきことは？", options: [{ text: "上司や看護師に相談する", isCorrect: true }, { text: "自分の経験だけで決める", isCorrect: false }, { text: "利用者に聞いて決める", isCorrect: false }, { text: "何もしないで様子を見る", isCorrect: false }], explanation: "「判断（はんだん）」はjudgment / decisionです。介護士が自分だけで判断が難しい場合は、必ず上司や看護師に相談（consultation）してから行動することが大切です。", difficulty: 3 },
    { question: "「許可（きょか）」と「禁止（きんし）」の組み合わせとして正しいのは？", options: [{ text: "許可=permission（良い）、禁止=prohibition（ダメ）", isCorrect: true }, { text: "許可=prohibition（ダメ）、禁止=permission（良い）", isCorrect: false }, { text: "どちらも同じ意味", isCorrect: false }, { text: "許可=instruction（指示）、禁止=request（依頼）", isCorrect: false }], explanation: "「許可（きょか）」はpermission（〜してもよい）、「禁止（きんし）」はprohibition（〜してはいけない）です。介護現場では「〜してもよいか確認する」「〜を禁止する」は重要な概念です。", difficulty: 2 },
    { question: "「担当（たんとう）」の中国語は？", options: [{ text: "负责人（fùzé rén）/ 负责（fùzé）", isCorrect: true }, { text: "工作（gōngzuò）", isCorrect: false }, { text: "会议（huìyì）", isCorrect: false }, { text: "报告（bàogào）", isCorrect: false }], explanation: "「担当（たんとう）」はin charge of / responsible forです。中国語では负责（fùzé）または担当者=负责人（fùzé rén）です。「工作」=仕事、「会议」=会議、「报告」=報告。", difficulty: 3 },
    { question: "「報告（ほうこく）」の正しい使い方は？", options: [{ text: "「利用者さんが食事を残しました。報告します。」", isCorrect: true }, { text: "「今日の天気を報告します。」", isCorrect: false }, { text: "「私の意見を報告します。」", isCorrect: false }, { text: "「明日の計画を報告します。」（まだ起きていない未来のこと）", isCorrect: false }], explanation: "「報告（ほうこく）」はreportです。業務上、起きた出来事・事実を上司や看護師に伝えるときに使います。「今後の計画」には「提案（ていあん）」や「予定（よてい）」の方が適切です。", difficulty: 3 },
    { question: "「指示（しじ）」を受けたとき、最初にすべきことは？", options: [{ text: "内容を理解して復唱・確認する", isCorrect: true }, { text: "すぐに忘れて別の仕事をする", isCorrect: false }, { text: "指示を無視して自分のやり方でやる", isCorrect: false }, { text: "後でメモする", isCorrect: false }], explanation: "「指示（しじ）」はinstruction / directionです。指示を受けたら①内容を確認②不明点は質問③復唱して確認④実施、の手順を守ることが重要です。「はい、〇〇ですね」と復唱する習慣をつけましょう。", difficulty: 2 },
  ],

  "lesson-quiz-n4-02": [
    { question: "「症状（しょうじょう）」の英語は？", options: [{ text: "symptom", isCorrect: true }, { text: "diagnosis", isCorrect: false }, { text: "treatment", isCorrect: false }, { text: "medicine", isCorrect: false }], explanation: "「症状（しょうじょう）」はsymptom（病気や怪我のサイン）です。「診断」はdiagnosis、「治療」はtreatment、「薬」はmedicineです。ベトナム語ではtriệu chứng。", difficulty: 1 },
    { question: "「副作用（ふくさよう）」として正しい説明は？", options: [{ text: "薬の主な効果以外で起きる望ましくない効果", isCorrect: true }, { text: "薬を飲んだ後の主な治療効果", isCorrect: false }, { text: "薬の正しい使い方", isCorrect: false }, { text: "薬の価格", isCorrect: false }], explanation: "「副作用（ふくさよう）」はside effect（薬の意図しない二次的な効果）です。例：眠くなる、吐き気がする、など。利用者から「薬を飲んでから〜になった」と言われたら、副作用の可能性を考えて看護師に報告しましょう。", difficulty: 2 },
    { question: "「アレルギー」の中国語は？", options: [{ text: "过敏（guòmǐn）", isCorrect: true }, { text: "疼痛（téngtòng）", isCorrect: false }, { text: "发烧（fāshāo）", isCorrect: false }, { text: "过敏反应（guòmǐn fǎnyìng）もOK", isCorrect: true }], explanation: "「アレルギー」の中国語は过敏（guòmǐn）または过敏反应（guòmǐn fǎnyìng = アレルギー反応）です。介護では食物アレルギーや薬アレルギーの確認が重要です。", difficulty: 2 },
    { question: "「慢性（まんせい）」と「急性（きゅうせい）」の違いは？", options: [{ text: "慢性=長期間続く症状、急性=突然・急に現れる症状", isCorrect: true }, { text: "慢性=軽い症状、急性=重い症状", isCorrect: false }, { text: "慢性=若い人の病気、急性=高齢者の病気", isCorrect: false }, { text: "どちらも同じ意味", isCorrect: false }], explanation: "「慢性（まんせい）」はchronic（長期間続く）、「急性（きゅうせい）」はacute（急に現れる）です。「慢性疾患」=diabetes（糖尿病）など長期管理が必要な病気。「急性」=突然の発症で緊急対応が必要なことが多いです。", difficulty: 2 },
    { question: "「処方（しょほう）」として正しいのは？", options: [{ text: "医師が薬を出すために書く指示（処方箋）", isCorrect: true }, { text: "介護士が薬を選ぶこと", isCorrect: false }, { text: "薬局で薬を購入すること", isCorrect: false }, { text: "患者が自分で薬を調整すること", isCorrect: false }], explanation: "「処方（しょほう）」はprescriptionです。医師が出す処方箋（しょほうせん）に従って薬剤師が薬を準備します。介護士は医師・薬剤師の指示なしに薬を変更・調整することはできません。", difficulty: 2 },
    { question: "「安静（あんせい）」の正しい意味は？", options: [{ text: "体を休めて動かさないこと", isCorrect: true }, { text: "大声で話さないこと", isCorrect: false }, { text: "食事を控えること", isCorrect: false }, { text: "薬を飲まないこと", isCorrect: false }], explanation: "「安静（あんせい）」はrest / bed rest（動かずに体を休めること）です。「安静にしてください」=Please rest. ベトナム語ではnghỉ ngơi / nằm yên。", difficulty: 1 },
    { question: "「退院（たいいん）」のベトナム語は？", options: [{ text: "xuất viện", isCorrect: true }, { text: "nhập viện", isCorrect: false }, { text: "phẫu thuật", isCorrect: false }, { text: "cấp cứu", isCorrect: false }], explanation: "「退院（たいいん）」はdischargeで、ベトナム語ではxuất viện（出院）です。「入院」はnhập viện（入院）、「手術」はphẫu thuật、「救急」はcấp cứuです。", difficulty: 2 },
    { question: "利用者から「治療を受けたくない」と言われた場合、まず何をする？", options: [{ text: "理由を丁寧に聞き、看護師・上司に報告する", isCorrect: true }, { text: "強制的に治療を受けさせる", isCorrect: false }, { text: "そのままにして何もしない", isCorrect: false }, { text: "家族に連絡しないで一人で解決する", isCorrect: false }], explanation: "利用者の「治療拒否」は権利として尊重しつつ、理由を確認することが大切です。介護士は医療行為の判断はできないため、看護師・医師・ケアマネジャーに報告し、チームで対応します。", difficulty: 3 },
    { question: "「通院（つういん）」の意味は？", options: [{ text: "自宅から病院に通って治療を受けること", isCorrect: true }, { text: "病院に入院すること", isCorrect: false }, { text: "在宅で治療を受けること", isCorrect: false }, { text: "リハビリ施設に通うこと（※通所リハ）", isCorrect: false }], explanation: "「通院（つういん）」はoutpatient visit（外来診察に通うこと）です。入院（にゅういん）とは違い、自宅から通って治療を受けます。英語ではgoing to the hospital / outpatient care。", difficulty: 1 },
    { question: "「投薬（とうやく）」で介護士が注意すべきことは？", options: [{ text: "正しい人・正しい薬・正しい量・正しい時間・正しい方法の5R確認", isCorrect: true }, { text: "薬を利用者の食事に混ぜて渡す", isCorrect: false }, { text: "薬の量を自分で増減する", isCorrect: false }, { text: "薬を出すのは介護士の専門業務", isCorrect: false }], explanation: "「投薬（とうやく）」のmedication administrationでは「5R（Right）確認」が基本です：Right Person（正しい人）、Right Drug（正しい薬）、Right Dose（正しい量）、Right Time（正しい時間）、Right Route（正しい方法）。介護士は与薬補助を行いますが、判断は看護師が行います。", difficulty: 3 },
  ],

  "lesson-quiz-n4-03": [
    { question: "「〜てみる」を使う正しい場面は？", options: [{ text: "新しいケア方法を試したいとき", isCorrect: true }, { text: "失敗して後悔しているとき", isCorrect: false }, { text: "同時に二つのことをしているとき", isCorrect: false }, { text: "理由を説明するとき", isCorrect: false }], explanation: "「〜てみる」はtry doing 〜の意味です。「試してみる」「聞いてみる」など、「試しにやってみる」ニュアンスを表します。", difficulty: 1 },
    { question: "「薬を飲んで___」—最も適切な言葉は？（後悔の気持ち）", options: [{ text: "しまいました（後悔・完了）", isCorrect: true }, { text: "みました（試み）", isCorrect: false }, { text: "ながら（同時進行）", isCorrect: false }, { text: "から（順序）", isCorrect: false }], explanation: "「〜てしまいました」は完了または後悔を表します。「薬を間違えて飲んでしまいました」は「間違えたことへの後悔・申し訳なさ」を表す表現です。", difficulty: 2 },
    { question: "「熱があるので___」—正しい使い方は？", options: [{ text: "「熱があるので、安静にしてください。」（客観的な理由）", isCorrect: true }, { text: "「熱があるので、食べてください。」（理由と結果が合わない）", isCorrect: false }, { text: "「熱があるので、外に出ましょう。」（理由と結果が合わない）", isCorrect: false }, { text: "「熱があるので、来週治ります。」（理由と確定できない結果）", isCorrect: false }], explanation: "「〜ので」は理由を表し、その後に自然な結論・行動が来ます。「熱がある→安静にする」は自然なつながりです。ビジネス・介護現場では「〜ので」は「〜から」より丁寧な表現です。", difficulty: 2 },
    { question: "「手を洗ってから___」という文の意味は？", options: [{ text: "手を洗う→その次に別の行動をする（順序）", isCorrect: true }, { text: "手を洗いながら別のことをする（同時）", isCorrect: false }, { text: "手を洗ったことを後悔している", isCorrect: false }, { text: "手を洗う理由を説明している", isCorrect: false }], explanation: "「〜てから」はafter doing 〜（〜した後で次の行動）を表します。「手を洗ってから食事をする」=「まず手を洗い、それから食事をする」という順序です。", difficulty: 1 },
    { question: "「テレビを見ながら食事をする」の「ながら」の意味は？", options: [{ text: "二つの行動を同時にすること", isCorrect: true }, { text: "一つの行動が終わった後に次をすること", isCorrect: false }, { text: "行動の理由を表すこと", isCorrect: false }, { text: "行動の結果を表すこと", isCorrect: false }], explanation: "「〜ながら」はwhile doing 〜（〜しながら）という同時進行を表します。ただし、誤嚥リスクがある方への「テレビを見ながら食事」は避けるべきです。", difficulty: 1 },
    { question: "「利用者さんが疲れているようです」の「ようです」の意味は？", options: [{ text: "観察・根拠に基づく客観的な推測", isCorrect: true }, { text: "噂・伝聞による情報", isCorrect: false }, { text: "見た目の様子だけからの推測", isCorrect: false }, { text: "確実な事実の報告", isCorrect: false }], explanation: "「〜ようです」はit appears that 〜（証拠・観察に基づく推測）です。介護記録や看護師への報告では「〜ようです」「〜と思われます」など客観的な表現を使います。断定は避けましょう。", difficulty: 2 },
    { question: "「熱がなさそうです」の「そうです」（様態）の意味は？", options: [{ text: "見た目・様子から推測している", isCorrect: true }, { text: "誰かから聞いた情報", isCorrect: false }, { text: "科学的な根拠に基づく", isCorrect: false }, { text: "自分の希望・願望", isCorrect: false }], explanation: "「〜そうです（様態）」はit looks like 〜（見た目から推測）です。「熱がなさそう」=「顔を見ると熱はなさそうに見える」というニュアンスです。「〜そうだ（伝聞）」=「〜と聞いた」とは区別しましょう。", difficulty: 2 },
    { question: "「新しいスタッフが来るらしいです」の「らしい」の意味は？", options: [{ text: "信頼できる情報源から聞いた・伝聞", isCorrect: true }, { text: "自分が直接確認した事実", isCorrect: false }, { text: "見た目からの推測", isCorrect: false }, { text: "自分の希望", isCorrect: false }], explanation: "「〜らしい」はit seems / I heard that 〜（信頼できる情報源からの伝聞・推測）です。「〜そうだ（伝聞）」と似ていますが、「らしい」は話し手の判断が入ります。", difficulty: 2 },
    { question: "「〜ので」と「〜から」の違いとして正しいのは？", options: [{ text: "「〜ので」は客観的・丁寧、「〜から」は主観的・口語的", isCorrect: true }, { text: "「〜ので」は口語的、「〜から」は書き言葉", isCorrect: false }, { text: "どちらも全く同じ使い方", isCorrect: false }, { text: "「〜ので」は過去、「〜から」は現在", isCorrect: false }], explanation: "「〜ので」はbecause（客観的・丁寧な理由）、「〜から」はbecause（主観的・口語的な理由）です。上司への報告・正式な場面では「〜ので」が適切です。「〜から」は友人との会話などカジュアルな場面で使います。", difficulty: 3 },
    { question: "「〜ため」を使う正しい場面は？", options: [{ text: "「感染予防のため、手を洗います。」（書き言葉・目的）", isCorrect: true }, { text: "「疲れているため、休みたいから。」（冗長な使い方）", isCorrect: false }, { text: "「ためしてみます。」（試みの表現）", isCorrect: false }, { text: "「〜ため」は話し言葉で使う", isCorrect: false }], explanation: "「〜ため（に）」はin order to 〜（目的）またはbecause of 〜（原因）を表す書き言葉です。「感染予防のため＝感染予防を目的として」というように、公式な文書・報告書でよく使います。", difficulty: 3 },
  ],

  "lesson-quiz-n4-04": [
    { question: "「不安（ふあん）」と「安心（あんしん）」は反対の意味ですか？", options: [{ text: "はい、不安=anxiety（心配）、安心=relief（安らぎ）で反対の意味", isCorrect: true }, { text: "いいえ、どちらも似た意味", isCorrect: false }, { text: "不安は良い意味、安心は悪い意味", isCorrect: false }, { text: "どちらも中国語からの言葉", isCorrect: false }], explanation: "「不安（ふあん）」はanxiety / worry（心配・怖い気持ち）、「安心（あんしん）」はrelief / peace of mind（安らぎ・心配がない状態）で、反対の意味です。利用者の「不安を取り除いて安心してもらう」ことは介護の基本です。", difficulty: 1 },
    { question: "「尊重（そんちょう）」の英語は？", options: [{ text: "respect", isCorrect: true }, { text: "ignore", isCorrect: false }, { text: "control", isCorrect: false }, { text: "observe", isCorrect: false }], explanation: "「尊重（そんちょう）」はrespect（相手の意見・権利・立場を大切にすること）です。「利用者の意思を尊重する」=respect the resident's wishes。ベトナム語ではtôn trọng。", difficulty: 1 },
    { question: "「我慢（がまん）」の意味として正しいのは？", options: [{ text: "辛いことに耐えること（patience / endurance）", isCorrect: true }, { text: "怒って声を上げること", isCorrect: false }, { text: "諦めて何もしないこと", isCorrect: false }, { text: "楽しいことを楽しむこと", isCorrect: false }], explanation: "「我慢（がまん）」はpatience / endurance / to put up with（耐える）です。「我慢しないでください」=Please don't hold back / Please let us know if it's painful。ベトナム語ではchịu đựng / kiên nhẫn。", difficulty: 2 },
    { question: "「遠慮（えんりょ）」の説明として正しいのは？", options: [{ text: "相手に迷惑をかけないよう控えめにすること", isCorrect: true }, { text: "遠くにいる人を慮ること", isCorrect: false }, { text: "強く主張すること", isCorrect: false }, { text: "急いで行動すること", isCorrect: false }], explanation: "「遠慮（えんりょ）」はhesitation / holding back（相手への気遣いから控えめにする行動）です。「遠慮しないでください」=Please don't hesitate to ask。利用者が「遠慮して」助けを求めないことがあります。「何でも言ってください」と声かけしましょう。", difficulty: 2 },
    { question: "「業務（ぎょうむ）」の正しい説明は？", options: [{ text: "仕事上の任務・職務（business duties / work tasks）", isCorrect: true }, { text: "個人的な趣味活動", isCorrect: false }, { text: "学校での勉強", isCorrect: false }, { text: "家族との時間", isCorrect: false }], explanation: "「業務（ぎょうむ）」はduty / business / work task（仕事上の任務）です。「業務内容」=job responsibilities、「業務改善」=work improvement。ベトナム語ではcông việc / nhiệm vụ。", difficulty: 1 },
    { question: "「研修（けんしゅう）」として正しい例は？", options: [{ text: "新しいケア技術を学ぶための勉強会・訓練", isCorrect: true }, { text: "毎日の普通の業務", isCorrect: false }, { text: "個人的な趣味の習い事", isCorrect: false }, { text: "病院での治療", isCorrect: false }], explanation: "「研修（けんしゅう）」はtraining / workshop（業務に関連した学習・訓練）です。「新入社員研修」=new employee training、「OJT（On the Job Training）」も研修の一種です。定期的な研修参加は介護職の成長に重要です。", difficulty: 1 },
    { question: "「改善（かいぜん）」の意味と、介護での使い方は？", options: [{ text: "悪い点を直して良くすること、例：「ケアの質を改善する」", isCorrect: true }, { text: "良いものを悪くすること", isCorrect: false }, { text: "現状を維持すること（変えないこと）", isCorrect: false }, { text: "新しい施設を建てること", isCorrect: false }], explanation: "「改善（かいぜん）」はimprovement（より良くすること）です。日本の介護・製造現場では「カイゼン（KAIZEN）」は世界的に知られる概念です。PDCAサイクル（Plan→Do→Check→Act）を使った継続的改善が重要です。", difficulty: 2 },
    { question: "「申請（しんせい）」を使う正しい場面は？", options: [{ text: "介護保険の利用や有給休暇を正式に書類で求めるとき", isCorrect: true }, { text: "利用者に薬を渡すとき", isCorrect: false }, { text: "緊急時に救急車を呼ぶとき", isCorrect: false }, { text: "日常の業務報告をするとき", isCorrect: false }], explanation: "「申請（しんせい）」はapplication（正式な書類・手続きによる請求）です。「介護保険の申請」=applying for long-term care insurance。有給休暇（paid leave）も「申請書（しんせいしょ）」を提出して申請します。", difficulty: 2 },
    { question: "「評価（ひょうか）」の介護現場での意味は？", options: [{ text: "利用者の状態や能力を専門的に判断・測定すること（assessment）", isCorrect: true }, { text: "仕事の良し悪しを批判すること", isCorrect: false }, { text: "試験の点数をつけること", isCorrect: false }, { text: "スタッフを昇進させること", isCorrect: false }], explanation: "「評価（ひょうか）」はassessment / evaluation（状態を専門的に判断すること）です。介護では「アセスメント（assessment）」=利用者の状態・ニーズの評価が重要です。ICF（国際生活機能分類）を使った評価も行われます。", difficulty: 3 },
    { question: "「勤務（きんむ）」に関連する正しい日本語の組み合わせは？", options: [{ text: "勤務時間（きんむじかん）=working hours、残業（ざんぎょう）=overtime", isCorrect: true }, { text: "勤務時間=holiday、残業=vacation", isCorrect: false }, { text: "勤務時間=lunch break、残業=sick leave", isCorrect: false }, { text: "どちらも同じ意味", isCorrect: false }], explanation: "「勤務（きんむ）」はwork / duty（仕事・勤め）です。「勤務時間」=working hours、「残業」=overtime（定時後の追加業務）、「有給休暇（ゆうきゅうきゅうか）」=paid leave（有給）。介護業界では様々な勤務形態があります。", difficulty: 2 },
  ],

  // ============================================================
  // JLPT N3 対策コース クイズ (各10問 × 5セット)
  // ============================================================

  "lesson-quiz-n3-01": [
    { question: "「企業（きぎょう）」と「組織（そしき）」の違いは？", options: [{ text: "企業=会社（company）、組織=グループ全体の構造（organization）", isCorrect: true }, { text: "どちらも全く同じ意味", isCorrect: false }, { text: "企業=政府機関、組織=民間会社", isCorrect: false }, { text: "企業=大きい、組織=小さい", isCorrect: false }], explanation: "「企業（きぎょう）」はcompany / enterprise（利益を目的とする会社）、「組織（そしき）」はorganization（目的を持つ人の集まり全般、会社・NPO・政府機関など）です。", difficulty: 2 },
    { question: "「方針（ほうしん）」の英語は？", options: [{ text: "policy / direction", isCorrect: true }, { text: "opinion", isCorrect: false }, { text: "problem", isCorrect: false }, { text: "result", isCorrect: false }], explanation: "「方針（ほうしん）」はpolicy / direction / guidelines（進むべき方向・基本的な考え方）です。「施設の方針」=facility policy、「外国人受け入れ方針」=policy for accepting foreign workers。", difficulty: 1 },
    { question: "「業績（ぎょうせき）」を示すものとして正しいのは？", options: [{ text: "売上・利用者数・サービス品質評価などの実績", isCorrect: true }, { text: "スタッフの個人的な趣味", isCorrect: false }, { text: "施設の建物の大きさ", isCorrect: false }, { text: "代表者の年齢", isCorrect: false }], explanation: "「業績（ぎょうせき）」はbusiness results / performance（仕事の成果・実績）です。「業績向上」=improving performance。介護施設では「利用者の満足度」「サービスの質」なども業績指標になります。", difficulty: 2 },
    { question: "「交渉（こうしょう）」の意味は？", options: [{ text: "条件や問題について話し合い、合意を目指すこと", isCorrect: true }, { text: "一方的に命令すること", isCorrect: false }, { text: "問題を無視すること", isCorrect: false }, { text: "一人で決めること", isCorrect: false }], explanation: "「交渉（こうしょう）」はnegotiation（条件・問題を双方で話し合い、合意を目指すプロセス）です。「賃金交渉」=wage negotiation、「条件の交渉」=negotiating terms。ビジネスの基本スキルです。", difficulty: 2 },
    { question: "「承認（しょうにん）」と「却下（きゃっか）」は反対語ですか？", options: [{ text: "はい、承認=approval（OK）、却下=rejection（NG）で反対語", isCorrect: true }, { text: "いいえ、どちらも同じ意味", isCorrect: false }, { text: "承認は悪い意味、却下は良い意味", isCorrect: false }, { text: "どちらも法律用語", isCorrect: false }], explanation: "「承認（しょうにん）」はapproval / acceptance（許可・認める）、「却下（きゃっか）」はrejection / dismissal（断る・認めない）で反対の意味です。申請書が「承認された」「却下された」と使います。", difficulty: 1 },
    { question: "「責任者（せきにんしゃ）」の中国語は？", options: [{ text: "负责人（fùzé rén）", isCorrect: true }, { text: "员工（yuángōng）", isCorrect: false }, { text: "客户（kèhù）", isCorrect: false }, { text: "合同（hétong）", isCorrect: false }], explanation: "「責任者（せきにんしゃ）」はperson in charge / responsible personです。中国語では负责人（fùzé rén）です。「员工」=従業員、「客户」=顧客、「合同」=契約書。", difficulty: 2 },
    { question: "「提携（ていけい）」を使う場面は？", options: [{ text: "異なる組織が協力関係を結ぶとき（partnership）", isCorrect: true }, { text: "社員が辞めるとき", isCorrect: false }, { text: "施設が閉鎖するとき", isCorrect: false }, { text: "利用者が転院するとき", isCorrect: false }], explanation: "「提携（ていけい）」はpartnership / tie-up（異なる組織が協力して目標を達成する関係）です。「医療機関と介護施設の提携」=partnership between medical institutions and care facilities。", difficulty: 2 },
    { question: "「効率（こうりつ）」を高めるために介護現場でできることは？", options: [{ text: "業務の優先順位を決め、チームで情報共有する", isCorrect: true }, { text: "仕事をできるだけ一人でやる", isCorrect: false }, { text: "利用者へのケアを省略する", isCorrect: false }, { text: "書類を減らすため記録をしない", isCorrect: false }], explanation: "「効率（こうりつ）」はefficiency（少ない時間・資源で多くの成果を得ること）です。介護現場では「業務の効率化」=streamlining work processes。チームワークと情報共有が効率向上の鍵です。", difficulty: 3 },
    { question: "「経営（けいえい）」の英語は？", options: [{ text: "management / administration", isCorrect: true }, { text: "education", isCorrect: false }, { text: "construction", isCorrect: false }, { text: "research", isCorrect: false }], explanation: "「経営（けいえい）」はmanagement / administration（組織・会社を運営・管理すること）です。「施設経営」=facility management、「経営者」=owner / manager。ベトナム語ではquản lý / kinh doanh。", difficulty: 1 },
    { question: "「改革（かいかく）」と「改善（かいぜん）」の違いは？", options: [{ text: "改革=根本的・大きな変革（reform）、改善=小さな改良・修正（improvement）", isCorrect: true }, { text: "どちらも同じ意味", isCorrect: false }, { text: "改革=悪くすること、改善=良くすること", isCorrect: false }, { text: "改革は小さい変化、改善は大きい変化", isCorrect: false }], explanation: "「改革（かいかく）」はreform（制度・構造を根本から変える大きな変革）、「改善（かいぜん）」はimprovement（問題点を少しずつ良くすること）です。介護では「カイゼン活動」は継続的小改善、「制度改革」は大きな変化を指します。", difficulty: 3 },
  ],

  "lesson-quiz-n3-02": [
    { question: "「政策（せいさく）」と「方針（ほうしん）」の違いは？", options: [{ text: "政策=政府・行政の計画（policy）、方針=組織の基本的な方向性（direction）", isCorrect: true }, { text: "どちらも全く同じ", isCorrect: false }, { text: "政策は個人の意見、方針は国の決定", isCorrect: false }, { text: "政策は小さいこと、方針は大きいこと", isCorrect: false }], explanation: "「政策（せいさく）」はpolicy（政府・行政機関が立案する計画）、「方針（ほうしん）」はdirection / policy（組織が進む方向）です。「介護政策」=care policy（国の介護に関する計画）。", difficulty: 2 },
    { question: "「義務（ぎむ）」と「権利（けんり）」の関係は？", options: [{ text: "義務=やらなければならないこと、権利=できること・持っているもの", isCorrect: true }, { text: "どちらも同じ意味", isCorrect: false }, { text: "義務=できること、権利=やらなければならないこと", isCorrect: false }, { text: "どちらも法律とは関係ない", isCorrect: false }], explanation: "「義務（ぎむ）」はobligation / duty（必ずしなければならないこと）、「権利（けんり）」はright（持っている・できること）です。「介護を受ける権利」=right to receive care、「記録をつける義務」=duty to keep records。", difficulty: 1 },
    { question: "「福祉（ふくし）」の英語は？", options: [{ text: "welfare / social welfare", isCorrect: true }, { text: "finance", isCorrect: false }, { text: "security", isCorrect: false }, { text: "education", isCorrect: false }], explanation: "「福祉（ふくし）」はwelfare / social welfare（社会的弱者を支援する仕組み全般）です。「介護福祉士」=certified care worker（caregiving welfare specialist）。ベトナム語ではphúc lợi xã hội。", difficulty: 1 },
    { question: "「認定（にんてい）」の介護保険での意味は？", options: [{ text: "介護が必要な度合いを審査・判定すること（要介護認定）", isCorrect: true }, { text: "外国人が日本に入国する許可", isCorrect: false }, { text: "試験に合格して資格を得ること", isCorrect: false }, { text: "施設の場所を決めること", isCorrect: false }], explanation: "介護保険での「認定（にんてい）」はcertification（介護の必要度を判定すること）です。「要介護認定（ようかいごにんてい）」は、市区町村が申請を受けて介護の必要度（要支援1〜2、要介護1〜5）を判定するプロセスです。", difficulty: 2 },
    { question: "「補助（ほじょ）」のベトナム語は？", options: [{ text: "hỗ trợ / trợ cấp", isCorrect: true }, { text: "cấm đoán", isCorrect: false }, { text: "bắt buộc", isCorrect: false }, { text: "quản lý", isCorrect: false }], explanation: "「補助（ほじょ）」はsupport / subsidy / assistance（助けること・援助）です。ベトナム語ではhỗ trợ（支援）またはtrợ cấp（補助金）です。「cấm đoán」=禁止、「bắt buộc」=義務・強制、「quản lý」=管理。", difficulty: 2 },
    { question: "「期限（きげん）」が重要な場面として正しいのは？", options: [{ text: "在留資格の更新・介護保険の申請・有給申請などの締め切り", isCorrect: true }, { text: "天気予報", isCorrect: false }, { text: "食事の時間", isCorrect: false }, { text: "利用者の睡眠時間", isCorrect: false }], explanation: "「期限（きげん）」はdeadline / expiration（期限・締め切り）です。「在留資格の期限」=expiration of residence status、「申請期限」=application deadline。期限を守らないと大きな問題になる可能性があります。", difficulty: 2 },
    { question: "「更新（こうしん）」を使う場面は？", options: [{ text: "在留資格・資格・契約などを延長・新しくするとき", isCorrect: true }, { text: "初めて何かを始めるとき", isCorrect: false }, { text: "仕事を辞めるとき", isCorrect: false }, { text: "施設を移るとき", isCorrect: false }], explanation: "「更新（こうしん）」はrenewal / update（期限が来たものを新しくする・延長する）です。「ビザの更新」=visa renewal、「資格更新」=license renewal。在日外国人にとって重要な手続きです。", difficulty: 2 },
    { question: "「保護（ほご）」の意味として最も正しいのは？", options: [{ text: "危険や不利益から守ること（protection）", isCorrect: true }, { text: "批判・非難すること", isCorrect: false }, { text: "試験で点数をつけること", isCorrect: false }, { text: "新しいサービスを作ること", isCorrect: false }], explanation: "「保護（ほご）」はprotection（守ること）です。「個人情報保護」=personal information protection、「子どもの保護」=child protection、「権利の保護」=rights protection。介護でも利用者のプライバシー保護は重要です。", difficulty: 1 },
    { question: "「支援（しえん）」と「介助（かいじょ）」の違いは？", options: [{ text: "支援=広い意味での援助（support）、介助=身体的なケアの手伝い（physical assistance）", isCorrect: true }, { text: "どちらも同じ意味", isCorrect: false }, { text: "支援=医療行為、介助=日常生活の補助", isCorrect: false }, { text: "支援は家族が行い、介助はスタッフが行う", isCorrect: false }], explanation: "「支援（しえん）」はsupport（精神的・社会的・経済的な広い援助）、「介助（かいじょ）」はphysical assistance（入浴・食事・移乗など身体的なケアの手伝い）です。介護では両方が重要です。", difficulty: 3 },
    { question: "「規則（きそく）」を破った場合の影響として正しいのは？", options: [{ text: "注意・指導・場合によっては雇用契約の解除などのリスク", isCorrect: true }, { text: "何も起こらない", isCorrect: false }, { text: "自動的に昇給する", isCorrect: false }, { text: "施設を移ることができる", isCorrect: false }], explanation: "「規則（きそく）」はrules / regulations（守るべき決まり）です。職場の規則を破ると「注意（ちゅうい）」「指導（しどう）」「懲戒（ちょうかい）=disciplinary action」が行われることがあります。介護の現場では安全・プライバシー・倫理に関する規則が特に重要です。", difficulty: 3 },
  ],

  "lesson-quiz-n3-03": [
    { question: "「臨床（りんしょう）」の意味は？", options: [{ text: "実際の患者・利用者に対して直接行う医療・ケア（clinical）", isCorrect: true }, { text: "実験室での研究", isCorrect: false }, { text: "医学書を読むこと", isCorrect: false }, { text: "行政手続き", isCorrect: false }], explanation: "「臨床（りんしょう）」はclinical（実際の患者・利用者に接して行う医療・ケア）です。「臨床経験」=clinical experience、「臨床研究」=clinical research。「基礎研究（実験室）」と区別されます。", difficulty: 2 },
    { question: "「予防（よぼう）」の介護現場での例として正しいのは？", options: [{ text: "転倒予防・感染予防・褥瘡予防・誤嚥予防", isCorrect: true }, { text: "病気を治すための薬を出すこと", isCorrect: false }, { text: "すでに起きた事故の調査", isCorrect: false }, { text: "入院手続き", isCorrect: false }], explanation: "「予防（よぼう）」はprevention（病気・事故が起きる前に防ぐこと）です。「一次予防」=primary prevention（健康増進・疾病予防）、「二次予防」=secondary prevention（早期発見・早期治療）、「三次予防」=tertiary prevention（重症化予防・リハビリ）があります。", difficulty: 2 },
    { question: "「アセスメント（assessment）」の介護での意味は？", options: [{ text: "利用者の身体・精神・社会的状態を総合的に評価すること", isCorrect: true }, { text: "利用者に薬を与えること", isCorrect: false }, { text: "施設の清掃をすること", isCorrect: false }, { text: "勤務表を作ること", isCorrect: false }], explanation: "「アセスメント（assessment）」はassessment（評価・査定）です。介護では「利用者のニーズ・状態・生活歴を包括的に評価するプロセス」です。ケアプラン作成の前に必ず行われます。ICF（国際生活機能分類）を使った多面的評価が重要です。", difficulty: 2 },
    { question: "「QOL（Quality of Life）」の介護での重要性は？", options: [{ text: "利用者が主観的に感じる生活の質・満足度を高めること", isCorrect: true }, { text: "施設の設備の質", isCorrect: false }, { text: "食事の量", isCorrect: false }, { text: "スタッフの給与水準", isCorrect: false }], explanation: "「QOL（Quality of Life）」は生活の質です。介護では「身体的機能だけでなく、精神的幸福・社会的つながり・自己決定など、利用者が感じる生活全般の満足度を高めること」が目標です。医療的ケアだけでなく、趣味・社会参加・人間関係も重要です。", difficulty: 3 },
    { question: "「インシデント」と「アクシデント」の違いは？", options: [{ text: "インシデント=ヒヤリハット・事故になりかけた出来事、アクシデント=実際に起きた事故", isCorrect: true }, { text: "どちらも同じ意味", isCorrect: false }, { text: "インシデントは大きい事故、アクシデントは小さい事故", isCorrect: false }, { text: "インシデントは医療、アクシデントは介護の用語", isCorrect: false }], explanation: "「インシデント（incident）」はヒヤリハット（near miss）=事故になりかけたが実害のなかった出来事。「アクシデント（accident）」は実際に利用者に害が生じた事故です。両方の報告が事故予防に重要です。", difficulty: 3 },
    { question: "「BCP（Business Continuity Plan）」を介護施設で策定する目的は？", options: [{ text: "災害・感染症などの緊急事態でもサービスを継続するための計画", isCorrect: true }, { text: "業務の効率化計画", isCorrect: false }, { text: "新規利用者の獲得計画", isCorrect: false }, { text: "スタッフの採用計画", isCorrect: false }], explanation: "「BCP（Business Continuity Plan）」は事業継続計画です。地震・台風・感染症などの緊急事態が発生した場合でも、最低限のサービスを継続・早期回復するための計画です。2024年度から介護施設はBCP策定が義務化されました。", difficulty: 3 },
    { question: "「エビデンス（evidence）」に基づくケアとは？", options: [{ text: "科学的根拠・研究結果に基づいたケアを行うこと", isCorrect: true }, { text: "経験だけに頼ったケア", isCorrect: false }, { text: "利用者の希望を無視したケア", isCorrect: false }, { text: "コストを重視したケア", isCorrect: false }], explanation: "「エビデンス（evidence）」は科学的証拠・根拠です。「エビデンスに基づく実践（EBP）」=evidence-based practice。研究・データで効果が証明されたケア方法を選択することが重要です。「経験則だけ」では不十分で、最新の知識を常に更新することが専門職としての義務です。", difficulty: 3 },
    { question: "「PDCAサイクル」の順番として正しいのは？", options: [{ text: "Plan（計画）→Do（実行）→Check（評価）→Act（改善）", isCorrect: true }, { text: "Do→Plan→Act→Check", isCorrect: false }, { text: "Check→Act→Plan→Do", isCorrect: false }, { text: "Act→Check→Do→Plan", isCorrect: false }], explanation: "「PDCAサイクル」はPlan（計画）→Do（実行）→Check（評価・確認）→Act（改善・次のPlanへ）の繰り返しです。介護でもケアプランのPDCA（計画→実施→評価→見直し）が基本です。継続的な品質向上（QI）に使われます。", difficulty: 2 },
    { question: "「自立支援（じりつしえん）」の介護での意味は？", options: [{ text: "利用者が自分でできることを最大限に活かして生活できるよう支援すること", isCorrect: true }, { text: "全てを介護者が代わりにやること", isCorrect: false }, { text: "利用者を施設から独立させること", isCorrect: false }, { text: "財政的な自立を支援すること", isCorrect: false }], explanation: "「自立支援（じりつしえん）」はsupport for independence（利用者が持つ能力を活かし、自分らしく生活できるよう支援すること）です。「できないことをやってあげる」のではなく「できることを引き出す」支援が重要です。残存能力（remaining abilities）の活用が介護の基本です。", difficulty: 3 },
    { question: "「リハビリテーション（rehabilitation）」の目的は？", options: [{ text: "失われた機能を回復・維持し、社会参加を促すこと", isCorrect: true }, { text: "薬を使って症状を抑えること", isCorrect: false }, { text: "利用者を施設に閉じ込めること", isCorrect: false }, { text: "介護スタッフの訓練", isCorrect: false }], explanation: "「リハビリテーション（rehabilitation）」はrehabilitation（機能回復・維持・社会復帰）です。「機能訓練（きのうくんれん）」とも言います。理学療法士（PT）・作業療法士（OT）・言語聴覚士（ST）が専門職として担当します。介護士は日常的なリハビリ的アプローチ（立つ・歩く・食べるなど）で支援します。", difficulty: 2 },
  ],

  "lesson-quiz-n3-04": [
    { question: "「〜によって」を使う正しい例は？", options: [{ text: "「施設によって方針が異なります。」（相違）", isCorrect: true }, { text: "「施設によって行きます。」（移動手段）", isCorrect: false }, { text: "「施設によって食べます。」（食事の場所）", isCorrect: false }, { text: "「施設によって話します。」（会話の場所）", isCorrect: false }], explanation: "「〜によって」のdepending on 〜（相違）の用法：「施設によって方針が異なる」=policies differ depending on the facility。他に①手段（〜を使って）②原因（〜が理由で）③受け身の動作主（〜に）などの用法があります。", difficulty: 2 },
    { question: "「ために」と「ように」の違いとして正しいのは？", options: [{ text: "ために=意志的行動の目的、ように=変化の目標や自分でコントロールできない願望", isCorrect: true }, { text: "どちらも全く同じ意味", isCorrect: false }, { text: "ために=過去、ように=未来", isCorrect: false }, { text: "ために=口語的、ように=書き言葉", isCorrect: false }], explanation: "「〜ために」はin order to（意志的行動の目的：自分が意図して行う）。「〜ように」はso that（変化の目標・自分でコントロールできない変化の願望）。「日本語を勉強するために本を買う（意志）」vs「早く帰れるように仕事を終わらせる（変化の目標）」。", difficulty: 3 },
    { question: "「もっと休んでいれば、疲れなかったのに」の意味は？", options: [{ text: "実際は休まなかった→後悔・反事実の仮定", isCorrect: true }, { text: "これから休む予定", isCorrect: false }, { text: "毎日休んでいる", isCorrect: false }, { text: "休むことを提案している", isCorrect: false }], explanation: "「〜ば〜のに」はif only 〜（実際はそうでなかったことへの後悔）を表します。「休んでいれば→（実際は休まなかった）→疲れなかったのに→（実際は疲れた）」という反事実の仮定と後悔です。", difficulty: 2 },
    { question: "「会議の前に資料を準備しておきます」の「ておく」の意味は？", options: [{ text: "将来のために今のうちに準備する（prepare in advance）", isCorrect: true }, { text: "誰かが既に準備した結果が残っている", isCorrect: false }, { text: "準備が完了して後悔している", isCorrect: false }, { text: "準備しながら別のことをする", isCorrect: false }], explanation: "「〜ておく」はdo 〜 in advance（将来のために今準備する）です。「会議の前に資料を準備しておく」=prepare the materials in advance for the meeting。「〜てある」（誰かが意図的にやった結果が残っている）と区別しましょう。", difficulty: 2 },
    { question: "「資料が準備してあります」の「てある」の意味は？", options: [{ text: "誰かが意図的に準備した結果が今も残っている状態", isCorrect: true }, { text: "今まさに準備している最中", isCorrect: false }, { text: "これから準備する予定", isCorrect: false }, { text: "準備が必要だという意味", isCorrect: false }], explanation: "「〜てある」はhas been done（誰かが意図的に行った行為の結果が現在も続いている）です。「資料が準備してある」=The materials have been prepared（誰かが意図して準備した結果、今も用意されている状態）です。", difficulty: 2 },
    { question: "「〜だけでなく〜も」を使う正しい例は？", options: [{ text: "「日本語だけでなく、ケアの技術も大切です。」", isCorrect: true }, { text: "「日本語だけでなく、雨です。」（論理的につながらない）", isCorrect: false }, { text: "「日本語だけでなく、昨日。」（時間の表現がおかしい）", isCorrect: false }, { text: "「日本語だけでなく、ください。」（命令形は使わない）", isCorrect: false }], explanation: "「〜だけでなく〜も」はnot only 〜 but also 〜（〜のみならず〜も）です。「日本語だけでなく、ケアの技術も大切」=Not only Japanese language, but care skills are also important。前後が論理的につながる必要があります。", difficulty: 2 },
    { question: "「〜はもちろん〜も」の意味は？", options: [{ text: "〜は言うまでもなく、〜も（強調・当然）", isCorrect: true }, { text: "〜はダメで、〜も禁止", isCorrect: false }, { text: "〜はあるけど、〜はない", isCorrect: false }, { text: "〜か〜かどちらか一方", isCorrect: false }], explanation: "「〜はもちろん〜も」はof course 〜, but also 〜（〜は当然として、さらに〜も）という強調の表現です。「日本語はもちろん、英語も話せます」=Of course Japanese, but I can also speak English。", difficulty: 2 },
    { question: "「による」（名詞修飾）の使い方として正しいのは？", options: [{ text: "「介護保険法による規制」（〜に基づく・〜が根拠の）", isCorrect: true }, { text: "「介護保険法による食事をする」（意味がつながらない）", isCorrect: false }, { text: "「介護保険法によるです」（文法的に間違い）", isCorrect: false }, { text: "「介護保険法によるから」（二重接続）", isCorrect: false }], explanation: "「〜による + 名詞」はbased on 〜 / due to 〜（〜を根拠とした・〜による）という名詞修飾です。「法律による規制」=regulations based on the law、「感染による症状」=symptoms due to infection。", difficulty: 3 },
    { question: "「〜たら〜のに」と「〜ば〜のに」の違いは？", options: [{ text: "ほぼ同じ意味で、どちらも反事実の仮定・後悔を表す", isCorrect: true }, { text: "たら=将来の仮定、ば=過去の仮定", isCorrect: false }, { text: "たら=口語的、ば=書き言葉", isCorrect: false }, { text: "たら=後悔、ば=後悔しない", isCorrect: false }], explanation: "「〜たら〜のに」と「〜ば〜のに」はどちらも反事実の仮定（実際はそうでなかったこと）と後悔を表します。ほぼ同じ意味で使えますが、「ば」はより条件的なニュアンスが強い場合があります。", difficulty: 3 },
    { question: "「〜ていく」の意味として正しいのは？", options: [{ text: "これからも続いていく変化・行動を表す（continuing into the future）", isCorrect: true }, { text: "過去に行った行動を表す", isCorrect: false }, { text: "今この瞬間の行動を表す", isCorrect: false }, { text: "完了した行動を表す", isCorrect: false }], explanation: "「〜ていく」はwill continue to 〜（今から将来に向かって続く変化・行動）を表します。「高齢化が進んでいく」=Aging will continue to advance。「〜てくる」（過去から現在に向かってくる変化）と対になる表現です。", difficulty: 3 },
  ],

  "lesson-quiz-n3-05": [
    { question: "「少子高齢化（しょうしこうれいか）」の説明として正しいのは？", options: [{ text: "子どもが減り（少子化）、高齢者が増える（高齢化）社会現象", isCorrect: true }, { text: "子どもが増え、高齢者が減ること", isCorrect: false }, { text: "人口が急激に増加すること", isCorrect: false }, { text: "若者が海外に移住すること", isCorrect: false }], explanation: "「少子高齢化（しょうしこうれいか）」はdeclining birthrate and aging population（子どもが減り・高齢者が増える社会現象）です。日本は世界で最も進んだ少子高齢化国の一つです。これが外国人介護職の需要増加の主な原因です。", difficulty: 1 },
    { question: "「多文化共生（たぶんかきょうせい）」の意味は？", options: [{ text: "異なる文化背景を持つ人々が互いを尊重して共に暮らすこと", isCorrect: true }, { text: "一つの文化が他の文化を支配すること", isCorrect: false }, { text: "外国人を排除する社会", isCorrect: false }, { text: "文化の違いを無視すること", isCorrect: false }], explanation: "「多文化共生（たぶんかきょうせい）」はmulticultural coexistence（異なる文化を持つ人々が互いの違いを認め、対等な関係で共に生きること）です。日本の地域社会・職場での外国人受け入れに重要な概念です。", difficulty: 1 },
    { question: "「ダイバーシティ（diversity）」が介護現場で意味することは？", options: [{ text: "国籍・性別・年齢・障害などの多様な背景を持つ人材を活かすこと", isCorrect: true }, { text: "全員が同じ文化・価値観を持つこと", isCorrect: false }, { text: "一種類のサービスだけを提供すること", isCorrect: false }, { text: "男性スタッフだけを採用すること", isCorrect: false }], explanation: "「ダイバーシティ（diversity）」は多様性です。介護現場では「多様な背景を持つスタッフ（外国人・高齢者・障害者など）が活躍できる職場づくり」を意味します。「インクルージョン（inclusion）」=包括・包摂と合わせて使われます。", difficulty: 2 },
    { question: "「SDGs」とは何の略ですか？", options: [{ text: "Sustainable Development Goals（持続可能な開発目標）", isCorrect: true }, { text: "Social Development Guidelines（社会開発指針）", isCorrect: false }, { text: "Standard Daily Goals（標準日常目標）", isCorrect: false }, { text: "Special Development Groups（特別開発グループ）", isCorrect: false }], explanation: "「SDGs」はSustainable Development Goals（持続可能な開発目標）です。2030年までに達成を目指す17の国際目標（貧困・環境・教育・平和など）です。介護もSDGs（特に目標3「すべての人に健康と福祉を」）に貢献しています。", difficulty: 1 },
    { question: "「外国人労働者（がいこくじんろうどうしゃ）」の受け入れが増えている主な理由は？", options: [{ text: "少子高齢化による労働力不足（特に介護分野）", isCorrect: true }, { text: "外国人の給与が低いから", isCorrect: false }, { text: "日本人が介護職を希望しないから（一部の側面はあるが最も主な理由ではない）", isCorrect: false }, { text: "政府の外国人優遇政策", isCorrect: false }], explanation: "日本で「外国人労働者（がいこくじんろうどうしゃ）」が増える主な理由は「少子高齢化による労働力不足（labor shortage due to aging population）」です。特に介護・農業・建設などの分野で人手不足が深刻です。「特定技能（とくていぎのう）」制度はこの問題への対策です。", difficulty: 2 },
    { question: "「デジタル化（でじたるか）」が介護に与える影響は？", options: [{ text: "記録の電子化・見守りセンサー・ICT活用で業務効率と安全性が向上", isCorrect: true }, { text: "デジタル化で介護士が全員不要になる", isCorrect: false }, { text: "デジタル化は介護には全く関係ない", isCorrect: false }, { text: "デジタル化で利用者の数が減る", isCorrect: false }], explanation: "介護のデジタル化（digitalization）には：①介護記録の電子化（electronic records）②IoTセンサーによる見守り（monitoring）③AI活用（AI utilization）④ロボット介護（care robots）⑤テレビ電話での遠隔診療（telemedicine）などがあります。業務効率化と質の向上が期待されています。", difficulty: 2 },
    { question: "「インクルージョン（inclusion）」の意味は？", options: [{ text: "すべての人を社会・組織・活動に包含・参加させること", isCorrect: true }, { text: "特定の人だけを優遇すること", isCorrect: false }, { text: "障害者を別の施設に分けること", isCorrect: false }, { text: "新しい技術を導入すること", isCorrect: false }], explanation: "「インクルージョン（inclusion）」は包摂・包括（誰もが排除されず社会・組織に参加できること）です。「ダイバーシティ＆インクルージョン（D&I）」=diversity and inclusion。障害者・外国人・高齢者・LGBTQ+など多様な人が参加できる社会を目指す概念です。", difficulty: 2 },
    { question: "「温暖化（おんだんか）」が高齢者の介護に与える影響は？", options: [{ text: "熱中症リスクの増加・感染症の拡大・自然災害の増加など", isCorrect: true }, { text: "全く影響がない", isCorrect: false }, { text: "高齢者が元気になる", isCorrect: false }, { text: "介護施設のコストが下がる", isCorrect: false }], explanation: "「温暖化（おんだんか）」=global warming（地球温暖化）は介護にも影響します。高齢者は「熱中症（heatstroke）リスク」が高く、気候変動による「感染症の拡大」「自然災害の増加」もBCP（事業継続計画）の観点で重要です。", difficulty: 3 },
    { question: "「人口減少（じんこうげんしょう）」への日本の対策として正しいのは？", options: [{ text: "外国人労働者受け入れ・出産支援・AI/ロボット活用・定年延長", isCorrect: true }, { text: "人口減少は問題ではない", isCorrect: false }, { text: "外国人の受け入れを禁止する", isCorrect: false }, { text: "全員が農業をする", isCorrect: false }], explanation: "「人口減少（じんこうげんしょう）」=population decline への日本の対策には：①外国人労働者受け入れ（技能実習・特定技能）②少子化対策（出産・育児支援）③AI・ロボット活用④高齢者・女性の就労促進⑤定年延長があります。介護はこれらすべてに関わる重要分野です。", difficulty: 3 },
    { question: "「持続可能（じぞくかのう）」な介護サービスを実現するために必要なことは？", options: [{ text: "財源確保・人材育成・テクノロジー活用・地域連携のすべてが必要", isCorrect: true }, { text: "コストを全て削減すること", isCorrect: false }, { text: "利用者の数を制限すること", isCorrect: false }, { text: "外国人スタッフを雇わないこと", isCorrect: false }], explanation: "「持続可能（じぞくかのう）」=sustainable（長期的に維持できること）な介護サービスには：①財源確保（介護保険制度の維持）②人材確保・育成（外国人含む）③ICT・ロボット活用による効率化④地域包括ケアシステムの推進⑤予防介護の推進、が必要です。", difficulty: 3 },
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

  // ============================================================
  // JLPT N4 対策コース レッスンマップ (12レッスン)
  // ============================================================
  "l4000000-0000-0000-0000-000000000001": { type: "vocabulary", vocabKey: "lesson-vocab-n4-01", title: "第1課: コミュニケーション・業務用語（15語）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "連絡・説明・確認・報告・担当など職場必須語彙" },
  "l4000000-0000-0000-0000-000000000002": { type: "vocabulary", vocabKey: "lesson-vocab-n4-02", title: "第2課: 医療・健康・ケア用語（15語）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "症状・診断・治療・投薬・回復など医療語彙" },
  "l4000000-0000-0000-0000-000000000003": { type: "vocabulary", vocabKey: "lesson-vocab-n4-03", title: "第3課: 感情・態度・人間関係（15語）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "不安・安心・信頼・尊重・協力など関係語彙" },
  "l4000000-0000-0000-0000-000000000004": { type: "vocabulary", vocabKey: "lesson-vocab-n4-04", title: "第4課: 職場・施設・社会生活（15語）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "業務・研修・目標・改善・引継ぎなど職場語彙" },
  "l4000000-0000-0000-0000-000000000005": { type: "grammar", grammarKey: "lesson-grammar-n4-01", title: "文法1: 〜てみる・〜てしまう", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "試みる行動と完了・後悔を表す表現" },
  "l4000000-0000-0000-0000-000000000006": { type: "grammar", grammarKey: "lesson-grammar-n4-02", title: "文法2: 〜ので・〜から・〜ため", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "理由・原因を丁寧に述べる表現" },
  "l4000000-0000-0000-0000-000000000007": { type: "grammar", grammarKey: "lesson-grammar-n4-03", title: "文法3: 〜ながら・〜てから・〜た後で", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "時間の順序と同時進行を表す表現" },
  "l4000000-0000-0000-0000-000000000008": { type: "grammar", grammarKey: "lesson-grammar-n4-04", title: "文法4: 〜そうだ・〜らしい・〜ようだ", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "推測・様子・伝聞を表す表現" },
  "l4000000-0000-0000-0000-000000000009": { type: "quiz", quizKey: "lesson-quiz-n4-01", title: "確認テスト①: コミュニケーション・業務語彙（10問）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "N4語彙①コミュニケーション・業務の理解度チェック" },
  "l4000000-0000-0000-0000-000000000010": { type: "quiz", quizKey: "lesson-quiz-n4-02", title: "確認テスト②: 医療・健康語彙（10問）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "N4語彙②医療・健康・感情の理解度チェック" },
  "l4000000-0000-0000-0000-000000000011": { type: "quiz", quizKey: "lesson-quiz-n4-03", title: "確認テスト③: N4文法総合テスト（10問）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "〜てみる・〜ので・〜ながら・〜そうだ の文法チェック" },
  "l4000000-0000-0000-0000-000000000012": { type: "quiz", quizKey: "lesson-quiz-n4-04", title: "確認テスト④: N4総合まとめ（10問）", courseId: "c4000000-0000-0000-0000-000000000001", subtitle: "N4レベル語彙・文法の総合力チェック" },

  // ============================================================
  // JLPT N3 対策コース レッスンマップ (15レッスン)
  // ============================================================
  "l6000000-0000-0000-0000-000000000001": { type: "vocabulary", vocabKey: "lesson-vocab-n3-01", title: "第1課: ビジネス・職場表現（15語）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "企業・組織・方針・業績・責任者など職場語彙" },
  "l6000000-0000-0000-0000-000000000002": { type: "vocabulary", vocabKey: "lesson-vocab-n3-02", title: "第2課: 社会・制度・法律（15語）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "政策・法律・福祉・保険・申請・認定など制度語彙" },
  "l6000000-0000-0000-0000-000000000003": { type: "vocabulary", vocabKey: "lesson-vocab-n3-03", title: "第3課: 感情・心理・コミュニケーション（15語）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "葛藤・共感・配慮・受容・主張・誤解など心理語彙" },
  "l6000000-0000-0000-0000-000000000004": { type: "vocabulary", vocabKey: "lesson-vocab-n3-04", title: "第4課: 医療・科学・専門技術（15語）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "臨床・リハビリ・QOL・ICF・アセスメントなど専門語彙" },
  "l6000000-0000-0000-0000-000000000005": { type: "vocabulary", vocabKey: "lesson-vocab-n3-05", title: "第5課: 社会問題・時事用語（15語）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "少子高齢化・多文化共生・SDGs・デジタル化など時事語彙" },
  "l6000000-0000-0000-0000-000000000006": { type: "grammar", grammarKey: "lesson-grammar-n3-01", title: "文法1: 〜によって・〜による", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "手段・原因・相違を表す表現" },
  "l6000000-0000-0000-0000-000000000007": { type: "grammar", grammarKey: "lesson-grammar-n3-02", title: "文法2: 〜ために・〜ように", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "目的と変化の目標を正確に使い分ける" },
  "l6000000-0000-0000-0000-000000000008": { type: "grammar", grammarKey: "lesson-grammar-n3-03", title: "文法3: 〜ば〜のに・〜たら〜のに", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "反事実の仮定・後悔・惜しみを表す表現" },
  "l6000000-0000-0000-0000-000000000009": { type: "grammar", grammarKey: "lesson-grammar-n3-04", title: "文法4: 〜ておく・〜てある・〜ていく", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "準備・意図的結果・継続的変化を表す表現" },
  "l6000000-0000-0000-0000-000000000010": { type: "grammar", grammarKey: "lesson-grammar-n3-05", title: "文法5: 〜だけでなく〜も・〜はもちろん〜も", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "列挙・強調・付加を表す接続表現" },
  "l6000000-0000-0000-0000-000000000011": { type: "quiz", quizKey: "lesson-quiz-n3-01", title: "確認テスト①: ビジネス・職場語彙（10問）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "企業・組織・職場語彙チェック" },
  "l6000000-0000-0000-0000-000000000012": { type: "quiz", quizKey: "lesson-quiz-n3-02", title: "確認テスト②: 社会・制度語彙（10問）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "社会・法律・福祉・制度語彙チェック" },
  "l6000000-0000-0000-0000-000000000013": { type: "quiz", quizKey: "lesson-quiz-n3-03", title: "確認テスト③: 医療・専門用語（10問）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "医療・介護専門用語チェック" },
  "l6000000-0000-0000-0000-000000000014": { type: "quiz", quizKey: "lesson-quiz-n3-04", title: "確認テスト④: N3文法総合テスト（10問）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "〜によって・〜ために・〜ば〜のに・〜ておく文法チェック" },
  "l6000000-0000-0000-0000-000000000015": { type: "quiz", quizKey: "lesson-quiz-n3-05", title: "確認テスト⑤: N3総合まとめ（10問）", courseId: "c6000000-0000-0000-0000-000000000001", subtitle: "N3レベル語彙・文法・社会知識の総合力チェック" },
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
