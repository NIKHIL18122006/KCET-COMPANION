import { motion } from "framer-motion";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function get(subject, classNum) {
    if(subject === "Physics" && classNum === 11){
        return ["Units and Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy and Power","System of Particles and Rotational Motion","Gravitation","Mechanical Properties of Solids","Mechanical Properties of Fluids","Thermal Properties of Matter","Thermodynamics","Kinetic Theory","Oscillations","Waves"];
    }else if(subject === "Physics" && classNum === 12){
        return ["Electric Charges and Fields","Electrostatic Potential and Capacitance","Current Electricity","Moving Charges and Magnetism","Magnetism and Matter","Electromagnetic Induction","Alternating Current","Electromagnetic Waves","Ray Optics and Optical Instruments","Wave Optics","Dual Nature of Radiation and Matter","Atoms","Nuclei","Semiconductor Electronics"];
    }else if(subject === "Chemistry" && classNum === 11){
        return["Some Basic Concepts of Chemistry","Structure of Atom","Classification of Elements and Periodicity","Chemical Bonding and Molecular Structure","States of Matter","Thermodynamics","Equilibrium","Redox Reactions","Hydrogen","The s-Block Elements","The p-Block Elements (Group 13 & 14)","Organic Chemistry - Some Basic Principles","Hydrocarbons","Environmental Chemistry",];
    }else if(subject === "Chemistry" && classNum === 12){
        return ["Solid State","Solutions","Electrochemistry","Chemical Kinetics","Surface Chemistry","General Principles  and Processes of Isolation of Elements","p-Block Elements","The d and f Block Elements","Coordination Compounds","Haloalkanes and Haloarenes","Alcohols, Phenols and Ethers","Aldehydes, Ketones and Carboxylic Acids","Amines","Biomolecules","Polymers","Chemistry in Everyday Life",];
    }else if(subject === "Mathematics" && classNum === 11){
        return ["Sets","Relations and Functions","Trigonometric Functions","Complex Numbers and Quadratic Equations","Linear Inequalities","Permutations and Combinations","Binomial Theorem","Sequences and Series","Straight Lines","Conic Sections","Introduction to Three Dimensional Geometry","Limits and Derivatives","Mathematical Reasoning","Statistics","Probability",];
    }else if(subject === "Mathematics" && classNum === 12){
        return ["Relations and Functions","Inverse Trigonometric Functions","Matrices","Determinants","Continuity and Differentiability","Applications of Derivatives","Integrals","Applications of Integrals","Differential Equations","Vector Algebra","Three Dimensional Geometry","Linear Programming","Probability",];
    }

}

export default function Topics() {
    const { state } = useLocation();
    if (!state) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
      No subject selected.
    </div>
  );
}
    const class11 = get(state.subject, 11) || [];
    const class12 = get(state.subject, 12) || [];
    console.log("Class 11 Chapters:", class11);
    console.log("Class 12 Chapters:", class12);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <div className="flex items-center gap-4 mb-10">

          <Link
            to="/practice"
            className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
          >
            <ArrowLeft size={20}/>
          </Link>

          <div>

            <h1 className="text-4xl font-bold">
                {state.subject}
            </h1>

            <p className="text-gray-400 mt-1">
              Select a chapter to begin practicing.
            </p>

          </div>

        </div>

        {/* Class 11 */}

        <div className="mb-14">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="text-blue-400"/>
            Class 11
          </h2>

          <div className="grid gap-6 md:grid-cols-1">

            {class11.map((chapter, i)=>(
              <motion.div
                key={chapter}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:i*0.05}}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-blue-500 transition"
              >

                <h3 className="text-xl font-semibold">
                  {chapter}
                </h3>

                <Link
                  to="/session"
                  state={{ subject: state.subject, chapter }}
                  className="mt-7 flex items-center justify-between rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 transition"
                >

                  Start Practice

                  <ArrowRight/>

                </Link>

              </motion.div>
            ))}

          </div>

        </div>

        {/* Class 12 */}

        <div>

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="text-violet-400"/>
            Class 12
          </h2>

          <div className="grid gap-6 md:grid-cols-1">

            {class12.map((chapter,i)=>(
              <motion.div
                key={chapter}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:i*0.05}}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-violet-500 transition"
              >

                <h3 className="text-xl font-semibold">
                  {chapter}
                </h3>
                <Link
                  to="/session"
                  state={{ subject: state.subject, chapter }}
                  className="mt-7 flex items-center justify-between rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700 transition"
                >

                  Start Practice

                  <ArrowRight/>

                </Link>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}