import { motion } from "framer-motion";
import {
  UserPlus,
  BookMarked,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in a few seconds and set your KCET goals.",
  },
  {
    icon: BookMarked,
    title: "Practice Smart",
    description:
      "Attempt mock tests, solve PYQs, and follow AI-powered recommendations.",
  },
  {
    icon: Trophy,
    title: "Achieve Your Dream College",
    description:
      "Analyze your performance and predict colleges based on your rank.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-slate-400">
            Start your KCET journey in just three simple steps.
          </p>
        </motion.div>

        <div className="relative mt-20 grid lg:grid-cols-3 gap-10">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-10 text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="mx-auto mt-4 w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Icon size={30} className="text-blue-400" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-400 leading-7">
                  {step.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}