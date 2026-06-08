"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mt-8 inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-medium tracking-[0.3em] uppercase transition-colors group"
    >
      <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
      Go Back
    </button>
  );
}