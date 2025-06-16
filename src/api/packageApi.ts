import type { PackageInfoGetRes, PackageListGetRes } from "@/types/packageType";
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
  getPackageList: async (
    page: number,
    size: number,
    orderBy?: string,
    condition?: {
      modelId?: number;
      modelCode?: number;
      modelName?: number;
      isPublished?: boolean;
    },
  ) => {
    const response = await axiosInstance.get<PackageListGetRes>(
      "/api/package",
      {
        params: {
          PageNumber: page,
          PageSize: size,
          OrderBy: orderBy,
          ...(condition && {
            ModelId: condition?.modelId,
            ModelCode: condition?.modelCode,
            ModelName: condition?.modelName,
            IsPublished: condition?.isPublished,
          }),
        },
      },
    );
    return response.data;
  },
  getPackageDetail: async (id: number) => {
    const response = await axiosInstance.get<PackageInfoGetRes>(
      `/api/package/${id}`,
    );
    return response.data;
  },
  updatePackage: async (id: number, payload: any) => {
    const response = await axiosInstance.put(`/api/package/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  deletePackage: async (id: number) => {
    const response = await axiosInstance.delete(`/api/package/${id}`);
    return response.data;
  },
};
