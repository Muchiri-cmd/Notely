import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  // baseURL: "http://192.168.1.122:3000/api",
  baseURL:"https://notely-backend-3ldy.onrender.com/",
  withCredentials: true,
});
