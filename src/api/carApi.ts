import { ApiResponse } from "@/types/apiType";
import type {
  CarConfig,
  CarList,
  CarYear,
  CarColor,
  CarTrim,
  CarOption,
} from "@/types/carType";
import { axiosInstance } from "@/utils/axios";

export const carApi = {
  getCarList: async () => {
    const response =
      await axiosInstance.post<ApiResponse<CarList[]>>("/api/car");
    return response.data.data;
  },
  getCarYears: async (modelId: string) => {
    const response = await axiosInstance.post<ApiResponse<CarYear[]>>(
      "/api/car/years",
      { modelId },
    );
    return response.data.data;
  },
  getCarConfigs: async (modelId: string, year: string) => {
    const response = await axiosInstance.post<ApiResponse<CarConfig[]>>(
      "/api/car/configs",
      { modelId, modelYearId: year },
    );
    return response.data.data;
  },
  getCarColors: async (year: string, config: string) => {
    const response = await axiosInstance.post<ApiResponse<CarColor[]>>(
      "/api/car/colors",
      { modelYearCode: year, modelConfigCode: config },
    );
    return response.data.data;
  },
  getCarTrims: async (year: string, config: string, color: string) => {
    const response = await axiosInstance.post<ApiResponse<CarTrim[]>>(
      "/api/car/trims",
      {
        modelYearCode: year,
        modelConfigCode: config,
        modelColorCode: color,
      },
    );
    return response.data.data;
  },
  getCarOptions: async (
    year: string,
    config: string,
    color: string,
    trim: string,
  ) => {
    const response = await axiosInstance.post<ApiResponse<CarOption[]>>(
      "/api/car/options",
      {
        modelYearCode: year,
        modelConfigCode: config,
        modelColorCode: color,
        modelTrimCode: trim,
      },
    );
    return response.data.data;
  },
};
