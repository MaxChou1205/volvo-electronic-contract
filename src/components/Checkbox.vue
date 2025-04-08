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
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string | boolean | number>({
  default: false,
});

const { label, value, disabled } = defineProps<{
  value: string | boolean | number;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["change"]);

const handleChange = (e: Event) => {
  emit("change", (e.target as HTMLInputElement).checked);
};
</script>

<style scoped></style>
