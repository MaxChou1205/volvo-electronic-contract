import { axiosInstance } from "@/utils/axios";

export const accountApi = {
  login: async (payload: { username: string; password: string }) => {
    const response = await axiosInstance.post(
      `/api/accountservice/login?username=${payload.username}&password=${payload.password}`,
    );
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/api/accountservice/logout");
    return response.data;
  },
};
