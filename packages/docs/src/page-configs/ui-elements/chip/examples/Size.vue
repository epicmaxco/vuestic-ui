<template>
  <va-chip
    v-for="(size, index) in sizes"
    :key="index"
    :size="size"
    class="mr-6 mb-2"
  >
    {{size}} size
  </va-chip>
</template>

<script>
export default {
  data () {
    return {
      sizes: [
        'small',
        'medium',
        'large',
      ],
    }
  },
}
</script>
