"use client";

import Link from "next/link";
import {
  Crown, Lock, Video, Users, BookOpen, Star, Check, Sparkles, FileText,
  ClipboardList, Award, Stethoscope, Target, Languages, UserCheck, PenLine,
  Briefcase, type LucideIcon,
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Paywall } from "@/components/ui/Paywall";

interface PremiumCoursesSectionProps {
  locale: string;
}

interface CourseItem {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  badge: string;
  badgeColor: string;
  features: string[];
  tags?: string[];
}

interface SectionTexts {
  standard: {
    sectionLabel: string;
    aiLabel: string;
    bannerTitle: string;
    bannerBody: string;
    bannerPrice: string;
    bannerTrial: string;
    ctaButton: string;
  };
  pro: {
    sectionLabel: string;
    liveLabel: string;
    bannerTitle: string;
    bannerBody: string;
    bannerBadge1: string;
    bannerBadge2: string;
    ctaButton: string;
  };
  premium: {
    sectionLabel: string;
    oneOnOneLabel: string;
    bannerTitle: string;
    bannerBody: string;
    bannerBadge1: string;
    bannerBadge2: string;
    ctaButton: string;
  };
  request: {
    title: string;
    body: string;
    note: string;
  };
}

// ── ロケール別UIテキスト ──────────────────────────────────
const UI_L10N: Record<string, SectionTexts> = {
  ja: {
    standard: {
      sectionLabel: "スタンダードプラン 過去問コース",
      aiLabel: "AI解説 + 模擬試験",
      bannerTitle: "過去問5年分 × AI解説 × 多言語対応",
      bannerBody: "特定技能「介護」と介護福祉士国家試験の過去問を完全収録。スタッフズンが実際に使った勉強法で、苦手分野を効率よく克服できます。",
      bannerPrice: "¥980/月〜",
      bannerTrial: "7日間無料体験あり",
      ctaButton: "スタンダードプラン（¥980/月）を7日間無料で試す →",
    },
    pro: {
      sectionLabel: "プロプラン限定コース",
      liveLabel: "ライブ講座 + 録画",
      bannerTitle: "Mediflowだけの「現場のプロ直伝」",
      bannerBody: "13年以上の臨床経験を持つ現役看護師（うつみ）が、実際に起きた現場の場面をベースに教えます。テキストでは学べない「なぜそう言うのか」がわかる講座です。",
      bannerBadge1: "病院・特養・訪問入浴・ツアーナース",
      bannerBadge2: "外国人スタッフ指導経験あり",
      ctaButton: "プロプラン（¥1,980/月）を7日間無料で試す →",
    },
    premium: {
      sectionLabel: "プレミアムプラン限定サービス",
      oneOnOneLabel: "マンツーマン対応",
      bannerTitle: "「学ぶ → 働く」が直結するMediflowだけのプログラム",
      bannerBody: "有料職業紹介事業の許可を持つMediflowだからこそ実現できる、合格後の優先求人紹介・就職保証。介護福祉士試験に不合格でも、Premiumは次回受験まで無料延長します。",
      bannerBadge1: "介護福祉士試験 合格保証",
      bannerBadge2: "許可番号: 14-ユ-302174",
      ctaButton: "プレミアムプラン（¥3,980/月）を7日間無料で試す →",
    },
    request: {
      title: "学びたい内容をリクエストしよう",
      body: "「こんな場面の日本語が知りたい」をリクエストすると、うつみ先生がコンテンツを作ります。上位リクエストは毎月コース化！",
      note: "Standardプラン以上でリクエスト投稿・投票が可能",
    },
  },

  vi: {
    standard: {
      sectionLabel: "Khóa học đề thi cũ - Gói Standard",
      aiLabel: "Giải thích AI + Thi thử",
      bannerTitle: "5 năm đề thi cũ × Giải thích AI × Đa ngôn ngữ",
      bannerBody: "Hoàn toàn thu thập đề thi cũ của kỳ thi Kỹ năng đặc định \"Điều dưỡng\" và kỳ thi quốc gia Hộ lý phúc lợi. Với phương pháp học tập mà nhân viên Dũng thực sự sử dụng, bạn có thể khắc phục điểm yếu hiệu quả.",
      bannerPrice: "¥980/tháng~",
      bannerTrial: "Dùng thử miễn phí 7 ngày",
      ctaButton: "Dùng thử Gói Standard (¥980/tháng) miễn phí 7 ngày →",
    },
    pro: {
      sectionLabel: "Khóa học độc quyền Gói Pro",
      liveLabel: "Lớp học trực tiếp + Ghi hình",
      bannerTitle: "\"Bí quyết từ chuyên gia thực tế\" - chỉ có tại Mediflow",
      bannerBody: "Y tá đang hoạt động (Utsumi) với hơn 13 năm kinh nghiệm lâm sàng dạy dựa trên những tình huống thực tế. Đây là khóa học giúp bạn hiểu được \"tại sao lại nói như vậy\" mà sách giáo khoa không thể dạy.",
      bannerBadge1: "Bệnh viện, dưỡng lão, điều dưỡng tại nhà, y tá du lịch",
      bannerBadge2: "Có kinh nghiệm hướng dẫn nhân viên nước ngoài",
      ctaButton: "Dùng thử Gói Pro (¥1,980/tháng) miễn phí 7 ngày →",
    },
    premium: {
      sectionLabel: "Dịch vụ độc quyền Gói Premium",
      oneOnOneLabel: "Hỗ trợ 1 kèm 1",
      bannerTitle: "Chương trình duy nhất của Mediflow - \"Học → Làm việc\" liên kết trực tiếp",
      bannerBody: "Chỉ Mediflow có giấy phép giới thiệu việc làm có phí mới có thể thực hiện được: ưu tiên giới thiệu việc làm và đảm bảo việc làm sau khi đậu thi. Dù trượt kỳ thi Hộ lý phúc lợi, Premium sẽ gia hạn miễn phí đến lần thi tiếp theo.",
      bannerBadge1: "Đảm bảo đậu kỳ thi Hộ lý phúc lợi",
      bannerBadge2: "Số giấy phép: 14-ユ-302174",
      ctaButton: "Dùng thử Gói Premium (¥3,980/tháng) miễn phí 7 ngày →",
    },
    request: {
      title: "Hãy gửi yêu cầu nội dung bạn muốn học",
      body: "Nếu bạn gửi yêu cầu \"Tôi muốn học tiếng Nhật trong tình huống này\", thầy Utsumi sẽ tạo nội dung. Các yêu cầu hàng đầu sẽ được làm thành khóa học mỗi tháng!",
      note: "Có thể đăng yêu cầu và bỏ phiếu từ Gói Standard trở lên",
    },
  },

  en: {
    standard: {
      sectionLabel: "Standard Plan Past Exam Courses",
      aiLabel: "AI Explanation + Mock Exam",
      bannerTitle: "5 Years of Past Exams × AI Explanation × Multilingual",
      bannerBody: "Complete collection of past exams for the Specified Skilled Worker \"Care\" and National Care Worker exams. Using the study method actually used by staff Dung, you can efficiently overcome weak areas.",
      bannerPrice: "¥980/month~",
      bannerTrial: "7-day free trial",
      ctaButton: "Try Standard Plan (¥980/month) free for 7 days →",
    },
    pro: {
      sectionLabel: "Pro Plan Exclusive Courses",
      liveLabel: "Live Classes + Recording",
      bannerTitle: "\"Direct from Frontline Experts\" - Only at Mediflow",
      bannerBody: "Active nurse (Utsumi) with 13+ years of clinical experience teaches based on real workplace scenes. A course that reveals the \"why\" behind expressions that textbooks can't teach.",
      bannerBadge1: "Hospital, nursing home, home care, tour nurse",
      bannerBadge2: "Experience guiding foreign staff",
      ctaButton: "Try Pro Plan (¥1,980/month) free for 7 days →",
    },
    premium: {
      sectionLabel: "Premium Plan Exclusive Services",
      oneOnOneLabel: "1-on-1 Support",
      bannerTitle: "Only Mediflow's Program - \"Learn → Work\" Directly Connected",
      bannerBody: "Only Mediflow with a licensed fee-based employment placement can offer priority job introductions and employment guarantees after passing. Even if you fail the Care Worker exam, Premium extends for free until your next attempt.",
      bannerBadge1: "Care Worker Exam Pass Guarantee",
      bannerBadge2: "License No: 14-ユ-302174",
      ctaButton: "Try Premium Plan (¥3,980/month) free for 7 days →",
    },
    request: {
      title: "Request content you want to learn",
      body: "Send a request like \"I want to learn Japanese in this situation\" and Utsumi Sensei will create the content. Top requests become courses every month!",
      note: "Request posting and voting available from Standard Plan and above",
    },
  },

  my: {
    standard: {
      sectionLabel: "Standard Plan ရှိသော ယခင်မေးခွန်းများ သင်တန်း",
      aiLabel: "AI ရှင်းလင်းချက် + အတုစာမေးပွဲ",
      bannerTitle: "ယခင်မေးခွန်း ၅ နှစ် × AI ရှင်းလင်းချက် × ဘာသာစကားစုံ",
      bannerBody: "သတ်မှတ်ကျွမ်းကျင် \"သူနာပြု\" နှင့် သူနာပြု အမျိုးသားစာမေးပွဲ ယခင်မေးခွန်းများ ပြည့်စုံစွာ ကောက်ယူထားသည်။",
      bannerPrice: "¥980/လ~",
      bannerTrial: "7 ရက် အခမဲ့ စမ်းသပ်",
      ctaButton: "Standard Plan (¥980/လ) ကို 7 ရက် အခမဲ့ စမ်းသပ် →",
    },
    pro: {
      sectionLabel: "Pro Plan သာသည့် သင်တန်းများ",
      liveLabel: "တိုက်ရိုက်ထုတ်လွှင့် + မှတ်တမ်းတင်",
      bannerTitle: "Mediflow တွင်သာ ရနိုင်သော \"ကျွမ်းကျင်သူမှ တိုက်ရိုက် သင်ကြားမှု\"",
      bannerBody: "လက်ရှိ သူနာပြုဆရာမ (Utsumi) ၁၃ နှစ်ကျော် ဆေးခန်းတွေ့ကြုံမှုဖြင့် တကယ်ဖြစ်ပျက်ခဲ့သော ကွင်းဆင်းမှုအပေါ် အခြေခံ၍ သင်ကြားသည်။",
      bannerBadge1: "ဆေးရုံ၊ သူနာပြုဌာန၊ ဂေဟာသူနာပြုမှု",
      bannerBadge2: "နိုင်ငံခြား ဝန်ထမ်းများ လမ်းညွှန်မှု အတွေ့အကြုံ",
      ctaButton: "Pro Plan (¥1,980/လ) ကို 7 ရက် အခမဲ့ စမ်းသပ် →",
    },
    premium: {
      sectionLabel: "Premium Plan သာသည့် ဝန်ဆောင်မှုများ",
      oneOnOneLabel: "တစ်ဦးချင်းထောက်ပံ့မှု",
      bannerTitle: "\"လေ့လာ → အလုပ်လုပ်\" တိုက်ရိုက်ဆက်စပ် Mediflow မှ သာ",
      bannerBody: "ဂါဝန်ဆင်း အတည်ပြုပြီးနောက် ဦးစားပေး အလုပ်ရှာဖွေမှုနှင့် အလုပ်ရမည်ဆိုသည့် အာမခံ။",
      bannerBadge1: "သူနာပြု ပြန်လည်ရေးဆွဲ အောင်ချက် အာမခံ",
      bannerBadge2: "ခွင့်ပြုနံပါတ်: 14-ユ-302174",
      ctaButton: "Premium Plan (¥3,980/လ) ကို 7 ရက် အခမဲ့ စမ်းသပ် →",
    },
    request: {
      title: "သင်ယူလိုသော အကြောင်းအရာကို တောင်းဆိုပါ",
      body: "\"ဤအခြေအနေတွင် ဂျပန်ဘာသာ သင်ယူလိုသည်\" ဟု တောင်းဆိုပါက Utsumi ဆရာ အကြောင်းအရာ ဖန်တီးပေးမည်",
      note: "Standard Plan နှင့် အထက်မှ တောင်းဆိုချက် တင်သွင်းခြင်းနှင့် မဲပေးခြင်း ပြုနိုင်သည်",
    },
  },

  id: {
    standard: {
      sectionLabel: "Kursus Soal Ujian Lama - Paket Standard",
      aiLabel: "Penjelasan AI + Ujian Simulasi",
      bannerTitle: "5 Tahun Soal Lama × Penjelasan AI × Multibahasa",
      bannerBody: "Koleksi lengkap soal ujian lama untuk Pekerja Terampil \"Perawatan\" dan Ujian Nasional Perawat Lansia. Dengan metode belajar yang benar-benar digunakan staf Dung.",
      bannerPrice: "¥980/bulan~",
      bannerTrial: "Uji coba gratis 7 hari",
      ctaButton: "Coba Paket Standard (¥980/bulan) gratis 7 hari →",
    },
    pro: {
      sectionLabel: "Kursus Eksklusif Paket Pro",
      liveLabel: "Kelas Langsung + Rekaman",
      bannerTitle: "\"Langsung dari Ahli Lapangan\" - Hanya di Mediflow",
      bannerBody: "Perawat aktif (Utsumi) dengan pengalaman klinis 13+ tahun mengajar berdasarkan situasi nyata di lapangan. Kursus yang mengungkap \"mengapa diucapkan seperti itu\" yang tidak bisa diajarkan buku.",
      bannerBadge1: "Rumah sakit, panti jompo, perawatan rumah, perawat tur",
      bannerBadge2: "Pengalaman membimbing staf asing",
      ctaButton: "Coba Paket Pro (¥1,980/bulan) gratis 7 hari →",
    },
    premium: {
      sectionLabel: "Layanan Eksklusif Paket Premium",
      oneOnOneLabel: "Dukungan 1-on-1",
      bannerTitle: "Program Unik Mediflow - \"Belajar → Bekerja\" Terhubung Langsung",
      bannerBody: "Hanya Mediflow yang memiliki izin penempatan kerja berbayar yang dapat menawarkan pengenalan pekerjaan prioritas dan jaminan kerja setelah lulus.",
      bannerBadge1: "Jaminan Lulus Ujian Perawat Lansia",
      bannerBadge2: "No. Izin: 14-ユ-302174",
      ctaButton: "Coba Paket Premium (¥3,980/bulan) gratis 7 hari →",
    },
    request: {
      title: "Minta konten yang ingin Anda pelajari",
      body: "Kirim permintaan \"Saya ingin belajar bahasa Jepang dalam situasi ini\" dan Sensei Utsumi akan membuat kontennya. Permintaan teratas menjadi kursus setiap bulan!",
      note: "Pengiriman permintaan dan voting tersedia dari Paket Standard ke atas",
    },
  },

  zh: {
    standard: {
      sectionLabel: "标准计划 历年真题课程",
      aiLabel: "AI解说 + 模拟考试",
      bannerTitle: "5年真题 × AI解说 × 多语言对应",
      bannerBody: "完整收录特定技能「护理」和介护福祉士国家考试历年真题。使用员工勇实际使用的学习方法，高效克服薄弱环节。",
      bannerPrice: "¥980/月起",
      bannerTrial: "7天免费试用",
      ctaButton: "免费试用标准计划（¥980/月）7天 →",
    },
    pro: {
      sectionLabel: "Pro计划专属课程",
      liveLabel: "直播课 + 录播",
      bannerTitle: "Mediflow独家「现场专家直授」",
      bannerBody: "拥有13年以上临床经验的现役护士（内海）基于真实发生的现场场景教学。这是一门让你明白「为什么这么说」的课程，教科书上学不到。",
      bannerBadge1: "医院、特护院、上门护理、随行护士",
      bannerBadge2: "有指导外籍员工的经验",
      ctaButton: "免费试用Pro计划（¥1,980/月）7天 →",
    },
    premium: {
      sectionLabel: "Premium计划专属服务",
      oneOnOneLabel: "一对一支持",
      bannerTitle: "只有Mediflow才有的「学习→工作」直连项目",
      bannerBody: "只有持有有偿职业介绍许可的Mediflow才能实现：通过考试后优先推荐职位、就职保证。即使介护福祉士考试不合格，Premium也免费延长至下次考试。",
      bannerBadge1: "介护福祉士考试通过保证",
      bannerBadge2: "许可号: 14-ユ-302174",
      ctaButton: "免费试用Premium计划（¥3,980/月）7天 →",
    },
    request: {
      title: "提交你想学的内容申请",
      body: "提交「想学这种场景的日语」的申请，内海老师会制作内容。点击量最高的申请每月都会被制作成课程！",
      note: "标准计划及以上可以提交申请和投票",
    },
  },
};

