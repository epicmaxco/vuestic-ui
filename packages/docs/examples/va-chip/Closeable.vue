<template>
  <div>
    <va-chip
      v-model="value"
      closeable
    >
      closeable chip
    </va-chip>
    <va-checkbox v-model="value" label="reset value" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
