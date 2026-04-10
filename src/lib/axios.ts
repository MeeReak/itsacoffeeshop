import axios, { AxiosInstance } from 'axios';
import { ApiErrorResponse } from '@/types';

export let mAxios: AxiosInstance;

const API_VERSION = '2026-01-01';

export const getAxios = () => {
  if (mAxios) return mAxios;

  const newAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  // Request Interceptor: Automatically append api-version
  newAxios.interceptors.request.use((config) => {
    config.params = {
      ...config.params,
      'api-version': API_VERSION,
    };
    return config;
  });

  newAxios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const isDev = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true';

        // Extract clean error message from ApiErrorResponse
        const apiError = (error.response?.data as ApiErrorResponse)?.error;
        const message =
          apiError?.details?.[0]?.message ||
          apiError?.message ||
          error.message ||
          'Something went wrong';

        if (isDev) {
          console.warn(`[Axios Interceptor] Status ${status}`, {
            message,
            data: error.response?.data,
          });
        }

        // Redirect only for auth / permission issues
        if (status === 401) window.location.href = '/no-access';
        if (status === 403) window.location.href = '/no-permission';

        // Wrap the error message so hooks can catch it cleanly
        return Promise.reject(new Error(message));
      }

      return Promise.reject(error);
    },
  );

  mAxios = newAxios;
  return mAxios;
};
