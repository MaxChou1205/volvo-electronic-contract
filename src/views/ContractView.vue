<template>
  <div class="flex h-screen flex-col">
    <ContractHeader />

    <main class="overflow-auto">
      <div
        class="grid grid-cols-2 gap-[30px] p-[30px]"
        v-if="contractList.length > 0"
      >
        <div
          class="rounded-[4px] bg-white px-4 py-5 text-sm"
          v-for="contract in contractList"
          :key="contract.contractNo"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="text-gray-900">合約編號</div>
            <div class="text-gray-800">{{ contract.contractNo }}</div>
          </div>
          <div class="text-black-400 mb-2">
            <span class="text-lg">{{ contract.customerName }}</span> 性別？
          </div>
          <div class="mb-3 flex items-center">
            <Icon class="mr-1" icon-name="phone" size="16" />
            <span class="text-gray-800">電話？</span>
          </div>
          <RouterLink
            class="flex cursor-pointer items-center justify-end"
            to=""
          >
            <span class="text-blue-brand text-xs">查看更多</span>
            <Icon class="ml-1" icon-name="right-arrow" :size="24" />
          </RouterLink>
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
import { onMounted, ref } from "vue";
import ContractHeader from "@/components/contract/ContractHeader.vue";
import { useContractStore } from "@/stores/contractStore";

const contractStore = useContractStore();
const { contractList, paginationInfo } = storeToRefs(contractStore);
const loading = ref(false);

onMounted(() => {
  contractStore.getContractList();
});

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  loading.value = true;
  contractStore.getContractList();
  loading.value = false;
};
</script>

<style scoped></style>
