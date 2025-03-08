<template>
  <div>
    <div class="h-60 overflow-hidden">
      <img
        src="@/assets/img/banner1.png"
        class="object-cover object-[0_-175px]"
        alt="banner"
      />
    </div>

    <h1 class="mx-auto my-8 text-center text-[40px]">電子合約</h1>

    <Stepper :currentStep="1" />

    <div class="mt-8 px-15 pb-15">
      <div class="text-black-400 mb-5 leading-6">車型樣式</div>

      <Tabs
        class="px-15"
        :tabs="['電動', '雙能電動', '高效輕油電']"
        v-model="currentTab"
      />

      <div class="relative">
        <HorizontalScroll>
          <div
            v-for="(cars, type, index) in processedCarList"
            :key="index"
            class="flex flex-shrink-0 items-center gap-x-4"
          >
            <span class="text-sm">{{ type }}</span>
            <button
              v-for="(car, carIndex) in cars"
              :key="carIndex"
              class="flex cursor-pointer flex-col"
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
        <Select label="級別" :options="[]" />
        <Select label="CC 數" :options="[]" />
        <Select label="年式" :options="[]" />
        <Select label="出廠年份" :options="[]" />
        <Select label="車色及代碼" :options="[]" />
        <Select label="內裝代碼" :options="[]" />
        <Select label="中控飾板" :options="[]" />
        <Select label="產地" :options="[]" />
      </div>

      <hr class="divider" />

      <div class="mt-8">
        <div>訂購類型</div>
        <HorizontalScroll
          ><Card
            v-for="(car, index) in carList"
            :key="`car${car.id}`"
            :car="car"
            :class="
              selectedProject === car.id
                ? 'border-2 border-blue-500'
                : 'border-1 border-gray-600'
            "
            v-model="selectedProject"
        /></HorizontalScroll>
        <hr class="divider" />
      </div>

      <div class="mt-8">
        <div class="mb-3">約定掛牌日期</div>
        <div class="flex items-center">
          <RadioButton
            :options="[
              { value: '已進口車輛', label: '已進口車輛' },
              { value: '尚未進口車輛', label: '尚未進口車輛' },
            ]"
          />
          <DatePicker class="ml-6 flex-1" v-model="date" />
        </div>
      </div>

      <div class="mt-8">
        <div class="mb-3">交車地點</div>
        <RadioButton
          :options="[
            { value: '預設展示中心', label: '預設展示中心' },
            { value: '自訂交車地點', label: '自訂交車地點' },
          ]"
        />
        <Select
          :options="['新凱汽車士林展示暨服務中心']"
          placeholder="請選擇預設展示中心"
          class="mt-4"
        ></Select>
      </div>

      <button class="button-blue mt-12 w-full" @click="handleNext">
        下一步
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Card from "@/components/CarCard.vue";
import DatePicker from "@/components/DatePicker.vue";
import HorizontalScroll from "@/components/HorizontalScroll.vue";
import RadioButton from "@/components/RadioButton.vue";
import Select from "@/components/Select.vue";
import Stepper from "@/components/Stepper.vue";
import Tabs from "@/components/Tabs.vue";

const currentTab = ref<number>(0);
const carTypeList = ref([
  {
    id: 0,
    name: "XC60 Recharge",
    img: new URL("@/assets/img/XC60 Recharge.png", import.meta.url).href,
    type: "休旅車",
  },
  {
    id: 1,
    name: "XC90 Recharge",
    img: new URL("@/assets/img/XC90 Recharge.png", import.meta.url).href,
    type: "休旅車",
  },
  {
    id: 2,
    name: "S60 Recharge",
    img: new URL("@/assets/img/S60 Recharge.png", import.meta.url).href,
    type: "轎車",
  },
  {
    id: 3,
    name: "S90 Recharge",
    img: new URL("@/assets/img/S90 Recharge.png", import.meta.url).href,
    type: "轎車",
  },
  {
    id: 4,
    name: "V60 Recharge",
    img: new URL("@/assets/img/V60 Recharge.png", import.meta.url).href,
    type: "旅行車",
  },
]);
const processedCarList = computed(() =>
  Object.groupBy(carTypeList.value, (item) => item.type),
);
const selectedCar = ref<number | null>(null);

const carList = ref([
  {
    id: 0,
    name: "XC90 Recharge 空力制霸極速狂飆優惠組合",
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
    name: "XC90 Recharge Ultimate 頂級奢華優惠組合",
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
    name: "XC90 Recharge 尊榮優惠",
    marketPrice: 2332800,
    accessories: [],
    totalPrice: 2332800,
    salesPrice: 2330000,
  },
]);

const date = ref<Date | null>(null);

const selectedProject = ref<number | null>(null);

const handleNext = () => {
  console.log("next");
};
</script>

<style scoped></style>
