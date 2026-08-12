import api from "./api"

export const getPyqs = async (subject,year) => {
    try{
    const response = await api.get("/questions/pyqs",{
        params:{
            subject,
            year
        }
    });
    console.log(response.data);
    return response.data;
    }catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
    }

}