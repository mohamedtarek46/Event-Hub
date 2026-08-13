"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";
import { Users, MapPin, CalendarRange } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";

const EventCard = memo(({ event }) => {
  const [error, setError] = useState(false);

  return (
    <Link
      href={`/events/${event._id}`}
      className="group cursor-pointer relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between block"
    >
      <div>
        <div className="relative h-48 md:h-56 rounded-t-3xl overflow-hidden bg-slate-100">
          <Image
            src={event.imageUrl}
            alt={event.title || "Event Image"}
            className="z-1 object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            onError={() => {
              setError(true);
            }}
          />
          {error && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 rounded-t-3xl bg-slate-100 text-slate-500">
              <h3 className="text-xs font-semibold">Image unavailable</h3>
            </div>
          )}
          
          {/* Overlay Category Tag */}
          {event.categoryId?.name && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
              <BiCategoryAlt className="size-3.5 text-indigo-400" />
              <span>{event.categoryId.name}</span>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 z-10 px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-extrabold shadow-md">
            {event.price ? `${event.price} ${event.currency || "$"}` : "Free"}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {event.title}
          </h3>

          <div className="mt-3 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <CalendarRange className="size-4 text-indigo-600 shrink-0" />
              <span>
                {new Date(event.startDateTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                •{" "}
                {new Date(event.startDateTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-pink-500 shrink-0" />
              <span className="line-clamp-1">{event.location?.city || "Online / Venue TBD"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-violet-600 shrink-0" />
              <span>{event.capacity ? `${event.capacity - (event.availableSeats || 0)} attending` : "Open registration"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
EventCard.displayName = "EventCard";
export default EventCard;
