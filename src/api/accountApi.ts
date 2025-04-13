import { axiosInstance } from "@/utils/axios";

export const accountApi = {
  login: async (payload: { username: string; password: string }) => {
    const response = await axiosInstance.post(
      `/api/account/login?username=${payload.username}&password=${payload.password}`,
    );
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/api/account/logout");
    return response.data;
  },
};
