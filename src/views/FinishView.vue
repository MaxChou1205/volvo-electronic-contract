<template>
  <div class="mx-auto max-w-screen-md">
    <img
      class="mx-auto block w-full max-w-[595px]"
      src="@/assets/img/contract_pdf.png"
      alt="logo"
    />
    <div class="mt-12">
      <RouterLink
        class="button-blue mx-auto block w-full max-w-[595px]"
        type="button"
        :to="{ name: 'contract' }"
        >返回</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
