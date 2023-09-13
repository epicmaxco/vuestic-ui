import { defineComponent } from 'vue'
import VaToastDemo from './VaToast.demo.vue'
import VaToast from './VaToast.vue'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'

export default {
  title: 'VaToast',
  component: VaToast,
}

export const Default = () => defineComponent({
  components: { VaToastDemo },
  template: '<VaToastDemo/>',
})

export const TextColor: StoryFn = () => ({
  components: { VaToast: VaToast },
  template: '<VaToast color="red"/>',
})

TextColor.play = async ({ canvasElement, step }) => {
  await step('Have white color', async () => {
    expect(canvasElement.querySelector('.va-toast')).toHaveStyle({
      color: '#ffffff',
    })
  })
}
