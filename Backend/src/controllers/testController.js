import testService from "../services/testService.js";

export const saveTestResult = async (req, res) => {
  try {
    const { subject, totalQuestions, correctAnswers, wrongAnswers } = req.body;
    console.log("hello");
    const userId = req.user.id;

    const result = await testService.saveTestResult(
      userId,
      subject,
      totalQuestions,
      correctAnswers,
      wrongAnswers
    );

    res.status(201).json(result);

  } catch (error) {
    console.error("Error saving test result:", error);

    res.status(500).json({
      error: "Failed to save test result"
    });
  }
};

export const getTestStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await testService.getTestStats(userId);

    res.json(stats);

  } catch (error) {
    console.error("Error fetching test stats:", error);

    res.status(500).json({
      error: "Failed to fetch test statistics"
    });
  }
};