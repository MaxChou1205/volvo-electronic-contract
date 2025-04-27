<template>
  <div class="mx-auto max-w-screen-md">
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
        v-model.number="form.order.drawerCtCode"
        title="買方類型"
        :options="[
          { value: 15231001, label: '個人' },
          { value: 15231002, label: '公司' },
          { value: 15231004, label: '租賃' },
        ]"
        :required="true"
      />

      <div
        class="grid grid-cols-2 gap-x-6 gap-y-8"
        v-if="form.order.drawerCtCode === 15231001"
      >
        <BaseInput
          v-model="form.order.customerName"
          title="訂購人名稱"
          placeholder="請輸入訂購人名稱"
          disabled
        />
        <BaseInput
          v-model="form.order.customerCertificateNo"
          title="訂購人身分證字號"
          placeholder="請輸入訂購人身分證字號"
          disabled
        />
        <div>
          <BaseInput
            v-model="form.order.drawerName"
            title="約定掛牌名稱"
            placeholder="請輸入約定掛牌名稱"
            :required="true"
          />
          <Checkbox
            class="mt-3"
            label="同訂購人"
            :value="true"
            @change="handleSameBuyer"
          />
        </div>
        <BaseInput
          v-model="form.order.drawerCertificateNo"
          title="身分證字號"
          placeholder="請輸入身分證字號"
        />
        <BaseInput
          v-model="form.order.drawerTel"
          title="主要聯絡電話（手機）"
          placeholder="請輸入掛牌人手機號碼"
          :required="true"
        />
        <BaseInput
          v-model="form.email"
          title="常用聯絡 E-mail"
          placeholder="請輸入 E-mail"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-6 gap-y-8" v-else>
        <BaseInput
          v-model="form.order.customerName"
          title="約定掛牌名稱"
          placeholder="請輸入約定掛牌名稱"
          :required="true"
        />
        <BaseInput
          v-model="form.order.customerCertificateNo"
          title="統一編號"
          placeholder="請輸入統一編號"
        />
        <BaseInput
          v-model="form.order.drawerName"
          title="代表人名稱"
          placeholder="請輸入代表人名稱"
        />
        <BaseInput
          v-model="form.order.drawerCertificateNo"
          title="代表人身分證字號"
          placeholder="請輸入代表人身分證字號"
        />
        <BaseInput
          v-model="form.order.drawerTel"
          title="主要聯絡電話（手機）"
          placeholder="請輸入手機號碼"
          :required="true"
        />
        <BaseInput title="常用聯絡 E-mail" placeholder="請輸入 E-mail" />
      </div>

      <div class="mt-8">
        <div class="required-asterisk mb-3">掛牌戶籍地址</div>
        <div class="flex w-full items-baseline gap-2">
          <Select
            class="w-30 flex-shrink-0"
            v-model="form.order.cityId"
            placeholder="縣市"
            :options="cityOptions"
            :initValue="{
              label: form.order.cityName ?? '',
              value: form.order.cityId,
            }"
            :required="true"
            @change="handleAreaChange"
          />
          <Select
            class="w-30 flex-shrink-0"
            v-model="form.order.districtId"
            placeholder="鄉鎮市區"
            :options="districtOptions"
            :initValue="{
              label: form.order.districtName ?? '',
              value: form.order.districtId,
            }"
            :required="true"
            @change="handleDistrictChange"
          />
          <BaseInput
            class="w-full"
            v-model="form.order.customerAddress"
            placeholder="請輸入地址"
            :required="true"
          />
        </div>
      </div>

      <div class="mt-12 flex w-full items-center gap-7">
        <router-link class="button-gray w-full" :to="{ name: 'modelStyle' }">
          上一步
        </router-link>
        <button class="button-blue w-full" @click="handleNext">下一步</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import county from "@/assets/county.json";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import { useErrorHint } from "@/composables/useErrorHint";
import { useContractStore } from "@/stores/contractStore";

const router = useRouter();
const contractStore = useContractStore();
const { contract: form } = storeToRefs(contractStore);
const { scrollToError } = useErrorHint();

const handleSameBuyer = (value: boolean) => {
  if (value) {
    form.value.order.drawerName = form.value.order.customerName;
    form.value.order.drawerCertificateNo =
      form.value.order.customerCertificateNo;
  }
};

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
  form.value.order.cityId = value;
  form.value.order.cityName = label;
  form.value.order.districtId = "";
  form.value.order.districtName = "";
};

// 鄉鎮市區
const districtOptions = computed(() => {
  if (!form.value.order.cityId) return [];
  return county
    .filter((item) => item.parentCode === Number(form.value.order.cityId))
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
  form.value.order.districtId = value;
  form.value.order.districtName = label;
};

const v$ = useVuelidate();

const handleNext = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    scrollToError();
    return;
  }
  router.push({ name: "paymentInfo" });
};
</script>

<style scoped></style>
