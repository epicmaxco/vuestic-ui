<template>
  <va-date-picker
    label="Default with placeholder"
    placeholder="Custom placeholder"
    v-model="value"
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
