<template>
  <div>
    <va-slider v-model="value" range />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [45, 65],
    }
  },
}
</script>
