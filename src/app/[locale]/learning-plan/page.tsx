'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bot, Target, Clock, BookOpen, ChevronRight, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LearningPlanPageProps {
  params: Promise<{ locale: string }>;
}

interface LearningPlan {
  summary: string;
  targetLevel: string;
  estimatedMonths: number;
  dailyMinutes: number;
  phases: {
    phase: number;
    title: string;
    duration: string;
    focus: string[];
    milestone: string;
    tips: string;
  }[];
  recommendedCourses: string[];
  careerAdvice: string;
  motivationalMessage: string;
}

export default function LearningPlanPage({ params }: LearningPlanPageProps) {
  const { locale } = use(params);
  const router = useRouter();
  const isJa = locale === 'ja';

  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const profileStr = sessionStorage.getItem('onboardingProfile');
    if (!profileStr) {
      router.push(`/${locale}/onboarding`);
      return;
    }

    const profile = JSON.parse(profileStr);
    generatePlan(profile);
  }, []);

  const generatePlan = async (profile: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) throw new Error('API error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      if (!reader) throw new Error('No reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              // Parse the final JSON
              try {
                // Extract JSON from accumulated text
                const jsonMatch = accumulated.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const parsed = JSON.parse(jsonMatch[0]);
                  setPlan(parsed);
                }
              } catch {
                setError(isJa ? '学習計画の解析に失敗しました' : 'Không thể phân tích kế hoạch học tập');
              }
              setIsLoading(false);
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setRawText(accumulated);
              }
            } catch {
              // ignore
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError(isJa ? 'エラーが発生しました。もう一度お試しください。' : 'Đã xảy ra lỗi. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  const phaseColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'];
  const phaseLightColors = ['bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-orange-50'];
  const phaseBorderColors = ['border-blue-200', 'border-purple-200', 'border-green-200', 'border-orange-200'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Bot className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {isJa ? 'Medi先生が学習計画を作成中...' : 'Medi-sensei đang tạo kế hoạch học tập...'}
          </h2>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            {isJa
              ? 'あなたのプロフィールを分析して、最適な学習計画を作成しています。少々お待ちください。'
              : 'Đang phân tích hồ sơ của bạn để tạo kế hoạch học tập tối ưu. Vui lòng chờ một chút.'
            }
          </p>
          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 bg-[#0066CC] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
          {rawText && (
            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200 text-left">
              <p className="text-xs text-gray-400 mb-2">
                {isJa ? 'AIが考えています...' : 'AI đang suy nghĩ...'}
              </p>
              <p className="text-xs text-gray-500 font-mono leading-relaxed line-clamp-3">
                {rawText.slice(0, 200)}...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || (isJa ? 'エラーが発生しました' : 'Đã xảy ra lỗi')}</p>
          <Button onClick={() => router.push(`/${locale}/onboarding`)}>
            {isJa ? '戻る' : 'Quay lại'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0066CC]/10 text-[#0066CC] text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            {isJa ? 'AI個別学習計画' : 'Kế hoạch học tập AI cá nhân'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {isJa ? 'あなた専用の学習計画ができました！' : 'Kế hoạch học tập riêng của bạn đã sẵn sàng!'}
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
            {plan.summary}
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <Target className="h-6 w-6 text-[#0066CC] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{plan.targetLevel}</p>
            <p className="text-xs text-gray-500 mt-1">{isJa ? '目標レベル' : 'Mục tiêu'}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <TrendingUp className="h-6 w-6 text-[#00B894] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{plan.estimatedMonths}</p>
            <p className="text-xs text-gray-500 mt-1">{isJa ? 'ヶ月' : 'Tháng'}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{plan.dailyMinutes}</p>
            <p className="text-xs text-gray-500 mt-1">{isJa ? '分/日' : 'Phút/ngày'}</p>
          </div>
        </div>

        {/* Motivational message */}
        <div className="bg-gradient-to-r from-[#0066CC] to-[#00B894] rounded-2xl p-5 mb-8 text-white text-center">
          <p className="text-lg font-semibold">{plan.motivationalMessage}</p>
        </div>

        {/* Learning Phases */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0066CC]" />
            {isJa ? '学習フェーズ' : 'Các giai đoạn học tập'}
          </h2>
          <div className="space-y-4">
            {plan.phases.map((phase, i) => (
              <div key={phase.phase} className={cn(
                'bg-white rounded-2xl border p-5 shadow-sm',
                phaseBorderColors[i % 4]
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0',
                    phaseColors[i % 4]
                  )}>
                    {phase.phase}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{phase.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {phase.duration}
                      </span>
                    </div>
                    <div className={cn('rounded-xl p-3 mb-3', phaseLightColors[i % 4])}>
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        {isJa ? '重点項目' : 'Trọng tâm'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.focus.map((f, j) => (
                          <span key={j} className="text-xs bg-white px-2 py-0.5 rounded-lg border border-gray-200 text-gray-700">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                      <CheckCircle className="h-4 w-4 text-[#00B894] flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{phase.milestone}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2 mt-2">
                      💡 {phase.tips}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0066CC]" />
            {isJa ? 'おすすめコース' : 'Khóa học được đề xuất'}
          </h2>
          <div className="space-y-2">
            {plan.recommendedCourses.map((course, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#0066CC]">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-700">{course}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Advice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            {isJa ? 'キャリアアドバイス' : 'Lời khuyên sự nghiệp'}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{plan.careerAdvice}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/${locale}/dashboard`} className="flex-1">
            <Button fullWidth size="lg" className="bg-gradient-to-r from-[#0066CC] to-[#00B894] hover:from-[#0052A3] hover:to-[#009974]">
              {isJa ? '学習を始める！' : 'Bắt đầu học!'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
          <Link href={`/${locale}/courses`} className="flex-1">
            <Button fullWidth size="lg" variant="outline">
              {isJa ? 'コース一覧を見る' : 'Xem danh sách khóa học'}
            </Button>
          </Link>
        </div>

        {/* Mediflow CTA */}
        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
          <p className="text-sm text-gray-600 mb-3">
            {isJa
              ? '🎯 JLPT合格後は、Mediflowの就職サポートで理想の職場へ'
              : '🎯 Sau khi đạt JLPT, hãy để Mediflow hỗ trợ bạn tìm việc lý tưởng'
            }
          </p>
          <a
            href="https://lin.ee/xUocVyI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066CC] hover:underline"
          >
            {isJa ? 'LINEで無料相談' : 'Tư vấn miễn phí qua LINE'}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
