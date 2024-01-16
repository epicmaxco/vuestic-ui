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

  data: () => ({ value: false, changeCount: 0, lastEventValue: null }),

  methods: {
    onChange (e: InputEvent) {
      this.changeCount++
      this.lastEventValue = (e.target as HTMLInputElement).checked
    },
  },

  template: `
    <p>change count: <span data-testid="count">{{ changeCount }}</span></p>
    <p>last event value: <span data-testid="value">{{ lastEventValue }}</span></p>
    <VaSwitch v-model="value" @change="onChange" />
  `,
})

ChangeEvent.play = async ({ canvasElement }) => {
  const input = canvasElement.querySelector('input')!
  const changesCounter = canvasElement.querySelector('[data-testid="count"]')!
  const changesValue = canvasElement.querySelector('[data-testid="value"]')!

  await userEvent.click(input)

  expect(changesCounter.textContent).toContain('1')
  expect(changesValue.textContent).toContain('true')

  await userEvent.keyboard(' ')

  expect(changesCounter.textContent).toContain('2')
  expect(changesValue.textContent).toContain('false')

  await userEvent.keyboard('{enter}')

  expect(changesCounter.textContent).toContain('3')
  expect(changesValue.textContent).toContain('true')
}
