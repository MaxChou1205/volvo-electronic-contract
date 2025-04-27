<template>
  <div>
    <div class="mb-3" v-if="title" :class="{ 'required-asterisk': required }">
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
    <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
      {{ v$?.$errors[0]!.$message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useVuelidate, { type ValidationRule } from "@vuelidate/core";
import {
  helpers,
  maxLength,
  minLength,
  required as requiredValidator,
} from "@vuelidate/validators";

const modelValue = defineModel<string | number>();

const {
  title,
  disabled,
  placeholder,
  type = "primary",
  inputType = "text",
  warning = false,
  required = false,
  min,
  max,
} = defineProps<{
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "primary" | "secondary";
  inputType?: string;
  warning?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
}>();

const validations = {
  required: () => helpers.withMessage("此欄位為必填", requiredValidator),
  min: (n: number) => helpers.withMessage(`至少選擇 ${n} 項`, minLength(n)),
  max: (n: number) => helpers.withMessage(`最多選擇 ${n} 項`, maxLength(n)),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (required) ruleSet.required = validations.required();
  if (min != null) ruleSet.min = validations.min(min);
  if (max != null) ruleSet.max = validations.max(max);
  return { modelValue: ruleSet };
});

const v$ = useVuelidate(validationRules, { modelValue });
</script>

<style scoped></style>
