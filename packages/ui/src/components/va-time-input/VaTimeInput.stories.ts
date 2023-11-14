import { sleep } from './../../utils/sleep'
import { expect } from '@storybook/jest'
import { userEvent } from '@storybook/testing-library'
import { StoryFn } from '@storybook/vue3'
import VaTimeInputDemo from './VaTimeInput.demo.vue'
import VaTimeInput from './VaTimeInput.vue'

export default {
  title: 'VaTimeInput',
  component: VaTimeInput,
}

export const OldDemos = () => ({
  components: { VaTimeInputDemo },
  template: '<VaTimeInputDemo />',
})

export const Default = () => ({
  components: { VaTimeInput },
  template: '<VaTimeInput/>',
})

export const Loading = () => ({
  components: { VaTimeInput },
  template: '<VaTimeInput loading />',
})

export const Clearable: StoryFn = () => ({
  components: { VaTimeInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  template: '<VaTimeInput clearable v-model="value" />',
})

Clearable.play = async ({ canvasElement }) => {
  const leftIcon = canvasElement.querySelector('.va-input-wrapper__field')!
  const clearButton = canvasElement.querySelector('.va-time-input__clear-button')!
  const input = canvasElement.querySelector('.va-time-input__input')!

  await userEvent.click(leftIcon)

  // Dropdown should be visible
  expect(canvasElement.parentElement!.querySelector('.va-time-picker')).not.toBe(null)

  await userEvent.click(clearButton)

  expect(input).toHaveValue('')
  // Dropdown should be hidden
  expect(canvasElement.querySelector('.va-dropdown__content')).toBe(null)
}
