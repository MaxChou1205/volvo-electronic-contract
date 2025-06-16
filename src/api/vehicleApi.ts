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
  getVehicleList: async (page: number, size: number, orderBy?: string) => {
    const response = await axiosInstance.get<VehicleListGetRes>(
      "/api/vehicle",
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
