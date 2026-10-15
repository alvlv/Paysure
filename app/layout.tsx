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
    <html lang="en" className={`${lexend.variable} h-dvh overflow-hidden antialiased`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
