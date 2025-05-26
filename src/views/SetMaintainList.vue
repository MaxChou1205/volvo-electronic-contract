<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">優惠套組維護</h1>
      <div class="flex justify-end">
        <router-link class="button-blue" :to="{ name: 'setMaintainAdd' }"
          >新增</router-link
        >
      </div>
    </header>

    <main class="overflow-auto p-4">
      <div class="" v-if="data.length > 0">
        <div class="mx-auto max-w-6xl">
          <div class="overflow-hidden rounded-lg bg-white shadow-sm">
            <table class="w-full">
              <thead class="">
                <tr class="bg-blue-brand text-white">
                  <th
                    class="border-blue-brand border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    款式
                  </th>
                  <th
                    class="border-blue-brand border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    型號
                  </th>
                  <th
                    class="border-blue-brand border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    套組名稱
                  </th>
                  <th
                    class="border-blue-brand border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    狀態
                  </th>
                  <th
                    class="border-blue-brand border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    設定
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-50"
                  v-for="(vehicle, index) in data"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
                >
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.type }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.model }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.name }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    <span
                      :class="[vehicle.status === '下架' && 'text-gray-500']"
                      >{{ vehicle.status }}</span
                    >
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-3">
                      <router-link
                        class="button-blue"
                        :to="{
                          name: 'setMaintainEdit',
                          params: { id: vehicle.id },
                        }"
                      >
                        修改
                      </router-link>
                      <button class="button-gray">刪除</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        class="flex h-[400px] items-center justify-center p-20"
        v-if="data.length === 0"
      >
        <div class="text-center leading-[400px]">
          <h3 class="text-xl font-medium text-gray-900">
            沒有找到符合條件的車型樣式
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            請嘗試其他搜尋條件或新增車型樣式
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="paginationInfo.totalPage > 1"
        :currentPage="paginationInfo.page"
        :totalPages="paginationInfo.totalPage"
        @update:page="onPageChange"
      ></Pagination>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Pagination from "@/components/Pagination.vue";

const data = ref([
  {
    id: 1,
    type: "休旅車",
    model: "XC40",
    name: "套組1",
    status: "上架",
  },
  {
    id: 2,
    type: "休旅車",
    model: "XC40",
    name: "套組2",
    status: "上架",
  },
  {
    id: 3,
    type: "轎跑車",
    model: "EX60",
    name: "套組3",
    status: "上架",
  },
  {
    id: 4,
    type: "休旅車",
    model: "XC90",
    name: "套組4",
    status: "下架",
  },
]);

const paginationInfo = ref({
  page: 1,
  totalPage: 2,
});

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
};
</script>

<style scoped></style>
