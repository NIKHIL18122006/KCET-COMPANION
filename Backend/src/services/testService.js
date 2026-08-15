import pool from "../config/db.js";

const saveTestResult = async (
  userId,
  subject,
  totalQuestions,
  correctAnswers,
  wrongAnswers
) => {
  const result = await pool.query(
    `INSERT INTO test_attempts
      (user_id, subject, total_questions, correct_answers, wrong_answers)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      userId,
      subject,
      totalQuestions,
      correctAnswers,
      wrongAnswers
    ]
  );

  return result.rows[0];
};

const getTestStats = async (userId) => {
  const result = await pool.query(
    `SELECT
       COUNT(*) AS tests_attempted,
       COALESCE(SUM(correct_answers), 0) AS total_correct,
       COALESCE(SUM(wrong_answers), 0) AS total_wrong
     FROM test_attempts
     WHERE user_id = $1`,
    [userId]
  );

  const stats = result.rows[0];

  const attempted =
    Number(stats.total_correct) + Number(stats.total_wrong);

  const accuracy =
    attempted === 0
      ? 0
      : (Number(stats.total_correct) / attempted) * 100;

  return {
    testsAttempted: Number(stats.tests_attempted),
    accuracy: Number(accuracy.toFixed(2))
  };
};

export default {
  saveTestResult,
  getTestStats
};