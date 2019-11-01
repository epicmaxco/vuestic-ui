<template>
  <form
    class="va-form"
    @submit="handleSubmit"
  >
    <slot />
  </form>
</template>

<script>

export default {
  name: 'VaForm',
  mixins: [],
  components: {
  },
  props: {
  },
  methods: {
    handleSubmit (result) {
      console.log('result', result)
    },
  },
}
</script>

<style lang="scss">
.va-form {
}
</style>
