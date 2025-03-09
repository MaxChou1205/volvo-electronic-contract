<template>
  <div>
    <div class="mb-3" v-if="title">{{ title }}</div>
    <div class="flex items-center gap-4">
      <label
        class="flex h-11 items-center justify-center rounded-[4px] border-1 p-3 font-normal"
        v-for="(option, index) in options"
        :key="index"
        :class="[
          (modelValue as (string | number | boolean)[]).includes(option.value)
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
          v-model="modelValue"
          type="checkbox"
          :value="option.value"
          :disabled="option.disabled"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
type Option = {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
};

const { title, options } = defineProps<{
  title?: string;
  options: Option[];
}>();

const modelValue = defineModel<string[] | number[] | boolean[]>({
  default: [],
});
</script>

<style scoped></style>
