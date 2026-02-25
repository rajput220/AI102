import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Onboarded",
  description: "AI news, podcast episodes, newsletters, and blog posts."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
