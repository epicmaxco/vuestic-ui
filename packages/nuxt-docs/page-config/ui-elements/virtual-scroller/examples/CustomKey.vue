<template>
  <va-virtual-scroller
    :items="hugeObjectsArray"
    :wrapper-size="200"
    :bench="10"
    track-by="value"
    v-slot="{ item }"
  >
    <va-badge class="pb-2" color="textPrimary" :text="`item ${item.value}`" />
  </va-virtual-scroller>
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
