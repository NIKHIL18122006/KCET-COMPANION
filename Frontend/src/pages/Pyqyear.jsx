import { motion } from "framer-motion";
import {
  CalendarDays,
  ArrowRight,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPyqs } from "../services/getPyqs"

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

export default function PyqYears() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const subject = state?.subject;

  const handleYear = async(year) => {
    // Later you can fetch questions here
    console.log(subject, year);
    const questions = await getPyqs(subject,year);
    
    navigate("/practice/session",{
        state : {
            subject,
            questions,
            year
        }
    })
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <FileText size={30} />
          </div>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            {subject || "KCET"}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              PYQs
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Select a year to practice previous year {subject || "KCET"}{" "}
            questions.
          </p>
        </motion.div>

        {/* Year Cards */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
          {years.map((year, index) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                onClick={() => handleYear(year)}
                className="group w-full text-left"
              >
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/10
                  bg-white/5 p-7 shadow-xl backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-blue-500/40
                  hover:bg-blue-500/5
                  hover:shadow-blue-500/20"
                >

                  {/* Glow */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                    <CalendarDays size={26} />
                  </div>

                  {/* Year */}
                  <h2 className="relative mt-6 text-3xl font-bold text-white">
                    KCET {year}
                  </h2>

                  {/* Description */}
                  <p className="relative mt-2 text-gray-400">
                    Previous year {subject} questions
                  </p>

                  {/* Action */}
                  <div className="relative mt-7 flex items-center justify-between">
                    <span className="font-semibold text-blue-400">
                      Practice Questions
                    </span>

                    <ArrowRight
                      size={22}
                      className="text-blue-400 transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold">
            Practice. Analyze. Improve.
          </h2>

          <p className="mt-3 max-w-3xl text-blue-100">
            Solve actual KCET questions from previous examinations and
            strengthen your preparation by understanding the question
            patterns.
          </p>
        </motion.div>
      </div>
    </div>
  );
}