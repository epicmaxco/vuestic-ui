<template>
  <va-date-picker
    label="Disabled"
    v-model="value"
    disabled
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2020-08-09',
    }
  },
}
</script>
