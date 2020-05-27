<template>
  <div>
    <div
      style="height: 350px;"
      ref="scrollTarget"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncRef"
        :scroll-target="$refs.scrollTarget"
      >
        <div
          v-for="(record, index) in recordsRef"
          :key="index"
        >
          <va-badge :text="index + 1"/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </div>
      </va-infinite-scroll>
    </div>

    <va-separator />

    <div
      style="height: 350px;"
      id="target"
    >
      <va-infinite-scroll
        :load="appendRecordsAsyncId"
        scroll-target="#target"
      >
        <div
          v-for="(record, index) in recordsId"
          :key="index"
        >
          <va-badge :text="index + 1"/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
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
