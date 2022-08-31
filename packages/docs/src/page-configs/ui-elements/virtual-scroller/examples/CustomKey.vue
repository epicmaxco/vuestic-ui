<template>
  <va-virtual-scroller
    :items="hugeObjectsArray"
    style="height: 200px;"
    :bench="10"
    track-by="value"
    v-slot="{item}"
  >
    <va-badge class="pb-2" color="success" :text="`item ${item.value}`" />
  </va-virtual-scroller>
</template>

<script>
import { hugeObjectsArray } from './Default'

export default {
  data: () => {
    return { hugeObjectsArray }
  },
}
</script>
