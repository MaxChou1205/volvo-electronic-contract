<template>
  <div
    class="infinite-scroll-container"
    ref="scrollContainer"
    @scroll="onScroll"
    :style="{ overflowY: 'auto', height: containerHeight }"
  >
    <slot />
    <div class="infinite-scroll-loading" v-if="loading">
      <slot name="loading">
        <div style="text-align: center; padding: 16px">載入中...</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, onUnmounted, watch, nextTick } from "vue";

const props = defineProps<{
  distance?: number; // 距離底部多少 px 觸發
  loading?: boolean; // 是否正在載入
  containerHeight?: string; // 容器高度，預設 400px
}>();

const emit = defineEmits<{
  (e: "loadMore"): void;
}>();

const scrollContainer = ref<HTMLElement | null>(null);
const distance = props.distance ?? 100;
const containerHeight = props.containerHeight ?? "400px";

const onScroll = () => {
  const el = scrollContainer.value;
  if (!el) return;
  const { scrollTop, clientHeight, scrollHeight } = el;
  if (!props.loading && scrollTop + clientHeight >= scrollHeight - distance) {
    emit("loadMore");
  }
};

const checkIfShouldLoad = () => {
  nextTick(() => {
    const el = scrollContainer.value;
    if (!el) return;
    if (!props.loading && el.scrollHeight <= el.clientHeight + distance) {
      emit("loadMore");
    }
  });
};

onMounted(() => {
  checkIfShouldLoad();
});

watch(
  () => props.loading,
  (newVal) => {
    if (!newVal) {
      checkIfShouldLoad();
    }
  },
);
</script>

<style scoped>
.infinite-scroll-container {
  position: relative;
  width: 100%;
  /* 你可以根據需求自訂樣式 */
}
.infinite-scroll-loading {
  width: 100%;
}
</style>
