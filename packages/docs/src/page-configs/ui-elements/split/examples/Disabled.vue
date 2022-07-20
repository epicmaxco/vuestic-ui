<template>
  <va-split class="split-demo" disabled>
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
