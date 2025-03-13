import { createWebHistory, createRouter } from "vue-router";
import ConfirmView from "@/views/ConfirmView.vue";
import MemberInfo from "@/views/MemberInfo.vue";
import Model from "@/views/ModelStyle.vue";
import PaymentInfo from "@/views/PaymentInfo.vue";

const routes = [
  { name: "modelStyle", path: "/", component: Model },
  { name: "memberInfo", path: "/member-info", component: MemberInfo },
  { name: "paymentInfo", path: "/payment-info", component: PaymentInfo },
  { name: "confirmView", path: "/contract-confirm", component: ConfirmView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
