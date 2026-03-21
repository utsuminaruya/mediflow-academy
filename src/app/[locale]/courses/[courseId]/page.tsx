import Link from "next/link";
import { BookOpen, Clock, ChevronRight, CheckCircle, PlayCircle, Lock, Star, Users } from "lucide-react";

const COURSE_DATA: Record<string, {
  title: string;
  description: string;
  category: string;
  emoji: string;
  color: string;
  hours: number;
  learners: number;
  rating: number;
  targetLevel: string;
  whatYouLearn: string[];
  lessons: {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    duration: number;
    wordCount?: number;
    questionCount?: number;
    isCompleted: boolean;
    isLocked: boolean;
  }[];
}> = {
  "c1000000-0000-0000-0000-000000000001": {
    title: "JLPT N5 完全対策コース",
    description: "ひらがな・カタカナから基本語彙50語、文法10項目まで体系的に学習。介護現場で使う基本的な日本語力を身につけます。",
    category: "JLPT",
    emoji: "🎌",
    color: "from-red-400 to-red-600",
    hours: 30,
    learners: 1234,
    rating: 4.8,
    targetLevel: "完全初心者〜N5レベル",
    whatYouLearn: [
      "体の部位・日常動作・介護用語など50語の語彙",
      "〜てください・〜ています・〜ましょうなど10の文法パターン",
      "介護現場での基本的なコミュニケーション表現",
      "申し送り・記録で使う過去形の正確な使い方",
      "痛み・症状を正確に聞き取り・報告する力",
    ],
    lessons: [
      // 語彙レッスン (5課 × 10語 = 50語)
      {
        id: "l1000000-0000-0000-0000-000000000001",
        title: "第1課: 体の部位",
        subtitle: "頭・手・足・背中など10語",
        type: "vocabulary",
        duration: 20,
        wordCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000002",
        title: "第2課: 日常動作",
        subtitle: "起きる・食べる・飲む・歩くなど10語",
        type: "vocabulary",
        duration: 20,
        wordCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000003",
        title: "第3課: 介護・医療用語",
        subtitle: "利用者・介助・入浴・移乗など10語",
        type: "vocabulary",
        duration: 25,
        wordCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000004",
        title: "第4課: 痛み・症状",
        subtitle: "痛い・熱・咳・めまいなど10語",
        type: "vocabulary",
        duration: 20,
        wordCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000005",
        title: "第5課: 方向・場所・時間",
        subtitle: "右・左・朝・昼・夜など10語",
        type: "vocabulary",
        duration: 20,
        wordCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      // 文法レッスン (5項目)
      {
        id: "l1000000-0000-0000-0000-000000000006",
        title: "文法1: 〜てください",
        subtitle: "丁寧な依頼・指示の基本表現",
        type: "grammar",
        duration: 25,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000007",
        title: "文法2: 〜ています",
        subtitle: "現在進行中の動作と状態を表す",
        type: "grammar",
        duration: 25,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000008",
        title: "文法3: 〜ましょう",
        subtitle: "一緒に行動を誘う提案表現",
        type: "grammar",
        duration: 20,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000009",
        title: "文法4: 〜ました・〜ませんでした",
        subtitle: "記録・申し送りで使う過去形",
        type: "grammar",
        duration: 25,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000010",
        title: "文法5: 〜ないでください",
        subtitle: "安全確保のための禁止依頼",
        type: "grammar",
        duration: 20,
        isCompleted: false,
        isLocked: false,
      },
      // クイズ (3セット × 10問 = 30問)
      {
        id: "l1000000-0000-0000-0000-000000000011",
        title: "確認テスト①: 語彙・文法 基礎",
        subtitle: "語彙と基本文法の理解度チェック（10問）",
        type: "quiz",
        duration: 15,
        questionCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000012",
        title: "確認テスト②: 介護実践語彙",
        subtitle: "介護現場での語彙応用力チェック（10問）",
        type: "quiz",
        duration: 15,
        questionCount: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "l1000000-0000-0000-0000-000000000013",
        title: "確認テスト③: 総合まとめ",
        subtitle: "JLPT N5 介護日本語 総合力確認（10問）",
        type: "quiz",
        duration: 20,
        questionCount: 10,
        isCompleted: false,
        isLocked: false,
      },
    ],
  },
  "c2000000-0000-0000-0000-000000000001": {
    title: "介護の日本語 基礎コース",
    description: "介護現場で実際に使う日本語を実践的に学習。語彙60語・文法4パターン・クイズ40問で申し送り・記録・利用者対応・緊急報告まで完全マスター。",
    category: "介護専門",
    emoji: "🏥",
    color: "from-blue-400 to-blue-600",
    hours: 24,
    learners: 856,
    rating: 4.9,
    targetLevel: "N5〜N4レベル",
    whatYouLearn: [
      "施設・職種・道具・食事・排泄・清潔ケアの専門語彙60語",
      "申し送り記録で使う過去形・状態表現（〜でした・〜ていました）",
      "丁寧な申し出・依頼表現（〜ましょうか・〜ていただけますか）",
      "観察報告の客観的表現（〜ようです・〜と思われます）",
      "緊急時の5W1H報告・ほうれんそうの実践",
      "プライバシー・尊厳・個人情報保護・守秘義務の倫理知識",
    ],
    lessons: [
      { id: "l2000000-0000-0000-0000-000000000001", title: "第1課: 施設・職種・道具", subtitle: "介護福祉士・歩行器・褥瘡・デイサービスなど15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000002", title: "第2課: 食事・水分管理", subtitle: "嚥下・とろみ・食形態・脱水・経管栄養など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000003", title: "第3課: 排泄・清潔ケア", subtitle: "清拭・口腔ケア・体位変換・側臥位・義歯など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000004", title: "第4課: コミュニケーション・ご家族対応", subtitle: "声かけ・傾聴・ほうれんそう・守秘義務など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000005", title: "文法1: 申し送りの表現", subtitle: "〜でした・〜ていました（過去の状態報告）", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000006", title: "文法2: 確認・依頼の丁寧表現", subtitle: "〜ましょうか・〜ていただけますか", type: "grammar", duration: 25, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000007", title: "文法3: 報告・観察の表現", subtitle: "〜ようです・〜と思われます（客観的報告）", type: "grammar", duration: 25, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000008", title: "文法4: 緊急時の対応表現", subtitle: "5W1Hで正確・迅速に報告する表現", type: "grammar", duration: 25, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000009", title: "確認テスト①: 施設語彙・道具", subtitle: "施設・職種・道具の語彙理解度チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000010", title: "確認テスト②: 食事・排泄ケア", subtitle: "食事管理・排泄・清潔ケアの知識チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000011", title: "確認テスト③: コミュニケーション実践", subtitle: "声かけ・報告・個人情報保護の実践チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l2000000-0000-0000-0000-000000000012", title: "確認テスト④: 総合まとめ", subtitle: "介護の日本語 基礎コース 総合力確認（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
    ],
  },
  "c3000000-0000-0000-0000-000000000001": {
    title: "特定技能「介護」試験対策",
    description: "技能試験と日本語試験に完全特化。介護技術・疾患・制度・法律の語彙45語、記録文体2パターン、模擬試験100問以上で合格を目指す。",
    category: "資格対策",
    emoji: "📋",
    color: "from-green-400 to-green-600",
    hours: 40,
    learners: 543,
    rating: 4.7,
    targetLevel: "N4〜N3レベル",
    whatYouLearn: [
      "ADL・廃用症候群・ボディメカニクス・標準予防策など介護技術語彙15語",
      "認知症・脳梗塞・誤嚥性肺炎・パーキンソン病など疾患語彙15語",
      "介護保険・特定技能・ケアプラン・権利擁護など制度語彙15語",
      "〜について・〜にとって・〜に対してなど試験に出る読解表現",
      "〜を実施した・〜が見られたなどケアプラン・記録の書き言葉",
      "介護技能評価試験・日本語試験対応の模擬問題100問以上",
    ],
    lessons: [
      { id: "l3000000-0000-0000-0000-000000000001", title: "第1課: 介護技術用語", subtitle: "ADL・廃用症候群・ボディメカニクス・感染予防など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000002", title: "第2課: 疾患・医療用語", subtitle: "認知症・脳梗塞・糖尿病・パーキンソン病など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000003", title: "第3課: 法律・制度用語", subtitle: "介護保険・特定技能・ケアプラン・権利擁護など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000004", title: "文法1: 試験に出る読解表現", subtitle: "〜について・〜にとって・〜に対して・〜に関して", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000005", title: "文法2: ケアプラン・記録の書き言葉", subtitle: "〜を実施した・〜が見られた・〜を目標とする", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000006", title: "技能試験対策①: 介護技術・安全管理", subtitle: "ADL・ボディメカニクス・拘縮・標準予防策（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000007", title: "技能試験対策②: 認知症・疾患ケア", subtitle: "認知症・BPSD・脳梗塞・誤嚥性肺炎（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000008", title: "技能試験対策③: 制度・法律・倫理", subtitle: "介護保険・特定技能・虐待防止・権利擁護（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000009", title: "日本語試験対策①: 読解・記録表現", subtitle: "記録文の穴埋め・申し送り・緊急報告（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000010", title: "日本語試験対策②: 介護技術応用", subtitle: "入浴・食事・排泄・移乗介助の実践的知識（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l3000000-0000-0000-0000-000000000011", title: "模擬試験①: 総合実力チェック", subtitle: "技能・日本語・制度を組み合わせた総合問題（10問）", type: "quiz", duration: 25, questionCount: 10, isCompleted: false, isLocked: false },
    ],
  },
  "c4000000-0000-0000-0000-000000000001": {
    title: "JLPT N4 対策コース",
    description: "日常会話・語彙1,500語・基本的な読み書きをマスター。介護・医療の職場で使えるN4レベルの実践的な日本語力を身につけます。",
    category: "JLPT",
    emoji: "📚",
    color: "from-orange-400 to-orange-600",
    hours: 36,
    learners: 421,
    rating: 4.6,
    targetLevel: "N5合格〜N4レベル",
    whatYouLearn: [
      "コミュニケーション・業務・医療・感情・職場用語など60語の語彙",
      "〜てみる・〜てしまう・〜ので・〜ため など日常で頻出する文法4パターン",
      "〜ながら・〜てから・〜た後でなど時間の流れを表す表現",
      "〜そうだ・〜らしい・〜ようだ など推測・様子・伝聞の表現",
      "介護・医療の職場での自然な日本語コミュニケーション",
    ],
    lessons: [
      { id: "l4000000-0000-0000-0000-000000000001", title: "第1課: コミュニケーション・業務用語", subtitle: "連絡・説明・確認・報告・担当など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000002", title: "第2課: 医療・健康・ケア用語", subtitle: "症状・診断・治療・投薬・回復など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000003", title: "第3課: 感情・態度・人間関係", subtitle: "不安・安心・信頼・尊重・協力など15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000004", title: "第4課: 職場・施設・社会生活", subtitle: "業務・研修・目標・改善・引継ぎなど15語", type: "vocabulary", duration: 25, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000005", title: "文法1: 〜てみる・〜てしまう", subtitle: "試みる行動と完了・後悔を表す表現", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000006", title: "文法2: 〜ので・〜から・〜ため", subtitle: "理由・原因を丁寧に述べる表現", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000007", title: "文法3: 〜ながら・〜てから・〜た後で", subtitle: "時間の順序と同時進行を表す表現", type: "grammar", duration: 25, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000008", title: "文法4: 〜そうだ・〜らしい・〜ようだ", subtitle: "推測・様子・伝聞を表す表現", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000009", title: "確認テスト①: 語彙①コミュニケーション・業務", subtitle: "コミュニケーション・業務用語の理解度チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000010", title: "確認テスト②: 語彙②医療・健康", subtitle: "医療・健康・感情・職場用語の理解度チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000011", title: "確認テスト③: 文法総合テスト", subtitle: "〜てみる・〜ので・〜ながら・〜そうだ の文法チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l4000000-0000-0000-0000-000000000012", title: "確認テスト④: N4総合まとめ", subtitle: "N4レベル語彙・文法・読解の総合力チェック（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
    ],
  },
  "c6000000-0000-0000-0000-000000000001": {
    title: "JLPT N3 対策コース",
    description: "一般的な話題の理解・語彙3,000語・業務基礎日本語をマスター。医療・介護の職場でリーダー的役割を担えるN3レベルの日本語力を習得します。",
    category: "JLPT",
    emoji: "🎯",
    color: "from-indigo-400 to-indigo-600",
    hours: 50,
    learners: 312,
    rating: 4.7,
    targetLevel: "N4合格〜N3レベル",
    whatYouLearn: [
      "ビジネス・社会・感情・医療・時事用語など75語の語彙",
      "〜によって・〜による など手段・原因・相違を表す表現",
      "〜ために・〜ように など目的と変化の目標を正確に使い分ける",
      "〜ば〜のに・〜たら〜のに など反事実の仮定を表す表現",
      "〜ておく・〜てある・〜ていく など準備・結果・継続を表す表現",
      "複文・敬語・専門用語を使った介護記録・報告書の読み書き",
    ],
    lessons: [
      { id: "l6000000-0000-0000-0000-000000000001", title: "第1課: ビジネス・職場表現", subtitle: "企業・組織・方針・業績・承認・責任者など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000002", title: "第2課: 社会・制度・法律", subtitle: "政策・法律・福祉・保険・申請・認定など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000003", title: "第3課: 感情・心理・コミュニケーション", subtitle: "葛藤・共感・配慮・受容・主張・誤解など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000004", title: "第4課: 医療・科学・専門技術", subtitle: "臨床・リハビリ・QOL・ICF・アセスメントなど15語", type: "vocabulary", duration: 35, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000005", title: "第5課: 社会問題・時事用語", subtitle: "少子高齢化・多文化共生・SDGs・デジタル化など15語", type: "vocabulary", duration: 30, wordCount: 15, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000006", title: "文法1: 〜によって・〜による", subtitle: "手段・原因・相違を表す表現（〜に応じて・〜に基づいて）", type: "grammar", duration: 35, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000007", title: "文法2: 〜ために・〜ように", subtitle: "目的と変化の目標を正確に使い分ける", type: "grammar", duration: 35, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000008", title: "文法3: 〜ば〜のに・〜たら〜のに", subtitle: "反事実の仮定・後悔・惜しみを表す表現", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000009", title: "文法4: 〜ておく・〜てある・〜ていく", subtitle: "準備・意図的結果・継続的変化を表す表現", type: "grammar", duration: 35, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000010", title: "文法5: 〜だけでなく〜も・〜はもちろん〜も", subtitle: "列挙・強調・付加を表す接続表現", type: "grammar", duration: 30, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000011", title: "確認テスト①: ビジネス・職場語彙", subtitle: "企業・組織・職場の語彙チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000012", title: "確認テスト②: 社会・制度語彙", subtitle: "社会・法律・福祉・制度の語彙チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000013", title: "確認テスト③: 医療・専門用語", subtitle: "医療・介護の専門用語チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000014", title: "確認テスト④: 文法総合テスト", subtitle: "〜によって・〜ために・〜ば〜のに・〜ておく の文法チェック（10問）", type: "quiz", duration: 15, questionCount: 10, isCompleted: false, isLocked: false },
      { id: "l6000000-0000-0000-0000-000000000015", title: "確認テスト⑤: N3総合まとめ", subtitle: "N3レベル語彙・文法・読解・社会知識の総合力チェック（10問）", type: "quiz", duration: 20, questionCount: 10, isCompleted: false, isLocked: false },
    ],
  },
};

const LESSON_TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  vocabulary: { icon: "📖", label: "語彙", color: "bg-blue-50 text-blue-700" },
  grammar: { icon: "📝", label: "文法", color: "bg-green-50 text-green-700" },
  listening: { icon: "🎧", label: "リスニング", color: "bg-purple-50 text-purple-700" },
  speaking: { icon: "💬", label: "会話", color: "bg-pink-50 text-pink-700" },
  quiz: { icon: "✅", label: "テスト", color: "bg-orange-50 text-orange-700" },
  video: { icon: "🎥", label: "動画", color: "bg-red-50 text-red-700" },
  reading: { icon: "📄", label: "読解", color: "bg-indigo-50 text-indigo-700" },
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; courseId: string }>;
}) {
  const { locale, courseId } = await params;
  const course = COURSE_DATA[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">コースが見つかりません</p>
          <Link href={`/${locale}/courses`} className="btn-primary">コース一覧へ戻る</Link>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter((l) => l.isCompleted).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);
  const nextLesson = course.lessons.find((l) => !l.isCompleted && !l.isLocked);
  const vocabLessons = course.lessons.filter(l => l.type === "vocabulary");
  const grammarLessons = course.lessons.filter(l => l.type === "grammar");
  const quizLessons = course.lessons.filter(l => l.type === "quiz");
  const totalWords = vocabLessons.reduce((sum, l) => sum + (l.wordCount || 0), 0);
  const totalQuestions = quizLessons.reduce((sum, l) => sum + (l.questionCount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <div className={`bg-gradient-to-br ${course.color} text-white px-4 py-12`}>
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link href={`/${locale}/courses`} className="hover:text-white transition-colors">コース一覧</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="text-6xl">{course.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-white/80 text-sm mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <BookOpen className="w-4 h-4" />{course.lessons.length} レッスン
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />{course.hours} 時間
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Users className="w-4 h-4" />{course.learners.toLocaleString()}人
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />{course.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 -mt-6">
        {/* コース概要カード */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-blue-600">{totalWords}</p>
            <p className="text-xs text-muted mt-1">習得語彙数</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-green-600">{grammarLessons.length}</p>
            <p className="text-xs text-muted mt-1">文法項目</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-orange-600">{totalQuestions}</p>
            <p className="text-xs text-muted mt-1">練習問題数</p>
          </div>
        </div>

        {/* 進捗カード */}
        <div className="card shadow-md mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-700">学習の進捗</span>
            <span className="text-primary-600 font-bold text-lg">{progress}%</span>
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-muted mb-4">
            {completedLessons} / {course.lessons.length} レッスン完了
          </p>
          {nextLesson && (
            <Link
              href={`/${locale}/lessons/${nextLesson.id}`}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              {completedLessons === 0 ? "学習を始める 🚀" : "続きから学習する"}
            </Link>
          )}
        </div>

        {/* このコースで学ぶこと */}
        <div className="card mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📚 このコースで学ぶこと</h2>
          <ul className="space-y-2">
            {course.whatYouLearn.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* レッスン一覧 */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📋 レッスン一覧</h2>
          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => {
              const typeConfig = LESSON_TYPE_CONFIG[lesson.type] || { icon: "📄", label: lesson.type, color: "bg-gray-50 text-gray-700" };
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    lesson.isLocked
                      ? "bg-gray-50 opacity-60"
                      : lesson.isCompleted
                      ? "bg-green-50 border border-green-100"
                      : "bg-white border border-gray-100 hover:border-primary-200 hover:bg-primary-50 cursor-pointer"
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {lesson.isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : lesson.isLocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeConfig.color}`}>
                        {typeConfig.icon} {typeConfig.label}
                      </span>
                      {lesson.wordCount && (
                        <span className="text-xs text-blue-500">{lesson.wordCount}語</span>
                      )}
                      {lesson.questionCount && (
                        <span className="text-xs text-orange-500">{lesson.questionCount}問</span>
                      )}
                    </div>
                    <p className={`font-medium text-sm ${
                      lesson.isCompleted ? "text-green-700" : lesson.isLocked ? "text-gray-400" : "text-gray-900"
                    }`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted">{lesson.subtitle}</p>
                    <p className="text-xs text-muted">{lesson.duration}分</p>
                  </div>

                  {!lesson.isLocked && (
                    <Link
                      href={`/${locale}/lessons/${lesson.id}`}
                      className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        lesson.isCompleted
                          ? "text-green-600 hover:bg-green-100"
                          : "text-primary-600 hover:bg-primary-50 bg-primary-50"
                      }`}
                    >
                      {lesson.isCompleted ? "復習" : "開始 →"}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI家庭教師CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-6 text-white mb-8 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-lg font-bold mb-2">Medi先生に質問しながら学ぼう！</h3>
          <p className="text-white/80 text-sm mb-4">分からない単語や文法は、AI家庭教師Medi先生にいつでも質問できます。母語で説明してもらえます。</p>
          <Link href={`/${locale}/ai-tutor`} className="bg-white text-primary-600 font-bold px-6 py-3 rounded-2xl hover:bg-white/90 transition-all inline-flex items-center gap-2">
            💬 Medi先生に聞く
          </Link>
        </div>
      </div>
    </div>
  );
}
