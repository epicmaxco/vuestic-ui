import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { within } from '@storybook/testing-library'
import { VaGroupCarousel } from './index'
import VaCarouselGroup from '../va-carousel/components/VaCarouselGroup.vue'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'
import { StoryFn } from '@storybook/vue3'

const getItems = () => [
  'https://picsum.photos/id/10/2500',
  'https://picsum.photos/id/14/2500',
  'https://picsum.photos/id/18/2500',
  'https://picsum.photos/id/12/2500',
  'https://picsum.photos/id/16/2500',
  'https://picsum.photos/id/19/2500',
]

export default {
  title: 'VaGroupCarousel',
  component: VaGroupCarousel,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaGroupCarousel },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaGroupCarousel>
      <div v-for="item in items" :key="item" class="w-1/3">
        <img :src="item" draggable="false" />
      </div>
    </VaGroupCarousel>
  `,
})

export const AutoScroll = () => ({
  components: { VaGroupCarousel },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaGroupCarousel autoscroll autoscroll-interval="500" :autoscroll-pause-duration="2000">
      <div v-for="item in items" :key="item" class="w-1/2">
        <img :src="item" draggable="false" />
      </div>
    </VaGroupCarousel>
  `,
})


export const PerPage = () => ({
  components: { VaGroupCarousel, VaCarouselGroup  },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaGroupCarousel>
      <VaCarouselGroup>
        <div v-for="item in items" :key="item" class="w-1/2">
          <img :src="item" draggable="false" />
        </div>
      </VaCarouselGroup>
    </VaGroupCarousel>
  `,
})

