import EventsList from "./eventList.jsx";
import EventSearchBar from "./eventSearchBar.jsx";
import Link from "next/link";
import { ChevronRight, Compass } from "lucide-react";

const Events = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
          <Link href="/home" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-slate-400" />
          <span className="text-indigo-600 font-bold">Events Explorer</span>
        </div>
        <div className="flex items-center gap-2">
          <Compass className="size-6 text-indigo-600" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Explore All <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Events</span>
          </h1>
        </div>
      </div>

      <EventSearchBar />
      <EventsList />
    </div>
  );
};

export default Events;
