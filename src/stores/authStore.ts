import { defineStore } from "pinia";
import { accountApi } from "@/api/accountApi";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  getters: {
    isLogin: (state) => {
      return !!window.sessionStorage.getItem("isLogin");
    },
  },
  actions: {
    async login(params: { username: string; password: string }) {
      await accountApi.login(params);
      window.sessionStorage.setItem("isLogin", "true");
    },
    logout() {
      window.sessionStorage.removeItem("isLogin");
      router.push({ name: "login" });
    },
  },
});
