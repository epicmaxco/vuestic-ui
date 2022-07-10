<template>
  <va-split class="split-demo" vertical>
    <template #start>
      <div>{{ lorem }}</div>
    </template>
    <template #end>
      <div>{{ lorem }}</div>
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
