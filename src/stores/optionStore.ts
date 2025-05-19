import { defineStore } from "pinia";
import { optionApi } from "@/api/optionApi";

export const useOptionStore = defineStore("option", {
  state: () => ({
    payModes: [],
    contractStatusOptions: [] as { label: string; value: string }[],
    orderStatusOptions: [] as { label: string; value: string }[],
  }),
  actions: {
    async fetchPayModes() {
      const response = await optionApi.getPayModes();
      this.payModes = response;
      return response;
    },
    async getContractStatus() {
      const response = await optionApi.getContractStatus();
      this.contractStatusOptions = Object.entries(response).map(
        ([key, value]) => ({
          label: value,
          value: key,
        }),
      );
      return response;
    },
    async getOrderStatus() {
      const response = await optionApi.getOrderStatus();
      this.orderStatusOptions = Object.entries(response).map(
        ([key, value]) => ({
          label: value,
          value: key,
        }),
      );
      return response;
    },
  },
});
