<template>
  <OnClickOutside @trigger="() => (isOpen = false)">
    <div class="relative w-full" ref="multiSelectRef">
      <div class="mb-3" v-if="title" :class="{ 'required-asterisk': required }">
        {{ title }}
      </div>

      <div
        class="flex min-h-11 w-full flex-wrap items-center gap-1 rounded border border-black px-3 py-1 text-sm focus-within:ring-1"
        @click="openDropdown"
        :tabindex="disabled ? -1 : 0"
        @keydown.esc="isOpen = false"
        :class="{ 'bg-gray-200': disabled, 'cursor-not-allowed': disabled }"
      >
        <!-- Selected tags -->
        <span
          class="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm"
          v-for="(item, index) in selectedItems"
          :key="index"
        >
          {{ item.label }}
        </span>

        <!-- Placeholder text -->
        <span
          class="text-base font-light text-black select-none"
          v-if="selectedItems.length === 0 && placeholder"
        >
          {{ placeholder }}
        </span>
      </div>

      <!-- Dropdown menu -->
      <div
        class="absolute z-10 mt-1 max-h-60 w-max overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
        v-show="isOpen"
      >
        <div
          class="flex items-center px-3 py-2 text-sm hover:bg-gray-300"
          v-for="option in props.options"
          :key="option.value"
          :class="{ 'bg-gray-100': isSelected(option) }"
        >
          <MultiCheckbox
            class="w-full cursor-pointer"
            v-model="modelValue"
            :option="option.value"
            :label="option.label"
          />
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useTemplateRef } from "vue";
import { OnClickOutside } from "@vueuse/components";
import MultiCheckbox from "./MultiCheckbox.vue";

const modelValue = defineModel<(string | number)[]>({ default: [] });

const props = defineProps<{
  title?: string;
  options: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const multiSelectRef = useTemplateRef<HTMLElement>("multiSelect");
const isOpen = ref(false);
const inputRef = ref<HTMLElement | null>(null);

const selectedItems = computed(() => {
  return props.options.filter((option) =>
    modelValue.value.includes(option.value),
  );
});

// Check if an option is selected
const isSelected = (option: { value: string | number; label: string }) => {
  return selectedItems.value.some((item) => item.value === option.value);
};

const openDropdown = () => {
  if (!props.disabled) {
    isOpen.value = true;
    inputRef.value?.focus();
  }
};
</script>
