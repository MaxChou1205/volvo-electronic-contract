<template>
  <img
    class="icon"
    :src="imgSrc"
    :style="cssVars"
    :alt="`icon_${iconName}`"
    :class="{ disabled }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  />
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  hoverIcon: {
    type: String,
  },
  size: {
    type: [String, Number],
    default: "24",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledIcon: {
    type: String,
  },
});

const isHover = ref(false);

const imgSrc = computed(() => {
  if (isHover.value && props.hoverIcon && !props.disabled) {
    return new URL(`/src/assets/icon/${props.hoverIcon}.svg`, import.meta.url)
      .href;
  } else if (props.disabled && props.disabledIcon) {
    return new URL(
      `/src/assets/icon/${props.disabledIcon}.svg`,
      import.meta.url,
    ).href;
  }
  return new URL(`/src/assets/icon/${props.iconName}.svg`, import.meta.url)
    .href;
});

const cssVars = computed(() => {
  return {
    "--size": props.size + "px",
  };
});
</script>

<style lang="scss" scoped>
.icon {
  width: var(--size);
  height: var(--size);

  &.disabled {
    cursor: not-allowed !important;
  }
}
</style>
