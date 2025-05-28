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

      <!-- <Tabs class="px-15" v-model="currentTabIndex" :tabs="tabs" /> -->

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
              @click="handleChangeCarInfo('modelId', car.id)"
              :ref="
                (el) => {
                  if (form.order.modelId === car.id && el)
                    selectedCarRef = el as HTMLButtonElement;
                }
              "
            >
              <div
                class="mb-1 flex h-24 w-24 items-center justify-center rounded-[4px] bg-gray-200"
                :class="
                  form.order.modelId === car.id
                    ? 'border-1 border-blue-500'
                    : ''
                "
              >
                <img :src="car.img" alt="car" />
              </div>
              <div class="text-black-400 text-center text-xs">
                {{ car.name }}
              </div>
            </button>
          </div>
        </HorizontalScroll>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
        <Select
          v-model="form.order.modelYearId"
          title="年式"
          :options="formOptions.yearOptions"
          :disabled="formOptions.yearOptions.length === 0"
          :initValue="{
            label: form.order.modelYearName,
            value: form.order.modelYearId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelYearId')"
        />
        <Select
          v-model="form.order.modelConfigId"
          title="車款動力"
          :options="formOptions.configOptions"
          :disabled="formOptions.configOptions.length === 0"
          :initValue="{
            label: form.order.modelConfigName ?? '',
            value: form.order.modelConfigId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelConfigId')"
        />
        <Select
          v-model="form.order.modelColorId"
          title="車色"
          :options="formOptions.colorOptions"
          :disabled="formOptions.colorOptions.length === 0"
          :initValue="{
            label: form.order.modelColorName ?? '',
            value: form.order.modelColorId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelColorId')"
        />
        <Select
          v-model="form.order.modelTrimId"
          title="內裝"
          :options="formOptions.trimOptions"
          :disabled="formOptions.trimOptions.length === 0"
          :initValue="{
            label: form.order.modelTrimName ?? '',
            value: form.order.modelTrimId,
          }"
          :required="true"
          :rules="['required']"
          @change="handleChangeCarInfo('modelTrimId')"
        />
        <div>
          <MultiSelect
            v-model="form.order.personalityOptionVOList"
            title="選配"
            placeholder="請選擇選配"
            :options="formOptions.optionOptions"
            :disabled="formOptions.optionOptions.length === 0"
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
        <!-- <div>優惠套裝</div> -->
        <!-- <HorizontalScroll
          ><Card
            v-for="(car, index) in carList"
            v-model="selectedProjectId"
            :key="`car${car.id}`"
            :car="car"
            :class="
              selectedProjectId === car.id
                ? 'border-2 border-blue-500'
                : 'border-1 border-gray-600'
            "
        /></HorizontalScroll> -->
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
              label: form.order.cityName,
              value: form.order.cityId,
            }"
            :required="true"
            @change="handleAreaChange"
          />
          <Select
            class="w-30 flex-shrink-0"
            v-model.number="form.deliveryDistrictId"
            :options="districtOptions"
            :initValue="{
              label: form.order.districtName,
              value: form.order.districtId,
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
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import { useCarService } from "@/composables/carService";
import { useErrorHint } from "@/composables/useErrorHint";
import { useContractStore } from "@/stores/contractStore";
import county from "../assets/county.json";
import exhibitionCenter from "../assets/exhibitionCenter.json";

const router = useRouter();
const contractStore = useContractStore();
const carService = useCarService();
const { scrollToError } = useErrorHint();

const carInfoMap = new Map([
  [
    "modelId",
    {
      optionsKey: "modelOptions",
      callbackKey: "",
      nextKey: "modelYearId",
      labelKey: "modelName",
      codeKey: "modelCode",
    },
  ],
  [
    "modelYearId",
    {
      optionsKey: "yearOptions",
      callbackKey: "getYearOptions",
      nextKey: "modelConfigId",
      labelKey: "modelYearName",
      codeKey: "modelYearCode",
    },
  ],
  [
    "modelConfigId",
    {
      optionsKey: "configOptions",
      callbackKey: "getConfigOptions",
      nextKey: "modelColorId",
      labelKey: "modelConfigName",
      codeKey: "modelConfigCode",
    },
  ],
  [
    "modelColorId",
    {
      optionsKey: "colorOptions",
      callbackKey: "getColorOptions",
      nextKey: "modelTrimId",
      labelKey: "modelColorName",
      codeKey: "modelColorCode",
    },
  ],
  [
    "modelTrimId",
    {
      optionsKey: "trimOptions",
      callbackKey: "getTrimOptions",
      nextKey: "modelOptionNames",
      labelKey: "modelTrimName",
      codeKey: "modelTrimCode",
    },
  ],
  [
    "modelOptionNames",
    {
      optionsKey: "optionOptions",
      callbackKey: "getOptionOptions",
    },
  ],
]);
const carInfoMapKeys = Array.from(carInfoMap.keys());

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

