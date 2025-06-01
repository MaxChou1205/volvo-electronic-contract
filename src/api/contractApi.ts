import type { Contract } from "@/types/contractType";
import { axiosInstance } from "@/utils/axios";

export const contractApi = {
  createContract: async (
    payload: Partial<
      Omit<Contract, "deliveryCityId" | "deliveryDistrictId"> & {
        deliveryCityId: string | null;
        deliveryDistrictId: string | null;
      }
    >,
  ) => {
    const response = await axiosInstance.post("/api/contract", payload);
    return response.data;
  },
};
