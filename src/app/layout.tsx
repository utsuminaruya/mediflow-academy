import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mediflow Academy - AI日本語コーチ',
  description: '外国人介護士・医療従事者のためのAI日本語学習プラットフォーム',
  keywords: ['日本語学習', 'JLPT', '介護', 'AI家庭教師', 'ベトナム語'],
  openGraph: {
    title: 'Mediflow Academy',
    description: 'AI家庭教師Medi先生と日本語を学ぼう',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
