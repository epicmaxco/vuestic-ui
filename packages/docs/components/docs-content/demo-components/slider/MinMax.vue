<template>
  <div class="slider__container">
    <va-slider v-model="value3" track-label-visible :min="15" :max="75"/>
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
export default class MinMax extends Vue {
  data () {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
