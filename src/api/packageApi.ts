import type { PackageListGetRes } from "@/types/packageType";
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
  getPackageList: async (page: number, size: number, orderBy?: string) => {
    const response = await axiosInstance.get<PackageListGetRes>(
      "/api/package",
      {
        params: {
          page,
          size,
          orderBy,
        },
      },
    );
    return response.data;
  },
};
