<template>
  <div class="flex h-screen flex-col">
    <ContractHeader />

    <main class="overflow-auto">
      <div
        class="grid grid-cols-2 gap-[30px] p-[30px]"
        v-if="orderContractList.length > 0"
      >
        <div
          class="rounded-[4px] bg-white px-4 py-5 text-sm"
          v-for="contract in orderContractList"
          :key="contract.orderNo"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="text-gray-900">訂單編號</div>
            <div class="text-gray-800">{{ contract.orderNo }}</div>
          </div>
          <div class="text-black-400 mb-2">
            <span class="text-lg">{{ contract.customerName }}</span>
            {{ contract.genderLabel }}
          </div>
          <a
            class="flex cursor-pointer items-center justify-end"
            target="_blank"
            :href="`${appBaseUrl}/api/Order/contract/${contract.orderNo}`"
          >
            <span class="text-blue-brand text-xs">查看更多</span>
            <Icon class="ml-1" icon-name="right-arrow" :size="24" />
          </a>
        </div>
      </div>
      <div class="pt-20 text-center text-gray-500" v-else>
        <p>無相符資料</p>
      </div>
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import ContractHeader from "@/components/contract/ContractHeader.vue";
import { useOrderContractStore } from "@/stores/orderContractStore";

const route = useRoute();
const router = useRouter();
const orderContractStore = useOrderContractStore();
const { orderContractList, paginationInfo } = storeToRefs(orderContractStore);
const loading = ref(false);
const appBaseUrl = import.meta.env.VITE_API_URL;

orderContractStore.$reset();
paginationInfo.value.page = Number(route.query.page) || 1;
orderContractStore.getOrderContracts();

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  loading.value = true;
  orderContractStore.getOrderContracts();
  loading.value = false;
  router.replace({ query: { page: String(page) } });
};
</script>

<style scoped></style>
