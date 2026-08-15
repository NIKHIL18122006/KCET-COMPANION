import api from "./api";

export const explainQuestion = async(question) => {
    try{
        const response = await api.post("/ai/explain",{
            question,
        });
        return response.data.explanation;
    }catch(error){
        console.error(error);
        alert(error);
    }
}
