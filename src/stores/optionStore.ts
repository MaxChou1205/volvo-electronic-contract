import { defineStore } from "pinia";
import { optionApi } from "@/api/optionApi";

export const useOptionStore = defineStore("option", {
  state: () => ({
    payModes: [],
  }),
  actions: {
    async fetchPayModes() {
      const response = await optionApi.getPayModes();
      this.payModes = response;
    },
  },
});