// ── コースデータ（ロケール別） ──────────────────────────────
const STANDARD_COURSES_L10N: Record<string, CourseItem[]> = {
  ja: [
    {
      Icon: ClipboardList,
      title: "特定技能「介護」試験 過去問コース",
      subtitle: "技能試験・日本語試験 5年分完全収録",
      description: "特定技能「介護」の技能試験と日本語試験の全過去問をAI解説付きで収録。出題傾向を把握し、弱点分野を集中強化。合格率向上を目指す実践型コース。",
      color: "from-teal-500 to-cyan-600", bgColor: "bg-teal-50", textColor: "text-teal-700",
      badge: "Standard以上", badgeColor: "bg-teal-100 text-teal-700",
      features: ["5年分・全問収録", "AI解説 ＋ 弱点分析", "模擬試験モード"],
      tags: ["過去問", "AI解説", "模擬試験"],
    },
    {
      Icon: Award,
      title: "介護福祉士国家試験 過去問コース",
      subtitle: "125問 × 5年分・多言語解説付き",
      description: "介護福祉士国家試験の過去問125問を5年分、母語解説付きで完全収録。出題傾向とキーワードを押さえ、苦手分野を分野別ランダム出題で着実に克服できます。",
      color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", textColor: "text-emerald-700",
      badge: "Standard以上", badgeColor: "bg-emerald-100 text-emerald-700",
      features: ["125問 × 5年分", "多言語解説（ベトナム語ほか）", "分野別ランダム出題"],
      tags: ["介護福祉士", "過去問", "多言語"],
    },
  ],
  vi: [
    {
      Icon: ClipboardList,
      title: "Đề thi cũ Kỹ năng đặc định \"Điều dưỡng\"",
      subtitle: "Kỳ thi kỹ năng & tiếng Nhật - 5 năm đầy đủ",
      description: "Toàn bộ đề thi cũ của kỳ thi kỹ năng và tiếng Nhật trong Kỹ năng đặc định \"Điều dưỡng\" với giải thích AI. Nắm xu hướng ra đề và tập trung khắc phục điểm yếu.",
      color: "from-teal-500 to-cyan-600", bgColor: "bg-teal-50", textColor: "text-teal-700",
      badge: "Standard trở lên", badgeColor: "bg-teal-100 text-teal-700",
      features: ["5 năm đề thi đầy đủ", "Giải thích AI + Phân tích điểm yếu", "Chế độ thi thử"],
      tags: ["Đề cũ", "Giải thích AI", "Thi thử"],
    },
    {
      Icon: Award,
      title: "Đề thi cũ Hộ lý phúc lợi quốc gia",
      subtitle: "125 câu × 5 năm - Giải thích đa ngôn ngữ",
      description: "Hoàn toàn thu thập 125 câu đề thi cũ của kỳ thi quốc gia Hộ lý phúc lợi trong 5 năm, kèm giải thích bằng tiếng mẹ đẻ. Nắm xu hướng và từ khóa, khắc phục điểm yếu theo từng lĩnh vực.",
      color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", textColor: "text-emerald-700",
      badge: "Standard trở lên", badgeColor: "bg-emerald-100 text-emerald-700",
      features: ["125 câu × 5 năm", "Giải thích đa ngôn ngữ (tiếng Việt v.v.)", "Ra đề ngẫu nhiên theo lĩnh vực"],
      tags: ["Hộ lý phúc lợi", "Đề cũ", "Đa ngôn ngữ"],
    },
  ],
};

