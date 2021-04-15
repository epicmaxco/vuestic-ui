<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-hover #default="{ hover }">
        <va-button :color="hover ? colors.danger : colors.primary">
          {{ hover }}
        </va-button>
      </va-hover>
    </div>
  </div>
</template>

<script>
import { getColors } from 'vuestic-ui/src/services/color-config/color-config'

export default {
  data () {
    return {
      hover: false,
    }
  },
  computed: {
    colors () {
      return getColors()
    },
  },
}
</script>
