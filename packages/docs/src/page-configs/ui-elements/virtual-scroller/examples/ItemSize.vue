<template>
  <va-virtual-scroller
    :items="hugeObjectsArray"
    style="height: 200px;"
    :bench="10"
    :item-size="30"
    v-slot="{item}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item.value}`" />
  </va-virtual-scroller>
</template>

<script>
export default {
  data: () => {
    const hugeObjectsArray = new Array(10000).fill(null).map((el, index) => ({ value: index }))
    return { hugeObjectsArray }
  },
}
</script>
