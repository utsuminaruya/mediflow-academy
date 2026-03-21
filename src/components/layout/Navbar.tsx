"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS } from "@/constants";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const nav = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          <span className="font-bold text-lg text-gray-900 hidden sm:block">Mediflow Academy</span>
          <span className="font-bold text-lg text-gray-900 sm:hidden">Mediflow</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href={`/${locale}/courses`} className="hover:text-primary-600 transition-colors">
            {nav("courses")}
          </Link>
          <Link href={`/${locale}/ai-tutor`} className="hover:text-primary-600 transition-colors">
            {nav("aiTutor")}
          </Link>
          <Link href={`/${locale}/career`} className="hover:text-primary-600 transition-colors">
            {nav("career")}
          </Link>
        </div>

        {/* Right side: lang switcher + auth buttons */}
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
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLangOpen(false)}
                />
                {/* Dropdown */}
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
                      <span className="text-lg">{LOCALE_FLAGS[l]}</span>
                      <span>{LOCALE_LABELS[l]}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Auth links - desktop */}
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
          <div className="pt-2 border-t border-gray-100 mt-2 flex gap-2">
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
        </div>
      )}
    </nav>
  );
}
