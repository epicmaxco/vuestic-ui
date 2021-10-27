<template>
  <div>
    <va-slider v-model="value" color="success" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 45,
    }
  },
}
</script>
