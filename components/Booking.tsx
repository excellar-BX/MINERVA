"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { workingHours } from "@/data";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MiniCalendar() {
  const [selected, setSelected] = useState<number | null>(26);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanks = 0;

  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-sm tracking-wide">January 2024</h3>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold text-gray-300 py-1 uppercase tracking-wider"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: blanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const isSelected = selected === day;
          const isWeekend = (day + blanks - 1) % 7 >= 5;
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`w-full aspect-square text-xs rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                isSelected
                  ? "bg-[#B33A2A] text-white shadow-lg shadow-[#B33A2A]/30 scale-110"
                  : isWeekend
                  ? "text-[#B33A2A]/60 hover:bg-red-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-7 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-4">
          Working Hours
        </h4>
        <ul className="space-y-3">
          {workingHours.map((item) => (
            <li key={item.day} className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">{item.day}</span>
              <span
                className={`font-bold ${
                  item.hours === "Closed" ? "text-[#B33A2A]" : "text-gray-900"
                }`}
              >
                {item.hours}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CallbackForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setSubmitted(true);
  };

  const fields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "phone", placeholder: "Phone Number", type: "tel" },
    { name: "email", placeholder: "Email Address", type: "email" },
  ];

  return (
    <div className="bg-gray-900 text-white rounded-3xl p-7 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#B33A2A]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[2px] bg-[#B33A2A]" />
          <span className="text-[#B33A2A] text-[10px] font-bold tracking-[0.3em] uppercase">
            Get in Touch
          </span>
        </div>
        <h3 className="font-bold text-2xl mb-6 tracking-tight">
          We will call you
        </h3>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-green-400 text-sm font-medium">
              Thanks! We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-1">
            {fields.map((field) => (
              <div key={field.name} className="relative">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    focusedField === field.name ||
                    form[field.name as keyof typeof form]
                      ? "text-[10px] text-[#B33A2A] -top-1 font-bold tracking-wider uppercase"
                      : "text-sm text-white/30 top-3"
                  }`}
                >
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  required
                  value={form[field.name as keyof typeof form]}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/10 text-sm text-white py-3 pt-4 outline-none focus:border-[#B33A2A] transition-colors duration-300"
                />
              </div>
            ))}
            <button
              type="submit"
              className="magnetic-btn w-full bg-[#B33A2A] hover:bg-[#922e21] text-white font-bold text-sm py-4 rounded-full mt-6 transition-all duration-500 hover:shadow-lg hover:shadow-[#B33A2A]/30 relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Book Appointment</span>
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAF6F1] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B33A2A]/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B33A2A]" />
              <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                Schedule
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Booking
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Ready for a transformative experience? Book your appointment now at
              MINERVA and let us craft a style that defines you.
            </p>
            <div className="relative h-56 rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80"
                alt="Booking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Calendar */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <MiniCalendar />
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <CallbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}