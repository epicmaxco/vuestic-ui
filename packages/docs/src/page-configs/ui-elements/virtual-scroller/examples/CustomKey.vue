<template>
  <va-virtual-scroller
    :items="hugeObjectsArray"
    style="height: 200px;"
    :bench="10"
    track-by="value"
    v-slot="{item}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item.value}`" />
  </va-virtual-scroller>
</template>

<script>
export default {
  data: () => {
    const hugeArrayBase = new Array(10000)
    const hugeObjectsArray = hugeArrayBase.fill(null).map((el, index) => ({ value: index }))
    return { hugeObjectsArray }
  },
}
</script>
