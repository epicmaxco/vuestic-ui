<template>
  <div class="flex lg6 xs12">
    <div class="mt-2 text--bold muted">Dynamic value:</div>
    <va-progress-bar :value="value">
      {{ value + '%' }}
    </va-progress-bar>
    <div class="mt-4 mb-2 text--bold muted">The "large" preset:</div>
    <va-progress-bar
      :value="value"
      size="large"
    >
      {{ value + '%' }}
    </va-progress-bar>
    <div class="mb-4" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 35,
    }
  },
}
</script>

<style scoped>
.muted {
  color: #7f828b;
}
</style>
