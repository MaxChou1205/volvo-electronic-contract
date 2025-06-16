<template>
  <div>
    <label class="flex cursor-pointer items-center">
      <input
        class="mr-2"
        v-model="modelValue"
        type="checkbox"
        :disabled="disabled"
        :value="value"
        @change="handleChange"
      />
      <span v-if="label">{{ label }}</span>
      <template v-else><slot></slot></template>
    </label>
    <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
      {{ v$?.$errors[0]!.$message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useVuelidate, { type ValidationRule } from "@vuelidate/core";
import { helpers, required as requiredValidator } from "@vuelidate/validators";

const modelValue = defineModel<string | boolean | number>({
  default: false,
});

const {
  label,
  value,
  disabled,
  required = false,
} = defineProps<{
  value: string | boolean | number;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emit = defineEmits(["change"]);

const validations = {
  required: () => helpers.withMessage("此欄位為必填", requiredValidator),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (required) ruleSet.required = validations.required();
  return { modelValue: ruleSet };
});

const v$ = useVuelidate(validationRules, { modelValue });

const handleChange = (e: Event) => {
  emit("change", (e.target as HTMLInputElement).checked);
};
</script>

<style scoped></style>
