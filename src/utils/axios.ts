import axios from "axios";
import { useLoading } from "@/composables/loading";
import router from "@/router/index";

let requestCount = 0;
const loadingTimers: Record<string, number> = {};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  requestCount++;

  // Generate a unique ID for this request
  const requestId = Date.now().toString() + Math.random().toString();
  config.headers = config.headers || {};
  config.headers["request-id"] = requestId;

  loadingTimers[requestId] = window.setTimeout(() => {
    useLoading().open();
  }, 400);

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    requestCount--;

    const requestId = response.config.headers["request-id"];
    if (requestId && loadingTimers[requestId]) {
      clearTimeout(loadingTimers[requestId]);
      delete loadingTimers[requestId];
    }

    if (requestCount === 0) {
      useLoading().close();
    }

    return response;
  },
  (error) => {
    requestCount--;

    if (error.config?.headers?.["request-id"]) {
      const requestId = error.config.headers["request-id"];
      if (loadingTimers[requestId]) {
        clearTimeout(loadingTimers[requestId]);
        delete loadingTimers[requestId];
      }
    }

    if (requestCount === 0) {
      useLoading().close();
    }

    if (error.response?.data?.includes("Unauthorized")) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  },
);
