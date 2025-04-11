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

    <div class="mt-8 px-15 pb-15">
      <div class="text-black-400 mb-5 leading-6">車型樣式</div>

      <Tabs class="px-15" v-model="currentTabIndex" :tabs="tabs" />

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
              @click="handleChangeCarInfo('carId', car.id)"
            >
              <div
                class="mb-1 flex h-24 w-24 items-center justify-center rounded-[4px] bg-gray-200"
                :class="form.carId === car.id ? 'border-1 border-blue-500' : ''"
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
          v-model="form.year"
          title="年式"
          :options="formOptions.yearOptions"
          :disabled="formOptions.yearOptions.length === 0"
          @change="handleChangeCarInfo('year')"
        />
        <Select
          v-model="form.config"
          title="車款動力"
          :options="formOptions.configOptions"
          :disabled="formOptions.configOptions.length === 0"
          @change="handleChangeCarInfo('config')"
        />
        <Select
          v-model="form.color"
          title="車色"
          :options="formOptions.colorOptions"
          :disabled="formOptions.colorOptions.length === 0"
          @change="handleChangeCarInfo('color')"
        />
        <Select
          v-model="form.trim"
          title="內裝"
          :options="formOptions.trimOptions"
          :disabled="formOptions.trimOptions.length === 0"
          @change="handleChangeCarInfo('trim')"
        />
        <MultiSelect
          v-model="form.option"
          title="選配"
          placeholder="請選擇選配"
          :options="formOptions.optionOptions"
          :disabled="formOptions.optionOptions.length === 0"
          @change="handleChangeCarInfo('option')"
        />
        <BaseInput title="CC 數" placeholder="請填寫CC數" />
        <SingleChoiceButton
          title="動力系統"
          :options="[
            { value: '汽油', label: '汽油' },
            { value: '柴油', label: '柴油' },
            { value: '油電混合', label: '油電混合' },
          ]"
        />

        <Select title="出廠年份" :options="yearOfManufacture" />
        <BaseInput title="產地" placeholder="請輸入產地" />
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
              :options="[
                { value: '標配', label: '標配' },
                { value: '特訂', label: '特訂' },
              ]"
            />
          </div>
          <div class="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div class="text-black-400 mb-3">門座</div>
              <div class="flex items-center">
                <CurrencyInput class="w-15" /><span class="mx-2">門</span
                ><CurrencyInput class="w-15" /><span class="mx-2">座</span>
              </div>
            </div>
            <SingleChoiceButton
              title="天窗"
              :options="[
                { label: '有', value: '有' },
                { label: '無', value: '無' },
              ]"
            />
            <SingleChoiceButton
              title="排檔"
              :options="[
                { value: '自排', label: '自排' },
                { value: '手排', label: '手排' },
              ]"
            />
            <SingleChoiceButton
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
        <div class="mb-3">約定掛牌日期</div>
        <div class="flex items-start">
          <SingleChoiceButton
            v-model="agreedDateType"
            :options="[
              { value: '已進口車輛', label: '已進口車輛' },
              { value: '尚未進口車輛', label: '尚未進口車輛' },
            ]"
          />
          <div class="ml-6 flex-1">
            <DatePicker
              v-model="date"
              :disabled="agreedDateType === '尚未進口車輛'"
            />
            <span
              class="text-red text-xs font-light"
              v-if="agreedDateType === '尚未進口車輛'"
              >尚未進口車輛掛牌日期另行約定</span
            >
          </div>
        </div>
      </div>

      <div class="mt-8">
        <SingleChoiceButton
          class="mb-4"
          v-model="deliveryLocationType"
          title="交車地點"
          :options="[
            { value: '預設展示中心', label: '預設展示中心' },
            { value: '自訂交車地點', label: '自訂交車地點' },
          ]"
        />
        <Select
          class="w-full"
          v-if="deliveryLocationType === '預設展示中心'"
          v-model="form.exhibitionCenter"
          :options="exhibitionCenterOptions"
          placeholder="請選擇預設展示中心"
        ></Select>
        <div class="flex items-center gap-2" v-else>
          <Select
            class="w-30 flex-shrink-0"
            v-model.number="form.areaCode"
            :options="areaOptions"
            placeholder="縣市"
            @change="handleAreaChange"
          />
          <Select
            class="w-30 flex-shrink-0"
            v-model="form.district"
            :options="districtOptions"
            placeholder="鄉鎮市區"
          />
          <BaseInput class="w-full" v-model="form.address" placeholder="地址" />
        </div>
      </div>

      <router-link
        class="button-blue mt-12 w-full"
        :to="{ name: 'memberInfo' }"
      >
        下一步
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import HorizontalScroll from "@/components/HorizontalScroll.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import Tabs from "@/components/Tabs.vue";
import { useCar } from "@/composables/car";
import type { CarFormRequest } from "@/types/carType";
import county from "../assets/county.json";
import exhibitionCenter from "../assets/exhibitionCenter.json";

const carService = useCar();

