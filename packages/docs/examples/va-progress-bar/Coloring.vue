<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">Danger color:</div>
    <va-progress-bar
      value="35"
      color="danger"
    />
    <div class="my-2 text--bold muted">Custom color:</div>
    <va-progress-bar
      value="35"
      color="purple"
    />
    <div class="mb-4" />
  </div>
</template>

<style scoped>
.muted {
  color: #7f828b;
}
</style>
