<template>
  <div>
    <div class="h-60 overflow-hidden">
      <img
        class="object-cover object-[0_-44px]"
        src="@/assets/img/banner2.png"
        alt="banner"
      />
    </div>

    <h1 class="mx-auto my-8 text-center text-[40px]">電子合約</h1>

    <Stepper :currentStep="2" />

    <div class="mt-8 px-15 pb-15">
      <SingleChoiceButton
        class="mb-8"
        v-model="buyerType"
        title="買方類型"
        :options="[
          { value: '個人', label: '個人' },
          { value: '公司', label: '公司' },
        ]"
      />

      <div class="grid grid-cols-2 gap-x-6 gap-y-8" v-if="buyerType === '個人'">
        <BaseInput
          v-model="buyerInfo.name"
          title="訂購人名稱"
          placeholder="請輸入訂購人名稱"
        />
        <BaseInput
          v-model="buyerInfo.idNo"
          title="訂購人身分證字號"
          placeholder="請輸入訂購人身分證字號"
        />
        <div>
          <BaseInput
            v-model="buyerInfo.officialName"
            title="約定掛牌名稱"
            placeholder="請輸入約定掛牌名稱"
          />
          <Checkbox
            class="mt-3"
            label="同訂購人"
            :value="true"
            @change="handleSameBuyer"
          />
        </div>
        <BaseInput
          v-model="buyerInfo.officialIdNo"
          title="身分證字號"
          placeholder="請輸入身分證字號"
        />
        <BaseInput
          v-model="buyerInfo.phone"
          title="主要聯絡電話（手機）"
          placeholder="請輸入掛牌人手機號碼"
        />
        <BaseInput
          v-model="buyerInfo.email"
          title="常用聯絡 E-mail"
          placeholder="請輸入 E-mail"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-6 gap-y-8" v-else>
        <BaseInput title="約定掛牌名稱" placeholder="請輸入約定掛牌名稱" />
        <BaseInput title="統一編號" placeholder="請輸入統一編號" />
        <BaseInput title="代表人名稱" placeholder="請輸入代表人名稱" />
        <BaseInput
          title="代表人身分證字號"
          placeholder="請輸入代表人身分證字號"
        />
        <BaseInput title="主要聯絡電話（手機）" placeholder="請輸入手機號碼" />
        <BaseInput title="常用聯絡 E-mail" placeholder="請輸入 E-mail" />
      </div>

      <div class="mt-8">
        <div class="mb-3">掛牌戶籍地址</div>
        <div class="flex w-full items-center gap-2">
          <Select class="w-30 flex-shrink-0" placeholder="縣市" :options="[]" />
          <Select
            class="w-30 flex-shrink-0"
            placeholder="鄉鎮市區"
            :options="[]"
          />
          <BaseInput class="w-full" placeholder="請輸入地址" />
        </div>
      </div>

      <div class="mt-12 flex w-full items-center gap-7">
        <router-link class="button-gray w-full" :to="{ name: 'modelStyle' }">
          上一步
        </router-link>
        <router-link class="button-blue w-full" :to="{ name: 'paymentInfo' }">
          下一步
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";

// 買方類型
const buyerType = ref("個人");

// 個人
const buyerInfo = ref({
  name: "",
  idNo: "",
  officialName: "",
  officialIdNo: "",
  phone: "",
  email: "",
});

const handleSameBuyer = (value: boolean) => {
  if (value) {
    buyerInfo.value.officialName = buyerInfo.value.name;
    buyerInfo.value.officialIdNo = buyerInfo.value.idNo;
  }
};
</script>

<style scoped></style>