const PRO_COURSES_L10N: Record<string, CourseItem[]> = {
  ja: [
    {
      Icon: Stethoscope,
      title: "うつみ先生のライブ講座",
      subtitle: "現役看護師13年・現場の実例で学ぶ",
      description: "病院・特養・訪問で実際に使う申し送り、バイタル報告、ナースコール対応を毎月4回ライブで学ぶ。録画アーカイブもすべて閲覧できます。",
      color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", textColor: "text-blue-700",
      badge: "Pro以上", badgeColor: "bg-purple-100 text-purple-700",
      features: ["月4回ライブ講座", "全録画アーカイブ視聴", "チャットで質問可"],
      tags: ["ライブ", "録画アーカイブ", "質問あり"],
    },
    {
      Icon: Target,
      title: "介護福祉士 試験集中対策",
      subtitle: "AI弱点分析 × うつみ先生の直前対策",
      description: "AIが過去問分析で苦手分野を特定→集中演習。試験1ヶ月前は週2回の直前対策ライブ。プレミアムは不合格時の合格保証付き。",
      color: "from-green-500 to-teal-600", bgColor: "bg-green-50", textColor: "text-green-700",
      badge: "Pro以上", badgeColor: "bg-purple-100 text-purple-700",
      features: ["AI弱点分析", "本番形式の模擬試験", "直前対策ライブ（週2回）"],
      tags: ["試験対策", "模擬試験", "AI分析"],
    },
    {
      Icon: Languages,
      title: "ベトナム語で学ぶ介護福祉士講座",
      subtitle: "EPA出身・N1取得・介護福祉士のバイリンガル講師",
      description: "日本語の壁を越えて、母語で本質を理解する。EPA経験者が合格者の勉強法を惜しみなく解説。N2〜N1レベルの専門用語もマスター。",
      color: "from-orange-400 to-red-500", bgColor: "bg-orange-50", textColor: "text-orange-700",
      badge: "Pro以上", badgeColor: "bg-purple-100 text-purple-700",
      features: ["ベトナム語で丁寧に解説", "EPA合格者の勉強法", "専門用語マスター"],
      tags: ["バイリンガル", "ベトナム語", "EPA"],
    },
  ],
  vi: [
    {
      Icon: Stethoscope,
      title: "Lớp học trực tiếp với Thầy Utsumi",
      subtitle: "Y tá 13 năm kinh nghiệm - Học từ thực tế",
      description: "Học trực tiếp hàng tháng 4 lần về bàn giao ca, báo cáo dấu hiệu sinh tồn, xử lý gọi y tá thực sự dùng tại bệnh viện, dưỡng lão, điều dưỡng tại nhà. Có thể xem toàn bộ kho lưu trữ ghi hình.",
      color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", textColor: "text-blue-700",
      badge: "Pro trở lên", badgeColor: "bg-purple-100 text-purple-700",
      features: ["4 lần trực tiếp/tháng", "Xem toàn bộ kho ghi hình", "Có thể đặt câu hỏi qua chat"],
      tags: ["Trực tiếp", "Kho ghi hình", "Có hỏi đáp"],
    },
    {
      Icon: Target,
      title: "Ôn tập chuyên sâu kỳ thi Hộ lý phúc lợi",
      subtitle: "Phân tích điểm yếu AI × Ôn thi cuối kỳ với Thầy Utsumi",
      description: "AI xác định điểm yếu qua phân tích đề cũ → tập trung luyện tập. 1 tháng trước thi, lớp học ôn thi 2 lần/tuần. Premium có kèm bảo đảm đậu thi.",
      color: "from-green-500 to-teal-600", bgColor: "bg-green-50", textColor: "text-green-700",
      badge: "Pro trở lên", badgeColor: "bg-purple-100 text-purple-700",
      features: ["Phân tích điểm yếu AI", "Thi thử theo hình thức thực tế", "Ôn thi cuối kỳ (2 lần/tuần)"],
      tags: ["Ôn thi", "Thi thử", "Phân tích AI"],
    },
    {
      Icon: Languages,
      title: "Khóa học Hộ lý phúc lợi bằng tiếng Việt",
      subtitle: "Giảng viên song ngữ - EPA, N1, Hộ lý phúc lợi",
      description: "Vượt qua rào cản tiếng Nhật, hiểu bản chất bằng tiếng mẹ đẻ. Người từng qua EPA tận tình giải thích phương pháp học của những người đã đậu. Làm chủ thuật ngữ chuyên môn trình độ N2~N1.",
      color: "from-orange-400 to-red-500", bgColor: "bg-orange-50", textColor: "text-orange-700",
      badge: "Pro trở lên", badgeColor: "bg-purple-100 text-purple-700",
      features: ["Giải thích cẩn thận bằng tiếng Việt", "Phương pháp học của người đậu EPA", "Làm chủ thuật ngữ chuyên môn"],
      tags: ["Song ngữ", "Tiếng Việt", "EPA"],
    },
  ],
};

