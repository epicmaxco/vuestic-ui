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
export default {
  data: () => {
    const hugeArrayBase = new Array(10000)
    const hugeArray = hugeArrayBase.fill(null).map((_, index) => index + 1)
    return { hugeArray }
  },
}
</script>
