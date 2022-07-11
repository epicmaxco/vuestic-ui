<template>
  <va-split :limits="[10, 90]" class="split-demo">
    <template #start>
      <va-split :limits="[10, 90]">
        <template #start>
          {{ lorem }}
        </template>
        <template #end>
          {{ lorem }}
        </template>
      </va-split>
    </template>
    <template #end>
      <va-split :limits="[10, 90]" vertical style="height: 11rem;">
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
