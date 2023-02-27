<template>
  <p class="va-code-snippet">
    --va-<span class="va-text-highlighted">component-name</span>-<span
      class="va-text-highlighted"
    >variable-name</span>
  </p>
</template>

<style lang="scss" scoped>
.va-code-snippet {
  background: var(--va-background-primary);
  color: var(--va-dark);
}

.va-text-highlighted {
  padding: 0 4px;
}
</style>
