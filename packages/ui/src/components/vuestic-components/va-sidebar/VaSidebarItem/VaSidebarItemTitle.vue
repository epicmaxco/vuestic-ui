<template>
  <div class="va-sidebar__title">
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
