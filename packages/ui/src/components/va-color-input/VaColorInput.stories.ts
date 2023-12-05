import { defineComponent } from 'vue'
import VaColorInput from './VaColorInput.vdemo.vue'

export default {
  title: 'VaColorInput',
  component: VaColorInput,
}

export const Default = defineComponent({
  components: { VaColorInput },
  template: '<VaColorInput />',
})
