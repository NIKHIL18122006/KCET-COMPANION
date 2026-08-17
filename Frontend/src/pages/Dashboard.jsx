import {
  Brain,
  TrendingUp,
  ArrowRight,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    {
      title: "Practice",
      desc: "Topic-wise questions with AI explanations",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      link: "/practice",
    },
    {
      title: "Mock Test",
      desc: "Experience exam-like mock tests with instant analysis and detailed performance insights",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-600",
      link: "/mocktest",
    },
    {
      title: "PYQ",
      desc: "Practice official KCET previous year questions with detailed solutions.",
      icon: FileText,
      color: "from-amber-500 to-orange-600",
      link: "/pyqs",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-6 shadow-2xl sm:rounded-3xl sm:p-10"
        >
          <h1 className="text-3xl font-bold sm:text-5xl">
            Welcome Back 👋
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:mt-4 sm:text-lg sm:leading-7">
            Stay consistent. Every question you solve takes you one step
            closer to your dream college.
          </p>
        </motion.div>

        {/* Quick Access */}
        <div className="mt-8 sm:mt-12">
          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  whileHover={{ y: -8 }}
                  key={card.title}
                  className="group"
                >
                  <Link
                    to={card.link}
                    className="block h-full rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500 sm:rounded-3xl sm:p-7"
                  >
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} sm:mb-6 sm:h-16 sm:w-16`}
                    >
                      <Icon size={28} />
                    </div>

                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-7">
                      {card.desc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 font-medium text-indigo-400 group-hover:text-indigo-300 sm:mt-8">
                      Explore
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}