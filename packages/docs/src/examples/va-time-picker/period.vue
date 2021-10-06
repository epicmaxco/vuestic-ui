<template>
  <va-time-picker v-model="value" />
  <va-divider vertical />
  <va-time-picker v-model="value" :period="false" />
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
