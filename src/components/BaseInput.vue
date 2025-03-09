<template>
  <div>
    <div class="mb-3" v-if="title">{{ title }}</div>
    <input
      class="h-11 w-full rounded-[4px] border-1 p-3 font-normal"
      v-model="modelValue"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>();

const { title, disabled, placeholder } = defineProps<{
  title?: string;
  disabled?: boolean;
  placeholder?: string;
}>();
</script>

<style scoped></style>
