<template>
  <va-time-picker v-model="value" readonly />
  <va-divider vertical />
  <va-time-picker v-model="value" disabled />
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
    }
  },
}
</script>
