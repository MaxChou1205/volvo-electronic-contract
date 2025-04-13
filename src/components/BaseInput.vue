<template>
  <div>
    <div class="mb-3" v-if="title">
      {{ title }}
    </div>
    <input
      class="h-11 w-full rounded-[4px] border-1 p-3 font-normal disabled:cursor-not-allowed disabled:bg-gray-200"
      v-model="modelValue"
      :class="[
        type === 'secondary' && 'border-gray-400',
        warning && 'border-red-waring',
      ]"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string | number>();

const {
  title,
  disabled,
  placeholder,
  type = "primary",
  inputType = "text",
  warning = false,
} = defineProps<{
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "primary" | "secondary";
  inputType?: string;
  warning?: boolean;
}>();
</script>

<style scoped></style>
