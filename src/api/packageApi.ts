import { axiosInstance } from "@/utils/axios";

export const packageApi = {
  createPackage: async (payload: any) => {
    const response = await axiosInstance.post("/api/package", payload);
    return response.data;
  },
};
