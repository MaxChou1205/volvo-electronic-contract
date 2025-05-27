import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { contractApi } from "@/api/contractApi";
import type { Contract } from "@/types/contractType";
import { useOrderStore } from "./orderStore";

export const useContractStore = defineStore("contract", {
  state: () => ({
    contract: {
      order: {},
    } as Contract,
  }),
  actions: {
    async initContract(orderId: string) {
      const orderStore = useOrderStore();
      let order = orderStore.orderDetail;
      if (!orderStore.orderDetail) {
        const result = await orderStore.getOrderDetail(orderId);
        if (!result) return;

        order = result;
      }

      this.contract = {
        contractNo: "",
        pdfUrl: "",
        email: "",
        contractDate: null,
        payModeName: "",
        loanRate: 0,
        interestSubsidy: 0,
        cashCheckNo: "",
        cc: "",
        powerSystem: "",
        factoryYear: null,
        origin: "",
        isSpecific: false,
        door: 0,
        seat: 0,
        sunroof: "無",
        gearShift: "",
        transmission: "",
        scheduledLicenseDate: null,
        isImported: null,
        deliveryLocation: null,
        showroom: "",
        deliveryCityId: null,
        deliveryCityName: "",
        deliveryDistrictId: null,
        deliveryDistrictName: "",
        deliveryAddress: "",
        order: order!,
        customerSignatureBase64: null,
        consultantSignatureBase64: null,
      };
    },
    async createContract(payload: Partial<Contract>) {
      try {
        const response = await contractApi.createContract(payload);
        this.contract = response.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err.response?.data);
        }
        throw err;
      }
    },
  },
});
