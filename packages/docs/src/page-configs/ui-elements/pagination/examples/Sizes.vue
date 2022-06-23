<template>
  <va-pagination v-model="value" size="small" :pages="5" class="mb-4" />
  <va-pagination v-model="value" size="large" :pages="5" class="mb-4" />
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
