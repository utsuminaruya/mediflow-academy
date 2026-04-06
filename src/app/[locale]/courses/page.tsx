'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Lock, BookOpen, ChevronRight, CheckCircle2, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/learning/progress-bar';
import { cn } from '@/lib/utils';

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
}

type Course = {
  id: string;
  title: { ja: string; vi: string };
  description: { ja: string; vi: string };
  level: string;
  category: string;
  totalLessons: number;
  completedLessons: number;
  isFree: boolean;
  requiredPlan: 'free' | 'basic' | 'pro';
  tags: string[];
  badge?: string;
  isNew?: boolean;
  estimatedHours?: number;
};

// =============================================
// 無料コース — N5〜N1 全レベル
// =============================================
const freeCourses: Course[] = [
  // ── N5 ──
  {
    id: 'n5-01',
    title: { ja: 'N5 ひらがな・カタカナ完全マスター', vi: 'Hoàn thiện Hiragana & Katakana N5' },
    description: { ja: 'ひらがな46字・カタカナ46字を読み書きできるようになる入門コース。発音・書き順も丁寧に解説', vi: 'Khóa nhập môn giúp đọc và viết đầy đủ Hiragana và Katakana. Hướng dẫn phát âm và thứ tự nét viết' },
    level: 'N5', category: 'vocabulary', totalLessons: 10, completedLessons: 10, isFree: true, requiredPlan: 'free',
    tags: ['ひらがな', 'カタカナ', '文字', '発音'], estimatedHours: 3,
  },
  {
    id: 'n5-02',
    title: { ja: 'N5 基礎語彙100 〜日常生活〜', vi: 'Từ vựng N5 - 100 từ cuộc sống hàng ngày' },
    description: { ja: 'N5に必要な基礎語彙100語。数字・色・食べ物・身体など生活に密着した単語を習得', vi: 'Học 100 từ N5 thiết yếu: số đếm, màu sắc, thức ăn, cơ thể và từ cuộc sống hàng ngày' },
    level: 'N5', category: 'vocabulary', totalLessons: 10, completedLessons: 10, isFree: true, requiredPlan: 'free',
    tags: ['数字', '色', '食べ物', '身体'], estimatedHours: 3,
  },
  {
    id: 'n5-03',
    title: { ja: 'N5 基礎文法 〜です・ます体〜', vi: 'Ngữ pháp cơ bản N5 - thể lịch sự' },
    description: { ja: 'です・ます体・助詞（は・が・を・に・で）・疑問文・否定文など、N5の核となる文法を体系的に学ぶ', vi: 'Học ngữ pháp cốt lõi N5: thể lịch sự, trợ từ, câu hỏi và câu phủ định' },
    level: 'N5', category: 'grammar', totalLessons: 15, completedLessons: 8, isFree: true, requiredPlan: 'free',
    tags: ['助詞', 'です・ます', '否定形', '疑問文'], estimatedHours: 5,
  },
  {
    id: 'n5-04',
    title: { ja: 'N5 日常会話 はじめの一歩', vi: 'Hội thoại hàng ngày N5 - Bước đầu tiên' },
    description: { ja: '自己紹介・挨拶・買い物・道案内など、日本での生活で最初に使う会話を練習', vi: 'Luyện hội thoại đầu tiên ở Nhật: tự giới thiệu, chào hỏi, mua sắm, hỏi đường' },
    level: 'N5', category: 'conversation', totalLessons: 12, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['自己紹介', '買い物', '挨拶', '道案内'], estimatedHours: 4,
  },
  {
    id: 'n5-05',
    title: { ja: 'N5 漢字入門 〜80字〜', vi: 'Nhập môn Kanji N5 - 80 chữ' },
    description: { ja: 'N5に必要な80字の漢字を意味・読み・書き順で習得。介護でよく使う漢字（人・日・時・体・食）も重点解説', vi: 'Học 80 chữ Kanji cần cho N5 với ý nghĩa, cách đọc và thứ tự nét. Trọng tâm các chữ dùng trong điều dưỡng' },
    level: 'N5', category: 'vocabulary', totalLessons: 8, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['漢字', '80字', '読み', '書き順'], estimatedHours: 4, isNew: true,
  },
  // ── N4 ──
  {
    id: 'n4-01',
    title: { ja: 'N4 語彙マスター 〜1,000語〜', vi: 'Từ vựng N4 Master - 1000 từ' },
    description: { ja: 'N4に必要な約1,000語を動詞・名詞・形容詞に分類して体系的に学習。語源・用例つき', vi: 'Học có hệ thống khoảng 1.000 từ N4 phân theo động từ, danh từ, tính từ kèm ví dụ' },
    level: 'N4', category: 'vocabulary', totalLessons: 20, completedLessons: 12, isFree: true, requiredPlan: 'free',
    tags: ['1000語', '動詞', '形容詞', '名詞'], estimatedHours: 7,
  },
  {
    id: 'n4-02',
    title: { ja: 'N4 文法完全対策', vi: 'Ngữ pháp N4 toàn diện' },
    description: { ja: '〜てしまう・〜ために・〜たら・〜ば・受身形・使役形など、N4頻出文法を例文とともに完全網羅', vi: 'Bao quát hoàn toàn ngữ pháp N4: 〜てしまう, 〜ために, thể bị động, thể sai khiến...' },
    level: 'N4', category: 'grammar', totalLessons: 25, completedLessons: 5, isFree: true, requiredPlan: 'free',
    tags: ['〜てしまう', '〜ために', '受身形', '使役形'], estimatedHours: 9,
  },
  {
    id: 'n4-03',
    title: { ja: 'N4 読解入門 〜短文から段落へ〜', vi: 'Đọc hiểu nhập môn N4' },
    description: { ja: 'お知らせ・日記・メール・案内文など、N4試験に出る読解問題のパターンを解説', vi: 'Hướng dẫn các dạng đọc hiểu thi N4: thông báo, nhật ký, email, tờ hướng dẫn' },
    level: 'N4', category: 'reading', totalLessons: 18, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['案内文', 'お知らせ', 'メール', '日記'], estimatedHours: 6,
  },
  {
    id: 'n4-04',
    title: { ja: 'N4 聴解トレーニング', vi: 'Luyện nghe N4' },
    description: { ja: 'N4試験の聴解問題に特化。会話速度・発音変化・省略表現に慣れ、実践力を身につける', vi: 'Chuyên luyện phần nghe thi N4. Làm quen với tốc độ, biến âm và cách diễn đạt rút gọn' },
    level: 'N4', category: 'listening', totalLessons: 16, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['ダイアログ', '速度訓練', '問題形式'], estimatedHours: 6,
  },
  {
    id: 'n4-05',
    title: { ja: 'N4 漢字300字 完全習得', vi: 'Hoàn thiện 300 chữ Kanji N4' },
    description: { ja: 'N4の300漢字を意味・音読み・訓読み・熟語セットで効率学習。介護・医療でよく使う漢字を優先', vi: 'Học hiệu quả 300 chữ Kanji N4 theo bộ ý nghĩa, âm on, âm kun và từ ghép. Ưu tiên Kanji dùng trong điều dưỡng và y tế' },
    level: 'N4', category: 'vocabulary', totalLessons: 15, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['漢字', '300字', '音読み', '訓読み'], estimatedHours: 5, isNew: true,
  },
  // ── N3 ──
  {
    id: 'n3-01',
    title: { ja: 'N3 文法・語彙総まとめ', vi: 'Tổng hợp ngữ pháp & từ vựng N3' },
    description: { ja: 'N3合格に必要な文法・語彙を完全網羅。複合助詞・接続表現・敬語の基礎を丁寧に解説', vi: 'Bao quát ngữ pháp & từ vựng N3: trợ từ phức hợp, biểu đạt nối và kính ngữ cơ bản' },
    level: 'N3', category: 'grammar', totalLessons: 30, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['N3文法', '複合語', '敬語', '接続'], estimatedHours: 10,
  },
  {
    id: 'n3-02',
    title: { ja: 'N3 読解練習 〜新聞・説明文〜', vi: 'Luyện đọc N3 - Báo và văn bản thông tin' },
    description: { ja: '新聞記事・説明文・物語など、N3レベルの多様な文章を読み解く力を養う', vi: 'Rèn luyện đọc hiểu văn bản N3 đa dạng: báo, bài giải thích, truyện. Hướng dẫn cách giải câu hỏi' },
    level: 'N3', category: 'reading', totalLessons: 20, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['新聞', '説明文', '物語', '設問'], estimatedHours: 7,
  },
  {
    id: 'n3-03',
    title: { ja: 'N3 聴解・速読トレーニング', vi: 'Luyện nghe & đọc nhanh N3' },
    description: { ja: 'N3の聴解問題を徹底演習。長めの会話・場面理解・情報統合問題の解き方をマスター', vi: 'Luyện kỹ các câu nghe N3: hội thoại dài, hiểu bối cảnh và câu hỏi tổng hợp thông tin' },
    level: 'N3', category: 'listening', totalLessons: 20, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['長文', '場面理解', '情報統合'], estimatedHours: 7,
  },
  {
    id: 'n3-04',
    title: { ja: 'N3 語彙強化 〜カタカナ語・複合語〜', vi: 'Củng cố từ vựng N3 - Từ Katakana và từ ghép' },
    description: { ja: 'N3で増えるカタカナ語（医療・介護）、複合動詞（〜出す・〜込む）、擬音語・擬態語を集中学習', vi: 'Học tập trung từ Katakana (y tế, điều dưỡng), động từ ghép và từ tượng thanh/tượng hình cấp N3' },
    level: 'N3', category: 'vocabulary', totalLessons: 18, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['カタカナ語', '複合動詞', '擬音語'], estimatedHours: 6, isNew: true,
  },
  // ── N2 ──
  {
    id: 'n2-01',
    title: { ja: 'N2 上級文法マスター', vi: 'Ngữ pháp nâng cao N2' },
    description: { ja: '〜にもかかわらず・〜をめぐって・〜にほかならないなど、N2の複雑な文法構造を例文で習得', vi: 'Nắm vững ngữ pháp phức tạp N2 qua ví dụ: 〜にもかかわらず, 〜をめぐって...' },
    level: 'N2', category: 'grammar', totalLessons: 35, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['複文', '条件文', '慣用句', '高頻度'], estimatedHours: 12,
  },
  {
    id: 'n2-02',
    title: { ja: 'N2 読解・論説文対策', vi: 'Đọc hiểu & văn nghị luận N2' },
    description: { ja: '長文読解・論説文・グラフ読み取りなど、N2の読解問題を網羅。段落構造の把握と要旨抽出を訓練', vi: 'Bao quát đọc hiểu N2: bài dài, văn nghị luận, đọc biểu đồ. Luyện nắm cấu trúc và rút ý chính' },
    level: 'N2', category: 'reading', totalLessons: 25, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['長文', '論説', 'グラフ', '要旨'], estimatedHours: 9,
  },
  {
    id: 'n2-03',
    title: { ja: 'N2 聴解実践 〜会議・講義〜', vi: 'Luyện nghe thực chiến N2 - Họp và bài giảng' },
    description: { ja: '会議・授業・インタビューなどN2の長い音声を聴き取る。ポイントメモの取り方も練習', vi: 'Luyện nghe âm thanh dài N2: cuộc họp, bài giảng, phỏng vấn. Luyện cách ghi chú điểm chính' },
    level: 'N2', category: 'listening', totalLessons: 20, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['会議', '授業', 'メモ技術'], estimatedHours: 7,
  },
  {
    id: 'n2-04',
    title: { ja: 'N2 語彙・慣用表現 完全攻略', vi: 'Chinh phục từ vựng và thành ngữ N2' },
    description: { ja: 'N2必須の慣用句・ことわざ・四字熟語・類義語・対義語を例文付きで系統的に習得', vi: 'Học có hệ thống thành ngữ, tục ngữ, từ 4 chữ Hán, từ đồng nghĩa và trái nghĩa N2 kèm ví dụ' },
    level: 'N2', category: 'vocabulary', totalLessons: 22, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['慣用句', 'ことわざ', '四字熟語', '類義語'], estimatedHours: 8, isNew: true,
  },
  // ── N1 ──
  {
    id: 'n1-01',
    title: { ja: 'N1 最難関文法 完全攻略', vi: 'Chinh phục ngữ pháp N1 khó nhất' },
    description: { ja: 'N1の難解な文法表現を体系的に整理。〜をよそに・〜ならではの・〜にもまして等、実際の用法を解説', vi: 'Hệ thống hóa ngữ pháp khó N1. Giải thích kỹ cách dùng thực tế 〜をよそに, 〜ならではの...' },
    level: 'N1', category: 'grammar', totalLessons: 40, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['最難関', 'N1文法', '表現', '実用'], estimatedHours: 14, isNew: true,
  },
  {
    id: 'n1-02',
    title: { ja: 'N1 語彙・熟語・慣用句マスター', vi: 'Từ vựng - Thành ngữ - Quán ngữ N1' },
    description: { ja: 'N1必須の語彙・熟語・慣用句・ことわざを例文付きで習得。文脈から意味を推測する力も養う', vi: 'Học từ vựng, thành ngữ, tục ngữ cần cho N1 kèm ví dụ. Rèn khả năng đoán nghĩa từ ngữ cảnh' },
    level: 'N1', category: 'vocabulary', totalLessons: 35, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['熟語', '慣用句', 'ことわざ', '推測'], estimatedHours: 12, isNew: true,
  },
  {
    id: 'n1-03',
    title: { ja: 'N1 読解・論述文 実戦演習', vi: 'Luyện đọc hiểu và văn nghị luận N1 thực chiến' },
    description: { ja: 'N1の長文・複数文章比較・論説を読み解く。主張・根拠・反論の構造を把握し設問に答える技術を鍛える', vi: 'Đọc hiểu bài dài, so sánh nhiều bài, văn nghị luận N1. Rèn kỹ năng hiểu cấu trúc lập luận và trả lời câu hỏi' },
    level: 'N1', category: 'reading', totalLessons: 30, completedLessons: 0, isFree: true, requiredPlan: 'free',
    tags: ['長文読解', '論述', '複数文章', '主張'], estimatedHours: 11, isNew: true,
  },
];

