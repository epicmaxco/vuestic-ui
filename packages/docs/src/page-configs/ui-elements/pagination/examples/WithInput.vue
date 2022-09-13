<template>
  <va-pagination
    v-model="value"
    class="mb-3"
    :pages="20"
    input
  />
  <va-pagination
    v-model="value"
    class="mb-3"
    :pages="20"
    input
    buttons-preset="default"
  />
  <va-pagination
    v-model="value"
    :pages="20"
    input
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
