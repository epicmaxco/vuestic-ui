<template>
  <div class="slider__container">
    <va-slider label="label" v-model="value1"/>
    <va-slider label="inverted" invert-label v-model="value2"/>
    <va-slider label="danger" label-color="danger" v-model="value2"/>
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
export default class Label extends Vue {
  data () {
    return {
      value1: 37,
      value2: 73,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
