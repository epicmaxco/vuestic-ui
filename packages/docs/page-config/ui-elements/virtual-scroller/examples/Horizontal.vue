<template>
  <VaVirtualScroller
    v-slot="{ item }"
    :items="hugeArray"
    :wrapper-size="600"
    horizontal
  >
    <VaBadge
      class="pr-2"
      color="textPrimary"
      :text="`item ${item}`"
    />
  </VaVirtualScroller>
</template>

<script>
export default {
  data: () => {
    const hugeArray = new Array(1000).fill(null).map((_, index) => index + 1);
    return { hugeArray };
  },
};
</script>
