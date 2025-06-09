import { createWebHistory, createRouter } from "vue-router";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { contractMiddleware } from "@/middlewares/contractMiddleware";
import { roleMiddleware } from "@/middlewares/roleMiddleware";

const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    name: "home",
    path: "/",
    component: () => import("@/views/HomeView.vue"),
    redirect: "/order",
    children: [
      {
        name: "order",
        path: "/order",
        component: () => import("@/views/OrderView.vue"),
      },
      {
        name: "orderinfo",
        path: "/order/:id",
        component: () => import("@/views/OrderInfo.vue"),
      },
      {
        name: "contract",
        path: "/contract",
        component: () => import("@/views/ContractView.vue"),
      },
      {
        name: "modelStyleMaintain",
        path: "/model-style-maintain",
        component: () => import("@/views/ModelStyleMaintainList.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "modelStyleMaintainAdd",
        path: "/model-style-maintain/add",
        component: () => import("@/views/ModelStyleMaintain.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "modelStyleMaintainEdit",
        path: "/model-style-maintain/:id",
        component: () => import("@/views/ModelStyleMaintain.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "setMaintain",
        path: "/set-maintain",
        component: () => import("@/views/SetMaintainList.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "setMaintainAdd",
        path: "/set-maintain/add",
        component: () => import("@/views/SetMaintain.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "setMaintainEdit",
        path: "/set-maintain/:id",
        component: () => import("@/views/SetMaintain.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [2, 3, 4],
        },
      },
      {
        name: "companyMaintain",
        path: "/company-maintain",
        component: () => import("@/views/CompanyMaintain.vue"),
        beforeEnter: [roleMiddleware],
        meta: {
          roles: [3, 4],
        },
      },
    ],
    beforeEnter: [authMiddleware],
  },
  {
    name: "modelStyle",
    path: "/model-style/:orderId",
    component: () => import("@/views/ModelStyle.vue"),
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "memberInfo",
    path: "/member-info/:orderId",
    component: () => import("@/views/MemberInfo.vue"),
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "paymentInfo",
    path: "/payment-info/:orderId",
    component: () => import("@/views/PaymentInfo.vue"),
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "confirmView",
    path: "/contract-confirm/:orderId",
    component: () => import("@/views/ConfirmView.vue"),
    beforeEnter: [authMiddleware, contractMiddleware],
  },
  {
    name: "finishView",
    path: "/contract-finish/:orderId",
    component: () => import("@/views/FinishView.vue"),
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
