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
            :src="packageInfo.imageUrl ?? defaultThumbnail"
            alt="套裝縮圖"
          />
        </div>
        <button
          class="button-gray block h-8 text-sm py-2"
          v-if="showMoreOptions"
          @click="openModal"
        >
          更多說明
        </button>
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
              v-for="(accessory, index) in filteredOptions"
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
          :class="[
            selectedPackage === packageInfo.id ? 'button-blue' : 'button-white',
            selectedPackage !== null && selectedPackage !== packageInfo.id
              ? 'disabled border-none'
              : '',
          ]"
          :disabled="
            selectedPackage !== null && selectedPackage !== packageInfo.id
          "
          @click="handleSelectPackage"
        >
          {{ selectedPackage === packageInfo.id ? "取消此套組" : "選擇此套組" }}
        </button>
      </div>
    </div>

    <Modal ref="modalRef" :showCancelButton="true" :cancelButtonText="'關閉'">
      <div class="max-h-[500px] overflow-y-auto pr-2">
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
          <li
            class="ml-5 list-disc"
            v-for="(accessory, index) in packageInfo.packageOptions"
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
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import defaultThumbnail from "@/assets/img/car1.png";
import Modal from "@/components/Modal.vue";
import type { PackageItem } from "@/types/packageType";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const { packageInfo, selectedPackage } = defineProps<{
  packageInfo: PackageItem;
  selectedPackage: number | null;
}>();

const emit = defineEmits(["change"]);

const filteredOptions = computed(() => {
  return [
    ...packageInfo.packageDmsOptions,
    ...packageInfo.packageOptions,
  ].slice(0, 5);
});

const showMoreOptions = computed(() => {
  return (
    [...packageInfo.packageDmsOptions, ...packageInfo.packageOptions].length > 5
  );
});

const openModal = () => {
  modalRef.value?.open();
};

const handleSelectPackage = () => {
  if (selectedPackage === packageInfo.id) {
    emit("change", null);
  } else {
    emit("change", packageInfo);
  }
};
</script>

<style scoped></style>
