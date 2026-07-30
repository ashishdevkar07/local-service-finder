// Automatically uses Render URL on Vercel, or fallback to localhost during local dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("API URL being used:", API_URL);

export default API_URL;