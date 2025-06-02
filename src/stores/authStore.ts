import { defineStore } from "pinia";
import { accountApi } from "@/api/accountApi";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userInfo: null as {
      userId: number;
      employeeName: string;
      employeeNo: string;
      userCode: string;
      companyId: number;
      companyCode: string;
      ownerId: number;
      ownerCode: string;
      ownerParCode: string;
      orgType: number;
      dataType: number;
      orgId: number;
      orgIds: string;
      loginWay: string;
      locale: string;
      empId: number;
      appRole: string;
      groupCode: string;
      userOrgId: number;
      uuid: string;
      headPortrait: string;
      loginCurrentInfo: {
        orgType: number;
        orgId: number;
        orgName: string;
        orgIds: string;
        userOrgId: number;
        roleList: {
          roleId: number;
          roleCode: string;
          roleName: string;
        }[];
        loginWay: string;
      };
      lineId: string;
      lineStatus: number;
      userUid: string;
      lineUrl: string;
      nickName: string;
      introduction: string;
      qrCodeUrl: string;
    } | null,
  }),
  getters: {
    isLogin: (state) => {
      return !!window.sessionStorage.getItem("isLogin");
    },
    isAdmin: (state) => {
      return state.userInfo?.loginCurrentInfo?.roleList?.some(
        (role) => role.roleCode === "VCTL-ADMIN",
      );
    },
  },
  actions: {
    async login(params: { username: string; password: string }) {
      await accountApi.login(params);
      window.sessionStorage.setItem("isLogin", "true");
    },
    async logout() {
      await accountApi.logout();
      window.sessionStorage.removeItem("isLogin");
      this.userInfo = null;
      router.push({ name: "login" });
    },
    async getInfo() {
      const response = await accountApi.getInfo();
      this.userInfo = response;
      return response;
    },
  },
});
