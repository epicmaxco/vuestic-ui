<template>
  <va-date-picker
    label="Date range"
    v-model="value"
    :config="{mode: 'range'}"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2019-03-07 to 2019-03-20',
    }
  },
}
</script>
