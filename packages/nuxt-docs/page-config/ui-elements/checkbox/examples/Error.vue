<template>
  <va-checkbox
    v-model="value"
    error
    error-messages="Error message"
    label="Error message"
  />
</template>

<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
