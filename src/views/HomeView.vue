<template>
  <div class="text-black-400 grid w-full grid-cols-[250px_1fr]">
    <aside
      class="flex h-full flex-col border-r-1 border-gray-100 bg-white pt-13"
    >
      <div class="flex px-6">
        <div>
          <Icon iconName="user" :size="55" />
        </div>
        <div class="ml-4">
          <div class="mb-1">KT001</div>
          <div>林愛酷</div>
        </div>
      </div>
      <div class="mt-15 flex-1 overflow-y-auto">
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          :class="[$route.path.startsWith('/order') ? 'bg-blue-200' : '']"
          active-class="bg-blue-200"
          :to="{ name: 'order' }"
        >
          <Icon icon-name="orderManagement" :size="20" />
          <span class="ml-3">訂單管理</span>
        </RouterLink>
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          :class="[$route.path.startsWith('/contract') ? 'bg-blue-200' : '']"
          activeClass="bg-blue-200"
          :to="{ name: 'contract' }"
        >
          <Icon icon-name="contractManagement" :size="20" />
          <span class="ml-3">合約管理</span>
        </RouterLink>
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          :class="[
            $route.path.startsWith('/model-style-maintain')
              ? 'bg-blue-200'
              : '',
          ]"
          activeClass="bg-blue-200"
          :to="{ name: 'modelStyleMaintain' }"
        >
          <Icon icon-name="car" :size="20" />
          <span class="ml-3">車款維護</span>
        </RouterLink>
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          :class="[
            $route.path.startsWith('/set-maintain') ? 'bg-blue-200' : '',
          ]"
          activeClass="bg-blue-200"
          :to="{ name: 'setMaintain' }"
        >
          <Icon icon-name="set" :size="20" />
          <span class="ml-3">優惠套組維護</span>
        </RouterLink>
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          :class="[
            $route.path.startsWith('/company-maintain') ? 'bg-blue-200' : '',
          ]"
          activeClass="bg-blue-200"
          :to="{ name: 'companyMaintain' }"
        >
          <Icon icon-name="company" :size="20" />
          <span class="ml-3">經銷商維護</span>
        </RouterLink>
      </div>
      <div class="py-4 pr-4">
        <button class="button-white w-full" @click="logout">登出</button>
      </div>
    </aside>

    <div
      class="bg-gray-100 bg-[url(/src/assets/img/logo2.png)] bg-center bg-no-repeat"
      style="background-size: 130px 130px"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
const menu = ref<string>("");

const changeMenu = (param: string) => {
  menu.value = param;
  router.push({ name: param });
};

const logout = () => {
  const authStore = useAuthStore();
  authStore.logout();
};
</script>

<style scoped></style>
