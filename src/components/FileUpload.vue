<template>
  <div>
    <label
      class="relative flex h-full w-full cursor-pointer items-center justify-center"
    >
      <input
        class="hidden"
        ref="fileInput"
        type="file"
        :accept="accept"
        @change="fileChange($event)"
      />
      <button
        class="flex h-6 w-full cursor-pointer items-center"
        active="pointer-events-none"
        type="button"
        @click="fileInput!.click()"
      >
        <input
          class="pointer-events-none min-h-[30px] w-full rounded-[4px] border border-gray-500 px-2"
          :value="filePreview?.name"
          type="text"
          placeholder="點選以上傳檔案"
        />
      </button>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

export type FileEventTarget = EventTarget & { files: FileList };

const fileInput = ref<HTMLInputElement | null>(null);
const filePreview = ref<File | null>(null);

const { accept = "application/pdf" } = defineProps<{
  accept?: string;
  multiple?: boolean;
  maxLength?: number;
}>();

const emit = defineEmits<(e: "select", file: File) => void>();

const fileChange = (el: Event) => {
  const files = (el.target as FileEventTarget).files || [];
  if (files.length === 0) return;

  const file = files[0]!;
  filePreview.value = file;
  emit("select", file);
  (el.target as HTMLInputElement).value = "";
};
</script>

<style scoped lang="scss"></style>
