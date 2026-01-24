import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1000/api/",
    withCredentials: true,
});