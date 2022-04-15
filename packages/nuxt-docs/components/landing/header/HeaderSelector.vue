<template>
  <div class="header-selector flex-center">
    <va-icon-menu
      v-if="minimized"
      class="i-nav"
      @click="$emit('toggleSidebar', !minimized)"
      :color="colors.primary"
    />
    <va-icon-menu-collapsed
      v-else
      class="i-nav"
      @click="$emit('toggleSidebar', !minimized)"
      :color="colors.primary"
    />
  </div>
</template>

<script lang="ts">

import VaIconMenu from '../../iconset/VaIconMenu.vue'
import VaIconMenuCollapsed from '../../iconset/VaIconMenuCollapsed.vue'
import { getColors } from 'vuestic-ui/src/main'

export default {
  name: 'DocsHeaderSelector',
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

  computed: {
    colors () {
      return getColors()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~vuestic-ui/src/styles/resources';

.i-nav {
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
}

.i-menu-expanded {
  @extend .i-nav;

  background: url("@/assets/icons/menu-collapsed.svg") no-repeat center;
}

.i-menu-collapsed {
  @extend .i-nav;

  background: url("@/assets/icons/menu-expanded.svg") no-repeat center;
}

.header-selector {
  cursor: pointer;
  max-width: 55px;
}

</style>
