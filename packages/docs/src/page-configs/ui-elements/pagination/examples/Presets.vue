<template>
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="default" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="primary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="secondary" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="plain" class="mb-4" />
  <va-pagination v-model="value" :pages="10" :visible-pages="3" preset="plainOpacity" />
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
