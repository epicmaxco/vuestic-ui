import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Vueform Integration/Button',
}


export const Default: StoryFn = () => ({
  setup() {
    const formRef = ref(null)
    return {
      formRef
    }
  },
  template: `
  <Vueform ref="formRef">
    <VaInputElement
      name="username"
    />
    <VaButtonElement
      name="reset-button"
      @click="formRef.reset()"
    >
      Reset
    </VaButtonElement>
  </Vueform>
  `,
})
