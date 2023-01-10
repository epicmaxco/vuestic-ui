<template>
  <div class="flex flex-col lg6 xs12">
    <div class="mt-2 text--bold muted">When you use a default slot:</div>
    <va-progress-bar :model-value="value">
      {{ value }}
    </va-progress-bar>

    <div class="mt-6 mb-2 text--bold muted">When you use a 'content-inside' prop:</div>
    <va-progress-bar
      :model-value="value"
      size="large"
      content-inside
    >
      {{ value }}
    </va-progress-bar>

    <div class="mt-6 mb-2 text--bold muted">When you use a 'show-percent' prop:</div>
    <va-progress-bar
      :model-value="value"
      show-percent
    />
    <va-progress-bar
      class="mt-2"
      :model-value="value"
      size="1.5rem"
      color="warning"
      content-inside
      show-percent
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 75,
    }
  },
}
</script>
