import axios from "axios";

interface IApiErrorResponse {
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<IApiErrorResponse>(error)) {
    const apiMessage = error.response?.data?.message;

    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};
