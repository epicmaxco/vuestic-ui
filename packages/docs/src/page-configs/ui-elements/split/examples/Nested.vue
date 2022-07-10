<template>
  <va-split :limits="[10, 90]" class="split-demo">
    <template #start>
      <va-split :limits="[10, 90]">
        <template #start>
          <div>{{lorem}}</div>
        </template>
        <template #end>
          <div>{{lorem}}</div>
        </template>
      </va-split>
    </template>
    <template #end>
      <va-split :limits="[10, 90]" vertical style="height: 11rem;">
        <template #start>
          <div>{{lorem}}</div>
        </template>
        <template #end>
          <div>{{lorem}}</div>
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
