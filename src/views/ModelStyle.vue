<template>
  <div class="mx-auto max-w-screen-md">
    <div class="h-60 overflow-hidden">
      <img
        class="object-cover object-[0_-175px]"
        src="@/assets/img/banner1.png"
        alt="banner"
      />
    </div>

    <h1 class="mx-auto my-8 text-center text-[40px]">電子合約</h1>

    <Stepper :currentStep="1" />

    <div class="mt-8 px-15 pb-15" v-if="form">
      <div class="text-black-400 required-asterisk mb-5 leading-6">
        車型樣式
      </div>

      <div class="relative">
        <HorizontalScroll>
          <div
            class="flex flex-shrink-0 items-center gap-x-4"
            v-for="(cars, type, index) in processedCarList"
            :key="index"
          >
            <span class="text-sm">{{ type }}</span>
            <button
              class="flex cursor-pointer flex-col"
              v-for="(car, carIndex) in cars"
              :key="carIndex"
              @click="
                handleChangeCarInfo('modelId', form.order, String(car.modelId));
                fetchPackageList();
              "
              :ref="
                (el) => {
                  if (String(form.order.modelId) === String(car.modelId) && el)
                    selectedCarRef = el as HTMLButtonElement;
                }
              "
            >
              <div
                class="mb-1 flex h-24 w-24 items-center justify-center rounded-[4px] bg-gray-200"
                :class="
                  String(form.order.modelId) === String(car.modelId)
                    ? 'border-1 border-blue-500'
                    : ''
                "
              >
                <img :src="car.thumbnailUrl" alt="car" />
              </div>
              <div class="text-black-400 text-center text-xs">
                {{ car.modelName }}
              </div>
            </button>
          </div>
        </HorizontalScroll>
      </div>

      <div v-if="form.order.modelId && packageList.length > 0">
        <div>優惠套裝</div>
        <HorizontalScroll
          ><PackageCard
            v-for="packageInfo in packageList"
            :key="`car${packageInfo.id}`"
            :packageInfo="packageInfo"
            :selectedPackage="selectedPackage"
            @change="handlePackageChange"
        /></HorizontalScroll>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
        <Select
          v-model="form.order.modelYearId"
          title="年式"
          :options="
            carFormOptions.yearOptions.length > 0
              ? carFormOptions.yearOptions
              : [
                  {
                    label: form.order.modelYearName || '',
                    value: form.order.modelYearId,
                  },
                ]
          "
          :disabled="
            carFormOptions.yearOptions.length === 0 || selectedPackage != null
          "
          :initValue="{
            label: form.order.modelYearName,
            value: form.order.modelYearId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelYearId', form.order)"
        />
        <Select
          v-model="form.order.modelConfigId"
          title="車款動力"
          :options="
            carFormOptions.configOptions.length > 0
              ? carFormOptions.configOptions
              : [
                  {
                    label: form.order.modelConfigName || '',
                    value: form.order.modelConfigId,
                  },
                ]
          "
          :disabled="
            carFormOptions.configOptions.length === 0 || selectedPackage != null
          "
          :initValue="{
            label: form.order.modelConfigName ?? '',
            value: form.order.modelConfigId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelConfigId', form.order)"
        />
        <Select
          v-model="form.order.modelColorId"
          title="車色"
          :options="
            carFormOptions.colorOptions.length > 0
              ? carFormOptions.colorOptions
              : [
                  {
                    label: form.order.modelColorName || '',
                    value: form.order.modelColorId,
                  },
                ]
          "
          :disabled="
            carFormOptions.colorOptions.length === 0 || selectedPackage != null
          "
          :initValue="{
            label: form.order.modelColorName ?? '',
            value: form.order.modelColorId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelColorId', form.order)"
        />
        <Select
          v-model="form.order.modelTrimId"
          title="內裝"
          :options="
            carFormOptions.trimOptions.length > 0
              ? carFormOptions.trimOptions
              : [
                  {
                    label: form.order.modelTrimName || '',
                    value: form.order.modelTrimId,
                  },
                ]
          "
          :disabled="
            carFormOptions.trimOptions.length === 0 || selectedPackage != null
          "
          :initValue="{
            label: form.order.modelTrimName ?? '',
            value: form.order.modelTrimId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelTrimId', form.order)"
        />
        <div>
          <MultiSelect
            v-model="form.order.personalityOptionVOList"
            title="選配"
            placeholder="請選擇選配"
            :options="
              carFormOptions.optionOptions.length > 0
                ? carFormOptions.optionOptions
                : form.order.personalityOptionVOList
            "
            :disabled="
              carFormOptions.optionOptions.length === 0 ||
              selectedPackage != null
            "
          />
          <!-- <span v-if=".modelOptionNames">{{
            errors.modelOptionNames
          }}</span> -->
        </div>
        <BaseInput v-model="form.cc" title="CC 數" placeholder="請填寫CC數" />
        <SingleChoiceButton
          v-model="form.powerSystem"
          title="動力系統"
          :options="[
            { value: '汽油', label: '汽油' },
            { value: '柴油', label: '柴油' },
            { value: '油電混合', label: '油電混合' },
            { value: '電動', label: '電動' },
          ]"
        />

        <Select
          v-model="form.factoryYear"
          title="出廠年份"
          required
          :options="yearOfManufacture"
        />
        <BaseInput
          v-model="form.origin"
          title="產地"
          placeholder="請輸入產地"
        />
      </div>

      <hr class="divider" />

      <div class="mt-8">
        <div class="text-black-400">
          <div class="mb-8">
            <SingleChoiceButton
              v-model="form.isSpecific"
              required
              :options="[
                { label: '標配', value: false },
                { label: '特訂', value: true },
              ]"
            />
          </div>
          <div class="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div class="text-black-400 mb-3">門座</div>
              <div class="flex items-center">
                <CurrencyInput class="w-15" v-model="form.door" /><span
                  class="mx-2"
                  >門</span
                ><CurrencyInput class="w-15" v-model="form.seat" /><span
                  class="mx-2"
                  >座</span
                >
              </div>
            </div>
            <SingleChoiceButton
              v-model="form.sunroof"
              title="天窗"
              :options="[
                { label: '有', value: '有' },
                { label: '無', value: '無' },
              ]"
            />
            <SingleChoiceButton
              v-model="form.gearShift"
              title="排檔"
              :options="[
                { label: '自排', value: '自排' },
                { label: '手排', value: '手排' },
              ]"
            />
            <SingleChoiceButton
              v-model="form.transmission"
              title="傳動"
              :options="[
                { label: '2WD', value: '2WD' },
                { label: '4WD', value: '4WD' },
              ]"
            />
          </div>
        </div>
        <hr class="divider" />
      </div>

      <div class="mt-8">
        <div class="required-asterisk mb-3">約定掛牌日期</div>
        <div class="flex items-start">
          <SingleChoiceButton
            v-model="form.isImported"
            :options="[
              { label: '已進口車輛', value: true },
              { label: '尚未進口車輛', value: false },
            ]"
            :required="true"
          />
          <div class="ml-6 flex-1">
            <DatePicker
              v-model="form.scheduledLicenseDate"
              :required="form.isImported ?? false"
              :disabled="!form.isImported"
            />
            <span class="text-red text-xs font-light" v-if="!form.isImported"
              >尚未進口車輛掛牌日期另行約定</span
            >
          </div>
        </div>
      </div>

      <div class="mt-8">
        <SingleChoiceButton
          class="mb-4"
          v-model="form.deliveryLocation"
          title="交車地點"
          :options="[
            { label: '預設展示中心', value: 0 },
            { label: '自訂交車地點', value: 1 },
          ]"
          :required="true"
          @change="handleDeliveryLocationChange"
        />
        <Select
          class="w-full"
          v-if="form.deliveryLocation === 0"
          v-model="form.showroom"
          :options="exhibitionCenterOptions"
          :required="true"
          placeholder="請選擇預設展示中心"
        ></Select>
        <div class="flex items-center gap-2" v-else>
          <Select
            class="w-30 flex-shrink-0"
            v-model.number="form.deliveryCityId"
            :options="cityOptions"
            placeholder="縣市"
            :initValue="{
              label: form.deliveryCityName,
              value: form.deliveryCityId,
            }"
            :required="true"
            @change="handleAreaChange"
          />
          <Select
            class="w-30 flex-shrink-0"
            v-model.number="form.deliveryDistrictId"
            :options="districtOptions"
            :initValue="{
              label: form.deliveryDistrictName,
              value: form.deliveryDistrictId,
            }"
            placeholder="鄉鎮市區"
            :required="true"
            @change="handleDistrictChange"
          />
          <BaseInput
            class="w-full"
            v-model="form.deliveryAddress"
            placeholder="地址"
            :required="true"
          />
        </div>
      </div>

      <div class="mt-12 flex w-full items-center gap-7">
        <router-link class="button-gray w-full" :to="{ name: 'order' }">
          回到訂單列表
        </router-link>
        <button class="button-blue w-full" type="submit" @click="handleNext">
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import BaseInput from "@/components/BaseInput.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import HorizontalScroll from "@/components/HorizontalScroll.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import PackageCard from "@/components/PackageCard.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import { useCarService } from "@/composables/carService";
import { useErrorHint } from "@/composables/useErrorHint";
import { carTypeList } from "@/constants/car";
import { useCompanyStore } from "@/stores/companyStore";
import { useContractStore } from "@/stores/contractStore";
import { usePackageStore } from "@/stores/packageStore";
import { useVehicleStore } from "@/stores/vehicleStore";
import type { PackageItem } from "@/types/packageType";
import county from "../assets/county.json";
import exhibitionCenter from "../assets/exhibitionCenter.json";

