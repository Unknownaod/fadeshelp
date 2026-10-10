import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Fades Help Center", template: "%s | Fades Help" },
  description:
    "Guides, answers, and support for Fades AI, Fades Mail, Fades Browser, your Fades account, and everything in the Fades ecosystem.",
  openGraph: {
    title: "Fades Help Center",
    description: "Guides, answers, and people for everything in the Fades ecosystem.",
    siteName: "Fades Support",
    type: "website",
  },
};

export const viewport = { themeColor: "#0c0c0d" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main className="page">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
