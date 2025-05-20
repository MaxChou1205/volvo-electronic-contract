import { defineStore } from "pinia";
import { optionApi } from "@/api/optionApi";

export const useOptionStore = defineStore("option", {
  state: () => ({
    payModes: [] as { label: string; value: string }[],
    customerTypes: [] as { label: string; value: string }[],
    contractStatusOptions: [] as { label: string; value: string }[],
    orderStatusOptions: [] as { label: string; value: string }[],
    genderOptions: [] as { label: string; value: string }[],
    loanTermsOptions: [] as { label: string; value: string }[],
    depositPayWaysOptions: [] as { label: string; value: string }[],
  }),
  actions: {
    async getPayModes() {
      const response = await optionApi.getPayModes();
      this.payModes = Object.entries(response).map(([key, value]) => ({
        label: value,
        value: key,
      }));
      return response;
    },
    async getCustomerTypes() {
      const response = await optionApi.getCustomerTypes();
      this.customerTypes = Object.entries(response).map(([key, value]) => ({
        label: value,
        value: key,
      }));
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
    async getGenders() {
      const response = await optionApi.getGenders();
      this.genderOptions = Object.entries(response).map(([key, value]) => ({
        label: value,
        value: key,
      }));
      return response;
    },
    async getLoanTerms() {
      const response = await optionApi.getLoanTerms();
      this.loanTermsOptions = Object.entries(response).map(([key, value]) => ({
        label: value,
        value: key,
      }));
      return response;
    },
    async getDepositPayWays() {
      const response = await optionApi.getDepositPayWays();
      this.depositPayWaysOptions = Object.entries(response).map(
        ([key, value]) => ({
          label: value,
          value: key,
        }),
      );
      return response;
    },
  },
});
