import { CalendarDays, Zap, Ticket, DollarSign } from "lucide-react";

export default function StatsCards({ stats }) {
  const items = [
    {
      label: "Total Events",
      value: stats.totalEvents ?? 0,
      icon: CalendarDays,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      label: "Active Events",
      value: stats.activeEvents ?? 0,
      icon: Zap,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings ?? 0,
      icon: Ticket,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue ?? 0}`,
      icon: DollarSign,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl border ${bg}`}>
              <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}