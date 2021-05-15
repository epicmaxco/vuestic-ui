<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="Default mode and single select"
      :options="options"
      v-model="value"
      allowCreate
    />
    <va-select
      class="mb-4"
      label="Unique mode and single select"
      :options="options"
      v-model="value"
      allowCreate="unique"
    />
    <va-select
      class="mb-4"
      label="Default mode and multi select"
      :options="options"
      v-model="valueMultiple"
      allowCreate
      multiple
    />
    <va-select
      label="Unique mode and multi select"
      class="mb-4"
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
