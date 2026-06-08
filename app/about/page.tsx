import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  Sparkles,
  Lightbulb,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — MINERVA",
  description:
    "Learn about MINERVA's story, values, and the passionate team behind our salon.",
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in every cut, color, and style.",
  },
  {
    icon: Heart,
    title: "Personalisation",
    description:
      "No two clients are the same — your style is crafted uniquely for you.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of trends so our clients always look ahead of the curve.",
  },
];

const milestones = [
  { year: "2014", event: "MINERVA founded in NYC" },
  { year: "2017", event: "Opened second location" },
  { year: "2020", event: "Award for Best Salon" },
  { year: "2024", event: "15 salons citywide" },
];

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "30k", label: "Happy Clients" },
  { value: "15+", label: "Locations" },
  { value: "50+", label: "Industry Awards" },
];

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] bg-[#1a0e08] flex items-center justify-center overflow-hidden pt-24">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=85"
          alt="About Minerva"
          fill
          className="object-cover opacity-40 hero-bg-animate"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e08]/70 via-[#1a0e08]/40 to-[#1a0e08]" />
        <div className="absolute inset-0 film-grain opacity-30" />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-[#B33A2A]" />
            <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
              About MINERVA
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-200">
            Crafting
            <br />
            <span className="text-[#B33A2A] italic">Confidence</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-400">
            More than a salon — a destination where artistry meets passion to
            redefine your style.
          </p>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in-up delay-600">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`${
                  i > 0 ? "md:border-l border-white/10" : ""
                } md:pl-6 text-center md:text-left`}
              >
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs mt-2 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story Section ────────────────────────────────── */}
      <section className="py-24 bg-[#FAF6F1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B33A2A]/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B33A2A]" />
                <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                Where artistry
                <br />
                <span className="text-[#B33A2A] italic">meets passion</span>
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  MINERVA was founded with a single mission: to create a space
                  where every client leaves feeling truly transformed. We
                  believe that a great haircut isn&apos;t just about style —
                  it&apos;s about{" "}
                  <span className="text-gray-900 font-semibold">
                    confidence
                  </span>
                  .
                </p>
                <p>
                  Our salon brings together the most talented stylists in the
                  city, each with a passion for their craft and an eye for
                  what makes each client unique.
                </p>
                <p>
                  From the moment you walk through our doors, you&apos;re not
                  just a client — you&apos;re a canvas for our artistry.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <Link
                  href="/contact"
                  className="magnetic-btn bg-[#B33A2A] hover:bg-[#922e21] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-[#B33A2A]/30 flex items-center gap-2 group"
                >
                  Book Consultation
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/team"
                  className="text-gray-900 hover:text-[#B33A2A] text-sm font-semibold transition-colors flex items-center gap-2 group"
                >
                  Meet the Team
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: image collage */}
            <div className="relative h-[600px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[75%] h-[70%] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85"
                  alt="Our salon interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Secondary floating image */}
              <div className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#FAF6F1]">
                <Image
                  src="https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&q=85"
                  alt="Stylist at work"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute top-8 left-0 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#B33A2A]/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#B33A2A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none">
                      10+
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
                      Years
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Of crafting iconic looks for our clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-[-100px] w-80 h-80 bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
              <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                What Drives Us
              </span>
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-[1.1]">
              Our Core
              <br />
              <span className="text-[#B33A2A] italic">Values</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              The principles that shape every interaction and every cut.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden bg-[#FAF6F1] hover:bg-gray-900 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Hover decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B33A2A]/0 group-hover:bg-[#B33A2A]/20 rounded-full blur-2xl transition-all duration-500" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#B33A2A] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon
                        className="w-5 h-5 text-[#B33A2A] group-hover:text-white transition-colors"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 tracking-tight transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                      {value.description}
                    </p>

                    {/* Index */}
                    <div className="absolute top-0 right-0 text-gray-200 group-hover:text-white/10 text-5xl font-bold transition-colors">
                      0{i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones ────────────────────────── */}
      <section className="py-24 bg-[#FAF6F1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
            {/* Left: heading */}
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B33A2A]" />
                <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                  Journey
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-[1.1]">
                Our
                <br />
                <span className="text-[#B33A2A] italic">Milestones</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                A decade of growth, creativity, and unforgettable
                transformations.
              </p>
            </div>

            {/* Right: timeline */}
            <div className="lg:col-span-2 relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#B33A2A] via-[#B33A2A]/30 to-transparent" />

              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="relative pl-10 group"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#B33A2A] ring-4 ring-[#FAF6F1] transition-transform duration-300 group-hover:scale-125" />

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#B33A2A]/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
                      <p className="text-[#B33A2A] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                        {m.year}
                      </p>
                      <p className="text-lg font-bold text-gray-900 tracking-tight">
                        {m.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B33A2A] to-[#922e21] p-10 md:p-16">
            <div className="absolute inset-0 film-grain opacity-20" />
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-white/[0.05] rounded-full blur-3xl" />
            <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-white/40" />
                  <span className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase">
                    Ready to Begin?
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.05]">
                  Experience
                  <br />
                  <span className="text-white/70 italic">MINERVA</span>
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                  Book your first appointment and discover what makes us
                  different.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <Link
                  href="/contact"
                  className="magnetic-btn bg-white text-gray-900 font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Book Now
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/team"
                  className="magnetic-btn border-2 border-white/20 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 flex items-center justify-center gap-2"
                >
                  Meet the Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}