<template>
  <va-virtual-scroller
    v-slot="{ item }"
    :items="hugeArray"
    :wrapper-size="200"
    :bench="10"
  >
    <va-badge
      class="pb-2"
      color="textPrimary"
      :text="`item ${item}`"
    />
  </va-virtual-scroller>
</template>

<script>
export default {
  data: () => {
    const hugeArray = new Array(1000).fill(null).map((_, index) => index + 1);
    return { hugeArray };
  },
};
</script>
