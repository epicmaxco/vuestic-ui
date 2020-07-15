<template>
  <div>
      <va-tag
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
      >
        {{size}} size
      </va-tag>
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
