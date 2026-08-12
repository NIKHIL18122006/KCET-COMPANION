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

export const getTest = async (req,res) =>{
    try{
        console.log("getTest controller called");
        const {subject} = req.query;
        console.log("Received query parameters:", subject);
        const questions = await questionService.getTest(subject);
        res.json(questions);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPyqs = async (req, res) => {
  try {
    const { subject, year } = req.query;

    const yearInt = Number(year);

    if (!subject || !year || !Number.isInteger(yearInt)) {
      return res.status(400).json({
        error: "Valid subject and year are required",
      });
    }

    const questions = await questionService.getPyqs(
      subject,
      yearInt
    );

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};