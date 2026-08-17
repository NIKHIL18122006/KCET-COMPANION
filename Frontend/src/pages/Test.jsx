import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock3,
  Check,
  Send,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MathText from "../components/MathText";
import { saveTestResult } from "../services/testService";

export default function Test() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const questions = state?.questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  const question = questions[currentQuestion];

  // -----------------------------
  // TIMER
  // -----------------------------

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // -----------------------------
  // SELECT ANSWER
  // -----------------------------

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex,
    }));
  };

  // -----------------------------
  // MARK QUESTION
  // -----------------------------

  const toggleMark = () => {
    setMarked((prev) => {
      const updated = new Set(prev);

      if (updated.has(question.id)) {
        updated.delete(question.id);
      } else {
        updated.add(question.id);
      }

      return updated;
    });
  };

  // -----------------------------
  // NAVIGATION
  // -----------------------------

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------

  const handleSubmit = async () => {
    let correct = 0;
    let attempted = 0;

    for (let i = 0; i < questions.length; i++) {
      const selectedIndex = answers[questions[i].id];

      if (selectedIndex !== undefined) {
        attempted++;

        if (
          questions[i].correct_answer ===
          String.fromCharCode(65 + selectedIndex)
        ) {
          correct++;
        }
      }
    }

    const wrong = attempted - correct;

    navigate("/test-result", {
      state: {
        correct,
        total: questions.length,
        attempted,
      },
    });

    try {
      await saveTestResult({
        subject: state.subject,
        totalQuestions: questions.length,
        correctAnswers: correct,
        wrongAnswers: wrong,
      });
    } catch (error) {
      console.error("Failed to save test result:", error);
    }
  };

  // Prevent crash if page is opened directly
  if (!state || !state.questions || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-white">
        <div>
          <p className="text-lg font-semibold">
            Test session not found.
          </p>

          <button
            onClick={() => navigate("/mocktest")}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold"
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 py-5 text-white sm:px-6 sm:py-6 md:px-8">

      <div className="mx-auto w-full max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:mb-6 sm:p-5">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Test Name */}
            <div className="min-w-0">
              <p className="text-xs text-gray-400 sm:text-sm">
                {state.subject} Mock Test
              </p>

              <h1 className="mt-1 text-lg font-bold sm:text-xl">
                KCET Practice Test
              </h1>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between gap-4 sm:justify-center">

              <div className="text-left sm:text-center">
                <p className="text-xs text-gray-400 sm:text-sm">
                  Question
                </p>

                <p className="text-lg font-bold sm:text-xl">
                  {currentQuestion + 1}
                  <span className="text-gray-500">
                    {" "}
                    / {questions.length}
                  </span>
                </p>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">

                <Clock3
                  size={18}
                  className="shrink-0 text-cyan-400"
                />

                <div>
                  <p className="hidden text-xs text-gray-400 min-[400px]:block">
                    Time Remaining
                  </p>

                  <p className="font-mono text-base font-bold text-cyan-400 sm:text-lg">
                    {formatTime()}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= MAIN ================= */}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">

          {/* ================= QUESTION ================= */}

          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8"
          >

            {/* Question Header */}
            <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">

              <span className="w-fit rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 sm:text-sm">
                Question {currentQuestion + 1}
              </span>

              <button
                onClick={toggleMark}
                className={`flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs transition sm:text-sm ${
                  marked.has(question.id)
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Flag size={15} />

                {marked.has(question.id)
                  ? "Marked"
                  : "Mark for Review"}
              </button>

            </div>

            {/* Question */}
            <div className="mt-6 sm:mt-8">

              <h2 className="mb-5 text-lg font-semibold leading-7 sm:mb-6 sm:text-2xl sm:leading-9">
                <MathText text={question.question} />
              </h2>

              {question.media?.questionImage && (
                <div className="mb-6 flex justify-center sm:mb-8">
                  <img
                    src={question.media.questionImage}
                    alt="Question"
                    className="max-h-80 max-w-full rounded-lg object-contain"
                  />
                </div>
              )}

            </div>

            {/* Options */}
            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">

              {[
                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d,
              ].map((option, index) => {

                const selected =
                  answers[question.id] === index;

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`group flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 sm:gap-4 sm:p-4 ${
                      selected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:border-blue-500/40 hover:bg-white/10"
                    }`}
                  >

                    {/* Letter */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-10 sm:w-10 ${
                        selected
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    {/* Text */}
                    <span
                      className={`min-w-0 flex-1 text-sm sm:text-base ${
                        selected
                          ? "font-medium text-white"
                          : "text-gray-300"
                      }`}
                    >
                      <MathText text={option} />
                    </span>

                    {/* Check */}
                    {selected && (
                      <Check
                        size={18}
                        className="shrink-0 text-blue-400"
                      />
                    )}

                  </button>
                );
              })}

            </div>

            {/* Navigation */}
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:pt-6">

              {/* Previous */}
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-medium text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 sm:gap-2 sm:px-5 sm:text-sm"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {/* Next / Submit */}
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3 text-xs font-semibold text-white shadow-lg transition hover:scale-[1.02] sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <Send size={17} />
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-3 text-xs font-semibold text-white transition hover:bg-blue-500 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              )}

            </div>

          </motion.div>

          {/* ================= QUESTION PALETTE ================= */}

          <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">

            <h3 className="text-lg font-bold">
              Question Palette
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Navigate between questions
            </p>

            {/* Legend */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-gray-400 sm:block sm:space-y-2">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-blue-600" />
                Current
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-green-500" />
                Answered
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-500" />
                Review
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-white/20" />
                Not Answered
              </div>

            </div>

            {/* Palette */}
            <div className="mt-5 grid grid-cols-5 gap-2 sm:mt-6 sm:gap-3">

              {questions.map((q, index) => {

                const answered =
                  answers[q.id] !== undefined;

                const isCurrent =
                  currentQuestion === index;

                const isMarked =
                  marked.has(q.id);

                let style =
                  "bg-white/10 text-gray-400";

                if (isCurrent) {
                  style =
                    "bg-blue-600 text-white ring-2 ring-blue-400/40";
                } else if (isMarked) {
                  style =
                    "bg-yellow-500 text-black";
                } else if (answered) {
                  style =
                    "bg-green-500 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`h-9 rounded-lg text-xs font-semibold transition hover:scale-105 sm:h-10 sm:text-sm ${style}`}
                  >
                    {index + 1}
                  </button>
                );
              })}

            </div>

            {/* Progress */}
            <div className="mt-6 sm:mt-8">

              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">
                  Progress
                </span>

                <span className="font-semibold">
                  {Object.keys(answers).length} /{" "}
                  {questions.length}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                  style={{
                    width: `${
                      (Object.keys(answers).length /
                        questions.length) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold transition hover:scale-[1.02] sm:mt-8"
            >
              <Send size={18} />
              Submit Test
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}