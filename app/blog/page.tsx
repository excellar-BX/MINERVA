import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — MINERVA",
  description: "Hair care tips, trend guides, and style inspiration from the MINERVA team.",
};

const posts = [
  {
    slug: "top-hair-trends-2024",
    title: "Top Hair Trends to Watch in 2024",
    excerpt:
      "From lived-in colour to textured bobs, here's what our expert stylists are seeing on the salon floor this year.",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=1200&q=80",
    author: "Olivia Smith",
    featured: true,
  },
  {
    slug: "how-to-maintain-colored-hair",
    title: "How to Maintain Vibrant Coloured Hair at Home",
    excerpt:
      "Colour-treated hair needs special care. Our colourists share their top maintenance secrets.",
    date: "Jan 22, 2024",
    readTime: "4 min read",
    category: "Hair Care",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    author: "Amelia Brown",
  },
  {
    slug: "best-haircut-for-your-face-shape",
    title: "Choosing the Best Haircut for Your Face Shape",
    excerpt:
      "The perfect cut starts with understanding your features. Here's our complete guide to finding yours.",
    date: "Feb 1, 2024",
    readTime: "7 min read",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    author: "Emily Walker",
  },
  {
    slug: "summer-hair-protection",
    title: "Protecting Your Hair This Summer",
    excerpt:
      "Sun, salt, and chlorine can wreak havoc on your locks. Here's how to stay protected all season.",
    date: "Feb 10, 2024",
    readTime: "6 min read",
    category: "Hair Care",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
    author: "Olivia Smith",
  },
];

const categories = ["All", "Trends", "Hair Care", "Guides", "Tips"];

export default function BlogPage() {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#1a0e08] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 film-grain opacity-30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B33A2A]/10 rounded-full blur-3xl" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B33A2A]" />
            <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
              Journal
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-200">
            Style
            <br />
            <span className="text-[#B33A2A] italic">Insights</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-400">
            Hair care tips, trend guides, and style inspiration from the
            MINERVA team.
          </p>
        </div>
      </section>

      {/* ── Featured Post ────────────────────────────────── */}
      <section className="py-20 bg-[#FAF6F1] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B33A2A]" />
                <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Editor&apos;s Pick
              </h2>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    i === 0
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured card */}
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute top-5 left-5 bg-[#B33A2A] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                {featuredPost.category}
              </div>
              <div className="absolute bottom-5 left-5 glass rounded-full px-3 py-1.5">
                <span className="text-white text-[10px] font-bold tracking-wider uppercase">
                  Featured
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-[#B33A2A] transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B33A2A] to-[#922e21] flex items-center justify-center text-white font-bold text-sm">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                      Written by
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {featuredPost.author}
                    </p>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full bg-gray-900 group-hover:bg-[#B33A2A] flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Posts Grid ───────────────────────────────────── */}
      <section className="py-20 bg-[#FAF6F1] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-[2px] bg-[#B33A2A]" />
            <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
              Latest Articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                    {post.category}
                  </div>
                  <div className="absolute top-4 right-4 glass rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-gray-900 text-lg tracking-tight leading-tight mb-3 group-hover:text-[#B33A2A] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B33A2A] to-[#922e21] flex items-center justify-center text-white font-bold text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#B33A2A] flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      Read
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-10 md:p-16">
            <div className="absolute inset-0 film-grain opacity-20" />
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#B33A2A]/30 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-[#B33A2A]" />
                  <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                    Newsletter
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-[1.05]">
                  Get Style Tips
                  <br />
                  <span className="text-white/60 italic">In Your Inbox</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  Subscribe for weekly trend reports, exclusive tips, and early
                  access to MINERVA offers.
                </p>
              </div>

              <form className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 rounded-full px-6 py-4 pr-36 text-sm text-white placeholder-white/30 outline-none focus:border-[#B33A2A] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#B33A2A] hover:bg-[#922e21] text-white font-bold text-xs px-6 py-3 rounded-full transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}