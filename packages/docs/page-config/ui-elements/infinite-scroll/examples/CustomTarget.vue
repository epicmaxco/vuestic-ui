<template>
  <div class="row">
    <div
      ref="infiniteScrollTarget"
      class="flex flex-col md6 lg4 h-48"
    >
      <VaInfiniteScroll
        :load="appendRecordsAsyncRef"
        :scroll-target="$refs.infiniteScrollTarget"
      >
        <div
          v-for="(record, index) in recordsRef"
          :key="index"
        >
          List item and some text #{{ index }}
        </div>
      </VaInfiniteScroll>
    </div>

    <VaDivider vertical />

    <div
      id="infinite-scroll-custom-target"
      class="flex flex-col md6 lg4 h-[200px]"
    >
      <VaInfiniteScroll
        :load="appendRecordsAsyncId"
        scroll-target="#infinite-scroll-custom-target"
      >
        <div
          v-for="(record, index) in recordsId"
          :key="index"
        >
          List item and some text #{{ index }}
        </div>
      </VaInfiniteScroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordsRef: [{}, {}, {}, {}, {}, {}, {}],
      recordsId: [{}, {}, {}, {}, {}, {}, {}],
    };
  },
  methods: {
    async appendRecordsAsyncRef() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.recordsRef.push({}, {}, {}, {});
    },
    async appendRecordsAsyncId() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.recordsId.push({}, {}, {}, {});
    },
  },
};
</script>
