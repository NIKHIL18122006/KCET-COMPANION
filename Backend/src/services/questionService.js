import pool from "../config/db.js";

const getQuestions = async (subject, chapter, count) => {
    console.log("getQuestions service called with parameters:", { subject, chapter, count }); // Log when the getQuestions service is called
    const result = count === "All" 
        ? await pool.query("SELECT * FROM questions WHERE subject = $1 AND chapter = $2 ORDER BY RANDOM()", [subject, chapter])
        : await pool.query("SELECT * FROM questions WHERE subject = $1 AND chapter = $2 ORDER BY RANDOM() LIMIT $3", [subject, chapter, count]);
    console.log("Fetched questions:", result.rows); // Log the fetched questions
    return result.rows;
}

const getTest = async (subject) => {
    console.log("getQuestions service called with parameters:", subject);
    const result = await pool.query(
        "SELECT * FROM questions WHERE subject = $1",
        [subject]
    );

    const temp = result.rows;
    console.log("Fetched questions:", result.rows);
    const length = temp.length < 60 ? temp.length : 60;

    const questions = [];
    const selected = new Set();

    while (selected.size < length) {
        const idx = Math.floor(Math.random() * temp.length);

        if (!selected.has(idx)) {
            selected.add(idx);
            questions.push(temp[idx]);
        }
    }
    console.log("Fetched questions:", questions)
    return questions;
};

const getPyqs = async(subject , year) => {
    const result = await pool.query("SELECT * FROM questions WHERE subject = $1 AND pyq_year = $2",[subject,year]);
    const temp = result.rows;
    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
}
export default { getQuestions , getTest ,getPyqs};