<template>
  <div class="row">
    <div
      style="height: 200px;"
      ref="scrollTarget"
      class="flex md6 lg4"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncRef"
        :scroll-target="$refs.scrollTarget"
      >
        <div
          v-for="(record, index) in recordsRef"
          :key="index"
        >
          List item and some text #{{index}}
        </div>
      </va-infinite-scroll>
    </div>

    <va-separator/>

    <div
      style="height: 200px;"
      id="target"
      class="flex md6 lg4"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncId"
        scroll-target="#target"
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
      recordsRef: [{}, {}, {}, {}, {}, {}],
      recordsId: [{}, {}, {}, {}, {}, {}],
    }
  },
  methods: {
    async appendRecordsAsyncRef () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.recordsRef.push({}, {}, {})
    },
    async appendRecordsAsyncId () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.recordsId.push({}, {}, {})
    },
  },
}
</script>
