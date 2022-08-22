<template>
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="default" rounded gapped border-color="primary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="primary" rounded gapped border-color="primary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="secondary" rounded gapped border-color="primary" />
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
