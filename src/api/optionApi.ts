import { axiosInstance } from "@/utils/axios";

export const optionApi = {
  getPayModes: async () => {
    const response = await axiosInstance.get("/api/Option/DmsPayModes");
    return response.data;
  },
};
