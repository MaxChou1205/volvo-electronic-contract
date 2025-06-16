import { defineStore } from "pinia";
import { packageApi } from "@/api/packageApi";
import type { PackageInfo } from "@/types/packageType";

const defaultPackageInfo = {
  id: 0,
  packageName: "",
  packageDmsOptions: [],
  packageOptions: [],
  image: null,
  imageUrl: "",
  modelId: 0,
  modelCode: "",
  modelName: "",
  modelYearId: "",
  modelYearCode: "",
  modelYearName: "",
  modelConfigId: "",
  modelConfigCode: "",
  modelConfigName: "",
  modelColorId: "",
  modelColorCode: "",
  modelColorName: "",
  modelTrimId: "",
  modelTrimCode: "",
  modelTrimName: "",
  vehicleRetailAllAmount: 0,
  vehicleDealAllAmount: 0,
  isPublished: false,
} as PackageInfo;

export const usePackageStore = defineStore("package", {
  state: () => ({
    packageInfo: { ...defaultPackageInfo } as PackageInfo,
    packageList: [] as PackageInfo[],
  }),
  actions: {
    async savePackage(payload: PackageInfo, id?: number) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (key === "packageDmsOptions") {
          value.forEach((item, index) => {
            formData.append(
              `PackageDmsOptions[${index}].OptionId`,
              item.optionId,
            );
            formData.append(
              `PackageDmsOptions[${index}].OptionCode`,
              item.optionCode,
            );
            formData.append(
              `PackageDmsOptions[${index}].OptionName`,
              item.optionName,
            );
            formData.append(
              `PackageDmsOptions[${index}].OptionPrice`,
              item.optionPrice,
            );
          });
        } else if (key === "packageOptions") {
          value.forEach((item, index) => {
            if (!item.name || !item.price) return;
            formData.append(`PackageOptions[${index}].OptionId`, item.name);
            formData.append(`PackageOptions[${index}].OptionCode`, item.name);
            formData.append(`PackageOptions[${index}].OptionName`, item.name);
            formData.append(`PackageOptions[${index}].OptionPrice`, item.price);
          });
        } else if (key === "image" && value) {
          formData.append("Image", value.file);
        } else {
          formData.append(newKey, value);
        }
      });

      if (id) {
        await packageApi.updatePackage(id, formData);
      } else {
        await packageApi.createPackage(formData);
      }
    },
    async getPackageList(
      page: number,
      size: number,
      orderBy: string = "modifiedAt",
    ) {
      const response = await packageApi.getPackageList(page, size, orderBy);
      this.packageList = response.items.map((item) => ({
        ...item,
        image: null,
        modelColorName: "",
      }));
      return response;
    },
    async getPackageDetail(id: number) {
      const response = await packageApi.getPackageDetail(id);
      this.packageInfo = {
        ...response,
        packageDmsOptions: response.packageDmsOptions.map((item) => ({
          ...item,
          value: item.optionId,
          label: item.optionName,
          code: item.optionCode,
        })),
        packageOptions: response.packageOptions.map((item) => ({
          ...item,
          name: item.optionName,
          price: item.optionPrice,
        })),
        image: {
          file: null,
          url: response.imageUrl,
        },
      };
    },
    resetPackageInfo() {
      this.packageInfo = {
        ...defaultPackageInfo,
      };
    },
    async deletePackage(id: number) {
      await packageApi.deletePackage(id);
    },
  },
});
