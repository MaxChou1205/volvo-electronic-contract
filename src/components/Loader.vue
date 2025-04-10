<template>
  <div
    class="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md"
    v-if="loading"
  >
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from "@/composables/loading";

const { loading } = useLoading();
</script>

<style scoped>
.loader {
  aspect-ratio: 1;
  width: 40px;
  --c: linear-gradient(#000 0 0);
  --r1: radial-gradient(farthest-side at bottom, #000 93%, #0000);
  --r2: radial-gradient(farthest-side at top, #000 93%, #0000);
  animation: l1 1s infinite alternate;
  background:
    var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2), var(--c),
    var(--r1), var(--r2);
  background-repeat: no-repeat;
}
@keyframes l1 {
  0%,
  10% {
    background-position:
      0 50%,
      0 calc(50% - 2px),
      0 calc(50% + 2px),
      50% 50%,
      50% calc(50% - 2px),
      50% calc(50% + 2px),
      100% 50%,
      100% calc(50% - 2px),
      100% calc(50% + 2px);
    background-size:
      8px 0,
      8px 4px,
      8px 4px;
  }
  90%,
  100% {
    background-position:
      0 50%,
      0 -2px,
      0 calc(100% + 2px),
      50% 50%,
      50% -2px,
      50% calc(100% + 2px),
      100% 50%,
      100% -2px,
      100% calc(100% + 2px);
    background-size:
      8px 100%,
      8px 4px,
      8px 4px;
  }
}
</style>
