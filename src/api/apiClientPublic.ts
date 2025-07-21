import axios from "axios";

const apiClientPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apiClientPublic;
