<template>
  <i
    class="flex-center header-selector"
    :class="`i-menu-${minimized ? 'collapsed' : 'expanded'}`"
    @click="$emit('toggleSidebar', !minimized)"
  />
</template>

<script lang="ts">
// @ts-nocheck
export default {
  name: 'HeaderSelector',
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
  max-width: 60px;
}

</style>
