<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="relative flex items-center overflow-x-hidden py-4"
      ref="scrollContainerRef"
      @touchstart="handleDragStart"
      @touchmove="handleDragMove"
      @touchend="handleDragEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleDragEnd"
      @mouseleave="handleDragEnd"
    >
      <div class="flex flex-shrink-0 gap-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const scrollContainerRef = ref<HTMLDivElement | null>(null);
const isDragging = ref<boolean>(false);
const startX = ref<number>(0);
const lastX = ref<number>(0);
const initialScrollLeft = ref<number>(0);

const handleDragStart = (e: TouchEvent | MouseEvent): void => {
  const container = scrollContainerRef.value;
  if (!container) return;

  isDragging.value = true;

  // Get the clientX based on event type
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

  startX.value = clientX;
  lastX.value = clientX;
  initialScrollLeft.value = container.scrollLeft;

  // For mouse events, we need to prevent default to avoid text selection
  if (!("touches" in e)) {
    e.preventDefault();
  }
};

const handleMouseDown = (e: MouseEvent): void => {
  handleDragStart(e);
};

const handleDragMove = (e: TouchEvent | MouseEvent): void => {
  if (!isDragging.value) return;

  const container = scrollContainerRef.value;
  if (!container) return;

  // Get the clientX based on event type
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

  // Calculate the movement delta
  const diff = lastX.value - clientX;

  // Scroll the container by the movement amount
  container.scrollLeft += diff;

  // Update last position
  lastX.value = clientX;

  // Prevent default to avoid page scrolling or text selection
  e.preventDefault();
};

const handleMouseMove = (e: MouseEvent): void => {
  handleDragMove(e);
};

const handleDragEnd = (): void => {
  isDragging.value = false;
};
</script>
