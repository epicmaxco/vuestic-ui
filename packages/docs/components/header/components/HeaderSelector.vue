<template>
  <div class="header-selector flex-center">
    <va-icon-menu
      v-if="minimized"
      class="i-nav"
      @click.native="$emit('toggleSidebar', !minimized)"
      :color="$themes.primary"
    />
    <va-icon-menu-collapsed
      v-else
      class="i-nav"
      @click.native="$emit('toggleSidebar', !minimized)"
      :color="$themes.primary"
    />
  </div>
</template>

<script lang="ts">
import VaIconMenu from '../../../iconset/VaIconMenu.vue'
import VaIconMenuCollapsed from '../../../iconset/VaIconMenuCollapsed.vue'
// @ts-nocheck
export default {
  name: 'HeaderSelector',
  components: {
    VaIconMenu,
    VaIconMenuCollapsed,
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'vuestic-ui/src/components/vuestic-sass/resources/resources';

.i-nav {
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
}

.i-menu-expanded {
  @extend .i-nav;

  background: url("~assets/icons/menu-collapsed.svg") no-repeat center;
}

.i-menu-collapsed {
  @extend .i-nav;

  background: url("~assets/icons/menu-expanded.svg") no-repeat center;
}

.header-selector {
  cursor: pointer;
  max-width: 55px;
}

</style>
