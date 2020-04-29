<template>
  <div class="slider__container">
    <va-slider v-model="value1" track-color="warning"/>
    <va-slider v-model="value2" :show-track="false"/>
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
export default class Track extends Vue {
  data () {
    return {
      value1: 45,
      value2: 54,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
