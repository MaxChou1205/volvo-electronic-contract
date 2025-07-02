<template>
  <div class="flex h-screen flex-col">
    <OrderHeader />

    <main class="overflow-auto">
      <div
        class="grid grid-cols-2 gap-[30px] p-[30px]"
        v-if="orderList.length > 0"
      >
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
      <div v-else>
        <p class="pt-20 text-center text-gray-500">無相符資料</p>
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
import OrderHeader from "@/components/order/OrderHeader.vue";
import { useOrderStore } from "@/stores/orderStore";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const { paginationInfo, orderList } = storeToRefs(orderStore);
const loading = ref(false);

const onPageChange = (page: number) => {
  paginationInfo.value.page = page;
  loading.value = true;
  orderStore.getOrders();
  loading.value = false;
  router.replace({ query: { page: String(page) } });
};

orderStore.$reset();
paginationInfo.value.page = Number(route.query.page) || 1;
orderStore.getOrders();
</script>

<style scoped></style>
