<template>
  <div>
    <va-rating v-model="value" color="success" />
    <va-rating v-model="value" color="info" />
    <va-rating v-model="value" color="danger" />
    <va-rating v-model="value" color="warning" />
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
