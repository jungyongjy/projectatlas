import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atlas — Hybrid Athlete Handbook",
    template: "%s — Atlas",
  },
  description:
    "A documentation-first operating manual for long-term hybrid athletic development. Training philosophy, exercise library, decision frameworks, and scientific rationale.",
  keywords: [
    "hybrid athlete",
    "training handbook",
    "running",
    "strength training",
    "mobility",
    "nutrition",
    "concurrent training",
  ],
  authors: [{ name: "Jung Yong" }],
  robots: "index, follow",
  openGraph: {
    title: "Atlas — Hybrid Athlete Handbook",
    description:
      "A documentation-first operating manual for long-term hybrid athletic development.",
    type: "website",
    siteName: "Atlas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to content
        </a>
        <TooltipProvider delay={300}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
