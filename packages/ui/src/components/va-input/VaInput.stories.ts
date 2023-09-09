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

export const LabelSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value">
      <template #label="bind">
        <span style="color: red">Custom label!</span>
      </template>
    </VaInput>
  `,
})

export const InnerLabelSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" inner-label>
      <template #label="{ label }">
        <span style="color: red">Custom label!</span>
      </template>
    </VaInput>
  `,
})

export const MessagesSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" :messages="['User message!']">
      <template #messages="{ messages }">
        <span style="color: red">{{ messages }}</span>
      </template>
    </VaInput>
  `,
})

export const MessageSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" :messages="['User message!']">
      <template #message="{ message }">
        <span style="color: red">{{ message }}</span>
      </template>
    </VaInput>
  `,
})
