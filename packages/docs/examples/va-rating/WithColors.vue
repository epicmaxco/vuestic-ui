<template>
  <div>
    <div class="rating-container">
      <va-rating v-model="value" color="success" />
      <va-rating v-model="value" color="info" />
      <va-rating v-model="value" color="danger" />
      <va-rating v-model="value" color="warning" />
    </div>
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
