<template>
  <div>
    <div class="mb-3" v-if="title">
      {{ title }}
    </div>
    <input
      class="h-11 w-full rounded-[4px] border-1 p-3 font-normal"
      v-model="modelValue"
      :class="[
        type === 'secondary' && 'border-gray-400',
        warning && 'border-red-waring',
      ]"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>();

const {
  title,
  disabled,
  placeholder,
  type = "primary",
  warning = false,
} = defineProps<{
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "primary" | "secondary";
  warning?: boolean;
}>();
</script>

<style scoped></style>
