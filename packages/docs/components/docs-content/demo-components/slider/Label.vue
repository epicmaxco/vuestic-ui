<template>
  <div class="slider__container">
    <va-slider label="label" v-model="value1"/>
    <va-slider label="inverted" invert-label v-model="value2"/>
    <va-slider label="danger" label-color="danger" v-model="value3"/>
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
      value1: 37,
      value2: 73,
      value3: 53,
    }
  },
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
