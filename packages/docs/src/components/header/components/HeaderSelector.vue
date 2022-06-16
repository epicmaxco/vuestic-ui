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
import { useColors } from '../../../../../ui/src/main'
import { computed } from 'vue'

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

  setup () {
    const { getColors } = useColors()

    return {
      colors: computed(getColors),
    }
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
