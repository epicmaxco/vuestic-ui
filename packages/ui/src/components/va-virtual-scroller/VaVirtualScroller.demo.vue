<template>
  <VbDemo>
    <VbCard title="default">
      <va-virtual-scroller
        :items="hugeArray"
        :wrapper-size="200"
        v-slot="{item}"
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="disabled">
      <!-- without slice there are freezes on the page -->
      <va-virtual-scroller
        :items="hugeArray.slice(0, 1000)"
        :wrapper-size="200"
        v-slot="{item}"
        disabled
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="horizontal">
      <va-virtual-scroller
        :items="hugeArray"
        horizontal
        :bench="10"
        :wrapper-size="200"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item }} |&nbsp;</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="without bench (less nodes less smooth)">
      <va-virtual-scroller
        :items="hugeArray"
        :bench="0"
        :wrapper-size="200"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="custom key">
      <va-virtual-scroller
        :items="hugeObjectsArray"
        :bench="10"
        track-by="value"
        :wrapper-size="200"
        v-slot="{item, index}"
      >
        <div>{{ index }} - {{ item.value }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="looping component">
      <va-virtual-scroller
        :items="hugeObjectsArray"
        :bench="20"
        track-by="value"
        :wrapper-size="200"
        v-slot="{item}"
      >
        <va-badge :text="`item ${item.value}`" color="success" />
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="different sizes & margins">
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
    </VbCard>
    <VbCard title="rem (same for px) wrapper & item size value">
      <va-virtual-scroller
        :items="hugeArray"
        item-size="2rem"
        wrapper-size="10rem"
        v-slot="{item}"
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
    <VbCard title="no items passed">
      <va-virtual-scroller
        :wrapper-size="200"
        v-slot="{item}"
      >
        <div>{{ item }}</div>
      </va-virtual-scroller>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import { VaBadge, VaButton } from '../'
import { VaVirtualScroller } from './'

const hugeArrayBase = new Array(10000)
const hugeArray = hugeArrayBase.fill(null).map((_, index) => index)
const hugeObjectsArray = hugeArrayBase.fill(null).map((el, index) => ({ value: index }))
</script>
