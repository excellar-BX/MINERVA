"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check, ArrowRight, Sparkles } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "200 W 8th Street\nNew York, NY 10010",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+201-456-7890",
    href: "tel:+2014567890",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@minerva.com",
    href: "mailto:info@minerva.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 9AM–9PM\nSat: 10AM–8PM • Sun: Closed",
  },
];

const services = [
  "Haircut",
  "Hairstyle",
  "Coloring",
  "Extensions",
  "Treatment",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setSubmitted(true);
    setLoading(false);
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#1a0e08] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 film-grain opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B33A2A]/10 rounded-full blur-3xl" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-[#B33A2A]" />
            <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
              Get in Touch
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-200">
            Let&apos;s
            <br />
            <span className="text-[#B33A2A] italic">Connect</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-400">
            Have a question or ready to book your next transformation? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────── */}
      <section className="py-24 bg-[#FAF6F1] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#B33A2A]/[0.04] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Left: Info ──────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-[#B33A2A]" />
                  <span className="text-[#B33A2A] text-xs font-semibold tracking-[0.3em] uppercase">
                    Contact Info
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4 leading-[1.1]">
                  We&apos;re here
                  <br />
                  to help
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reach out through any of the channels below, or use the form
                  to schedule your visit.
                </p>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#B33A2A]/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full">
                      <div className="w-11 h-11 rounded-xl bg-[#B33A2A]/10 group-hover:bg-[#B33A2A] flex items-center justify-center mb-4 transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#B33A2A] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mb-2">
                        {label}
                      </p>
                      <p className="text-gray-900 text-sm font-medium whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="relative h-64 rounded-3xl overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTQnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MINERVA Salon Location"
                />
              </div>
            </div>

            {/* ── Right: Form ─────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="relative bg-gray-900 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B33A2A]/20 rounded-full blur-3xl" />
                <div className="absolute inset-0 film-grain opacity-20" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-[2px] bg-[#B33A2A]" />
                    <span className="text-[#B33A2A] text-[10px] font-bold tracking-[0.3em] uppercase">
                      Book Now
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
                    Book an appointment
                  </h3>
                  <p className="text-white/40 text-sm mb-8">
                    Fill out the form and we&apos;ll be in touch within 24 hours.
                  </p>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
                      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <Check className="w-10 h-10 text-green-400" strokeWidth={3} />
                      </div>
                      <h4 className="text-white font-bold text-2xl mb-2">
                        Booking Received
                      </h4>
                      <p className="text-white/50 text-sm max-w-sm">
                        Thank you for reaching out. Our team will contact you
                        shortly to confirm your appointment.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-[#B33A2A] hover:text-white text-sm font-medium transition-colors"
                      >
                        Make another booking →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                          { name: "firstName", placeholder: "First Name", type: "text" },
                          { name: "lastName", placeholder: "Last Name", type: "text" },
                        ].map((field) => (
                          <div key={field.name} className="relative">
                            <label
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                focusedField === field.name ||
                                form[field.name as keyof typeof form]
                                  ? "text-[10px] text-[#B33A2A] -top-1 font-bold tracking-[0.2em] uppercase"
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
                                setForm({
                                  ...form,
                                  [field.name]: e.target.value,
                                })
                              }
                              className="w-full bg-transparent border-b border-white/10 text-sm text-white py-3 pt-4 outline-none focus:border-[#B33A2A] transition-colors"
                            />
                          </div>
                        ))}
                      </div>

                      {[
                        { name: "email", placeholder: "Email Address", type: "email" },
                        { name: "phone", placeholder: "Phone Number", type: "tel" },
                      ].map((field) => (
                        <div key={field.name} className="relative">
                          <label
                            className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                              focusedField === field.name ||
                              form[field.name as keyof typeof form]
                                ? "text-[10px] text-[#B33A2A] -top-1 font-bold tracking-[0.2em] uppercase"
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
                            className="w-full bg-transparent border-b border-white/10 text-sm text-white py-3 pt-4 outline-none focus:border-[#B33A2A] transition-colors"
                          />
                        </div>
                      ))}

                      {/* Service pills */}
                      <div className="pt-4">
                        <label className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase block mb-3">
                          Select a Service
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() =>
                                setForm({
                                  ...form,
                                  service: service.toLowerCase(),
                                })
                              }
                              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                                form.service === service.toLowerCase()
                                  ? "bg-[#B33A2A] text-white border border-[#B33A2A]"
                                  : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative pt-2">
                        <label
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            focusedField === "message" || form.message
                              ? "text-[10px] text-[#B33A2A] -top-1 font-bold tracking-[0.2em] uppercase"
                              : "text-sm text-white/30 top-5"
                          }`}
                        >
                          Message (optional)
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          className="w-full bg-transparent border-b border-white/10 text-sm text-white py-3 pt-5 outline-none focus:border-[#B33A2A] transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="magnetic-btn w-full bg-[#B33A2A] hover:bg-[#922e21] disabled:opacity-60 text-white font-bold py-4 rounded-full text-sm mt-8 transition-all duration-500 hover:shadow-lg hover:shadow-[#B33A2A]/30 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {loading ? (
                            "Sending..."
                          ) : (
                            <>
                              Book Appointment
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}