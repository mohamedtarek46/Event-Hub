"use client";
import EventCardList from "../events/eventListCard.jsx";
import { useGetEvents } from "@/hooks/api/useEvents.js";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UpcomingEvents() {
  const { data, isLoading, isError, isFetching, isPending } = useGetEvents({
    limit: 2,
    startDateTime: new Date(),
    sortBy: "startDateTime",
    order: "asc",
  });

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-widest mb-2">
              <Calendar className="size-4 text-pink-500" />
              <span>Mark Your Calendar</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Upcoming <span className="bg-gradient-to-r from-pink-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            <span>View Full Calendar</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {(isLoading || isFetching || isPending) && (
          <div className="flex justify-center items-center h-48">
            <div className="size-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center h-48">
            <p className="text-sm text-red-500 font-medium">Failed to fetch upcoming events</p>
          </div>
        )}

        {data && data.events.length === 0 && (
          <div className="flex justify-center items-center h-48 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-400">No upcoming events scheduled</p>
          </div>
        )}

        {data && data.events.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {data.events.map((e) => (
              <EventCardList key={e._id.toString()} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
