import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import crypto from "crypto-js";

const clientConfig: AxiosRequestConfig = {
  timeout: 40000,
};

clientConfig.baseURL = "https://no23.lavina.tech";

const httpAxios: AxiosInstance = axios.create(clientConfig);

export function get<T>(url: string, params?: unknown): Promise<T> {
  return httpAxios.get(url, { params });
}

export function post<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.post(url, data);
}

export function put<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.put(url, data);
}

export function patch<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.patch(url, data);
}

httpAxios.interceptors.request.use(
  (config) => {
    if (config.url !== "/signup") {
      const key = Cookies.get("key");
      const secret = Cookies.get("Secret");
      if (key && secret) {
        const txt = `${String(config.method).toUpperCase()}${config.url}${
          config.data ? JSON.stringify(config.data) : ""
        }${secret}`;

        const val = crypto.MD5(txt);
        const sign = val;
        console.log("lol", txt);

        config.headers["Key"] = key;
        config.headers["Sign"] = sign;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpAxios.interceptors.response.use(
  (response) => {
    console.log("[axios interceptor][1] - resp : ", response?.data?.data);
    return response?.data?.data;
  },
  (error: AxiosError) => {
    if (error?.response?.status == 401) {
      Cookies.remove("key");
      Cookies.remove("Secret");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
