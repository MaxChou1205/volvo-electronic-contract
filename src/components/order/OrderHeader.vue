<template>
  <div>
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">訂單管理</h1>
      <div class="flex items-stretch">
        <div class="flex items-center border border-gray-300 px-4 py-3">
          <Icon class="mr-2" iconName="magnifier" :size="24" />
          <input
            class="appearance-none outline-none"
            type="text"
            placeholder="搜尋客戶姓名/手機"
          />
        </div>
        <button
          class="bg-blue-brand flex cursor-pointer items-center rounded-tr-xl rounded-br-xl px-4 py-3"
          type="button"
        >
          <Icon iconName="magnifier-white" :size="24" />
        </button>
        <button
          class="ml-3 flex cursor-pointer items-center"
          @click="toggleFilterMenu"
        >
          <Icon iconName="menu" :size="24" />
        </button>
      </div>
    </header>

    <ul
      class="sticky top-[90px] flex items-center justify-evenly bg-white px-4 text-sm"
    >
      <li
        class="min-w-[130px] cursor-pointer pb-2 text-center"
        v-for="item in sortList"
        :key="item.value"
        :class="{ 'border-b-2 border-blue-500': item.value === sort }"
        @click="changeSort(item.value)"
      >
        {{ item.label }}
      </li>
      <li class="flex cursor-pointer items-center pb-2 text-center">
        <Icon class="mr-1" iconName="sort" :size="20" />
        排序
      </li>
    </ul>

    <!-- Backdrop overlay -->
    <div
      class="fixed inset-0 z-20 bg-black opacity-50 transition-opacity"
      v-if="isFilterMenuOpen"
      @click="toggleFilterMenu"
    ></div>

    <!-- filter menu -->
    <div
      :class="[
        'fixed top-0 right-0 z-30 h-full w-150 transform overflow-y-scroll bg-white shadow-lg transition-transform',
        isFilterMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="p-4">
        <FilterMenu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FilterMenu from "@/components/order/FilterMenu.vue";

const sortList = ref([
  {
    label: "訂單創建日",
    value: "createDate",
  },
  {
    label: "訂單提交日",
    value: "submitDate",
  },
  {
    label: "訂單編號",
    value: "id",
  },
]);
const sort = ref("createDate");

const changeSort = (param: string) => {
  sort.value = param;
};

const isFilterMenuOpen = ref(false);
const toggleFilterMenu = () => {
  isFilterMenuOpen.value = !isFilterMenuOpen.value;

  if (isFilterMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};
</script>

<style scoped></style>
