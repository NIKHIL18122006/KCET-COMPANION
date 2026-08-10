import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MathText from "../components/MathText";

export default function PracticeSession() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.questions) {
    return <Navigate to="/session" replace />;
  }

  const { subject, chapter, questions } = state;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});

  const selectedOption = answers[currentIndex] || null;
  const isAnswerChecked = checkedQuestions[currentIndex] || false;
  
  const currentQuestion = questions[currentIndex];
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {subject} - {chapter}
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

          <div className="flex justify-between mt-10">

            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-6 py-3 rounded-xl bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
                onClick = {checkAnswer}
                className="px-6 py-3 rounded-xl bg-blue-600 disabled:opacity-50"
            >
                Check Answer
            </button>
            {currentIndex !== questions.length - 1 ? (
              <button
              onClick={() => {
                setCurrentIndex(currentIndex + 1)
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>) : (
            <button 
               onClick = {() => navigate("/session" , { state: { subject: state.subject, chapter: state.chapter } })}
                className="px-6 py-3 rounded-xl bg-red-600"
            >
              End Practice
            </button>)
            }
          </div>

        </div>

      </div>

    </div>
  );
}