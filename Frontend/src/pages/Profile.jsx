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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold shadow-xl">
            {avatar}
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {user.full_name}
          </h1>

          <div className="mt-2 flex items-center justify-center gap-2 text-gray-400">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          {/* Tests Attempted */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
            <Trophy
              size={28}
              className="mx-auto text-yellow-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Tests Attempted
            </p>

            <p className="mt-1 text-3xl font-bold">
              {stats.testsAttempted}
            </p>
          </div>

          {/* Accuracy */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
            <Target
              size={28}
              className="mx-auto text-green-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Accuracy
            </p>

            <p className="mt-1 text-3xl font-bold">
              {stats.accuracy}%
            </p>
          </div>

        </div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold">
            Account Information
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <User size={20} className="text-blue-400" />

              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-medium">
                  {user.full_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <Mail size={20} className="text-blue-400" />

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium">
                  {user.email}
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Logout */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handle}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}