<template>
  <div class="va-sidebar__item__content va-sidebar-item-content">
    <slot />
  </div>
</template>

<style lang="scss">
  @import '../variables';

  .va-sidebar__item__content {
    display: flex;
    align-items: center;
    padding: var(--va-sidebar-item-content-padding);

    & > * {
      margin-right: var(--va-sidebar-item-content-gap);

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
