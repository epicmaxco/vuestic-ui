<template>
  <p class="code-snippet">
    --va-<span class="text--highlighted">component-name</span>-<span class="text--highlighted">variable-name</span>
  </p>
</template>

<style lang="scss" scoped>
  .code-snippet {
    background: var(--va-background);
    color: var(--va-dark);
  }

  .text--highlighted {
    padding: 0 4px;
  }
</style>
