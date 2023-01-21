<template>
  <div style="max-width: 300px;">
    <va-select
      label="Exactly 2 options should be selected"
      :options="options"
      :rules="[v => (Array.isArray(v) && v.length === 2) || '2 options should be selected']"
      v-model="value"
      multiple
    />
  </div>
</template>

<script>
export default {
  name: 'Validation',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: [],
    }
  },
}
</script>
