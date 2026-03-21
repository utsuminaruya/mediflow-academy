import type { Locale } from "@/types";

export const LOCALES: Locale[] = ["ja", "vi", "en", "my", "id", "zh"];
export const DEFAULT_LOCALE: Locale = "ja";

export const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  vi: "Tiếng Việt",
  en: "English",
  my: "မြန်မာဘာသာ",
  id: "Bahasa Indonesia",
  zh: "中文",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  ja: "🇯🇵",
  vi: "🇻🇳",
  en: "🇺🇸",
  my: "🇲🇲",
  id: "🇮🇩",
  zh: "🇨🇳",
};

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;

export const COURSE_CATEGORIES = {
  jlpt: { ja: "JLPT対策", vi: "Luyện thi JLPT", en: "JLPT Prep" },
  kaigofukushishi: {
    ja: "介護福祉士",
    vi: "Hộ lý phúc lợi",
    en: "Care Worker",
  },
  kango: { ja: "看護", vi: "Điều dưỡng", en: "Nursing" },
  tokutei_ginou: {
    ja: "特定技能",
    vi: "Kỹ năng đặc định",
    en: "Specified Skilled Worker",
  },
  life_skill: {
    ja: "生活スキル",
    vi: "Kỹ năng sống",
    en: "Life Skills",
  },
} as const;

export const FACILITY_TYPES = {
  hospital: { ja: "病院", vi: "Bệnh viện", en: "Hospital" },
  nursing_home: {
    ja: "特別養護老人ホーム",
    vi: "Nhà dưỡng lão",
    en: "Nursing Home",
  },
  day_service: {
    ja: "デイサービス",
    vi: "Dịch vụ ban ngày",
    en: "Day Service",
  },
  home_care: { ja: "訪問介護", vi: "Chăm sóc tại nhà", en: "Home Care" },
} as const;

export const COLORS = {
  primary: "#0066CC",
  secondary: "#00B894",
  accent: "#FF6B6B",
  background: "#F8FAFC",
  text: "#1A202C",
  muted: "#718096",
} as const;

export const LINE_URLS = {
  employer: process.env.NEXT_PUBLIC_LINE_EMPLOYER || "https://lin.ee/R3ytJln",
  jobseeker:
    process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "https://lin.ee/xUocVyI",
} as const;

export const GOOGLE_FORM_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
  "https://forms.gle/H4kMy3fibe5oVrKbA";
