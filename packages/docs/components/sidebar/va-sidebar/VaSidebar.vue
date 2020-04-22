<template>
  <aside
    :class="computedClass"
  >
    <div class="va-sidebar__menu">
      <slot name="menu" />
    </div>
  </aside>
</template>

<script>
import Vue from 'vue'
import { ColorThemeMixin } from '../../../../ui/src/services/ColorThemePlugin'

export default Vue.extend({
  name: 'VaSidebar',
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
        'va-sidebar': true,
        'va-sidebar--minimized': this.minimized,
      }
    },
  },
})
</script>

<style lang="scss">
@import "../../../../ui/src/components/vuestic-sass/resources/resources";

.va-sidebar {
  font-family: Source Sans Pro, sans-serif;
  min-height: $sidebar-viewport-min-height;
  height: $sidebar-viewport-height;
  width: 250px;
  position: absolute;
  transition: all 0.3s ease;
  overflow-y: auto;
  background: #f4f8fa;

  &__menu {
    position: static;
    max-height: 100%;
    list-style: none;
    padding-left: 0;
  }

  @include media-breakpoint-down(sm) {
    top: $sidebar-mobile-top;
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

    & + .content-wrap {
      margin-left: $sidebar-width--hidden !important;
    }
  }
}
</style>
