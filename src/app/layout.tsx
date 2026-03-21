import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediflow Academy",
  description: "日本で医療・介護のプロになる。AIが支える学習から就職まで。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
