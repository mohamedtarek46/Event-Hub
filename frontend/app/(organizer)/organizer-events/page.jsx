"use client";
import { useOrganizerEvents } from "@/hooks/api/useOrganizer.js";
import EventsList from "@/components/organizer/events/eventsList.jsx";
import LoadingPage from "@/components/shared/loadingPage";
import { notFound } from "next/navigation";
const Page = () => {
  const { data, isLoading, isError, isFetching, isPending } =
    useOrganizerEvents();

  if (isLoading || isFetching || isPending) {
    return <LoadingPage />;
  }
  if (isError) {
    return notFound();
  }
  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <EventsList events={data} />
      </div>
    </div>
  );
};

export default Page;
