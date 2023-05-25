<template>
  <div class="flex items-center p-2">
    Accent gradient
  </div>
</template>

<style scoped>
div {
  color: var(--va-on-primary);
  background: linear-gradient(
    to right,
    var(--va-primary),
    var(--va-info),
    var(--va-success),
    var(--va-warning),
    var(--va-danger)
  );
}
</style>
