<template>
  <div class="flex lg6 xs12">
    <div class="mt-4 mb-5">
      <va-progress-bar :value="value" :buffer="bufferValue" />
    </div>
    <div class="row mb-4 mx-0 flex">
      <va-slider v-model="value" />
      <span class="ml-4">Value: {{ `${value}%`}}</span>
    </div>
    <div class="row mb-4 mx-0 flex">
      <va-slider v-model="bufferValue" />
      <span class="ml-4">Buffer: {{ `${bufferValue}%`}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 35,
      bufferValue: 65,
    }
  },
}
</script>
