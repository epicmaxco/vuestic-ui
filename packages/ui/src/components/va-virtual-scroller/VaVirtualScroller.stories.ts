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

Disabled.play = async ({ canvasElement, step }) => {
  const scroller = document.querySelector('.va-virtual-scroller') as HTMLElement
  const canvas = within(canvasElement)
  const list = canvas.getByRole('list')

  await step('wrapper height is 200px', async () => {
    expect(scroller.style.height).toEqual('200px')
  })

  await step('disabled scroller loads all items', async () => {
    expect(list.children.length).toBe(1000)
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

  await step('the width of wrapper of horizontal scroller is set to wrapper-size', async () => {
    expect(scroller.style.width).toEqual('200px')
  })
}

export const AutoWrapperSize = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <div class="container" style="height: 200px;">
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
  const container = document.querySelector('.container') as HTMLElement

  await step('wrapper size equals the size of the container div', async () => {
    expect(scroller.style.height).toEqual(container.style.height)
  })
}

export const Bench = () => ({
  components: { VaVirtualScroller },
  data: () => ({ hugeArray }),
  template: `
    <p>[bench = 0]</p>
    <va-virtual-scroller
      :items="hugeArray"
      :bench="0"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div>{{ index }} - {{ item }}</div>
    </va-virtual-scroller>
    <p>[bench = 20]</p>
    <va-virtual-scroller
      :items="hugeArray"
      :bench="20"
      :wrapper-size="200"
      v-slot="{item, index}"
    >
      <div>{{ index }} - {{ item }}</div>
    </va-virtual-scroller>
  `,
})

Bench.play = async ({ canvasElement, step }) => {
  const scrollers = document.querySelectorAll('.va-virtual-scroller')
  const canvas = within(canvasElement)
  const lists = canvas.getAllByRole('list')

  await step('wrapper height is 200px', async () => {
    expect((scrollers[0] as HTMLElement).style.height).toEqual('200px')
    expect((scrollers[1] as HTMLElement).style.height).toEqual('200px')
  })

  await step('the virtual scroller that has 20 bench is 40 items larger than no bench virual scroller', async () => {
    expect(lists[1].children.length - lists[0].children.length).toBe(40)
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
