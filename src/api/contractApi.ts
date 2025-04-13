import type { Contract } from "@/types/contractType";
import { axiosInstance } from "@/utils/axios";

export const contractApi = {
  createContract: async (payload: Partial<Contract>) => {
    const response = await axiosInstance.post("/api/contract", payload);
    return response.data;
  },
};
