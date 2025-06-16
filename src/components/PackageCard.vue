<template>
  <div
    class="w-110 rounded-[4px] p-3"
    :class="
      selectedPackage === packageInfo.id
        ? 'border-2 border-blue-500'
        : 'border-1 border-gray-600'
    "
  >
    <div
      class="text-black-400 flex h-full items-stretch gap-3 text-sm font-normal"
    >
      <div class="flex h-full flex-col items-stretch justify-between">
        <div class="h-43 w-43">
          <img
            class="h-full w-full object-cover"
            src="@/assets/img/car1.png"
            alt=""
          />
        </div>
        <!-- <router-link class="block text-blue-500" to="">更多說明</router-link> -->
      </div>
      <div class="flex flex-1 flex-col text-xs">
        <div class="mb-3 flex justify-between text-sm">
          <span>車價</span>
          <span
            ><span class="text-gray-600">NT$ </span>
            {{ packageInfo.vehicleRetailAllAmount?.toLocaleString() }}</span
          >
        </div>
        <div class="mb-3 flex-1">
          <span v-if="packageInfo.packageDmsOptions.length > 0"
            >配件 / 售價：</span
          >
          <ul class="mt-1">
            <li
              class="ml-5 list-disc"
              v-for="(accessory, index) in packageInfo.packageDmsOptions"
              :key="`accessory-${index}`"
            >
              <div class="flex justify-between space-y-1">
                <span>{{ accessory.optionName }}</span>
                <span class="text-right text-gray-600"
                  >NT$ {{ accessory.optionPrice }}</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-2 flex justify-between text-gray-600">
          <span>原價</span>
          <span
            ><span class="mr-1 text-gray-600">NT$</span>
            <del>{{
              packageInfo.vehicleRetailAllAmount?.toLocaleString()
            }}</del></span
          >
        </div>
        <div class="mb-2 flex justify-between">
          <span>優惠價</span>
          <span class="text-base"
            ><span>NT$ </span
            >{{ packageInfo.vehicleDealAllAmount?.toLocaleString() }}</span
          >
        </div>
        <button
          class="h-8 py-2 text-sm"
          :class="
            selectedPackage === packageInfo.id ? 'button-blue' : 'button-white'
          "
          @click="handleSelectPackage"
        >
          {{ selectedPackage === packageInfo.id ? "取消此套組" : "選擇此套組" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PackageInfo } from "@/types/packageType";

const { packageInfo } = defineProps<{
  packageInfo: PackageInfo;
}>();

const selectedPackage = ref<number | null>(null);
const emit = defineEmits(["change"]);

const handleSelectPackage = () => {
  if (selectedPackage.value === packageInfo.id) {
    selectedPackage.value = null;
    emit("change", null);
  } else {
    selectedPackage.value = packageInfo.id;
    emit("change", packageInfo);
  }
};
</script>

<style scoped></style>
