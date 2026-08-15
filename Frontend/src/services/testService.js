import api from "./api";

export const saveTestResult = async ({
  subject,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
}) => {
  try {
    const response = await api.post("/tests/result", {
      subject,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
    });

    return response.data;
  } catch (error) {
    console.error("Error saving test result:", error);
    throw error;
  }
};

export const getTestStats = async () => {
  try {
    const response = await api.get("/tests/stats");

    return response.data;
  } catch (error) {
    console.error("Error fetching test stats:", error);
    throw error;
  }
};