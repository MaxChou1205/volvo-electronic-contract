<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <img
      class="mb-[66px] h-[130px] w-[130px]"
      src="@/assets/img/logo1.png"
      alt="logo"
    />
    <div class="min-w-[328px]" v-if="!loginFailed">
      <div class="mb-3">
        <label class="mb-2 block text-sm font-bold text-gray-700"
          >帳號<span class="text-red-waring">*</span></label
        >
        <BaseInput
          class="mb-2"
          v-model="form.account"
          type="secondary"
          :warning="accountWarning"
          @keyup.enter="login"
        ></BaseInput>
        <span class="text-xs text-gray-700" v-if="!accountWarning"
          >請填寫經銷商代碼 + 編號，例如：KT077</span
        >
        <span class="text-red-waring text-xs" v-else v-if="accountWarning"
          >請輸入正確格式</span
        >
      </div>
      <div>
        <label class="mb-2 block text-sm font-bold text-gray-700"
          >密碼<span class="text-red-waring">*</span></label
        >
        <BaseInput
          class="mb-2"
          v-model="form.password"
          type="secondary"
          :warning="passwordWarning"
          @keyup.enter="login"
        ></BaseInput>
        <span class="text-xs text-gray-700" v-if="!passwordWarning"
          >*如忘記密碼請洽管理人員</span
        >
        <span class="text-red-waring text-xs" v-else>請輸入正確格式</span>
      </div>
      <div class="mt-11">
        <button
          class="button-blue w-full"
          :disabled="buttonDisabled"
          @click="login"
        >
          送出
        </button>
      </div>
    </div>
    <div v-else>
      <div class="mb-3 text-center text-lg">登入失敗</div>
      <div class="text-sm text-gray-700">登入出現問題請洽管理員</div>
      <div class="mt-20">
        <button class="button-blue w-full" @click="handleReset">確認</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import router from "@/router";

const form = ref({
  account: "kt001",
  password: "kt001",
});
const accountWarning = computed(
  () =>
    submitted.value && !form.value.account.toLocaleLowerCase().startsWith("kt"),
);
const passwordWarning = computed(
  () =>
    submitted.value &&
    !form.value.password.toLocaleLowerCase().startsWith("kt"),
);
const submitted = ref(false);
const loginFailed = ref(false);

const buttonDisabled = computed(() => {
  return form.value.account === "" || form.value.password === "";
});

const login = () => {
  if (buttonDisabled.value) {
    return;
  }
  submitted.value = true;
  if (accountWarning.value || passwordWarning.value) {
    return;
  }

  // TODO: login
  if (
    form.value.account.toLocaleLowerCase() === "kt001" &&
    form.value.password.toLocaleLowerCase() === "kt001"
  ) {
    router.push({ name: "order" });
  } else {
    loginFailed.value = true;
  }
};

const handleReset = () => {
  submitted.value = false;
  form.value.account = "";
  form.value.password = "";
};
</script>

<style scoped></style>
