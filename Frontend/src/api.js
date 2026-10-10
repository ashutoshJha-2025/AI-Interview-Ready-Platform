import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    throw new Error("VITE_API_URL must be set in the frontend environment.");
}

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;