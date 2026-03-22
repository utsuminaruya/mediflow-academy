"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Globe, Menu, X, User, LogOut, LayoutDashboard, Crown } from "lucide-react";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS } from "@/constants";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/types";

interface NavbarProps {
  locale: string;
}

interface AuthUser {
  name: string;
  email: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const nav = useTranslations("nav");
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setAuthUser({
          name: user.user_metadata?.full_name || user.email || "ユーザー",
          email: user.email || "",
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthUser({
          name:
            session.user.user_metadata?.full_name ||
            session.user.email ||
            "ユーザー",
          email: session.user.email || "",
        });
      } else {
        setAuthUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAuthUser(null);
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/images/mediflow-logo.png"
            alt="Mediflow Academy"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-bold text-lg text-gray-900 hidden sm:block">Mediflow Academy</span>
          <span className="font-bold text-lg text-gray-900 sm:hidden">Mediflow</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
          <Link href={`/${locale}/courses`} className="hover:text-primary-600 transition-colors">
            {nav("courses")}
          </Link>
          <Link href={`/${locale}/ai-tutor`} className="hover:text-primary-600 transition-colors">
            {nav("aiTutor")}
          </Link>
          <Link href={`/${locale}/career`} className="hover:text-primary-600 transition-colors">
            {nav("career")}
          </Link>
          {/* プレミアム体験CTA */}
          <Link
            href={`/${locale}/pricing`}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Crown className="w-3.5 h-3.5" />
            7日間 無料体験
          </Link>
        </div>

        {/* Right side: lang switcher + auth */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              aria-label="言語を切り替え"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{LOCALE_FLAGS[locale as keyof typeof LOCALE_FLAGS]}</span>
              <span className="hidden lg:inline text-xs">{LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS]}</span>
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 min-w-[180px]">
                  {LOCALES.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}`}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        locale === l ? "text-primary-600 font-semibold bg-primary-50" : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{LOCALE_FLAGS[l as Locale]}</span>
                      <span>{LOCALE_LABELS[l as Locale]}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Auth area (desktop) */}
          {authUser ? (
            /* ログイン済み: ユーザー名 + ドロップダウン */
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <span className="max-w-[120px] truncate">{authUser.name}</span>
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 min-w-[180px]">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-900 truncate">{authUser.name}</p>
                      <p className="text-xs text-gray-400 truncate">{authUser.email}</p>
                    </div>
                    <Link
                      href={`/${locale}/dashboard`}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      ダッシュボード
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      ログアウト
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* 未ログイン: ログイン・登録ボタン */
            <>
              <Link
                href={`/${locale}/auth/login`}
                className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-2 py-1.5"
              >
                {nav("login")}
              </Link>
              <Link
                href={`/${locale}/auth/signup`}
                className="btn-primary text-sm py-2 hidden sm:block"
              >
                {nav("signup")}
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            aria-label="メニュー"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          <Link
            href={`/${locale}/courses`}
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {nav("courses")}
          </Link>
          <Link
            href={`/${locale}/ai-tutor`}
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {nav("aiTutor")}
          </Link>
          <Link
            href={`/${locale}/career`}
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {nav("career")}
          </Link>
          {/* プレミアム体験CTA (モバイル) */}
          <Link
            href={`/${locale}/pricing`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 font-semibold transition-colors"
          >
            <Crown className="w-4 h-4" />
            7日間 無料体験（プレミアム）
          </Link>

          <div className="pt-2 border-t border-gray-100 mt-2">
            {authUser ? (
              /* ログイン済み (モバイル) */
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-900">{authUser.name}</p>
                  <p className="text-xs text-gray-400">{authUser.email}</p>
                </div>
                <Link
                  href={`/${locale}/dashboard`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  ダッシュボード
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </button>
              </div>
            ) : (
              /* 未ログイン (モバイル) */
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/auth/login`}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {nav("login")}
                </Link>
                <Link
                  href={`/${locale}/auth/signup`}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 btn-primary text-sm py-2.5 text-center"
                >
                  {nav("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
