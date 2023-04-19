<template>
  <div class="va-layout">
    <slot name="top" />
    <main class="va-layout__main">
      <div class="va-layout__sidebar va-layout__child">
        <slot name="left" />
      </div>
      <div class="va-layout__content va-layout__child">
        <slot name="content" />
      </div>
      <div class="va-layout__sidebar va-layout__child">
        <slot name="right" />
      </div>
    </main>
    <slot name="bottom" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'VaLayout',
  setup (props, { slots }) {
    return {
      verticalTemplate: computed(() => {
        return [
          slots.top && 'min-content',
          '1fr',
          slots.bottom && 'min-content',
        ].filter(Boolean).join(' ')
      }),
      horizontalTemplate: computed(() => {
        return [
          slots.left && 'min-content',
          '1fr',
          slots.right && 'min-content',
        ].filter(Boolean).join(' ')
      }),
    }
  },
})
</script>

<style lang="scss" scoped>
.va-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: v-bind(verticalTemplate);
  gap: 0;
  height: 100%;
  width: 100%;

  &__main {
    display: grid;
    grid-template-columns: v-bind(horizontalTemplate);
    grid-template-rows: 1fr;
    height: 100%;

    & > .va-layout__child {
      height: 100%;
      overflow: hidden;

      &:empty {
        display: none;
      }
    }

    .va-layout__content {
      overflow: auto;
    }
  }
}
</style>
