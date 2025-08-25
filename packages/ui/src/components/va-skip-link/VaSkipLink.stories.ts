import { within } from '@storybook/testing-library'
import { VaRadio } from '../va-radio'
import { VaSkipLink } from './'
import { expect } from '@storybook/jest'

export default {
  title: 'VaSkipLink',
  component: VaSkipLink,
}

export const Default = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link target="#target">
      [skip link]
    </va-skip-link>
    <div :style="{ height: '100dvh' }">
      [not target]
    </div>
    <div 
      id="target" 
      :style="{ height: '100dvh' }"
    >
      [target]
    </div>
  `,
})

const OPTIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

export const Position = () => ({
  components: { VaSkipLink, VaRadio },
  data: () => ({ options: OPTIONS, value: OPTIONS[3] }),
  template: `
    <va-skip-link 
      target="#target"
      :position="value"
    >
      [{{ value }}]
    </va-skip-link>
    <va-radio v-model="value" :options="options"/>
  `,
})

Position.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const skipLink = canvas.getByRole('link', { name: '[bottom-right]' }) as HTMLElement

  await step('Visible on focus', async () => {
    skipLink.focus()
    expect(skipLink.style.opacity).not.toEqual(0)
  })
}