import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestion } from "../services/getQuestion";

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
      const questions = await getQuestion(
        state.subject,
        state.chapter,
        selected
      );

      console.log("Fetched Questions:", questions);

      navigate("/practice/session", {
        state: {
          subject: state.subject,
          chapter: state.chapter,
          questions,
        },
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] px-4 py-6 sm:px-6 sm:py-10">

      <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-10">

        {/* Heading */}
        <h1 className="break-words text-2xl font-bold leading-tight text-white sm:text-4xl">
          {state?.subject} - {state?.chapter}
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-lg">
          Choose the number of questions for this practice session.
        </p>

        {/* Question Count */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 md:grid-cols-4">

          {options.map((option) => (
            <button
              key={option.title}
              onClick={() => setSelected(option.value)}
              className={`
                min-w-0 rounded-2xl border p-4
                transition-all duration-300
                sm:rounded-3xl sm:p-8

                ${
                  selected === option.value
                    ? "scale-[1.02] border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30"
                    : "border-white/10 bg-white/5 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-500/10"
                }
              `}
            >
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                {option.title}
              </h2>

              <p className="mt-1 text-xs text-gray-300 sm:mt-2 sm:text-base">
                {option.subtitle}
              </p>
            </button>
          ))}

        </div>

        {/* Start */}
        <button
          onClick={handle}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-semibold text-white transition hover:scale-[1.01] sm:mt-12 sm:gap-3 sm:py-5 sm:text-xl"
        >
          Start Practice
          <ArrowRight size={20} />
        </button>

      </div>
    </div>
  );
}