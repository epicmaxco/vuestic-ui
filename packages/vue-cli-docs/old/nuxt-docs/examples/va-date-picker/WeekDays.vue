<template>
  <va-date-picker
    label="Show week days in dropdown"
    v-model="value"
    week-days
  />
</template>

<script>
export default {
  data () {
    return {
      value: '',
    }
  },
}
</script>
