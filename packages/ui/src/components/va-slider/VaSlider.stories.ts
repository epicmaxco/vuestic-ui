import { defineComponent } from 'vue'
import VaSlider from './VaSlider.demo.vue'

export default {
  title: 'VaSlider',
  component: VaSlider,
}

export const Default = defineComponent({
  components: { VaSlider },
  template: '<VaSlider/>',
})
