"use client";
import { useState } from "react";
import { ListFilter, X, SlidersHorizontal } from "lucide-react";
import FilterForm from "./filterForm.jsx";
import useIsMobile from "@/hooks/utility/useIsMobile.js";

const FilterSection = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Floating Filter Button */}
      <div
        className="fixed bottom-6 right-6 bg-slate-900 shadow-xl shadow-slate-900/30 rounded-full p-3.5 z-50 md:hidden cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setIsOpen((p) => !p)}
      >
        <ListFilter className="text-white size-6" />
      </div>

      {/* Mobile Modal Drawer */}
      {isMobile && (
        <div
          className={`
            fixed inset-0 px-6 py-8 pt-16 md:hidden z-40 bg-white text-slate-900 overflow-auto
            transition-all duration-300 
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }
          `}
        >
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-indigo-600" />
              <p className="font-bold text-base text-slate-900">Filter Events</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <FilterForm closeForm={() => setIsOpen(false)} />
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      {!isMobile && (
        <div className="hidden md:block">
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm sticky top-20">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <SlidersHorizontal className="size-4 text-indigo-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Filters & Sorting
              </h2>
            </div>

            <FilterForm />
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSection;