import { VaAccordion } from './'
import { VaCollapse } from '../va-collapse'
import { within, userEvent } from '@storybook/testing-library'
import { sleep } from '../../utils/sleep'

async function DispatchEventWithDelay (element: HTMLElement, callback: (element: HTMLElement) => void, ms: number) {
  await callback(element)
  await sleep(ms)
}

export default {
  title: 'VaAccordion',
  component: VaAccordion,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      modelValue: [false, false, false],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="modelValue">
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

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = await canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
  const [lastCollapse] = collapses.slice(-1)
  collapses.push(lastCollapse)

  for (const collapse of collapses) {
    await DispatchEventWithDelay(collapse, userEvent.click, 500)
  }
}

export const Stateful = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion stateful>
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

Stateful.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const collapses = await canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
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
  const collapses = await canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
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
  const collapses = await canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
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
  const collapses = await canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]
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
