<template>
  <div class="text-black-400 mx-auto max-w-4xl px-4 py-6">
    <div class="flex flex-col gap-8 md:flex-row">
      <div class="w-full">
        <h2 class="mb-4 text-center text-sm font-bold">訂單篩選</h2>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">訂單狀態</label>
          <div class="w-full">
            <Select
              class="w-full"
              v-model="searchFilter.orderStatus"
              :options="orderStatusOptions"
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">訂單創建日期</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.createDateStart"
                placeholder="yyyy-mm-dd"
                auto-position="bottom"
              />
            </div>
            <span class="mx-3 text-black">～</span>
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.createDateEnd"
                placeholder="yyyy-mm-dd"
                auto-position="bottom"
              />
            </div>
          </div>
        </div>

        <h2 class="mt-8 mb-3 text-center text-sm font-bold">領牌篩選</h2>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">VIN</label>
          <BaseInput v-model="searchFilter.vin" placeholder="請輸入" />
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">領牌日期</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.licenseDateStart"
                placeholder="yyyy-mm-dd"
              />
            </div>
            <span class="mx-3 text-black">～</span>
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.licenseDateEnd"
                placeholder="yyyy-mm-dd"
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">配車日期</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.dispatchedDateStart"
                placeholder="yyyy-mm-dd"
              />
            </div>
            <span class="mx-3 text-black">～</span>
            <div class="relative flex-grow">
              <DatePicker
                v-model="searchFilter.dispatchedDateEnd"
                placeholder="yyyy-mm-dd"
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">車牌號碼</label>
          <BaseInput v-model="searchFilter.licenseNumber" placeholder="請輸入" />
        </div>

        <div class="flex gap-4">
          <button
            class="w-full button-gray"
            @click="emit('reset')"
          >
            重設
          </button>
          <button
            class="w-full button-blue"
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
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useOptionStore } from "@/stores/optionStore";
import { useOrderStore } from "@/stores/orderStore";
import BaseInput from "../BaseInput.vue";
import DatePicker from "../DatePicker.vue";
import Select from "../Select.vue";

const emit = defineEmits(["reset", "confirm"]);

const optionStore = useOptionStore();
const { orderStatusOptions } = storeToRefs(optionStore);

const orderStore = useOrderStore();
const { searchFilter } = storeToRefs(orderStore);

onMounted(async () => {
  await optionStore.getOrderStatus();
});
</script>
