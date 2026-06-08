"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ShoppingCart, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsOpen } = useCart();

  const isHomePage = pathname === "/";
  const isDark = isHomePage ? scrolled : true;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isDark
            ? "bg-[#1a0e08]/90 backdrop-blur-xl shadow-2xl shadow-black/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* ── Left links (desktop only) ──────────────── */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm text-white/80 hover:text-white transition-colors font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#B33A2A] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Logo (centered on desktop, left on mobile) ── */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-white uppercase md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <span className="relative">
              MINERVA
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B33A2A] to-transparent" />
            </span>
          </Link>

          {/* ── Right side (desktop) ──────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-white/80 hover:text-white transition-colors font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#B33A2A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2.5 hover:bg-white/20 transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B33A2A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-1.5 group-hover:text-white transition-colors duration-300">
                Contact Us
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 bg-[#B33A2A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            </Link>
            <button
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2.5 hover:bg-white/20 transition-all duration-300"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* ── Right side (mobile) ───────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2.5 hover:bg-white/20 active:scale-95 transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B33A2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Contact (icon-only) */}
            <Link
              href="/contact"
              className="bg-[#B33A2A] hover:bg-[#922e21] active:scale-95 rounded-full p-2.5 transition-all duration-300"
              aria-label="Contact us"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </Link>

            {/* Menu toggle */}
            <button
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2.5 hover:bg-white/20 active:scale-95 transition-all duration-300 z-50 relative"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Full-screen Mobile Menu ─────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 md:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#1a0e08]/95 backdrop-blur-2xl transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative z-10 flex flex-col justify-center items-center min-h-screen px-6 transition-all duration-700 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-4xl sm:text-5xl font-bold py-3 relative group"
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: open ? `${i * 100 + 200}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(40px)",
                opacity: open ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <span className="group-hover:text-[#B33A2A] transition-colors duration-300">
                {link.label}
              </span>
              <span className="absolute bottom-2 left-0 w-0 h-1 bg-[#B33A2A] group-hover:w-full transition-all duration-500" />
            </Link>
          ))}

          <Link
            href="/contact"
            className="mt-10 bg-[#B33A2A] hover:bg-[#922e21] text-white text-sm font-semibold px-10 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
            onClick={() => setOpen(false)}
            style={{
              transitionDelay: open ? "600ms" : "0ms",
              transform: open ? "translateY(0)" : "translateY(40px)",
              opacity: open ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            Book Appointment
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}