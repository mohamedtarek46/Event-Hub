import { Armchair, BookOpen, CalendarDays, Pencil, Users, XCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useDeleteEvent, useUpdateEvent } from "@/hooks/api/useEvents.js";
import Swal from "sweetalert2";

const statusStyles = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  default: "bg-amber-50 text-amber-700 border border-amber-200",
};

const EventCard = ({ event }) => {
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await updateEvent({ id: event._id, data: { status: "cancelled" } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(event._id);

        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error?.message || "Something went wrong.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div
      key={event._id}
      className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      {/* LEFT */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">{event.title}</h3>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              statusStyles[event.status] ?? statusStyles.default
            }`}
          >
            {event.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-indigo-500" />
            {new Date(event.startDateTime).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-1.5">
            <Armchair className="w-4 h-4 text-emerald-500" />
            {event.availableSeats} available
          </span>

          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-violet-500" />
            {event.capacity - event.availableSeats} Booked
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/organizer-events/${event._id}/edit`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Edit</span>
        </Link>

        <Link
          href={`/organizer-events/${event._id}/bookings`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bookings</span>
        </Link>

        <button
          onClick={handleCancel}
          disabled={isUpdating || event.status === "cancelled"}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors disabled:opacity-50"
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>{isUpdating ? "Canceling..." : "Cancel"}</span>
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
