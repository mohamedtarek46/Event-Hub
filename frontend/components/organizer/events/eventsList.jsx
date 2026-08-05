"use client";
import EventCard from "./eventCard.jsx";
import { useRouter } from "next/navigation";
import { Plus, CalendarDays } from "lucide-react";

export default function EventsList({ events }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-slate-900">My Hosted Events</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium">Manage your created events, schedules, and ticket sales</p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          onClick={() => router.push("/organizer-events/create")}
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {!events?.length ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-100 shadow-sm">
          <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Events Created Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            Get started by creating your first event to start accepting bookings and ticket sales.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={() => router.push("/organizer-events/create")}
          >
            <Plus className="w-4 h-4" />
            <span>Create Event Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
