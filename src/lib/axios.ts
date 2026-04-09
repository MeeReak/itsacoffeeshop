import axios, { AxiosInstance } from 'axios';

export let mAxios: AxiosInstance;

export const getAxios = () => {
  if (mAxios) return mAxios;

  const newAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  newAxios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (axios.isAxiosError(error)) {
        // ✅ Use axios.isAxiosError
        const status = error.response?.status;
        const isDev = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true';

        if (isDev) {
          console.warn(
            `[Axios Interceptor] Status ${status}`,
            error.response?.data,
          );
          return Promise.reject(error);
        }

        // Redirect only for auth / permission issues
        if (status === 401) window.location.href = '/no-access';
        if (status === 403) window.location.href = '/no-permission';

        // Let other errors (like 404 or validation errors) pass to the caller
        return Promise.reject(error);
      }

      // Non-Axios errors (rare)
      return Promise.reject(error);
    },
  );

  mAxios = newAxios;
  return mAxios;
};
