<template>
  <div ref="modalContainerRef">
    <Transition name="fade">
      <div
        class="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md"
        v-if="isOpen"
      >
        <div class="absolute inset-0 bg-black/30"></div>

        <div
          class="relative z-50 w-full max-w-3xl transform rounded-lg bg-white p-8 shadow-xl transition-all"
        >
          <!-- <button
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            @click="close"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> -->

          <div>
            <slot></slot>
          </div>

          <div class="flex w-full justify-between mt-2 space-x-7">
            <button
              class="button-gray w-full"
              v-if="showCancelButton"
              @click="handleCancel"
            >
              {{ cancelButtonText }}
            </button>
            <button
              class="button-blue w-full"
              v-if="showConfirmButton"
              @click="handleConfirm"
            >
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

interface PopupProps {
  title?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const {
  showCancelButton = false,
  showConfirmButton = false,
  cancelButtonText = "取消",
  confirmButtonText = "確定",
} = defineProps<PopupProps>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:visible", value: boolean): void;
}>();

const isOpen = ref(false);

const open = (): void => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
  emit("update:visible", true);
};

const close = (): void => {
  isOpen.value = false;
  document.body.style.overflow = "auto";
  emit("update:visible", false);
};

const handleCancel = (): void => {
  emit("cancel");
  close();
};

const handleConfirm = (): void => {
  emit("confirm");
  close();
};

defineExpose({
  open,
  close,
});

const modalContainerRef = ref<HTMLElement | null>(null);
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen.value) {
      close();
    }
  });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
