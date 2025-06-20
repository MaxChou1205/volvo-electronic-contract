<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">車款維護</h1>
      <div class="flex justify-end">
        <router-link class="button-blue" :to="{ name: 'modelStyleMaintainAdd' }"
          >新增</router-link
        >
      </div>
    </header>

    <main class="overflow-auto p-4">
      <div class="" v-if="vehicleList.length > 0">
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
                  v-for="(vehicle, index) in vehicleList"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
                >
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.category }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.modelName }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    <span
                      :class="[
                        vehicle.isPublished === false && 'text-gray-500',
                      ]"
                      >{{ vehicle.isPublished ? "上架" : "下架" }}</span
                    >
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-3">
                      <router-link
                        class="button-blue"
                        :to="{
                          name: 'modelStyleMaintainEdit',
                          params: { id: vehicle.id },
                        }"
                      >
                        修改
                      </router-link>
                      <button
                        class="button-gray"
                        @click="deleteVehicle(vehicle.id)"
                      >
                        刪除
                      </button>
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
        v-if="vehicleList.length === 0"
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
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useVehicleStore } from "@/stores/vehicleStore";

const vehicleStore = useVehicleStore();
const { vehicleList } = storeToRefs(vehicleStore);

const paginationInfo = ref({
  page: 1,
  totalPage: 2,
});

const fetchVehicleList = () => {
  vehicleStore.getVehicleList(paginationInfo.value.page, 10).then((res) => {
    paginationInfo.value.totalPage = res.totalPage;
  });
};
// 初始化取得列表資料
fetchVehicleList();

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  fetchVehicleList();
};

const deleteVehicle = async (id: number) => {
  if (!confirm("確定要刪除嗎？")) return;
  await vehicleStore.deleteVehicle(id);
  fetchVehicleList();
};

onUnmounted(() => {
  vehicleStore.$reset();
});
</script>

<style scoped></style>
