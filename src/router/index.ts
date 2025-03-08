import { createWebHistory, createRouter } from "vue-router";
import Model from "@/views/ModelStyle.vue";

const routes = [{ path: "/", component: Model }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
