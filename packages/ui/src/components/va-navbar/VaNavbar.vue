<template>
  <nav
    class="va-navbar"
    :style="navbarStyle"
  >
    <div class="va-navbar__content">
      <div class="va-navbar__left">
        <slot name="left" />
      </div>

      <div class="va-navbar__center">
        <slot name="center" />
      </div>

      <div class="va-navbar__right">
        <slot name="right" />
      </div>
    </div>
    <div
      v-if="shape"
      class="va-navbar__background-shape"
      :style="shapeStyle"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, StyleValue } from 'vue'

import { shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'

export default defineComponent({
  name: 'VaNavbar',
  props: {
    color: { type: String as PropType<string>, default: 'secondary' },
    textColor: { type: String as PropType<string>, default: undefined },
    shape: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props) {
    const { getTextColor, getColor } = useColors()

    const color = computed(() => getColor(props.color))
    const textColor = computed(() => props.textColor ? getColor(props.textColor) : getTextColor(color.value))

    const shapeStyle = computed(() => ({
      borderTopColor: shiftHSLAColor(color.value, { h: -1, s: -11, l: 10 }),
    }))

    const navbarStyle = computed(() => ({
      backgroundColor: color.value,
      color: textColor,
      fill: textColor,
    })) as StyleValue

    return {
      navbarStyle,
      shapeStyle,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
$top-nav-height: 4.0625rem;
$top-nav-bg: $dark-blue;
$nav-mobile-px: 1rem;
$nav-padding-left: 1rem;
$nav-padding-right: 2rem;
$nav-mobile-py: 1.1875rem;
$nav-mobile-brand-top: 1.5rem;
$nav-shape-bg: #0a43af;
$nav-border-side-width: 3.1875rem;

.va-navbar {
  transition: background-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
  position: relative;
  height: $top-nav-height;
  padding-left: $nav-padding-left;
  padding-right: $nav-padding-right;
  background-color: $top-nav-bg;
  display: flex;
  font-family: var(--va-font-family);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 1;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: center;

      & > * {
        width: 100%;
      }
    }
  }

  &__center {
    display: flex;

    & > .va-navbar__item {
      margin: 0 0.75rem;

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &__left {
    display: flex;
    flex-direction: row;

    & > .va-navbar__item {
      margin-right: 1.5rem;

      &:last-child {
        margin-right: 0;
      }
    }

    @include media-breakpoint-down(sm) {
      justify-content: center;
      align-items: center;
    }
  }

  &__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    & > .va-navbar__item {
      margin-right: 1.5rem;

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
    transition: border-top-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
    width: 33%;
    max-width: 467px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    border-top: $top-nav-height solid $nav-shape-bg;
    border-left: $nav-border-side-width solid transparent;
    border-right: $nav-border-side-width solid transparent;
    height: 0;
  }

  @include media-breakpoint-down(sm) {
    height: $top-mobile-nav-height;
    padding: $nav-mobile-py $nav-mobile-px 1rem;

    &__center,
    &__background-shape {
      display: none;
    }
  }
}
</style>
