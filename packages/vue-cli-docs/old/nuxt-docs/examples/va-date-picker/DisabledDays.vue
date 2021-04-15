<template>
  <va-date-picker
    label="1 January 2020 disabled"
    v-model="value"
    :config="{disable: ['2020-01-01']}"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2020-01-02',
    }
  },
}
</script>
