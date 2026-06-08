"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

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

  // Only the homepage has a dark hero — all other pages have light backgrounds
  const isHomePage = pathname === "/";

  // On non-home pages, treat as already "scrolled" so dark bg shows immediately
  const isDark = isHomePage ? scrolled : true;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left links */}
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

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-[0.3em] text-white uppercase absolute left-1/2 -translate-x-1/2"
          >
            <span className="relative">
              MINERVA
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B33A2A] to-transparent" />
            </span>
          </Link>

          {/* Right links + CTA */}
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
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
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
          className={`relative z-10 flex flex-col justify-center items-center min-h-screen transition-all duration-700 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-4xl md:text-6xl font-bold py-4 relative group"
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
            className="mt-10 bg-[#B33A2A] hover:bg-[#922e21] text-white text-sm font-semibold px-10 py-4 rounded-full transition-all duration-300"
            onClick={() => setOpen(false)}
            style={{
              transitionDelay: open ? "600ms" : "0ms",
              transform: open ? "translateY(0)" : "translateY(40px)",
              opacity: open ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}