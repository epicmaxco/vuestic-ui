import { VaValue } from '.'
import { VaInput } from '../va-input'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

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

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')

  await step('button text is initially `unclicked`', async () => {
    expect(button.innerText).toEqual('unclicked')
  })

  await step('button text is `clicked` after clicking it', async () => {
    userEvent.click(button)
    await sleep()
    expect(button.innerText).toEqual('clicked')
  })
}

export const ReactiveObject = () => ({
  components: { VaValue, VaInput },
  template: `
    <VaValue :defaultValue="{ name: '', age: 0 }" #default="v">
      <VaInput v-model="v.name" label="name" />
      <VaInput v-model="v.age" label="age" />
    </VaValue>
  `,
})
