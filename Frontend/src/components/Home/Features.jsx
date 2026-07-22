import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  ChartColumn,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Mock Tests",
    description:
      "Practice with full-length KCET mock tests that simulate the real exam.",
  },
  {
    icon: FileText,
    title: "Previous Year Papers",
    description:
      "Solve PYQs with detailed explanations to understand the exam pattern and question types.",
  },
  {
    icon: GraduationCap,
    title: "College Predictor",
    description:
      "Predict colleges based on your expected rank and category.",
  },
  {
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Get personalized recommendations and doubt support using AI.",
  },
  {
    icon: ChartColumn,
    title: "Performance Analytics",
    description:
      "Track accuracy, speed, strengths, and weak topics visually.",
  },
  {
    icon: Sparkles,
    title: "Personalized Learning",
    description:
      "Receive daily goals and smart revision plans tailored to you.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Crack KCET
            </span>
          </h2>

          <p className="mt-5 text-slate-400 max-w-2xl mx-auto">
            One platform for preparation, practice, analytics, and college
            prediction.
          </p>
        </motion.div>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8 shadow-lg hover:border-blue-500 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-400 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}