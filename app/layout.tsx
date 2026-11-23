import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog. — A blog about work, life, and everything in between",
  description: "A simple blog built with Next.js, Drizzle, and SQLite.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <span>© Blog. — Write something worth reading.</span>
            <span>Built with Next.js, Drizzle &amp; SQLite</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
