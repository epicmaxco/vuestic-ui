<template>
  <div class="slider__container">
    <va-slider v-model="value1" icon-append="home"/>
    <va-slider v-model="value2" icon-prepend="home"/>
  </div>
</template>

<script>
import VaSlider from 'vuestic-ui/src/components/vuestic-components/va-slider/VaSlider.vue'

export default {
  components: {
    VaSlider,
  },
  data () {
    return {
      value1: 45,
      value2: 45,
    }
  },
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
