import { ApiPaginationResponse } from "@/types/apiType";
import { ApiOrderListItem } from "@/types/orderType";
import { axiosInstance } from "@/utils/axios";

export const orderApi = {
  getList: async (params: {
    sortBy: string;
    sortAscending: boolean;
    page: number;
    pageSize: number;
  }) => {
    const response = await axiosInstance.get<
      ApiPaginationResponse<ApiOrderListItem>
    >("/api/order", {
      params: {
        PageNumber: params.page,
        PageSize: params.pageSize,
        sortBy: params.sortBy,
        sortAscending: params.sortAscending,
      },
    });
    return response.data;
  },
  getDetail: async (id: string) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },
};
