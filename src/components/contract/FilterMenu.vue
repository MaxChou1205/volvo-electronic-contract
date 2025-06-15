<template>
  <div class="text-black-400 mx-auto h-full max-w-4xl px-4 py-6">
    <div class="flex h-full flex-col gap-8 md:flex-row">
      <div class="flex h-full w-full flex-col">
        <h2 class="mb-4 text-center text-sm font-bold">合約篩選</h2>

        <!-- <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">合約狀態</label>
          <div class="w-full">
            <Select
              class="w-full"
              v-model="searchFilter.contractStatus"
              :options="contractStatusOptions"
            />
          </div>
        </div> -->

        <div class="mb-3">
          <label class="mb-2 block text-sm text-gray-800">合約創建日期</label>
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
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useOptionStore } from "@/stores/optionStore";
import { useOrderContractStore } from "@/stores/orderContractStore";
import DatePicker from "../DatePicker.vue";

const optionStore = useOptionStore();
const orderContractStore = useOrderContractStore();

onMounted(async () => {
  await optionStore.getContractStatus();
});

const emit = defineEmits(["reset", "confirm"]);

const { searchFilter } = storeToRefs(orderContractStore);
</script>
