import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/recipe/recipes",
});

export default axiosInstance;
