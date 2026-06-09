"use client";

import Link from "next/link";
import { Check, Package, Truck, Mail } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center py-16 px-6">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-12 h-12 text-green-500" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold text-gray-900">#MIN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Order Placed</p>
                <p className="text-sm text-gray-500">Your order has been confirmed</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Processing</p>
                <p className="text-sm text-gray-500">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-400">Shipped</p>
                <p className="text-sm text-gray-400">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4">What's Next?</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#B33A2A]" />
              <p className="text-sm text-gray-600">
                Confirmation email sent to your inbox
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#B33A2A]" />
              <p className="text-sm text-gray-600">
                Free shipping on orders over $100
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href="/store"
            className="block w-full bg-[#B33A2A] hover:bg-[#922e21] text-white font-semibold py-4 rounded-full text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#B33A2A]/30"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block w-full text-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
