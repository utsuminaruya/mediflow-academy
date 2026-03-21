export type Locale = "ja" | "vi" | "en" | "my" | "id" | "zh";

export type UserRole = "learner" | "instructor" | "admin";

export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type CourseCategory =
  | "jlpt"
  | "kaigofukushishi"
  | "kango"
  | "tokutei_ginou"
  | "life_skill";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type LessonType =
  | "video"
  | "reading"
  | "listening"
  | "speaking"
  | "vocabulary"
  | "grammar"
  | "quiz";

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type FacilityType =
  | "hospital"
  | "nursing_home"
  | "day_service"
  | "home_care";

export type ConversationType = "tutor" | "career" | "life_support";

export interface MultiLangText {
  ja: string;
  vi?: string;
  en?: string;
  my?: string;
  id?: string;
  zh?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  nationality: string;
  native_language: Locale;
  current_visa_status?: string;
  japanese_level: JLPTLevel;
  target_qualification?: string;
  avatar_url?: string;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: MultiLangText;
  description: MultiLangText;
  category: CourseCategory;
  level: CourseLevel;
  target_jlpt?: JLPTLevel;
  thumbnail_url?: string;
  total_lessons: number;
  estimated_hours?: number;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: MultiLangText;
  content: LessonContent;
  lesson_type: LessonType;
  order_index: number;
  duration_minutes?: number;
  created_at: string;
}

export interface LessonContent {
  text?: MultiLangText;
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  vocabulary?: VocabularyItem[];
  grammar_points?: GrammarPoint[];
}

export interface VocabularyItem {
  word: string;
  reading: string;
  translation: MultiLangText;
  example_sentence: string;
  example_translation: MultiLangText;
  audio_url?: string;
}

export interface GrammarPoint {
  pattern: string;
  explanation: MultiLangText;
  examples: { ja: string; translation: MultiLangText }[];
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  status: ProgressStatus;
  score?: number;
  time_spent_seconds: number;
  completed_at?: string;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question: MultiLangText;
  options: QuizOption[];
  explanation?: MultiLangText;
  question_type: "multiple_choice" | "fill_blank" | "listening" | "speaking";
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface QuizOption {
  text: MultiLangText;
  is_correct: boolean;
}

export interface JobListing {
  id: string;
  facility_name: string;
  facility_type: FacilityType;
  location: string;
  prefecture: string;
  job_title: MultiLangText;
  description: MultiLangText;
  required_qualification?: string;
  required_jlpt_level?: JLPTLevel;
  salary_min?: number;
  salary_max?: number;
  visa_support: boolean;
  housing_support: boolean;
  is_active: boolean;
  created_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  conversation_type: ConversationType;
  messages: AIMessage[];
  context?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type:
    | "course_completed"
    | "streak"
    | "quiz_perfect"
    | "jlpt_passed";
  achievement_data?: Record<string, unknown>;
  earned_at: string;
}

export interface MatchResult {
  job_id: string;
  match_score: number;
  match_reasons: string[];
  gaps: string[];
  recommendation: string;
}
