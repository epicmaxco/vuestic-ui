<template>
  <va-virtual-scroller
    v-slot="{ item }"
    :items="hugeArray"
    :wrapper-size="400"
    :bench="10"
  >
    <div class="row">
      <div class="flex flex-col md6 lg4">
        <va-card>
          <va-image
            src="https://picsum.photos/400/200"
            class="h-[200px]"
          />
          <va-card-title>{{ item }}</va-card-title>
          <va-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </va-card-content>
        </va-card>
      </div>
    </div>
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
