import { motion } from "framer-motion";
import {
  Atom,
  FlaskConical,
  Calculator,
  ArrowRight,
  Clock,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTest } from "../services/getTest"
const subjects = [
  {
    title: "Physics",
    description: "Test your concepts in Mechanics, Optics, Electricity and more",
    icon: Atom,
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-600",
  },
  {
    title: "Chemistry",
    description: "Challenge yourself with Organic, Inorganic & Physical Chemistry",
    icon: FlaskConical,
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-600",
  },
  {
    title: "Mathematics",
    description: "Test your skills in Algebra, Calculus, Geometry and more",
    icon: Calculator,
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-600",
  },
];

export default function MockTest() {
  const navigate = useNavigate();
  const handle = async (title) => {
  try {
    const questions = await getTest(title);
    navigate("/test", {
      state: {
        subject: title,
        questions,
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);

    alert("Failed to fetch questions. Please try again later.");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 backdrop-blur-xl">
            <Trophy size={18} className="text-yellow-400" />
            KCET Mock Tests
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Test Your Preparation
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Like the Real KCET
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Take timed mock tests, analyze your performance, and build the
            confidence you need to ace KCET.
          </p>
        </motion.div>

        {/* Test Type Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;

            return (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <button onClick={() => handle(subject.title)}>
                  <div
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${subject.color}
                    bg-white/5 p-7 shadow-xl backdrop-blur-xl
                    transition-all duration-300 hover:-translate-y-3
                    hover:border-blue-500/40 hover:shadow-blue-500/20`}
                  >
                    {/* Glow */}
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                    {/* Icon */}
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${subject.iconBg} text-white shadow-lg`}
                    >
                      <Icon size={30} />
                    </div>

                    {/* Title */}
                    <h2 className="relative mt-6 text-2xl font-bold text-white">
                      {subject.title}
                    </h2>

                    {/* Description */}
                    <p className="relative mt-3 leading-7 text-gray-400">
                      {subject.description}
                    </p>

                    {/* Test Info */}
                    <div className="relative mt-6 flex items-center gap-5 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock size={17} className="text-cyan-400" />
                        <span>60 Minutes</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Trophy size={17} className="text-yellow-400" />
                        <span>KCET Pattern</span>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="relative mt-8 flex items-center justify-between">
                      <span className="font-semibold text-blue-400">
                        Start Mock Test
                      </span>

                      <ArrowRight
                        className="text-blue-400 transition-transform duration-300 group-hover:translate-x-2"
                        size={22}
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-10 shadow-2xl"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Simulate the Real Exam.
              </h2>

              <p className="mt-4 max-w-3xl text-lg text-blue-100">
                Attempt timed tests, manage your time effectively, review
                your answers, and analyze your performance after every test.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
              <Clock className="text-cyan-300" size={28} />

              <div>
                <p className="text-sm text-blue-100">Exam Mode</p>
                <p className="font-bold text-white">Timed &nbsp;•&nbsp; MCQ</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}