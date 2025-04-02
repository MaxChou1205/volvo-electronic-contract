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
              @click="selectedCar = car.id"
            >
              <div
                class="mb-1 flex h-24 w-24 items-center justify-center rounded-[4px] bg-gray-200"
                :class="
                  selectedCar === car.id ? 'border-1 border-blue-500' : ''
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
        <Select title="級別" :options="[]" />
        <BaseInput title="CC 數" placeholder="請填寫CC數" />
        <SingleChoiceButton
          title="動力系統"
          :options="[
            { value: '汽油', label: '汽油' },
            { value: '柴油', label: '柴油' },
            { value: '油電混合', label: '油電混合' },
          ]"
        />
        <Select title="年式" :options="[]" />
        <Select title="出廠年份" :options="yearOfManufacture" />
        <Select title="車色及代碼" :options="[]" />
        <Select title="內裝代碼" :options="[]" />
        <Select title="中控飾板" :options="[]" />
        <Select title="產地" :options="[]" />
      </div>

      <hr class="divider" />

      <div class="mt-8">
        <div>優惠套裝</div>
        <HorizontalScroll
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
        /></HorizontalScroll>
        <div class="text-black-400" v-if="selectedProject">
          <div class="mb-8">
            <SingleChoiceButton
              :title="selectedProject.name"
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
            <MultiChoiceButton
              title="其他"
              :options="[
                { label: '空力套件', value: '空力套件' },
                { label: '車定置物架', value: '車定置物架' },
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
          :options="['新凱汽車士林展示暨服務中心']"
          placeholder="請選擇預設展示中心"
        ></Select>
        <div class="flex items-center gap-2" v-else>
          <Select class="w-30 flex-shrink-0" :options="[]" placeholder="縣市" />
          <Select
            class="w-30 flex-shrink-0"
            :options="[]"
            placeholder="鄉鎮市區"
          />
          <BaseInput class="w-full" placeholder="地址" />
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
import { computed, ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Card from "@/components/CarCard.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import HorizontalScroll from "@/components/HorizontalScroll.vue";
import MultiChoiceButton from "@/components/MultiChoiceButton.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import Tabs from "@/components/Tabs.vue";

// 車型樣式
const currentTabIndex = ref<number>(0);
const tabs = ["電動", "雙能電動", "高效輕油電"];
const carTypeList = ref([
  {
    id: 0,
    name: "EX40",
    img: new URL("@/assets/img/EX40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
  },
  {
    id: 1,
    name: "EX30",
    img: new URL("@/assets/img/EX30.png", import.meta.url).href,
    mainCategory: "電動",
    type: "休旅車",
  },
  {
    id: 2,
    name: "EC40",
    img: new URL("@/assets/img/EC40.png", import.meta.url).href,
    mainCategory: "電動",
    type: "跨界跑旅",
  },
  {
    id: 3,
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
  },
  {
    id: 4,
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "休旅車",
  },
  {
    id: 5,
    name: "V60",
    img: new URL("@/assets/img/V60.png", import.meta.url).href,
    mainCategory: "雙能電動",
    type: "旅行車",
  },
  {
    id: 6,
    name: "XC90",
    img: new URL("@/assets/img/XC90.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: 7,
    name: "XC60",
    img: new URL("@/assets/img/XC60.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: 8,
    name: "XC40",
    img: new URL("@/assets/img/XC40.png", import.meta.url).href,
    mainCategory: "高效輕油電",
    type: "休旅車",
  },
  {
    id: 9,
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
const selectedCar = ref<number | null>(null);

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

// 交車地點
const deliveryLocationType = ref<string>("預設展示中心");
</script>

<style scoped></style>
