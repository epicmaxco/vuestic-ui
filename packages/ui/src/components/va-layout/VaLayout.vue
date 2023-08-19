<template>
  <div class="va-layout">
    <div
      v-for="area in areaNames"
      :key="area"
      :class="[
        doRenderWrapper(area) ?
          'va-layout__area-wrapper' :
          `va-layout__area va-layout__area--${area}`,
      ]"
    >
      <div
        v-if="doRenderWrapper(area)"
        :class="[
          `va-layout__area va-layout__area--${area}`,
        ]"
      >
        <VaLayoutFixedWrapper v-if="isFixed(area)" :area="area">
          <slot :name="area" />
        </VaLayoutFixedWrapper>
        <slot v-else :name="area" />
      </div>
      <template v-else>
        <VaLayoutFixedWrapper v-if="isFixed(area)" :area="area">
          <slot :name="area" />
        </VaLayoutFixedWrapper>
        <slot v-else :name="area" />
      </template>
    </div>

    <div class="va-layout__area va-layout__area--content">
      <slot>
        <slot name="content" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import {
  useGridTemplateArea,
  AreaName,
} from './hooks/useGridTemplateArea'
import { useLayoutProps } from './hooks/useLayout'
import VaLayoutFixedWrapper from './components/VaLayoutFixedWrapper.vue'

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

  components: { VaLayoutFixedWrapper },

  setup (props, { slots }) {
    return {
      areaNames,
      doRenderWrapper: (area: AreaName) => props[area].absolute || false,
      isFixed: (area: AreaName) => props[area]?.fixed || false,
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
  position: relative;
  z-index: 0;

  // Wrapper is responsible for positioning correctly absolute areas
  &__area-wrapper {
    .va-layout__area {
      position: absolute;
      z-index: 1;

      &--top {
        width: 100%;
      }

      &--bottom {
        width: 100%;
      }

      &--right {
        right: 0;
        height: 100%;
      }

      &--left {
        left: 0;
        height: 100%;
      }

      &--fixed {
        position: fixed;
      }
    }
  }

  &__area {
    @include va-scroll();

    display: flex;

    &--top {
      grid-area: top;
      z-index: v-bind("top.order || '0'");
    }

    &--left {
      grid-area: left;
      z-index: v-bind("left.order || '0'");
    }

    &--right {
      grid-area: right;
      z-index: v-bind("right.order || '0'");
    }

    &--bottom {
      grid-area: bottom;
      z-index: v-bind("bottom.order || '0'");
    }

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
