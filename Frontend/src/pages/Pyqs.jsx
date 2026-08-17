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
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12 md:px-8">

      <div className="mx-auto w-full max-w-7xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:mb-16"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 sm:px-4 sm:text-sm">
            <FileText size={15} />
            Previous Year Questions
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:mt-6 sm:text-5xl md:text-6xl">
            Practice Real KCET

            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Previous Year Questions
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-lg sm:leading-7">
            Select a subject to explore KCET questions from previous years
            and strengthen your preparation.
          </p>

        </motion.div>

        {/* Subject Cards */}
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
                  onClick={() => handleSubject(subject.title)}
                  className="block w-full text-left"
                >

                  <div
                    className={`
                      group relative h-full overflow-hidden
                      rounded-2xl border border-white/10
                      bg-gradient-to-br ${subject.color}
                      bg-white/5 p-5 shadow-xl
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-2
                      hover:border-blue-500/40
                      hover:shadow-blue-500/20
                      sm:rounded-3xl sm:p-7
                    `}
                  >

                    {/* Glow */}
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl sm:h-40 sm:w-40" />

                    {/* Icon */}
                    <div
                      className={`
                        relative flex h-14 w-14
                        items-center justify-center
                        rounded-2xl ${subject.iconBg}
                        text-white shadow-lg
                        sm:h-16 sm:w-16
                      `}
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

                    {/* Action */}
                    <div className="relative mt-6 flex items-center justify-between sm:mt-8">

                      <span className="text-sm font-semibold text-blue-400 sm:text-base">
                        View Previous Years
                      </span>

                      <ArrowRight
                        size={20}
                        className="shrink-0 text-blue-400 transition-transform duration-300 group-hover:translate-x-2"
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

          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            Learn From Real KCET Questions.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:mt-4 sm:text-lg sm:leading-7">
            Solve previous year questions, understand recurring concepts,
            and get familiar with the actual KCET question pattern.
          </p>

        </motion.div>

      </div>
    </div>
  );
}