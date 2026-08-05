"use client";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { logoutUser } from "@/services/auth.js";
import { MdDashboard } from "react-icons/md";
const TopBar = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/home"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-xs tracking-wider shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              EH
            </div>
            <span className="text-base font-extrabold tracking-wider text-slate-900 group-hover:text-indigo-600 transition-colors">
              EVENT<span className="text-indigo-600">HUB</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href={user ? `/profile` : `/auth/login`}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
            >
              <FaRegUserCircle className="size-4.5" />
            </Link>

            {user?.role === "organizer" && (
              <div>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                >
                  <MdDashboard className="size-4.5" />
                </Link>
              </div>
            )}

            {user && (
              <>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <IoLogOut className="size-4.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};
export default TopBar;
