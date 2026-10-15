import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Sign in · Paysure",
  description:
    "Sign in to Paysure, the AI-native intelligence system of global payments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lexend.variable} min-h-dvh overflow-x-hidden antialiased lg:h-dvh lg:overflow-hidden`}>
      <body className="min-h-dvh lg:h-full lg:overflow-hidden">{children}</body>
    </html>
  );
}
