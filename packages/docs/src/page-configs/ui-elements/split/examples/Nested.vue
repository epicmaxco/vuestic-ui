<template>
  <va-split class="split-demo">
    <template #start>
      <va-split>
        <template #start>
          {{ lorem }}
        </template>
        <template #end>
          {{ lorem }}
        </template>
      </va-split>
    </template>
    <template #end>
      <va-split vertical style="height: 8rem;">
        <template #start>
          {{ lorem }}
        </template>
        <template #end>
          {{ lorem }}
        </template>
      </va-split>
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
