import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UHL Intelligence Platform",
  description: "The Intelligence Layer for Home Service Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <DemoBanner />
        <Providers>
          <div className="pt-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
