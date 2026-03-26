import Link from "next/link";
import { Plane, Building2, GraduationCap, Stethoscope, Trophy, Globe, type LucideIcon } from "lucide-react";

interface StaffStorySectionProps {
  locale: string;
}

// ── タイムラインステップ型 ──────────────────────────────────
interface JourneyStep {
  Icon: LucideIcon;
  year: string;
  label: string;
  quote: string;
  color: string;
  textColor: string;
  bgLight: string;
}

interface Achievement {
  label: string;
  Icon: LucideIcon;
}

interface StaffData {
  journeySteps: JourneyStep[];
  achievements: Achievement[];
  name: string;
  badge: string;
  quote: string;
  timelineTitle: string;
  stats: Array<{ value: string; label: string }>;
  header: { tagline: string; title: string; subtitle: string };
  cta: { title: string; subtitle: string; button: string };
}

// ── ロケール別コンテンツ ──────────────────────────────────
const STAFF_L10N: Record<string, StaffData> = {
  ja: {
    header: {
      tagline: "唯一無二の成功実体験",
      title: "EPA来日 → 介護福祉士 → 看護師 → N1 → 医療通訳",
      subtitle: "Mediflowスタッフが実際に歩んだ道のりがそのままコンテンツになっています",
    },
    name: "ズン（メディフロースタッフ）",
    badge: "現役医療通訳",
    quote: "「来日当初、現場で何を言われているか半分もわからなかった。でも諦めなかった。Mediflowで教えているのは、私が本当に必要だった日本語と知識です。あなたも絶対にできます。」",
    timelineTitle: "成功への軌跡",
    achievements: [
      { label: "EPA候補者", Icon: Plane },
      { label: "介護福祉士", Icon: GraduationCap },
      { label: "看護師", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "医療通訳", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "Day 1", label: "EPA経由で来日",
        quote: "「日本語はN4レベル。現場の会話が半分もわからなかった」",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "Year 1–3", label: "介護現場で奮闘",
        quote: "「毎日知らない専門用語だらけ。でも利用者さんの笑顔が支えに」",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "合格", label: "介護福祉士 国家試験 合格",
        quote: "「日本語と専門知識の壁を同時に乗り越えた。諦めなくてよかった」",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "合格", label: "看護師 国家試験 合格",
        quote: "「一度不合格。でもその経験が一番の教科書になった」",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "JLPT N1 取得",
        quote: "「専門書が辞書なしで読める。日本語の壁を完全に突破した」",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "現在", label: "医療通訳として活躍中",
        quote: "「外国人患者さんと医療者の架け橋として、今日も現場に立っています」",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "資格・検定取得" },
      { value: "N1", label: "日本語能力" },
      { value: "EPA", label: "スタートライン" },
    ],
    cta: {
      title: "あなたも同じ道を歩けます",
      subtitle: "ズンが実際に使った勉強法・乗り越え方をMediflowのコースに詰め込みました",
      button: "コースを今すぐ始める →",
    },
  },

  vi: {
    header: {
      tagline: "Hành trình thành công thực tế",
      title: "EPA → Hộ lý phúc lợi → Y tá → N1 → Phiên dịch y tế",
      subtitle: "Chính con đường mà nhân viên Mediflow đã đi là nội dung của các khóa học",
    },
    name: "Dũng (Nhân viên Mediflow)",
    badge: "Phiên dịch y tế hiện tại",
    quote: "\"Khi mới đến Nhật, tôi không hiểu một nửa những gì được nói ở nơi làm việc. Nhưng tôi không bỏ cuộc. Những gì tôi dạy tại Mediflow chính là tiếng Nhật và kiến thức mà tôi thực sự cần. Bạn chắc chắn cũng làm được.\"",
    timelineTitle: "Hành trình đến thành công",
    achievements: [
      { label: "Ứng viên EPA", Icon: Plane },
      { label: "Hộ lý phúc lợi", Icon: GraduationCap },
      { label: "Y tá", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "Phiên dịch y tế", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "Ngày 1", label: "Đến Nhật qua chương trình EPA",
        quote: "\"Tiếng Nhật mới ở trình N4. Không hiểu một nửa cuộc hội thoại ở nơi làm việc\"",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "Năm 1–3", label: "Nỗ lực tại cơ sở điều dưỡng",
        quote: "\"Mỗi ngày đầy ắp thuật ngữ chuyên môn. Nhưng nụ cười của người dùng dịch vụ là nguồn động lực\"",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "Đậu", label: "Đậu kỳ thi quốc gia Hộ lý phúc lợi",
        quote: "\"Vượt qua rào cản tiếng Nhật và kiến thức chuyên môn cùng một lúc. Thật may vì không bỏ cuộc\"",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "Đậu", label: "Đậu kỳ thi quốc gia Y tá",
        quote: "\"Từng thi trượt một lần. Nhưng kinh nghiệm đó trở thành bài học quý giá nhất\"",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "Đạt JLPT N1",
        quote: "\"Có thể đọc sách chuyên môn mà không cần từ điển. Hoàn toàn vượt qua rào cản tiếng Nhật\"",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "Hiện tại", label: "Đang hoạt động với tư cách phiên dịch y tế",
        quote: "\"Làm cầu nối giữa bệnh nhân nước ngoài và nhân viên y tế, hôm nay tôi vẫn đang làm việc tại hiện trường\"",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "Chứng chỉ đạt được" },
      { value: "N1", label: "Năng lực tiếng Nhật" },
      { value: "EPA", label: "Điểm xuất phát" },
    ],
    cta: {
      title: "Bạn cũng có thể đi cùng con đường này",
      subtitle: "Phương pháp học tập và cách vượt qua khó khăn thực tế của Dũng được đưa vào các khóa học của Mediflow",
      button: "Bắt đầu khóa học ngay →",
    },
  },

  en: {
    header: {
      tagline: "A unique real success story",
      title: "EPA → Care Worker → Nurse → N1 → Medical Interpreter",
      subtitle: "The actual journey of a Mediflow staff member has become the content of our courses",
    },
    name: "Dung (Mediflow Staff)",
    badge: "Active Medical Interpreter",
    quote: "\"When I first arrived in Japan, I couldn't understand half of what was said at work. But I didn't give up. What I teach at Mediflow is the Japanese and knowledge I truly needed. You can definitely do it too.\"",
    timelineTitle: "Path to Success",
    achievements: [
      { label: "EPA Candidate", Icon: Plane },
      { label: "Care Worker", Icon: GraduationCap },
      { label: "Nurse", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "Medical Interpreter", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "Day 1", label: "Arrived in Japan via EPA",
        quote: "\"Japanese level was N4. Couldn't understand half the conversations at work\"",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "Year 1–3", label: "Working hard in care facilities",
        quote: "\"Every day full of unfamiliar technical terms. But the smiles of residents were my support\"",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "Passed", label: "Passed National Care Worker Exam",
        quote: "\"Overcame both Japanese and specialized knowledge barriers at once. Glad I didn't give up\"",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "Passed", label: "Passed National Nurse Exam",
        quote: "\"Failed once. But that experience became my best textbook\"",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "Achieved JLPT N1",
        quote: "\"Can read professional texts without a dictionary. Completely broke through the Japanese barrier\"",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "Now", label: "Active as a Medical Interpreter",
        quote: "\"As a bridge between foreign patients and medical staff, I'm still on the frontline today\"",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "Certifications" },
      { value: "N1", label: "Japanese Level" },
      { value: "EPA", label: "Starting Point" },
    ],
    cta: {
      title: "You can walk the same path",
      subtitle: "The study methods and ways to overcome challenges that Dung actually used are packed into Mediflow's courses",
      button: "Start Courses Now →",
    },
  },

  my: {
    header: {
      tagline: "တကယ့်အောင်မြင်မှု အတွေ့အကြုံ",
      title: "EPA → သူနာပြု → သူနာပြုဆရာမ → N1 → ဆေးပညာ စာပြန်",
      subtitle: "Mediflow ဝန်ထမ်း တကယ်လျှောက်ခဲ့သည့် လမ်းကြောင်းသည် သင်တန်းအကြောင်းအရာဖြစ်သည်",
    },
    name: "ဇန်း (Mediflow ဝန်ထမ်း)",
    badge: "လက်ရှိ ဆေးပညာ စာပြန်",
    quote: "\"ဂျပန်ကို ရောက်ခဲ့သည့် ကာလတွင် အလုပ်ခွင်မှ ပြောသည့် အရာ တစ်ဝက်မျှ နားမလည်ခဲ့ပေ။ သို့သော် ဆောင်ရွက်ခဲ့သည်ကို မပြတ်ကြိုးစားခဲ့သည်။ Mediflow တွင် ကျွန်မ သင်ကြားသည့် အရာသည် ကျွန်မ တကယ်လိုအပ်ခဲ့သည့် ဂျပန်ဘာသာနှင့် အသိပညာပင်ဖြစ်သည်။ သင်လည်း ဧကန်မုချ ဆောင်ရွက်နိုင်သည်။\"",
    timelineTitle: "အောင်မြင်မှုသို့ ခရီးလမ်း",
    achievements: [
      { label: "EPA ကိုယ်စားလှယ်", Icon: Plane },
      { label: "သူနာပြု", Icon: GraduationCap },
      { label: "သူနာပြုဆရာမ", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "ဆေးပညာ စာပြန်", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "နေ့ ၁", label: "EPA မှတဆင့် ဂျပန်သို့ ရောက်ရှိ",
        quote: "\"ဂျပန်ဘာသာ N4 အဆင့်။ အလုပ်ခွင် ဆွေးနွေးမှု တစ်ဝက် နားမလည်ခဲ့\"",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "နှစ် ၁–၃", label: "သူနာပြုဌာနတွင် ကြိုးပမ်း",
        quote: "\"နေ့တိုင်း မသိသော ကျွမ်းကျင်ရေးဆိုင်ရာ ဝေါဟာရများဖြင့် ပြည့်နေ်သည်\"",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "အောင်", label: "သူနာပြု အမျိုးသား စာမေးပွဲ အောင်",
        quote: "\"ဂျပန်ဘာသာနှင့် ကျွမ်းကျင်ပညာ နှစ်ခုလုံး တပြိုင်တည်း ကျော်လွှားနိုင်ခဲ့သည်\"",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "အောင်", label: "သူနာပြုဆရာမ အမျိုးသား စာမေးပွဲ အောင်",
        quote: "\"တစ်ကြိမ် ကျရှုံးခဲ့သည်။ သို့သော် ထိုအတွေ့အကြုံသည် အကောင်းဆုံး သင်ခန်းစာဖြစ်ခဲ့သည်\"",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "JLPT N1 ရရှိ",
        quote: "\"အဘိဓာန်မပါဘဲ ကျွမ်းကျင်ရေး စာအုပ်များ ဖတ်နိုင်ခဲ့သည်\"",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "ယခု", label: "ဆေးပညာ စာပြန်အဖြစ် လုပ်ကိုင်နေ",
        quote: "\"နိုင်ငံခြား လူနာများနှင့် ဆေးဘက်ဆိုင်ရာ ဝန်ထမ်းများကြား တံတားအဖြစ် ယနေ့လည်း ကွင်းဆင်းနေသည်\"",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "လက်မှတ်ရရှိမှု" },
      { value: "N1", label: "ဂျပန်ဘာသာ အဆင့်" },
      { value: "EPA", label: "စတင်ချက်" },
    ],
    cta: {
      title: "သင်လည်း တူညီသော လမ်းကြောင်း လျှောက်နိုင်သည်",
      subtitle: "ဇန်း တကယ်သုံးခဲ့သော ကျောင်းတက်နည်းနှင့် အခက်အခဲ ကျော်လွှားနည်းကို Mediflow သင်တန်းများတွင် ထည့်သွင်းထားသည်",
      button: "သင်တန်းကို ယခုပင် စတင်ပါ →",
    },
  },

  id: {
    header: {
      tagline: "Kisah sukses nyata yang unik",
      title: "EPA → Perawat → Perawat Terlatih → N1 → Penerjemah Medis",
      subtitle: "Perjalanan nyata staf Mediflow menjadi konten kursus kami",
    },
    name: "Dung (Staf Mediflow)",
    badge: "Penerjemah Medis Aktif",
    quote: "\"Ketika pertama kali tiba di Jepang, saya tidak mengerti separuh dari apa yang dibicarakan di tempat kerja. Tapi saya tidak menyerah. Apa yang saya ajarkan di Mediflow adalah bahasa Jepang dan pengetahuan yang benar-benar saya butuhkan. Anda pasti bisa melakukannya juga.\"",
    timelineTitle: "Jejak Menuju Sukses",
    achievements: [
      { label: "Kandidat EPA", Icon: Plane },
      { label: "Perawat Lansia", Icon: GraduationCap },
      { label: "Perawat", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "Penerjemah Medis", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "Hari 1", label: "Tiba di Jepang melalui EPA",
        quote: "\"Bahasa Jepang level N4. Tidak mengerti separuh percakapan di tempat kerja\"",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "Tahun 1–3", label: "Berjuang di fasilitas perawatan",
        quote: "\"Setiap hari dipenuhi istilah teknis yang tidak dikenal. Tapi senyum pengguna layanan adalah dukungan\"",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "Lulus", label: "Lulus Ujian Nasional Perawat Lansia",
        quote: "\"Berhasil melampaui hambatan bahasa Jepang dan pengetahuan spesialis sekaligus\"",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "Lulus", label: "Lulus Ujian Nasional Perawat",
        quote: "\"Pernah gagal sekali. Tapi pengalaman itu menjadi buku teks terbaik\"",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "Meraih JLPT N1",
        quote: "\"Bisa membaca buku profesional tanpa kamus. Sepenuhnya melampaui hambatan bahasa Jepang\"",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "Sekarang", label: "Aktif sebagai Penerjemah Medis",
        quote: "\"Sebagai jembatan antara pasien asing dan tenaga medis, saya masih bekerja di lapangan hari ini\"",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "Sertifikasi" },
      { value: "N1", label: "Kemampuan Jepang" },
      { value: "EPA", label: "Titik Awal" },
    ],
    cta: {
      title: "Anda juga bisa menempuh jalan yang sama",
      subtitle: "Metode belajar dan cara mengatasi kesulitan yang benar-benar digunakan Dung telah dimasukkan ke dalam kursus Mediflow",
      button: "Mulai Kursus Sekarang →",
    },
  },

  zh: {
    header: {
      tagline: "独一无二的真实成功经历",
      title: "EPA来日 → 介护福祉士 → 护士 → N1 → 医疗口译",
      subtitle: "Mediflow员工实际走过的道路就是我们的课程内容",
    },
    name: "勇（Mediflow员工）",
    badge: "现役医疗口译员",
    quote: "\"刚到日本时，工作现场说的话有一半听不懂。但我没有放弃。我在Mediflow教授的，是我真正需要的日语和知识。你一定也能做到。\"",
    timelineTitle: "通向成功之路",
    achievements: [
      { label: "EPA候选人", Icon: Plane },
      { label: "介护福祉士", Icon: GraduationCap },
      { label: "护士", Icon: Stethoscope },
      { label: "JLPT N1", Icon: Trophy },
      { label: "医疗口译", Icon: Globe },
    ],
    journeySteps: [
      {
        Icon: Plane, year: "第1天", label: "通过EPA来日",
        quote: "\"日语N4水平，工作现场的对话有一半听不懂\"",
        color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50",
      },
      {
        Icon: Building2, year: "1–3年", label: "在介护现场奋斗",
        quote: "\"每天都是陌生的专业术语，但利用者的笑容给了我支撑\"",
        color: "bg-teal-500", textColor: "text-teal-600", bgLight: "bg-teal-50",
      },
      {
        Icon: GraduationCap, year: "合格", label: "通过介护福祉士国家考试",
        quote: "\"同时克服了日语和专业知识的双重障碍，庆幸没有放弃\"",
        color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50",
      },
      {
        Icon: Stethoscope, year: "合格", label: "通过护士国家考试",
        quote: "\"曾经失败过一次，但那段经历成为了最好的教科书\"",
        color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50",
      },
      {
        Icon: Trophy, year: "N1", label: "取得JLPT N1",
        quote: "\"不需要字典就能阅读专业书籍，完全突破了日语障碍\"",
        color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50",
      },
      {
        Icon: Globe, year: "现在", label: "活跃于医疗口译工作",
        quote: "\"作为外国患者与医疗人员之间的桥梁，今天仍然奋战在一线\"",
        color: "bg-rose-500", textColor: "text-rose-600", bgLight: "bg-rose-50",
      },
    ],
    stats: [
      { value: "5+", label: "资格证书" },
      { value: "N1", label: "日语能力" },
      { value: "EPA", label: "出发点" },
    ],
    cta: {
      title: "你也可以走同样的路",
      subtitle: "勇实际使用的学习方法和克服困难的方式已经融入Mediflow的课程中",
      button: "立即开始课程 →",
    },
  },
};

