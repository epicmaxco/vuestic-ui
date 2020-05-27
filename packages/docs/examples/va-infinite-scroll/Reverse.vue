<template>
  <div
    style="height: 350px;"
  >
    <va-infinite-scroll
      :load="appendRecordsAsync"
      reverse
    >
      <div
        v-for="(record, index) in records"
        :key="index"
      >
        <va-badge :text="index + 1"/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </div>
    </va-infinite-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      records: [{}, {}, {}, {}, {}, {}],
    }
  },
  methods: {
    async appendRecordsAsync () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.records.push({}, {}, {})
    },
  },
}
</script>
