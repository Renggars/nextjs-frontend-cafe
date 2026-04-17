import axios from "axios";

const axiosInstance = axios.create({
  // Mengambil URL dari .env, jika tidak ada pakai default localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Contoh: Menambahkan token otomatis jika sudah ada sistem login
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
