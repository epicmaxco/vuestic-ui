<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">Size "small":</div>
    <va-progress-bar
      size="small"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "large":</div>
    <va-progress-bar
      size="large"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "25px":</div>
    <va-progress-bar
      :size="25"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "2rem":</div>
    <va-progress-bar
      size="2rem"
      :value="value"
    />
    <div class="mb-4" />
  </div>
</template>

<style scoped>
.muted {
  color: #7f828b;
}
</style>
