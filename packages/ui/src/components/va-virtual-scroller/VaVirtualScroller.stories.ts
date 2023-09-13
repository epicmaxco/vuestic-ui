import { defineComponent } from 'vue'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { VaVirtualScroller } from './'
import { VaBadge } from '../va-badge'
import { VaButton } from '../va-button'

export default {
  title: 'VaVirtualScroller',
  component: VaVirtualScroller,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const Disabled = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      v-slot="{item}"
      disabled
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const Horizontal = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      horizontal
      v-slot="{item, index}"
    >
      <div class="whitespace-nowrap">{{ index }} - {{ item }} |&nbsp;</div>
    </va-virtual-scroller>
  `,
})

export const Bench = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    [bench = 0]
    <va-virtual-scroller
      :items="hugeArray"
      :bench="0"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [bench = 20]
    <va-virtual-scroller
      :items="hugeArray"
      :bench="20"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const DifferentSizesAndMargins = () => ({
  components: { VaVirtualScroller, VaButton },
  data: () => ({ hugeObjectsArray: new Array(1000).fill(null).map((el, index) => ({ value: index })) }),
  template: `
    <va-virtual-scroller
      :items="hugeObjectsArray"
      track-by="value"
      v-slot="{item, index}"
    >
      <div :class="index % 2 ? 'pb-1' : 'pb-6'">
        <va-button :size="index % 2 ? 'small' : 'medium'">{{ item.value }}</va-button>
      </div>
    </va-virtual-scroller>
  `,
})

export const WrapperSize = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    [default]
    <va-virtual-scroller
      :items="hugeArray"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [auto]
    <div class="container" style="height: 200px;">
      <va-virtual-scroller
        :items="hugeArray"
        wrapper-size="auto"
        v-slot="{item}"
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </div>
    [200px]
    <va-virtual-scroller
      :items="hugeArray"
      wrapper-size="200px"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [10rem]
    <va-virtual-scroller
      :items="hugeArray"
      wrapper-size="10rem"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const ItemSize = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray: new Array(1000).fill(null).map((_, index) => index) }),
  template: `
    [default]
    <va-virtual-scroller
      :items="hugeArray"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [20]
    <va-virtual-scroller
      :items="hugeArray"
      item-size="20"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [16px]
    <va-virtual-scroller
      :items="hugeArray"
      item-size="16px"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
    [2rem]
    <va-virtual-scroller
      :items="hugeArray"
      item-size="2rem"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const NoItemsPassed = () => ({
  components: { VaVirtualScroller },
  template: `
    <va-virtual-scroller
      :wrapper-size="200"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})
