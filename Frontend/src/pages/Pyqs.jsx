import { motion } from "framer-motion";
import {
  Atom,
  FlaskConical,
  Calculator,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const subjects = [
  {
    title: "Physics",
    description:
      "Practice previous year Physics questions and understand the KCET exam pattern.",
    icon: Atom,
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-600",
  },
  {
    title: "Chemistry",
    description:
      "Solve previous year Chemistry questions from Organic, Inorganic and Physical Chemistry.",
    icon: FlaskConical,
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-600",
  },
  {
    title: "Mathematics",
    description:
      "Practice previous year Mathematics questions covering all major KCET topics.",
    icon: Calculator,
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-600",
  },
];

export default function Pyqs() {
  const navigate = useNavigate();

  const handleSubject = (subject) => {
    navigate("/pyq-years", {
      state: {
        subject,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            <FileText size={16} />
            Previous Year Questions
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Practice Real KCET
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Previous Year Questions
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Select a subject to explore KCET questions from previous years
            and strengthen your preparation.
          </p>
        </motion.div>

        {/* ================= SUBJECT CARDS ================= */}

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
                <button
                  onClick={() => handleSubject(subject.title)}
                  className="w-full text-left"
                >
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

                    {/* Button */}
                    <div className="relative mt-8 flex items-center justify-between">
                      <span className="font-semibold text-blue-400">
                        View Previous Years
                      </span>

                      <ArrowRight
                        size={22}
                        className="text-blue-400 transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM BANNER ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white">
            Learn From Real KCET Questions.
          </h2>

          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            Solve previous year questions, understand recurring concepts,
            and get familiar with the actual KCET question pattern.
          </p>
        </motion.div>

      </div>
    </div>
  );
}