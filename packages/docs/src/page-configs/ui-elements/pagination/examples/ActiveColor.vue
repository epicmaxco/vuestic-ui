<template>
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="primary"
    active-page-color="textPrimary"
    class="mb-4"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="#154EC1"
    active-page-color="#002D87"
    class="mb-4"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="secondary"
    active-page-color="#9AEDB1"
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
