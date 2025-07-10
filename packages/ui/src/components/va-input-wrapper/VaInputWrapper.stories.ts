import { defineComponent } from 'vue'
import VaInputWrapperDemo from './VaInputWrapper.demo.vue'
import VaInputWrapper from './VaInputWrapper.vue'

export default {
  title: 'VaInputWrapper',
  component: VaInputWrapper,
}

export const Default = () => ({
  components: { VaInputWrapperDemo },
  template: '<VaInputWrapperDemo/>',
})

export const inputLabel = () => ({
  components: { VaInputWrapper },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInputWrapper label="userName"  v-model="value" :child:input-label="{ \'color\': \'danger\' }"/>',
})

export const iconLoading = () => ({
  components: { VaInputWrapper },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInputWrapper loading v-model="value" :child:icon-loading="{ \'color\': \'danger\' }"/>',
})

export const iconError = () => ({
  components: { VaInputWrapper },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInputWrapper error v-model="value" :child:icon-error="{ \'name\': \'close\' }"/>',
})

export const iconSuccess = () => ({
  components: { VaInputWrapper },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInputWrapper success v-model="value" :child:icon-success="{ \'name\': \'check\' }"/>',
})
