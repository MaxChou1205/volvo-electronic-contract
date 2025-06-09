import { RouteLocation } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export const roleMiddleware = (to: RouteLocation) => {
  const authStore = useAuthStore();

  const roles = to.meta?.roles as number[];
  if (roles.some((role) => authStore[`permissionLevel${role}`])) {
    return true;
  }
  return { name: "order" };
};
