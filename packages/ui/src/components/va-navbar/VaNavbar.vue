<template>
  <header
    ref="scrollRoot"
    class="va-navbar"
    :style="computedStyle"
  >
    <div v-if="$slots.left" class="va-navbar__left">
      <slot name="left" />
    </div>

    <div v-if="$slots.center || $slots.default" class="va-navbar__center">
      <slot v-if="$slots.center && !$slots.default" name="center" />
      <slot v-if="$slots.default && !$slots.center" />
    </div>

    <div v-if="$slots.right" class="va-navbar__right">
      <slot name="right" />
    </div>

    <div
      v-if="shape"
      class="va-navbar__background-shape"
      :style="shapeStyleComputed"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import {
  useColors,
  setupScroll,
  useFixedBar,
  useTextColor,
  useDeprecated,
  useFixedBarProps,
  useComponentPresetProp,
} from '../../composables'

export default defineComponent({
  name: 'VaNavbar',
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    color: { type: String, default: 'background-secondary' },
    textColor: { type: String },
    shape: { type: Boolean, default: false },
  },

  setup (props, { slots }) {
    // TODO(1.6.0): Remove deprecated slots
    useDeprecated(['center'], ['slots'])

    const { scrollRoot, isScrolledDown } = setupScroll(props.fixed)
    const { fixedBarStyleComputed } = useFixedBar(props, isScrolledDown)

    const { getColor, shiftHSLAColor } = useColors()
    const { textColorComputed } = useTextColor()
    const color = computed(() => getColor(props.color))

    const shapeStyleComputed = computed(() => ({
      borderTopColor: shiftHSLAColor(color.value, { h: -1, s: -11, l: 10 }),
    }))

    const computedStyle = computed(() => ({
      ...fixedBarStyleComputed.value,
      backgroundColor: color.value,
      color: textColorComputed.value,
      fill: textColorComputed.value,
    }))

    const gridTemplateComputed = computed(() => {
      const gridTemplateAreas = [
        slots.left && 'left',
        (slots.default || slots.center) && 'center',
        slots.right && 'right',
      ].filter(v => v)
      const sizes = '1fr '.repeat(gridTemplateAreas.length).trimEnd()

      return `"${gridTemplateAreas.join(' ')}" / ${sizes}`
    })

    return {
      scrollRoot,
      computedStyle,
      shapeStyleComputed,
      gridTemplateComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-navbar {
  display: grid;
  grid-template: v-bind(gridTemplateComputed);
  align-items: center;
  transition: var(--va-navbar-transition);
  position: var(--va-navbar-position);
  height: var(--va-navbar-height);
  padding-left: var(--va-navbar-padding-left);
  padding-right: var(--va-navbar-padding-right);
  background-color: var(--va-primary);
  font-family: var(--va-font-family);
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  z-index: var(--va-navbar-z-index);

  &__left {
    display: flex;
    flex-direction: row;
    grid-area: left;
    justify-self: start;

    & > .va-navbar__item {
      margin-right: var(--va-navbar-item-margin-side);

      &:last-child {
        margin-right: 0;
      }
    }

    @include media-breakpoint-down(sm) {
      justify-content: center;
      align-items: center;
    }
  }

  &__center {
    display: flex;
    grid-area: center;
    justify-self: center;

    & > .va-navbar__item {
      margin: 0 var(--va-navbar-item-margin);

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-area: right;
    justify-self: end;

    & > .va-navbar__item {
      margin-right: var(--va-navbar-item-margin-side);

      &:last-child {
        margin-right: 0;
      }
    }

    @include media-breakpoint-down(sm) {
      justify-content: center;
      align-items: center;
    }
  }

  &__background-shape {
    transition: var(--va-navbar-shape-transition);
    width: var(--va-navbar-shape-width);
    max-width: var(--va-navbar-shape-max-width);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    border-top: var(--va-navbar-height) solid var(--va-navbar-shape-bg);
    border-left: var(--va-navbar-shape-border-left);
    border-right: var(--va-navbar-shape-border-right);
    height: 0;
  }

  @include media-breakpoint-down(sm) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: var(--va-navbar-mobile-height);
    padding: var(--va-navbar-sm-padding);

    & > * {
      width: 100%;
    }

    &__center,
    &__background-shape {
      display: none;
    }
  }
}
</style>
