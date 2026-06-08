import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { team } from "@/data";

export const metadata: Metadata = {
  title: "Our Team — MINERVA",
  description: "Meet the talented stylists behind MINERVA.",
};

const fullTeam = [
  ...team,
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Color Specialist",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Extensions Expert",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&q=80",
  },
  {
    id: 6,
    name: "Nina Torres",
    role: "Junior Stylist",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
];

const teamStats = [
  { value: "15+", label: "Expert Stylists" },
  { value: "10Y", label: "Avg. Experience" },
  { value: "98%", label: "Client Retention" },
  { value: "50+", label: "Awards Won" },
];

export default function TeamPage() {
  return (
    <div>
      {/* ── Hero Header ─────────────────────────────────── */}
      <section className="relative min-h-[70vh] bg-[#1a0e08] flex items-center justify-center overflow-hidden pt-24">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85"
          alt="Our team"
          fill
          className="object-cover opacity-30 hero-bg-animate"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e08]/80 via-[#1a0e08]/40 to-[#1a0e08]" />
        <div className="absolute inset-0 film-grain opacity-30" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B33A2A]" />
            <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
              Our Team
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-200">
            Meet The
            <br />
            <span className="text-[#B33A2A] italic">Artists</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-400">
            The talented hands and creative minds behind every transformation at
            MINERVA.
          </p>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in-up delay-600">
            {teamStats.map((stat, i) => (
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

      {/* ── Team Grid ────────────────────────────────────── */}
      <section className="py-24 bg-[#FAF6F1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B33A2A]/[0.04] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B33A2A]" />
                <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                  Our People
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                The Whole Crew
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Each stylist brings unique expertise and passion to deliver
              experiences you&apos;ll remember.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullTeam.map((member, i) => (
              <Link
                key={member.id}
                href={`/team/${member.id}`}
                className="group relative block overflow-hidden rounded-3xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Index */}
                  <div className="absolute top-5 left-5 glass rounded-full px-3 py-1.5">
                    <span className="text-white text-[10px] font-bold tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Available badge */}
                  <div className="absolute top-5 right-5 glass rounded-full px-3 py-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white text-[10px] font-bold tracking-wider uppercase">
                      Available
                    </span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between gap-3">
                      <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                          Stylist
                        </p>
                        <p className="text-white font-bold text-xl tracking-tight">
                          {member.name}
                        </p>
                        <p className="text-white/60 text-sm">{member.role}</p>
                      </div>

                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#B33A2A] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
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
                    Careers
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.05]">
                  Join Our
                  <br />
                  <span className="text-white/70 italic">Team</span>
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                  Are you a passionate stylist looking for your next adventure?
                  We&apos;d love to hear from you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <Link
                  href="/contact"
                  className="magnetic-btn bg-white text-gray-900 font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/careers"
                  className="magnetic-btn border-2 border-white/20 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 flex items-center justify-center gap-2"
                >
                  View Openings
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