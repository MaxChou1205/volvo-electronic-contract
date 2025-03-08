<template>
  <div class="h-60 w-99 rounded-[4px] p-3">
    <div
      class="text-black-400 flex h-full items-stretch gap-3 text-sm font-normal"
    >
      <div class="flex h-full flex-col items-stretch justify-between">
        <div class="h-43 w-43">
          <img
            src="@/assets/img/car1.png"
            alt=""
            class="h-full w-full object-cover"
          />
        </div>
        <router-link to="" class="block text-blue-500">更多說明</router-link>
      </div>
      <div class="flex flex-1 flex-col text-xs">
        <div class="mb-3 flex justify-between text-sm">
          <span>車價</span>
          <span
            ><span class="text-gray-600">NT$ </span>
            {{ car.marketPrice?.toLocaleString() }}</span
          >
        </div>
        <div class="mb-3 flex-1">
          <span v-if="car.accessories.length > 0">配件 / 售價：</span>
          <ul class="mt-1">
            <li
              class="ml-5 list-disc"
              v-for="(accessory, index) in car.accessories.slice(0, 3)"
              :key="`accessory-${index}`"
            >
              <div class="flex justify-between space-y-1">
                <span>{{ accessory.name }}</span>
                <span class="text-right text-gray-600"
                  >NT$ {{ accessory.price }}</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-2 flex justify-between text-gray-600">
          <span>原價</span>
          <span
            ><span class="mr-1 text-gray-600">NT$</span>
            <del>{{ car.totalPrice?.toLocaleString() }}</del></span
          >
        </div>
        <div class="mb-2 flex justify-between">
          <span>優惠價</span>
          <span class="text-base"
            ><span>NT$ </span>{{ car.salesPrice?.toLocaleString() }}</span
          >
        </div>
        <button
          class="h-8 py-2 text-sm"
          :class="selectedProject === car.id ? 'button-blue' : 'button-white'"
          @click="selectedProject = car.id"
        >
          {{ selectedProject === car.id ? "已選擇此套組" : "選擇此套組" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Car = {
  id: number;
  name: string;
  marketPrice: number;
  accessories: {
    name: string;
    price: number;
  }[];
  totalPrice: number;
  salesPrice: number;
};

const { car } = defineProps<{
  car: Car;
}>();

const selectedProject = defineModel<number | null>({ default: null });
</script>

<style scoped></style>
