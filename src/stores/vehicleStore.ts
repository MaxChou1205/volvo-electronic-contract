import { defineStore } from "pinia";
import { vehicleApi } from "@/api/vehicleApi";
import type { VehicleInfo } from "@/types/vehicleType";

const defaultVehicleInfo: VehicleInfo = {
  id: 0,
  imageUrl: "",
  image: null,
  thumbnailUrl: "",
  thumbnail: null,
  modelId: null,
  modelCode: "",
  modelName: "",
  category: "",
  isPublished: false,
  createdAt: "",
  createdBy: "",
  modifiedAt: "",
  modifiedBy: "",
};

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    vehicleInfo: { ...defaultVehicleInfo },
    vehicleList: [] as VehicleInfo[],
    paginationInfo: {
      page: 1,
      totalPage: 0,
    },
  }),
  actions: {
    async saveVehicle(payload: VehicleInfo, id?: number) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === null || value === "" || key === "id") return;
        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (key === "isPublished") {
          formData.append("IsPublished", value.toString().toUpperCase());
        } else if (key === "image") {
          formData.append("Image", value.file);
        } else if (key === "thumbnail") {
          formData.append("Thumbnail", value.file);
        } else {
          formData.append(newKey, String(value));
        }
      });

      if (id) {
        await vehicleApi.updateVehicle(id, formData);
      } else {
        await vehicleApi.createVehicle(formData);
      }
    },
    async getVehicleList(
      page: number,
      size: number,
      orderBy: string = "modifiedAt",
      condition?: {
        modelId?: number;
        modelCode?: string;
        modelName?: string;
        isPublished?: boolean;
      },
    ) {
      const response = await vehicleApi.getVehicleList(
        page,
        size,
        orderBy,
        condition,
      );
      this.vehicleList = response.items;
      this.paginationInfo.totalPage = response.totalPage;
      return response;
    },
    async getVehicleDetail(id: number) {
      const response = await vehicleApi.getVehicleDetail(id);
      response.image = {
        file: null,
        url: response.imageUrl,
      };
      response.thumbnail = {
        file: null,
        url: response.thumbnailUrl,
      };
      this.vehicleInfo = response;
    },
    async deleteVehicle(id: number) {
      await vehicleApi.deleteVehicle(id);
    },
  },
});
