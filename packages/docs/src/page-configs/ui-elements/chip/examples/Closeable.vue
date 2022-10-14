<template>
  <va-chip v-model="value" closeable>
    closeable chip
  </va-chip>
  <va-button
    v-if="!value"
    @click="value = true"
  >
    show chip
  </va-button>
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
