<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
authStore.login({ username: "nickchen", password: "Aa1234567" });
</script>

<template>
  <Loader />
  <article>
    <router-view :key="$route.name"></router-view>
  </article>
</template>

<style scoped lang="scss"></style>
