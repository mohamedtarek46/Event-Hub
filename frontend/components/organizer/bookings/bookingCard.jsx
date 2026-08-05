import { User, Ticket, Calendar } from "lucide-react";

const statusStyles = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  refunded: "bg-sky-50 text-sky-700 border border-sky-200",
  default: "bg-slate-100 text-slate-700 border border-slate-200",
};

export default function BookingCard({ booking }) {
  const initials = `${booking.userId?.firstName?.[0] || ""}${booking.userId?.lastName?.[0] || ""}`.toUpperCase() || "A";

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-indigo-500/20 shrink-0">
          {initials}
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            {booking.userId?.firstName} {booking.userId?.lastName}
          </h4>

          <p className="text-xs text-slate-400 font-medium">
            {booking.userId?.email}
          </p>

          <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Ticket className="w-3.5 h-3.5 text-indigo-500" />
              <span>{booking.numberOfSeats} Tickets</span>
            </span>
            {booking.createdAt && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <p className="text-base font-extrabold text-slate-900">
          ${booking.totalAmount}
        </p>

        <span
          className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
            statusStyles[booking.status] ?? statusStyles.default
          }`}
        >
          {booking.status}
        </span>
      </div>
    </div>
  );
}