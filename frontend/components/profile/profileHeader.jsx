import { User, Calendar, ShieldCheck, Mail } from "lucide-react";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Avatar Circle */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-indigo-500/25 shrink-0">
        {initials}
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {user.firstName} {user.lastName}
          </h1>
          <span className="inline-flex items-center gap-1 self-center sm:self-auto px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{user.role}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Member since {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
