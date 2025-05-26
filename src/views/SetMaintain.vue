<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">優惠套組維護</h1>
    </header>

    <main class="overflow-auto p-4">
      <div class="space-y-8">
        <Checkbox value="" label="上架顯示於車型樣式" />
        <BaseInput title="套組名稱" />
        <div>
          <div class="mb-3">套組照片</div>
          <ImageUpload class="h-[200px] w-[200px]" />
        </div>
        <div class="grid grid-cols-2 gap-7">
          <Select title="年式" :options="[{ label: '2024', value: 2024 }]" />
          <Select
            title="車款動力"
            :options="[{ label: '汽油', value: '汽油' }]"
            :required="true"
            :rules="['required']"
          />
          <Select
            title="車色"
            :options="[{ label: '黑色', value: '黑色' }]"
            :required="true"
            :rules="['required']"
          />
          <Select
            title="內裝"
            :options="[{ label: '黑色', value: '黑色' }]"
            :required="true"
            :rules="['required']"
          />
          <div>
            <MultiSelect title="選配" placeholder="請選擇選配" :options="[]" />
            <!-- <span v-if=".modelOptionNames">{{
            errors.modelOptionNames
          }}</span> -->
          </div>
        </div>

        <div>
          <div class="mb-3">套組清單</div>
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
            <button class="button-blue" @click="handleAddItem">新增套組</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-7">
          <div>
            <div class="mb-3">原價</div>
            <CurrencyInput />
          </div>

          <div>
            <div class="mb-3">優惠價</div>
            <CurrencyInput />
          </div>
        </div>

        <div class="justify-items mt-3 flex w-full gap-4">
          <router-link class="button-gray w-full" :to="{ name: 'setMaintain' }"
            >返回</router-link
          >
          <button class="button-blue w-full">儲存</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import Icon from "@/components/Icon.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import Select from "@/components/Select.vue";

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
</script>

<style scoped></style>
