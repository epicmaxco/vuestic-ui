<template>
  <div class="slider__container">
    <va-slider v-model="value1">
      <va-input type="number" slot="prepend" v-model="value1"></va-input>
    </va-slider>
    <va-slider v-model="value2">
      <va-input type="number" slot="append" v-model="value2"></va-input>
    </va-slider>
    <va-slider v-model="value3">
      <div style="font-style: italic; color: black;" slot="label">LABEL SLOT</div>
    </va-slider>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaSlider from 'vuestic-ui/src/components/vuestic-components/va-slider/VaSlider.vue'
import VaInput from 'vuestic-ui/src/components/vuestic-components/va-input/VaInput.vue'
@Component({
  components: {
    VaSlider,
    VaInput,
  },
})
export default class Slots extends Vue {
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
