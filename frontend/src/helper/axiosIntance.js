import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/", // Backend API base URL
  headers: {
      "Content-Type": "application/json", // Default headers
  },
  withCredentials:true
});