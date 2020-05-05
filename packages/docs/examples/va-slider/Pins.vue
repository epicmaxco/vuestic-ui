<template>
  <div class="slider__container">
    <va-slider v-model="value" pins/>
  </div>
</template>

<script>
import VaSlider from '../../../ui/src/components/vuestic-components/va-slider/VaSlider.vue'
export default {
  components: {
    VaSlider,
  },
  data () {
    return {
      value: 45,
    }
  },
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
