import { createWebHistory, createRouter } from "vue-router";
import MemberInfo from "@/views/MemberInfo.vue";
import Model from "@/views/ModelStyle.vue";

const routes = [
  { name: "modelStyle", path: "/", component: Model },
  { name: "memberInfo", path: "/member-info", component: MemberInfo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
