<template>
  <aside
    class="va-sidebar"
    :class="computedClass"
    :style="computedStyle"
  >
    <ul class="va-sidebar__menu">
      <slot name="menu"/>
    </ul>
  </aside>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-sidebar',
  inject: {
    contextConfig: {},
  },
  components: {},
  mixins: [ColorThemeMixin],
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  computed: {
    computedClass () {
      return {
        'va-sidebar--minimized': this.minimized,
      }
    },
    computedStyle () {
      return {
        backgroundColor: this.contextConfig.invertedColor ? 'white' : this.$themes['secondary'],
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
.va-sidebar {
  min-height: $sidebar-viewport-min-height;
  height: $sidebar-viewport-height;
  position: absolute;
  width: $sidebar-width;
  top: $top-nav-height;
  left: 0;
  transition: all .3s ease;
  overflow-y: auto;

  &__menu {
    max-height: 100%;
    margin-bottom: 0;
    padding-top: 2.5625rem;
    padding-bottom: 2.5rem;
    list-style: none;
    padding-left: 0;
  }

  @include media-breakpoint-down(sm) {
    top: $sidebar-mobile-top;
    min-height: $sidebar-mobile-min-height;
    height: $sidebar-mobile-height;
  }

  @include media-breakpoint-down(xs) {
    width: 100%;
  }

  &--minimized {
    left: 0;
    width: $sidebar-minimized-width;
    .va-sidebar-link-group {
      .va-sidebar-link__content {
        padding-right: 0;
      }
    }
  }
}
</style>
