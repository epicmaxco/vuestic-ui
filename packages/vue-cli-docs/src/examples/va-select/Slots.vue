<template>
  <div style="max-width: 300px;">
    <va-select
      style="margin: 16px 0;"
      label="Prepend slot"
      :options="options"
      v-model="value"
    >
      <template #prepend>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Prepend inner slot"
      :options="options"
      v-model="value"
    >
      <template #prependInner>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Append inner slot"
      :options="options"
      v-model="value"
    >
      <template #appendInner>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      style="margin: 16px 0;"
      label="Append slot"
      :options="options"
      v-model="value"
    >
      <template #append>
        <va-icon
          name="share"
        />
      </template>
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
