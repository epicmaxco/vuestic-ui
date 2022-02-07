<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="'true' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      v-model="value"
      allowCreate
      @create-new="addNewOption"
    />
    <va-select
      class="mb-4"
      label="'unique' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      v-model="allowUniqueValue"
      allowCreate="unique"
      @create-new="addNewOption"
    />
    <va-select
      class="mb-4"
      label="'true' mode and multi select"
      :options="options"
      v-model="valueMultiple"
      :track-by="(option) => option.id"
      allowCreate
      multiple
      @create-new="addNewOption"
    />
    <va-select
      label="'unique' mode and multi select"
      class="mb-4"
      :options="options"
      :track-by="(option) => option.id"
      v-model="allowUniqueValueMultiple"
      allowCreate="unique"
      @create-new="addNewOption"
      multiple
    />
  </div>
</template>

<script>
export default {
  name: 'AllowCreate',
  data () {
    return {
      options: [
        { id: '0', text: 'one', value: 'one' },
        { id: '1', text: 'two', value: 'two' },
        { id: '2', text: 'three', value: 'three' },
        { id: '3', text: 'four', value: 'four' },
        { id: '4', text: 'five', value: 'five' },
      ],
      value: '',
      allowUniqueValue: '',
      valueMultiple: [],
      allowUniqueValueMultiple: [],
    }
  },
  methods: {
    addNewOption (newOption) {
      const option = { id: String(this.options.length), text: newOption, value: newOption }
      this.options = [...this.options, option]
    },
  },
}
</script>
