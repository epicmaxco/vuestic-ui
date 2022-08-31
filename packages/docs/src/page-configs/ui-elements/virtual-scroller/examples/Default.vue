<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="height: 200px;"
    v-slot="{item, index}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item} with index ${index}`" />
  </va-virtual-scroller>
</template>

<script>
const hugeArrayBase = new Array(10000)
export const hugeArray = hugeArrayBase.fill(null).map((_, index) => index + 1)
export const hugeObjectsArray = hugeArrayBase.fill(null).map((el, index) => ({ value: index }))

export default {
  data: () => {
    return { hugeArray }
  },
}
</script>
