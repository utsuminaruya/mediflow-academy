import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_JOBSEEKER || 'https://lin.ee/xUocVyI';

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Mediflow <span className="text-[#0066CC]">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              外国人介護士・医療従事者のためのAI日本語学習プラットフォーム
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">学習</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/courses`} className="hover:text-white transition-colors">コース一覧</Link></li>
              <li><Link href={`/${locale}/ai-tutor`} className="hover:text-white transition-colors">AI家庭教師</Link></li>
              <li><Link href={`/${locale}/dashboard`} className="hover:text-white transition-colors">ダッシュボード</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/pricing`} className="hover:text-white transition-colors">料金プラン</Link></li>
              <li>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  就職相談 <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://forms.gle/H4kMy3fibe5oVrKbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  求職フォーム <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">言語 / Language</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ja" className="hover:text-white transition-colors">日本語</Link></li>
              <li><Link href="/vi" className="hover:text-white transition-colors">Tiếng Việt</Link></li>
            </ul>

            <div className="mt-6">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00B300] hover:bg-[#009900] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE相談
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Mediflow株式会社. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            現役看護師が運営する外国人医療・介護人材紹介会社
          </p>
        </div>
      </div>
    </footer>
  );
}
