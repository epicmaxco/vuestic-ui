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
          {{ index }} - {{ item }}
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
        {{ index }} - {{ item }} |&nbsp;
      </va-virtual-scroller>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaVirtualScroller } from './'

export default {
  components: {
    VaVirtualScroller,
  },

  data: () => {
    const hugeArray = new Array(10000).fill(null).map((_, index) => index)
    return { hugeArray }
  },
}
</script>

<style lang="scss">
.va-virtual-scroller-demo {}
</style>
