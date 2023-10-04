import { VaValue } from '.'
import { VaInput } from '../va-input'

export default {
  title: 'VaValue',
  component: VaValue,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaValue },
  template: `
    <VaValue #default="v">
      <button @click="v.value = !v.value">
        {{ v.value ? 'clicked' : 'unclicked' }}
      </button>
    </VaValue>
  `,
})

export const ReactiveObject = () => ({
  components: { VaValue, VaInput },
  template: `
    <VaValue :defaultValue="{ name: '', age: 0 }" #default="v">
      <VaInput v-model="v.name" label="name" />
      <VaInput v-model="v.age" label="name" />
    </VaValue>
  `,
})
