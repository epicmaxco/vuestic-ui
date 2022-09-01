<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="width: 600px;"
    horizontal
    v-slot="{item}"
  >
    <va-badge class="pr-2" color="success" :text="`item ${item}`" />
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
