import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { within } from '@storybook/testing-library'
import { VaCarousel } from '../va-carousel'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'
import { StoryFn } from '@storybook/vue3'

const getItems = () => [
  'https://picsum.photos/id/10/2500',
  'https://picsum.photos/id/14/2500',
  'https://picsum.photos/id/18/2500',
]

export default {
  title: 'VaCarousel',
  component: VaCarousel,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarousel :items="items" />
  `,
})

export const Vertical = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    <VaCarousel :items="items" vertical />
  `,
})

export const ZeroOneTwoSlides: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [zero]
    <VaCarousel :items="[]" infinite />
    [one]
    <VaCarousel :items="['https://picsum.photos/id/10/2500']" infinite />
    [two]
    <VaCarousel :items="['https://picsum.photos/id/10/2500', 'https://picsum.photos/id/14/2500']" infinite />
  `,
})

addText(
  ZeroOneTwoSlides,
  'Need to fix the case when there are 0 slides and disable the arrows when there is less than 2 slides.',
  'stale',
)

ZeroOneTwoSlides.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const NavigatesOnArrowClick = canvas.getAllByRole('button', { name: 'go next slide' }) as HTMLElement[]

  await step('Disabled arrows when less than 2 slides', async () => {
    expect(NavigatesOnArrowClick[1]).toBeUndefined()
  })
}

export const Swipe = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [true]
    <VaCarousel :items="items" swipable />
    [false]
    <VaCarousel :items="items" />
  `,
})

export const Arrows: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    [true]
    <VaCarousel :items="items" :indicators="false"/>
    [false]
    <VaCarousel :items="items" :indicators="false" :arrows="false"/>
  `,
})

Arrows.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const slides = document.querySelectorAll('div.va-carousel__slide')
  const NavigatesOnArrowClick = canvas.getByRole('button', { name: 'go next slide' }) as HTMLElement

  await step('Change slide on arrow click', async () => {
    await userEvent.click(NavigatesOnArrowClick)
    expect(slides[1].getAttribute('aria-current')).toEqual('true')
  })
}

export const Indicators: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [true]
    <VaCarousel :items="items" :arrows="false"/>
    [false]
    <VaCarousel :items="items" :arrows="false" :indicators="false"/>
  `,
})

Indicators.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const slides = document.querySelectorAll('div.va-carousel__slide')
  const NavigatesOnPageClick = canvas.getByRole('button', { name: 'go slide 2' }) as HTMLElement

  await step('Change slide on indicator click', async () => {
    await userEvent.click(NavigatesOnPageClick)
    expect(slides[1].getAttribute('aria-current')).toEqual('true')
  })
}

export const IndicatorsTrigger: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [hover]
    <VaCarousel :items="items" :arrows="false" indicator-trigger="hover"/>
    [none]
    <VaCarousel :items="items" :arrows="false" indicator-trigger="none"/>
    [click]
    <VaCarousel :items="items" :arrows="false" indicator-trigger="click"/>
  `,
})

addText(
  IndicatorsTrigger,
  'indicator-trigger="none" is not implemented.',
  'stale',
)

IndicatorsTrigger.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const slides = document.querySelectorAll('div.va-carousel__slide')
  const NavigatesOnPageClick = canvas.getAllByRole('button', { name: 'go slide 2' }) as HTMLElement[]

  await step('Change slide on indicator hover', async () => {
    await userEvent.hover(NavigatesOnPageClick[0])
    await userEvent.unhover(NavigatesOnPageClick[0])
    expect(slides[1].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should do nothing on interaction', async () => {
    await userEvent.hover(NavigatesOnPageClick[1])
    await userEvent.unhover(NavigatesOnPageClick[1])
    expect(slides[4].getAttribute('aria-current')).toEqual('true')
    await userEvent.click(NavigatesOnPageClick[1])
    expect(slides[4].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should do nothing on hover', async () => {
    await userEvent.hover(NavigatesOnPageClick[2])
    await userEvent.unhover(NavigatesOnPageClick[2])
    expect(slides[8].getAttribute('aria-current')).toEqual('true')
  })
}

export const Infinite: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [true]
    <VaCarousel :items="items" />
    [false]
    <VaCarousel :items="items" :infinite="false"/>
  `,
})

Infinite.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const slides = document.querySelectorAll('div.va-carousel__slide')
  const NavigatesOnArrowClick = canvas.getAllByRole('button', { name: 'go previous slide' }) as HTMLElement[]

  await step('Change slide from last to first on click', async () => {
    await userEvent.click(NavigatesOnArrowClick[0])
    expect(slides[2].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should have left arrow disabled', async () => {
    expect(NavigatesOnArrowClick[1]).toBeUndefined()
  })
}

export const Stateful: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [true] - should slide
    <VaCarousel :items="items" />
    [false] - should not slide
    <VaCarousel :items="items" :stateful="false"/>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const slides = document.querySelectorAll('div.va-carousel__slide')
  const [statefulNavigatesOnPageClick, NavigatesOnPageClick] = canvas.getAllByRole('button', { name: 'go slide 2' }) as HTMLElement[]

  await step('Change slide on indicator click', async () => {
    await userEvent.click(statefulNavigatesOnPageClick)
    expect(slides[1].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should do nothing', async () => {
    await userEvent.click(NavigatesOnPageClick)
    expect(slides[4].getAttribute('aria-current')).toEqual('true')
  })
}

export const Autoscroll: StoryFn = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    <VaCarousel :items="items" autoscroll :autoscrollInterval="500"/>
  `,
})

Autoscroll.play = async ({ step }) => {
  const slides = document.querySelectorAll('div.va-carousel__slide')

  await step('Should change slides with no interaction', async () => {
    expect(slides[0].getAttribute('aria-current')).toEqual('true')
    await sleep(500)
    expect(slides[1].getAttribute('aria-current')).toEqual('true')
    await sleep(500)
    expect(slides[2].getAttribute('aria-current')).toEqual('true')
  })
}

export const Fade = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    [fade]
    <VaCarousel :items="items" effect="fade"/>
    [transition]
    <VaCarousel :items="items"/>
  `,
})

addText(
  Fade,
  'Fade effect does not work.',
  'stale',
)

export const Ratio = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    <VaCarousel :items="items" :ratio="1 / 1" />
  `,
})

export const Slots = () => ({
  components: { VaCarousel },
  data: () => ({ items: getItems() }),
  template: `
    <VaCarousel :items="items">
      <template #default="{ item }">
        <a :href="item" target="_blank">
          Open image in new tab 😏
        </a>
      </template>

      <template #prev-arrow>
        Go back!
      </template>

      <template #next-arrow>
        Go forward!
      </template>

      <template #indicator="{ index }">
        Go to ({{ index }})
      </template>
    </VaCarousel>
  `,
})