const PREMIUM_COURSES_L10N: Record<string, CourseItem[]> = {
  ja: [
    {
      Icon: UserCheck,
      title: "マンツーマン指導（月2回・30分）",
      subtitle: "うつみ先生との1on1セッション",
      description: "苦手な単元の集中指導、試験前の最終確認、学習プランの見直しを個別セッションで。録画URLをあとで復習できます。",
      color: "from-yellow-500 to-amber-600", bgColor: "bg-yellow-50", textColor: "text-yellow-700",
      badge: "Premiumのみ", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["月2回・30分/回", "録画URL共有", "24時間以内にフィードバック"],
    },
    {
      Icon: PenLine,
      title: "履歴書添削・面接練習",
      subtitle: "介護施設に刺さる日本語の書き方",
      description: "外国人ならではの強みを活かした履歴書の書き方と、施設の採用担当者が実際に見るポイントを講師が直接レビュー。模擬面接も実施。",
      color: "from-pink-500 to-rose-600", bgColor: "bg-pink-50", textColor: "text-pink-700",
      badge: "Premiumのみ", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["履歴書・職務経歴書の添削", "模擬面接 + フィードバック", "多言語テンプレート付き"],
    },
    {
      Icon: Briefcase,
      title: "Mediflow 就職保証プログラム",
      subtitle: "合格 → 就職まで完全サポート",
      description: "介護福祉士試験合格後、提携施設への優先紹介。ビザ手続きから入職準備まで専任担当がサポート。（有料職業紹介事業 許可番号: 14-ユ-302174）",
      color: "from-violet-500 to-purple-600", bgColor: "bg-violet-50", textColor: "text-violet-700",
      badge: "Premiumのみ", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["優先求人紹介", "ビザ手続きサポート", "入職後フォロー3ヶ月"],
    },
  ],
  vi: [
    {
      Icon: UserCheck,
      title: "Hướng dẫn 1 kèm 1 (2 lần/tháng, 30 phút)",
      subtitle: "Buổi học 1on1 với Thầy Utsumi",
      description: "Hướng dẫn tập trung các phần yếu, kiểm tra cuối cùng trước khi thi, xem lại kế hoạch học tập trong buổi học cá nhân. Có thể xem lại URL ghi hình sau đó.",
      color: "from-yellow-500 to-amber-600", bgColor: "bg-yellow-50", textColor: "text-yellow-700",
      badge: "Chỉ Premium", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["2 lần/tháng, 30 phút/lần", "Chia sẻ URL ghi hình", "Phản hồi trong 24 giờ"],
    },
    {
      Icon: PenLine,
      title: "Sửa hồ sơ & Luyện phỏng vấn",
      subtitle: "Cách viết tiếng Nhật phù hợp với cơ sở điều dưỡng",
      description: "Giảng viên trực tiếp xem xét cách viết hồ sơ tận dụng điểm mạnh đặc trưng của người nước ngoài và những điểm mà nhà tuyển dụng thực sự chú ý. Cũng thực hiện phỏng vấn thử.",
      color: "from-pink-500 to-rose-600", bgColor: "bg-pink-50", textColor: "text-pink-700",
      badge: "Chỉ Premium", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["Sửa CV & lý lịch công việc", "Phỏng vấn thử + Phản hồi", "Kèm mẫu đa ngôn ngữ"],
    },
    {
      Icon: Briefcase,
      title: "Chương trình đảm bảo việc làm Mediflow",
      subtitle: "Đậu thi → Hỗ trợ toàn diện đến khi có việc làm",
      description: "Sau khi đậu kỳ thi Hộ lý phúc lợi, ưu tiên giới thiệu đến các cơ sở liên kết. Nhân viên phụ trách riêng hỗ trợ từ thủ tục visa đến chuẩn bị vào làm. (Số giấy phép: 14-ユ-302174)",
      color: "from-violet-500 to-purple-600", bgColor: "bg-violet-50", textColor: "text-violet-700",
      badge: "Chỉ Premium", badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["Ưu tiên giới thiệu việc làm", "Hỗ trợ thủ tục visa", "Theo dõi sau khi vào làm 3 tháng"],
    },
  ],
};

