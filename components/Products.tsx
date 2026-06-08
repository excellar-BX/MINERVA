"use client";

import Image from "next/image";
import Link from "next/link";
import {ShoppingCart, ArrowUpRight, Star} from "lucide-react";
import {products} from "@/data";
import {useEffect, useRef, useState} from "react";

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      {threshold: 0.15},
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (productId: number) => {
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-20 left-[-100px] w-64 h-64 bg-[#FAF6F1] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[-100px] w-80 h-80 bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
              <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                Shop
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Our Products
            </h2>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Experience the difference with top-tier products that enhance both
              the aesthetics and health of your hair.
            </p>
          </div>
          <Link
            href="/store"
            className="magnetic-btn hidden md:inline-flex items-center gap-2 bg-[#B33A2A] hover:bg-[#922e21] text-white text-sm font-semibold px-7 py-3 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-[#B33A2A]/30"
          >
            Open Store
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{transitionDelay: `${i * 150 + 200}ms`}}
            >
              {/* Image container */}
              <div className="relative bg-[#FAF6F1] rounded-3xl overflow-hidden aspect-square mb-4 border border-gray-100 group-hover:border-[#B33A2A]/20 transition-all duration-500">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                {/* Cart button — always visible on mobile, hover-reveal on desktop */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={`absolute top-3 right-3 md:top-4 md:right-4 rounded-full p-2.5 md:p-3 shadow-lg transition-all duration-300 ${
                    addedId === product.id
                      ? "bg-green-500 scale-110 text-white"
                      : "bg-white text-gray-900 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-[#B33A2A] hover:text-white active:scale-95"
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {addedId === product.id ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )}
                </button>

                {/* Rating — always visible on mobile, hover-reveal on desktop */}
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-1 glass rounded-full px-2.5 py-1 md:px-3 md:py-1.5 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 delay-75">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-[10px] font-bold">4.9</span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-1 glass rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-[10px] font-bold">4.9</span>
                </div>
              </div>

              <div className="px-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-[#B33A2A] transition-colors duration-300">
                  {product.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/store"
            className="magnetic-btn inline-flex items-center gap-2 bg-[#B33A2A] hover:bg-[#922e21] text-white text-sm font-semibold px-8 py-3 rounded-full transition-all duration-500"
          >
            Open Store
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
