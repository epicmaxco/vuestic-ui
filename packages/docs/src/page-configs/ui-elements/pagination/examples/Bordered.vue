<template>
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="default" gapped border-color="primary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="primary" gapped border-color="primary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="secondary" gapped border-color="primary" />
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
