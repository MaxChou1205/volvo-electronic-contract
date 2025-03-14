<template>
  <div
    class="text-black-400 grid h-screen w-full grid-cols-[250px_1fr] bg-gray-50"
  >
    <aside class="bg-white pt-13">
      <div class="flex px-6">
        <div>
          <svg
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="27.5" cy="27.5" r="27.5" fill="#284E80" />
            <path
              d="M27.9458 15.45C24.6397 15.45 21.95 18.1397 21.95 21.4458C21.95 24.7519 24.6397 27.4416 27.9458 27.4416C31.2519 27.4416 33.9416 24.7519 33.9416 21.4458C33.9416 18.1397 31.2519 15.45 27.9458 15.45ZM27.9458 26.0203C25.4234 26.0203 23.3713 23.9681 23.3713 21.4458C23.3713 18.9234 25.4234 16.8713 27.9458 16.8713C30.4681 16.8713 32.5203 18.9234 32.5203 21.4458C32.5203 23.9681 30.4681 26.0203 27.9458 26.0203Z"
              fill="white"
              stroke="white"
              stroke-width="0.1"
            />
            <path
              d="M36.2117 31.9594C34.4047 30.1892 32.0093 29.2144 29.4667 29.2144H26.5333C23.9907 29.2144 21.5953 30.1892 19.7883 31.9594C17.9902 33.7209 17 36.0461 17 38.5068C17 38.8976 17.3283 39.2144 17.7333 39.2144H38.2667C38.6717 39.2144 39 38.8976 39 38.5068C39 36.0461 38.0098 33.7209 36.2117 31.9594ZM18.4989 37.7993C18.8663 33.7858 22.3294 30.6294 26.5333 30.6294H29.4667C33.6706 30.6294 37.1337 33.7858 37.5011 37.7993H18.4989Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="ml-4">
          <div class="mb-1">KT001</div>
          <div>林愛酷</div>
        </div>
      </div>
      <div class="mt-15">
        <button
          class="flex w-full cursor-pointer items-center border-b border-gray-50 px-6 py-4 hover:bg-blue-200"
          :class="{ 'bg-blue-200': menu === 'order' }"
          type="button"
          @click="changeMenu('order')"
        >
          <img src="@/assets/icon/orderManagement.svg" alt="order" />
          <span class="ml-3">訂單管理</span>
        </button>
        <button
          class="flex w-full cursor-pointer items-center border-b border-gray-50 px-6 py-4 hover:bg-blue-200"
          :class="{ 'bg-blue-200': menu === 'contract' }"
          type="button"
          @click="changeMenu('contract')"
        >
          <img src="@/assets/icon/contractManagement.svg" alt="order" />
          <span class="ml-3">合約管理</span>
        </button>
      </div>
    </aside>
    <main class="relative">
      <img
        class="absolute top-1/2 left-1/2 h-[130px] w-[130px] -translate-1/2"
        src="@/assets/img/logo2.png"
        alt="bg-logo"
      />

      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const menu = ref<string>("");

const changeMenu = (param: string) => {
  menu.value = param;
  router.push({ name: param });
};
</script>

<style scoped></style>
