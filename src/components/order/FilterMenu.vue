<template>
  <div class="text-black-400 mx-auto max-w-4xl px-4 py-6">
    <div class="flex flex-col gap-8 md:flex-row">
      <div class="w-full md:w-1/3">
        <h2 class="mb-4 text-center text-sm font-bold">列表顯示</h2>
        <p class="mb-2 text-xs text-gray-800">最多 5 項</p>

        <div class="space-y-2">
          <div
            class="flex items-center"
            v-for="(option, index) in displayOptions"
            :key="index"
          >
            <MultiCheckbox :option="option" :label="option" />
          </div>
        </div>
      </div>

      <div class="w-full md:w-2/3">
        <h2 class="mb-4 text-center text-sm font-bold">訂單篩選</h2>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">訂單狀態</label>
          <div class="w-full">
            <Select class="w-full" :options="[]" />
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">訂單創建日期</label>
          <div class="relative">
            <DatePicker />
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-sm text-gray-800">訂單類型</label>
          <div class="w-full">
            <Select class="w-full" :options="[]" />
          </div>
        </div>

        <h2 class="mt-8 mb-3 text-center text-sm font-bold">領牌篩選</h2>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">VIN</label>
          <BaseInput placeholder="請輸入" />
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">領牌日期</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <DatePicker placeholder="yyyy-mm-dd" />
            </div>
            <span class="mx-3 text-black">～</span>
            <div class="relative flex-grow">
              <DatePicker placeholder="yyyy-mm-dd" />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">配車日期</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <DatePicker placeholder="yyyy-mm-dd" />
            </div>
            <span class="mx-3 text-black">～</span>
            <div class="relative flex-grow">
              <DatePicker placeholder="yyyy-mm-dd" />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">車牌號碼</label>
          <BaseInput placeholder="請輸入" />
        </div>

        <div class="flex gap-4">
          <button
            class="w-full rounded bg-gray-400 py-3 font-medium text-white"
          >
            重設
          </button>
          <button
            class="w-full rounded bg-blue-800 py-3 font-medium text-white"
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
import BaseInput from "../BaseInput.vue";
import DatePicker from "../DatePicker.vue";
import MultiCheckbox from "../MultiCheckbox.vue";
import Select from "../Select.vue";

const displayOptions = ref([
  "訂單建立時間",
  "訂單提交時間",
  "訂單狀態",
  "序號",
  "銷售顧問",
  "預計交車時間",
  "配車時間",
  "退單時間",
  "車型",
  "年款",
  "EC憑證狀態",
  "EC憑證到期時間",
  "紙本簽約編號",
]);
</script>
