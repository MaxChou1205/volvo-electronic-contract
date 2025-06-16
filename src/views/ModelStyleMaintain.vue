<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">車款維護</h1>
    </header>

    <main class="overflow-auto p-8">
      <div class="space-y-8 rounded-[10px] bg-white p-8">
        <Checkbox
          v-model="vehicleInfo.isPublished"
          :value="true"
          label="上架顯示於車型樣式"
          :required="true"
        />
        <Select
          class="w-full"
          v-model="vehicleInfo.modelId"
          title="型號"
          :options="vehicles"
          :initValue="{
            label: vehicleInfo.modelName,
            value: vehicleInfo.modelId,
          }"
          :required="true"
          @change="handleChangeModel"
        />
        <Select
          class="w-full"
          v-model="vehicleInfo.category"
          title="款式"
          :options="categories"
          :required="true"
        />
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <div class="mb-3">縮圖</div>
            <ImageUpload
              class="h-[200px] w-[200px]"
              v-model:currentFile="vehicleInfo.thumbnail"
            />
          </div>
          <div class="">
            <div class="mb-3">合約大圖</div>
            <ImageUpload
              class="h-[200px] w-[200px]"
              v-model:currentFile="vehicleInfo.image"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <router-link
            class="button-gray w-full"
            :to="{ name: 'modelStyleMaintain' }"
            >取消</router-link
          >
          <button class="button-blue w-full" @click="saveVehicle">儲存</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import Checkbox from "@/components/Checkbox.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import Select from "@/components/Select.vue";
import { useCarService } from "@/composables/carService";
import { useVehicleStore } from "@/stores/vehicleStore";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const vehicleStore = useVehicleStore();
const { vehicleInfo } = storeToRefs(vehicleStore);

const carService = useCarService();
const { getCarList } = carService;

const vehicles = ref<
  {
    value: string;
    code: string;
    label: string;
  }[]
>([]);
const categories = ref<{ value: string; label: string }[]>([
  {
    value: "休旅車",
    label: "休旅車",
  },
  {
    value: "旅行車",
    label: "旅行車",
  },
  {
    value: "跨界跑旅",
    label: "跨界跑旅",
  },
]);

// 取得車型樣式
getCarList().then((res) => {
  vehicles.value = res;
});

// 取得維護資料
if (id) {
  vehicleStore.getVehicleDetail(id);
} else {
  vehicleStore.$reset();
}

const handleChangeModel = ({ value }: { value: string }) => {
  const info = vehicles.value.find((item) => item.value == value);
  if (!info) return;

  vehicleInfo.value.modelId = Number(info.value);
  vehicleInfo.value.modelCode = info.code;
  vehicleInfo.value.modelName = info.label;
};

const v$ = useVuelidate();
const saveVehicle = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  await vehicleStore.saveVehicle(vehicleInfo.value, id);
  alert("儲存成功");
  router.push({ name: "modelStyleMaintain" });
};
</script>

<style scoped></style>
