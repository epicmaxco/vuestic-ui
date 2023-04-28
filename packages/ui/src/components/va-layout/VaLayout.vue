<template>
  {{  templateArea }}
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
    <!-- <slot name="top" />
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
    <slot name="bottom" /> -->
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
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
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

  // &__main {
  //   display: grid;
  //   grid-template-columns: v-bind(horizontalTemplate);
  //   grid-template-rows: 1fr;
  //   height: 100%;

  //   & > .va-layout__child {
  //     height: 100%;
  //     overflow: hidden;

  //     &:empty {
  //       display: none;
  //     }
  //   }

  //   .va-layout__content {
  //     overflow: auto;
  //   }
  // }
}
</style>
