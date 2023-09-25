import { userEvent } from '@storybook/testing-library'
import { StoryFn } from '@storybook/vue3'
import { defineComponent } from 'vue'
import VaSwitchDemo from './VaSwitch.demo.vue'
import VaSwitch from './VaSwitch.vue'
import { expect } from '@storybook/jest'

export default {
  title: 'VaSwitch',
  component: VaSwitch,
}

export const Default = () => defineComponent({
  components: { VaSwitch: VaSwitchDemo },
  template: '<VaSwitch/>',
})

export const ChangeEvent: StoryFn = () => ({
  components: { VaSwitch },

  data: () => ({ value: false, changeCount: 0 }),

  methods: {
    onChange (e) {
      if (e.target) {
        this.changeCount++
      }
    },
  },

  template: `
    [changes count]: {{ changeCount }}
    <VaSwitch v-model="value" @change="onChange" />
  `,
})

ChangeEvent.play = async (e) => {
  const input = e.canvasElement.querySelector('input')!

  await userEvent.click(input)

  expect(e.canvasElement.textContent).toContain('[changes count]: 1')

  await userEvent.keyboard(' ')

  expect(e.canvasElement.textContent).toContain('[changes count]: 2')

  await userEvent.type(input, '{enter}')

  expect(e.canvasElement.textContent).toContain('[changes count]: 3')
}