// =============================================
// ベーシックプラン — 介護専門日本語
// =============================================
const basicCourses: Course[] = [
  {
    id: 'care-01',
    title: { ja: '介護の日本語 N4 〜利用者さんとの基本会話〜', vi: 'Tiếng Nhật điều dưỡng N4 - Hội thoại cơ bản' },
    description: { ja: '「お体の具合はいかがですか」など、利用者さんと毎日使う基本フレーズを徹底演習', vi: 'Luyện kỹ các câu nói hàng ngày với người được chăm sóc: hỏi thăm sức khỏe, báo giờ ăn...' },
    level: 'N4', category: 'conversation', totalLessons: 15, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['利用者対応', '声かけ', '日常ケア', '丁寧語'], estimatedHours: 5,
  },
  {
    id: 'care-02',
    title: { ja: '介護記録・申し送りの書き方', vi: 'Cách viết hồ sơ và bàn giao ca điều dưỡng' },
    description: { ja: '日報・ケア記録・申し送りノートの書き方を実例で学ぶ。NG表現と丁寧な代替表現も解説', vi: 'Học qua ví dụ thực tế: nhật ký, hồ sơ chăm sóc và sổ bàn giao. Phân biệt cách diễn đạt phù hợp' },
    level: 'N4', category: 'reading', totalLessons: 10, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['介護記録', '敬語', '申し送り', '書き方'], estimatedHours: 4,
  },
  {
    id: 'care-03',
    title: { ja: '身体介護の日本語 〜入浴・移動・食事介助〜', vi: 'Tiếng Nhật chăm sóc thể chất - Tắm, di chuyển, ăn uống' },
    description: { ja: '移動介助・入浴介助・食事介助で使う専門用語と声かけフレーズ。実際の介護場面に即した実践内容', vi: 'Thuật ngữ chuyên môn và câu hỏi thăm khi hỗ trợ di chuyển, tắm rửa, ăn uống theo tình huống thực tế' },
    level: 'N4', category: 'conversation', totalLessons: 12, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['移動介助', '入浴', '食事介助', '声かけ'], estimatedHours: 4,
  },
  {
    id: 'care-04',
    title: { ja: '認知症ケアのコミュニケーション', vi: 'Giao tiếp trong chăm sóc người mắc chứng mất trí nhớ' },
    description: { ja: '認知症の方への適切な言葉かけ・非言語コミュニケーション・不穏時の対応を日本語と文化面から学ぶ', vi: 'Học cách dùng ngôn ngữ phù hợp, giao tiếp phi ngôn ngữ và xử lý khi có biểu hiện bất an' },
    level: 'N3', category: 'conversation', totalLessons: 10, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['認知症', '非言語', '不穏対応', '傾聴'], estimatedHours: 4,
  },
  {
    id: 'care-05',
    title: { ja: '夜勤・緊急時の日本語対応', vi: 'Tiếng Nhật khi trực đêm và xử lý khẩn cấp' },
    description: { ja: '夜間の見回り・急変対応・救急車への引き継ぎなど、夜勤帯に必要な日本語を集中的に学ぶ', vi: 'Học tập trung tiếng Nhật trực đêm: tuần tra, xử lý đột biến, bàn giao xe cứu thương' },
    level: 'N4', category: 'conversation', totalLessons: 8, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['夜勤', '緊急対応', '急変', '引き継ぎ'], estimatedHours: 3,
  },
  {
    id: 'care-06',
    title: { ja: 'N3 職場の日本語 〜ビジネス敬語・報連相〜', vi: 'Tiếng Nhật nơi làm việc N3 - Kính ngữ & báo cáo' },
    description: { ja: '報告・連絡・相談（報連相）・会議・上司への敬語を基礎から実践まで丁寧に指導', vi: 'Hướng dẫn từ cơ bản đến thực hành: báo cáo-liên lạc-tham vấn, kính ngữ với cấp trên trong cuộc họp' },
    level: 'N3', category: 'conversation', totalLessons: 20, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: 'キャリア', tags: ['報連相', 'ビジネス敬語', '会議', '職場'], estimatedHours: 7,
  },
  {
    id: 'care-07',
    title: { ja: '薬の管理と服薬介助の日本語', vi: 'Tiếng Nhật quản lý thuốc và hỗ trợ uống thuốc' },
    description: { ja: '薬の種類・飲み方・服薬記録の書き方・家族への説明など、薬に関する介護日本語を体系的に学ぶ', vi: 'Học có hệ thống tiếng Nhật điều dưỡng về thuốc: loại thuốc, cách uống, viết hồ sơ, giải thích cho gia đình' },
    level: 'N4', category: 'vocabulary', totalLessons: 10, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['服薬', '薬の種類', '記録', '説明'], estimatedHours: 4, isNew: true,
  },
  {
    id: 'care-08',
    title: { ja: '家族・ケアマネとの連携の日本語', vi: 'Tiếng Nhật phối hợp với gia đình và quản lý chăm sóc' },
    description: { ja: '家族への状況説明・ケアマネジャーへの報告・サービス担当者会議での発言など、多職種連携で使う日本語', vi: 'Tiếng Nhật giải thích tình trạng cho gia đình, báo cáo cho quản lý chăm sóc, phát biểu trong họp đa nghề' },
    level: 'N3', category: 'conversation', totalLessons: 12, completedLessons: 0, isFree: false, requiredPlan: 'basic',
    badge: '介護専門', tags: ['家族対応', 'ケアマネ', '多職種', '会議'], estimatedHours: 4, isNew: true,
  },
];

