import FilterSection from "@/components/events/filterSection.jsx";
import Events from "@/components/events/events.jsx";

const page = () => {
  return (
    <div className="bg-slate-50/70 min-h-screen text-slate-900 py-8 md:py-12">
      <div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 relative"
        id="box"
      >
        <FilterSection />
        <Events />
      </div>
    </div>
  );
};

export default page;
