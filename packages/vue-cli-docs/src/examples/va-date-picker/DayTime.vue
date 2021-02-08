<template>
  <va-date-picker
    label="Day time"
    v-model="value"
    :config="{enableTime: true}"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2018-05-08 14:10',
    }
  },
}
</script>
