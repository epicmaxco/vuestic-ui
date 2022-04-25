<template>
  <div>
    <va-slider v-model="value" :step="10" />
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
