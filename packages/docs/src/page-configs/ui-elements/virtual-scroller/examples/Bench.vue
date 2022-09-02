<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="height: 200px;"
    :bench="10"
    v-slot="{item}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item}`" />
  </va-virtual-scroller>
</template>

<script>
export default {
  data: () => {
    const hugeArray = new Array(10000).fill(null).map((_, index) => index + 1)
    return { hugeArray }
  },
}
</script>
