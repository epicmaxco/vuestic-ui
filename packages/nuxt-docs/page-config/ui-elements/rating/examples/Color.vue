<template>
  <va-rating
    class="mb-2"
    v-model="value"
    color="success"
  />
  <va-rating
    class="mb-2"
    v-model="value"
    color="info"
  />
  <va-rating
    v-model="value"
    color="danger"
  />
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
