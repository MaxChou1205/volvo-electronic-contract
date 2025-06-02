import { AxiosError } from "axios";
import { format } from "date-fns";
import { defineStore, acceptHMRUpdate } from "pinia";
import { orderApi } from "@/api/orderApi";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import type {
  OrderDetail,
  OrderDetailView,
  OrderListItem,
} from "@/types/orderType";
import { useOptionStore } from "./optionStore";

export const useOrderStore = defineStore("order", {
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
    orderList: [] as OrderListItem[],
    orderDetail: null as OrderDetail | null,
  }),
  getters: {
    orderDetailView: (state): OrderDetailView | null => {
      const optionStore = useOptionStore();
      if (!state.orderDetail) {
        return null;
      } else {
        return {
          ...state.orderDetail,
          customerTypeLabel:
            optionStore.customerTypes.find(
              (customerType) =>
                customerType.value ===
                state.orderDetail?.customerType?.toString(),
            )?.label ?? "",
          deliveringDate: new Date(state.orderDetail?.deliveringDate ?? ""),
          deliveringDateLabel: state.orderDetail?.deliveringDate
            ? format(state.orderDetail.deliveringDate, "yyyy-MM-dd HH:mm:ss")
            : "",
          isChargingPileLabel: state.orderDetail?.isChargingPile ? "是" : "否",
          isCashCheckLabel: state.orderDetail?.isCashCheck ? "是" : "否",
          checkDateLabel: state.orderDetail?.checkDate
            ? format(state.orderDetail.checkDate, "yyyy-MM-dd")
            : "",
          payModeLabel:
            optionStore.payModes.find(
              (payMode) => payMode.value === Number(state.orderDetail?.payMode),
            )?.label ?? "",
          loanTermLabel:
            optionStore.loanTermsOptions.find(
              (loanTerm) =>
                loanTerm.value === String(state.orderDetail?.loanTerm),
            )?.label ?? "",
          depositPayWayLabel:
            optionStore.depositPayWaysOptions.find(
              (depositPayWay) =>
                depositPayWay.value ===
                state.orderDetail?.depositPayWay?.toString(),
            )?.label ?? "",
          orderStatusLabel:
            optionStore.orderStatusOptions.find(
              (orderStatus) =>
                orderStatus.value ===
                state.orderDetail?.orderStatus?.toString(),
            )?.label ?? "",
        };
      }
    },
  },
  actions: {
    async changeSort(sort: string, ascending: boolean) {
      this.sortInfo.sortBy = sort;
      this.sortInfo.sortAscending = ascending;
      this.getOrders();
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
    async getOrders() {
      const authStore = useAuthStore();
      const optionStore = useOptionStore();
      try {
        const response = await orderApi.getList({
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
        this.orderList = response.items.map((item) => ({
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
    async getOrderDetail(id: string) {
      try {
        const response = await orderApi.getDetail(id);
        this.orderDetail = {
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
        return this.orderDetail;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 500) {
          alert("取得該訂單發生錯誤，請確認DMS內容");
          this.orderDetail = null;
          router.push({ name: "order" });
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
