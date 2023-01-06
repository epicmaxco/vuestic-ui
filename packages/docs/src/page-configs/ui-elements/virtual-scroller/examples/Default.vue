<template>
  <va-virtual-scroller
    :items="hugeArray"
    :wrapper-size="200"
    v-slot="{item, index}"
  >
    <va-badge class="pb-2" color="textPrimary" :text="`item ${item} with index ${index}`" />
  </va-virtual-scroller>
</template>

<script>
export default {
  data: () => {
    const hugeArray = new Array(1000).fill(null).map((_, index) => index + 1)
    return { hugeArray }
  },
}
</script>
