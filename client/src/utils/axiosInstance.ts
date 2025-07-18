import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://44aaec387b9d.ngrok-free.app/api",
  withCredentials: true,
});
