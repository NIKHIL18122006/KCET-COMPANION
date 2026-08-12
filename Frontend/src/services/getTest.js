import api from "./api"


export const getTest = async (subject) =>{
    try{
        const response = await api.get("/questions/test",{
            params:{
                subject
            }
        })
        return response.data;
    } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}