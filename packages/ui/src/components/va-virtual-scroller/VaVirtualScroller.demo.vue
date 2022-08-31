<template>
  <VbDemo class="va-virtual-scroller-demo">
    <VbCard title="default">
      <va-virtual-scroller
        :items="hugeArray"
        :bench="10"
        :item-size="24"
        style="height: 200px;"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="horizontal">
      <va-virtual-scroller
        :items="hugeArray"
        horizontal
        :bench="10"
        :item-size="24"
        style="width: 200px;"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item }} |&nbsp;</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="without bench (less nodes less smooth)">
      <va-virtual-scroller
        :items="hugeArray"
        :bench="0"
        :item-size="24"
        style="height: 200px;"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="custom key">
      <va-virtual-scroller
        :items="hugeObjectsArray"
        :bench="10"
        :item-size="24"
        custom-key="value"
        style="height: 200px;"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item.value }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="looping component">
      <va-virtual-scroller
        :items="hugeObjectsArray"
        :bench="20"
        :item-size="18"
        custom-key="value"
        style="height: 200px;"
        v-slot="{item}"
      >
        <va-badge :text="`item ${item.value}`" color="success" />
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="different sizes & margins">
      <va-virtual-scroller
        :items="hugeObjectsArray"
        :bench="20"
        :item-size="24"
        custom-key="value"
        style="height: 200px;"
        v-slot="{item, index}"
      >
        <div :class="index % 2 ? 'pb-1' : 'pb-5'">
          <va-button :size="index % 2 ? 'small' : 'large'">{{ item.value }}</va-button>
        </div>
      </va-virtual-scroller>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaVirtualScroller } from './'
import { VaBadge, VaButton } from '@/components'

export default {
  components: {
    VaBadge,
    VaButton,
    VaVirtualScroller,
  },

  data: () => {
    const hugeArrayBase = new Array(10000)
    const hugeArray = hugeArrayBase.fill(null).map((_, index) => index)
    const hugeObjectsArray = hugeArrayBase.fill(null).map((el, index) => ({ value: index }))
    return { hugeArray, hugeObjectsArray }
  },
}
</script>

<style lang="scss">
.va-virtual-scroller-demo {}
</style>
