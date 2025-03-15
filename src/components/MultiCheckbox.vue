<template>
  <div>
    <label class="flex items-center text-sm"
      ><input
        class="border-blue-brand text-blue-brand checked:bg-blue-brand mr-2 h-5 w-5 appearance-none rounded border-2 checked:text-white"
        type="checkbox"
      />{{ option }}</label
    >
  </div>
</template>

<script setup lang="ts">
const { option } = defineProps<{ option: string }>();
</script>

<style scoped lang="scss">
input[type="checkbox"]:checked {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  &::after {
    display: block;
    transform: rotate(45deg);
    border-width: 0 2px 2px 0;
    width: 4px;
    height: 8px;
    content: "";
  }
}
</style>
