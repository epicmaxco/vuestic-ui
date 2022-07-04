<template>
  <div class="flex lg6 xs12">
    <va-progress-bar :model-value="value" :buffer="bufferValue" />

    <va-slider class="mt-4"
      v-model="value"
      track-label-visible
      :track-label="(v) => `${v}%`"
      label="Value:"
    />
    <va-slider class="mt-2"
      v-model="bufferValue"
      track-label-visible
      :track-label="(v) => `${v}%`"
      label="Buffer:"

    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 35,
      bufferValue: 100,
    }
  },
}
</script>
