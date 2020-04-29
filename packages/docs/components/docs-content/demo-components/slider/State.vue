<template>
  <div class="slider__container">
    Disabled <va-slider v-model="value1" disabled/>
    Readonly <va-slider v-model="value2" readonly/>
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
export default class State extends Vue {
  data () {
    return {
      value1: 33,
      value2: 66,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
