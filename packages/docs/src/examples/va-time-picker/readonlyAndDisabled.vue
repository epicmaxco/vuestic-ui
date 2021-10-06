<template>
  <va-time-picker v-model="value" readonly />
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
