import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MINERVA — Get the Hair Style You Deserve",
  description:
    "Discover a world of sophistication and personalised beauty at MINERVA. Premium haircuts, styling, and coloring in New York.",
  keywords: ["hair salon", "haircut", "hair styling", "hair coloring", "MINERVA"],
  openGraph: {
    title: "MINERVA Hair Salon",
    description: "Get the Hair Style You Deserve",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-[#FAF6F1]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}