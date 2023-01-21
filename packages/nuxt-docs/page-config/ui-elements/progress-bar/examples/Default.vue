<template>
  <div class="flex flex-col lg6 xs12">
    <va-progress-bar :model-value="value" />
    <va-slider class="mt-3" v-model="value" track-label-visible />
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
