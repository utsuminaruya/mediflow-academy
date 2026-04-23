export type ExamType = 'tokutei-ginou' | 'kaigo-fukushishi';
export type PracticeMode = 'year_based' | 'category_based' | 'weak_points' | 'mock_test';
export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type RequiredPlan = 'free' | 'basic' | 'pro';

export interface LocalizedText {
  ja: string;
  vi: string;
}

export interface Exam {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  exam_type: ExamType;
  sub_type: string | null;
  total_questions: number;
  time_limit_minutes: number;
  passing_score_percent: number;
  required_plan: RequiredPlan;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ExamCategory {
  id: string;
  exam_id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  question_count: number;
  sort_order: number;
}

export interface Choice {
  label: string;
  text: LocalizedText;
}

export interface ExplanationData {
  overall: LocalizedText;
  choices: {
    label: string;
    text: LocalizedText;
  }[];
  field_example: LocalizedText;
  key_points: LocalizedText[];
  related_terms: {
    term: string;
    reading: string;
    meaning: LocalizedText;
  }[];
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  category_id: string | null;
  exam_year: number | null;
  exam_session: string | null;
  question_number: number;
  question_text: LocalizedText;
  choices: Choice[];
  correct_answer: number;
  explanation: ExplanationData;
  difficulty: Difficulty;
  created_at: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  exam_id: string;
  mode: PracticeMode;
  category_id: string | null;
  exam_year: number | null;
  status: SessionStatus;
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  time_limit_seconds: number | null;
  time_spent_seconds: number;
  started_at: string;
  completed_at: string | null;
}

export interface ExamAnswer {
  id: string;
  session_id: string;
  user_id: string;
  question_id: string;
  selected_answer: number;
  is_correct: boolean;
  time_spent_seconds: number;
  asked_ai: boolean;
  answered_at: string;
}

export interface AIChatMessage {
  id: string;
  user_id: string;
  question_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface StartSessionRequest {
  exam_id: string;
  mode: PracticeMode;
  category_id?: string;
  exam_year?: number;
}

export interface StartSessionResponse {
  session: PracticeSession;
  questionIds: string[];
}

export interface SubmitAnswerRequest {
  session_id: string;
  question_id: string;
  selected_answer: number;
  time_spent_seconds: number;
}

export interface SubmitAnswerResponse {
  is_correct: boolean;
  correct_answer: number;
  explanation: ExplanationData;
  answer: ExamAnswer;
}

export interface CompleteSessionRequest {
  session_id: string;
  time_spent_seconds: number;
}

export interface CompleteSessionResponse {
  session: PracticeSession;
  score_percent: number;
  passed: boolean;
}

export interface CategoryAnalytics {
  category_id: string;
  category_title: LocalizedText;
  total_answered: number;
  correct_answers: number;
  accuracy_percent: number;
}

export interface AnalyticsResponse {
  total_sessions: number;
  total_answered: number;
  overall_accuracy: number;
  category_analytics: CategoryAnalytics[];
  recent_sessions: PracticeSession[];
}
