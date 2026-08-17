import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function get(subject, classNum) {
  if (subject === "Physics" && classNum === 11) {
    return [
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Thermal Properties of Matter",
      "Thermodynamics",
      "Kinetic Theory",
      "Oscillations",
      "Waves",
    ];
  } else if (subject === "Physics" && classNum === 12) {
    return [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics",
    ];
  } else if (subject === "Chemistry" && classNum === 11) {
    return [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements and Periodicity",
      "Chemical Bonding and Molecular Structure",
      "States of Matter",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Hydrogen",
      "The s-Block Elements",
      "The p-Block Elements (Group 13 & 14)",
      "Organic Chemistry - Some Basic Principles",
      "Hydrocarbons",
      "Environmental Chemistry",
    ];
  } else if (subject === "Chemistry" && classNum === 12) {
    return [
      "Solid State",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Surface Chemistry",
      "General Principles and Processes of Isolation of Elements",
      "p-Block Elements",
      "The d and f Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
      "Polymers",
      "Chemistry in Everyday Life",
    ];
  } else if (subject === "Mathematics" && classNum === 11) {
    return [
      "Sets",
      "Relations and Functions",
      "Trigonometric Functions",
      "Complex Numbers and Quadratic Equations",
      "Linear Inequalities",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines",
      "Conic Sections",
      "Introduction to Three Dimensional Geometry",
      "Limits and Derivatives",
      "Mathematical Reasoning",
      "Statistics",
      "Probability",
    ];
  } else if (subject === "Mathematics" && classNum === 12) {
    return [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Applications of Derivatives",
      "Integrals",
      "Applications of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ];
  }

  return [];
}

export default function Topics() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#050816] px-4 text-center text-white">
        <div>
          <p className="text-lg font-semibold">
            No subject selected.
          </p>

          <Link
            to="/practice"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft size={17} />
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const class11 = get(state.subject, 11);
  const class12 = get(state.subject, 12);

  const renderChapters = (chapters, classNumber, color) => {
    return (
      <div className="grid gap-3 sm:gap-4">
        {chapters.map((chapter, i) => (
          <motion.div
            key={chapter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`
              group rounded-2xl border border-white/10
              bg-white/5 p-4 backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-1
              ${
                color === "blue"
                  ? "hover:border-blue-500/50 hover:bg-blue-500/5"
                  : "hover:border-violet-500/50 hover:bg-violet-500/5"
              }
              sm:p-5
            `}
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

              {/* Chapter number */}
              <div
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl text-xs font-bold
                  sm:h-10 sm:w-10 sm:text-sm
                  ${
                    color === "blue"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-violet-500/10 text-violet-400"
                  }
                `}
              >
                {i + 1}
              </div>

              {/* Chapter name */}
              <h3 className="min-w-0 flex-1 text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                {chapter}
              </h3>

              {/* Arrow */}
              <ArrowRight
                size={19}
                className={`
                  shrink-0 transition-transform duration-300
                  group-hover:translate-x-1
                  ${
                    color === "blue"
                      ? "text-blue-400"
                      : "text-violet-400"
                  }
                `}
              />

            </div>

            {/* Practice button */}
            <Link
              to="/session"
              state={{
                subject: state.subject,
                chapter,
              }}
              className={`
                mt-3 flex w-full items-center justify-center
                rounded-xl px-4 py-2.5
                text-sm font-semibold text-white
                transition sm:mt-4
                ${
                  color === "blue"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-violet-600 hover:bg-violet-500"
                }
              `}
            >
              Start Practice
            </Link>

          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] px-4 py-6 text-white sm:px-6 sm:py-10 md:px-8">

      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4">

          <Link
            to="/practice"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 sm:h-12 sm:w-12"
          >
            <ArrowLeft size={19} />
          </Link>

          <div className="min-w-0">

            <h1 className="truncate text-2xl font-bold sm:text-4xl">
              {state.subject}
            </h1>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Select a chapter to begin practicing.
            </p>

          </div>

        </div>

        {/* Class 11 */}
        <section className="mb-10 sm:mb-14">

          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold sm:mb-6 sm:text-2xl">
            <BookOpen
              size={22}
              className="text-blue-400 sm:h-6 sm:w-6"
            />
            Class 11

            <span className="ml-1 text-xs font-normal text-gray-500 sm:text-sm">
              ({class11.length} chapters)
            </span>
          </h2>

          {renderChapters(class11, 11, "blue")}

        </section>

        {/* Class 12 */}
        <section>

          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold sm:mb-6 sm:text-2xl">
            <BookOpen
              size={22}
              className="text-violet-400 sm:h-6 sm:w-6"
            />
            Class 12

            <span className="ml-1 text-xs font-normal text-gray-500 sm:text-sm">
              ({class12.length} chapters)
            </span>
          </h2>

          {renderChapters(class12, 12, "violet")}

        </section>

      </div>
    </div>
  );
}