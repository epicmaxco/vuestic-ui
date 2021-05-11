<template>
  <va-checkbox class="mb-2" v-model="value" label="reset value" />
  <va-chip v-model="value" closeable>
    closeable chip
  </va-chip>
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
