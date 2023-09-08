import { defineComponent } from 'vue'
import { VaVirtualScroller } from './'
import { VaBadge } from '../va-badge'
import { VaButton } from '../va-button'

export default {
  title: 'VaVirtualScroller',
  component: VaVirtualScroller,
  tags: ['autodocs'],
}

const hugeArrayBase = new Array(1000)
const hugeArray = hugeArrayBase.fill(null).map((_, index) => index)
const hugeObjectsArray = hugeArrayBase.fill(null).map((el, index) => ({ value: index }))

export const Default = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      :wrapper-size="200"
      v-slot="{item}"
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const Disabled = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeSlice: hugeArray.slice(0, 1000) }),
  template: `
    <va-virtual-scroller
      :items="hugeSlice"
      :wrapper-size="200"
      v-slot="{item}"
      disabled
    >
      <div>{{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const Horizontal = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      horizontal
      :bench="10"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div class="whitespace-nowrap">{{ index }} - {{ item }} |&nbsp;</div>
    </va-virtual-scroller>
  `,
})

export const AutoWrapperSize = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <div style="height: 200px;">
      <va-virtual-scroller
        :items="hugeArray"
        wrapper-size="auto"
        v-slot="{item}"
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </div>
  `,
})

export const WithoutBench = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <va-virtual-scroller
      :items="hugeArray"
      :bench="0"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div>{{ index }} - {{ item }}</div>
    </va-virtual-scroller>
  `,
})

export const CustomKey = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeObjectsArray }),
  template: `
    <va-virtual-scroller
      :items="hugeObjectsArray"
      :bench="10"
      track-by="value"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div>{{ index }} - {{ item.value }}</div>
    </va-virtual-scroller>
  `,
})

export const LoopingComponent = () => ({
  components: { VaVirtualScroller, VaBadge },
  data: () => ({ hugeObjectsArray }),
  template: `
    <va-virtual-scroller
      :items="hugeObjectsArray"
      :bench="20"
      track-by="value"
      :wrapper-size="200"
      v-slot="{item}"
    >
      <va-badge :text="\`item \${item.value}\`" color="success" />
    </va-virtual-scroller>
  `,
})

export const DifferentSizesAndMargins = () => ({
  components: { VaVirtualScroller, VaButton },
  data: () => ({ hugeObjectsArray }),
  template: `
    <va-virtual-scroller
      :items="hugeObjectsArray"
      :bench="20"
      track-by="value"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div :class="index % 2 ? 'pb-1' : 'pb-6'">
        <va-button :size="index % 2 ? 'small' : 'medium'">{{ item.value }}</va-button>
      </div>
    </va-virtual-scroller>
  `,
})

export const RemWrapperAndItemSizeValue = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
  <va-virtual-scroller
    :items="hugeArray"
    item-size="2rem"
    wrapper-size="10rem"
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
