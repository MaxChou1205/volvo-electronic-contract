<template>
  <div class="mx-auto flex w-full justify-center">
    <div class="flex" v-for="(text, index) in textList" :key="index">
      <!-- 分隔線 -->
      <div
        class="mt-4 h-px w-[60px]"
        v-if="index !== 0"
        :class="props.currentStep >= index + 1 ? 'bg-blue-500' : 'bg-gray-500'"
      ></div>
      <div class="flex flex-col items-center">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full border-2"
          :class="[
            {
              'border-blue-500 text-blue-500': props.currentStep === index + 1,
            },
            {
              'border-gray-400 text-gray-400': props.currentStep < index + 1,
            },
            {
              'bg-blue-500 text-white': props.currentStep > index + 1,
            },
          ]"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div
          class="mt-2 w-full text-end text-sm font-medium"
          :class="
            props.currentStep >= index + 1 ? 'text-blue-500' : 'text-gray-500'
          "
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStep: number;
}>();

const textList = ["車型樣式", "車主資料", "購買方式", "合約確認"];
</script>

<style scoped></style>
