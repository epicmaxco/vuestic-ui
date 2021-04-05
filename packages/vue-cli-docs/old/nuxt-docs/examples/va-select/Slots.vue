<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Prepend slot"
      :options="options"
      v-model="value"
    >
      <va-icon
        slot="prepend"
        name="share"
      />
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Prepend inner slot"
      :options="options"
      v-model="value"
    >
      <va-icon
        slot="prependInner"
        name="share"
      />
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Append inner slot"
      :options="options"
      v-model="value"
    >
      <va-icon
        slot="appendInner"
        name="share"
      />
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Append slot"
      :options="options"
      v-model="value"
    >
      <va-icon
        slot="append"
        name="share"
      />
    </va-select>
  </div>
</template>

<script>
export default {
  name: 'Slots',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: '',
    }
  },
}
</script>

<style scoped>

</style>
