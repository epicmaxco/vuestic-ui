<template>
  <VaVirtualScroller
    v-slot="{ item }"
    :items="hugeObjectsArray"
    :wrapper-size="200"
    :bench="10"
    :item-size="30"
  >
    <VaBadge
      class="pb-2"
      color="textPrimary"
      :text="`item ${item.value}`"
    />
  </VaVirtualScroller>
</template>

<script>
export default {
  data: () => {
    const hugeObjectsArray = new Array(1000)
      .fill(null)
      .map((el, index) => ({ value: index }));
    return { hugeObjectsArray };
  },
};
</script>
