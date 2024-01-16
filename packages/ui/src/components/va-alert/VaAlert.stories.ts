import { VaAlert } from './'
import { VaButton } from '../va-button'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { StoryFn } from '@storybook/vue3'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaAlert',
  component: VaAlert,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAlert },
  template: '<va-alert description="Message" />',
})

export const Outline = () => ({
  components: { VaAlert },
  template: '<va-alert description="Message" outline />',
})

export const Dense = () => ({
  components: { VaAlert },
  template: '<va-alert description="Message" dense />',
})

export const Title = () => ({
  components: { VaAlert },
  template: '<va-alert title="Title" description="Message" />',
})

export const Icon = () => ({
  components: { VaAlert },
  template: '<va-alert icon="warning" description="Message" />',
})

export const Center = () => ({
  components: { VaAlert },
  template: `
  <va-alert center title="Title">
    Message
  </va-alert>
  <va-alert center title="Title" icon="va-warning" closeable>
    Message
  </va-alert>
  `,
})

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
    [close text]
    <va-alert closeable close-text="close text">
      Message
    </va-alert>
    ['']
    <va-alert closeable>
      Message
    </va-alert>
  `,
})

export const CloseIcon = () => ({
  components: { VaAlert },
  template: `
    [home]
    <va-alert closeable close-icon="home">
      Message
    </va-alert>
    [close]
    <va-alert closeable>
      Message
    </va-alert>
  `,
})

export const Stateful: StoryFn = () => ({
  components: { VaAlert },
  template: `
    [true]
    <va-alert closeable>
      Message
    </va-alert>
    [false]
    <va-alert :stateful="false" closeable>
      Message
    </va-alert>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstCloseButton, secondCloseButton] = canvas.getAllByRole('button', { name: 'close alert' }) as HTMLElement[]

  await step('Stateful alert must close on x click', async () => {
    await userEvent.click(firstCloseButton)
    await sleep(500)
    const [nonStatefulAlert, statefulAlert] = canvas.getAllByRole('alert', { name: '' }) as HTMLElement[]
    expect(statefulAlert).toBeUndefined()
  })

  await step('Should do nothing', async () => {
    await userEvent.click(secondCloseButton)
    const nonStatefulAlert = canvas.getByRole('alert', { name: '' }) as HTMLElement
    expect(nonStatefulAlert).toBeDefined()
  })
}

export const Color = () => ({
  components: { VaAlert },
  template: `
    <va-alert color="warning" >
      Message
    </va-alert>
  `,
})

export const TextColor = () => ({
  components: { VaAlert },
  template: `
    <va-alert text-color="warning">
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
    <va-alert border="left" border-color="warning">
      Message
    </va-alert>
  `,
})

export const Slotted = () => ({
  components: { VaAlert },
  template: `
    <va-alert closeable>
      <template #close>
        Close
      </template>
      <template #icon>
        Icon
      </template>
      <template #title>
        Title
      </template>
      Message
    </va-alert>
  `,
})

export const HideAndShow: StoryFn = () => ({
  components: { VaAlert, VaButton },
  data: () => ({ isVisible: true }),
  template: `
    <va-alert ref="alert">
      Message
    </va-alert>
    <va-button @click="$refs.alert.show()">
      Show
    </va-button>
    <va-button @click="$refs.alert.hide()">
      Hide
    </va-button>
  `,
})

HideAndShow.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const showButton = canvas.getByRole('button', { name: 'Show' }) as HTMLElement
  const hideButton = canvas.getByRole('button', { name: 'Hide' }) as HTMLElement

  await step('Hides on button click', async () => {
    await userEvent.click(hideButton)
    await sleep(500)
    const alert = document.querySelector('[role="alert"]') as HTMLElement | null
    expect(alert).toBeNull()
  })

  await step('Shows on button click', async () => {
    await userEvent.click(showButton)
    await sleep(500)
    const alert = document.querySelector('[role="alert"]') as HTMLElement
    expect(alert).not.toBeNull()
  })
}
