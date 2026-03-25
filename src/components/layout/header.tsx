'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/courses`, label: t('courses') },
    { href: `/${locale}/ai-tutor`, label: t('aiTutor') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/dashboard`, label: t('dashboard') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center group-hover:bg-[#0052A3] transition-colors">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">
              Mediflow <span className="text-[#0066CC]">Academy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#0066CC] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Locale switcher */}
            <div className="flex items-center gap-1 text-sm">
              <Link
                href={`/ja`}
                className={cn(
                  'px-2 py-1 rounded font-medium transition-colors',
                  locale === 'ja'
                    ? 'bg-[#0066CC] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                日本語
              </Link>
              <Link
                href={`/vi`}
                className={cn(
                  'px-2 py-1 rounded font-medium transition-colors',
                  locale === 'vi'
                    ? 'bg-[#0066CC] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Tiếng Việt
              </Link>
            </div>

            <Link href={`/${locale}/dashboard`}>
              <Button variant="outline" size="sm">
                {t('login')}
              </Button>
            </Link>
            <Link href={`/${locale}/onboarding`}>
              <Button size="sm">
                {t('signup')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-[#0066CC] py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href={`/ja`}
                  className={cn(
                    'px-3 py-1.5 rounded text-sm font-medium',
                    locale === 'ja' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  日本語
                </Link>
                <Link
                  href={`/vi`}
                  className={cn(
                    'px-3 py-1.5 rounded text-sm font-medium',
                    locale === 'vi' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  Tiếng Việt
                </Link>
              </div>
              <Link href={`/${locale}/onboarding`} onClick={() => setMobileMenuOpen(false)}>
                <Button fullWidth>{t('signup')}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
