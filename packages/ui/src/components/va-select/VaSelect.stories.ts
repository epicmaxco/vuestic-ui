import VaSelectDemo from './VaSelect.demo.vue'
import VaSelect from './VaSelect.vue'

export default {
  title: 'VaSelect',
  component: VaSelect,
}

export const OldDemos = () => ({
  components: { VaSelectDemo },
  template: '<VaSelectDemo />',
})

export const Default = () => ({
  components: { VaSelect },
  template: '<VaSelect/>',
})

export const Loading = () => ({
  components: { VaSelect },
  template: '<VaSelect loading />',
})
