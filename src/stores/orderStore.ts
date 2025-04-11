import { defineStore, acceptHMRUpdate } from "pinia";
import { orderApi } from "@/api/orderApi";
import type { ApiOrderListItem, OrderListItem } from "@/types/orderType";

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
    orderDetail: null as ApiOrderListItem | null,
  }),
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
      this.orderDetail = response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
