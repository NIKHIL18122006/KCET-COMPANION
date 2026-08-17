import { motion } from "framer-motion";
import {
  User,
  Mail,
  Trophy,
  Target,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTestStats } from "../services/testService";

export default function Profile() {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    testsAttempted: 0,
    accuracy: 0,
  });

  const avatar = user.full_name.toUpperCase()[0];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTestStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch test stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handle = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 py-7 text-white sm:px-6 sm:py-10 md:px-8">

      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold shadow-xl sm:h-24 sm:w-24 sm:text-3xl">
            {avatar}
          </div>

          <h1 className="mt-4 break-words text-2xl font-bold sm:mt-5 sm:text-3xl">
            {user.full_name}
          </h1>

          <div className="mt-2 flex min-w-0 items-center justify-center gap-2 px-2 text-sm text-gray-400 sm:text-base">
            <Mail size={16} className="shrink-0" />
            <span className="break-all">
              {user.email}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">

          {/* Tests Attempted */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl sm:p-6">

            <Trophy
              size={26}
              className="mx-auto text-yellow-400"
            />

            <p className="mt-3 text-sm text-gray-400 sm:mt-4">
              Tests Attempted
            </p>

            <p className="mt-1 text-2xl font-bold sm:text-3xl">
              {stats.testsAttempted}
            </p>

          </div>

          {/* Accuracy */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl sm:p-6">

            <Target
              size={26}
              className="mx-auto text-green-400"
            />

            <p className="mt-3 text-sm text-gray-400 sm:mt-4">
              Accuracy
            </p>

            <p className="mt-1 text-2xl font-bold sm:text-3xl">
              {stats.accuracy}%
            </p>

          </div>

        </div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:mt-8 sm:rounded-3xl sm:p-7"
        >
          <h2 className="text-lg font-bold sm:text-xl">
            Account Information
          </h2>

          <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-5">

            {/* Name */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl bg-white/5 p-3 sm:gap-4 sm:p-4">

              <User
                size={19}
                className="shrink-0 text-blue-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500 sm:text-sm">
                  Name
                </p>

                <p className="break-words text-sm font-medium sm:text-base">
                  {user.full_name}
                </p>
              </div>

            </div>

            {/* Email */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl bg-white/5 p-3 sm:gap-4 sm:p-4">

              <Mail
                size={19}
                className="shrink-0 text-blue-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500 sm:text-sm">
                  Email
                </p>

                <p className="break-all text-sm font-medium sm:text-base">
                  {user.email}
                </p>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Logout */}
        <div className="mt-5 sm:mt-6">

          <button
            onClick={handle}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 sm:text-base"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}