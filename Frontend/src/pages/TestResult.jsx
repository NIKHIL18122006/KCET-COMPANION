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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
            <Trophy size={42} className="text-yellow-400" />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Test Completed!
          </h1>

          <p className="mt-3 text-gray-400">
            {subject} Mock Test
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            Your Score
          </p>

          <div className="mt-4">
            <span className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {correct}
            </span>

            <span className="ml-2 text-2xl text-gray-500">
              / {total}
            </span>
          </div>

          <div className="mx-auto mt-5 h-3 max-w-md overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-4 text-lg font-semibold text-gray-300">
            {percentage}% Accuracy
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Correct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <CheckCircle2
              size={28}
              className="text-green-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Correct
            </p>

            <p className="mt-1 text-3xl font-bold text-green-400">
              {correct}
            </p>
          </motion.div>

          {/* Wrong */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <XCircle
              size={28}
              className="text-red-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Wrong
            </p>

            <p className="mt-1 text-3xl font-bold text-red-400">
              {wrong}
            </p>
          </motion.div>

          {/* Unanswered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <Circle
              size={28}
              className="text-gray-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Unanswered
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-300">
              {unanswered}
            </p>
          </motion.div>

          {/* Attempted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <Trophy
              size={28}
              className="text-yellow-400"
            />

            <p className="mt-4 text-sm text-gray-400">
              Attempted
            </p>

            <p className="mt-1 text-3xl font-bold text-yellow-400">
              {attempted}
            </p>
          </motion.div>
        </div>

        {/* Performance Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700/30 via-indigo-700/30 to-violet-700/30 p-8 text-center"
        >
          <h2 className="text-2xl font-bold">
            {percentage >= 80
              ? "Excellent Performance! 🎉"
              : percentage >= 60
              ? "Good Job! Keep Improving! 💪"
              : "Keep Practicing! 🚀"}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-400">
            Review your mistakes and practice your weak areas
            to improve your KCET performance.
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            onClick={() => navigate("/mocktest")}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-gray-300 transition hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Back to Mock Tests
          </button>

          <button
            onClick={() => navigate("/mocktest")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <RotateCcw size={18} />
            Try Another Test
          </button>

        </div>
      </div>
    </div>
  );
}