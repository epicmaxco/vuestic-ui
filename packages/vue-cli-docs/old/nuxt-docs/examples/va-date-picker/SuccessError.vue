<template>
  <div>
    <va-date-picker
      label="Success"
      v-model="value"
      success
    />
    <br>
    <va-date-picker
      label="Error"
      v-model="value2"
      error
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      value2: '',
    }
  },
}
</script>
