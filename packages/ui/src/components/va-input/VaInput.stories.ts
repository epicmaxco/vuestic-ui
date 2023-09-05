import { defineComponent } from 'vue'
import VaInputDemo from './VaInput.demo.vue'
import { VaInput } from './'
import { expect } from '@storybook/jest'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaInput',
  component: VaInput,
}

export const Default = defineComponent({
  components: { VaInputDemo },
  template: '<VaInputDemo />',
})

export const Disabled: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput disabled/>',
})
Disabled.play = async ({ canvasElement, step }) => {
  const input = canvasElement.querySelector('input')

  expect(input).toHaveAttribute('disabled')
  const vaInput = canvasElement.querySelector('.va-input')

  expect(vaInput).toHaveClass('va-input-wrapper--disabled')
}

export const Placeholder: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput placeholder="Placeholder"/>',
})
Placeholder.play = async ({ canvasElement, step }) => {
  const input = canvasElement.querySelector('input')

  expect(input).toHaveAttribute('placeholder', 'Placeholder')
}

export const Autofocus: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput autofocus />',
})
Autofocus.play = async ({ canvasElement }) => {
  const input = canvasElement.querySelector('input')

  expect(input).toHaveFocus()
}
