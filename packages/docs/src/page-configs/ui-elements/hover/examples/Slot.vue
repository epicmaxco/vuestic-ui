<template>
  <va-hover stateful>
    <template #default="{ hover }">
      <va-button :color="hover ? colors.danger : colors.primary">
        {{ hover }}
      </va-button>
    </template>
  </va-hover>
</template>

<script>
import { getColors } from 'vuestic-ui/src/services/color-config/color-config'

export default {
  computed: {
    colors () {
      return getColors()
    },
  },
}
</script>
