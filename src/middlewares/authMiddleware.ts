import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

export const authMiddleware = async () => {
  const authStore = useAuthStore();
  const { userInfo, isLogin } = storeToRefs(authStore);

  if (!userInfo.value) {
    await authStore.getInfo();
  }
  if (!isLogin.value) {
    return { name: "login" };
  }
};
