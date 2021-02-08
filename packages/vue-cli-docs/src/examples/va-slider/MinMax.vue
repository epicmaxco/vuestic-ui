<template>
  <div>
    <va-slider v-model="value3" track-label-visible :min="15" :max="75"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    }
  },
}
</script>
