import { ApiPaginationResponse } from "@/types/apiType";
import type { ApiOrderDetail, ApiOrderListItem } from "@/types/orderType";
import { axiosInstance } from "@/utils/axios";

export const orderApi = {
  getList: async (params: {
    page: number;
    pageSize: number;
    sort: {
      sortBy: string;
      sortAscending: boolean;
    };
    filter: {
      customerNameOrPhone?: string | null;
      orderNo?: string | null;
      orderStatus?: string | null;
      createDateStart?: Date | null;
      createDateEnd?: Date | null;
      vin?: string | null;
      licenseDateStart?: Date | null;
      licenseDateEnd?: Date | null;
      dispatchedDateStart?: Date | null;
      dispatchedDateEnd?: Date | null;
      licenseNumber?: string | null;
    };
  }) => {
    const transformedSort = {
      OrderBy: params.sort.sortBy,
      Ascending: params.sort.sortAscending,
    };
    const transformedFilter = Object.entries(params.filter).reduce(
      (acc, [key, value]) => {
        if (value) {
          const newKey = key.charAt(0).toUpperCase() + key.slice(1);
          acc[`Filter.${newKey}`] = value;
        }
        return acc;
      },
      {},
    );

    const response = await axiosInstance.get<
      ApiPaginationResponse<ApiOrderListItem>
    >("/api/order", {
      params: {
        PageNumber: params.page,
        PageSize: params.pageSize,
        ...transformedSort,
        ...transformedFilter,
      },
    });
    return response.data;
  },
  getDetail: async (id: string) => {
    const response = await axiosInstance.get<ApiOrderDetail>(
      `/api/order/${id}`,
    );
    return response.data;
  },
};
