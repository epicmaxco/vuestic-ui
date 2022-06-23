<template>
  <va-pagination v-model="value" color="success" :pages="5" class="mb-4" />
  <va-pagination v-model="value" color="danger" :pages="5" class="mb-4" />
  <va-pagination v-model="value" color="#aa3b6a" :pages="5" class="mb-4" />
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
