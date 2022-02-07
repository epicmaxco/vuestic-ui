<template>
  <div>
    <va-slider v-model="value1" track-color="warning" />
    <va-slider v-model="value2" :show-track="false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 45,
      value2: 54,
    }
  },
}
</script>
