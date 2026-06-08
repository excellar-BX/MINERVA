"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const teamAvatars = [
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=80&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Expert Stylists" },
  { value: "10Y", label: "Experience" },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-10px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
          }}
        />
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-1000">
      <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
      <div className="w-[1px] h-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent animate-bounce" />
      </div>
      <ArrowDown className="w-3 h-3 text-white/40 animate-bounce" />
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#1a0e08] overflow-hidden"
    >
      {/* Animated Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-10%] hero-bg-animate"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.1)`,
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1920&q=90"
            alt="Minerva salon hero"
            fill
            className={`object-cover object-top transition-all duration-1000 ${
              loaded ? "opacity-50 scale-100" : "opacity-0 scale-110"
            }`}
            priority
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0e08]/95 via-[#1a0e08]/60 to-[#1a0e08]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08] via-transparent to-[#1a0e08]/40" />

        {/* Film grain */}
        <div className="absolute inset-0 film-grain opacity-30" />
      </div>

      <Particles />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B33A2A]" />
            <span className="text-xs text-white/70 font-medium tracking-wider uppercase">
              Premium Hair Experience
            </span>
          </div>

          {/* Heading with staggered word reveal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tight">
  <span className="block">
    {["Get", "Hair", "Style"].map((word, i) => (
      <span
        key={word}
        className="inline-block overflow-hidden align-bottom pb-2 mr-3 md:mr-5"
      >
        <span
          className={`inline-block transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ transitionDelay: `${400 + i * 150}ms` }}
        >
          {word}
        </span>
      </span>
    ))}
  </span>
  <span className="block">
    {["You", "Deserve"].map((word, i) => (
      <span
        key={word}
        className="inline-block overflow-hidden align-bottom pb-2 mr-3 md:mr-5"
      >
        <span
          className={`inline-block transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          } ${word === "Deserve" ? "text-[#B33A2A] italic pr-2" : ""}`}
          style={{ transitionDelay: `${850 + i * 150}ms` }}
        >
          {word}
        </span>
      </span>
    ))}
  </span>
</h1>

          {/* CTA + Description */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <Link
              href="/contact"
              className="magnetic-btn animate-pulse-glow group relative overflow-hidden bg-[#B33A2A] text-white text-sm font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-[#B33A2A]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment
                <ArrowDown className="w-4 h-4 rotate-[-90deg] transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Discover a world of sophistication and personalised beauty at{" "}
              <span className="text-white/80 font-medium">MINERVA</span>
            </p>
          </div>

          {/* Stats */}
          <div
            className={`flex gap-8 mt-14 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1300ms" }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/10" />
                )}
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-xs mt-1 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Cards */}
        <div
          className={`flex flex-wrap gap-4 mt-16 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          {/* New Arrivals Card */}
          <div className="group bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[220px] hover:bg-white/[0.12] transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
            <div className="bg-white/10 rounded-xl p-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&q=80"
                alt="New Arrivals"
                width={48}
                height={48}
                className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">
                New Arrivals
              </p>
              <p className="text-sm font-bold text-white">+5 products</p>
            </div>
            <button className="ml-auto bg-white/10 hover:bg-[#B33A2A] rounded-full p-2 transition-all duration-300">
              <Plus className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Promo Card */}
          <div className="group relative overflow-hidden bg-[#B33A2A] rounded-2xl p-4 flex items-center gap-4 min-w-[220px] hover:-translate-y-1 transition-all duration-500">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative bg-white/20 rounded-xl p-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=80&q=80"
                alt="Hair Styling"
                width={48}
                height={48}
                className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative">
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.2em]">
                Only Today
              </p>
              <p className="text-2xl font-bold text-white">50% OFF</p>
              <p className="text-xs text-white/60">for hair styling</p>
            </div>
          </div>
        </div>

        {/* Team Avatars */}
        <div
          className={`absolute bottom-16 right-8 hidden lg:flex flex-col items-center gap-4 transition-all duration-700 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "1700ms" }}
        >
          <p className="text-white/30 text-[10px] font-medium tracking-[0.3em] uppercase">
            Our Team
          </p>
          <div className="flex -space-x-3">
            {teamAvatars.map((src, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-full border-2 border-[#1a0e08] overflow-hidden ring-1 ring-white/20 transition-transform hover:scale-110 hover:z-10"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Image
                  src={src}
                  alt={`Team member ${i + 1}`}
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </div>
            ))}
            <Link
              href="/team"
              className="w-11 h-11 rounded-full bg-[#B33A2A] border-2 border-[#1a0e08] flex items-center justify-center ring-1 ring-white/20 hover:scale-110 transition-transform"
            >
              <Plus className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        <ScrollIndicator />
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/[0.05] bg-[#1a0e08]/50 backdrop-blur-sm">
        <div className="animate-marquee flex whitespace-nowrap py-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-white/10 text-sm font-medium mx-8 tracking-[0.3em] uppercase"
            >
              MINERVA • Premium Salon •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}