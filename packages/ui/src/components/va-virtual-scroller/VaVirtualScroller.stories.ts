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

Default.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

Disabled.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

Horizontal.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper width is 200px', async () => {
    expect(scroller.style.width).toEqual('200px')
  })
}

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

AutoWrapperSize.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

WithoutBench.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

CustomKey.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

export const LoopingComponent = () => ({
  components: { VaVirtualScroller, VaBadge },
  data: () => ({ hugeObjectsArray }),
  template: `
    <va-virtual-scroller
      :items="hugeObjectsArray"
      :bench="20"
      track-by="value1"
      :wrapper-size="200"
      v-slot="{item}"
    >
      <va-badge :text="\`item \${item.value}\`" color="success" />
    </va-virtual-scroller>
  `,
})

LoopingComponent.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

DifferentSizesAndMargins.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const list = canvas.findByRole('list')
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })
}

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

RemWrapperAndItemSizeValue.play = async ({ step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement
  const container = document.querySelector('.va-virtual-scroller__container') as HTMLElement
  const rootElement = document.documentElement
  const rootElementStylePropertyMap = rootElement.computedStyleMap()
  const rootFontSize = rootElementStylePropertyMap.get('font-size') as CSSUnitValue

  await step('wrapper height is 10rem', async () => {
    expect(scroller.style.height).toEqual(rootFontSize.mul(10).toString())
  })

  await step('container size equals itemSize * items.length', async () => {
    expect(container.style.height).toEqual(rootFontSize.mul(2).mul(hugeArray.length).toString())
  })
}

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

NoItemsPassed.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const list = canvas.getByRole('list')

  await step('There is no item to show', async () => {
    expect(list.children.length).toBe(0)
  })
}
