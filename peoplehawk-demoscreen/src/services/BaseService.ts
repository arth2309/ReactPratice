import axios, { AxiosError, AxiosInstance } from "axios";
import { getToken } from "../utils/manageAccessToken";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);



