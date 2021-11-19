<template>
  <va-date-input
    v-model:is-open="isOpen"
    :label="`Is open value = ${isOpen}`"
  />
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
    }
  },
}
</script>
