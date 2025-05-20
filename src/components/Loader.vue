<template>
  <div
    class="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md"
    v-if="loading"
  >
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useLoading } from "@/composables/loading";

const { loading } = useLoading();

watchEffect(() => {
  if (loading.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  display: grid;
  position: relative;
  animation: l10 2s infinite linear;
  border-radius: 50%;
  background:
    conic-gradient(
        from 90deg at 4px 4px,
        #0000 90deg,
        currentColor 0
      ) -4px -4px /
      calc(50% + 2px) calc(50% + 2px),
    radial-gradient(
        farthest-side,
        currentColor 6px,
        #0000 7px calc(100% - 6px),
        currentColor calc(100% - 5px)
      )
      no-repeat;
  aspect-ratio: 1;
  width: 50px;
  color: #141414;
}
.loader:before {
  transform: rotate(45deg);
  border-radius: inherit;
  background: inherit;
  content: "";
}
@keyframes l10 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
