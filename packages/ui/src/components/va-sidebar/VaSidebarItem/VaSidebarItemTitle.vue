<template>
  <div class="va-sidebar__title va-sidebar-item-title">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '../_variables';

  .va-sidebar__title {
    flex-grow: 1;
    white-space: var(--va-sidebar-item-title-white-space);
  }
</style>
