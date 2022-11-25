<template>
  <va-virtual-scroller
    :items="hugeArray"
    :wrapper-size="600"
    horizontal
    v-slot="{item}"
  >
    <va-badge class="pr-2" color="textPrimary" :text="`item ${item}`" />
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
