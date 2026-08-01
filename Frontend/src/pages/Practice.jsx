import { motion } from "framer-motion";
import {
  Atom,
  FlaskConical,
  Calculator,
  Leaf,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  {
    title: "Physics",
    description: "Mechanics, Optics, Electricity and more",
    icon: Atom,
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-600",
  },
  {
    title: "Chemistry",
    description: "Organic, Inorganic & Physical Chemistry",
    icon: FlaskConical,
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-600",
  },
  {
    title: "Mathematics",
    description: "Algebra, Calculus, Geometry & More",
    icon: Calculator,
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-600",
  },
];

export default function Practice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-blue-400 backdrop-blur-md">
            <BookOpen size={18} />
            Practice Zone
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Master KCET With
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Unlimited Practice
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Select your subject and start solving chapter-wise questions
            designed specifically for KCET.
          </p>
        </motion.div>

        {/* Subject Cards */}
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
                <Link to="/topics" state={{ subject: subject.title }}>
                  <div
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${subject.color}
                    bg-white/5 backdrop-blur-xl p-7 shadow-xl
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
                    <p className="relative mt-3 text-gray-400 leading-7">
                      {subject.description}
                    </p>

                    {/* Button */}
                    <div className="relative mt-8 flex items-center justify-between">
                      <span className="font-semibold text-blue-400">
                        Start Practice
                      </span>

                      <ArrowRight className="text-blue-400 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
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
          <h2 className="text-4xl font-bold text-white">
            Practice Daily. Improve Faster.
          </h2>

          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            Solve chapter-wise questions, revisit mistakes, improve weak
            chapters, and prepare confidently for KCET with structured practice
            sessions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}