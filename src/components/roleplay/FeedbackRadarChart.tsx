'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ScenarioScores } from '@/types/roleplay';

interface Props {
  scores: ScenarioScores;
}

export default function FeedbackRadarChart({ scores }: Props) {
  const data = [
    { subject: '敬語', value: scores.keigo },
    { subject: '介護用語', value: scores.care_terms },
    { subject: '共感', value: scores.empathy },
    { subject: '会話の流れ', value: scores.flow },
    { subject: '文法', value: scores.grammar },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 12, fill: '#6b7280' }}
        />
        <Radar
          name="スコア"
          dataKey="value"
          stroke="#2563eb"
          fill="#2563eb"
          fillOpacity={0.25}
          dot={{ fill: '#2563eb', r: 3 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
