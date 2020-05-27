<template>
  <div>
    <va-button @click="disabled = !disabled">{{ disabled ? 'Enable' : 'Disable' }}</va-button>
    <div
      style="height: 350px;"
    >
      <va-infinite-scroll
        :load="appendRecordsAsync"
        :disabled="disabled"
      >
        <div
          v-for="(record, index) in records"
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
      records: [{}, {}, {}, {}, {}, {}],
      disabled: false,
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
