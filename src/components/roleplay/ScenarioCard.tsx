'use client';
import { RoleplayScenario } from '@/types/roleplay';
import { Clock, Star, Lock, Play, CheckCircle } from 'lucide-react';

const CATEGORY_LABELS: Record<string, { ja: string; vi: string; emoji: string }> = {
  morning_care: { ja: '朝のケア', vi: 'Chăm sóc buổi sáng', emoji: '🌅' },
  meal_assistance: { ja: '食事介助', vi: 'Hỗ trợ bữa ăn', emoji: '🍱' },
  bathing: { ja: '入浴介助', vi: 'Hỗ trợ tắm', emoji: '🛁' },
  toileting: { ja: '排泄介助', vi: 'Hỗ trợ vệ sinh', emoji: '🚿' },
  mobility: { ja: '移動介助', vi: 'Hỗ trợ di chuyển', emoji: '♿' },
  vital_check: { ja: 'バイタル', vi: 'Đo sinh hiệu', emoji: '💓' },
  handover: { ja: '申し送り', vi: 'Bàn giao ca', emoji: '📋' },
  family_communication: { ja: '家族対応', vi: 'Giao tiếp gia đình', emoji: '👨‍👩‍👧' },
  emergency: { ja: '緊急対応', vi: 'Xử lý khẩn cấp', emoji: '🚨' },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  N5: 'bg-green-100 text-green-700',
  N4: 'bg-blue-100 text-blue-700',
  N3: 'bg-orange-100 text-orange-700',
  N2: 'bg-red-100 text-red-700',
  N1: 'bg-purple-100 text-purple-700',
};

const PLAN_LABELS: Record<string, { ja: string; color: string }> = {
  free: { ja: 'Free', color: 'bg-gray-100 text-gray-600' },
  basic: { ja: 'Basic', color: 'bg-blue-100 text-blue-700' },
  pro: { ja: 'Pro', color: 'bg-amber-100 text-amber-700' },
};

interface Props {
  scenario: RoleplayScenario;
  userPlan: string;
  bestScore?: number;
  isCompleted?: boolean;
  remainingToday?: number;
  locale: string;
  onPlay: (scenario: RoleplayScenario) => void;
}

export default function ScenarioCard({
  scenario, userPlan, bestScore, isCompleted, remainingToday = 0, locale, onPlay
}: Props) {
  const cat = CATEGORY_LABELS[scenario.category] || { ja: scenario.category, vi: scenario.category, emoji: '📝' };
  const planOrder = { free: 0, basic: 1, pro: 2 };
  const isLocked = (planOrder[scenario.required_plan as keyof typeof planOrder] ?? 0) > (planOrder[userPlan as keyof typeof planOrder] ?? 0);
  const isDisabled = isLocked || remainingToday <= 0;

  return (
    <div
      className={`relative rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200
        ${isLocked ? 'opacity-60 bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md hover:scale-[1.02] cursor-pointer'}`}
      onClick={() => !isDisabled && onPlay(scenario)}
    >
      {/* 上部バッジ行 */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{cat.emoji}</span>
        <div className="flex gap-1.5 flex-wrap justify-end">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[scenario.difficulty]}`}>
            {scenario.difficulty}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PLAN_LABELS[scenario.required_plan]?.color}`}>
            {PLAN_LABELS[scenario.required_plan]?.ja}
          </span>
          {isCompleted && (
            <CheckCircle size={16} className="text-green-500 mt-0.5" />
          )}
        </div>
      </div>

      {/* タイトル */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 leading-snug">
          {locale === 'vi' ? scenario.title.vi : scenario.title.ja}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
          {locale === 'vi' ? scenario.description.vi : scenario.description.ja}
        </p>
      </div>

      {/* 情報行 */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} /> {scenario.estimated_minutes}分
        </span>
        {bestScore !== undefined && (
          <span className="flex items-center gap-1 text-amber-600">
            <Star size={12} fill="currentColor" /> {bestScore}点
          </span>
        )}
        <span className="text-gray-400">
          {locale === 'vi' ? cat.vi : cat.ja}
        </span>
      </div>

      {/* プレイボタン */}
      {isLocked ? (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
          <Lock size={13} />
          <span>{scenario.required_plan === 'basic' ? 'Basicプラン以上' : 'Proプラン限定'}</span>
        </div>
      ) : remainingToday <= 0 ? (
        <div className="text-xs text-orange-500 mt-auto">本日の残り回数: 0回</div>
      ) : (
        <button
          className="mt-auto flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          onClick={(e) => { e.stopPropagation(); onPlay(scenario); }}
        >
          <Play size={14} fill="white" />
          {remainingToday !== Infinity ? `プレイ（残り${remainingToday}回）` : 'プレイ'}
        </button>
      )}
    </div>
  );
}
