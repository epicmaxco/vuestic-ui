<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="height: 200px;"
    :bench="10"
    v-slot="{item}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item}`" />
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
