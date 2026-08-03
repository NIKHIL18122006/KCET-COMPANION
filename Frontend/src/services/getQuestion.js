import api from "./api";

export const getQuestion = async (subject, chapter, questionCount) => {
  try {
    const response = await api.get("/questions", {
      params: {
        subject,
        chapter,
        count: questionCount,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};