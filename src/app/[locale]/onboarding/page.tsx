'use client';

import { use, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, BookOpen, GraduationCap, Briefcase, MessageCircle, Globe, Award, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingPageProps {
  params: Promise<{ locale: string }>;
}

const nationalities = [
  { code: 'VN', name: { ja: 'ベトナム', vi: 'Việt Nam' }, flag: '🇻🇳', lang: 'vi' },
  { code: 'PH', name: { ja: 'フィリピン', vi: 'Philippines' }, flag: '🇵🇭', lang: 'tl' },
  { code: 'ID', name: { ja: 'インドネシア', vi: 'Indonesia' }, flag: '🇮🇩', lang: 'id' },
  { code: 'TH', name: { ja: 'タイ', vi: 'Thái Lan' }, flag: '🇹🇭', lang: 'th' },
  { code: 'MM', name: { ja: 'ミャンマー', vi: 'Myanmar' }, flag: '🇲🇲', lang: 'my' },
  { code: 'CN', name: { ja: '中国', vi: 'Trung Quốc' }, flag: '🇨🇳', lang: 'zh' },
  { code: 'KR', name: { ja: '韓国', vi: 'Hàn Quốc' }, flag: '🇰🇷', lang: 'ko' },
  { code: 'BR', name: { ja: 'ブラジル', vi: 'Brazil' }, flag: '🇧🇷', lang: 'pt' },
  { code: 'OTHER', name: { ja: 'その他', vi: 'Khác' }, flag: '🌍', lang: 'en' },
];

const jlptLevels = [
  { code: 'none', label: { ja: '初めて学ぶ', vi: 'Mới bắt đầu' }, desc: { ja: '日本語は初めて', vi: 'Chưa học tiếng Nhật' }, color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { code: 'N5', label: { ja: 'N5（入門）', vi: 'N5 (Nhập môn)' }, desc: { ja: 'ひらがな・カタカナを知っている', vi: 'Biết hiragana & katakana' }, color: 'bg-green-50 border-green-300 text-green-700' },
  { code: 'N4', label: { ja: 'N4（基礎）', vi: 'N4 (Cơ bản)' }, desc: { ja: '基本的な文法を学んだ', vi: 'Đã học ngữ pháp cơ bản' }, color: 'bg-blue-50 border-blue-300 text-blue-700' },
  { code: 'N3', label: { ja: 'N3（中級）', vi: 'N3 (Trung cấp)' }, desc: { ja: '日常会話ができる', vi: 'Có thể giao tiếp hàng ngày' }, color: 'bg-purple-50 border-purple-300 text-purple-700' },
  { code: 'N2', label: { ja: 'N2（上級）', vi: 'N2 (Nâng cao)' }, desc: { ja: '複雑な内容も理解できる', vi: 'Hiểu được nội dung phức tạp' }, color: 'bg-orange-50 border-orange-300 text-orange-700' },
  { code: 'N1', label: { ja: 'N1（最上級）', vi: 'N1 (Cao cấp nhất)' }, desc: { ja: 'ほぼネイティブレベル', vi: 'Gần như người bản ngữ' }, color: 'bg-red-50 border-red-300 text-red-700' },
];

const goals = [
  { code: 'jlpt', icon: GraduationCap, label: { ja: 'JLPT合格', vi: 'Thi đậu JLPT' }, desc: { ja: '資格取得でキャリアアップ', vi: 'Thăng tiến sự nghiệp với bằng cấp' }, color: 'text-[#0066CC]', bg: 'bg-blue-50' },
  { code: 'care', icon: Award, label: { ja: '介護の仕事', vi: 'Làm điều dưỡng' }, desc: { ja: '介護現場の日本語を習得', vi: 'Học tiếng Nhật chuyên ngành điều dưỡng' }, color: 'text-[#00B894]', bg: 'bg-green-50' },
  { code: 'daily', icon: MessageCircle, label: { ja: '日常会話', vi: 'Giao tiếp hàng ngày' }, desc: { ja: '職場・生活での会話力', vi: 'Kỹ năng giao tiếp nơi làm việc và cuộc sống' }, color: 'text-purple-600', bg: 'bg-purple-50' },
  { code: 'qualification', icon: BookOpen, label: { ja: '資格取得', vi: 'Lấy bằng cấp' }, desc: { ja: '介護福祉士・技能実習', vi: 'Kỹ thuật viên chăm sóc, thực tập kỹ năng' }, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const { locale } = use(params);
  const t = useTranslations('onboarding');
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [freeText, setFreeText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const isJa = locale === 'ja';

  const handleGoalToggle = (code: string) => {
    setSelectedGoals(prev =>
      prev.includes(code) ? prev.filter(g => g !== code) : [...prev, code]
    );
  };

  const canProceed = () => {
    if (step === 1) return selectedNationality !== '';
    if (step === 2) return selectedLevel !== '';
    if (step === 3) return selectedGoals.length > 0;
    if (step === 4) return freeText.trim().length >= 10;
    return false;
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Save profile data - in production: save to Supabase
    const profileData = {
      nationality: selectedNationality,
      level: selectedLevel,
      goals: selectedGoals,
      freeText: freeText,
    };
    // Store in sessionStorage to pass to learning plan page
    sessionStorage.setItem('onboardingProfile', JSON.stringify(profileData));
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push(`/${locale}/learning-plan`);
  };

  const nationality = nationalities.find(n => n.code === selectedNationality);

  const stepLabels = [
    isJa ? '国籍' : 'Quốc tịch',
    isJa ? 'レベル' : 'Trình độ',
    isJa ? '目標' : 'Mục tiêu',
    isJa ? '詳細' : 'Chi tiết',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{t('subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all z-10',
                  i + 1 < step ? 'bg-[#00B894] text-white' :
                  i + 1 === step ? 'bg-[#0066CC] text-white shadow-md' :
                  'bg-gray-200 text-gray-500'
                )}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={cn(
                    'flex-1 h-0.5 rounded-full transition-all',
                    i + 1 < step ? 'bg-[#00B894]' : 'bg-gray-200'
                  )} />
                )}
              </div>
              <span className={cn(
                'text-xs font-medium',
                i + 1 === step ? 'text-[#0066CC]' : 'text-gray-400'
              )}>
                {stepLabels[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Step 1: Nationality */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{t('step1')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('nationality')}</p>
              <div className="grid grid-cols-3 gap-2">
                {nationalities.map(nat => (
                  <button
                    key={nat.code}
                    onClick={() => setSelectedNationality(nat.code)}
                    className={cn(
                      'flex flex-col items-center p-3 rounded-xl border-2 transition-all',
                      selectedNationality === nat.code
                        ? 'border-[#0066CC] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <span className="text-2xl mb-1">{nat.flag}</span>
                    <span className="text-xs font-medium text-gray-700">
                      {isJa ? nat.name.ja : nat.name.vi}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: JLPT Level */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{t('step2')}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {isJa ? '現在のJLPTレベルを選んでください' : 'Chọn trình độ JLPT hiện tại của bạn'}
              </p>
              <div className="space-y-2">
                {jlptLevels.map(level => (
                  <button
                    key={level.code}
                    onClick={() => setSelectedLevel(level.code)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all',
                      selectedLevel === level.code
                        ? 'border-[#0066CC] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div>
                      <span className="font-semibold text-gray-900">
                        {isJa ? level.label.ja : level.label.vi}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        {isJa ? level.desc.ja : level.desc.vi}
                      </span>
                    </div>
                    {selectedLevel === level.code && (
                      <div className="w-5 h-5 rounded-full bg-[#0066CC] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{t('step3')}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {isJa ? '複数選択可能です' : 'Có thể chọn nhiều mục tiêu'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {goals.map(goal => {
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.code}
                      onClick={() => handleGoalToggle(goal.code)}
                      className={cn(
                        'flex flex-col items-center p-4 rounded-xl border-2 transition-all text-center',
                        selectedGoals.includes(goal.code)
                          ? 'border-[#0066CC] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-2', goal.bg)}>
                        <Icon className={cn('h-5 w-5', goal.color)} />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {isJa ? goal.label.ja : goal.label.vi}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {isJa ? goal.desc.ja : goal.desc.vi}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Free text */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pencil className="h-5 w-5 text-[#0066CC]" />
                <h2 className="text-lg font-bold text-gray-900">
                  {isJa ? 'あなたについて教えてください' : 'Hãy cho chúng tôi biết về bạn'}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {isJa
                  ? 'AI家庭教師Medi先生があなた専用の学習計画を作成します。現在の状況や日本語を学ぶ理由、将来の目標などを自由に書いてください。'
                  : 'AI gia sư Medi-sensei sẽ tạo kế hoạch học tập riêng cho bạn. Hãy viết tự do về tình trạng hiện tại, lý do học tiếng Nhật và mục tiêu tương lai của bạn.'
                }
              </p>

              {/* Profile summary */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 flex flex-wrap gap-2 text-xs">
                <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 text-gray-700">
                  {nationality?.flag} {isJa ? nationality?.name.ja : nationality?.name.vi}
                </span>
                <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 text-gray-700">
                  {selectedLevel === 'none' ? (isJa ? '初学者' : 'Mới học') : selectedLevel}
                </span>
                {selectedGoals.map(g => {
                  const goal = goals.find(x => x.code === g);
                  return (
                    <span key={g} className="bg-white rounded-lg px-2 py-1 border border-blue-200 text-gray-700">
                      {isJa ? goal?.label.ja : goal?.label.vi}
                    </span>
                  );
                })}
              </div>

              <textarea
                value={freeText}
                onChange={e => setFreeText(e.target.value)}
                placeholder={isJa
                  ? '例：ベトナム出身で、介護施設で技能実習生として働いています。日本語はほぼ初めてです。来年N4に合格して、特定技能ビザを取得したいです。毎日30分は学習できます。介護の言葉を優先的に学びたいです。'
                  : 'Ví dụ: Tôi đến từ Việt Nam, đang làm thực tập sinh kỹ năng tại cơ sở điều dưỡng. Tôi gần như mới bắt đầu học tiếng Nhật. Tôi muốn đạt N4 năm tới để lấy visa kỹ năng đặc định. Mỗi ngày tôi có thể học 30 phút...'
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/10 transition-all bg-gray-50 focus:bg-white resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between mt-2">
                <span className={cn(
                  'text-xs',
                  freeText.trim().length >= 10 ? 'text-[#00B894]' : 'text-gray-400'
                )}>
                  {freeText.trim().length} {isJa ? '文字' : 'ký tự'}
                  {freeText.trim().length < 10 && (
                    <span className="ml-1 text-gray-400">
                      ({isJa ? 'あと' : 'còn'} {10 - freeText.trim().length} {isJa ? '文字以上' : ' ký tự nữa'})
                    </span>
                  )}
                </span>
                {freeText.trim().length >= 10 && (
                  <span className="text-xs text-[#00B894] font-medium">
                    ✓ {isJa ? 'AIが学習計画を作成します' : 'AI sẽ tạo kế hoạch học tập'}
                  </span>
                )}
              </div>

              {/* Tips */}
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-800 mb-2">
                  💡 {isJa ? '書くと良い内容' : 'Nên viết về'}
                </p>
                <ul className="text-xs text-amber-700 space-y-1">
                  {(isJa ? [
                    '現在の職場や仕事の内容',
                    '日本語を学ぶ理由・動機',
                    '1日にどのくらい勉強できるか',
                    '将来の目標（ビザ、転職、資格など）',
                  ] : [
                    'Công việc và nơi làm việc hiện tại',
                    'Lý do học tiếng Nhật',
                    'Bạn có thể học bao lâu mỗi ngày',
                    'Mục tiêu tương lai (visa, chuyển việc, bằng cấp...)',
                  ]).map((tip, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-amber-500 flex-shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {isJa ? '戻る' : 'Quay lại'}
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                {t('next')}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                isLoading={isSubmitting}
                className="bg-gradient-to-r from-[#0066CC] to-[#00B894] hover:from-[#0052A3] hover:to-[#009974]"
              >
                {isJa ? 'AI学習計画を作成 🤖' : 'Tạo kế hoạch AI 🤖'}
              </Button>
            )}
          </div>
        </div>

        {/* Skip */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('skip')} →
          </button>
        </div>
      </div>
    </div>
  );
}
