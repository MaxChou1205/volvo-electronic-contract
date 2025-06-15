<template>
  <div>
    <div
      class="text-18 color-main-gray b-1 b-pink-primary flex flex-col items-center justify-center"
      v-bind="$attrs"
      :class="{ 'border-dashed opacity-50': isDragging }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop($event)"
    >
      <label
        class="relative flex h-full w-full cursor-pointer flex-col items-center justify-center border border-dashed"
      >
        <div class="absolute m-auto" v-if="!currentFile">
          <slot>
            <div class="text-center font-bold">
              <div class="text-20">點擊上傳圖片</div>
            </div>
          </slot>
        </div>

        <div class="preview relative z-1 h-full w-full" ref="singlePreview">
          <img
            class="h-full w-full object-contain"
            v-show="currentFile?.url"
            ref="singlePreviewImage"
            :src="currentFile?.url"
            alt=""
          />
        </div>
        <input
          class="hidden"
          type="file"
          :accept="accept"
          @change="fileChange($event)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TheFile } from "@/types/fileType";

export type FileEventTarget = EventTarget & { files: FileList };

const MAX_SIZE = 1024 * 1024 * 5; // 5MB

const { accept = "image/*", size = MAX_SIZE } = defineProps<{
  accept?: string;
  size?: number;
}>();
const emit = defineEmits<{
  (e: "update:currentFile", file: TheFile): void;
  (e: "delete:currentFile", file: TheFile): void;
}>();

const pendingFiles = defineModel<TheFile[]>("pendingFiles", {
  required: false,
  default: () => [],
});
const currentFile = defineModel<TheFile | null>("currentFile", {
  required: false,
  default: null,
});

const singlePreview = ref<HTMLDivElement | null>(null);
const singlePreviewImage = ref<HTMLImageElement | null>(null);

const processFiles = (files: FileList | never[]) => {
  if (files.length === 0) return;
  const _URL = window.URL || window.webkitURL;
  for (const file of files) {
    if (!file.size || file.size > size) continue;

    const img = new Image();
    img.src = _URL.createObjectURL(file);
    pendingFiles.value.push({
      file: file,
      url: img.src,
    });
    currentFile.value = {
      file: file,
      url: img.src,
    };
  }
};

const isDragging = ref<Boolean>(false);
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};
const handleDragLeave = () => {
  isDragging.value = false;
};
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer?.files || [];
  processFiles(files);
};

const fileChange = (el: Event) => {
  const files = (el.target as FileEventTarget).files || [];
  processFiles(files);
  (el.target as HTMLInputElement).value = "";
};

// const removeCurrentImage = () => {
//   singlePreview.value!.innerHTML = "";
//   if (currentFile.value) {
//     emit("delete:currentFile", currentFile.value!);
//     currentFile.value = null;
//   }
// };
</script>

<style scoped lang="scss">
.preview {
  :deep(img) {
    @apply m-auto h-full w-full object-contain;
  }
}
</style>
