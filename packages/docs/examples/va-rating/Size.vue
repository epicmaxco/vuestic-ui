<template>
  <div>
    <va-rating
      class="mb-2"
      v-model="value"
      size="small"
    />
    <va-rating
      class="mb-2"
      v-model="value"
      size="large"
    />
    <va-rating
      v-model="value"
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
