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
        :class="{
          'bg-gray-200': disabled,
          'cursor-not-allowed': disabled,
          'border-red-waring': v$?.$error,
        }"
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

      <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
        {{ v$?.$errors[0]!.$message }}
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
import useVuelidate, { type ValidationRule } from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
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
  min?: number;
  max?: number;
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

const validations = {
  required: () => helpers.withMessage("此欄位為必填", required),
  min: (n: number) => helpers.withMessage(`至少選擇 ${n} 項`, minLength(n)),
  max: (n: number) => helpers.withMessage(`最多選擇 ${n} 項`, maxLength(n)),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (props.required) ruleSet.required = validations.required();
  if (props.min != null) ruleSet.min = validations.min(props.min);
  if (props.max != null) ruleSet.max = validations.max(props.max);
  return { modelValue: ruleSet };
});

const v$ = useVuelidate(validationRules, { modelValue });
</script>
