<template>
  <div>
    <va-rating
      class="mb-2"
      v-model="value"
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
