<template>
  <div class="slider__container">
    <va-slider v-model="value" pins/>
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
export default class Pins extends Vue {
  data () {
    return {
      value: 45,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
