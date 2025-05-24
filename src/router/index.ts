import { createWebHistory, createRouter } from "vue-router";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { contractMiddleware } from "@/middlewares/contractMiddleware";
import CompanyMaintain from "@/views/CompanyMaintain.vue";
import ConfirmView from "@/views/ConfirmView.vue";
import ContractView from "@/views/ContractView.vue";
import FinishView from "@/views/FinishView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MemberInfo from "@/views/MemberInfo.vue";
import Model from "@/views/ModelStyle.vue";
import ModelStyleMaintain from "@/views/ModelStyleMaintain.vue";
import OrderInfo from "@/views/OrderInfo.vue";
import OrderView from "@/views/OrderView.vue";
import PaymentInfo from "@/views/PaymentInfo.vue";
import SetMaintain from "@/views/SetMaintain.vue";

const routes = [
  { name: "login", path: "/login", component: LoginView },
  {
    name: "home",
    path: "/",
    component: HomeView,
    redirect: "/order",
    children: [
      { name: "order", path: "/order", component: OrderView },
      { name: "orderinfo", path: "/order/:id", component: OrderInfo },
      { name: "contract", path: "/contract", component: ContractView },
      {
        name: "modelStyleMaintain",
        path: "/model-style-maintain",
        component: ModelStyleMaintain,
      },
      {
        name: "modelStyleMaintainAdd",
        path: "/model-style-maintain/add",
        component: ModelStyleMaintain,
      },
      {
        name: "modelStyleMaintainEdit",
        path: "/model-style-maintain/:id",
        component: ModelStyleMaintain,
      },
      {
        name: "setMaintain",
        path: "/set-maintain",
        component: SetMaintain,
      },
      {
        name: "companyMaintain",
        path: "/company-maintain",
        component: CompanyMaintain,
      },
    ],
    beforeEnter: [authMiddleware],
  },
  {
    name: "modelStyle",
    path: "/model-style/:orderId",
    component: Model,
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "memberInfo",
    path: "/member-info/:orderId",
    component: MemberInfo,
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "paymentInfo",
    path: "/payment-info/:orderId",
    component: PaymentInfo,
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "confirmView",
    path: "/contract-confirm/:orderId",
    component: ConfirmView,
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "finishView",
    path: "/contract-finish/:orderId",
    component: FinishView,
    beforeEnter: [authMiddleware, contractMiddleware],
  },
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
