import { VaAccordion } from './'
import { VaCollapse } from '../va-collapse'
import { StoryFn } from '@storybook/vue3'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaAccordion',
  component: VaAccordion,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [] }),
  template: `
    <va-accordion v-model="value">
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

  await step('Closes on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
  })

  await step('Opening another, closes previous', async () => {
    userEvent.click(collapses[0])
    await sleep()
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'true')
  })
}

export const Stateful: StoryFn = () => ({
  components: { VaAccordion, VaCollapse },
  template: `
    <p>[true] - should open</p>
    <va-accordion>
      <va-collapse header="Collapse">
        Content
      </va-collapse>
    </va-accordion>
    <p>[false] - should not open</p>
    <va-accordion :stateful="false">
      <va-collapse header="Collapse">
        Content
      </va-collapse>
    </va-accordion>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]

  await step('Should open on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'true')
  })

  await step('Shouldn\'t open on click', async () => {
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'false')
  })
}

export const DirectCollapseValue: StoryFn = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [], directValue: true }),
  template: `
    <p>
      [accordion value]: <span data-testid="accordionValue">{{ value }}</span>
    </p>
    <p>
      [collapse value]: <span data-testid="collapseValue">{{ directValue }}</span>
    </p>
    <va-accordion v-model="value">
      <va-collapse
        header="Accordion value"
      >
        Content
      </va-collapse>
      <va-collapse
        header="Direct value"
        v-model="directValue"
      >
        Content
      </va-collapse>
    </va-accordion>
  `,
})

DirectCollapseValue.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button') as HTMLElement[]
  const accordionValue = canvas.getByTestId('accordionValue')
  const collapseValue = canvas.getByTestId('collapseValue')

  await step('Second must be opened because direct value', async () => {
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'true')
    expect(accordionValue).toHaveTextContent('[ false, true ]')
  })

  await step('Should close on click', async () => {
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'false')
  })

  await step('Should open on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'true')
  })

  await step('Should close on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
  })
}

export const Multiple: StoryFn = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [] }),
  template: `
    <va-accordion v-model="value" multiple>
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

Multiple.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button', { name: 'Collapse' }) as HTMLElement[]

  await step('Opening another, doesn\'t close previous', async () => {
    userEvent.click(collapses[0])
    await sleep()
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'true')
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'true')
  })
}

export const vModel: StoryFn = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [true, false, true] }),
  template: `
    {{ value }}
    <va-accordion v-model="value" multiple>
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
vModel.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const collapses = canvas.getAllByRole('button') as HTMLElement[]

  await step('Should open on click', async () => {
    userEvent.click(collapses[0])
    await sleep()
    expect(collapses[0]).toHaveAttribute('aria-expanded', 'false')
  })

  await step('Should close on click', async () => {
    userEvent.click(collapses[1])
    await sleep()
    expect(collapses[1]).toHaveAttribute('aria-expanded', 'true')
  })
}

export const Inset = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [true, true, false, false, true] }),
  template: `
    [value]: {{ value }}
    <va-accordion
      v-model="value"
      inset
      multiple
    >
      <va-collapse
        v-for="i in 5"
        :key="i"
        header="Collapse"
      >
        Content
      </va-collapse>
    </va-accordion>
  `,
})

export const Popout = () => ({
  components: { VaAccordion, VaCollapse },
  data: () => ({ value: [true, true, false, false, true] }),
  template: `
    [value]: {{ value }}
    <va-accordion
      v-model="value"
      popout
      multiple
    >
      <va-collapse
        v-for="i in 5"
        :key="i"
        header="Collapse"
      >
        Content
      </va-collapse>
    </va-accordion>
  `,
})
