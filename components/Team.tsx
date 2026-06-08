"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { team } from "@/data";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  // Drag state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const isHorizontalDrag = useRef(false);

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

  const handleNext = useCallback(() => {
    setDirection("left");
    setActiveIndex((prev) => (prev + 1) % team.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection("right");
    setActiveIndex((prev) => (prev - 1 + team.length) % team.length);
  }, []);

  // ── Drag handlers ──────────────────────────────────────
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragStartY.current = clientY;
    isHorizontalDrag.current = false;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    const deltaY = clientY - dragStartY.current;

    // Determine drag direction on first significant movement
    if (!isHorizontalDrag.current && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      isHorizontalDrag.current = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (isHorizontalDrag.current) {
      setDragX(deltaX);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (dragX > threshold) {
      handlePrev();
    } else if (dragX < -threshold) {
      handleNext();
    }
    setDragX(0);
    isHorizontalDrag.current = false;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#FAF6F1] relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#B33A2A]/[0.02] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14">
          {/* ── Left side ─────────────────────────────── */}
          <div
            className={`lg:w-2/5 flex-shrink-0 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
              <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                Experts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
              Meet The
              <br />
              <span className="text-[#B33A2A] italic">Artists</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
              Entrust your locks to our team of skilled and creative stylists
              who bring your vision to life with passion and precision.
            </p>

            {/* Active member info (dynamic) */}
            <div className="mb-10 min-h-[80px]">
              <div
                key={activeIndex}
                className="animate-fade-in-up"
              >
                <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mb-1">
                  Currently viewing
                </p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                  {team[activeIndex].name}
                </p>
                <p className="text-[#B33A2A] text-sm font-medium">
                  {team[activeIndex].role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/team"
                className="magnetic-btn bg-gray-900 hover:bg-[#B33A2A] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-500 flex items-center gap-2"
              >
                Join the Team
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#B33A2A] hover:bg-[#B33A2A] transition-all duration-300 group active:scale-95"
                  aria-label="Previous member"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#B33A2A] hover:bg-[#B33A2A] transition-all duration-300 group active:scale-95"
                  aria-label="Next member"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex gap-1.5">
                {team.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > activeIndex ? "left" : "right");
                      setActiveIndex(i);
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-10 bg-[#B33A2A]"
                        : "w-5 bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to member ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-gray-300 text-xs font-medium tracking-wider ml-2">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(team.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Right: Stacked flashcards ──────────────── */}
          <div
            className={`flex-1 transition-all duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center select-none"
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) =>
                handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
              }
              onTouchMove={(e) =>
                handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
              }
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {team.map((member, index) => {
                // Calculate offset position relative to active card
                const total = team.length;
                let offset = index - activeIndex;
                // Normalize offset to range like -1, 0, 1, 2 (wrap-around)
                if (offset < -Math.floor(total / 2)) offset += total;
                if (offset > Math.floor(total / 2)) offset -= total;

                const isActive = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === -1;
                const isHidden = !isActive && !isNext && !isPrev;

                // Position, scale, rotation per card
                let translateX = 0;
                let translateY = 0;
                let scale = 1;
                let rotate = 0;
                let zIndex = 10;
                let opacity = 1;

                if (isActive) {
                  translateX = isDragging ? dragX : 0;
                  rotate = isDragging ? dragX * 0.05 : 0;
                  zIndex = 30;
                } else if (isNext) {
                  translateX = 40;
                  translateY = 20;
                  scale = 0.92;
                  rotate = 4;
                  zIndex = 20;
                  opacity = 0.7;
                } else if (isPrev) {
                  translateX = -40;
                  translateY = 20;
                  scale = 0.92;
                  rotate = -4;
                  zIndex = 20;
                  opacity = 0.7;
                } else {
                  // Hidden cards stacked behind
                  translateY = 40;
                  scale = 0.85;
                  zIndex = 5;
                  opacity = 0;
                }

                return (
                  <div
                    key={member.id}
                    className={`absolute w-[85%] sm:w-[75%] md:w-[70%] max-w-[420px] h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl ${
                      isDragging && isActive
                        ? ""
                        : "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    } ${isHidden ? "pointer-events-none" : ""}`}
                    style={{
                      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      draggable={false}
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 85vw, 420px"
                      priority={isActive}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Top badge */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white text-[10px] font-bold tracking-wider uppercase">
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Member index */}
                    <div className="absolute top-5 right-5 glass rounded-full px-3 py-1.5">
                      <span className="text-white text-[10px] font-bold tracking-wider">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(team.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                            Stylist
                          </p>
                          <p className="text-white font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                            {member.name}
                          </p>
                          <p className="text-white/60 text-sm mt-1">
                            {member.role}
                          </p>
                        </div>

                        {/* View profile arrow */}
                        <Link
                          href={`/team/${member.id}`}
                          className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B33A2A] hover:bg-white hover:text-[#B33A2A] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
                          onClick={(e) => {
                            if (Math.abs(dragX) > 5) e.preventDefault();
                          }}
                        >
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:rotate-12" />
                        </Link>
                      </div>

                      {/* Social pills */}
                      <div className="flex gap-2 mt-5">
                        {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                          <span
                            key={social}
                            className="text-[10px] text-white/50 font-medium tracking-wider uppercase border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          >
                            {social}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Drag indicator overlay when active & dragging */}
                    {isActive && isDragging && Math.abs(dragX) > 30 && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity ${
                          Math.abs(dragX) > 60 ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <div
                          className={`px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase ${
                            dragX > 0
                              ? "bg-white/20 text-white border-2 border-white/40"
                              : "bg-[#B33A2A]/30 text-white border-2 border-[#B33A2A]/60"
                          }`}
                        >
                          {dragX > 0 ? "← Previous" : "Next →"}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Swipe hint (mobile) */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-[10px] font-medium tracking-[0.3em] uppercase flex items-center gap-2 sm:hidden">
                <span>←</span>
                <span>Swipe</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}