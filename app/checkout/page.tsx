"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Lock, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push("/order-confirmation");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-[#B33A2A] hover:bg-[#922e21] text-white font-semibold px-6 py-3 rounded-full transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Header */}
      <div className="bg-[#1a0e08] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-4"
          >
            ← Back to Store
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#B33A2A]" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#B33A2A]" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    required
                    value={form.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={form.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      required
                      value={form.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                    />
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#B33A2A]" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    required
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      required
                      value={form.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      name="cardCvc"
                      placeholder="CVC"
                      required
                      value={form.cardCvc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B33A2A] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B33A2A] hover:bg-[#922e21] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B33A2A]/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - $${cartTotal.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-[#B33A2A] font-bold text-sm">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-50 rounded-full transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {cartTotal >= 100 ? "Free" : "$10.00"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">
                    ${(cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    ${(cartTotal + (cartTotal >= 100 ? 0 : 10) + cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
