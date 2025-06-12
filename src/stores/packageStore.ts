import { defineStore } from "pinia";
import { packageApi } from "@/api/packageApi";
import type { PackageInfo } from "@/types/packageType";

export const usePackageStore = defineStore("package", {
  state: () => ({
    packageInfo: {
      packageDmsOptions: [] as {
        optionId: string;
        optionCode: string;
        optionName: string;
        optionPrice: number;
        value: string;
        label: string;
        code: string;
      }[],
      packageOptions: [] as {
        name: string;
        price: number;
      }[],
    } as PackageInfo,
    packageList: [] as PackageInfo[],
  }),
  actions: {
    async createPackage(payload: PackageInfo) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        formData.append(newKey, value);
      });

      await packageApi.createPackage(formData);
    },
    async getPackageList(page: number, size: number, orderBy?: string) {
      const response = await packageApi.getPackageList(page, size, orderBy);
      this.packageList = response.items.map((item) => ({
        ...item,
        image: null,
        modelColorName: "",
      }));
    async deletePackage(id: number) {
      await packageApi.deletePackage(id);
    },
  },
});
