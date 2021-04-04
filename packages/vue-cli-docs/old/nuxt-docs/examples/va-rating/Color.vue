<template>
  <div>
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
