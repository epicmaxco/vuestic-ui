<template>
  <div class="va-sidebar__title va-sidebar-item-title">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaSidebarItemTitle',
})
</script>

<style lang="scss">
@import '../_variables';

.va-sidebar__title {
  flex-grow: 1;
  white-space: var(--va-sidebar-item-title-white-space);
}
</style>