// =============================================
// プロコース — 医療・看護・就職
// =============================================
const proCourses: Course[] = [
  {
    id: 'pro-01',
    title: { ja: '介護福祉士 国家試験 筆記対策', vi: 'Ôn thi viết quốc gia chứng chỉ điều dưỡng viên' },
    description: { ja: '介護福祉士国家試験の出題範囲を全カバー。専門用語・福祉知識・過去問演習まで日本語で徹底対策', vi: 'Bao phủ toàn bộ phạm vi thi quốc gia chứng chỉ điều dưỡng viên. Thuật ngữ, kiến thức phúc lợi, luyện đề cũ' },
    level: 'N2', category: 'reading', totalLessons: 30, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '資格対策', tags: ['介護福祉士', '国家試験', '過去問', '専門用語'], estimatedHours: 12,
  },
  {
    id: 'pro-02',
    title: { ja: '医療通訳 入門コース 〜N1監修〜', vi: 'Khóa nhập môn phiên dịch y tế - Giám sát N1' },
    description: { ja: 'ベトナム人N1介護福祉士兼医療通訳のDungさんが監修。診察室・入院手続き・インフォームドコンセントの通訳表現を学ぶ', vi: 'Giám sát bởi Dung - điều dưỡng và phiên dịch y tế N1. Dịch trong phòng khám, nhập viện, thông báo đồng ý điều trị' },
    level: 'N1', category: 'conversation', totalLessons: 20, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: 'N1監修', tags: ['医療通訳', '診察', '入院', 'インフォームドコンセント'], estimatedHours: 8,
  },
  {
    id: 'pro-03',
    title: { ja: '看護補助・看護実務の日本語', vi: 'Tiếng Nhật hỗ trợ điều dưỡng và thực hành y tế' },
    description: { ja: '看護補助者・看護師を目指す方向け。バイタルサイン・医療処置・患者対応・カルテ読解など看護の現場で使う日本語', vi: 'Dành cho người hướng tới trợ lý y tá hoặc y tá. Dấu hiệu sinh tồn, xử lý y tế, tiếp xúc bệnh nhân, đọc hồ sơ' },
    level: 'N2', category: 'conversation', totalLessons: 25, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '看護', tags: ['バイタル', '看護処置', 'カルテ', '患者対応'], estimatedHours: 9,
  },
  {
    id: 'pro-04',
    title: { ja: '就職面接 実践演習 〜介護・医療職〜', vi: 'Luyện phỏng vấn xin việc - Điều dưỡng & y tế' },
    description: { ja: '介護・医療施設の面接で実際に聞かれる質問を徹底対策。志望動機・自己PR・よくある質問の回答を一緒に作る', vi: 'Chuẩn bị kỹ cho phỏng vấn cơ sở điều dưỡng và y tế. Xây dựng câu trả lời cho lý do nộp đơn, tự PR' },
    level: 'N3', category: 'conversation', totalLessons: 10, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '就職支援', tags: ['面接', '志望動機', '自己PR', 'キャリア'], estimatedHours: 4,
  },
  {
    id: 'pro-05',
    title: { ja: 'N2 看護師国家試験対策 日本語読解', vi: 'Luyện đọc hiểu tiếng Nhật cho kỳ thi y tá quốc gia N2' },
    description: { ja: '看護師国家試験の問題文に特化した日本語読解力強化コース。医療専門用語・長文設問の解読法を習得', vi: 'Tăng cường đọc hiểu tiếng Nhật cho đề thi y tá quốc gia. Thuật ngữ y tế và cách đọc câu hỏi dài' },
    level: 'N2', category: 'reading', totalLessons: 20, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '看護', tags: ['看護師試験', '医療用語', '長文読解', '国家試験'], estimatedHours: 8, isNew: true,
  },
  {
    id: 'pro-06',
    title: { ja: '医療ソーシャルワーカーの日本語', vi: 'Tiếng Nhật công tác xã hội y tế' },
    description: { ja: '退院支援・福祉制度説明・多職種連携で使う日本語。複雑な制度を患者・家族に分かりやすく説明するスキルを身につける', vi: 'Tiếng Nhật hỗ trợ xuất viện, giải thích chế độ phúc lợi và phối hợp đa nghề. Kỹ năng giải thích rõ ràng cho bệnh nhân và gia đình' },
    level: 'N2', category: 'conversation', totalLessons: 15, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '医療', tags: ['退院支援', '福祉制度', 'MSW', '多職種'], estimatedHours: 6, isNew: true,
  },
  {
    id: 'pro-07',
    title: { ja: '外国人患者対応の日本語 〜文化的配慮〜', vi: 'Tiếng Nhật tiếp nhận bệnh nhân nước ngoài - Chú ý văn hóa' },
    description: { ja: '外国人患者への対応・文化的背景の理解・宗教的配慮・通訳ツールの使い方など、多文化共生の医療現場で役立つ知識', vi: 'Kiến thức hữu ích trong môi trường y tế đa văn hóa: tiếp nhận bệnh nhân nước ngoài, hiểu nền tảng văn hóa, chú ý tôn giáo' },
    level: 'N2', category: 'conversation', totalLessons: 12, completedLessons: 0, isFree: false, requiredPlan: 'pro',
    badge: '医療', tags: ['外国人対応', '多文化', '宗教配慮', '医療通訳'], estimatedHours: 5, isNew: true,
  },
];

