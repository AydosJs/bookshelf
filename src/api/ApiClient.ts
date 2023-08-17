import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const clientConfig: AxiosRequestConfig = {
  timeout: 40000,
};

clientConfig.baseURL = "https://no23.lavina.tech";

const httpAxios: AxiosInstance = axios.create(clientConfig);

export function post<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.post(url, data);
}

export function put<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.put(url, data);
}

// Add a response interceptor
httpAxios.interceptors.response.use(
  (response) => {
    console.log("[axios interceptor][1] - resp : ", response?.data?.data);
    return response?.data?.data;
  },
  (error: AxiosError) => {
    if (error?.response?.status == 401) {
      Cookies.remove("token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
