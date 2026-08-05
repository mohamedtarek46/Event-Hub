"use client";
import dynamic from "next/dynamic";
import { BsChevronRight } from "react-icons/bs";
const SortSection = dynamic(() => import("./sortSection.jsx"), { ssr: false });
const CategorySection = dynamic(() => import("./categorySection.jsx"), { ssr: false });
const LocationSection = dynamic(() => import("./locationSection.jsx"), { ssr: false });
const PriceSection = dynamic(() => import("./priceSection.jsx"), { ssr: false });
const DateSection = dynamic(() => import("./dateSection.jsx"), { ssr: false });
import submitFromSection from "@/services/submitForm.js";
import useFilterStore from "@/store/useFilterStore.js";
const FilterForm = ({ closeForm }) => {
  const setClear = useFilterStore((state) => state.setClear);
  return (
    <form
      action=""
      className="mt-5 space-y-3  font-poppins h-full flex-col flex justify-between md:block md:h-auto"
      onSubmit={(e) => {
        submitFromSection(e);
        if (closeForm) closeForm();
      }}
    >
      <div>
        <SortSection />
        <CategorySection />
        <LocationSection />
        <PriceSection />
        <DateSection />
      
      </div>

      <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
        <button
          type="reset"
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          onClick={() => {
            setClear();
            if (closeForm) closeForm();
          }}
        >
          Reset Filters
        </button>
        <button className="bg-slate-900 hover:bg-slate-800 py-2.5 px-5 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
          <span>Apply Filters</span>
          <BsChevronRight className="text-white text-xs" />
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
