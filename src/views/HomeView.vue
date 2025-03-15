<template>
  <div class="text-black-400 grid w-full grid-cols-[250px_1fr]">
    <aside class="border-r-1 border-gray-100 bg-white pt-13">
      <div class="flex px-6">
        <div>
          <Icon iconName="user" :size="55" />
        </div>
        <div class="ml-4">
          <div class="mb-1">KT001</div>
          <div>林愛酷</div>
        </div>
      </div>
      <div class="mt-15">
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          exact-active-class="bg-blue-200"
          :to="{ name: 'order' }"
        >
          <Icon icon-name="orderManagement" :size="20" />
          <span class="ml-3">訂單管理</span>
        </RouterLink>
        <RouterLink
          class="flex w-full cursor-pointer items-center border-b border-gray-100 px-6 py-4 hover:bg-blue-200"
          exact-active-class="bg-blue-200"
          :to="{ name: 'contract' }"
        >
          <Icon icon-name="contractManagement" :size="20" />
          <span class="ml-3">合約管理</span>
        </RouterLink>
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

const router = useRouter();
const menu = ref<string>("");

const changeMenu = (param: string) => {
  menu.value = param;
  router.push({ name: param });
};
</script>

<style scoped></style>
