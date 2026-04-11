import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, status, quizScore, xpEarned } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
    }

    // Upsert progress using lesson_key (string course ID like 'n5-01')
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: user.id,
          lesson_key: lessonId,
          status: status || 'completed',
          score: quizScore,
          xp_earned: xpEarned || 0,
          completed_at: status === 'completed' ? new Date().toISOString() : null,
        },
        {
          onConflict: 'user_id,lesson_key',
        }
      )
      .select()
      .single();

    if (progressError) {
      console.error('Progress update error:', progressError);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    // Award XP if lesson completed
    if (status === 'completed' && xpEarned > 0) {
      // Fetch current XP then update
      const { data: currentUser } = await supabase
        .from('users')
        .select('total_xp')
        .eq('id', user.id)
        .single();
      if (currentUser !== null) {
        await supabase
          .from('users')
          .update({
            total_xp: (currentUser?.total_xp || 0) + xpEarned,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }

      // Update streak
      await updateStreak(supabase, user.id);
    }

    return NextResponse.json({
      success: true,
      progress,
      xpEarned: xpEarned || 0,
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    let query = supabase
      .from('user_progress')
      .select(`
        *,
        lesson:lessons(
          id,
          title,
          course_id,
          sort_order,
          xp_reward
        )
      `)
      .eq('user_id', user.id);

    if (courseId) {
      query = query.eq('lesson.course_id', courseId);
    }

    const { data: progress, error } = await query.order('completed_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    // Get user stats
    const { data: userData } = await supabase
      .from('users')
      .select('total_xp, streak_days, subscription_plan')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      progress,
      stats: userData,
    });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function updateStreak(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string
) {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('streak_days, updated_at')
      .eq('id', userId)
      .single();

    if (!user) return;

    const lastUpdate = new Date(user.updated_at);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = user.streak_days;
    if (daysDiff === 0) {
      // Same day, no change
      return;
    } else if (daysDiff === 1) {
      // Consecutive day
      newStreak += 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    await supabase
      .from('users')
      .update({ streak_days: newStreak })
      .eq('id', userId);
  } catch (error) {
    console.error('Streak update error:', error);
  }
}
