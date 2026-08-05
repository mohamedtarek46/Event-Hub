import { Armchair, CheckCircle2, Ticket } from "lucide-react";

export default function SeatIndicator({ availableSeats, totalSeats }) {
  const safeTotal = totalSeats || 1;
  const safeAvailable = availableSeats ?? 0;
  const percentage = Math.min(100, Math.max(0, (safeAvailable / safeTotal) * 100));
  const bookedSeats = Math.max(0, safeTotal - safeAvailable);

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Seats</p>
              <h3 className="font-extrabold text-xl text-emerald-600">
                {safeAvailable}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booked Seats</p>
              <h3 className="font-extrabold text-xl text-indigo-600">
                {bookedSeats}
              </h3>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacity Limit</span>
          <p className="text-lg font-extrabold text-slate-900">{safeTotal} Total</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-indigo-100 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            style={{ width: `${percentage}%` }}
            className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
          />
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-400">
          <span>{percentage.toFixed(0)}% Seats Free</span>
          <span>{(100 - percentage).toFixed(0)}% Occupied</span>
        </div>
      </div>
    </div>
  );
}