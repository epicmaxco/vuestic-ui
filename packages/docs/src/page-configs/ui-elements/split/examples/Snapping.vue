<template>
  <va-split class="split-demo" :snapping="[20, 80]" :snapping-range="5">
    <template #start>
      {{ lorem }}
    </template>
    <template #end>
      {{ lorem }}
    </template>
  </va-split>
</template>

<script>
import { lorem } from './Default'

export default {
  data: () => ({
    lorem,
  }),
}
</script>
