export interface MultilingualText {
  ja: string;
  vi: string;
}

export interface AICharacter {
  role: 'resident' | 'senior_staff' | 'family' | 'nurse' | 'doctor';
  name: string;
  age?: number;
  personality: MultilingualText;
  background: MultilingualText;
}

export interface RoleplayMessage {
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
  evaluation?: {
    rating: 'good' | 'okay' | 'needs_work';
    note?: string;
  };
}

export interface ScenarioScores {
  keigo: number;
  care_terms: number;
  empathy: number;
  flow: number;
  grammar: number;
}

export interface ScenarioFeedback {
  good_points: Array<{ point: MultilingualText; quote: string }>;
  improvement_points: Array<{ point: MultilingualText; your_message: string; better_example: MultilingualText }>;
  next_lessons: Array<{ lesson_id: string; title: MultilingualText; reason: MultilingualText }>;
}

export interface RoleplayScenario {
  id: string;
  slug: string;
  title: MultilingualText;
  description: MultilingualText;
  category: string;
  difficulty: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  estimated_minutes: number;
  required_plan: 'free' | 'basic' | 'pro';
  ai_character: AICharacter;
  user_role: string;
  scene_setting: MultilingualText;
  learning_objectives: MultilingualText[];
  key_phrases: Array<{ phrase: string; meaning: MultilingualText }>;
  success_criteria: MultilingualText[];
  ai_system_prompt: string;
  sort_order: number;
  is_active: boolean;
}

export interface RoleplaySession {
  id: string;
  user_id: string;
  scenario_id: string;
  messages: RoleplayMessage[];
  turn_count: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  total_score?: number;
  scores_breakdown?: ScenarioScores;
  feedback?: ScenarioFeedback;
  created_at: string;
  completed_at?: string;
}

export interface HintResponse {
  suggestion_ja: string;
  explanation_vi: string;
  alternative_ja: string;
}
