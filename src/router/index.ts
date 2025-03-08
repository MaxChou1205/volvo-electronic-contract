import { createWebHistory, createRouter } from "vue-router";
import Model from "@/views/model.vue";

const routes = [{ path: "/", component: Model }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
