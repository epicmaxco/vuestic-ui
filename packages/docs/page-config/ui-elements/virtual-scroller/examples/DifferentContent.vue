<template>
  <VaVirtualScroller
    v-slot="{ item }"
    :items="hugeArray"
    :wrapper-size="400"
    :bench="10"
  >
    <div class="row">
      <div class="flex flex-col md6 lg4">
        <VaCard>
          <VaImage
            src="https://picsum.photos/400/200"
            class="h-[200px]"
          />
          <VaCardTitle>{{ item }}</VaCardTitle>
          <VaCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </VaCardContent>
        </VaCard>
      </div>
    </div>
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
