<template>
  <VbDemo>
    <div class="scroll__container" ref="container">
      <VaInfiniteScroll
        :debounce="300"
        :offset="1"
        :scroll-target="container"
        :disabled="disabled"
        @load="increaseCount"
      >
        <ul>
          <li v-for="record in recordsCount" :key="record">Record #{{record}}</li>
        </ul>
        <slot v-if="loading" name="loading">Loading...</slot>
      </VaInfiniteScroll>
    </div>
  </VbDemo>
</template>

<script>
import VaInfiniteScroll from "./VaInfiniteScroll";

export default {
  components: {
    VaInfiniteScroll
  },
  data() {
    return {
      recordsCount: 15,
      loading: false
    };
  },
  methods: {
    increaseCount() {
      this.loading = true;
      setTimeout(() => {
        this.recordsCount += 10;
        this.loading = false;
      }, 2000);
    }
  },
  computed: {
    disabled() {
      return this.loading;
    }
  }
};
</script>
<style lang="scss">
.scroll__container {
  height: 300px;
  background: lightgray;
}
</style>
