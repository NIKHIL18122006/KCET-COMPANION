import questionService from "../services/questionService.js";

export const getQuestions = async (req, res) => {
    try{
        console.log("getQuestions controller called"); // Log when the getQuestions controller is called
        const {subject, chapter,count} = req.query;
       console.log("Received query parameters:", { subject, chapter, count }); // Log the received query parameters
        const questions = await questionService.getQuestions(subject, chapter,count);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}