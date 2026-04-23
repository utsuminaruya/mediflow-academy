'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { RoleplayScenario, RoleplaySession } from '@/types/roleplay';
import RoleplayChat from '@/components/roleplay/RoleplayChat';

export default function RoleplaySessionPage() {
  const params = useParams();
  const locale = params.locale as string;
  const scenarioId = params.scenarioId as string;
  const router = useRouter();
  const [session, setSession] = useState<RoleplaySession | null>(null);
  const [scenario, setScenario] = useState<RoleplayScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { router.push(`/${locale}/ai-tutor/roleplay`); return; }
      // scenarioId はセッションIDとして扱う
      const { data: sessionData } = await supabase
        .from('roleplay_sessions')
        .select('*, roleplay_scenarios(*)')
        .eq('id', scenarioId)
        .single();

      if (!sessionData) {
        router.push(`/${locale}/ai-tutor/roleplay`);
        return;
      }

      setSession(sessionData as unknown as RoleplaySession);
      setScenario(sessionData.roleplay_scenarios as unknown as RoleplayScenario);
      setLoading(false);
    };
    load();
  }, [scenarioId, locale, router]);

  const handleEnd = async () => {
    if (ending || !session) return;
    setEnding(true);

    // 評価API呼び出し
    try {
      await fetch('/api/roleplay/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id }),
      });
    } catch (err) {
      console.error('Evaluate error:', err);
    }

    router.push(`/${locale}/ai-tutor/roleplay/${session.id}/feedback`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        セッションが見つかりません
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {ending && (
        <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center flex-col gap-3">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
          <p className="text-sm text-gray-600">
            {locale === 'vi' ? 'Đang phân tích hội thoại...' : '会話を評価中...'}
          </p>
        </div>
      )}
      <RoleplayChat
        scenario={scenario}
        sessionId={session.id}
        initialMessages={session.messages}
        locale={locale}
        onEnd={handleEnd}
      />
    </div>
  );
}
