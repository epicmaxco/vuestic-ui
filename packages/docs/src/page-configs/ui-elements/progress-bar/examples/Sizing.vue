<template>
  <div class="flex flex-col lg6 xs12">
    <div class="my-2 text--bold muted">small</div>
    <va-progress-bar
      size="small"
      :model-value="value"
    />
    <div class="my-2 text--bold muted">large</div>
    <va-progress-bar
      size="large"
      :model-value="value"
    />
    <div class="my-2 text--bold muted">25px</div>
    <va-progress-bar
      :size="25"
      :model-value="value"
    />
    <div class="my-2 text--bold muted">2rem</div>
    <va-progress-bar
      size="2rem"
      :model-value="value"
    />
  </div>
</template>

<script>
export default {
  data () {
    return { value: 35 }
  },
}
</script>
