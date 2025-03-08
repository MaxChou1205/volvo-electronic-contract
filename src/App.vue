<script setup lang="ts"></script>

<template>
  <article>
    <router-view :key="$route.name"></router-view>
  </article>
</template>

<style scoped lang="scss"></style>
