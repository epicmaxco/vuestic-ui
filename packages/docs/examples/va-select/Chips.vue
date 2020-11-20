<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Custom chip max (3)"
      :options="options"
      v-model="value"
      multiple
      :chipMax="3"
    />
    <va-select
      style="margin: 16px 0;"
      label="Tags"
      :options="options"
      v-model="value"
      multiple
      chips
    />
    <va-select
      style="margin: 16px 0;"
      label="Deletable chips"
      :options="options"
      v-model="value"
      multiple
      chips
      deletableTags
    />
  </div>
</template>

<script>
export default {
  name: 'Chips',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: [],
    }
  },
}
</script>
