import { motion } from "framer-motion";
import {
  Atom,
  FlaskConical,
  Calculator,
  ArrowRight,
  Clock,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTest } from "../services/getTest";

const subjects = [
  {
    title: "Physics",
    description:
      "Test your concepts in Mechanics, Optics, Electricity and more",
    icon: Atom,
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-600",
  },
  {
    title: "Chemistry",
    description:
      "Challenge yourself with Organic, Inorganic & Physical Chemistry",
    icon: FlaskConical,
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-600",
  },
  {
    title: "Mathematics",
    description:
      "Test your skills in Algebra, Calculus, Geometry and more",
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
    <div className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">

      <div className="mx-auto w-full max-w-7xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-xl sm:px-5 sm:text-sm">
            <Trophy size={16} className="text-yellow-400 sm:h-[18px] sm:w-[18px]" />
            KCET Mock Tests
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:mt-6 sm:text-5xl md:text-6xl">
            Test Your Preparation

            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Like the Real KCET
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-lg sm:leading-7">
            Take timed mock tests, analyze your performance, and build the
            confidence you need to ace KCET.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;

            return (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="w-full"
              >
                <button
                  onClick={() => handle(subject.title)}
                  className="w-full text-left"
                >
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${subject.color} bg-white/5 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-blue-500/20 sm:rounded-3xl sm:p-7`}
                  >

                    {/* Glow */}
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl sm:h-40 sm:w-40" />

                    {/* Icon */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${subject.iconBg} text-white shadow-lg sm:h-16 sm:w-16`}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Title */}
                    <h2 className="relative mt-5 text-xl font-bold text-white sm:mt-6 sm:text-2xl">
                      {subject.title}
                    </h2>

                    {/* Description */}
                    <p className="relative mt-2 text-sm leading-6 text-gray-400 sm:mt-3 sm:text-base sm:leading-7">
                      {subject.description}
                    </p>

                    {/* Test Info */}
                    <div className="relative mt-5 flex flex-col gap-3 text-xs text-gray-400 min-[400px]:flex-row min-[400px]:gap-5 sm:mt-6 sm:text-sm">

                      <div className="flex items-center gap-2">
                        <Clock size={16} className="shrink-0 text-cyan-400" />
                        <span>60 Minutes</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="shrink-0 text-yellow-400" />
                        <span>KCET Pattern</span>
                      </div>

                    </div>

                    {/* Button */}
                    <div className="relative mt-6 flex items-center justify-between sm:mt-8">
                      <span className="text-sm font-semibold text-blue-400 sm:text-base">
                        Start Mock Test
                      </span>

                      <ArrowRight
                        className="shrink-0 text-blue-400 transition-transform duration-300 group-hover:translate-x-2"
                        size={20}
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
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 shadow-2xl sm:mt-16 sm:rounded-3xl sm:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">

            <div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Simulate the Real Exam.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:mt-4 sm:text-lg sm:leading-7">
                Attempt timed tests, manage your time effectively, review
                your answers, and analyze your performance after every test.
              </p>
            </div>

            <div className="flex w-full shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl md:w-auto md:px-6">
              <Clock className="shrink-0 text-cyan-300" size={26} />

              <div>
                <p className="text-xs text-blue-100 sm:text-sm">
                  Exam Mode
                </p>

                <p className="font-bold text-white">
                  Timed&nbsp; • &nbsp;MCQ
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}