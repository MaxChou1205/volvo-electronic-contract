<template>
  <div>
    <input
      class="text-black-400 border-black-400 inline-block h-11 w-full cursor-text appearance-none rounded-[4px] border-1 p-3 text-right"
      v-if="isFocus"
      v-model.number="modelValue"
      ref="inputRef"
      type="tel"
      @keypress="isNumber"
      @blur="handleBlur"
    />
    <div
      class="text-black-400 border-black-400 h-11 cursor-text rounded-[4px] border-1 px-3 py-2 text-right"
      v-if="!isFocus"
      @click="handleFocus"
    >
      {{ valueString }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";

const modelValue = defineModel<number>();
const emit = defineEmits(["update"]);

const inputRef = ref<HTMLInputElement>();
const isFocus = ref(false);

const valueString = computed(() => {
  return modelValue.value?.toLocaleString() || 0;
});

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
</script>

<style scoped></style>
