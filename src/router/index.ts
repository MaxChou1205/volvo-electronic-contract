import { createWebHistory, createRouter } from "vue-router";
import ConfirmView from "@/views/ConfirmView.vue";
import ContractView from "@/views/ContractView.vue";
import FinishView from "@/views/FinishView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MemberInfo from "@/views/MemberInfo.vue";
import Model from "@/views/ModelStyle.vue";
import OrderInfo from "@/views/OrderInfo.vue";
import OrderView from "@/views/OrderView.vue";
import PaymentInfo from "@/views/PaymentInfo.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { name: "login", path: "/login", component: LoginView },
  {
    name: "home",
    path: "/",
    component: HomeView,
    children: [
      { name: "order", path: "/order", component: OrderView },
      { name: "orderinfo", path: "/order/:id", component: OrderInfo },
      { name: "contract", path: "/contract", component: ContractView },
    ],
  },
  { name: "modelStyle", path: "/model", component: Model },
  { name: "memberInfo", path: "/member-info", component: MemberInfo },
  { name: "paymentInfo", path: "/payment-info", component: PaymentInfo },
  { name: "confirmView", path: "/contract-confirm", component: ConfirmView },
  { name: "finishView", path: "/contract-finish", component: FinishView },
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
