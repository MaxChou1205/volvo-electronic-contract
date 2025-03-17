<template>
  <div class="text-black-400 mx-auto h-full max-w-4xl px-4 py-6">
    <div class="flex h-full flex-col gap-8 md:flex-row">
      <div class="w-full md:w-1/3">
        <h2 class="mb-4 text-center text-sm font-bold">列表顯示</h2>
        <p class="mb-2 text-xs text-gray-800">最多 5 項</p>

        <div class="space-y-2">
          <div
            class="flex items-center"
            v-for="(option, index) in displayOptions"
            :key="index"
          >
            <MultiCheckbox :option="option" />
          </div>
        </div>
      </div>

      <div class="flex h-full w-full flex-col md:w-2/3">
        <h2 class="mb-4 text-center text-sm font-bold">合約篩選</h2>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">合約狀態</label>
          <div class="w-full">
            <Select class="w-full" :options="[]" />
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">合約創建日期</label>
          <div class="relative">
            <DatePicker />
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-sm text-gray-800">合約狀態</label>
          <div class="w-full">
            <Select class="w-full" :options="[]" />
          </div>
        </div>

        <div class="flex-grow"></div>

        <div class="my-auto flex gap-4">
          <button
            class="w-full cursor-pointer rounded bg-gray-400 py-3 font-medium text-white"
            type="button"
            @click="emit('reset')"
          >
            重設
          </button>
          <button
            class="w-full cursor-pointer rounded bg-blue-800 py-3 font-medium text-white"
            type="button"
            @click="emit('confirm')"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "../DatePicker.vue";
import MultiCheckbox from "../MultiCheckbox.vue";
import Select from "../Select.vue";

const emit = defineEmits(["reset", "confirm"]);

const displayOptions = ref([
  "合約建立時間",
  "合約提交時間",
  "合約狀態",
  "序號",
  "銷售顧問",
  "預計交車時間",
  "配車時間",
  "車型",
  "年款",
]);
</script>
