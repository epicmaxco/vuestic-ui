<template>
  <va-split class="split-demo">
    <template #start>
      <div>{{ lorem }}</div>
    </template>
    <template #grabber>
      <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center; background-color: greenyellow;">
        <va-icon name="face" />
      </div>
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