const router = useRouter();
const contractStore = useContractStore();
const carService = useCarService();
const {
  fieldInfoMap,
  formOptions: carFormOptions,
  handleChangeCarInfo,
  setOptions,
  findRestFieldKeys,
} = carService;
const { scrollToError } = useErrorHint();

const selectedCarRef = ref<HTMLButtonElement | null>(null);

const { contract: form } = storeToRefs(contractStore);
const formOptions = ref({
  modelOptions: [] as {
    id: string;
    name: string;
    img: string;
    mainCategory: string;
    type: string;
    value?: string;
    label?: string;
    code?: string;
  }[],
  yearOptions: [],
  configOptions: [],
  colorOptions: [],
  trimOptions: [],
  optionOptions: [],
});

const companyStore = useCompanyStore();
const { companyInfo } = storeToRefs(companyStore);
if (!companyInfo.value.id) {
  companyStore
    .getCompanyDetail(form.value.order.companyCode || "")
    .finally(() => {
      if (!companyInfo.value.id) {
        alert("查無經銷商資料");
        router.push({ name: "order" });
        return;
      }
    });
}

onMounted(async () => {
  const carList = await carService.getCarList();
  formOptions.value.modelOptions = carTypeList.map((carType) => {
    const matchedCar = carList.find((car) => car.label === carType.name);
    return {
      ...carType,
      ...matchedCar,
      id: matchedCar?.value ?? "",
    };
  });

  if (!form.value.order.modelCode || !form.value.order.modelName) {
    const currentCarInfo = formOptions.value.modelOptions.find(
      (car) => car.id === String(form.value.order.modelId),
    );
    form.value.order.modelCode = currentCarInfo?.code ?? "";
    form.value.order.modelName = currentCarInfo?.name ?? "";
  }

  const keys = findRestFieldKeys("modelId");
  for (const key of keys) {
    const carInfo = fieldInfoMap.get(key);
    if (carInfo) {
      await setOptions(
        carInfo.optionsKey,
        carInfo.callbackKey,
        form.value.order,
      );
    }
  }

  nextTick(() => {
    if (selectedCarRef.value) {
      selectedCarRef.value.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  });
});

const v$ = useVuelidate();

const handleNext = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    scrollToError();
    return;
  }
  router.push({ name: "memberInfo" });
};

