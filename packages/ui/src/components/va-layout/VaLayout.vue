<template>
  <div class="va-layout">
    <div
      v-for="area in areaNames"
      :key="area"
      :class="
        isAbsolute(area) ?
        'va-layout__area-wrapper' :
        `va-layout__area va-layout__area--${area}`
      "
    >
      <div v-if="isAbsolute(area)" :class="`va-layout__area va-layout__area--${area}`">
        <slot :name="area" />
      </div>
      <slot v-else :name="area" />
    </div>

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
import { useLayoutProps } from './hooks/useLayout'

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

  setup (props, { slots }) {
    return {
      areaNames,
      isAbsolute (area: AreaName) {
        return props[area]?.absolute || false
      },
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

<style lang="scss" scoped>
@import '../../styles/resources';

.va-layout {
  display: grid;
  grid-template-columns: v-bind(horizontalTemplate);
  grid-template-rows: v-bind(verticalTemplate);
  grid-template-areas: v-bind(templateArea);
  gap: 0;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  &__area {
    overflow-y: auto;
    overflow-x: hidden;

    @include va-scroll();

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
    }
  }

  // Wrapper is responsible for positioning correctly absolute areas
  &__area-wrapper {
    .va-layout__area {
      position: absolute;

      &--right {
        right: 0;
        height: 100%;
      }

      &--left {
        left: 0;
        height: 100%;
      }
    }
  }
}
</style>
