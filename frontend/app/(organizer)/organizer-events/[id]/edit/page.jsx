"use client";
import EventForm from "@/components/organizer/events/eventFrom.jsx";
import { notFound, useParams } from "next/navigation";
import { useGetEventById } from "@/hooks/api/useEvents.js";
import LoadingPage from "@/components/shared/loadingPage.jsx";
export default function Page() {
  const { id } = useParams();
  const { data, isLoading, isPending } = useGetEventById(id);
  if (isPending || isLoading) return <LoadingPage/>;
  if (!data.event) return notFound();
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-6">
      <EventForm mode="edit" initialData={data.event} />
    </div>
  );
}
