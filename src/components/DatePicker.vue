<template>
  <div>
    <VueDatePicker
      v-model="modelValue"
      auto-position="top"
      :clearable="false"
      :auto-apply="true"
      :enable-time-picker="false"
      :locale="'zh-TW'"
      :year-first="true"
      :format="'yyyy/MM/dd'"
      :disabled="disabled"
    >
      <template
        #dp-input="{
          value,
          onInput,
          onEnter,
          onTab,
          onClear,
          onBlur,
          onKeypress,
          onPaste,
          isMenuOpen,
        }"
      >
        <div class="relative">
          <input
            class="h-11 w-full rounded-[4px] border-1 p-3"
            :class="
              disabled
                ? 'border-gray-500 placeholder:text-gray-500'
                : 'border-black-400 placeholder:text-black-300'
            "
            type="text"
            :value="value"
            :disabled="disabled"
            placeholder="請選擇日期"
          />
          <div class="absolute top-[50%] right-3 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.5 3.5V16.5H16.5V3.5H3.5ZM3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V3C18 2.44772 17.5523 2 17 2H3Z"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 7L3 7L3 5.5L17 5.5L17 7Z"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="3"
                y="9.5"
                width="14"
                height="1"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="10"
                y="10"
                width="4"
                height="4"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="6"
                y="7"
                width="1"
                height="10"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="13"
                y="7"
                width="1"
                height="10"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="9.5"
                y="7"
                width="1"
                height="10"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
              <rect
                x="3"
                y="13"
                width="14"
                height="1"
                :fill="disabled ? '#a7a8a9' : '#141414'"
              />
            </svg>
          </div>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const modelValue = defineModel<string | Date | null>({
  type: [String, Date, null],
  default: null,
});

const { disabled = false } = defineProps<{
  disabled?: boolean;
}>();

watch(
  () => disabled,
  () => {
    modelValue.value = null;
  },
);
</script>

<style scoped></style>
