<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">車款維護</h1>
    </header>

    <main class="overflow-auto p-4">
      <div class="space-y-8">
        <Checkbox value="" label="上架顯示於車型樣式" />
        <BaseInput title="名稱" />
        <Select class="w-full" title="款式" :options="vehicles" />
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <div class="mb-3">縮圖</div>
            <ImageUpload class="h-[200px] w-[200px]" />
          </div>
          <div class="">
            <div class="mb-3">合約大圖</div>
            <ImageUpload class="h-[200px] w-[200px]" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import Select from "@/components/Select.vue";

const vehicles = ref([
  {
    value: "休旅車",
    label: "休旅車",
  },
  {
    value: "旅行車",
    label: "旅行車",
  },
  {
    value: "跨界跑旅",
    label: "跨界跑旅",
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