// ---車型樣式---
const vehicleStore = useVehicleStore();
const { vehicleList } = storeToRefs(vehicleStore);

vehicleStore.getVehicleList(1, 100);

const processedCarList = computed(() => {
  return Object.groupBy(vehicleList.value, (item) => item.category);
});

// 優惠套裝
const selectedPackage = ref<number | null>(null);
const packageStore = usePackageStore();
const { packageList } = storeToRefs(packageStore);

const fetchPackageList = async () => {
  selectedPackage.value = null;
  packageStore.getPackageList(1, 100, "modifiedAt", {
    modelCode: form.value.order.modelCode,
    isPublished: true,
  });
};
fetchPackageList();

const handlePackageChange = (packageInfo: PackageItem | null) => {
  selectedPackage.value = packageInfo?.id ?? null;
  handleChangeCarInfo(
    "modelId",
    form.value.order,
    String(form.value.order.modelId),
  );
  form.value.order.personalityOptionVOList = [];
  if (packageInfo) {
    // 選擇套組
    form.value.order.modelColorId = packageInfo.modelColorId;
    form.value.order.modelColorName = packageInfo.modelColorName;
    form.value.order.modelColorCode = packageInfo.modelColorCode;

    form.value.order.modelTrimId = packageInfo.modelTrimId;
    form.value.order.modelTrimName = packageInfo.modelTrimName;
    form.value.order.modelTrimCode = packageInfo.modelTrimCode;

    form.value.order.modelConfigId = packageInfo.modelConfigId;
    form.value.order.modelConfigName = packageInfo.modelConfigName;
    form.value.order.modelConfigCode = packageInfo.modelConfigCode;

    form.value.order.modelYearId = packageInfo.modelYearId;
    form.value.order.modelYearName = packageInfo.modelYearName;
    form.value.order.modelYearCode = packageInfo.modelYearCode;

    form.value.order.personalityOptionVOList = [
      ...packageInfo.packageDmsOptions.map((item) => ({
        optionId: item.optionId,
        optionCode: item.optionCode,
        optionName: item.optionName,
        optionPrice: item.optionPrice,
        label: item.optionName,
        value: item.optionId,
        code: item.optionCode,
      })),
      ...packageInfo.packageOptions.map((item) => ({
        optionId: item.optionId,
        optionCode: item.optionCode,
        optionName: item.optionName,
        optionPrice: item.optionPrice,
        label: item.optionName,
        value: item.optionId,
        code: item.optionCode,
      })),
    ];

    form.value.order.vehicleRetailAllAmount =
      packageInfo.vehicleRetailAllAmount;
    form.value.order.orderAllAmount = packageInfo.vehicleRetailAllAmount;
    form.value.order.vehicleDealAllAmount = packageInfo.vehicleDealAllAmount;
  }
};

