<template>
  <div>
    <va-checkbox
      v-model="value"
      error
      error-messages="Error message"
      label="Error message"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
    }
  },
}
</script>
