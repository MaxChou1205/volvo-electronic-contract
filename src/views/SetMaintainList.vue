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
      <div class="" v-if="packageList.length > 0">
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
                  v-for="(vehicle, index) in processedCarList"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
                >
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.type }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.modelName }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ vehicle.packageName }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    <!-- :class="[vehicle.packageStatus === '下架' && 'text-gray-500']" -->
                    <span>{{ "上架?" }}</span>
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
                      <button
                        class="button-gray"
                        @click="handleDelete(vehicle.id)"
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
        v-if="packageList.length === 0"
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
import { computed, ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import { usePackageStore } from "@/stores/packageStore";

const packageStore = usePackageStore();
const { packageList } = storeToRefs(packageStore);

const paginationInfo = ref({
  page: 1,
  totalPage: 1,
});

const carTypeList = ref([
  {
    id: "0",
    name: "EX40",
    img: new URL("@/assets/img/EX40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "1",
    name: "EX30",
    img: new URL("@/assets/img/EX30.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "2",
    name: "EC40",
    img: new URL("@/assets/img/EC40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "跨界跑旅",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "3",
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "4",
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "5",
    name: "V60",
    img: new URL("@/assets/img/V60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "旅行車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "8",
    name: "XC40",
    img: new URL("@/assets/img/XC40.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
]);

const processedCarList = computed(() => {
  return packageList.value.map((item) => {
    const car = carTypeList.value.find(
      (car) => Number(car.id) === Number(item.modelId),
    );
    return {
      ...item,
      type: car?.type,
    };
  });
});

packageStore.getPackageList(1, 10, "modifiedAt").then((res) => {
  paginationInfo.value.totalPage = res.totalPage;
});

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  packageStore.getPackageList(page, 10, "modifiedAt").then((res) => {
    paginationInfo.value.totalPage = res.totalPage;
  });
};

const handleDelete = async (id: number) => {
  await packageStore.deletePackage(id);
  packageStore.getPackageList(paginationInfo.value.page, 10, "modifiedAt");
};
</script>

<style scoped></style>
