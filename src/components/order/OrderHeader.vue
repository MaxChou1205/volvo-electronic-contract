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
            v-model="orderStore.searchFilter.customerNameOrPhone"
            type="text"
            placeholder="搜尋客戶姓名/手機"
            @keyup.enter="handleMenuConfirm()"
          />
        </div>
        <button
          class="bg-blue-brand flex cursor-pointer items-center rounded-tr-xl rounded-br-xl px-4 py-3"
          type="button"
          @click="handleMenuConfirm()"
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
        class="group relative min-w-[130px] cursor-pointer pb-2 text-center"
        v-for="item in sortList"
        :key="item.value"
        :class="{
          'font-medium text-blue-500':
            item.value === orderStore.sortInfo.sortBy,
        }"
        @click="
          orderStore.changeSort(item.value, orderStore.sortInfo.sortAscending)
        "
      >
        {{ item.label }}
        <div
          class="absolute bottom-0 left-0 h-0.5 w-full transform-gpu transition-all duration-300 ease-out"
          :class="
            item.value === orderStore.sortInfo.sortBy
              ? 'scale-x-100 bg-blue-500'
              : 'scale-x-0 bg-transparent group-hover:scale-x-100 group-hover:bg-gray-300'
          "
        ></div>
      </li>
      <li
        class="flex cursor-pointer items-center pb-2 text-center"
        @click="
          orderStore.changeSort(
            orderStore.sortInfo.sortBy,
            !orderStore.sortInfo.sortAscending,
          )
        "
      >
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
        <FilterMenu @reset="handleMenuReset" @confirm="handleMenuConfirm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FilterMenu from "@/components/order/FilterMenu.vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const sortList = [
  {
    label: "訂單創建日",
    value: "createdAt",
  },
  {
    label: "訂單編號",
    value: "soNo",
  },
];

const isFilterMenuOpen = ref(false);
const toggleFilterMenu = () => {
  isFilterMenuOpen.value = !isFilterMenuOpen.value;

  if (isFilterMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const handleMenuReset = () => {
  orderStore.resetFilter();
};

const handleMenuConfirm = () => {
  orderStore.paginationInfo.page = 1;
  orderStore.getOrders();
  isFilterMenuOpen.value = false;
};
</script>

<style scoped lang="scss"></style>