const levelColor: Record<string, string> = {
  N5: 'bg-green-100 text-green-700',
  N4: 'bg-blue-100 text-blue-700',
  N3: 'bg-purple-100 text-purple-700',
  N2: 'bg-orange-100 text-orange-700',
  N1: 'bg-red-100 text-red-700',
};

function CourseCard({ course, locale, locked }: { course: Course; locale: string; locked: boolean }) {
  const t = useTranslations('courses');
  const title = locale === 'ja' ? course.title.ja : course.title.vi;
  const desc = locale === 'ja' ? course.description.ja : course.description.vi;

  return (
    <Card bordered hover={!locked} className={cn('transition-all', locked && 'opacity-70')}>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn('text-xs font-bold px-2 py-0.5 rounded', levelColor[course.level] ?? 'bg-gray-100 text-gray-700')}>
              {course.level}
            </span>
            {course.isFree && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">{t('free')}</span>
            )}
            {course.badge && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">{course.badge}</span>
            )}
            {course.isNew && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">NEW</span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-1">
            {!locked && course.completedLessons === course.totalLessons && (
              <CheckCircle2 className="h-4 w-4 text-[#00B894]" />
            )}
            {locked && <Lock className="h-4 w-4 text-gray-400" />}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 leading-snug text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">{desc}</p>

        {course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span><BookOpen className="h-3.5 w-3.5 inline mr-0.5" />{course.completedLessons}/{course.totalLessons} {t('lessons')}</span>
          {course.estimatedHours && (
            <span><Clock className="h-3.5 w-3.5 inline mr-0.5" />約{course.estimatedHours}時間</span>
          )}
        </div>

        {course.completedLessons > 0 && !locked && (
          <div className="mb-3">
            <ProgressBar
              value={Math.round((course.completedLessons / course.totalLessons) * 100)}
              size="sm"
              color={course.completedLessons === course.totalLessons ? 'secondary' : 'primary'}
            />
          </div>
        )}

        {locked ? (
          <Link href={`/${locale}/pricing`}>
            <Button variant="outline" fullWidth size="sm" className="text-gray-400 border-gray-200">
              <Lock className="h-3.5 w-3.5 mr-1" />
              {t('locked')} — アップグレード
            </Button>
          </Link>
        ) : (
          <Link href={`/${locale}/courses/${course.id}`}>
            <Button fullWidth size="sm" variant={course.completedLessons === course.totalLessons ? 'secondary' : 'primary'}>
              {course.completedLessons === course.totalLessons ? t('completed')
                : course.completedLessons > 0 ? t('continue')
                : t('start')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function CoursesPage({ params }: CoursesPageProps) {
  const { locale } = use(params);
  const isJa = locale === 'ja';

  const userPlan: 'free' | 'basic' | 'pro' = 'basic';
  const planOrder = { free: 0, basic: 1, pro: 2 };
  const isLocked = (plan: 'free' | 'basic' | 'pro') => planOrder[plan] > planOrder[userPlan];

  const totalFree = freeCourses.length;
  const totalBasic = basicCourses.length;
  const totalPro = proCourses.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isJa ? 'コース一覧' : 'Danh sách khóa học'}
        </h1>
        <p className="text-gray-500 mb-4">
          {isJa
            ? `全${totalFree + totalBasic + totalPro}コース。N5〜N1まで無料、介護・看護・医療通訳の専門コースも充実`
            : `Tổng ${totalFree + totalBasic + totalPro} khóa. N5〜N1 miễn phí, khóa chuyên ngành điều dưỡng, y tá và phiên dịch y tế`}
        </p>
        {/* サマリーバー */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-medium text-green-700">{isJa ? '無料' : 'Miễn phí'}</span>
            <span className="text-green-600">{totalFree}コース</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-sm">
            <span className="w-2 h-2 bg-[#0066CC] rounded-full" />
            <span className="font-medium text-[#0066CC]">Basic</span>
            <span className="text-blue-600">{totalBasic}コース</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-sm">
            <Star className="h-3 w-3 text-amber-500 fill-amber-400" />
            <span className="font-medium text-amber-700">Pro</span>
            <span className="text-amber-600">{totalPro}コース</span>
          </div>
        </div>
      </div>

      {/* ===== SECTION 1: 無料コース ===== */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-bold text-green-700 text-sm">
              {isJa ? '無料プラン — N5/N4/N3/N2/N1' : 'Gói miễn phí — N5/N4/N3/N2/N1'}
            </span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{totalFree}コース</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freeCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} locked={isLocked(course.requiredPlan)} />
          ))}
        </div>
      </section>

      {/* ===== SECTION 2: ベーシックプラン ===== */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
            <span className="w-2 h-2 bg-[#0066CC] rounded-full" />
            <span className="font-bold text-[#0066CC] text-sm">
              {isJa ? 'ベーシックプラン ¥980/月' : 'Gói Basic ¥980/tháng'}
            </span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{totalBasic}コース</span>
        </div>

        {isLocked('basic') && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-800 text-sm">
                {isJa ? '介護現場で使えるプロの日本語を習得' : 'Học tiếng Nhật chuyên nghiệp dùng được tại hiện trường'}
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                {isJa ? '現役ベトナム人介護福祉士によるキャリア相談も含む' : 'Bao gồm tư vấn nghề nghiệp bởi điều dưỡng viên người Việt đang hành nghề'}
              </p>
            </div>
            <Link href={`/${locale}/pricing`}>
              <Button size="sm" variant="primary">{isJa ? 'アップグレード' : 'Nâng cấp'}</Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {basicCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} locked={isLocked(course.requiredPlan)} />
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: プロコース ===== */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
            <span className="font-bold text-amber-700 text-sm">
              {isJa ? 'プロコース ¥1,980/月' : 'Gói Pro ¥1,980/tháng'}
            </span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{totalPro}コース</span>
        </div>

        {isLocked('pro') && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-800 text-sm">
                {isJa ? 'プレミアム就職紹介 + 医療通訳 + 看護実務 + 国家試験対策' : 'Giới thiệu việc làm cao cấp + Phiên dịch y tế + Y tá + Ôn thi quốc gia'}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                {isJa ? 'N1取得・看護師・医療通訳を目指す方の最短ルート' : 'Con đường ngắn nhất cho người hướng tới N1, y tá và phiên dịch y tế'}
              </p>
            </div>
            <Link href={`/${locale}/pricing`}>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                {isJa ? 'プロに上がる' : 'Nâng lên Pro'}
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} locked={isLocked(course.requiredPlan)} />
          ))}
        </div>
      </section>
    </div>
  );
}
