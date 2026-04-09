export interface ApiErrorDetail {
  message: string;
}

export interface ApiError {
  message?: string;
  details?: ApiErrorDetail[];
}

export interface ApiErrorResponse {
  error: ApiError;
}
