import { storeToRefs } from "pinia";
import { RouteLocation } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export const roleMiddleware = (to: RouteLocation) => {
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);

  if (
    !userInfo.value?.loginCurrentInfo?.roleList?.some(
      (role) => role.roleCode === to.meta?.role,
    )
  ) {
    return { name: "order" };
  }
  return true;
};
