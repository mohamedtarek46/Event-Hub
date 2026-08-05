"use client";
import { useGetEvents } from "@/hooks/api/useEvents.js";
import EventCardList from "../events/eventListCard.jsx";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedEvents() {
  const { data, isLoading, isError, isFetching, isPending } = useGetEvents({
    limit: 3,
    startDateTime: new Date(),
    sortBy: "popularity",
    order: "des",
    status: "published",
  });

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">
              <Flame className="size-4 text-amber-500 animate-bounce" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Featured <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            <span>See All Events</span>
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
            <p className="text-sm text-red-500 font-medium">Unable to load featured events right now</p>
          </div>
        )}

        {data && data.events.length === 0 && (
          <div className="flex justify-center items-center h-48 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-400">No featured events found at the moment</p>
          </div>
        )}

        {data && data.events.length > 0 && (
          <div
            className={`grid gap-6 ${
              data.events.length === 1
                ? "max-w-md mx-auto grid-cols-1"
                : data.events.length === 2
                ? "max-w-4xl mx-auto sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {data.events.map((e, i) => (
              <EventCardList key={i} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
