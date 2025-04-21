<template>
  <div class="flex h-screen flex-col">
    <OrderHeader />

    <main class="overflow-auto">
      <div class="grid grid-cols-2 gap-[30px] p-[30px]">
        <div
          class="rounded-[4px] bg-white px-4 py-5 text-sm"
          v-for="order in orderList"
          :key="order.orderNo"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="text-gray-900">訂單編號</div>
            <div class="text-gray-800">{{ order.orderNo }}</div>
          </div>
          <div class="text-black-400 mb-2">
            <span class="text-lg">{{ order.customerName }}</span>
            {{ order.genderLabel }}
          </div>
          <!-- <div class="mb-3 flex items-center">
            <Icon class="mr-1" icon-name="phone" size="16" />
            <span class="text-gray-800">0919123456</span>
          </div> -->
          <RouterLink
            class="flex cursor-pointer items-center justify-end"
            :to="{ name: 'orderinfo', params: { id: order.orderNo } }"
          >
            <span class="text-blue-brand text-xs">查看更多</span>
            <Icon class="ml-1" icon-name="right-arrow" :size="24" />
          </RouterLink>
        </div>
      </div>
      <Pagination
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
import Pagination from "@/components/Pagination.vue";
import OrderHeader from "@/components/order/OrderHeader.vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const { paginationInfo, orderList } = storeToRefs(orderStore);
const loading = ref(false);

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  loading.value = true;
  orderStore.getOrders();
  loading.value = false;
};

onMounted(() => {
  orderStore.getOrders();
});
</script>

<style scoped></style>
