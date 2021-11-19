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
import { Vue, Options, mixins, prop } from 'vue-class-component'

import ColorMixin from '../../services/color-config/ColorMixin'
import { shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'

class Props {
  color = prop<string>({ type: String, default: 'secondary' })
  textColor = prop<string>({ type: String, default: undefined })
  shape = prop<boolean>({ type: Boolean, default: false })
}

const NavbarPropsMixin = Vue.with(Props)

@Options({
  name: 'VaNavbar',
})
export default class VaNavbar extends mixins(ColorMixin, NavbarPropsMixin) {
  get navbarStyle () {
    const { getTextColor, getColor } = useColors()

    const textColor = this.$props.textColor
      ? getColor(this.$props.textColor)
      : getTextColor(this.colorComputed)

    return {
      backgroundColor: this.colorComputed,
      color: textColor,
      fill: textColor,
    }
  }

  get shapeStyle () {
    // all the 3 color components differ for the shape from the secondary color
    return {
      borderTopColor: shiftHSLAColor(this.colorComputed, { h: -1, s: -11, l: 10 }),
    }
  }
}
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
