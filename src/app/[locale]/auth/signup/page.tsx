"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("auth");
  const router = useRouter();
  const { locale } = use(params);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上にしてください。");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        const lower = authError.message.toLowerCase();
        if (lower.includes("already registered") || lower.includes("user already exists")) {
          setError("このメールアドレスはすでに登録されています。ログインしてください。");
        } else if (lower.includes("password") && lower.includes("weak")) {
          setError("パスワードが簡単すぎます。英数字を組み合わせた8文字以上にしてください。");
        } else {
          setError("登録に失敗しました。もう一度お試しください。");
        }
        return;
      }

      // If email confirmation is required (session is null but user is created)
      if (data.user && !data.session) {
        setEmailSent(true);
        return;
      }

      router.push(`/${locale}/onboarding`);
    } catch {
      setError("登録に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl" />
            <span className="font-bold text-2xl text-gray-900">Mediflow Academy</span>
          </Link>
        </div>

        {emailSent ? (
          <div className="card shadow-xl text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">メールを確認してください</h1>
            <p className="text-muted mb-4">
              <span className="font-medium text-gray-800">{email}</span> に確認メールを送りました。
            </p>
            <p className="text-sm text-muted mb-6">
              メール内のリンクをクリックして、登録を完了してください。
              メールが届かない場合は迷惑メールフォルダをご確認ください。
            </p>
            <Link
              href={`/${locale}/auth/login`}
              className="btn-primary w-full inline-block text-center"
            >
              ログインページへ
            </Link>
          </div>
        ) : (

        <div className="card shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("signup")}</h1>
          <p className="text-muted mb-6">無料で今すぐ始めましょう！</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fullName")}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input"
                placeholder="Nguyen Van An"
                required
              />
            </div>

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
                  placeholder="8文字以上"
                  required
                  minLength={8}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("confirmPassword")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                `${t("signup")} →`
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-muted">
            {t("hasAccount")}?{" "}
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary-600 font-medium hover:underline"
            >
              {t("loginHere")}
            </Link>
          </div>
        </div>
        )} {/* end emailSent conditional */}
      </div>
    </div>
  );
}
