<template>
  <div class="slider__container">
    <va-slider v-model="value1" icon-append="home"/>
    <va-slider v-model="value2" icon-prepend="home"/>
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
      value1: 45,
      value2: 45,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
