import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.baseURL = `${process.env.UNI_CAMPUS_API_URL}`;
  config.headers["Accept"] = "application/json";

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
