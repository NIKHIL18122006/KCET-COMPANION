import api from "./api";

export const getQuestion = async (subject, chapter, questionCount) => {
  try {
    const response = await api.get(`/questions?subject=${subject}&chapter=${chapter}&count=${questionCount}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Failed to fetch questions. Please try again later.");
    throw error;
  }
};