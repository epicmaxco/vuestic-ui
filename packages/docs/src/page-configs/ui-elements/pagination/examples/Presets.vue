<template>
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="primary"
    class="mb-4"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="default"
    class="mb-4"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="secondary"
  />
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
