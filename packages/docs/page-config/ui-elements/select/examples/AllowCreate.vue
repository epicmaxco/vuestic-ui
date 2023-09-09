<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <va-select
      v-model="value"
      label="'true' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create
      placeholder="Select an option"
      @create-new="addNewOption"
    />
    <va-select
      v-model="allowUniqueValue"
      label="'unique' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create="unique"
      placeholder="Select an option"
      @create-new="addNewOption"
    />
    <va-select
      v-model="valueMultiple"
      label="'true' mode and multi select"
      :options="options"
      :track-by="(option) => option.id"
      placeholder="Select an option"
      allow-create
      multiple
      @create-new="addNewOption"
    />
    <va-select
      v-model="allowUniqueValueMultiple"
      label="'unique' mode and multi select"
      :options="options"
      :track-by="(option) => option.id"
      placeholder="Select an option"
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
