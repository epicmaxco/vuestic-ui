<template>
  <va-split class="split-demo" vertical>
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
