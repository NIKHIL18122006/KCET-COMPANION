import aiService from "../services/aiService.js";

export const explainQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    const explanation = await aiService.explainQuestion(question);

    res.json({
      explanation,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "Failed to generate AI explanation",
    });
  }
};