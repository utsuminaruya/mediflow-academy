import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mediflow 統合プラットフォーム',
  description: 'AIマッチング × Academy学習 × 即戦力納品',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
