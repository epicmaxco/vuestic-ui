<template>
  <va-virtual-scroller
    v-slot="{ item }"
    :items="hugeObjectsArray"
    :wrapper-size="200"
    :bench="10"
    :item-size="30"
  >
    <va-badge
      class="pb-2"
      color="textPrimary"
      :text="`item ${item.value}`"
    />
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
