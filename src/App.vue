<script setup lang="ts">
import Loader from "@/components/Loader.vue";
</script>

<template>
  <Loader />
  <article>
    <router-view :key="$route.name"></router-view>
  </article>
</template>

<style scoped lang="scss"></style>
