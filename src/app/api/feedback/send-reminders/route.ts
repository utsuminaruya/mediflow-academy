import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Vercel Cron: 毎週月曜9時に実行
// vercel.json の "crons" に "0 9 * * 1" → "/api/feedback/send-reminders" を追加すること
export async function GET() {
  const supabase = createServerClient();
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  const { data: placedMatches } = await supabase
    .from('matches')
    .select('id, created_at, candidate:candidates(full_name), job:job_openings(contact_email, facility_name)')
    .eq('status', 'placed');

  if (!placedMatches?.length) return NextResponse.json({ sent: 0 });

  const periodsToCheck = [
    { days: 7, period: '1week' },
    { days: 30, period: '1month' },
    { days: 90, period: '3months' },
    { days: 180, period: '6months' },
  ];

  let sent = 0;
  for (const match of placedMatches) {
    const daysAfterPlacement = Math.floor(
      (Date.now() - new Date(match.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );

    for (const { days, period } of periodsToCheck) {
      if (Math.abs(daysAfterPlacement - days) > 3) continue;

      const { data: existing } = await supabase
        .from('placement_feedback')
        .select('id')
        .eq('match_id', match.id)
        .eq('feedback_period', period)
        .single();

      if (existing) continue;

      const feedbackUrl = `${APP_URL}/api/feedback/facility?matchId=${match.id}&period=${period}`;
      const job = Array.isArray(match.job) ? match.job[0] : match.job;
      const candidate = Array.isArray(match.candidate) ? match.candidate[0] : match.candidate;
      console.log(`[FeedbackReminder] ${job?.facility_name} / ${candidate?.full_name} / ${period} → ${feedbackUrl}`);
      // TODO: SendGrid等でメール送信 → match.job.contact_email宛にfeedbackUrlを送る
      sent++;
    }
  }

  return NextResponse.json({ sent, message: `${sent} reminders processed` });
}
