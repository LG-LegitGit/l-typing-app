import type { Metadata } from "next";
import { Geist, Geist_Mono, Frank_Ruhl_Libre } from "next/font/google"; // 👈 Add this
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl", 
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Hebrew Typing Temple",
  description: "Master the sacred letters through touch typing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className="dark"> {/* 👈 Default to RTL and Dark */}
      <body className={`${geistSans.variable} ${frankRuhl.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}