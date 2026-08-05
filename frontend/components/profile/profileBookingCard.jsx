import { useCancelBooking } from "@/hooks/api/useBooking.js";
import { Ticket, Calendar, MapPin, DollarSign, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function ProfileBookingCard({ booking }) {
  const { mutateAsync: cancelBooking, isPending } = useCancelBooking();

  const handleCancel = async () => {
    try {
      await cancelBooking(booking._id);
    } catch (err) {
      console.log(err);
    }
  };

  const isCancelled = booking.status === "cancelled" || booking.eventId?.status === "cancelled";

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-4 h-4 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">
              {booking.eventId?.title || "Event Title"}
            </h3>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {booking.numberOfSeats} Tickets × {booking.eventId?.price} {booking.eventId?.currency}
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              booking.status === "confirmed"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : booking.status === "cancelled"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {booking.status}
          </span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              booking.paymentStatus === "paid"
                ? "bg-sky-50 text-sky-700 border border-sky-200"
                : booking.paymentStatus === "failed"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            Payment: {booking.paymentStatus}
          </span>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            {new Date(booking.eventId?.startDateTime).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
          <span className="truncate">
            {booking.eventId?.location?.address || booking.eventId?.location?.city || "Venue TBD"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-bold text-slate-900">
            Total: {booking.totalAmount} {booking.eventId?.currency}
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {isCancelled ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-xl">
            <XCircle className="w-4 h-4" />
            <span>Booking Cancelled</span>
          </span>
        ) : (
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="cursor-pointer text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
          >
            {isPending ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>
    </div>
  );
}