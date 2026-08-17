import axios from "axios";

const api = axios.create({
    baseURL: "https://kcet-companion-g1kv.onrender.com/api",
    withCredentials: true,
});

export default api;