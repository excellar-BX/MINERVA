// components/WhyChooseUs.tsx
"use client";

import { whyChooseUs } from "@/data";
import { useEffect, useRef, useState } from "react";
import { Scissors, Crown, TrendingUp, Gem } from "lucide-react";

const icons = [Scissors, Crown, TrendingUp, Gem];

function AnimatedCounter({
  target,
  suffix = "",
  visible,
}: {
  target: number;
  suffix?: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#B33A2A] relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] border border-white/[0.05] rounded-full" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] border border-white/[0.05] rounded-full" />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/40" />
              <span className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase">
                Why Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Why Choose
              <br />
              <span className="text-white/60">Us</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              We don&apos;t just style hair — we craft confidence. Every visit
              is an experience designed around you.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-5xl font-bold text-white tracking-tight">
                  <AnimatedCounter
                    target={30}
                    suffix="k"
                    visible={visible}
                  />
                </p>
                <p className="text-white/40 text-xs mt-2 tracking-wider uppercase font-medium">
                  Satisfied Clients
                </p>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <p className="text-5xl font-bold text-white tracking-tight">
                  <AnimatedCounter target={15} visible={visible} />
                </p>
                <p className="text-white/40 text-xs mt-2 tracking-wider uppercase font-medium">
                  Salons
                </p>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-7 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150 + 300}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.05] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-white font-bold text-lg mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Corner number */}
                  <div className="absolute top-5 right-5 text-white/[0.05] text-5xl font-bold">
                    0{item.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}