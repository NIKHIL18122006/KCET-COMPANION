import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../assets/img1.png";
import gpt from "../../assets/gpt.png";
import file from "../../assets/file.png";
import graduation from "../../assets/graduation.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-center text-white lg:py-32">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">

        {/* Left Side */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-indigo-300">
            <Star size={16} />
            Karnataka's Smart KCET Preparation Platform
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Crack{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              KCET
            </span>{" "}
            with Confidence
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Practice AI-powered mock tests, solve previous year papers,
            predict colleges, and track your performance—all in one place.
          </p>

          {/* Button */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
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
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

            <img
              src={img1}
              alt="Dashboard Preview"
              className="rounded-2xl"
            />

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-slate-800 p-4 text-slate-200">
                <img
                  src={gpt}
                  alt="AI"
                  className="mr-2 inline-block h-5 w-5"
                />
                AI Performance Analysis
              </div>

              <div className="rounded-xl bg-slate-800 p-4 text-slate-200">
                <img
                  src={graduation}
                  alt="College"
                  className="mr-2 inline-block h-5 w-5"
                />
                Accurate College Prediction
              </div>

              <div className="rounded-xl bg-slate-800 p-4 text-slate-200">
                <img
                  src={file}
                  alt="PYQs"
                  className="mr-2 inline-block h-5 w-5"
                />
                Previous Year Question Papers
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}