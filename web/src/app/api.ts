import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: "/api"
})

api.interceptors.response.use(
    r => r, 
    e => e.response
)

export default api;