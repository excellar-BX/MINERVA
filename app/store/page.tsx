"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

export default function StorePage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a0e08] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#B33A2A]" />
            <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
              Shop
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Products
          </h1>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">
            Experience the difference with top-tier products that enhance both
            the aesthetics and health of your hair.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image container */}
              <div className="relative bg-[#FAF6F1] rounded-3xl overflow-hidden aspect-square mb-4 border border-gray-100 group-hover:border-[#B33A2A]/20 transition-all duration-500">
                <Link href={`/store/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </Link>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                {/* Cart button */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full p-2.5 md:p-3 shadow-lg transition-all duration-300 bg-white text-gray-900 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-[#B33A2A] hover:text-white active:scale-95"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-1 glass rounded-full px-2.5 py-1 md:px-3 md:py-1.5 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 delay-75">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-[10px] font-bold">4.9</span>
                </div>
              </div>

              <div className="px-1">
                <Link href={`/store/${product.id}`}>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#B33A2A] transition-colors duration-300">
                    {product.name}
                  </p>
                </Link>
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
      </div>
    </div>
  );
}
