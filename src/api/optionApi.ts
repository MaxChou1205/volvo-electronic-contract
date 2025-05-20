import { axiosInstance } from "@/utils/axios";

export const optionApi = {
  getPayModes: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsPayModes",
    );
    return response.data;
  },
  getCustomerTypes: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsCustomerTypes",
    );
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
  getGenders: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsGenders",
    );
    return response.data;
  },
  getLoanTerms: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsLoanTerms",
    );
    return response.data;
  },
  getDepositPayWays: async () => {
    const response = await axiosInstance.get<Record<string, string>>(
      "/api/Option/DmsDepositPayWays",
    );
    return response.data;
  },
};
