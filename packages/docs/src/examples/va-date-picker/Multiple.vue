<template>
  <va-date-picker
    label="Multiple"
    v-model="value"
    :config="{mode: 'multiple'}"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2019-03-07, 2019-03-20',
    }
  },
}
</script>
