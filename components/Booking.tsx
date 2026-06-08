"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { workingHours } from "@/data";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
];

// Helper: get JS day index converted to Mon-first (0=Mon, 6=Sun)
const getMondayFirstDay = (date: Date) => {
  const day = date.getDay(); // 0=Sun
  return day === 0 ? 6 : day - 1;
};

// ─────────────────────────────────────────────────────────────
// Calendar Component
// ─────────────────────────────────────────────────────────────

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

function MiniCalendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // First day of month, last day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startOffset = getMondayFirstDay(firstDay);

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Prevent navigating to past months
  const isPrevDisabled =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-sm tracking-wide">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            className="w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day headers */}
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

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const cellDate = new Date(year, month, day);
          cellDate.setHours(0, 0, 0, 0);

          const isSelected =
            selectedDate?.getTime() === cellDate.getTime();
          const isToday = cellDate.getTime() === today.getTime();
          const isPast = cellDate < today;
          const dayOfWeek = cellDate.getDay();
          const isSunday = dayOfWeek === 0; // closed on Sundays
          const isDisabled = isPast || isSunday;

          return (
            <button
              key={day}
              onClick={() => !isDisabled && onSelectDate(cellDate)}
              disabled={isDisabled}
              className={`w-full aspect-square text-xs rounded-full flex items-center justify-center font-medium transition-all duration-300 relative ${
                isSelected
                  ? "bg-[#B33A2A] text-white shadow-lg shadow-[#B33A2A]/30 scale-110"
                  : isDisabled
                  ? "text-gray-200 cursor-not-allowed line-through decoration-1"
                  : isToday
                  ? "text-[#B33A2A] bg-red-50 ring-1 ring-[#B33A2A]/30 hover:bg-red-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B33A2A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date pill */}
      {selectedDate && (
        <div className="mt-5 bg-[#FAF6F1] rounded-2xl px-4 py-3 flex items-center gap-3 animate-fade-in-up">
          <div className="w-8 h-8 rounded-full bg-[#B33A2A] flex items-center justify-center flex-shrink-0">
            <CalendarIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
              Selected
            </p>
            <p className="text-sm font-bold text-gray-900">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Working hours */}
      <div className="mt-6 border-t border-gray-100 pt-5">
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

// ─────────────────────────────────────────────────────────────
// Booking Form
// ─────────────────────────────────────────────────────────────

interface FormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

function CallbackForm({ selectedDate, selectedTime, onSelectTime }: FormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time slot");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        date: selectedDate.toISOString(),
        time: selectedTime,
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ firstName: "", lastName: "", phone: "", email: "" });
    setSubmitted(false);
    setError("");
  };

  const fields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "phone", placeholder: "Phone Number", type: "tel" },
    { name: "email", placeholder: "Email Address", type: "email" },
  ];

  return (
    <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
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
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-400" strokeWidth={3} />
            </div>
            <p className="text-white font-bold text-lg mb-2">Booking Received</p>
            <p className="text-white/50 text-sm mb-1">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-[#B33A2A] text-sm font-bold mb-6">
              at {selectedTime}
            </p>
            <button
              onClick={handleReset}
              className="text-[#B33A2A] hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors"
            >
              Book Another →
            </button>
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

            {/* Time slot picker */}
            <div className="pt-5">
              <label className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase block mb-3 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Select Time
              </label>
              {!selectedDate ? (
                <div className="text-xs text-white/30 italic py-3">
                  Choose a date first to see available times
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onSelectTime(time)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                        selectedTime === time
                          ? "bg-[#B33A2A] text-white shadow-lg shadow-[#B33A2A]/30 scale-105"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs mt-3 animate-fade-in-up">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="magnetic-btn w-full bg-[#B33A2A] hover:bg-[#922e21] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-full mt-6 transition-all duration-500 hover:shadow-lg hover:shadow-[#B33A2A]/30 relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </span>
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Booking Section
// ─────────────────────────────────────────────────────────────

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Shared state lifted up
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  // Reset time when date changes
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#FAF6F1] relative overflow-hidden"
    >
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.1]">
              Book Your
              <br />
              <span className="text-[#B33A2A] italic">Visit</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Ready for a transformative experience? Pick a date and time, fill
              out the form, and we&apos;ll handle the rest.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {[
                { step: "01", text: "Choose your date", done: !!selectedDate },
                { step: "02", text: "Select a time slot", done: !!selectedTime },
                { step: "03", text: "Fill in your details", done: false },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      s.done
                        ? "bg-[#B33A2A] text-white"
                        : "bg-white border border-gray-200 text-gray-400"
                    }`}
                  >
                    {s.done ? <Check className="w-3.5 h-3.5" /> : s.step}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      s.done ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative h-48 rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80"
                alt="Booking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/60 text-[10px] font-bold tracking-wider uppercase mb-1">
                  Our Salon
                </p>
                <p className="text-white text-sm font-bold">
                  200 W 8th Street, NYC
                </p>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <MiniCalendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <CallbackForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          </div>
        </div>
      </div>
    </section>
  );
}