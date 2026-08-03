import pool from "../config/db.js";

const getQuestions = async (subject, chapter, count) => {
    console.log("getQuestions service called with parameters:", { subject, chapter, count }); // Log when the getQuestions service is called
    const result = await pool.query(
        "SELECT * FROM questions WHERE subject = $1 AND chapter = $2 ORDER BY RANDOM() LIMIT $3",
        [subject, chapter, count]
    );
     console.log("Fetched questions:", result.rows); // Log the fetched questions
    return result.rows;
}

export default { getQuestions };