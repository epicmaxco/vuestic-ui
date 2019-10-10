<template>
  <aside
    :class="computedClass"
    :style="{ backgroundColor: colorComputed }"
  >
    <ul class="va-topbar__menu">
      <slot name="menu"></slot>
    </ul>
  </aside>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

// Note: topbar is not finished and not included to the layout.
export default {
  name: 'va-topbar',
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
        'va-topbar': true,
        'va-topbar--minimized': this.minimized,
      }
    },
  },
}
</script>

<style lang="scss">
  @import "../../vuestic-sass/resources/resources";

  .va-topbar {
    display: flex;
    justify-content: center;

    &__menu {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      flex: 1 1 auto;

      @include media-breakpoint-down(sm) {
        max-width: 90%;
      }
    }
  }
</style>
