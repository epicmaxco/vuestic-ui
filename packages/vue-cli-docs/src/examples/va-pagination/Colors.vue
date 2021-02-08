<template>
  <div>
    <va-pagination v-model="value" color="success" :pages="5" />
    <va-pagination v-model="value" color="danger" :pages="5" />
    <va-pagination v-model="value" color="#aa3b6a" :pages="5" />
  </div>
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
