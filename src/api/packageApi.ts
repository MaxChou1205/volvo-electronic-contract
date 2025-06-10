import type { PackageInfoPostReq } from "@/types/packageType";
import { axiosInstance } from "@/utils/axios";

export const packageApi = {
  createPackage: async (payload: any) => {
    const response = await axiosInstance.post("/api/package", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
