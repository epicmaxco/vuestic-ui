<template>
  <va-button
    class="mb-2"
    @click="disabled = !disabled"
  >
    {{ disabled ? "Enable" : "Disable" }}
  </va-button>

  <div class="row">
    <div
      class="flex flex-col md6 lg4 h-48"
    >
      <va-infinite-scroll
        :load="appendRecordsAsync"
        :disabled="disabled"
      >
        <div
          v-for="(record, index) in records"
          :key="index"
        >
          List item and some text #{{ index }}
        </div>
      </va-infinite-scroll>
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
