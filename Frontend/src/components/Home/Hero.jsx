import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../assets/img1.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />

      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <Star size={16} />
            Karnataka's Smart KCET Preparation Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Crack{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              KCET
            </span>{" "}
            with Confidence
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
            Practice AI-powered mock tests, solve previous year papers,
            predict colleges, and track your performance—all in one place.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>          
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="flex flex-1 justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
            <img
              src={img1}
              alt="Students studying"
              className="rounded-2xl"
            />

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-blue-100 p-4 dark:bg-slate-800">
                📈 AI Performance Analysis
              </div>

              <div className="rounded-xl bg-violet-100 p-4 dark:bg-slate-800">
                🎯 Accurate College Prediction
              </div>

              <div className="rounded-xl bg-green-100 p-4 dark:bg-slate-800">
                📝 Previous Year Question Papers
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}