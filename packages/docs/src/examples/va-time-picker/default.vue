<template>
  <va-time-picker v-model="value" />
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
