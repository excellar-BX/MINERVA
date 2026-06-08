"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingCart, Star, ArrowLeft, Plus, Minus } from "lucide-react";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link
            href="/store"
            className="text-[#B33A2A] font-semibold hover:underline"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a0e08] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative bg-[#FAF6F1] rounded-3xl overflow-hidden aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">4.9 (128 reviews)</span>
            </div>

            <p className="text-4xl font-bold text-gray-900 mb-6">${product.price}</p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Premium quality hair care product designed to give you salon-quality
              results at home. Made with the finest ingredients and backed by our
              satisfaction guarantee.
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-semibold text-gray-900">Quantity</span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#B33A2A] hover:bg-[#922e21] text-white font-semibold py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B33A2A]/30 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#B33A2A] rounded-full" />
                <span className="text-sm text-gray-600">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#B33A2A] rounded-full" />
                <span className="text-sm text-gray-600">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#B33A2A] rounded-full" />
                <span className="text-sm text-gray-600">Premium quality ingredients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
