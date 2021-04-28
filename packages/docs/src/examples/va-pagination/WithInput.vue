<template>
  <va-pagination
    v-model="value"
    :pages="20"
    input
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
