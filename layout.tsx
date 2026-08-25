import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SkillSync — Real-Time Labour-Market Intelligence | SIH 2026",
  description:
    "Real-time labour-market intelligence that aligns skill training with actual industry demand. Govt of Maharashtra Initiative for SIH 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full bg-[#0A0A0A] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
