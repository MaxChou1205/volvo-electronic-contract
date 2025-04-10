import { defineStore } from "pinia";
import { accountApi } from "@/api/accountApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    async login(params: { username: string; password: string }) {
      await accountApi.login(params);
    },
    logout() {
      this.isLogin = false;
    },
  },
});
