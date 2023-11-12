import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { Cookies } from "react-cookie";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const cookies = new Cookies();
  const token = cookies.get(process.env.ACCESS_TOKEN_KEY ?? "x");

  config.baseURL = `${process.env.UNI_CAMPUS_API_URL}/api`;
  config.headers["Accept"] = "application/json";
  config.headers["Authorization"] = `Bearer ${token ?? "x"}`;

  console.info(`[⚡ request] [${config.method}:${config.url}]`, config);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[📛 request error]`, error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[🔥 response] `, response);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[📛 response error]`, error);
  return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
