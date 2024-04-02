import { ref } from 'vue'
import VaFormField from './VaFormField.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaFormField',
  component: VaFormField,
}

export const Default: StoryFn = () => ({
  components: { VaFormField },
  template: `
    <VaFormField #default="{ value }">
      [FormField default slot value] {{ value }}
      <input v-model="value.ref" />
    </VaFormField>
  `,
})

export const Invalid: StoryFn = () => ({
  components: { VaFormField },
  setup () {
    return {
      value: ref('abcd'),
    }
  },
  template: `
    <VaFormField v-model="value" :rules="[(v) => v.length < 2 || 'Max length is 2']" #default="{ isValid, isDirty, errorMessages, value }" :dirty="true">
      [IsValid]: {{ isValid }}
      [IsDirty]: {{ isDirty }}
      [ErrorMessages]: {{ errorMessages }}
      <input v-model="value.ref" />
    </VaFormField>
  `,
})

export const Focus: StoryFn = () => ({
  components: { VaFormField },
  setup () {
    return {
      value: ref('abcd'),
    }
  },
  template: `
    <VaFormField v-model="value" :rules="[(v) => v.length < 0 || 'Required', (v) => v.length > 3 || 'Max length']"  #default="{ bind }">
      <input v-model="value" v-bind="bind" />
    </VaFormField>
  `,
})
