<template>
  <div class="slider__container">
    <va-slider v-model="value1" track-label-visible/>
    <va-slider v-model="value2" track-label-visible :track-label="value2+'%'"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaSlider from 'vuestic-ui/src/components/vuestic-components/va-slider/VaSlider.vue'
@Component({
  components: {
    VaSlider,
  },
})
export default class Default extends Vue {
  data () {
    return {
      value1: 23,
      value2: 75,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
