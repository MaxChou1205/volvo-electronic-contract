import type { ApiPaginationResponse } from "@/types/apiType";
import type { CompanyInfo } from "@/types/companyType";
import { axiosInstance } from "@/utils/axios";

export const companyApi = {
  getCompanyList: async (page: number, size: number, orderBy: string) => {
    const response = await axiosInstance.get<
      ApiPaginationResponse<CompanyInfo>
    >("/api/company", {
      params: {
        page,
        size,
        orderBy,
      },
    });
    return response.data;
  },

  getCompanyDetail: async (code: string) => {
    const response = await axiosInstance.get<CompanyInfo>(
      `/api/company/${code}`,
    );
    return response.data;
  },

  createCompany: async (payload: any) => {
    const response = await axiosInstance.post("/api/company", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCompany: async (id: number, payload: any) => {
    const response = await axiosInstance.put(`/api/company/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteCompany: async (id: number) => {
    const response = await axiosInstance.delete(`/api/company/${id}`);
    return response.data;
  },
};