onMounted(async () => {
  const carList = await carService.getCarList();
  formOptions.value.modelOptions = carTypeList.value.map((carType) => {
    const matchedCar = carList.find((car) => car.label === carType.name);
    return {
      ...carType,
      ...matchedCar,
      id: matchedCar?.value ?? "",
    };
  });

  const currentCarInfo = carTypeList.value.find(
    (car) => car.id === form.value.order.modelId,
  );
  if (currentCarInfo) {
    currentTabIndex.value = tabs.indexOf(currentCarInfo.mainCategory);
  }

  const keys = findRestMapKeys("modelId");
  for (const key of keys) {
    const carInfo = carInfoMap.get(key);
    if (carInfo) {
      setOptions(carInfo.optionsKey, carInfo.callbackKey);
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

const findRestMapKeys = (currentKey: string) => {
  const currentIndex = carInfoMapKeys.indexOf(currentKey);

  if (currentIndex !== -1) {
    return carInfoMapKeys.slice(currentIndex + 1);
  }

  return [];
};

const setOptions = async (optionsKey: string, callbackKey: string) => {
  if (callbackKey) {
    const options = await carService[callbackKey](form.value.order);
    if (options) formOptions.value[optionsKey] = options;
  }
};

const handleChangeCarInfo = async (formKey: string, value?: string) => {
  resetOptions(formKey);
  const info = carInfoMap.get(formKey);
  if (!info) return;

  if (value) {
    form.value.order[formKey] = value;
  }

  if (info.codeKey && info.labelKey) {
    const id = form.value.order[formKey];
    const option = formOptions.value[info.optionsKey]?.find(
      (item) => item.value === id,
    );
    if (option) {
      form.value.order[info.codeKey] = option.code;
      form.value.order[info.labelKey] = option.label;
    }
  }

  if (info.nextKey && carInfoMap.get(info.nextKey)) {
    const nextInfo = carInfoMap.get(info.nextKey)!;
    if (nextInfo.optionsKey && nextInfo.callbackKey) {
      setOptions(nextInfo.optionsKey, nextInfo.callbackKey);
    }
  }
};

const resetOptions = (currentKey: string) => {
  const keys = findRestMapKeys(currentKey);

  if (keys.length > 0) {
    // Reset form values for those keys
    keys.forEach((key) => {
      if (key === "modelOptionNames") {
        form.value.order[key] = [];
      } else {
        form.value.order[key] = "";
      }
    });

    // Reset options arrays for those keys
    keys.forEach((key) => {
      const optionsName = carInfoMap.get(key);
      if (optionsName) {
        // Reset the options array to empty
        formOptions.value[optionsName.optionsKey] = [];
      }
    });
  }
};

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
const currentTabIndex = ref<number>(0);
const tabs = ["電動", "雙能電動", "高效輕油電"];

const carTypeList = ref([
  {
    id: "0",
    name: "EX40",
    img: new URL("@/assets/img/EX40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "1",
    name: "EX30",
    img: new URL("@/assets/img/EX30.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "2",
    name: "EC40",
    img: new URL("@/assets/img/EC40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "跨界跑旅",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "3",
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "4",
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  {
    id: "5",
    name: "V60",
    img: new URL("@/assets/img/V60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "旅行車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  // {
  //   id: "6",
  //   name: "XC90",
  //   img: new URL("@/assets/img/XC90.png", import.meta.url).href,
  //   mainCategory: "高效輕油電",
  //   type: "休旅車",
  // },
  // {
  //   id: "7",
  //   name: "XC60",
  //   img: new URL("@/assets/img/XC60.png", import.meta.url).href,
  //   mainCategory: "高效輕油電",
  //   type: "休旅車",
  // },
  {
    id: "8",
    name: "XC40",
    img: new URL("@/assets/img/XC40.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
    modelId: "",
    modelCode: "",
    modelName: "",
  },
  // {
  //   id: "9",
  //   name: "V60",
  //   img: new URL("@/assets/img/V60.png", import.meta.url).href,
  //   mainCategory: "高效輕油電",
  //   type: "旅行車",
  // },
]);
const processedCarList = computed(() => {
  // const filteredCarList = carTypeList.value.filter(
  //   (item) => item.mainCategory === tabs[currentTabIndex.value],
  // );
  return Object.groupBy(formOptions.value.modelOptions, (item) => item.type);
});

// 出廠年份
const yearOfManufacture = computed(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return [...Array(currentYear - 2023 + 1).keys()]
    .map((i) => String(2023 + i))
    .reverse();
});

// 優惠套裝
// const carList = ref([
//   {
//     id: 0,
//     name: "XC90 空力制霸極速狂飆優惠組合",
//     marketPrice: 2332800,
//     accessories: [
//       {
//         name: "空力套件",
//         price: 609000,
//       },
//       {
//         name: "全景天窗",
//         price: 291000,
//       },
//       {
//         name: "車頂置物架",
//         price: 932800,
//       },
//     ],
//     totalPrice: 3332800,
//     salesPrice: 2848800,
//   },
//   {
//     id: 1,
//     name: "XC90 Ultimate 頂級奢華優惠組合",
//     marketPrice: 2332800,
//     accessories: [
//       {
//         name: "空力套件",
//         price: 609000,
//       },
//       {
//         name: "全景天窗",
//         price: 291000,
//       },
//       {
//         name: "車頂置物架",
//         price: 932800,
//       },
//     ],
//     totalPrice: 3332800,
//     salesPrice: 2848800,
//   },
//   {
//     id: 2,
//     name: "XC90 尊榮優惠",
//     marketPrice: 2332800,
//     accessories: [],
//     totalPrice: 2332800,
//     salesPrice: 2330000,
//   },
// ]);
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
