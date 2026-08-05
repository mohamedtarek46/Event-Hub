"use client";
import SeatIndicator from "@/components/events/seatIndicator.jsx";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useGetEventById } from "@/hooks/api/useEvents.js";
import { useEventBookings } from "@/hooks/api/useBooking.js";
import downloadExcel from "@/hooks/utility/downloadExcel.js";
import BookingFilters from "@/components/organizer/bookings/bookingFilters.jsx";
import BookingsList from "@/components/organizer/bookings/bookingsList.jsx";
import LoadinPage from "@/components/shared/loadingPage.jsx";
import { notFound } from "next/navigation";
import { FileSpreadsheet, Users, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EventBookingsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  
  const { data: evnetData, isLoading: DataLoading, isPending: DataPending, isError: DataError } = useGetEventById(params.id);
  const { data, isLoading, isPending, isError } = useEventBookings({
    eventId: params.id,
    status,
    search,
  });

  const handleDownloadExcel = async () => {
    try {
      setLoading(true);
      await downloadExcel({
        eventId: params.id,
        status,
        search,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || DataLoading || DataPending || isPending) {
    return <LoadinPage />;
  }

  if (DataError || isError) {
    return notFound();
  }

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        {/* Top Header Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/organizer-events" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>My Events</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-indigo-600 font-bold">Bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-600 shrink-0" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {evnetData?.event?.title} <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Bookings</span>
              </h1>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Review and manage registered attendees and ticket reservations
            </p>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleDownloadExcel}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{loading ? "Exporting Excel..." : "Export Excel Report"}</span>
            </button>
          </div>
        </div>

        {/* Seat indicator */}
        <SeatIndicator
          availableSeats={evnetData?.event?.availableSeats}
          totalSeats={evnetData?.event?.capacity}
        />

        {/* Search & Filter bar */}
        <BookingFilters
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
        />

        {/* Attendees List */}
        <BookingsList bookings={data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
