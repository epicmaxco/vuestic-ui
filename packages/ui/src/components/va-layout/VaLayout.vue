<template>
  <div class="va-layout">
    <VaLayoutArea
      v-for="area in areaNames"
      :key="area"
      :area="area"
      :config="$props[area] || {}"
      @overlay-click="$emit(`${area}-overlay-click`)"
    >
      <slot :name="area" />
    </VaLayoutArea>

    <div class="va-layout__area va-layout__area--content">
      <slot>
        <slot name="content" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  useGridTemplateArea,
  AreaName,
} from './hooks/useGridTemplateArea'
import { useLayoutProps, useLayout } from './hooks/useLayout'
import VaLayoutArea from './components/VaLayoutArea.vue'

const areaNames: AreaName[] = [
  'top',
  'left',
  'right',
  'bottom',
]

export default defineComponent({
  name: 'VaLayout',

  props: {
    ...useLayoutProps,
  },

  emits: [
    'top-overlay-click',
    'left-overlay-click',
    'right-overlay-click',
    'bottom-overlay-click',
  ],

  components: { VaLayoutArea },

  setup (props, { slots }) {
    useLayout(props)

    return {
      areaNames,
      templateArea: useGridTemplateArea(props),
      verticalTemplate: computed(() => {
        return [
          slots.top ? 'min-content' : '0fr',
          '1fr',
          slots.bottom ? 'min-content' : '0fr',
        ]
          .filter(Boolean)
          .join(' ')
      }),
      horizontalTemplate: computed(() => {
        return [
          slots.left ? 'min-content' : '0fr',
          '1fr',
          slots.right ? 'min-content' : '0fr',
        ]
          .filter(Boolean)
          .join(' ')
      }),
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/resources';
@import "variables";

.va-layout {
  display: grid;
  grid-template-columns: v-bind(horizontalTemplate);
  grid-template-rows: v-bind(verticalTemplate);
  grid-template-areas: v-bind(templateArea);
  gap: 0;
  position: relative;
  z-index: 0;

  &__area {
    @include va-scroll();

    &--content {
      grid-area: content;
      z-index: 0;
      // Make it possible for content to be smaller than the layout
      min-width: 0;
      min-height: 0;
    }
  }
}
</style>
