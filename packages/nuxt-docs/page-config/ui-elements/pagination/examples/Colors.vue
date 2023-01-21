<template>
  <va-pagination
    v-model="value"
    preset="darkPagination"
    :pages="5"
    class="mb-6"
  />
  <va-pagination
    v-model="value"
    preset="redPagination"
    :pages="5" />
</template>

<script setup>
import { ref } from 'vue'
import { useGlobalConfig } from 'vuestic-ui/src/services/global-config'

const value = ref(3)
const { mergeGlobalConfig } = useGlobalConfig()

mergeGlobalConfig({
  components: {
    presets: {
      VaPagination: {
        darkPagination: {
          color: 'textPrimary',
          activePageColor: 'textPrimary',
        },
        redPagination: {
          color: 'danger',
          activePageColor: 'danger',
        },
      },
    },
  },
})
</script>
