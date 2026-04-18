import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { candidateId, jobOpeningId } = await request.json();
    if (!candidateId || !jobOpeningId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data: match } = await supabase
      .from('matches')
      .select(`
        *,
        candidate:candidates(id, line_id, status, academy_enrolled_at),
        job:job_openings(facility_name, required_japanese_level)
      `)
      .eq('candidate_id', candidateId)
      .eq('job_opening_id', jobOpeningId)
      .single();

    if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    if (!match.delivery_plan?.includes('Academy')) {
      return NextResponse.json({ message: 'No Academy enrollment needed' });
    }

    await supabase
      .from('academy_progress')
      .upsert(
        { candidate_id: candidateId, n5_completion_rate: 0, n4_completion_rate: 0, n3_completion_rate: 0 },
        { onConflict: 'candidate_id', ignoreDuplicates: true }
      );

    const targetLevel = match.job.required_japanese_level || 'N4';
    await supabase
      .from('candidates')
      .update({
        status: 'in_training',
        academy_enrolled_at: new Date().toISOString(),
        academy_current_level: targetLevel,
        academy_subscription_status: 'trial',
      })
      .eq('id', candidateId);

    if (match.candidate.line_id) {
      await sendAcademyInviteToLINE(match.candidate.line_id, match.job.facility_name);
    }

    return NextResponse.json({ success: true, enrolled_level: targetLevel });
  } catch (error) {
    console.error('Academy enrollment error:', error);
    return NextResponse.json({ error: 'Enrollment failed' }, { status: 500 });
  }
}

async function sendAcademyInviteToLINE(lineId: string, facilityName: string) {
  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: lineId,
      messages: [
        {
          type: 'text',
          text: `Mediflow Academyへようこそ！\n\n${facilityName}様への就職を目指して、一緒に日本語と介護知識を学びましょう。\n\n今すぐ学習を始める → ${process.env.NEXT_PUBLIC_APP_URL}/academy`,
        },
      ],
    }),
  });
}
