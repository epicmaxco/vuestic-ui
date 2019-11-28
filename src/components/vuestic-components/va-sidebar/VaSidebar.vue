<template>
  <aside
    :class="computedClass">
    <!-- :style="{ backgroundColor: colorComputed }"> -->
    <va-scrollbar>
      <div class="va-sidebar__menu">
        <slot name="menu"></slot>
      </div>
    </va-scrollbar>
  </aside>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-sidebar',
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
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

// aside.va-sidebar::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(117, 117, 117, 0.3);
//   border-radius: 10px;
//   background-color: #F5F5F5;
// }

// aside.va-sidebar::-webkit-scrollbar {
//   width: 12px;
//   background-color: #F5F5F5;
// }

// aside.va-sidebar::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
//   background-color: $evollu-gray-light;
// }

.va-sidebar {
  background-color: $background-gray;
  min-height: $sidebar-viewport-min-height;
  height: $sidebar-viewport-height;
  position: absolute;
  width: $sidebar-width;
  top: $top-nav-height-with-shaddow;
  left: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
  opacity: 1;

  .layout-fixed & {
    position: fixed;
    // z-index: 10;
  }

  &__menu{
    padding-right: $scrollbar-track-width;
    margin-bottom: 0;
    padding-top: 1.5rem;
    padding-bottom: 3rem;
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

  .va-scrollbar {
    height: 100%;

    .sidebar-menu {
      max-height: 100%;
      margin-bottom: 0;
      list-style: none;
      padding-left: 0;
      li {
        display: block;
        padding-left: 0;
      }
    }

  }

}

</style>
