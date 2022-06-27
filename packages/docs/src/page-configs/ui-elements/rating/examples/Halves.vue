<template>
  <va-rating
    v-model="value"
    halves
  />
  <span> Value: {{ value }}</span>
</template>

<script>
export default {
  data () {
    return {
      value: 3,
    }
  },
}
</script>
