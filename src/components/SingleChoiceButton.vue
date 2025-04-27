<template>
  <div>
    <div class="mb-3" v-if="title" :class="{ 'required-asterisk': required }">
      {{ title }}
    </div>
    <div class="flex items-center gap-4">
      <label
        class="flex h-11 items-center justify-center rounded-[4px] border-1 p-3 font-normal"
        v-for="(option, index) in options"
        :key="index"
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
          v-model="modelValue"
          type="radio"
          :value="option.value"
          :disabled="option.disabled"
          @change="$emit('change', option.value)"
        />
      </label>
    </div>
    <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
      {{ v$?.$errors[0]!.$message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useVuelidate, { ValidationRule } from "@vuelidate/core";
import { required as validatorRequired, helpers } from "@vuelidate/validators";

type Option = {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
};

const {
  title,
  options,
  required = false,
} = defineProps<{
  title?: string;
  options: Option[];
  required?: boolean;
}>();

const emit = defineEmits(["change"]);

const modelValue = defineModel<string | number | boolean | null>({
  default: "",
});

const validations = {
  required: () => helpers.withMessage("此欄位為必填", ()=>{
    return options.some(option => option.value === modelValue.value)
  }),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (required) ruleSet.required = validations.required();
  return { modelValue: ruleSet };
});

const v$ = useVuelidate(validationRules, { modelValue });
</script>

<style scoped></style>
