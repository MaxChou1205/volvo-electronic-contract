<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">車款維護</h1>
      <div class="flex justify-end">
        <router-link class="button-blue" :to="{ name: 'companyMaintainAdd' }"
          >新增</router-link
        >
      </div>
    </header>

    <main class="overflow-auto p-4">
      <div class="" v-if="companyList.length > 0">
        <div class="mx-auto max-w-6xl">
          <div class="overflow-hidden rounded-lg bg-white shadow-sm">
            <table class="w-full">
              <thead class="">
                <tr class="bg-blue-brand text-white">
                  <th
                    class="border-blue-brand w-[100px] border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    代碼
                  </th>
                  <th
                    class="border-blue-brand w-[200px] border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    名稱
                  </th>
                  <th
                    class="border-blue-brand w-[100px] border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    統編
                  </th>
                  <th
                    class="border-blue-brand w-[100px] border-r px-6 py-4 text-center text-lg font-medium"
                  >
                    電話
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
                  v-for="(company, index) in companyList"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
                >
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ company.code }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ company.name }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ company.taxId }}
                  </td>
                  <td class="border-r border-gray-300 px-6 py-4 font-medium">
                    {{ company.phone }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-3">
                      <router-link
                        class="button-blue"
                        :to="{
                          name: 'companyMaintainEdit',
                          params: { code: company.code },
                        }"
                      >
                        修改
                      </router-link>
                      <button
                        class="button-gray"
                        @click="deleteCompany(company.id)"
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
        v-if="companyList.length === 0"
      >
        <div class="text-center leading-[400px]">
          <h3 class="text-xl font-medium text-gray-900">
            沒有找到符合條件的經銷商
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            請嘗試其他搜尋條件或新增經銷商
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
import { useCompanyStore } from "@/stores/companyStore";

const companyStore = useCompanyStore();
const { companyList } = storeToRefs(companyStore);

const paginationInfo = ref({
  page: 1,
  totalPage: 2,
});

const fetchCompanyList = () => {
  companyStore.getCompanyList(paginationInfo.value.page, 10).then((res) => {
    paginationInfo.value.totalPage = res.totalPage;
  });
};
// 初始化取得列表資料
fetchCompanyList();

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  fetchCompanyList();
};

const deleteCompany = async (id: number) => {
  if (!confirm("確定要刪除嗎？")) return;
  await companyStore.deleteCompany(id);
  fetchCompanyList();
};

onUnmounted(() => {
  companyStore.$reset();
});
</script>

<style scoped></style>
