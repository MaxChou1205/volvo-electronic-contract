import { defineStore } from "pinia";
import { packageApi } from "@/api/packageApi";
import type { PackageInfo } from "@/types/packageType";

export const usePackageStore = defineStore("package", {
  state: () => ({
    packageInfo: {
      packageOptions: [] as {
        optionId: string;
        optionCode: string;
        optionName: string;
        optionPrice: number;
        value: string;
        label: string;
        code: string;
      }[],
    } as Omit<PackageInfo, "packageOptions"> & {
      packageOptions: {
        optionId: string;
        optionCode: string;
        optionName: string;
        optionPrice: number;
        value: string;
        label: string;
        code: string;
      }[];
    },
  }),
  actions: {
    async createPackage(payload: PackageInfo) {
      await packageApi.createPackage(payload);
    },
  },
});
