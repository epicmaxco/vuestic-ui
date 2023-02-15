<template>
  <div
    class="color-grid-item"
    :style="{ backgroundColor: value, color: textColorComputed }"
  >
    <div class="color-grid-item__header flex-col md:flex-row">
      <p>
        {{ name }}
      </p>
      <p style="font-size: 14px">
        var(--va-{{ kebabCase(name) }})<span class="ml-2">{{ value }}</span>
      </p>
    </div>
    <div class="color-grid-item__content">
      {{ $t(`colors.theme.colors.${name}`) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementBackground, useTextColor } from "vuestic-ui/src/composables";
import kebabCase from "lodash/kebabCase";

const { background } = useElementBackground();
const { textColorComputed } = useTextColor(background);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.color-grid-item {
  padding: 0.5rem 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