// 出廠年份
const yearOfManufacture = computed(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return [...Array(currentYear - 2023 + 1).keys()]
    .map((i) => String(2023 + i))
    .reverse();
});

// ---交車地點---
const handleDeliveryLocationChange = () => {
  form.value.showroom = "";
  form.value.deliveryCityId = null;
  form.value.deliveryCityName = "";
  form.value.deliveryDistrictId = null;
  form.value.deliveryDistrictName = "";
  form.value.deliveryAddress = "";
};
// 展示中心
const exhibitionCenterOptions = exhibitionCenter;

// 縣市
const cityOptions = county
  .filter((item) => item.parentCode === null)
  .map((item) => ({
    value: item.countyCode,
    label: item.countyName,
  }));
const handleAreaChange = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  form.value.deliveryCityId = Number(value);
  form.value.deliveryCityName = label;
  form.value.deliveryDistrictId = 0;
  form.value.deliveryDistrictName = "";
};

// 鄉鎮市區
const districtOptions = computed(() => {
  if (!form.value.deliveryCityId) return [];
  return county
    .filter((item) => item.parentCode === Number(form.value.deliveryCityId))
    .map((item) => ({
      value: item.countyCode,
      label: item.countyName,
    }));
});
const handleDistrictChange = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  form.value.deliveryDistrictId = Number(value);
  form.value.deliveryDistrictName = label;
};
</script>

<style scoped></style>
