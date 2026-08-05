"use client";
import { useState, useEffect } from "react";
import useFilterStore from "@/store/useFilterStore.js";
import { Search, X } from "lucide-react";

const EventSearchBar = () => {
  const [input, setInput] = useState("");
  const setSearch = useFilterStore((state) => state.setSearch);

  useEffect(() => {
    let timer = setTimeout(() => {
      setSearch(input);
    }, 400);
    return () => clearTimeout(timer);
  }, [input, setSearch]);

  return (
    <div className="w-full py-2">
      <div
        className={`flex items-center h-12 px-4 rounded-2xl bg-white border shadow-sm transition-all duration-200 gap-3
          ${input ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"}`}
      >
        <Search className="size-4 text-indigo-600 shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Search by event name, category, or city..."}
          maxLength={80}
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400 font-medium"
        />
        {input && (
          <button
            onClick={() => setInput("")}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EventSearchBar;
