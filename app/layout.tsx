import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
