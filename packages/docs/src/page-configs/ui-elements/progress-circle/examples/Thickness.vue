<template>
  <div class="flex flex-col lg6 xs12">
    <div class="my-2 text--bold muted">0.1</div>
    <va-progress-circle :thickness="0.1" :modelValue="value" />

    <div class="my-2 text--bold muted">0.6</div>
    <va-progress-circle :thickness="0.6" :modelValue="value" />

    <div class="my-2 text--bold muted">0.6 + intermediate</div>
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
