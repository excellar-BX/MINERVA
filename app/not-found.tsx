import Link from "next/link";
import { ArrowUpRight, Home, Search } from "lucide-react";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "404 — Page Not Found | MINERVA",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#1a0e08] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 film-grain opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B33A2A]/10 rounded-full blur-3xl" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B33A2A] animate-pulse" />
          <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
            Page Not Found
          </span>
        </div>

        {/* Huge 404 */}
        <div className="relative animate-fade-in-up delay-200">
          <h1 className="text-[120px] sm:text-[180px] md:text-[240px] font-bold text-white leading-none tracking-tighter">
            4<span className="text-[#B33A2A] italic">0</span>4
          </h1>
          <div
            aria-hidden
            className="absolute inset-0 text-[120px] sm:text-[180px] md:text-[240px] font-bold text-[#B33A2A]/20 leading-none tracking-tighter blur-sm"
          >
            404
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 mt-4 animate-fade-in-up delay-400">
          Lost in the <span className="text-[#B33A2A] italic">style</span>
        </h2>

        <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed mb-10 animate-fade-in-up delay-500">
          The page you&apos;re looking for has been restyled, moved, or
          doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-600">
          <Link
            href="/"
            className="magnetic-btn group bg-[#B33A2A] hover:bg-[#922e21] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-[#B33A2A]/30 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/contact"
            className="magnetic-btn border-2 border-white/15 hover:border-white/30 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-16 animate-fade-in-up delay-700">
          <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
            Or visit
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Our Team", href: "/team" },
              { label: "Blog", href: "/blog" },
              { label: "Services", href: "/services" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-white/60 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#B33A2A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        <BackButton />
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/[0.05]">
        <div className="animate-marquee flex whitespace-nowrap py-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-white/10 text-sm font-medium mx-8 tracking-[0.3em] uppercase"
            >
              404 • Page Not Found •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}