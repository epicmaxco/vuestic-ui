<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">small</div>
    <va-progress-circle
      size="small"
      :value="value"
    />
    <div class="my-2 text--bold muted">large</div>
    <va-progress-circle
      size="large"
      :value="value"
    />
    <div class="my-2 text--bold muted">25px</div>
    <va-progress-circle
      :size="25"
      :value="value"
    />
    <div class="my-2 text--bold muted">2rem</div>
    <va-progress-circle
      size="2rem"
      :value="value"
    />
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
