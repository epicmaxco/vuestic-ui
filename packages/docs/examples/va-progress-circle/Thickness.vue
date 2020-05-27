<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">Thickness 0.01:</div>
    <va-progress-circle :thickness="0.01" :value="value" />
    <div class="my-2 text--bold muted">Thickness 0.6:</div>
    <va-progress-circle :thickness="0.6" :value="value" />
    <div class="my-2 text--bold muted">Thickness 0.6 with intermediate state</div>
    <va-progress-circle :thickness="0.6" indeterminate />
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
