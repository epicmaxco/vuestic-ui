<template>
  <div class="row">
    <div
      style="height: 200px;"
      ref="infiniteScrollTarget"
      class="flex flex-col md6 lg4"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncRef"
        :scroll-target="$refs.infiniteScrollTarget"
      >
        <div
          v-for="(record, index) in recordsRef"
          :key="index"
        >
          List item and some text #{{index}}
        </div>
      </va-infinite-scroll>
    </div>

    <va-divider vertical />

    <div
      style="height: 200px;"
      id="infinite-scroll-custom-target"
      class="flex flex-col md6 lg4"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncId"
        scroll-target="#infinite-scroll-custom-target"
      >
        <div
          v-for="(record, index) in recordsId"
          :key="index"
        >
          List item and some text #{{index}}
        </div>
      </va-infinite-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recordsRef: [{}, {}, {}, {}, {}, {}, {}],
      recordsId: [{}, {}, {}, {}, {}, {}, {}],
    }
  },
  methods: {
    async appendRecordsAsyncRef () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.recordsRef.push({}, {}, {}, {})
    },
    async appendRecordsAsyncId () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.recordsId.push({}, {}, {}, {})
    },
  },
}
</script>
