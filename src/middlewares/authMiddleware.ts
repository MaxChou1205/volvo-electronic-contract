import { useAuthStore } from "@/stores/authStore";

export const authMiddleware = () => {
  const authStore = useAuthStore();
  if (!authStore.isLogin) {
    return { name: "login" };
  }
};
