<template>
  <va-date-input v-model="value" />
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(2000, 0, 1)
      }
    }
  }
</script>
