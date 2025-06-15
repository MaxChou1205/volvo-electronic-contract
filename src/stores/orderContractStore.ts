import { AxiosError } from "axios";
import { format } from "date-fns";
import { defineStore, acceptHMRUpdate } from "pinia";
import { orderContractApi } from "@/api/orderContractApi";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import type { OrderContractListItem } from "@/types/orderContractType";
import type { OrderDetail, OrderDetailView } from "@/types/orderType";
import { useOptionStore } from "./optionStore";

export const useOrderContractStore = defineStore("orderContract", {
  state: () => ({
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
      orderNo: "",
      orderStatus: "",
      createDateStart: null,
      createDateEnd: null,
      vin: "",
      licenseDateStart: null,
      licenseDateEnd: null,
      dispatchedDateStart: null,
      dispatchedDateEnd: null,
      licenseNumber: "",
    },
    orderContractList: [] as OrderContractListItem[],
    orderContractDetail: null as OrderDetail | null,
  }),
  getters: {
    orderContractDetailView: (state): OrderDetailView | null => {
      const optionStore = useOptionStore();
      if (!state.orderContractDetail) {
        return null;
      } else {
        return {
          ...state.orderContractDetail,
          drawerCtCodeLabel:
            optionStore.customerTypes.find(
              (customerType) =>
                customerType.value ===
                state.orderContractDetail?.drawerCtCode?.toString(),
            )?.label ?? "",
          deliveringDate: new Date(
            state.orderContractDetail?.deliveringDate ?? "",
          ),
          deliveringDateLabel: state.orderContractDetail?.deliveringDate
            ? format(
                state.orderContractDetail.deliveringDate,
                "yyyy-MM-dd HH:mm:ss",
              )
            : "",
          isChargingPileLabel: state.orderContractDetail?.isChargingPile
            ? "是"
            : "否",
          isCashCheckLabel: state.orderContractDetail?.isCashCheck
            ? "是"
            : "否",
          checkDateLabel: state.orderContractDetail?.checkDate
            ? format(state.orderContractDetail.checkDate, "yyyy-MM-dd")
            : "",
          payModeLabel:
            optionStore.payModes.find(
              (payMode) =>
                payMode.value === Number(state.orderContractDetail?.payMode),
            )?.label ?? "",
          loanTermLabel:
            optionStore.loanTermsOptions.find(
              (loanTerm) =>
                loanTerm.value === String(state.orderContractDetail?.loanTerm),
            )?.label ?? "",
          depositPayWayLabel:
            optionStore.depositPayWaysOptions.find(
              (depositPayWay) =>
                depositPayWay.value ===
                state.orderContractDetail?.depositPayWay?.toString(),
            )?.label ?? "",
          orderStatusLabel:
            optionStore.orderStatusOptions.find(
              (orderStatus) =>
                orderStatus.value ===
                state.orderContractDetail?.orderStatus?.toString(),
            )?.label ?? "",
        };
      }
    },
  },
  actions: {
    async changeSort(sort: string, ascending: boolean) {
      this.sortInfo.sortBy = sort;
      this.sortInfo.sortAscending = ascending;
      this.getOrderContracts();
    },
    async resetFilter() {
      this.searchFilter = {
        customerNameOrPhone: "",
        orderNo: "",
        orderStatus: "",
        createDateStart: null,
        createDateEnd: null,
        vin: "",
        licenseDateStart: null,
        licenseDateEnd: null,
        dispatchedDateStart: null,
        dispatchedDateEnd: null,
        licenseNumber: "",
      };
    },
    async getOrderContracts() {
      const authStore = useAuthStore();
      const optionStore = useOptionStore();
      try {
        const response = await orderContractApi.getList({
          page: this.paginationInfo.page,
          pageSize: this.paginationInfo.pageSize,
          sort: {
            sortBy: this.sortInfo.sortBy,
            sortAscending: this.sortInfo.sortAscending,
          },
          filter: {
            customerNameOrPhone: this.searchFilter.customerNameOrPhone,
            orderNo: this.searchFilter.orderNo,
            orderStatus: this.searchFilter.orderStatus,
            createDateStart: this.searchFilter.createDateStart,
            createDateEnd: this.searchFilter.createDateEnd,
            vin: this.searchFilter.vin,
            licenseDateStart: this.searchFilter.licenseDateStart,
            licenseDateEnd: this.searchFilter.licenseDateEnd,
            dispatchedDateStart: this.searchFilter.dispatchedDateStart,
            dispatchedDateEnd: this.searchFilter.dispatchedDateEnd,
            licenseNumber: this.searchFilter.licenseNumber,
          },
        });
        this.orderContractList = response.items.map((item) => ({
          orderNo: item.orderNo,
          customerName: item.customerName,
          gender: item.gender,
          genderLabel:
            optionStore.genderOptions.find((gender) => {
              return gender.value === item.gender?.toString();
            })?.label ?? "先生",
        }));
        this.paginationInfo.totalItems = response.totalCount;
        this.paginationInfo.totalPage = response.totalPage;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 500) {
          authStore.logout();
        }
      }
    },
    async getOrderContractDetail(id: string) {
      try {
        const response = await orderContractApi.getDetail(id);
        this.orderContractDetail = {
          ...response,
          personalityOptionVOList:
            response.personalityOptionVOList?.map((item) => ({
              optionId: String(item.optionId),
              optionCode: item.optionCode,
              optionName: item.optionName,
              optionPrice: item.optionPrice,
              label: item.optionName,
              value: item.optionId,
              code: item.optionCode,
            })) || [],
          deliveringDate: new Date(response.deliveringDate),
          checkDate: response.checkDate ? new Date(response.checkDate) : null,
          drawerAddress: response.drawerAddress ?? "",
          initialPayment: response.initialPayment ?? 0,
          transferBankName: response.transferBankName ?? "",
          lastFiveBankAccount: response.lastFiveBankAccount ?? "",
          paymentBankName: response.paymentBankName ?? "",
          loanAmounts: response.loanAmounts ?? 0,
          selfPayOptionList: [],
          vehicleDealAllAmount: response.vehicleDealAllAmount ?? 0,
          vehicleRetailAllAmount: response.vehicleRetailAllAmount ?? 0,
          customerCertificateNo: response.customerCertificateNo ?? "",
          drawerCertificateNo: response.drawerCertificateNo ?? "",
        };
        return this.orderContractDetail;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 500) {
          alert("取得該訂單發生錯誤，請確認DMS內容");
          this.orderContractDetail = null;
          router.push({ name: "order" });
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useOrderContractStore, import.meta.hot),
  );
}
