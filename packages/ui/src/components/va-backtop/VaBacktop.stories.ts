import { VaBacktop } from './'
import { VaRadio } from '../va-radio'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaBacktop',
  component: VaBacktop,
}

const getBacktop = () => document.querySelector<HTMLElement>('.va-backtop')!
const scroll = async () => {
  window.scrollTo({ top: 400 })
  await sleep()
}

export const Default: StoryFn = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    <va-backtop/>
  `,
})

Default.play = async ({ canvasElement, step }) => {
  let backtop

  await step('Is hidden initially', async () => {
    backtop = getBacktop()
    expect(backtop).toBeNull()
  })

  await step('Appears on scroll', async () => {
    await scroll()
    backtop = getBacktop()
    expect(backtop).not.toBeNull()
  })

  await step('Hides again on click', async () => {
    backtop = getBacktop()
    backtop.click()
    await sleep(600) // smooth scroll so we have to wait a bit
    backtop = getBacktop()
    expect(backtop).toBeNull()
  })

  scroll()
}

export const Color = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    <va-backtop color="warning"/>
  `,
})
Color.play = async () => {
  scroll()
}

export const Offset = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    <va-backtop
      horizontalOffset="4rem"
      verticalOffset="4rem"
    />
  `,
})
Offset.play = async () => {
  scroll()
}

export const Position: StoryFn = () => ({
  components: { VaBacktop, VaRadio },
  data: () => {
    const OPTIONS_X = ['left', 'right']
    const OPTIONS_Y = ['top', 'bottom']
    return {
      optionsY: OPTIONS_Y,
      valueY: OPTIONS_Y[1],
      optionsX: OPTIONS_X,
      valueX: OPTIONS_X[1],
    }
  },
  template: `
    <p class="m-1">{{ $vb.lorem(2000) }}</p>
    <div data-testid="controls">
    [Horizontal Position]
    <va-radio v-model="valueY" :options="optionsY"/>
    [Vertical Position]
    <va-radio v-model="valueX" :options="optionsX"/>
    </div>
    <p class="m-1">{{ $vb.lorem(8000) }}</p>
    <va-backtop
      :horizontalPosition="valueX"
      :verticalPosition="valueY"
    />
  `,
})
Position.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  canvas.getByTestId('controls').scrollIntoView()
}

export const ClickEvent: StoryFn = () => ({
  components: { VaBacktop },
  data: () => ({ clicked: false }),
  template: `
    <p>clicked: <span data-testid="clicked">{{ clicked }}</span></p>
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    <va-backtop @click="this.clicked = true"/>
  `,
})
ClickEvent.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const clicked = canvas.getByTestId('clicked')
  await scroll()

  await step('Click triggered', async () => {
    getBacktop()?.click()
    await sleep()
    expect(clicked.innerText).toBe('true')
  })
}

export const Target: StoryFn = () => ({
  components: { VaBacktop },
  template: `
    [not the target]
    <div data-testid="non-target" class="h-48 overflow-y-auto">
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    </div>
    [the target]
    <div id="target" data-testid="target" class="h-48 overflow-y-auto">
    <p class="m-1">{{ $vb.lorem(10000) }}</p>
    </div>
    <va-backtop target="#target"/>
  `,
})

Target.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const nonTarget = canvas.getByTestId('non-target')
  const target = canvas.getByTestId('target')

  await step('Scrolling non target doesn\'t shows backtop', async () => {
    // We try to scroll both body and another div
    nonTarget.scrollTo({ top: 400 })
    await scroll()
    expect(getBacktop()).toBeNull()
  })

  await step('Scrolling target shows backtop', async () => {
    target.scrollTo({ top: 400 })
    await sleep(400)
    expect(getBacktop()).not.toBeNull()
  })
}
