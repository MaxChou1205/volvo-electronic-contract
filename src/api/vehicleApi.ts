import type { VehicleInfoGetRes, VehicleListGetRes } from "@/types/vehicleType";
import { axiosInstance } from "@/utils/axios";

export const vehicleApi = {
  createVehicle: async (payload: any) => {
    const response = await axiosInstance.post("/api/vehicle", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getVehicleList: async (
    page: number,
    size: number,
    orderBy?: string,
    condition?: {
      modelId?: number;
      modelCode?: string;
      modelName?: string;
      isPublished?: boolean;
      publishedDateStart?: string;
      publishedDateEnd?: string;
    },
  ) => {
    const response = await axiosInstance.get<VehicleListGetRes>(
      "/api/vehicle",
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
            PublishedDateStart: condition?.publishedDateStart,
            PublishedDateEnd: condition?.publishedDateEnd,
          }),
        },
      },
    );
    return response.data;
  },
  getVehicleDetail: async (id: number) => {
    const response = await axiosInstance.get<VehicleInfoGetRes>(
      `/api/vehicle/${id}`,
    );
    return response.data;
  },
  updateVehicle: async (id: number, payload: any) => {
    const response = await axiosInstance.put(`/api/vehicle/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  deleteVehicle: async (id: number) => {
    const response = await axiosInstance.delete(`/api/vehicle/${id}`);
    return response.data;
  },
};
