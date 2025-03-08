<template>
  <div class="flex w-full items-center justify-between">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      class="w-[152px] cursor-pointer border-b-2 pb-2 text-center font-extralight"
      @click="currentTab = index"
      :class="currentTab === index ? 'border-blue-500' : 'border-none'"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { tabs = [] } = defineProps<{
  tabs: string[];
}>();

const currentTab = defineModel<number>({ default: 0 });
</script>

<style scoped></style>
