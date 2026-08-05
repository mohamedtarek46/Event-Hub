"use client";

import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

export default function BookingFilters({
  status,
  setStatus,
  search,
  setSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, setSearch]);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search by attendee name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-xs font-bold text-slate-700 outline-none cursor-pointer transition-all"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
    </div>
  );
}
