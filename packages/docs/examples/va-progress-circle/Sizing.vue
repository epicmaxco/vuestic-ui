<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">Size "small":</div>
    <va-progress-circle
      size="small"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "large":</div>
    <va-progress-circle
      size="large"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "25px":</div>
    <va-progress-circle
      :size="25"
      :value="value"
    />
    <div class="my-2 text--bold muted">Size "2rem":</div>
    <va-progress-circle
      size="2rem"
      :value="value"
    />
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
