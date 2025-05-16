import axios from "axios";



// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;





const API_BASE_URL = "http://localhost:5001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Base URL for API requests
  headers: {
    "Content-Type": "application/json", // Default header for JSON requests
  },
  withCredentials: true, // Include cookies and sessions
});

// Request Interceptor: Automatically attach the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle errors in the request configuration
    return Promise.reject(error);
  }
);



export default api;
