import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getTokenLocalStorage } from "@/utils/auth";

const token = getTokenLocalStorage();

const api = axios.create({
  baseURL: "https://31a7-186-227-185-108.ngrok-free.app/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

interface IApiError {
  message?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const handleRequest = async <T>(
  request: AxiosRequestConfig
): Promise<IApiResponse<T>> => {
  try {
    const response = await api(request);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<IApiError>;
    const errorMessage =
      axiosError.response?.data?.message || "An unknown error occurred";

    console.error("API Error:", errorMessage);

    throw new Error(errorMessage);
  }
};
