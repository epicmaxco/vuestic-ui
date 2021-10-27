<template>
  <div>
      <va-chip
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        class="mr-4"
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
