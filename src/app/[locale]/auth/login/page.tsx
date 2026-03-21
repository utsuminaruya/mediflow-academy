"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("auth");
  const nav = useTranslations("nav");
  const router = useRouter();
  const { locale } = use(params);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const translateAuthError = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes("invalid login credentials") || lower.includes("invalid credentials")) {
      return "メールアドレスまたはパスワードが正しくありません。";
    }
    if (lower.includes("email not confirmed")) {
      return "メールアドレスの確認が完了していません。受信したメールのリンクをクリックしてください。";
    }
    if (lower.includes("too many requests") || lower.includes("rate limit")) {
      return "試行回数が多すぎます。しばらく時間をおいてから再度お試しください。";
    }
    if (lower.includes("user not found")) {
      return "このメールアドレスは登録されていません。";
    }
    if (lower.includes("network") || lower.includes("fetch")) {
      return "通信エラーが発生しました。インターネット接続を確認してください。";
    }
    return "ログインに失敗しました。もう一度お試しください。";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(translateAuthError(authError.message));
        return;
      }

      router.push(`/${locale}/courses`);
    } catch {
      setError("ログインに失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl" />
            <span className="font-bold text-2xl text-gray-900">Mediflow Academy</span>
          </Link>
        </div>

        <div className="card shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("login")}</h1>
          <p className="text-muted mb-6">おかえりなさい！</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div />
              <Link
                href={`/${locale}/auth/reset-password`}
                className="text-primary-600 hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t("login")
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-muted">
            {t("noAccount")}?{" "}
            <Link
              href={`/${locale}/auth/signup`}
              className="text-primary-600 font-medium hover:underline"
            >
              {t("signupHere")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
