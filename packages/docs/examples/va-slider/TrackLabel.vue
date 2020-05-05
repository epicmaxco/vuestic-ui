<template>
  <div>
    <va-slider v-model="value1" track-label-visible/>
    <va-slider v-model="value2" track-label-visible :track-label="value2+'%'"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 23,
      value2: 75,
    }
  },
}
</script>
