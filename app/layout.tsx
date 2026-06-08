import type { Metadata } from "next";
import { Playfair_Display, Lato, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
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
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#FAF6F1]">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}