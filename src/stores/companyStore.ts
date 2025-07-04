import { defineStore } from "pinia";
import { companyApi } from "@/api/companyApi";
import type { CompanyInfo } from "@/types/companyType";
import { TheFile } from "@/types/fileType";

export const useCompanyStore = defineStore("company", {
  state: () => ({
    companyList: [] as CompanyInfo[],
    companyInfo: {
      id: 0,
      code: "",
      name: "",
      ownerName: "",
      taxId: "",
      phone: "",
      address: "",
      largeSealUrl: "",
      largeSeal: null,
      smallSealUrl: "",
      smallSeal: null,
      agreementUrl: "",
      agreement: null,
      nonDisclosureAgreementUrl: "",
      nonDisclosureAgreement: null,
      membershipTermsUrl: "",
      membershipTerms: null,
      createdAt: "",
      createdBy: "",
      modifiedAt: "",
      modifiedBy: "",
    } as CompanyInfo,
    paginationInfo: {
      page: 1,
      totalPage: 0,
    },
  }),
  actions: {
    async getCompanyList(
      page: number,
      size: number,
      orderBy: string = "modifiedAt",
    ) {
      const response = await companyApi.getCompanyList(page, size, orderBy);
      this.companyList = response.items;
      this.paginationInfo.totalPage = response.totalPage;
      return response;
    },

    async saveCompany(payload: CompanyInfo, id?: number) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (
          value === null ||
          value === "" ||
          (value as TheFile)?.file === null ||
          key === "id" ||
          key === "largeSealUrl" ||
          key === "smallSealUrl" ||
          key === "agreementUrl" ||
          key === "nonDisclosureAgreementUrl" ||
          key === "membershipTermsUrl"
        )
          return;

        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (
          key === "largeSeal" ||
          key === "smallSeal" ||
          key === "agreement" ||
          key === "nonDisclosureAgreement" ||
          key === "membershipTerms"
        ) {
          formData.append(newKey, (value as TheFile).file!);
        } else {
          formData.append(newKey, String(value));
        }
      });

      if (id) {
        await companyApi.updateCompany(id, formData);
      } else {
        await companyApi.createCompany(formData);
      }
    },

    async getCompanyDetail(code: string) {
      if (!code) return;
      const response = await companyApi.getCompanyDetail(code);
      this.companyInfo = {
        ...response,
        largeSeal: {
          file: null,
          url: response.largeSealUrl,
          fileName: response.largeSealUrl,
        },
        smallSeal: {
          file: null,
          url: response.smallSealUrl,
          fileName: response.smallSealUrl,
        },
        agreement: {
          file: null,
          url: `${import.meta.env.VITE_PDF_PATH}${response.agreementUrl}`,
          fileName: response.agreementUrl,
        },
        nonDisclosureAgreement: {
          file: null,
          url: `${import.meta.env.VITE_PDF_PATH}${response.nonDisclosureAgreementUrl}`,
          fileName: response.nonDisclosureAgreementUrl,
        },
        membershipTerms: {
          file: null,
          url: `${import.meta.env.VITE_PDF_PATH}${response.membershipTermsUrl}`,
          fileName: response.membershipTermsUrl,
        },
      };
    },

    async deleteCompany(id: number) {
      await companyApi.deleteCompany(id);
    },
  },
});
