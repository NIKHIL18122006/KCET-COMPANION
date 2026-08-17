import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Circle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TestResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    correct = 0,
    total = 0,
    attempted = 0,
    subject = "KCET",
  } = state || {};

  const wrong = attempted - correct;
  const unanswered = total - attempted;

  const percentage =
    total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 py-7 text-white sm:px-6 sm:py-10 md:px-8">

      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 sm:h-20 sm:w-20">
            <Trophy
              size={34}
              className="text-yellow-400 sm:h-[42px] sm:w-[42px]"
            />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold sm:mt-6 sm:text-5xl">
            Test Completed!
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:mt-3 sm:text-base">
            {subject} Mock Test
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-2xl backdrop-blur-xl sm:mt-10 sm:rounded-3xl sm:p-8"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">
            Your Score
          </p>

          <div className="mt-3 sm:mt-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-5xl font-extrabold text-transparent sm:text-7xl">
              {correct}
            </span>

            <span className="ml-1 text-xl text-gray-500 sm:ml-2 sm:text-2xl">
              / {total}
            </span>
          </div>

          <div className="mx-auto mt-4 h-2.5 max-w-md overflow-hidden rounded-full bg-white/10 sm:mt-5 sm:h-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-3 text-base font-semibold text-gray-300 sm:mt-4 sm:text-lg">
            {percentage}% Accuracy
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">

          {/* Correct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6"
          >
            <CheckCircle2
              size={24}
              className="text-green-400 sm:h-7 sm:w-7"
            />

            <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
              Correct
            </p>

            <p className="mt-1 text-2xl font-bold text-green-400 sm:text-3xl">
              {correct}
            </p>
          </motion.div>

          {/* Wrong */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6"
          >
            <XCircle
              size={24}
              className="text-red-400 sm:h-7 sm:w-7"
            />

            <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
              Wrong
            </p>

            <p className="mt-1 text-2xl font-bold text-red-400 sm:text-3xl">
              {wrong}
            </p>
          </motion.div>

          {/* Unanswered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6"
          >
            <Circle
              size={24}
              className="text-gray-400 sm:h-7 sm:w-7"
            />

            <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
              Unanswered
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-300 sm:text-3xl">
              {unanswered}
            </p>
          </motion.div>

          {/* Attempted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6"
          >
            <Trophy
              size={24}
              className="text-yellow-400 sm:h-7 sm:w-7"
            />

            <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
              Attempted
            </p>

            <p className="mt-1 text-2xl font-bold text-yellow-400 sm:text-3xl">
              {attempted}
            </p>
          </motion.div>

        </div>

        {/* Performance Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-700/30 via-indigo-700/30 to-violet-700/30 p-5 text-center sm:mt-8 sm:rounded-3xl sm:p-8"
        >
          <h2 className="text-xl font-bold sm:text-2xl">
            {percentage >= 80
              ? "Excellent Performance! 🎉"
              : percentage >= 60
              ? "Good Job! Keep Improving! 💪"
              : "Keep Practicing! 🚀"}
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-3 sm:text-base">
            Review your mistakes and practice your weak areas
            to improve your KCET performance.
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-row sm:justify-center sm:gap-4">

          <button
            onClick={() => navigate("/mocktest")}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/10 sm:px-6 sm:text-base"
          >
            <ArrowLeft size={18} />
            Back to Mock Tests
          </button>

          <button
            onClick={() => navigate("/mocktest")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] sm:px-6 sm:text-base"
          >
            <RotateCcw size={18} />
            Try Another Test
          </button>

        </div>

      </div>
    </div>
  );
}