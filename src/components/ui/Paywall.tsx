"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import type { PlanName } from "@/lib/stripe/config";

const PLAN_LABELS: Record<PlanName, string> = {
  free: "無料",
  standard: "スタンダード",
  pro: "プロ",
  premium: "プレミアム",
};

const PLAN_COLORS: Record<PlanName, string> = {
  free: "text-gray-500",
  standard: "text-blue-600",
  pro: "text-purple-600",
  premium: "text-yellow-600",
};

interface PaywallProps {
  requiredPlan: Exclude<PlanName, "free">;
  children: React.ReactNode;
  /** ロックされているときに上部に表示する無料プレビューコンテンツ */
  previewContent?: React.ReactNode;
  /** ページ内インラインで表示する場合 true（デフォルト false = フルページ） */
  inline?: boolean;
  /** ロケール（Pricing リンクのパス生成に使用） */
  locale?: string;
}

export function Paywall({
  requiredPlan,
  children,
  previewContent,
  inline = false,
  locale = "ja",
}: PaywallProps) {
  const { canAccess, isLoading } = useSubscription();

  // ローディング中はスケルトン
  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-2xl h-40" />
    );
  }

  // アクセス可能 → そのまま表示
  if (canAccess(requiredPlan)) {
    return <>{children}</>;
  }

  // ロック表示
  const label = PLAN_LABELS[requiredPlan];
  const colorClass = PLAN_COLORS[requiredPlan];

  return (
    <div className={inline ? "" : "min-h-[300px] flex flex-col"}>
      {/* 無料プレビュー（グラデーションでフェードアウト） */}
      {previewContent && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="pointer-events-none select-none">
            {previewContent}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>
      )}

      {/* アップグレードプロンプト */}
      <div
        className={`bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center gap-4 ${
          previewContent ? "rounded-t-none border-t-0" : ""
        }`}
      >
        <div className="w-14 h-14 bg-white rounded-2xl shadow flex items-center justify-center">
          <Lock className={`w-7 h-7 ${colorClass}`} />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500 mb-1">
            このコンテンツは
            <span className={`${colorClass} font-bold`}>{label}プラン</span>
            以上で利用できます
          </p>
          <p className="text-xs text-gray-400">
            7日間の無料トライアルでお試しいただけます
          </p>
        </div>

        <Link
          href={`/${locale}/pricing`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          プランをアップグレード
        </Link>

        <Link
          href={`/${locale}/pricing`}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          プラン一覧を見る →
        </Link>
      </div>
    </div>
  );
}
