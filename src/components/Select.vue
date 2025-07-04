<template>
  <label class="inline-block">
    <div
      class="mb-3"
      v-if="title"
      :class="{ 'required-asterisk': props.required }"
    >
      {{ title }}
    </div>
    <div class="select">
      <select
        class="h-11 w-full appearance-none rounded-[4px] border-1 border-black px-3 py-2 font-light disabled:cursor-not-allowed disabled:bg-gray-200"
        v-model="modelValue"
        :class="v$?.$error && 'border-red-waring'"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="
          $emit('change', {
            label: ($event.target as HTMLSelectElement).selectedOptions[0]
              .textContent,
            value: ($event.target as HTMLSelectElement).value,
          })
        "
      >
        <option v-for="item in optionsWithEmpty" :value="getValue(item)">
          {{ getLabel(item) }}
        </option>
      </select>
    </div>
    <div class="error" v-if="v$?.$dirty && v$?.$errors.length > 0">
      {{ v$?.$errors[0]!.$message }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import useVuelidate, { type ValidationRule } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const modelValue = defineModel<string | number | null>({ default: null });

const props = defineProps<{
  title?: string;
  options: (
    | string
    | number
    | { label: string; value: string | number | null }
  )[];
  placeholder?: string;
  disabled?: boolean;
  initValue?: { label: string; value: string | number | null };
  required?: boolean;
}>();
const emit = defineEmits(["change"]);

const optionsWithEmpty = computed(() => {
  return [
    {
      label: props.placeholder || `請選擇${props.title || ""}`,
      value: null,
    },
    ...props.options,
  ];
});

function getValue(
  item: string | number | { label: string; value: string | number | null },
): string | number | null {
  return typeof item === "object" ? item!.value : item;
}

function getLabel(
  item: string | number | { label: string; value: string | number | null },
): string | number {
  return typeof item === "object" ? item.label : item;
}

const validations = {
  required: () => helpers.withMessage("此欄位為必填", required),
};

const validationRules = computed(() => {
  const ruleSet: Record<string, ValidationRule> = {};
  if (props.required) ruleSet.required = validations.required();
  return { modelValue: ruleSet };
});

const v$ = useVuelidate(validationRules, { modelValue }, { $lazy: true });

onMounted(() => {
  if (props.initValue) {
    props.options.push({
      label: props.initValue.label,
      value: props.initValue.value,
    });
  }
});
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
