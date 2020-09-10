<template>
  <div class="flex lg6 xs12">
    <div class="mt-2 mb-5">
      <div class="my-2 text--bold muted">Default:</div>
      <va-progress-bar :value="value" />
    </div>
    <div class="row mb-4 mx-0 flex lg8 xs12">
      <va-slider v-model="value" />
      <span class="ml-4">{{ `${value}%`}}</span>
    </div>
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
