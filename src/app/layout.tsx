import type { Metadata } from "next";
import { Inter, Outfit, Roboto } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Bikin Sendiri - No Code Web Builder",
  description: "Buat website profesional Anda dalam hitungan menit tanpa koding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${outfit.variable} ${roboto.variable} font-sans antialiased text-slate-900`}

      >
        {children}
      </body>
    </html>
  );
}
