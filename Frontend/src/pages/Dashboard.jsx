import {
  BookOpen,
  Brain,
  PlayCircle,
  TrendingUp,
  ArrowRight,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";


export default function Dashboard() {
  const cards = [
    {
      title: "Practice",
      desc: "Topic-wise questions with AI explanations",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      link : "/practice"
      
    },
    {
      title: "Mock Test",
      desc: "Experience exam-like mock tests with instant analysis and detailed performance insights",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-600",
      link :"/mocktest"
    },
    {
  title: "PYQ",
  desc: "Practice official KCET previous year questions with detailed solutions.",
  icon: FileText,
  color: "from-amber-500 to-orange-600",
  link :"/pyqs"
   },
    {
      title: "AI Tutor",
      desc: "Ask doubts and understand concepts",
      icon: PlayCircle,
      color: "from-orange-500 to-red-500",
      link:"/ai"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-10 shadow-2xl"
        >
          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Stay consistent. Every question you solve takes you one step
            closer to your dream college.
          </p>
        </motion.div>

        {/* Quick Access */}
        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold">
            Quick Access
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  whileHover={{ y: -8 }}
                  key={card.title}
                  className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 transition hover:border-indigo-500"
                >
                  <Link to={card.link}>
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color}`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-semibold">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    {card.desc}
                  </p>

                  <div className="mt-8 flex items-center gap-2 font-medium text-indigo-400 group-hover:text-indigo-300">
                    Explore
                    <ArrowRight size={18} />
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