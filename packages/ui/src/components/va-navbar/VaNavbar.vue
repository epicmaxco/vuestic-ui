<template>
  <header
    ref="scrollRoot"
    class="va-navbar"
    :class="bemClasses"
    :style="computedStyle"
  >
    <slot>
      <div class="va-navbar__left">
        <slot name="left" />
      </div>

      <div class="va-navbar__center">
        <slot name="center" />
      </div>

      <div class="va-navbar__right">
        <slot name="right" />
      </div>
    </slot>

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
  useFixedBarProps,
  useComponentPresetProp,
  useBem,
} from '../../composables'

export default defineComponent({
  name: 'VaNavbar',
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    color: { type: String, default: 'background-secondary' },
    textColor: { type: String },
    shape: { type: Boolean, default: false },
    shadowed: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
  },

  setup (props) {
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

    const bemClasses = useBem('va-navbar', () => ({
      shadowed: props.shadowed,
      bordered: props.bordered,
    }))

    return {
      bemClasses,
      scrollRoot,
      computedStyle,
      shapeStyleComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-navbar {
  display: grid;
  grid-template: "left center right" / 1fr auto 1fr;
  align-items: center;
  transition: var(--va-navbar-transition);
  position: var(--va-navbar-position);
  padding: var(--va-navbar-padding-y) var(--va-navbar-padding-x);
  background-color: var(--va-primary);
  font-family: var(--va-font-family);
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  z-index: var(--va-navbar-z-index);

  &__left {
    display: flex;
    grid-area: left;

    & > .va-navbar__item {
      margin-right: var(--va-navbar-item-margin-side);

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__center {
    display: flex;
    justify-content: center;
    grid-area: center;

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

    & > .va-navbar__item {
      margin-right: var(--va-navbar-item-margin-side);

      &:last-child {
        margin-right: 0;
      }
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
    &__background-shape {
      display: none;
    }
  }

  &--shadowed {
    box-shadow: 0 2px 8px var(--va-shadow);
  }

  &--bordered {
    border-bottom: var(--va-background-border);
  }
}
</style>
