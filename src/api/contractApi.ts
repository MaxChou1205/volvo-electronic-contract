import { ApiPaginationResponse } from "@/types/apiType";
import type { ApiContractListItem, Contract } from "@/types/contractType";
import type { OrderDetail } from "@/types/orderType";
import { axiosInstance } from "@/utils/axios";

export const contractApi = {
  getList: async (params: {
    page: number;
    pageSize: number;
    sort: {
      sortBy: string;
      sortAscending: boolean;
    };
    filter: {
      customerNameOrPhone?: string | null;
      contractNo?: string | null;
      contractStatus?: string | null;
      createDateStart?: Date | null;
      createDateEnd?: Date | null;
    };
  }) => {
    const transformedSort = {
      OrderBy: params.sort.sortBy,
      Ascending: params.sort.sortAscending,
    };
    const transformedFilter = Object.entries(params.filter).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[`filter.${key}`] = value;
        }
        return acc;
      },
      {},
    );

    const response = await axiosInstance.get<
      ApiPaginationResponse<ApiContractListItem>
    >(`/api/contract`, {
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
    const response = await axiosInstance.get(`/api/contract/${id}`);
    return response.data;
  },
  createContract: async (
    payload: Partial<
      Omit<Contract, "deliveryCityId" | "deliveryDistrictId" | "order"> & {
        deliveryCityId: string | null;
        deliveryDistrictId: string | null;
        order: Partial<
          Omit<OrderDetail, "checkDate"> & {
            checkDate: string | null;
          }
        >;
      }
    >,
  ) => {
    const response = await axiosInstance.post("/api/contract", payload);
    return response.data;
  },
};
