import BookingCard from "./bookingCard.jsx";
import { Users } from "lucide-react";

export default function BookingsList({ bookings, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 w-full">
        <div className="size-8 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 mb-1">No Bookings Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No attendee bookings match your current search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
