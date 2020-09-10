<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Single select"
      :options="options"
      v-model="valueSingle"
    />
    <va-select
      style="margin: 16px 0;"
      label="Multiple select"
      :options="options"
      v-model="valueMultiple"
      multiple
    />
  </div>
</template>

<script>
export default {
  name: 'Variations',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      valueSingle: '',
      valueMultiple: '',
    }
  },
}
</script>
