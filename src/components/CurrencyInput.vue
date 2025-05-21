<template>
  <div>
    <input
      class="text-black-400 border-black-400 inline-block h-11 w-full cursor-text appearance-none rounded-[4px] border-1 p-3 text-right"
      v-if="isFocus"
      v-model.number="modelValue"
      :class="[
        v$?.modelValue.$dirty &&
          v$?.modelValue.$errors.length > 0 &&
          'border-red-waring',
      ]"
      ref="inputRef"
      type="tel"
      @keypress="isNumber"
      @keyup="handleBlank"
      @blur="handleBlur"
    />
    <div
      class="text-black-400 border-black-400 h-11 cursor-text rounded-[4px] border-1 px-3 py-2 text-right"
      v-if="!isFocus"
      @click="handleFocus"
    >
      {{ valueString }}
    </div>
    <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
      {{ v$?.$errors[0]!.$message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import useVuelidate, { ValidationRule } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

const modelValue = defineModel<number | string>();
const emit = defineEmits(["update"]);
const { required = false } = defineProps<{
  required?: boolean;
}>();

const inputRef = ref<HTMLInputElement>();
const isFocus = ref(false);

const valueString = computed(() => {
  return modelValue.value?.toLocaleString() || 0;
});

const validations = {
  required: () =>
    helpers.withMessage("此欄位為必填", (value: number) => {
      return value > 0;
    }),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (required) ruleSet.required = validations.required();
  return { modelValue: ruleSet };
});
const v$ = useVuelidate(validationRules, { modelValue });

const handleFocus = () => {
  isFocus.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const handleBlur = () => {
  isFocus.value = false;
  emit("update", modelValue.value);
};

const isNumber = (e) => {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
    return false;
  }
  return true;
};

const handleBlank = (e: KeyboardEvent) => {
  if (modelValue.value === "") {
    modelValue.value = 0;
    emit("update", modelValue.value);
  }
};
</script>

<style scoped></style>
