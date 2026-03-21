import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BookOpen, Clock, Users, ChevronRight, Star } from "lucide-react";

// Per-locale course content translations
const COURSE_L10N: Record<string, Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  levelLabel: string;
}>> = {
  ja: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "JLPT N5 完全対策コース",
      description: "ひらがな・カタカナから基本語彙800語、基本文法まで体系的に学習",
      category: "JLPT",
      levelLabel: "初心者向け",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "介護の日本語 基礎コース",
      description: "介護現場で実際に使う日本語。申し送り・記録・利用者対応まで実践的に",
      category: "介護専門",
      levelLabel: "初心者向け",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "特定技能「介護」試験対策",
      description: "技能試験と日本語試験に特化。過去問分析と弱点克服で合格を目指す",
      category: "資格対策",
      levelLabel: "中級者向け",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "JLPT N4 対策コース",
      description: "日常会話・語彙1,500語・基本的な読み書きをマスター",
      category: "JLPT",
      levelLabel: "初心者向け",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "日本生活スキルコース",
      description: "銀行口座・携帯契約・住居探し・行政手続き。日本での生活を完全サポート",
      category: "生活スキル",
      levelLabel: "全レベル",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "JLPT N3 対策コース",
      description: "一般的な話題の理解・語彙3,000語・業務基礎日本語",
      category: "JLPT",
      levelLabel: "中級者向け",
    },
  ],
  vi: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "Luyện thi JLPT N5 toàn diện",
      description: "Học có hệ thống từ hiragana, katakana đến 800 từ vựng cơ bản và ngữ pháp",
      category: "JLPT",
      levelLabel: "Dành cho người mới",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "Tiếng Nhật điều dưỡng cơ bản",
      description: "Tiếng Nhật thực tế tại cơ sở điều dưỡng: bàn giao ca, ghi chép, giao tiếp với người dùng dịch vụ",
      category: "Điều dưỡng",
      levelLabel: "Dành cho người mới",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "Luyện thi Kỹ năng đặc định \"Điều dưỡng\"",
      description: "Tập trung vào kỳ thi kỹ năng và tiếng Nhật. Phân tích đề cũ, khắc phục điểm yếu để đậu thi",
      category: "Luyện thi",
      levelLabel: "Trình độ trung cấp",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "Luyện thi JLPT N4",
      description: "Hội thoại hàng ngày, 1.500 từ vựng, đọc viết cơ bản",
      category: "JLPT",
      levelLabel: "Dành cho người mới",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "Kỹ năng sống tại Nhật Bản",
      description: "Mở tài khoản ngân hàng, hợp đồng điện thoại, tìm nhà, thủ tục hành chính",
      category: "Kỹ năng sống",
      levelLabel: "Mọi trình độ",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "Luyện thi JLPT N3",
      description: "Hiểu các chủ đề thông thường, 3.000 từ vựng, tiếng Nhật cơ bản trong công việc",
      category: "JLPT",
      levelLabel: "Trình độ trung cấp",
    },
  ],
  en: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "JLPT N5 Complete Prep Course",
      description: "Systematic study from hiragana/katakana to 800 basic vocabulary words and grammar",
      category: "JLPT",
      levelLabel: "Beginner",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "Japanese for Caregiving Basics",
      description: "Practical Japanese used in care facilities: shift handovers, record keeping, and resident communication",
      category: "Care Specialty",
      levelLabel: "Beginner",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "Specified Skilled Worker \"Care\" Exam Prep",
      description: "Focused on skills and language tests. Analyze past questions and overcome weak points",
      category: "Exam Prep",
      levelLabel: "Intermediate",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "JLPT N4 Prep Course",
      description: "Daily conversation, 1,500 vocabulary words, basic reading and writing",
      category: "JLPT",
      levelLabel: "Beginner",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "Life Skills in Japan",
      description: "Bank accounts, phone contracts, finding housing, administrative procedures",
      category: "Life Skills",
      levelLabel: "All Levels",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "JLPT N3 Prep Course",
      description: "Understanding everyday topics, 3,000 vocabulary words, workplace Japanese basics",
      category: "JLPT",
      levelLabel: "Intermediate",
    },
  ],
  my: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "JLPT N5 ပြည့်စုံသောသင်တန်း",
      description: "ဟီရာဂါနာ၊ကာတာကာနာမှ အခြေခံစကားလုံး ၈၀၀ နှင့် ဒါဏ်ရာကျသော သဒ္ဒါအထိ စနစ်တကျသင်ကြားမည်",
      category: "JLPT",
      levelLabel: "အစပြုသူများအတွက်",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "သူနာပြုဂျပန်ဘာသာ အခြေခံသင်တန်း",
      description: "သူနာပြုဌာနတွင် အသုံးပြုသည့် ဂျပန်ဘာသာ - လဲလှယ်မှတ်တမ်း၊ မှတ်တမ်းများ၊ အသုံးပြုသူနှင့် ဆက်ဆံရေး",
      category: "သူနာပြု",
      levelLabel: "အစပြုသူများအတွက်",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "သတ်မှတ်ကျွမ်းကျင်မှု \"သူနာပြု\" စာမေးပွဲပြင်ဆင်",
      description: "ကျွမ်းကျင်မှုစာမေးပွဲနှင့် ဘာသာစကားစာမေးပွဲအတွက် အာရုံစိုက်သည်",
      category: "စာမေးပွဲပြင်ဆင်",
      levelLabel: "အလယ်အလတ်",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "JLPT N4 သင်တန်း",
      description: "နေ့စဉ်စကားပြော၊ စကားလုံး ၁,၅၀၀ ၊ အခြေခံဖတ်ရေးသားခြင်း",
      category: "JLPT",
      levelLabel: "အစပြုသူများအတွက်",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "ဂျပန်နိုင်ငံတွင် နေထိုင်ရေးကျွမ်းကျင်မှုများ",
      description: "ဘဏ်အကောင့်ဖွင့်ခြင်း၊ဖုန်းသတ်မှတ်ခြင်း၊အိမ်ရှာဖွေခြင်း",
      category: "နေထိုင်ရေးကျွမ်းကျင်မှု",
      levelLabel: "အဆင့်အားလုံး",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "JLPT N3 သင်တန်း",
      description: "ယေဘုယျဘာသာရပ်များနားလည်ခြင်း၊ စကားလုံး ၃,၀၀၀ ၊ အလုပ်ခွင်ဂျပန်ဘာသာ",
      category: "JLPT",
      levelLabel: "အလယ်အလတ်",
    },
  ],
  id: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "Kursus Persiapan JLPT N5 Lengkap",
      description: "Belajar sistematis dari hiragana, katakana hingga 800 kosakata dasar dan tata bahasa",
      category: "JLPT",
      levelLabel: "Pemula",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "Bahasa Jepang Perawatan Dasar",
      description: "Bahasa Jepang praktis di fasilitas perawatan: serah terima shift, pencatatan, komunikasi dengan pengguna layanan",
      category: "Perawatan",
      levelLabel: "Pemula",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "Persiapan Ujian Pekerja Terampil \"Perawatan\"",
      description: "Fokus pada ujian keterampilan dan bahasa Jepang. Analisis soal lama, atasi kelemahan untuk lulus",
      category: "Persiapan Ujian",
      levelLabel: "Menengah",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "Kursus JLPT N4",
      description: "Percakapan sehari-hari, 1.500 kosakata, baca tulis dasar",
      category: "JLPT",
      levelLabel: "Pemula",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "Keterampilan Hidup di Jepang",
      description: "Rekening bank, kontrak ponsel, mencari tempat tinggal, prosedur administrasi",
      category: "Keterampilan Hidup",
      levelLabel: "Semua Level",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "Kursus JLPT N3",
      description: "Memahami topik umum, 3.000 kosakata, bahasa Jepang dasar di tempat kerja",
      category: "JLPT",
      levelLabel: "Menengah",
    },
  ],
  zh: [
    {
      id: "c1000000-0000-0000-0000-000000000001",
      title: "JLPT N5 全套备考课程",
      description: "从平假名、片假名到800个基础词汇和语法，系统学习",
      category: "JLPT",
      levelLabel: "初学者",
    },
    {
      id: "c2000000-0000-0000-0000-000000000001",
      title: "护理日语基础课程",
      description: "护理现场实用日语：交接班、记录书写、与利用者沟通",
      category: "护理专业",
      levelLabel: "初学者",
    },
    {
      id: "c3000000-0000-0000-0000-000000000001",
      title: "特定技能「护理」考试备考",
      description: "专注于技能考试和日语考试。分析历年真题，克服弱点",
      category: "资格备考",
      levelLabel: "中级",
    },
    {
      id: "c4000000-0000-0000-0000-000000000001",
      title: "JLPT N4 备考课程",
      description: "日常会话、1500个词汇、基础读写",
      category: "JLPT",
      levelLabel: "初学者",
    },
    {
      id: "c5000000-0000-0000-0000-000000000001",
      title: "日本生活技能课程",
      description: "开设银行账户、手机合约、找房子、行政手续",
      category: "生活技能",
      levelLabel: "全级别",
    },
    {
      id: "c6000000-0000-0000-0000-000000000001",
      title: "JLPT N3 备考课程",
      description: "理解常见话题、3000个词汇、职场基础日语",
      category: "JLPT",
      levelLabel: "中级",
    },
  ],
};

