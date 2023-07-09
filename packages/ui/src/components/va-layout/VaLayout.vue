<template>
  <div class="va-layout">
    <div class="va-layout__area va-layout__area--top">
      <slot name="top" />
    </div>
    <div
      class="va-layout__area va-layout__area--left"
    >
      <slot name="left" />
    </div>
    <div class="va-layout__area va-layout__area--right">
      <slot name="right" />
    </div>
    <div class="va-layout__area va-layout__area--bottom">
      <slot name="bottom" />
    </div>
    <div class="va-layout__area va-layout__area--content">
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
          slots.top ? 'min-content' : '0fr',
          '1fr',
          slots.bottom ? 'min-content' : '0fr',
        ].filter(Boolean).join(' ')
      }),
      horizontalTemplate: computed(() => {
        return [
          slots.left ? 'min-content' : '0fr',
          '1fr',
          slots.right ? 'min-content' : '0fr',
        ].filter(Boolean).join(' ')
      }),
    }
  },
})
</script>

<style lang="scss" scoped>
.va-layout {
  display: grid;
  grid-template-columns:  v-bind(horizontalTemplate);
  grid-template-rows: v-bind(verticalTemplate);
  grid-template-areas: v-bind(templateArea);
  gap: 0;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  &__area {
    &--top {
      grid-area: top;
    }

    &--left {
      grid-area: left;
      position: relative;
    }

    &--right {
      grid-area: right;
    }

    &--bottom {
      grid-area: bottom;
    }

    &--content {
      grid-area: content;
      overflow: auto;
    }
  }
}
</style>