export function StaffStorySection({ locale }: StaffStorySectionProps) {
  const data = STAFF_L10N[locale] || STAFF_L10N.ja;

  return (
    <section className="rounded-3xl overflow-hidden border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 mb-12">
      {/* ── ヘッダー ── */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full tracking-wider">
            MEDIFLOW STORY
          </span>
          <span className="text-xs text-white/60">{data.header.tagline}</span>
        </div>
        <h2 className="text-xl font-bold">
          {data.header.title}
        </h2>
        <p className="text-white/80 text-sm mt-1">
          {data.header.subtitle}
        </p>
      </div>

      <div className="p-6">
        {/* ── プロフィールカード ── */}
        <div className="flex flex-col sm:flex-row items-start gap-5 mb-8 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* アバター */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            👩‍⚕️
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-bold text-gray-900 text-lg">{data.name}</span>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                {data.badge}
              </span>
            </div>
            {/* 資格ラベル */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {data.achievements.map((a, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium"
                >
                  <a.Icon className="w-3.5 h-3.5" />
                  {a.label}
                </span>
              ))}
            </div>
            {/* 引用 */}
            <blockquote className="border-l-4 border-primary-400 pl-4 italic text-gray-600 text-sm leading-relaxed">
              {data.quote}
            </blockquote>
          </div>
        </div>

        {/* ── タイムライン ── */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-gray-300 inline-block" />
            {data.timelineTitle}
            <span className="flex-1 h-px bg-gray-300 inline-block" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.journeySteps.map((step, i) => (
              <div key={i} className={`relative ${step.bgLight} rounded-2xl p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 ${step.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                    <step.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${step.textColor}`}>{step.year}</span>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{step.label}</p>
                  </div>
                  {i < data.journeySteps.length - 1 && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-gray-300 text-xl hidden lg:block z-10">
                      →
                    </span>
                  )}
                </div>
                <p className={`text-xs ${step.textColor} italic leading-relaxed`}>{step.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 数字で見る実績 ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center bg-white rounded-2xl p-4 border border-gray-100">
              <div className={`text-2xl font-bold ${i === 0 ? "text-primary-600" : i === 1 ? "text-secondary-600" : "text-green-600"}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-5 text-white text-center">
          <p className="font-bold text-base mb-1">{data.cta.title}</p>
          <p className="text-white/75 text-xs mb-4">
            {data.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary-50 transition-colors shadow-sm"
          >
            📚 {data.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
