<template>
  <div class="flex items-center gap-4">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="flex h-11 items-center justify-center rounded-[4px] border-1 p-3 font-normal"
      :class="[
        modelValue === option.value
          ? 'border-blue-500 text-blue-500'
          : 'border-gray-600 text-gray-600',
        option.disabled
          ? 'cursor-not-allowed border-none bg-gray-100'
          : 'cursor-pointer',
      ]"
    >
      {{ option.label
      }}<input
        class="appearance-none"
        type="radio"
        :value="option.value"
        :disabled="option.disabled"
        v-model="modelValue"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

type Option = {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
};

const { options } = defineProps<{
  options: Option[];
}>();

const modelValue = defineModel<string | number | boolean>({
  default: "",
});

onMounted(() => {
  modelValue.value = options[0]?.value || "";
});
</script>

<style scoped></style>
