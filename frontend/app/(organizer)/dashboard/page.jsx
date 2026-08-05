"use client";
import { useOrganizerDashboard } from "@/hooks/api/useOrganizer.js";
import StatsCards from "@/components/organizer/dashboard/statsCards.jsx";
import RecentBookings from "@/components/organizer/dashboard/recentBookings.jsx";
import LoadingPage from "@/components/shared/loadingPage";
const Page = () => {
  const { data, isLoading, isPending, isFetching ,isError } = useOrganizerDashboard();

  if (isLoading || isPending || isFetching) {
    return <LoadingPage />;
  }
  if (isError) {
    return <p className="text-center">Something went wrong!</p>;
  }

  const stats = data?.stats || {};
  const recentBookings = data?.recentBookings || [];

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <StatsCards stats={stats} />
        <RecentBookings bookings={recentBookings} />
      </div>
    </div>
  );
};

export default Page;
