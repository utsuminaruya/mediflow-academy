'use client';

import { use, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface SignupPageProps {
  params: Promise<{ locale: string }>;
}

export default function SignupPage({ params }: SignupPageProps) {
  const { locale } = use(params);
  return (
    <Suspense>
      <SignupForm locale={locale} />
    </Suspense>
  );
}

function SignupForm({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectAfter = searchParams.get('redirect') || `/${locale}/dashboard`;
  const isJa = locale === 'ja';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setError('');

    // Demo mode
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        router.push(`/${locale}/onboarding`);
      }, 800);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase!.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectAfter}`,
        },
      });
      if (authError) {
        setError(isJa ? 'Googleログインに失敗しました' : 'Đăng nhập Google thất bại');
        setIsGoogleLoading(false);
      }
    } catch {
      setError(isJa ? 'エラーが発生しました' : 'Đã xảy ra lỗi');
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!agreed) {
      setError(isJa ? '利用規約に同意してください' : 'Vui lòng đồng ý với điều khoản');
      return;
    }
    if (password.length < 8) {
      setError(isJa ? 'パスワードは8文字以上にしてください' : 'Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    setIsLoading(true);

    // Demo mode
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        router.push(redirectAfter.startsWith('/') ? redirectAfter : `/${locale}/onboarding`);
      }, 800);
      return;
    }

    try {
      const supabase = createClient();
      const { data: signUpData, error: authError } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectAfter}`,
        },
      });
      if (authError) {
        setError(authError.message);
        setIsLoading(false);
      } else if (signUpData.user && !signUpData.session) {
        // メール確認が必要な場合
        setEmailSent(true);
        setIsLoading(false);
      } else {
        router.push(redirectAfter);
      }
    } catch {
      setError(isJa ? 'エラーが発生しました' : 'Đã xảy ra lỗi');
      setIsLoading(false);
    }
  };

  // メール送信完了画面
  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="h-16 w-16 text-[#00B894] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isJa ? '確認メールを送りました！' : 'Email xác nhận đã được gửi!'}
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            {isJa
              ? `${email} に確認メールを送信しました。メール内のリンクをクリックすると登録完了です。`
              : `Đã gửi email xác nhận đến ${email}. Nhấp vào liên kết trong email để hoàn tất đăng ký.`}
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                {isJa ? (
                  <>メールが届かない場合は<strong>迷惑メールフォルダ</strong>を確認してください。それでも届かない場合は<strong>Googleで登録</strong>をお試しください。</>
                ) : (
                  <>Không thấy email? Hãy kiểm tra <strong>thư mục spam</strong>. Nếu vẫn không thấy, hãy dùng <strong>đăng ký bằng Google</strong>.</>
                )}
              </div>
            </div>
          </div>
          <Link href={`/${locale}/auth/signup`} className="text-[#0066CC] font-semibold hover:underline text-sm">
            {isJa ? '← 登録ページに戻る' : '← Quay lại trang đăng ký'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 mb-6">
            <Image src="/images/logo.png" alt="Mediflow Academy" width={40} height={40} style={{ borderRadius: 10, objectFit: 'contain' }} />
            <span className="font-bold text-xl text-gray-900">Mediflow <span className="text-[#0066CC]">Academy</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isJa ? '無料アカウント作成' : 'Tạo tài khoản miễn phí'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {isJa ? 'N5〜N1まで全コース無料で始められます' : 'Bắt đầu miễn phí với toàn bộ N5〜N1'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Google Signup — 推奨 */}
          <button
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className={cn(
              'w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all mb-3',
              'border-2 border-[#0066CC] text-[#0066CC] bg-blue-50',
              isGoogleLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-100'
            )}
          >
            {isGoogleLoading ? (
              <span className="w-5 h-5 border-2 border-[#0066CC]/30 border-t-[#0066CC] rounded-full animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isJa ? 'Googleで登録する（最速・おすすめ）' : 'Đăng ký bằng Google (Nhanh nhất)'}
          </button>
          <p className="text-center text-xs text-gray-400 mb-5">
            {isJa ? 'メール確認不要ですぐに使えます' : 'Không cần xác nhận email, dùng ngay'}
          </p>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">{isJa ? 'またはメールで' : 'hoặc với email'}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {isJa ? 'お名前' : 'Họ và tên'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isJa ? '山田 花子' : 'Nguyễn Văn A'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/10 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {isJa ? 'メールアドレス' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/10 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {isJa ? 'パスワード（8文字以上）' : 'Mật khẩu (ít nhất 8 ký tự)'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/10 transition-all bg-gray-50 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={cn(
                      'flex-1 h-1 rounded-full transition-all',
                      password.length >= i * 2 ? (password.length >= 8 ? 'bg-[#00B894]' : 'bg-yellow-400') : 'bg-gray-200'
                    )} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                {isJa ? (
                  <>
                    <Link href={`/${locale}/terms`} target="_blank" className="text-[#0066CC] hover:underline">利用規約</Link>と
                    <Link href={`/${locale}/privacy`} target="_blank" className="text-[#0066CC] hover:underline">プライバシーポリシー</Link>に同意します
                  </>
                ) : (
                  <>
                    Tôi đồng ý với <Link href={`/${locale}/terms`} target="_blank" className="text-[#0066CC] hover:underline">Điều khoản dịch vụ</Link> và <Link href={`/${locale}/privacy`} target="_blank" className="text-[#0066CC] hover:underline">Chính sách bảo mật</Link>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-3 px-4 bg-[#0066CC] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all mt-2',
                isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#0052A3] hover:shadow-md active:scale-[0.98]'
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isJa ? '登録中...' : 'Đang đăng ký...'}
                </span>
              ) : (
                <>
                  {isJa ? '無料で始める' : 'Bắt đầu miễn phí'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isJa ? 'すでにアカウントをお持ちの方は' : 'Đã có tài khoản?'}{' '}
          <Link href={`/${locale}/auth/login`} className="text-[#0066CC] font-semibold hover:underline">
            {isJa ? 'ログイン' : 'Đăng nhập'}
          </Link>
        </p>
      </div>
    </div>
  );
}
