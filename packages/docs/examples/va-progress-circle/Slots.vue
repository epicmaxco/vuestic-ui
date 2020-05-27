<template>
  <div class="flex lg6 xs12">
    <div class="mt-2 text--bold muted">Dynamic value:</div>
    <va-progress-circle :value="value">
      {{ value + '%' }}
    </va-progress-circle>
    <div class="mt-4 mb-2 text--bold muted">Indeterminate state:</div>
    <va-progress-circle
      :value="value"
      indeterminate
    >
      {{ value + '%' }}
    </va-progress-circle>
    <div class="mb-4" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 65,
    }
  },
}
</script>

<style scoped>
.muted {
  color: #7f828b;
}
</style>
