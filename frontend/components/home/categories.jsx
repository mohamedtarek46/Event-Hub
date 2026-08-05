"use client";
import { useRouter } from "next/navigation";
import useFilterStore from "@/store/useFilterStore.js";
import { useCategories } from "@/hooks/api/useCategories.js";
import { Sparkles, Layers, ArrowRight } from "lucide-react";

export default function Categories() {
  const setCategory = useFilterStore((state) => state.setCategory);
  const router = useRouter();
  const { data, isPending, isLoading, isError } = useCategories();

  return (
    <section className="py-20 bg-white border-y border-slate-100 text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">
              <Layers className="size-4" />
              <span>Browse By Interest</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Popular Event <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Categories</span>
            </h2>
          </div>
          <button
            onClick={() => router.push("/events")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer group"
          >
            <span>View All Events</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {(isLoading || isPending) && (
          <div className="flex justify-center items-center py-10">
            <div className="size-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-500 font-medium text-sm">
            Failed to load categories
          </div>
        )}

        {data && (
          <div className="flex flex-wrap justify-center gap-3">
            {data.categories.map((c) => (
              <button
                key={c._id.toString()}
                onClick={() => {
                  setCategory(c._id);
                  router.push(`/events`);
                }}
                className="group relative px-5 py-2.5 rounded-2xl bg-slate-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-600 border border-slate-200/70 hover:border-transparent text-sm font-bold text-slate-700 hover:text-white shadow-sm hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="size-3.5 text-indigo-600 group-hover:text-white transition-colors" />
                <span>{c.name}</span>
              </button>
            ))}

            {data.categories.length === 0 && (
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500">
                No categories available
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
