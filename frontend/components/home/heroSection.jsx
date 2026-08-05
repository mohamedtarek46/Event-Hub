import Link from "next/link";
import { Sparkles, Compass, Ticket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-slate-50 text-slate-900 py-20 md:py-28 px-4 border-b border-slate-100">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm cursor-default">
          <Sparkles className="size-3.5 text-indigo-600 animate-pulse" />
          <span>The Next-Gen Events Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
          Discover & Book <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            Extraordinary Events
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Explore curated tech conferences, live concerts, workshops, and exclusive networking summits happening near you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="size-4" />
            <span>Explore All Events</span>
          </Link>
          <Link
            href="/auth/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Ticket className="size-4 text-pink-500" />
            <span>Get Started Free</span>
          </Link>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200/60">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">15K+</h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Ticket Holders</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">500+</h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Verified Events</p>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">99.9%</h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
