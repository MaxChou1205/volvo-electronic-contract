import { axiosInstance } from "@/utils/axios";

export const optionApi = {
  getPayModes: async () => {
    const response = await axiosInstance.get("/api/Option/DmsPayModes");
    return response.data;
  },
  getOrderStatus: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsSoStatus",
    );
    return response.data;
  },
  getContractStatus: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/ContractStatus",
    );
    return response.data;
  },
};
