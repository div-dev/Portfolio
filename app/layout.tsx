import type { Metadata } from "next";
import { Space_Mono, JetBrains_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "./components/SmoothScroll";
import ScanlineOverlay from "./components/ScanlineOverlay";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import ChapterHUD from "./components/ChapterHUD";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divyansh Chawla | Senior Python Developer",
  description:
    "Senior Python Developer & Backend Engineer. Kafka pipelines, Airflow orchestration, Python microservices shipped for enterprise clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
    >
      <body
        className="bg-[#0a0a0a] text-[#e0e0e0] min-h-screen overflow-x-hidden custom-cursor-body"
      >
        <ScrollProgress />
        <ChapterHUD />
        <Cursor />
        <ScanlineOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
