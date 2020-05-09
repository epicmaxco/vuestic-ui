<template>
  <div>
    <va-rating
      v-model="value"
      hover
      halves
    />
    <span> Value: {{ value }}</span>
  </div>
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