const PAGE_HEADERS: Record<string, { title: string; subtitle: string; featured: string; all: string }> = {
  ja: { title: "コース一覧", subtitle: "あなたの目標に合わせたコースを選んでください", featured: "おすすめコース", all: "全コース" },
  vi: { title: "Danh sách khóa học", subtitle: "Chọn khóa học phù hợp với mục tiêu của bạn", featured: "Khóa học nổi bật", all: "Tất cả khóa học" },
  en: { title: "Course Catalog", subtitle: "Choose a course that matches your goals", featured: "Featured Courses", all: "All Courses" },
  my: { title: "သင်တန်းစာရင်း", subtitle: "သင်၏ပန်းတိုင်နှင့် ကိုက်ညီသောသင်တန်းကိုရွေးချယ်ပါ", featured: "အကြံပြုသင်တန်းများ", all: "သင်တန်းအားလုံး" },
  id: { title: "Daftar Kursus", subtitle: "Pilih kursus yang sesuai dengan tujuan Anda", featured: "Kursus Unggulan", all: "Semua Kursus" },
  zh: { title: "课程列表", subtitle: "选择适合您目标的课程", featured: "推荐课程", all: "全部课程" },
};

const COURSES_META = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    lessons: 15,
    hours: 30,
    emoji: "🎌",
    color: "from-red-400 to-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    isNew: true,
    isFeatured: true,
    learners: 1234,
    rating: 4.8,
  },
  {
    id: "c2000000-0000-0000-0000-000000000001",
    lessons: 12,
    hours: 24,
    emoji: "🏥",
    color: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    isNew: false,
    isFeatured: true,
    learners: 856,
    rating: 4.9,
  },
  {
    id: "c3000000-0000-0000-0000-000000000001",
    lessons: 11,
    hours: 22,
    emoji: "📋",
    color: "from-green-400 to-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    isNew: false,
    isFeatured: false,
    learners: 543,
    rating: 4.7,
  },
  {
    id: "c4000000-0000-0000-0000-000000000001",
    lessons: 18,
    hours: 36,
    emoji: "📚",
    color: "from-orange-400 to-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    isNew: true,
    isFeatured: false,
    learners: 421,
    rating: 4.6,
  },
  {
    id: "c5000000-0000-0000-0000-000000000001",
    lessons: 10,
    hours: 15,
    emoji: "🏠",
    color: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    isNew: false,
    isFeatured: false,
    learners: 987,
    rating: 4.8,
  },
  {
    id: "c6000000-0000-0000-0000-000000000001",
    lessons: 24,
    hours: 50,
    emoji: "🎯",
    color: "from-indigo-400 to-indigo-500",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    isNew: false,
    isFeatured: false,
    learners: 312,
    rating: 4.7,
  },
];

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  const localeKey = (locale in COURSE_L10N) ? locale : "ja";
  const l10n = COURSE_L10N[localeKey];
  const headers = PAGE_HEADERS[localeKey] || PAGE_HEADERS.ja;

  const COURSES = COURSES_META.map((meta) => {
    const text = l10n.find((c) => c.id === meta.id) || l10n[0];
    return { ...meta, ...text };
  });

  const featured = COURSES.filter((c) => c.isFeatured);
  const all = COURSES;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-12">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">{headers.title}</h1>
          <p className="text-white/80">{headers.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            {headers.featured}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((course) => (
              <Link
                key={course.id}
                href={`/${locale}/courses/${course.id}`}
                className="card hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {course.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${course.bgColor} ${course.textColor} text-xs`}>
                        {course.category}
                      </span>
                      {course.isNew && (
                        <span className="badge bg-accent-50 text-accent-500 text-xs">NEW</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} {t("lessons")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.hours} {t("hours")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.learners.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors mt-1 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">{headers.all}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {all.map((course) => (
              <Link
                key={course.id}
                href={`/${locale}/courses/${course.id}`}
                className="card hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {course.emoji}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${course.bgColor} ${course.textColor} text-xs`}>
                    {course.category}
                  </span>
                  {course.isNew && (
                    <span className="badge bg-red-50 text-red-500 text-xs">NEW</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-muted mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{course.levelLabel}</span>
                  <span>{course.hours} {t("hours")}</span>
                </div>
                <div className="progress-bar mt-3">
                  <div className="progress-fill" style={{ width: "0%" }} />
                </div>
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>0%</span>
                  <span>{course.lessons} {t("lessons")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
