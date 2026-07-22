import {
  Atom,
  FlaskConical,
  Calculator,
  Dna,
} from "lucide-react";

const subjects = [
  {
    icon: Atom,
    title: "Physics",
    description: "From Mechanics to Optics, master all topics with practice questions.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: FlaskConical,
    title: "Chemistry",
    description: "Practice Organic, Inorganic, and Physical Chemistry.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    description: "Strengthen Algebra and Calculus with topic-wise practice.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Dna,
    title: "Biology",
    description: "Revise diagrams, concepts, and NCERT-based questions.",
    color: "from-pink-500 to-rose-600",
  },
];

export default function Subjects() {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Explore Subjects
          </h2>

          <p className="mt-4 text-slate-400">
            Comprehensive preparation for every KCET subject.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <div
                key={subject.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {subject.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {subject.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}