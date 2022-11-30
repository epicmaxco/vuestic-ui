<template>
  <div class="flex lg6 xs12">
    <va-progress-circle v-model="value" />

    <va-slider class="mt-3"
      v-model="value"
      track-label-visible
      :track-label="(v) => `${v}%`"
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
