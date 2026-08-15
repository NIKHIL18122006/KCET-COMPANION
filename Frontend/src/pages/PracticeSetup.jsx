import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MathText from "../components/MathText";
import { ChevronLeft, ChevronRight, Currency,Sparkles } from "lucide-react";
import { explainQuestion } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function PracticeSession() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.questions) {
    return <Navigate to="/session" replace />;
  }

  const { subject, chapter, questions, year } = state;
  
  const [explanation, setExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});

  if (!state || !state.questions) {
    return <Navigate to="/session" replace />;
  }

  const selectedOption = answers[currentIndex] || null;
  const isAnswerChecked = checkedQuestions[currentIndex] || false;
  
  const currentQuestion = questions[currentIndex];
  function changeQuestion(index) {
  setCurrentIndex(index);
  setExplanation("");
  setAiLoading(false);
  }
  function checkAnswer(){
    if(selectedOption === null){
        alert("Please select an option before checking the answer.");
        return;
    }
    setCheckedQuestions((prev) => ({
        ...prev,
        [currentIndex]: true
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {subject} - {chapter === undefined ? year +" "+"("+currentQuestion.chapter + ")": chapter}
            </h1>

            <p className="text-gray-400 mt-2">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <h2 className="text-2xl font-semibold mb-6">
              <MathText text={currentQuestion.question} />
          </h2>

             {currentQuestion.media?.questionImage && (
                    <img
                      src={currentQuestion.media.questionImage}
                      alt="Question"
                      className="mx-auto mb-8 max-h-80 rounded-lg object-contain"
                   />
              )}

          <div className="grid gap-4">

            <button onClick={() => {
                if(isAnswerChecked){
                    return;
                }
                setAnswers((prev) => ({
                    ...prev,
                    [currentIndex]: prev[currentIndex] === "A" ? null : "A"
                }));
            }} className={`text-left rounded-xl border p-5 transition-all duration-200
    ${  isAnswerChecked
              ? currentQuestion.correct_answer === "A"
               ? "border-green-500 bg-green-600/30 shadow-lg shadow-green-500/40"
                 : selectedOption === "A"
                 ? "border-red-500 bg-red-600/30 shadow-lg shadow-red-500/40"
                   : "border-white/10"
               : selectedOption === "A"
              ? "border-blue-500 bg-blue-600/30 shadow-lg shadow-blue-500/40"
               : "border-white/10 hover:bg-blue-500/20"
    }`}>
              <MathText text={`A. ${currentQuestion.option_a}`} />
            </button>

            <button onClick={() => {
                if(isAnswerChecked){
                    return;
                }
                setAnswers((prev) => ({
                    ...prev,
                    [currentIndex]: prev[currentIndex] === "B" ? null : "B"
                }));
            }} className={`text-left rounded-xl border p-5 transition-all duration-200
    ${  isAnswerChecked
              ? currentQuestion.correct_answer === "B"
               ? "border-green-500 bg-green-600/30 shadow-lg shadow-green-500/40"
                 : selectedOption === "B"
                 ? "border-red-500 bg-red-600/30 shadow-lg shadow-red-500/40"
                   : "border-white/10"
               : selectedOption === "B"
              ? "border-blue-500 bg-blue-600/30 shadow-lg shadow-blue-500/40"
               : "border-white/10 hover:bg-blue-500/20"
    }`}>
              <MathText text={`B. ${currentQuestion.option_b}`} />
            </button>

            <button onClick={() => {
                if(isAnswerChecked){
                    return; // Prevent changing the answer if it's already checked
                 }
                setAnswers((prev) => ({
                ...prev,
                [currentIndex]: prev[currentIndex] === "C" ? null : "C"
            }))}} className={`text-left rounded-xl border p-5 transition-all duration-200
    ${isAnswerChecked
              ? currentQuestion.correct_answer === "C"
               ? "border-green-500 bg-green-600/30 shadow-lg shadow-green-500/40"
                 : selectedOption === "C"
                 ? "border-red-500 bg-red-600/30 shadow-lg shadow-red-500/40"
                   : "border-white/10"
               : selectedOption === "C"
              ? "border-blue-500 bg-blue-600/30 shadow-lg shadow-blue-500/40"
               : "border-white/10 hover:bg-blue-500/20"
    }`}>
              <MathText text={`C. ${currentQuestion.option_c}`} />
            </button>

            <button onClick={() =>{
                 if(isAnswerChecked){
                    return; // Prevent changing the answer if it's already checked
                 }
                 setAnswers((prev) => ({
                ...prev,
                [currentIndex]: prev[currentIndex] === "D" ? null : "D"
            }))}} className={`text-left rounded-xl border p-5 transition-all duration-200
    ${
        isAnswerChecked
              ? currentQuestion.correct_answer === "D"
               ? "border-green-500 bg-green-600/30 shadow-lg shadow-green-500/40"
                 : selectedOption === "D"
                 ? "border-red-500 bg-red-600/30 shadow-lg shadow-red-500/40"
                   : "border-white/10"
               : selectedOption === "D"
              ? "border-blue-500 bg-blue-600/30 shadow-lg shadow-blue-500/40"
               : "border-white/10 hover:bg-blue-500/20"
    }`}>
              <MathText text={`D. ${currentQuestion.option_d}`} />
            </button>

          </div>

         <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">

  {/* Previous */}
  <button
    disabled={currentIndex === 0}
    onClick={() => changeQuestion(currentIndex - 1)}
    className="flex items-center gap-2 rounded-xl bg-gray-700 px-6 py-3
               text-sm font-medium text-white transition
               hover:bg-gray-600
               disabled:cursor-not-allowed disabled:opacity-40"
  >
    <ChevronLeft size={18} />
    Previous
  </button>

  {/* Center buttons */}
  <div className="flex items-center gap-3">

    {/* Check Answer */}
    <button
      onClick={checkAnswer}
      className="rounded-xl bg-blue-600 px-6 py-3
                 text-sm font-semibold text-white transition
                 hover:bg-blue-500"
    >
      Check Answer
    </button>

    {/* Ask AI */}
    <button
      onClick={handleAskAI}
      disabled={aiLoading}
      className="flex items-center gap-2 rounded-xl
                 border border-purple-500/30
                 bg-purple-600 px-5 py-3
                 text-sm font-semibold text-white
                 transition-all duration-200
                 hover:bg-purple-500
                 disabled:cursor-not-allowed
                 disabled:opacity-50"
    >
      ✨
      {aiLoading ? "Thinking..." : "Ask AI"}
    </button>

  </div>

      {/* Next / End Practice */}
      {currentIndex !== questions.length - 1 ? (
    
        <button
          onClick={() => changeQuestion(currentIndex + 1)}
          className="flex items-center gap-2 rounded-xl bg-blue-600
                     px-6 py-3 text-sm font-semibold text-white
                     transition hover:bg-blue-500"
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
            className="rounded-xl bg-red-600 px-6 py-3
                       text-sm font-semibold text-white
                       transition hover:bg-red-500"
          >
            End Practice
        </button>
      
        )}
      </div>
        {explanation && (
  <div className="mt-6 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6">

    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
        <Sparkles size={20} className="text-purple-400" />
      </div>

      <div>
        <h2 className="font-semibold text-white">
          AI Explanation
        </h2>

        <p className="text-sm text-gray-400">
          Quick explanation
        </p>
      </div>
    </div>

    <div className="text-gray-300">
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
    
    </div>
  );
}