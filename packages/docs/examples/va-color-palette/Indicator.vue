<template>
  <va-color-palette
    v-model="value"
    :palette="['#4ae387', '#e34a4a', '#4ab2e3', '#db76df', '#f7cc36', '#f3f3f3', '#000']"
    indicator="square"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '#FF00FF',
    }
  },
}
</script>
