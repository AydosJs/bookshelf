import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import Cache from "../utils/cacheUtils";
import { Md5 } from "ts-md5";

const clientConfig: AxiosRequestConfig = {
  timeout: 40000,
};

clientConfig.baseURL = "https://no23.lavina.tech";

const httpAxios: AxiosInstance = axios.create(clientConfig);

export function get<T>(
  url: string,
  params?: unknown,
  hasCache = true
): Promise<T> {
  if (hasCache && Cache.has(url)) {
    return Promise.resolve(Cache.get(url) as T);
  }
  return httpAxios.get(url, { params });
}

export function post<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.post(url, data);
}

export function put<T>(url: string, data?: unknown): Promise<T> {
  return httpAxios.put(url, data);
}

axios.interceptors.request.use(
  function (config) {
    const key = Cookies.get("key");
    const Secret = Cookies.get("Secret");
    const sign = Md5.hashStr(
      `${config.method}${config.url}${config.data}${Secret}`
    );

    const lol = `${config.method}${config.url}${config.data}${Secret}`;
    console.log("lol", lol);

    console.log("Request before -- ", key, config);
    if (key) {
      config.headers["Key"] = key;
      config.headers["Sign"] = sign;
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
      Cookies.remove("token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