const carInfoMap = new Map([
  ["carId", { optionsKey: "", callbackKey: "", nextKey: "year" }],
  [
    "year",
    {
      optionsKey: "yearOptions",
      callbackKey: "getYearOptions",
      nextKey: "config",
    },
  ],
  [
    "config",
    {
      optionsKey: "configOptions",
      callbackKey: "getConfigOptions",
      nextKey: "color",
    },
  ],
  [
    "color",
    {
      optionsKey: "colorOptions",
      callbackKey: "getColorOptions",
      nextKey: "trim",
    },
  ],
  [
    "trim",
    {
      optionsKey: "trimOptions",
      callbackKey: "getTrimOptions",
      nextKey: "option",
    },
  ],
  ["option", { optionsKey: "optionOptions", callbackKey: "getOptionOptions" }],
]);
const carInfoMapKeys = Array.from(carInfoMap.keys());
const form = ref<CarFormRequest>({
  carId: "",
  year: "",
  config: "",
  color: "",
  trim: "",
  option: [],
  area: "",
  areaCode: "",
  district: "",
  address: "",
  exhibitionCenter: "",
});
const formOptions = ref({
  yearOptions: [],
  configOptions: [],
  colorOptions: [],
  trimOptions: [],
  optionOptions: [],
});

onMounted(async () => {
  const carList = await carService.getCarList();
  carList.forEach((car) => {
    const matchData = carTypeList.value.find(
      (item) => item.name === car.modelName,
    );
    if (matchData) {
      matchData.id = car.modelId;
    }
  });
});

// ---車型樣式---
const currentTabIndex = ref<number>(0);
const tabs = ["電動", "雙能電動", "高效輕油電"];

const findRestMapKeys = (currentKey: string) => {
  const currentIndex = carInfoMapKeys.indexOf(currentKey);

  if (currentIndex !== -1) {
    return carInfoMapKeys.slice(currentIndex + 1);
  }

  return [];
};

const handleChangeCarInfo = async (formKey: string, value?: string) => {
  resetOptions(formKey);
  const info = carInfoMap.get(formKey);
  if (!info) return;

  if (value) {
    form.value[formKey] = value;
  }

  if (info.nextKey && carInfoMap.get(info.nextKey)) {
    const nextInfo = carInfoMap.get(info.nextKey)!;
    if (nextInfo.optionsKey && nextInfo.callbackKey) {
      const options = await carService[nextInfo.callbackKey](form.value);
      formOptions.value[nextInfo.optionsKey] = options;
    }
  }
};

const resetOptions = (currentKey: string) => {
  const keys = findRestMapKeys(currentKey);

  if (keys.length > 0) {
    // Reset form values for those keys
    keys.forEach((key) => {
      form.value[key] = "";
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

const carTypeList = ref([
  {
    id: "0",
    name: "EX40",
    img: new URL("@/assets/img/EX40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
  },
  {
    id: "1",
    name: "EX30",
    img: new URL("@/assets/img/EX30.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
  },
  {
    id: "2",
    name: "EC40",
    img: new URL("@/assets/img/EC40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "跨界跑旅",
  },
  {
    id: "3",
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
  },
  {
    id: "4",
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
  },
  {
    id: "5",
    name: "V60",
    img: new URL("@/assets/img/V60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "旅行車",
  },
  {
    id: "6",
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: "7",
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: "8",
    name: "XC40",
    img: new URL("@/assets/img/XC40.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: "9",
    name: "V60",
    img: new URL("@/assets/img/V60.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "旅行車",
  },
]);
const processedCarList = computed(() => {
  const filteredCarList = carTypeList.value.filter(
    (item) => item.mainCategory === tabs[currentTabIndex.value],
  );
  return Object.groupBy(filteredCarList, (item) => item.type);
});

// 出廠年份
const yearOfManufacture = computed(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return [...Array(currentYear - 2023 + 1).keys()]
    .map((i) => 2023 + i)
    .reverse();
});

// 優惠套裝
const carList = ref([
  {
    id: 0,
    name: "XC90 空力制霸極速狂飆優惠組合",
    marketPrice: 2332800,
    accessories: [
      {
        name: "空力套件",
        price: 609000,
      },
      {
        name: "全景天窗",
        price: 291000,
      },
      {
        name: "車頂置物架",
        price: 932800,
      },
    ],
    totalPrice: 3332800,
    salesPrice: 2848800,
  },
  {
    id: 1,
    name: "XC90 Ultimate 頂級奢華優惠組合",
    marketPrice: 2332800,
    accessories: [
      {
        name: "空力套件",
        price: 609000,
      },
      {
        name: "全景天窗",
        price: 291000,
      },
      {
        name: "車頂置物架",
        price: 932800,
      },
    ],
    totalPrice: 3332800,
    salesPrice: 2848800,
  },
  {
    id: 2,
    name: "XC90 尊榮優惠",
    marketPrice: 2332800,
    accessories: [],
    totalPrice: 2332800,
    salesPrice: 2330000,
  },
]);
const selectedProjectId = ref<number | null>(null);
const selectedProject = computed(() => {
  if (selectedProjectId.value !== null)
    return carList.value.find((car) => car.id === selectedProjectId.value);
  return null;
});

// 約定掛牌日期
const agreedDateType = ref<string>("");
const date = ref<Date | null>(null);

// ---交車地點---
const deliveryLocationType = ref<string>("預設展示中心");

// 展示中心
const exhibitionCenterOptions = exhibitionCenter;

// 縣市
const areaOptions = county
  .filter((item) => item.parentCode === null)
  .map((item) => ({
    value: item.countyCode,
    label: item.countyName,
  }));
const handleAreaChange = (value: string) => {
  form.value.district = "";
  form.value.area =
    areaOptions.find((item) => item.value === Number(value))?.label || "";
};

// 鄉鎮市區
const districtOptions = computed(() => {
  if (!form.value.area) return [];
  return county
    .filter((item) => item.parentCode === Number(form.value.areaCode))
    .map((item) => ({
      value: item.countyName,
      label: item.countyName,
    }));
});
</script>

<style scoped></style>
