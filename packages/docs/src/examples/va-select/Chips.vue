<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="Custom chip max (3)"
      :options="options"
      v-model="value"
      multiple
      :chipMax="3"
    />
    <va-select
      class="mb-4"
      label="Tags"
      :options="options"
      v-model="value"
      multiple
      chips
    />
    <va-select
      class="mb-4"
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
