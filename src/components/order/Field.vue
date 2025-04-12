<template>
  <div class="flex flex-col">
    <label class="mb-2 block text-sm leading-relaxed font-bold text-gray-800">
      {{ label }}
    </label>
    <a
      class="flex min-h-10 flex-1 items-end border-b-[1px] border-gray-300 px-2 text-base font-normal break-all text-blue-500"
      v-if="link"
      target="_blank"
      :href="link"
    >
      {{ content }}
    </a>
    <div
      class="text-black-400 flex min-h-10 flex-1 items-end border-b-[1px] border-gray-300 px-2 text-base font-normal break-all"
      v-else-if="content"
    >
      {{ content }}
    </div>
    <slot v-else>
      <div
        class="text-black-400 flex min-h-10 flex-1 items-end border-b-[1px] border-gray-300 px-2 text-base font-normal break-all"
      ></div>
    </slot>
  </div>
</template>
<script setup lang="ts">
const { label } = defineProps<{
  label?: string;
  content?: string | number | null;
  link?: string;
}>();
</script>
