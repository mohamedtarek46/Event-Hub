"use client";

import { User, Ticket, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

const statusStyles = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
  default: "bg-amber-50 text-amber-700 border border-amber-200",
};

export default function RecentBookings({ bookings }) {
  if (!bookings?.length) {
    return (
      <div className="p-8 text-center rounded-3xl bg-white border border-slate-100">
        <p className="text-slate-400 text-sm font-medium">No recent bookings recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
          <p className="text-xs text-slate-400">Latest ticket purchases for your events</p>
        </div>
        <Link
          href="/organizer-events"
          className="flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 hover:bg-indigo-100 transition-colors"
        >
          <MdDashboard className="size-4 text-indigo-600" />
          <span>My Events</span>
        </Link>
      </div>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
          >
            {/* Name + Status row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {b.userId?.firstName?.[0] || <User className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {b.userId?.firstName} {b.userId?.lastName}
                  </p>
                  <p className="text-xs text-slate-400">{b.userId?.email}</p>
                </div>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  statusStyles[b.status] ?? statusStyles.default
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">{b.eventId?.title || "Event"} ({b.numberOfSeats} tickets)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Total: ${b.totalAmount}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{new Date(b.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}