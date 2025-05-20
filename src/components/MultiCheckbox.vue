<template>
  <label class="flex cursor-pointer items-center text-sm"
    ><input
      class="border-blue-brand text-blue-brand checked:bg-blue-brand mr-2 h-5 w-5 appearance-none rounded border-2 checked:text-white"
      v-model="modelValue"
      type="checkbox"
      :value="option"
      @change="$emit('change', option)"
    />{{ label }}</label
  >
</template>

<script setup lang="ts">
const modelValue = defineModel<(string | number)[]>();
const { option, label } = defineProps<{
  option: string | number;
  label: string;
}>();
const emit = defineEmits(["change"]);
</script>

<style scoped lang="scss">
input[type="checkbox"]:checked {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  &::after {
    display: block;
    transform: rotate(45deg);
    border-width: 0 2px 2px 0;
    width: 4px;
    height: 8px;
    content: "";
  }
}
</style>