// ── ロケールフォールバック付きデータ取得 ──────────────────
function getLocaleData<T>(map: Record<string, T[]>, locale: string): T[] {
  return map[locale] || map["ja"];
}

function CourseCard({
  course,
  isPremium = false,
}: {
  course: CourseItem;
  isPremium?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${course.color}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <course.Icon className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${course.badgeColor}`}>
            {isPremium ? <><Crown className="w-3 h-3 inline mr-0.5" />{course.badge}</> : course.badge}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-0.5">{course.title}</h3>
        <p className={`text-xs font-semibold mb-2 ${course.textColor}`}>{course.subtitle}</p>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{course.description}</p>

        <ul className="space-y-1.5 mb-3">
          {course.features.map((f, i) => (
            <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {"tags" in course && course.tags && (
          <div className="flex flex-wrap gap-1">
            {course.tags.map((tag: string, i: number) => (
              <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${course.bgColor} ${course.textColor}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LockedOverlay({ locale, requiredPlan, ui }: { locale: string; requiredPlan: "standard" | "pro" | "premium"; ui: SectionTexts }) {
  const labelMap: Record<string, string> = {
    standard: ui.standard.sectionLabel.split(" ")[0],
    pro: "Pro",
    premium: "Premium",
  };
  const priceMap = { standard: "¥980/月〜", pro: "¥1,980/月〜", premium: "¥3,980/月〜" };
  const colorMap = { standard: "text-teal-600", pro: "text-purple-600", premium: "text-yellow-600" };
  const label = labelMap[requiredPlan] || requiredPlan;
  const priceLabel = priceMap[requiredPlan];
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
        <Lock className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm font-bold text-gray-700">
          <span className={colorMap[requiredPlan]}>{label}</span>
        </p>
        <p className="text-xs text-gray-400 mb-3">{priceLabel}</p>
        <Link
          href={`/${locale}/pricing`}
          className="flex items-center gap-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Plan
        </Link>
      </div>
      <div className="filter blur-sm pointer-events-none select-none">
        <div className="bg-white border border-gray-100 rounded-3xl p-5 h-60 opacity-50" />
      </div>
    </div>
  );
}

export function PremiumCoursesSection({ locale }: PremiumCoursesSectionProps) {
  const { canAccess, isLoading } = useSubscription();
  const ui = UI_L10N[locale] || UI_L10N.ja;

  const standardCourses = getLocaleData(STANDARD_COURSES_L10N, locale);
  const proCourses = getLocaleData(PRO_COURSES_L10N, locale);
  const premiumCourses = getLocaleData(PREMIUM_COURSES_L10N, locale);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse bg-gray-100 rounded-3xl h-12 w-48" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-60" />
          ))}
        </div>
      </div>
    );
  }

  const hasStandardAccess = canAccess("standard");
  const hasProAccess = canAccess("pro");
  const hasPremiumAccess = canAccess("premium");

  return (
    <div className="space-y-12">
      {/* ── Standard セクション ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-bold px-4 py-2 rounded-full">
            <FileText className="w-4 h-4" />
            {ui.standard.sectionLabel}
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{ui.standard.aiLabel}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              📝
            </div>
            <div>
              <p className="font-bold text-sm mb-1">{ui.standard.bannerTitle}</p>
              <p className="text-white/80 text-xs leading-relaxed">{ui.standard.bannerBody}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">{ui.standard.bannerPrice}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">{ui.standard.bannerTrial}</span>
              </div>
            </div>
          </div>
        </div>

        {hasStandardAccess ? (
          <div className="grid md:grid-cols-2 gap-6">
            {standardCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {standardCourses.map((course, i) => (
              i === 0 ? (
                <Paywall key={i} requiredPlan="standard" locale={locale} inline>
                  <CourseCard course={course} />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="standard" ui={ui} />
              )
            ))}
          </div>
        )}

        {!hasStandardAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 border border-teal-200 text-teal-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-teal-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {ui.standard.ctaButton}
            </Link>
          </div>
        )}
      </section>

      {/* ── Pro セクション ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-bold px-4 py-2 rounded-full">
            <Crown className="w-4 h-4" />
            {ui.pro.sectionLabel}
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Video className="w-3.5 h-3.5" />
            <span>{ui.pro.liveLabel}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              👨‍⚕️
            </div>
            <div>
              <p className="font-bold text-sm mb-1">{ui.pro.bannerTitle}</p>
              <p className="text-white/80 text-xs leading-relaxed">{ui.pro.bannerBody}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">{ui.pro.bannerBadge1}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">{ui.pro.bannerBadge2}</span>
              </div>
            </div>
          </div>
        </div>

        {hasProAccess ? (
          <div className="grid md:grid-cols-3 gap-6">
            {proCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {proCourses.map((course, i) => (
              i === 0 ? (
                <Paywall key={i} requiredPlan="pro" locale={locale} inline>
                  <CourseCard course={course} />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="pro" ui={ui} />
              )
            ))}
          </div>
        )}

        {!hasProAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 border border-purple-200 text-purple-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <Crown className="w-4 h-4" />
              {ui.pro.ctaButton}
            </Link>
          </div>
        )}
      </section>

      {/* ── Premium セクション ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm">
            <Crown className="w-4 h-4" />
            {ui.premium.sectionLabel}
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span>{ui.premium.oneOnOneLabel}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              🏆
            </div>
            <div>
              <p className="font-bold text-sm mb-1">{ui.premium.bannerTitle}</p>
              <p className="text-white/80 text-xs leading-relaxed">{ui.premium.bannerBody}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  {ui.premium.bannerBadge1}
                </span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">{ui.premium.bannerBadge2}</span>
              </div>
            </div>
          </div>
        </div>

        {hasPremiumAccess ? (
          <div className="grid md:grid-cols-3 gap-6">
            {premiumCourses.map((course, i) => (
              <CourseCard key={i} course={course} isPremium />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {premiumCourses.map((course, i) => (
              i === 0 ? (
                <Paywall key={i} requiredPlan="premium" locale={locale} inline>
                  <CourseCard course={course} isPremium />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="premium" ui={ui} />
              )
            ))}
          </div>
        )}

        {!hasPremiumAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              <Crown className="w-4 h-4" />
              {ui.premium.ctaButton}
            </Link>
          </div>
        )}
      </section>

      {/* ── 学習リクエスト促進 ── */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 text-white text-center">
        <div className="text-3xl mb-3">💡</div>
        <h3 className="font-bold text-lg mb-1">{ui.request.title}</h3>
        <p className="text-white/70 text-sm mb-4">{ui.request.body}</p>
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4 text-primary-300" />
          <span className="text-xs text-white/60">{ui.request.note}</span>
        </div>
      </section>
    </div>
  );
}
