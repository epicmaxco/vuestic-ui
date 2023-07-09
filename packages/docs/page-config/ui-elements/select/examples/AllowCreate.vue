<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      class="mb-6"
      label="'true' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create
      @create-new="addNewOption"
    />
    <va-select
      v-model="allowUniqueValue"
      class="mb-6"
      label="'unique' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create="unique"
      @create-new="addNewOption"
    />
    <va-select
      v-model="valueMultiple"
      class="mb-6"
      label="'true' mode and multi select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create
      multiple
      @create-new="addNewOption"
    />
    <va-select
      v-model="allowUniqueValueMultiple"
      label="'unique' mode and multi select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create="unique"
      multiple
      @create-new="addNewOption"
    />
  </div>
</template>

<script>
export default {
  name: "AllowCreate",
  data() {
    return {
      options: [
        { id: "0", text: "one", value: "one" },
        { id: "1", text: "two", value: "two" },
        { id: "2", text: "three", value: "three" },
        { id: "3", text: "four", value: "four" },
        { id: "4", text: "five", value: "five" },
      ],
      value: "",
      allowUniqueValue: "",
      valueMultiple: [],
      allowUniqueValueMultiple: [],
    };
  },
  methods: {
    addNewOption(newOption) {
      const option = {
        id: String(this.options.length),
        text: newOption,
        value: newOption,
      };
      this.options = [...this.options, option];
    },
  },
};
</script>
