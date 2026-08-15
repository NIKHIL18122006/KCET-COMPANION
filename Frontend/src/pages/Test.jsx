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
import { useLocation,useNavigate } from "react-router-dom";
import MathText from "../components/MathText";
import {saveTestResult} from "../services/testService"

export default function Test() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const questions = state.questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Stores selected answer for every question
  const [answers, setAnswers] = useState({});

  // Stores questions marked for review
  const [marked, setMarked] = useState(new Set());

  // 60 minutes
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

  // Navigate immediately
  navigate("/test-result", {
    state: {
      correct,
      total: questions.length,
      attempted,
    },
  });

  // Save result in backend
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
// Later:
    // POST /api/mock-tests/:attemptId/submit
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm text-gray-400">
              {state.subject} Mock Test
            </p>

            <h1 className="mt-1 text-xl font-bold">
              KCET Practice Test
            </h1>
          </div>

          {/* Question Counter */}

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Question
            </p>

            <p className="text-xl font-bold">
              {currentQuestion + 1}
              <span className="text-gray-500">
                {" "}
                / {questions.length}
              </span>
            </p>
          </div>

          {/* Timer */}

          <div className="flex items-center justify-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3">
            <Clock3
              size={20}
              className="text-cyan-400"
            />

            <div>
              <p className="text-xs text-gray-400">
                Time Remaining
              </p>

              <p className="font-mono text-lg font-bold text-cyan-400">
                {formatTime()}
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN ================= */}

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

          {/* ================= QUESTION ================= */}

          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
          >

            {/* Question Header */}

            <div className="flex items-center justify-between">

              <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-400">
                Question {currentQuestion + 1}
              </span>

              <button
                onClick={toggleMark}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  marked.has(question.id)
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Flag size={16} />

                {marked.has(question.id)
                  ? "Marked"
                  : "Mark for Review"}
              </button>
            </div>

            {/* Question Text */}

            <div className="mt-8">
              <h2 className="mb-6 text-2xl font-semibold">
                <MathText text={question.question} />
              </h2>
            
              {question.media?.questionImage && (
                <img
                  src={question.media.questionImage}
                  alt="Question"
                  className="mx-auto mb-8 max-h-80 rounded-lg object-contain"
                />
              )}
            </div>
            {/* Options */}

            <div className="mt-8 space-y-4">
              {[
                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d,
              ].map((option, index) => {
                const selected = answers[question.id] === index;
            
                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:border-blue-500/40 hover:bg-white/10"
                    }`}
                  >
                    {/* Option Letter */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                        selected
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
            
                    {/* Option Text */}
                    <span
                      className={`text-base ${
                        selected
                          ? "font-medium text-white"
                          : "text-gray-300"
                      }`}
                    >
                      <MathText text={option} />
                    </span>
            
                    {/* Selected Check */}
                    {selected && (
                      <Check
                        size={20}
                        className="ml-auto text-blue-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">

              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  <Send size={18} />
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </motion.div>

          {/* ================= QUESTION PALETTE ================= */}

          <div className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h3 className="text-lg font-bold">
              Question Palette
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Navigate between questions
            </p>

            {/* Legend */}

            <div className="mt-5 space-y-2 text-xs text-gray-400">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                Current
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                Answered
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                Review
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                Not Answered
              </div>
            </div>

            {/* Palette */}

            <div className="mt-6 grid grid-cols-5 gap-3">

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
                    className={`h-10 rounded-lg text-sm font-semibold transition hover:scale-105 ${style}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Progress */}

            <div className="mt-8">

              <div className="flex justify-between text-sm">
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
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold transition hover:scale-[1.02]"
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