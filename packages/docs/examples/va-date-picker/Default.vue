<template>
  <va-date-picker
    label="Default"
    v-model="value"
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
