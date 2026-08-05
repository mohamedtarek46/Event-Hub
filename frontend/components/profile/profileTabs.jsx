import { User, Ticket } from "lucide-react";

export default function ProfileTabs({ tab, setTab }) {
  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "bookings", label: "My Bookings", icon: Ticket },
  ];

  return (
    <div className="flex gap-2 mt-8 p-1.5 rounded-2xl bg-white border border-slate-100 shadow-sm max-w-md">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}