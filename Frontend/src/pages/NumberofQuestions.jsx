import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getQuestion } from "../services/getQuestion";
import { useNavigate } from "react-router-dom";
export default function PracticeSetup() {
  const [selected, setSelected] = useState(20);
  const { state } = useLocation();
  const navigate = useNavigate();
  const options = [
    {
      value: 10,
      title: "10",
      subtitle: "Quick Test",
    },
    {
      value: 20,
      title: "20",
      subtitle: "Standard",
    },
    {
      value: 30,
      title: "30",
      subtitle: "Challenge",
    },
    {
      value: "All",
      title: "All",
      subtitle: "Full Set",
    },
  ];
  const handle = async () => {
    try {
      const questions = await getQuestion(state.subject, state.chapter, selected);
        console.log("Fetched Questions:", questions);
        // Navigate to the practice session page with the fetched questions
        navigate("/practice/session", { state: { subject: state.subject, chapter: state.chapter, questions } });
    } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions. Please try again later.");
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] flex items-center justify-center px-6">

      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        <h1 className="text-4xl font-bold text-white">
            {state?.subject} - {state?.chapter}
        </h1>

        <p className="mt-2 text-gray-400 text-lg">
          Choose the number of questions for this practice session.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">

          {options.map((option) => (
            <button
              key={option.title}
              onClick={() => setSelected(option.value)}
              className={`rounded-3xl border p-8 transition-all duration-300
              
              ${
                selected === option.value
                  ? "border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 scale-105"
                  : "border-white/10 bg-white/5 hover:border-blue-400 hover:bg-blue-500/10 hover:-translate-y-1"
              }
              
              `}
            >
              <h2 className="text-4xl font-bold text-white">
                {option.title}
              </h2>

              <p className="mt-2 text-gray-300">
                {option.subtitle}
              </p>

            </button>
          ))}

        </div>
        <button onClick={handle} className="mt-12 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-5 text-xl font-semibold text-white transition hover:scale-[1.02]">
          Start Practice
          <ArrowRight size={22} />
        </button>
      </div>

    </div>
  );
}