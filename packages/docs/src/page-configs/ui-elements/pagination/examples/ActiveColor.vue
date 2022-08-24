<template>
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="default" gapped rounded active-page-color="warning" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="primary" gapped rounded active-page-color="warning" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="secondary" gapped rounded active-page-color="warning" />
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
