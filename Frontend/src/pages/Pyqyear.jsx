import { motion } from "framer-motion";
import {
  CalendarDays,
  ArrowRight,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPyqs } from "../services/getPyqs";

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

export default function PyqYears() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const subject = state?.subject;

  const handleYear = async (year) => {
    try {
      console.log(subject, year);

      const questions = await getPyqs(subject, year);

      navigate("/practice/session", {
        state: {
          subject,
          questions,
          year,
        },
      });
    } catch (error) {
      console.error("Failed to fetch PYQs:", error);
      alert("Failed to fetch questions. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 py-6 text-white sm:px-6 sm:py-10 md:px-8">

      <div className="mx-auto w-full max-w-6xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white sm:mb-8"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-9 text-center sm:mb-14"
        >
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg sm:h-16 sm:w-16">
            <FileText size={26} className="sm:h-[30px] sm:w-[30px]" />
          </div>

          {/* Heading */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:mt-6 sm:text-5xl md:text-6xl">
            {subject || "KCET"}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              PYQs
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-lg sm:leading-7">
            Select a year to practice previous year{" "}
            {subject || "KCET"} questions.
          </p>
        </motion.div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">

          {years.map((year, index) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="w-full"
            >
              <button
                onClick={() => handleYear(year)}
                className="group block w-full text-left"
              >

                <div
                  className="
                    relative overflow-hidden
                    rounded-2xl border border-white/10
                    bg-white/5 p-5
                    shadow-xl backdrop-blur-xl
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:border-blue-500/40
                    hover:bg-blue-500/5
                    hover:shadow-blue-500/20
                    sm:rounded-3xl sm:p-7
                  "
                >

                  {/* Glow */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl sm:h-32 sm:w-32" />

                  {/* Icon */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl">
                    <CalendarDays size={23} className="sm:h-[26px] sm:w-[26px]" />
                  </div>

                  {/* Year */}
                  <h2 className="relative mt-4 text-2xl font-bold text-white sm:mt-6 sm:text-3xl">
                    KCET {year}
                  </h2>

                  {/* Description */}
                  <p className="relative mt-1 text-sm text-gray-400 sm:mt-2 sm:text-base">
                    Previous year {subject} questions
                  </p>

                  {/* Action */}
                  <div className="relative mt-5 flex items-center justify-between sm:mt-7">

                    <span className="text-sm font-semibold text-blue-400 sm:text-base">
                      Practice Questions
                    </span>

                    <ArrowRight
                      size={20}
                      className="text-blue-400 transition-transform duration-300 group-hover:translate-x-2 sm:h-[22px] sm:w-[22px]"
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
          className="mt-9 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 shadow-2xl sm:mt-14 sm:rounded-3xl sm:p-8"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Practice. Analyze. Improve.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
            Solve actual KCET questions from previous examinations and
            strengthen your preparation by understanding the question
            patterns.
          </p>
        </motion.div>

      </div>
    </div>
  );
}