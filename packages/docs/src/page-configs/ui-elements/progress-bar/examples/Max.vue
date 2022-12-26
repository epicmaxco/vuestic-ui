<template>
  <div class="flex lg6 xs12">
    <va-progress-bar :model-value="value" :max="max" />
    <va-slider class="mt-3" v-model="value" :max="max" track-label-visible />
    <va-input v-model="max" label="Max value" class="mt-3" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      max: 50,
      value: 35,
    }
  },
}
</script>
