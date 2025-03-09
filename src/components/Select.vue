<template>
  <label class="inline-block">
    <div class="mb-3" v-if="title">{{ title }}</div>
    <div class="select">
      <select
        class="h-11 w-full appearance-none rounded-[4px] border-1 border-black p-3 font-light"
        v-model="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
      >
        <option v-for="item in optionsWithEmpty" :value="getValue(item)">
          {{ getLabel(item) }}
        </option>
      </select>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

const modelValue = defineModel<string | number>({ default: "" });
const props = defineProps<{
  title?: string;
  options: (string | number | { label: string; value: string | number })[];
  placeholder?: string;
  disabled?: boolean;
}>();

const optionsWithEmpty = computed(() => {
  return [
    {
      label: props.placeholder || `請選擇${props.title || ""}`,
      value: "",
    },
    ...props.options,
  ];
});

function getValue(
  item: string | number | { label: string; value: string | number },
): string | number {
  return typeof item === "object" ? item.value : item;
}

function getLabel(
  item: string | number | { label: string; value: string | number },
): string | number {
  return typeof item === "object" ? item.label : item;
}
</script>

<style scoped lang="scss">
.select {
  position: relative;

  &::after {
    position: absolute;
    top: 35%;
    right: 16px;
    transform: rotate(135deg);
    border-top: 2px solid black;
    border-right: 2px solid black;
    width: 10px;
    height: 10px;
    pointer-events: none;
    content: "";
  }
}
</style>
