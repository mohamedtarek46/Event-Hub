import EventForm from "@/components/organizer/events/eventFrom.jsx";

export default function CreateEventPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-6">
      <EventForm mode="create" />
    </div>
  );
}