<template>
  <va-switch v-model="value" indeterminate :label="String(value)" />
  <br />
  <va-switch v-model="value2" indeterminate indeterminate-value="middle" :label="String(value2)" />
</template>

<script>
export default {
  data () {
    return {
      value: true,
      value2: true,
    }
  },
}
</script>
