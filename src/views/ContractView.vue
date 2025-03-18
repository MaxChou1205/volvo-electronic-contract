<template>
  <div class="flex h-screen flex-col">
    <ContractHeader />

    <main class="overflow-auto">
      <div class="grid grid-cols-2 gap-[30px] p-[30px]">
        <div
          class="rounded-[4px] bg-white px-4 py-5 text-sm"
          v-for="i in 20"
          :key="i"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="text-gray-900">訂單編號</div>
            <div class="text-gray-800">20250107A001</div>
          </div>
          <div class="text-black-400 mb-2">
            <span class="text-lg">王小明</span> 先生
          </div>
          <div class="mb-3 flex items-center">
            <Icon class="mr-1" icon-name="phone" size="16" />
            <span class="text-gray-800">0919123456</span>
          </div>
          <RouterLink
            class="flex cursor-pointer items-center justify-end"
            :to="{ name: 'finishView' }"
          >
            <span class="text-blue-brand text-xs">查看更多</span>
            <Icon class="ml-1" icon-name="right-arrow" :size="24" />
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ContractHeader from "@/components/contract/ContractHeader.vue";
</script>

<style scoped></style>
