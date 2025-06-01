import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { contractApi } from "@/api/contractApi";
import type { Contract, ApiContractListItem } from "@/types/contractType";
import { useOrderStore } from "./orderStore";

export const useContractStore = defineStore("contract", {
  state: () => ({
    contract: {
      order: {},
    } as Contract,
    sortInfo: {
      sortBy: "createdAt",
      sortAscending: false,
    },
    paginationInfo: {
      page: 1,
      pageSize: 8,
      totalPage: 0,
      totalItems: 0,
    },
    searchFilter: {
      customerNameOrPhone: "",
      contractNo: "",
      contractStatus: "",
      createDateStart: null,
      createDateEnd: null,
    },
    contractList: [] as ApiContractListItem[],
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
        const params = {
          ...payload,
          deliveryCityId: payload.deliveryCityId
            ? String(payload.deliveryCityId)
            : null,
          deliveryDistrictId: payload.deliveryDistrictId
            ? String(payload.deliveryDistrictId)
            : null,
        };
        const response = await contractApi.createContract(params);
        this.contract = response.data;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.data.errors) {
          alert(JSON.stringify(err.response?.data.errors));
        }
        throw err;
      }
    },
    async changeSort(sort: string, ascending: boolean) {
      this.sortInfo.sortBy = sort;
      this.sortInfo.sortAscending = ascending;
      this.getContractList();
    },
    async resetFilter() {
      this.searchFilter = {
        customerNameOrPhone: "",
        contractNo: "",
        contractStatus: "",
        createDateStart: null,
        createDateEnd: null,
      };
    },
    async getContractList() {
      const response = await contractApi.getList({
        page: this.paginationInfo.page,
        pageSize: this.paginationInfo.pageSize,
        sort: {
          sortBy: this.sortInfo.sortBy,
          sortAscending: this.sortInfo.sortAscending,
        },
        filter: {
          customerNameOrPhone: this.searchFilter.customerNameOrPhone,
          contractNo: this.searchFilter.contractNo,
          contractStatus: this.searchFilter.contractStatus,
          createDateStart: this.searchFilter.createDateStart,
          createDateEnd: this.searchFilter.createDateEnd,
        },
      });
      this.contractList = response.items;
    },
    async getContractDetail(id: string) {
      const response = await contractApi.getDetail(id);
      this.contract = response.data;
    },
  },
});
