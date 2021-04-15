<template>
  <div>
    <va-button
      class="mb-2"
      @click="disabled = !disabled"
    >{{ disabled ? 'Enable' : 'Disable' }}</va-button>
    <div class="row">
      <div
        style="height: 200px;"
        class="flex md6 lg4"
      >
        <va-infinite-scroll
          :load="appendRecordsAsync"
          :disabled="disabled"
        >
          <div
            v-for="(record, index) in records"
            :key="index"
          >
            List item and some text #{{index}}
          </div>
        </va-infinite-scroll>
      </div>
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
