<template>
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="default" gapped class="mb-6" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="primary" gapped class="mb-6" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" buttons-preset="secondary" gapped />
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
