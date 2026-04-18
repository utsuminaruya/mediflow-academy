export type CandidateStatus =
  | 'active'
  | 'in_training'
  | 'ready_for_placement'
  | 'placed'
  | 'withdrawn';

export type AcademySubscriptionStatus = 'none' | 'trial' | 'active' | 'paused' | 'cancelled';
export type MatchStatus = 'suggested' | 'reviewing' | 'interviewing' | 'placed' | 'rejected';
export type UrgencyLevel = 'urgent' | 'normal' | 'can_wait';
export type FeedbackPeriod = '1week' | '1month' | '3months' | '6months';

export interface AcademyProgress {
  id: string;
  candidate_id: string;
  n5_completion_rate: number;
  n4_completion_rate: number;
  n3_completion_rate: number;
  kaigo_vocabulary_mastered: number;
  kaigo_scenario_completed: number;
  n5_mock_score: number | null;
  n4_mock_score: number | null;
  n3_mock_score: number | null;
  total_study_minutes: number;
  consecutive_study_days: number;
  last_active_at: string | null;
  medi_conversations_count: number;
  medi_last_evaluation: string | null;
}

export interface Candidate {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  full_name_kana: string | null;
  nationality: string;
  gender: string | null;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  line_id: string | null;
  zalo_id: string | null;
  current_address: string | null;
  nearest_station: string | null;
  current_country: string;
  visa_status: string;
  visa_expiry: string | null;
  expected_entry_date: string | null;
  has_kaigofukushishi: boolean;
  has_jitsumusya_kensyu: boolean;
  has_shoninsha_kensyu: boolean;
  other_qualifications: string[] | null;
  jlpt_level: string | null;
  japanese_speaking_level: number | null;
  care_experience_months: number;
  care_experience_details: string | null;
  desired_facility_types: string[] | null;
  desired_work_location: string[] | null;
  desired_salary_min: number | null;
  desired_shift: string | null;
  can_drive: boolean;
  commute_max_minutes: number | null;
  available_from: string | null;
  academy_user_id: string | null;
  academy_enrolled_at: string | null;
  academy_current_level: string | null;
  academy_subscription_status: AcademySubscriptionStatus;
  readiness_score: number;
  readiness_last_calculated_at: string | null;
  status: CandidateStatus;
  source: string | null;
  notes: string | null;
  assigned_to: string;
  academy_progress?: AcademyProgress | null;
}

export interface JobOpening {
  id: string;
  created_at: string;
  updated_at: string;
  facility_name: string;
  facility_type: string;
  facility_address: string;
  nearest_station: string | null;
  facility_phone: string | null;
  contact_person: string | null;
  contact_email: string | null;
  job_title: string;
  positions_available: number;
  salary_min: number | null;
  salary_max: number | null;
  shift_type: string | null;
  employment_type: string;
  required_japanese_level: string | null;
  required_qualifications: string[] | null;
  required_experience_months: number;
  accepts_tokutei_gino: boolean;
  accepts_epa: boolean;
  accepts_pre_entry: boolean;
  driver_license_required: boolean;
  housing_support: boolean;
  visa_sponsor: boolean;
  min_readiness_score: number;
  urgency_level: UrgencyLevel;
  status: string;
  priority: number;
  fee_percentage: number;
  estimated_annual_salary: number | null;
  notes: string | null;
}

export interface Match {
  id: string;
  created_at: string;
  candidate_id: string;
  job_opening_id: string;
  overall_score: number;
  skill_score: number | null;
  location_score: number | null;
  preference_score: number | null;
  readiness_score: number | null;
  ai_reasoning: string;
  ai_recommendation: string | null;
  potential_concerns: string | null;
  delivery_plan: string | null;
  estimated_delivery_date: string | null;
  status: MatchStatus;
  status_updated_at: string;
  rejection_reason: string | null;
  placement_fee: number | null;
}

export interface MatchAIResult {
  overall_score: number;
  skill_score: number;
  location_score: number;
  preference_score: number;
  readiness_score: number;
  reasoning: string;
  recommendation: string;
  concerns: string;
  delivery_plan: string;
  estimated_delivery_months: number;
}

export interface ReadinessAIResult {
  readiness_score: number;
  japanese_subscore: number;
  care_knowledge_subscore: number;
  consistency_subscore: number;
  basics_subscore: number;
  assessment: string;
  next_milestone: string;
  months_to_ready: number;
}
