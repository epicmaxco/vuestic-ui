<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="width: 600px;"
    horizontal
    v-slot="{item}"
  >
    <va-badge class="pr-2" color="success" :text="`item ${item}`" />
  </va-virtual-scroller>
</template>

<script>
import { hugeArray } from './Default'

export default {
  data: () => {
    return { hugeArray }
  },
}
</script>
