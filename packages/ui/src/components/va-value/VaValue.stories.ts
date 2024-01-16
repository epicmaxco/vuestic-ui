import { VaValue } from '.'
import { VaInput } from '../va-input'
import { VaButton } from '../va-button'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaValue',
  component: VaValue,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaValue, VaButton },
  template: `
    <VaValue #default="v">
      <p data-testid="value">{{ v }}</p>
      <VaButton @click="v.value = !v.value">
        Change
      </VaButton>
    </VaValue>
  `,
})

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')
  const value = canvas.getByTestId('value')

  await step('value is false by default', async () => {
    expect(value.innerText).toEqual('false')
  })

  await step('and can be reassigned', async () => {
    userEvent.click(button)
    await sleep()
    expect(value.innerText).toEqual('true')
  })
}

export const DefaultValue = () => ({
  components: { VaValue, VaInput },
  template: `
    <VaValue :defaultValue="{ name: 'Peter' }" #default="v">
      <p>{{ v.value.name }}</p>
      <VaInput v-model="v.value.name" label="name" />
    </VaValue>
  `,
})
