<template>
  <div class="va-card__content">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaCardContent',
})

</script>
