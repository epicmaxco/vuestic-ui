<template>
  <va-pagination
    v-model="value"
    :pages="15"
    :visible-pages="4"
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
