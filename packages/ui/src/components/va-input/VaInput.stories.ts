import { defineComponent } from 'vue'
import VaInputDemo from './VaInput.demo.vue'
import VaInput from './VaInput.vue'

export default {
  title: 'VaInput',
  component: VaInput,
}

export const Default = defineComponent({
  components: { VaInputDemo },
  template: '<VaInputDemo />',
})

export const Loading = () => ({
  components: { VaInput },
  template: '<VaInput loading />',
})

export const Clearable = () => ({
  components: { VaInput },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInput clearable v-model="value" />',
})
