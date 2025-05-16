import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { within } from '@storybook/testing-library'
import { VaCarouselV2 } from './index'
import VaCarouselGroup from './components/VaCarouselGroup.vue'
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
  title: 'VaCarouselV2',
  component: VaCarouselV2,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2>
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectScrollInfiniteAutoScroll = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 autoscroll autoscroll-interval="100" :autoscroll-pause-duration="2000">
      <div v-for="item in items" :key="item" class="w-1/2">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectScrollFiniteAutoScroll = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 autoscroll autoscroll-interval="100" :autoscroll-pause-duration="2000" :infinite="false">
      <div v-for="item in items" :key="item" class="w-1/2">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectFadeInfiniteAutoScroll = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 autoscroll autoscroll-interval="100" :autoscroll-pause-duration="2000" effect="fade">
      <div v-for="item in items" :key="item" class="h-96 w-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectFadeFiniteAutoScroll = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 autoscroll autoscroll-interval="100" :autoscroll-pause-duration="2000" effect="fade" :infinite="false">
      <div v-for="item in items" :key="item" class="h-96 w-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectScrollFinite = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :infinite="false" effect="scroll">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectScrollInfinite = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :infinite="true" effect="scroll">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectScrollInfiniteWidth = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :infinite="true" effect="scroll">
      <div v-for="item in items" :key="item" class="h-96 w-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectFadeFinite = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :infinite="false" effect="fade">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const EffectFadeInfinite = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :infinite="true" effect="fade">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const PerPage = () => ({
  components: { VaCarouselV2: VaCarouselV2, VaCarouselGroup },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2>
      <VaCarouselGroup>
        <div v-for="item in items" :key="item" class="w-1/2">
          <img :src="item" draggable="false" />
        </div>
      </VaCarouselGroup>
    </VaCarouselV2>
  `,
})

export const PerPageEffectFade = () => ({
  components: { VaCarouselV2: VaCarouselV2, VaCarouselGroup },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 effect="fade">
      <VaCarouselGroup>
        <div v-for="item in items" :key="item" class="w-1/2">
          <img :src="item" draggable="false" />
        </div>
      </VaCarouselGroup>
    </VaCarouselV2>
  `,
})

export const PerPageEffectNone = () => ({
  components: { VaCarouselV2: VaCarouselV2, VaCarouselGroup },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 effect="none">
      <VaCarouselGroup>
        <div v-for="item in items" :key="item" class="w-1/2">
          <img :src="item" draggable="false" />
        </div>
      </VaCarouselGroup>
    </VaCarouselV2>
  `,
})

export const HiddenIndicators = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :indicators="false">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})

export const HiddenArrows = () => ({
  components: { VaCarouselV2: VaCarouselV2 },
  data: () => ({ items: getItems(), current: 0 }),
  template: `
    <VaCarouselV2 :arrows="false">
      <div v-for="item in items" :key="item" class="h-96">
        <img :src="item" draggable="false" />
      </div>
    </VaCarouselV2>
  `,
})
