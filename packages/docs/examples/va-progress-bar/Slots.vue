<template>
  <div class="flex lg6 xs12">
    <div class="mt-2 text--bold muted">When you use a default size:</div>
    <va-progress-bar :value="value">
      {{ value + '%' }}
    </va-progress-bar>
    <div class="mt-4 mb-2 text--bold muted">When you use a 'large' size:</div>
    <va-progress-bar
      :value="value"
      size="large"
    >
      {{ value + '%' }}
    </va-progress-bar>
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
