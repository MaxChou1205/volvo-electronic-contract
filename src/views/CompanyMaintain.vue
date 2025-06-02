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
          <BaseInput title="經銷商名稱" />
          <BaseInput title="負責人名稱" />
          <BaseInput title="經銷商統編" />
          <BaseInput title="經銷商電話" />
          <BaseInput title="經銷商地址" />
        </div>
        <div class="mt-8 mb-4 text-lg font-medium">經銷商帳戶</div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput title="銀行" />
          <BaseInput title="戶名" />
          <BaseInput title="帳號" />
        </div>
        <div class="mt-8 mb-4 text-lg font-medium">公司章</div>
        <div class="flex items-center gap-4">
          <ImageUpload class="h-[100px] w-[100px]">
            <template #default>
              <div class="text-center font-bold">
                <div class="text-20">大章</div>
              </div>
            </template>
          </ImageUpload>
          <ImageUpload class="h-[100px] w-[100px]">
            <template #default>
              <div class="text-center font-bold">
                <div class="text-20">小章</div>
              </div>
            </template>
          </ImageUpload>
        </div>
        <div class="mt-8 mb-4 text-lg font-medium">合約條款</div>
        <div class="grid grid-cols-2 items-center gap-4">
          <label for="">新車訂購合約條款</label>
          <FileUpload></FileUpload>
          <label for="">保密條款與注意事項</label>
          <FileUpload></FileUpload>
          <label for="">VOLVO 貴賓會員條款</label>
          <FileUpload></FileUpload>
        </div>
        <div class="mt-10 flex justify-end">
          <button class="button-blue">儲存</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import FileUpload from "@/components/FileUpload.vue";
import ImageUpload from "@/components/ImageUpload.vue";
</script>

<style scoped></style>
