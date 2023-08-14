import { userEvent, within } from '@storybook/testing-library'
import { VaCarousel } from '../va-carousel'
import { VaSwitch } from '../va-switch'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

const carouselSetup = {
  data () {
    return {
      currentSlide: 0,
      areArrowsVisible: true,
      areIndicatorsVisible: true,
      triggerOnHover: true,
      items: [
        'https://picsum.photos/id/450/1500',
        'https://picsum.photos/id/450/1501',
        'https://picsum.photos/id/450/1502',
        'https://picsum.photos/id/450/1503',
        'https://picsum.photos/id/450/1504',
      ],
    }
  },
}

export default {
  title: 'VaCarousel',
  component: VaCarousel,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaCarousel },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide" />
  `,
})

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const carousel = document.querySelectorAll('div.va-carousel__slide')
  const slideTwo = canvas.getByRole('button', { name: 'go slide 2' }) as HTMLElement
  const goForward = canvas.getByRole('button', { name: 'go next slide' }) as HTMLElement

  await step('Should head to slide 2', async () => {
    userEvent.click(slideTwo)
    await sleep()
    expect(carousel[1].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should head to slide 3 by clicking on right arrow', async () => {
    userEvent.click(goForward)
    await sleep()
    expect(carousel[2].getAttribute('aria-current')).toEqual('true')
  })
}

export const Stateful = () => ({
  components: { VaCarousel },
  ...carouselSetup,
  template: `
    [true] - should slide
    <VaCarousel :items="items" stateful />
    [false] - should not slide
    <VaCarousel :items="items" />
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const carousel = document.querySelectorAll('div.va-carousel__slide')
  const [statefulslideTwo, slideTwo] = canvas.getAllByRole('button', { name: 'go slide 2' }) as HTMLElement[]

  await step('Should head to slide 2', async () => {
    userEvent.click(statefulslideTwo)
    await sleep()
    expect(carousel[1].getAttribute('aria-current')).toEqual('true')
  })

  await step('Should do nothing', async () => {
    userEvent.click(slideTwo)
    await sleep()
    expect(carousel[6].getAttribute('aria-current')).toEqual('false')
  })
}

export const Vertical = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide" vertical />
  `,
})

export const Arrows = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <va-switch
      v-model="areArrowsVisible"
      class="mb-6"
      label="Arrows"
      size="small"
    />
    <VaCarousel :items="items" v-model="currentSlide" :arrows="areArrowsVisible" />
  `,
})

export const Indicators = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <div class="space-x-2 mb-6">
      <va-switch
        v-model="areIndicatorsVisible"
        label="Indicators"
        size="small"
      />
      <va-switch
        v-model="triggerOnHover"
        label="Trigger on hover"
        size="small"
      />
    </div>
    <VaCarousel :items="items" v-model="currentSlide" :indicators="areIndicatorsVisible" :indicatorTrigger="triggerOnHover ? 'hover' : 'click'" />
  `,
})

export const Infinite = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide" infinite />
  `,
})

Infinite.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const carousel = document.querySelectorAll('div.va-carousel__slide')
  const slideFive = canvas.getByRole('button', { name: 'go slide 5' }) as HTMLElement
  const goForward = canvas.getByRole('button', { name: 'go next slide' }) as HTMLElement

  await step('Should head to slide 1 from slide 5', async () => {
    userEvent.click(slideFive)
    await sleep()
    userEvent.click(goForward)
    await sleep()
    expect(carousel[0].getAttribute('aria-current')).toEqual('true')
  })
}

export const Autoscroll = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    [default]
    <VaCarousel :items="items" stateful autoscroll />
    [infinite]
    <VaCarousel :items="items" stateful autoscroll infinite />
  `,
})

export const Fade = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide" effect="fade" />
  `,
})

export const Ratio = () => ({
  components: { VaCarousel, VaSwitch },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide" :ratio="16 / 9" />
  `,
})

export const Slots = () => ({
  components: { VaCarousel },
  ...carouselSetup,
  template: `
    <VaCarousel :items="items" v-model="currentSlide">
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
