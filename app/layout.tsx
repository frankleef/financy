import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Potjes",
  description: "Onze maandelijkse financiën, per potje.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f6e56",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={publicSans.variable}>
      <body className="bg-surface text-ink font-sans antialiased" style={{ fontVariantNumeric: "tabular-nums" }}>
        {children}
      </body>
    </html>
  );
}
