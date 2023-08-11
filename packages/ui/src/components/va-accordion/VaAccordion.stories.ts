import { VaAccordion } from './'
import { VaCollapse } from '../va-collapse'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

async function DispatchEventWithDelay (element: HTMLElement, callback: (element: HTMLElement) => void, ms: number) {
  callback(element)
  await sleep(ms)
}

export default {
  title: 'VaAccordion',
  component: VaAccordion,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAccordion, VaCollapse },
  template: `
    <va-accordion>
      <va-collapse
        v-for="i in 3"
        :key="i"
        header="Collapse"
      >
        Content
      </va-collapse>
    </va-accordion>
  `,
})

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]

  await step('Opens on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'true')
  })

  await step('Close on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
  })

  await step('Opening another, closes previous', async () => {
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'true')
  })
}

export const Stateful = () => ({
  components: { VaAccordion, VaCollapse },
  template: `
    [true]
    <va-accordion stateful>
      <va-collapse header="Collapse">
        Content
      </va-collapse>
    </va-accordion>
    [false]
    <va-accordion>
      <va-collapse header="Collapse">
        Content
      </va-collapse>
    </va-accordion>
  `,
})

Stateful.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
  const [lastCollapse] = collapses.slice(-1)
  collapses.push(lastCollapse)

  for (const collapse of collapses) {
    await DispatchEventWithDelay(collapse, userEvent.click, 500)
  }
}

export const Multiple = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      modelValue: [false, true, false],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="modelValue" multiple>
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

Multiple.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
  await DispatchEventWithDelay(collapses[1], userEvent.click, 500)

  for (const collapse of collapses) {
    await DispatchEventWithDelay(collapse, userEvent.click, 500)
  }

  for (const collapse of collapses.reverse()) {
    await DispatchEventWithDelay(collapse, userEvent.click, 500)
  }

  await DispatchEventWithDelay(collapses[1], userEvent.click, 500)
}

export const Inset = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      modelValue: [true, true, false, false, true],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="modelValue" inset multiple>
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

Inset.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
  const skip = new Set([0, 1, 4])
  let index = 0

  for (const collapse of collapses) {
    if (skip.has(index)) {
      await DispatchEventWithDelay(collapse, userEvent.click, 500)
    }
    index++
  }

  index = 0

  for (const collapse of collapses.reverse()) {
    if (skip.has(index)) {
      await DispatchEventWithDelay(collapse, userEvent.click, 500)
    }
    index++
  }
}

export const Popout = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      modelValue: [true, true, false, false, true],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="modelValue" popout multiple>
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

Popout.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
  const skip = new Set([0, 1, 4])
  let index = 0

  for (const collapse of collapses) {
    if (skip.has(index)) {
      await DispatchEventWithDelay(collapse, userEvent.click, 500)
    }
    index++
  }

  index = 0

  for (const collapse of collapses.reverse()) {
    if (skip.has(index)) {
      await DispatchEventWithDelay(collapse, userEvent.click, 500)
    }
    index++
  }
}
