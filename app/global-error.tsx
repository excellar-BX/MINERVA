"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="relative min-h-screen bg-[#1a0e08] flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B33A2A]/10 rounded-full blur-3xl" />

          <div className="relative max-w-2xl mx-auto px-6 text-center py-20">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-white/70 font-medium tracking-[0.3em] uppercase">
                Something Went Wrong
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6 leading-none">
              Oops
            </h1>

            <p className="text-white/50 text-base max-w-md mx-auto mb-10">
              An unexpected error occurred. Don&apos;t worry — our team has
              been notified.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reset}
                className="bg-[#B33A2A] hover:bg-[#922e21] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="border-2 border-white/15 hover:border-white/30 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-500 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}