import { Search, TicketCheck, PartyPopper, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Events",
    desc: "Browse curated events by category, location, date, or popularity effortlessly.",
    badge: "Step 01",
  },
  {
    icon: TicketCheck,
    title: "Instant Booking",
    desc: "Reserve your spot in seconds with secure digital ticketing and instant confirmation.",
    badge: "Step 02",
  },
  {
    icon: PartyPopper,
    title: "Enjoy the Experience",
    desc: "Scan your digital ticket at the door and enjoy unforgettable live moments.",
    badge: "Step 03",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            <CheckCircle2 className="size-3.5" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            How <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">EventHub</span> Works
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3">
            Getting your tickets and attending your next favorite event has never been easier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-500/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                    <Icon className="size-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}