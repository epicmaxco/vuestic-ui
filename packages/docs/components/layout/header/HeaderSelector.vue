<template>
  <div
    class="header-selector"
    role="button"
    tabindex="0"
    :aria-label="`${minimized ? 'expand' : 'minimize'} navigation menu`"
    @click="toggleSidebar"
    @keydown.enter="toggleSidebar"
  >
    <va-icon-menu
      v-if="minimized"
      aria-hidden="true"
      class="i-nav"
      :color="colors.primary"
    />
    <va-icon-menu-collapsed
      v-else
      aria-hidden="true"
      class="i-nav"
      :color="colors.primary"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useColors } from 'vuestic-ui'

import VaIconMenu from './icons/VaIconMenu.vue'
import VaIconMenuCollapsed from './icons/VaIconMenuCollapsed.vue'

export default defineComponent({
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
  emits: ['toggle-sidebar'],

  setup (props, { emit }) {
    const { getColors } = useColors()

    return {
      colors: computed(getColors),
      toggleSidebar: () => emit('toggle-sidebar', !props.minimized),
    }
  },
})
</script>

<style lang="scss" scoped>
@import 'vuestic-ui/src/styles/resources';

.i-nav {
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
}

.header-selector {
  cursor: pointer;

  &:focus-visible {
    @include focus-outline(2px, 2px, 2px);
  }
}
</style>
