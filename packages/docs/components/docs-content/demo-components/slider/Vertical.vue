<template>
  <div class="slider__container">
    <va-slider v-model="value" vertical/>
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
export default class Vertical extends Vue {
  data () {
    return {
      value: 45,
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider__container {
    height: 300px;
    padding: 3em;
  }
</style>
