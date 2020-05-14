<template>
  <div>
    <va-rating
      class="mb-2"
      v-model="value"
      color="success"
      size="small"
    />
    <va-rating
      class="mb-2"
      v-model="value"
      color="info"
      size="large"
    />
    <va-rating
      v-model="value"
      color="danger"
      :size="48"
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
