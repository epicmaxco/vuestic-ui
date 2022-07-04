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
import { useColors } from 'vuestic-ui/src/composables'

export default {
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    colors() {
      return useColors().getColors();
    },
  },
};
</script>
