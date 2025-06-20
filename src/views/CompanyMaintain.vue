<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 flex min-h-[90px] items-center justify-between bg-white"
    >
      <h1 class="pl-9 text-2xl">經銷商資訊維護</h1>
    </header>

    <main class="overflow-auto p-8">
      <div class="rounded-[10px] bg-white p-8">
        <div class="mb-4 text-lg font-medium">基本資料</div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="companyInfo.name"
            title="經銷商名稱"
            :required="true"
          />
          <BaseInput
            v-model="companyInfo.ownerName"
            title="負責人名稱"
            :required="true"
          />
          <BaseInput
            v-model="companyInfo.taxId"
            title="經銷商統編"
            :required="true"
          />
          <BaseInput
            v-model="companyInfo.phone"
            title="經銷商電話"
            :required="true"
          />
          <BaseInput
            v-model="companyInfo.address"
            title="經銷商地址"
            :required="true"
          />
        </div>
        <div class="mt-8 mb-4 text-lg font-medium">公司章</div>
        <div class="flex items-center gap-4">
          <ImageUpload
            class="h-[100px] w-[100px]"
            v-model:current-file="companyInfo.largeSeal"
          >
            <template #default>
              <div class="text-center font-bold">
                <div class="text-20">大章</div>
              </div>
            </template>
          </ImageUpload>
          <ImageUpload
            class="h-[100px] w-[100px]"
            v-model:current-file="companyInfo.smallSeal"
          >
            <template #default>
              <div class="text-center font-bold">
                <div class="text-20">小章</div>
              </div>
            </template>
          </ImageUpload>
        </div>
        <div class="mt-8 mb-4 text-lg font-medium">合約條款</div>
        <div class="grid grid-cols-2 items-baseline gap-4">
          <label for="">新車訂購合約條款</label>
          <FileUpload v-model="companyInfo.agreement"></FileUpload>
          <label for="">保密條款與注意事項</label>
          <FileUpload v-model="companyInfo.nonDisclosureAgreement"></FileUpload>
          <label for="">VOLVO 貴賓會員條款</label>
          <FileUpload v-model="companyInfo.membershipTerms"></FileUpload>
        </div>
        <div class="mt-10 flex w-full items-center gap-4">
          <router-link
            class="button-gray w-full"
            :to="{ name: 'companyMaintain' }"
            >取消</router-link
          >
          <button class="button-blue w-full" @click="saveCompany">儲存</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import BaseInput from "@/components/BaseInput.vue";
import FileUpload from "@/components/FileUpload.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import { useCompanyStore } from "@/stores/companyStore";

const router = useRouter();
const route = useRoute();

const companyStore = useCompanyStore();
const { companyInfo } = storeToRefs(companyStore);

if (route.params?.code) {
  companyStore.getCompanyDetail(route.params.code as string);
}

const v$ = useVuelidate();

const saveCompany = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    await companyStore.saveCompany(companyInfo.value, companyInfo.value.id);
    alert("儲存成功");
    router.push({ name: "companyMaintain" });
  } catch (err) {
    alert(err);
    return;
  }
};
</script>

<style scoped></style>
