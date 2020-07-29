<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Custom tag max (3)"
      :options="options"
      v-model="value"
      multiple
      :tagMax="3"
    />
    <va-select
      style="margin: 16px 0;"
      label="Tags"
      :options="options"
      v-model="value"
      multiple
      tags
    />
    <va-select
      style="margin: 16px 0;"
      label="Deletable tags"
      :options="options"
      v-model="value"
      multiple
      tags
      deletableTags
    />
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: [],
    }
  },
}
</script>

<style scoped>

</style>
