import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import MathText from "../components/MathText";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { explainQuestion } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function PracticeSession() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Hooks must come before any conditional return
  const [explanation, setExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});

  if (!state || !state.questions) {
    return <Navigate to="/session" replace />;
  }

  const { subject, chapter, questions, year } = state;

  const selectedOption = answers[currentIndex] || null;
  const isAnswerChecked = checkedQuestions[currentIndex] || false;
  const currentQuestion = questions[currentIndex];

  function changeQuestion(index) {
    setCurrentIndex(index);
    setExplanation("");
    setAiLoading(false);
  }

  function checkAnswer() {
    if (selectedOption === null) {
      alert("Please select an option before checking the answer.");
      return;
    }

    setCheckedQuestions((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));
  }

  const normalizeMath = (text) => {
    return text
      .replace(/\\\[/g, "$$")
      .replace(/\\\]/g, "$$")
      .replace(/\\\(/g, "$")
      .replace(/\\\)/g, "$");
  };

  const handleAskAI = async () => {
    try {
      setAiLoading(true);

      const result = await explainQuestion(currentQuestion);

      setExplanation(normalizeMath(result));
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  const getOptionClass = (option) => {
    if (isAnswerChecked) {
      if (currentQuestion.correct_answer === option) {
        return "border-green-500 bg-green-600/30 shadow-lg shadow-green-500/30";
      }

      if (selectedOption === option) {
        return "border-red-500 bg-red-600/30 shadow-lg shadow-red-500/30";
      }

      return "border-white/10";
    }

    if (selectedOption === option) {
      return "border-blue-500 bg-blue-600/30 shadow-lg shadow-blue-500/30";
    }

    return "border-white/10 hover:bg-blue-500/20";
  };

  const selectOption = (option) => {
    if (isAnswerChecked) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]:
        prev[currentIndex] === option ? null : option,
    }));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] px-4 py-6 text-white sm:px-6 sm:py-8">

      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">

          <h1 className="break-words text-2xl font-bold leading-tight sm:text-3xl">
            {subject} -{" "}
            {chapter === undefined
              ? `${year} (${currentQuestion.chapter})`
              : chapter}
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Question {currentIndex + 1} of {questions.length}
          </p>

        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-8">

          {/* Question */}
          <h2 className="mb-5 text-lg font-semibold leading-7 sm:mb-6 sm:text-2xl sm:leading-9">
            <MathText text={currentQuestion.question} />
          </h2>

          {/* Question Image */}
          {currentQuestion.media?.questionImage && (
            <div className="mb-6 flex justify-center sm:mb-8">
              <img
                src={currentQuestion.media.questionImage}
                alt="Question"
                className="max-h-80 max-w-full rounded-lg object-contain"
              />
            </div>
          )}

          {/* Options */}
          <div className="grid gap-3 sm:gap-4">

            {/* A */}
            <button
              onClick={() => selectOption("A")}
              className={`w-full min-w-0 rounded-xl border p-4 text-left transition-all duration-200 sm:p-5 ${getOptionClass(
                "A"
              )}`}
            >
              <MathText
                text={`A. ${currentQuestion.option_a}`}
              />
            </button>

            {/* B */}
            <button
              onClick={() => selectOption("B")}
              className={`w-full min-w-0 rounded-xl border p-4 text-left transition-all duration-200 sm:p-5 ${getOptionClass(
                "B"
              )}`}
            >
              <MathText
                text={`B. ${currentQuestion.option_b}`}
              />
            </button>

            {/* C */}
            <button
              onClick={() => selectOption("C")}
              className={`w-full min-w-0 rounded-xl border p-4 text-left transition-all duration-200 sm:p-5 ${getOptionClass(
                "C"
              )}`}
            >
              <MathText
                text={`C. ${currentQuestion.option_c}`}
              />
            </button>

            {/* D */}
            <button
              onClick={() => selectOption("D")}
              className={`w-full min-w-0 rounded-xl border p-4 text-left transition-all duration-200 sm:p-5 ${getOptionClass(
                "D"
              )}`}
            >
              <MathText
                text={`D. ${currentQuestion.option_d}`}
              />
            </button>

          </div>

          {/* Navigation */}
          <div className="mt-7 border-t border-white/10 pt-6 sm:mt-10">

            {/* Mobile: 2 × 2 grid */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">

              {/* Previous */}
              <button
                disabled={currentIndex === 0}
                onClick={() =>
                  changeQuestion(currentIndex - 1)
                }
                className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-gray-700 px-3 py-3 text-xs font-medium text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              {/* Next / End */}
              {currentIndex !== questions.length - 1 ? (
                <button
                  onClick={() =>
                    changeQuestion(currentIndex + 1)
                  }
                  className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-3 text-xs font-semibold text-white transition hover:bg-blue-500"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    year === undefined
                      ? navigate("/session", {
                          state: {
                            subject: state.subject,
                            chapter: state.chapter,
                          },
                        })
                      : navigate("/pyq-years", {
                          state: {
                            subject: state.subject,
                          },
                        })
                  }
                  className="rounded-xl bg-red-600 px-3 py-3 text-xs font-semibold text-white transition hover:bg-red-500"
                >
                  End Practice
                </button>
              )}

              {/* Check Answer */}
              <button
                onClick={checkAnswer}
                className="rounded-xl bg-blue-600 px-3 py-3 text-xs font-semibold text-white transition hover:bg-blue-500"
              >
                Check Answer
              </button>

              {/* Ask AI */}
              <button
                onClick={handleAskAI}
                disabled={aiLoading}
                className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-600 px-3 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles size={15} />
                {aiLoading ? "Thinking..." : "Ask AI"}
              </button>

            </div>

            {/* Desktop */}
            <div className="hidden items-center justify-between sm:flex">

              {/* Previous */}
              <button
                disabled={currentIndex === 0}
                onClick={() =>
                  changeQuestion(currentIndex - 1)
                }
                className="flex items-center gap-2 rounded-xl bg-gray-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {/* Center */}
              <div className="flex items-center gap-3">

                {/* Check */}
                <button
                  onClick={checkAnswer}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Check Answer
                </button>

                {/* AI */}
                <button
                  onClick={handleAskAI}
                  disabled={aiLoading}
                  className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  {aiLoading ? "Thinking..." : "Ask AI"}
                </button>

              </div>

              {/* Next / End */}
              {currentIndex !== questions.length - 1 ? (
                <button
                  onClick={() =>
                    changeQuestion(currentIndex + 1)
                  }
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    year === undefined
                      ? navigate("/session", {
                          state: {
                            subject: state.subject,
                            chapter: state.chapter,
                          },
                        })
                      : navigate("/pyq-years", {
                          state: {
                            subject: state.subject,
                          },
                        })
                  }
                  className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  End Practice
                </button>
              )}

            </div>

          </div>

        </div>

        {/* AI Explanation */}
        {explanation && (
          <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 sm:mt-6 sm:rounded-3xl sm:p-6">

            <div className="mb-4 flex items-center gap-3 sm:mb-5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 sm:h-10 sm:w-10">
                <Sparkles
                  size={19}
                  className="text-purple-400"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white sm:text-base">
                  AI Explanation
                </h2>

                <p className="text-xs text-gray-400 sm:text-sm">
                  Quick explanation
                </p>
              </div>

            </div>

            <div className="max-w-none overflow-x-auto text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {explanation}
              </ReactMarkdown>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}