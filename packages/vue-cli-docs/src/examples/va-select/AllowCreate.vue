<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Default mode and single select"
      :options="options"
      v-model="value"
      allowCreate
    />
    <va-select
      style="margin: 16px 0;"
      label="Unique mode and single select"
      :options="options"
      v-model="value"
      allowCreate="unique"
    />
    <va-select
      style="margin: 16px 0;"
      label="Default mode and multi select"
      :options="options"
      v-model="valueMultiple"
      allowCreate
      multiple
    />
    <va-select
      label="Unique mode and multi select"
      style="margin: 16px 0;"
      :options="options"
      v-model="valueMultiple"
      allowCreate="unique"
      multiple
    />
  </div>
</template>

<script>
export default {
  name: 'AllowCreate',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: '',
      valueMultiple: [],
    }
  },
}
</script>
