import { VaAlert } from './'
import { VaButton } from '../va-button'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'VaAlert',
  component: VaAlert,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    description: 'Message',
  },
}

export const Dense = {
  args: {
    dense: true,
    description: 'Message',
  },
}

export const Title = {
  args: {
    title: 'Title',
    description: 'Message',
  },
}

export const Center = {
  args: {
    center: true,
    title: 'Title',
    description: 'Message',
  },
}

export const Icon = {
  args: {
    icon: 'Icon',
    description: 'Message',
  },
}

export const Outline = {
  args: {
    outline: true,
    description: 'Message',
  },
}

export const Closeable = () => ({
  components: { VaAlert },
  template: `
    [true]
    <va-alert closeable>
      Message
    </va-alert>
    [false]
    <va-alert>
      Message
    </va-alert>
  `,
})

export const CloseText = () => ({
  components: { VaAlert },
  template: `
    [close]
    <va-alert closeable close-text="close">
      Message
    </va-alert>
    [undefined]
    <va-alert closeable>
      Message
    </va-alert>
  `,
})

export const Stateful = () => ({
  components: { VaAlert },
  template: `
    [true]
    <va-alert stateful closeable>
      Message
    </va-alert>
    [false]
    <va-alert closeable>
      Message
    </va-alert>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstCloseButton, secondCloseButton] = canvas.getAllByRole('button', { name: 'close alert' }) as HTMLElement[]

  await step('Stateful alert must close on x click', async () => {
    await userEvent.click(firstCloseButton)
    const [nonStatefulAlert, statefulAlert] = canvas.getAllByRole('alert', { name: '' }) as HTMLElement[]
    expect(statefulAlert).toBeUndefined()
  })

  await step('Should do nothing', async () => {
    await userEvent.click(firstCloseButton)
    const nonStatefulAlert = canvas.getByRole('alert', { name: '' }) as HTMLElement
    expect(nonStatefulAlert).toBeDefined()
  })
}

export const Color = () => ({
  components: { VaAlert },
  template: `
    [warning]
    <va-alert color="warning">
      Message
    </va-alert>
    [#ce6e67]
    <va-alert color="#ce6e67">
      Message
    </va-alert>
  `,
})

export const TextColor = () => ({
  components: { VaAlert },
  template: `
    [warning]
    <va-alert text-color="warning">
      Message
    </va-alert>
    [#ce6e67]
    <va-alert text-color="#ce6e67">
      Message
    </va-alert>
  `,
})

export const Border = () => ({
  components: { VaAlert },
  template: `
    [top]
    <va-alert border="top">
      Message
    </va-alert>
    [bottom]
    <va-alert border="bottom">
      Message
    </va-alert>
    [left]
    <va-alert border="left">
      Message
    </va-alert>
    [right]
    <va-alert border="right">
      Message
    </va-alert>
  `,
})

export const BorderColor = () => ({
  components: { VaAlert },
  template: `
    [warning]
    <va-alert border="left" border-color="warning">
      Message
    </va-alert>
    [#ce6e67]
    <va-alert border="left" border-color="#ce6e67">
      Message
    </va-alert>
  `,
})

export const Sloted = () => ({
  components: { VaAlert },
  template: `
    <va-alert closeable>
      <template #close>
        Slotted close
      </template>
      <template #icon>
        Slotted icon
      </template>
      <template #title>
        Slotted title
      </template>
      Slotted message
    </va-alert>
  `,
})

export const Hide = () => ({
  components: { VaAlert, VaButton },
  template: `
    <va-alert stateful ref="alert">
      Message
    </va-alert>
    <va-button @click="$refs.alert.hide()">
      Hide
    </va-button>
  `,
})

Hide.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const hideButton = canvas.getByRole('button', { name: 'Hide' }) as HTMLElement

  await step('Hides on button click', async () => {
    await userEvent.click(hideButton)
    const alert = document.querySelector('[role="alert"]') as HTMLElement | null
    expect(alert).toBeNull()
  })
}
