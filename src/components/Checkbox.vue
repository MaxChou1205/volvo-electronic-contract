<template>
  <div>
    <label>
      <input
        type="checkbox"
        :disabled="disabled"
        :value="value"
        @change="handleChange"
      />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string[]>({ default: [] });

const { label, value, disabled } = defineProps<{
  label: string;
  value: string | boolean | number;
  disabled?: boolean;
}>();

const emit = defineEmits(["change"]);

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("change", target.checked);
  if (target.checked) {
    modelValue.value.push(target.value);
  } else {
    modelValue.value = modelValue.value.filter((item) => item !== target.value);
  }
};
</script>

<style scoped></style>
