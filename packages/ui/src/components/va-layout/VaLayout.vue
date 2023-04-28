<template>
  <div class="va-layout">
    <div class="va-layout__top">
      <slot name="top" />
    </div>
    <div class="va-layout__left">
      <slot name="left" />
    </div>
    <div class="va-layout__right">
      <slot name="right" />
    </div>
    <div class="va-layout__bottom">
      <slot name="bottom" />
    </div>
    <div class="va-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGridTemplateArea, useGridTemplateAreaProps } from './hooks/useGridTemplateArea'

export default defineComponent({
  name: 'VaLayout',

  props: {
    ...useGridTemplateAreaProps,
  },

  setup (props, { slots }) {
    return {
      templateArea: useGridTemplateArea(props),
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
  grid-template-columns: v-bind(verticalTemplate);
  grid-template-rows: v-bind(horizontalTemplate);
  grid-template-areas: v-bind(templateArea);
  gap: 0;
  height: 100%;
  width: 100%;

  &__top {
    grid-area: top;
  }

  &__left {
    grid-area: left;
  }

  &__right {
    grid-area: right;
  }

  &__bottom {
    grid-area: bottom;
  }

  &__content {
    grid: content;
    overflow: auto;
  }
}
</style>
