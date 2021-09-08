<template>
  <div class="va-dropdown__content">
    <slot />
  </div>
</template>

<style lang="scss">
  @import "variables";

  .va-dropdown {
    &__content {
      background: var(--va-dropdown-content-background);
      padding: var(--va-dropdown-content-padding);
      box-shadow: var(--va-dropdown-content-box-shadow);
      border-radius: var(--va-dropdown-content-border-radius);
    }
  }
</style>
