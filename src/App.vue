<script setup lang="ts">
import { onMounted } from "vue";
import Loader from "@/components/Loader.vue";
import { useOptionStore } from "@/stores/optionStore";

const optionStore = useOptionStore();
onMounted(async () => {
  if (!optionStore.payModes.length) {
    await optionStore.getPayModes();
  }
  if (!optionStore.customerTypes.length) {
    await optionStore.getCustomerTypes();
  }
  if (!optionStore.contractStatusOptions.length) {
    await optionStore.getContractStatus();
  }
  if (!optionStore.orderStatusOptions.length) {
    await optionStore.getOrderStatus();
  }
  if (!optionStore.genderOptions.length) {
    await optionStore.getGenders();
  }
  if (!optionStore.loanTermsOptions.length) {
    await optionStore.getLoanTerms();
  }
  if (!optionStore.depositPayWaysOptions.length) {
    await optionStore.getDepositPayWays();
  }
});
</script>

<template>
  <Loader />
  <article>
    <router-view :key="$route.name"></router-view>
  </article>
</template>

<style scoped lang="scss"></style>
