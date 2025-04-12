import { format } from "date-fns";
import { defineStore, acceptHMRUpdate } from "pinia";
import { orderApi } from "@/api/orderApi";
import type {
  OrderDetail,
  OrderDetailView,
  OrderListItem,
} from "@/types/orderType";

export const customerTypeMap = {
  15231001: "個人",
  15231002: "公司",
  15231003: "租賃",
};

export const useOrderStore = defineStore("order", {
  state: () => ({
    sortInfo: {
      sortBy: "createdAt",
      sortAscending: true,
    },
    paginationInfo: {
      page: 1,
      pageSize: 100,
    },
    orderList: [] as OrderListItem[],
    orderDetail: null as OrderDetail | null,
  }),
  getters: {
    orderDetailView: (state): OrderDetailView | null => {
      if (!state.orderDetail) {
        return null;
      } else {
        return {
          ...state.orderDetail,
          customerTypeLabel:
            customerTypeMap[state.orderDetail?.customerType ?? 15231001],
          deliveringDate: new Date(state.orderDetail?.deliveringDate ?? ""),
          deliveringDateLabel: state.orderDetail?.deliveringDate
            ? format(state.orderDetail.deliveringDate, "yyyy-MM-dd HH:mm:ss")
            : "",
          isChargingPileLabel: state.orderDetail?.isChargingPile ? "是" : "否",
          isCashCheckLabel: state.orderDetail?.isCashCheck ? "是" : "否",
          checkDateLabel: state.orderDetail?.checkDate
            ? format(state.orderDetail.checkDate, "yyyy-MM-dd")
            : "",
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
    async getOrders() {
      const response = await orderApi.getList({
        page: this.paginationInfo.page,
        pageSize: this.paginationInfo.pageSize,
        sortBy: this.sortInfo.sortBy,
        sortAscending: this.sortInfo.sortAscending,
      });
      this.orderList = response.items.map((item) => ({
        orderNo: item.orderNo,
        customerName: item.customerName,
        gender: item.gender,
        genderLabel: item.gender === 10021001 ? "先生" : "小姐",
      }));
    },
    async getOrderDetail(id: string) {
      const response = await orderApi.getDetail(id);
      this.orderDetail = {
        ...response,
        deliveringDate: new Date(response.deliveringDate),
        checkDate: response.checkDate ? new Date(response.checkDate) : null,
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
