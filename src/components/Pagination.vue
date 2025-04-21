<template>
  <nav class="pagination">
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      上一頁
    </button>
    <button
      v-for="page in pages"
      :key="page"
      :class="['pagination-page', { active: page === currentPage }]"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="pagination-btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      下一頁
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("update:page", page);
  }
};

const pages = computed(() => {
  const range: number[] = [];
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
}
.pagination-btn {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background: #eee;
  padding: 4px 12px;
}
.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination-page {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  padding: 4px 10px;
}
.pagination-page.active {
  border-color: #007bff;
  background: #007bff;
  color: #fff;
}
</style>
