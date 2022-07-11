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
import { VaSplit } from 'vuestic-ui/src/components/va-split'
import { lorem } from './Default'

export default {
  components: { VaSplit },
  data: () => ({
    lorem,
  }),
}
</script>
