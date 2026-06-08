"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data";
import { useEffect, useRef, useState } from "react";

export default function Services() {
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
    <section ref={sectionRef} className="py-24 bg-[#FAF6F1] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B33A2A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B33A2A]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-start gap-14">
          {/* Left: heading */}
          <div
            className={`lg:w-1/4 flex-shrink-0 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
              <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Our
              <br />
              Services
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Beyond haircuts, discover a comprehensive range of services, from
              coloring to extensions.
            </p>
            <Link
              href="/services"
              className="magnetic-btn inline-flex items-center gap-2 bg-gray-900 hover:bg-[#B33A2A] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-500"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: service cards */}
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative overflow-hidden rounded-3xl flex-1 min-h-[380px] cursor-pointer transition-all duration-700 ${
                  index === 1 ? "md:mt-10" : ""
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Tag */}
                <div
                  className={`absolute top-5 left-5 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 group-hover:scale-105 ${
                    index === 0
                      ? "bg-[#B33A2A] text-white"
                      : "bg-white/90 backdrop-blur-sm text-gray-900"
                  }`}
                >
                  {service.title}
                </div>

                {/* Index number */}
                <div className="absolute top-5 right-5 text-white/20 text-6xl font-bold transition-all duration-500 group-hover:text-white/10">
                  0{index + 1}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}