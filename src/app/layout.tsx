import type { Metadata } from "next";
import { Inter, Outfit, Roboto, Poppins, DM_Sans } from "next/font/google";

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

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
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
        className={`${inter.variable} ${outfit.variable} ${roboto.variable} ${poppins.variable} ${dmSans.variable} font-sans antialiased text-slate-900`}

      >
        {children}
      </body>
    </html>
  );
}
