<template>
  <div class="flex flex-col">
    <label class="mb-2 block text-sm leading-relaxed font-bold text-gray-800">
      {{ label }}
    </label>
    <div
      class="text-black-400 flex min-h-10 flex-1 items-center border-b-[1px] border-gray-300 px-2 text-base font-normal break-all"
      v-if="content"
    >
      {{ content }}
    </div>
    <slot v-else></slot>
  </div>
</template>
<script setup lang="ts">
const { label } = defineProps<{
  label?: string;
  content?: string;
}>();
</script>
