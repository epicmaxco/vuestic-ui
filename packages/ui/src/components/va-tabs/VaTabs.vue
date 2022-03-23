<template>
  <div
    class="va-tabs"
    :class="computedTabsClass"
  >
    <div
      class="va-tabs__wrapper"
      ref="wrapper"
    >
      <va-button
        v-if="showPagination"
        :disabled="disablePaginationLeft"
        class="va-tabs__pagination"
        :color="color"
        flat
        size="medium"
        :icon="$props.prevIcon"
        @click="movePaginationLeft()"
      />
      <div
        class="va-tabs__container"
        :class="computedClass"
        ref="container"
      >
        <div
          class="va-tabs__tabs"
          :style="paginationControlledStyles"
          ref="tabs"
        >
          <div
            class="va-tabs__slider-wrapper"
            :style="sliderStyles"
          >
            <div class="va-tabs__slider" />
          </div>

          <va-config :components="tabConfig">
            <slot
              name="tabs"
              class="va-tabs__tabs-items"
            />
          </va-config>
        </div>
      </div>
      <va-button
        v-if="showPagination"
        :disabled="disablePaginationRight"
        class="va-tabs__pagination"
        :color="color"
        flat
        size="medium"
        :icon="$props.nextIcon"
        @click="movePaginationRight()"
      />
    </div>
    <div class="va-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStatefulProps } from '../../composables/useStateful'
import VaButton from '../va-button'
import VaConfig from '../va-config'
import useTabsView from './hooks/useTabsView'

export default defineComponent({
  name: 'VaTabs',
  components: { VaButton, VaConfig },
  emits: ['update:modelValue', 'click:next', 'click:prev'],

  props: {
    ...useStatefulProps,
    modelValue: { type: [String, Number], default: null },
    left: { type: Boolean, default: true },
    right: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    grow: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hideSlider: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    prevIcon: { type: String, default: 'chevron_left' },
    nextIcon: { type: String, default: 'chevron_right' },
  },

  setup: useTabsView,
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-tabs {
  position: var(--va-tabs-position);
  font-family: var(--va-font-family);

  &__wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
    flex: 1 1 auto;
  }

  .va-tabs__pagination {
    flex: 0 0 auto;
  }

  .va-tabs__container {
    overflow: var(--va-tabs-container-overflow);
    flex: var(--va-tabs-container-flex);
    display: var(--va-tabs-container-display);
    height: var(--va-tabs-container-height);
    margin: var(--va-tabs-container-margin);
    white-space: var(--va-tabs-container-white-space);
    position: var(--va-tabs-container-position);

    .va-tabs__tabs {
      position: absolute;
      height: 100%;
    }

    .va-tabs__tabs-items {
      display: flex;
    }

    &--right {
      justify-content: flex-end;
    }

    &--grow {
      .va-tabs__tabs {
        display: flex;
        min-width: 100%;
      }

      .va-tab {
        flex: 1 0 auto;
        max-width: none;
      }
    }

    &--center {
      justify-content: center;
    }

    &--disabled {
      @include va-disabled();

      pointer-events: none;
    }
  }

  &--vertical {
    .va-tabs__wrapper {
      flex: 0 0 auto;
    }

    .va-tabs__container {
      height: auto;

      .va-tabs__tabs-items {
        flex-direction: column;
      }

      .va-tabs__tabs {
        position: relative;
      }
    }

    .va-tab {
      display: flex;

      &__content {
        flex: 0 0 auto;
      }
    }

    .va-tabs__content {
      flex: 1 0 auto;
    }
  }

  .va-tabs__slider-wrapper {
    bottom: var(--va-tabs-slider-wrapper-bottom);
    margin: var(--va-tabs-slider-wrapper-margin);
    position: var(--va-tabs-slider-wrapper-position);
    z-index: var(--va-tabs-slider-wrapper-z-index);

    .va-tabs__slider {
      width: var(--va-tabs-slider-width);
      height: var(--va-tabs-slider-height);
    }
  }
}
</style>
