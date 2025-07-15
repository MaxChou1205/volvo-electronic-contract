<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">優惠套組維護</h1>
    </header>

    <main class="overflow-auto p-8">
      <div class="space-y-8 rounded-[10px] bg-white p-8">
        <!-- <Checkbox
          v-model="packageInfo.isPublished"
          :value="true"
          label="上架顯示於車型樣式"
        /> -->
        <label class="mb-3 block">上架日期</label>
        <div class="flex items-center gap-4">
          <DatePicker
            class="w-full"
            v-model="packageInfo.publishedDateStart"
            placeholder="上架日期"
            auto-position="bottom"
            clearable
          />
          <span class="mx-3 text-black">～</span>
          <DatePicker
            class="w-full"
            v-model="packageInfo.publishedDateEnd"
            placeholder="下架日期"
            auto-position="bottom"
            clearable
          />
        </div>
        <BaseInput
          v-model="packageInfo.packageName"
          :required="true"
          title="套組名稱"
        />
        <div>
          <div class="mb-3">套組照片</div>
          <ImageUpload
            class="h-[200px] w-[200px]"
            v-model:current-file="packageInfo.image"
          />
        </div>
        <div class="grid grid-cols-2 gap-7">
          <Select
            v-model="packageInfo.modelId"
            title="車型"
            :options="carList"
            :required="true"
            :rules="['required']"
            @change="handleChangeCarInfo('modelId', packageInfo)"
          />
          <Select
            v-model="packageInfo.modelYearId"
            title="年式"
            :options="formOptions.yearOptions"
            :disabled="formOptions.yearOptions.length === 0"
            :initValue="{
              label: packageInfo.modelYearName,
              value: packageInfo.modelYearId,
            }"
            :required="true"
            :rules="['required']"
            @change="handleChangeCarInfo('modelYearId', packageInfo)"
          />
          <Select
            v-model="packageInfo.modelConfigId"
            title="車款動力"
            :options="formOptions.configOptions"
            :disabled="formOptions.configOptions.length === 0"
            :initValue="{
              label: packageInfo.modelConfigName ?? '',
              value: packageInfo.modelConfigId,
            }"
            :required="true"
            :rules="['required']"
            @change="handleChangeCarInfo('modelConfigId', packageInfo)"
          />
          <Select
            v-model="packageInfo.modelColorId"
            title="車色"
            :options="formOptions.colorOptions"
            :disabled="formOptions.colorOptions.length === 0"
            :initValue="{
              label: packageInfo.modelColorName ?? '',
              value: packageInfo.modelColorId,
            }"
            :required="true"
            :rules="['required']"
            @change="handleChangeCarInfo('modelColorId', packageInfo)"
          />
          <Select
            v-model="packageInfo.modelTrimId"
            title="內裝"
            :options="formOptions.trimOptions"
            :disabled="formOptions.trimOptions.length === 0"
            :initValue="{
              label: packageInfo.modelTrimName ?? '',
              value: packageInfo.modelTrimId,
            }"
            :required="true"
            :rules="['required']"
            @change="handleChangeCarInfo('modelTrimId', packageInfo)"
          />
          <div>
            <MultiSelect
              v-model="packageInfo.packageDmsOptions"
              title="選配"
              placeholder="請選擇選配"
              :options="formOptions.optionOptions"
              :disabled="formOptions.optionOptions.length === 0"
              :required="true"
            />
          </div>
        </div>

        <div>
          <div class="mb-3">加選項目</div>
          <div>
            <div
              class="mb-3 flex items-center gap-4"
              v-for="(item, index) in list"
              :key="index"
            >
              <BaseInput v-model="item.name" />
              <CurrencyInput class="w-[200px]" v-model="item.price" />
              <Icon
                class="cursor-pointer"
                icon-name="delete"
                @click="handleDeleteItem(index)"
              />
            </div>
          </div>
          <div class="justify-items mt-3 flex w-full">
            <button class="button-blue" @click="handleAddItem">新增項目</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-7">
          <div>
            <div class="mb-3">原價</div>
            <CurrencyInput
              v-model="packageInfo.vehicleRetailAllAmount"
              :required="true"
            />
          </div>

          <div>
            <div class="mb-3">優惠價</div>
            <CurrencyInput
              v-model="packageInfo.vehicleDealAllAmount"
              :required="true"
            />
          </div>
        </div>

        <div class="justify-items mt-3 flex w-full gap-4">
          <router-link
            class="button-gray w-full"
            :to="{
              name: 'setMaintain',
              query: { page: String(paginationInfo.page) },
            }"
            >返回</router-link
          >
          <button class="button-blue w-full" @click="handleSave">儲存</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import Icon from "@/components/Icon.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import Select from "@/components/Select.vue";
import { useCarService } from "@/composables/carService";
import { usePackageStore } from "@/stores/packageStore";

const route = useRoute();
const router = useRouter();
const packageStore = usePackageStore();
const { packageInfo, paginationInfo } = storeToRefs(packageStore);

if (route.params.id) {
  packageStore.getPackageDetail(Number(route.params.id));
} else {
  packageStore.resetPackageInfo();
}

const carService = useCarService();
const {
  formOptions,
  handleChangeCarInfo,
  findRestFieldKeys,
  setOptions,
  fieldInfoMap,
} = carService;
const carList = ref<
  {
    value: string;
    code: string;
    label: string;
  }[]
>([]);

onMounted(async () => {
  carList.value = await carService.getCarList();
  list.value =
    packageInfo.value.packageOptions.length > 0
      ? packageInfo.value.packageOptions
      : [
          {
            name: "",
            price: 0,
          },
        ];
  const keys = findRestFieldKeys("modelId");
  for (const key of keys) {
    const carInfo = fieldInfoMap.get(key);
    if (carInfo) {
      await setOptions(
        carInfo.optionsKey,
        carInfo.callbackKey,
        packageInfo.value,
      );
    }
  }
});

const v$ = useVuelidate();

const list = ref([
  {
    name: "",
    price: 0,
  },
]);

function handleAddItem() {
  list.value.push({
    name: "",
    price: 0,
  });
}

function handleDeleteItem(index: number) {
  if (list.value.length === 1) {
    list.value = [
      {
        name: "",
        price: 0,
      },
    ];
    return;
  }
  list.value.splice(index, 1);
}

async function handleSave() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  packageInfo.value.packageOptions = list.value;
  await packageStore.savePackage(packageInfo.value, Number(route.params.id));
  router.push({ name: "setMaintain" });
}
</script>

<style scoped></style>
