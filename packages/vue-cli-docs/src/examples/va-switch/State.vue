<template>
  <div>
    <va-switch v-model="value" disabled />
    <va-switch v-model="value" readonly />
  </div>
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
