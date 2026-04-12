import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif, UnifrakturMaguntia, EB_Garamond, Space_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { FunModeProvider } from "./components/FunModeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const unifraktur = UnifrakturMaguntia({
  variable: "--font-blackletter",
  subsets: ["latin"],
  weight: "400",
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Divyansh Chawla — Portfolio",
  description: "Senior Python Developer & Backend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${unifraktur.variable} ${ebGaramond.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <FunModeProvider>
            {children}
          </FunModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
