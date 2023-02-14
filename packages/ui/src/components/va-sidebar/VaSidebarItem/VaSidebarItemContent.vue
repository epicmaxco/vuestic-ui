<template>
  <div class="va-sidebar__item__content va-sidebar-item-content">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaSidebarItemContent',
})

</script>

<style lang="scss">
@import '../variables';

.va-sidebar__item__content {
  display: flex;
  align-items: center;
  padding: var(--va-sidebar-item-content-padding);
  min-height: 58px;
  box-sizing: border-box;

  & > * {
    margin-right: var(--va-sidebar-item-content-gap);

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
