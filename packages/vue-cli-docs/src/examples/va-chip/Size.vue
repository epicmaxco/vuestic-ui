<template>
  <div>
      <va-chip
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
      >
        {{size}} size
      </va-chip>
  </div>
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
