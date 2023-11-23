<template>
  <VaButton
    class="mb-2"
    @click="disabled = !disabled"
  >
    {{ disabled ? "Enable" : "Disable" }}
  </VaButton>

  <div class="row">
    <div
      class="flex flex-col md6 lg4 h-48"
    >
      <VaInfiniteScroll
        :load="appendRecordsAsync"
        :disabled="disabled"
      >
        <div
          v-for="(record, index) in records"
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
      records: [{}, {}, {}, {}, {}, {}],
      disabled: false,
    };
  },
  methods: {
    async appendRecordsAsync() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.records.push({}, {}, {});
    },
  },
};
</script>
